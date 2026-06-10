// ─── PresetSelectorPanel.jsx ──────────────────────────────────────────────────
// Presents the single prebuilt plan. No selection — one plan, one path.
// Used in two places:
//   • OnboardingScreen — when user hits the API key gate and clicks "Use Prebuilt Plan"
//   • MainMenu         — when user clicks "Start Anew" → "Ancient Scrolls"
//
// Props:
//   onConfirm()      — parent loads the plan and navigates
//   onBack()         — called when user wants to go back
//   mode: 'fresh'|'change'
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react'
import { PRESET_PLANS } from '../lib/presets.js'
import { SoundEngine } from '../lib/audio.js'

const sfxHover  = () => { try { SoundEngine.uiHover()  } catch (_) {} }
const sfxClick  = () => { try { SoundEngine.uiClick()  } catch (_) {} }
const sfxConfirm= () => { try { SoundEngine.pageTurn() } catch (_) {} }

// ─── Ambient dust particles ───────────────────────────────────────────────────
function AmbientDust() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const ctx = canvas.getContext('2d')
    const MOTES = 45
    const make = () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22, vy: -(Math.random() * 0.15 + 0.04),
      wobbleAmp: 0.15 + Math.random() * 0.28, wobbleFreq: 0.003 + Math.random() * 0.007,
      wobblePhase: Math.random() * Math.PI * 2,
      r: Math.random() * 1.8 + 0.25, life: Math.random() * 240, maxLife: 180 + Math.random() * 260,
    })
    const motes = Array.from({ length: MOTES }, make)
    let raf, lastT = null
    const draw = (ts) => {
      const dt = lastT ? Math.min((ts - lastT) / 16.67, 3) : 1; lastT = ts
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const m of motes) {
        m.life += dt
        if (m.life >= m.maxLife) { Object.assign(m, make(), { life: 0 }); continue }
        const t = m.life / m.maxLife
        const a = t < 0.2 ? t / 0.2 : t > 0.75 ? (1 - t) / 0.25 : 1
        m.wobblePhase += m.wobbleFreq * dt
        m.x += (m.vx + Math.sin(m.wobblePhase) * m.wobbleAmp) * dt
        m.y += m.vy * dt
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${a * 0.38})`; ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }} />
}

// ─── Lamplight pulse ──────────────────────────────────────────────────────────
function LamplightGlow() {
  return (
    <div style={{
      position:'absolute', bottom:0, left:'20%', right:'20%', height:'220px',
      background:'radial-gradient(ellipse at 50% 100%, rgba(201,148,30,0.18) 0%, rgba(180,110,20,0.08) 45%, transparent 75%)',
      pointerEvents:'none', zIndex:2, animation:'pspLamp 4.5s ease-in-out infinite alternate',
    }} />
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function PresetSelectorPanel({ onConfirm, onBack, mode = 'fresh' }) {
  const [confirming, setConfirming] = useState(false)
  const plan = PRESET_PLANS[0]

  const handleConfirm = () => {
    if (confirming) return
    sfxConfirm()
    setConfirming(true)
    setTimeout(() => onConfirm(plan.phaseNumber), 320)
  }

  const months = Math.round((plan?.totalWeeks || 16) / 4)

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:500,
      background:'#03020c', overflowY:'auto',
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'clamp(1.5rem,3vh,3rem) clamp(1rem,3vw,2rem)',
      opacity: confirming ? 0 : 1, transition:'opacity 0.32s ease',
    }}>

      <style>{`
        @keyframes pspKenBurns { from { transform: scale(1.0); } to { transform: scale(1.06) translateX(-12px); } }
        @keyframes pspLamp     { from { opacity: 0.65; }         to { opacity: 1.0; } }
      `}</style>

      {/* ── Atmospheric background ─────────────────────────────────────────── */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:`url('${import.meta.env.BASE_URL}assets/images/backgrounds/onboarding-archive-night.jpg')`,
          backgroundSize:'cover', backgroundPosition:'center',
          filter:'brightness(0.22) saturate(0.6)',
          animation:'pspKenBurns 40s ease-in-out infinite alternate',
        }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, transparent 15%, rgba(2,1,10,0.88) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(2,1,10,0.75) 0%, transparent 30%, transparent 60%, rgba(2,1,10,0.85) 100%)' }} />
        <AmbientDust />
        <LamplightGlow />
      </div>

      {/* ── Back button ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => { sfxClick(); onBack() }}
        style={{
          position:'fixed', top:'clamp(0.9rem,1.6vh,1.4rem)', left:'clamp(0.9rem,1.6vw,1.4rem)',
          zIndex:600, display:'flex', alignItems:'center', gap:'0.45rem',
          background:'rgba(10,8,18,0.82)', border:'1px solid rgba(155,122,38,0.45)',
          borderRadius:'2px', padding:'0.5em 1em 0.5em 0.75em',
          cursor:'pointer', backdropFilter:'blur(8px)', transition:'all 0.18s ease',
          boxShadow:'0 2px 16px rgba(0,0,0,0.6)',
        }}
        onMouseEnter={e => { sfxHover(); e.currentTarget.style.background='rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.65)' }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(10,8,18,0.82)'; e.currentTarget.style.borderColor='rgba(155,122,38,0.45)' }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M8 2L4 6L8 10" stroke="rgba(218,182,88,0.88)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.54rem,0.62vw,0.68rem)', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(218,182,88,0.85)' }}>
          Back
        </span>
      </button>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div style={{ width:'100%', maxWidth:'min(680px,92vw)', paddingTop:'clamp(3rem,6vh,5rem)', position:'relative', zIndex:10 }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'clamp(1.6rem,3vh,2.4rem)' }}>
          <div style={{
            width:'8px', height:'8px', borderRadius:'1px',
            background:'rgba(201,168,76,0.7)', transform:'rotate(45deg)',
            margin:'0 auto 1.2rem', boxShadow:'0 0 14px rgba(201,168,76,0.4)',
          }} />
          <h1 style={{
            fontFamily:'"Cinzel Decorative",serif',
            fontSize:'clamp(1rem,2vw,1.75rem)', color:'transparent',
            backgroundImage:'linear-gradient(180deg, rgba(255,245,210,0.95) 0%, rgba(200,165,70,0.9) 100%)',
            WebkitBackgroundClip:'text', backgroundClip:'text',
            letterSpacing:'0.06em', margin:'0 0 0.65rem',
          }}>
            The Forgotten Codex
          </h1>
          <p style={{
            fontFamily:'"Lora",serif', fontStyle:'italic',
            fontSize:'clamp(0.78rem,0.9vw,0.96rem)', color:'rgba(185,165,115,0.72)',
            lineHeight:1.65, margin:'0 auto', maxWidth:'480px',
          }}>
            {mode === 'change'
              ? 'A prebuilt path through Act I. Your current plan will be replaced.'
              : 'A prebuilt path for Seekers who prefer a known road. No API key required.'}
          </p>
        </div>

        <div style={{ height:'1px', background:'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)', marginBottom:'clamp(1.4rem,2.5vh,2rem)' }} />

        {/* ── Plan card ─────────────────────────────────────────────────────── */}
        <div style={{
          padding:'clamp(1.1rem,2vw,1.6rem) clamp(1.1rem,2vw,1.8rem)',
          background:'rgba(201,168,76,0.04)',
          border:'1px solid rgba(201,168,76,0.32)',
          borderRadius:'3px',
          boxShadow:'0 0 28px rgba(201,168,76,0.04)',
        }}>
          {/* Plan title + duration */}
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'1rem', marginBottom:'0.55rem', flexWrap:'wrap' }}>
            <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.82rem,1vw,1.1rem)', letterSpacing:'0.06em', color:'rgba(242,218,148,0.98)' }}>
              The First Chronicle
            </span>
            <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.6rem,0.68vw,0.74rem)', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(145,205,125,0.88)', background:'rgba(60,120,40,0.14)', border:'1px solid rgba(80,150,55,0.28)', borderRadius:'2px', padding:'0.18em 0.6em', flexShrink:0 }}>
              Start Here
            </span>
          </div>

          <div style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.68rem,0.76vw,0.82rem)', color:'rgba(170,148,98,0.72)', marginBottom:'0.85rem' }}>
            {plan?.totalWeeks} weeks · ~{months} months · {plan?.arcs?.length} arcs
          </div>

          <p style={{ fontFamily:'"Lora",serif', fontSize:'clamp(0.72rem,0.82vw,0.88rem)', color:'rgba(205,185,145,0.82)', lineHeight:1.68, margin:'0 0 1.1rem' }}>
            {plan?.storyConnection}
          </p>

          {/* Arc list */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem', borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:'0.9rem' }}>
            {plan?.arcs?.map(arc => (
              <div key={arc.arcNumber} style={{ display:'flex', alignItems:'baseline', gap:'0.65rem' }}>
                <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.48rem,0.54vw,0.58rem)', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(148,118,42,0.72)', flexShrink:0 }}>
                  Arc {arc.arcNumber}
                </span>
                <span style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.68rem,0.76vw,0.82rem)', color:'rgba(195,172,120,0.82)' }}>
                  {arc.title}
                </span>
                <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.46rem,0.52vw,0.56rem)', letterSpacing:'0.12em', color:'rgba(128,102,38,0.62)', marginLeft:'auto', flexShrink:0 }}>
                  Weeks {arc.weeks}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Action row ────────────────────────────────────────────────────── */}
        <div style={{ marginTop:'clamp(1.1rem,2vh,1.8rem)', display:'flex', justifyContent:'flex-end', gap:'0.65rem', flexWrap:'wrap' }}>
          <button
            onClick={() => { sfxClick(); onBack() }}
            style={{
              fontFamily:'"Cinzel",serif', fontSize:'clamp(0.52rem,0.6vw,0.66rem)',
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(178,158,112,0.75)', background:'transparent',
              border:'1px solid rgba(148,122,60,0.28)', borderRadius:'2px',
              padding:'0.65em 1.3em', cursor:'pointer', transition:'all 0.15s ease',
            }}
            onMouseEnter={e => { sfxHover(); e.currentTarget.style.color='rgba(205,182,130,0.9)'; e.currentTarget.style.borderColor='rgba(165,138,65,0.52)' }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(178,158,112,0.75)'; e.currentTarget.style.borderColor='rgba(148,122,60,0.28)' }}
          >
            {mode === 'change' ? 'Speak with Maren instead' : 'I have a key — speak with Maren'}
          </button>

          <button
            onClick={handleConfirm}
            style={{
              fontFamily:'"Cinzel",serif', fontSize:'clamp(0.52rem,0.6vw,0.66rem)',
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(232,210,140,0.95)', background:'rgba(201,168,76,0.1)',
              border:'1px solid rgba(201,168,76,0.52)', borderRadius:'2px',
              padding:'0.65em 1.8em', cursor:'pointer', transition:'all 0.15s ease',
            }}
            onMouseEnter={e => { sfxHover(); e.currentTarget.style.background='rgba(201,168,76,0.18)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.78)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.52)' }}
          >
            Begin This Path
          </button>
        </div>

      </div>
    </div>
  )
}
