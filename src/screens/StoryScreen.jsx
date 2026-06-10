import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react'
import { BackButton, SCREENS } from '../App.jsx'
import { PORTRAITS, BG, STORY_ACTS, adaptBeatsForPlayer, getActBeats } from '../data/story.js'
import { getActSparks } from '../data/sparks.js'
import { getActEpochs } from '../data/epochs.js'
import { storage } from '../lib/storage.js'
import { SoundEngine, AudioManager } from '../lib/audio.js'
import TaskGate from '../components/TaskGate.jsx'
import WeekCompleteCheckin from '../components/WeekCompleteCheckin.jsx'
import '../data/act2.js'           // registers act2 beats at module load
import '../data/act3.js'           // registers act3 beats at module load

// ─── Expression SFX base path ─────────────────────────────────────────────────
const EXPR_SFX_BASE = `${import.meta.env.BASE_URL}assets/audio/sfx/expressions/`

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, resetKey, speed = 20) {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)
  const timerRef    = useRef(null)
  const idxRef      = useRef(0)
  const cancelRef   = useRef(false)   // closure-safe cancel flag

  const complete = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    cancelRef.current = true
    setDisplayed(text || '')
    setDone(true)
    idxRef.current = (text || '').length
  }, [text])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    cancelRef.current = false
    const t = text || ''
    setDisplayed('')
    setDone(false)
    idxRef.current = 0
    if (!t) { setDone(true); return }

    const tick = () => {
      if (cancelRef.current) return   // stale tick — discard silently
      idxRef.current += 1
      // Fire quill-on-parchment sound every 2nd non-space character
      const ch = t[idxRef.current - 1]
      if (ch && ch !== ' ' && idxRef.current % 2 === 0) {
        try { SoundEngine.typeChar() } catch (_) {}
      }
      if (idxRef.current >= t.length) {
        setDisplayed(t)
        setDone(true)
      } else {
        setDisplayed(t.slice(0, idxRef.current))
        timerRef.current = setTimeout(tick, speed)
      }
    }
    timerRef.current = setTimeout(tick, speed)
    return () => {
      cancelRef.current = true
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [text, resetKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, done, complete }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'ardenmoor_story_v1'

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') } catch { return null }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

function formatName(raw) {
  if (!raw) return ''
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
}

// ─── Portrait component ───────────────────────────────────────────────────────
// Expression lookup: tries expr → neutral → gives up gracefully.
// Handles missing files via onError so the story never breaks while assets are
// still being generated.
// ─── Portrait angle resolution ───────────────────────────────────────────────
// beat.charAngle = 'three_quarter' | 'side' | 'behind' | 'front' (or null/undefined)
// Convention: angled variants are named {expr}_{angle}.png in the same folder.
// If the angled file doesn't exist, the img onError handler falls back in this order:
//   1. {expr}_{angle}.png  (angled variant)
//   2. {expr}.png          (base expression, no angle)
//   3. neutral.png         (catch-all)
//
// Leonardo AI prompt pattern for angle variants (use base portrait as reference):
//   three_quarter → "…three-quarter view, facing slightly left/right, [character description]"
//   side          → "…profile view, facing right, [character description]"
//   behind        → "…seen from behind, back of head visible, [character description]"
//
// sideIndex: 0 = closest to center edge, 1 = behind them, etc. (for multi-char)
// charCount: total chars on this side (used to compute width sharing)
function Portrait({ char, expr, side, isActive, isAnyActive, isListener, angle, sideIndex = 0, charCount = 1 }) {
  const charKey    = char?.toLowerCase()
  const map        = PORTRAITS[charKey]
  const neutralSrc = map?.neutral || null

  // Build the src for a given expression + optional portrait angle
  const buildSrc = (e, ang) => {
    const base = map?.[e] || map?.neutral || null
    if (!base || !ang || ang === 'front') return base
    return base.replace('.png', `_${ang}.png`)
  }

  const primarySrc = buildSrc(expr, angle)
  const baseSrc    = map?.[expr] || null

  const [dispSrc, setDispSrc] = useState(primarySrc)
  const [failed,  setFailed]  = useState(false)
  const [entered, setEntered] = useState(false)

  // Update displayed src immediately when expression/angle changes.
  // No swap blink — opacity CSS transition handles the visual smoothly.
  useEffect(() => {
    const next = buildSrc(expr, angle)
    setDispSrc(next)
    setFailed(false)
  }, [charKey, expr, angle])   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50)
    return () => clearTimeout(t)
  }, [])

  if (!dispSrc || failed) return null

  const isLeft = side === 'left'

  // Opacity:
  //   active speaker → full opacity (1)
  //   listener when someone else speaks → dimmed (0.62) — Option B
  //   during narration (no one speaking) → hidden (0)
  const opacity = !entered ? 0 : isActive ? 1 : isAnyActive ? 0.62 : 0

  const filter = isActive
    ? 'none'
    : isAnyActive
    ? 'brightness(0.78) saturate(0.68)'
    : 'brightness(0.68) saturate(0.62)'

  // Position: each additional character on same side is offset inward (stacked effect)
  // sideIndex 0 = outermost (closest to edge), higher = more toward center
  // The first character is at the edge; subsequent ones overlap toward center
  const OVERLAP_PX = 55   // pixels each additional char shifts toward center
  const edgeOffset = `clamp(0.4rem, 1.8vw, 3rem)`
  const extraOffset = sideIndex > 0 ? `${sideIndex * OVERLAP_PX}px` : '0px'
  const posKey      = isLeft ? 'left' : 'right'
  const posValue    = sideIndex > 0
    ? `calc(${edgeOffset} + ${extraOffset})`
    : edgeOffset

  // zIndex: speakers in front, listeners behind
  const zBase = isActive ? 12 : 10 - sideIndex

  return (
    <div
      className="ss-portrait"
      style={{
        position:      'fixed',
        top:           0,
        bottom:        'clamp(22vh, 27vh, 30vh)',
        [posKey]:      posValue,
        display:       'flex',
        alignItems:    'flex-end',
        zIndex:        zBase,
        pointerEvents: 'none',
        opacity,
        filter,
        transition:    'opacity 0.38s ease, filter 0.38s ease',
      }}
    >
      {/* Warm underlight — only for the active speaker */}
      {isActive && (
        <div style={{
          position:   'absolute',
          bottom:     0,
          left:       isLeft ? '-10%' : 'auto',
          right:      isLeft ? 'auto' : '-10%',
          width:      '120%',
          height:     '35%',
          background: isLeft
            ? 'radial-gradient(ellipse at 20% 100%, rgba(201,168,76,0.22) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 80% 100%, rgba(201,168,76,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'ssPortraitGlow 3s ease-in-out infinite alternate',
        }} />
      )}
      <img
        src={dispSrc}
        alt={char}
        draggable={false}
        onError={() => {
          // Fallback chain: angled variant → base expression → neutral → give up
          if (angle && dispSrc !== baseSrc && baseSrc) {
            setDispSrc(baseSrc)
          } else if (dispSrc !== neutralSrc && neutralSrc) {
            setDispSrc(neutralSrc)
          } else {
            setFailed(true)
          }
        }}
        style={{
          width:          'clamp(200px, 30vw, 420px)',
          height:         'auto',
          maxHeight:      '100%',
          objectFit:      'contain',
          objectPosition: 'bottom center',
          display:        'block',
          position:       'relative',
          zIndex:         2,
          transform:      isLeft ? 'none' : 'scaleX(-1)',
          WebkitUserDrag: 'none',
        }}
      />
    </div>
  )
}

// ─── Dialogue box ─────────────────────────────────────────────────────────────
function DialogueBox({ beat, displayed, done }) {
  const isNarration = beat?.type === 'narration'
  const nameStr     = beat?.type === 'dialogue' ? formatName(beat.char) : null
  const speakerSide = beat?.side || null   // 'left' | 'right' | null
  const scrollRef   = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [beat])

  return (
    <div
      className="ss-dialogue-box"
      style={{
        position:      'fixed',
        bottom:        0, left: 0, right: 0,
        zIndex:        20,
        background:    'rgba(3,2,12,0.96)',
        borderTop:     `1px solid ${isNarration ? 'rgba(110,90,45,0.45)' : 'rgba(155,122,38,0.72)'}`,
        padding:       'clamp(1.1rem,2vh,1.7rem) clamp(1.4rem,5vw,5rem)',
        boxShadow:     '0 -6px 48px rgba(0,0,0,0.62)',
        minHeight:     'clamp(26vh, 30vh, 34vh)',
        maxHeight:     '48vh',
        display:       'flex',
        flexDirection: 'column',
        gap:           '0.5rem',
        cursor:        'pointer',
      }}
    >
      {/* Top accent line — shifts toward the active speaker's side */}
      <div style={{
        position:  'absolute',
        top: 0,
        left:  speakerSide === 'left'  ? 0 : speakerSide === 'right' ? 'clamp(1.4rem,5vw,5rem)' : 'clamp(1.4rem,5vw,5rem)',
        right: speakerSide === 'right' ? 0 : speakerSide === 'left'  ? 'clamp(1.4rem,5vw,5rem)' : 'clamp(1.4rem,5vw,5rem)',
        height:    '1px',
        background: speakerSide === 'left'
          ? 'linear-gradient(to right, rgba(201,168,76,0.65), rgba(201,168,76,0.25), transparent)'
          : speakerSide === 'right'
          ? 'linear-gradient(to left, rgba(201,168,76,0.65), rgba(201,168,76,0.25), transparent)'
          : 'linear-gradient(to right, transparent, rgba(201,168,76,0.35), transparent)',
        transition:    'all 0.35s ease',
        pointerEvents: 'none',
      }} />

      {/* Name tag — left/right alignment mirrors the speaker's side */}
      {nameStr && (
        <div style={{
          fontFamily:    '"Cinzel", serif',
          fontSize:      'clamp(0.62rem, 0.82vw, 0.86rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'rgba(218,182,80,0.95)',
          flexShrink:    0,
          textAlign:     speakerSide === 'right' ? 'right' : 'left',
          transition:    'text-align 0.2s ease',
        }}>
          {nameStr}
        </div>
      )}

      {/* Text */}
      <div
        ref={scrollRef}
        style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', flex: 1 }}
      >
        <p style={{
          fontFamily: '"Lora", serif',
          fontStyle:  isNarration ? 'italic' : 'normal',
          fontSize:   'clamp(1rem, 1.18vw, 1.24rem)',
          lineHeight: 1.85,
          color:      isNarration ? 'rgba(205,186,150,0.95)' : 'rgba(242,232,214,1)',
          margin:     0,
        }}>
          {displayed}
          {!done && (
            <span style={{
              display:       'inline-block',
              width:         '2px', height: '1em',
              background:    'rgba(218,182,80,0.65)',
              marginLeft:    '2px',
              verticalAlign: 'middle',
              animation:     'ssCaret 0.65s step-end infinite',
            }} />
          )}
        </p>
      </div>

      {/* Continue indicator */}
      {done && (
        <div style={{
          position:      'absolute',
          bottom:        'clamp(0.55rem,1vh,0.85rem)',
          right:         'clamp(1.4rem,5vw,5rem)',
          color:         'rgba(201,168,76,0.88)',
          fontSize:      '0.65rem',
          animation:     'ssPulse 1.4s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          ▾
        </div>
      )}
    </div>
  )
}

// ─── Choice panel ─────────────────────────────────────────────────────────────
function ChoicePanel({ options, onSelect }) {
  const [hovIdx, setHovIdx] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30)
    return () => clearTimeout(t)
  }, [])

  // Read player state once per render — used to gate choices
  const { coins: currentCoins = 0, relationships = {}, inventory = [] } =
    storage.getPlanProgress()

  const LABELS = ['A', 'B', 'C', 'D']

  return (
    <div
      className="ss-dialogue-box"
      style={{
        position:      'fixed',
        bottom:        0, left: 0, right: 0,
        zIndex:        25,
        background:    'rgba(3,2,12,0.96)',
        borderTop:     '1px solid rgba(155,122,38,0.55)',
        padding:       'clamp(0.8rem,1.3vh,1.1rem) clamp(1.4rem,5vw,5rem) clamp(0.9rem,1.5vh,1.3rem)',
        boxShadow:     '0 -4px 40px rgba(0,0,0,0.55)',
        display:       'flex',
        flexDirection: 'column',
        gap:           '0.5rem',
        opacity:       mounted ? 1 : 0,
        transform:     mounted ? 'translateY(0)' : 'translateY(8px)',
        transition:    'opacity 0.22s ease, transform 0.22s ease',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{
        fontFamily:    '"Cinzel", serif',
        fontSize:      'clamp(0.5rem, 0.6vw, 0.65rem)',
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        color:         'rgba(140,110,40,0.68)',
        flexShrink:    0,
      }}>
        Choose your response
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', overflowY: 'auto', scrollbarWidth: 'none' }}>
        {options.map((opt, i) => {
          const coinCost     = opt.requires?.coins || 0
          const reqItem      = opt.requires?.item  || null
          const reqRel       = opt.requires?.relationship || null  // { char: minScore }
          const coinOk       = coinCost === 0 || currentCoins >= coinCost
          const itemOk       = !reqItem || inventory.some(it => it.id === reqItem && (it.qty || 0) > 0)
          const relOk        = !reqRel  || Object.entries(reqRel).every(
            ([char, min]) => (relationships[char] || 0) >= min
          )
          const canAfford    = coinOk && itemOk && relOk
          // Build a short locked reason for the gate label
          const lockedReason = !coinOk
            ? `Requires ${coinCost} ◈  (you have ${currentCoins})`
            : !itemOk
            ? `Requires: ${reqItem}`
            : !relOk
            ? `Requires trust: ${Object.entries(reqRel).map(([c, m]) => {
                const have = relationships[c] || 0
                const name = c.charAt(0).toUpperCase() + c.slice(1)
                return `${name} ${have}/${m}`
              }).join(', ')}`
            : null
          const hov          = hovIdx === i && canAfford
          return (
            <button
              key={i}
              onClick={() => {
                if (!canAfford) return
                if (coinCost > 0) storage.spendCoins(coinCost)
                onSelect(opt)
              }}
              onMouseEnter={() => setHovIdx(i)}
              onMouseLeave={() => setHovIdx(null)}
              disabled={!canAfford}
              style={{
                display:      'flex',
                alignItems:   'flex-start',
                gap:          '0.7rem',
                background:   !canAfford ? 'rgba(6,4,14,0.4)'
                              : hov ? 'rgba(201,168,76,0.09)' : 'rgba(10,8,20,0.55)',
                border:       `1px solid ${
                                !canAfford ? 'rgba(55,45,22,0.32)'
                                : hov ? 'rgba(201,168,76,0.55)' : 'rgba(80,65,35,0.42)'}`,
                borderRadius: '2px',
                padding:      'clamp(0.45rem,0.7vh,0.6rem) clamp(0.7rem,0.9vw,0.95rem)',
                cursor:       canAfford ? 'pointer' : 'not-allowed',
                transition:   'all 0.15s ease',
                textAlign:    'left',
                boxShadow:    hov ? '0 0 14px rgba(201,168,76,0.1)' : 'none',
                opacity:      canAfford ? 1 : 0.48,
              }}
            >
              <span style={{
                fontFamily:    '"Cinzel", serif',
                fontSize:      'clamp(0.58rem, 0.68vw, 0.7rem)',
                letterSpacing: '0.08em',
                color:         !canAfford ? 'rgba(100,85,45,0.55)'
                               : hov ? 'rgba(218,182,80,0.95)' : 'rgba(140,110,40,0.7)',
                transition:    'color 0.15s ease',
                flexShrink:    0,
                marginTop:     '0.12em',
                minWidth:      '1.1em',
              }}>
                {LABELS[i]}
              </span>
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.22rem' }}>
                <span style={{
                  fontFamily: '"Lora", serif',
                  fontSize:   'clamp(0.78rem, 0.92vw, 0.96rem)',
                  lineHeight: 1.65,
                  color:      !canAfford ? 'rgba(140,125,92,0.5)'
                              : hov ? 'rgba(238,228,208,0.98)' : 'rgba(200,185,155,0.88)',
                  transition: 'color 0.15s ease',
                }}>
                  {opt.text}
                </span>
                {/* Gate label: coin cost when available, locked reason when not */}
                {(coinCost > 0 || lockedReason) && (
                  <span style={{
                    fontFamily:    '"Cinzel", serif',
                    fontSize:      'clamp(0.44rem, 0.54vw, 0.58rem)',
                    letterSpacing: '0.18em',
                    color: canAfford ? 'rgba(201,168,76,0.75)' : 'rgba(140,108,35,0.52)',
                    display: 'flex', alignItems: 'center', gap: '0.3em',
                  }}>
                    {canAfford && coinCost > 0 ? `Costs ${coinCost} ◈` : lockedReason || ''}
                  </span>
                )}
                {/* Relationship effect badges */}
                {opt.effects?.relationships && canAfford && (
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem', marginTop: '0.05rem' }}>
                    {Object.entries(opt.effects.relationships).map(([char, delta]) => {
                      const isPos  = delta > 0
                      const color  = isPos ? 'rgba(82,180,148,0.85)' : 'rgba(196,92,72,0.85)'
                      const border = isPos ? 'rgba(60,148,112,0.55)' : 'rgba(160,64,48,0.55)'
                      const sign   = isPos ? '+' : ''
                      const label  = char.charAt(0).toUpperCase() + char.slice(1)
                      return (
                        <span key={char} style={{
                          fontFamily:    '"Cinzel", serif',
                          fontSize:      'clamp(0.36rem, 0.44vw, 0.48rem)',
                          letterSpacing: '0.14em',
                          color,
                          border:        `1px solid ${border}`,
                          borderRadius:  '2px',
                          padding:       '0.14em 0.44em',
                          display:       'inline-flex', alignItems: 'center', gap: '0.15em',
                        }}>
                          {sign}{label}
                        </span>
                      )
                    })}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Scene Journal helpers ────────────────────────────────────────────────────
// All reads/writes go through storage.js which mirrors to Supabase when logged in.
function recordScene(sceneId, sceneTitle, sceneSummary, actId = 'act1', skipped = false) {
  if (!sceneId) return
  const scenes = storage.getJournal()
  if (!scenes.find(s => s.id === sceneId)) {
    const updated = [...scenes, { id: sceneId, title: sceneTitle, summary: sceneSummary, actId, visitedAt: Date.now(), skipped }]
    storage.saveJournal(updated)
    // Fire-and-forget cloud sync
    const userId = storage.getSession()?.userId
    if (userId) storage.syncJournalToCloud(userId)
  }
}

// ─── BG helpers ───────────────────────────────────────────────────────────────
// Returns the CSS animation string for a given BG object
function bgAnimation(bgObj) {
  if (!bgObj?.type) return 'ssBgFade 0.85s ease forwards, ssKenBurns 28s ease-in-out infinite alternate'
  const { type, dir } = bgObj
  if (type === 'WIDE') {
    return `ssBgFade 0.85s ease forwards, ${dir === 'right-to-left' ? 'ssWidePanRL' : 'ssWidePanLR'} 38s linear infinite alternate`
  }
  if (type === 'TALL') {
    return `ssBgFade 0.85s ease forwards, ${dir === 'bottom-to-top' ? 'ssTallPanBT' : 'ssTallPanTB'} 38s linear infinite alternate`
  }
  return `ssBgFade 0.85s ease forwards, ${dir === 'zoom-out' ? 'ssKenBurnsOut' : 'ssKenBurns'} 28s ease-in-out infinite alternate`
}
function bgSize(bgObj) {
  // Always use 'cover' — guarantees no color bleed at edges regardless of image ratio
  return 'cover'
}
const _B = import.meta.env.BASE_URL
const _abs = p => (p && p.startsWith('/') ? _B + p.slice(1) : p)
function bgUrl(bgObj) {
  // Use fallback path until new assets are generated; once new file is placed, it takes over
  if (!bgObj) return 'none'
  return `url('${_abs(bgObj.src)}'), url('${_abs(bgObj.fallback || bgObj.src)}')`
}
// Serialize a BG object back to a key for localStorage
function bgKey(bgObj) {
  return Object.keys(BG).find(k => BG[k] === bgObj) || 'archive_night'
}

// ─── Scene alive effects ──────────────────────────────────────────────────────
// Canvas-based dust, embers, and smoke; CSS-based fog and lamplight
function _makeDust(w, h, cr, cg, cb) {
  return {
    type: 'dust',
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.28,
    vy: -(Math.random() * 0.18 + 0.03),
    // wobble oscillation: random amplitude and phase
    wobbleAmp:   0.18 + Math.random() * 0.32,
    wobbleFreq:  0.004 + Math.random() * 0.008,
    wobblePhase: Math.random() * Math.PI * 2,
    r: Math.random() * 2.2 + 0.35,
    life: Math.random() * 260, maxLife: 200 + Math.random() * 280,
    cr, cg, cb, dead: false,
  }
}
function _makeEmber(w, h) {
  return {
    type: 'ember',
    x: Math.random() * w, y: h * 0.5 + Math.random() * h * 0.5,
    vx: (Math.random() - 0.5) * 1.2,
    vy: -(Math.random() * 1.8 + 0.4),
    // ember flicker: size pulses over time
    flickerRate:  0.12 + Math.random() * 0.2,
    flickerPhase: Math.random() * Math.PI * 2,
    r: Math.random() * 2.4 + 0.5,
    life: 0, maxLife: 55 + Math.random() * 130,
    dead: false,
  }
}
function _makeSmoke(w, h) {
  return {
    type: 'smoke',
    x: w * 0.15 + Math.random() * w * 0.7,
    y: h * 0.45 + Math.random() * h * 0.4,
    vx: (Math.random() - 0.5) * 0.45,
    vy: -(Math.random() * 0.6 + 0.1),
    // smoke billows outward as it rises
    growRate:    0.008 + Math.random() * 0.012,
    wobblePhase: Math.random() * Math.PI * 2,
    r: 7 + Math.random() * 10,
    life: 0, maxLife: 160 + Math.random() * 200,
    dead: false,
  }
}

function _makeFirefly(w, h) {
  return {
    type: 'firefly',
    x: Math.random() * w, y: h * 0.06 + Math.random() * h * 0.82,
    vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.14,
    pulseRate:  0.006 + Math.random() * 0.010,
    pulsePhase: Math.random() * Math.PI * 2,
    r: 1.4 + Math.random() * 2.2,
    life: Math.random() * 280, maxLife: 380 + Math.random() * 240,
    dead: false,
  }
}
function _makeSpore(w, h) {
  return {
    type: 'spore',
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.14, vy: -(Math.random() * 0.10 + 0.02),
    wobbleAmp:   0.08 + Math.random() * 0.18,
    wobbleFreq:  0.003 + Math.random() * 0.005,
    wobblePhase: Math.random() * Math.PI * 2,
    r: 0.7 + Math.random() * 1.4,
    life: Math.random() * 300, maxLife: 280 + Math.random() * 380,
    dead: false,
  }
}

function StoryEffects({ bgObj }) {
  const canvasRef = useRef(null)
  const effects = bgObj?.effects || []
  const [pr, pg, pb] = bgObj?.particleColor || [201, 168, 76]
  const effectKey = effects.join(',')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const ctx = canvas.getContext('2d')
    const hasDust      = effects.includes('dust')
    const hasEmbers    = effects.includes('embers')
    const hasSmoke     = effects.includes('smoke')
    const hasFireflies = effects.includes('fireflies')
    const hasSpores    = effects.includes('spores')
    const particles = []

    const DUST_MAX = 55, EMBER_MAX = 32, SMOKE_MAX = 10, FIREFLY_MAX = 18, SPORE_MAX = 42
    if (hasDust)      { for (let i = 0; i < DUST_MAX;     i++) particles.push(_makeDust(canvas.width, canvas.height, pr, pg, pb)) }
    if (hasEmbers)    { for (let i = 0; i < EMBER_MAX;    i++) particles.push(_makeEmber(canvas.width, canvas.height)) }
    if (hasSmoke)     { for (let i = 0; i < SMOKE_MAX;    i++) particles.push(_makeSmoke(canvas.width, canvas.height)) }
    if (hasFireflies) { for (let i = 0; i < FIREFLY_MAX;  i++) particles.push(_makeFirefly(canvas.width, canvas.height)) }
    if (hasSpores)    { for (let i = 0; i < SPORE_MAX;    i++) particles.push(_makeSpore(canvas.width, canvas.height)) }

    let raf, lastT = null
    const draw = (ts) => {
      const dt = lastT ? Math.min((ts - lastT) / 16.67, 3) : 1; lastT = ts
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += dt

        // ── Dust: horizontal wobble via sin wave
        if (p.type === 'dust') {
          const wobble = Math.sin(p.life * p.wobbleFreq + p.wobblePhase) * p.wobbleAmp
          p.x += (p.vx + wobble) * dt
          p.y += p.vy * dt
        } else if (p.type === 'ember') {
          // Ember: slight horizontal drift with random sway
          p.vx += (Math.random() - 0.5) * 0.08 * dt
          p.vx *= Math.pow(0.985, dt)
          p.x += p.vx * dt; p.y += p.vy * dt
          p.vy *= Math.pow(0.998, dt)  // slight deceleration as ember rises
        } else if (p.type === 'smoke') {
          // Smoke: drift + grow
          p.x += p.vx * dt; p.y += p.vy * dt
        } else if (p.type === 'firefly') {
          // Firefly: organic wandering — very slow random steering
          p.vx += (Math.random() - 0.5) * 0.014 * dt
          p.vy += (Math.random() - 0.5) * 0.008 * dt
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (spd > 0.36) { p.vx *= 0.36 / spd; p.vy *= 0.36 / spd }
          p.x += p.vx * dt; p.y += p.vy * dt
          // Wrap around screen edges so fireflies don't vanish early
          if (p.x < -55) p.x = w + 55; else if (p.x > w + 55) p.x = -55
          if (p.y < -55) p.y = h + 55; else if (p.y > h + 55) p.y = -55
        } else if (p.type === 'spore') {
          // Spore: slow upward drift with gentle wobble like dust
          const wobble = Math.sin(p.life * p.wobbleFreq + p.wobblePhase) * p.wobbleAmp
          p.x += (p.vx + wobble) * dt
          p.y += p.vy * dt
        }

        if (p.life >= p.maxLife || (p.type !== 'firefly' && p.y < -50)) { p.dead = true }
        if (p.dead) { particles.splice(i, 1); continue }

        const t = p.life / p.maxLife
        const aMax = p.type === 'smoke' ? 0.13 : p.type === 'ember' ? 0.82 : p.type === 'firefly' ? 0.92 : p.type === 'spore' ? 0.38 : 0.62
        const a = Math.sin(t * Math.PI) * aMax
        if (a < 0.01) continue
        ctx.save(); ctx.globalAlpha = a

        if (p.type === 'dust') {
          // Slight brightness variation based on wobble phase — makes motes glimmer
          const glimmer = 0.88 + 0.12 * Math.sin(p.life * 0.05 + p.wobblePhase)
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${Math.round(p.cr * glimmer)},${Math.round(p.cg * glimmer)},${Math.round(p.cb * glimmer)})`; ctx.fill()

        } else if (p.type === 'ember') {
          const heat  = 1 - t
          // Flicker: size pulses rapidly
          const flick = 1 + 0.22 * Math.sin(p.life * p.flickerRate * 60 + p.flickerPhase)
          const curR  = p.r * (1 + heat * 0.5) * flick
          // Hot embers: orange-yellow core with a softer outer ring
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, curR * 1.6)
          gr.addColorStop(0,   `rgba(255,240,180,1)`)
          gr.addColorStop(0.35, `rgba(255,${Math.floor(110 + heat * 110)},18,0.9)`)
          gr.addColorStop(1,   `rgba(220,60,5,0)`)
          ctx.beginPath(); ctx.arc(p.x, p.y, curR * 1.6, 0, Math.PI * 2)
          ctx.fillStyle = gr; ctx.fill()

        } else if (p.type === 'smoke') {
          // Smoke billows: radius grows as it rises
          const growR = p.r * (1 + t * 2.2 * p.growRate * 80)
          // Gentle wobble in opacity simulates turbulence
          const turbulence = 0.85 + 0.15 * Math.sin(p.life * 0.025 + p.wobblePhase)
          ctx.globalAlpha = a * turbulence
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, growR)
          gr.addColorStop(0, 'rgba(85,78,72,0.28)'); gr.addColorStop(0.5, 'rgba(70,65,60,0.12)'); gr.addColorStop(1, 'transparent')
          ctx.beginPath(); ctx.arc(p.x, p.y, growR, 0, Math.PI * 2)
          ctx.fillStyle = gr; ctx.fill()

        } else if (p.type === 'firefly') {
          // Firefly: slow sine pulse — modulate base alpha
          const pulse = (Math.sin(p.life * p.pulseRate * 60 + p.pulsePhase) + 1) / 2  // 0–1
          ctx.globalAlpha = a * (0.05 + pulse * 0.90)
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.8)
          gr.addColorStop(0,   'rgba(228,255,140,1)')
          gr.addColorStop(0.3, 'rgba(165,238,72,0.80)')
          gr.addColorStop(0.7, 'rgba(100,210,45,0.25)')
          gr.addColorStop(1,   'rgba(80,190,30,0)')
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.8, 0, Math.PI * 2)
          ctx.fillStyle = gr; ctx.fill()

        } else if (p.type === 'spore') {
          // Spore: soft pale-green glow
          const wobble = 0.88 + 0.12 * Math.sin(p.life * p.wobbleFreq + p.wobblePhase)
          ctx.globalAlpha = a * wobble
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2)
          gr.addColorStop(0, 'rgba(200,240,188,0.70)')
          gr.addColorStop(0.5, 'rgba(165,220,148,0.30)')
          gr.addColorStop(1,  'rgba(140,200,120,0)')
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = gr; ctx.fill()
        }
        ctx.restore()
      }

      // Replenish — stagger spawns with random delay feel by checking < max
      if (hasDust      && particles.filter(p => p.type === 'dust'    ).length < DUST_MAX)    particles.push(_makeDust(w, h, pr, pg, pb))
      if (hasEmbers    && particles.filter(p => p.type === 'ember'   ).length < EMBER_MAX)   particles.push(_makeEmber(w, h))
      if (hasSmoke     && particles.filter(p => p.type === 'smoke'   ).length < SMOKE_MAX)   particles.push(_makeSmoke(w, h))
      if (hasFireflies && particles.filter(p => p.type === 'firefly' ).length < FIREFLY_MAX) particles.push(_makeFirefly(w, h))
      if (hasSpores    && particles.filter(p => p.type === 'spore'   ).length < SPORE_MAX)   particles.push(_makeSpore(w, h))

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [effectKey, pr, pg, pb])  // eslint-disable-line react-hooks/exhaustive-deps

  if (effects.length === 0) return null

  const hasFog   = effects.includes('fog')
  const hasLamp  = effects.includes('lamplight')
  const hasEmbers = effects.includes('embers')

  return (
    <>
      {hasFog && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(150deg, rgba(100,120,150,0.07) 0%, transparent 55%, rgba(90,110,140,0.06) 100%)',
          animation: 'ssFogDrift 22s ease-in-out infinite alternate' }} />
      )}
      {hasLamp && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 18% 28%, rgba(${pr},${pg},${pb},0.09) 0%, transparent 58%), radial-gradient(ellipse at 82% 22%, rgba(${pr},${pg},${pb},0.07) 0%, transparent 52%)`,
          animation: 'ssLampPulse 4s ease-in-out infinite alternate' }} />
      )}
      {hasEmbers && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 80%, rgba(220,70,20,0.06) 0%, transparent 65%)',
          animation: 'ssEmberGlow 2.5s ease-in-out infinite alternate' }} />
      )}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none', width: '100%', height: '100%' }} />
    </>
  )
}

// ─── Skip confirmation overlay ────────────────────────────────────────────────
function SkipConfirmOverlay({ onConfirm, onCancel }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 30); return () => clearTimeout(t) }, [])
  return (
    <div onClick={e => e.stopPropagation()} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(2,1,10,0.88)', backdropFilter: 'blur(7px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: mounted ? 1 : 0, transition: 'opacity 0.2s ease',
    }}>
      <div style={{
        textAlign: 'center', maxWidth: 'min(440px, 88vw)',
        padding: 'clamp(1.8rem,4vw,2.8rem)',
        background: 'rgba(4,3,14,0.97)', border: '1px solid rgba(130,100,35,0.42)',
        borderRadius: '3px', display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(0.8rem,1.8vh,1.3rem)', boxShadow: '0 0 60px rgba(0,0,0,0.85)',
      }}>
        <div style={{ width: '6px', height: '6px', background: 'rgba(201,168,76,0.5)', borderRadius: '1px', transform: 'rotate(45deg)', boxShadow: '0 0 12px rgba(201,168,76,0.3)' }} />
        <p style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.55rem,0.68vw,0.72rem)', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(155,122,38,0.72)', margin: 0 }}>
          Skip Scene
        </p>
        <p style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: 'clamp(0.82rem,1vw,1rem)', color: 'rgba(198,180,144,0.9)', lineHeight: 1.8, margin: 0 }}>
          This scene will be recorded in your Journal as skipped. You can reread it at any time from the main menu.
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onConfirm}
            style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.6rem,0.72vw,0.78rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(218,185,88,0.9)', background: 'rgba(14,11,20,0.9)', border: '1px solid rgba(155,120,38,0.55)', borderRadius: '2px', padding: '0.7em 1.5em', cursor: 'pointer', transition: 'all 0.18s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(14,11,20,0.9)'; e.currentTarget.style.borderColor='rgba(155,120,38,0.55)' }}>
            Skip this Scene
          </button>
          <button onClick={onCancel}
            style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.6rem,0.72vw,0.78rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(155,138,105,0.75)', background: 'transparent', border: '1px solid rgba(80,65,35,0.4)', borderRadius: '2px', padding: '0.7em 1.5em', cursor: 'pointer', transition: 'all 0.18s ease' }}
            onMouseEnter={e => { e.currentTarget.style.color='rgba(185,165,115,0.9)'; e.currentTarget.style.borderColor='rgba(120,100,55,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(155,138,105,0.75)'; e.currentTarget.style.borderColor='rgba(80,65,35,0.4)' }}>
            Continue Reading
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Gate task row ─────────────────────────────────────────────────────────────
// Single task row inside SceneGatePanel.
// Click anywhere on the row to mark it complete.
function GateTaskRow({ task, taskKey, arcIdx, weekIdx, taskIdx, onComplete, isCompleted }) {
  const [sweeping, setSweeping] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCheck = useCallback(() => {
    if (isCompleted || sweeping) return
    setSweeping(true)
    storage.completeTask(arcIdx, weekIdx, taskIdx)
    try { SoundEngine.deedComplete() } catch (_) {}
    setTimeout(() => { setSweeping(false); onComplete(taskKey) }, 520)
  }, [arcIdx, weekIdx, taskIdx, taskKey, isCompleted, sweeping, onComplete])

  return (
    <div
      onClick={handleCheck}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'clamp(0.8rem,1.1vw,1.1rem)',
        padding: 'clamp(0.9rem,1.5vh,1.25rem) clamp(1.1rem,1.6vw,1.5rem)',
        background: isCompleted
          ? 'rgba(201,168,76,0.04)'
          : sweeping
          ? 'rgba(201,168,76,0.1)'
          : 'transparent',
        borderBottom: '1px solid rgba(201,168,76,0.09)',
        cursor: isCompleted ? 'default' : 'pointer',
        overflow: 'hidden',
        transition: 'background 0.6s ease',
      }}
    >
      {/* Gold sweep — travels left to right across the row on check */}
      {sweeping && (
        <div style={{
          position: 'absolute', top: 0, bottom: 0, width: '55%',
          left: '-55%', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent 0%, rgba(201,168,76,0.38) 35%, rgba(255,228,130,0.55) 52%, rgba(201,168,76,0.38) 68%, transparent 100%)',
          animation: 'sgSweep 0.56s cubic-bezier(0.4,0,0.2,1) forwards',
        }} />
      )}

      {/* Diamond seal glyph — ◇ unchecked → ✦ checked */}
      <div style={{
        flexShrink: 0,
        width: 'clamp(20px,1.6vw,24px)', height: 'clamp(20px,1.6vw,24px)',
        marginTop: '0.1em',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'clamp(0.82rem,0.96vw,1.05rem)',
        color: isCompleted ? 'rgba(201,168,76,1)' : sweeping ? 'rgba(201,168,76,0.9)' : 'rgba(118,92,34,0.75)',
        filter: isCompleted ? 'drop-shadow(0 0 9px rgba(201,168,76,0.7))' : 'none',
        transition: 'color 0.55s ease, filter 0.55s ease',
        pointerEvents: 'none',
      }}>
        {isCompleted || sweeping ? '✦' : '◇'}
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: '"Lora", serif',
          fontSize: 'clamp(0.96rem, 1.1vw, 1.18rem)',
          color: isCompleted ? 'rgba(165,148,108,0.62)' : 'rgba(238,224,196,1)',
          lineHeight: 1.68,
          textDecoration: isCompleted ? 'line-through rgba(155,135,85,0.45)' : 'none',
          transition: 'color 0.5s ease',
          pointerEvents: 'none',
        }}>
          {task.title}
        </div>

        {isCompleted && (
          <div style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 'clamp(0.36rem, 0.42vw, 0.48rem)',
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.68)',
            marginTop: '0.25rem',
            animation: 'sgFadeIn 0.5s ease',
            pointerEvents: 'none',
          }}>
            Recorded
          </div>
        )}

        {!isCompleted && task.description && (
          <>
            <button
              onClick={e => { e.stopPropagation(); setExpanded(ex => !ex) }}
              style={{
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', marginTop: '0.3rem',
                fontFamily: '"Cinzel", serif',
                fontSize: 'clamp(0.38rem, 0.44vw, 0.48rem)',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(138,110,42,0.75)',
                transition: 'color 0.14s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(188,152,62,0.95)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(138,110,42,0.75)'}
            >
              {expanded ? '▲ Less' : '▼ What to do'}
            </button>
            {expanded && (
              <div style={{
                fontFamily: '"Lora", serif', fontStyle: 'italic',
                fontSize: 'clamp(0.78rem, 0.88vw, 0.94rem)',
                color: 'rgba(182,162,120,0.88)', lineHeight: 1.72,
                marginTop: '0.38rem',
                paddingLeft: '0.85rem',
                borderLeft: '2px solid rgba(201,168,76,0.22)',
                animation: 'sgFadeIn 0.28s ease',
              }}>
                {task.description}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Scene Gate Panel ──────────────────────────────────────────────────────────
// Overlaid on the story (not a page replacement). Slides up from the bottom.
// Tasks stay visible throughout — no jarring disappear on last check.
// Last task checked → brief gold shimmer → auto-advances.
function SceneGatePanel({ segmentId, onContinue }) {
  const weekNum  = parseInt((segmentId || '').replace(/^a\d+_seg/, ''), 10) || 1
  const plan     = storage.getPlan()
  const progress = storage.getPlanProgress()
  const arcIdx   = progress.currentArcIdx  ?? 0
  const weekIdx  = progress.currentWeekIdx ?? 0
  const weekData = plan?.arcs?.[arcIdx]?.weeklyPlan?.[weekIdx]
  const allTasks = weekData?.tasks || []

  // All task keys for this week
  const allTaskEntries = allTasks.map((task, i) => ({
    task, taskIdx: i, key: `a${arcIdx}_w${weekIdx}_t${i}`,
  }))

  // Which are already done in storage (from a previous session)
  const alreadyDoneKeys = useMemo(() => new Set(
    allTaskEntries.map(e => e.key).filter(k => !!progress.tasksDone?.[k])
  ), []) // eslint-disable-line react-hooks/exhaustive-deps

  // Which were pending (not already done) when the panel opened
  const pendingTasks = allTaskEntries.filter(e => !alreadyDoneKeys.has(e.key))

  // Tasks completed this session
  const [completedKeys, setCompletedKeys] = useState(() => new Set())
  const [allDone,       setAllDone]       = useState(() => pendingTasks.length === 0)
  const [mounted,       setMounted]       = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const isVisuallyDone = (key) => alreadyDoneKeys.has(key) || completedKeys.has(key)
  const doneCount = allTaskEntries.filter(e => isVisuallyDone(e.key)).length
  const totalCount = allTaskEntries.length

  const handleTaskComplete = useCallback((key) => {
    setCompletedKeys(prev => {
      const next = new Set(prev)
      next.add(key)
      if (next.size >= pendingTasks.length) {
        setTimeout(() => {
          setAllDone(true)
          try { SoundEngine.chapterComplete() } catch (_) {}
        }, 340)
      }
      return next
    })
  }, [pendingTasks.length])

  // Auto-continue after seal-breaks moment
  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(() => onContinue(), 1200)
    return () => clearTimeout(t)
  }, [allDone]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 30,
        background: 'rgba(4,3,16,0.72)', backdropFilter: 'blur(4px)',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 31,
          maxHeight: '80vh', overflowY: 'auto', scrollbarWidth: 'none',
          background: 'rgba(4,3,16,0.99)',
          borderTop: '2px solid rgba(201,168,76,0.5)',
          boxShadow: '0 -14px 80px rgba(0,0,0,0.88)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.42s ease, transform 0.44s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Bright top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px', pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent 0%, rgba(201,168,76,1) 20%, rgba(255,232,140,1) 50%, rgba(201,168,76,1) 80%, transparent 100%)',
          boxShadow: '0 0 22px rgba(201,168,76,0.75), 0 0 48px rgba(201,168,76,0.25)',
        }} />

        {/* Full-panel gold shimmer when all done */}
        {allDone && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, transparent 30%, rgba(201,168,76,0.05) 50%, transparent 70%)',
            animation: 'sgShimmer 2.2s ease-in-out infinite',
          }} />
        )}

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(1rem,1.8vh,1.5rem) clamp(1.4rem,5vw,5rem)' }}>

          {/* ── Header ── */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem',
            marginBottom: 'clamp(0.5rem,0.9vh,0.8rem)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: 'clamp(0.9rem,1vw,1.1rem)', lineHeight: 1, color: 'rgba(201,168,76,1)', filter: 'drop-shadow(0 0 7px rgba(201,168,76,0.8))' }}>◈</span>
              <span style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 'clamp(0.46rem,0.56vw,0.62rem)',
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.92)',
              }}>
                Week {weekNum}{weekData?.theme ? ` · ${weekData.theme}` : ''}
              </span>
            </div>

            {/* Progress pips */}
            {totalCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.38rem' }}>
                <span style={{
                  fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.32rem,0.38vw,0.42rem)',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(140,112,42,0.7)', marginRight: '0.2rem',
                }}>
                  Tasks
                </span>
                {allTaskEntries.map((e, i) => {
                  const done = isVisuallyDone(e.key)
                  return (
                    <div key={i} style={{
                      width: 'clamp(7px,0.55vw,9px)', height: 'clamp(7px,0.55vw,9px)',
                      borderRadius: '1px', transform: 'rotate(45deg)',
                      background: done ? 'rgba(201,168,76,0.95)' : 'rgba(201,168,76,0.12)',
                      border: `1px solid rgba(201,168,76,${done ? '0.72' : '0.22'})`,
                      boxShadow: done ? '0 0 7px rgba(201,168,76,0.45)' : 'none',
                      transition: 'all 0.45s ease',
                    }} />
                  )
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.18), transparent)', marginBottom: 'clamp(0.6rem,1vh,0.9rem)' }} />

          {/* ── Lore text — changes on completion ── */}
          <p style={{
            fontFamily: '"Lora", serif', fontStyle: 'italic',
            fontSize: 'clamp(0.86rem, 1vw, 1.05rem)',
            color: allDone ? 'rgba(195,172,128,0.82)' : 'rgba(195,172,128,0.88)',
            lineHeight: 1.8, margin: '0 0 clamp(0.7rem,1.2vh,1rem)',
            transition: 'color 0.6s ease',
          }}>
            {allDone
              ? 'The work is recorded. The Archive acknowledges the week. The next passage unseals itself.'
              : 'The chronicle pauses here. The next passage is sealed behind the work of this week.'}
          </p>

          {/* ── Task list — always visible, tasks show completion state ── */}
          <div style={{
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: 'clamp(0.55rem,1vh,0.9rem)',
          }}>
            {allTaskEntries.map(({ task, taskIdx, key }) => (
              <GateTaskRow
                key={key}
                task={task}
                taskKey={key}
                arcIdx={arcIdx}
                weekIdx={weekIdx}
                taskIdx={taskIdx}
                onComplete={handleTaskComplete}
                isCompleted={isVisuallyDone(key)}
              />
            ))}
          </div>

          {/* ── Seal-breaks footer ── */}
          {allDone && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.7rem',
              animation: 'sgFadeIn 0.55s ease',
              paddingBottom: 'clamp(0.2rem,0.4vh,0.4rem)',
            }}>
              <span style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 'clamp(0.6rem,0.72vw,0.78rem)',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,1)',
                filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.7))',
              }}>
                ✦ The Seal Breaks
              </span>
              <span style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 'clamp(0.4rem,0.48vw,0.54rem)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(148,118,42,0.78)',
                animation: 'ssPulse 1.5s ease-in-out infinite',
              }}>
                continuing…
              </span>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes sgSweep {
          0%   { left: -55%; }
          100% { left: 110%; }
        }
        @keyframes sgFadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sgShimmer {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
      `}</style>
    </>
  )
}

// ─── Act Complete data ────────────────────────────────────────────────────────
const ACT_COMPLETE_DATA = {
  act1: {
    bg:      'cold_field',
    summary: 'The Archive burned. The road east began. The journal found its way to the hands it was left for.',
  },
  act2: {
    bg:      'act2_wilderness',
    summary: 'The Spire was entered. The method was placed. The Unnamed Third moves west toward the Archive ruins.',
  },
}
const _ROMAN        = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const _WRITTEN_ACTS = new Set(['act1', 'act2'])

// ─── Act Complete screen ──────────────────────────────────────────────────────
function ActCompleteScreen({ navigate, onRestart, actId = 'act1' }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const actInfo   = STORY_ACTS.find(a => a.id === actId) || STORY_ACTS[0]
  const actData   = ACT_COMPLETE_DATA[actId] || ACT_COMPLETE_DATA.act1
  const bgObj     = BG[actData.bg] || BG.cold_field
  const actNum    = parseInt((actId || 'act1').replace('act', ''), 10) || 1
  const nextActId = `act${actNum + 1}`
  const showNotice = actNum < 7 && !_WRITTEN_ACTS.has(nextActId)
  const noticeText = showNotice ? `Acts ${_ROMAN[actNum + 1]}–VII being inscribed` : null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#03020c',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: `url('${bgObj.fallback || bgObj.src}') center/cover no-repeat`, filter: 'brightness(0.11) saturate(0.4)', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at 50% 60%, transparent 25%, rgba(3,2,12,0.9) 100%)' }} />

      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: 'clamp(1.5rem,4vw,3rem)', maxWidth: 'min(560px, 88vw)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(0.9rem,2.2vh,1.6rem)',
      }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '1px', background: 'rgba(201,168,76,0.55)', transform: 'rotate(45deg)', boxShadow: '0 0 16px rgba(201,168,76,0.4)' }} />

        <p style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.82rem, 0.9vw, 0.96rem)', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(155,122,38,0.72)', margin: 0 }}>
          {actInfo?.subtitle || `Act ${_ROMAN[actNum]}`} Complete
        </p>

        <h1 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(1.2rem, 2.2vw, 2.2rem)', color: 'transparent', backgroundImage: 'linear-gradient(180deg, rgba(255,245,210,0.96) 0%, rgba(200,165,70,0.88) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', margin: 0, letterSpacing: '0.04em', lineHeight: 1.25 }}>
          {actInfo?.title || actId}
        </h1>

        <div style={{ width: 'clamp(40px, 8vw, 80px)', height: '1px', background: 'linear-gradient(to right, transparent, rgba(155,122,38,0.5), transparent)' }} />

        <p style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: 'clamp(0.82rem, 1vw, 1rem)', color: 'rgba(185,165,115,0.8)', lineHeight: 1.85, margin: 0, maxWidth: '400px' }}>
          {actData.summary}
        </p>

        {showNotice && noticeText && (
          <p style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 'clamp(0.82rem, 0.9vw, 0.96rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(120,95,42,0.7)',
            margin: 0,
            border: '1px solid rgba(90,70,28,0.3)',
            padding: '0.55em 1.1em',
            borderRadius: '2px',
          }}>
            {noticeText}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'clamp(0.4rem,0.9vh,0.7rem)' }}>
          <button
            onClick={() => navigate(SCREENS.MAIN_MENU)}
            style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.9rem, 1vw, 1.1rem)', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(218,185,88,0.97)', background: 'linear-gradient(135deg,rgba(201,168,76,0.14) 0%,rgba(150,115,40,0.08) 100%)', border: '1px solid rgba(201,168,76,0.65)', borderRadius: '2px', padding: '0.72em 1.8em', cursor: 'pointer', transition: 'all 0.18s ease', boxShadow: '0 0 18px rgba(201,168,76,0.12)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.18)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.9)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(201,168,76,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,rgba(201,168,76,0.14) 0%,rgba(150,115,40,0.08) 100%)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.65)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(201,168,76,0.12)' }}
          >
            Return to Archive
          </button>
          <button
            onClick={onRestart}
            style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.9rem, 1vw, 1.1rem)', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(130,112,72,0.62)', background: 'transparent', border: '1px solid rgba(72,58,28,0.35)', borderRadius: '2px', padding: '0.72em 1.6em', cursor: 'pointer', transition: 'all 0.18s ease' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(165,140,88,0.85)'; e.currentTarget.style.borderColor = 'rgba(110,90,40,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(130,112,72,0.62)'; e.currentTarget.style.borderColor = 'rgba(72,58,28,0.35)' }}
          >
            Read Again
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main StoryScreen ─────────────────────────────────────────────────────────
export default function StoryScreen({ appState, navigate }) {

  // ── Story mode — 'main' | 'spark' | 'epoch' | 'revisit' ──────────────────
  // Spark/epoch/revisit modes skip localStorage and navigate back on complete.
  const storyMode    = appState?.storyMode || 'main'
  const isEphemeral  = storyMode !== 'main'  // no localStorage for sparks/epochs/revisit

  // ── Player character (Kael or Sira) ────────────────────────────────────────
  const { character: playerChar } = useMemo(() => storage.getPlayerIdentity(), [])

  // ── Current act — derived from plan phaseNumber ────────────────────────────
  const currentActId = useMemo(() => {
    const plan = storage.getPlan()
    return `act${plan?.phaseNumber || 1}`
  }, [])

  // ── Resolve beat array for the current mode ────────────────────────────────
  const BEATS = useMemo(() => {
    if (storyMode === 'spark') {
      const { weekKey, sparkIdx } = appState
      const raw = getActSparks(currentActId)?.[weekKey]?.[sparkIdx] || []
      return adaptBeatsForPlayer(raw, playerChar)
    }
    if (storyMode === 'epoch') {
      const raw = getActEpochs(currentActId)?.[appState?.epochArcIdx] || []
      return adaptBeatsForPlayer(raw, playerChar)
    }
    if (storyMode === 'revisit') {
      // Find the segment in the main beat array
      const all  = adaptBeatsForPlayer(getActBeats(currentActId), playerChar)
      const segId = appState?.segmentId
      if (!segId) return all
      const start = all.findIndex(b => b.segmentId === segId)
      if (start === -1) return all
      // Slice from segment start to next segment start (exclusive)
      const end = all.findIndex((b, i) => i > start && b.segmentId && b.segmentId !== segId)
      return end === -1 ? all.slice(start) : all.slice(start, end)
    }
    // main mode — full act beats
    return adaptBeatsForPlayer(getActBeats(currentActId), playerChar)
  }, [storyMode, playerChar, currentActId]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Restore saved progress (main mode only) ─────────────────────────────────
  const saved = useMemo(() => (isEphemeral ? null : loadProgress()), [isEphemeral])

  // ── Gate-validate saved position ───────────────────────────────────────────
  // Guards against a stale story save whose position is inside a segment that
  // is no longer unlocked (e.g. after loadPreset() resets plan progress).
  // When the saved beat is in a locked segment we rewind to the start of the
  // last unlocked segment and clear flags/actComplete so state is consistent.
  const safeSaved = useMemo(() => {
    if (!saved || isEphemeral) return saved
    const raw      = saved.beatIdx ?? 0
    const unlocked = storage.getPlanProgress().unlockedScenes || ['a1_seg0']
    const beats    = adaptBeatsForPlayer(getActBeats(currentActId), playerChar)
    // Find the enclosing segmentId for the saved beat (scan backwards)
    let segId = null
    for (let i = raw; i >= 0; i--) {
      if (beats[i]?.segmentId) { segId = beats[i].segmentId; break }
    }
    // If the segment is unlocked (or no segment boundary found), position is valid
    if (!segId || unlocked.includes(segId)) return saved
    // Rewind to the start beat of the last unlocked segment
    let rewindIdx = 0
    for (const sid of unlocked) {
      const si = beats.findIndex(b => b.segmentId === sid)
      if (si !== -1 && si > rewindIdx) rewindIdx = si
    }
    // Return cleaned-up save: rewound position, flags and actComplete reset
    return { beatIdx: rewindIdx, flags: {}, bgKey: 'archive_night', actComplete: false }
  }, [saved, isEphemeral, playerChar, currentActId]) // eslint-disable-line react-hooks/exhaustive-deps

  const [beatIdx,          setBeatIdx]         = useState(safeSaved?.beatIdx    ?? 0)
  const [reaction,         setReaction]        = useState(null)
  const [flags,            setFlags]           = useState(safeSaved?.flags ?? {})
  const [showChoice,       setShowChoice]      = useState(false)
  const [actComplete,      setActComplete]     = useState(safeSaved?.actComplete ?? false)
  const [twKey,            setTwKey]           = useState(0)
  const [showSkipConfirm,  setShowSkipConfirm] = useState(false)
  const [lockedSceneId,    setLockedSceneId]   = useState(null)
  const [showWeekCheckin,  setShowWeekCheckin] = useState(false)
  // afterGateBeatIdxRef: where to jump AFTER the gate clears.
  // null = normal advance (beatIdx + 1). Set by handleSkipScene when the
  // skip-target scene is locked, so the gate resolves to the right place.
  const afterGateBeatIdxRef   = useRef(null)
  // pendingGateResumeRef: the beat target to advance to after the week checkin dismisses.
  const pendingGateResumeRef  = useRef(null)

  // ── Backgrounds ─────────────────────────────────────────────────────────
  // bgBase = the "scene" level BG (changes on beat.bg beats, saved/loaded).
  // autoAngle = derived from activeSide ('left_speaker' | 'right_speaker' | null).
  // The visually displayed bg = bgBase + autoAngle resolved (no crossfade on angle switch).
  const initBg  = BG[safeSaved?.bgKey] || BG.archive_night
  const [bgBase, setBgBase] = useState(initBg)
  const [prevBg, setPrevBg] = useState(initBg)

  const changeScene = useCallback((newBase) => {
    if (!newBase) return
    setPrevBg(bgBase)
    setBgBase(newBase)
    const t = setTimeout(() => setPrevBg(newBase), 950)
    return () => clearTimeout(t)
  }, [bgBase])

  // ── Character staging ─────────────────────────────────────────────────────
  // leftChars / rightChars: [{ name, expr, isListener }]
  // isListener=true = auto-staged player (can be replaced by establishing shots)
  const [leftChars,  setLeftChars]  = useState([])
  const [rightChars, setRightChars] = useState([])
  const [activeSide, setActiveSide] = useState(null)

  // ── Auto camera angle (derived) ───────────────────────────────────────────
  // When left speaks → show left_speaker BG angle; right → right_speaker; narration → base
  const autoAngle = activeSide === 'left'  ? 'left_speaker'
                  : activeSide === 'right' ? 'right_speaker'
                  : null

  // Displayed BG — beat-level angle overrides (behind, close, wide) still baked via changeScene.
  // left_speaker / right_speaker are handled by CSS background-position pan — no separate files.
  const bg = useMemo(() => {
    if (!autoAngle || autoAngle === 'left_speaker' || autoAngle === 'right_speaker') return bgBase
    if (!bgBase?.angles?.[autoAngle]) return bgBase
    return { ...bgBase, ...bgBase.angles[autoAngle] }
  }, [bgBase, autoAngle])

  // ── Screen mount fade ─────────────────────────────────────────────────────
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  // ── Stop VO on unmount (back button, ephemeral complete, etc.) ────────────
  useEffect(() => () => { AudioManager.stopVO(); AudioManager.clearAmbient() }, [])

  // ── Derive current beat ───────────────────────────────────────────────────
  const currentBeat = reaction ? reaction.beats[reaction.idx] : BEATS[beatIdx]

  // ── Typewriter ────────────────────────────────────────────────────────────
  const isTaskGate = currentBeat?.type === 'task_gate'
  const twText = (currentBeat?.type === 'choice' || isTaskGate) ? '' : (currentBeat?.text ?? '')
  const { displayed, done, complete } = useTypewriter(twText, twKey)

  // ── Background transitions ────────────────────────────────────────────────
  // beat.bg sets the scene. beat.bgAngle can force a manual angle override (stored as base).
  // autoAngle (derived from activeSide) automatically angles the BG between speakers.
  useEffect(() => {
    const beat = reaction ? reaction.beats[reaction.idx] : BEATS[beatIdx]
    if (!beat?.bg) return
    // If beat specifies a manual bgAngle, bake that into the base (beat override wins)
    const baseBG  = beat.bg
    const bgAngle = beat.bgAngle
    const newBase = (bgAngle && baseBG.angles?.[bgAngle])
      ? { ...baseBG, ...baseBG.angles[bgAngle] }
      : baseBG
    changeScene(newBase)
  }, [beatIdx, reaction?.idx]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Portrait staging ──────────────────────────────────────────────────────
  // leftChars / rightChars = [{ name, expr, isListener }]
  // isListener=true means auto-staged (will be replaced by an establishing character)
  useEffect(() => {
    const beat = currentBeat
    if (!beat) return

    if (beat.clearStage) {
      setLeftChars([])
      setRightChars([])
      setActiveSide(null)
      return
    }

    if (beat.type === 'dialogue') {
      const isPlayerBeat = ['kael', 'sira'].includes(beat.char?.toLowerCase())
      const speakerInfo  = { name: beat.char, expr: beat.expr || 'neutral', isListener: false }

      // One character per side — if same char updates expression, update in place.
      // If a new character speaks from this side, replace whoever was there (no stacking).
      const updateSide = (prev, info) => {
        const idx = prev.findIndex(c => c.name?.toLowerCase() === info.name?.toLowerCase())
        if (idx !== -1) {
          // Same character already on this side — update expression only
          const updated = [...prev]
          updated[idx]  = { ...updated[idx], expr: info.expr, isListener: false }
          return updated
        }
        // New character on this side — replace entirely, one portrait per side
        return [info]
      }

      if (beat.side === 'left')  { setLeftChars(prev  => updateSide(prev, speakerInfo)); setActiveSide('left')  }
      if (beat.side === 'right') { setRightChars(prev => updateSide(prev, speakerInfo)); setActiveSide('right') }

      // Auto-stage player as passive listener on opposite side — only if that side is empty
      if (!isPlayerBeat && beat.showPlayer !== false) {
        const playerName = (playerChar || 'kael').toUpperCase()
        const listener   = { name: playerName, expr: 'neutral', isListener: true }
        if (beat.side === 'left')  setRightChars(prev => prev.length > 0 ? prev : [listener])
        if (beat.side === 'right') setLeftChars(prev  => prev.length > 0 ? prev : [listener])
      }
    } else if (beat.type !== 'choice') {
      setActiveSide(null)  // narration — no active speaker, everyone dims
    }
  }, [beatIdx, reaction?.idx]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-show choice panel ────────────────────────────────────────────────
  useEffect(() => {
    if (currentBeat?.type === 'choice') {
      const t = setTimeout(() => setShowChoice(true), 350)
      return () => clearTimeout(t)
    } else {
      setShowChoice(false)
    }
  }, [beatIdx, reaction?.idx]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Ambient audio — switch when scene BG changes ──────────────────────────
  // bgBase changes whenever a beat uses bg: BG.something. Ambient file path
  // lives on bgBase.ambient. Silently ignored if file doesn't exist yet.
  useEffect(() => {
    const amb = bgBase?.ambient
    AudioManager.clearAmbient()
    if (amb) AudioManager.addAmbient(amb)
    // No cleanup needed — clearAmbient on next scene change handles it
  }, [bgBase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Voice-over — play VO file attached to each beat ───────────────────────
  // attachVoFiles() in story.js stamps beat.voFile on every narration/dialogue.
  // AudioManager.playVO silently fails if the file hasn't been generated yet.
  useEffect(() => {
    const beat = reaction ? reaction.beats[reaction.idx] : BEATS[beatIdx]
    if (!beat?.voFile) return
    AudioManager.playVO(beat.voFile)
  }, [beatIdx, reaction?.idx]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Save progress (main mode only — sparks/epochs/revisit are ephemeral) ───
  useEffect(() => {
    if (isEphemeral) return
    const k = bgKey(bgBase)  // save the base scene key, not the angle-resolved key
    if (actComplete) {
      saveProgress({ actComplete: true, flags, bgKey: k, beatIdx })
    } else if (!reaction) {
      saveProgress({ beatIdx, flags, bgKey: k, actComplete: false })
    }
  }, [beatIdx, flags, actComplete, bgBase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Priority 4: Expression SFX — plays preSfx on each beat ───────────────
  useEffect(() => {
    const beat = reaction ? reaction.beats[reaction.idx] : BEATS[beatIdx]
    if (!beat?.preSfx) return
    try {
      const audio = new Audio(`${EXPR_SFX_BASE}${beat.preSfx}.mp3`)
      const settings = storage.getSettings()
      audio.volume = settings.muted ? 0 : (settings.sfxVolume ?? 0.6)
      audio.play().catch(() => {})  // silent fail if file missing
    } catch (_) {}
  }, [beatIdx, reaction?.idx]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scene Journal — record each segment when first reached ───────────────
  useEffect(() => {
    const beat = reaction ? reaction.beats[reaction.idx] : BEATS[beatIdx]
    if (beat?.segmentId) {
      recordScene(beat.segmentId, beat.segmentTitle, beat.segmentSummary, currentActId, false)
    }
  }, [beatIdx, reaction?.idx]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scene gate helper ─────────────────────────────────────────────────────
  // Returns the segmentId if the beat at nextBeatIdx is locked, null if passable.
  const checkSceneLock = useCallback((nextBeatIdx) => {
    const nextBeat = BEATS[nextBeatIdx]
    if (!nextBeat?.segmentId) return null
    const unlocked = storage.getPlanProgress().unlockedScenes || ['a1_seg0']
    if (unlocked.includes(nextBeat.segmentId)) return null
    return nextBeat.segmentId
  }, [BEATS])

  // ── Advance ───────────────────────────────────────────────────────────────
  const advance = useCallback(() => {
    setTwKey(k => k + 1)

    if (reaction) {
      const nextIdx = reaction.idx + 1
      if (nextIdx >= reaction.beats.length) {
        setReaction(null)
        const next = beatIdx + 1
        if (next >= BEATS.length) { setActComplete(true); return }
        const lockedId = checkSceneLock(next)
        if (lockedId) { setLockedSceneId(lockedId); return }
        setBeatIdx(next)
      } else {
        setReaction(r => ({ ...r, idx: nextIdx }))
      }
    } else {
      const next = beatIdx + 1
      if (next >= BEATS.length) { setActComplete(true); return }
      const lockedId = checkSceneLock(next)
      if (lockedId) { setLockedSceneId(lockedId); return }
      setBeatIdx(next)
    }
  }, [reaction, BEATS.length, beatIdx, checkSceneLock])

  // ── Screen click ──────────────────────────────────────────────────────────
  const handleScreenClick = useCallback(() => {
    if (showWeekCheckin) return  // WeekCompleteCheckin handles its own clicks
    if (lockedSceneId) return    // SceneGatePanel handles its own interaction
    if (isTaskGate) return       // TaskGate handles its own interaction — clicks pass through
    if (showChoice) return
    if (!done)      { complete(); return }
    if (currentBeat?.type === 'choice') { setShowChoice(true); return }
    advance()
  }, [showWeekCheckin, lockedSceneId, isTaskGate, showChoice, done, complete, currentBeat, advance])

  // ── Choice selection ──────────────────────────────────────────────────────
  const handleChoiceSelect = useCallback((option) => {
    if (option.flag) setFlags(f => ({ ...f, [option.flag]: true }))
    setShowChoice(false)

    // ── Game mechanics: apply choice effects ─────────────────────────────
    if (option.effects) {
      // Relationship adjustments
      if (option.effects.relationships) {
        for (const [char, delta] of Object.entries(option.effects.relationships)) {
          try { storage.adjustRelationship(char, delta) } catch (_) {}
        }
      }
      // Item grants
      if (option.effects.give) {
        for (const item of option.effects.give) {
          try { storage.giveItem(item.id, item.name || item.id, item.qty ?? 1) } catch (_) {}
        }
      }
    }

    if (option.beats?.length) {
      setReaction({ beats: option.beats, idx: 0 })
      setTwKey(k => k + 1)
    } else {
      setReaction(null)
      setTwKey(k => k + 1)
      const next = beatIdx + 1
      if (next >= BEATS.length) { setActComplete(true); return }
      const lockedId = checkSceneLock(next)
      if (lockedId) { setLockedSceneId(lockedId); return }
      setBeatIdx(next)
    }
  }, [BEATS.length, beatIdx, checkSceneLock])

  // ── Restart ───────────────────────────────────────────────────────────────
  const handleRestart = useCallback(() => {
    saveProgress({ beatIdx: 0, flags: {}, bgKey: 'archive_night', actComplete: false })
    setBeatIdx(0);    setReaction(null);  setFlags({})
    setShowChoice(false); setActComplete(false)
    setBgBase(BG.archive_night); setPrevBg(BG.archive_night)
    setLeftChars([]); setRightChars([]); setActiveSide(null)
    setTwKey(k => k + 1)
  }, [])

  // ── Gate continue — called by SceneGatePanel when tasks are done ─────────
  // Advances the week (unlocks next scene), shows the Week Complete check-in,
  // then resumes the story when the user dismisses the check-in.
  const handleGateContinue = useCallback(() => {
    // Stop any playing VO before showing Vael — prevents overlap
    AudioManager.stopVO()
    const plan     = storage.getPlan()
    const progress = storage.getPlanProgress()
    storage.advanceWeek(plan, progress)   // saves internally; unlocks a1_seg{n}
    setLockedSceneId(null)
    const target = afterGateBeatIdxRef.current ?? (beatIdx + 1)
    afterGateBeatIdxRef.current = null
    setReaction(null)
    setShowChoice(false)
    pendingGateResumeRef.current = target
    // Only show the check-in once per calendar day
    const today = new Date().toISOString().slice(0, 10)
    const daily = storage.getDailyState()
    if (daily.lastCheckin === today) {
      // Already checked in today — skip the overlay, advance directly
      setShowWeekCheckin(false)
      const resumeTarget = target
      if (resumeTarget >= BEATS.length) { setActComplete(true) }
      else { setBeatIdx(resumeTarget); pendingGateResumeRef.current = null }
    } else {
      // First gate clearance today — show check-in and record the date
      storage.saveDailyState({ ...daily, lastCheckin: today })
      setShowWeekCheckin(true)
    }
  }, [beatIdx, BEATS.length])

  // ── Week check-in done — fires after user dismisses the inline check-in ──
  const handleWeekCheckinDone = useCallback(() => {
    setShowWeekCheckin(false)
    const target = pendingGateResumeRef.current ?? (beatIdx + 1)
    pendingGateResumeRef.current = null
    if (target >= BEATS.length) { setActComplete(true) } else { setBeatIdx(target) }
  }, [beatIdx, BEATS.length])

  // ── Skip Scene ────────────────────────────────────────────────────────────
  // Finds the scene the player is currently in, marks it as skipped in the
  // Journal, then jumps to the next scene start beat. If no next scene exists
  // (last scene), goes to Act Complete.
  const currentSceneId = useMemo(() => {
    // Scan backwards from beatIdx to find which segment we are in
    const base = reaction ? reaction.beats[reaction.idx] : BEATS[beatIdx]
    if (base?.segmentId) return base.segmentId
    for (let i = beatIdx; i >= 0; i--) {
      if (BEATS[i]?.segmentId) return BEATS[i].segmentId
    }
    return null
  }, [beatIdx, reaction, BEATS])

  const handleSkipScene = useCallback(() => {
    // Stop any playing VO immediately on skip
    AudioManager.stopVO()
    // Record the current segment as skipped (if not yet visited)
    if (currentSceneId) {
      const existing = storage.getJournal().find(s => s.id === currentSceneId)
      if (!existing) {
        const segBeat = BEATS.find(b => b.segmentId === currentSceneId)
        recordScene(currentSceneId, segBeat?.segmentTitle || currentSceneId, segBeat?.segmentSummary || '', currentActId, true)
      }
    }

    // Find the next segment start beat after the current position
    const nextSceneIdx = BEATS.findIndex(
      (b, i) => i > beatIdx && b.segmentId && b.segmentId !== currentSceneId
    )

    if (nextSceneIdx === -1) {
      // No more scenes — this was the last scene, go to Act Complete
      saveProgress({ beatIdx: 0, flags: {}, bgKey: 'archive_night', actComplete: true })
      setActComplete(true)
    } else {
      // Check if the next scene is locked before jumping to it
      const lockedId = checkSceneLock(nextSceneIdx)
      if (lockedId) {
        setShowSkipConfirm(false)
        afterGateBeatIdxRef.current = nextSceneIdx  // gate resolves here, not beatIdx+1
        setLockedSceneId(lockedId)
        return
      }
      // Jump to the first beat of the next scene
      setReaction(null)
      setBeatIdx(nextSceneIdx)
      setShowChoice(false)
      setTwKey(k => k + 1)
    }
    setShowSkipConfirm(false)
  }, [currentSceneId, beatIdx, BEATS, checkSceneLock])

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleScreenClick()
        return
      }
      if (showChoice && currentBeat?.type === 'choice') {
        const map = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 }
        const idx = map[e.key.toLowerCase()]
        if (idx !== undefined && idx < currentBeat.options.length) {
          handleChoiceSelect(currentBeat.options[idx])
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showChoice, currentBeat, handleScreenClick, handleChoiceSelect])

  // Ephemeral mode complete → consume queue entry and navigate back
  useEffect(() => {
    if (!actComplete || !isEphemeral) return
    if (storyMode === 'spark') storage.shiftSpark()
    // Only clear pending epoch when it's a fresh play (not a journal revisit)
    if (storyMode === 'epoch' && !appState?.isRevisit) storage.clearPendingEpoch()
    // All ephemeral modes return to MainMenu when complete
    navigate(SCREENS.MAIN_MENU)
  }, [actComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────────────────────────────────
  if (actComplete && isEphemeral) return null   // waiting for the useEffect navigate
  if (actComplete) {
    return <ActCompleteScreen navigate={navigate} onRestart={handleRestart} actId={currentActId} />
  }
  if (!currentBeat) return null

  const isAnyActive = !!activeSide

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: '#02010a',
        overflow:   'hidden',   // clips Ken Burns zoom edges
        cursor:     (showChoice || isTaskGate || lockedSceneId) ? 'default' : 'pointer',
        userSelect: 'none', WebkitUserSelect: 'none',
        opacity:    mounted ? 1 : 0,
        transition: 'opacity 0.55s ease',
      }}
      onClick={handleScreenClick}
    >

      {/* ── Previous BG — static beneath during crossfade ── */}
      <div style={{
        position:           'absolute', inset: 0, zIndex: 0,
        backgroundImage:    bgUrl(prevBg),
        backgroundSize:     bgSize(prevBg),
        backgroundPosition: 'center center',
        backgroundRepeat:   'no-repeat',
      }} />

      {/* ── Current BG — keyed on scene (bgBase) so angle changes are instant/no-crossfade ── */}
      {/* Speaker pan: background-position shifts left/right when a character speaks.       */}
      {/* Same image, zero style mismatch — no separate speaker image files needed.         */}
      <div
        key={bgKey(bgBase)}
        style={{
          position:        'absolute', inset: 0, zIndex: 1,
          backgroundImage: bgUrl(bg),
          backgroundSize:  bgSize(bg),
          backgroundPosition: autoAngle === 'left_speaker'  ? '36% center'
                            : autoAngle === 'right_speaker' ? '64% center'
                            : bg?.type  === 'WIDE'          ? '0% center'
                            : bg?.type  === 'TALL'          ? 'center 0%'
                            : 'center center',
          backgroundRepeat:   'no-repeat',
          animation:       bgAnimation(bg),
          transformOrigin: 'center center',
          willChange:      'transform, opacity, background-position',
          transition:      bg?.type ? 'none' : 'background-position 0.7s ease',
        }}
      />

      {/* ── Atmospheric gradient ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: [
          'linear-gradient(to bottom,',
          '  rgba(3,2,12,0.38) 0%,',
          '  transparent 16%,',
          '  transparent 40%,',
          '  rgba(3,2,12,0.5) 62%,',
          '  rgba(3,2,12,0.94) 100%)',
        ].join(' '),
      }} />

      {/* ── Scene alive effects (dust, embers, fog, lamplight) ── */}
      <StoryEffects bgObj={bg} />

      {/* ── Portraits ── */}
      {/* Left side — map over array; listeners show 'listening' pose when someone speaks */}
      {leftChars.map((charInfo, i) => {
        const isActiveSpeaker = activeSide === 'left' &&
          charInfo.name?.toLowerCase() === currentBeat?.char?.toLowerCase()
        // When any character is speaking, non-speakers use 'listening' expr
        const effectiveExpr = (isAnyActive && !isActiveSpeaker) ? 'listening' : charInfo.expr
        return (
          <Portrait
            key={charInfo.name}
            char={charInfo.name}
            expr={effectiveExpr}
            side="left"
            sideIndex={i}
            charCount={leftChars.length}
            isActive={isActiveSpeaker}
            isAnyActive={isAnyActive}
            isListener={charInfo.isListener}
            angle={currentBeat?.charAngle || null}
          />
        )
      })}
      {/* Right side */}
      {rightChars.map((charInfo, i) => {
        const isActiveSpeaker = activeSide === 'right' &&
          charInfo.name?.toLowerCase() === currentBeat?.char?.toLowerCase()
        const effectiveExpr = (isAnyActive && !isActiveSpeaker) ? 'listening' : charInfo.expr
        return (
          <Portrait
            key={charInfo.name}
            char={charInfo.name}
            expr={effectiveExpr}
            side="right"
            sideIndex={i}
            charCount={rightChars.length}
            isActive={isActiveSpeaker}
            isAnyActive={isAnyActive}
            isListener={charInfo.isListener}
            angle={currentBeat?.charAngle || null}
          />
        )
      })}

      {/* ── Task Gate — pauses story, embeds real tasks inline ── */}
      {isTaskGate && (
        <TaskGate beat={currentBeat} onComplete={advance} />
      )}

      {/* ── Scene Gate Panel — overlays on story when a week gate is hit ── */}
      {lockedSceneId && (
        <SceneGatePanel segmentId={lockedSceneId} onContinue={handleGateContinue} />
      )}

      {/* ── Week Complete check-in — Vael speaks before next chapter plays ── */}
      <WeekCompleteCheckin
        isOpen={showWeekCheckin}
        onContinue={handleWeekCheckinDone}
        weekNumber={storage.getPlanProgress()?.completedWeeks || 0}
      />

      {/* ── Dialogue/Narration box ── */}
      {!showChoice && !isTaskGate && currentBeat.type !== 'choice' && (
        <DialogueBox beat={currentBeat} displayed={displayed} done={done} />
      )}

      {/* ── Empty box while choice panel is loading ── */}
      {!isTaskGate && currentBeat.type === 'choice' && !showChoice && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20,
          background: 'rgba(3,2,12,0.94)',
          borderTop: '1px solid rgba(155,122,38,0.45)',
          minHeight: 'clamp(22vh, 27vh, 30vh)',
        }} />
      )}

      {/* ── Choice panel ── */}
      {!isTaskGate && showChoice && currentBeat.type === 'choice' && (
        <ChoicePanel options={currentBeat.options} onSelect={handleChoiceSelect} />
      )}

      {/* ── Back button (stop propagation so it doesn't advance story) ── */}
      <div onClick={e => e.stopPropagation()}>
        <BackButton navigate={navigate} from={SCREENS.STORY} />
      </div>

      {/* ── Skip button — top right, subtle until hovered ── */}
      <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', top: 'clamp(1rem,2vh,1.6rem)', right: 'clamp(1rem,2vw,2.2rem)', zIndex: 100, display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
        <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.5rem,0.62vw,0.7rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(188,152,62,0.92)', pointerEvents: 'none' }}>
          {(STORY_ACTS.find(a => a.id === currentActId) || { subtitle: 'Act I' }).subtitle}
        </div>
        <button
          onClick={() => setShowSkipConfirm(true)}
          style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.55rem,0.65vw,0.72rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(188,152,62,0.92)', background: 'rgba(4,3,14,0.65)', border: '1px solid rgba(148,118,42,0.65)', borderRadius: '2px', padding: '0.42em 0.95em', cursor: 'pointer', transition: 'all 0.18s ease' }}
          onMouseEnter={e => { e.currentTarget.style.color='rgba(228,194,94,1)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.9)'; e.currentTarget.style.background='rgba(201,168,76,0.14)' }}
          onMouseLeave={e => { e.currentTarget.style.color='rgba(188,152,62,0.92)'; e.currentTarget.style.borderColor='rgba(148,118,42,0.65)'; e.currentTarget.style.background='rgba(4,3,14,0.65)' }}
        >
          Skip Scene
        </button>
      </div>

      {/* ── Skip confirmation overlay ── */}
      {showSkipConfirm && (
        <SkipConfirmOverlay
          onConfirm={handleSkipScene}
          onCancel={() => setShowSkipConfirm(false)}
        />
      )}

      {/* ── CSS ── */}
      <style>{`
        /* ── Fade in ── */
        @keyframes ssBgFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── STANDARD camera: Ken Burns zoom ── */
        @keyframes ssKenBurns {
          0%   { transform: scale(1.06) translate(0%,    0%);    }
          100% { transform: scale(1.0)  translate(-1.2%, -0.6%); }
        }
        @keyframes ssKenBurnsOut {
          0%   { transform: scale(1.0)  translate(-1.2%, -0.6%); }
          100% { transform: scale(1.06) translate(0%,    0%);    }
        }

        /* ── WIDE camera: horizontal pan ── */
        @keyframes ssWidePanLR {
          0%   { background-position: 0%   center; }
          100% { background-position: 100% center; }
        }
        @keyframes ssWidePanRL {
          0%   { background-position: 100% center; }
          100% { background-position: 0%   center; }
        }

        /* ── TALL camera: vertical pan ── */
        @keyframes ssTallPanTB {
          0%   { background-position: center 0%;   }
          100% { background-position: center 100%; }
        }
        @keyframes ssTallPanBT {
          0%   { background-position: center 100%; }
          100% { background-position: center 0%;   }
        }

        /* ── UI ── */
        @keyframes ssPulse {
          0%, 100% { opacity: 0.22; }
          50%      { opacity: 0.75; }
        }
        @keyframes ssCaret {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }

        /* ── Scene effects ── */
        @keyframes ssFogDrift {
          0%   { transform: translateX(-3%) scaleX(1.04); opacity: 0.55; }
          100% { transform: translateX(3%)  scaleX(1.0);  opacity: 0.75; }
        }
        @keyframes ssLampPulse {
          0%   { opacity: 0.7; }
          100% { opacity: 1.0; }
        }
        @keyframes ssEmberGlow {
          0%   { opacity: 0.6; }
          100% { opacity: 1.0; }
        }

        .ss-portrait img  { -webkit-user-drag: none; }
        .ss-dialogue-box *::-webkit-scrollbar { display: none; }

        @media (min-width: 900px) {
          .ss-portrait img { width: clamp(260px, 26vw, 480px) !important; }
        }
        @media (max-width: 420px) {
          .ss-portrait img { width: clamp(140px, 44vw, 220px) !important; }
          .ss-dialogue-box { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
        @media (max-height: 540px) {
          .ss-portrait { bottom: 32vh !important; }
        }
      `}</style>
    </div>
  )
}
