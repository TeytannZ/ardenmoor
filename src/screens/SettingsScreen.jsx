import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SCREENS, BackButton } from '../App.jsx'
import { AudioManager, SoundEngine } from '../lib/audio.js'
import { storage } from '../lib/storage.js'
import { signOut } from '../lib/supabase.js'
import ConfirmModal from '../components/ConfirmModal.jsx'

// ─── SettingsScreen — Phase 11 (redesigned + functional) ─────────────────────
//
// All settings apply IMMEDIATELY — no Save button.
//
// Audio:
//   SFX volume    → SoundEngine.setVolume(v)
//   Ambient       → AudioManager.setAmbientVolume(v)
//   Voice         → AudioManager.setVoVolume(v)
//   Music         → AudioManager.setMusicVolume(v)
//   Mute All      → AudioManager.mute/unmute() + SoundEngine.mute/unmute()
//
// Interface:
//   Skip Enter Screen → stored in settings, read by App.jsx session restore
//
// Account:
//   Sign Out → supabase signOut() + clear auth from session
//              Chronicle + deed progress stay in localStorage
//
// Data:
//   Clear Chronicle → wipes chronicle/deeds/checkins only, auth stays
//
// Responsive: single centered column, max-width 640px, clamp() everywhere
// Background: reuses auth-wide images (no new assets needed)
// ─────────────────────────────────────────────────────────────────────────────

const _BASE = import.meta.env.BASE_URL
const BG_IMAGES = [
  `${_BASE}assets/images/ui/auth-wide-1.jpg`,
  `${_BASE}assets/images/ui/auth-wide-2.jpg`,
  `${_BASE}assets/images/ui/auth-wide-3.jpg`,
]
const PAN_SPEED  = 5
const IMG_ASPECT = 2.4

const sfxHover  = () => { try { SoundEngine.uiHover()      } catch (_) {} }
const sfxClick  = () => { try { SoundEngine.uiClick()      } catch (_) {} }
const sfxToggle = () => { try { SoundEngine.deedComplete() } catch (_) {} }

// ── Panning background ────────────────────────────────────────────────────────
function PanBg() {
  const ref = useRef(null)
  const t0  = useRef(performance.now())
  const idx = useRef(0)
  useEffect(() => {
    let raf
    const tick = (now) => {
      if (ref.current) {
        const extraW = Math.max(window.innerHeight * IMG_ASPECT - window.innerWidth, 1)
        let pct = ((now - t0.current) / 1000 * PAN_SPEED / extraW) * 100
        if (pct >= 100) { t0.current = now; idx.current = (idx.current + 1) % BG_IMAGES.length; ref.current.style.backgroundImage = `url(${BG_IMAGES[idx.current]})`; pct = 0 }
        ref.current.style.backgroundPositionX = `${pct}%`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:0 }}>
      <div ref={ref} style={{
        position:'absolute', inset:0,
        backgroundImage:`url(${BG_IMAGES[0]})`,
        backgroundSize:'cover', backgroundPositionX:'0%', backgroundPositionY:'center',
        backgroundColor:'#07060f',
        filter:'brightness(0.38) saturate(0.5)',
        willChange:'background-position-x',
      }}/>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 50% 45%, rgba(5,4,14,0.6) 0%, rgba(5,4,14,0.97) 100%)' }}/>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'linear-gradient(to bottom,rgba(5,4,14,0.85) 0%,transparent 10%,transparent 88%,rgba(5,4,14,0.96) 100%)' }}/>
    </div>
  )
}

// ── Ambient dust ──────────────────────────────────────────────────────────────
function DustCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const pts = Array.from({ length: 28 }, () => ({
      x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
      r: Math.random()*1.2+0.2, vx:(Math.random()-.5)*.05, vy:-(Math.random()*.05+.008),
      life:Math.random()*200, max:Math.random()*160+100,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.life++
        if(p.life>p.max||p.y<-4){ p.x=Math.random()*canvas.width; p.y=canvas.height+4; p.life=0 }
        const a = Math.sin((p.life/p.max)*Math.PI)*0.28
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(201,168,76,${a})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none' }}/>
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ title }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'0.85rem',
      marginBottom:'clamp(0.8rem,1.3vh,1.05rem)',
      marginTop:'clamp(2rem,3.5vh,3rem)',
    }}>
      <div style={{ width:'3px', height:'clamp(12px,1.6vh,17px)', background:'rgba(201,168,76,0.72)', flexShrink:0, borderRadius:'1px' }}/>
      <span style={{
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.82rem,0.88vw,0.96rem)',
        letterSpacing:'0.35em', textTransform:'uppercase',
        color:'rgba(215,182,90,0.95)', flexShrink:0,
        textShadow:'0 0 12px rgba(201,168,76,0.18)',
      }}>
        {title}
      </span>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(201,168,76,0.35),transparent)' }}/>
    </div>
  )
}

// ── Volume row ────────────────────────────────────────────────────────────────
function VolumeRow({ label, value, onChange, disabled }) {
  const [active, setActive] = useState(false)
  const pct = Math.round((value ?? 0) * 100)

  return (
    <div style={{
      display:'flex', alignItems:'center',
      gap:'clamp(0.9rem,1.6vw,1.5rem)',
      padding:'clamp(0.62rem,1vh,0.82rem) 0',
      borderBottom:'1px solid rgba(255,255,255,0.035)',
      opacity: disabled ? 0.45 : 1,
      transition:'opacity 0.2s',
    }}>
      {/* Label */}
      <span style={{
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.82rem,0.88vw,0.96rem)',
        letterSpacing:'0.14em', textTransform:'uppercase',
        color:'rgba(215,185,110,0.95)',
        width:'clamp(60px,7vw,96px)', flexShrink:0,
      }}>
        {label}
      </span>

      {/* Track + native range */}
      <div style={{ flex:1, position:'relative', height:'clamp(26px,3vh,34px)', display:'flex', alignItems:'center' }}>
        {/* Background track */}
        <div style={{ position:'absolute',left:0,right:0,height:'clamp(2px,0.28vh,3px)',background:'rgba(255,255,255,0.07)',borderRadius:'2px',overflow:'hidden' }}>
          <div style={{
            height:'100%', width:`${pct}%`, borderRadius:'2px',
            background:`linear-gradient(to right,rgba(120,92,22,0.75),${active?'rgba(240,200,80,1)':'rgba(201,168,76,0.92)'})`,
            boxShadow:active?'0 0 8px rgba(201,168,76,0.5)':'none',
            transition:'background 0.12s',
          }}/>
        </div>
        {/* Thumb */}
        <div style={{
          position:'absolute',
          left:`calc(${pct}% - clamp(7px,0.7vw,9px))`,
          width:'clamp(14px,1.4vw,18px)', height:'clamp(14px,1.4vw,18px)',
          borderRadius:'50%',
          background:active?'#f0d868':'rgba(201,168,76,0.9)',
          border:'2px solid rgba(4,3,12,0.9)',
          boxShadow:active?'0 0 12px rgba(201,168,76,0.6)':'0 1px 5px rgba(0,0,0,0.7)',
          transition:'background 0.12s, box-shadow 0.12s',
          pointerEvents:'none',
        }}/>
        {/* Invisible native input on top */}
        <input
          type="range" min={0} max={1} step={0.01}
          value={value ?? 0}
          disabled={disabled}
          onChange={e => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setActive(true)}
          onMouseUp={()   => setActive(false)}
          onTouchStart={() => setActive(true)}
          onTouchEnd={()   => setActive(false)}
          style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0,cursor:disabled?'default':'pointer',margin:0,zIndex:2 }}
        />
      </div>

      {/* Value */}
      <span style={{
        fontFamily:'"Cinzel Decorative",serif',
        fontSize:'clamp(0.82rem,0.88vw,0.96rem)',
        color: pct > 0 ? 'rgba(201,168,76,0.82)' : 'rgba(100,78,22,0.45)',
        width:'clamp(26px,2.8vw,36px)', textAlign:'right', flexShrink:0,
        transition:'color 0.12s',
      }}>
        {pct}
      </span>
    </div>
  )
}

// ── Toggle row ────────────────────────────────────────────────────────────────
function ToggleRow({ label, description, value, onChange }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={() => { sfxToggle(); onChange(!value) }}
      onMouseEnter={() => { setHov(true); sfxHover() }}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        gap:'clamp(1rem,2vw,2rem)',
        padding:'clamp(0.78rem,1.25vh,1.05rem) clamp(0.95rem,1.5vw,1.3rem)',
        background: hov ? 'rgba(14,11,30,0.75)' : 'rgba(8,6,20,0.6)',
        borderTop:`1px solid ${value ? 'rgba(201,168,76,0.32)' : hov ? 'rgba(80,62,14,0.5)' : 'rgba(48,36,10,0.3)'}`,
        borderRight:`1px solid ${value ? 'rgba(201,168,76,0.32)' : hov ? 'rgba(80,62,14,0.5)' : 'rgba(48,36,10,0.3)'}`,
        borderBottom:`1px solid ${value ? 'rgba(201,168,76,0.32)' : hov ? 'rgba(80,62,14,0.5)' : 'rgba(48,36,10,0.3)'}`,
        borderLeft:`2px solid ${value ? 'rgba(201,168,76,0.72)' : 'rgba(58,44,12,0.32)'}`,
        borderRadius:'0 2px 2px 0',
        cursor:'pointer', transition:'all 0.18s', backdropFilter:'blur(6px)',
      }}
    >
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontFamily:'"Cinzel",serif',
          fontSize:'clamp(0.72rem,0.84vw,0.94rem)',
          letterSpacing:'0.16em', textTransform:'uppercase',
          color: value ? 'rgba(225,192,100,0.98)' : 'rgba(195,165,95,0.9)',
          marginBottom: description ? '0.25rem' : 0, transition:'color 0.18s',
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontFamily:'"Lora",serif', fontStyle:'italic',
            fontSize:'clamp(0.8rem,0.9vw,0.98rem)',
            color:'rgba(210,188,142,0.88)', lineHeight:1.65,
            marginTop:'0.15rem',
          }}>
            {description}
          </div>
        )}
      </div>
      {/* Pill */}
      <div style={{
        flexShrink:0,
        width:'clamp(40px,4vw,50px)', height:'clamp(21px,2.1vw,27px)',
        borderRadius:'999px',
        background: value ? 'rgba(201,168,76,0.18)' : 'rgba(255,255,255,0.04)',
        border:`1.5px solid ${value ? 'rgba(201,168,76,0.68)' : 'rgba(78,60,14,0.42)'}`,
        position:'relative', transition:'all 0.22s',
        boxShadow: value ? '0 0 10px rgba(201,168,76,0.18)' : 'none',
      }}>
        <div style={{
          position:'absolute', top:'50%', transform:'translateY(-50%)',
          left: value ? 'calc(100% - clamp(17px,1.7vw,21px) - 2px)' : '2px',
          width:'clamp(15px,1.5vw,19px)', height:'clamp(15px,1.5vw,19px)',
          borderRadius:'50%',
          background: value ? 'rgba(201,168,76,0.95)' : 'rgba(105,82,20,0.42)',
          boxShadow: value ? '0 0 8px rgba(201,168,76,0.42)' : 'none',
          transition:'all 0.22s',
        }}/>
      </div>
    </div>
  )
}

// ── API key change row ────────────────────────────────────────────────────────
function ApiKeyRow({ value, onChange }) {
  const [local,   setLocal]   = useState(value || '')
  const [shown,   setShown]   = useState(false)
  const [focused, setFocused] = useState(false)
  const [saved,   setSaved]   = useState(false)
  const timer = useRef(null)

  const handleSave = () => {
    const trimmed = local.trim()
    if (trimmed && trimmed !== value) {
      onChange(trimmed)
      clearTimeout(timer.current)
      setSaved(true)
      timer.current = setTimeout(() => setSaved(false), 2200)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSave(); e.target.blur() }
  }

  const borderC = focused ? 'rgba(201,168,76,0.55)' : local ? 'rgba(120,94,24,0.45)' : 'rgba(58,44,12,0.3)'

  return (
    <div style={{
      background:'rgba(7,5,20,0.72)', backdropFilter:'blur(8px)',
      border:`1px solid ${borderC}`,
      borderLeft:`2px solid ${focused ? 'rgba(201,168,76,0.72)' : local ? 'rgba(140,108,28,0.5)' : 'rgba(58,44,12,0.32)'}`,
      borderRadius:'0 2px 2px 0',
      padding:'clamp(0.9rem,1.5vh,1.2rem) clamp(1rem,1.6vw,1.4rem)',
      transition:'border-color 0.2s',
    }}>
      <div style={{
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.72rem,0.84vw,0.94rem)',
        letterSpacing:'0.16em', textTransform:'uppercase',
        color:'rgba(200,168,88,0.92)',
        marginBottom:'0.6rem',
      }}>
        OpenRouter API Key
      </div>
      <div style={{
        fontFamily:'"Lora",serif', fontStyle:'italic',
        fontSize:'clamp(0.78rem,0.88vw,0.96rem)',
        color:'rgba(185,158,95,0.85)', lineHeight:1.65,
        marginBottom:'0.9rem',
      }}>
        Update the cipher bound to your Chronicle. Changes take effect immediately.
      </div>
      <div style={{ display:'flex', gap:'0.6rem', alignItems:'center' }}>
        <input
          type={shown ? 'text' : 'password'}
          value={local}
          onChange={e => setLocal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); handleSave() }}
          onKeyDown={handleKeyDown}
          placeholder={value ? '••••••••••••••••••••••••' : 'sk-or-v1-...'}
          style={{
            flex:1,
            background:'rgba(4,3,14,0.8)', border:'none',
            padding:'clamp(0.55em,0.88vh,0.72em) clamp(0.75em,1.1vw,1em)',
            fontFamily:'"Lora",serif',
            fontSize:'clamp(0.8rem,0.9vw,0.98rem)',
            color:'rgba(225,195,128,0.95)',
            outline:'none', borderRadius:'2px',
          }}
        />
        <button
          onClick={() => setShown(s => !s)}
          onMouseEnter={sfxHover}
          style={{
            flexShrink:0, background:'rgba(4,3,12,0.7)',
            border:'1px solid rgba(78,60,14,0.38)', borderRadius:'2px',
            padding:'clamp(0.45em,0.72vh,0.62em) clamp(0.6em,0.9vw,0.82em)',
            cursor:'pointer', color:'rgba(175,142,58,0.88)',
            transition:'all 0.18s',
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor='rgba(175,142,52,0.6)'; e.currentTarget.style.color='rgba(225,185,80,1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(78,60,14,0.38)'; e.currentTarget.style.color='rgba(175,142,58,0.88)' }}
        >
          {shown
            ? <svg width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2"/><line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            : <svg width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg>
          }
        </button>
      </div>
      <div style={{
        marginTop:'0.5rem',
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.82rem,0.88vw,0.96rem)',
        letterSpacing:'0.22em', textTransform:'uppercase',
        color:'rgba(201,168,76,0.88)',
        opacity: saved ? 1 : 0, transition:'opacity 0.3s ease',
      }}>
        ✦ Cipher updated
      </div>
    </div>
  )
}


// ── Action row ────────────────────────────────────────────────────────────────
function ActionRow({ label, description, onClick, danger = false }) {
  const [hov, setHov] = useState(false)
  const bord = danger
    ? (hov ? 'rgba(185,55,38,0.7)'  : 'rgba(120,35,22,0.42)')
    : (hov ? 'rgba(201,168,76,0.6)' : 'rgba(88,68,18,0.38)')
  const textC = danger
    ? (hov ? 'rgba(240,155,132,0.98)' : 'rgba(195,95,75,0.82)')
    : (hov ? 'rgba(225,190,82,0.98)'  : 'rgba(180,148,58,0.82)')
  return (
    <button
      onClick={() => { sfxClick(); onClick() }}
      onMouseEnter={() => { setHov(true); sfxHover() }}
      onMouseLeave={() => setHov(false)}
      style={{
        width:'100%', textAlign:'left',
        display:'flex', alignItems:'center',
        gap:'clamp(0.7rem,1.1vw,1rem)',
        padding:'clamp(0.78rem,1.25vh,1.05rem) clamp(0.95rem,1.5vw,1.3rem)',
        background: hov
          ? (danger ? 'rgba(34,5,3,0.72)' : 'rgba(14,11,30,0.75)')
          : 'rgba(8,6,20,0.6)',
        border:`1px solid ${bord}`,
        borderLeft:`2px solid ${bord}`,
        borderRadius:'0 2px 2px 0',
        cursor:'pointer', transition:'all 0.18s', backdropFilter:'blur(6px)',
      }}
    >
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontFamily:'"Cinzel",serif',
          fontSize:'clamp(0.72rem,0.84vw,0.94rem)',
          letterSpacing:'0.16em', textTransform:'uppercase',
          color:textC, transition:'color 0.18s',
          marginBottom: description ? '0.25rem' : 0,
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontFamily:'"Lora",serif', fontStyle:'italic',
            fontSize:'clamp(0.8rem,0.9vw,0.98rem)',
            color:'rgba(208,185,138,0.88)', lineHeight:1.65,
            marginTop:'0.15rem',
          }}>
            {description}
          </div>
        )}
      </div>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink:0, opacity:hov?0.75:0.28, transition:'opacity 0.18s' }}>
        <path d="M3 2L7 5L3 8" stroke={danger?'rgba(200,100,80,0.9)':'rgba(201,168,76,0.9)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SettingsScreen({ appState, navigate, updateState }) {
  const [mounted,  setMounted]  = useState(false)
  const [settings, setSettings] = useState(() => storage.getSettings())
  const [flash,    setFlash]    = useState(false)
  const [dialog,   setDialog]   = useState(null)  // null | 'signout' | 'cleardata'
  const flashRef = useRef(null)

  const user = appState.user

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  // ── Apply EVERY setting live as soon as it changes ─────────────────────────
  useEffect(() => {
    const s = settings
    const muted = s.muted ?? false

    // SFX
    try {
      SoundEngine.setVolume(muted ? 0 : (s.sfxVolume ?? 0.6))
      if (muted) SoundEngine.mute?.()
      else       SoundEngine.unmute?.()
    } catch (_) {}

    // AudioManager
    try {
      AudioManager.setAmbientVolume(muted ? 0 : (s.ambientVolume ?? 0.3))
      AudioManager.setMusicVolume(muted   ? 0 : (s.musicVolume   ?? 0.45))
      AudioManager.setVoVolume(muted      ? 0 : (s.voVolume      ?? 0.9))
      if (muted) AudioManager.mute?.()
      else       AudioManager.unmute?.()
    } catch (_) {}

    // Persist
    storage.saveSettings(s)

    // Flash saved indicator
    clearTimeout(flashRef.current)
    setFlash(true)
    flashRef.current = setTimeout(() => setFlash(false), 1000)

    return () => clearTimeout(flashRef.current)
  }, [settings])

  const update = useCallback((key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }))
  }, [])

  // ── Sign Out ───────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    setDialog(null)
    try { await signOut() } catch (_) {}
    // Keep chronicle in storage — just remove auth
    const saved = storage.getSession() || {}
    storage.saveSession({ ...saved, user: null, rememberMe: false })
    updateState({ user: null })
    navigate(SCREENS.ENTER)
  }

  // ── Clear ALL data (plan, onboarding, story, session — full reset) ───────
  const handleClearData = () => {
    setDialog(null)
    storage.clearAll()          // wipes every ardenmoor:* key
    updateState({ user: null })
    navigate(SCREENS.ENTER)
  }

  return (
    <div style={{
      position:'fixed', inset:0, overflow:'hidden',
      opacity: mounted ? 1 : 0, transition:'opacity 0.55s ease',
    }}>
      <PanBg/>
      <DustCanvas/>
      <BackButton navigate={navigate} from={SCREENS.SETTINGS}/>

      {/* Saved flash — top right */}
      <div style={{
        position:'fixed',
        top:'clamp(1rem,1.8vh,1.5rem)',
        right:'clamp(1rem,2vw,2rem)',
        zIndex:20, pointerEvents:'none',
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.82rem,0.88vw,0.96rem)',
        letterSpacing:'0.22em', textTransform:'uppercase',
        color:'rgba(201,168,76,0.72)',
        opacity: flash ? 1 : 0,
        transition:'opacity 0.28s ease',
      }}>
        ✦ Saved
      </div>

      {/* Centered scrollable column */}
      <div style={{
        position:'relative', zIndex:3,
        height:'100vh', overflowY:'auto',
        scrollbarWidth:'thin', scrollbarColor:'rgba(88,68,19,0.35) transparent',
        display:'flex', flexDirection:'column', alignItems:'center',
        padding:'clamp(4.5rem,8vh,6rem) clamp(1rem,4vw,2.5rem) clamp(2rem,5vh,3.5rem)',
      }}>
        <div style={{ width:'100%', maxWidth:'clamp(300px,56vw,640px)' }}>

          {/* ── Page header ────────────────────────────────────────────────── */}
          <div style={{ marginBottom:'clamp(0.5rem,1vh,0.8rem)' }}>
            <div style={{
              fontFamily:'"Cinzel",serif',
              fontSize:'clamp(0.65rem,0.78vw,0.88rem)',
              letterSpacing:'0.35em', textTransform:'uppercase',
              color:'rgba(200,165,72,0.95)', marginBottom:'0.45rem',
            }}>
              Configuration
            </div>
            <h1 style={{
              fontFamily:'"Cinzel Decorative",serif',
              fontSize:'clamp(1.6rem,2.6vw,3.4rem)', fontWeight:700, margin:0,
              color:'transparent',
              backgroundImage:'linear-gradient(160deg,#fff8d8 0%,#ecca50 22%,#b88018 55%,#f8e868 100%)',
              WebkitBackgroundClip:'text', backgroundClip:'text',
              filter:'drop-shadow(0 0 18px rgba(201,168,76,0.28))',
              letterSpacing:'0.06em', padding:'0 0.1em 0.06em 0',
            }}>
              Settings
            </h1>
            {user?.username && (
              <div style={{
                fontFamily:'"Lora",serif', fontStyle:'italic',
                fontSize:'clamp(0.84rem,0.96vw,1.05rem)',
                color:'rgba(185,155,80,0.88)', marginTop:'0.3rem',
              }}>
                Bound to the Archive as <span style={{ color:'rgba(200,168,88,0.82)' }}>{user.username}</span>
              </div>
            )}
          </div>

          {/* ── AUDIO ─────────────────────────────────────────────────────── */}
          <SectionLabel title="Audio"/>
          <div style={{
            background:'rgba(10,8,26,0.80)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(58,44,12,0.38)',
            borderLeft:'2px solid rgba(120,94,22,0.38)',
            padding:'0 clamp(1rem,1.6vw,1.4rem)',
            marginBottom:'clamp(0.6rem,1vh,0.85rem)',
          }}>
            <VolumeRow label="SFX"     value={settings.sfxVolume     ?? 0.6}  onChange={v => update('sfxVolume', v)}     disabled={settings.muted}/>
            <VolumeRow label="Ambient" value={settings.ambientVolume  ?? 0.3}  onChange={v => update('ambientVolume', v)} disabled={settings.muted}/>
            <VolumeRow label="Voice"   value={settings.voVolume       ?? 0.9}  onChange={v => update('voVolume', v)}      disabled={settings.muted}/>
            <VolumeRow label="Music"   value={settings.musicVolume    ?? 0.45} onChange={v => update('musicVolume', v)}   disabled={settings.muted} />
          </div>
          <ToggleRow
            label="Mute All"
            description="Silence every sound in the Archive instantly."
            value={settings.muted ?? false}
            onChange={v => update('muted', v)}
          />

          {/* ── ACCOUNT ───────────────────────────────────────────────────── */}
          <SectionLabel title="Account"/>
          <div style={{ display:'flex', flexDirection:'column', gap:'clamp(0.38rem,0.6vh,0.52rem)' }}>
            <ApiKeyRow
              value={settings.apiKey || ''}
              onChange={v => {
                const next = { ...settings, apiKey: v }
                setSettings(next)
                storage.saveSettings(next)
              }}
            />
            <ActionRow
              label="Sign Out"
              description="Leave the Archive. Your Chronicle and all progress remain saved."
              onClick={() => setDialog('signout')}
            />
          </div>

          {/* ── DATA ──────────────────────────────────────────────────────── */}
          <SectionLabel title="Data"/>
          <div style={{ display:'flex', flexDirection:'column', gap:'clamp(0.38rem,0.6vh,0.52rem)' }}>
            <ActionRow
              label="Reset All Data"
              description="Erase all local data — plan, chronicle, onboarding, story progress, and session. Starts completely fresh."
              danger
              onClick={() => setDialog('cleardata')}
            />
          </div>

          {/* Version line */}
          <div style={{
            fontFamily:'"Cinzel",serif',
            fontSize:'clamp(0.62rem,0.7vw,0.78rem)',
            letterSpacing:'0.22em', color:'rgba(170,138,52,0.88)',
            textAlign:'right', marginTop:'clamp(1.5rem,3vh,2.5rem)',
          }}>
            Ardenmoor · Changes save automatically
          </div>

        </div>
      </div>

      {dialog === 'signout' && (
        <ConfirmModal
          type="warning"
          eyebrow="Leaving the Archive"
          title="Sign Out"
          body="You will be signed out. Your Chronicle and all progress remain saved and will be waiting when you return."
          confirmLabel="Sign Out"
          cancelLabel="Stay"
          zIndex={60}
          onConfirm={handleSignOut}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog === 'cleardata' && (
        <ConfirmModal
          type="danger"
          eyebrow="Irreversible Action"
          title="Reset All Data"
          body="Everything will be erased — your plan, chronicle progress, onboarding conversation, and story progress. You will start completely fresh. This cannot be undone."
          confirmLabel="Reset Everything"
          cancelLabel="Keep Everything"
          zIndex={60}
          onConfirm={handleClearData}
          onCancel={() => setDialog(null)}
        />
      )}
    </div>
  )
}
