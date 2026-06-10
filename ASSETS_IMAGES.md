# Ardenmoor — Image Asset Generation Guide

**Tool:** Leonardo AI (app.leonardo.ai)
**Total new files:** 191 image files  (+60 since last session: 20 speaker-angle BGs, 40 listening/talking portraits)
**Already deleted:** `portraits/maren.png`, `portraits/vael.png` (wrong paths), `chapters/` folder (orphaned)

---

## Generation Settings (apply to ALL unless noted)

- **Style preset:** Anime XL (preferred) or Leonardo Phoenix
- **Negative prompt (paste for every generation):**
  `photorealistic, photograph, 3D render, CGI, cartoonish, revealing clothing, bare skin, cleavage, modern clothing, watermark, signature, text, logo, nudity, horror gore`

## Aspect Ratios

| Type | Dimensions | Use for |
|------|-----------|---------|
| 3:4 | 768×1024 | All character portraits |
| 16:9 | 1344×768 | Standard and Close backgrounds |
| 21:9 | 1536×658 | Wide panoramic backgrounds |

## Priority Order

1. **Part 1: Base backgrounds (10 files)** — enables story to show scenes
2. **Part 2: Background angle variants (19 files)** — img2img from base
3. **Part 2B: Speaker-angle backgrounds (20 files NEW)** — auto-camera system
4. **Part 3: Tier 1 portraits (60 files)** — enables Act 1 dialogue + listening pose
5. **Part 4: Tier 2 portraits (22 files)** — supporting Act 1 characters + listening pose
6. **Part 5: Tier 3 portrait idles + listening (60 files)** — future acts

---

## PART 1 — BASE BACKGROUNDS (10 files)

Place all standard/ and wide/ files in the listed subfolder.

---

### 1 — act1_archive_exterior_night.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Pre-dawn exterior of an ancient stone archive. Towering weathered stone facade, Gothic-arched entrance, carved ornamental trim worn smooth by centuries. Tall narrow windows emit warm amber-gold lamplight. Iron sconce brackets along walls, frost-covered cobblestone courtyard. Deep indigo-to-black sky, cold stars barely visible. Dense low fog clinging to stone foundations. Drifting gold dust motes in lamp glow. Ancient, immovable, forgotten power. Color palette: deep ink black (#05040d), aged gold (#c9a84c), cold indigo, weathered stone grey. Detailed anime scene illustration, no human figures, cinematic wide shot, no text, no watermark.

---

### 2 — act1_archive_study_room.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Interior archive study room, ancient. Floor-to-ceiling shelves packed with manuscripts, rolled parchments, leather-bound volumes in dark wood shelving. Worn oak reading tables, inkwells, quill stands, scattered documents. Amber oil lamp sconces casting warm gold pools on parchment. High stone vaulted ceiling fading into shadow, carved columns. Dust motes drifting in lamp shafts. Color palette: deep ink black, aged gold (#c9a84c), warm parchment yellow, stone grey. No human figures. Detailed anime interior, cinematic wide shot, no text, no watermark.

---

### 3 — act1_storage_district_night.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Night-time open square in an ancient city storage district. Tall stone warehouse walls, large wooden loading doors, iron chain hoists. Dim lanterns at intervals casting cold-blue and amber pools of light. Heavy fog drifting through narrow streets. Cobblestone paving, frost. Deep layered shadows. Faint orange glow of a distant fire on the far horizon. Atmosphere of quiet tension, fog-muffled world. Color palette: cold indigo-grey (#100f20), steel blue, bone-white fog, smoldering amber at horizon. No human figures. Detailed anime wide shot, no text, no watermark.

---

### 4 — act1_cold_field_road.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. A straight grey road cutting through a cold flat field. Overgrown frost-killed grass, visible old field lines, bare skeletal hedgerows. Stone markers at intervals, treeline to one side of the road, deep shadow within. Grey hills in far distance. Sky: pale uncommitted white of early cold morning, no sun visible. Hoarfrost on everything. Vastness and empty threat. Color palette: cold grey-white, muted olive-grey, bare stone, deep shadow blue-black, treeline near-black. No human figures. Detailed anime concept art, ultra-detailed, no text, no watermark.

---

### 5 — act1_safe_house_interior.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Interior of a small ancient stone farmhouse used as a safe house. Low ceiling, thick rough stone walls, worn wooden floor. Simple wooden table, three crate-seats, two oil lamps burning steady in iron hooks. Dry provision shelves, locked wooden chest. Narrow window shuttered and iron-barred. Dense lamplight warmth against oppressive stone enclosure. Earned temporary safety, hidden from the world. Color palette: amber gold (#c9a84c), deep stone grey-black, warm flicker shadow. No human figures. Detailed anime interior, cinematic, no text, no watermark.

---

### 6 — act1_forest_path.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Narrow winding path through a dense dark cold forest. Ancient gnarled trees with massive root systems crossing the path, branches nearly blocking the grey sky above. Thick ground fog between trees. Sparse frost-covered undergrowth. Path twists ahead into deep shadow. Atmosphere of isolation, hidden watchers, cold green-grey silence. Color palette: deep forest shadow (#080d08), cold grey-green, bone-white fog, stone grey. No human figures. Detailed anime, foreboding, cinematic depth, no text, no watermark.

---

### 7 — act1_settlement_study.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Interior of a hidden settlement's private study room. Rough stone walls hung with manuscript pages and hand-drawn maps. Low ceiling beams. Amber oil lamps and candles on a central table covered in documents, codex pages, quills, jars of ink. Simple wooden shelving with scrolls and research materials. Worn rugs on stone floor. Long habitation, secret knowledge, careful organization. Color palette: amber gold (#c9a84c), deep stone grey, parchment yellow, shadow black. No human figures. Detailed anime interior, cinematic, no text, no watermark.

---

### 8 — act1_archive_corridor_smoke.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Aspect:** 21:9 (panoramic)

> Dark fantasy anime scene illustration, dramatic atmospheric style. Long stone archive corridor, panoramic ultra-wide view across full frame. Thick smoke drifting from a fire burning at far end. Stone walls blackening toward the far left end, embers drifting upward, amber-orange fire glow at far left. Near right side still in cold stone shadow with smoke tendrils rising from floor. The moment before full catastrophe. Burning irreplaceable history, orange-black drama. Color palette: fire orange-amber (#e85a1a), deep smoke grey-black, cold stone. No human figures. Detailed anime, panoramic format, no text, no watermark.

---

### 9 — act1_city_gate_morning.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Aspect:** 21:9 (panoramic)

> Dark fantasy anime scene illustration, dramatic atmospheric style. Ancient city gate at cold early morning, panoramic wide view. Low stone arch in a massive original city wall. Wide cobblestone square extending across full panoramic frame. Flat pale white-grey early morning sky, no sun visible. Gate lanterns still burning from night, amber against cool dawn. Old stone buildings visible behind and beyond the wall. Only distant ink silhouettes of figures, no close facial detail. Color palette: pale white-grey dawn, amber lantern gold, stone grey, dark silhouettes. Detailed anime concept art, panoramic, no close human faces, no text, no watermark.

---

### 10 — act1_settlement_exterior.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Aspect:** 21:9 (panoramic)

> Dark fantasy anime scene illustration, dramatic atmospheric style. Exterior of a small hidden settlement tucked behind trees and earthworks, panoramic wide view from the approach road. Low stone-and-timber buildings, patchwork fencing, a main gate of heavy timber planks. Chimney smoke blending with morning mist. Ancient trees surrounding and concealing the settlement walls. Built by people who needed to not be found. Color palette: muted earth tones, grey-brown stone, pale morning mist, amber window glows. No close human figures. Detailed anime, panoramic, atmospheric, no text, no watermark.

---

## PART 2 — BACKGROUND ANGLE VARIANTS (20 files, img2img method)

> **What these are:** Each angle variant is a **fully separate image file** — a different camera angle of the same location, not a CSS crop or shift. The engine loads a different `.jpg` file depending on who is speaking. A "left_speaker" angle frames the left side of the scene; a "right_speaker" angle frames the right side. These feel like real cinematic cuts.
>
> **How to create angle variants:**
> 1. Generate the base image first.
> 2. In Leonardo → open Image2Image → upload the base image.
> 3. Set Image2Image strength to **0.55–0.70** — this ensures the style and lighting match while the composition genuinely shifts to a different camera angle.
> 4. Use the base image's full prompt **+ the Angle Modifier** below appended to the end.
> 5. The result must feel like a different real camera position, not just the same image cropped differently.

---

### act1_archive_exterior_night_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_archive_exterior_night.jpg`
**Modifier:** `Close-up detail, tight framing on the Gothic entrance arch and iron sconce, lamp-lit carved stone surface texture dominant.`

### act1_archive_exterior_night_wide.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Base:** `act1_archive_exterior_night.jpg`
**Modifier:** `Wide establishing shot showing full building scale against night sky, surrounding district and fog-filled courtyard visible.`

### act1_archive_exterior_night_behind.jpg
**Folder:** `public/assets/images/backgrounds/behind/`
**Base:** `act1_archive_exterior_night.jpg`
**Modifier:** `Shot from behind character position looking toward the archive entrance, Gothic arch and iron sconces ahead, lamplight spilling forward onto wet stone.`

### act1_archive_study_room_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_archive_study_room.jpg`
**Modifier:** `Close-up on writing desk surface — open manuscript, ink pot, quill, lamplight on parchment texture, narrow depth of field.`

### act1_archive_study_room_close_b.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_archive_study_room.jpg`
**Modifier:** `Close-up on manuscript shelf wall — rolled parchments and leather-bound spines filling frame, amber lamplight on aged surfaces.`

### act1_archive_study_room_wide.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Base:** `act1_archive_study_room.jpg`
**Modifier:** `Wide establishing shot, full room scale, high vaulted ceiling and full length of shelving walls visible, panoramic.`

### act1_archive_corridor_smoke_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_archive_corridor_smoke.jpg`
**Modifier:** `Close-up on burning stone wall section — embers drifting, fire-scorched carved stonework, smoke billowing tight.`

### act1_archive_corridor_smoke_behind.jpg
**Folder:** `public/assets/images/backgrounds/behind/`
**Base:** `act1_archive_corridor_smoke.jpg`
**Modifier:** `Shot from behind, looking into the smoke-filled corridor toward distant fire glow, view through drifting smoke.`

### act1_storage_district_night_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_storage_district_night.jpg`
**Modifier:** `Close-up on lantern-lit alley corner, dense fog and shadow, cobblestone foreground texture detail.`

### act1_storage_district_night_wide.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Base:** `act1_storage_district_night.jpg`
**Modifier:** `Wide panoramic establishing shot of full storage district square, distant fire glow on horizon visible, fog across full width.`

### act1_city_gate_morning_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_city_gate_morning.jpg`
**Modifier:** `Close-up on the gate arch keystone and lantern, cold morning light on carved stone, narrow depth of field.`

### act1_cold_field_road_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_cold_field_road.jpg`
**Modifier:** `Close-up on road surface — frost-covered cobblestones and frozen grass at road edge, stone marker in near field.`

### act1_cold_field_road_wide.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Base:** `act1_cold_field_road.jpg`
**Modifier:** `Wide panoramic view of cold field, treeline on both sides closing in, distant grey hills, enormous empty sky.`

### act1_cold_field_road_behind.jpg
**Folder:** `public/assets/images/backgrounds/behind/`
**Base:** `act1_cold_field_road.jpg`
**Modifier:** `Shot from behind character position looking down the road toward distant hills, treeline on both sides.`

### act1_safe_house_interior_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_safe_house_interior.jpg`
**Modifier:** `Close-up on oil lamp and table surface, document case and provisions, intimate amber lamplight, narrow depth of field.`

### act1_forest_path_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_forest_path.jpg`
**Modifier:** `Close-up on path surface, gnarled roots crossing, fog at ground level, dark dense forest depth beyond.`

### act1_forest_path_wide.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Base:** `act1_forest_path.jpg`
**Modifier:** `Wide shot, full forest canopy visible, path small between massive ancient trees, sky barely visible.`

### act1_settlement_exterior_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_settlement_exterior.jpg`
**Modifier:** `Close-up on the timber settlement gate, weathered wood and iron fittings, worn path surface leading to gate.`

### act1_settlement_exterior_behind.jpg
**Folder:** `public/assets/images/backgrounds/behind/`
**Base:** `act1_settlement_exterior.jpg`
**Modifier:** `Shot from behind character position looking toward settlement gate through approaching trees, sense of arrival.`

### act1_settlement_study_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act1_settlement_study.jpg`
**Modifier:** `Close-up on document-covered table, layered maps and manuscripts, candlelight on research materials.`

---

## PART 2B — SPEAKER-ANGLE BACKGROUNDS (20 files, img2img method)

> **Purpose:** The story engine automatically loads a different image file when a character on that side is speaking — this is a **real camera cut to a different angle**, not a CSS shift or crop. When the left character speaks, a `_left.jpg` image is loaded that has the camera genuinely oriented toward the left side of the scene. When the right character speaks, `_right.jpg` loads with the camera genuinely oriented toward the right side. It must feel like a real film cut.
>
> **Each of these is a separate image file.** Use Image2Image on the base image with strength 0.50–0.65 and a modifier that pushes the camera angle, not just the framing. The same set/lighting must be recognizable but the angle must be meaningfully different.
>
> **Folder for ALL speaker angles:** `public/assets/images/backgrounds/speaker/`
> **Naming:** `{base_name}_left.jpg` and `{base_name}_right.jpg`

> Same applies to character portrait angles — each angle listed (three_quarter, side, behind, front) is a separate portrait image with the character photographed/painted from that angle. Not CSS rotation, not a filter. A different image.

---

### act1_archive_exterior_night_left.jpg / _right.jpg
**Base:** `act1_archive_exterior_night.jpg`
**Left modifier:** `Camera framing shifted to left third of scene — left side of entrance arch prominent, amber lamplight on left stone columns, right side falls into shadow. Same exterior scene.`
**Right modifier:** `Camera framing shifted to right third of scene — right side of stone facade prominent, courtyard edge and right sconce visible, left falls into shadow.`

### act1_archive_study_room_left.jpg / _right.jpg
**Base:** `act1_archive_study_room.jpg`
**Left modifier:** `Camera framing shifted left — left shelving wall and desk corner prominent, amber lamp closer on left side, right depth recedes.`
**Right modifier:** `Camera framing shifted right — right shelving and column prominent, warm light on right side, left falls to shadow.`

### act1_archive_corridor_smoke_left.jpg / _right.jpg
**Base:** `act1_archive_corridor_smoke.jpg`
**Left modifier:** `Camera shifted left — burning far end of corridor visible more to left, smoke drifting left to right, stone wall texture close on left edge.`
**Right modifier:** `Camera shifted right — stone wall close on right edge, smoke drifting through center, fire glow distant on left.`

### act1_storage_district_night_left.jpg / _right.jpg
**Base:** `act1_storage_district_night.jpg`
**Left modifier:** `Left side of storage square prominent — left warehouse wall and lantern close, fog drifting right, deeper darkness to the right.`
**Right modifier:** `Right side prominent — right wall and lantern close, distant fire glow more visible to right, left edge in deep shadow.`

### act1_city_gate_morning_left.jpg / _right.jpg
**Base:** `act1_city_gate_morning.jpg`
**Left modifier:** `Left arch edge and lantern prominent, gate left side close, pale dawn light enters from left.`
**Right modifier:** `Right arch edge prominent, gate right side detail close, cold morning light on right stone.`

### act1_cold_field_road_left.jpg / _right.jpg
**Base:** `act1_cold_field_road.jpg`
**Left modifier:** `Framing shifted left — left treeline and hedgerow close, road veering toward center-right, open field falling away to the right.`
**Right modifier:** `Framing shifted right — right treeline close, stone marker on right, road stretching left into distance.`

### act1_safe_house_interior_left.jpg / _right.jpg
**Base:** `act1_safe_house_interior.jpg`
**Left modifier:** `Left side of safe house interior — left wall lamp and provision shelf prominent, table extending to right, warm amber on left stone.`
**Right modifier:** `Right side prominent — shuttered window and right wall close, right lamp casting warm circle, left falls to shadow.`

### act1_forest_path_left.jpg / _right.jpg
**Base:** `act1_forest_path.jpg`
**Left modifier:** `Left forest edge close — left ancient tree root and mossy trunk filling left frame, path visible center-right.`
**Right modifier:** `Right forest edge close — right gnarled tree trunk and roots dominant, fog drifting from left, path center-left.`

### act1_settlement_exterior_left.jpg / _right.jpg
**Base:** `act1_settlement_exterior.jpg`
**Left modifier:** `Left side of settlement exterior — left timber gate post and fencing prominent, trees framing left edge.`
**Right modifier:** `Right side — right gate post and building corner close, chimney smoke above right, trees on right edge.`

### act1_settlement_study_left.jpg / _right.jpg
**Base:** `act1_settlement_study.jpg`
**Left modifier:** `Left side of study interior — left map-covered wall and candle close, desk edge extending to right.`
**Right modifier:** `Right side — right shelving and lamp prominent, warmer light on right, left falls into study shadow.`

---

## PART 3 — TIER 1 PORTRAITS (60 files)

> For each character: replace `[EXPR]` in the base prompt with the expression line from the table.
> Every assembled prompt is under 1500 characters.

---

### MAREN (3 files)
**Folder:** `public/assets/images/portraits/maren/`
**Aspect:** 3:4
**Race:** Aethyn — alien, show full face, no covering

**Prompt:** Dark fantasy anime portrait illustration, cel-shaded lighting. Ancient Aethyn scholar, female. Alien non-human appearance: tall gaunt bearing, elongated narrow skull with high domed temples. Completely solid silver disc eyes — no pupils, no iris, smooth mirrored silver. Pale stone-white skin with fine hairline gold vein cracks beneath the surface. Four thin long fingers. Completely shapeless loose-hanging layered dark charcoal scholarly robes with aged gold rune-work trim, HIGH COLLAR at throat, long sleeves to wrists, heavy satchel strap — no body contours visible through fabric. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from left. Deep ink-black atmospheric background (#05040d), faint gold dust motes. NOT photorealistic. No watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Silver disc eyes directed steadily at viewer, spine perfectly straight — ancient measuring intelligence, composed timeless stillness. |
| `listening.png` | Entire body angled 45° toward off-screen speaker, head turned 60°, silver disc eyes directed off-frame — total alien attention. |
| `talking.png` | Head forward and slightly inclined toward viewer, one long four-fingered hand raised mid-gesture. Silver disc eyes at viewer. |

---

### KAEL (3 files)
**Folder:** `public/assets/images/portraits/kael/`
**Aspect:** 3:4

**Prompt:** Dark fantasy anime portrait. Young scholar-traveler mid-20s. Steady warm brown eyes, lean earnest face with light stubble, dark brown hair under a worn hood. Dark traveler's cloak over plain dark archival tunic with HIGH COLLAR at the throat, practical worn clothing with visible road use. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. No text, no watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Direct neutral gaze at viewer, shoulders relaxed and level, alert readiness. |
| `listening.png` | Head angled toward an off-screen speaker, slight forward tilt, hands at rest. Alert and focused. |
| `talking.png` | Earnest and direct gaze at viewer, one hand slightly raised in an open gesture. |

---

### RYN (3 files)
**Folder:** `public/assets/images/portraits/ryn/`
**Aspect:** 3:4

**Prompt:** Dark fantasy anime portrait. Young woman late teens to early 20s. Sharp clear grey eyes, composed still features, a precision beyond her years. Dark cloth wrapped tightly around the head covering all hair — only the face visible. Practical dark muted tunic with HIGH NECKLINE to throat, long full sleeves to wrists, dark travelling cloak, slim composed bearing. No skin visible except the face. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from left. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. No text, no watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Direct steady grey gaze at viewer, perfectly composed, shoulders level — stillness beyond her years. |
| `listening.png` | Head angled toward an off-screen speaker, utterly still, total undivided attention. |
| `talking.png` | Direct and controlled gaze at viewer, minimal deliberate gesture — precise delivery. |

---

### SERATH (3 files)
**Folder:** `public/assets/images/portraits/serath/`
**Aspect:** 3:4

**Prompt:** Dark fantasy anime portrait. Young man early-mid 20s. Intense dark eyes, controlled precise features, ink-scholar's focus, dark hair. Ink-stained fingertips visible at cuffs. Dark hood, dark scholarly robes worn and ink-stained at cuffs, HIGH COLLAR closing at the throat, precise composed bearing. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. No text, no watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Direct composed gaze at viewer, very contained and still, precise upright posture. |
| `listening.png` | Eyes fixed and analytical toward an off-screen speaker, controlled still posture. |
| `talking.png` | Precise and deliberate gaze at viewer, watching for comprehension to land in the listener. |

---

### DORATH (3 files)
**Folder:** `public/assets/images/portraits/dorath/`
**Aspect:** 3:4

**Prompt:** Dark fantasy anime portrait. Middle-aged woman 40s–50s. Direct dark eyes, strong jaw, weathered skin carrying the steadiness of long experience and hard decisions made and lived with. Dark hood loosely worn, dark hair pulled back and partially visible at the edges. Layered dark weathered travelling garments with HIGH COLLAR, heavy cloak, long full sleeves, capable bearing. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from left. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. No text, no watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Direct steady gaze at viewer, settled easy shoulders — the stillness of someone who has made many hard decisions. |
| `listening.png` | Steady evaluating gaze toward an off-screen speaker, tactical patience — already forming a response. |
| `talking.png` | Unhurried direct delivery, holding the listener's gaze, no wasted motion. |

---

## PART 4 — TIER 2 SUPPORTING PORTRAITS

---

### VAEL (3 files)
**Folder:** `public/assets/images/portraits/vael/`
**Aspect:** 3:4

**Prompt:** Dark fantasy anime portrait. Middle-aged man 40s. Deep-set dark eyes, formal and measuring, angular precise features, dark hair with grey at the temples. Dark formal hood, dark academic robes with subdued gold trim, HIGH COLLAR closing at the throat, long sleeves, upright composed posture. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. No text, no watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Torso upright and formally squared to viewer, head level, hands folded — composed formal bearing, direct dark gaze. |
| `listening.png` | Head rotated toward an off-screen speaker, formal upright posture, hands loosely clasped — formal and fully attentive. |
| `talking.png` | One hand raised in a deliberate measured gesture, spine upright, measured gaze at viewer. |

---

### BREK (3 files)
**Folder:** `public/assets/images/portraits/brek/`
**Aspect:** 3:4

**Prompt:** Dark fantasy anime portrait. Young man mid-20s. Green-grey eyes, open direct face, short sandy-brown hair, broad athletic shoulders. Dark hood worn loosely. Practical scholar's tunic, HIGH COLLAR at the throat. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. No text, no watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Direct neutral gaze at viewer, at rest but alert, open easy posture. |
| `listening.png` | Head angled toward an off-screen speaker, relaxed and easy, comfortable direct attention. |
| `talking.png` | Warm and direct gaze at viewer, leaning slightly forward with easy openness. |

---

### ERAN (3 files)
**Folder:** `public/assets/images/portraits/eran/`
**Aspect:** 3:4

**Prompt:** Dark fantasy anime portrait. Older man 50s–60s. Dark eyes with deep crow's feet, heavily weathered and lined face, grey stubble beard, silver-streaked dark hair. Worn dark travelling cloak over dark practical garments with HIGH COLLAR at the throat, long full sleeves. Half-body waist-up portrait. [EXPR]. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. No text, no watermark.

| File | `[EXPR]` |
|------|---------|
| `idle_1.png` | Direct weathered gaze at viewer, easy upright posture — settled experience and long road in them. |
| `listening.png` | Head angled toward an off-screen speaker, patient and settled, quiet receiving attention. |
| `talking.png` | Unhurried and measured, eyes resting on the listener with long-practised steadiness. |

---

## PART 5 — TIER 3 FUTURE CHARACTERS

> Generate when those characters appear in later story acts.
> Minimum: `idle_1.png` only — the game falls back to it for everything else automatically.
> Optional: also generate `listening.png` and `talking.png` for variety.
> Folder: `public/assets/images/portraits/[charactername]/`
> Style: dark fantasy anime portrait illustration, amber side-lighting from one side, ink-black background (#05040d), 3:4 aspect.

---

### SIRA
> Young woman early-mid 20s, Kael's sister. Warm brown eyes, composed features with quiet capability, a family resemblance to Kael in the bones. Dark cloth wrapped tightly around the head covering all hair — only the face visible. Dark practical tunic with HIGH NECKLINE to throat, long full sleeves to wrists, dark cloak, slim composed bearing. No skin visible except the face. Half-body portrait. [idle_1: eyes direct and composed at viewer, shoulders level | idle_2: eyes angled 3/4 to the right, looking aside, attentive | idle_3: slight three-quarter turn, eyes watchful, hands loosely at sides | listening: eyes angled toward an unseen speaker, still and focused | talking: eyes direct at viewer, intent and deliberate]. Warm amber side-lighting from left. Deep ink-black background (#05040d), gold dust motes. No text, no watermark.

### BAREN
> Older man, settlement leader. Heavy-set broad-shouldered build. Steady dark eyes, heavy-set weathered face with a full grey beard, the weight of long responsibility in every feature. Practical worn dark cloak, HIGH COLLAR. Half-body portrait. [idle_1: eyes direct and steady at viewer, bearing of weight and quiet authority | idle_2: eyes turned 3/4, measured assessment | idle_3: three-quarter grounded stance, solid and settled | listening: eyes angled toward an unseen speaker, patient evaluation | talking: eyes direct at viewer, unhurried authority in the gaze]. Warm amber side-lighting. Deep ink-black background (#05040d), gold dust motes. No text, no watermark.

### WREN
> Young person early 20s. Small slight build. Quick alert dark eyes, small sharp features, close-cropped dark hair. Dark hood, dark practical clothing, HIGH NECKLINE covering throat. Half-body portrait. [idle_1: eyes alert and watchful at viewer, light ready posture | idle_2: eyes angled 3/4 to the right, quick attentiveness | idle_3: slight angle, scanning gaze, ready to move | listening: eyes angled toward an unseen speaker, quick focused attention | talking: eyes direct at viewer, quick and deliberate]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

### LYSS
> Young woman early-mid 20s. Calm dark eyes, reserved features, quietly determined — holding more than she shows. Dark cloth wrapped tightly around the head covering all hair — only the face visible. Layered dark modest garments with HIGH NECKLINE to throat, long full sleeves to wrists. No skin visible except the face. Half-body portrait. [idle_1: eyes calm and direct at viewer | idle_2: eyes angled 3/4, looking aside, reserved | idle_3: three-quarter turn, eyes quietly determined | listening: eyes angled toward an unseen speaker, still and reserved | talking: eyes direct at viewer, careful and deliberate]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

### CAEL
> Young man early 20s. Slight build. Watchful dark eyes, quiet contained features, slight build, dark hair — taking in more than he reveals. Dark hood, practical dark clothing, HIGH COLLAR. Half-body portrait. [idle_1: eyes neutral and steady at viewer, contained | idle_2: eyes angled 3/4 to the left, watchful | idle_3: slight three-quarter angle, still and observing | listening: eyes angled toward an unseen speaker, silent attention | talking: eyes direct at viewer, minimal and deliberate]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

### KIRA
> Young woman early-mid 20s. Sharp dark eyes, precise controlled features — the face of someone who does not miss things. Dark cloth wrapped tightly around the head covering all hair — only the face visible. Dark modest attire with HIGH NECKLINE to throat, long full sleeves to wrists. No skin visible except the face. Half-body portrait. [idle_1: eyes composed and direct at viewer, precise | idle_2: eyes angled 3/4, watchful aside | idle_3: slight three-quarter, controlled and measuring | listening: eyes fixed toward an unseen speaker, sharp attention | talking: eyes direct at viewer, precise and purposeful]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

### VOSS
> Shadowy authority figure, face completely hidden inside a deep hood, no face visible — only dense shadow where features would be, a single cold amber eye barely catching light. Ink-black layered robes and heavy cloak that seems to absorb the darkness, no skin visible anywhere. Half-body portrait. [idle_1: facing viewer directly, total void presence where a face would be, one amber pinprick of light | idle_2: hood turned slightly to the side, shadow shifting | idle_3: hood pulled very deep, absolute void, barely visible cold amber glow]. Cold amber single-source lighting from below. Deep black background merging with the form. No text, no watermark.

### ALDREN
> Middle-aged man. Pale unremarkable eyes, deliberately bland mild face, forgettable mousy features — nothing in the face to warn of what lies beneath. Dark hood, scholarly dark clothes, HIGH COLLAR. Half-body portrait. [idle_1: eyes bland and composed at viewer, deliberately nothing beneath them — the blankness is the warning | idle_2: eyes turned 3/4, deliberate careful neutrality | idle_3: three-quarter, perfectly and unnervingly still | listening: eyes angled toward an unseen speaker, mild, attentive, concealing | talking: eyes direct at viewer, measured and entirely unrevealing]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

### ORIN
> Elderly scholar. Ancient dark eyes with deep wrinkles, deeply lined elderly face, white hair and white beard, scholarly and dignified — a lifetime of learning in every line. Worn dark academic robes, HIGH COLLAR. Half-body portrait. [idle_1: eyes neutral and scholarly at viewer, dignified bearing | idle_2: eyes angled 3/4, quiet study | idle_3: three-quarter, quiet dignified bearing | listening: eyes angled toward an unseen speaker, patient scholarly attention | talking: eyes direct at viewer, measured and careful]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

### RENDERED
> Ancient entity called The Rendered. Ink-black humanoid form that is clearly not human — stylized horror, family-acceptable, not grotesque. Face is a complete void with two cold amber-gold light points for eyes. Tattered dark ethereal presence, edges of the form dissolving into shadow. Half-body portrait. [idle_1: facing viewer, total void face, two amber light-points | idle_2: form shifted slightly to the side, shadows flowing | idle_3: angled, cold amber light on dissolving edges]. Deep black background merging with the form. No text, no watermark.

### TAL
> Young-to-mid adult. Neutral dark eyes, plain unremarkable face, ordinary-looking dark hair — the reliability is in the ordinariness. Dark hood, plain practical dark clothing. Half-body portrait. [idle_1: eyes neutral and attentive at viewer, ordinary and dependable | idle_2: eyes angled 3/4 to the left, watching | idle_3: slight three-quarter angle, steady gaze | listening: eyes angled toward an unseen speaker, honest attention | talking: eyes direct at viewer, plain and reliable delivery]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

### GAVRICK
> Older man, formal authority figure. Heavy-set, gravity of age. Stern pale eyes, heavy-set face, heavy jowls and silver hair, formal institutional authority and the weight of long power in every feature. Dark heavy formal robes, HIGH COLLAR. Half-body portrait. [idle_1: eyes direct and authoritative at viewer, straight formal posture | idle_2: eyes angled 3/4, measured consideration | idle_3: formal three-quarter stance, gravity of age visible in the set of the gaze | listening: eyes angled toward an unseen speaker, formal and evaluating | talking: eyes direct at viewer, institutional authority in the delivery]. Warm amber side-lighting. Deep ink-black background (#05040d). No text, no watermark.

---

## PART 6 — ACT 2 BASE BACKGROUNDS (9 files)

Place all standard/ and wide/ files in the listed subfolder.

---

### 11 — act2_wilderness.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Vast cold rolling eastern wilderness — open grassland and low rocky ridges, occasional stands of dark gnarled conifers on distant hillcrests, ancient stone way-markers at intervals along a worn track. Pre-dawn light, enormous pale sky with cold amber streaks at the horizon. Stone markers casting long shadows on frost-killed grass. Exposure and distance, no shelter visible. Color palette: cold grey-green (#0a0e0a), pale dawn amber, deep indigo sky, stone grey. No human figures. Detailed anime concept art, cinematic wide shot, no text, no watermark.

---

### 12 — act2_border_town.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. A small stone-and-timber border settlement at a crossroads. Low connected buildings, a stone-pillared counting station at the road junction with an oil lamp burning inside visible through slit windows, a timber-framed inn opposite. Worn cobblestone square with wagon ruts, a single lantern post at center still lit in cold overcast daylight. Shuttered windows, no figures visible. Controlled provincial quiet, the feel of surveillance without visible watchers. Color palette: cold stone grey (#14120a), pale overcast white, amber lamp glow at windows, deep timber shadow. No human figures. Detailed anime, atmospheric, no text, no watermark.

---

### 13 — act2_border_inn.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Interior of a simple inn common room at a border settlement. Low timber ceiling, rough whitewashed stone walls, four heavy tables with iron candleholders, a stone hearth on one wall with a low fire, simple wooden bar counter with clay bottles and a locked cabinet. Worn plank floor, hanging dried herbs, cracked window with heavy wooden shutters half-open. Dim late-afternoon amber lamp-glow, warm pockets against oppressive low ceiling. Honest provincial poverty, earned temporary safety. Color palette: warm amber (#c9a84c), aged timber brown, stone grey-white, deep floor shadow. No human figures. Detailed anime interior, cinematic, no text, no watermark.

---

### 14 — act2_eastern_road.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Aspect:** 21:9 (panoramic)

> Dark fantasy anime scene illustration, dramatic atmospheric style. A long established road cutting through rolling open terrain, panoramic ultra-wide view. Road straightens ahead toward low grey hills. Ancient cut-stone marker posts at intervals along both sides of the road. A barely-visible distant cluster of buildings at the far right horizon. Pale grey overcast sky with breaks of cold light. Flat exposed country offering no cover, road dominant in frame. Color palette: cold grey-green terrain, pale white-grey sky, stone grey road surface, dark marker posts. No human figures. Detailed anime concept art, panoramic format, no text, no watermark.

---

### 15 — act2_city_approach.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Aspect:** 21:9 (panoramic)

> Dark fantasy anime scene illustration, dramatic atmospheric style. A long straight road approaching a large walled eastern city, panoramic wide view. City walls visible in the middle distance across rolling open terrain, stone towers rising above the wall line. Way-marker posts along the road at intervals leading toward the gate. Three or four distant ink-silhouette figures on the road, too far for facial detail. Cold pale morning light, flat light on the approach terrain. Color palette: pale dawn grey-white, stone wall grey, dark marker posts, cold shadow below the city walls. Detailed anime concept art, panoramic, no close human faces, no text, no watermark.

---

### 16 — act2_city_gate.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Aspect:** 21:9 (panoramic)

> Dark fantasy anime scene illustration, dramatic atmospheric style. The main gate of a large eastern city, panoramic wide view. Massive stone archway with an iron portcullis raised, flanked by heavy guard towers. Wide cobblestone road approaching through the archway, city wall extending on both sides to the panoramic edges. A row of iron lamp brackets along the gatehouse, lamps burning in cold daylight. Two distant guard silhouettes at the archway, no facial detail. Cold institutional daylight, formidable permanent authority in stone. Color palette: cold stone grey, iron dark, pale overcast sky, amber lamp glow on gate arch. No close human faces. Detailed anime concept art, panoramic, no text, no watermark.

---

### 17 — act2_city_alley.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. A narrow cobblestone alley inside a walled city. High stone walls pressing close on both sides, carved gutter channels at the base, an iron lamp bracket with a shuttered lantern giving amber-grey light on the left wall. Thick morning fog drifting at the alley end where it opens onto a wider lane. Carved stone corner details, iron drainage hooks, a closed iron-bolted wooden door. Atmosphere of close surveillance and hidden watchers. Color palette: cold damp stone grey (#10100e), amber-grey lamp glow, deep shadow, pale fog at the end. No human figures. Detailed anime, atmospheric, no text, no watermark.

---

### 18 — act2_city_contact.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Interior of a cloth merchant's back room used as a clandestine meeting space. Low stone ceiling, bolts of dark fabric stacked on heavy wooden shelves lining the walls, wrapped cloth bundles on lower shelves. A rough wooden table at center with a single oil lamp casting warm amber-gold light, cloth samples scattered on the surface as cover. Three plain wooden stools. One small barred window high in the wall admitting cold grey-blue light. A room that looks entirely legitimate, used for something else. Color palette: amber lamp gold (#c9a84c), dark timber shelving, grey-blue cold window light, deep fabric shadow. No human figures. Detailed anime interior, cinematic, no text, no watermark.

---

### 19 — act2_spire_exterior.jpg
**Folder:** `public/assets/images/backgrounds/standard/`
**Aspect:** 16:9

> Dark fantasy anime scene illustration, dramatic atmospheric style. Exterior of the Spire — a tall imposing stone administrative tower rising above surrounding city buildings. Four visible stories with narrow barred slit windows at each level. Carved institutional reliefs on the lower stone facing — angular geometric registry patterns. A heavy iron-banded door at ground level flanked by stone column posts. Lower administrative wings extending on both sides. Cold pale institutional daylight, no warmth, permanent authority made in stone. Color palette: cold institutional grey-stone (#0e0e0e), iron dark, pale overcast sky, deep shadow at the base. No human figures. Detailed anime concept art, cinematic, no text, no watermark.

---

## PART 7 — ACT 2 ANGLE VARIANTS (7 files, Phase 2)

---

### act2_wilderness_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act2_wilderness.jpg`
**Modifier:** `Close-up on road surface, ancient frost-covered stone way-marker prominent in foreground, bleak exposed terrain stretching to cold horizon behind it.`

### act2_wilderness_behind.jpg
**Folder:** `public/assets/images/backgrounds/behind/`
**Base:** `act2_wilderness.jpg`
**Modifier:** `Shot from behind looking ahead down the road toward cold grey hills, way-markers receding into distance, open terrain on both sides, enormous sky.`

### act2_border_inn_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act2_border_inn.jpg`
**Modifier:** `Close-up on inn table surface — oil lamp, two clay cups, a folded document cloth, intimate amber lamplight, shallow depth of field.`

### act2_city_alley_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act2_city_alley.jpg`
**Modifier:** `Close-up on alley wall and lamp bracket, wet cobblestone foreground, amber-grey lamplight on ancient carved stone corner detail.`

### act2_city_contact_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act2_city_contact.jpg`
**Modifier:** `Close-up on meeting table surface — oil lamp center, scattered cloth samples and folded papers, warm amber lamplight on weathered wood.`

### act2_spire_exterior_close_a.jpg
**Folder:** `public/assets/images/backgrounds/close/`
**Base:** `act2_spire_exterior.jpg`
**Modifier:** `Close-up on the Spire's lower facade — heavy iron-banded door and carved institutional stone relief detail, cold shadow at base, scale of the tower pressing down from above.`

### act2_spire_exterior_wide.jpg
**Folder:** `public/assets/images/backgrounds/wide/`
**Base:** `act2_spire_exterior.jpg`
**Modifier:** `Wide establishing shot showing full Spire tower height against the city skyline, lower administrative wings visible on both sides, full scale clear against the overcast sky.`

---

## PART 7B — ACT 2 SPEAKER ANGLES (8 files, manual img2img)

> Same method as PART 2B. Use Image2Image on the base image with strength 0.55–0.65.
> Folder for all Act 2 speaker angles: `public/assets/images/backgrounds/speaker/`

---

### act2_wilderness_left.jpg / _right.jpg
**Base:** `act2_wilderness.jpg`
**Left modifier:** `Camera framing shifted left — left road edge and way-marker close, terrain opening to the right, cold morning light entering from the left.`
**Right modifier:** `Camera framing shifted right — right road edge and way-marker close, terrain falling away to the left, sky opening wide on the right.`

### act2_border_inn_left.jpg / _right.jpg
**Base:** `act2_border_inn.jpg`
**Left modifier:** `Left wall with lamp bracket and bar counter prominent, table extending to right, warm amber concentrated on left side.`
**Right modifier:** `Hearth and right wall close, fire glow dominant on right side, left wall falling into deeper shadow.`

### act2_city_alley_left.jpg / _right.jpg
**Base:** `act2_city_alley.jpg`
**Left modifier:** `Left alley wall close — carved stone and lamp bracket prominent on left edge, alley opening visible center-right, fog drifting from left.`
**Right modifier:** `Right alley wall close — iron-bolted door and stone corner dominant on right, lamp glow reaching center-left, deep shadow to the left.`

### act2_city_contact_left.jpg / _right.jpg
**Base:** `act2_city_contact.jpg`
**Left modifier:** `Left side of back room — left fabric shelves prominent, lamp at table center, warm amber on left side, right falls into shelf shadow.`
**Right modifier:** `Right side — right shelving and barred window corner close, cold window light enters right, warm lamp glow at center.`

---

## TOTAL SUMMARY

| Category | Count | Priority |
|----------|-------|----------|
| Act 1 base backgrounds (standard + wide) | 10 | 1 — generate first |
| Act 2 base backgrounds (standard + wide) | 9 | 1B — Act 2 scenes |
| Act 1 angle variants (close/wide/behind) | 20 | 2 — after Act 1 bases |
| Act 2 angle variants (close/wide/behind) | 7 | 2B — after Act 2 bases |
| Act 1 speaker-angle backgrounds | 20 | 3 — manual img2img |
| Act 2 speaker-angle backgrounds | 8 | 3B — manual img2img |
| Tier 1 portraits (5 chars × 12) | 60 | 4 — Act 1 dialogue + listening |
| Tier 2 portraits (Vael 9, Brek 6, Eran 7) | 22 | 5 — Act 1 supporting |
| Tier 3 portrait idles + listening (12 chars × 5) | 60 | 6 — Act 2+ characters |
| **GRAND TOTAL** | **216** | |
