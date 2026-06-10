#!/usr/bin/env node
/**
 * scripts/generate-images.mjs
 * Ardenmoor — Batch image generator
 *
 * ── DEFAULT PROVIDER: Pollinations.ai ────────────────────────────────────────
 * Zero setup. Zero cost. No account. No API key. Just run it.
 * Uses FLUX model — same quality as HuggingFace FLUX.1.
 *
 * ── OPTIONAL: HuggingFace Inference API ──────────────────────────────────────
 * Higher quality option. Add to .env:
 *   PROVIDER=hf
 *   HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxx
 * Get token at: huggingface.co/settings/tokens (read access, free)
 *
 * ── RUN ──────────────────────────────────────────────────────────────────────
 *   npm run gen:images            all missing images (~170, ~29 min)
 *   npm run gen:images:phase1     base backgrounds only (10 images, ~2 min)
 *   npm run gen:images:phase2     angle variants (17 images, ~3 min)
 *   npm run gen:images:phase3     portraits (142 images, ~23 min)
 *   npm run gen:images:dry        list what would be generated
 *
 * ── BEHAVIOUR ────────────────────────────────────────────────────────────────
 * • Any file that already exists is skipped — safe to re-run at any time.
 * • Phase 2 must run AFTER Phase 1 (angle variants combine base + modifier).
 * • Retries automatically on temporary errors.
 * • ~8–12 s per image on Pollinations. 192 images ≈ 25–35 min total.
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')

// ─── Load .env ────────────────────────────────────────────────────────────────
try {
  fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').forEach(line => {
    const m = line.match(/^(\w+)\s*=\s*"?(.+?)"?\s*$/)
    if (m) process.env[m[1]] = m[2]
  })
} catch (_) {}

// ─── Config ───────────────────────────────────────────────────────────────────
const PROVIDER  = (process.env.PROVIDER || 'pollinations').toLowerCase()
const HF_TOKEN  = process.env.HF_TOKEN
const DELAY_MS  = PROVIDER === 'hf' ? 3500 : 4000

if (PROVIDER === 'hf' && !HF_TOKEN) {
  console.error('\n❌  PROVIDER=hf but HF_TOKEN not set.\n    Add HF_TOKEN=hf_yourtoken to .env, or remove PROVIDER=hf to use Pollinations.\n')
  process.exit(1)
}

// Pollinations.ai model:
//   'flux-pro'  → FLUX.1 dev  — best quality, rich colors, sharp detail (default)
//   'flux'      → FLUX.1 schnell — faster but noticeably lower quality
// Override via .env: POLL_MODEL=flux
const POLL_MODEL = process.env.POLL_MODEL || 'flux-pro'

// Aspect ratio → pixel dimensions
// All values are exact multiples of 64 (FLUX requirement — non-multiples cause stretching)
// 16:9  → 2048×1152  (2048/64=32, 1152/64=18)
// 21:9  → 2240×960   (2240/64=35,  960/64=15)
// 3:4   →  960×1280  ( 960/64=15, 1280/64=20)
const DIMS = {
  '16:9':             [2048, 1152],
  '21:9':             [2240,  960],
  '21:9 (panoramic)': [2240,  960],
  '3:4':              [ 960, 1280],
}

// ─── Parse ASSETS_IMAGES.md ───────────────────────────────────────────────────
// Returns an array of { out, prompt, w, h, phase } objects for every image.
// Reads prompts from the markdown so the script always stays in sync with docs.
function parseSpecs() {
  const md      = fs.readFileSync(path.join(ROOT, 'ASSETS_IMAGES.md'), 'utf8')
  const specs   = []
  const baseMap = {}  // 'filename.jpg' → { prompt, w, h }

  // ── Phase 1 — base backgrounds ────────────────────────────────────────────
  // Format:
  //   ### N — filename.jpg
  //   **Folder:** `path/`
  //   **Aspect:** ratio
  //
  //   > prompt text (may span multiple lines)
  const rBG = /### \d+ — ([\w.]+\.jpg)\n\*\*Folder:\*\* `([^`]+)`\n\*\*Aspect:\*\* ([^\n]+)[\s\S]*?\n\n((?:> .+\n?)+)/g
  for (const m of md.matchAll(rBG)) {
    const [, file, folder, asp, block] = m
    const prompt = block.replace(/^> ?/gm, '').replace(/\s+/g, ' ').trim()
    const [w, h] = DIMS[asp.trim()] ?? DIMS['16:9']
    const out    = path.join(ROOT, folder.replace(/\/$/, ''), file)
    specs.push({ out, prompt, w, h, phase: 1 })
    baseMap[file] = { prompt, w, h }
  }

  // ── Phase 2 — close / wide / behind angle variants ────────────────────────
  // Format:
  //   ### filename.jpg
  //   **Folder:** `path/`
  //   **Base:** `base.jpg`
  //   **Modifier:** `camera modifier text`
  const rAng = /### ([\w.]+\.jpg)\n\*\*Folder:\*\* `([^`]+)`\n\*\*Base:\*\* `([^`]+)`\n\*\*Modifier:\*\* `([^`]+)`/g
  for (const m of md.matchAll(rAng)) {
    const [, file, folder, base, mod] = m
    const b = baseMap[base]
    if (!b) continue  // base not yet in map — will be captured on next run
    // Build combined prompt: strip trailing "No human figures" clause from base
    // then re-add it after the angle modifier so the constraint still holds.
    const stripped = b.prompt.replace(/\.?\s*No human figures[^.]*\./g, '')
    const prompt   = `${stripped.trim()} ${mod} No human figures. Anime illustrated style, no text, no watermark.`
    const out      = path.join(ROOT, folder.replace(/\/$/, ''), file)
    specs.push({ out, prompt, w: b.w, h: b.h, phase: 2 })
  }

  // NOTE: speaker left/right variants are NOT generated as separate files.
  // The StoryScreen shifts backgroundPosition via CSS transition when a character speaks —
  // same image panned left or right. This guarantees perfect style consistency.

  // Style prefix enforced on every portrait — locks anime illustration aesthetic.
  // Switches to dark fantasy anime art style for all character portraits.
  const PORTRAIT_STYLE = 'Dark fantasy anime portrait illustration. Detailed anime character art, clean linework with dramatic cel-shaded shadows. Dark atmospheric visual novel style. NOT photorealistic. NOT photograph. NOT 3D CGI render. Strong chiaroscuro lighting. '

  // ── Phase 3 — portraits Tier 1 + 2 (template + expression table format) ──
  // ### CHARACTER NAME (N files)
  // **Folder:** `portraits/name/`
  // **Base Prompt Template:**
  // > template with [EXPR]
  // | `filename.png` | Expression: ... |
  const rChar = /### ([A-Z][A-Z /-]+?) \(\d+ files\)\n\*\*Folder:\*\* `([^`]+)`[\s\S]+?\*\*Base Prompt Template:\*\*\n((?:> .+\n?)+)([\s\S]+?)(?=\n### [A-Z]|\n## |$)/g
  for (const m of md.matchAll(rChar)) {
    const [, , folder, tBlock, rest] = m
    const template = tBlock.replace(/^> ?/gm, '').replace(/\s+/g, ' ').trim()
    const rRow = /\| `([\w._-]+\.png)` \| ([^|]+?) \|/g
    for (const rm of rest.matchAll(rRow)) {
      const [, file, expr] = rm
      if (file === 'File' || /^-+$/.test(file)) continue
      const prompt = PORTRAIT_STYLE + template.replace('[EXPR]', expr.trim())
      const out    = path.join(ROOT, folder.replace(/\/$/, ''), file)
      specs.push({ out, prompt, w: 768, h: 1024, phase: 3 })
    }
  }

  // ── Phase 3 — Tier 3 portraits (compact block format, Part 5) ─────────────
  // ### CHARNAME                             (no file count)
  // > full prompt [idle_1: desc | idle_2: desc | idle_3: desc] ...
  // Generates 5 files: idle_1, idle_2, idle_3, listening, talking
  const LISTEN_STD = 'Character turned slightly toward an unseen speaker, focused attentive eyes, still composed posture, hands at rest.'
  const TALK_STD   = 'Character mid-speech, direct eye contact toward listener, slight forward lean, expression of someone delivering something with intent.'

  const part5 = md.match(/## PART 5[\s\S]+$/)
  if (part5) {
    const rT3 = /### ([A-Z]+)\n> (.+)/g
    for (const m of part5[0].matchAll(rT3)) {
      const [, char, raw] = m
      const folder   = path.join(ROOT, `public/assets/images/portraits/${char.toLowerCase()}`)
      const styleCtx = raw.replace(/\s*\[.*?\]\.?/g, '').replace(/\s+/g, ' ').trim()
      const bracket  = raw.match(/\[([^\]]+)\]/)?.[1] || ''
      const idleParts = bracket.split('|').map(s => s.trim())
      for (let i = 0; i < 3; i++) {
        const rawDesc = idleParts[i] || `neutral composed gaze`
        const desc    = rawDesc.replace(/^idle_\d+:\s*/, '').trim()
        specs.push({
          out:    path.join(folder, `idle_${i+1}.png`),
          prompt: (PORTRAIT_STYLE + `${styleCtx} Expression: ${desc}`).replace(/\s+/g, ' ').trim(),
          w: 768, h: 1024, phase: 3,
        })
      }
      specs.push({ out: path.join(folder, 'listening.png'), prompt: PORTRAIT_STYLE + `${styleCtx} ${LISTEN_STD}`, w: 768, h: 1024, phase: 3 })
      specs.push({ out: path.join(folder, 'talking.png'),   prompt: PORTRAIT_STYLE + `${styleCtx} ${TALK_STD}`,   w: 768, h: 1024, phase: 3 })
    }
  }

  return specs
}

// ─── Image generation ─────────────────────────────────────────────────────────
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Pollinations.ai — free, no key, no signup
async function generatePollinations(prompt, w, h, attempt = 0) {
  const MAX = 4
  const seed = Math.floor(Math.random() * 2_147_483_647)
  const url = 'https://image.pollinations.ai/prompt/' +
    encodeURIComponent(prompt) +
    `?width=${w}&height=${h}&nologo=true&model=${POLL_MODEL}&enhance=false&seed=${seed}`
  let res
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(90_000) })
  } catch (err) {
    if (attempt >= MAX) throw new Error(`Network error: ${err.cause?.message || err.message}`)
    console.log(`      ⏳ retry ${attempt + 1}/4 (${err.cause?.code || 'connection error'})...`)
    await sleep(8000)
    return generatePollinations(prompt, w, h, attempt + 1)
  }
  if (res.status === 402 || res.status === 429 || res.status === 503) {
    if (attempt >= MAX) throw new Error(`HTTP ${res.status} after retries`)
    const wait = res.status === 429 ? 30 : 20  // 402 = queue full, 503 = overload
    console.log(`      ⏳ ${res.status} — queue full, waiting ${wait}s...`)
    await sleep(wait * 1000)
    return generatePollinations(prompt, w, h, attempt + 1)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 120)}`)
  const ct = res.headers.get('content-type') ?? ''
  if (!ct.startsWith('image/')) throw new Error(`Expected image, got: ${ct}`)
  return Buffer.from(await res.arrayBuffer())
}

// HuggingFace Inference API — set PROVIDER=hf + HF_TOKEN in .env
async function generateHF(prompt, w, h, attempt = 0) {
  const MAX = 5
  const url = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell'
  let res
  try {
    res = await fetch(url, {
      method:  'POST',
      headers: { Authorization: `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json' },
      body:    JSON.stringify({ inputs: prompt, parameters: { width: w, height: h } }),
      signal:  AbortSignal.timeout(120_000),
    })
  } catch (err) {
    if (attempt >= MAX) throw new Error(`Network error: ${err.cause?.message || err.message}`)
    console.log(`      ⏳ retry ${attempt + 1}/5 (${err.cause?.code || 'connection error'})...`)
    await sleep(10_000)
    return generateHF(prompt, w, h, attempt + 1)
  }
  if (res.status === 503) {
    if (attempt >= MAX) throw new Error('Model unavailable after retries')
    let wait = 30
    try { const j = await res.json(); wait = (j.estimated_time ?? 30) + 5 } catch (_) {}
    console.log(`      ⏳ loading (${Math.round(wait)}s)...`)
    await sleep(wait * 1000)
    return generateHF(prompt, w, h, attempt + 1)
  }
  if (res.status === 429) {
    if (attempt >= MAX) throw new Error('Rate limited after retries')
    console.log('      ⏳ rate limited (60s)...')
    await sleep(60_000)
    return generateHF(prompt, w, h, attempt + 1)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`)
  const ct = res.headers.get('content-type') ?? ''
  if (!ct.startsWith('image/')) throw new Error(`Expected image, got: ${ct}`)
  return Buffer.from(await res.arrayBuffer())
}

function generateImage(prompt, w, h) {
  return PROVIDER === 'hf' ? generateHF(prompt, w, h) : generatePollinations(prompt, w, h)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args   = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const force  = args.includes('--force')
  const phaseN = +(args.find(a => a.startsWith('--phase='))?.split('=')[1] ?? 0)

  const providerLabel = PROVIDER === 'hf'
    ? 'HuggingFace Inference API (FLUX.1 schnell)'
    : `Pollinations.ai — model: ${POLL_MODEL} (no key needed)`
  console.log('\n🎨  Ardenmoor Image Generator')
  console.log(`    Provider : ${providerLabel}`)
  if (force) console.log(`    Mode     : FORCE — overwriting existing files`)
  console.log()

  let specs = parseSpecs()
  if (phaseN) specs = specs.filter(s => s.phase === phaseN)

  const toGenerate = force ? specs : specs.filter(s => !fs.existsSync(s.out))
  const skipped    = specs.length - toGenerate.length

  console.log(`    Total image specs parsed : ${specs.length}`)
  if (!force) console.log(`    Already exist (skipped)  : ${skipped}`)
  console.log(`    To generate              : ${toGenerate.length}`)
  if (toGenerate.length)
    console.log(`    Estimated time           : ~${Math.round(toGenerate.length * 10 / 60)} min\n`)
  else
    console.log()

  if (!toGenerate.length) {
    console.log('✅  All images already exist. Use --force to regenerate.\n')
    return
  }

  if (dryRun) {
    console.log('── Dry run — would generate:\n')
    toGenerate.forEach((s, i) =>
      console.log(`   ${String(i+1).padStart(3)}. [phase ${s.phase}] ${path.relative(ROOT, s.out)}`)
    )
    console.log()
    return
  }

  let ok = 0, fail = 0
  for (const spec of toGenerate) {
    const label = path.relative(ROOT, spec.out)
    process.stdout.write(`   [${String(ok+fail+1).padStart(3)}/${toGenerate.length}] ${label} `)
    try {
      fs.mkdirSync(path.dirname(spec.out), { recursive: true })
      const buf = await generateImage(spec.prompt, spec.w, spec.h)
      fs.writeFileSync(spec.out, buf)
      console.log('✓')
      ok++
    } catch (err) {
      console.log(`✗  ${err.message}`)
      fail++
    }
    if (ok + fail < toGenerate.length) await sleep(DELAY_MS)
  }

  console.log(`\n${fail ? '⚠️ ' : '✅ '}  ${ok} generated, ${fail} failed.`)
  if (fail) console.log('    Re-run the script to retry failed images.\n')
  else      console.log()
}

main().catch(err => { console.error('\n❌', err.message); process.exit(1) })
