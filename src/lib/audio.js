// ─── audio.js ─────────────────────────────────────────────────────────────────
// AudioManager  — handles music, ambient layers, and voice-over (file-based).
//                 Supports crossfade between tracks.
// SoundEngine   — synthesizes all SFX via Web Audio API. No audio files needed
//                 for sound effects.
// ─────────────────────────────────────────────────────────────────────────────

// ── Asset path helpers ────────────────────────────────────────────────────────
const AUDIO_BASE = `${import.meta.env.BASE_URL}assets/audio`

export const AudioPaths = {
  music:   (name) => `${AUDIO_BASE}/music/${name}`,
  ambient: (name) => `${AUDIO_BASE}/ambient/${name}`,
  vo:      (name) => `${AUDIO_BASE}/vo/${name}`,
}

// ── Per-file loudness normalisation ──────────────────────────────────────────
// Measured with miniaudio + numpy (RMS dBFS). Target: -35 dBFS at volume 1.0.
// gain = 10^((-35 - file_rms_db) / 20), capped at 3.0 to avoid clipping.
// Applied on top of the user's ambient slider so perceived loudness matches
// regardless of how loud or quiet each source file was recorded.
// Add new files here whenever a new ambient is introduced.
export const AMBIENT_GAINS = {
  'menu-ambient.mp3':           0.1,     // -1.93 dBFS source; raised from 0.0222 — old value was inaudible at default slider
  'map-ambient.mp3':            0.1498,  // -18.51 dBFS
  'archive-exterior-night.mp3': 1.895,   // -40.55 dBFS
  'archive-interior-day.mp3':   1.698,   // -39.59 dBFS
  'archive-burning.mp3':        0.834,   // -33.40 dBFS
  'storage-district-night.mp3': 1.727,   // -39.75 dBFS
  'city-morning.mp3':           1.953,   // -40.82 dBFS
  'road-cold-field.mp3':        1.025,   // -35.22 dBFS  — closest to target
  'safe-house.mp3':             1.157,   // -36.27 dBFS
  'forest-path.mp3':            3.0,     // -48.44 dBFS  — very quiet; capped from 4.70
  'settlement-interior.mp3':    1.450,   // -38.23 dBFS
  'settlement-exterior.mp3':    2.037,   // -41.19 dBFS
}

// Prologue SFX loop normalisation (base volume 0.14 in OpeningScreen).
// Same target (-35 dBFS at base 1.0), so at 0.14 all loops sit at ~-52 dBFS.
export const PROLOGUE_SFX_GAINS = {
  'sfx_fire_crackle.mp3':  0.0234,  // -2.40 dBFS
  'sfx_crowd_murmur.mp3':  0.0308,  // -4.76 dBFS
  'sfx_cold_wind.mp3':     0.2455,  // -22.80 dBFS
  'sfx_stone_echo.mp3':    0.1220,  // -16.73 dBFS
  'sfx_dawn_birds.mp3':    0.3690,  // -26.35 dBFS
}

// ── AudioManager ──────────────────────────────────────────────────────────────
class AudioManagerClass {
  constructor() {
    this._music         = null   // current music HTMLAudioElement
    this._ambient       = []     // Array<{track: HTMLAudioElement, gain: number}>
    this._vo            = null   // current VO HTMLAudioElement
    this._musicVolume   = 0.45
    this._ambientVolume = 0.3
    this._voVolume      = 0.9
    this._muted         = false
    this._fadeDuration  = 1500   // ms for crossfade
  }

  // ── Volume & mute ──────────────────────────────────────────────────────────

  // Effective volume for an ambient track: slider × per-file gain, capped at 0.95.
  _trackVol(gain) {
    return this._muted ? 0 : Math.min(0.95, this._ambientVolume * gain)
  }

  setMusicVolume(v)   { this._musicVolume   = v; if (this._music) this._music.volume = this._muted ? 0 : v }
  setAmbientVolume(v) {
    this._ambientVolume = v
    this._ambient.forEach(({ track, gain }) => { track.volume = this._trackVol(gain) })
  }
  setVoVolume(v)      { this._voVolume = v; if (this._vo) this._vo.volume = this._muted ? 0 : v }

  mute()   { this._muted = true;  this._applyMute(0) }
  unmute() { this._muted = false; this._applyMute(1) }
  toggleMute() { this._muted ? this.unmute() : this.mute() }

  _applyMute(factor) {
    if (this._music) this._music.volume = this._musicVolume * factor
    if (this._vo)    this._vo.volume    = this._voVolume    * factor
    this._ambient.forEach(({ track, gain }) => {
      track.volume = factor === 0 ? 0 : Math.min(0.95, this._ambientVolume * gain)
    })
  }

  // ── Autoplay unlock helper ─────────────────────────────────────────────────

  // Browsers may block HTMLAudioElement.play() before sufficient user interaction.
  // If blocked, register a one-shot listener that retries on the next user gesture.
  _tryPlay(track) {
    track.play().catch(() => {
      const retry = () => {
        document.removeEventListener('click',   retry, true)
        document.removeEventListener('keydown', retry, true)
        if (track.src) track.play().catch(() => {})
      }
      document.addEventListener('click',   retry, true)
      document.addEventListener('keydown', retry, true)
    })
  }

  // ── Music ──────────────────────────────────────────────────────────────────

  /**
   * Play a music track. Crossfades from current track if one is playing.
   * @param {string} filename  — file in /assets/audio/music/
   * @param {boolean} loop
   */
  playMusic(filename, loop = true) {
    const newTrack = new Audio(AudioPaths.music(filename))
    newTrack.loop   = loop
    newTrack.volume = this._muted ? 0 : 0  // start silent for fade-in

    if (this._music) {
      const old = this._music
      this._fadeOut(old, this._fadeDuration, () => { old.pause(); old.src = '' })
    }

    this._music = newTrack
    newTrack.play().catch(err => console.warn('[AudioManager] music play failed:', err))
    this._fadeIn(newTrack, this._muted ? 0 : this._musicVolume, this._fadeDuration)
  }

  stopMusic() {
    if (!this._music) return
    const old = this._music
    this._music = null
    this._fadeOut(old, this._fadeDuration, () => { old.pause(); old.src = '' })
  }

  // ── Ambient ────────────────────────────────────────────────────────────────

  /**
   * Add an ambient layer (stackable). Applies per-file gain normalisation.
   * @param {string} filename  — file in /assets/audio/ambient/
   * @returns {HTMLAudioElement}
   */
  addAmbient(filename) {
    const gain  = AMBIENT_GAINS[filename] ?? 1.0
    const track = new Audio(AudioPaths.ambient(filename))
    track.loop   = true
    track.volume = this._trackVol(gain)
    this._tryPlay(track)
    this._ambient.push({ track, gain })
    return track
  }

  /**
   * Replace all current ambients with a single new one, crossfading smoothly.
   * Applies per-file gain so the new track arrives at a normalised level.
   * Pass null/undefined to fade everything out with no replacement.
   */
  setAmbient(filename, fadeDuration = 1100) {
    const old = this._ambient.map(e => e.track)
    this._ambient = []
    old.forEach(t => this._fadeOut(t, fadeDuration, () => { t.pause(); t.src = '' }))

    if (!filename) return null
    const gain  = AMBIENT_GAINS[filename] ?? 1.0
    const track = new Audio(AudioPaths.ambient(filename))
    track.loop   = true
    track.volume = 0
    this._tryPlay(track)
    this._ambient.push({ track, gain })
    this._fadeIn(track, this._trackVol(gain), fadeDuration)
    return track
  }

  removeAmbient(trackRef) {
    this._ambient = this._ambient.filter(e => e.track !== trackRef)
    trackRef.pause(); trackRef.src = ''
  }

  clearAmbient() {
    this._ambient.forEach(({ track }) => { track.pause(); track.src = '' })
    this._ambient = []
  }

  // ── Voice-over ─────────────────────────────────────────────────────────────

  /**
   * Play a VO file. Stops any current VO first.
   * @param {string} filename
   * @param {function} onEnd  callback when VO finishes
   */
  playVO(filename, onEnd = null) {
    this.stopVO()
    const vo = new Audio(AudioPaths.vo(filename))
    vo.volume = this._muted ? 0 : this._voVolume
    if (onEnd) vo.addEventListener('ended', onEnd, { once: true })
    vo.play().catch(err => {
      if (err.name !== 'AbortError') console.warn('[AudioManager] VO play failed:', err)
    })
    this._vo = vo
  }

  stopVO() {
    if (!this._vo) return
    this._vo.pause()
    this._vo.src = ''
    this._vo = null
  }

  // ── Internal fade helpers ──────────────────────────────────────────────────

  _fadeIn(audio, targetVolume, duration) {
    const steps    = 30
    const interval = duration / steps
    const step     = targetVolume / steps
    let current    = 0

    const timer = setInterval(() => {
      current = Math.min(current + step, targetVolume)
      audio.volume = current
      if (current >= targetVolume) clearInterval(timer)
    }, interval)
  }

  _fadeOut(audio, duration, onDone) {
    const steps    = 30
    const interval = duration / steps
    const step     = audio.volume / steps
    let current    = audio.volume

    const timer = setInterval(() => {
      current = Math.max(current - step, 0)
      audio.volume = current
      if (current <= 0) {
        clearInterval(timer)
        if (onDone) onDone()
      }
    }, interval)
  }
}

// ── SoundEngine ───────────────────────────────────────────────────────────────
// All SFX synthesized via Web Audio API — no audio files required.
// Design goal: every sound must feel ancient, organic, and weighted.
// No digital clicks. Every texture is parchment, stone, iron, wax, or bell metal.
class SoundEngineClass {
  constructor() {
    this._ctx    = null
    this._volume = 0.6
    this._muted  = false
  }

  _getCtx() {
    if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)()
    // Browsers suspend AudioContext until user interaction. Resume on every access
    // so the first user click un-suspends it before sounds are scheduled.
    if (this._ctx.state === 'suspended') this._ctx.resume()
    return this._ctx
  }

  // Create a master gain node and connect to destination
  _g(val) {
    const ctx = this._getCtx()
    const g   = ctx.createGain()
    g.gain.value = this._muted ? 0 : Math.max(0, val * this._volume)
    g.connect(ctx.destination)
    return g
  }

  // Create a noise buffer with given duration (seconds)
  _noise(ctx, dur, fill) {
    const n = Math.floor(ctx.sampleRate * dur)
    const b = ctx.createBuffer(1, n, ctx.sampleRate)
    const d = b.getChannelData(0)
    if (fill) { for (let i = 0; i < n; i++) d[i] = fill(i, n) }
    else       { for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1 }
    const s = ctx.createBufferSource()
    s.buffer = b
    return s
  }

  setVolume(v)  { this._volume = v }
  mute()        { this._muted = true  }
  unmute()      { this._muted = false }
  toggleMute()  { this._muted ? this.unmute() : this.mute() }

  // ── SFX library ────────────────────────────────────────────────────────────

  /** Parchment leaf turn — navigating between chapters/screens */
  pageRustle() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      // Two-layer: high rustle + low body thud
      const rustle = this._noise(ctx, 0.22, (i, n) => {
        const env = Math.pow(i / (n * 0.05), 0.3) * Math.pow(1 - i / n, 1.2)
        return (Math.random() * 2 - 1) * env
      })
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 3200; bp.Q.value = 0.6
      const g1 = this._g(0.28)
      rustle.connect(bp); bp.connect(g1); rustle.start(t)

      const thud = this._noise(ctx, 0.08, (i, n) => {
        return (Math.random() * 2 - 1) * Math.pow(1 - i / n, 4)
      })
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'; lp.frequency.value = 300
      const g2 = this._g(0.2)
      thud.connect(lp); lp.connect(g2); thud.start(t)
    } catch (_) {}
  }

  /** Heavy stone door grinding open — epoch/chapter unlock */
  stoneDoor() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      // Grinding scrape: filtered noise, frequency sweeping down
      const scrape = this._noise(ctx, 1.4, (i, n) => {
        const env = Math.pow(1 - i / n, 0.4) * (i < n * 0.05 ? i / (n * 0.05) : 1)
        return (Math.random() * 2 - 1) * env * 0.9
      })
      const lp1 = ctx.createBiquadFilter()
      lp1.type = 'lowpass'; lp1.frequency.setValueAtTime(600, t); lp1.frequency.exponentialRampToValueAtTime(120, t + 1.4)
      const g1 = this._g(0.55)
      scrape.connect(lp1); lp1.connect(g1); scrape.start(t)
      // Deep boom on impact at 1.1s
      const boom = ctx.createOscillator()
      boom.type = 'sine'; boom.frequency.setValueAtTime(55, t + 1.05); boom.frequency.exponentialRampToValueAtTime(28, t + 1.8)
      const g2 = this._g(0.5)
      g2.gain.setValueAtTime(0, t + 1.05); g2.gain.linearRampToValueAtTime(0.5 * this._volume, t + 1.08)
      g2.gain.exponentialRampToValueAtTime(0.001, t + 1.9)
      boom.connect(g2); boom.start(t + 1.05); boom.stop(t + 2.0)
    } catch (_) {}
  }

  /** Ancient gold coin ring — XP/marks pickup */
  coinPickup() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      // Three metallic pings with slight detuning for realism
      const freqs = [660, 832, 1047]
      freqs.forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f
        const g = this._g(0.18)
        g.gain.setValueAtTime(0, t + i * 0.055)
        g.gain.linearRampToValueAtTime(0.18 * this._volume, t + i * 0.055 + 0.004)
        g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.055 + 0.55)
        o.connect(g); o.start(t + i * 0.055); o.stop(t + i * 0.055 + 0.6)
        // Bright harmonic
        const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2.76
        const g2 = this._g(0.06)
        g2.gain.setValueAtTime(0, t + i * 0.055)
        g2.gain.linearRampToValueAtTime(0.06 * this._volume, t + i * 0.055 + 0.003)
        g2.gain.exponentialRampToValueAtTime(0.001, t + i * 0.055 + 0.2)
        o2.connect(g2); o2.start(t + i * 0.055); o2.stop(t + i * 0.055 + 0.25)
      })
    } catch (_) {}
  }

  /** Deed sealed — accomplishment: three ascending academy bell tones */
  deedComplete() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      const notes = [330, 415, 495] // E4, G#4, B4 — a major triad arpeggio
      notes.forEach((f, i) => {
        const delay = i * 0.13
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f
        // Bell: quick attack, long ring
        const g = this._g(0.28)
        g.gain.setValueAtTime(0, t + delay)
        g.gain.linearRampToValueAtTime(0.28 * this._volume, t + delay + 0.006)
        g.gain.exponentialRampToValueAtTime(0.001, t + delay + 1.1)
        o.connect(g); o.start(t + delay); o.stop(t + delay + 1.2)
        // Inharmonic shimmer — makes it sound like metal not sine
        const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2.7
        const g2 = this._g(0.08)
        g2.gain.setValueAtTime(0, t + delay)
        g2.gain.linearRampToValueAtTime(0.08 * this._volume, t + delay + 0.004)
        g2.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.35)
        o2.connect(g2); o2.start(t + delay); o2.stop(t + delay + 0.4)
      })
    } catch (_) {}
  }

  /** Chapter cleared — two deep iron bells with long resonance */
  chapterComplete() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      const pairs = [[110, 165], [220, 330]] // A2+E3, then octave above
      pairs.forEach(([f1, f2], i) => {
        const delay = i * 0.45
        ;[f1, f2].forEach((f, j) => {
          const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f
          const g = this._g(j === 0 ? 0.35 : 0.22)
          g.gain.setValueAtTime(0, t + delay)
          g.gain.linearRampToValueAtTime((j === 0 ? 0.35 : 0.22) * this._volume, t + delay + 0.008)
          g.gain.exponentialRampToValueAtTime(0.001, t + delay + 3.2)
          o.connect(g); o.start(t + delay); o.stop(t + delay + 3.4)
          // Upper partial
          const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2.756
          const g2 = this._g(0.08)
          g2.gain.setValueAtTime(0, t + delay)
          g2.gain.linearRampToValueAtTime(0.08 * this._volume, t + delay + 0.005)
          g2.gain.exponentialRampToValueAtTime(0.001, t + delay + 1.0)
          o2.connect(g2); o2.start(t + delay); o2.stop(t + delay + 1.1)
        })
      })
    } catch (_) {}
  }

  /** Parchment seal press — UI click, soft heavy press */
  uiClick() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      // Wood body: very short noise through lowpass
      const body = this._noise(ctx, 0.04, (i, n) => (Math.random() * 2 - 1) * Math.pow(1 - i / n, 5))
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400
      const g1 = this._g(0.32)
      body.connect(lp); lp.connect(g1); body.start(t)
      // Brief tonal body resonance
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(90, t + 0.04)
      const g2 = this._g(0.12)
      g2.gain.setValueAtTime(0.12 * this._volume, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      o.connect(g2); o.start(t); o.stop(t + 0.07)
    } catch (_) {}
  }

  /** Parchment whisper — subtle hover feedback */
  uiHover() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      const s = this._noise(ctx, 0.06, (i, n) => {
        const env = Math.sin((i / n) * Math.PI)
        return (Math.random() * 2 - 1) * env
      })
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 4000
      const g = this._g(0.06)
      s.connect(hp); hp.connect(g); s.start(t)
    } catch (_) {}
  }

  /** Iron bar on stone — error/rejection */
  uiError() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      // Scraping noise
      const scrape = this._noise(ctx, 0.3, (i, n) => {
        const env = Math.pow(1 - i / n, 1.5)
        return (Math.random() * 2 - 1) * env
      })
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 800; bp.Q.value = 1.2
      const g1 = this._g(0.35)
      scrape.connect(bp); bp.connect(g1); scrape.start(t)
      // Low dissonant tone
      const o = ctx.createOscillator(); o.type = 'sawtooth'
      o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(80, t + 0.25)
      const g2 = this._g(0.2)
      g2.gain.setValueAtTime(0.2 * this._volume, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
      o.connect(g2); o.start(t); o.stop(t + 0.32)
    } catch (_) {}
  }

  /** Wax seal cracking open — cutscene entrance, dramatic */
  sealCrack() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      // Sharp crack
      const crack = this._noise(ctx, 0.06, (i, n) => {
        const env = Math.pow(1 - i / n, 8) * (i < n * 0.03 ? i / (n * 0.03) : 1)
        return (Math.random() * 2 - 1) * env
      })
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2500
      const g1 = this._g(0.45)
      crack.connect(hp); hp.connect(g1); crack.start(t)
      // Low resonant boom follows
      const boom = ctx.createOscillator(); boom.type = 'sine'
      boom.frequency.setValueAtTime(80, t + 0.04); boom.frequency.exponentialRampToValueAtTime(38, t + 0.7)
      const g2 = this._g(0.5)
      g2.gain.setValueAtTime(0, t + 0.04); g2.gain.linearRampToValueAtTime(0.5 * this._volume, t + 0.06)
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.8)
      boom.connect(g2); boom.start(t + 0.04); boom.stop(t + 0.85)
      // Sub rumble
      const rumble = this._noise(ctx, 0.55, (i, n) => (Math.random() * 2 - 1) * Math.pow(1 - i / n, 0.8))
      const lp2 = ctx.createBiquadFilter(); lp2.type = 'lowpass'; lp2.frequency.value = 150
      const g3 = this._g(0.3)
      rumble.connect(lp2); lp2.connect(g3); rumble.start(t + 0.03)
    } catch (_) {}
  }

  /** Epoch unlocked — heroic chord + sweep (WorldMap lazy fill complete) */
  epochUnlock() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      // Rising sweep noise
      const sweep = this._noise(ctx, 1.0, (i, n) => {
        const env = Math.pow(i / n, 0.4) * Math.pow(1 - i / n, 1.8)
        return (Math.random() * 2 - 1) * env
      })
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'
      bp.frequency.setValueAtTime(200, t); bp.frequency.exponentialRampToValueAtTime(2000, t + 0.9)
      bp.Q.value = 2
      const g1 = this._g(0.25)
      sweep.connect(bp); bp.connect(g1); sweep.start(t + 0.1)
      // Three-note chord bell (A3, C#4, E4 — A major)
      const chord = [220, 277.18, 329.63]
      chord.forEach((f, i) => {
        const delay = 0.5 + i * 0.08
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f
        const g = this._g(0.3)
        g.gain.setValueAtTime(0, t + delay)
        g.gain.linearRampToValueAtTime(0.3 * this._volume, t + delay + 0.01)
        g.gain.exponentialRampToValueAtTime(0.001, t + delay + 3.5)
        o.connect(g); o.start(t + delay); o.stop(t + delay + 3.7)
      })
    } catch (_) {}
  }

  /** Parchment unfold — expanding a deed or task */
  taskExpand() {
    try {
      const ctx = this._getCtx()
      const t   = ctx.currentTime
      const s = this._noise(ctx, 0.12, (i, n) => {
        const env = Math.pow(1 - i / n, 2.5) * (i < n * 0.06 ? i / (n * 0.06) : 1)
        return (Math.random() * 2 - 1) * env
      })
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2800; bp.Q.value = 0.7
      const g = this._g(0.18)
      s.connect(bp); bp.connect(g); s.start(t)
    } catch (_) {}
  }

  /** Quill on parchment — dialogue typewriter character tick
   *  Soft noise burst shaped like a quick scratch. Low, organic, warm.
   *  Nothing digital. Sounds like writing with ink on old paper.
   */
  typeChar() {
    try {
      const ctx  = this._getCtx()
      // Short band-limited noise burst — like a quill tip catching parchment
      const dur  = 0.045
      const buf  = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        // Noise with fast attack and smooth exponential decay
        const t    = i / data.length
        const env  = Math.pow(1 - t, 3) * (t < 0.08 ? t / 0.08 : 1)
        data[i]    = (Math.random() * 2 - 1) * env
      }
      const src    = ctx.createBufferSource()
      src.buffer   = buf
      // Band-pass centered around 1200-1800Hz — removes the deep thud and high hiss,
      // leaving the dry "scratch" frequency band
      const bp     = ctx.createBiquadFilter()
      bp.type      = 'bandpass'
      bp.frequency.value = 1400 + Math.random() * 400
      bp.Q.value   = 1.8
      // Slight low shelf to warm it up
      const shelf  = ctx.createBiquadFilter()
      shelf.type   = 'lowshelf'
      shelf.frequency.value = 600
      shelf.gain.value = 4
      const gain   = ctx.createGain()
      gain.gain.setValueAtTime(this._muted ? 0 : 0.22 * this._volume, ctx.currentTime)
      src.connect(bp)
      bp.connect(shelf)
      shelf.connect(gain)
      gain.connect(ctx.destination)
      src.start()
    } catch (_) {}
  }

  /** Ink drop — used for auth field keystrokes
   *  Heavier than typeChar, single low soft click like pressing a wax seal.
   *  Not digital, not mechanical — weighted and deliberate.
   */
  inkDrop() {
    try {
      const ctx  = this._getCtx()
      const dur  = 0.06
      const buf  = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        const t    = i / data.length
        const env  = Math.pow(1 - t, 4) * (t < 0.05 ? t / 0.05 : 1)
        data[i]    = (Math.random() * 2 - 1) * env * 0.7
      }
      const src  = ctx.createBufferSource()
      src.buffer = buf
      const lp   = ctx.createBiquadFilter()
      lp.type    = 'lowpass'
      lp.frequency.value = 900 + Math.random() * 200
      lp.Q.value = 0.8
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(this._muted ? 0 : 0.28 * this._volume, ctx.currentTime)
      src.connect(lp)
      lp.connect(gain)
      gain.connect(ctx.destination)
      src.start()
    } catch (_) {}
  }

  /** Chronicle forged — deep resonant bell strike + harmonic overtone
   *  Used when Chronicle generation completes. More ceremonial than chapterComplete.
   */
  chronicleForged() {
    try {
      const ctx  = this._getCtx()
      // Deep bell fundamental
      const g1   = ctx.createGain()
      g1.gain.setValueAtTime(0, ctx.currentTime)
      g1.gain.linearRampToValueAtTime(this._muted ? 0 : 0.45 * this._volume, ctx.currentTime + 0.01)
      g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0)
      g1.connect(ctx.destination)
      const o1   = ctx.createOscillator()
      o1.type    = 'sine'
      o1.frequency.value = 148
      o1.connect(g1); o1.start(); o1.stop(ctx.currentTime + 4.2)
      // Octave overtone
      const g2   = ctx.createGain()
      g2.gain.setValueAtTime(0, ctx.currentTime)
      g2.gain.linearRampToValueAtTime(this._muted ? 0 : 0.22 * this._volume, ctx.currentTime + 0.008)
      g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8)
      g2.connect(ctx.destination)
      const o2   = ctx.createOscillator()
      o2.type    = 'sine'
      o2.frequency.value = 296
      o2.connect(g2); o2.start(); o2.stop(ctx.currentTime + 3.0)
      // Fifth harmonic shimmer
      const g3   = ctx.createGain()
      g3.gain.setValueAtTime(0, ctx.currentTime)
      g3.gain.linearRampToValueAtTime(this._muted ? 0 : 0.12 * this._volume, ctx.currentTime + 0.015)
      g3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8)
      g3.connect(ctx.destination)
      const o3   = ctx.createOscillator()
      o3.type    = 'sine'
      o3.frequency.value = 444
      o3.connect(g3); o3.start(); o3.stop(ctx.currentTime + 2.0)
    } catch (_) {}
  }

  /** Page turn — soft papery whoosh, used when navigating between screens.
   *  Not mechanical. Like turning a heavy parchment page.
   */
  pageTurn() {
    try {
      const ctx  = this._getCtx()
      const dur  = 0.22
      const buf  = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        const t   = i / data.length
        // Shaped noise: rises quickly, long tail
        const env = (t < 0.1 ? t / 0.1 : Math.pow(1 - (t - 0.1) / 0.9, 2.5))
        data[i]   = (Math.random() * 2 - 1) * env
      }
      const src  = ctx.createBufferSource()
      src.buffer = buf
      const hp   = ctx.createBiquadFilter()
      hp.type    = 'highpass'; hp.frequency.value = 500; hp.Q.value = 0.5
      const lp   = ctx.createBiquadFilter()
      lp.type    = 'lowpass';  lp.frequency.value = 3500; lp.Q.value = 0.6
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(this._muted ? 0 : 0.18 * this._volume, ctx.currentTime)
      src.connect(hp); hp.connect(lp); lp.connect(gain); gain.connect(ctx.destination)
      src.start()
    } catch (_) {}
  }

  /** Seal click — a single deliberate tap, heavier than a button press.
   *  Used for journal open, menu confirm actions.
   */
  sealClick() {
    try {
      const ctx  = this._getCtx()
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(280, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(this._muted ? 0 : 0.25 * this._volume, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(); osc.stop(ctx.currentTime + 0.2)
    } catch (_) {}
  }

  /** Hover shimmer — a very brief, very quiet high tone.
   *  Used on interactive element hover to give haptic-like feedback.
   */
  hoverShimmer() {
    try {
      const ctx  = this._getCtx()
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 2200
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(this._muted ? 0 : 0.045 * this._volume, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(); osc.stop(ctx.currentTime + 0.08)
    } catch (_) {}
  }

  /** Coin chime — a bright short bell tone with quick decay.
   *  Used when coins are earned or spent.
   */
  coinChime(spend = false) {
    try {
      const ctx  = this._getCtx()
      const freq = spend ? 520 : 880
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(this._muted ? 0 : 0.18 * this._volume, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(); osc.stop(ctx.currentTime + 0.38)
    } catch (_) {}
  }
}  // end SoundEngineClass

// ── Singletons ────────────────────────────────────────────────────────────────
export const AudioManager = new AudioManagerClass()
export const SoundEngine  = new SoundEngineClass()
