#!/usr/bin/env node
/**
 * scripts/gen-voices.mjs
 * Ardenmoor — Voice-over generator
 *
 * Uses edge-tts (Microsoft Edge TTS, completely free, no API key) to generate
 * .mp3 files for every narration and dialogue beat across all acts.
 *
 * ── SETUP (one-time) ──────────────────────────────────────────────────────────
 *   pip install edge-tts      (Python 3.8+, installs edge-tts CLI)
 *   — or —
 *   uv tool install edge-tts  (if you use uv)
 *
 * ── RUN ──────────────────────────────────────────────────────────────────────
 *   npm run gen:voices                            generate all missing VO lines
 *   npm run gen:voices:act1                       only Act 1
 *   npm run gen:voices:act2                       only Act 2
 *   npm run gen:voices -- --dry                   list what would be generated
 *   npm run gen:voices -- --force                 overwrite all existing files
 *   npm run gen:voices -- --char=ryn              regenerate one character (ignores existing files)
 *   npm run gen:voices -- --char=ryn,dorath       regenerate multiple characters
 *
 * ── BEHAVIOUR ────────────────────────────────────────────────────────────────
 * • Any .mp3 that already exists is skipped — safe to re-run.
 * • Narrator uses a deep measured voice with slow rate.
 * • Each character has a distinct voice + rate/pitch tweak for variety.
 * • Output folder: public/assets/audio/vo/
 * • ~1.5–2 s per line on a good connection (edge-tts uses a free cloud API).
 * • Total lines: ~800 (Acts 1+2 combined). Estimated time: ~25 min first run.
 */

import fs            from 'fs'
import path          from 'path'
import { spawn, execSync, spawnSync } from 'child_process'
import { fileURLToPath }              from 'url'

// ─── Detect Python command ────────────────────────────────────────────────────
// Windows may have `py` (launcher), `python`, or `python3` depending on install.
function detectPython() {
  for (const cmd of ['python', 'py', 'python3']) {
    try {
      const r = spawnSync(cmd, ['--version'], { stdio: 'pipe', timeout: 5000 })
      if (r.status === 0) return cmd
    } catch (_) { /* not found */ }
  }
  return null
}
const PYTHON = detectPython()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const VO_DIR    = path.join(ROOT, 'public', 'assets', 'audio', 'vo')

// ─── Voice map ────────────────────────────────────────────────────────────────
// edge-tts voice IDs — all Neural voices, free, high quality.
// Run `edge-tts --list-voices | grep en-` to see the full list.
//
// Rate: percentage relative to base (+10% = 10% faster, -10% = 10% slower)
// Pitch: offset in Hz (+5Hz = higher, -8Hz = lower)
// Available en-US voices (verified 2026): Christopher, Guy, Andrew, Brian, Eric, Roger, Steffan (male)
//   Jenny, Aria, Ava, Emma, Michelle (female)
// Available en-GB voices (verified 2026): Ryan, Thomas (male), Libby, Maisie, Sonia (female)
// Removed voices: JaneNeural, TonyNeural, DavisNeural, JasonNeural (no longer on Microsoft endpoint)
const VOICES = {
  n:        { voice: 'en-US-ChristopherNeural', rate: '-10%', pitch: '-6Hz'  },  // Narrator — deep, grave
  maren:    { voice: 'en-US-JennyNeural',       rate: '-6%',  pitch: '+2Hz'  },  // Scholar, warm authority
  kael:     { voice: 'en-US-GuyNeural',         rate: '+0%',  pitch: '+0Hz'  },  // Young scholar-traveler
  sira:     { voice: 'en-US-AriaNeural',        rate: '+2%',  pitch: '+3Hz'  },  // Kael's sister, capable
  ryn:      { voice: 'en-US-AvaNeural',         rate: '-6%',  pitch: '-2Hz'  },  // Composed, precise     (was JaneNeural)
  serath:   { voice: 'en-GB-RyanNeural',        rate: '-6%',  pitch: '-2Hz'  },  // Careful, analytical
  dorath:   { voice: 'en-US-MichelleNeural',    rate: '-5%',  pitch: '-3Hz'  },  // Strong, weathered
  eran:     { voice: 'en-US-AndrewNeural',      rate: '-10%', pitch: '-5Hz'  },  // Older, road-worn      (was TonyNeural)
  vael:     { voice: 'en-GB-ThomasNeural',      rate: '-7%',  pitch: '-4Hz'  },  // Formal scholar
  brek:     { voice: 'en-US-GuyNeural',         rate: '+5%',  pitch: '+4Hz'  },  // Brek: energetic
  tal:      { voice: 'en-US-EricNeural',        rate: '-3%',  pitch: '+0Hz'  },  // Reliable, plain
  gavrick:  { voice: 'en-US-SteffanNeural',     rate: '-10%', pitch: '-8Hz'  },  // Heavy authority       (was DavisNeural)
  orin:     { voice: 'en-US-RogerNeural',       rate: '-14%', pitch: '-10Hz' },  // Elderly scholar       (was JasonNeural)
  pellard:  { voice: 'en-GB-ThomasNeural',      rate: '-5%',  pitch: '-2Hz'  },  // Contact
  leven:    { voice: 'en-US-BrianNeural',       rate: '-2%',  pitch: '+0Hz'  },  // City contact
  voss:     { voice: 'en-US-ChristopherNeural', rate: '-22%', pitch: '-16Hz' },  // Shadowy threat        (was DavisNeural; extreme settings make it unrecognisably different from Narrator)
}
const DEFAULT_VOICE = { voice: 'en-US-GuyNeural', rate: '+0%', pitch: '+0Hz' }

// ─── Beat walker ─────────────────────────────────────────────────────────────
function collectLines(beats) {
  const lines = []  // { voFile, text, speaker }
  if (!Array.isArray(beats)) return lines

  for (const beat of beats) {
    if (beat.voFile && beat.text && (beat.type === 'narration' || beat.type === 'dialogue')) {
      const speaker = beat.type === 'narration'
        ? 'n'
        : (beat.char?.toLowerCase() || 'n')
      lines.push({ voFile: beat.voFile, text: beat.text, speaker })
    }
    // Recurse into choice option reaction branches
    if (beat.type === 'choice' && Array.isArray(beat.options)) {
      for (const opt of beat.options) {
        if (Array.isArray(opt.beats)) lines.push(...collectLines(opt.beats))
      }
    }
  }
  return lines
}

// ─── TTS generation ───────────────────────────────────────────────────────────
async function generateLine(text, speaker, outPath) {
  return new Promise((resolve, reject) => {
    const v    = VOICES[speaker] || DEFAULT_VOICE
    const args = [
      '-m', 'edge_tts',
      '--voice', v.voice,
      '--rate',  v.rate,
      '--pitch', v.pitch,
      '--text',  text,
      '--write-media', outPath,
    ]
    const proc = spawn(PYTHON || 'python', args, { timeout: 40_000 })
    let stderr = ''
    proc.stderr.on('data', d => { stderr += d.toString() })
    proc.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error((stderr.trim() || `exit code ${code}`).split('\n')[0]))
    })
    proc.on('error', err => {
      if (err.code === 'ENOENT') {
        reject(new Error(`Python not found as '${PYTHON}' — check PATH or reinstall Python`))
      } else {
        reject(err)
      }
    })
  })
}

// Small delay between requests to avoid hammering the free TTS endpoint
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args       = process.argv.slice(2)
  const dryRun     = args.includes('--dry') || args.includes('--dry-run')
  const force      = args.includes('--force')
  const actFilter  = args.find(a => a.startsWith('--act='))?.split('=')[1] || null
  // --char=ryn or --char=ryn,dorath — always regenerates named chars regardless of existing files
  const charFilter = args.find(a => a.startsWith('--char='))
    ? args.find(a => a.startsWith('--char=')).split('=')[1].split(',').map(c => c.toLowerCase().trim())
    : null

  // ── Verify Python + edge-tts are installed ──────────────────────────────────
  if (!dryRun) {
    if (!PYTHON) {
      console.error('\n❌  Python not found.')
      console.error('    Install Python 3.8+ and ensure it is on your PATH.')
      console.error('    On Windows, try:  py --version')
      console.error('    Then:             pip install edge-tts\n')
      process.exit(1)
    }
    try {
      execSync(`${PYTHON} -m edge_tts --help`, { stdio: 'pipe' })
    } catch (_) {
      console.error('\n❌  edge-tts not found.')
      console.error(`    Python found as: ${PYTHON}`)
      console.error(`    Install edge-tts:  ${PYTHON} -m pip install edge-tts`)
      console.error('    Then run this script again.\n')
      process.exit(1)
    }
  }

  // ── Import story data ────────────────────────────────────────────────────────
  // Dynamic import so we only pay the parse cost when actually running.
  const { getActBeats } = await import('../src/data/story.js')
  await import('../src/data/act2.js')    // registers act2 + stamps voFiles

  // ── Collect all lines ────────────────────────────────────────────────────────
  const ACTS = ['act1', 'act2']
  const acts = actFilter ? [actFilter] : ACTS

  const allLines = []
  for (const actId of acts) {
    const beats = getActBeats(actId)
    if (!beats?.length) {
      console.warn(`    ⚠  No beats found for ${actId} — skipping`)
      continue
    }
    allLines.push(...collectLines(beats))
  }

  // Deduplicate by voFile
  const seen  = new Set()
  const lines = allLines.filter(l => {
    if (!l.voFile || seen.has(l.voFile)) return false
    seen.add(l.voFile)
    return true
  })

  // ── Build list of lines to generate ─────────────────────────────────────────
  // --char=x,y  → always regenerate those speakers (fixes broken/silent files)
  // --force     → regenerate everything
  // default     → only lines whose .mp3 doesn't exist yet
  let toGenerate
  if (charFilter) {
    toGenerate = lines.filter(l => charFilter.includes(l.speaker))
    if (!toGenerate.length) {
      console.log(`\n⚠️  No lines found for --char=${charFilter.join(',')}. Check spelling.\n`)
      process.exit(1)
    }
  } else if (force) {
    toGenerate = lines
  } else {
    toGenerate = lines.filter(l => !fs.existsSync(path.join(VO_DIR, l.voFile)))
  }
  const skipped = charFilter ? '—' : (lines.length - toGenerate.length)

  console.log('\n🎙  Ardenmoor Voice Generator')
  console.log(`    Provider        : Microsoft Edge TTS (free, no API key)`)
  if (charFilter) {
    console.log(`    Mode            : Character re-gen (${charFilter.join(', ')})`)
  }
  console.log(`    Acts            : ${acts.join(', ')}`)
  console.log(`    Total lines     : ${lines.length}`)
  if (!force && !charFilter) console.log(`    Already exist   : ${skipped}`)
  console.log(`    To generate     : ${toGenerate.length}`)
  if (toGenerate.length) {
    const mins = Math.ceil(toGenerate.length * 2 / 60)
    console.log(`    Estimated time  : ~${mins} min\n`)
  } else {
    console.log()
  }

  if (!toGenerate.length) {
    console.log('✅  All voice lines already exist. Use --force to regenerate.\n')
    return
  }

  if (dryRun) {
    console.log('── Dry run — would generate:\n')
    toGenerate.forEach((l, i) =>
      console.log(`   ${String(i + 1).padStart(4)}. [${(l.speaker).padEnd(10)}] ${l.voFile}`)
    )
    console.log()
    return
  }

  fs.mkdirSync(VO_DIR, { recursive: true })

  let ok = 0, fail = 0
  for (const line of toGenerate) {
    const outPath = path.join(VO_DIR, line.voFile)
    const label   = `[${String(ok + fail + 1).padStart(4)}/${toGenerate.length}] ${line.voFile}`
    process.stdout.write(`   ${label} `)
    try {
      await generateLine(line.text, line.speaker, outPath)
      console.log('✓')
      ok++
    } catch (err) {
      console.log(`✗  ${err.message}`)
      fail++
    }
    // Brief pause between requests — respect the free endpoint
    if (ok + fail < toGenerate.length) await sleep(800)
  }

  console.log(`\n${fail ? '⚠️ ' : '✅ '}  ${ok} generated, ${fail} failed.`)
  if (fail) console.log('    Re-run the script to retry failed lines.\n')
  else      console.log()
}

main().catch(err => { console.error('\n❌', err.message); process.exit(1) })
