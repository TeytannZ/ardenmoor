import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SCREENS } from '../App.jsx'
import { SoundEngine, AudioManager } from '../lib/audio.js'
import { storage } from '../lib/storage.js'
import { loadPreset, changePlanToPreset } from '../lib/presets.js'
import PresetSelectorPanel from '../components/PresetSelectorPanel.jsx'

// ─── MainMenu ────────────────────────────────────────────────────────────────
//
// LAYOUT (centered, story-first):
//
//   [≡ Nav]  [ARDENMOOR]  [🔥 streak  ◈ coins]   ← top bar
//
//        [atmospheric background — full screen]
//
//        ┌─────────────────────────────────────┐
//        │  THE FORGOTTEN CODEX                │
//        │  A R D E N M O O R                 │
//        │  ─────── ✦ ───────                 │
//        │  Act I · Week 3                    │
//        │                                    │
//        │  [ CONTINUE THE CHRONICLE → ]      │
//        │                                    │
//        │  Vael's Study · Journal · Check-In  │
//        └─────────────────────────────────────┘
//
//   ── ── ── ── ── [progress dots] ── ── ── ──   ← bottom
//
// FILES NEEDED:
//   public/assets/images/ui/menu-wide-1.jpg  through  menu-wide-5.jpg
//   (Existing. Wide panoramic 2.4:1 images, cinematic atmospherics.)
// ─────────────────────────────────────────────────────────────────────────────

const _BASE = import.meta.env.BASE_URL
const BACKGROUNDS = [
  `${_BASE}assets/images/ui/menu-wide-1.jpg`,
  `${_BASE}assets/images/ui/menu-wide-2.jpg`,
  `${_BASE}assets/images/ui/menu-wide-3.jpg`,
  `${_BASE}assets/images/ui/menu-wide-4.jpg`,
  `${_BASE}assets/images/ui/menu-wide-5.jpg`,
]

const BG_TINTS = [
  { r: 201, g: 155, b: 70  },
  { r: 185, g: 100, b: 45  },
  { r: 140, g: 165, b: 205 },
  { r: 175, g: 150, b: 80  },
  { r: 160, g: 145, b: 100 },
]

const BG_GLOW = [
  'rgba(45,30,5,0.18)',
  'rgba(55,15,5,0.2)',
  'rgba(5,15,50,0.2)',
  'rgba(30,30,10,0.18)',
  'rgba(20,18,8,0.18)',
]

const PAN_SPEED_PX = 8
const IMAGE_ASPECT = 2.4
const CROSSFADE_MS = 1400

const BG_STATE_KEY = 'ardenmoor:menu_bg_state'

function loadBgState() {
  try {
    const raw = localStorage.getItem(BG_STATE_KEY)
    if (!raw) return null
    const saved = JSON.parse(raw)
    if (saved?.bgIndex == null || !saved.savedAt) return null
    const additionalMs   = Date.now() - saved.savedAt
    const totalMs        = (saved.msElapsed || 0) + additionalMs
    const renderedW      = window.innerHeight * IMAGE_ASPECT
    const extraW         = Math.max(renderedW - window.innerWidth, 1)
    const panDurationMs  = (extraW / PAN_SPEED_PX) * 1000
    const imagesAdvanced = Math.floor(totalMs / panDurationMs)
    const restoredIndex  = (saved.bgIndex + imagesAdvanced) % BACKGROUNDS.length
    const restoredElapsed = totalMs % panDurationMs
    return { bgIndex: restoredIndex, panStartTime: performance.now() - restoredElapsed }
  } catch (_) { return null }
}

function saveBgState(bgIndex, panStartTime) {
  try {
    const msElapsed = performance.now() - panStartTime
    localStorage.setItem(BG_STATE_KEY, JSON.stringify({ bgIndex, msElapsed, savedAt: Date.now() }))
  } catch (_) {}
}

let _introWavePending = true
let _checkinAutoOfferSent = false

const getScale = () => Math.max(window.innerWidth / 1920, 0.18)

// ─── Custom cursor ─────────────────────────────────────────────────────────────
function CursorOverlay({ isHovering, isClicking }) {
  const dotRef = useRef(null)
  const pos    = useRef({ x: -200, y: -200 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!ready) setReady(true)
    }
    window.addEventListener('mousemove', onMove)
    let raf
    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top  = pos.current.y + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  if (!ready) return null

  const size  = isClicking ? 'clamp(5px,0.4vw,8px)' : isHovering ? 'clamp(9px,0.7vw,13px)' : 'clamp(7px,0.55vw,10px)'
  const color = isClicking ? 'rgba(255,240,180,1)' : isHovering ? 'rgba(255,220,100,1)' : 'rgba(235,200,90,0.95)'
  const glow  = isClicking
    ? '0 0 8px rgba(255,220,80,1),0 0 22px rgba(201,168,76,0.7),0 0 40px rgba(201,168,76,0.3)'
    : isHovering
    ? '0 0 8px rgba(201,168,76,1),0 0 18px rgba(201,168,76,0.5)'
    : '0 0 5px rgba(201,168,76,0.8),0 0 14px rgba(201,168,76,0.3)'

  return (
    <div ref={dotRef} style={{
      position:'fixed', zIndex:10000,
      width:size, height:size,
      marginLeft:`calc(-1 * ${size} / 2)`,
      marginTop:`calc(-1 * ${size} / 2)`,
      background:color, transform:`rotate(45deg) scale(${isClicking?0.7:1})`,
      pointerEvents:'none', boxShadow:glow,
      transition:'width 0.12s ease,height 0.12s ease,box-shadow 0.12s ease,background 0.12s ease,transform 0.08s ease',
    }} />
  )
}

// ─── Background layer (panning) ────────────────────────────────────────────────
function BgLayer({ src, panStartTime, opacity }) {
  const ref = useRef(null)
  useEffect(() => {
    let raf
    const tick = (now) => {
      const el = ref.current
      if (!el) { raf = requestAnimationFrame(tick); return }
      const viewH     = window.innerHeight
      const viewW     = window.innerWidth
      const renderedW = viewH * IMAGE_ASPECT
      const extraW    = Math.max(renderedW - viewW, 1)
      const elapsed   = now - panStartTime
      const bgPct     = Math.min((elapsed / 1000 * PAN_SPEED_PX / extraW) * 100, 100)
      el.style.backgroundPositionX = `${bgPct}%`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [panStartTime])

  return (
    <div ref={ref} style={{
      position:'absolute', inset:0,
      backgroundImage:`url(${src})`,
      backgroundSize:'cover',
      backgroundPositionX:'0%', backgroundPositionY:'center',
      backgroundColor:'#07060f',
      opacity, transition:`opacity ${CROSSFADE_MS}ms ease`,
      willChange:'background-position-x,opacity',
    }} />
  )
}

function useBackgroundCycle(initBgIndex=0, initPanStartTime=null) {
  const [bgIndex,      setBgIndex]      = useState(initBgIndex)
  const [prevIndex,    setPrevIndex]    = useState(-1)
  const [panStartTime, setPanStartTime] = useState(() => initPanStartTime ?? performance.now())
  const cyclingRef = useRef(false)

  useEffect(() => {
    let raf
    const check = (now) => {
      if (!cyclingRef.current) {
        const renderedW  = window.innerHeight * IMAGE_ASPECT
        const extraW     = Math.max(renderedW - window.innerWidth, 1)
        const elapsed    = now - panStartTime
        if ((elapsed / 1000) * PAN_SPEED_PX >= extraW) {
          cyclingRef.current = true
          const next = (bgIndex + 1) % BACKGROUNDS.length
          setPrevIndex(bgIndex); setBgIndex(next); setPanStartTime(performance.now())
          setTimeout(() => { cyclingRef.current = false }, CROSSFADE_MS + 100)
        }
      }
      raf = requestAnimationFrame(check)
    }
    raf = requestAnimationFrame(check)
    return () => cancelAnimationFrame(raf)
  }, [bgIndex, panStartTime])

  return { bgIndex, prevIndex, panStartTime }
}

// ─── Dust + cursor particles canvas ───────────────────────────────────────────
function initDualCanvas(canvas, getTint, introWaveRef) {
  const ctx  = canvas.getContext('2d')
  const area = (canvas.width * canvas.height) / (1920 * 1080)
  const COUNT = Math.round(90 * Math.sqrt(area))

  const makeAmbient = () => {
    const s = getScale()
    const r = (Math.random() * 2.2 + 0.5) * s
    return {
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r, squish: 0.82+Math.random()*0.18,
      angle: Math.random()*Math.PI, va: (Math.random()-0.5)*0.003,
      vx: (Math.random()-0.5)*0.22*s, vy: -(Math.random()*0.2+0.02)*s,
      life: 0, maxLife: Math.random()*260+140,
    }
  }
  const ambients = Array.from({length:COUNT}, () => {
    const p=makeAmbient(); p.life=Math.random()*p.maxLife; return p
  })

  const cursors = []
  let lastMX=null, lastMY=null, lastMT=null

  const onClick = (e) => {
    const sc = getScale()
    for (let i=0;i<18;i++) {
      const angle=(i/18)*Math.PI*2; const speed2=(Math.random()*3+1.5)*sc
      cursors.push({ x:e.clientX, y:e.clientY,
        vx:Math.cos(angle)*speed2+(Math.random()-0.5)*2*sc,
        vy:Math.sin(angle)*speed2-Math.random()*1.5*sc,
        r:(Math.random()*2.5+0.8)*sc, a:0.9+Math.random()*0.1,
        life:0, maxLife:Math.random()*60+35 })
    }
  }
  const onMove = (e) => {
    const x=e.clientX, y=e.clientY, now=performance.now()
    let dvx=0, dvy=0, speed=0
    if (lastMX!==null) {
      const dt=Math.max(now-lastMT,1)
      dvx=(x-lastMX)/dt*12; dvy=(y-lastMY)/dt*12
      speed=Math.sqrt(dvx*dvx+dvy*dvy)
    }
    lastMX=x; lastMY=y; lastMT=now
    const count=Math.min(Math.floor(speed*0.5)+1,8)
    const sc=getScale()
    for (let i=0;i<count;i++) cursors.push({
      x:x+(Math.random()-0.5)*8*sc, y:y+(Math.random()-0.5)*5*sc,
      vx:dvx*(0.04+Math.random()*0.07)+(Math.random()-0.5)*3*sc,
      vy:dvy*(0.02+Math.random()*0.04)-Math.random()*1.8*sc,
      r:(Math.random()*2+0.4)*sc, a:0.8+Math.random()*0.2,
      life:0, maxLife:Math.random()*50+28,
    })
  }

  const runIntroWave = () => {
    const w=canvas.width, h=canvas.height
    const startTime=performance.now(), duration=5500
    let lastWX=null, lastWY=null
    const waveTick = (now) => {
      const t=(now-startTime)/duration; if(t>1)return
      const sc=getScale()
      const phase=t*Math.PI*2.2
      const xPos=0.10+((-Math.cos(phase)+1)/2)*0.80
      const yBase=0.09+0.03*Math.sin(phase*0.55)
      const yWave=yBase+0.022*Math.sin(phase*4.1)
      const wx=xPos*w, wy=yWave*h
      const fadeAlpha=t>0.75?1-((t-0.75)/0.25):1.0
      let dvx=0, dvy=0
      if(lastWX!==null){ dvx=(wx-lastWX)*0.7; dvy=(wy-lastWY)*0.7 }
      lastWX=wx; lastWY=wy
      const count=Math.floor(Math.random()*3)+2
      for(let i=0;i<count;i++) cursors.push({
        x:wx+(Math.random()-0.5)*14*sc, y:wy+(Math.random()-0.5)*10*sc,
        vx:dvx*(0.02+Math.random()*0.04)+(Math.random()-0.5)*1.2*sc,
        vy:dvy*(0.015+Math.random()*0.03)-Math.random()*0.9*sc,
        r:(Math.random()*2.5+0.5)*sc, a:(0.55+Math.random()*0.3)*fadeAlpha,
        life:0, maxLife:Math.random()*85+50,
      })
      requestAnimationFrame(waveTick)
    }
    requestAnimationFrame(waveTick)
  }
  if(introWaveRef) introWaveRef.current=runIntroWave

  window.addEventListener('mousemove', onMove)
  window.addEventListener('click', onClick)

  let raf, lastTime=null
  const draw = (ts) => {
    const dt=lastTime?Math.min((ts-lastTime)/16.67,3):1; lastTime=ts
    ctx.clearRect(0,0,canvas.width,canvas.height)
    const tint=getTint()
    ambients.forEach(p => {
      p.x+=p.vx*dt; p.y+=p.vy*dt; p.angle+=p.va*dt; p.life+=dt
      if(p.life>p.maxLife||p.x<-10||p.x>canvas.width+10){ Object.assign(p,makeAmbient()); return }
      if(p.y<-10){ p.x=Math.random()*canvas.width; p.y=Math.random()*canvas.height; p.life=0; return }
      const t=p.life/p.maxLife; const alpha=Math.sin(t*Math.PI)*0.75
      if(alpha<0.02) return
      ctx.save(); ctx.globalAlpha=alpha; ctx.translate(p.x,p.y); ctx.rotate(p.angle)
      const gr=ctx.createRadialGradient(0,0,0,0,0,p.r*2.5)
      gr.addColorStop(0,`rgba(${tint.r},${tint.g},${tint.b},1)`)
      gr.addColorStop(0.45,`rgba(${tint.r},${tint.g},${tint.b},0.38)`)
      gr.addColorStop(1,`rgba(${tint.r},${tint.g},${tint.b},0)`)
      ctx.beginPath(); ctx.ellipse(0,0,p.r*2.5,p.r*2.5*p.squish,0,0,Math.PI*2)
      ctx.fillStyle=gr; ctx.fill(); ctx.restore()
    })
    for(let i=cursors.length-1;i>=0;i--) {
      const m=cursors[i]
      m.x+=m.vx*dt; m.y+=m.vy*dt
      m.vy+=0.22*getScale()*dt; m.vx*=Math.pow(0.95,dt); m.life+=dt
      if(m.life>m.maxLife){ cursors.splice(i,1); continue }
      const t2=m.life/m.maxLife
      ctx.beginPath(); ctx.arc(m.x,m.y,m.r*(1-t2*0.3),0,Math.PI*2)
      ctx.fillStyle=`rgba(${tint.r},${tint.g},${tint.b},${(1-t2)*m.a})`
      ctx.fill()
    }
    raf=requestAnimationFrame(draw)
  }
  raf=requestAnimationFrame(draw)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove',onMove)
    window.removeEventListener('click',onClick)
  }
}

// ─── Progress dots ─────────────────────────────────────────────────────────────
function ProgressBar({ bgIndex, tint }) {
  return (
    <div style={{
      position:'absolute', bottom:'clamp(0.9rem,1.6vh,1.4rem)',
      left:'50%', transform:'translateX(-50%)',
      zIndex:6, pointerEvents:'none',
      display:'flex', alignItems:'flex-end', gap:'clamp(5px,0.7vw,9px)',
    }}>
      {BACKGROUNDS.map((_,i) => {
        const isActive = i===bgIndex
        return (
          <div key={i} style={{
            width: isActive?'clamp(28px,3.5vw,50px)':'clamp(12px,1.6vw,20px)',
            height:'2px',
            background: isActive?`rgba(${tint.r},${tint.g},${tint.b},0.82)`:'rgba(200,180,120,0.28)',
            boxShadow: isActive?`0 0 8px rgba(${tint.r},${tint.g},${tint.b},0.5)`:'none',
            transition:'width 0.5s ease,background 0.5s ease,box-shadow 0.5s ease',
          }} />
        )
      })}
    </div>
  )
}

// ─── Ornamental divider ────────────────────────────────────────────────────────
function OrnamentalRule({ tint, width='16vw' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.55em', width }}>
      <div style={{
        flex:1, height:'1px',
        background:'linear-gradient(to right, transparent, rgba(225,205,145,0.92))',
        boxShadow:`0 0 5px rgba(${tint.r},${tint.g},${tint.b},0.55)`,
        transition:'box-shadow 1.5s ease',
      }} />
      <span style={{
        fontFamily:'serif', fontSize:'clamp(0.9rem,1vw,1.1rem)',
        color:'rgba(235,215,155,1)', lineHeight:1,
        textShadow:`0 0 10px rgba(${tint.r},${tint.g},${tint.b},1),0 0 3px rgba(255,255,200,0.7)`,
        transition:'text-shadow 1.5s ease',
      }}>✦</span>
      <div style={{
        flex:1, height:'1px',
        background:'linear-gradient(to left, transparent, rgba(225,205,145,0.92))',
        boxShadow:`0 0 5px rgba(${tint.r},${tint.g},${tint.b},0.55)`,
        transition:'box-shadow 1.5s ease',
      }} />
    </div>
  )
}

// ─── Game-style menu button ─────────────────────────────────────────────────────
function GameButton({ label, sub, onClick, variant='primary', setIsHovering }) {
  const [hov, setHov] = useState(false)
  const V = {
    primary:   { bg: hov?'rgba(201,168,76,0.2)' :'rgba(6,5,18,0.78)',  border: hov?'rgba(201,168,76,0.9)' :'rgba(201,168,76,0.52)', color: hov?'rgba(255,238,158,1)'  :'rgba(228,194,94,0.97)',  shadow: hov?'0 0 52px rgba(201,168,76,0.32),0 4px 30px rgba(0,0,0,0.68),inset 0 0 28px rgba(201,168,76,0.06)':'0 0 22px rgba(201,168,76,0.1),0 4px 20px rgba(0,0,0,0.52)' },
    secondary: { bg: hov?'rgba(201,168,76,0.11)'  :'rgba(6,5,18,0.62)',  border: hov?'rgba(201,168,76,0.58)':'rgba(201,168,76,0.24)', color: hov?'rgba(226,198,118,0.98)':'rgba(188,160,82,0.88)',  shadow: hov?'0 0 30px rgba(201,168,76,0.18),0 4px 20px rgba(0,0,0,0.52)':'0 2px 12px rgba(0,0,0,0.42)' },
    ghost:     { bg: hov?'rgba(175,40,38,0.12)'  :'rgba(6,5,18,0.45)',  border: hov?'rgba(198,70,60,0.5)' :'rgba(148,60,50,0.24)',  color: hov?'rgba(228,130,105,0.95)':'rgba(175,98,72,0.78)',   shadow: hov?'0 0 26px rgba(185,42,42,0.14),0 4px 20px rgba(0,0,0,0.52)':'0 2px 12px rgba(0,0,0,0.4)' },
  }
  const s = V[variant]||V.primary
  return (
    <button
      onClick={() => { try{SoundEngine.uiClick()}catch(_){} ; onClick() }}
      onMouseEnter={() => { setHov(true); setIsHovering?.(true); try{SoundEngine.uiHover()}catch(_){} }}
      onMouseLeave={() => { setHov(false); setIsHovering?.(false) }}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        width:'clamp(280px,36vw,440px)',
        padding: sub ? 'clamp(0.72em,1.1vh,0.95em) clamp(1.6em,2.8vw,2.4em)' : 'clamp(0.82em,1.4vh,1.1em) clamp(1.6em,2.8vw,2.4em)',
        background:s.bg, border:`1px solid ${s.border}`, borderRadius:'2px',
        cursor:'pointer', transition:'all 0.18s ease', boxShadow:s.shadow,
        gap: sub ? '0.2rem' : 0,
      }}
    >
      <span style={{
        fontFamily:'"Cinzel",serif', fontSize:'clamp(0.95rem,1.1vw,1.28rem)',
        letterSpacing:'0.22em', textTransform:'uppercase',
        color:s.color, transition:'color 0.18s ease', lineHeight:1.3,
        pointerEvents:'none',
      }}>{label}</span>
      {sub && (
        <span style={{
          fontFamily:'"Lora",serif', fontStyle:'italic',
          fontSize:'clamp(0.82rem,0.9vw,0.95rem)',
          color: hov?'rgba(192,170,120,0.82)':'rgba(162,140,90,0.68)',
          lineHeight:1.45, transition:'color 0.18s ease', pointerEvents:'none',
        }}>{sub}</span>
      )}
    </button>
  )
}

// ─── Small secondary link button ─────────────────────────────────────────────
function LinkButton({ label, onClick, setIsHovering }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={() => { try{SoundEngine.uiClick()}catch(_){} ; onClick() }}
      onMouseEnter={() => { setHov(true); setIsHovering?.(true); try{SoundEngine.uiHover()}catch(_){} }}
      onMouseLeave={() => { setHov(false); setIsHovering?.(false) }}
      style={{
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.68rem,0.76vw,0.84rem)',
        letterSpacing:'0.22em', textTransform:'uppercase',
        color: hov ? 'rgba(245,218,125,1)' : 'rgba(215,185,100,0.96)',
        background: hov ? 'rgba(201,168,76,0.14)' : 'rgba(3,2,10,0.52)',
        border: `1px solid ${hov ? 'rgba(201,168,76,0.55)' : 'rgba(148,118,42,0.4)'}`,
        borderRadius:'2px',
        cursor:'pointer',
        transition:'all 0.18s ease',
        padding:'0.34em 0.8em',
        boxShadow: hov ? '0 0 14px rgba(201,168,76,0.18)' : 'none',
      }}
    >
      {label}
    </button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function MainMenu({ appState, navigate, updateState, openSettings }) {
  const canvasRef    = useRef(null)
  const tintRef      = useRef(BG_TINTS[0])
  const introWaveRef = useRef(null)

  const [mounted,     setMounted]     = useState(false)
  const [isHovering,  setIsHovering]  = useState(false)
  const [isClicking,  setIsClicking]  = useState(false)
  const [journalOpen, setJournalOpen] = useState(false)
  const [changePlanOpen, setChangePlanOpen] = useState(false)
  const [presetOpen,     setPresetOpen]     = useState(false)

  // ── Journal scenes ─────────────────────────────────────────────────────────
  const [journalScenes, setJournalScenes] = useState(() => storage.getJournal())
  useEffect(() => {
    const userId = storage.getSession()?.userId
    if (!userId) return
    storage.loadJournalFromCloud(userId).then(merged => setJournalScenes(merged))
  }, [])

  // ── Player state ───────────────────────────────────────────────────────────
  const hasPlan       = !!storage.getPlan()
  const hasOnboarding = !!storage.getOnboardingData()
  const planState     = hasPlan ? 'plan' : hasOnboarding ? 'onboarding' : 'new'
  const planPhase     = storage.getPlan()?.phaseNumber || 1
  const planProgress  = storage.getPlanProgress()
  const streak        = planProgress.streak        || 0
  const coins         = planProgress.coins         || 0
  const inscriptions  = planProgress.inscriptions  || 0
  const completedWeeks= planProgress.completedWeeks|| 0
  const currentWeekDisplay = completedWeeks + 1

  // ── Check-in state ─────────────────────────────────────────────────────────
  const checkedInToday = (() => {
    const daily = storage.getDailyState()
    if (!daily.lastCheckin) return false
    return daily.lastCheckin === new Date().toISOString().slice(0,10)
  })()

  // Check-in is handled inline in story flow — no auto-redirect here

  // ── Story progress label ───────────────────────────────────────────────────
  const storyRaw = (() => { try { return JSON.parse(localStorage.getItem('ardenmoor_story_v1')||'null') } catch { return null } })()
  const storySublabel = storyRaw?.actComplete
    ? 'Act I complete · The road east calls'
    : storyRaw?.beatIdx > 0
    ? 'In progress'
    : 'Not yet begun'

  // ── Background system ──────────────────────────────────────────────────────
  const [bgInit] = useState(() => loadBgState() || { bgIndex:0, panStartTime: performance.now() })
  const { bgIndex, prevIndex, panStartTime } = useBackgroundCycle(bgInit.bgIndex, bgInit.panStartTime)
  const bgIndexRef      = useRef(bgInit.bgIndex)
  const panStartTimeRef = useRef(bgInit.panStartTime)
  useEffect(() => { bgIndexRef.current=bgIndex },      [bgIndex])
  useEffect(() => { panStartTimeRef.current=panStartTime }, [panStartTime])
  useEffect(() => () => { saveBgState(bgIndexRef.current, panStartTimeRef.current) }, [])

  const tint = BG_TINTS[bgIndex]
  useEffect(() => { tintRef.current=BG_TINTS[bgIndex] }, [bgIndex])

  // ── Plan change handlers ───────────────────────────────────────────────────
  const handleFreshPresetConfirm = (phaseNumber) => {
    // First-time user — nothing to clear, just load and go
    setPresetOpen(false); loadPreset(phaseNumber); navigate(SCREENS.STORY)
  }
  const handleChangePlanPreset = (phaseNumber) => {
    // Returning user starting over — wipe all game data first
    storage.clearGameData()
    setChangePlanOpen(false); setPresetOpen(false)
    loadPreset(phaseNumber)
    navigate(SCREENS.STORY)
  }
  const handleChangePlanMaren = () => {
    // Returning user starting over — wipe all game data, send to Maren
    storage.clearGameData()
    setChangePlanOpen(false)
    navigate(SCREENS.ONBOARDING)
  }

  // ── Canvas setup ───────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const c=canvasRef.current; if(!c)return
    c.width=window.innerWidth; c.height=window.innerHeight
  }, [])

  useEffect(() => {
    const dn=()=>setIsClicking(true); const up=()=>setIsClicking(false)
    window.addEventListener('mousedown',dn); window.addEventListener('mouseup',up)
    return () => { window.removeEventListener('mousedown',dn); window.removeEventListener('mouseup',up) }
  }, [])

  useEffect(() => {
    // Start menu ambient with crossfade — setAmbient fades out whatever was playing first
    try { AudioManager.setAmbient('menu-ambient.mp3', 1200) } catch (_) {}
    const t=setTimeout(() => {
      setMounted(true)
      if (_introWavePending) {
        _introWavePending=false
        setTimeout(() => { if(introWaveRef.current) introWaveRef.current() }, 800)
      }
    }, 100)
    return () => {
      clearTimeout(t)
      // Fade out menu ambient when leaving MainMenu
      try { AudioManager.setAmbient(null, 900) } catch (_) {}
    }
  }, [])

  useEffect(() => {
    const c=canvasRef.current; if(!c)return; resize()
    const stop=initDualCanvas(c, ()=>tintRef.current, introWaveRef)
    window.addEventListener('resize',resize)
    return () => { stop(); window.removeEventListener('resize',resize) }
  }, [resize])

  // ── Primary CTA handler ────────────────────────────────────────────────────
  const goContinue = () => {
    try { SoundEngine.pageTurn() } catch(_) {}
    navigate(SCREENS.STORY)
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Root ── */}
      <div style={{
        position:'fixed', inset:0, overflow:'hidden',
        userSelect:'none', cursor:'none',
        opacity:mounted?1:0, transition:'opacity 1s ease',
      }}>

        {/* BACKGROUNDS */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          {BACKGROUNDS.map((src,i) => {
            const isCurrent=i===bgIndex, isPrev=i===prevIndex
            if(!isCurrent&&!isPrev) return null
            return (
              <BgLayer key={src} src={src}
                panStartTime={isCurrent?panStartTime:panStartTime-9999999}
                opacity={isCurrent?1:0}
              />
            )
          })}
        </div>

        {/* AMBIENT GLOW */}
        <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:BG_GLOW[bgIndex], transition:'background 1.5s ease' }} />

        {/* GRADIENT — heavier at top/bottom for legibility */}
        <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
          background:'linear-gradient(to bottom,rgba(4,3,9,0.88) 0%,rgba(4,3,9,0.18) 22%,rgba(4,3,9,0.26) 50%,rgba(4,3,9,0.55) 80%,rgba(4,3,9,0.97) 100%)'
        }} />

        {/* RADIAL VIGNETTE */}
        <div style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none',
          background:'radial-gradient(ellipse at 50% 50%,transparent 32%,rgba(3,2,8,0.48) 100%)'
        }} />

        {/* DUST CANVAS */}
        <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:4, pointerEvents:'none' }} />

        {/* ── TOP BAR ── */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, zIndex:10,
          height:'clamp(52px,6.5vh,78px)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 clamp(1.2rem,2.5vw,3.2rem)',
          background:'linear-gradient(to bottom,rgba(3,2,8,0.92) 0%,transparent 100%)',
        }}>
          {/* Left: Settings + Return to Title + Prologue */}
          <div style={{ display:'flex', gap:'clamp(0.5rem,1vw,1.4rem)', alignItems:'center' }}>
            <LinkButton label="Settings" onClick={() => openSettings?.()} setIsHovering={setIsHovering} />
            <LinkButton label="Return to Title" onClick={() => { _introWavePending=true; navigate(SCREENS.ENTER) }} setIsHovering={setIsHovering} />
            <LinkButton
              label="Prologue"
              onClick={() => {
                localStorage.removeItem('ardenmoor:prologue_seen')
                navigate(SCREENS.OPENING, { afterPrologue: SCREENS.MAIN_MENU })
              }}
              setIsHovering={setIsHovering}
            />
          </div>

          {/* Right: resources (plan users only) */}
          <div style={{ display:'flex', gap:'clamp(0.8rem,1.4vw,1.8rem)', alignItems:'center' }}>
            {planState==='plan' && (
              <>
                <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
                  <span style={{ fontSize:'clamp(1rem,1.1vw,1.25rem)', lineHeight:1 }}>🔥</span>
                  <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.9rem,1vw,1.1rem)', letterSpacing:'0.08em', color:'rgba(228,188,82,0.96)' }}>{streak}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
                  <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(1rem,1.1vw,1.25rem)', color:'rgba(210,175,80,0.95)', lineHeight:1 }}>◈</span>
                  <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.9rem,1vw,1.1rem)', letterSpacing:'0.08em', color:'rgba(228,188,82,0.96)' }}>{coins}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
                  <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(1rem,1.1vw,1.25rem)', color:'rgba(155,128,218,0.92)', lineHeight:1 }}>✦</span>
                  <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.9rem,1vw,1.1rem)', letterSpacing:'0.08em', color:'rgba(200,175,118,0.94)' }}>{inscriptions}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── CENTER CONTENT — no card, text directly on atmospheric gradient ── */}
        <div style={{
          position:'absolute', inset:0, zIndex:6,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          paddingBottom:'clamp(1.5rem,3vh,4rem)',
          gap:'clamp(0.5rem,0.9vh,0.78rem)',
          pointerEvents:'none',
        }}>
          {/* Supertitle */}
          <div style={{
            fontFamily:'"Cinzel",serif',
            fontSize:'clamp(0.78rem,0.88vw,0.95rem)',
            letterSpacing:'0.45em', textTransform:'uppercase',
            color:'rgba(192,162,75,0.94)',
            textShadow:'0 2px 14px rgba(0,0,0,1),0 0 40px rgba(0,0,0,0.85)',
          }}>
            The Forgotten Codex
          </div>

          {/* Main title */}
          <div style={{
            fontFamily:'"Cinzel Decorative",serif',
            fontSize:'clamp(2.4rem,4.2vw,6rem)',
            fontWeight:700, lineHeight:1.05,
            color:'transparent',
            backgroundImage:'linear-gradient(180deg,#fff8d8 0%,#ecca50 18%,#b88018 45%,#986010 62%,#be8f28 78%,#f8e868 100%)',
            WebkitBackgroundClip:'text', backgroundClip:'text',
            filter:'drop-shadow(0 0 clamp(6px,0.8vw,18px) rgba(201,168,76,0.58)) drop-shadow(0 3px 16px rgba(0,0,0,1))',
            /* paddingRight prevents the last letter from being clipped by overflow:hidden + background-clip:text */
            paddingRight:'0.15em',
          }}>
            ARDENMOOR
          </div>

          <OrnamentalRule tint={tint} width='clamp(80px,12vw,220px)' />

          <div style={{
            fontFamily:'"Cinzel",serif',
            fontSize:'clamp(0.72rem,0.82vw,0.9rem)',
            letterSpacing:'0.3em', textTransform:'uppercase',
            color:'rgba(148,118,45,0.9)',
            textShadow:'0 2px 10px rgba(0,0,0,1)',
          }}>
            Est. The Age of Ruin
          </div>

          <div style={{ height:'clamp(0.35rem,0.7vh,0.55rem)' }} />

          {/* ── State-dependent content ── */}
          {planState==='plan' && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(0.55rem,0.9vh,0.78rem)', pointerEvents:'auto' }}>
              {/* Progress badge */}
              <div style={{
                fontFamily:'"Cinzel",serif',
                fontSize:'clamp(0.82rem,0.9vw,0.98rem)',
                letterSpacing:'0.18em', textTransform:'uppercase',
                color:'rgba(168,138,58,0.94)',
                padding:'0.22em 1em',
                border:'1px solid rgba(100,80,30,0.42)',
                borderRadius:'2px',
                background:'rgba(3,2,10,0.55)',
                textShadow:'0 1px 6px rgba(0,0,0,0.85)',
              }}>
                Act I · Week {currentWeekDisplay}
              </div>

              <div style={{ height:'clamp(0.15rem,0.3vh,0.28rem)' }} />

              {/* PRIMARY */}
              <GameButton label="Continue the Chronicle" onClick={goContinue} variant="primary" setIsHovering={setIsHovering} />

              {/* Check-In if not checked in today */}
              {!checkedInToday && (
                <GameButton
                  label="Daily Check-In"
                  sub="Track today's work"
                  onClick={() => navigate(SCREENS.CHECK_IN)}
                  variant="secondary"
                  setIsHovering={setIsHovering}
                />
              )}

              {/* Journal echoes — only if has entries */}
              {journalScenes.length>0 && (
                <GameButton label="Echoes" onClick={()=>setJournalOpen(o=>!o)} variant="secondary" setIsHovering={setIsHovering} />
              )}

              {/* GHOST — destructive */}
              <GameButton label="Start Anew" onClick={()=>setChangePlanOpen(true)} variant="ghost" setIsHovering={setIsHovering} />
            </div>
          )}

          {planState==='onboarding' && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(0.55rem,0.9vh,0.78rem)', pointerEvents:'auto' }}>
              <div style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.9rem,1vw,1.05rem)', color:'rgba(195,170,115,0.92)', lineHeight:1.75, textAlign:'center', maxWidth:'clamp(260px,32vw,420px)', textShadow:'0 2px 10px rgba(0,0,0,0.92)' }}>
                Your path through the Archive is being prepared.
              </div>
              <div style={{ height:'clamp(0.15rem,0.3vh,0.28rem)' }} />
              <GameButton label="Continue with Maren" onClick={()=>navigate(SCREENS.ONBOARDING)} variant="primary" setIsHovering={setIsHovering} />
              <GameButton label="Start Anew" onClick={()=>setChangePlanOpen(true)} variant="ghost" setIsHovering={setIsHovering} />
            </div>
          )}

          {planState==='new' && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(0.55rem,0.9vh,0.78rem)', pointerEvents:'auto' }}>
              <div style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.9rem,1vw,1.05rem)', color:'rgba(195,170,115,0.92)', lineHeight:1.78, textAlign:'center', maxWidth:'clamp(260px,32vw,420px)', textShadow:'0 2px 10px rgba(0,0,0,0.92)' }}>
                The Archive awaits. Speak with Maren to begin the chronicle.
              </div>
              <div style={{ height:'clamp(0.15rem,0.3vh,0.28rem)' }} />
              <GameButton label="Enter the Archive" onClick={()=>navigate(SCREENS.ONBOARDING)} variant="primary" setIsHovering={setIsHovering} />
              <GameButton label="Ancient Scrolls" onClick={()=>setPresetOpen(true)} variant="secondary" setIsHovering={setIsHovering} />
            </div>
          )}
        </div>

        {/* PROGRESS BAR */}
        <ProgressBar bgIndex={bgIndex} tint={tint} />

        {/* CURSOR */}
        <CursorOverlay isHovering={isHovering} isClicking={isClicking} />
      </div>

      {/* ── Scene Journal panel ────────────────────────────────────────── */}
      {journalOpen && (
        <div
          onClick={() => setJournalOpen(false)}
          style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(2,1,10,0.7)', backdropFilter:'blur(8px)' }}
        >
          <div
            onClick={e=>e.stopPropagation()}
            style={{
              position:'fixed', top:0, right:0, bottom:0,
              width:'clamp(300px,44vw,560px)',
              background:'rgba(4,3,14,0.99)',
              borderLeft:'1px solid rgba(120,95,32,0.38)',
              overflowY:'auto', scrollbarWidth:'none',
              display:'flex', flexDirection:'column',
              padding:'clamp(2rem,3.5vh,3rem) clamp(1.4rem,2.5vw,2.5rem)',
              gap:'clamp(0.5rem,1vh,0.8rem)',
              boxShadow:'-12px 0 60px rgba(0,0,0,0.65)',
            }}
          >
            <div style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.82rem,0.92vw,1rem)', letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(150,120,40,0.9)', marginBottom:'0.35rem', flexShrink:0 }}>
              Echoes
            </div>
            <div style={{ fontFamily:'"Cinzel Decorative",serif', fontSize:'clamp(1.2rem,1.6vw,1.85rem)', color:'transparent', backgroundImage:'linear-gradient(180deg,rgba(255,245,210,0.97) 0%,rgba(205,170,72,0.9) 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', flexShrink:0, letterSpacing:'0.04em', lineHeight:1.2 }}>
              Scenes Witnessed
            </div>
            <div style={{ height:'1px', background:'linear-gradient(to right,rgba(145,115,38,0.38),transparent)', marginBottom:'0.45rem', flexShrink:0 }} />

            {journalScenes.map((scene,i) => (
              <div key={scene.id||i} style={{
                padding:'clamp(0.65rem,1.2vh,1rem) clamp(0.8rem,1.2vw,1.1rem)',
                background:scene.type==='epoch'?'rgba(12,8,28,0.8)':'rgba(10,8,22,0.7)',
                border:`1px solid ${scene.type==='epoch'?'rgba(145,108,38,0.48)':scene.skipped?'rgba(78,62,28,0.28)':'rgba(105,84,30,0.36)'}`,
                borderLeft:scene.type==='epoch'?'3px solid rgba(201,168,76,0.58)':undefined,
                borderRadius:'2px',
                display:'flex', flexDirection:'column', gap:'0.32rem',
              }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'0.5rem' }}>
                  <div>
                    {scene.type==='epoch' && (
                      <div style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.72rem,0.82vw,0.88rem)', letterSpacing:'0.26em', textTransform:'uppercase', color:'rgba(178,145,55,0.88)', marginBottom:'0.2rem' }}>
                        Arc Epoch
                      </div>
                    )}
                    <div style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.9rem,1vw,1.1rem)', letterSpacing:'0.12em', textTransform:'uppercase', color:scene.skipped?'rgba(132,105,40,0.78)':scene.type==='epoch'?'rgba(242,212,130,0.98)':'rgba(218,184,82,0.95)', lineHeight:1.3 }}>
                      {scene.title}
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.45rem', flexShrink:0 }}>
                    {scene.skipped && (
                      <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.72rem,0.82vw,0.88rem)', letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(150,120,44,0.88)', border:'1px solid rgba(118,92,35,0.45)', padding:'0.16em 0.52em', borderRadius:'2px' }}>
                        Skipped
                      </span>
                    )}
                    {scene.id && (
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setJournalOpen(false)
                          if (scene.type==='epoch') {
                            navigate(SCREENS.STORY,{storyMode:'epoch',epochArcIdx:scene.arcIdx,isRevisit:true})
                          } else {
                            navigate(SCREENS.STORY,{storyMode:'revisit',segmentId:scene.id})
                          }
                        }}
                        style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.75rem,0.85vw,0.92rem)', letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(178,155,84,0.9)', background:'rgba(201,168,76,0.08)', border:'1px solid rgba(148,118,36,0.38)', borderRadius:'2px', padding:'0.22em 0.65em', cursor:'pointer', transition:'all 0.14s ease' }}
                        onMouseEnter={e=>{e.currentTarget.style.background='rgba(201,168,76,0.16)';e.currentTarget.style.borderColor='rgba(201,168,76,0.58)';e.currentTarget.style.color='rgba(232,200,112,0.97)'}}
                        onMouseLeave={e=>{e.currentTarget.style.background='rgba(201,168,76,0.07)';e.currentTarget.style.borderColor='rgba(148,118,36,0.33)';e.currentTarget.style.color='rgba(175,152,82,0.8)'}}
                      >
                        Revisit
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.88rem,0.98vw,1.04rem)', color:'rgba(185,165,115,0.88)', lineHeight:1.68 }}>
                  {scene.summary}
                </div>
              </div>
            ))}

            <button
              onClick={()=>setJournalOpen(false)}
              style={{ marginTop:'clamp(0.5rem,1.2vh,0.9rem)', fontFamily:'"Cinzel",serif', fontSize:'clamp(0.82rem,0.92vw,1rem)', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(152,134,102,0.9)', background:'transparent', border:'1px solid rgba(82,65,34,0.45)', borderRadius:'2px', padding:'0.55em 1.3em', cursor:'pointer', transition:'all 0.18s ease', alignSelf:'flex-start', flexShrink:0 }}
              onMouseEnter={e=>{e.currentTarget.style.color='rgba(188,168,118,0.97)';e.currentTarget.style.borderColor='rgba(118,98,52,0.65)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(152,134,102,0.9)';e.currentTarget.style.borderColor='rgba(82,65,34,0.45)'}}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Change Plan modal ─────────────────────────────────────────────── */}
      {changePlanOpen && !presetOpen && (
        <div
          onClick={()=>setChangePlanOpen(false)}
          style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(2,1,10,0.82)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(1rem,3vw,2rem)' }}
        >
          <div
            onClick={e=>e.stopPropagation()}
            style={{ position:'relative', width:'100%', maxWidth:'min(480px,92vw)', background:'linear-gradient(160deg,rgba(8,6,18,0.99) 0%,rgba(12,9,24,0.99) 100%)', border:'1px solid rgba(201,168,76,0.18)', borderRadius:'3px', padding:'clamp(1.6rem,3vw,2.4rem)', boxShadow:'0 24px 80px rgba(0,0,0,0.9),inset 0 0 40px rgba(201,168,76,0.012)' }}
          >
            {['tl','tr','bl','br'].map(pos=>(
              <div key={pos} style={{ position:'absolute', width:'10px', height:'10px', top:pos.startsWith('t')?'-1px':'auto', bottom:pos.startsWith('b')?'-1px':'auto', left:pos.endsWith('l')?'-1px':'auto', right:pos.endsWith('r')?'-1px':'auto', borderTop:pos.startsWith('t')?'1.5px solid rgba(201,168,76,0.42)':'none', borderBottom:pos.startsWith('b')?'1.5px solid rgba(201,168,76,0.42)':'none', borderLeft:pos.endsWith('l')?'1.5px solid rgba(201,168,76,0.42)':'none', borderRight:pos.endsWith('r')?'1.5px solid rgba(201,168,76,0.42)':'none', pointerEvents:'none' }} />
            ))}
            <h2 style={{ fontFamily:'"Cinzel",serif', fontWeight:600, fontSize:'clamp(1rem,1.3vw,1.35rem)', letterSpacing:'0.06em', color:'rgba(235,210,145,0.97)', margin:'0 0 0.45rem' }}>
              Start Anew
            </h2>
            <p style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.88rem,0.98vw,1.04rem)', color:'rgba(188,165,120,0.88)', margin:'0 0 1.6rem', lineHeight:1.65 }}>
              All progress — story, tasks, and plan — will be reset. This cannot be undone.
            </p>
            <button
              onClick={handleChangePlanMaren}
              style={{ display:'flex', flexDirection:'column', textAlign:'left', width:'100%', padding:'clamp(0.8rem,1.4vw,1.1rem) clamp(0.9rem,1.5vw,1.3rem)', background:'rgba(10,8,22,0.7)', border:'1px solid rgba(201,168,76,0.13)', borderRadius:'2px', marginBottom:'0.55rem', cursor:'pointer', transition:'all 0.15s ease', gap:'0.25rem' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.33)';e.currentTarget.style.background='rgba(201,168,76,0.04)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.13)';e.currentTarget.style.background='rgba(10,8,22,0.7)'}}
            >
              <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.9rem,1vw,1.1rem)', letterSpacing:'0.06em', color:'rgba(222,192,120,0.95)' }}>Speak with Maren</span>
              <span style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.85rem,0.95vw,1rem)', color:'rgba(178,158,110,0.88)', lineHeight:1.5 }}>Describe a new goal — Maren will build a personalised plan. Requires an OpenRouter key.</span>
            </button>
            <button
              onClick={()=>setPresetOpen(true)}
              style={{ display:'flex', flexDirection:'column', textAlign:'left', width:'100%', padding:'clamp(0.8rem,1.4vw,1.1rem) clamp(0.9rem,1.5vw,1.3rem)', background:'rgba(10,8,22,0.7)', border:'1px solid rgba(201,168,76,0.13)', borderRadius:'2px', marginBottom:'1.2rem', cursor:'pointer', transition:'all 0.15s ease', gap:'0.25rem' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.33)';e.currentTarget.style.background='rgba(201,168,76,0.04)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.13)';e.currentTarget.style.background='rgba(10,8,22,0.7)'}}
            >
              <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.9rem,1vw,1.1rem)', letterSpacing:'0.06em', color:'rgba(222,192,120,0.95)' }}>Choose from the Ancient Scrolls</span>
              <span style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.85rem,0.95vw,1rem)', color:'rgba(178,158,110,0.88)', lineHeight:1.5 }}>Begin with a prebuilt path. No API key required.</span>
            </button>
            <button
              onClick={()=>setChangePlanOpen(false)}
              style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.82rem,0.92vw,1rem)', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(152,130,75,0.85)', background:'transparent', border:'none', cursor:'pointer', transition:'color 0.15s ease', padding:'0.25em 0', display:'block', margin:'0 auto' }}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(182,158,85,0.97)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(152,130,75,0.85)'}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Preset selector ───────────────────────────────────────────────── */}
      {presetOpen && (
        <PresetSelectorPanel
          mode={planState==='plan'||planState==='onboarding'?'change':'fresh'}
          onConfirm={planState==='plan'||planState==='onboarding'?handleChangePlanPreset:handleFreshPresetConfirm}
          onBack={() => {
            setPresetOpen(false)
            if (planState==='plan'||planState==='onboarding') setChangePlanOpen(true)
          }}
        />
      )}

      {/* Responsive: center content handles all sizing via clamp() — no card CSS needed */}
    </>
  )
}
