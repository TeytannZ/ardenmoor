# ARDENMOOR — Claude Code Handoff Document
# READ THIS ENTIRE FILE BEFORE DOING ANYTHING. ASK NOTHING.

---

## MODEL
Use **claude-sonnet-4-6, Max effort**. Sonnet 4.6 is better than Opus for this project's UI/design work.

---

## THE STACK
React 18 + Vite. **Inline styles ONLY** — no Tailwind, no CSS classes for layout. All screens responsive. Supabase auth + cloud save. OpenRouter for AI (per-user API key in Settings). Voice: edge-tts (`pip install edge-tts`, free).

---

## ABSOLUTE RULES — NO EXCEPTIONS
- **Zero blasphemy** anywhere in any file
- **Inline styles only** — never use Tailwind or layout CSS classes
- **No low-opacity text** — all text must be fully readable
- **Never describe emotion in narrator text** — use portrait expression + SFX
- **Choices must be genuinely hard** — real dilemmas, no obvious right answer
- **Every stopping point is a cliffhanger** — user must physically want to come back
- **Women characters**: fully covered, modest
- **Human characters**: fully covered, stylized/painterly faces (not literal)
- **Always notify user of new assets needed**: exact filename, exact path, full generation prompt
- **Claude codes everything** — user provides direction, tests, approves assets

---

## THE CORE LOOP
User opens app → sees story beat → cliffhanger → story pauses at gate → user completes real tasks → gate clears → story continues → next cliffhanger → repeat daily.

---

## FILE MAP (most important files)
```
src/
  App.jsx                    — router, BackButton (calls AudioManager.stopVO before nav)
  screens/
    EnterScreen.jsx          — gate entrance animation, ARDENMOOR title
    OpeningScreen.jsx        — narrator prologue (plays once; NO VO yet; NO replay yet)
    AuthScreen.jsx           — Supabase auth
    MainMenu.jsx             — 5-bg parallax, nav buttons, resource HUD
    OnboardingScreen.jsx     — Maren AI interview, chronicle generation
    StoryScreen.jsx          — MAIN ENGINE: portrait system, typewriter, BG, VO, gates
    PlanViewScreen.jsx       — task checklist, arc/week view
    CheckInScreen.jsx        — Vael biweekly check-in (AI-powered)
    SettingsScreen.jsx       — settings overlay
  components/
    TaskGate.jsx             — inline task gate overlay
    WeekCompleteCheckin.jsx  — Vael appears after week gate clears (once/day guard)
    WeekCompleteCheckin.jsx  — now has rotating messages + first-time Vael intro
    SettingsPanel.jsx        — slide-in settings from right
    WeekCompleteCheckin.jsx
  data/
    story.js                 — act1 beats (a1_seg0–a1_seg16), PORTRAITS map, BG map, helpers
    act2.js                  — act2 beats (a2_seg0–a2_seg16), auto-registers on import
    act3.js                  — act3 beats (registered; no sparks/epochs yet)
    sparks.js                — ACT1_SPARKS (240 sparks, 15/wk × 16wk) + ACT2_SPARKS
    epochs.js                — ACT1_EPOCHS + ACT2_EPOCHS
  lib/
    storage.js               — all persistence; saveOnboardingData resets chronicle progress
    audio.js                 — AudioManager (music/ambient/VO), SoundEngine (synthesized SFX)
    ai.js                    — Maren onboarding, Vael check-in, OpenRouter calls
    supabase.js              — Supabase client
scripts/
  generate-images.mjs        — reads ASSETS_IMAGES.md, auto-generates all images
  gen-voices.mjs             — edge-tts voice generator
ASSETS_IMAGES.md             — ALL image specs (216 total for acts 1+2)
```

---

## STORY STRUCTURE
- 7 Acts × ~60 hours = 420 hours total
- Act 1 "The Archive Burns" ✅ complete (17 segments, 240 sparks, 7 epochs)
- Act 2 "The Eastern Road" ✅ complete (17 segments, 80 sparks, 7 epochs)
- Act 3 ✅ beats registered, NO sparks/epochs yet

### Beat helpers (in story.js)
```js
n("narration text")                          // narrator beat
nb("text", BG.key)                           // narration + BG change
d("CHAR", "left|right", "expr", "text")     // dialogue
dn("CHAR", "side", "expr", "text", BG.key)  // dialogue + BG change
ch([opt1, opt2, opt3])                       // choice beat
op("option text", [beats], null, {effects}) // choice option
```

### Segment keys
`a1_seg0` through `a1_seg16` (act1), `a2_seg0` through `a2_seg16` (act2), etc.
`storySegmentKey(weekNumber, phase)` → `a{phase}_seg{weekNumber}`

### VO filename convention
`{prefix}_s{seg}_{speaker}_{###}.mp3`
e.g. `a2_s3_maren_001.mp3` = Act 2, segment 3, Maren, first line

---

## STORAGE SCHEMA
```js
planProgress = {
  currentArcIdx, currentWeekIdx,
  streak, lastActiveDate,
  inscriptions, coins,
  tasksDone: { 'a0_w0_t0': true },   // reset on new chronicle
  completedArcIdxs: [], completedWeeks: 0,
  unlockedScenes: ['a1_seg0'],
  newUnlockPending: null,
  relationships: { maren, ryn, serath, brek, dorath, tal, sira },
  inventory: [],
  sparkQueue: [], sparkProgress: {},
  pendingEpoch: null, pacingMap: {},
}

dailyState = { lastCheckin: 'YYYY-MM-DD'|null, streak: 0, microEventIndex: 0 }
```
Task key format: `a${arcIdx}_w${weekIdx}_t${taskIdx}` (all 0-based)

---

## PORTRAIT SYSTEM (StoryScreen.jsx)
- `PORTRAITS` map in story.js: `dorath: makePorts('dorath')` etc.
- `makePorts(name)` builds paths to `public/assets/images/portraits/{name}/idle_1.png` etc.
- Portrait shows only when `isActive` (speaker) OR as dimmed listener (`isAnyActive ? 0.62 : 0`)
- **No blink**: inSwap mechanism removed; CSS opacity transition handles everything
- `onError` falls back: angled → base expr → neutral → setFailed(true) → returns null

### Empty portrait folders (need images generated)
`aldren, cael, dorath, kira, lyss, rendered, wren` — folders exist but have 0 files.
User must run `npm run gen:images` or generate manually.

---

## AUDIO SYSTEM
```js
AudioManager.playVO(filename)   // plays from /assets/audio/vo/
AudioManager.stopVO()           // stops current VO
AudioManager.addAmbient(file)   // loops ambient track
AudioManager.clearAmbient()     // stops all ambient
```
BackButton in App.jsx calls `AudioManager.stopVO()` before navigating.
`handleGateContinue` in StoryScreen.jsx calls `AudioManager.stopVO()` before showing Vael.

---

## NAVIGATION FLOW
ENTER → OPENING (prologue, once ever) → AUTH (if no session) → MAIN_MENU → STORY
Returning user: ENTER → MAIN_MENU

---

## PENDING WORK (what the next session should do first)

### 1. Opening scene — DONE ✅
- `OpeningScreen.jsx` fully rewritten — 14 sections, fullscreen images, VO per section
- VO drives timing: text speed matches VO duration, section advances only when VO ends
- Ken Burns zoom on each image, floating particles, no per-section skip
- Only "Skip Prologue" button at top right skips everything
- VO files: `public/assets/audio/vo/prologue/prologue_01.mp3` … `prologue_14.mp3` ✅ (user generated)
- Prologue replay button added to MainMenu top-left ✅
- **Images need to be REGENERATED** — current cutscenes don't match the text. New prompts written (see below or ask user — they have them). Folder: `public/assets/images/cutscenes/`

### 2. Opening scene replay from Main Menu (HIGH PRIORITY)
- Currently prologue only plays once (gated by `ardenmoor:prologue_seen` in localStorage)
- Add a "PROLOGUE" button in MainMenu navigation
- The button clears `ardenmoor:prologue_seen` then navigates to OPENING screen
- User is OK with any reasonable placement — choose what looks right

### 3. Missing portrait generation
- Folders with 0 files: `aldren, cael, dorath, kira, lyss, rendered, wren`
- Need image generation prompts written (check ASSETS_IMAGES.md for existing prompts)
- Then user runs `npm run gen:images`

### 4. Acts 4–7 content
- User decides if/when

### 5. Act 3 sparks + epochs
- Beats exist in act3.js, sparks and epochs not written yet

---

## BUGS FIXED (sessions 1–10, do NOT re-fix these)
1. ARDENMOOR R cut off ✅ — paddingRight 0.35em + parent padding on title wrapper
2. Portrait listeners flashing (inSwap blink) ✅ — inSwap mechanism removed entirely
3. Portrait opacity ✅ — Option B: speaker=1, listener=0.62, narration=0
4. Image right-edge color bleed ✅ — prevBg uses individual CSS props, not shorthand
5. Check-in fires twice/day ✅ — daily date guard in handleGateContinue
6. Golden tasks pre-checked ✅ — saveOnboardingData resets tasksDone on new chronicle
7. CSS textDecoration warning ✅ — merged into single shorthand in GateTaskRow
8. Vael appearing mid-VO ✅ — handleGateContinue calls AudioManager.stopVO() first
9. Vael first-time intro ✅ — WeekCompleteCheckin shows intro message on first appearance
10. Vael rotating messages ✅ — 6 main messages + 4 micro messages, cycle by weekNumber
11. Typewriter sound glitch ✅ — closure-based cancelRef prevents stale ticks

---

## SESSION HISTORY SUMMARY
- Sessions 1–4: Core UI, auth, storage, audio, story engine
- Session 5: Chronicle system, Maren AI, lazy epoch architecture
- Session 6: Supabase write-through, per-user OpenRouter key
- Session 7: Multi-act engine, act2 content, voice generator
- Session 8: Scene gate system, journal, spark/epoch queue
- Session 9: Settings overlay, week check-in inline, act3 beats
- Session 10: Bug fixes (see list above), Vael intro, typewriter fix
