/**
 * make-presentation.js
 * Creates the ARDENMOOR PFE defense presentation (12 slides, 15 min, English)
 * Run: node scripts/make-presentation.js
 */
const pptxgen = require("pptxgenjs");
const path    = require("path");

const SS  = (f) => path.join(__dirname, "..", "assets", "screenshots", f);
const OUT = path.join(__dirname, "..", "ARDENMOOR_Presentation.pptx");

// ── Color palette ─────────────────────────────────────────────────────────────
const C = {
  BG:        "0B0810",   // near-black
  BG2:       "12101A",   // slightly lighter for cards
  CARD:      "1A1530",   // card background
  GOLD:      "C9A84C",   // primary gold
  GOLDLT:    "E8C97A",   // light gold for emphasis
  GOLDDK:    "8E6828",   // dark gold
  TEXT:      "EDE5D0",   // parchment text
  TEXTSUB:   "9A8A6A",   // muted text
  WHITE:     "FFFFFF",
  RED:       "6E1F2B",   // ardenRed
  TEAL:      "1F6F66",   // ardenTeal
}

const makeShadow = () => ({ type:"outer", blur:8, offset:3, angle:135, color:"000000", opacity:0.35 })

let pres = new pptxgen();
pres.layout  = "LAYOUT_16x9";
pres.author  = "[Student Name]";
pres.title   = "ARDENMOOR — A Gamified AI-Driven Personal Learning Platform";

// ── Helper: dark section title ─────────────────────────────────────────────
function addTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.5, y: opts.y ?? 0.28, w: opts.w ?? 9, h: opts.h ?? 0.65,
    fontSize: opts.size ?? 30, bold: true, fontFace: "Georgia",
    color: opts.color ?? C.GOLD, align: "left", margin: 0,
  });
}

function addBody(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.5, y: opts.y ?? 1.1, w: opts.w ?? 9, h: opts.h ?? 0.4,
    fontSize: opts.size ?? 14, fontFace: "Calibri",
    color: opts.color ?? C.TEXT, align: opts.align ?? "left", margin: 0,
  });
}

function addGoldLine(slide, x, y, w) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.025,
    fill: { color: C.GOLD }, line: { color: C.GOLD }
  });
}

function addCard(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.CARD },
    line: { color: C.GOLDDK, width: 0.5 },
    shadow: makeShadow(),
  });
}

// ── SLIDE 1 — TITLE ─────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  // Decorative gold rectangle on left edge
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: C.GOLD }, line: { color: C.GOLD }
  });

  // Supertitle
  slide.addText("UNIVERSITÉ DE GAFSA  ·  FACULTÉ DES SCIENCES  ·  PFE 2025–2026", {
    x: 0.5, y: 0.38, w: 9.2, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: C.TEXTSUB, charSpacing: 2, align: "left",
  });

  // Main title ARDENMOOR
  slide.addText("ARDENMOOR", {
    x: 0.5, y: 1.0, w: 9.2, h: 1.5,
    fontSize: 72, bold: true, fontFace: "Georgia",
    color: C.GOLD, align: "left",
  });

  // Subtitle
  slide.addText("A Gamified AI-Driven Personal Learning Platform", {
    x: 0.5, y: 2.55, w: 8, h: 0.55,
    fontSize: 19, fontFace: "Calibri", italic: true,
    color: C.TEXT, align: "left",
  });

  addGoldLine(slide, 0.5, 3.25, 6.5);

  // Author/supervisor box
  slide.addText([
    { text: "Presented by:  ", options: { color: C.TEXTSUB } },
    { text: "[Student Name]", options: { color: C.TEXT, bold: true } },
    { text: "     |     Supervised by:  ", options: { color: C.TEXTSUB } },
    { text: "[Supervisor's Name]", options: { color: C.TEXT, bold: true } },
  ], {
    x: 0.5, y: 3.5, w: 9.0, h: 0.45,
    fontSize: 13, fontFace: "Calibri", align: "left",
  });

  // Category
  slide.addText("Génie Logiciel et Systèmes Informatiques  ·  Academic Year 2025–2026", {
    x: 0.5, y: 4.9, w: 9.2, h: 0.35,
    fontSize: 9.5, fontFace: "Calibri", color: C.TEXTSUB, align: "left",
  });

  // Decorative diamond
  slide.addText("◈", {
    x: 8.8, y: 2.4, w: 0.8, h: 0.8,
    fontSize: 42, fontFace: "Calibri", color: C.GOLDDK, align: "center",
  });
}

// ── SLIDE 2 — THE PROBLEM ───────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Why Long-Term Goals Fail");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  // Subtitle
  slide.addText("The limiting factor is not access to knowledge — it is sustained motivation.", {
    x: 0.5, y: 1.15, w: 9, h: 0.45,
    fontSize: 14, fontFace: "Calibri", italic: true, color: C.TEXT,
  });

  // Three problem cards
  const cards = [
    { icon: "🎯", title: "Months of Effort",     body: "Goals like learning to code, memorizing the Quran, or building fitness require months of consistent work — not days." },
    { icon: "👁",  title: "Invisible Progress",   body: "Results are real but not visible in the short term. Feedback loops are delayed, weak, or absent entirely." },
    { icon: "📱",  title: "Wrong Design",          body: "Existing tools assume you will supply your own motivation. That assumption fails for the majority of people." },
  ];

  cards.forEach((c, i) => {
    const x = 0.4 + i * 3.1;
    addCard(slide, x, 1.75, 2.9, 3.2);
    slide.addText(c.icon, { x: x+0.15, y: 1.9, w: 2.6, h: 0.7, fontSize: 30, align: "center" });
    slide.addText(c.title, {
      x: x+0.12, y: 2.6, w: 2.65, h: 0.45,
      fontSize: 14, bold: true, fontFace: "Georgia", color: C.GOLDLT, align: "center",
    });
    slide.addText(c.body, {
      x: x+0.12, y: 3.1, w: 2.65, h: 1.65,
      fontSize: 11.5, fontFace: "Calibri", color: C.TEXT, align: "left",
    });
  });
}

// ── SLIDE 3 — EXISTING SOLUTIONS ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "What Exists Today — And What's Missing");
  addGoldLine(slide, 0.5, 1.05, 5.5);

  // Table
  const COL_W = [2.3, 1.3, 1.3, 1.3, 1.3, 1.3];
  const HEADER_BG = "1A1530";
  const EVEN_BG   = "120F1C";
  const ODD_BG    = "0F0C18";

  const rows = [
    [
      { text:"Solution",             options:{ fill:{ color:HEADER_BG }, color:C.GOLD, bold:true, align:"left" } },
      { text:"Structured Path",      options:{ fill:{ color:HEADER_BG }, color:C.GOLD, bold:true, align:"center" } },
      { text:"AI Personalization",   options:{ fill:{ color:HEADER_BG }, color:C.GOLD, bold:true, align:"center" } },
      { text:"Gamification",         options:{ fill:{ color:HEADER_BG }, color:C.GOLD, bold:true, align:"center" } },
      { text:"Narrative",            options:{ fill:{ color:HEADER_BG }, color:C.GOLD, bold:true, align:"center" } },
      { text:"Adaptation",           options:{ fill:{ color:HEADER_BG }, color:C.GOLD, bold:true, align:"center" } },
    ],
    [
      { text:"Coursera / Udemy",     options:{ fill:{ color:ODD_BG },  color:C.TEXT, align:"left" } },
      { text:"✓", options:{ fill:{ color:ODD_BG  }, color:"6BA368", bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:ODD_BG  }, color:C.RED,    bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:ODD_BG  }, color:C.RED,    bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:ODD_BG  }, color:C.RED,    bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:ODD_BG  }, color:C.RED,    bold:true, align:"center" } },
    ],
    [
      { text:"Habitica / Todoist",   options:{ fill:{ color:EVEN_BG }, color:C.TEXT, align:"left" } },
      { text:"✗", options:{ fill:{ color:EVEN_BG }, color:C.RED,    bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:EVEN_BG }, color:C.RED,    bold:true, align:"center" } },
      { text:"✓", options:{ fill:{ color:EVEN_BG }, color:"6BA368", bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:EVEN_BG }, color:C.RED,    bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:EVEN_BG }, color:C.RED,    bold:true, align:"center" } },
    ],
    [
      { text:"AI Tutors",            options:{ fill:{ color:ODD_BG  }, color:C.TEXT, align:"left" } },
      { text:"✓", options:{ fill:{ color:ODD_BG  }, color:"6BA368", bold:true, align:"center" } },
      { text:"✓", options:{ fill:{ color:ODD_BG  }, color:"6BA368", bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:ODD_BG  }, color:C.RED,    bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:ODD_BG  }, color:C.RED,    bold:true, align:"center" } },
      { text:"✗", options:{ fill:{ color:ODD_BG  }, color:C.RED,    bold:true, align:"center" } },
    ],
    [
      { text:"ARDENMOOR",            options:{ fill:{ color:"1A2A1A" }, color:C.GOLDLT, bold:true, align:"left" } },
      { text:"✓", options:{ fill:{ color:"1A2A1A" }, color:"6BA368", bold:true, align:"center" } },
      { text:"✓", options:{ fill:{ color:"1A2A1A" }, color:"6BA368", bold:true, align:"center" } },
      { text:"✓", options:{ fill:{ color:"1A2A1A" }, color:"6BA368", bold:true, align:"center" } },
      { text:"✓", options:{ fill:{ color:"1A2A1A" }, color:"6BA368", bold:true, align:"center" } },
      { text:"✓", options:{ fill:{ color:"1A2A1A" }, color:"6BA368", bold:true, align:"center" } },
    ],
  ];

  slide.addTable(rows, {
    x: 0.5, y: 1.25, w: 9.0, h: 3.9,
    colW: COL_W,
    border: { pt: 0.5, color: C.GOLDDK },
    fontSize: 13, fontFace: "Calibri",
  });

  slide.addText("None of them combine all five. ARDENMOOR does.", {
    x: 0.5, y: 5.2, w: 9, h: 0.3,
    fontSize: 13, fontFace: "Calibri", italic: true, color: C.GOLDLT, align: "center",
  });
}

// ── SLIDE 4 — THE CONCEPT ────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "The ARDENMOOR Approach");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  slide.addText("Your real learning plan — experienced as a dark fantasy RPG.", {
    x: 0.5, y: 1.15, w: 5.5, h: 0.4,
    fontSize: 14, fontFace: "Calibri", italic: true, color: C.TEXT,
  });

  // Core loop flow — 5 steps
  const steps = [
    { n:"1", label:"Enter a Real Goal",     sub:"JavaScript, Quran, fitness..." },
    { n:"2", label:"Maren Interviews You",  sub:"AI builds your Chronicle" },
    { n:"3", label:"Story Begins",          sub:"Dark fantasy narrative" },
    { n:"4", label:"Tasks Gate Progress",   sub:"Complete work to advance" },
    { n:"5", label:"Vael Adapts the Plan",  sub:"Biweekly AI restructuring" },
  ];

  steps.forEach((s, i) => {
    const x = 0.3 + i * 1.88;
    addCard(slide, x, 1.72, 1.7, 2.8);
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.55, y: 1.85, w: 0.6, h: 0.6,
      fill: { color: C.GOLD }, line: { color: C.GOLD },
    });
    slide.addText(s.n, {
      x: x + 0.55, y: 1.87, w: 0.6, h: 0.6,
      fontSize: 17, bold: true, fontFace: "Georgia", color: C.BG, align: "center",
    });
    slide.addText(s.label, {
      x: x + 0.05, y: 2.55, w: 1.6, h: 0.65,
      fontSize: 12, bold: true, fontFace: "Georgia", color: C.GOLDLT, align: "center",
    });
    slide.addText(s.sub, {
      x: x + 0.05, y: 3.25, w: 1.6, h: 0.9,
      fontSize: 10.5, fontFace: "Calibri", color: C.TEXT, align: "center",
    });

    if (i < 4) {
      slide.addText("→", {
        x: x + 1.73, y: 2.95, w: 0.2, h: 0.4,
        fontSize: 18, color: C.GOLDDK, align: "center",
      });
    }
  });

  // Key insight box
  addCard(slide, 0.5, 4.65, 8.8, 0.75);
  slide.addText("The story gates your progress. Your tasks are the work you must do to advance it. That connection is what makes ARDENMOOR different.", {
    x: 0.65, y: 4.72, w: 8.5, h: 0.6,
    fontSize: 13, fontFace: "Calibri", italic: true, color: C.GOLDLT, align: "center",
  });
}

// ── SLIDE 5 — SYSTEM ARCHITECTURE ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Technical Architecture");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  // Center box
  addCard(slide, 2.5, 1.2, 5, 0.7);
  slide.addText("React 18 + Vite  —  Client-Heavy SPA", {
    x: 2.5, y: 1.2, w: 5, h: 0.7,
    fontSize: 16, bold: true, fontFace: "Georgia", color: C.GOLDLT, align: "center",
  });

  // External services
  const services = [
    { x:0.3,  y:2.3, label:"Supabase",       sub:"Auth + Cloud DB\n(localStorage fallback)", c:"0D5E4C" },
    { x:0.3,  y:3.7, label:"OpenRouter",      sub:"AI Completions\n(Gemini 2.5 Flash)",       c:"1A3A5C" },
    { x:4.1,  y:2.3, label:"Web Audio API",   sub:"All SFX synthesized\nat runtime — no files",c:"4A2C5C" },
    { x:4.1,  y:3.7, label:"Leonardo AI",     sub:"Background artwork\n& character portraits", c:"5C3A1A" },
    { x:7.9,  y:2.3, label:"ElevenLabs",      sub:"Prologue voice-over\naudio production",     c:"2C1A5C" },
    { x:7.9,  y:3.7, label:"No Backend",      sub:"Architecture eliminates\nserver complexity", c:"2A3A1A" },
  ];

  services.forEach(s => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: s.x, y: s.y, w: 1.9, h: 1.1,
      fill: { color: s.c }, line: { color: C.GOLDDK, width: 0.5 },
      shadow: makeShadow(),
    });
    slide.addText(s.label, {
      x: s.x, y: s.y+0.05, w: 1.9, h: 0.4,
      fontSize: 11.5, bold: true, fontFace: "Georgia", color: C.GOLDLT, align: "center",
    });
    slide.addText(s.sub, {
      x: s.x+0.05, y: s.y+0.48, w: 1.8, h: 0.58,
      fontSize: 9.5, fontFace: "Calibri", color: C.TEXT, align: "center",
    });
  });

  // Arrows from center to services
  ["2.5,1.9,0.55,2.5", "2.5,1.9,0.55,3.9", "6.5,1.9,8.3,2.5", "6.5,1.9,8.3,3.9"].forEach(coords => {
    const [x1, y1, x2, y2] = coords.split(",").map(Number)
    slide.addShape(pres.shapes.LINE, {
      x: Math.min(x1,x2), y: Math.min(y1,y2),
      w: Math.abs(x2-x1), h: Math.abs(y2-y1),
      line: { color: C.GOLDDK, width: 1, dashType: "dash" },
    });
  });

  slide.addText("GitHub  ·  VS Code  ·  Git  ·  draw.io  ·  Playwright", {
    x: 0.5, y: 5.2, w: 9, h: 0.28,
    fontSize: 11, fontFace: "Calibri", color: C.TEXTSUB, align: "center",
  });
}

// ── SLIDE 6 — PHASE 1: UI FOUNDATION ─────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Phase 1 — The Entry Experience");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  // Left: text
  slide.addText([
    { text: "EnterScreen", options: { bold:true, color:C.GOLDLT, breakLine:true } },
    { text: "Gate animation, screen shake, dust particle canvas\n", options:{ color:C.TEXT } },
    { text: "OpeningScreen", options: { bold:true, color:C.GOLDLT, breakLine:true } },
    { text: "14-section cinematic prologue. VO-driven typewriter timing. Synthesized ambient audio per section — no files required. The quality showcase.\n", options:{ color:C.TEXT } },
    { text: "MainMenu", options: { bold:true, color:C.GOLDLT, breakLine:true } },
    { text: "Five-image crossfade with pan animation. Resource HUD. Navigation.", options:{ color:C.TEXT } },
  ], {
    x: 0.5, y: 1.15, w: 4.6, h: 4.2,
    fontSize: 12.5, fontFace: "Calibri", align: "left",
  });

  // Right: screenshots stacked
  slide.addImage({ path: SS("enter_screen.png"),   x: 5.35, y: 0.95, w: 4.4, h: 2.2,
    shadow: makeShadow() });
  slide.addImage({ path: SS("opening_screen.png"), x: 5.35, y: 3.3,  w: 4.4, h: 2.2,
    shadow: makeShadow() });
}

// ── SLIDE 7 — PHASE 2: AI ENGINE ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Phase 2 — Maren & The AI Engine");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  slide.addText([
    { text: "The Interview\n", options: { bold:true, color:C.GOLDLT } },
    { text: "Maren is an Aethyn scholar: precise, never accepting vague answers. One question per reply. Caps at 120 words. Ends with ASSESSMENT_COMPLETE sentinel.\n\n", options:{ color:C.TEXT } },
    { text: "8 Goal Categories\n", options: { bold:true, color:C.GOLDLT } },
    { text: "MEMORIZATION · SKILL · FITNESS · LANGUAGE · ACADEMIC · CREATIVE · PROFESSIONAL · HABIT\n\n", options:{ color:C.TEXT } },
    { text: "Chronicle Generation\n", options: { bold:true, color:C.GOLDLT } },
    { text: "Single OpenRouter call → Chronicle JSON. Structured as arcs, weeks, and tasks. The plan that drives everything.", options:{ color:C.TEXT } },
  ], {
    x: 0.5, y: 1.15, w: 4.6, h: 4.3,
    fontSize: 12.5, fontFace: "Calibri", align: "left",
  });

  slide.addImage({ path: SS("onboarding_screen.png"), x: 5.35, y: 1.0, w: 4.4, h: 4.45,
    shadow: makeShadow() });
}

// ── SLIDE 8 — PHASE 3: STORY EXPERIENCE ──────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Phase 3 — The Story Experience");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  slide.addText([
    { text: "Narrative Engine\n", options: { bold:true, color:C.GOLDLT } },
    { text: "Acts → Segments → Beats. Three beat types: narrator (no portrait), dialogue (speaker full opacity, others dimmed), choice.\n\n", options:{ color:C.TEXT } },
    { text: "Portrait System\n", options: { bold:true, color:C.GOLDLT } },
    { text: "Automatic fallback chain if images missing. Active speaker at 100%, listeners at 62%, narration = hidden.\n\n", options:{ color:C.TEXT } },
    { text: "The Task Gate  ✦\n", options: { bold:true, color:C.GOLD } },
    { text: "After each story segment, a task checklist appears. You cannot advance until every task is marked complete. The story is the reward for your real work.", options:{ color:C.TEXT } },
  ], {
    x: 0.5, y: 1.15, w: 4.6, h: 4.3,
    fontSize: 12.5, fontFace: "Calibri", align: "left",
  });

  slide.addImage({ path: SS("story_screen.png"), x: 5.35, y: 1.0, w: 4.4, h: 4.45,
    shadow: makeShadow() });
}

// ── SLIDE 9 — PHASE 4: ADAPTIVE LAYER ────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Phase 4 — Vael & Adaptation");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  slide.addText([
    { text: "WeekCompleteCheckin\n", options: { bold:true, color:C.GOLDLT } },
    { text: "Vael appears when you clear a week's tasks. First appearance = proper introduction. Then rotates through 6 main + 4 micro messages. Once per day.\n\n", options:{ color:C.TEXT } },
    { text: "Biweekly CheckIn\n", options: { bold:true, color:C.GOLDLT } },
    { text: "Vael is an instructor — analytical, no judgment. Reviews completed and missed tasks. Generates a restructured plan for the next chapter.\n\n", options:{ color:C.TEXT } },
    { text: "The Promise\n", options: { bold:true, color:C.GOLDLT } },
    { text: "The plan adapts to your reality, not the reverse. A missed week has no consequence beyond an honest assessment.", options:{ color:C.TEXT } },
  ], {
    x: 0.5, y: 1.15, w: 4.6, h: 4.3,
    fontSize: 12.5, fontFace: "Calibri", align: "left",
  });

  slide.addImage({ path: SS("plan_view_screen.png"), x: 5.35, y: 1.0, w: 4.4, h: 4.45,
    shadow: makeShadow() });
}

// ── SLIDE 10 — TOOLS & TECHNOLOGIES ──────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Development Stack");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  const tools = [
    { name:"React 18",    desc:"Component UI",       c:"1A3A5C" },
    { name:"Vite 5",      desc:"Build + HMR",        c:"1A2A3A" },
    { name:"Supabase",    desc:"Auth + Cloud DB",    c:"0D5E4C" },
    { name:"OpenRouter",  desc:"AI gateway",         c:"1A3A5C" },
    { name:"Web Audio",   desc:"Runtime SFX",        c:"4A2C5C" },
    { name:"Leonardo AI", desc:"Image generation",   c:"5C3A1A" },
    { name:"ElevenLabs",  desc:"Voice-over audio",   c:"2C1A5C" },
    { name:"Playwright",  desc:"Automated testing",  c:"1A4A2C" },
    { name:"Git + GitHub","desc":"Version control",  c:"2A1A1A" },
  ];

  tools.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x   = 0.5 + col * 3.1;
    const y   = 1.25 + row * 1.3;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.9, h: 1.1,
      fill: { color: t.c }, line: { color: C.GOLDDK, width: 0.5 },
      shadow: makeShadow(),
    });
    slide.addText(t.name, {
      x: x+0.08, y: y+0.1, w: 2.75, h: 0.42,
      fontSize: 15, bold: true, fontFace: "Georgia", color: C.GOLDLT, align: "left",
    });
    slide.addText(t.desc, {
      x: x+0.08, y: y+0.55, w: 2.75, h: 0.42,
      fontSize: 11.5, fontFace: "Calibri", color: C.TEXT, align: "left",
    });
  });

  slide.addText("All tools are either free or free-tier.", {
    x: 0.5, y: 5.28, w: 9, h: 0.28,
    fontSize: 11.5, fontFace: "Calibri", color: C.TEXTSUB, italic: true, align: "center",
  });
}

// ── SLIDE 11 — CONCLUSION ─────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "What Was Built");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  const items = [
    { phase:"Phase 1", what:"EnterScreen, OpeningScreen, MainMenu, Web Audio SFX" },
    { phase:"Phase 2", what:"Maren interview, goal classification, Chronicle generation" },
    { phase:"Phase 3", what:"StoryScreen narrative engine, portraits, task gates, PlanView" },
    { phase:"Phase 4", what:"OpeningScreen prologue, Vael check-in, WeekCompleteCheckin" },
  ];

  items.forEach((item, i) => {
    const y = 1.25 + i * 0.9;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 0.07, h: 0.7,
      fill: { color: C.GOLD }, line: { color: C.GOLD },
    });
    slide.addText(item.phase + ":", {
      x: 0.72, y: y+0.06, w: 1.3, h: 0.35,
      fontSize: 13, bold: true, fontFace: "Georgia", color: C.GOLDLT,
    });
    slide.addText(item.what, {
      x: 2.1, y: y+0.06, w: 3.2, h: 0.55,
      fontSize: 12.5, fontFace: "Calibri", color: C.TEXT,
    });
  });

  // Screenshot right side
  slide.addImage({ path: SS("main_menu.png"), x: 5.5, y: 1.05, w: 4.25, h: 4.4,
    shadow: makeShadow() });

  // Final statement
  addCard(slide, 0.5, 5.0, 9.0, 0.5);
  slide.addText("Core architecture solid. Core loop works. Experience genuinely different from anything that exists.", {
    x: 0.65, y: 5.05, w: 8.7, h: 0.42,
    fontSize: 13, fontFace: "Calibri", italic: true, color: C.GOLDLT, align: "center",
  });
}

// ── SLIDE 12 — PERSPECTIVES + THANK YOU ──────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.BG };

  addTitle(slide, "Future Directions");
  addGoldLine(slide, 0.5, 1.05, 4.5);

  // Future items (left column)
  const futures = [
    "Voice-over for all in-game story content (infrastructure ready)",
    "Mobile responsiveness pass",
    "Story expansion: Acts 4–7 content",
    "Recommendation layer using completion history",
    "Passive social progress visibility",
  ];

  futures.forEach((f, i) => {
    slide.addText([
      { text: "→ ", options: { color: C.GOLD, bold: true } },
      { text: f,   options: { color: C.TEXT } },
    ], {
      x: 0.5, y: 1.2 + i * 0.55, w: 5.4, h: 0.48,
      fontSize: 13, fontFace: "Calibri",
    });
  });

  // Thank you (right)
  addCard(slide, 5.9, 1.0, 3.8, 4.5);
  slide.addText("Thank You", {
    x: 5.9, y: 1.4, w: 3.8, h: 0.8,
    fontSize: 32, bold: true, fontFace: "Georgia", color: C.GOLD, align: "center",
  });
  addGoldLine(slide, 6.2, 2.3, 3.2);
  slide.addText("Questions are welcome.\n\nA live demo of the\nprologue is available\nif you'd like to see it.", {
    x: 5.9, y: 2.45, w: 3.8, h: 2.0,
    fontSize: 13.5, fontFace: "Calibri", italic: true, color: C.TEXT, align: "center",
  });
  slide.addText("◈", {
    x: 5.9, y: 4.5, w: 3.8, h: 0.7,
    fontSize: 28, color: C.GOLDDK, align: "center",
  });

  // Bottom note
  slide.addText("ARDENMOOR  ·  Université de Gafsa  ·  Faculté des Sciences  ·  2025–2026", {
    x: 0.5, y: 5.28, w: 9, h: 0.28,
    fontSize: 9, fontFace: "Calibri", color: C.TEXTSUB, align: "center", charSpacing: 1,
  });
}

// ── Write file ────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: OUT })
  .then(() => console.log("✅ Saved:", OUT))
  .catch(e  => console.error("❌ Error:", e));
