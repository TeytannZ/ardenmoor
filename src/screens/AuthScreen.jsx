import React, { useState, useEffect, useRef } from 'react'
import { SCREENS, BackButton } from '../App.jsx'
import { SoundEngine } from '../lib/audio.js'
import { storage } from '../lib/storage.js'
import { signIn, signUp } from '../lib/supabase.js'

// ─── AuthScreen ───────────────────────────────────────────────────────────────
// Split layout: left lore panel (55%) + right form panel (45%)
// ≤860px: single centered form, lore panel hidden.
//
// Background: ultra-wide images pan slowly left↔right, crossfade between them.
// Images used (3:1 ratio recommended, 3840×1280):
//   auth-bg.jpg (fallback if panoramic not ready: menu-bg-1..5.jpg)
//
// Ultra-wide bg cycle: auth-bg-1.jpg, auth-bg-2.jpg, auth-bg-3.jpg
//   Falls back to auth-bg.jpg → menu-bg-1.jpg if panoramics not present.
// ─────────────────────────────────────────────────────────────────────────────

const USE_SUPABASE = true

// Auth-screen background images (3:1 ratio, 3840x1280 recommended).
// Dedicated to auth screen — different from main menu backgrounds.
// Until wide images are generated, falls back to any jpg that exists.
const _BASE = import.meta.env.BASE_URL
const BG_IMAGES = [
  `${_BASE}assets/images/ui/auth-wide-1.jpg`,
  `${_BASE}assets/images/ui/auth-wide-2.jpg`,
  `${_BASE}assets/images/ui/auth-wide-3.jpg`,
]

// ── Lore quotes ───────────────────────────────────────────────────────────────
const QUOTES = {
  signin: {
    text: 'A deed unrecorded is a deed undone. Return to the Archive — your Chronicle remembers what you may have forgotten.',
    attr: '— Warden\'s Inscription, Gate of Recollection',
  },
  signup: {
    text: 'The distance between who you are and who you intend to be is measured not in years, but in deeds. Begin yours.',
    attr: '— Maren, First Archivist of the Forgotten Codex',
  },
}

// ── SFX ───────────────────────────────────────────────────────────────────────
const sfxHover   = () => { try { SoundEngine.uiHover()    } catch (_) {} }
const sfxType    = () => { try { SoundEngine.inkDrop()    } catch (_) {} }  // weighted ink-drop, not digital click
const sfxError   = () => { try { SoundEngine.uiError()    } catch (_) {} }
const sfxSuccess = () => { try { SoundEngine.deedComplete() } catch (_) {} }

// ── Panning background ─────────────────────────────────────────────────────────
// Left → right pan at constant pixel speed. No mouse movement.
// When right edge reached, crossfade to next image from left.
const AUTH_PAN_SPEED  = 8      // px per second
const AUTH_ASPECT     = 2.4    // must match generated image ratio
const AUTH_FADE_MS    = 1400   // crossfade duration

function PanningBackground() {
  const [bgIndex,      setBgIndex]      = useState(0)
  const [prevIndex,    setPrevIndex]    = useState(-1)
  const [panStartTime, setPanStartTime] = useState(() => performance.now())
  const cyclingRef = useRef(false)
  const currentRef = useRef(null)

  useEffect(() => {
    let raf
    const tick = (now) => {
      if (currentRef.current) {
        const viewH      = window.innerHeight
        const viewW      = window.innerWidth
        const renderedW  = viewH * AUTH_ASPECT
        const extraW     = Math.max(renderedW - viewW, 1)
        const elapsed    = now - panStartTime
        const pxTraveled = (elapsed / 1000) * AUTH_PAN_SPEED
        const bgPct      = Math.min((pxTraveled / extraW) * 100, 100)
        currentRef.current.style.backgroundPositionX = `${bgPct}%`

        if (pxTraveled >= extraW && !cyclingRef.current) {
          cyclingRef.current = true
          const next = (bgIndex + 1) % BG_IMAGES.length
          setPrevIndex(bgIndex)
          setBgIndex(next)
          setPanStartTime(performance.now())
          setTimeout(() => { cyclingRef.current = false }, AUTH_FADE_MS + 100)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [bgIndex, panStartTime])

  const imgStyle = (src, isPrev) => ({
    position:            'absolute', inset: 0,
    backgroundImage:     `url(${src})`,
    backgroundSize:      'cover',
    backgroundPositionX: isPrev ? '100%' : '0%',
    backgroundPositionY: 'center',
    backgroundColor:     '#08070f',
    filter:              'brightness(0.55) saturate(0.6)',
    opacity:             isPrev ? 0 : 1,
    transition:          `opacity ${AUTH_FADE_MS}ms ease`,
    willChange:          'background-position-x',
  })

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:0 }}>
      {prevIndex >= 0 && <div style={imgStyle(BG_IMAGES[prevIndex], true)} />}
      <div ref={currentRef} style={imgStyle(BG_IMAGES[bgIndex], false)} />
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'linear-gradient(100deg, rgba(5,4,12,0.0) 0%, rgba(5,4,12,0.05) 40%, rgba(5,4,12,0.82) 100%)',
      }} />
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'linear-gradient(to bottom, rgba(5,4,12,0.65) 0%, transparent 10%, transparent 90%, rgba(5,4,12,0.65) 100%)',
      }} />
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
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      r: Math.random() * 1.4 + 0.25,
      vx: (Math.random() - 0.5) * 0.1, vy: -(Math.random() * 0.1 + 0.018),
      life: Math.random() * 200, max: Math.random() * 160 + 90,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life++
        if (p.life > p.max || p.y < -4) {
          p.x = Math.random() * canvas.width; p.y = canvas.height + 4; p.life = 0
          p.max = Math.random() * 160 + 90
        }
        const a = Math.sin((p.life / p.max) * Math.PI) * 0.5
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${a})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', width:'100%', height:'100%' }} />
}

// ── Corner brackets ───────────────────────────────────────────────────────────
function CornerBrackets({ size = 24, color = 'rgba(180,140,50,0.6)' }) {
  const s = size
  const corners = [
    { style: { top:0, left:0     }, d: `M2 ${s-2} L2 2 L${s-2} 2` },
    { style: { top:0, right:0    }, d: `M2 2 L${s-2} 2 L${s-2} ${s-2}` },
    { style: { bottom:0, left:0  }, d: `M2 2 L2 ${s-2} L${s-2} ${s-2}` },
    { style: { bottom:0, right:0 }, d: `M${s-2} 2 L${s-2} ${s-2} L2 ${s-2}` },
  ]
  return (
    <>
      {corners.map((c, i) => (
        <svg key={i} viewBox={`0 0 ${s} ${s}`}
          style={{ position:'absolute', width:s, height:s, pointerEvents:'none', ...c.style }}>
          <path d={c.d} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        </svg>
      ))}
    </>
  )
}

// ── Rune glyph ────────────────────────────────────────────────────────────────
function RuneGlyph({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ display:'inline-block', flexShrink:0 }}>
      <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8Z" stroke="rgba(201,168,76,0.75)" strokeWidth="1.2" fill="none"/>
    </svg>
  )
}

// ── Eye icon for password toggle ──────────────────────────────────────────────
function EyeIcon({ visible }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {visible
        ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
        : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
      }
    </svg>
  )
}

// ── Input field ───────────────────────────────────────────────────────────────
function Field({ label, hint, type = 'text', value, onChange, error, autoFocus, action }) {
  const [focused, setFocused] = useState(false)
  const [showPw,  setShowPw]  = useState(false)
  const active    = focused || value.length > 0
  const inputType = type === 'password' ? (showPw ? 'text' : 'password') : type

  return (
    <div style={{ position:'relative', marginBottom:'0.2rem', paddingBottom: error ? '1.6rem' : '0.9rem' }}>
      <label style={{
        position:      'absolute',
        left:          '0.9em',
        top:           active ? '-0.62em' : '0.9em',
        fontSize:      active ? '0.63rem' : '0.92rem',
        fontFamily:    '"Cinzel", serif',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color:         error   ? '#f07a6a'
                     : active  ? '#d4aa50'
                     :           'rgba(200,160,70,0.75)',
        background:    active ? 'rgba(7,6,18,0.98)' : 'transparent',
        padding:       active ? '0 0.35em' : '0',
        pointerEvents: 'none',
        transition:    'all 0.14s ease',
        zIndex:        2,
        whiteSpace:    'nowrap',
      }}>
        {label}
      </label>

      <input
        type={inputType}
        value={value}
        autoFocus={autoFocus}
        placeholder={focused && hint ? hint : ''}
        onChange={e => { onChange(e.target.value); sfxType() }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:         '100%',
          padding:       `0.88em ${type === 'password' ? '2.8em' : '0.95em'} 0.88em 0.95em`,
          background:    'rgba(5,4,16,0.92)',
          border:        `1px solid ${
            error   ? 'rgba(200,70,50,0.75)'
          : focused ? 'rgba(201,168,76,0.78)'
          :           'rgba(90,70,28,0.55)'
          }`,
          color:         '#f0e6cc',
          fontFamily:    '"Lora", serif',
          fontSize:      '0.96rem',
          letterSpacing: type === 'password' && !showPw ? '0.18em' : '0.02em',
          outline:       'none',
          borderRadius:  '2px',
          boxShadow:     focused
            ? 'inset 0 2px 14px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.12)'
            : 'inset 0 2px 8px rgba(0,0,0,0.6)',
          transition:    'border-color 0.14s ease, box-shadow 0.14s ease',
        }}
      />

      {type === 'password' && (
        <button
          onClick={() => { setShowPw(p => !p); sfxHover() }}
          style={{
            position:   'absolute', right:'0.7em', top:'50%',
            transform:  'translateY(-56%)',
            background: 'transparent', border:'none',
            color:      showPw ? 'rgba(201,168,76,0.8)' : 'rgba(170,135,55,0.55)',
            padding:    '0.2em', cursor:'pointer',
            transition: 'color 0.14s ease',
          }}
        >
          <EyeIcon visible={showPw} />
        </button>
      )}

      {action && (
        <button onClick={action.onClick} style={{
          position:      'absolute', right:0, top:'-0.7em',
          background:    'transparent', border:'none',
          fontFamily:    '"Cinzel", serif',
          fontSize:      '0.62rem',
          letterSpacing: '0.14em',
          color:         'rgba(185,148,58,0.72)',
          cursor:        'pointer',
          transition:    'color 0.14s ease',
        }}
          onMouseEnter={e => { e.target.style.color='rgba(220,180,80,0.95)'; sfxHover() }}
          onMouseLeave={e => e.target.style.color='rgba(185,148,58,0.72)'}
        >
          {action.label}
        </button>
      )}

      {error && (
        <div style={{
          position:   'absolute', bottom:'0.2rem', left:0,
          fontFamily: '"Lora", serif', fontStyle:'italic',
          fontSize:   '0.72rem',
          color:      '#f07a6a', lineHeight:1.3,
        }}>
          {error}
        </div>
      )}
    </div>
  )
}

// ── Remember toggle ───────────────────────────────────────────────────────────
function RememberToggle({ value, onChange }) {
  return (
    <div
      onClick={() => { onChange(!value); sfxHover() }}
      style={{
        display:'flex', alignItems:'center', gap:'0.65em',
        cursor:'pointer', margin:'0.1rem 0 0.5rem', userSelect:'none',
      }}
    >
      <div style={{
        width:'16px', height:'16px', flexShrink:0,
        border:`1px solid ${value ? 'rgba(201,168,76,0.85)' : 'rgba(100,80,30,0.55)'}`,
        background: value ? 'rgba(201,168,76,0.1)' : 'rgba(5,4,16,0.9)',
        borderRadius:'1px',
        display:'flex', alignItems:'center', justifyContent:'center',
        transition:'all 0.14s ease',
        boxShadow: value ? '0 0 10px rgba(201,168,76,0.25)' : 'none',
      }}>
        {value && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.2 6L8 1" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{
        fontFamily:    '"Cinzel", serif',
        fontSize:      '0.7rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color:         value ? 'rgba(210,168,65,0.92)' : 'rgba(170,136,52,0.65)',
        transition:    'color 0.14s ease',
      }}>
        Keep me bound to the Archive
      </span>
    </div>
  )
}

// ── Tab bar ───────────────────────────────────────────────────────────────────
function Tabs({ mode, onSwitch }) {
  return (
    <div style={{ display:'flex', marginBottom:'1.8rem' }}>
      {[['signin','Sign In'],['signup','Register']].map(([m, label]) => (
        <button key={m} onClick={() => onSwitch(m)} onMouseEnter={sfxHover}
          style={{
            flex:1, padding:'0.72em 0',
            background:'transparent', border:'none',
            borderBottom: mode === m
              ? '2px solid rgba(201,168,76,0.9)'
              : '2px solid rgba(65,50,18,0.45)',
            fontFamily:    '"Cinzel", serif',
            fontSize:      '0.8rem',
            letterSpacing: '0.22em', textTransform:'uppercase',
            color:  mode === m ? '#d4aa50' : 'rgba(170,136,52,0.65)',
            textShadow: mode === m ? '0 0 14px rgba(201,168,76,0.4)' : 'none',
            cursor:'pointer', transition:'all 0.14s ease',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// ── Submit button ─────────────────────────────────────────────────────────────
function SubmitBtn({ label, loading, onClick }) {
  const [hov,   setHov]   = useState(false)
  const [press, setPress] = useState(false)
  return (
    <button
      onClick={onClick} disabled={loading}
      onMouseEnter={() => { setHov(true);  sfxHover() }}
      onMouseLeave={() => { setHov(false); setPress(false) }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position:      'relative',
        width:         '100%',
        marginTop:     '1.1rem',
        padding:       '0.95em 0',
        fontFamily:    '"Cinzel", serif',
        fontSize:      '0.96rem',
        fontWeight:    600,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color:         loading ? 'rgba(160,128,48,0.4)' : hov ? '#f8e880' : '#d4aa50',
        background:    hov && !loading ? 'rgba(201,168,76,0.07)' : 'transparent',
        border:        `1px solid ${hov && !loading ? 'rgba(220,185,95,0.75)' : 'rgba(110,86,30,0.5)'}`,
        borderRadius:  '2px',
        textShadow:    hov && !loading
          ? '0 0 20px rgba(248,232,128,0.9), 0 2px 14px rgba(0,0,0,1)'
          : '0 1px 10px rgba(0,0,0,0.9)',
        boxShadow:     hov && !loading ? '0 0 30px rgba(201,168,76,0.1)' : 'none',
        transform:     press ? 'scale(0.988)' : 'scale(1)',
        transition:    'all 0.14s ease',
        cursor:        loading ? 'default' : 'pointer',
        overflow:      'hidden',
      }}
    >
      <div style={{
        position:'absolute', bottom:0, left: hov && !loading ? '5%' : '50%',
        height:'1px',
        width:  hov && !loading ? '90%' : '0%',
        background:'linear-gradient(to right, rgba(201,168,76,0.9), rgba(240,210,100,0.1))',
        transition:'width 0.2s ease, left 0.2s ease',
      }} />
      {loading
        ? <span style={{ display:'inline-flex', gap:'0.4em', alignItems:'center', justifyContent:'center' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width:'5px', height:'5px', borderRadius:'50%',
                background:'rgba(201,168,76,0.7)', display:'inline-block',
                animation:`adot 1.2s ease-in-out ${i*0.18}s infinite`,
              }}/>
            ))}
            <style>{`@keyframes adot{0%,80%,100%{transform:scale(0.5);opacity:0.25}40%{transform:scale(1);opacity:1}}@keyframes authPulse{0%,100%{opacity:0.3;transform:scale(0.7)}50%{opacity:1;transform:scale(1)}}`}</style>
          </span>
        : label
      }
    </button>
  )
}

// ── Responsive breakpoint ─────────────────────────────────────────────────────
function useIsNarrow(bp = 860) {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp)
  useEffect(() => {
    const h = () => setNarrow(window.innerWidth < bp)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [bp])
  return narrow
}

// ── Mock auth ─────────────────────────────────────────────────────────────────
async function mockAuth(username) {
  await new Promise(r => setTimeout(r, 500))
  const slug = username.trim().toLowerCase().replace(/\s+/g, '-')
  return { id: `local-${slug}`, email: '', username: username.trim() }
}

// ── API key step — shown after auth if no key is saved ────────────────────────
function ApiKeyStep({ onComplete }) {
  const [apiKey,       setApiKey]       = useState('')
  const [customModel,  setCustomModel]  = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [error,        setError]        = useState('')
  const [binding,      setBinding]      = useState(false)

  const handleBindKey = () => {
    const trimmed = apiKey.trim()
    if (!trimmed) { setError('A key is required.'); sfxError(); return }
    if (!trimmed.startsWith('sk-')) { setError('OpenRouter keys begin with sk-or-...'); sfxError(); return }
    setError('')
    setBinding(true)
    const settings = storage.getSettings()
    storage.saveSettings({ ...settings, apiKey: trimmed, ...(customModel.trim() ? { model: customModel.trim() } : {}) })
    setTimeout(() => { sfxSuccess(); onComplete() }, 820)
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(1.5rem,4vw,3rem)',
      background: 'linear-gradient(to bottom, rgba(4,3,10,0.6) 0%, rgba(4,3,10,0.85) 100%)',
    }}>
      <div style={{
        width: '100%', maxWidth: '520px',
        background: 'linear-gradient(155deg, rgba(8,7,20,0.98) 0%, rgba(4,3,12,0.99) 100%)',
        border: '1px solid rgba(110,86,28,0.4)',
        borderRadius: '2px',
        padding: 'clamp(2.5rem,4vh,3.5rem) clamp(2rem,4vw,3.5rem)',
        boxShadow: '0 4px 100px rgba(0,0,0,0.97)',
        position: 'relative',
      }}>
        <CornerBrackets size={28} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.6em', marginBottom:'1.5rem' }}>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(to right, transparent, rgba(160,128,42,0.5))' }}/>
            <RuneGlyph size={16} />
            <div style={{ flex:1, height:'1px', background:'linear-gradient(to left, transparent, rgba(160,128,42,0.5))' }}/>
          </div>
          <div style={{
            fontFamily: '"Cinzel", serif', fontSize: 'clamp(1.05rem,1.5vw,1.35rem)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#d8b455', textShadow: '0 0 28px rgba(201,168,76,0.4)',
            marginBottom: '0.8rem',
          }}>
            Bind the Chronicle Forge
          </div>
          <div style={{
            fontFamily: '"Lora", serif', fontStyle: 'italic',
            fontSize: '0.9rem',
            color: 'rgba(220,195,140,0.85)', lineHeight: 1.7,
          }}>
            Enter your OpenRouter key to power the Archive's AI.
            Get a free key at <span style={{ color: '#d4aa50' }}>openrouter.ai</span>
          </div>
        </div>

        <Field
          label="OpenRouter API Key"
          hint="sk-or-v1-..."
          type="password"
          value={apiKey}
          onChange={setApiKey}
          error={error}
          autoFocus
        />

        <div style={{ marginTop: '0.6rem', marginBottom: '1.2rem' }}>
          <button
            onClick={() => { setShowAdvanced(p => !p); sfxHover() }}
            style={{ background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.4em', padding:0 }}
          >
            <span style={{ fontFamily:'"Cinzel",serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(155,120,38,0.8)' }}>
              {showAdvanced ? '▾' : '▸'} Advanced
            </span>
          </button>
          {showAdvanced && (
            <div style={{ marginTop: '0.9rem' }}>
              <Field
                label="Model override (optional)"
                hint="google/gemini-2.0-flash-001"
                value={customModel}
                onChange={setCustomModel}
              />
              <div style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'0.75rem', color:'rgba(175,148,90,0.75)', lineHeight:1.6, marginTop:'0.4rem' }}>
                Leave blank to use the Archive default. See openrouter.ai/models for options.
              </div>
            </div>
          )}
        </div>

        {binding && (
          <div style={{
            marginTop: '0.9rem', padding: '0.75rem 1rem',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.28)',
            borderRadius: '2px',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <div style={{ display:'flex', gap:'5px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width:'5px', height:'5px', borderRadius:'50%',
                  background:'rgba(201,168,76,0.7)',
                  animation:`authPulse 1.2s ease-in-out ${i*0.2}s infinite`,
                }}/>
              ))}
            </div>
            <span style={{
              fontFamily:'"Cinzel",serif', fontSize:'0.72rem',
              letterSpacing:'0.28em', textTransform:'uppercase',
              color:'rgba(201,168,76,0.85)',
            }}>Key bound — opening the Archive</span>
          </div>
        )}

        <SubmitBtn label="Bind the Key" loading={binding} onClick={handleBindKey} />

        <div style={{ marginTop: '1.4rem', textAlign: 'center', fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: '0.75rem', color: 'rgba(175,148,90,0.6)' }}>
          Stored only on this device. Change at any time in Settings.
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AuthScreen({ appState, navigate, updateState }) {
  const [mode,      setMode]      = useState('signin')
  const [mounted,   setMounted]   = useState(false)
  const [fading,    setFading]    = useState(false)
  const [username,  setUsername]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [remember,  setRemember]  = useState(true)
  const [loading,   setLoading]   = useState(false)
  const [errors,    setErrors]    = useState({})
  const [globalErr, setGlobalErr] = useState('')
  const [step,      setStep]      = useState('auth')
  const [pendingUser, setPendingUser] = useState(null)
  const isNarrow = useIsNarrow(860)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  const switchMode = (m) => {
    if (m === mode || fading) return
    sfxHover(); setFading(true)
    setTimeout(() => {
      setMode(m); setErrors({}); setGlobalErr('')
      setUsername(''); setEmail(''); setPassword(''); setConfirm('')
      setFading(false)
    }, 160)
  }

  const validate = () => {
    const e = {}
    if (USE_SUPABASE) {
      if (!email.trim())                    e.email    = 'An email address is required.'
      else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'Enter a valid email address.'
      if (!password)                         e.password = 'A password is required.'
      else if (password.length < 6)          e.password = 'Minimum 6 characters required.'
      if (mode === 'signup') {
        if (!username.trim())                e.username = 'A name is required.'
        if (password !== confirm)            e.confirm  = 'Passwords do not match.'
      }
    } else {
      if (!username.trim())                  e.username = 'A name is required.'
      else if (username.trim().length < 2)   e.username = 'Minimum 2 characters.'
    }
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); sfxError(); return }
    setErrors({}); setGlobalErr(''); setLoading(true)
    try {
      let user
      if (USE_SUPABASE) {
        const raw = mode === 'signup'
          ? await signUp(email, password, username)
          : await signIn(email, password)
        user = {
          id:       raw.id,
          email:    raw.email,
          username: raw.user_metadata?.username || email.split('@')[0],
        }
      } else {
        user = await mockAuth(username)
      }
      sfxSuccess()
      storage.saveSession({ ...(storage.getSession() || {}), user, rememberMe: remember })
      updateState({ user })
      const currentSettings = storage.getSettings()
      if (!currentSettings.apiKey) {
        setPendingUser(user)
        setStep('apikey')
      } else {
        setTimeout(() => navigate(SCREENS.MAIN_MENU), 280)
      }
    } catch (err) {
      sfxError()
      const msg = (err?.message || '').toLowerCase()
      if (msg.includes('invalid login') || msg.includes('invalid_credentials') || msg.includes('invalid email or password'))
        setGlobalErr('These credentials are not recognised in the Archive.')
      else if (msg.includes('already registered') || msg.includes('already exists') || msg.includes('user already registered'))
        setGlobalErr('This seal is already bound. Try signing in instead.')
      else if (msg.includes('email not confirmed'))
        setGlobalErr('Your seal has not yet been confirmed. Check your email first.')
      else if (msg.includes('400') || msg.includes('signup'))
        setGlobalErr('If testing locally, disable "Confirm email" in Supabase → Auth → Email.')
      else
        setGlobalErr('The Archive could not be reached. Try again momentarily.')
    } finally {
      setLoading(false)
    }
  }

  const isSignUp = mode === 'signup'
  const quote    = QUOTES[mode]

  return (
    <div
      onKeyDown={e => e.key === 'Enter' && !loading && handleSubmit()}
      style={{
        position:'fixed', inset:0, overflow:'hidden',
        display:'flex', alignItems:'stretch',
        opacity: mounted ? 1 : 0,
        transition:'opacity 0.55s ease',
      }}
    >
      <PanningBackground />
      <DustCanvas />
      <BackButton navigate={navigate} from={SCREENS.AUTH} />

      {/* ── LAYOUT ROW ── */}
      <div style={{
        position:   'relative', zIndex:3,
        display:    'flex',
        width:      '100%',
        alignItems: 'stretch',
        maxWidth:   '1500px',
        margin:     '0 auto',
        padding:    isNarrow ? '0' : '0 clamp(3rem,5vw,6rem)',
      }}>

        {/* ══ LEFT LORE PANEL ══════════════════════════════════════════════ */}
        {!isNarrow && (
          <div style={{
            flex:           '1 1 0',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            padding:        '4rem clamp(2rem,3.5vw,4.5rem) 4rem 0',
          }}>

            {/* Title */}
            <div style={{ marginBottom:'0.7rem', overflow:'visible' }}>
              <div style={{
                fontFamily:           '"Cinzel Decorative", serif',
                fontSize:             'clamp(2.8rem,3.8vw,5rem)',
                fontWeight:           700,
                color:                'transparent',
                backgroundImage:      'linear-gradient(170deg,#fff8d8 0%,#ecca50 16%,#b88018 46%,#c49228 72%,#f8e868 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip:       'text',
                display:              'inline-block',
                padding:              '0 0.2em 0.06em 0.04em',
                overflow:             'visible',
                filter:               'drop-shadow(0 0 35px rgba(201,168,76,0.55)) drop-shadow(0 4px 24px rgba(0,0,0,1))',
                letterSpacing:        '0.05em',
                lineHeight:           1.05,
              }}>
                ARDENMOOR
              </div>
            </div>

            {/* Subtitle */}
            <div style={{
              fontFamily:    '"Cormorant SC", serif',
              fontStyle:     'italic',
              fontSize:      '1rem',
              letterSpacing: '0.3em',
              color:         'rgba(210,172,70,0.85)',
              marginBottom:  '1.8rem',
              paddingLeft:   '0.1em',
            }}>
              The Forgotten Codex
            </div>

            {/* Short gold rule */}
            <div style={{
              width:         'clamp(80px,9vw,140px)',
              height:        '1px',
              background:    'linear-gradient(to right, rgba(201,168,76,0.85), transparent)',
              marginBottom:  '2rem',
            }} />

            {/* Quote */}
            <blockquote style={{
              fontFamily:   '"Lora", serif',
              fontStyle:    'italic',
              fontSize:     'clamp(1.05rem,1.35vw,1.45rem)',
              lineHeight:   1.85,
              color:        'rgba(235,215,165,0.95)',
              borderLeft:   '2px solid rgba(201,168,76,0.75)',
              paddingLeft:  'clamp(1rem,1.4vw,1.5rem)',
              margin:       0,
              marginBottom: '1rem',
              opacity:      fading ? 0.3 : 1,
              transition:   'opacity 0.3s ease',
            }}>
              "{quote.text}"
            </blockquote>

            {/* Attribution */}
            <div style={{
              fontFamily:    '"Cinzel", serif',
              fontSize:      '0.72rem',
              letterSpacing: '0.14em',
              color:         'rgba(195,158,65,0.8)',
              textTransform: 'uppercase',
              paddingLeft:   'clamp(1.1rem,1.6vw,1.7rem)',
              marginBottom:  '2.8rem',
              opacity:       fading ? 0.3 : 1,
              transition:    'opacity 0.3s ease',
            }}>
              {quote.attr}
            </div>

            {/* World pills */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.55rem' }}>
              {['Chronicle', 'Epoch', 'Deed', 'Archive', 'Seal'].map(w => (
                <span key={w} style={{
                  fontFamily:    '"Cinzel", serif',
                  fontSize:      '0.66rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'rgba(200,162,65,0.8)',
                  border:        '1px solid rgba(140,110,35,0.45)',
                  borderRadius:  '1px',
                  padding:       '0.3em 0.7em',
                  background:    'rgba(5,4,14,0.5)',
                }}>
                  {w}
                </span>
              ))}
            </div>

          </div>
        )}

        {/* No hard separator — panels breathe naturally with padding gap */}

        {/* ══ RIGHT FORM PANEL ═════════════════════════════════════════════ */}
        <div style={{
          flex:           isNarrow ? '1 1 auto' : '0 0 clamp(380px,38vw,500px)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        isNarrow
            ? 'clamp(2rem,5vh,3rem) clamp(1.2rem,4vw,2rem)'
            : '4rem clamp(1rem,2vw,2.5rem) 4rem clamp(2rem,3vw,4rem)',
          minHeight:      '100vh',
        }}>

          {/* Card */}
          <div style={{
            position:   'relative',
            width:      '100%',
            maxWidth:   '460px',
            padding:    'clamp(2.4rem,4vh,3.4rem) clamp(2rem,3vw,2.8rem)',
            background: 'linear-gradient(155deg, rgba(9,8,22,0.97) 0%, rgba(5,4,15,0.99) 100%)',
            border:     '1px solid rgba(110,86,28,0.38)',
            boxShadow:  '0 4px 100px rgba(0,0,0,0.97), 0 0 60px rgba(0,0,0,0.8)',
            opacity:    fading ? 0 : 1,
            transform:  fading ? 'translateY(5px)' : 'translateY(0)',
            transition: 'opacity 0.15s ease, transform 0.15s ease',
          }}>
            <CornerBrackets size={26} />

            {/* Card header */}
            <div style={{ textAlign:'center', marginBottom:'1.8rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.6em', marginBottom:'1.2rem' }}>
                <div style={{ flex:1, height:'1px', background:'linear-gradient(to right, transparent, rgba(160,128,42,0.5))' }}/>
                <RuneGlyph size={14} />
                <div style={{ flex:1, height:'1px', background:'linear-gradient(to left, transparent, rgba(160,128,42,0.5))' }}/>
              </div>
              <div style={{
                fontFamily:    '"Cinzel", serif',
                fontSize:      '1.35rem',
                fontWeight:    600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#d8b455',
                textShadow:    '0 0 28px rgba(201,168,76,0.4), 0 2px 12px rgba(0,0,0,1)',
                marginBottom:  '0.4rem',
              }}>
                {isSignUp ? 'Forge your Seal' : 'Enter the Archive'}
              </div>
              <div style={{
                fontFamily:    '"Lora", serif',
                fontStyle:     'italic',
                fontSize:      '0.88rem',
                color:         'rgba(195,158,65,0.82)',
                letterSpacing: '0.05em',
              }}>
                {isSignUp ? 'Begin your Chronicle' : 'Welcome back, Seeker'}
              </div>
            </div>

            <Tabs mode={mode} onSwitch={switchMode} />

            {isSignUp && (
              <Field label="Your Name" hint="How you'll appear in the Archive"
                value={username} onChange={setUsername} error={errors.username} autoFocus={isSignUp} />
            )}
            {USE_SUPABASE ? (
              <>
                <Field label="Email" hint="seeker@realm.com" type="email"
                  value={email} onChange={setEmail} error={errors.email} autoFocus={!isSignUp} />
                <Field label="Password" type="password"
                  value={password} onChange={setPassword} error={errors.password}
                  action={!isSignUp ? { label:'Forgot?', onClick:() => {} } : undefined} />
                {isSignUp && (
                  <Field label="Confirm Password" type="password"
                    value={confirm} onChange={setConfirm} error={errors.confirm} />
                )}
              </>
            ) : (
              !isSignUp && (
                <Field label="Your Name" value={username} onChange={setUsername}
                  error={errors.username} autoFocus />
              )
            )}

            <RememberToggle value={remember} onChange={setRemember} />

            {globalErr && (
              <div style={{
                marginTop:'0.5rem', padding:'0.65em 0.9em',
                border:'1px solid rgba(140,45,30,0.55)',
                background:'rgba(40,8,5,0.55)',
                fontFamily:'"Lora", serif', fontStyle:'italic',
                fontSize:'0.78rem', color:'#f07a6a', lineHeight:1.55,
                borderRadius:'2px',
              }}>
                {globalErr}
              </div>
            )}

            <SubmitBtn
              label={isSignUp ? 'Create Account' : 'Enter the Archive'}
              loading={loading}
              onClick={handleSubmit}
            />

            {/* Footer */}
            <div style={{ marginTop:'1.8rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.55em', marginBottom:'0.9rem' }}>
                <div style={{ flex:1, height:'1px', background:'linear-gradient(to right, transparent, rgba(130,100,30,0.4))' }}/>
                <RuneGlyph size={11} />
                <div style={{ flex:1, height:'1px', background:'linear-gradient(to left, transparent, rgba(130,100,30,0.4))' }}/>
              </div>
              <div style={{
                textAlign:'center',
                fontFamily:'"Lora", serif', fontStyle:'italic',
                fontSize:'0.78rem',
                color:'rgba(185,150,60,0.78)',
                lineHeight:1.65,
              }}>
                {isSignUp
                  ? 'Those who forge a Chronicle walk paths others only dream of.'
                  : 'The Archive holds all deeds sworn within its walls — none forgotten.'}
              </div>
            </div>

          </div>
        </div>
      </div>

      {step === 'apikey' && (
        <ApiKeyStep onComplete={() => {
          navigate(SCREENS.MAIN_MENU)
        }} />
      )}
    </div>
  )
}
