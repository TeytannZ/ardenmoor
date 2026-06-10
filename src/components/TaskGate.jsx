// ─── TaskGate.jsx ─────────────────────────────────────────────────────────────
// Story gate overlay: pauses the chronicle until the user completes real tasks.
// Sits on top of the story background (which stays visible and blurred behind).
// Gate styles: fight | investigation | search | collection | escape | dialogue
// Verification modes per task: checkbox (direct) | photo (AI) | text (AI)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { storage } from '../lib/storage.js'
import { verifyTaskSubmission } from '../lib/ai.js'
import { SoundEngine } from '../lib/audio.js'

// ─── Gate style configurations ────────────────────────────────────────────────
const GATE_CONFIG = {
  fight: {
    icon:         '⚔',
    rgb:          '220,72,52',
    bgRgb:        '55,8,6',
    label:        'Combat',
    completedWord:'Struck',
    allClearText: 'Enemy Defeated',
    progressLabel:'Enemy HP',
  },
  investigation: {
    icon:         '◉',
    rgb:          '72,158,208',
    bgRgb:        '4,14,42',
    label:        'Investigation',
    completedWord:'Examined',
    allClearText: 'Evidence Secured',
    progressLabel:'Leads',
  },
  search: {
    icon:         '◎',
    rgb:          '200,168,72',
    bgRgb:        '22,16,4',
    label:        'Search',
    completedWord:'Located',
    allClearText: 'All Found',
    progressLabel:'Items',
  },
  collection: {
    icon:         '◈',
    rgb:          '72,200,138',
    bgRgb:        '4,22,14',
    label:        'Collection',
    completedWord:'Gathered',
    allClearText: 'Collection Complete',
    progressLabel:'Gathered',
  },
  escape: {
    icon:         '↗',
    rgb:          '218,155,38',
    bgRgb:        '42,26,0',
    label:        'Escape',
    completedWord:'Cleared',
    allClearText: 'Path Open',
    progressLabel:'Obstacles',
  },
  dialogue: {
    icon:         '◆',
    rgb:          '178,128,218',
    bgRgb:        '16,4,32',
    label:        'Negotiation',
    completedWord:'Resolved',
    allClearText: 'Dialogue Complete',
    progressLabel:'Points',
  },
}

const DEFAULT_CONFIG = GATE_CONFIG.fight

// ─── Verification state machine ────────────────────────────────────────────────
const V = { IDLE:'idle', CHECKING:'checking', PASS:'pass', FAIL:'fail' }

// ─── API Key Depleted screen ───────────────────────────────────────────────────
// Full-screen block: user cannot continue until they add credits.
function KeyDepletedScreen({ error, onRetry }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  return (
    <div style={{
      position:      'fixed', inset: 0, zIndex: 300,
      background:    'rgba(2,1,10,0.97)',
      backdropFilter:'blur(14px)',
      display:       'flex', alignItems: 'center', justifyContent: 'center',
      opacity:       mounted ? 1 : 0, transition: 'opacity 0.3s ease',
    }}>
      <div style={{
        maxWidth:      'min(500px, 90vw)',
        padding:       'clamp(2rem,4vw,3.2rem)',
        background:    'rgba(6,4,18,0.99)',
        border:        '1px solid rgba(180,52,32,0.38)',
        borderRadius:  '3px',
        display:       'flex', flexDirection: 'column',
        gap:           'clamp(0.8rem,1.8vh,1.4rem)',
        alignItems:    'center', textAlign: 'center',
        boxShadow:     '0 0 80px rgba(0,0,0,0.95)',
      }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(180,52,32,0.45)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(220,80,60,0.9)', fontSize:'1rem' }}>
          ✦
        </div>

        <h2 style={{
          fontFamily: '"Cinzel", serif', fontSize: 'clamp(0.82rem,1.05vw,1.15rem)',
          color: 'rgba(232,190,98,0.97)', margin: 0, letterSpacing: '0.06em',
        }}>
          {error?.title || 'Archive Key Has No Credits'}
        </h2>

        <p style={{
          fontFamily: '"Lora", serif', fontStyle: 'italic',
          fontSize: 'clamp(0.82rem,0.95vw,1rem)',
          color: 'rgba(188,165,115,0.88)', lineHeight: 1.85, margin: 0,
        }}>
          {error?.message || 'Your API key has run out of credits. You cannot continue the chronicle until the key is replenished.'}
        </p>

        {/* Steps */}
        <div style={{
          width: '100%', padding: 'clamp(0.8rem,1.4vh,1.1rem)',
          background: 'rgba(4,3,14,0.92)',
          border: '1px solid rgba(120,95,32,0.28)',
          borderRadius: '2px', textAlign: 'left',
          display: 'flex', flexDirection: 'column', gap: '0.38rem',
        }}>
          <p style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.38rem,0.46vw,0.5rem)', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(155,122,38,0.78)', margin:'0 0 0.4rem' }}>
            How to add credits
          </p>
          {[
            '1. Open openrouter.ai in your browser',
            '2. Sign in to your account',
            '3. Click "Credits" in the left sidebar',
            '4. Add $5 or more — this lasts many months',
            '5. Return here and tap "I\'ve Added Credits"',
          ].map((step, i) => (
            <p key={i} style={{ fontFamily:'"Lora",serif', fontSize:'clamp(0.74rem,0.84vw,0.9rem)', color:'rgba(185,162,112,0.82)', margin:0, lineHeight:1.6 }}>
              {step}
            </p>
          ))}
        </div>

        <div style={{ display:'flex', gap:'0.8rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button
            onClick={() => window.open('https://openrouter.ai/credits', '_blank')}
            style={{
              fontFamily:'"Cinzel",serif', fontSize:'clamp(0.56rem,0.66vw,0.72rem)',
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(218,185,88,0.97)',
              background:'rgba(201,168,76,0.12)',
              border:'1px solid rgba(201,168,76,0.55)',
              borderRadius:'2px', padding:'0.65em 1.4em', cursor:'pointer',
              transition:'all 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.22)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.85)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(201,168,76,0.12)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.55)' }}
          >
            Open openrouter.ai
          </button>
          <button
            onClick={onRetry}
            style={{
              fontFamily:'"Cinzel",serif', fontSize:'clamp(0.56rem,0.66vw,0.72rem)',
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(155,138,105,0.78)',
              background:'transparent',
              border:'1px solid rgba(80,65,28,0.42)',
              borderRadius:'2px', padding:'0.65em 1.3em', cursor:'pointer',
              transition:'all 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color='rgba(188,165,115,0.95)'; e.currentTarget.style.borderColor='rgba(120,100,45,0.62)' }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(155,138,105,0.78)'; e.currentTarget.style.borderColor='rgba(80,65,28,0.42)' }}
          >
            I've Added Credits — Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Single task row ───────────────────────────────────────────────────────────
function TaskItem({ task, taskKey, arcIdx, weekIdx, taskIdx, config, onComplete, isCompleted }) {
  const verType = task.verificationType || 'checkbox'  // 'checkbox' | 'photo' | 'text'

  const [verState,    setVerState]    = useState(V.IDLE)
  const [feedback,    setFeedback]    = useState(null)
  const [imgPreview,  setImgPreview]  = useState(null)
  const [textInput,   setTextInput]   = useState('')
  const [showText,    setShowText]    = useState(false)
  const [flash,       setFlash]       = useState(false)
  const [completing,  setCompleting]  = useState(false)
  const [keyDepleted, setKeyDepleted] = useState(false)
  const [depletedErr, setDepletedErr] = useState(null)
  const fileRef = useRef(null)

  const triggerFlash = useCallback(() => {
    setFlash(true)
    try { SoundEngine.deedComplete() } catch (_) {}
    setTimeout(() => setFlash(false), 700)
  }, [])

  const markDone = useCallback(() => {
    if (completing || isCompleted) return
    setCompleting(true)
    storage.completeTask(arcIdx, weekIdx, taskIdx)
    triggerFlash()
    setTimeout(() => onComplete(taskKey), 450)
  }, [completing, isCompleted, arcIdx, weekIdx, taskIdx, taskKey, onComplete, triggerFlash])

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImgPreview(ev.target.result)
      setVerState(V.IDLE)
      setFeedback(null)
    }
    reader.readAsDataURL(file)
    // reset so the same file can be reselected
    e.target.value = ''
  }

  const handleVerify = async (type, content) => {
    setVerState(V.CHECKING)
    setFeedback(null)
    const apiKey = storage.getSettings().apiKey
    if (!apiKey) {
      setVerState(V.FAIL)
      setFeedback('No API key found. Go to Settings and add your OpenRouter key.')
      return
    }
    const result = await verifyTaskSubmission(apiKey, task, type, content)
    if (result.keyDepleted) {
      setKeyDepleted(true)
      setDepletedErr(result.error)
      return
    }
    if (result.pass) {
      setVerState(V.PASS)
      setFeedback(result.feedback)
      setTimeout(() => markDone(), 500)
    } else {
      setVerState(V.FAIL)
      setFeedback(result.feedback || 'Not quite — look at the task description again and try again.')
    }
  }

  if (keyDepleted) {
    return (
      <KeyDepletedScreen
        error={depletedErr}
        onRetry={() => { setKeyDepleted(false); setVerState(V.IDLE); setFeedback(null) }}
      />
    )
  }

  const isChecking = verState === V.CHECKING

  return (
    <div
      onClick={verType === 'checkbox' && !isCompleted && !completing ? markDone : undefined}
      style={{
        position:   'relative',
        padding:    'clamp(0.65rem,1.1vh,0.95rem) clamp(0.8rem,1.1vw,1rem)',
        background: isCompleted
          ? `rgba(${config.rgb},0.07)`
          : flash
          ? `rgba(${config.rgb},0.2)`
          : 'rgba(4,3,14,0.72)',
        border:        `1px solid ${isCompleted ? `rgba(${config.rgb},0.38)` : 'rgba(80,65,32,0.32)'}`,
        borderRadius:  '2px',
        transition:    'background 0.45s ease, border-color 0.45s ease',
        overflow:      'hidden',
        cursor:        verType === 'checkbox' && !isCompleted && !completing ? 'pointer' : 'default',
      }}>
      {/* Flash burst overlay */}
      {flash && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
          background: `rgba(${config.rgb},0.28)`,
          animation:  'tgFlash 0.6s ease forwards',
        }} />
      )}

      <div style={{ display:'flex', alignItems:'flex-start', gap:'0.65rem' }}>
        {/* Check indicator */}
        <div
          style={{
            width:          '18px', height: '18px', flexShrink: 0,
            marginTop:      '0.12em',
            border:         `1.5px solid ${isCompleted ? `rgba(${config.rgb},0.7)` : completing ? `rgba(${config.rgb},0.45)` : 'rgba(130,108,50,0.55)'}`,
            borderRadius:   '2px',
            background:     isCompleted ? `rgba(${config.bgRgb},0.8)` : completing ? `rgba(${config.rgb},0.1)` : 'transparent',
            display:        'flex', alignItems: 'center', justifyContent: 'center',
            transition:     'all 0.22s ease',
            boxShadow:      isCompleted ? `0 0 8px rgba(${config.rgb},0.22)` : 'none',
          }}
        >
          {isCompleted && (
            <span style={{ fontSize:'0.62rem', color:`rgba(${config.rgb},0.95)`, lineHeight:1, fontWeight:700 }}>✓</span>
          )}
        </div>

        {/* Task body */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'0.38rem' }}>
          {/* Title */}
          <div style={{
            fontFamily:     '"Lora", serif',
            fontSize:       'clamp(0.82rem,0.96vw,1rem)',
            color:          isCompleted ? 'rgba(180,160,112,0.55)' : 'rgba(228,215,185,0.97)',
            lineHeight:     1.62,
            textDecoration: isCompleted ? 'line-through' : 'none',
            transition:     'color 0.35s ease',
          }}>
            {task.title}
          </div>

          {/* Completed badge */}
          {isCompleted && (
            <div style={{
              fontFamily:    '"Cinzel", serif',
              fontSize:      'clamp(0.34rem,0.4vw,0.44rem)',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color:         `rgba(${config.rgb},0.82)`,
              display:       'flex', alignItems: 'center', gap: '0.3em',
            }}>
              ✦ {config.completedWord}
            </div>
          )}

          {/* ── Photo verification ── */}
          {verType === 'photo' && !isCompleted && (
            <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem', marginTop:'0.25rem' }}>
              <input
                ref={fileRef} type="file" accept="image/*"
                onChange={handlePhotoSelect} style={{ display:'none' }}
              />
              {imgPreview ? (
                <>
                  <img
                    src={imgPreview} alt="proof"
                    style={{ maxWidth:'180px', maxHeight:'110px', objectFit:'cover', borderRadius:'2px', border:`1px solid rgba(${config.rgb},0.3)` }}
                  />
                  <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                    <button
                      onClick={() => handleVerify('photo', imgPreview)}
                      disabled={isChecking}
                      style={{
                        fontFamily:'"Cinzel",serif', fontSize:'clamp(0.4rem,0.48vw,0.52rem)',
                        letterSpacing:'0.18em', textTransform:'uppercase',
                        color:'rgba(218,185,88,0.97)',
                        background:`rgba(${config.rgb},0.14)`,
                        border:`1px solid rgba(${config.rgb},0.48)`,
                        borderRadius:'2px', padding:'0.42em 0.9em',
                        cursor:isChecking?'wait':'pointer',
                        opacity:isChecking?0.6:1,
                        transition:'all 0.15s ease',
                      }}
                    >
                      {isChecking ? 'Verifying…' : 'Submit Proof'}
                    </button>
                    <button
                      onClick={() => { setImgPreview(null); setFeedback(null); fileRef.current?.click() }}
                      style={{
                        fontFamily:'"Cinzel",serif', fontSize:'clamp(0.38rem,0.44vw,0.48rem)',
                        letterSpacing:'0.14em', textTransform:'uppercase',
                        color:'rgba(155,138,105,0.72)',
                        background:'transparent', border:'1px solid rgba(80,65,28,0.32)',
                        borderRadius:'2px', padding:'0.42em 0.75em', cursor:'pointer',
                      }}
                    >
                      Change
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  style={{
                    fontFamily:'"Cinzel",serif', fontSize:'clamp(0.4rem,0.48vw,0.52rem)',
                    letterSpacing:'0.18em', textTransform:'uppercase',
                    color:`rgba(${config.rgb},0.9)`,
                    background:'transparent',
                    border:`1px solid rgba(${config.rgb},0.4)`,
                    borderRadius:'2px', padding:'0.45em 1em',
                    cursor:'pointer', alignSelf:'flex-start',
                    transition:'background 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background=`rgba(${config.rgb},0.1)`}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  Upload Proof ↑
                </button>
              )}
              {feedback && (
                <p style={{
                  fontFamily:'"Lora",serif', fontStyle:'italic',
                  fontSize:'clamp(0.72rem,0.82vw,0.86rem)',
                  color: verState===V.PASS ? 'rgba(72,200,138,0.9)' : 'rgba(220,100,80,0.9)',
                  margin:0, lineHeight:1.55,
                }}>
                  {feedback}
                </p>
              )}
            </div>
          )}

          {/* ── Text verification ── */}
          {verType === 'text' && !isCompleted && (
            <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem', marginTop:'0.25rem' }}>
              {!showText ? (
                <button
                  onClick={() => setShowText(true)}
                  style={{
                    fontFamily:'"Cinzel",serif', fontSize:'clamp(0.4rem,0.48vw,0.52rem)',
                    letterSpacing:'0.18em', textTransform:'uppercase',
                    color:`rgba(${config.rgb},0.9)`,
                    background:'transparent',
                    border:`1px solid rgba(${config.rgb},0.4)`,
                    borderRadius:'2px', padding:'0.45em 1em',
                    cursor:'pointer', alignSelf:'flex-start',
                    transition:'background 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background=`rgba(${config.rgb},0.1)`}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  Submit Work
                </button>
              ) : (
                <>
                  <textarea
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    placeholder="Paste your code, writing, or notes here…"
                    rows={4}
                    style={{
                      fontFamily:'"Lora",serif', fontSize:'clamp(0.72rem,0.82vw,0.86rem)',
                      color:'rgba(218,205,172,0.92)',
                      background:'rgba(3,2,12,0.85)',
                      border:'1px solid rgba(100,80,32,0.38)',
                      borderRadius:'2px', padding:'0.58rem 0.75rem',
                      resize:'vertical', width:'100%', boxSizing:'border-box',
                      lineHeight:1.55, outline:'none',
                    }}
                  />
                  <button
                    onClick={() => handleVerify('text', textInput)}
                    disabled={!textInput.trim() || isChecking}
                    style={{
                      fontFamily:'"Cinzel",serif', fontSize:'clamp(0.4rem,0.48vw,0.52rem)',
                      letterSpacing:'0.18em', textTransform:'uppercase',
                      color:'rgba(218,185,88,0.97)',
                      background:`rgba(${config.rgb},0.14)`,
                      border:`1px solid rgba(${config.rgb},0.48)`,
                      borderRadius:'2px', padding:'0.42em 1.1em',
                      cursor:(!textInput.trim()||isChecking)?'not-allowed':'pointer',
                      opacity:(!textInput.trim()||isChecking)?0.5:1,
                      alignSelf:'flex-start',
                      transition:'all 0.15s ease',
                    }}
                  >
                    {isChecking ? 'Verifying…' : 'Verify Submission'}
                  </button>
                  {feedback && (
                    <p style={{
                      fontFamily:'"Lora",serif', fontStyle:'italic',
                      fontSize:'clamp(0.72rem,0.82vw,0.86rem)',
                      color: verState===V.PASS ? 'rgba(72,200,138,0.9)' : 'rgba(220,100,80,0.9)',
                      margin:0, lineHeight:1.55,
                    }}>
                      {feedback}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Fight health bar ──────────────────────────────────────────────────────────
function HealthBar({ total, remaining }) {
  const pct = total > 0 ? remaining / total : 0
  const dangerColor = pct <= 0.25 ? '220,80,60' : pct <= 0.5 ? '220,140,40' : '220,72,52'
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.28rem', minWidth:'140px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.34rem,0.4vw,0.44rem)', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(220,80,60,0.75)' }}>
          Enemy HP
        </span>
        <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.38rem,0.44vw,0.48rem)', color:'rgba(220,80,60,0.68)' }}>
          {remaining}/{total}
        </span>
      </div>
      <div style={{ height:'5px', background:'rgba(40,10,8,0.85)', borderRadius:'3px', overflow:'hidden', border:'1px solid rgba(100,28,18,0.4)' }}>
        <div style={{
          height:'100%',
          width:`${pct * 100}%`,
          background:`linear-gradient(to right, rgba(${dangerColor},0.7), rgba(${dangerColor},1))`,
          boxShadow:`0 0 7px rgba(${dangerColor},0.5)`,
          transition:'width 0.55s ease',
        }} />
      </div>
    </div>
  )
}

// ─── Progress pip track — for non-fight styles ────────────────────────────────
function ProgressPips({ total, completed, config }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
      <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.34rem,0.4vw,0.44rem)', letterSpacing:'0.2em', textTransform:'uppercase', color:`rgba(${config.rgb},0.65)`, marginRight:'0.2rem' }}>
        {config.progressLabel}
      </span>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width:'8px', height:'8px',
          borderRadius:'1px',
          background: i < completed ? `rgba(${config.rgb},0.9)` : `rgba(${config.rgb},0.15)`,
          border:`1px solid rgba(${config.rgb},${i < completed ? '0.7' : '0.25'})`,
          boxShadow: i < completed ? `0 0 6px rgba(${config.rgb},0.4)` : 'none',
          transition:'all 0.35s ease',
        }} />
      ))}
    </div>
  )
}

// ─── Main TaskGate ─────────────────────────────────────────────────────────────
// Props:
//   beat        — the current story beat ({ type:'task_gate', gateStyle, taskSlots,
//                   pauseNarrator, continueNarrator, enemyName? })
//   onComplete  — called when all tasks are done; advances the story
export default function TaskGate({ beat, onComplete }) {
  const gateStyle = beat?.gateStyle || 'fight'
  const config    = GATE_CONFIG[gateStyle] || DEFAULT_CONFIG
  const taskSlots = beat?.taskSlots ?? 3

  // ── Snapshot plan at mount — frozen so completed tasks don't disappear ────
  const [snapshot] = useState(() => {
    const plan     = storage.getPlan()
    const progress = storage.getPlanProgress()
    const arcIdx   = progress.currentArcIdx  ?? 0
    const weekIdx  = progress.currentWeekIdx ?? 0
    const allTasks = plan?.arcs?.[arcIdx]?.weeklyPlan?.[weekIdx]?.tasks || []
    const gateTasks = allTasks
      .map((task, i) => ({ task, taskIdx: i, key: `a${arcIdx}_w${weekIdx}_t${i}` }))
      .filter(({ key }) => !progress.tasksDone[key])
      .slice(0, taskSlots)
    return { arcIdx, weekIdx, gateTasks }
  })
  const { arcIdx, weekIdx, gateTasks } = snapshot

  const [completedKeys, setCompletedKeys] = useState(() => new Set())
  const [allDone,       setAllDone]       = useState(false)
  const [mounted,       setMounted]       = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  // If no tasks remain, pass through immediately
  useEffect(() => {
    if (gateTasks.length === 0) onComplete()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTaskComplete = useCallback((taskKey) => {
    setCompletedKeys(prev => {
      const next = new Set(prev)
      next.add(taskKey)
      if (next.size >= gateTasks.length) {
        setTimeout(() => {
          setAllDone(true)
          try { SoundEngine.chapterComplete() } catch (_) {}
        }, 280)
      }
      return next
    })
  }, [gateTasks.length])

  if (gateTasks.length === 0) return null

  const completedCount = completedKeys.size
  const remainingCount = gateTasks.length - completedCount

  return (
    <>
      {/* ── Backdrop: dims/blurs the story BG but keeps it visible ── */}
      <div style={{
        position:      'fixed', inset: 0, zIndex: 30,
        background:    `rgba(${config.bgRgb},0.72)`,
        backdropFilter:'blur(3px)',
        opacity:       mounted ? 1 : 0,
        transition:    'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* ── Gate panel — anchored to bottom ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:      'fixed', bottom: 0, left: 0, right: 0,
          zIndex:        31,
          maxHeight:     '82vh', overflowY: 'auto', scrollbarWidth: 'none',
          background:    `linear-gradient(to top, rgba(3,2,12,0.99) 0%, rgba(5,3,16,0.97) 100%)`,
          borderTop:     `1px solid rgba(${config.rgb},0.38)`,
          boxShadow:     '0 -10px 70px rgba(0,0,0,0.75)',
          opacity:       mounted ? 1 : 0,
          transform:     mounted ? 'translateY(0)' : 'translateY(16px)',
          transition:    'opacity 0.42s ease, transform 0.42s ease',
        }}
      >
        {/* Top glow line */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'2px',
          background:`linear-gradient(to right, transparent, rgba(${config.rgb},0.75), transparent)`,
          boxShadow:`0 0 14px rgba(${config.rgb},0.5)`,
          pointerEvents:'none',
        }} />

        <div style={{ padding:'clamp(0.9rem,1.7vh,1.4rem) clamp(1.4rem,5vw,5rem)' }}>

          {/* ── Header bar ── */}
          <div style={{
            display:'flex', alignItems:'center',
            gap:'0.65rem', marginBottom:'clamp(0.55rem,1vh,0.9rem)',
          }}>
            <span style={{
              fontSize:'1rem', lineHeight:1,
              filter:`drop-shadow(0 0 7px rgba(${config.rgb},0.8))`,
              color:`rgba(${config.rgb},1)`,
            }}>
              {config.icon}
            </span>
            <div style={{
              fontFamily:'"Cinzel",serif',
              fontSize:'clamp(0.44rem,0.54vw,0.58rem)',
              letterSpacing:'0.3em', textTransform:'uppercase',
              color:`rgba(${config.rgb},0.88)`,
            }}>
              {beat?.enemyName || config.label}
            </div>

            {/* Progress tracker — HP bar for fight, pips for others */}
            <div style={{ marginLeft:'auto' }}>
              {gateStyle === 'fight'
                ? <HealthBar total={gateTasks.length} remaining={remainingCount} />
                : <ProgressPips total={gateTasks.length} completed={completedCount} config={config} />
              }
            </div>
          </div>

          {/* ── Pause narrator ── */}
          {beat?.pauseNarrator && !allDone && (
            <p style={{
              fontFamily:'"Lora",serif', fontStyle:'italic',
              fontSize:'clamp(0.84rem,0.97vw,1.02rem)',
              color:'rgba(188,168,118,0.88)',
              lineHeight:1.78, margin:'0 0 clamp(0.65rem,1.2vh,1rem)',
            }}>
              {beat.pauseNarrator}
            </p>
          )}

          {/* ── Continue narrator (after all complete) ── */}
          {allDone && beat?.continueNarrator && (
            <p style={{
              fontFamily:'"Lora",serif', fontStyle:'italic',
              fontSize:'clamp(0.84rem,0.97vw,1.02rem)',
              color:'rgba(188,168,118,0.88)',
              lineHeight:1.78, margin:'0 0 clamp(0.65rem,1.2vh,1rem)',
              animation:'tgFadeIn 0.5s ease',
            }}>
              {beat.continueNarrator}
            </p>
          )}

          {/* ── Task list ── */}
          {!allDone && (
            <div style={{ display:'flex', flexDirection:'column', gap:'0.48rem', marginBottom:'clamp(0.7rem,1.3vh,1.1rem)' }}>
              {gateTasks.map(({ task, taskIdx, key }) => (
                <TaskItem
                  key={key}
                  task={task}
                  taskKey={key}
                  arcIdx={arcIdx}
                  weekIdx={weekIdx}
                  taskIdx={taskIdx}
                  config={config}
                  onComplete={handleTaskComplete}
                  isCompleted={completedKeys.has(key)}
                />
              ))}
            </div>
          )}

          {/* ── All complete — show result and continue button ── */}
          {allDone && (
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'flex-start',
              gap:'0.65rem', animation:'tgFadeIn 0.5s ease',
            }}>
              <div style={{
                fontFamily:'"Cinzel",serif',
                fontSize:'clamp(0.58rem,0.7vw,0.76rem)',
                letterSpacing:'0.28em', textTransform:'uppercase',
                color:`rgba(${config.rgb},0.95)`,
                display:'flex', alignItems:'center', gap:'0.5em',
              }}>
                ✦ {config.allClearText}
              </div>
              <button
                onClick={onComplete}
                style={{
                  fontFamily:'"Cinzel",serif',
                  fontSize:'clamp(0.6rem,0.72vw,0.78rem)',
                  letterSpacing:'0.24em', textTransform:'uppercase',
                  color:'rgba(218,185,88,0.97)',
                  background:'linear-gradient(135deg,rgba(201,168,76,0.16),rgba(150,115,40,0.09))',
                  border:'1px solid rgba(201,168,76,0.65)',
                  borderRadius:'2px',
                  padding:'0.74em 1.9em',
                  cursor:'pointer',
                  transition:'all 0.18s ease',
                  boxShadow:'0 0 22px rgba(201,168,76,0.14)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.22)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.9)'; e.currentTarget.style.boxShadow='0 0 36px rgba(201,168,76,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background='linear-gradient(135deg,rgba(201,168,76,0.16),rgba(150,115,40,0.09))'; e.currentTarget.style.borderColor='rgba(201,168,76,0.65)'; e.currentTarget.style.boxShadow='0 0 22px rgba(201,168,76,0.14)' }}
              >
                Continue the Chronicle
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes tgFlash {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes tgFadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </>
  )
}
