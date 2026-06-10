import React, { useState, useEffect, useRef, useCallback } from 'react'
import { PORTRAITS } from '../data/story.js'
import { SoundEngine } from '../lib/audio.js'

// ─── WeekCompleteCheckin ──────────────────────────────────────────────────────
// Inline overlay shown inside StoryScreen after a week gate clears.
// Vael appears and delivers a brief "week complete" reflection before the
// next chapter beat plays. No navigation — dismisses in place.
//
// Props:
//   isOpen     — boolean, controls visibility + animation
//   progress   — planProgress (for selecting the right message)
//   onContinue — called when the user dismisses (story resumes)
// ─────────────────────────────────────────────────────────────────────────────

// First appearance: Vael introduces himself briefly before the standard message.
// After that, he goes straight to the week reflection.
const VAEL_INTRO = "I am Vael. I observe the Archive's seekers — how they progress, where they slow, what they carry. I will appear at the close of each chapter. Not to judge. To take account."

const VAEL_MESSAGES = [
  "The week is done. Everything marked. What you completed does not vanish — it accumulates. That is the nature of the method. Return when you are ready. The next chapter holds.",
  "A chapter ends. The work you did is fixed now — permanent. Whatever remains carries forward. This is how the Archive measures a seeker: not by a single week, but by the direction of the whole.",
  "What was completed stands. What was missed is still ahead of you. The path does not disappear because you moved slowly through it.",
  "The chapter closes. Progress is not always visible from the inside. You cannot see the shape of what you are building while you are still building it.",
  "One more chapter behind you. The distance between where you started and where you are now — that distance is real, even if the destination still feels far.",
  "Week complete. The Archive records what was done. Not what was planned. What was done.",
]

const VAEL_MICRO = [
  "The study holds a particular quality of quiet after a week closes. Not silence — something in the walls, the light, the weight of what was just completed.",
  "A week ends the way most meaningful things do — without announcement. You simply realize it is behind you now.",
  "There is a kind of stillness that follows sustained effort. Not rest, exactly. Recognition.",
  "The light in the Archive does not change. But after a chapter closes, the room feels different. You will understand that better the longer you work here.",
]

const VAEL_INTRO_KEY = 'ardenmoor:vael_introduced'

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text, speed = 18) {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)
  const timerRef  = useRef(null)
  const cancelRef = useRef(false)  // closure-safe cancel flag (mirrors StoryScreen)
  const idxRef    = useRef(0)

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
    idxRef.current = 0
    setDisplayed(''); setDone(false)
    const t = text || ''
    if (!t) { setDone(true); return }

    const tick = () => {
      if (cancelRef.current) return
      idxRef.current++
      // Sound every 2nd non-space character — matches StoryScreen rate
      const ch = t[idxRef.current - 1]
      if (ch && ch !== ' ' && idxRef.current % 2 === 0) {
        try { SoundEngine.typeChar() } catch (_) {}
      }
      if (idxRef.current >= t.length) {
        setDisplayed(t); setDone(true)
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
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, done, complete }
}

// ── Vael portrait ─────────────────────────────────────────────────────────────
function VaelPortrait({ visible }) {
  const map = PORTRAITS['vael']
  const src = map?.neutral || null
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <div style={{
      position: 'absolute',
      bottom: 'clamp(24vh,28vh,32vh)',
      left: 'clamp(0.5rem,2vw,3.5rem)',
      display: 'flex', alignItems: 'flex-end',
      zIndex: 2, pointerEvents: 'none',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.7s ease',
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '-10%',
        width: '120%', height: '35%',
        background: 'radial-gradient(ellipse at 20% 100%, rgba(201,168,76,0.18) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }}/>
      <img
        src={src}
        alt="Vael"
        draggable={false}
        onError={() => setFailed(true)}
        style={{
          width: 'clamp(180px,26vw,380px)',
          height: 'auto', maxHeight: '68vh',
          objectFit: 'contain', objectPosition: 'bottom center',
          display: 'block', position: 'relative', zIndex: 2,
          WebkitUserDrag: 'none',
        }}
      />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function WeekCompleteCheckin({ isOpen, onContinue, weekNumber = 0 }) {
  const [mounted,         setMounted]         = useState(false)
  const [phase,           setPhase]           = useState('intro')  // 'intro' | 'vael' | 'micro'
  const [portraitVisible, setPortraitVisible] = useState(false)
  const [showIntro,       setShowIntro]       = useState(false)

  // Pick rotating messages based on week number
  const vaelText  = VAEL_MESSAGES[weekNumber % VAEL_MESSAGES.length]
  const microText = VAEL_MICRO[weekNumber % VAEL_MICRO.length]

  const { displayed: introDisplayed, done: introDone, complete: introComplete } = useTypewriter(
    phase === 'intro' ? VAEL_INTRO : '', 18
  )
  const { displayed: vaelDisplayed, done: vaelDone, complete: vaelComplete } = useTypewriter(
    phase === 'vael' ? vaelText : '', 18
  )
  const { displayed: microDisplayed, done: microDone, complete: microComplete } = useTypewriter(
    phase === 'micro' ? microText : '', 22
  )

  // Mount/unmount animation + decide whether to show intro
  useEffect(() => {
    if (isOpen) {
      const introduced = localStorage.getItem(VAEL_INTRO_KEY)
      setShowIntro(!introduced)
      setPhase(introduced ? 'vael' : 'intro')
      const t1 = setTimeout(() => setMounted(true),  60)
      const t2 = setTimeout(() => setPortraitVisible(true), 220)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      setMounted(false)
      setPortraitVisible(false)
    }
  }, [isOpen])

  const handleClick = () => {
    if (phase === 'intro') {
      if (!introDone) { introComplete(); return }
      localStorage.setItem(VAEL_INTRO_KEY, '1')
      setPhase('vael')
      return
    }
    if (phase === 'vael') {
      if (!vaelDone) { vaelComplete(); return }
      setPhase('micro')
      return
    }
    if (phase === 'micro') {
      if (!microDone) { microComplete(); return }
      onContinue?.()
    }
  }

  if (!isOpen) return null

  const currentDisplayed = phase === 'intro' ? introDisplayed : phase === 'vael' ? vaelDisplayed : microDisplayed
  const currentDone      = phase === 'intro' ? introDone      : phase === 'vael' ? vaelDone      : microDone
  const isMicro          = phase === 'micro'
  const speakerLabel     = phase === 'micro' ? null : 'Vael'

  return (
    <div
      onClick={(e) => { e.stopPropagation(); handleClick() }}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 150,
        background: 'rgba(2,1,10,0.82)',
        backdropFilter: 'blur(5px)',
        cursor: 'pointer',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Gold accent line at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.45), transparent)',
      }}/>

      {/* Week complete badge */}
      <div style={{
        position: 'absolute',
        top: 'clamp(1.4rem,2.8vh,2.5rem)',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '0.7rem',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
      }}>
        <div style={{ width: '2.5rem', height: '1px', background: 'rgba(201,168,76,0.42)' }}/>
        <div style={{
          fontFamily: '"Cinzel",serif',
          fontSize: 'clamp(0.58rem,0.68vw,0.78rem)',
          letterSpacing: '0.42em', textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.85)',
        }}>
          Week Complete
        </div>
        <div style={{ width: '2.5rem', height: '1px', background: 'rgba(201,168,76,0.42)' }}/>
      </div>

      {/* Vael portrait */}
      <VaelPortrait visible={portraitVisible} />

      {/* Text box — bottom, like story dialogue box */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        minHeight: 'clamp(22vh,27vh,32vh)',
        background: isMicro ? 'rgba(2,1,10,0.96)' : 'rgba(3,2,14,0.96)',
        borderTop: `1px solid ${isMicro ? 'rgba(155,122,38,0.3)' : 'rgba(155,122,38,0.45)'}`,
        padding: 'clamp(1.2rem,2.4vh,2rem) clamp(1.4rem,8vw,12rem)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        transition: 'background 0.3s ease',
      }}>
        {/* Speaker tag or narration label */}
        {speakerLabel ? (
          <div style={{
            fontFamily: '"Cinzel",serif',
            fontSize: 'clamp(0.72rem,0.82vw,0.92rem)',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.92)',
            marginBottom: 'clamp(0.5rem,0.9vh,0.8rem)',
          }}>
            {speakerLabel}
          </div>
        ) : (
          <div style={{
            fontFamily: '"Cinzel",serif',
            fontSize: 'clamp(0.62rem,0.7vw,0.78rem)',
            letterSpacing: '0.34em', textTransform: 'uppercase',
            color: 'rgba(155,135,82,0.7)',
            marginBottom: 'clamp(0.4rem,0.7vh,0.6rem)',
          }}>
            ✦
          </div>
        )}

        {/* Text */}
        <div style={{
          fontFamily: '"Lora",serif',
          fontStyle: isMicro ? 'italic' : 'normal',
          fontSize: 'clamp(0.92rem,1.05vw,1.18rem)',
          lineHeight: 1.75,
          color: isMicro ? 'rgba(195,175,128,0.88)' : 'rgba(228,215,175,0.96)',
          maxWidth: '72ch',
        }}>
          {currentDisplayed}
          {!currentDone && (
            <span style={{
              display: 'inline-block', width: '2px', height: '1.1em',
              background: 'rgba(201,168,76,0.9)',
              marginLeft: '1px', verticalAlign: 'text-bottom',
              animation: 'checkinBlink 0.7s ease-in-out infinite',
            }}/>
          )}
        </div>

        {/* Advance hint */}
        {currentDone && (
          <div style={{
            marginTop: 'clamp(0.8rem,1.4vh,1.2rem)',
            fontFamily: '"Cinzel",serif',
            fontSize: 'clamp(0.58rem,0.65vw,0.72rem)',
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(155,135,70,0.72)',
            animation: 'checkinPulse 2s ease-in-out infinite',
          }}>
            {phase === 'micro' ? 'Click to continue' : 'Click to advance'}
          </div>
        )}
      </div>

      {/* Keyframe animations via style tag */}
      <style>{`
        @keyframes checkinBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes checkinPulse {
          0%, 100% { opacity: 0.72; }
          50%       { opacity: 0.38; }
        }
      `}</style>
    </div>
  )
}
