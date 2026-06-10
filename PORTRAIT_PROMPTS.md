# Ardenmoor — Portrait Prompts

## How to use this file

Two-phase workflow. Generate each character's **CORE** image first with no reference, then use it to generate all **VARIATIONS** with Character Reference.

---

## ⚙️ Leonardo Settings — apply to EVERY generation

| Setting | Value |
|---------|-------|
| **Model** | Lucid Origin |
| **Aspect ratio** | 3:4 — if not visible in the UI, use 4:5 (the closest match) |
| **Quality** | High |
| **Negative prompt** | *(paste for every generation — see below)* |

**Negative prompt:**
```
photorealistic, photograph, 3D render, CGI, hyperrealistic, realistic skin, modern clothing,
hijab, niqab, religious veil, anime eyes, cartoonish, revealing clothing, bare skin,
watermark, signature, text, logo, nudity, horror gore
```

---

### Lucid Origin prompting tips
- **Structure:** subject → clothing/features → expression → lighting → background → style
- **End every prompt with:** `Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.`
- Lighting direction is powerful — keep it consistent between CORE and VARIATIONS
- Generate **4 images per batch** for the CORE, then pick the strongest result

### Note on cloth coverings
Human characters wear dark fantasy RPG adventurer gear: dark hoods, aged wound cloth, road-worn linen — the kind seen in Elden Ring, Bloodborne, Witcher concept art. Not modern religious dress.

---

## 📋 Two-Phase Workflow

### Phase 1 — CORE (idle_1)
1. Use the full prompt under `### CORE — idle_1.png`
2. No reference image — generate fresh
3. Generate 4 images → save the best one — this is the character's reference

### Phase 2 — VARIATIONS with Image to Image (free tier)

> **Note:** Character Reference requires a paid plan on Leonardo. The free tier uses **Image to Image (img2img)** instead — it directly modifies the CORE image, which is better for subtle expression changes anyway.

After generating the CORE:
1. Open your idle_1 result → click **"Use as Image to Image"** (the img2img option)
2. Set **Image Strength** (how much to change from the original):
   - `15–20%` — subtle: slight head turns, gaze shifts (idle_2, idle_3)
   - `20–30%` — clear: distinct expression (happy, sad, thoughtful, listening, talking)
   - `30–40%` — strong: intense states (angry, fearful, urgent, surprised)
3. Paste the short variation prompt from the `VARIATIONS` section below
4. Same model, same ratio, same negative prompt

> **⚠️ Alien characters (Maren, Vael) — critical note:** Never use emotion words like "happy" or "angry" in the prompt. The AI reads these as human facial expressions and will try to add a smile/frown (impossible on a face with solid silver disc eyes and no visible mouth). Maren and Vael variation prompts use **specific physical body descriptions** instead — head angle, torso lean, shoulder height, hand position. Use strength `25–35%` for these characters.

---
---

## PART 1 — TIER 1 MAIN CHARACTERS

---

## MAREN — `portraits/maren/`

> **Aethyn — non-human alien species. Show full alien face. No covering.**
> **Emotion rule:** Solid silver disc eyes cannot smile or frown. ALL emotion comes from body posture, head angle, torso lean, and shoulder position. Variation prompts describe exact physical positions — do NOT say "happy" or "sad".

### CORE — idle_1.png
Ancient Aethyn scholar, female. Alien non-human appearance: tall gaunt bearing, elongated narrow skull with high domed temples. Completely solid silver disc eyes — no pupils, no iris, smooth mirrored silver coin-flat. Pale stone-white skin with fine hairline gold vein cracks tracing beneath the surface. Four thin long fingers on each hand. Layered dark charcoal scholarly robes with aged gold rune-work trim, HIGH COLLAR at the throat, long sleeves to wrists, heavy satchel strap crossing one shoulder. Half-body waist-up portrait. Silver disc eyes directed steadily at viewer, spine perfectly straight — ancient measuring intelligence, composed timeless stillness. Dramatic warm amber side-lighting from left. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1

*Strength guide: idle_2/idle_3 = 15–20% · emotional states = 25–35%*
*Never use emotion words. Describe exact body positions.*

**idle_2.png** *(15–20%)*
Half-body waist-up portrait. Head tilted 20° to the left, silver disc eyes directed aside, one four-fingered hand partially raised to chest height with fingers loosely spread — attention directed away from viewer. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png** *(15–20%)*
Half-body waist-up portrait. Head angled 25° to the right, torso slightly turned away from viewer, silver disc eyes angled sideways — paused mid-internal-thought. One four-fingered hand raised at mid-torso. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**happy.png** *(25–30%)*
Half-body waist-up portrait. Torso angled open toward viewer, head tilted 10° right, the gaunt shoulders dropped and loose — a visible unburdening of the perpetual vigilance. Silver disc eyes forward. Body language: less angular than usual. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**sad.png** *(30–35%)*
Half-body waist-up portrait. Torso folded inward and downward from the waist, head dropped 30° toward the chest, shoulders narrowed and drawn inward — the posture of something ancient bearing great weight. Silver disc eyes angled toward the floor. Warm amber side-lighting from left, dimmer. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**angry.png** *(30–35%)*
Half-body waist-up portrait. Head thrust forward and down, chin lowered, spine completely rigid and locked vertical — the absolute stillness immediately before a decision is executed. Silver disc eyes level and unmoving directly at viewer. Warm amber side-lighting from left, harder and more severe. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**surprised.png** *(30–35%)*
Half-body waist-up portrait. Spine recoiled 15° backward, head pulled back and slightly up, one four-fingered hand raised sharply to chest height — the body of an ancient being processing sudden unexpected information. Silver disc eyes forward and wide in their sockets. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**fearful.png** *(30–35%)*
Half-body waist-up portrait. Head whipped 50° to the left, one shoulder raised and turned, other shoulder dropped — the stance of a very old being that has just recognised something dangerous. Silver disc eyes scanning left. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png** *(25–30%)*
Half-body waist-up portrait. Head angled 30° downward-left, one long four-fingered hand raised with one finger extended horizontally as if tracing an invisible line — deep internal computation. Body angled 15° away from viewer. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**urgent.png** *(30–35%)*
Half-body waist-up portrait. Torso leaned 20° forward from the hips toward viewer, head level and directly forward, silver disc eyes locked — the geometry of needing something heard immediately. One four-fingered hand extended partway toward viewer. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png** *(25–30%)*
Half-body waist-up portrait. Entire body angled 45° toward off-frame left, head turned 60° to the left, silver disc eyes directed at something off-frame — total attention directed away from viewer, completely still. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png** *(25–30%)*
Half-body waist-up portrait. Head forward and slightly inclined toward viewer, torso angled 10° forward, one long four-fingered hand raised mid-gesture with fingers spread — actively conveying information. Silver disc eyes directed at viewer. Warm amber side-lighting from left. Ink-black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## KAEL — `portraits/kael/`

### CORE — idle_1.png
Young scholar-traveler mid-20s. Steady warm brown eyes — the only visible features, alert and capable with road experience in them. Dark hood pulled close covering the head, aged dark cloth wound across the lower face — only the brown eyes visible above the face wrap, worn traveler's covering in dark fantasy RPG style. Dark traveler's cloak over plain dark archival tunic with HIGH COLLAR closing at the throat above the face wrap, practical worn clothing. Half-body waist-up portrait. Brown eyes: direct neutral gaze at viewer, shoulders relaxed and level, alert readiness in the posture. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body waist-up portrait. Brown eyes angled 3/4 to the right, head slightly turned, attentive and listening. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body waist-up portrait. Slight 3/4 turn, brown gaze relaxed and open, weight evenly placed. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**happy.png**
Half-body waist-up portrait. Brown eyes crinkled at corners with genuine warmth and brightness, posture open and relaxed. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**sad.png**
Half-body waist-up portrait. Brown eyes downcast, subtle weight in the gaze, slight inward lean of the shoulders. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**angry.png**
Half-body waist-up portrait. Hard direct stare, head slightly forward, brown eyes fixed and locked on viewer. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**surprised.png**
Half-body waist-up portrait. Brown eyes suddenly wide open, eyebrows raised, a visible jolt of tension in the posture. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**fearful.png**
Half-body waist-up portrait. Brown eyes wide and scanning, shoulders raised in visible tension, posture tightened. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png**
Half-body waist-up portrait. Brown eyes unfocused and inward, head tilted slightly to the side, one hand loosely raised near chin. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**urgent.png**
Half-body waist-up portrait. Brown eyes sharp and close-focused, leaning sharply forward from the waist, intense locked gaze on viewer. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body waist-up portrait. Brown eyes angled 3/4 toward an off-screen speaker, alert and focused, slight forward tilt. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body waist-up portrait. Brown eyes earnest and direct at viewer, one hand slightly raised in an open gesture. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## RYN — `portraits/ryn/`

### CORE — idle_1.png
Young woman late teens to early 20s. Sharp clear grey eyes — the only visible features. Dark hood pulled close over the head, aged dark linen wound across the lower face and jaw — only the grey eyes visible above the face wrap, worn traveler's covering in dark fantasy RPG style. Practical dark tunic with HIGH COLLAR closing at the throat above the face wrap, long full sleeves, dark cloak over it, slim composed bearing. Half-body waist-up portrait. Grey eyes: direct steady gaze at viewer, perfectly composed, shoulders level — stillness beyond her years. Dramatic warm amber side-lighting from left. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body waist-up portrait. Grey eyes angled 3/4 to the right, observing from peripheral awareness, effortlessly watchful. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body waist-up portrait. Slight 3/4 turn, body utterly still, grey gaze neutral and precise. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**happy.png**
Half-body waist-up portrait. Grey eyes with barely visible soft warmth at the corners of the gaze — rare, barely detectable. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**sad.png**
Half-body waist-up portrait. Grey eyes cast downward and slightly to the left, tightly controlled grief visible only in the angle of the gaze. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**angry.png**
Half-body waist-up portrait. Grey eyes cold and utterly still — controlled before acting, no heat. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**surprised.png**
Half-body waist-up portrait. Grey eyes briefly wide open — caught for one instant before composure reasserts. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**fearful.png**
Half-body waist-up portrait. Grey eyes wide and hyperaware, body very still, processing without visibly reacting. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png**
Half-body waist-up portrait. Grey eyes lowered and to the left, slight head tilt, holding something carefully inside. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**urgent.png**
Half-body waist-up portrait. Grey eyes direct and sharp at viewer, leaning slightly forward, posture clipped and decisive. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body waist-up portrait. Grey eyes angled 3/4 toward an off-screen speaker, utterly still, total undivided attention. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body waist-up portrait. Grey eyes direct and controlled at viewer, precise delivery visible in the quality of the gaze, minimal deliberate gesture. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## SERATH — `portraits/serath/`

### CORE — idle_1.png
Young man early-mid 20s. Intense dark eyes — the only visible features, ink-scholar's focus, habitual precision in the gaze. Dark hood over head, aged dark cloth wound across the lower face — only the dark eyes visible above the face wrap, road-worn scholar's covering in dark fantasy RPG style. Dark scholarly robes worn and ink-stained at cuffs, HIGH COLLAR closing at the throat above the face wrap, precise composed bearing. Half-body waist-up portrait. Dark eyes: direct composed gaze at viewer, very contained and still, precise upright posture. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body waist-up portrait. Dark eyes angled 3/4 to the left, looking aside with distant analytical focus, head slightly turned. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body waist-up portrait. Slight 3/4 turn as if pausing mid-reading, dark eyes naturally withdrawn and inward. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**happy.png**
Half-body waist-up portrait. Dark eyes fractionally brighter — warmth briefly visible in the gaze, rare, not given freely. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**sad.png**
Half-body waist-up portrait. Dark eyes lowered and inward, the weight of having calculated the cost visible in the gaze. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**angry.png**
Half-body waist-up portrait. Dark eyes cold and utterly still — more unsettling than hot anger. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**surprised.png**
Half-body waist-up portrait. Dark eyes wide open — genuine surprise breaking through control for one visible moment. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**fearful.png**
Half-body waist-up portrait. Dark eyes wide and deeply focused, controlled and not panicked, slight backward lean. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png**
Half-body waist-up portrait. Dark eyes cast down, one ink-stained finger raised tracing an invisible line, deep internal calculation. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**urgent.png**
Half-body waist-up portrait. Dark eyes stripped of usual reserve, direct and focused, leaning slightly forward. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body waist-up portrait. Dark eyes fixed and analytical toward an off-screen speaker, controlled still posture. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body waist-up portrait. Dark eyes precise and deliberate at viewer, watching for comprehension to land in the listener, measured gesture. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## DORATH — `portraits/dorath/`

### CORE — idle_1.png
Middle-aged woman 40s–50s. Direct dark eyes — the only visible features, strong and capable, the steadiness of long experience. Dark hood over the head, aged dark cloth wound across the lower face — only the dark eyes visible above the face wrap, road-worn and practical, dark fantasy adventurer style. Layered dark weathered travelling garments with HIGH COLLAR closing at the throat above the face wrap, heavy cloak over it, long full sleeves, capable bearing. Half-body waist-up portrait. Dark eyes: direct steady gaze at viewer, settled easy shoulders — the stillness of someone who has made many hard decisions. Dramatic warm amber side-lighting from left. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body waist-up portrait. Dark eyes angled 3/4 to the right in calm tactical assessment, head slightly turned. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body waist-up portrait. Slight 3/4 turn, dark eyes relaxed but never fully off-guard, weight easy and confident. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**happy.png**
Half-body waist-up portrait. Dark eyes with small earned warmth — not given freely, the warmth of someone who trusts carefully. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**sad.png**
Half-body waist-up portrait. Dark eyes slightly downcast, the sadness of knowing too much for too long held quietly in the gaze. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**angry.png**
Half-body waist-up portrait. Dark eyes cold and measured, chin lowered, shoulders set — controlled anger that leads directly to action. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**surprised.png**
Half-body waist-up portrait. Dark eyes briefly widened, a quick visible shift already being reintegrated — she doesn't stay surprised. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**fearful.png**
Half-body waist-up portrait. Dark eyes sharply wide and scanning, shoulders raised, calculating options, not paralyzed. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png**
Half-body waist-up portrait. Dark eyes looking past the immediate space, unfocused and distant, working out the next steps. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**urgent.png**
Half-body waist-up portrait. Dark eyes sharp and direct at viewer, leaning slightly forward, already moving in posture even while physically still. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body waist-up portrait. Dark eyes steady and evaluating toward an off-screen speaker, tactical patience — already forming a response. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body waist-up portrait. Dark eyes unhurried and direct at viewer, holding the listener, no wasted motion in the delivery. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---
---

## PART 2 — TIER 2 SUPPORTING CHARACTERS

---

## VAEL — `portraits/vael/`

> **Aethyn — non-human alien species. Show full alien face. No covering.**
> **Emotion rule:** Same as Maren — solid silver eyes cannot express emotion. All emotion through body position, head angle, torso lean, hand placement. Do NOT use emotion words.

### CORE — idle_1.png
Aethyn academy scholar, male. Alien non-human appearance: lean and precise build, elongated narrow skull. Completely solid silver eyes — no pupils, no iris, smooth silver disc-flat in the sockets. Pale skin with faint silver-grey vein patterns beneath the surface. Four thin long fingers. Structured slate-grey academic robes with geometric gold border trim at collar and cuffs, HIGH COLLAR at the throat, formal upright posture. Half-body waist-up portrait. Head level, solid silver eyes directed at viewer — discs catching amber light, formal upright bearing of long academic authority. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1 (25–35% strength — alien features need lower strength)

*Never use emotion words. Describe exact body positions.*

**idle_2.png** *(15–20%)*
Half-body waist-up portrait. Head turned 25° to the left, silver disc eyes angled aside, slight tension in the lean neck, four thin fingers loosely at the side — attention directed away from viewer. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png** *(15–20%)*
Half-body waist-up portrait. Head turned 20° right, torso slightly angled away, four thin fingers lightly clasped before the body — paused, contained. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**happy.png** *(25–30%)*
Half-body waist-up portrait. Spine fractionally less rigid than usual, shoulders dropped slightly, head 8° forward — the extremely subtle loosening of a formal being that has received good news. Silver disc eyes forward. Warm amber side-lighting from right, slightly warmer. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**sad.png** *(30–35%)*
Half-body waist-up portrait. Head bowed 25° downward, shoulders drawn inward, four thin fingers clasped tightly before the chest — a contained internal weight that the formal posture barely holds. Silver disc eyes angled down. Warm amber side-lighting from right, slightly cooler. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png** *(25–30%)*
Half-body waist-up portrait. Head angled 20° down-left, one four-fingered hand raised with one extended finger horizontal — internal computation visible only in the precise arrested geometry. Body 15° away from viewer. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**urgent.png** *(30–35%)*
Half-body waist-up portrait. Torso leaned 15° forward from the hips, head level, silver disc eyes fixed directly at viewer, one four-fingered hand extended partway toward viewer — the posture of something that needs to be heard now. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png** *(25–30%)*
Half-body waist-up portrait. Body angled 45° toward off-frame right, head 55° to the right, four thin fingers folded, completely still — total formal alien attention directed off-frame. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png** *(25–30%)*
Half-body waist-up portrait. Head forward and slightly inclined toward viewer, one four-fingered hand raised in a measured precise gesture, silver disc eyes on viewer — formal delivery of specific information. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## BREK — `portraits/brek/`

### CORE — idle_1.png
Young man mid-20s. Green-grey eyes — the only visible features, open and direct, unconventional angle in the gaze. Dark hood and aged cloth face wrap covering head and lower face — only the green-grey eyes visible above the wrap, traveler's covering in dark fantasy RPG style. Broad athletic shoulders. Practical scholar's tunic, HIGH COLLAR at the throat above the face wrap. Half-body waist-up portrait. Green-grey eyes: direct neutral gaze at viewer, physically at rest but alert, open easy posture. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body waist-up portrait. Green-grey eyes angled 3/4 to the left, looking in an unexpected direction, natural and unguarded. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body waist-up portrait. Slight 3/4 turn, green-grey eyes open and relaxed, natural forward lean. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png**
Half-body waist-up portrait. Green-grey eyes lowered and to the side, arriving at a conclusion from an unusual angle, slight head tilt. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body waist-up portrait. Green-grey eyes angled toward an off-screen speaker, relaxed and easy, comfortable direct attention. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body waist-up portrait. Green-grey eyes warm and direct at viewer, leaning forward with easy openness. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## ERAN — `portraits/eran/`

### CORE — idle_1.png
Older man 50s–60s. Dark eyes with deep crow's feet at the corners — the only visible features, a lifetime of road in them. Dark road-worn travel wrap covering head and lower face — only the dark eyes visible above the wrap, aged and weathered, dark fantasy traveler style. Worn dark travelling cloak over dark practical garments, HIGH COLLAR covering the throat above the wrap, long full sleeves. Half-body waist-up portrait. Dark eyes: direct weathered gaze at viewer, easy upright posture — settled experience and long road. Dramatic warm amber side-lighting from right. Deep ink-black atmospheric background (#05040d), faint drifting gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

---

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body waist-up portrait. Dark eyes angled 3/4 to the left, looking aside with the ease of someone who has seen much. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body waist-up portrait. Slight 3/4 turn, contemplative stillness, dark eyes comfortable with silence. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**thoughtful.png**
Half-body waist-up portrait. Dark eyes lowered and slightly distant, long memory visible behind the gaze. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**sad.png**
Half-body waist-up portrait. Dark eyes cast downward, quiet deep loss — the weight of what has been seen and carried. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body waist-up portrait. Dark eyes angled toward an off-screen speaker, patient and settled, quiet receiving attention. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body waist-up portrait. Dark eyes unhurried and measured on the listener, long-practised steadiness in the delivery. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---
---

## PART 3 — TIER 3 FUTURE CHARACTERS
*(Generate when these characters appear in later acts)*
Each has 5 files: idle_1 (CORE), then idle_2, idle_3, listening, talking (VARIATIONS).

---

## SIRA — `portraits/sira/`

### CORE — idle_1.png
Young woman early-mid 20s, Kael's sister. Warm brown eyes — the only visible features, composed and quietly capable. Dark hood over the head, aged cloth wound around the lower face — only the warm brown eyes visible above the face wrap, traveler's covering in dark fantasy RPG style. Dark practical tunic with HIGH COLLAR at the throat above the face wrap, long full sleeves, dark cloak over it. Half-body portrait. Brown eyes: direct and composed at viewer, shoulders level. Warm amber side-lighting from left. Deep ink-black background (#05040d), gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Warm brown eyes angled 3/4 to the right, looking aside, attentive. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Slight three-quarter turn, warm brown eyes watchful, hands loosely at sides. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Warm brown eyes angled toward an unseen speaker, still and focused. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Warm brown eyes direct at viewer, intent and deliberate. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## BAREN — `portraits/baren/`

### CORE — idle_1.png
Older man, settlement leader. Heavy-set broad-shouldered build. Steady dark eyes — the only visible features, weight of long responsibility in them. Dark hood and aged cloth wound across the lower face — only the steady dark eyes visible, road-worn authority in dark fantasy RPG style. Practical worn dark cloak, HIGH COLLAR, fully covered. Half-body portrait. Dark eyes: direct and steady at viewer, bearing of quiet authority. Warm amber side-lighting from right. Deep ink-black background (#05040d), gold dust motes. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Dark eyes turned 3/4, measured assessment. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Three-quarter grounded stance, dark eyes solid and settled. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Dark eyes angled toward an unseen speaker, patient evaluation. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Dark eyes direct at viewer, unhurried authority in the gaze. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## WREN — `portraits/wren/`

### CORE — idle_1.png
Young person early 20s. Small slight build. Quick alert dark eyes — the only visible features, swift and perceptive. Dark hood and aged cloth wound across the lower face — only the dark eyes visible, nimble traveler's covering in dark fantasy RPG style. Dark practical clothing, HIGH COLLAR, fully covered. Half-body portrait. Dark eyes: alert and watchful at viewer, light ready posture. Warm amber side-lighting from left. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Alert dark eyes angled 3/4 to the right, quick attentiveness. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Alert dark eyes at a slight angle, scanning gaze, ready to move. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Alert dark eyes angled toward an unseen speaker, quick focused attention. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Alert dark eyes direct at viewer, quick and deliberate delivery. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## LYSS — `portraits/lyss/`

### CORE — idle_1.png
Young woman early-mid 20s. Calm dark eyes — the only visible features, reserved and quietly determined. Dark hood over the head, aged cloth wound across the lower face — only the dark eyes visible above the face wrap, traveler's covering in dark fantasy RPG style. Layered dark garments with HIGH COLLAR at the throat above the face wrap, long full sleeves. Half-body portrait. Dark eyes: calm and direct at viewer. Warm amber side-lighting from right. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Calm dark eyes angled 3/4, looking aside, reserved. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Calm dark eyes at three-quarter turn, quietly determined. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Calm dark eyes angled toward an unseen speaker, still and reserved. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Calm dark eyes direct at viewer, careful and deliberate. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## CAEL — `portraits/cael/`

### CORE — idle_1.png
Young man early 20s. Slight build. Watchful dark eyes — the only visible features, quiet and contained. Dark hood and aged cloth wound across the lower face — only the dark eyes visible, traveler's covering in dark fantasy RPG style. Practical dark clothing, HIGH COLLAR, fully covered. Half-body portrait. Dark eyes: neutral and steady at viewer, contained. Warm amber side-lighting from left. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Watchful dark eyes angled 3/4 to the left, watchful. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Dark eyes at a slight three-quarter angle, still and observing. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Dark eyes angled toward an unseen speaker, silent attention. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Dark eyes direct at viewer, minimal and deliberate. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## KIRA — `portraits/kira/`

### CORE — idle_1.png
Young woman early-mid 20s. Sharp focused dark eyes — the only visible features, precise and controlled. Dark hood over the head, aged cloth wound across the lower face — only the sharp dark eyes visible above the face wrap, traveler's covering in dark fantasy RPG style. Dark fitted garments with HIGH COLLAR at the throat above the face wrap, long sleeves. Half-body portrait. Dark eyes: composed and direct at viewer, precise. Warm amber side-lighting from left. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Sharp dark eyes angled 3/4, watchful aside. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Sharp dark eyes at slight three-quarter, controlled and measuring. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Sharp dark eyes fixed toward an unseen speaker, precise attention. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Sharp dark eyes direct at viewer, precise and purposeful delivery. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## VOSS — `portraits/voss/`

> No Character Reference needed — face is already completely hidden in shadow. Generate all 5 fresh.

### CORE — idle_1.png
Shadowy authority figure. Face completely hidden inside a deep hood — only dense shadow where features would be, a single cold amber eye barely catching light deep in the void. Ink-black layered robes and heavy cloak absorbing the surrounding darkness, no skin visible. Half-body portrait. Facing viewer directly, total void presence, one amber pinprick visible in the shadow. Cold amber single-source lighting from below. Deep black background merging with the form. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_2.png**
Half-body portrait. Shadowy hooded void figure — hood turned slightly to the side, deep shadow shifting, cold amber glow barely visible within. Cold amber under-lighting. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Shadowy hooded void figure — hood pulled very deep, absolute void, barely visible cold amber glow within the shadow. Cold amber under-lighting. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Shadowy hooded void figure — form angled toward an unseen speaker, amber glow shifting in the deep shadow. Cold amber under-lighting. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Shadowy hooded void figure — facing viewer, cold amber eye more visible — directed cold authority, the impression of being spoken to. Cold amber under-lighting. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## ALDREN — `portraits/aldren/`

### CORE — idle_1.png
Middle-aged man. Pale unremarkable eyes — the only visible features, deliberately bland and mild. Dark hood and aged cloth wound across the lower face — only the pale eyes visible, concealing covering in dark fantasy RPG style. Scholarly dark clothes, HIGH COLLAR, fully covered. Half-body portrait. Pale eyes: bland and composed at viewer, deliberately nothing beneath — the blankness is the warning. Warm amber side-lighting from right. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Pale eyes turned 3/4, deliberate careful neutrality. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Pale eyes at three-quarter, perfectly and unnervingly still. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Pale eyes angled toward an unseen speaker, mild, attentive, concealing. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Pale eyes direct at viewer, measured and entirely unrevealing. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## ORIN — `portraits/orin/`

### CORE — idle_1.png
Elderly scholar. Ancient dark eyes with deep wrinkles at the corners — the only visible features, scholarly and dignified. Dark hood and aged cloth wound close across the lower face — only the dark eyes visible, road-worn scholar's covering in dark fantasy RPG style. Worn dark academic robes, HIGH COLLAR, fully covered. Half-body portrait. Dark eyes: neutral and scholarly at viewer, dignified bearing. Warm amber side-lighting from left. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Ancient dark eyes angled 3/4, quiet study. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Ancient dark eyes at three-quarter, quiet dignified bearing. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Ancient dark eyes angled toward an unseen speaker, patient scholarly attention. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Ancient dark eyes direct at viewer, measured and careful delivery. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## RENDERED — `portraits/rendered/`

> No Character Reference needed — not a face-based character. Generate all 5 fresh.

### CORE — idle_1.png
Ancient entity called The Rendered. Ink-black humanoid form, clearly not human — stylized dark fantasy horror, not grotesque. Face is a complete void with two cold amber-gold light points for eyes. Tattered dark ethereal presence, edges dissolving into shadow. Half-body portrait. Facing viewer, total void face, two cold amber light-points steady. Deep black background merging with the form. Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_2.png**
Half-body portrait. The Rendered — ink-black void form shifted slightly to the side, shadows flowing, cold amber light-points angled. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. The Rendered — ink-black void form angled, cold amber light on dissolving shadow-edges. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. The Rendered — form turned toward an unseen speaker, cold amber light-points angled in that direction. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. The Rendered — facing viewer, cold amber light-points brighter — directed cold attention. Deep black background. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## TAL — `portraits/tal/`

### CORE — idle_1.png
Young-to-mid adult. Neutral dark eyes — the only visible features, attentive and reliable. Dark hood and aged cloth wound across the lower face — only the dark eyes visible, plain traveler's covering in dark fantasy RPG style. Plain practical dark clothing, fully covered. Half-body portrait. Dark eyes: neutral and attentive at viewer, ordinary and dependable. Warm amber side-lighting from right. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Neutral dark eyes angled 3/4 to the left, watching. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Neutral dark eyes at slight three-quarter angle, steady gaze. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Neutral dark eyes angled toward an unseen speaker, honest attention. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Neutral dark eyes direct at viewer, plain and reliable delivery. Warm amber side-lighting from right. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## GAVRICK — `portraits/gavrick/`

### CORE — idle_1.png
Older man, formal authority figure. Heavy-set, gravity of age. Stern pale eyes — the only visible features, formal institutional authority. Dark formal hood and aged cloth wound across the lower face — only the pale eyes visible, institutional dark covering in dark fantasy RPG style. Dark heavy formal robes, HIGH COLLAR, fully covered. Half-body portrait. Pale eyes: direct and authoritative at viewer, straight formal posture. Warm amber side-lighting from left. Deep ink-black background (#05040d). Dark fantasy painterly concept art, Bloodborne aesthetic, non-photorealistic. No watermark.

### VARIATIONS — img2img from idle_1 (20–30% strength)

**idle_2.png**
Half-body portrait. Stern pale eyes angled 3/4, measured consideration. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**idle_3.png**
Half-body portrait. Stern pale eyes at three-quarter, formal gravity of age in the set of the gaze. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**listening.png**
Half-body portrait. Stern pale eyes angled toward an unseen speaker, formal and evaluating. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

**talking.png**
Half-body portrait. Stern pale eyes direct at viewer, institutional authority in the delivery. Warm amber side-lighting from left. Dark fantasy painterly, Bloodborne aesthetic, non-photorealistic. No watermark.

---

## Total Count: 142 portrait files

| Category | Characters | Files | Total |
|----------|-----------|-------|-------|
| Tier 1 — Main (Maren, Kael, Ryn, Serath, Dorath) | 5 | 12 each | 60 |
| Tier 2 — Supporting (Vael, Brek, Eran) | 3 | 9 / 6 / 7 | 22 |
| Tier 3 — Future (Sira, Baren, Wren, Lyss, Cael, Kira, Voss, Aldren, Orin, Rendered, Tal, Gavrick) | 12 | 5 each | 60 |
| **Total** | | | **142** |

---

**Key rules:**
- Maren and Vael → Aethyn (non-human alien) — full alien face visible, no covering
- Voss and Rendered → no Character Reference needed, generate all fresh
- All other characters → dark hood + wound aged cloth, only eyes visible, fantasy RPG adventurer style
- Tier 1 generate first — these appear in Act 1
