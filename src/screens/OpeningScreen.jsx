import React, { useState, useEffect, useRef, useCallback } from 'react'
import { SCREENS } from '../App.jsx'
import { SoundEngine, AudioManager, PROLOGUE_SFX_GAINS } from '../lib/audio.js'

// ─── OpeningScreen — cinematic prologue ───────────────────────────────────────
//
// 14 sections, one image per section. VO drives timing — text speed matches VO
// duration, section advances only when VO finishes. No per-section skip.
// Only a "Skip Prologue" button skips the whole thing.
//
// VO files:  public/assets/audio/vo/prologue/prologue_01.mp3 … prologue_14.mp3
// Images:    public/assets/images/cutscenes/
// ─────────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL
const IMG  = (f) => `${BASE}assets/images/cutscenes/${f}`
const VOP  = (f) => `${BASE}assets/audio/vo/prologue/${f}`
const SFX  = (f) => f ? `${BASE}assets/audio/sfx/prologue/${f}` : null

// ─── Per-section SFX files — place in public/assets/audio/sfx/prologue/ ──────
//
// LOOPING AMBIENT (plays quietly under VO for the whole section):
const SECTION_SFX = [
  'sfx_quill_writing.mp3',  // 0  scholars in stone hall — quill on parchment   [NEW FILE]
  'sfx_quill_writing.mp3',  // 1  scholar's worktable, investigation             [NEW FILE]
  'sfx_stone_echo.mp3',     // 2  great sealing chamber — stone resonance
  null,                      // 3  dawn crossroads outdoor — synth ambient only
  'sfx_fire_crackle.mp3',   // 4  archive on fire
  'sfx_fire_crackle.mp3',   // 5  community fire outside archive
  'sfx_crowd_murmur.mp3',   // 6  crowded reading halls, centuries of scholars
  'sfx_cold_wind.mp3',      // 7  Voss on the hill — cold ominous wind
  'sfx_cold_wind.mp3',      // 8  vast empty cold field
  'sfx_stone_echo.mp3',     // 9  dark tendrils through archive stone
  'sfx_stone_echo.mp3',     // 10 corrupted hall, foundation collapsed
  'sfx_quill_writing.mp3',  // 11 researcher writing urgently                   [NEW FILE]
  null,                      // 12 room of identical books — near silence
  'sfx_dawn_birds.mp3',     // 13 dawn doorway looking outward
]

// ONE-SHOT IMPACTS (play once at section start, no loop, puntuate the cut):
// NEW FILES NEEDED (download CC0 from freesound.org/Pixabay):
//   sfx_impact_bell.mp3   — single deep resonant bell strike, ~1.5s
//   sfx_impact_thud.mp3   — single low ominous drum hit, ~1s
//   sfx_impact_crack.mp3  — stone crack/split, ~1s
const SECTION_IMPACT_SFX = [
  null,                      // 0
  null,                      // 1
  'sfx_impact_bell.mp3',    // 2  "The Codex" — resonant bell marks the revelation
  null,                      // 3
  null,                      // 4  fire crackle loop is enough
  null,                      // 5
  null,                      // 6
  'sfx_impact_thud.mp3',    // 7  "Then Voss came." — single low drum hit
  null,                      // 8
  null,                      // 9
  'sfx_impact_crack.mp3',   // 10 "rot already in the foundation" — stone splits
  null,                      // 11
  null,                      // 12
  null,                      // 13
]

// ─── Per-section atmospheric definitions ──────────────────────────────────────
// Each section gets noise (filtered brown noise) + optional oscillator drone.
// All synthesized via Web Audio API — zero additional audio files required.
// vol = master gain (kept low so VO remains clear)
// fType/fFreq/fQ = noise filter character
// noise = noise layer multiplier
// oFreq / oGain / oType = optional drone oscillator
const SECTION_ATMOS = [
  /* 0  scholars, golden age   */ { vol:0.08, fType:'bandpass', fFreq:200, fQ:0.7, noise:0.95, oFreq:null },
  /* 1  deep investigation     */ { vol:0.07, fType:'bandpass', fFreq:150, fQ:0.8, noise:0.90, oFreq:62,  oGain:0.18 },
  /* 2  great sealing ritual   */ { vol:0.10, fType:'bandpass', fFreq:90,  fQ:1.3, noise:0.50, oFreq:55,  oGain:0.55 },
  /* 3  dawn crossroads outdoor*/ { vol:0.06, fType:'highpass', fFreq:450, fQ:0.5, noise:0.85, oFreq:null },
  /* 4  archive on fire        */ { vol:0.12, fType:'lowpass',  fFreq:55,  fQ:1.8, noise:1.00, oFreq:38,  oGain:0.60, oType:'sawtooth' },
  /* 5  community fire, night  */ { vol:0.08, fType:'bandpass', fFreq:320, fQ:0.5, noise:0.95, oFreq:null },
  /* 6  crowded halls, centuries*/ { vol:0.08, fType:'bandpass', fFreq:280, fQ:0.6, noise:0.95, oFreq:88,  oGain:0.12 },
  /* 7  Voss, cold scar in sky */ { vol:0.12, fType:'bandpass', fFreq:100, fQ:1.3, noise:0.75, oFreq:45,  oGain:0.42 },
  /* 8  vast empty cold field  */ { vol:0.06, fType:'highpass', fFreq:550, fQ:0.4, noise:0.88, oFreq:null },
  /* 9  rot through stone walls*/ { vol:0.09, fType:'bandpass', fFreq:100, fQ:1.0, noise:0.85, oFreq:42,  oGain:0.28 },
  /* 10 foundation collapsed   */ { vol:0.11, fType:'lowpass',  fFreq:70,  fQ:1.6, noise:0.60, oFreq:44,  oGain:0.50 },
  /* 11 researcher, candlelight*/ { vol:0.06, fType:'bandpass', fFreq:220, fQ:0.8, noise:0.80, oFreq:68,  oGain:0.15 },
  /* 12 room of books, silence */ { vol:0.04, fType:'bandpass', fFreq:180, fQ:0.6, noise:0.40, oFreq:null },
  /* 13 dawn doorway, open road*/ { vol:0.07, fType:'highpass', fFreq:700, fQ:0.4, noise:0.80, oFreq:null },
]

// ─── Prologue Ambient Synthesizer ─────────────────────────────────────────────
class PrologueAmbient {
  constructor() {
    this._ctx        = null
    this._masterGain = null
    this._nodes      = []
    this._tid        = null
  }

  _getCtx() {
    if (!this._ctx) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      this._ctx = new AC()
    }
    if (this._ctx.state === 'suspended') this._ctx.resume().catch(() => {})
    return this._ctx
  }

  _brownNoise(ctx) {
    const sr  = ctx.sampleRate
    const buf = ctx.createBuffer(1, sr * 4, sr)
    const d   = buf.getChannelData(0)
    let last  = 0
    for (let i = 0; i < d.length; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
      d[i] = last * 3.5
    }
    const src = ctx.createBufferSource()
    src.buffer = buf; src.loop = true
    return src
  }

  stop() {
    clearTimeout(this._tid)
    const ctx = this._ctx; const mg = this._masterGain
    if (ctx && mg) {
      const now = ctx.currentTime
      mg.gain.cancelScheduledValues(now)
      mg.gain.setValueAtTime(mg.gain.value, now)
      mg.gain.linearRampToValueAtTime(0, now + 0.85)
    }
    const stale = this._nodes
    this._nodes = []; this._masterGain = null
    this._tid = setTimeout(() => {
      stale.forEach(n => { try { n.stop?.(); n.disconnect?.() } catch (_) {} })
    }, 1000)
  }

  play(idx) {
    this.stop()
    const ctx = this._getCtx()
    if (!ctx) return
    const def = SECTION_ATMOS[idx]
    if (!def) return
    clearTimeout(this._tid)
    this._tid = setTimeout(() => {
      const master = ctx.createGain()
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.gain.linearRampToValueAtTime(def.vol, ctx.currentTime + 2.0)
      master.connect(ctx.destination)
      this._masterGain = master
      this._nodes = [master]

      // Noise layer — filtered brown noise for texture
      const noise  = this._brownNoise(ctx)
      const filter = ctx.createBiquadFilter()
      filter.type = def.fType; filter.frequency.value = def.fFreq; filter.Q.value = def.fQ
      const ng = ctx.createGain(); ng.gain.value = def.noise
      noise.connect(filter); filter.connect(ng); ng.connect(master)
      noise.start()
      this._nodes.push(noise, filter, ng)

      // Oscillator layer — droning hum for atmospheric sections
      if (def.oFreq) {
        const osc = ctx.createOscillator()
        osc.type = def.oType || 'sine'; osc.frequency.value = def.oFreq
        // Slow LFO gives the drone organic warmth
        const lfo = ctx.createOscillator(); const lfog = ctx.createGain()
        lfo.frequency.value = 0.12 + Math.random() * 0.08
        lfog.gain.value     = def.oFreq * 0.014
        lfo.connect(lfog); lfog.connect(osc.frequency)
        const og = ctx.createGain(); og.gain.value = def.oGain ?? 0.3
        osc.connect(og); og.connect(master)
        lfo.start(); osc.start()
        this._nodes.push(osc, og, lfo, lfog)
      }
    }, 380)
  }

  destroy() {
    this.stop()
    setTimeout(() => { try { this._ctx?.close() } catch (_) {} }, 1500)
  }
}

const PROLOGUE = [
  { image: IMG('001_bg_ancient_world_map.png'),                    voFile: VOP('prologue_01.mp3'), text: 'Before the breaking, there were those who understood what knowledge truly was.',                                                                                          pause: 600 },
  { image: IMG('006_bg_great_war_scholar_map.png'),                voFile: VOP('prologue_02.mp3'), text: 'Not facts inscribed on parchment. Not names of kings, or dates of wars. Something older. A way of seeing that cut beneath the surface of all things.',                 pause: 700 },
  { image: IMG('015_bg_great_sealing.png'),                        voFile: VOP('prologue_03.mp3'), text: 'The Vraen called it the Codex. The architecture of understanding itself.',                                                                                               pause: 600 },
  { image: IMG('013_bg_races_unite_overview.png'),                 voFile: VOP('prologue_04.mp3'), text: 'They encoded it in fragments. Not one text, but many, scattered by design. Preserved across dozens of hands, in dozens of places.',                                      pause: 700 },
  { image: IMG('010_bg_corruption_explosion.png'),                 voFile: VOP('prologue_05.mp3'), text: 'So that no single fire could erase it.',                                                                                                                                 pause: 600 },
  { image: IMG('021_bg_festival_family_fire.png'),                 voFile: VOP('prologue_06.mp3'), text: 'The Archive was built to hold what survived.',                                                                                                                           pause: 600 },
  { image: IMG('070_bg_festival_fire_late_night.png'),             voFile: VOP('prologue_07.mp3'), text: 'For six centuries it held. Scholars came. Seekers came. Some found what they were looking for. Others never understood what they had found.',                            pause: 700 },
  { image: IMG('033_bg_voss_watching_streak.png'),                 voFile: VOP('prologue_08.mp3'), text: 'Then Voss came.',                                                                                                                                                        pause: 3200 },
  { image: IMG('034_bg_cold_field_far.png'),                       voFile: VOP('prologue_09.mp3'), text: 'Not with soldiers. Not with fire.',                                                                                                                                      pause: 600 },
  { image: IMG('035_bg_cold_field_medium.png'),                    voFile: VOP('prologue_10.mp3'), text: 'With patience. With slow, careful influence that reached into the Archive\'s inner sanctum, and took root like rot in stone.',                                           pause: 700 },
  { image: IMG('018_bg_corrupted_throne_room.png'),                voFile: VOP('prologue_11.mp3'), text: 'By the time anyone understood what was happening, the rot was already in the foundation.',                                                                               pause: 700 },
  { image: IMG('036_bg_barens_settlement_gate.png'),               voFile: VOP('prologue_12.mp3'), text: 'One researcher saw it first. Left a journal in the copying house, on the east side of the district.',                                                                    pause: 600 },
  { image: IMG('072_bg_hidden_chamber_relic_close.png'),           voFile: VOP('prologue_13.mp3'), text: 'Left a message inside a copy of a text that no one important would ever think to open.',                                                                                 pause: 600 },
  { image: IMG('073_bg_settlement_courtyard_first_morning.png'),   voFile: VOP('prologue_14.mp3'), text: 'Someone will find it. The question is what they decide to do with what they find. That begins now.',                                                                     pause: 0, final: true },
]

// ─── Voss section index ───────────────────────────────────────────────────────
const VOSS_IDX = 7  // PROLOGUE[7] — "Then Voss came."

// Synthesise a single thunder crack via Web Audio — no audio file needed.
// vol 0–1: peak loudness. Lower = distant, higher = close strike.
function playVossThunder(vol = 0.4) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    const sr  = ctx.sampleRate
    const dur = 1.8
    const buf = ctx.createBuffer(1, Math.floor(sr * dur), sr)
    const d   = buf.getChannelData(0)
    let last  = 0
    for (let i = 0; i < d.length; i++) {
      last  = (last + 0.022 * (Math.random() * 2 - 1)) / 1.02
      d[i]  = last * 3.5
    }
    const src    = ctx.createBufferSource(); src.buffer = buf
    const filter = ctx.createBiquadFilter()
    filter.type  = 'lowpass'; filter.frequency.value = 90; filter.Q.value = 0.9
    const gain   = ctx.createGain()
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + dur)
    src.connect(filter); filter.connect(gain); gain.connect(ctx.destination)
    src.start()
    setTimeout(() => { try { ctx.close() } catch (_) {} }, (dur + 0.5) * 1000)
  } catch (_) {}
}

const IMG_FADE_MS     = 1000
const DEFAULT_CHAR_MS = 28
const MIN_CHAR_MS     = 10
const MAX_CHAR_MS     = 65

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles({ sectionIdx }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const c   = canvasRef.current
    if (!c) return
    c.width   = window.innerWidth
    c.height  = window.innerHeight
    const ctx = c.getContext('2d')
    const pts = Array.from({ length: 28 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.35 + 0.08),
      r: Math.random() * 1.8 + 0.4,
      life: Math.random() * 200,
      maxLife: 180 + Math.random() * 220,
      warm: Math.random() > 0.35,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life++
        if (p.life > p.maxLife || p.y < -10) {
          Object.assign(p, { x: Math.random() * c.width, y: c.height + 10, life: 0, maxLife: 180 + Math.random() * 220 })
          return
        }
        const t = p.life / p.maxLife
        const a = Math.sin(t * Math.PI) * (p.warm ? 0.55 : 0.35)
        if (a < 0.02) return
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5)
        gr.addColorStop(0,   p.warm ? `rgba(235,195,100,${a})` : `rgba(255,248,215,${a})`)
        gr.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = gr; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [sectionIdx])
  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />
  )
}

// ─── Typed line ───────────────────────────────────────────────────────────────
function TypedLine({ text, charDelay, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false
    let idx = 0
    setDisplayed('')
    setDone(false)
    let lastTime = null
    let raf
    const tick = (now) => {
      if (cancelRef.current) return
      if (lastTime === null) lastTime = now
      if (now - lastTime >= charDelay) {
        lastTime = now
        idx++
        // typewriter click every 2nd non-space char
        const ch = text[idx - 1]
        if (ch && ch !== ' ' && idx % 2 === 0) { try { SoundEngine.typeChar() } catch (_) {} }
        if (idx <= text.length) setDisplayed(text.slice(0, idx))
        if (idx >= text.length) { setDone(true); onDone(); return }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelRef.current = true; cancelAnimationFrame(raf) }
  }, [text, charDelay]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <p style={{
      fontFamily: '"Lora", serif', fontStyle: 'italic',
      fontSize:   'clamp(1.05rem, 1.22vw, 1.32rem)',
      lineHeight: 1.9, color: 'rgba(220,200,158,0.97)', margin: 0,
      textShadow: '0 2px 20px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,0.95)',
      textAlign: 'center',
    }}>
      {displayed}
      {!done && (
        <span style={{ display: 'inline-block', width: '1px', height: '1em', verticalAlign: 'text-bottom', background: 'rgba(201,168,76,0.65)', marginLeft: '2px', animation: 'opCaret 0.9s step-end infinite' }} />
      )}
    </p>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OpeningScreen({ appState, navigate }) {
  const [mounted,     setMounted]     = useState(false)
  const [sectionIdx,  setSectionIdx]  = useState(0)
  const [charDelay,   setCharDelay]   = useState(DEFAULT_CHAR_MS)
  const [typing,      setTyping]      = useState(false)
  const [showContinue,setShowContinue]= useState(false)
  const [exiting,     setExiting]     = useState(false)

  // Two-layer crossfade
  const [imgA, setImgA] = useState(PROLOGUE[0].image)
  const [imgB, setImgB] = useState(PROLOGUE[1]?.image ?? null)
  const [showB,setShowB]= useState(false)

  // Zoom key — changes each section to restart Ken Burns
  const [zoomKey, setZoomKey] = useState(0)

  // panConfig: dur is the VO-derived duration; approvedIdx must match sectionIdx
  // before the animation runs. This prevents starting with a wrong duration and
  // prevents the restart artifact when panDur updates mid-section.
  const [panConfig, setPanConfig] = useState({ dur: 20, approvedIdx: -1 })

  // Derived — true only when this section's own duration has been approved
  const panReady = panConfig.approvedIdx === sectionIdx

  const waitRef      = useRef(null)
  const voRef        = useRef(null)
  const ambRef       = useRef(null)
  const sfxRef       = useRef(null)
  const vossLightRef = useRef(null)   // direct-DOM lightning overlay
  const vossTimerRef = useRef([])     // cleanup handles
  const sfxFileRef   = useRef(null)   // tracks current looping SFX key — avoids restart when same file continues
  const dest         = appState?.afterPrologue || SCREENS.AUTH

  const clearWait = () => { if (waitRef.current) clearTimeout(waitRef.current) }

  // ── Stop VO + ambient + SFX on unmount ───────────────────────────────────
  useEffect(() => () => {
    clearWait()
    if (voRef.current) { voRef.current.pause(); voRef.current = null }
    ambRef.current?.destroy()
    if (sfxRef.current) { sfxRef.current.pause(); sfxRef.current = null }
  }, [])

  // ── Voss lightning — direct-DOM flashes + synthesised thunder ───────────────
  useEffect(() => {
    vossTimerRef.current.forEach(clearTimeout)
    vossTimerRef.current = []
    if (sectionIdx !== VOSS_IDX) {
      // Ensure overlay is invisible when not on Voss section
      if (vossLightRef.current) vossLightRef.current.style.opacity = 0
      return
    }

    const el = vossLightRef.current
    const timers = []

    // Helper: flash the overlay to `peak` opacity, hold `holdMs`, echo-flash, then fade.
    // Direct DOM manipulation avoids React re-render latency for tight timing.
    const strike = (delay, peak, holdMs) => {
      timers.push(setTimeout(() => {
        if (el) el.style.opacity = peak
        playVossThunder(peak * 0.65)
        timers.push(setTimeout(() => { if (el) el.style.opacity = 0 }, holdMs))
        // Second echo flash ~100ms after main flash fades
        timers.push(setTimeout(() => {
          if (el) el.style.opacity = peak * 0.55
          timers.push(setTimeout(() => { if (el) el.style.opacity = 0 }, Math.round(holdMs * 0.65)))
        }, holdMs + 95))
      }, delay))
    }

    // Three strikes: first as the VO plays, second in the pause, third biggest near the end
    strike(650,  0.58, 55)   // strike 1 — distant
    strike(1550, 0.70, 65)   // strike 2 — closer
    strike(3000, 0.88, 80)   // strike 3 — right overhead

    vossTimerRef.current = timers
    return () => timers.forEach(clearTimeout)
  }, [sectionIdx])

  // ── Cross-fade to a new image ──────────────────────────────────────────────
  const crossfadeTo = useCallback((newSrc) => {
    if (showB) { setImgA(newSrc); setShowB(false) }
    else       { setImgB(newSrc); setShowB(true)  }
    setZoomKey(k => k + 1)
  }, [showB])

  // ── Advance to next section ────────────────────────────────────────────────
  const advanceTo = useCallback((nextIdx) => {
    clearWait()
    const next = PROLOGUE[nextIdx]
    // crossfadeTo + setSectionIdx in the same render so the new div mounts
    // with the correct sectionIdx — panReady will be false until this section's
    // own VO metadata fires and sets approvedIdx = nextIdx.
    crossfadeTo(next.image)
    setSectionIdx(nextIdx)
    setTyping(false)
    waitRef.current = setTimeout(() => startSection(nextIdx), 200)
  }, [crossfadeTo]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Start a section: load VO, compute char delay, begin typing ─────────────
  const startSection = useCallback((idx) => {
    const section = PROLOGUE[idx]
    if (voRef.current) { voRef.current.pause(); voRef.current = null }
    // Start per-section atmospheric ambient
    ambRef.current?.play(idx)

    // One-shot impact SFX — fires immediately on cut, no loop
    const impactFile = SECTION_IMPACT_SFX[idx] ? SFX(SECTION_IMPACT_SFX[idx]) : null
    if (impactFile) {
      const imp = new Audio(impactFile)
      imp.volume = 0.48
      imp.play().catch(() => {})
      // self-cleaning — no ref needed
    }

    // Looping ambient SFX — only restart if the file changes between sections.
    // Keeping the same file playing prevents an audible gap (e.g. wind through Voss → cold field).
    const nextSfxKey = SECTION_SFX[idx] || null
    if (nextSfxKey !== sfxFileRef.current) {
      if (sfxRef.current) { sfxRef.current.pause(); sfxRef.current = null }
      if (nextSfxKey) {
        const sfx  = new Audio(SFX(nextSfxKey))
        const gain = PROLOGUE_SFX_GAINS[nextSfxKey] ?? 1.0
        sfx.volume = Math.min(0.95, 0.14 * gain)
        sfx.loop   = true
        sfx.play().catch(() => {})
        sfxRef.current = sfx
      }
      sfxFileRef.current = nextSfxKey
    }
    const a = new Audio(section.voFile)
    a.volume = 0.92
    voRef.current = a

    const beginTyping = (delay) => {
      setCharDelay(delay)
      setTyping(true)
    }

    // When VO ends → wait pause ms → advance (or show Continue)
    a.addEventListener('ended', () => {
      clearWait()
      waitRef.current = setTimeout(() => {
        if (section.final) { setShowContinue(true) }
        else { advanceTo(idx + 1) }
      }, section.pause)
    }, { once: true })

    a.addEventListener('loadedmetadata', () => {
      const dur = a.duration
      if (dur && isFinite(dur) && dur > 0) {
        // panDur = VO length + pause so the camera completes its full edge-to-edge
        // arc exactly when advanceTo is called — seamless handoff to next image
        const panDur = Math.max(6, dur + section.pause / 1000)
        const delay  = Math.max(MIN_CHAR_MS, Math.min(MAX_CHAR_MS,
          Math.floor((dur * 800) / section.text.length)
        ))
        setPanConfig({ dur: panDur, approvedIdx: idx })
        beginTyping(delay)
      } else {
        setPanConfig(p => ({ ...p, approvedIdx: idx }))
        beginTyping(DEFAULT_CHAR_MS)
      }
    }, { once: true })

    a.play().catch(() => {
      // VO file missing — unlock pan with default duration
      setPanConfig(p => ({ ...p, approvedIdx: idx }))
      beginTyping(DEFAULT_CHAR_MS)
    })
  }, [advanceTo])

  // ── Initial mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    AudioManager.clearAmbient()
    ambRef.current = new PrologueAmbient()
    const t1 = setTimeout(() => setMounted(true), 60)
    // Start loading section 0 immediately — VO metadata fires during the fade-in,
    // so by the time the image is fully visible the pan is already in motion.
    const t2 = setTimeout(() => startSection(0), 0)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Skip current section → advance to next (or exit if last) ────────────────
  const handleSkipSection = useCallback(() => {
    clearWait()
    if (voRef.current) { voRef.current.pause(); voRef.current = null }
    if (sfxRef.current) { sfxRef.current.pause(); sfxRef.current = null }
    // Last section or continue already showing → exit prologue
    if (showContinue || sectionIdx >= PROLOGUE.length - 1) {
      ambRef.current?.stop()
      try { SoundEngine.pageTurn() } catch (_) {}
      localStorage.setItem('ardenmoor:prologue_seen', '1')
      setExiting(true)
      setTimeout(() => navigate(dest), 700)
      return
    }
    // Otherwise advance to the next section
    try { SoundEngine.uiClick() } catch (_) {}
    advanceTo(sectionIdx + 1)
  }, [showContinue, sectionIdx, dest, navigate, advanceTo]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Continue (end of prologue) ─────────────────────────────────────────────
  const handleContinue = useCallback(() => {
    clearWait()
    if (voRef.current) { voRef.current.pause(); voRef.current = null }
    ambRef.current?.stop()
    if (sfxRef.current) { sfxRef.current.pause(); sfxRef.current = null }
    try { SoundEngine.pageTurn() } catch (_) {}
    localStorage.setItem('ardenmoor:prologue_seen', '1')
    setExiting(true)
    setTimeout(() => navigate(dest), 800)
  }, [dest, navigate])

  const section = PROLOGUE[sectionIdx]

  // ── Active image for Ken Burns ─────────────────────────────────────────────
  const activeImg = showB ? imgB : imgA

  return (
    <div style={{
      position: 'fixed', inset: 0, overflow: 'hidden',
      background: '#02010a',
      opacity:    mounted && !exiting ? 1 : 0,
      transition: exiting ? 'opacity 0.8s ease' : 'opacity 0.7s ease',
      userSelect: 'none',
    }}>
      {/* ── Image layer A — sections 1,3,5… (0-indexed 0,2,4…) pan right → left */}
      <div key={`a-${imgA}`} style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: imgA ? `url('${imgA}')` : 'none',
        backgroundSize: 'cover', backgroundPosition: '100% center',
        transition: `opacity ${IMG_FADE_MS}ms ease`,
        opacity: showB ? 0 : 1,
        animation: (!showB && panReady)
          ? (showContinue ? 'opFinalBreath 11s ease-in-out infinite' : `opPanRL ${panConfig.dur}s linear forwards`)
          : 'none',
      }} />

      {/* ── Image layer B — sections 2,4,6… (0-indexed 1,3,5…) pan left → right */}
      <div key={`b-${imgB}`} style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: imgB ? `url('${imgB}')` : 'none',
        backgroundSize: 'cover', backgroundPosition: '0% center',
        transition: `opacity ${IMG_FADE_MS}ms ease`,
        opacity: showB ? 1 : 0,
        animation: (showB && panReady)
          ? (showContinue ? 'opFinalBreath 11s ease-in-out infinite' : `opPanLR ${panConfig.dur}s linear forwards`)
          : 'none',
      }} />

      {/* ── Dark overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'rgba(2,1,10,0.28)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '9vh', zIndex: 5, background: 'rgba(2,1,10,0.9)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38vh', zIndex: 5, background: 'linear-gradient(to top,rgba(2,1,10,0.97) 0%,rgba(2,1,10,0.8) 50%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 40%,transparent 30%,rgba(2,1,10,0.45) 100%)' }} />

      {/* ── Voss lightning overlay — always in DOM, visible only on section 7 */}
      <div ref={vossLightRef} style={{
        position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 18%, rgba(215,228,255,0.98) 0%, rgba(175,205,255,0.65) 48%, rgba(110,155,235,0.22) 78%, transparent 100%)',
        opacity: 0,
        transition: 'opacity 0.045s ease',
      }} />

      {/* ── Particles */}
      <Particles sectionIdx={sectionIdx} />

      {/* ── Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1rem,2.5vw,2.5rem)', height: '9vh' }}>
        {/* Title */}
        <div style={{ fontFamily: '"Cinzel",serif', fontSize: 'clamp(0.58rem,0.7vw,0.76rem)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(155,122,40,0.75)', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
          The Forgotten Codex
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {PROLOGUE.map((_, i) => (
            <div key={i} style={{
              width: i === sectionIdx ? '16px' : '4px', height: '2px', borderRadius: '1px',
              background: i === sectionIdx ? 'rgba(201,168,76,0.8)' : i < sectionIdx ? 'rgba(155,122,40,0.45)' : 'rgba(80,65,35,0.3)',
              transition: 'all 0.5s ease',
            }} />
          ))}
        </div>

        {/* Skip section */}
        <button
          onClick={handleSkipSection}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(218,185,88,0.95)'; e.currentTarget.style.borderColor = 'rgba(155,122,40,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(130,105,48,0.72)'; e.currentTarget.style.borderColor = 'rgba(100,80,32,0.35)' }}
          style={{ fontFamily: '"Cinzel",serif', fontSize: 'clamp(0.52rem,0.62vw,0.68rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(130,105,48,0.72)', background: 'transparent', border: '1px solid rgba(100,80,32,0.35)', borderRadius: '2px', padding: '0.35em 0.9em', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          Skip
        </button>
      </div>

      {/* ── Text box */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: 'clamp(1.2rem,2vh,1.8rem) clamp(2rem,10vw,10rem) clamp(2rem,3.5vh,3rem)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
        pointerEvents: showContinue ? 'all' : 'none',
      }}>
        {typing && !showContinue && (
          <TypedLine
            key={sectionIdx}
            text={section.text}
            charDelay={charDelay}
            onDone={() => {}}   // advancing is driven by VO end, not text end
          />
        )}

        {showContinue && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem', animation: 'opFadeUp 0.9s ease forwards' }}>
            <div style={{ fontFamily: '"Cinzel",serif', fontSize: 'clamp(0.62rem,0.72vw,0.78rem)', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(192,162,80,0.92)', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
              The Chronicle Awaits
            </div>
            <button
              onClick={handleContinue}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.18)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.88)'; e.currentTarget.style.color = 'rgba(235,200,100,1)'; try { SoundEngine.uiHover() } catch (_) {} }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.color = 'rgba(218,185,88,0.97)' }}
              style={{ fontFamily: '"Cinzel",serif', fontSize: 'clamp(0.85rem,0.95vw,1.05rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(218,185,88,0.97)', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.5)', borderRadius: '2px', padding: '0.75em 2.5em', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 0 24px rgba(201,168,76,0.1)' }}
            >
              Enter the Archive
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes opPanLR {
          from { background-position: 0%   center; }
          to   { background-position: 100% center; }
        }
        @keyframes opPanRL {
          from { background-position: 100% center; }
          to   { background-position: 0%   center; }
        }
        @keyframes opFinalBreath {
          0%   { background-position: 51% 50%;   }
          28%  { background-position: 53% 50.5%; }
          56%  { background-position: 50% 49.5%; }
          82%  { background-position: 52% 50.3%; }
          100% { background-position: 51% 50%;   }
        }
        @keyframes opCaret {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes opFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </div>
  )
}
