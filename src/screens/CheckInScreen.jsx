// ─── CheckInScreen.jsx ────────────────────────────────────────────────────────
// Vael's daily check-in. Fires once per day when the user has an active plan.
// If an API key is present: calls vaelCheckin() for a personalized AI response.
// Otherwise: selects one of the pre-written static check-in messages.
//
// Props: appState, navigate
// After completing: saves lastCheckin timestamp, navigates to MAIN_MENU.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { SCREENS } from '../App.jsx'
import { storage }   from '../lib/storage.js'
import { SoundEngine } from '../lib/audio.js'
import { PORTRAITS }  from '../data/story.js'
import { vaelCheckin } from '../lib/ai.js'

// ── Static Vael messages (no API key required) ────────────────────────────────
// Keyed by situation. Vael is direct, specific, never generic.
// Each has: vaelText (his dialogue) + microEvent (atmospheric narrator beat).

const STATIC_MESSAGES = {
  // First ever check-in
  first: {
    vael: "You came back. That is not nothing — most people who start do not come back on the second day. The first week is where the work either becomes a practice or becomes a memory of something you once tried. You are still in the first week. Keep going.",
    micro: "Outside the study window, the city wakes slowly. Smoke from the first morning fires. The road east catches the light before the square does.",
  },

  // Behind on tasks (less than half complete for the week)
  behind: {
    vael: "You are behind this week. I am not going to tell you it is fine — it is not fine, and you know that already. What I will tell you is that the week is not over. Recover what you can. If you cannot finish, finish what is possible and mark it clearly. The Chronicle records what you do, not what you intended.",
    micro: "A lamp burns low in the corridor. Not dark enough to matter. Not bright enough to be comfortable. The space between two states.",
  },

  // Streak broken or restarting
  restart: {
    vael: "The streak broke. That happens. The Archive has seen Seekers who have restarted thirty times and still completed the work. What ends the work is not breaking — it is not returning. You returned. Start the count again from today.",
    micro: "The eastern passage is cold before sunrise. Most Seekers use the southern door. The ones who use the eastern passage are the ones who arrived early enough to want the cold.",
  },

  // Low but active streak (1–2 days)
  low: {
    vael: "Two sessions. That is a beginning — not a habit yet, but not nothing either. A habit requires enough repetitions to become unremarkable. You are not there yet. Show up tomorrow and the day after and you will be.",
    micro: "The fragment case sits on the workbench where Maren left it. She has not opened it since the road. She will, eventually. Some things take the right kind of stillness.",
  },

  // Solid streak (3–6 days)
  mid: {
    vael: "You have been consistent. That is the harder thing — not the individual session, but coming back when the individual session was not good. The days when you come back despite resistance are the ones that matter most. They are also the easiest to skip.",
    micro: "Brek ran the perimeter again this morning. He said nothing about what he was working out. He never does until the answer comes.",
  },

  // Strong streak (7+ days)
  strong: {
    vael: "Seven days. Longer than most plans survive contact with the actual difficulty of the work. You are past the point where the plan is an aspiration. It is now a practice. That is a different thing. Treat it accordingly.",
    micro: "Dorath mapped three more routes east last night. She did not say why. She rarely explains her work until it is needed.",
  },

  // Ahead of pace (all tasks done, week complete)
  complete: {
    vael: "The week is done. Everything marked. You can advance when you are ready — but take the day first. The method asks for consistent work, not rushed work. Sit with what you completed before you move to the next.",
    micro: "The study holds a particular quality of quiet in the middle of the day. Not silence — there is always something moving outside — but a quality of attention that the morning and evening do not have.",
  },
}

function selectStaticMessage(progress, plan) {
  const { streak = 0, completedWeeks = 0, tasksDone = {} } = progress
  const arc     = plan?.arcs?.[progress.currentArcIdx || 0]
  const week    = arc?.weeklyPlan?.[progress.currentWeekIdx || 0]
  const tasks   = week?.tasks?.length || 1
  const weekPrefix = `a${progress.currentArcIdx || 0}_w${progress.currentWeekIdx || 0}_t`
  const doneSoFar  = Object.keys(tasksDone).filter(k => k.startsWith(weekPrefix)).length
  const weekFrac   = doneSoFar / tasks

  // First check-in ever
  if (!storage.getDailyState().lastCheckin) return STATIC_MESSAGES.first
  // Streak at 0 (broke)
  if (streak === 0) return STATIC_MESSAGES.restart
  // All tasks done
  if (weekFrac >= 1) return STATIC_MESSAGES.complete
  // Behind (< 50% of the week done and it's not week start)
  if (doneSoFar > 0 && weekFrac < 0.45) return STATIC_MESSAGES.behind
  // By streak level
  if (streak >= 7)  return STATIC_MESSAGES.strong
  if (streak >= 3)  return STATIC_MESSAGES.mid
  if (streak === 0) return STATIC_MESSAGES.restart
  return STATIC_MESSAGES.low
}

// ── Parse AI response ─────────────────────────────────────────────────────────
// Strips <micro_event>...</micro_event> from text, returns { vaelText, microEvent }.
function parseVaelResponse(raw) {
  const match = raw.match(/<micro_event>([\s\S]*?)<\/micro_event>/i)
  const microEvent = match ? match[1].trim() : null
  const vaelText   = raw.replace(/<micro_event>[\s\S]*?<\/micro_event>/gi, '').trim()
  return { vaelText, microEvent }
}

// ── Typewriter hook (simplified — no audio, returns state only) ───────────────
function useTypewriter(text, speed = 18) {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)
  const timerRef = useRef(null)

  const complete = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDisplayed(text || '')
    setDone(true)
  }, [text])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDisplayed(''); setDone(false)
    const t = text || ''
    if (!t) { setDone(true); return }
    let idx = 0
    const tick = () => {
      idx++
      try { SoundEngine.typeChar() } catch (_) {}
      if (idx >= t.length) {
        setDisplayed(t); setDone(true)
      } else {
        setDisplayed(t.slice(0, idx))
        timerRef.current = setTimeout(tick, speed)
      }
    }
    timerRef.current = setTimeout(tick, speed)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, done, complete }
}

// ── Portrait ──────────────────────────────────────────────────────────────────
function VaelPortrait({ expr = 'neutral', visible }) {
  const map = PORTRAITS['vael']
  const src = map?.[expr] || map?.neutral || null
  const [failed, setFailed] = useState(false)

  if (!src || failed) return null
  return (
    <div style={{
      position:      'fixed',
      top:           0,
      bottom:        'clamp(22vh,27vh,30vh)',
      left:          'clamp(0.4rem,1.8vw,3rem)',
      display:       'flex',
      alignItems:    'flex-end',
      zIndex:        10,
      pointerEvents: 'none',
      opacity:       visible ? 1 : 0,
      transition:    'opacity 0.7s ease',
    }}>
      {/* Warm underlight */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       '-10%',
        width:      '120%',
        height:     '35%',
        background: 'radial-gradient(ellipse at 20% 100%, rgba(201,168,76,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex:     1,
      }} />
      <img
        src={src}
        alt="Vael"
        draggable={false}
        onError={() => setFailed(true)}
        style={{
          width:          'clamp(200px,30vw,420px)',
          height:         'auto',
          maxHeight:      '100%',
          objectFit:      'contain',
          objectPosition: 'bottom center',
          display:        'block',
          position:       'relative',
          zIndex:         2,
          WebkitUserDrag: 'none',
        }}
      />
    </div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function CheckInScreen({ appState, navigate }) {
  const plan     = storage.getPlan()
  const progress = storage.getPlanProgress()
  const settings = storage.getSettings()
  const { playerName } = storage.getPlayerIdentity()

  // Loading / content states
  const [vaelText,    setVaelText]    = useState('')
  const [microEvent,  setMicroEvent]  = useState('')
  const [loading,     setLoading]     = useState(true)
  const [loadErr,     setLoadErr]     = useState(null)
  const [portraitIn,  setPortraitIn]  = useState(false)
  const [microOpen,   setMicroOpen]   = useState(false)

  const { displayed, done, complete } = useTypewriter(vaelText)

  // ── Load Vael's message on mount ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    async function loadMessage() {
      // Try AI first if key is present
      if (settings.apiKey) {
        try {
          const arc         = plan?.arcs?.[progress.currentArcIdx || 0]
          const week        = arc?.weeklyPlan?.[progress.currentWeekIdx || 0]
          const weekPrefix  = `a${progress.currentArcIdx || 0}_w${progress.currentWeekIdx || 0}_t`
          const doneSoFar   = Object.keys(progress.tasksDone || {}).filter(k => k.startsWith(weekPrefix)).length
          const daily       = storage.getDailyState()

          const ctx = {
            playerName,
            character:              settings.character || 'kael',
            currentAct:             1,
            currentWeek:            (progress.completedWeeks || 0) + 1,
            tasksCompletedThisWeek: doneSoFar,
            tasksExpectedThisWeek:  week?.tasks?.length || 1,
            streak:                 progress.streak || 0,
            currentArcTitle:        arc?.title || 'The First Arc',
            lastCheckin:            daily.lastCheckin || null,
          }

          const result = await vaelCheckin(settings.apiKey, ctx)
          if (cancelled) return

          if (result.ok) {
            const { vaelText: vt, microEvent: me } = parseVaelResponse(result.content)
            setVaelText(vt)
            setMicroEvent(me || '')
          } else {
            // AI failed — fall back to static
            const msg = selectStaticMessage(progress, plan)
            setVaelText(msg.vael)
            setMicroEvent(msg.micro)
          }
        } catch (_) {
          // Import or call failed — use static
          const msg = selectStaticMessage(progress, plan)
          setVaelText(msg.vael)
          setMicroEvent(msg.micro)
        }
      } else {
        // No API key — always use static
        const msg = selectStaticMessage(progress, plan)
        setVaelText(msg.vael)
        setMicroEvent(msg.micro)
      }

      if (!cancelled) {
        setLoading(false)
        setTimeout(() => setPortraitIn(true), 120)
      }
    }

    loadMessage()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Show micro-event block once dialogue is done
  useEffect(() => {
    if (done && microEvent) {
      setTimeout(() => setMicroOpen(true), 600)
    }
  }, [done, microEvent])

  // ── Handle continue ───────────────────────────────────────────────────────
  const handleContinue = useCallback(() => {
    try { SoundEngine.pageTurn() } catch (_) {}
    // Save check-in timestamp
    const daily = storage.getDailyState()
    const today = new Date().toISOString().slice(0, 10)
    storage.saveDailyState({ ...daily, lastCheckin: today })
    navigate(SCREENS.MAIN_MENU)
  }, [navigate])

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      onClick={!done && !loading ? complete : undefined}
      style={{
        position:  'fixed', inset: 0, zIndex: 200,
        background: '#03020c',
        cursor:    !done && !loading ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {/* Atmospheric background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position:           'absolute', inset: 0,
          backgroundImage:    `url('${import.meta.env.BASE_URL}assets/images/ui/onboarding-bg.jpg')`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             'brightness(0.2) saturate(0.5)',
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 35% 55%, transparent 15%, rgba(2,1,10,0.75) 100%)',
        }} />
        {/* Top-to-bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(2,1,10,0.7) 0%, transparent 25%, transparent 65%, rgba(2,1,10,0.9) 100%)',
        }} />
        {/* Gold top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(218,182,76,0.35), transparent)',
        }} />
      </div>

      {/* Vael portrait */}
      <VaelPortrait expr="thoughtful" visible={portraitIn && !loading} />

      {/* ── Dialogue area ───────────────────────────────────────────────── */}
      <div style={{
        position:    'fixed',
        bottom:      0, left: 0, right: 0,
        zIndex:      20,
        padding:     'clamp(0.8rem,1.5vh,1.2rem) clamp(1rem,2.5vw,2.5rem)',
        background:  'linear-gradient(to top, rgba(3,2,12,0.98) 0%, rgba(3,2,12,0.92) 70%, transparent 100%)',
      }}>

        {loading ? (
          /* Loading state */
          <div style={{
            minHeight:   '140px',
            display:     'flex',
            alignItems:  'center',
            padding:     'clamp(1rem,1.8vw,1.5rem)',
            background:  'rgba(5,4,16,0.82)',
            border:      '1px solid rgba(155,122,38,0.3)',
            borderLeft:  '3px solid rgba(201,168,76,0.5)',
            borderRadius:'2px',
          }}>
            <div style={{
              fontFamily:  '"Lora", serif',
              fontStyle:   'italic',
              fontSize:    'clamp(0.8rem,0.9vw,0.95rem)',
              color:       'rgba(185,165,120,0.6)',
              letterSpacing: '0.02em',
            }}>
              Vael is reviewing your progress...
            </div>
          </div>
        ) : loadErr ? (
          /* Error state */
          <div style={{
            padding:    'clamp(1rem,1.8vw,1.5rem)',
            background: 'rgba(5,4,16,0.85)',
            border:     '1px solid rgba(155,60,40,0.4)',
            borderRadius:'2px',
            color:      'rgba(220,150,120,0.85)',
            fontFamily: '"Lora", serif',
            fontSize:   'clamp(0.8rem,0.9vw,0.92rem)',
          }}>
            {loadErr} — <button
              onClick={handleContinue}
              style={{ color: 'rgba(218,182,76,0.85)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Cinzel",serif', fontSize: '0.85em', letterSpacing: '0.12em' }}
            >Continue</button>
          </div>
        ) : (
          <>
            {/* ── Vael name tag ─────────────────────────────────────────── */}
            <div style={{ marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{
                width: '6px', height: '6px',
                background: 'rgba(218,182,76,0.85)',
                borderRadius: '50%',
                boxShadow: '0 0 8px rgba(218,182,76,0.6)',
              }} />
              <span style={{
                fontFamily:   '"Cinzel", serif',
                fontSize:     'clamp(0.52rem,0.62vw,0.68rem)',
                letterSpacing:'0.28em',
                textTransform:'uppercase',
                color:        'rgba(218,182,76,0.85)',
              }}>
                Vael
              </span>
            </div>

            {/* ── Dialogue text ──────────────────────────────────────────── */}
            <div style={{
              minHeight:   'clamp(80px,12vh,120px)',
              maxHeight:   '30vh',
              overflowY:   'auto',
              padding:     'clamp(0.9rem,1.4vw,1.2rem) clamp(1rem,1.5vw,1.4rem)',
              background:  'rgba(5,4,16,0.82)',
              border:      '1px solid rgba(155,122,38,0.3)',
              borderLeft:  '3px solid rgba(201,168,76,0.55)',
              borderRadius:'2px',
              marginBottom: microOpen && microEvent ? '0.7rem' : '0.9rem',
            }}>
              <p style={{
                fontFamily: '"Lora", serif',
                fontSize:   'clamp(0.85rem,0.98vw,1.05rem)',
                color:      'rgba(225,205,165,0.95)',
                lineHeight: 1.72,
                margin:     0,
                whiteSpace: 'pre-wrap',
              }}>
                {displayed}
                {!done && (
                  <span style={{
                    display:    'inline-block',
                    width:      '2px',
                    height:     '1em',
                    background: 'rgba(218,182,76,0.8)',
                    marginLeft: '2px',
                    animation:  'ciCaret 0.75s step-end infinite',
                    verticalAlign: 'text-bottom',
                  }} />
                )}
              </p>
            </div>

            {/* ── Micro-event (narrator block) ───────────────────────────── */}
            {microOpen && microEvent && (
              <div style={{
                padding:     'clamp(0.7rem,1.1vw,0.95rem) clamp(1rem,1.4vw,1.3rem)',
                background:  'rgba(8,6,18,0.75)',
                border:      '1px solid rgba(120,100,55,0.2)',
                borderTop:   '1px solid rgba(180,150,70,0.18)',
                borderRadius:'2px',
                marginBottom:'0.9rem',
                opacity:     microOpen ? 1 : 0,
                transform:   microOpen ? 'translateY(0)' : 'translateY(6px)',
                transition:  'opacity 0.55s ease, transform 0.55s ease',
              }}>
                <p style={{
                  fontFamily: '"Lora", serif',
                  fontStyle:  'italic',
                  fontSize:   'clamp(0.78rem,0.88vw,0.92rem)',
                  color:      'rgba(180,162,128,0.72)',
                  lineHeight: 1.68,
                  margin:     0,
                }}>
                  {microEvent}
                </p>
              </div>
            )}

            {/* ── Action row ─────────────────────────────────────────────── */}
            {done && (
              <div style={{
                display:        'flex',
                justifyContent: 'flex-end',
                gap:            '0.65rem',
                opacity:        done ? 1 : 0,
                transition:     'opacity 0.4s ease',
              }}>
                <button
                  onClick={handleContinue}
                  style={{
                    fontFamily:   '"Cinzel", serif',
                    fontSize:     'clamp(0.52rem,0.6vw,0.66rem)',
                    letterSpacing:'0.22em',
                    textTransform:'uppercase',
                    color:        'rgba(232,210,140,0.95)',
                    background:   'rgba(201,168,76,0.1)',
                    border:       '1px solid rgba(201,168,76,0.52)',
                    borderRadius: '2px',
                    padding:      '0.6em 1.6em',
                    cursor:       'pointer',
                    transition:   'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.18)'; e.currentTarget.style.borderColor='rgba(218,182,76,0.78)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(201,168,76,0.1)';  e.currentTarget.style.borderColor='rgba(201,168,76,0.52)' }}
                >
                  Continue to the Study
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Top bar — title + back */}
      <div style={{
        position:  'fixed', top: 0, left: 0, right: 0,
        padding:   'clamp(0.9rem,1.5vh,1.3rem) clamp(1.2rem,2.5vw,2.5rem)',
        display:   'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex:    30,
        background:'linear-gradient(to bottom, rgba(3,2,12,0.88) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <div>
          <div style={{
            fontFamily:   '"Cinzel", serif',
            fontSize:     'clamp(0.44rem,0.52vw,0.58rem)',
            letterSpacing:'0.32em',
            textTransform:'uppercase',
            color:        'rgba(155,122,38,0.6)',
            marginBottom: '0.18rem',
          }}>
            Daily Check-In
          </div>
          <div style={{
            fontFamily:  '"Cinzel Decorative", serif',
            fontSize:    'clamp(0.78rem,1vw,1.1rem)',
            color:       'rgba(218,182,76,0.82)',
            letterSpacing: '0.05em',
          }}>
            Vael's Study
          </div>
        </div>
        <button
          onClick={() => {
            // Mark as checked in so the auto-trigger doesn't fire again today
            const daily = storage.getDailyState()
            const today = new Date().toISOString().slice(0, 10)
            storage.saveDailyState({ ...daily, lastCheckin: today })
            navigate(SCREENS.MAIN_MENU)
          }}
          style={{
            pointerEvents: 'all',
            display:       'flex', alignItems: 'center', gap: '0.4rem',
            background:    'rgba(10,8,18,0.75)',
            border:        '1px solid rgba(155,122,38,0.38)',
            borderRadius:  '2px',
            padding:       '0.45em 0.9em 0.45em 0.7em',
            cursor:        'pointer',
            transition:    'all 0.16s ease',
            backdropFilter:'blur(6px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.6)'; e.currentTarget.style.background='rgba(201,168,76,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(155,122,38,0.38)'; e.currentTarget.style.background='rgba(10,8,18,0.75)' }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="rgba(218,182,76,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(0.5rem,0.58vw,0.64rem)', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(200,172,96,0.8)' }}>
            Skip
          </span>
        </button>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes ciCaret {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
