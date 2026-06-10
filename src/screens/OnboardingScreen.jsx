import React, { useState, useEffect, useRef, useCallback } from 'react'
import { storage } from '../lib/storage.js'
import { marenOpening, marenMessageStreaming, parseOnboardingData, stripPlanData, classifyApiError } from '../lib/ai.js'
import { loadPreset } from '../lib/presets.js'
import PresetSelectorPanel from '../components/PresetSelectorPanel.jsx'
import { SCREENS } from '../App.jsx'
import { SoundEngine } from '../lib/audio.js'

// ─── Timing constants ─────────────────────────────────────────────────────────
const INTRO_FADE_MS    = 1800
const INTRO_HOLD_MS    = 900
const NARRATOR_CHAR_MS = 26
const NARRATOR_HOLD_MS = 700    // reduced from 1800 — less dead air after narrator finishes
const MAREN_SLIDE_MS   = 800
const MAREN_HOLD_MS    = 120   // reduced from 500 — dots appear almost immediately after Maren slides in
const DIALOG_CHAR_MS   = 16
const FLY_DURATION_MS  = 380

const NARRATOR_INTRO = `The Archive has been standing for longer than most roads have names. You arrive at the edge of what is known, carrying something that brought you here. Not everyone who arrives knows what that something is. You will, soon enough.`

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, charMs, active) {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!active || !text) { setDisplayed(''); setDone(false); indexRef.current = 0; return }
    indexRef.current = 0; setDisplayed(''); setDone(false)
    const tick = () => {
      if (indexRef.current >= text.length) { setDone(true); return }
      indexRef.current++
      setDisplayed(text.slice(0, indexRef.current))
      timerRef.current = setTimeout(tick, charMs)
    }
    timerRef.current = setTimeout(tick, charMs)
    return () => clearTimeout(timerRef.current)
  }, [text, active, charMs])

  const skip = useCallback(() => {
    clearTimeout(timerRef.current)
    setDisplayed(text); setDone(true); indexRef.current = text.length
  }, [text])

  return { displayed, done, skip }
}

// ─── Safety guard ─────────────────────────────────────────────────────────────
function isSafeContent(text) {
  const flagged = ['damn', 'hell', 'god damn', 'jesus', 'christ', 'holy', 'oh my god']
  const lower = text.toLowerCase()
  return !flagged.some(w => lower.includes(w))
}

// ─── Flying message animation ─────────────────────────────────────────────────
function FlyingMessage({ content, from, to, onDone }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !from || !to) return
    const el = ref.current
    el.style.transition = 'none'
    el.style.top = `${from.top}px`; el.style.left = `${from.left}px`; el.style.width = `${from.width}px`
    el.style.opacity = '1'; el.style.transform = 'scale(1)'
    void el.offsetHeight
    el.style.transition = `all ${FLY_DURATION_MS}ms cubic-bezier(0.4,0,0.2,1)`
    el.style.top = `${to.top}px`; el.style.left = `${to.left}px`; el.style.width = `${to.width}px`
    el.style.opacity = '0'; el.style.transform = 'scale(0.88)'
    const t = setTimeout(onDone, FLY_DURATION_MS + 50)
    return () => clearTimeout(t)
  }, [])
  return (
    <div ref={ref} style={{
      position: 'fixed', zIndex: 9000, pointerEvents: 'none',
      background: 'linear-gradient(135deg,rgba(14,11,20,0.97) 0%,rgba(20,15,28,0.97) 100%)',
      border: '1px solid rgba(201,168,76,0.4)', borderRadius: '3px',
      padding: '1.2rem 1.5rem',
      boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
    }}>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(0.82rem,0.95vw,1rem)', color:'var(--color-parchment)', lineHeight:1.7, margin:0 }}>{content}</p>
    </div>
  )
}

// ─── API Key setup panel — atmospheric canvas dust ────────────────────────────
function ApiKeyDust() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const ctx = canvas.getContext('2d')
    const N = 30
    const make = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.12 + 0.03),
      wp: Math.random() * Math.PI * 2,
      wf: 0.003 + Math.random() * 0.006,
      wa: 0.12 + Math.random() * 0.25,
      r:  Math.random() * 1.5 + 0.2,
      life: Math.random() * 220,
      maxLife: 160 + Math.random() * 240,
    })
    const motes = Array.from({ length: N }, make)
    let raf, lastT = null
    const draw = (ts) => {
      const dt = lastT ? Math.min((ts - lastT) / 16.67, 3) : 1; lastT = ts
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const m of motes) {
        m.life += dt
        if (m.life >= m.maxLife) { Object.assign(m, make(), { life: 0 }); continue }
        const t = m.life / m.maxLife
        const a = t < 0.2 ? t / 0.2 : t > 0.75 ? (1 - t) / 0.25 : 1
        m.wp += m.wf * dt
        m.x += (m.vx + Math.sin(m.wp) * m.wa) * dt
        m.y += m.vy * dt
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${a * 0.3})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />
}

// ─── API Key setup panel ──────────────────────────────────────────────────────
// Shown before the intro sequence when no OpenRouter key is configured.
function ApiKeySetupPanel({ onComplete, onUsePreset, navigate }) {
  const [keyValue,  setKeyValue]  = useState('')
  const [showKey,   setShowKey]   = useState(false)
  const [keyError,  setKeyError]  = useState('')
  const [saving,    setSaving]    = useState(false)
  const [entered,   setEntered]   = useState(false)
  const [mounted,   setMounted]   = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80)
    const t2 = setTimeout(() => inputRef.current?.focus(), 450)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleSave = () => {
    const trimmed = keyValue.trim()
    if (!trimmed) { setKeyError('Please enter your API key.'); return }
    if (!trimmed.startsWith('sk-or-') && trimmed.length < 20) {
      setKeyError('This does not look like a valid OpenRouter key. It should start with sk-or-…')
      return
    }
    setKeyError('')
    setSaving(true)
    const s = storage.getSettings()
    storage.saveSettings({ ...s, apiKey: trimmed })
    setEntered(true)
    setTimeout(() => onComplete(trimmed), 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 400,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(1rem, 3vw, 2rem)',
    }}>
      {/* Atmospheric dust over the archive background */}
      <ApiKeyDust />

      {/* Lamplight bloom centered behind the card */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(320px, 50vw, 640px)',
        height: 'clamp(240px, 40vh, 480px)',
        background: 'radial-gradient(ellipse at 50% 60%, rgba(201,138,20,0.14) 0%, transparent 68%)',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'akLamp 4s ease-in-out infinite alternate',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%', maxWidth: 'min(520px, 92vw)',
        background: 'linear-gradient(160deg, rgba(8,6,16,0.94) 0%, rgba(13,10,22,0.94) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,168,76,0.28)',
        borderTop: '1px solid rgba(201,168,76,0.45)',
        borderRadius: '3px',
        padding: 'clamp(1.6rem, 3vw, 2.6rem) clamp(1.4rem, 3vw, 2.4rem)',
        boxShadow: '0 24px 90px rgba(0,0,0,0.75), 0 0 60px rgba(201,138,20,0.07), inset 0 0 40px rgba(201,168,76,0.025)',
        opacity: entered ? 0 : mounted ? 1 : 0,
        transform: entered ? 'translateY(-14px) scale(0.98)' : mounted ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.98)',
        transition: entered ? 'opacity 0.5s ease, transform 0.5s ease' : 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {/* Corner accents */}
        {['tl','tr','bl','br'].map(pos => (
          <div key={pos} style={{
            position:'absolute', width:'12px', height:'12px',
            top: pos.startsWith('t') ? '-1px' : 'auto',
            bottom: pos.startsWith('b') ? '-1px' : 'auto',
            left: pos.endsWith('l') ? '-1px' : 'auto',
            right: pos.endsWith('r') ? '-1px' : 'auto',
            borderTop:    pos.startsWith('t') ? '1.5px solid rgba(201,168,76,0.62)' : 'none',
            borderBottom: pos.startsWith('b') ? '1.5px solid rgba(201,168,76,0.62)' : 'none',
            borderLeft:   pos.endsWith('l')   ? '1.5px solid rgba(201,168,76,0.62)' : 'none',
            borderRight:  pos.endsWith('r')   ? '1.5px solid rgba(201,168,76,0.62)' : 'none',
            pointerEvents:'none',
          }} />
        ))}

        {/* Animated archive seal */}
        <div style={{ textAlign:'center', marginBottom:'1.3rem' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            width:'52px', height:'52px',
            border:'1px solid rgba(201,168,76,0.38)',
            borderRadius:'50%',
            background:'rgba(201,168,76,0.06)',
            boxShadow:'0 0 28px rgba(201,138,20,0.15)',
            animation:'akSeal 3.2s ease-in-out infinite alternate',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 10V7a3 3 0 016 0v3" stroke="rgba(201,168,76,0.88)" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="3.5" y="10" width="15" height="10" rx="1.5" stroke="rgba(201,168,76,0.88)" strokeWidth="1.5"/>
              <circle cx="11" cy="15" r="1.8" fill="rgba(218,182,76,0.75)"/>
              {/* Key notch below lock */}
              <line x1="11" y1="15" x2="11" y2="18" stroke="rgba(218,182,76,0.55)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily:'"Cinzel",serif', fontWeight:600,
          fontSize:'clamp(0.9rem,1.4vw,1.3rem)',
          letterSpacing:'0.08em', textAlign:'center',
          color:'rgba(240,218,158,0.97)',
          margin:'0 0 0.45rem 0',
          textShadow:'0 2px 20px rgba(201,138,20,0.18)',
        }}>
          Archive Key Required
        </h2>

        {/* Decorative rule */}
        <div style={{ height:'1px', background:'linear-gradient(to right, transparent, rgba(201,168,76,0.32), transparent)', margin:'0.2rem auto 1rem', maxWidth:'200px' }} />

        <p style={{
          fontFamily:'"Lora",serif', fontStyle:'italic',
          fontSize:'clamp(0.78rem,0.9vw,0.94rem)',
          color:'rgba(185,165,118,0.82)', textAlign:'center',
          lineHeight:1.68, margin:'0 0 1.6rem 0',
        }}>
          Maren speaks through OpenRouter — a free service that connects the Archive to the outside world. Each Seeker uses their own key.
        </p>

        <style>{`
          @keyframes akSeal {
            from { box-shadow: 0 0 18px rgba(201,138,20,0.1); }
            to   { box-shadow: 0 0 38px rgba(201,138,20,0.28); }
          }
          @keyframes akLamp {
            from { opacity: 0.6; }
            to   { opacity: 1.0; }
          }
        `}</style>

        {/* Steps */}
        <div style={{
          background:'rgba(201,168,76,0.04)',
          border:'1px solid rgba(201,168,76,0.1)',
          borderRadius:'2px',
          padding:'clamp(0.9rem,1.2vw,1.2rem)',
          marginBottom:'1.5rem',
        }}>
          <div style={{
            fontFamily:'"Cinzel",serif',
            fontSize:'clamp(0.5rem,0.58vw,0.62rem)',
            letterSpacing:'0.3em', textTransform:'uppercase',
            color:'rgba(155,130,70,0.7)',
            marginBottom:'0.9rem',
          }}>
            How to get your key
          </div>
          {[
            { n:1, text:'Go to openrouter.ai and create a free account. No payment needed to start.' },
            { n:2, text:'Navigate to Keys → Create a new key. Name it anything — "Ardenmoor" works.' },
            { n:3, text:'Copy the key. It begins with sk-or- and is about 60 characters long.' },
          ].map(({ n, text }) => (
            <div key={n} style={{ display:'flex', gap:'0.75rem', marginBottom: n < 3 ? '0.7rem' : 0 }}>
              <div style={{
                flexShrink:0, width:'20px', height:'20px',
                borderRadius:'2px', background:'rgba(201,168,76,0.12)',
                border:'1px solid rgba(201,168,76,0.25)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <span style={{
                  fontFamily:'"Cinzel",serif',
                  fontSize:'clamp(0.52rem,0.58vw,0.62rem)',
                  color:'rgba(201,168,76,0.85)', lineHeight:1,
                }}>{n}</span>
              </div>
              <span style={{
                fontFamily:'"Lora",serif',
                fontSize:'clamp(0.75rem,0.85vw,0.9rem)',
                color:'rgba(200,182,140,0.82)', lineHeight:1.6,
              }}>{text}</span>
            </div>
          ))}

          <a
            href="https://openrouter.ai/keys"
            target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:'0.4rem',
              marginTop:'1rem',
              fontFamily:'"Cinzel",serif',
              fontSize:'clamp(0.52rem,0.6vw,0.65rem)',
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(130,185,220,0.85)',
              textDecoration:'none',
              transition:'color 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(160,210,245,1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(130,185,220,0.85)'}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            openrouter.ai/keys
          </a>
        </div>

        {/* Key input */}
        <div style={{ marginBottom: keyError ? '0.5rem' : '1.2rem' }}>
          <label style={{
            display:'block',
            fontFamily:'"Cinzel",serif',
            fontSize:'clamp(0.5rem,0.56vw,0.6rem)',
            letterSpacing:'0.25em', textTransform:'uppercase',
            color:'rgba(155,130,70,0.75)',
            marginBottom:'0.45rem',
          }}>
            Your API Key
          </label>
          <div style={{
            display:'flex', alignItems:'center',
            background:'rgba(6,5,15,0.9)',
            border:`1px solid ${keyError ? 'rgba(180,60,60,0.6)' : 'rgba(155,122,40,0.35)'}`,
            borderRadius:'2px',
            overflow:'hidden',
            transition:'border-color 0.15s ease',
          }}
            onFocus={() => {}}
          >
            <input
              ref={inputRef}
              type={showKey ? 'text' : 'password'}
              value={keyValue}
              onChange={e => { setKeyValue(e.target.value); setKeyError('') }}
              onKeyDown={handleKeyDown}
              placeholder="sk-or-…"
              spellCheck={false}
              autoComplete="off"
              style={{
                flex:1,
                background:'transparent', border:'none', outline:'none',
                padding:'0.75rem 0.9rem',
                fontFamily:'"Lora",serif', fontStyle:'italic',
                fontSize:'clamp(0.8rem,0.9vw,0.95rem)',
                color:'rgba(222,205,170,0.92)',
                letterSpacing: showKey ? '0.02em' : '0.12em',
              }}
            />
            <button
              type="button"
              onClick={() => setShowKey(s => !s)}
              style={{
                background:'transparent', border:'none',
                padding:'0 0.85rem',
                cursor:'pointer',
                display:'flex', alignItems:'center',
                color: showKey ? 'rgba(201,168,76,0.8)' : 'rgba(150,130,80,0.5)',
                transition:'color 0.15s ease',
              }}
              title={showKey ? 'Hide key' : 'Show key'}
            >
              {showKey ? (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M1 7.5C1 7.5 3.5 3 7.5 3s6.5 4.5 6.5 4.5S11.5 12 7.5 12 1 7.5 1 7.5z" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2 2l11 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M1 7.5C1 7.5 3.5 3 7.5 3s6.5 4.5 6.5 4.5S11.5 12 7.5 12 1 7.5 1 7.5z" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
              )}
            </button>
          </div>
          {keyError && (
            <p style={{
              fontFamily:'"Lora",serif', fontStyle:'italic',
              fontSize:'clamp(0.7rem,0.78vw,0.82rem)',
              color:'rgba(220,100,100,0.85)',
              margin:'0.35rem 0 0 0',
            }}>{keyError}</p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSave}
          disabled={saving || !keyValue.trim()}
          style={{
            width:'100%',
            fontFamily:'"Cinzel",serif',
            fontSize:'clamp(0.6rem,0.72vw,0.78rem)',
            letterSpacing:'0.28em', textTransform:'uppercase',
            color: (saving || !keyValue.trim()) ? 'rgba(155,130,65,0.45)' : 'rgba(232,198,100,0.95)',
            background: (saving || !keyValue.trim())
              ? 'rgba(20,16,8,0.6)'
              : 'linear-gradient(135deg,rgba(35,26,8,0.95) 0%,rgba(48,36,10,0.95) 100%)',
            border:`1px solid ${(saving || !keyValue.trim()) ? 'rgba(100,80,25,0.25)' : 'rgba(155,122,40,0.55)'}`,
            borderRadius:'2px',
            padding:'0.85em 0',
            cursor:(saving || !keyValue.trim()) ? 'default' : 'pointer',
            transition:'all 0.2s ease',
            marginBottom:'0.75rem',
          }}
        >
          {saving ? 'Entering the Archive…' : 'Enter the Archive'}
        </button>

        {/* Go to Settings fallback */}
        <div style={{ textAlign:'center', marginBottom:'0.5rem' }}>
          <button
            onClick={() => openSettings?.()}
            style={{
              fontFamily:'"Cinzel",serif',
              fontSize:'clamp(0.5rem,0.56vw,0.6rem)',
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(140,118,65,0.6)',
              background:'transparent', border:'none',
              cursor:'pointer', transition:'color 0.15s ease',
              padding:'0.25em 0',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(180,152,82,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(140,118,65,0.6)'}
          >
            Go to Settings instead
          </button>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:'rgba(201,168,76,0.1)', margin:'0.4rem 0 0.9rem' }} />

        {/* Prebuilt plan escape hatch */}
        <div style={{ textAlign:'center' }}>
          <p style={{
            fontFamily:'"Lora",serif', fontStyle:'italic',
            fontSize:'clamp(0.72rem,0.82vw,0.88rem)',
            color:'rgba(185,165,118,0.88)',
            margin:'0 0 0.65rem',
            lineHeight:1.55,
          }}>
            No API key yet? Begin with a prebuilt path — no key required.
          </p>
          <button
            onClick={onUsePreset}
            style={{
              fontFamily:'"Cinzel",serif',
              fontSize:'clamp(0.58rem,0.68vw,0.74rem)',
              letterSpacing:'0.22em', textTransform:'uppercase',
              color:'rgba(218,185,88,0.95)',
              background:'linear-gradient(135deg,rgba(201,168,76,0.14),rgba(150,115,40,0.08))',
              border:'1px solid rgba(201,168,76,0.5)',
              borderRadius:'2px',
              padding:'0.7em 1.7em',
              cursor:'pointer', transition:'all 0.18s ease',
              boxShadow:'0 0 14px rgba(201,168,76,0.1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color='rgba(235,205,115,1)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.82)'; e.currentTarget.style.background='rgba(201,168,76,0.2)'; e.currentTarget.style.boxShadow='0 0 24px rgba(201,168,76,0.22)' }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(218,185,88,0.95)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.5)'; e.currentTarget.style.background='linear-gradient(135deg,rgba(201,168,76,0.14),rgba(150,115,40,0.08))'; e.currentTarget.style.boxShadow='0 0 14px rgba(201,168,76,0.1)' }}
          >
            Browse the Ancient Scrolls
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Corner accent helper ─────────────────────────────────────────────────────
function GoldCorners({ color = 'rgba(201,168,76,0.4)', size = 10 }) {
  return ['tl','tr','bl','br'].map(pos => (
    <div key={pos} style={{
      position:'absolute', width:`${size}px`, height:`${size}px`,
      top:    pos.startsWith('t') ? '-1px' : 'auto',
      bottom: pos.startsWith('b') ? '-1px' : 'auto',
      left:   pos.endsWith('l')   ? '-1px' : 'auto',
      right:  pos.endsWith('r')   ? '-1px' : 'auto',
      borderTop:    pos.startsWith('t') ? `1.5px solid ${color}` : 'none',
      borderBottom: pos.startsWith('b') ? `1.5px solid ${color}` : 'none',
      borderLeft:   pos.endsWith('l')   ? `1.5px solid ${color}` : 'none',
      borderRight:  pos.endsWith('r')   ? `1.5px solid ${color}` : 'none',
      pointerEvents:'none', zIndex:1,
    }} />
  ))
}

// ─── Error button style ───────────────────────────────────────────────────────
function errBtnStyle(primary) {
  return {
    fontFamily:'"Cinzel",serif',
    fontSize:'clamp(0.56rem,0.65vw,0.72rem)',
    letterSpacing:'0.2em', textTransform:'uppercase',
    background: primary ? 'rgba(180,40,40,0.15)' : 'transparent',
    border:`1px solid ${primary ? 'rgba(180,40,40,0.45)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius:'2px', padding:'0.4em 0.9em',
    color: primary ? 'rgba(220,130,130,0.9)' : 'rgba(180,165,145,0.7)',
    cursor:'pointer', transition:'all 0.2s ease',
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function OnboardingScreen({ appState, navigate, openSettings }) {
  // Phase: 'nokey' | 'preset_select' | 'intro' | 'appearing' | 'dialogue' | 'thinking' | 'generating' | 'done'
  const [phase,     setPhase]     = useState('intro')
  const [bgOpacity, setBgOpacity] = useState(0)

  // Narrator
  const [narratorActive, setNarratorActive] = useState(false)
  const { displayed: narratorDisplayed, done: narratorDone, skip: narratorSkip } =
    useTypewriter(NARRATOR_INTRO, NARRATOR_CHAR_MS, narratorActive)

  // Maren portrait
  const [marenVisible,    setMarenVisible]    = useState(false)
  const [marenExpression, setMarenExpression] = useState('neutral')

  // Floating dialogue
  const [floatingText,      setFloatingText]     = useState('')
  const [floatingStreaming, setFloatingStreaming] = useState('')
  const [floatingDone,      setFloatingDone]     = useState(false)
  const [showInput,         setShowInput]        = useState(false)
  const [userInput,         setUserInput]        = useState('')
  const floatingBoxRef = useRef(null)

  // Chat history
  const [messages,  setMessages]  = useState([])
  const chatEndRef  = useRef(null)
  const chatAreaRef = useRef(null)

  // Flying animation
  const [flyingMsg, setFlyingMsg] = useState(null)

  // Error
  const [apiError, setApiError] = useState(null)

  const isThinking = phase === 'thinking'

  // Always read API key fresh from storage (avoids stale closure after key entry)
  const getApiKey = () => storage.getSettings().apiKey

  // Guards against React Strict Mode double-invoke and double-submit via event bubbling
  const calledOpeningRef = useRef(false)
  const submittingRef    = useRef(false)

  // ─── Mount: check key → restore or start ────────────────────────────────
  useEffect(() => {
    if (calledOpeningRef.current) return  // React Strict Mode fires effects twice in dev; prevent double API call
    calledOpeningRef.current = true
    const data  = storage.getOnboardingData()
    if (data) { navigate(SCREENS.STORY); return }

    const key = storage.getSettings().apiKey
    if (!key) {
      setBgOpacity(1)
      setPhase('nokey')
      return
    }

    const saved = storage.getOnboardingChat()
    if (saved.length > 0) {
      setMessages(saved)
      setBgOpacity(1)
      setMarenVisible(true)
      setPhase('dialogue')
      const lastMaren = [...saved].reverse().find(m => m.role === 'maren')
      if (lastMaren) {
        setFloatingText(lastMaren.content)
        setFloatingDone(true)
        setShowInput(true)
      }
      return
    }

    startIntroSequence()
  }, [])

  // ─── Called when user picks a preset at the key gate ────────────────────
  function handlePresetConfirm(phaseNumber) {
    loadPreset(phaseNumber)
    navigate(SCREENS.STORY)
  }

  // ─── Called after key is saved from ApiKeySetupPanel ────────────────────
  function handleKeyEntered(key) {
    const saved = storage.getOnboardingChat()
    if (saved.length > 0) {
      setMessages(saved)
      setMarenVisible(true)
      setPhase('dialogue')
      const lastMaren = [...saved].reverse().find(m => m.role === 'maren')
      if (lastMaren) { setFloatingText(lastMaren.content); setFloatingDone(true); setShowInput(true) }
    } else {
      startIntroSequence()
    }
  }

  // ─── Intro sequence ──────────────────────────────────────────────────────
  async function startIntroSequence() {
    setTimeout(() => setBgOpacity(1), 100)
    setTimeout(() => setNarratorActive(true), INTRO_FADE_MS + INTRO_HOLD_MS)

    const narratorDuration = NARRATOR_INTRO.length * NARRATOR_CHAR_MS
    const marenDelay = INTRO_FADE_MS + INTRO_HOLD_MS + narratorDuration + NARRATOR_HOLD_MS
    setTimeout(() => { setMarenVisible(true); setPhase('appearing') }, marenDelay)

    setTimeout(async () => {
      setPhase('thinking')
      const key = getApiKey()
      if (!key) {
        setApiError({ title:'No Archive key set', message:'Set your OpenRouter API key in Settings.', action:'settings' })
        setPhase('dialogue'); return
      }
      const result = await marenOpening(key)
      if (!result.ok) { setApiError(result.error); setPhase('dialogue'); return }
      displayMarenMessage(result.content)
    }, marenDelay + MAREN_SLIDE_MS + MAREN_HOLD_MS)
  }

  // ─── Display Maren message with typewriter ───────────────────────────────
  function displayMarenMessage(text) {
    const cleaned = isSafeContent(text) ? text : '[The Archive has fallen silent.]'
    setFloatingText(cleaned); setFloatingStreaming(''); setFloatingDone(false)
    setShowInput(false); setPhase('dialogue')
    let i = 0
    const interval = setInterval(() => {
      i++
      const ch = cleaned[i - 1]
      // Quill-on-parchment sound every 2nd non-space character
      if (ch && ch !== ' ' && i % 2 === 0) {
        try { SoundEngine.typeChar() } catch (_) {}
      }
      setFloatingStreaming(cleaned.slice(0, i))
      if (i >= cleaned.length) { clearInterval(interval); setFloatingDone(true); setShowInput(true) }
    }, DIALOG_CHAR_MS)
  }

  function handleFloatingClick() {
    if (!floatingDone) { setFloatingStreaming(floatingText); setFloatingDone(true); setShowInput(true) }
  }

  // ─── User submits message ────────────────────────────────────────────────
  async function handleSubmit(e) {
    e?.preventDefault()
    const text = userInput.trim()
    if (!text || submittingRef.current) return
    submittingRef.current = true

    setUserInput(''); setShowInput(false); setApiError(null)

    const boxRect  = floatingBoxRef.current?.getBoundingClientRect()
    const chatRect = chatAreaRef.current?.getBoundingClientRect()

    const marenMsg = { role:'maren', content:floatingText, ts:new Date().toISOString() }
    const userMsg  = { role:'user',  content:text,         ts:new Date().toISOString() }
    const newHistory = [...messages, marenMsg, userMsg]

    if (boxRect && chatRect) {
      setFlyingMsg({
        content: floatingText,
        from: { top:boxRect.top,  left:boxRect.left,  width:boxRect.width  },
        to:   { top:chatRect.bottom - 80, left:chatRect.left, width:chatRect.width },
      })
    }

    setFloatingText(''); setFloatingStreaming(''); setFloatingDone(false); setPhase('thinking')

    setTimeout(async () => {
      setFlyingMsg(null); setMessages(newHistory)
      storage.saveOnboardingChat(newHistory); scrollChatToBottom()

      const key = getApiKey()
      if (!key) {
        setApiError({ title:'No Archive key set', message:'Set your OpenRouter API key in Settings.', action:'settings' })
        setPhase('dialogue'); return
      }

      let accumulated = ''
      let lastSoundLen = 0
      setFloatingStreaming(''); setPhase('dialogue')

      // Include Maren's current question (marenMsg) in history so the AI sees
      // its own message when generating the next response. Without this, Maren
      // can't tell which exchange she's on and may re-ask the same question.
      const result = await marenMessageStreaming(key, [...messages, marenMsg], text, (chunk) => {
        accumulated += chunk
        const stripped = stripPlanData(accumulated)
        setFloatingStreaming(stripped)
        // Fire typeChar for every 2nd new character in the streamed text
        const newLen = stripped.length
        for (let ci = lastSoundLen; ci < newLen; ci++) {
          if (ci % 2 === 0 && stripped[ci] !== ' ') {
            try { SoundEngine.typeChar() } catch (_) {}
          }
        }
        lastSoundLen = newLen
      })

      if (!result.ok) { submittingRef.current = false; setApiError(result.error); setPhase('dialogue'); return }

      const planData = parseOnboardingData(accumulated)
      if (planData) {
        const cleanText = stripPlanData(accumulated)
        setFloatingText(cleanText); setFloatingStreaming(cleanText); setFloatingDone(true)
        storage.saveOnboardingData(planData)
        const s = storage.getSettings()
        storage.saveSettings({ ...s, character:planData.character, playerName:planData.playerName })
        setPhase('generating')
        setTimeout(() => navigate(SCREENS.PLAN_VIEW), 2600)
      } else {
        submittingRef.current = false
        setFloatingText(accumulated); setFloatingStreaming(accumulated)
        setFloatingDone(true); setShowInput(true); setPhase('dialogue')
      }
    }, FLY_DURATION_MS + 80)
  }

  function scrollChatToBottom() {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior:'smooth' }), 50)
  }
  useEffect(() => { scrollChatToBottom() }, [messages])

  // ─── Keyboard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && narratorActive && !narratorDone) narratorSkip()
      if (e.key === 'Enter' && !e.shiftKey && showInput && phase !== 'thinking') {
        e.preventDefault(); handleSubmit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [narratorActive, narratorDone, showInput, userInput, phase])

  // ─── Render ───────────────────────────────────────────────────────────────
  const displayedFloating = floatingStreaming || floatingText

  return (
    <div style={{
      position:'fixed', inset:0,
      background:'#06050d',
      overflow:'hidden',
      fontFamily:'var(--font-body)',
    }}>

      {/* ── Responsive CSS ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes mmPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes obFadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes obFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes obBlink  { 0%,100%{opacity:0} 50%{opacity:0.7} }

        .ob-portrait-wrap { width:clamp(180px,26vw,400px); }
        .ob-dialogue-box  {
          position:absolute; top:clamp(5%,9%,14%);
          right:clamp(1rem,3.5vw,4.5rem);
          left:clamp(180px,28vw,420px);
        }
        .ob-chat-area {
          position:absolute; bottom:0;
          left:clamp(180px,28vw,420px);
          right:clamp(1rem,3.5vw,4.5rem);
          max-height:clamp(160px,26vh,300px);
        }
        @media (max-width:640px) {
          .ob-portrait-wrap { width:clamp(100px,30vw,160px) !important; }
          .ob-dialogue-box  { left:0 !important; right:0 !important; top:auto !important; bottom:clamp(140px,28vh,220px); margin:0 clamp(0.6rem,3vw,1rem); }
          .ob-chat-area     { left:0 !important; right:0 !important; max-height:clamp(100px,18vh,160px); }
        }
        @media (max-width:400px) {
          .ob-portrait-wrap { display:none !important; }
          .ob-dialogue-box  { bottom:clamp(80px,14vh,140px); }
          .ob-chat-area     { max-height:clamp(80px,15vh,130px); }
        }
      `}</style>

      {/* ── Background ───────────────────────────────────────────────────── */}
      <div style={{
        position:'absolute', inset:0,
        background:`url('${import.meta.env.BASE_URL}assets/images/backgrounds/standard/act1_archive_study_room.jpg') center/cover no-repeat`,
        opacity:bgOpacity,
        transition:`opacity ${INTRO_FADE_MS}ms ease`,
        filter:'brightness(0.4) saturate(0.75)',
      }} />
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 50% 100%,rgba(9,8,12,0) 25%,rgba(9,8,12,0.92) 100%)',
      }} />
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'linear-gradient(to bottom,rgba(6,5,13,0.6) 0%,transparent 30%,transparent 60%,rgba(6,5,13,0.9) 100%)',
      }} />

      {/* ── API Key Setup Phase ───────────────────────────────────────────── */}
      {phase === 'nokey' && (
        <ApiKeySetupPanel
          onComplete={handleKeyEntered}
          onUsePreset={() => setPhase('preset_select')}
          navigate={navigate}
        />
      )}

      {/* ── Preset selector (no key needed) ──────────────────────────────── */}
      {phase === 'preset_select' && (
        <PresetSelectorPanel
          mode="fresh"
          onConfirm={handlePresetConfirm}
          onBack={() => setPhase('nokey')}
        />
      )}

      {/* ── Narrator ─────────────────────────────────────────────────────── */}
      {narratorActive && phase !== 'appearing' && messages.length === 0 && phase !== 'nokey' && (
        <div
          onClick={() => { if (!narratorDone) narratorSkip() }}
          style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            width:'min(620px,82vw)',
            textAlign:'center', zIndex:100,
            cursor:'default',
            opacity: narratorDisplayed ? 1 : 0,
            transition:'opacity 0.7s ease',
          }}
        >
          {/* Subtle vignette behind text */}
          <div style={{
            position:'absolute',
            inset:'-2rem -3rem',
            background:'radial-gradient(ellipse at 50% 50%,rgba(6,5,13,0.7) 40%,transparent 100%)',
            pointerEvents:'none',
            borderRadius:'50%',
          }} />
          <p style={{
            position:'relative',
            fontFamily:'var(--font-body)', fontStyle:'italic',
            fontSize:'clamp(0.9rem,1.05vw,1.14rem)',
            color:'rgba(235,225,198,0.9)',
            lineHeight:1.9, letterSpacing:'0.025em',
            textShadow:'0 2px 24px rgba(0,0,0,0.9)',
            margin:0,
          }}>
            {narratorDisplayed}
            {!narratorDone && <span style={{ animation:'obBlink 1.1s ease infinite' }}>▎</span>}
          </p>
          {narratorDone && (
            <p style={{
              marginTop:'2.2rem',
              fontFamily:'var(--font-heading)',
              fontSize:'clamp(0.52rem,0.6vw,0.66rem)',
              letterSpacing:'0.3em', textTransform:'uppercase',
              color:'rgba(201,168,76,0.88)',
              animation:'mmPulse 2.5s ease-in-out infinite',
            }}>
              Click anywhere to continue
            </p>
          )}
        </div>
      )}

      {/* ── Maren portrait ───────────────────────────────────────────────── */}
      <div
        className="ob-portrait-wrap"
        style={{
          position:'absolute', top:0, left:'clamp(-1.5rem,-1vw,0)',
          zIndex:200,
          opacity:marenVisible ? 1 : 0,
          transform:marenVisible ? 'translateX(0) translateY(0)' : 'translateX(-30px) translateY(15px)',
          transition:`opacity ${MAREN_SLIDE_MS}ms ease, transform ${MAREN_SLIDE_MS}ms cubic-bezier(0.2,0.8,0.3,1)`,
          pointerEvents:'none', userSelect:'none',
        }}
      >
        {/* Subtle aura beneath portrait */}
        {marenVisible && (
          <div style={{
            position:'absolute', bottom:'5%', left:'10%', right:'5%', height:'40%',
            background:'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.08) 0%,transparent 70%)',
            pointerEvents:'none',
          }} />
        )}
        <img
          src={`${import.meta.env.BASE_URL}assets/images/portraits/maren/idle_1.png`}
          alt="Maren"
          onError={e => {
            e.target.style.display = 'none'
            const ph = e.target.parentNode.querySelector('.ob-portrait-placeholder')
            if (ph) ph.style.display = 'flex'
          }}
          style={{
            width:'100%', height:'auto', display:'block',
            filter:'drop-shadow(0 0 35px rgba(201,168,76,0.1)) drop-shadow(0 16px 50px rgba(0,0,0,0.95))',
          }}
        />
        {/* Placeholder shown when portrait image is missing */}
        <div className="ob-portrait-placeholder" style={{
          display:'none', flexDirection:'column', alignItems:'center', justifyContent:'flex-end',
          width:'100%', minHeight:'clamp(220px,30vw,440px)',
          paddingBottom:'clamp(13%,15%,17%)',
        }}>
          <svg viewBox="0 0 120 220" xmlns="http://www.w3.org/2000/svg"
            style={{ width:'clamp(90px,14vw,180px)', opacity:0.55, filter:'drop-shadow(0 0 22px rgba(201,168,76,0.18))' }}>
            <ellipse cx="60" cy="42" rx="22" ry="24" fill="rgba(201,168,76,0.25)" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2"/>
            <path d="M14 220 Q18 120 38 95 Q48 85 60 83 Q72 85 82 95 Q102 120 106 220Z" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2"/>
          </svg>
        </div>
        {/* Name plate */}
        {marenVisible && phase !== 'intro' && phase !== 'nokey' && (
          <div style={{
            position:'absolute', top:'clamp(74%,78%,82%)', left:'16%',
            background:'linear-gradient(90deg,rgba(10,8,18,0.97) 0%,rgba(10,8,18,0.6) 100%)',
            borderLeft:'2px solid rgba(201,168,76,0.7)',
            padding:'0.28em 1em 0.28em 0.65em',
            animation:'obFadeIn 0.5s ease forwards',
          }}>
            <span style={{
              fontFamily:'var(--font-heading)',
              fontSize:'clamp(0.58rem,0.7vw,0.82rem)',
              letterSpacing:'0.28em', textTransform:'uppercase',
              color:'var(--color-gold)',
            }}>Maren</span>
          </div>
        )}
      </div>

      {/* ── Floating dialogue box ─────────────────────────────────────────── */}
      {marenVisible && (displayedFloating || isThinking || phase === 'appearing') && phase !== 'nokey' && (
        <div
          ref={floatingBoxRef}
          className="ob-dialogue-box"
          onClick={handleFloatingClick}
          style={{
            zIndex:300,
            cursor: floatingDone ? 'default' : 'pointer',
            animation:'obFadeUp 0.4s ease forwards',
          }}
        >
          <GoldCorners color="rgba(201,168,76,0.45)" size={10} />

          <div style={{
            background:'linear-gradient(150deg,rgba(11,8,18,0.97) 0%,rgba(17,13,26,0.97) 100%)',
            border:'1px solid rgba(201,168,76,0.2)',
            borderLeft:'2px solid rgba(201,168,76,0.5)',
            borderRadius:'2px',
            padding:'clamp(0.9rem,1.3vw,1.5rem) clamp(1rem,1.4vw,1.7rem)',
            boxShadow:'0 8px 48px rgba(0,0,0,0.8), inset 0 0 40px rgba(201,168,76,0.02)',
            backdropFilter:'blur(6px)',
          }}>
            {/* Maren label */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.65rem' }}>
              <div style={{ width:'18px', height:'1px', background:'rgba(201,168,76,0.4)' }} />
              <span style={{
                fontFamily:'var(--font-heading)',
                fontSize:'clamp(0.54rem,0.62vw,0.7rem)',
                letterSpacing:'0.32em', textTransform:'uppercase',
                color:'var(--color-gold)',
              }}>Maren</span>
              <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(201,168,76,0.2),transparent)' }} />
            </div>

            {/* Message text or thinking dots */}
            {(isThinking || phase === 'appearing') && !displayedFloating ? (
              <div style={{ display:'flex', gap:'7px', padding:'0.5rem 0.2rem' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width:'7px', height:'7px', borderRadius:'50%',
                    background:'rgba(201,168,76,0.55)',
                    animation:`mmPulse 1.3s ease-in-out ${i*0.22}s infinite`,
                  }} />
                ))}
              </div>
            ) : (
              <p style={{
                fontFamily:'var(--font-body)', fontStyle:'italic',
                fontSize:'clamp(0.84rem,0.96vw,1.04rem)',
                color:'rgba(228,215,188,0.94)',
                lineHeight:1.8, margin:0, whiteSpace:'pre-wrap',
              }}>
                {displayedFloating}
                {!floatingDone && <span style={{ opacity:0.45, animation:'obBlink 0.9s ease infinite' }}>▎</span>}
              </p>
            )}

            {/* Click to continue hint */}
            {floatingDone && !showInput && phase !== 'thinking' && phase !== 'generating' && (
              <p style={{
                marginTop:'0.85rem',
                fontFamily:'var(--font-heading)',
                fontSize:'clamp(0.5rem,0.57vw,0.62rem)',
                letterSpacing:'0.25em', textTransform:'uppercase',
                color:'rgba(201,168,76,0.88)',
                animation:'mmPulse 2.5s ease-in-out infinite',
              }}>
                Click to continue
              </p>
            )}
          </div>

          {/* User input */}
          {showInput && phase === 'dialogue' && (
            <form onSubmit={handleSubmit} style={{ marginTop:'0.6rem' }}>
              <div style={{
                display:'flex', alignItems:'stretch',
                background:'rgba(10,8,18,0.97)',
                border:'1px solid rgba(201,168,76,0.18)',
                borderRadius:'2px', overflow:'hidden',
                boxShadow:'0 4px 24px rgba(0,0,0,0.65)',
                transition:'border-color 0.2s ease',
              }}
                onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.42)'}
                onBlurCapture={e =>  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'}
              >
                <textarea
                  autoFocus
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); handleSubmit() } }}
                  placeholder="Speak to the Archive…"
                  rows={2}
                  style={{
                    flex:1, background:'transparent', border:'none', outline:'none',
                    resize:'none', padding:'0.8rem 1rem',
                    fontFamily:'var(--font-body)', fontStyle:'italic',
                    fontSize:'clamp(0.82rem,0.92vw,1rem)',
                    color:'var(--color-parchment)', lineHeight:1.6,
                    scrollbarWidth:'none', msOverflowStyle:'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  style={{
                    background: userInput.trim() ? 'rgba(201,168,76,0.1)' : 'transparent',
                    border:'none', borderLeft:'1px solid rgba(201,168,76,0.14)',
                    padding:'0 1.15rem', cursor: userInput.trim() ? 'pointer' : 'default',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'background 0.2s ease',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4"
                      stroke={userInput.trim() ? '#c9a84c' : 'rgba(201,168,76,0.25)'}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p style={{
                marginTop:'0.35rem',
                fontFamily:'var(--font-heading)',
                fontSize:'clamp(0.48rem,0.54vw,0.58rem)',
                letterSpacing:'0.2em',
                color:'rgba(201,168,76,0.52)',
                textAlign:'right',
              }}>
                Enter to send · Shift+Enter for new line
              </p>
            </form>
          )}

          {/* Generating indicator */}
          {phase === 'generating' && (
            <div style={{ marginTop:'1rem', textAlign:'center', animation:'obFadeIn 0.4s ease forwards' }}>
              <div style={{ display:'flex', justifyContent:'center', gap:'7px', marginBottom:'0.7rem' }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{
                    width:'5px', height:'5px', borderRadius:'50%',
                    background:'var(--color-gold)',
                    animation:`mmPulse 1.5s ease-in-out ${i*0.14}s infinite`,
                  }} />
                ))}
              </div>
              <p style={{
                fontFamily:'var(--font-heading)',
                fontSize:'clamp(0.58rem,0.66vw,0.72rem)',
                letterSpacing:'0.24em', textTransform:'uppercase',
                color:'rgba(201,168,76,0.78)',
              }}>
                The Archive is shaping your path…
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Chat history ─────────────────────────────────────────────────── */}
      {messages.length > 0 && phase !== 'nokey' && (
        <div
          ref={chatAreaRef}
          className="ob-chat-area"
          style={{
            zIndex:250,
            overflowY:'auto',
            scrollbarWidth:'none', msOverflowStyle:'none',
            paddingBottom:'1rem',
            maskImage:'linear-gradient(to bottom,transparent 0%,black 22%,black 100%)',
            WebkitMaskImage:'linear-gradient(to bottom,transparent 0%,black 22%,black 100%)',
          }}
        >
          <div style={{ padding:'0.5rem 0.3rem 0' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                marginBottom:'0.6rem',
                textAlign: msg.role === 'user' ? 'right' : 'left',
                animation:`obFadeIn 0.3s ease forwards`,
              }}>
                {msg.role === 'maren' && (
                  <span style={{
                    display:'block',
                    fontFamily:'var(--font-heading)',
                    fontSize:'clamp(0.48rem,0.54vw,0.58rem)',
                    letterSpacing:'0.26em', textTransform:'uppercase',
                    color:'rgba(186,155,72,0.65)',
                    marginBottom:'0.2rem', paddingLeft:'0.2rem',
                  }}>Maren</span>
                )}
                <div style={{
                  display:'inline-block', maxWidth:'88%',
                  background: msg.role === 'user'
                    ? 'rgba(201,168,76,0.07)'
                    : 'rgba(12,9,20,0.75)',
                  border: msg.role === 'user'
                    ? '1px solid rgba(201,168,76,0.15)'
                    : '1px solid rgba(255,255,255,0.05)',
                  borderLeft: msg.role === 'maren' ? '2px solid rgba(201,168,76,0.3)' : undefined,
                  borderRight: msg.role === 'user' ? '2px solid rgba(201,168,76,0.22)' : undefined,
                  borderRadius:'2px',
                  padding:'0.5rem 0.85rem',
                  backdropFilter:'blur(4px)',
                }}>
                  <p style={{
                    fontFamily:'var(--font-body)',
                    fontStyle: msg.role === 'maren' ? 'italic' : 'normal',
                    fontSize:'clamp(0.76rem,0.86vw,0.92rem)',
                    color: msg.role === 'user' ? 'rgba(228,215,188,0.88)' : 'rgba(182,168,138,0.82)',
                    lineHeight:1.65, margin:0,
                  }}>
                    {msg.role === 'maren' ? stripPlanData(msg.content) : msg.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}

      {/* ── Flying message ────────────────────────────────────────────────── */}
      {flyingMsg && (
        <FlyingMessage
          content={flyingMsg.content}
          from={flyingMsg.from}
          to={flyingMsg.to}
          onDone={() => setFlyingMsg(null)}
        />
      )}

      {/* ── API Error ─────────────────────────────────────────────────────── */}
      {apiError && phase !== 'nokey' && (
        <div style={{
          position:'fixed',
          bottom:'clamp(1.2rem,2.5vh,2.5rem)',
          right:'clamp(1.2rem,2.5vw,2.5rem)',
          left:'auto', zIndex:500,
          maxWidth:'min(360px,88vw)',
          background:'rgba(12,7,7,0.97)',
          border:'1px solid rgba(180,40,40,0.4)',
          borderLeft:'3px solid rgba(180,40,40,0.8)',
          borderRadius:'2px', padding:'1rem 1.2rem',
          boxShadow:'0 8px 32px rgba(0,0,0,0.75)',
          animation:'obFadeUp 0.3s ease forwards',
        }}>
          <p style={{
            fontFamily:'var(--font-heading)',
            fontSize:'clamp(0.58rem,0.68vw,0.76rem)',
            letterSpacing:'0.15em', textTransform:'uppercase',
            color:'rgba(220,100,100,0.9)', marginBottom:'0.4rem',
          }}>{apiError.title}</p>
          <p style={{
            fontFamily:'var(--font-body)',
            fontSize:'clamp(0.76rem,0.86vw,0.92rem)',
            color:'rgba(228,208,185,0.82)',
            lineHeight:1.55, margin:'0 0 0.8rem 0',
          }}>{apiError.message}</p>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {apiError.action === 'retry'    && <button onClick={() => setApiError(null)} style={errBtnStyle(false)}>Try again</button>}
            {apiError.action === 'settings' && <button onClick={() => openSettings?.()} style={errBtnStyle(true)}>Open Settings</button>}
            {apiError.action === 'external' && (
              <a href={apiError.url} target="_blank" rel="noopener noreferrer"
                style={{...errBtnStyle(true), textDecoration:'none', display:'inline-block'}}>
                openrouter.ai
              </a>
            )}
            <button onClick={() => setApiError(null)} style={errBtnStyle(false)}>Dismiss</button>
          </div>
        </div>
      )}

      {/* ── Back button ───────────────────────────────────────────────────── */}
      <button
        onClick={() => navigate(SCREENS.MAIN_MENU)}
        title="Back to Menu"
        style={{
          position:'fixed',
          top:'clamp(0.9rem,1.6vh,1.4rem)',
          left:'clamp(0.9rem,1.6vw,1.4rem)',
          zIndex:600,
          display:'flex', alignItems:'center', gap:'0.45rem',
          background:'rgba(10,8,18,0.82)',
          border:'1px solid rgba(155,122,38,0.45)',
          borderRadius:'2px',
          padding:'0.5em 1em 0.5em 0.75em',
          cursor:'pointer',
          backdropFilter:'blur(8px)',
          transition:'all 0.18s ease',
          boxShadow:'0 2px 16px rgba(0,0,0,0.6)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(201,168,76,0.1)'
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.65)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(10,8,18,0.82)'
          e.currentTarget.style.borderColor = 'rgba(155,122,38,0.45)'
        }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M8 2L4 6L8 10" stroke="rgba(218,182,88,0.88)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{
          fontFamily:'var(--font-heading)',
          fontSize:'clamp(0.54rem,0.62vw,0.68rem)',
          letterSpacing:'0.22em', textTransform:'uppercase',
          color:'rgba(218,182,88,0.85)',
        }}>Back</span>
      </button>

      {/* ── Settings shortcut ─────────────────────────────────────────────── */}
      <button
        onClick={() => openSettings?.()}
        title="Settings"
        style={{
          position:'fixed',
          top:'clamp(0.9rem,1.6vh,1.4rem)',
          right:'clamp(0.9rem,1.6vw,1.4rem)',
          zIndex:600,
          width:'36px', height:'36px',
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(10,8,18,0.82)',
          border:'1px solid rgba(155,122,38,0.4)',
          borderRadius:'2px', cursor:'pointer',
          backdropFilter:'blur(8px)',
          transition:'all 0.18s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(10,8,18,0.82)'; e.currentTarget.style.borderColor='rgba(155,122,38,0.4)' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2" stroke="rgba(201,168,76,0.72)" strokeWidth="1.4"/>
          <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.6 2.6l1.1 1.1M10.3 10.3l1.1 1.1M2.6 11.4l1.1-1.1M10.3 3.7l1.1-1.1"
            stroke="rgba(201,168,76,0.72)" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>

    </div>
  )
}
