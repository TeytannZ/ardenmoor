import React, { useState, useEffect, useRef, useCallback } from 'react'
import { storage } from '../lib/storage.js'
import { generatePlan, parsePlan } from '../lib/ai.js'
import { SoundEngine } from '../lib/audio.js'
import { SCREENS } from '../App.jsx'
import { ACT1_EPOCHS } from '../data/epochs.js'

// ─── Constants ────────────────────────────────────────────────────────────────
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI']

const TASK_TYPE = {
  learn:    { label: 'Learn',    color: 'rgba(130,175,230,0.9)', dot: 'rgba(80,130,200,0.85)'  },
  practice: { label: 'Practice', color: 'rgba(210,168,80,0.9)',  dot: 'rgba(185,138,45,0.85)'  },
  project:  { label: 'Project',  color: 'rgba(120,200,130,0.9)', dot: 'rgba(70,165,85,0.85)'   },
  review:   { label: 'Review',   color: 'rgba(188,145,215,0.9)', dot: 'rgba(148,100,190,0.85)' },
}

const GEN_MESSAGES = [
  'The Archive is weaving the threads of your path…',
  'Measuring the weight of your goal against the arc of four months…',
  'Laying the foundation stones of the seven arcs…',
  'Naming the resources that will serve you best…',
  'Inscribing the milestones that will mark your progress…',
  'Setting the final seal on Phase I…',
]

// Story scene metadata — ordered list for the journal, keyed object for the unlock banner
const SEGMENT_META = [
  { id: 'a1_seg0',  title: 'Before It Burns',         summary: 'You arrive at the Archive. Five weeks of learning, and then the night everything changes.' },
  { id: 'a1_seg1',  title: 'The Other Side',           summary: 'Ryn was waiting in the passage. The Archive burns behind you. The road ahead begins.' },
  { id: 'a1_seg2',  title: 'The Road Opens',           summary: 'Through the city at dawn. The gate. The road east. Something follows you out of the city.' },
  { id: 'a1_seg3',  title: 'The Voice on the Road',    summary: 'The voice in the trees belongs to Dorath. And Maren already knows her.' },
  { id: 'a1_seg4',  title: 'Dorath',                   summary: "The symbol's origin. A contact connected to both the Archive and this place. And then the safe house is safe no longer." },
  { id: 'a1_seg5',  title: 'What the Cipher Says',     summary: 'Maren opens the cipher and the fourteen fragments for the first time. And then something is wrong with the fourteenth.' },
  { id: 'a1_seg6',  title: 'The First Practice',       summary: 'The method applied for the first time. What changes when you hold something this way. And then Brek.' },
  { id: 'a1_seg7',  title: "Brek's Answer",            summary: 'Brek arrives with the answer he worked out on the road. The escape was allowed. And Maren already knows.' },
  { id: 'a1_seg8',  title: 'The Deep Records',         summary: "Maren knew. What Serath found in the deep records. And what he did with it — and why. Then: he is three days ahead." },
  { id: 'a1_seg9',  title: 'The Trail',                summary: 'Following the markers Serath left. The method changing something. A building at the end of the trail — and a light goes out.' },
  { id: 'a1_seg10', title: 'Voss',                     summary: "The building. What Voss means in concrete terms. And a fragment on the table that survived the fire." },
  { id: 'a1_seg11', title: 'What You Carry',           summary: 'The method deepening. A practice that changes how you hear everything. And then: a book in handwriting you know.' },
  { id: 'a1_seg12', title: 'The Fourteenth Fragment',  summary: "Sira's book. She knew what was coming. The fourteenth fragment was hers. And the book ends with a location." },
  { id: 'a1_seg13', title: 'Found',                    summary: 'The settlement exists. Sira is there — alive and working. And when the door opens, someone else stands beside her.' },
  { id: 'a1_seg14', title: 'The Choice She Made',      summary: "Serath's account. Why he disappeared. What he did to protect the escape. Evidence of something completed decades ago." },
  { id: 'a1_seg15', title: 'The Method Complete',      summary: 'The walls reveal what the practice is from the inside. You attempt the final stage. It works. And then Maren says what that means.' },
  { id: 'a1_seg16', title: 'What the Archive Was For', summary: "The Archive was a machine. The paper was not the point. And on Dorath's map: a building that should not exist." },
]

const SCENE_META = Object.fromEntries(SEGMENT_META.map(s => [s.id, { title: s.title, summary: s.summary }]))

// Character display names and relationship tier thresholds
const CHAR_NAMES = {
  maren: 'Maren', ryn: 'Ryn', serath: 'Serath',
  brek:  'Brek',  dorath: 'Dorath', sira: 'Sira', tal: 'Tal',
}

const REL_TIERS = [
  { min: 75, label: 'Ally',    color: 'rgba(218,182,76,0.92)',  border: 'rgba(218,182,76,0.38)'  },
  { min: 45, label: 'Trusted', color: 'rgba(188,155,78,0.86)',  border: 'rgba(185,150,70,0.32)'  },
  { min: 20, label: 'Known',   color: 'rgba(158,132,88,0.78)',  border: 'rgba(148,122,72,0.26)'  },
  { min:  5, label: 'Met',     color: 'rgba(132,110,80,0.68)',  border: 'rgba(118,96,62,0.2)'    },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function playClick() {
  try {
    const ctx = SoundEngine._getCtx()
    const osc = ctx.createOscillator(), g = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.25)
    g.gain.setValueAtTime(0.2, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.connect(g); g.connect(ctx.destination)
    osc.start(); osc.stop(ctx.currentTime + 0.32)
  } catch (_) {}
}

function playCheck() {
  try {
    const ctx = SoundEngine._getCtx()
    // Two quick tones — satisfying check sound
    const t = ctx.currentTime
    ;[{ f: 520, t: 0, dur: 0.12 }, { f: 780, t: 0.07, dur: 0.1 }].forEach(({ f, t: dt, dur }) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = f
      g.gain.setValueAtTime(0, t + dt)
      g.gain.linearRampToValueAtTime(0.15, t + dt + 0.015)
      g.gain.exponentialRampToValueAtTime(0.001, t + dt + dur)
      o.connect(g); g.connect(ctx.destination)
      o.start(t + dt); o.stop(t + dt + dur + 0.02)
    })
  } catch (_) {}
}

function playUnlock() {
  try {
    const ctx = SoundEngine._getCtx()
    const t = ctx.currentTime
    ;[300, 450, 600, 800].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = f
      const dt = i * 0.11
      g.gain.setValueAtTime(0, t + dt)
      g.gain.linearRampToValueAtTime(0.18, t + dt + 0.02)
      g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.5)
      o.connect(g); g.connect(ctx.destination)
      o.start(t + dt); o.stop(t + dt + 0.55)
    })
  } catch (_) {}
}

function playSpark() {
  try {
    const ctx = SoundEngine._getCtx()
    const t = ctx.currentTime
    ;[480, 640].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = f
      const dt = i * 0.08
      g.gain.setValueAtTime(0, t + dt)
      g.gain.linearRampToValueAtTime(0.14, t + dt + 0.02)
      g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.38)
      o.connect(g); g.connect(ctx.destination)
      o.start(t + dt); o.stop(t + dt + 0.42)
    })
  } catch (_) {}
}

function playEpochUnlock() {
  try {
    const ctx = SoundEngine._getCtx()
    const t = ctx.currentTime
    ;[200, 280, 420, 560, 700, 840].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = i < 3 ? 'sine' : 'triangle'
      o.frequency.value = f
      const dt = i * 0.09
      g.gain.setValueAtTime(0, t + dt)
      g.gain.linearRampToValueAtTime(0.15, t + dt + 0.025)
      g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.7)
      o.connect(g); g.connect(ctx.destination)
      o.start(t + dt); o.stop(t + dt + 0.78)
    })
  } catch (_) {}
}

function todayStr() { return new Date().toISOString().slice(0, 10) }

// ─── Corner accents ───────────────────────────────────────────────────────────
function CornerAccents({ color = 'rgba(201,168,76,0.45)', size = 9 }) {
  return ['tl','tr','bl','br'].map(pos => (
    <div key={pos} style={{
      position: 'absolute',
      width: `${size}px`, height: `${size}px`,
      top:    pos.startsWith('t') ? '-1px' : 'auto',
      bottom: pos.startsWith('b') ? '-1px' : 'auto',
      left:   pos.endsWith('l')   ? '-1px' : 'auto',
      right:  pos.endsWith('r')   ? '-1px' : 'auto',
      borderTop:    pos.startsWith('t') ? `1.5px solid ${color}` : 'none',
      borderBottom: pos.startsWith('b') ? `1.5px solid ${color}` : 'none',
      borderLeft:   pos.endsWith('l')   ? `1.5px solid ${color}` : 'none',
      borderRight:  pos.endsWith('r')   ? `1.5px solid ${color}` : 'none',
      pointerEvents: 'none', zIndex: 1,
    }} />
  ))
}

// ─── Task checkbox row ────────────────────────────────────────────────────────
function TaskCheck({ task, taskKey, done, onToggle, index }) {
  const [hov, setHov] = useState(false)
  const t   = task.type?.toLowerCase() || 'learn'
  const cfg = TASK_TYPE[t] || TASK_TYPE.learn

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onToggle(taskKey)}
      style={{
        display:     'flex',
        alignItems:  'flex-start',
        gap:         'clamp(0.7rem,1vw,0.9rem)',
        padding:     'clamp(0.65rem,0.9vw,0.85rem) clamp(0.8rem,1.2vw,1.1rem)',
        background:  done
          ? 'rgba(201,168,76,0.06)'
          : hov ? 'rgba(201,168,76,0.04)' : 'rgba(10,8,20,0.4)',
        border:      `1px solid ${done ? 'rgba(201,168,76,0.22)' : hov ? 'rgba(201,168,76,0.14)' : 'rgba(201,168,76,0.07)'}`,
        borderRadius:'2px',
        cursor:      'pointer',
        transition:  'all 0.16s ease',
        animation:   `pvFadeUp 0.3s ease ${index * 0.06}s both`,
        userSelect:  'none',
      }}
    >
      {/* Checkbox */}
      <div style={{
        flexShrink: 0,
        width:  'clamp(18px,1.6vw,22px)',
        height: 'clamp(18px,1.6vw,22px)',
        marginTop: '1px',
        border:  `1.5px solid ${done ? 'rgba(201,168,76,0.65)' : 'rgba(155,130,65,0.35)'}`,
        borderRadius: '2px',
        background:   done ? 'rgba(201,168,76,0.15)' : 'transparent',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        transition:   'all 0.15s ease',
        boxShadow:    done ? '0 0 8px rgba(201,168,76,0.2)' : 'none',
      }}>
        {done && (
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 5.5l2.5 2.5L9 3"
              stroke="rgba(218,182,76,0.95)" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display:     'flex',
          alignItems:  'center',
          gap:         '0.5rem',
          marginBottom: task.description ? '0.25rem' : 0,
        }}>
          {/* Type dot */}
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
          <span style={{
            fontFamily:     '"Lora", serif',
            fontSize:       'clamp(0.82rem,0.95vw,1rem)',
            color:          done ? 'rgba(185,165,110,0.65)' : 'rgba(225,210,175,0.95)',
            textDecoration: done ? 'line-through' : 'none',
            lineHeight:     1.4,
            transition:     'color 0.15s ease',
          }}>
            {task.title}
          </span>
        </div>
        {task.description && !done && (
          <p style={{
            fontFamily: '"Lora", serif',
            fontStyle:  'italic',
            fontSize:   'clamp(0.72rem,0.82vw,0.86rem)',
            color:      'rgba(172,155,118,0.75)',
            lineHeight: 1.55,
            margin:     0,
          }}>
            {task.description}
          </p>
        )}
        {task.resource && !done && (
          <div style={{
            marginTop:    '0.25rem',
            fontFamily:   '"Cinzel", serif',
            fontSize:     'clamp(0.5rem,0.56vw,0.6rem)',
            letterSpacing:'0.1em',
            color:        'rgba(145,125,75,0.7)',
          }}>
            ↗ {task.resource}
          </div>
        )}
      </div>

      {/* Inscription reward badge */}
      <div style={{
        flexShrink: 0,
        fontFamily: '"Cinzel", serif',
        fontSize:   'clamp(0.46rem,0.52vw,0.56rem)',
        letterSpacing: '0.1em',
        color:      done ? 'rgba(201,168,76,0.5)' : 'rgba(155,130,65,0.45)',
        whiteSpace: 'nowrap',
        paddingTop: '2px',
      }}>
        +5 ✦
      </div>
    </div>
  )
}

// ─── Story unlock banner ──────────────────────────────────────────────────────
function SceneUnlockBanner({ sceneId, onDismiss, onGoToStory }) {
  const [visible, setVisible] = useState(false)
  const meta = SCENE_META[sceneId] || { title: 'A new chapter', summary: null }

  useEffect(() => {
    playUnlock()
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position:   'relative',
      background: 'linear-gradient(135deg, rgba(20,15,5,0.98) 0%, rgba(28,20,5,0.98) 100%)',
      border:     '1px solid rgba(218,182,76,0.5)',
      borderLeft: '3px solid rgba(218,182,76,0.9)',
      borderRadius: '2px',
      padding:    'clamp(1rem,1.6vw,1.5rem) clamp(1.2rem,1.8vw,1.8rem)',
      boxShadow:  '0 0 40px rgba(201,168,76,0.12), 0 8px 32px rgba(0,0,0,0.6)',
      marginBottom: 'clamp(1.2rem,2vh,1.8rem)',
      opacity:    visible ? 1 : 0,
      transform:  visible ? 'translateY(0)' : 'translateY(-10px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      <CornerAccents color="rgba(218,182,76,0.55)" size={10} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Gold diamond accent */}
        <div style={{
          width: '28px', height: '28px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.35)',
          borderRadius: '2px',
          animation: 'pvGlowPulse 2s ease-in-out infinite',
        }}>
          <div style={{
            width: '8px', height: '8px',
            background: 'rgba(218,182,76,0.9)',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 12px rgba(218,182,76,0.8)',
          }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily:   '"Cinzel", serif',
            fontSize:     'clamp(0.5rem,0.6vw,0.65rem)',
            letterSpacing:'0.32em',
            textTransform:'uppercase',
            color:        'rgba(218,182,76,0.8)',
            marginBottom: '0.3rem',
          }}>
            A New Chapter Unlocked
          </div>
          <div style={{
            fontFamily:  '"Cinzel Decorative", serif',
            fontSize:    'clamp(0.88rem,1.2vw,1.35rem)',
            color:       'transparent',
            backgroundImage: 'linear-gradient(180deg, rgba(255,245,200,0.97) 0%, rgba(210,172,82,0.92) 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            marginBottom: '0.3rem',
            lineHeight:  1.2,
          }}>
            {meta.title}
          </div>
          <p style={{
            fontFamily:  '"Lora", serif',
            fontStyle:   'italic',
            fontSize:    'clamp(0.75rem,0.86vw,0.9rem)',
            color:       'rgba(185,165,120,0.78)',
            margin:      '0 0 0.8rem 0',
            lineHeight:  1.6,
          }}>
            {meta.summary || 'The Archive has opened a new page of the chronicle. Enter the story to continue.'}
          </p>
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <button
              onClick={onGoToStory}
              style={{
                fontFamily:   '"Cinzel", serif',
                fontSize:     'clamp(0.52rem,0.6vw,0.66rem)',
                letterSpacing:'0.2em',
                textTransform:'uppercase',
                color:        'rgba(232,210,140,0.97)',
                background:   'rgba(201,168,76,0.12)',
                border:       '1px solid rgba(201,168,76,0.55)',
                borderRadius: '2px',
                padding:      '0.55em 1.3em',
                cursor:       'pointer',
                transition:   'all 0.16s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.2)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.8)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(201,168,76,0.12)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.55)' }}
            >
              Enter the Story
            </button>
            <button
              onClick={onDismiss}
              style={{
                fontFamily:   '"Cinzel", serif',
                fontSize:     'clamp(0.5rem,0.56vw,0.6rem)',
                letterSpacing:'0.18em',
                textTransform:'uppercase',
                color:        'rgba(145,125,80,0.65)',
                background:   'transparent',
                border:       '1px solid rgba(100,80,35,0.28)',
                borderRadius: '2px',
                padding:      '0.55em 1em',
                cursor:       'pointer',
                transition:   'all 0.16s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color='rgba(185,160,100,0.85)'; e.currentTarget.style.borderColor='rgba(150,120,55,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(145,125,80,0.65)'; e.currentTarget.style.borderColor='rgba(100,80,35,0.28)' }}
            >
              Continue Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Spark banner (Priority 2) ────────────────────────────────────────────────
// Shown after a task is completed; prompts the player to read a spark beat.
function SparkBanner({ weekKey, sparkIdx, onPlay, onDismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    playSpark()
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position:   'relative',
      background: 'linear-gradient(135deg, rgba(10,12,22,0.98) 0%, rgba(14,16,28,0.98) 100%)',
      border:     '1px solid rgba(100,140,220,0.45)',
      borderLeft: '3px solid rgba(100,140,220,0.85)',
      borderRadius: '2px',
      padding:    'clamp(0.9rem,1.4vw,1.3rem) clamp(1.2rem,1.8vw,1.8rem)',
      boxShadow:  '0 0 32px rgba(80,120,210,0.1), 0 6px 24px rgba(0,0,0,0.6)',
      marginBottom: 'clamp(1.2rem,2vh,1.8rem)',
      opacity:    visible ? 1 : 0,
      transform:  visible ? 'translateY(0)' : 'translateY(-8px)',
      transition: 'opacity 0.45s ease, transform 0.45s ease',
    }}>
      <CornerAccents color="rgba(100,140,220,0.45)" size={9} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Blue spark accent */}
        <div style={{
          width: '28px', height: '28px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(80,120,210,0.12)',
          border: '1px solid rgba(100,140,220,0.35)',
          borderRadius: '2px',
          animation: 'pvGlowPulse 2.4s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>✧</span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily:   '"Cinzel", serif',
            fontSize:     'clamp(0.5rem,0.6vw,0.65rem)',
            letterSpacing:'0.32em',
            textTransform:'uppercase',
            color:        'rgba(140,175,240,0.8)',
            marginBottom: '0.25rem',
          }}>
            A Spark Has Kindled
          </div>
          <div style={{
            fontFamily:  '"Lora", serif',
            fontStyle:   'italic',
            fontSize:    'clamp(0.78rem,0.9vw,0.95rem)',
            color:       'rgba(195,210,240,0.88)',
            marginBottom: '0.65rem',
            lineHeight:  1.5,
          }}>
            Something stirs in the chronicle. A brief scene waits at the edge of your week.
          </div>
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <button
              onClick={onPlay}
              style={{
                fontFamily:   '"Cinzel", serif',
                fontSize:     'clamp(0.52rem,0.6vw,0.66rem)',
                letterSpacing:'0.2em',
                textTransform:'uppercase',
                color:        'rgba(190,215,255,0.97)',
                background:   'rgba(80,120,210,0.14)',
                border:       '1px solid rgba(100,140,220,0.52)',
                borderRadius: '2px',
                padding:      '0.52em 1.2em',
                cursor:       'pointer',
                transition:   'all 0.16s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(80,120,210,0.24)'; e.currentTarget.style.borderColor='rgba(130,170,240,0.75)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(80,120,210,0.14)'; e.currentTarget.style.borderColor='rgba(100,140,220,0.52)' }}
            >
              Read Now
            </button>
            <button
              onClick={onDismiss}
              style={{
                fontFamily:   '"Cinzel", serif',
                fontSize:     'clamp(0.5rem,0.56vw,0.6rem)',
                letterSpacing:'0.18em',
                textTransform:'uppercase',
                color:        'rgba(100,120,165,0.65)',
                background:   'transparent',
                border:       '1px solid rgba(70,90,135,0.28)',
                borderRadius: '2px',
                padding:      '0.52em 1em',
                cursor:       'pointer',
                transition:   'all 0.16s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color='rgba(150,175,220,0.85)'; e.currentTarget.style.borderColor='rgba(100,130,190,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(100,120,165,0.65)'; e.currentTarget.style.borderColor='rgba(70,90,135,0.28)' }}
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Epoch banner (Priority 2) ────────────────────────────────────────────────
// Shown after an arc is completed; prompts the player to read the epoch beat.
function EpochBanner({ arcIdx, arcTitle, onPlay, onDismiss }) {
  const [visible, setVisible] = useState(false)
  // arcTitle comes from the live plan — only fall back to generic names if missing
  const FALLBACK_NAMES = [
    'The First Inscription', 'The Smallest Seals', 'The Middle Record',
    'The Deeper Inscriptions', 'The Closing Pages',
  ]
  const arcName = arcTitle || FALLBACK_NAMES[arcIdx] || `Arc ${arcIdx + 1}`

  useEffect(() => {
    playEpochUnlock()
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position:   'relative',
      background: 'linear-gradient(135deg, rgba(22,10,5,0.99) 0%, rgba(30,14,4,0.99) 100%)',
      border:     '1px solid rgba(220,150,60,0.55)',
      borderLeft: '3px solid rgba(220,150,60,0.95)',
      borderRadius: '2px',
      padding:    'clamp(1rem,1.6vw,1.5rem) clamp(1.2rem,1.8vw,1.8rem)',
      boxShadow:  '0 0 50px rgba(180,110,30,0.14), 0 8px 32px rgba(0,0,0,0.65)',
      marginBottom: 'clamp(1.2rem,2vh,1.8rem)',
      opacity:    visible ? 1 : 0,
      transform:  visible ? 'translateY(0)' : 'translateY(-10px)',
      transition: 'opacity 0.55s ease, transform 0.55s ease',
    }}>
      <CornerAccents color="rgba(220,150,60,0.55)" size={11} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Amber flame accent */}
        <div style={{
          width: '32px', height: '32px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(200,120,30,0.14)',
          border: '1px solid rgba(220,150,60,0.42)',
          borderRadius: '2px',
          animation: 'pvGlowPulse 1.8s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>◈</span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily:   '"Cinzel", serif',
            fontSize:     'clamp(0.5rem,0.6vw,0.65rem)',
            letterSpacing:'0.32em',
            textTransform:'uppercase',
            color:        'rgba(220,165,80,0.85)',
            marginBottom: '0.25rem',
          }}>
            Arc Complete — Chronicle Awaits
          </div>
          <div style={{
            fontFamily:  '"Cinzel Decorative", serif',
            fontSize:    'clamp(0.85rem,1.1vw,1.25rem)',
            color:       'transparent',
            backgroundImage: 'linear-gradient(180deg, rgba(255,230,170,0.97) 0%, rgba(210,145,60,0.9) 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            marginBottom: '0.35rem',
            lineHeight:  1.2,
          }}>
            {arcName}
          </div>
          <p style={{
            fontFamily:  '"Lora", serif',
            fontStyle:   'italic',
            fontSize:    'clamp(0.75rem,0.86vw,0.9rem)',
            color:       'rgba(200,165,100,0.82)',
            margin:      '0 0 0.8rem 0',
            lineHeight:  1.6,
          }}>
            The arc is sealed. The chronicle has recorded what was spent to reach this threshold. Enter now to see what it cost.
          </p>
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <button
              onClick={onPlay}
              style={{
                fontFamily:   '"Cinzel", serif',
                fontSize:     'clamp(0.52rem,0.6vw,0.66rem)',
                letterSpacing:'0.2em',
                textTransform:'uppercase',
                color:        'rgba(245,215,145,0.97)',
                background:   'rgba(200,120,30,0.14)',
                border:       '1px solid rgba(220,150,60,0.58)',
                borderRadius: '2px',
                padding:      '0.55em 1.3em',
                cursor:       'pointer',
                transition:   'all 0.16s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(200,120,30,0.25)'; e.currentTarget.style.borderColor='rgba(240,170,80,0.8)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(200,120,30,0.14)'; e.currentTarget.style.borderColor='rgba(220,150,60,0.58)' }}
            >
              Read the Chronicle
            </button>
            <button
              onClick={onDismiss}
              style={{
                fontFamily:   '"Cinzel", serif',
                fontSize:     'clamp(0.5rem,0.56vw,0.6rem)',
                letterSpacing:'0.18em',
                textTransform:'uppercase',
                color:        'rgba(155,120,60,0.65)',
                background:   'transparent',
                border:       '1px solid rgba(120,85,30,0.28)',
                borderRadius: '2px',
                padding:      '0.55em 1em',
                cursor:       'pointer',
                transition:   'all 0.16s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color='rgba(200,160,90,0.85)'; e.currentTarget.style.borderColor='rgba(170,125,50,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(155,120,60,0.65)'; e.currentTarget.style.borderColor='rgba(120,85,30,0.28)' }}
            >
              Not Yet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Seeker status bar ────────────────────────────────────────────────────────
function SeekerStatus({ progress, playerName, phaseNum, arcIdx, weekIdx, totalArcs }) {
  const streak        = progress.streak || 0
  const inscriptions  = progress.inscriptions || 0
  const coins         = progress.coins || 0
  const arcsCompleted = progress.completedArcIdxs?.length || 0
  const phasePct      = Math.round((arcsCompleted / (totalArcs || 7)) * 100)
  // Priority 5: inventory
  const inventory     = (progress.inventory || []).filter(i => (i.qty || 0) > 0)
  // Relationships — only characters with score >= 5
  const relChars      = Object.entries(progress.relationships || {})
    .filter(([, v]) => v >= 5)
    .sort(([, a], [, b]) => b - a)

  return (
    <div style={{
      display:      'flex',
      flexWrap:     'wrap',
      alignItems:   'center',
      gap:          '0 clamp(1rem,2.2vw,2.2rem)',
      padding:      'clamp(0.65rem,0.9vw,0.8rem) clamp(1rem,1.4vw,1.4rem)',
      background:   'rgba(8,6,18,0.8)',
      border:       '1px solid rgba(201,168,76,0.1)',
      borderRadius: '2px',
      marginBottom: 'clamp(1.2rem,2vh,1.8rem)',
      backdropFilter: 'blur(4px)',
      animation:    'pvFadeUp 0.4s ease 0.1s both',
    }}>
      {/* Seeker name */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(130,108,55,0.65)' }}>Seeker</span>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.62rem,0.72vw,0.78rem)', letterSpacing: '0.12em', color: 'rgba(210,185,130,0.9)' }}>{playerName}</span>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '1.2em', background: 'rgba(155,130,60,0.2)', flexShrink: 0 }} />

      {/* Streak */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <span style={{ fontSize: 'clamp(0.78rem,0.9vw,1rem)', lineHeight: 1 }}>
          {streak >= 7 ? '🔥' : streak >= 3 ? '✦' : '○'}
        </span>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.72rem,0.82vw,0.88rem)', letterSpacing: '0.08em', color: streak >= 3 ? 'rgba(232,160,60,0.92)' : 'rgba(165,145,95,0.75)' }}>
          {streak}
        </span>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(148,122,62,0.75)' }}>
          day streak
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '1.2em', background: 'rgba(155,130,60,0.2)', flexShrink: 0 }} />

      {/* Inscriptions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.82rem,0.94vw,1rem)', letterSpacing: '0', color: 'rgba(218,182,76,0.85)', lineHeight: 1 }}>✦</span>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.72rem,0.82vw,0.88rem)', letterSpacing: '0.08em', color: 'rgba(218,182,76,0.88)' }}>{inscriptions}</span>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(148,122,62,0.75)' }}>inscriptions</span>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '1.2em', background: 'rgba(155,130,60,0.2)', flexShrink: 0 }} />

      {/* Coins */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.82rem,0.94vw,1rem)', letterSpacing: '0', color: 'rgba(100,210,140,0.85)', lineHeight: 1 }}>◈</span>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.72rem,0.82vw,0.88rem)', letterSpacing: '0.08em', color: 'rgba(100,210,140,0.9)' }}>{coins}</span>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(80,168,108,0.75)' }}>story coins</span>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '1.2em', background: 'rgba(155,130,60,0.2)', flexShrink: 0 }} />

      {/* Phase progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(130,108,55,0.65)' }}>
          Phase {phaseNum} Progress
        </span>
        {/* Mini arc progress dots */}
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          {Array.from({ length: totalArcs || 7 }).map((_, i) => (
            <div key={i} style={{
              width:        i === arcIdx ? '14px' : '6px',
              height:       '3px',
              borderRadius: '1px',
              background:   (progress.completedArcIdxs || []).includes(i)
                ? 'rgba(201,168,76,0.85)'
                : i === arcIdx
                ? 'rgba(201,168,76,0.45)'
                : 'rgba(100,85,45,0.25)',
              transition:   'all 0.3s ease',
            }} />
          ))}
        </div>
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', color: 'rgba(155,130,65,0.6)' }}>
          {phasePct}%
        </span>
      </div>

      {/* ── Priority 5: Inventory — only shown when player has items ──────── */}
      {inventory.length > 0 && (
        <>
          <div style={{ width: '100%', height: '1px', background: 'rgba(155,130,60,0.12)', margin: '0.2rem 0 0' }} />
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(148,122,62,0.75)' }}>
              Carried
            </span>
            {inventory.map(item => (
              <span key={item.id} style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '0.28rem',
                fontFamily:   '"Lora", serif',
                fontSize:     'clamp(0.65rem,0.74vw,0.8rem)',
                color:        'rgba(200,185,145,0.85)',
                background:   'rgba(201,168,76,0.06)',
                border:       '1px solid rgba(201,168,76,0.14)',
                borderRadius: '2px',
                padding:      '0.12em 0.55em',
              }}>
                {item.qty > 1 && (
                  <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7em', color: 'rgba(201,168,76,0.65)' }}>{item.qty}×</span>
                )}
                {item.name}
              </span>
            ))}
          </div>
        </>
      )}

      {/* ── Relationships — only shown when player has bonded with characters ── */}
      {relChars.length > 0 && (
        <>
          <div style={{ width: '100%', height: '1px', background: 'rgba(155,130,60,0.12)', margin: '0.2rem 0 0' }} />
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(148,122,62,0.75)' }}>
              Relations
            </span>
            {relChars.map(([key, score]) => {
              const name = CHAR_NAMES[key] || (key.charAt(0).toUpperCase() + key.slice(1))
              const tier = REL_TIERS.find(t => score >= t.min)
              if (!tier) return null
              return (
                <span key={key} style={{
                  display:       'inline-flex',
                  alignItems:    'center',
                  gap:           '0.28rem',
                  fontFamily:    '"Cinzel", serif',
                  fontSize:      'clamp(0.5rem,0.58vw,0.63rem)',
                  color:         tier.color,
                  background:    'rgba(0,0,0,0.18)',
                  border:        `1px solid ${tier.border}`,
                  borderRadius:  '2px',
                  padding:       '0.15em 0.52em',
                  letterSpacing: '0.06em',
                }}>
                  {name}
                  <span style={{ color: 'rgba(100,80,50,0.45)', fontSize: '0.75em' }}>·</span>
                  <span style={{ fontSize: '0.78em', letterSpacing: '0.12em', opacity: 0.82 }}>{tier.label}</span>
                </span>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Current arc + week focus card ───────────────────────────────────────────
function DailyFocusCard({ arc, arcIdx, weekData, weekIdx, totalWeeks, progress, plan, onTaskToggle, onAdvanceWeek }) {
  const allTasksDone = weekData?.tasks?.every((_, ti) =>
    progress.tasksDone[`a${arcIdx}_w${weekIdx}_t${ti}`]
  ) ?? false
  const [weekHov, setWeekHov] = useState(false)
  const arcProgress = weekData ? `Week ${weekIdx + 1} of ${totalWeeks}` : ''
  const daysIntoStreak = progress.streak || 0

  // Progress bar: tasks done this week total vs total
  const allWeekTaskCount = arc?.weeklyPlan?.reduce((sum, w) => sum + (w.tasks?.length || 0), 0) || 0
  const doneWeekCount = arc?.weeklyPlan?.reduce((sum, w, wi) =>
    sum + (w.tasks?.filter((_, ti) => progress.tasksDone[`a${arcIdx}_w${wi}_t${ti}`]).length || 0), 0
  ) || 0
  const arcPct = allWeekTaskCount > 0 ? Math.round((doneWeekCount / allWeekTaskCount) * 100) : 0

  return (
    <div style={{
      position:   'relative',
      background: 'linear-gradient(135deg, rgba(14,10,22,0.97) 0%, rgba(18,13,28,0.97) 100%)',
      border:     '1px solid rgba(201,168,76,0.22)',
      borderRadius: '2px',
      overflow:   'hidden',
      marginBottom: 'clamp(1.2rem,2vh,1.8rem)',
      boxShadow:  '0 8px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(201,168,76,0.012)',
      animation:  'pvFadeUp 0.5s ease 0.15s both',
    }}>
      <CornerAccents color="rgba(201,168,76,0.4)" size={10} />

      {/* Arc progress bar — thin gold line at top */}
      <div style={{ height: '2px', background: 'rgba(201,168,76,0.06)', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width:    `${arcPct}%`,
          background: 'linear-gradient(to right, rgba(201,168,76,0.7), rgba(218,182,76,0.4))',
          transition: 'width 0.6s ease',
          boxShadow:  '0 0 8px rgba(201,168,76,0.4)',
        }} />
      </div>

      <div style={{ padding: 'clamp(1.2rem,1.8vw,2rem) clamp(1.2rem,1.8vw,1.8rem)' }}>
        {/* Arc header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'clamp(0.8rem,1.2vw,1.1rem)', gap: '1rem' }}>
          <div>
            {/* Arc badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <div style={{
                width: 'clamp(26px,2.8vw,32px)', height: 'clamp(26px,2.8vw,32px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: '2px',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(0.58rem,0.7vw,0.78rem)', color: 'rgba(218,182,76,0.9)' }}>
                  {ROMAN[arcIdx] || arcIdx + 1}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(155,130,65,0.65)' }}>
                  Current Arc · {arcProgress}
                </div>
                <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.75rem,0.95vw,1.05rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(228,205,148,0.95)', marginTop: '0.1rem' }}>
                  {arc?.title || `Arc ${arcIdx + 1}`}
                </div>
              </div>
            </div>
            {/* Story theme */}
            {arc?.storyTheme && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: '"Lora", serif', fontStyle: 'italic',
                fontSize: 'clamp(0.72rem,0.82vw,0.88rem)',
                color: 'rgba(165,145,100,0.72)',
              }}>
                <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.7em' }}>✦</span>
                {arc.storyTheme}
              </div>
            )}
          </div>
          {/* Arc % */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(1rem,1.4vw,1.6rem)', color: 'rgba(201,168,76,0.82)', letterSpacing: '0', lineHeight: 1 }}>{arcPct}</div>
            <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.4rem,0.46vw,0.5rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(148,122,62,0.68)' }}>% done</div>
          </div>
        </div>

        {/* Week focus divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)', marginBottom: 'clamp(0.8rem,1.2vw,1.1rem)' }} />

        {/* Week header */}
        {weekData && (
          <div style={{ marginBottom: 'clamp(0.6rem,0.9vw,0.8rem)' }}>
            <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.5rem,0.58vw,0.62rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(165,140,72,0.76)', marginBottom: '0.2rem' }}>
              Week {weekData.week} Focus
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem' }}>
              <span style={{ fontFamily: '"Lora", serif', fontSize: 'clamp(0.82rem,0.96vw,1.02rem)', color: 'rgba(215,195,148,0.9)', lineHeight: 1.4 }}>
                {weekData.theme}
              </span>
              {weekData.dailyCommitment && (
                <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.46rem,0.52vw,0.56rem)', letterSpacing: '0.14em', color: 'rgba(152,128,70,0.76)', flexShrink: 0 }}>
                  {weekData.dailyCommitment}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Task checklist */}
        {weekData?.tasks?.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: 'clamp(0.8rem,1.2vw,1.1rem)' }}>
            {weekData.tasks.map((task, ti) => {
              const taskKey = `a${arcIdx}_w${weekIdx}_t${ti}`
              return (
                <TaskCheck
                  key={ti}
                  task={task}
                  taskKey={taskKey}
                  done={!!progress.tasksDone[taskKey]}
                  onToggle={onTaskToggle}
                  index={ti}
                />
              )
            })}
          </div>
        )}

        {/* Milestone */}
        {weekData?.milestone && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
            padding: '0.6rem 0.9rem',
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '2px',
            marginBottom: 'clamp(0.8rem,1.2vw,1.1rem)',
          }}>
            <span style={{ color: 'rgba(201,168,76,0.45)', fontSize: '0.7rem', flexShrink: 0, lineHeight: '1.55' }}>✦</span>
            <div>
              <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.46rem,0.52vw,0.56rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(152,128,70,0.78)' }}>Goal · </span>
              <span style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: 'clamp(0.74rem,0.84vw,0.88rem)', color: 'rgba(195,178,138,0.8)' }}>{weekData.milestone}</span>
            </div>
          </div>
        )}

        {/* Complete Week button — only shown when all tasks are done */}
        {allTasksDone && (
          <button
            onClick={onAdvanceWeek}
            onMouseEnter={() => setWeekHov(true)}
            onMouseLeave={() => setWeekHov(false)}
            style={{
              width:        '100%',
              fontFamily:   '"Cinzel", serif',
              fontSize:     'clamp(0.6rem,0.72vw,0.78rem)',
              letterSpacing:'0.28em',
              textTransform:'uppercase',
              color:        weekHov ? 'rgba(255,240,160,0.98)' : 'rgba(228,202,120,0.92)',
              background:   weekHov
                ? 'linear-gradient(135deg, rgba(45,32,8,0.98) 0%, rgba(60,42,8,0.98) 100%)'
                : 'linear-gradient(135deg, rgba(28,20,5,0.95) 0%, rgba(38,27,5,0.95) 100%)',
              border:       `1px solid ${weekHov ? 'rgba(218,185,80,0.75)' : 'rgba(165,132,42,0.5)'}`,
              borderRadius: '2px',
              padding:      'clamp(0.75em,1.1vw,0.95em)',
              cursor:       'pointer',
              transition:   'all 0.18s ease',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              gap:          '0.6rem',
              boxShadow:    weekHov ? '0 0 24px rgba(201,168,76,0.18)' : 'none',
              animation:    'pvFadeUp 0.35s ease both',
            }}
          >
            <span>Complete Week — Advance</span>
            <span style={{ opacity: weekHov ? 1 : 0.55, transition: 'all 0.18s ease', transform: `translateX(${weekHov ? 3 : 0}px)`, display: 'inline-block' }}>›</span>
            <span style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: '0.85em', opacity: 0.6 }}>+10 ✦</span>
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Arc overview (all arcs, compact) ────────────────────────────────────────
function ArcOverview({ plan, progress, expandedArc, onToggle }) {
  const arcs   = plan?.arcs || []
  const doneSet = new Set(progress.completedArcIdxs || [])

  return (
    <div style={{ animation: 'pvFadeUp 0.4s ease 0.3s both' }}>
      <div style={{
        fontFamily:   '"Cinzel", serif',
        fontSize:     'clamp(0.48rem,0.55vw,0.6rem)',
        letterSpacing:'0.32em',
        textTransform:'uppercase',
        color:        'rgba(140,118,58,0.6)',
        marginBottom: 'clamp(0.6rem,0.8vw,0.8rem)',
        paddingLeft:  '0.1rem',
      }}>
        All Arcs · {plan.totalWeeks || 17} Weeks Total
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {arcs.map((arc, idx) => {
          const isDone    = doneSet.has(idx)
          const isCurrent = idx === (progress.currentArcIdx || 0) && !isDone
          const isLocked  = !isDone && !isCurrent && idx > (progress.currentArcIdx || 0)
          const isExpanded= expandedArc === idx

          // Task completion % for this arc
          const taskCount = arc.weeklyPlan?.reduce((s, w) => s + (w.tasks?.length || 0), 0) || 0
          const doneCount = arc.weeklyPlan?.reduce((s, w, wi) =>
            s + (w.tasks?.filter((_, ti) => progress.tasksDone[`a${idx}_w${wi}_t${ti}`]).length || 0), 0
          ) || 0
          const pct = taskCount > 0 ? Math.round(doneCount / taskCount * 100) : 0

          return (
            <div key={idx} style={{
              position:   'relative',
              background: isExpanded ? 'rgba(14,10,22,0.95)' : 'rgba(8,6,16,0.6)',
              border:     `1px solid ${isDone ? 'rgba(201,168,76,0.25)' : isCurrent ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.07)'}`,
              borderRadius: '2px',
              overflow:   'hidden',
              transition: 'all 0.18s ease',
            }}>
              {/* Arc header row */}
              <div
                onClick={() => !isLocked && onToggle(idx)}
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '0.75rem',
                  padding:    'clamp(0.65rem,0.9vw,0.8rem) clamp(0.9rem,1.2vw,1.1rem)',
                  cursor:     isLocked ? 'default' : 'pointer',
                  userSelect: 'none',
                }}
              >
                {/* Roman num */}
                <div style={{
                  width: '28px', height: '28px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone ? 'rgba(201,168,76,0.15)' : isCurrent ? 'rgba(201,168,76,0.09)' : 'rgba(201,168,76,0.03)',
                  border: `1px solid ${isDone ? 'rgba(201,168,76,0.45)' : isCurrent ? 'rgba(201,168,76,0.25)' : 'rgba(201,168,76,0.1)'}`,
                  borderRadius: '2px',
                }}>
                  {isDone ? (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5l2.5 2.5L9 3" stroke="rgba(201,168,76,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(0.5rem,0.58vw,0.62rem)', color: isCurrent ? 'rgba(201,168,76,0.8)' : 'rgba(120,100,45,0.45)' }}>
                      {ROMAN[idx] || idx + 1}
                    </span>
                  )}
                </div>

                {/* Title + focus */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily:   '"Cinzel", serif',
                    fontSize:     'clamp(0.65rem,0.75vw,0.82rem)',
                    letterSpacing:'0.1em',
                    textTransform:'uppercase',
                    color:        isDone ? 'rgba(175,152,95,0.75)' : isCurrent ? 'rgba(218,195,135,0.92)' : 'rgba(120,102,55,0.5)',
                    whiteSpace:   'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {arc.title}
                  </div>
                  {isCurrent && arc.focus && (
                    <div style={{
                      fontFamily: '"Lora", serif',
                      fontStyle:  'italic',
                      fontSize:   'clamp(0.65rem,0.74vw,0.78rem)',
                      color:      'rgba(162,142,95,0.65)',
                      marginTop:  '0.15rem',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {arc.focus}
                    </div>
                  )}
                </div>

                {/* Right: pct + status + expand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                  {isDone && (
                    <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(175,150,82,0.78)', border: '1px solid rgba(140,118,55,0.38)', padding: '0.18em 0.55em', borderRadius: '2px' }}>Complete</span>
                  )}
                  {isCurrent && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <div style={{ width: '42px', height: '2px', background: 'rgba(201,168,76,0.12)', borderRadius: '1px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: 'rgba(201,168,76,0.65)' }} />
                      </div>
                      <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.52rem)', color: 'rgba(162,138,70,0.76)' }}>{pct}%</span>
                    </div>
                  )}
                  {isLocked && (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <rect x="1" y="5" width="8" height="7" rx="1" stroke="rgba(100,85,40,0.35)" strokeWidth="1.2"/>
                      <path d="M3 5V3.5a2 2 0 014 0V5" stroke="rgba(100,85,40,0.35)" strokeWidth="1.2"/>
                    </svg>
                  )}
                  {!isLocked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)`, transition: 'transform 0.22s ease' }}>
                      <path d="M2 3.5l3 3 3-3" stroke={isCurrent ? 'rgba(165,138,70,0.6)' : 'rgba(110,90,40,0.35)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Expanded week list */}
              {isExpanded && !isLocked && (
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', padding: 'clamp(0.6rem,0.9vw,0.8rem) clamp(0.9rem,1.2vw,1.1rem) clamp(0.8rem,1.1vw,1rem)' }}>
                  {arc.weeklyPlan?.map((week, wi) => (
                    <div key={wi} style={{
                      borderLeft: '1px solid rgba(201,168,76,0.1)',
                      paddingLeft: '0.7rem',
                      paddingBottom: '0.6rem',
                      marginLeft: '0.3rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                        <div style={{ width: '5px', height: '5px', background: 'rgba(201,168,76,0.45)', borderRadius: '1px', transform: 'rotate(45deg)', flexShrink: 0, marginLeft: '-0.95rem' }} />
                        <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.5rem,0.56vw,0.6rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(155,130,65,0.65)' }}>Week {week.week}</span>
                        <span style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: 'clamp(0.7rem,0.78vw,0.82rem)', color: 'rgba(165,148,108,0.7)' }}>{week.theme}</span>
                      </div>
                      {week.tasks?.map((task, ti) => {
                        const tKey = `a${idx}_w${wi}_t${ti}`
                        const done = !!progress.tasksDone[tKey]
                        return (
                          <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: done ? 'rgba(201,168,76,0.65)' : 'rgba(100,85,40,0.3)', flexShrink: 0 }} />
                            <span style={{ fontFamily: '"Lora", serif', fontSize: 'clamp(0.72rem,0.8vw,0.85rem)', color: done ? 'rgba(160,140,90,0.6)' : 'rgba(198,180,138,0.82)', textDecoration: done ? 'line-through' : 'none' }}>{task.title}</span>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Journal (revisit panel) ──────────────────────────────────────────────────
function JournalSection({ unlockedScenes, navigate }) {
  const [open, setOpen] = useState(false)

  const unlocked = SEGMENT_META.filter(s => (unlockedScenes || []).includes(s.id))
  if (unlocked.length === 0) return null

  return (
    <div style={{ marginTop: 'clamp(1.5rem,2.5vh,2.5rem)', animation: 'pvFadeUp 0.5s ease 0.65s both' }}>

      {/* ── Toggle header ─────────────────────────────────────────────────── */}
      <button
        onClick={() => { try { SoundEngine.pageTurn() } catch (_) {}; setOpen(p => !p) }}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          width:          '100%',
          padding:        'clamp(0.65rem,1vw,0.85rem) clamp(1rem,1.4vw,1.2rem)',
          background:     'rgba(10,7,16,0.75)',
          border:         '1px solid rgba(201,168,76,0.18)',
          borderLeft:     '2px solid rgba(201,168,76,0.4)',
          borderRadius:   open ? '2px 2px 0 0' : '2px',
          cursor:         'pointer',
          transition:     'all 0.16s ease',
          backdropFilter: 'blur(4px)',
        }}
        onMouseEnter={e => {
          try { SoundEngine.hoverShimmer() } catch (_) {}
          e.currentTarget.style.borderColor     = 'rgba(201,168,76,0.35)'
          e.currentTarget.style.borderLeftColor = 'rgba(201,168,76,0.65)'
          e.currentTarget.style.background      = 'rgba(15,10,24,0.85)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor     = 'rgba(201,168,76,0.18)'
          e.currentTarget.style.borderLeftColor = 'rgba(201,168,76,0.4)'
          e.currentTarget.style.background      = 'rgba(10,7,16,0.75)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          {/* Scroll icon */}
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
            <rect x="2" y="1.5" width="9" height="10" rx="1" stroke="rgba(201,168,76,0.5)" strokeWidth="1.2" />
            <line x1="4" y1="4.5" x2="9" y2="4.5" stroke="rgba(201,168,76,0.4)" strokeWidth="0.9" />
            <line x1="4" y1="6.5" x2="9" y2="6.5" stroke="rgba(201,168,76,0.4)" strokeWidth="0.9" />
            <line x1="4" y1="8.5" x2="7.5" y2="8.5" stroke="rgba(201,168,76,0.4)" strokeWidth="0.9" />
          </svg>
          <div>
            <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(160,132,60,0.6)', marginBottom: '0.12rem' }}>
              The Archive
            </div>
            <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.7rem,0.8vw,0.88rem)', letterSpacing: '0.05em', color: 'rgba(215,185,118,0.88)' }}>
              Chronicle — {unlocked.length} Scene{unlocked.length !== 1 ? 's' : ''} Unlocked
            </div>
          </div>
        </div>
        {/* Chevron */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, transition: 'transform 0.22s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          <path d="M4 2.5L8 6L4 9.5" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Segment list ──────────────────────────────────────────────────── */}
      {open && (
        <div style={{ border: '1px solid rgba(201,168,76,0.13)', borderTop: 'none', borderRadius: '0 0 2px 2px', overflow: 'hidden' }}>
          {unlocked.map((seg, i) => {
            const segNum  = parseInt(seg.id.replace('a1_seg', ''), 10)
            const numeral = segNum === 0 ? 'Prologue' : (ROMAN[segNum - 1] || String(segNum))
            const isLast  = i === unlocked.length - 1
            return (
              <div
                key={seg.id}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          'clamp(0.7rem,1.1vw,1rem)',
                  padding:      'clamp(0.7rem,1vw,0.9rem) clamp(0.9rem,1.3vw,1.2rem)',
                  background:   i % 2 === 0 ? 'rgba(8,5,14,0.72)' : 'rgba(11,8,18,0.68)',
                  borderBottom: isLast ? 'none' : '1px solid rgba(201,168,76,0.07)',
                  transition:   'background 0.14s ease',
                  cursor:       'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,14,32,0.82)' }}
                onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? 'rgba(8,5,14,0.72)' : 'rgba(11,8,18,0.68)' }}
              >
                {/* Roman numeral */}
                <div style={{
                  flexShrink:  0,
                  width:       'clamp(38px,4vw,50px)',
                  textAlign:   'right',
                  fontFamily:  '"Cinzel", serif',
                  fontSize:    'clamp(0.52rem,0.6vw,0.66rem)',
                  color:       'rgba(155,128,65,0.72)',
                  letterSpacing: '0.04em',
                  paddingRight: '0.55rem',
                  borderRight: '1px solid rgba(201,168,76,0.1)',
                }}>
                  {numeral}
                </div>

                {/* Title + summary */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily:    '"Cinzel", serif',
                    fontSize:      'clamp(0.68rem,0.78vw,0.85rem)',
                    color:         'rgba(222,196,140,0.92)',
                    marginBottom:  '0.18rem',
                    letterSpacing: '0.025em',
                    whiteSpace:    'nowrap',
                    overflow:      'hidden',
                    textOverflow:  'ellipsis',
                  }}>
                    {seg.title}
                  </div>
                  <div style={{
                    fontFamily: '"Lora", serif',
                    fontStyle:  'italic',
                    fontSize:   'clamp(0.64rem,0.72vw,0.76rem)',
                    color:      'rgba(162,145,108,0.75)',
                    lineHeight: 1.5,
                    display:    '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow:   'hidden',
                  }}>
                    {seg.summary}
                  </div>
                </div>

                {/* Revisit button */}
                <button
                  onClick={() => {
                    try { SoundEngine.pageTurn() } catch (_) {}
                    navigate(SCREENS.STORY, { storyMode: 'revisit', segmentId: seg.id })
                  }}
                  style={{
                    flexShrink:    0,
                    fontFamily:    '"Cinzel", serif',
                    fontSize:      'clamp(0.44rem,0.5vw,0.54rem)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'rgba(185,155,82,0.8)',
                    background:    'rgba(201,168,76,0.07)',
                    border:        '1px solid rgba(201,168,76,0.22)',
                    borderRadius:  '2px',
                    padding:       '0.5em 0.9em',
                    cursor:        'pointer',
                    transition:    'all 0.15s ease',
                    whiteSpace:    'nowrap',
                  }}
                  onMouseEnter={e => {
                    try { SoundEngine.hoverShimmer() } catch (_) {}
                    e.currentTarget.style.background   = 'rgba(201,168,76,0.15)'
                    e.currentTarget.style.borderColor  = 'rgba(201,168,76,0.48)'
                    e.currentTarget.style.color        = 'rgba(220,188,102,0.97)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background   = 'rgba(201,168,76,0.07)'
                    e.currentTarget.style.borderColor  = 'rgba(201,168,76,0.22)'
                    e.currentTarget.style.color        = 'rgba(185,155,82,0.8)'
                  }}
                >
                  Revisit
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Generating view ──────────────────────────────────────────────────────────
function GeneratingView({ onboardingData }) {
  const [msgIdx, setMsgIdx] = useState(0)
  const [vis,    setVis]    = useState(true)
  useEffect(() => {
    const iv = setInterval(() => {
      setVis(false)
      setTimeout(() => { setMsgIdx(i => Math.min(i + 1, GEN_MESSAGES.length - 1)); setVis(true) }, 350)
    }, 3200)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '64px', height: '64px' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(201,168,76,0.18)', animation: 'pvRotateSlow 8s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', borderTop: '1.5px solid rgba(201,168,76,0.8)', borderRight: '1.5px solid rgba(201,168,76,0.2)', borderBottom: '1.5px solid transparent', borderLeft: '1.5px solid rgba(201,168,76,0.4)', animation: 'pvRotateFast 1.6s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '26px', borderRadius: '50%', background: 'rgba(201,168,76,0.65)', boxShadow: '0 0 10px rgba(201,168,76,0.5)', animation: 'pvGlowPulse 1.4s ease-in-out infinite' }} />
      </div>
      {onboardingData?.fourMonthScope && (
        <p style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: 'clamp(0.88rem,1.05vw,1.1rem)', color: 'rgba(218,200,162,0.85)', lineHeight: 1.7, maxWidth: 'min(520px,82vw)', margin: 0 }}>{onboardingData.fourMonthScope}</p>
      )}
      <p style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: 'clamp(0.78rem,0.9vw,0.96rem)', color: 'rgba(175,155,110,0.7)', lineHeight: 1.6, margin: 0, opacity: vis ? 1 : 0, transition: 'opacity 0.3s ease', minHeight: '2rem' }}>
        {GEN_MESSAGES[msgIdx]}
      </p>
    </div>
  )
}

// ─── Error panel ──────────────────────────────────────────────────────────────
function ErrorPanel({ error, onRetry, navigate }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '400px', background: 'rgba(14,8,8,0.97)', border: '1px solid rgba(180,40,40,0.4)', borderLeft: '3px solid rgba(180,40,40,0.8)', borderRadius: '2px', padding: '1.6rem 1.8rem', boxShadow: '0 12px 40px rgba(0,0,0,0.7)' }}>
        <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.62rem,0.72vw,0.78rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(220,100,100,0.9)', marginBottom: '0.6rem' }}>
          {error?.title || 'The Archive could not be reached'}
        </div>
        <p style={{ fontFamily: '"Lora", serif', fontSize: 'clamp(0.8rem,0.9vw,0.96rem)', color: 'rgba(225,205,175,0.85)', lineHeight: 1.6, margin: '0 0 1.1rem' }}>
          {error?.message || 'An unexpected error occurred.'}
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {onRetry && <button onClick={onRetry} style={errBtn(true)}>Try again</button>}
          {error?.action === 'settings' && <button onClick={() => openSettings?.()} style={errBtn(false)}>Settings</button>}
        </div>
      </div>
    </div>
  )
}
function errBtn(p) {
  return { fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.54rem,0.62vw,0.68rem)', letterSpacing: '0.2em', textTransform: 'uppercase', background: p ? 'rgba(180,40,40,0.15)' : 'transparent', border: `1px solid ${p ? 'rgba(180,40,40,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '2px', padding: '0.5em 1em', color: p ? 'rgba(220,130,130,0.9)' : 'rgba(175,155,120,0.75)', cursor: 'pointer' }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PlanViewScreen({ appState, navigate, openSettings }) {
  const [plan,         setPlan]         = useState(() => storage.getPlan())
  const [progress,     setProgress]     = useState(() => storage.getPlanProgress())
  const [generating,   setGenerating]   = useState(false)
  const [genError,     setGenError]     = useState(null)
  const [expandedArc,  setExpandedArc]  = useState(-1)
  const [mounted,      setMounted]      = useState(false)
  const [unlockBanner, setUnlockBanner] = useState(null)  // scene id to show unlock for
  const [sparkBanner,  setSparkBanner]  = useState(null)  // {weekKey, sparkIdx} or null
  const [epochBanner,  setEpochBanner]  = useState(null)  // arcIdx or null

  const onboardingData = storage.getOnboardingData()
  const settings       = storage.getSettings()
  const { playerName } = storage.getPlayerIdentity()

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  // Check for pending notifications on mount
  useEffect(() => {
    const p = storage.getPlanProgress()
    if (p.newUnlockPending) setUnlockBanner(p.newUnlockPending)
    // Priority 2: restore pending spark/epoch banners if player returns to plan
    const nextSpark = storage.getNextSpark()
    if (nextSpark && !p.newUnlockPending) setSparkBanner(nextSpark)
    if (p.pendingEpoch !== null && p.pendingEpoch !== undefined && !nextSpark && !p.newUnlockPending) {
      // Guard: only show banner if epoch content actually exists for this arc
      if (ACT1_EPOCHS[p.pendingEpoch]?.length > 0) {
        setEpochBanner(p.pendingEpoch)
      } else {
        // No epoch content for this arc — silently clear the pending flag
        storage.clearPendingEpoch()
      }
    }
  }, [])

  // Generate plan if needed
  useEffect(() => {
    if (plan) return
    if (!onboardingData) { navigate(SCREENS.ONBOARDING); return }
    doGenerate()
  }, []) // eslint-disable-line

  async function doGenerate() {
    setGenerating(true); setGenError(null)
    const apiKey = settings.apiKey
    if (!apiKey) {
      setGenError({ title: 'No Archive key set', message: 'Set your OpenRouter API key in Settings.', action: 'settings' })
      setGenerating(false); return
    }
    const result = await generatePlan(apiKey, onboardingData, storage.getPlanHistory())
    if (!result.ok) { setGenError(result.error); setGenerating(false); return }
    const { ok, plan: parsed, error: parseErr } = parsePlan(result.content)
    if (!ok) { setGenError(parseErr); setGenerating(false); return }
    storage.savePlan(parsed); setPlan(parsed); setGenerating(false)
  }

  // Task toggle
  const handleTaskToggle = useCallback((taskKey) => {
    // Parse key: 'a{arc}_w{week}_t{task}'
    const [, arcS, weekS, taskS] = taskKey.match(/^a(\d+)_w(\d+)_t(\d+)$/) || []
    if (arcS == null) return
    const arcIdx  = parseInt(arcS, 10)
    const weekIdx = parseInt(weekS, 10)
    const taskIdx = parseInt(taskS, 10)
    const p = storage.getPlanProgress()
    const wasComplete = !!p.tasksDone[taskKey]
    const newP = wasComplete
      ? storage.uncompleteTask(arcIdx, weekIdx, taskIdx)
      : storage.completeTask(arcIdx, weekIdx, taskIdx)
    playCheck()
    // Priority 8: coin chime on task complete
    if (!wasComplete) { try { SoundEngine.coinChime(false) } catch(_){} }
    setProgress({ ...newP })

    // ── Priority 2: Show spark banner when a task is newly completed ──────
    if (!wasComplete) {
      const nextSpark = storage.getNextSpark()
      if (nextSpark && !sparkBanner && !epochBanner) {
        setSparkBanner(nextSpark)
      }
    }
  }, [sparkBanner, epochBanner])

  // Advance week
  const handleAdvanceWeek = useCallback(() => {
    if (!plan) return
    const p = storage.getPlanProgress()
    // Verify week is complete
    if (!storage.isWeekComplete(plan, p.currentArcIdx, p.currentWeekIdx, p)) return
    playClick()
    const { newProgress, arcCompleted, unlockedScene } = storage.advanceWeek(plan, p)
    setProgress({ ...newProgress })
    if (unlockedScene) {
      setUnlockBanner(unlockedScene)
    }
    // ── Priority 2: Show epoch banner when an arc is completed ────────────
    if (arcCompleted && newProgress.pendingEpoch !== null && newProgress.pendingEpoch !== undefined) {
      const epochIdx = newProgress.pendingEpoch
      // Guard: only show banner when epoch content actually exists for this arc
      if (ACT1_EPOCHS[epochIdx]?.length > 0) {
        setTimeout(() => setEpochBanner(epochIdx), unlockedScene ? 2500 : 0)
      } else {
        // Silently clear — this arc's epoch hasn't been written yet
        storage.clearPendingEpoch()
      }
    }
  }, [plan])

  // Dismiss unlock banner
  const handleDismissUnlock = useCallback(() => {
    storage.clearUnlockPending()
    setUnlockBanner(null)
  }, [])

  const showGenerating = generating || (genError && !plan)
  const showPlan       = !!plan && !generating

  const currentArcIdx  = progress.currentArcIdx  || 0
  const currentWeekIdx = progress.currentWeekIdx || 0
  const currentArc     = plan?.arcs?.[currentArcIdx]
  const currentWeek    = currentArc?.weeklyPlan?.[currentWeekIdx]
  const totalWeeks     = currentArc?.weeklyPlan?.length || 2
  const totalArcs      = plan?.arcs?.length || 7

  return (
    <div style={{
      position:  'fixed', inset: 0,
      background:'#05040d',
      overflow:  'hidden',
      opacity:   mounted ? 1 : 0,
      transition:'opacity 0.6s ease',
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: `url('${import.meta.env.BASE_URL}assets/images/backgrounds/standard/act1_archive_study_room.jpg') center/cover no-repeat`, filter: 'brightness(0.25) saturate(0.55)', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(5,4,13,0.92) 0%, transparent 18%, transparent 72%, rgba(5,4,13,0.96) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(5,4,13,0.48) 100%)' }} />


      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 'clamp(52px,7vh,68px)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.2rem,2.5vw,2.8rem)',
        background: 'linear-gradient(to bottom, rgba(5,4,13,0.96) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <button
          onClick={() => navigate(SCREENS.MAIN_MENU)}
          style={{ pointerEvents: 'all', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(14,11,20,0.7)', border: '1px solid rgba(155,122,38,0.45)', borderRadius: '2px', padding: '0.5em 1.1em 0.5em 0.85em', cursor: 'pointer', backdropFilter: 'blur(6px)', transition: 'all 0.18s ease' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(218,182,76,0.7)'; e.currentTarget.style.background='rgba(201,168,76,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(155,122,38,0.45)'; e.currentTarget.style.background='rgba(14,11,20,0.7)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6L8 10" stroke="rgba(218,182,88,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.56rem,0.64vw,0.7rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(218,182,88,0.88)' }}>Archive</span>
        </button>

        <span className="pv-wordmark" style={{ pointerEvents: 'none', fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.5rem,0.58vw,0.62rem)', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(152,128,62,0.7)' }}>
          Vael's Study
        </span>

        <button
          onClick={() => openSettings?.()}
          style={{ pointerEvents: 'all', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14,11,20,0.7)', border: '1px solid rgba(155,122,38,0.38)', borderRadius: '2px', cursor: 'pointer', backdropFilter: 'blur(6px)', transition: 'all 0.18s ease' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.58)'; e.currentTarget.style.background='rgba(201,168,76,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(155,122,38,0.38)'; e.currentTarget.style.background='rgba(14,11,20,0.7)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2" stroke="rgba(201,168,76,0.7)" strokeWidth="1.4"/>
            <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.6 2.6l1.1 1.1M10.3 10.3l1.1 1.1M2.6 11.4l1.1-1.1M10.3 3.7l1.1-1.1" stroke="rgba(201,168,76,0.7)" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="pv-scroll" style={{ position: 'absolute', inset: 0, zIndex: 10, overflowY: showPlan ? 'auto' : 'hidden', scrollbarWidth: 'thin', scrollbarColor: 'rgba(155,122,38,0.28) transparent' }}>

        {showGenerating && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
            {!genError ? <GeneratingView onboardingData={onboardingData} /> : <ErrorPanel error={genError} onRetry={doGenerate} navigate={navigate} />}
          </div>
        )}

        {showPlan && (
          <div style={{ maxWidth: 'min(820px,92vw)', margin: '0 auto', padding: 'clamp(72px,9vh,88px) clamp(1rem,2vw,1.8rem) clamp(5rem,8vh,7rem)' }}>

            {/* ── Phase header ──────────────────────────────────────────────── */}
            <div style={{ marginBottom: 'clamp(1.2rem,2vh,1.8rem)', animation: 'pvFadeUp 0.5s ease 0.05s both' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.6rem' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '1px', background: 'rgba(201,168,76,0.8)', transform: 'rotate(45deg)', boxShadow: '0 0 7px rgba(201,168,76,0.6)' }} />
                <span style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.5rem,0.58vw,0.62rem)', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.75)' }}>
                  Phase {plan.phaseNumber || 1} · Vael's Study
                </span>
                <div style={{ width: '5px', height: '5px', borderRadius: '1px', background: 'rgba(201,168,76,0.8)', transform: 'rotate(45deg)', boxShadow: '0 0 7px rgba(201,168,76,0.6)' }} />
              </div>
              <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(1rem,1.55vw,2rem)', fontWeight: 600, color: 'transparent', backgroundImage: 'linear-gradient(180deg, rgba(255,248,218,0.98) 0%, rgba(215,178,88,0.93) 55%, rgba(165,128,45,0.88) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', lineHeight: 1.25, margin: '0 0 0.4rem', letterSpacing: '0.02em' }}>
                {plan.fourMonthScope}
              </h1>
              <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(201,168,76,0.32), rgba(201,168,76,0.05) 65%, transparent)' }} />
            </div>

            {/* ── Seeker status bar ─────────────────────────────────────────── */}
            <SeekerStatus
              progress={progress}
              playerName={playerName}
              phaseNum={plan.phaseNumber || 1}
              arcIdx={currentArcIdx}
              weekIdx={currentWeekIdx}
              totalArcs={totalArcs}
            />

            {/* ── Continue Chronicle CTA ───────────────────────────────────── */}
            <div style={{ marginBottom: 'clamp(1rem,1.8vh,1.5rem)', animation: 'pvFadeUp 0.45s ease 0.18s both' }}>
              <button
                onClick={() => { try { SoundEngine.pageTurn() } catch(_){} ; navigate(SCREENS.STORY) }}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  width:          '100%',
                  padding:        'clamp(0.75rem,1.1vw,0.95rem) clamp(1rem,1.5vw,1.4rem)',
                  background:     'linear-gradient(135deg, rgba(18,13,30,0.92) 0%, rgba(12,9,22,0.94) 100%)',
                  border:         '1px solid rgba(201,168,76,0.28)',
                  borderLeft:     '3px solid rgba(201,168,76,0.65)',
                  borderRadius:   '2px',
                  cursor:         'pointer',
                  transition:     'all 0.18s ease',
                  backdropFilter: 'blur(6px)',
                  boxShadow:      '0 2px 20px rgba(0,0,0,0.45), inset 0 0 30px rgba(201,168,76,0.015)',
                }}
                onMouseEnter={e => {
                  try { SoundEngine.hoverShimmer() } catch(_){}
                  e.currentTarget.style.borderColor         = 'rgba(201,168,76,0.55)'
                  e.currentTarget.style.borderLeftColor     = 'rgba(218,182,76,0.88)'
                  e.currentTarget.style.background          = 'linear-gradient(135deg, rgba(25,18,40,0.95) 0%, rgba(15,11,26,0.96) 100%)'
                  e.currentTarget.style.boxShadow           = '0 4px 28px rgba(0,0,0,0.55), 0 0 16px rgba(201,168,76,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor         = 'rgba(201,168,76,0.28)'
                  e.currentTarget.style.borderLeftColor     = 'rgba(201,168,76,0.65)'
                  e.currentTarget.style.background          = 'linear-gradient(135deg, rgba(18,13,30,0.92) 0%, rgba(12,9,22,0.94) 100%)'
                  e.currentTarget.style.boxShadow           = '0 2px 20px rgba(0,0,0,0.45), inset 0 0 30px rgba(201,168,76,0.015)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.6rem,1vw,0.9rem)' }}>
                  {/* Book icon */}
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '2px', background: 'rgba(201,168,76,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2.5C2 2.5 4 2 7 2s5 0.5 5 0.5V12s-2-0.5-5-0.5S2 12 2 12V2.5z" stroke="rgba(218,182,76,0.7)" strokeWidth="1.3" strokeLinejoin="round"/>
                      <line x1="7" y1="2" x2="7" y2="11.5" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.44rem,0.5vw,0.54rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(180,148,60,0.65)', marginBottom: '0.18rem' }}>
                      The Chronicle
                    </div>
                    <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.72rem,0.85vw,0.92rem)', letterSpacing: '0.06em', color: 'rgba(235,210,145,0.95)' }}>
                      Continue the Story
                    </div>
                  </div>
                </div>
                {/* Arrow */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
                  <path d="M5 3L11 8L5 13" stroke="rgba(218,182,76,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* ── Scene unlock banner ───────────────────────────────────────── */}
            {unlockBanner && (
              <SceneUnlockBanner
                sceneId={unlockBanner}
                onDismiss={handleDismissUnlock}
                onGoToStory={() => { handleDismissUnlock(); navigate(SCREENS.STORY) }}
              />
            )}

            {/* ── Spark banner (Priority 2) ──────────────────────────────────── */}
            {sparkBanner && !unlockBanner && (
              <SparkBanner
                weekKey={sparkBanner.weekKey}
                sparkIdx={sparkBanner.sparkIdx}
                onPlay={() => {
                  setSparkBanner(null)
                  navigate(SCREENS.STORY, {
                    storyMode: 'spark',
                    weekKey:   sparkBanner.weekKey,
                    sparkIdx:  sparkBanner.sparkIdx,
                  })
                }}
                onDismiss={() => setSparkBanner(null)}
              />
            )}

            {/* ── Epoch banner (Priority 2) ──────────────────────────────────── */}
            {epochBanner !== null && epochBanner !== undefined && !unlockBanner && !sparkBanner && (
              <EpochBanner
                arcIdx={epochBanner}
                arcTitle={plan?.arcs?.[epochBanner]?.title}
                onPlay={() => {
                  const ai       = epochBanner
                  const arcTitle = plan?.arcs?.[ai]?.title
                  // Save to journal before navigating so it's replayable
                  storage.saveEpochToJournal(ai, arcTitle)
                  setEpochBanner(null)
                  navigate(SCREENS.STORY, {
                    storyMode:    'epoch',
                    epochArcIdx:  ai,
                  })
                }}
                onDismiss={() => {
                  storage.clearPendingEpoch()
                  setEpochBanner(null)
                }}
              />
            )}

            {/* ── Daily focus card ──────────────────────────────────────────── */}
            {currentArc && (
              <DailyFocusCard
                arc={currentArc}
                arcIdx={currentArcIdx}
                weekData={currentWeek}
                weekIdx={currentWeekIdx}
                totalWeeks={totalWeeks}
                progress={progress}
                plan={plan}
                onTaskToggle={handleTaskToggle}
                onAdvanceWeek={handleAdvanceWeek}
              />
            )}

            {/* ── All arcs overview ─────────────────────────────────────────── */}
            <ArcOverview
              plan={plan}
              progress={progress}
              expandedArc={expandedArc}
              onToggle={idx => setExpandedArc(prev => prev === idx ? -1 : idx)}
            />

            {/* ── Phase milestone ───────────────────────────────────────────── */}
            {plan.overallMilestone && (
              <div style={{ position: 'relative', marginTop: 'clamp(1.5rem,2.5vh,2.5rem)', padding: 'clamp(1rem,1.4vw,1.4rem) clamp(1.2rem,1.6vw,1.6rem)', background: 'rgba(10,8,18,0.7)', border: '1px solid rgba(201,168,76,0.15)', borderLeft: '2px solid rgba(201,168,76,0.45)', borderRadius: '2px', backdropFilter: 'blur(4px)', animation: 'pvFadeUp 0.5s ease 0.5s both' }}>
                <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.48rem,0.54vw,0.58rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(140,118,60,0.62)', marginBottom: '0.45rem' }}>Phase Milestone</div>
                <p style={{ fontFamily: '"Lora", serif', fontStyle: 'italic', fontSize: 'clamp(0.82rem,0.94vw,1rem)', color: 'rgba(218,200,158,0.88)', lineHeight: 1.7, margin: 0 }}>
                  {plan.overallMilestone}
                </p>
              </div>
            )}

            {/* ── Journal — revisit unlocked scenes ─────────────────────────── */}
            <JournalSection
              unlockedScenes={progress?.unlockedScenes}
              navigate={navigate}
            />

          </div>
        )}
      </div>

      <style>{`
        @keyframes pvRotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pvRotateFast { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pvFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pvGlowPulse { 0%,100% { box-shadow: 0 0 8px rgba(201,168,76,0.4); } 50% { box-shadow: 0 0 20px rgba(201,168,76,0.7); } }
        @media (max-width: 520px) { .pv-wordmark { display: none !important; } }
        .pv-scroll::-webkit-scrollbar { width: 4px; }
        .pv-scroll::-webkit-scrollbar-track { background: transparent; }
        .pv-scroll::-webkit-scrollbar-thumb { background: rgba(155,122,38,0.28); border-radius: 2px; }
      `}</style>
    </div>
  )
}
