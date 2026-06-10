import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SCREENS } from '../App.jsx'
import { SoundEngine } from '../lib/audio.js'
import { storage } from '../lib/storage.js'

// ─── EnterScreen ──────────────────────────────────────────────────────────────
// FILES:
//   public/assets/images/ui/enter-bg.mp4
//   public/assets/images/ui/gate-left.png
//   public/assets/images/ui/gate-right.png
//   public/assets/audio/sfx/gate-open.mp3    (~1.1s stone grind)
//   public/assets/audio/sfx/enter-boom.mp3   (~0.5s deep impact)
//
// VIBRATION: whole screen shakes via a wrapper div translateX/Y
// — NOT the door divs (doors have their own CSS transition running)
// — Screen shake intensity follows door acceleration curve
// — Slam impact fires exactly at 1100ms (door fully open) with boom sound
// ─────────────────────────────────────────────────────────────────────────────

const getScale = () => Math.max(window.innerWidth / 1920, 0.18)

// ── Ambient dust ──────────────────────────────────────────────────────────────
function startDust(canvas, getOpacity) {
  const ctx   = canvas.getContext('2d')
  const area  = (canvas.width * canvas.height) / (1920 * 1080)
  const COUNT = Math.round(110 * Math.sqrt(area))
  let lastTime = null

  const make = (anyY = false) => {
    const s = getScale()
    const r = (Math.random() * 2.4 + 0.7) * s
    return {
      x:       Math.random() * canvas.width,
      // KEY FIX: always random Y — both initial AND respawn
      // Old code: anyY ? random : canvas.height+20 caused all respawns from bottom
      y:       Math.random() * canvas.height,
      r,
      squish:  0.78 + Math.random() * 0.22,
      angle:   Math.random() * Math.PI,
      va:      (Math.random() - 0.5) * 0.004,
      vx:      (Math.random() - 0.5) * 0.25 * s,
      vy:      -(Math.random() * 0.22 + 0.03) * s,
      life:    0,
      maxLife: Math.random() * 280 + 160,
      warm:    Math.random() > 0.4,
    }
  }

  const pts = Array.from({ length: COUNT }, () => {
    const p = make(true)
    p.life = Math.random() * p.maxLife
    return p
  })

  let raf
  const draw = (timestamp) => {
    const dt = lastTime ? Math.min((timestamp - lastTime) / 16.67, 3) : 1
    lastTime  = timestamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const fade = getOpacity()

    if (fade > 0) {
      pts.forEach(p => {
        p.x += p.vx * dt; p.y += p.vy * dt
        p.angle += p.va * dt; p.life += dt
        if (p.life > p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          Object.assign(p, make()); return
        }
        const t     = p.life / p.maxLife
        const alpha = Math.sin(t * Math.PI) * (p.warm ? 0.88 : 0.62) * fade
        if (alpha < 0.02) return

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)

        const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r * 2.5)
        if (p.warm) {
          gr.addColorStop(0,   'rgba(252,222,148,1)')
          gr.addColorStop(0.4, 'rgba(228,188,95,0.55)')
          gr.addColorStop(1,   'rgba(195,155,60,0)')
        } else {
          gr.addColorStop(0,   'rgba(252,246,232,1)')
          gr.addColorStop(0.4, 'rgba(228,220,205,0.48)')
          gr.addColorStop(1,   'rgba(190,182,168,0)')
        }
        ctx.beginPath()
        ctx.ellipse(0, 0, p.r * 2.5, p.r * 2.5 * p.squish, 0, 0, Math.PI * 2)
        ctx.fillStyle = gr
        ctx.fill()
        ctx.restore()
      })
    }
    raf = requestAnimationFrame(draw)
  }
  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}

// ── Seam burst on click ───────────────────────────────────────────────────────
function seamBurst(canvas) {
  const ctx = canvas.getContext('2d')
  const cx  = canvas.width / 2
  const cy  = canvas.height / 2
  const s   = getScale()

  const shards = Array.from({ length: 100 }, () => {
    const a   = Math.random() * Math.PI * 2
    const spd = (Math.random() * 11 + 2) * s
    return {
      x: cx, y: cy,
      vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 3 * s,
      r: (Math.random() * 2.8 + 0.4) * s,
      a: 1, warm: Math.random() > 0.15,
    }
  })

  let raf2
  const draw2 = () => {
    shards.forEach(sh => {
      if (sh.a <= 0) return
      sh.x += sh.vx; sh.y += sh.vy
      sh.vy += 0.18 * s; sh.vx *= 0.97; sh.a -= 0.018
      ctx.beginPath(); ctx.arc(sh.x, sh.y, sh.r, 0, Math.PI * 2)
      ctx.fillStyle = sh.warm
        ? `rgba(235,195,100,${Math.max(0, sh.a)})`
        : `rgba(255,248,215,${Math.max(0, sh.a)})`
      ctx.fill()
    })
    if (shards.some(sh => sh.a > 0)) raf2 = requestAnimationFrame(draw2)
  }
  draw2()
}

// ── Sliding dust — falls from seam during door movement ───────────────────────
function slidingDust(canvas) {
  const ctx   = canvas.getContext('2d')
  const cx    = canvas.width / 2
  const s     = getScale()
  // Only spawn for first 300ms — doors have barely moved, seam still visible
  // After that, motes just finish their lifecycle and disappear naturally
  const spawnUntil = performance.now() + 300
  const motes = []
  let raf3

  const draw3 = (now) => {
    if (now < spawnUntil && Math.random() > 0.3) {
      for (let i = 0; i < 4; i++) {
        motes.push({
          x: cx + (Math.random() - 0.5) * 10 * s,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.8 * s,
          vy: (Math.random() * 1 + 0.3) * s,
          r: (Math.random() * 1.8 + 0.3) * s,
          a: Math.random() * 0.8 + 0.2,
          life: 0, maxLife: Math.random() * 55 + 35,
        })
      }
    }
    for (let i = motes.length - 1; i >= 0; i--) {
      const m = motes[i]
      m.x += m.vx; m.y += m.vy; m.vy += 0.06 * s; m.life++
      m.a = (1 - m.life / m.maxLife) * 0.7
      if (m.life > m.maxLife) { motes.splice(i, 1); continue }
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(215,192,142,${Math.max(0, m.a)})`
      ctx.fill()
    }
    if (motes.length > 0 || now < spawnUntil) raf3 = requestAnimationFrame(draw3)
  }
  raf3 = requestAnimationFrame(draw3)
  return () => cancelAnimationFrame(raf3)
}

// ── Screen shake — applied to wrapper div, not door divs ─────────────────────
// Doors have their own CSS transition running — we must NOT touch their transform.
// Instead we shake the entire screen container.
// Intensity ramps with door acceleration: slow start → fast middle → eases at wall.
function startScreenShake(wrapperEl, duration) {
  const start = performance.now()
  const s     = getScale()
  // Responsive: ~3px base on 1920, ~4px on 2560, ~1px on mobile
  const maxPx = 4.5 * s
  let raf

  const draw = (now) => {
    const elapsed = now - start
    if (elapsed >= duration) {
      if (wrapperEl) wrapperEl.style.transform = ''
      return
    }

    const p = elapsed / duration
    // Intensity curve: matches cubic-bezier(0.4, 0, 1.0, 1.0)
    // Slow at start, peaks ~65%, eases as doors near wall
    const intensity = p < 0.65
      ? Math.pow(p / 0.65, 0.55)   // ramps up
      : 1 - ((p - 0.65) / 0.35)    // eases down

    const jx = (Math.random() - 0.5) * maxPx * intensity * 2
    const jy = (Math.random() - 0.5) * maxPx * intensity * 0.5

    if (wrapperEl) wrapperEl.style.transform = `translate(${jx}px, ${jy}px)`

    raf = requestAnimationFrame(draw)
  }
  raf = requestAnimationFrame(draw)
  return () => {
    cancelAnimationFrame(raf)
    if (wrapperEl) wrapperEl.style.transform = ''
  }
}

// ── Slam impact — violent screen shake when doors hit wall ────────────────────
// Decaying oscillation. Big hit, settles to rest over ~300ms.
function slamScreenShake(wrapperEl) {
  const start = performance.now()
  const dur   = 300
  const s     = getScale()
  // Much larger than rumble — this is the actual impact
  const maxPx = 13 * s
  let raf

  const draw = (now) => {
    const t     = Math.min((now - start) / dur, 1)
    const decay = Math.pow(1 - t, 1.6)
    const jx    = Math.sin(t * Math.PI * 8) * maxPx * decay
    const jy    = Math.cos(t * Math.PI * 5) * maxPx * 0.4 * decay

    if (wrapperEl) wrapperEl.style.transform = `translate(${jx}px, ${jy}px)`

    if (t < 1) raf = requestAnimationFrame(draw)
    else if (wrapperEl) wrapperEl.style.transform = ''
  }
  raf = requestAnimationFrame(draw)
  return () => {
    cancelAnimationFrame(raf)
    if (wrapperEl) wrapperEl.style.transform = ''
  }
}

// ── Audio ─────────────────────────────────────────────────────────────────────
function playAudio(src, volume = 0.85) {
  try {
    const a = new Audio(src)
    a.volume = volume
    a.play().catch(() => {})
    return a
  } catch (_) { return null }
}

// ── Safe timeout — fires on time even after tab was hidden ────────────────────
function safeTimeout(fn, delay) {
  const started = performance.now()
  let id

  const check = () => {
    const elapsed = performance.now() - started
    if (elapsed >= delay) fn()
    else id = setTimeout(check, delay - elapsed)
  }
  id = setTimeout(check, delay)

  const onVisible = () => {
    if (document.visibilityState === 'visible') {
      if (performance.now() - started >= delay) { clearTimeout(id); fn() }
    }
  }
  document.addEventListener('visibilitychange', onVisible)
  return () => {
    clearTimeout(id)
    document.removeEventListener('visibilitychange', onVisible)
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function EnterScreen({ appState, navigate, updateState }) {
  const canvasRef    = useRef(null)
  const wrapperRef   = useRef(null)
  const dustOpacity  = useRef(1)
  const [phase,     setPhase]     = useState('idle')
  const [mounted,   setMounted]   = useState(false)
  const [imgsReady, setImgsReady] = useState(false)
  const cleanups     = useRef([])

  // Preload gate images — no flash of missing images on slow connections
  useEffect(() => {
    let loaded = 0
    const base = import.meta.env.BASE_URL
    const srcs = [
      `${base}assets/images/ui/gate-left.png`,
      `${base}assets/images/ui/gate-right.png`,
    ]
    const onDone = () => { if (++loaded >= srcs.length) setImgsReady(true) }
    const imgs = srcs.map(src => {
      const img = new Image()
      img.onload  = onDone
      img.onerror = onDone  // missing file — don't block forever
      img.src     = src
      return img
    })
    return () => imgs.forEach(i => { i.onload = null; i.onerror = null })
  }, [])

  const resize = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    c.width  = window.innerWidth
    c.height = window.innerHeight
  }, [])

  // Only fade in after images are ready
  useEffect(() => {
    if (!imgsReady) return
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [imgsReady])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    resize()
    const stop = startDust(c, () => dustOpacity.current)
    window.addEventListener('resize', resize)
    return () => { stop(); window.removeEventListener('resize', resize) }
  }, [resize])

  useEffect(() => () => cleanups.current.forEach(fn => fn()), [])

  const enter = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('opening')

    try { SoundEngine._getCtx() } catch (_) {}

    // Fade ambient dust over 350ms
    const fadeStart = performance.now()
    const fadeDust  = (now) => {
      dustOpacity.current = Math.max(0, 1 - (now - fadeStart) / 350)
      if (dustOpacity.current > 0) requestAnimationFrame(fadeDust)
    }
    requestAnimationFrame(fadeDust)

    playAudio(`${import.meta.env.BASE_URL}assets/audio/sfx/gate-open.mp3`, 0.85)

    const c = canvasRef.current
    if (c) { seamBurst(c); slidingDust(c) }

    // Rumble starts SYNCHRONOUSLY — same frame as click, no delay
    const stopRumble = startScreenShake(wrapperRef.current, 1100)
    cleanups.current.push(stopRumble)

    const c2 = safeTimeout(() => {
      playAudio(`${import.meta.env.BASE_URL}assets/audio/sfx/enter-boom.mp3`, 0.85)
      const stopSlam = slamScreenShake(wrapperRef.current)
      cleanups.current.push(stopSlam)
      setPhase('flashing')
    }, 1100)
    cleanups.current.push(c2)

    const c3 = safeTimeout(() => setPhase('fading'), 1540)
    const c4 = safeTimeout(() => {
      // If user session exists (rememberMe or Supabase restore), skip auth
      const session    = storage.getSession()
      const isLoggedIn = !!(appState.user || (session?.rememberMe && session?.user?.id))
      // Prologue plays once ever — after that skip straight to auth/menu
      const prologueSeen = localStorage.getItem('ardenmoor:prologue_seen')
      if (!prologueSeen) {
        navigate(SCREENS.OPENING, { afterPrologue: isLoggedIn ? SCREENS.MAIN_MENU : SCREENS.AUTH })
      } else {
        navigate(isLoggedIn ? SCREENS.MAIN_MENU : SCREENS.AUTH)
      }
    }, 2400)
    cleanups.current.push(c3, c4)
  }, [phase, navigate])

  const isOpening  = phase !== 'idle'
  const isFlashing = phase === 'flashing'
  const isFading   = phase === 'fading'
  const showPrompt = phase === 'idle'

  return (
    <div ref={wrapperRef} onClick={enter} style={{
      position: 'fixed', inset: 0, overflow: 'hidden',
      userSelect: 'none',
      cursor: phase === 'idle' ? 'pointer' : 'default',
      WebkitTapHighlightColor: 'transparent',
      willChange: 'transform',
    }}>

      {/* 1 — VIDEO */}
      <video autoPlay muted loop playsInline style={{
        position: 'absolute', inset: 0, zIndex: 0,
        width: '100%', height: '100%', objectFit: 'cover',
      }}>
        <source src={`${import.meta.env.BASE_URL}assets/images/ui/enter-bg.mp4`} type="video/mp4" />
      </video>

      {/* 2 — VIDEO OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(4,3,9,0.38)', pointerEvents: 'none',
      }} />

      {/* 3 — LEFT DOOR — hidden until image preloaded */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '50%', height: '100%', zIndex: 2,
        backgroundImage:    imgsReady ? `url(${import.meta.env.BASE_URL}assets/images/ui/gate-left.png)` : 'none',
        backgroundSize:     'cover',
        backgroundPosition: 'right center',
        backgroundColor:    '#05040c',
        transform:  isOpening ? 'translateX(-100%)' : 'translateX(0)',
        transition: isOpening ? 'transform 1.1s cubic-bezier(0.4,0,1.0,1.0)' : 'none',
      }} />

      {/* 4 — RIGHT DOOR — hidden until image preloaded */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '50%', height: '100%', zIndex: 2,
        backgroundImage:    imgsReady ? `url(${import.meta.env.BASE_URL}assets/images/ui/gate-right.png)` : 'none',
        backgroundSize:     'cover',
        backgroundPosition: 'left center',
        backgroundColor:    '#05040c',
        transform:  isOpening ? 'translateX(100%)' : 'translateX(0)',
        transition: isOpening ? 'transform 1.1s cubic-bezier(0.4,0,1.0,1.0)' : 'none',
      }} />

      {/* 5 — CENTER SEAM GLOW */}
      <div style={{
        position: 'absolute', top: 0, zIndex: 3,
        left: 'calc(50% - 1px)', width: '2px', height: '100%',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.3) 12%, rgba(235,212,145,0.98) 50%, rgba(201,168,76,0.3) 88%, transparent 100%)',
        boxShadow: '0 0 clamp(6px,0.6vw,12px) clamp(2px,0.2vw,4px) rgba(201,168,76,0.4), 0 0 clamp(20px,2vw,40px) clamp(6px,0.6vw,12px) rgba(201,168,76,0.1)',
        opacity:   isOpening ? 0 : 1,
        transition: 'opacity 0.07s ease',
        animation:  phase === 'idle' ? 'seamPulse 3.5s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }} />

      {/* 6 — VIGNETTE */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(3,2,8,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* 7 — PARTICLE CANVAS */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, zIndex: 5,
        pointerEvents: 'none',
      }} />

      {/* 8 — TITLE */}
      <div style={{
        position: 'absolute', top: '7vh', left: 0, right: 0,
        zIndex: 6, textAlign: 'center', pointerEvents: 'none',
        padding: '0 clamp(1rem, 3vw, 3rem)',
        opacity:    mounted && !isFading ? 1 : 0,
        transition: isFading ? 'opacity 0.3s ease' : 'opacity 0.45s ease',
      }}>
        <div style={{
          fontFamily:           '"Cinzel Decorative", serif',
          fontSize:             'clamp(1.4rem, 3.5vw, 4rem)',
          fontWeight:           700,
          letterSpacing:        '0.14em',
          paddingRight:         '0.35em',
          lineHeight:           1.1,
          color:                'transparent',
          backgroundImage:      'linear-gradient(180deg, #f8e8b0 0%, #d4a840 35%, #8a6010 60%, #c99030 80%, #f0d880 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip:       'text',
          filter:               'drop-shadow(0 0 clamp(6px,0.8vw,18px) rgba(201,168,76,0.6)) drop-shadow(0 clamp(1px,0.2vw,4px) clamp(4px,0.6vw,14px) rgba(0,0,0,1))',
        }}>
          ARDENMOOR
        </div>
      </div>

      {/* 9 — TOUCH TO ENTER */}
      <div style={{
        position: 'absolute', bottom: '8vh', left: 0, right: 0,
        zIndex: 6, textAlign: 'center', pointerEvents: 'none',
        opacity:   showPrompt ? 1 : 0,
        transition: showPrompt ? 'none' : 'opacity 0s',
        animation:  showPrompt ? 'promptPulse 2.6s ease-in-out infinite' : 'none',
      }}>
        <span style={{
          fontFamily:    '"Cinzel Decorative", serif',
          fontSize:      'clamp(0.6rem, 1vw, 1.05rem)',
          fontWeight:    400,
          color:         '#dcc888',
          letterSpacing: 'clamp(0.18em, 0.4vw, 0.5em)',
          textTransform: 'uppercase',
          filter:        'drop-shadow(0 0 clamp(6px,0.8vw,14px) rgba(201,168,76,0.6)) drop-shadow(0 1px clamp(4px,0.6vw,10px) rgba(0,0,0,1))',
        }}>
          Touch to Enter
        </span>
      </div>

      {/* 10 — FLASH */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 8,
        background: 'rgba(245,232,205,0.9)',
        opacity:    isFlashing ? 1 : 0,
        transition: isFlashing ? 'opacity 0.1s ease-in' : 'opacity 0.55s ease-out',
        pointerEvents: 'none',
      }} />

      {/* 11 — EXIT FADE TO BLACK */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 9, background: '#000',
        opacity:    isFading ? 1 : 0,
        transition: isFading ? 'opacity 0.85s ease' : 'none',
        pointerEvents: 'none',
      }} />

      {/* 12 — LOADING SCREEN — sits above everything, fades out when ready */}
      {/* Shows while gate images preload. On fast connections: invisible flash. */}
      {/* On slow connections: branded waiting screen, never just black void.  */}
      <div style={{
        position:   'absolute', inset: 0, zIndex: 10,
        background: '#000',
        display:    'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2rem',
        opacity:    imgsReady ? 0 : 1,
        transition: imgsReady ? 'opacity 1s ease' : 'none',
        pointerEvents: imgsReady ? 'none' : 'all',
      }}>
        {/* Title */}
        <div style={{
          fontFamily:           '"Cinzel Decorative", serif',
          fontSize:             'clamp(1.4rem, 3.5vw, 4rem)',
          fontWeight:           700,
          letterSpacing:        '0.14em',
          paddingRight:         '0.35em',
          color:                'transparent',
          backgroundImage:      'linear-gradient(180deg, #f8e8b0 0%, #d4a840 35%, #8a6010 60%, #c99030 80%, #f0d880 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip:       'text',
          filter:               'drop-shadow(0 0 clamp(6px,0.8vw,18px) rgba(201,168,76,0.4))',
          animation:            'loadingPulse 2s ease-in-out infinite',
        }}>
          ARDENMOOR
        </div>

        {/* Three pulsing gold dots */}
        <div style={{ display: 'flex', gap: 'clamp(8px,1vw,14px)', alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width:        'clamp(5px,0.5vw,8px)',
              height:       'clamp(5px,0.5vw,8px)',
              borderRadius: '50%',
              background:   '#c9a84c',
              animation:    `dotPulse 1.4s ease-in-out ${i * 0.22}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes seamPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1.0; }
        }
        @keyframes promptPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1.0; }
        }
        @keyframes loadingPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1.0; }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%            { opacity: 1.0; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
