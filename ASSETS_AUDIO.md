# Ardenmoor — Audio Asset Generation Guide

**Total new files needed:** 10 scene ambients + 6 expression SFX + ~395 VO files
**SFX note:** UI/gameplay SFX are ALL synthesized in code via Web Audio API — zero SFX files needed for those
**Existing files (keep):** menu-ambient.mp3, map-ambient.mp3, enter-boom.mp3, gate-open.mp3

---

## What Needs Files vs What the Code Already Handles

| Sound Type | Status | Notes |
|------------|--------|-------|
| UI clicks / hovers | ✅ Synthesized | SoundEngine — no file needed |
| Typewriter tick | ✅ Synthesized | SoundEngine.typeChar() |
| Stone door open | ✅ Synthesized | SoundEngine.stoneDoor() |
| Coins / XP | ✅ Synthesized | SoundEngine.coinPickup() |
| Chapter / deed complete | ✅ Synthesized | SoundEngine.chapterComplete() etc. |
| Seal crack, page turn | ✅ Synthesized | Multiple SoundEngine methods |
| Enter gate boom | ✅ File exists | `sfx/enter-boom.mp3` |
| Gate open | ✅ File exists | `sfx/gate-open.mp3` |
| Menu ambient | ✅ File exists | `ambient/menu-ambient.mp3` |
| Map ambient | ✅ File exists | `ambient/map-ambient.mp3` |
| **Expression SFX** | ❌ Missing | 6 files — Part 1 below |
| **Scene ambients** | ❌ Missing | 10 files — Part 2 below |
| **Voice Over** | ❌ Missing | ~395 files — see VO_SCRIPT.md |

---

## PART 1 — EXPRESSION SFX (6 files)

**Folder:** `public/assets/audio/sfx/expressions/`
**Tool:** ElevenLabs Sound Effects generator (elevenlabs.io → Sound Effects tab)
**Format:** MP3, short clips (0.3–1.5 seconds)

These are micro-reactions tied to specific portrait expression changes in story beats.
Paste each description directly into the ElevenLabs Sound Effects generator.

| File | ElevenLabs SFX Prompt |
|------|----------------------|
| `gasp_female.mp3` | `surprised sharp female intake of breath, single gasp, realistic, subtle` |
| `gasp_male.mp3` | `surprised sharp male intake of breath, single gasp, realistic, subtle` |
| `exhale_female.mp3` | `slow quiet female exhale, relief, soft, breath` |
| `exhale_male.mp3` | `slow quiet male exhale, relief, soft, breath` |
| `sharp_breath_female.mp3` | `sudden sharp female inhalation, realization moment, single breath` |
| `sharp_breath_male.mp3` | `sudden sharp male inhalation, realization moment, single breath` |

---

## PART 2 — SCENE AMBIENT LOOPS (10 files)

**Folder:** `public/assets/audio/ambient/`
**Format:** MP3 (192kbps minimum), loopable (clean zero-crossing at loop point), 2–5 min
**Sources:** Freesound.org (free CC0), Ambient-Mixer, Suno/Udio with "no vocals, no music, no beat" prompt

---

### archive-interior-day.mp3
**Scene:** `BG.archive_interior` (study room, day work)
**Atmosphere:** Quiet scholarly building, paper whispers, faint pen scratching, stone hum
**Freesound:** `"old library ambience"` or `"reading room ambient"`
**AI prompt:** `quiet ancient stone library interior, soft paper sounds, distant quill, no music, no voices, atmospheric loop`

### archive-exterior-night.mp3
**Scene:** `BG.archive_night` (exterior, pre-dawn)
**Atmosphere:** Cold stone courtyard, city barely audible, wind on stone
**Freesound:** `"stone courtyard night wind"`
**AI prompt:** `pre-dawn cold stone courtyard, faint wind, very quiet distant city, no music, loop`

### archive-burning.mp3
**Scene:** `BG.archive_escape` (burning corridor, escape)
**Atmosphere:** Fire crackling, wood beams cracking, distant collapse, urgent heat
**Freesound:** `"large indoor fire crackling"` or `"building fire interior"`
**AI prompt:** `large indoor fire roaring, wood cracking in heat, stone and smoke ambience, urgent, no music, loop`

### storage-district-night.mp3
**Scene:** `BG.storage_night` (city square at night)
**Atmosphere:** Foggy city night, distant carts, wind through alleys, sleeping city
**Freesound:** `"medieval city night ambience"` or `"foggy alley night"`
**AI prompt:** `foggy night city, distant cart wheels on cobblestone, cold wind, no music, medieval atmosphere, loop`

### city-morning.mp3
**Scene:** `BG.city_morning` (city gate at dawn)
**Atmosphere:** Cold city just waking, first carts, wind, faint dawn birds
**Freesound:** `"early morning city ambience"`
**AI prompt:** `cold early morning city gate, first carts, workers starting, cold wind, faint dawn birds, no music, loop`

### road-cold-field.mp3
**Scene:** `BG.cold_field` (open road, cold field)
**Atmosphere:** Open cold wind, dry grass, vast emptiness, distant crow
**Freesound:** `"open field cold wind"` or `"winter countryside"`
**AI prompt:** `cold open field wind, dead grass rustling, empty desolate landscape, very distant bird, no music, loop`

### safe-house.mp3
**Scene:** `BG.safe_house` (stone farmhouse interior)
**Atmosphere:** Enclosed stone room, oil lamp, wind on shuttered window, hidden silence
**Freesound:** `"oil lamp burning"` or `"small stone room wind shutter"`
**AI prompt:** `small stone room, oil lamp crackle, wind on wooden shutters, enclosed quiet, no music, loop`

### forest-path.mp3
**Scene:** `BG.forest_path` (dense dark forest road)
**Atmosphere:** Dense forest, wind in canopy, branch creaks, watchful stillness
**Freesound:** `"dark forest ambience"` or `"dense woodland atmospheric"`
**AI prompt:** `dark dense forest, wind through canopy, branch creak, leaves, watchful and still, no music, loop`

### settlement-exterior.mp3
**Scene:** `BG.settlement_exterior` (hidden settlement from outside)
**Atmosphere:** Small inhabited place trying to be quiet, muffled voices, chimney, morning birds
**Freesound:** `"small village morning"` or `"rural settlement ambience"`
**AI prompt:** `small hidden settlement morning, very faint muffled voices, wood fire, morning birds, wind, no music, loop`

### settlement-interior.mp3
**Scene:** `BG.settlement_interior` (inner study room)
**Atmosphere:** Private study, candles, pen on paper, muffled wind outside stone
**Freesound:** `"candlelit study room"` or `"quiet interior candle"`
**AI prompt:** `quiet candlelit stone study, candle sounds, pen on paper, muffled wind outside, no music, loop`

---

## PART 3 — VOICE OVER (see VO_SCRIPT.md for all lines)

**Folder:** `public/assets/audio/vo/`
**Tool:** ElevenLabs text-to-speech (elevenlabs.io)
**Format:** MP3 44.1kHz, stereo
**Total files:** ~395 files covering all of Act 1 (narrator + all characters, including branch beats)

All text and filenames are in `VO_SCRIPT.md` at the project root.
Generate one character at a time so you keep the same voice selected in ElevenLabs.

### ElevenLabs Voice Assignments

| Character | Voice profile description | ElevenLabs settings |
|-----------|--------------------------|---------------------|
| **NARRATOR** | Deep, measured, reads from a journal — not dramatic, the weight is in content not delivery. Unhurried. Ancient warmth. | Stability: 0.80, Similarity: 0.75, Style: 0.10 |
| **MAREN** | Older scholarly woman, precise and careful. Measured. Low warmth most of the time, rare moments of it meaning more. | Stability: 0.80, Similarity: 0.75, Style: 0.15 |
| **KAEL** | Young adult male, observant, slightly guarded. Not dramatic — the voice of someone taking things in. | Stability: 0.72, Similarity: 0.70, Style: 0.20 |
| **RYN** | Young woman, composed beyond her age. Very controlled, minimal variation. The words cost nothing visible. | Stability: 0.85, Similarity: 0.78, Style: 0.08 |
| **SERATH** | Young man, precise and contained. Intelligence is audible but not performed. | Stability: 0.82, Similarity: 0.75, Style: 0.12 |
| **DORATH** | Middle-aged woman, weathered, direct, capable. No wasted words. Authority without effort. | Stability: 0.78, Similarity: 0.73, Style: 0.18 |
| **BREK** | Young adult male, thoughtful, arrives at conclusions from unusual angles. Steady. | Stability: 0.75, Similarity: 0.72, Style: 0.20 |
| **TAL** | Older woman, experienced, the patience of someone who has been building toward something for years. | Stability: 0.80, Similarity: 0.75, Style: 0.15 |
| **SIRA** | Young woman, same age as Kael, composed but with something more direct. Warmer than Ryn. | Stability: 0.74, Similarity: 0.72, Style: 0.22 |
| **SECOND_GUARD** | Middle-aged male, bureaucratic authority, bored with power. Minimal warmth. | Stability: 0.76, Similarity: 0.70, Style: 0.15 |

### Folder structure
```
public/assets/audio/vo/
  narr/           ← all narrator beats
  char/
    maren/
    kael/
    ryn/
    serath/
    dorath/
    brek/
    tal/
    sira/
    second_guard/
```

---

## TOTAL SUMMARY

| Category | Files | Status |
|----------|-------|--------|
| Enter boom / Gate open | 2 | ✅ Already exist |
| Menu / Map ambient | 2 | ✅ Already exist |
| ALL UI/gameplay SFX | 0 | ✅ Synthesized in code |
| **Expression SFX** | **6** | ❌ ElevenLabs SFX generator |
| **Scene ambients** | **10** | ❌ Freesound / AI ambient |
| **Voice over (Act 1)** | **~395** | ❌ ElevenLabs TTS — see VO_SCRIPT.md |
| **NEW FILES TOTAL** | **~411** | |
