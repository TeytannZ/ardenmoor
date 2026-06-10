import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react'

// Navigation history context — BackButton reads this to implement real back navigation
const NavBackContext = createContext(null)
import GlobalStyles from './components/GlobalStyles.jsx'
import { AudioManager, SoundEngine } from './lib/audio.js'
import { getSessionUser } from './lib/supabase.js'

// Screens
import EnterScreen      from './screens/EnterScreen.jsx'
import OpeningScreen    from './screens/OpeningScreen.jsx'
import MainMenu         from './screens/MainMenu.jsx'
import AuthScreen       from './screens/AuthScreen.jsx'
import SettingsPanel    from './components/SettingsPanel.jsx'
import OnboardingScreen from './screens/OnboardingScreen.jsx'
import PlanViewScreen   from './screens/PlanViewScreen.jsx'
import StoryScreen      from './screens/StoryScreen.jsx'
import CheckInScreen    from './screens/CheckInScreen.jsx'

// ─── Coming-soon placeholder (shared by STORY, CHECK_IN until screens are built) ─
function ComingSoonScreen({ appState, navigate, title, subtitle, backTo }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])
  const dest = backTo || BACK_MAP[appState?.screen] || SCREENS.MAIN_MENU

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#05040d',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>
      {/* Atmospheric background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `url('${import.meta.env.BASE_URL}assets/images/backgrounds/onboarding-archive-night.jpg') center/cover no-repeat`,
        filter: 'brightness(0.2) saturate(0.5)', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,4,13,0.85) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '2rem',
        maxWidth: 'min(520px, 88vw)',
      }}>
        {/* Gold diamond accent */}
        <div style={{
          width: '8px', height: '8px', borderRadius: '1px',
          background: 'rgba(201,168,76,0.6)',
          transform: 'rotate(45deg)',
          margin: '0 auto 1.8rem',
          boxShadow: '0 0 14px rgba(201,168,76,0.4)',
        }} />
        <h1 style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(1.1rem, 2vw, 2rem)',
          color: 'transparent',
          backgroundImage: 'linear-gradient(180deg, rgba(255,245,210,0.95) 0%, rgba(200,165,70,0.9) 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          margin: '0 0 0.8rem 0',
          letterSpacing: '0.06em',
        }}>{title || 'The Chronicle Awaits'}</h1>
        <p style={{
          fontFamily: '"Lora", serif', fontStyle: 'italic',
          fontSize: 'clamp(0.82rem, 1vw, 1.05rem)',
          color: 'rgba(185,165,115,0.78)',
          lineHeight: 1.75, margin: '0 0 2.5rem 0',
        }}>{subtitle || 'This chapter of the Archive is still being inscribed. Return soon.'}</p>

        <button
          onClick={() => navigate(dest)}
          style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 'clamp(0.9rem, 1vw, 1.1rem)',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(218,185,88,0.88)',
            background: 'rgba(14,11,20,0.85)',
            border: '1px solid rgba(155,120,38,0.55)',
            borderRadius: '2px',
            padding: '0.7em 1.8em',
            cursor: 'pointer', transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(14,11,20,0.85)'; e.currentTarget.style.borderColor = 'rgba(155,120,38,0.55)' }}
        >
          Return to the Archive
        </button>
      </div>
    </div>
  )
}

// Storage
import { storage } from './lib/storage.js'

// ─── Screen constants ──────────────────────────────────────────────────────────
export const SCREENS = {
  ENTER:      'enter',
  OPENING:    'opening',   // narrator prologue — plays once ever
  AUTH:       'auth',
  MAIN_MENU:  'main_menu',
  SETTINGS:   'settings',
  ONBOARDING: 'onboarding',
  PLAN_VIEW:  'plan_view',
  STORY:      'story',
  CHECK_IN:   'check_in',
}

const BACK_MAP = {
  [SCREENS.OPENING]:    SCREENS.ENTER,
  [SCREENS.AUTH]:       SCREENS.ENTER,
  [SCREENS.MAIN_MENU]:  SCREENS.ENTER,
  [SCREENS.SETTINGS]:   SCREENS.MAIN_MENU,
  [SCREENS.ONBOARDING]: SCREENS.MAIN_MENU,
  [SCREENS.PLAN_VIEW]:  SCREENS.MAIN_MENU,
  [SCREENS.STORY]:      SCREENS.MAIN_MENU,
  [SCREENS.CHECK_IN]:   SCREENS.MAIN_MENU,
}

const IS_TOUCH_DEVICE = typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: none) and (pointer: coarse)').matches === true

// ─── Cursor clickability detection ────────────────────────────────────────────
function getReactFiber(node) {
  const key = Object.keys(node).find(k => k.startsWith('__reactFiber$'))
  return key ? node[key] : null
}

function fiberHasOnClick(node) {
  try {
    const fiber = getReactFiber(node)
    if (!fiber) return false
    let f = fiber
    for (let i = 0; i < 8 && f; i++) {
      if (typeof f.memoizedProps?.onClick === 'function') return true
      f = f.return
    }
  } catch (_) {}
  return false
}

function isClickableNode(node) {
  if (!node || !node.tagName) return false
  const tag    = node.tagName.toLowerCase()
  const inline = node.style?.cursor || ''
  return (
    tag === 'button' || tag === 'a' || tag === 'input' ||
    tag === 'select' || tag === 'textarea' ||
    node.getAttribute('role') === 'button' ||
    node.getAttribute('data-clickable') === 'true' ||
    inline === 'pointer' ||
    fiberHasOnClick(node)
  )
}

// ─── Global Cursor Particles ───────────────────────────────────────────────────
function GlobalCursorParticles() {
  const canvasRef = useRef(null)
  const pos       = useRef({ x: -300, y: -300 })
  const particles = useRef([])
  const lastPos   = useRef({ x: -300, y: -300 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      let node = document.elementFromPoint(e.clientX, e.clientY)
      let isClickable = false
      for (let i = 0; i < 16 && node && node !== document.body; i++) {
        if (isClickableNode(node)) { isClickable = true; break }
        node = node.parentElement
      }
      if (isClickable) {
        document.body.classList.add('cursor-hovering')
        document.body.classList.remove('cursor-default')
      } else {
        document.body.classList.remove('cursor-hovering')
        document.body.classList.add('cursor-default')
      }
    }

    const onClick = (e) => {
      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2
        const spd   = Math.random() * 2.5 + 1
        particles.current.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 1,
          r: Math.random() * 2 + 0.5,
          a: 0.9, life: 0, maxLife: Math.random() * 45 + 25,
          type: 'burst',
        })
      }
    }

    const onDown = () => {
      document.body.classList.add('cursor-clicking')
      document.body.classList.remove('cursor-hovering')
    }
    const onUp = () => document.body.classList.remove('cursor-clicking')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click',     onClick)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    const ctx = canvas.getContext('2d')
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const dx = pos.current.x - lastPos.current.x
      const dy = pos.current.y - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 2) {
        const count = Math.min(Math.floor(dist * 0.4) + 1, 5)
        for (let i = 0; i < count; i++) {
          particles.current.push({
            x:  pos.current.x + (Math.random() - 0.5) * 4,
            y:  pos.current.y + (Math.random() - 0.5) * 4,
            vx: -dx * (0.02 + Math.random() * 0.04) + (Math.random() - 0.5) * 0.8,
            vy: -dy * (0.02 + Math.random() * 0.04) - Math.random() * 0.6,
            r:  Math.random() * 1.8 + 0.3,
            a:  0.7 + Math.random() * 0.2,
            life: 0, maxLife: Math.random() * 35 + 18, type: 'trail',
          })
        }
        lastPos.current = { ...pos.current }
      }
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.vx *= 0.96; p.life++
        if (p.life > p.maxLife) { particles.current.splice(i, 1); continue }
        const t     = p.life / p.maxLife
        const alpha = (1 - t) * p.a
        if (alpha < 0.01) continue
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * (1 - t * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = p.type === 'burst'
          ? `rgba(255,230,140,${alpha})`
          : `rgba(201,168,76,${alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click',     onClick)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('resize',    resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      pointerEvents: 'none', width: '100%', height: '100%',
    }} />
  )
}

// ─── Screen transition overlay ─────────────────────────────────────────────────
function useScreenTransition() {
  const [visible, setVisible] = useState(false)
  const transition = (cb) => {
    document.body.classList.add('transitioning')
    setVisible(true)
    setTimeout(() => {
      cb()
      setTimeout(() => {
        setVisible(false)
        document.body.classList.remove('transitioning')
      }, 200)
    }, 120)
  }
  return { visible, transition }
}

// ─── Synchronous initial state ────────────────────────────────────────────────
// Always start from ENTER so the gate animation plays every time the app loads.
function computeInitialState() {
  return { screen: SCREENS.ENTER }
}

// ─── Initial app state ─────────────────────────────────────────────────────────
const _initState = computeInitialState()
const INITIAL_STATE = {
  screen: _initState.screen,
  user:   null,
}

// ─── Error boundary ─────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e } }
  componentDidCatch(e, info) { console.error('[Ardenmoor] Uncaught error:', e, info) }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#06050f', gap:'1.5rem', padding:'2rem' }}>
        <div style={{ fontFamily:'"Cinzel Decorative",serif', fontSize:'clamp(1.2rem,2vw,2rem)', color:'rgba(201,168,76,0.9)', textAlign:'center' }}>
          The Archive Has Collapsed
        </div>
        <div style={{ fontFamily:'"Lora",serif', fontStyle:'italic', fontSize:'clamp(0.82rem,1vw,1.05rem)', color:'rgba(185,155,95,0.85)', textAlign:'center', maxWidth:'480px' }}>
          {this.state.error?.message || 'An unexpected error occurred.'}
        </div>
        <button
          onClick={() => { this.setState({ error: null }); window.location.reload() }}
          style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.6rem,0.75vw,0.85rem)', letterSpacing:'0.2em', textTransform:'uppercase', color:'#c9a84c', background:'transparent', border:'1px solid rgba(155,120,36,0.55)', borderRadius:'2px', padding:'0.65em 1.6em', cursor:'pointer' }}
        >
          Reload the Archive
        </button>
      </div>
    )
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [appState,      setAppState]      = useState(INITIAL_STATE)
  const [settingsOpen,  setSettingsOpen]  = useState(false)
  const { visible, transition } = useScreenTransition()
  const sessionChecked = useRef(false)
  const appStateRef    = useRef(appState)
  useEffect(() => { appStateRef.current = appState }, [appState])

  const openSettings  = useCallback(() => setSettingsOpen(true),  [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  const navigate = (screen, extras = {}) => {
    transition(() => {
      setAppState(prev => {
        const newState = {
          ...prev,
          screen,
          ...extras,
          _navHistory: [...(prev._navHistory || []), prev.screen],
        }
        storage.saveNavState({ screen })
        return newState
      })
      window.history.pushState({ screen }, '', window.location.pathname)
    })
  }

  const navigateBack = useCallback(() => {
    transition(() => {
      setAppState(prev => {
        const hist = [...(prev._navHistory || [])]
        const fromHistory = hist.pop()
        // Fall back to BACK_MAP when history is empty (e.g. after page refresh)
        const dest = fromHistory || BACK_MAP[prev.screen]
        if (!dest) return prev
        const newState = { ...prev, screen: dest, _navHistory: hist }
        storage.saveNavState({ screen: dest })
        return newState
      })
    })
  }, [transition])

  const updateState = useCallback((partial) =>
    setAppState(prev => ({ ...prev, ...partial })), [])

  // ── Browser back button ────────────────────────────────────────────────────
  useEffect(() => {
    window.history.replaceState({ screen: SCREENS.ENTER }, '', window.location.pathname)
    const onPop = () => {
      const current = appStateRef.current.screen
      const backTo  = BACK_MAP[current]
      if (backTo) {
        transition(() => setAppState(prev => ({ ...prev, screen: backTo })))
      } else {
        window.history.pushState({ screen: SCREENS.ENTER }, '', window.location.pathname)
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // ── Apply saved audio settings on startup ─────────────────────────────────
  useEffect(() => {
    try {
      const s = storage.getSettings()
      if (s.muted) {
        AudioManager.mute?.()
        SoundEngine.mute?.()
      } else {
        SoundEngine.setVolume?.(s.sfxVolume ?? 0.6)
        AudioManager.setAmbientVolume?.(s.ambientVolume ?? 0.3)
        AudioManager.setMusicVolume?.(s.musicVolume ?? 0.45)
        AudioManager.setVoVolume?.(s.voVolume ?? 0.9)
      }
    } catch (_) {}
  }, [])

  // Ambient is managed per-screen (MainMenu, StoryScreen).
  // App-level cleanup on unmount only.
  useEffect(() => () => { try { AudioManager.clearAmbient() } catch (_) {} }, [])

  // ── Session restore ────────────────────────────────────────────────────────
  useEffect(() => {
    if (sessionChecked.current) return
    sessionChecked.current = true

    const restore = async () => {
      let user = null

      try {
        const supaUser = await getSessionUser()
        if (supaUser) {
          user = {
            id:       supaUser.id,
            email:    supaUser.email,
            username: supaUser.user_metadata?.username
                      || supaUser.email?.split('@')[0]
                      || 'Seeker',
          }
        }
      } catch (_) {}

      if (!user) {
        const saved = storage.getSession()
        if (saved?.user?.id && saved?.rememberMe === true) {
          user = saved.user
        }
      }

      if (user) {
        const saved = storage.getSession() || {}
        storage.saveSession({ ...saved, user })
        updateState({ user })
      }
    }

    restore()
  }, [])

  // ── Screen renderer ────────────────────────────────────────────────────────
  const screenProps = { appState, navigate, updateState, openSettings }

  const renderScreen = () => {
    switch (appState.screen) {
      case SCREENS.ENTER:      return <EnterScreen      {...screenProps} />
      case SCREENS.OPENING:    return <OpeningScreen    {...screenProps} />
      case SCREENS.AUTH:       return <AuthScreen       {...screenProps} />
      case SCREENS.MAIN_MENU:  return <MainMenu         {...screenProps} />
      case SCREENS.ONBOARDING: return <OnboardingScreen {...screenProps} />
      case SCREENS.PLAN_VIEW:  return <PlanViewScreen   {...screenProps} />
      case SCREENS.STORY:      return <StoryScreen      {...screenProps} />
      case SCREENS.CHECK_IN:   return <CheckInScreen    {...screenProps} />
      default:                 return <EnterScreen      {...screenProps} />
    }
  }

  return (
    <ErrorBoundary>
      <GlobalStyles />
      {!IS_TOUCH_DEVICE && <GlobalCursorParticles />}
      <NavBackContext.Provider value={navigateBack}>
        {renderScreen()}
      </NavBackContext.Provider>

      {/* Settings slide-in panel — renders over any screen */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={closeSettings}
        appState={appState}
        navigate={navigate}
        updateState={updateState}
      />

      {/* Cinematic screen transition flash */}
      <div style={{
        position: 'fixed', inset: 0, background: '#04030a', zIndex: 99999,
        pointerEvents: 'none',
        opacity:    visible ? 1 : 0,
        transition: visible ? 'opacity 0.10s ease' : 'opacity 0.18s ease',
      }} />
    </ErrorBoundary>
  )
}

// ─── BackButton ───────────────────────────────────────────────────────────────
export function BackButton({ navigate, from, style = {} }) {
  const [hov, setHov] = useState(false)
  const navigateBack = useContext(NavBackContext)
  const dest = BACK_MAP[from]

  // Use real navigation history if available; fall back to BACK_MAP
  const canGoBack = !!(navigateBack || dest)
  if (!canGoBack) return null

  const handleBack = () => {
    // Stop any playing VO when leaving a screen
    try { AudioManager.stopVO?.() } catch (_) {}
    if (navigateBack) navigateBack()
    else navigate(dest)
  }

  return (
    <button
      onClick={handleBack}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'fixed',
        top:  'clamp(1.2rem,2.5vh,2rem)',
        left: 'clamp(1.2rem,2.5vw,2.2rem)',
        zIndex: 500,
        display: 'flex', alignItems: 'center', gap: '0.55em',
        background:    hov ? 'rgba(201,168,76,0.1)' : 'rgba(4,3,12,0.88)',
        border:        `1px solid ${hov ? 'rgba(232,200,80,0.82)' : 'rgba(155,122,38,0.65)'}`,
        borderRadius:  '2px',
        padding:       'clamp(0.5em,0.75vh,0.72em) clamp(0.95em,1.3vw,1.3em) clamp(0.5em,0.75vh,0.72em) clamp(0.72em,1.05vw,1.1em)',
        cursor:        'pointer', transition: 'all 0.18s ease',
        backdropFilter:'blur(8px)',
        boxShadow:     hov ? '0 0 22px rgba(201,168,76,0.18), 0 2px 16px rgba(0,0,0,0.65)' : '0 2px 14px rgba(0,0,0,0.7)',
        ...style,
      }}
    >
      <svg width="clamp(12px,1.2vw,16px)" height="clamp(12px,1.2vw,16px)" viewBox="0 0 12 12" fill="none">
        <path d="M8 2L4 6L8 10" stroke={hov ? '#f5e07a' : 'rgba(218,182,88,0.92)'}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{
        fontFamily: '"Cinzel",serif', fontSize: 'clamp(0.62rem,0.74vw,0.84rem)',
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: hov ? '#f5e07a' : 'rgba(218,182,88,0.92)', transition: 'color 0.18s ease',
      }}>
        Back
      </span>
    </button>
  )
}
