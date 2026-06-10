import { useEffect } from 'react'

// ─── GlobalStyles ──────────────────────────────────────────────────────────────
// Injects a <style> tag with all CSS custom properties, resets, and base styles.
// Follows Elden Ring / Bloodborne aesthetic: deep ink black, aged gold, parchment,
// slate blue. Typography: Cinzel Decorative → Cinzel → Cormorant SC → Lora →
// Uncial Antiqua.
// ──────────────────────────────────────────────────────────────────────────────
//
// CURSOR STRATEGY (replaces old approach that caused OS cursor to bleed through):
//   body/html { cursor: none !important }  — always hides OS cursor everywhere.
//   body.cursor-default   → cursor-default.png  (added on mount, used when not hovering)
//   body.cursor-hovering  → cursor-pointer.png  (toggled by mousemove in App.jsx)
//   body.cursor-clicking  → cursor-click.png    (toggled by mousedown/mouseup in App.jsx)
//   body.transitioning    → cursor: none        (during screen flash)
//
//   GlobalStyles adds .cursor-default on mount so there's no blank-cursor flash.
//   App.jsx GlobalCursorParticles manages the class toggling.
// ──────────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL

const CSS = `
  /* ── Variables ────────────────────────────────────────────────────────────── */
  :root {
    /* Colors */
    --color-void:         #09080c;       /* deepest background */
    --color-ink:          #0f0d14;       /* card / surface bg */
    --color-dark:         #16121f;       /* slightly lifted surface */
    --color-shadow:       #1e1828;       /* elevated surface */
    --color-mist:         #2a2438;       /* borders, dividers */
    --color-slate:        #3d3555;       /* inactive elements */
    --color-fog:          #6e6488;       /* placeholder / secondary text */

    --color-parchment:    #e8dfc4;       /* primary body text */
    --color-parchment-dim:#b5ac96;       /* dimmed body text */
    --color-bone:         #f2ece0;       /* headings, bright text */

    --color-gold:         #c9a84c;       /* primary accent */
    --color-gold-bright:  #e8c96a;       /* hover / active gold */
    --color-gold-dim:     #7a6430;       /* inactive gold */
    --color-gold-glow:    rgba(201,168,76,0.15);

    --color-slate-blue:   #4a6fa5;       /* secondary accent */
    --color-slate-blue-dim:#2d4266;

    --color-blood:        #7a1f1f;       /* danger / boss */
    --color-ember:        #c0531a;       /* warning / fire */
    --color-sage:         #3d6b4f;       /* success / nature */

    /* Typography */
    --font-title:         'Cinzel Decorative', serif;   /* display titles */
    --font-heading:       'Cinzel', serif;               /* section headings */
    --font-subheading:    'Cormorant SC', serif;         /* subheadings, labels */
    --font-body:          'Lora', serif;                 /* body text */
    --font-ancient:       'Uncial Antiqua', cursive;     /* ancient labels, lore */

    /* Spacing scale */
    --space-1:  0.25rem;
    --space-2:  0.5rem;
    --space-3:  0.75rem;
    --space-4:  1rem;
    --space-5:  1.25rem;
    --space-6:  1.5rem;
    --space-8:  2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    --space-24: 6rem;

    /* Transitions */
    --transition-fast:   150ms ease;
    --transition-base:   300ms ease;
    --transition-slow:   600ms ease;
    --transition-crawl: 1200ms ease;

    /* Shadows */
    --shadow-sm:   0 2px 8px rgba(0,0,0,0.4);
    --shadow-md:   0 4px 20px rgba(0,0,0,0.6);
    --shadow-lg:   0 8px 40px rgba(0,0,0,0.8);
    --shadow-gold: 0 0 20px rgba(201,168,76,0.2), 0 0 60px rgba(201,168,76,0.05);

    /* Z-index layers */
    --z-base:     0;
    --z-overlay:  100;
    --z-modal:    200;
    --z-cutscene: 300;
    --z-topmost:  400;
  }

  /* ── Reset ─────────────────────────────────────────────────────────────────── */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    /* Always hide OS cursor so PNG cursors have no competition */
    cursor: none !important;
  }

  body {
    background: var(--color-void);
    color: var(--color-parchment);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.65;
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Always hide OS cursor — PNG cursors applied exclusively via classes below */
    cursor: none !important;
  }

  /* ── PNG Cursor classes ─────────────────────────────────────────────────────
     Only one class is active at a time.
     .cursor-default  is added on mount by GlobalStyles useEffect.
     .cursor-hovering is toggled by GlobalCursorParticles in App.jsx on mousemove.
     .cursor-clicking is toggled by GlobalCursorParticles in App.jsx on mousedown/up.
     The wildcard child selector (* inside body.cursor-X) ensures no element
     can override back to the OS cursor.
  ─────────────────────────────────────────────────────────────────────────── */

  body.cursor-default,
  body.cursor-default * {
    cursor: url('${BASE}assets/images/ui/cursors/cursor-default.png') 4 4, auto !important;
  }

  /* JS-detected hover — catches React onClick divs and all native clickables */
  body.cursor-hovering,
  body.cursor-hovering * {
    cursor: url('${BASE}assets/images/ui/cursors/cursor-pointer.png') 4 4, pointer !important;
  }

  /* JS-detected click / mousedown */
  body.cursor-clicking,
  body.cursor-clicking * {
    cursor: url('${BASE}assets/images/ui/cursors/cursor-click.png') 4 4, pointer !important;
  }

  /* Native active states — redundant safety net */
  a:active, button:active, [role="button"]:active {
    cursor: url('${BASE}assets/images/ui/cursors/cursor-click.png') 4 4, pointer !important;
  }

  /* During screen transition overlay — hide everything */
  body.transitioning,
  body.transitioning * {
    cursor: none !important;
  }

  #root {
    min-height: 100vh;
  }

  /* ── Typography base ────────────────────────────────────────────────────────── */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-bone);
    line-height: 1.2;
    letter-spacing: 0.05em;
  }

  p {
    color: var(--color-parchment);
    font-family: var(--font-body);
  }

  a {
    color: var(--color-gold);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  a:hover {
    color: var(--color-gold-bright);
  }

  button {
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: var(--font-body);
    color: var(--color-parchment);
    background: var(--color-ink);
    border: 1px solid var(--color-mist);
    outline: none;
    transition: border-color var(--transition-fast);
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--color-gold-dim);
  }

  img {
    max-width: 100%;
    display: block;
  }

  /* ── Scrollbar ──────────────────────────────────────────────────────────────── */
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-void);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-gold-dim);
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-gold);
  }

  /* ── Selection ──────────────────────────────────────────────────────────────── */
  ::selection {
    background: var(--color-gold-dim);
    color: var(--color-bone);
  }

  /* ── Utility classes ────────────────────────────────────────────────────────── */

  /* Full-bleed background image layer */
  .bg-fill {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  /* Atmospheric gradient overlays */
  .overlay-dark {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(9,8,12,0.3) 0%,
      rgba(9,8,12,0.6) 50%,
      rgba(9,8,12,0.9) 100%
    );
    pointer-events: none;
  }

  .overlay-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 40%,
      rgba(9,8,12,0.8) 100%
    );
    pointer-events: none;
  }

  /* Gold divider line */
  .divider-gold {
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--color-gold-dim) 30%,
      var(--color-gold) 50%,
      var(--color-gold-dim) 70%,
      transparent
    );
  }

  /* Screen wrapper — full viewport, relative, overflow hidden */
  .screen {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  /* ── Keyframe animations ────────────────────────────────────────────────────── */

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes glowPulse {
    0%, 100% { text-shadow: 0 0 10px rgba(201,168,76,0.3); }
    50%       { text-shadow: 0 0 30px rgba(201,168,76,0.7), 0 0 60px rgba(201,168,76,0.2); }
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  @keyframes mmFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes mmPulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50%       { opacity: 1;   transform: scale(1.1); }
  }

  .animate-fade-in  { animation: fadeIn  var(--transition-slow) forwards; }
  .animate-fade-up  { animation: fadeUp  var(--transition-slow) forwards; }
  .animate-fade-down{ animation: fadeDown var(--transition-slow) forwards; }
  .animate-glow     { animation: glowPulse 3s ease-in-out infinite; }

  /* ── Ken Burns variants — used by CutscenePlayer ────────────────────────────
     Images are 2.4:1 panoramic displayed via objectFit:cover in a 16:9 container.
     The panoramic image overflows ~17% horizontally when cover-fitted.
     Scale provides the movement buffer; keep scale 1.08–1.14 (no multiplied zoom).
     kb1/kb2 = horizontal pan. kb3 = zoom-in + drift. kb4 = zoom-out + drift.
     Duration driven by --scene-dur CSS var set per-scene in CutscenePlayer.
  */
  .kb1 { animation: kb1 var(--scene-dur, 8s) ease-in-out both; }
  .kb2 { animation: kb2 var(--scene-dur, 8s) ease-in-out both; }
  .kb3 { animation: kb3 var(--scene-dur, 8s) ease-in-out both; }
  .kb4 { animation: kb4 var(--scene-dur, 8s) ease-in-out both; }

  /* Pan right across panorama (scale 1.1 = 5% edge buffer; 4% shift < 5%) */
  @keyframes kb1 {
    from { transform: scale(1.1) translateX(-4%); }
    to   { transform: scale(1.1) translateX(4%); }
  }
  /* Pan left across panorama */
  @keyframes kb2 {
    from { transform: scale(1.1) translateX(4%); }
    to   { transform: scale(1.1) translateX(-4%); }
  }
  /* Slow zoom in with rightward drift */
  @keyframes kb3 {
    from { transform: scale(1.08) translateX(-3%); }
    to   { transform: scale(1.14) translateX(3%); }
  }
  /* Slow zoom out with leftward drift */
  @keyframes kb4 {
    from { transform: scale(1.14) translateX(3%); }
    to   { transform: scale(1.08) translateX(-3%); }
  }

  /* ── HUD button labels: hidden on mobile, visible on wider screens ────────── */
  .hud-btn-label { display: none; }
  @media (min-width: 769px) {
    .hud-btn-label { display: block !important; }
  }

  /* ── Touch/mobile: restore OS cursor, enlarge tap targets ──────────────────
     On phones and tablets the PNG cursor system is meaningless.
     (hover:none) + (pointer:coarse) identifies touch-primary devices.
  */
  @media (hover: none) and (pointer: coarse) {
    html, body,
    body.cursor-default, body.cursor-hovering, body.cursor-clicking,
    body.cursor-default *, body.cursor-hovering *, body.cursor-clicking * {
      cursor: auto !important;
    }
    a, button, [role="button"], [data-clickable="true"] {
      cursor: pointer !important;
    }
    /* Slightly larger base text on small screens */
    html { font-size: 15px; }
  }
`

export default function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'ardenmoor-global'
    style.textContent = CSS
    document.head.appendChild(style)

    // Only activate PNG cursor on hover-capable devices (skips touch phones/tablets).
    const isTouch = window.matchMedia?.('(hover: none) and (pointer: coarse)').matches
    if (!isTouch) {
      document.body.classList.add('cursor-default')
    }

    return () => {
      style.remove()
      document.body.classList.remove('cursor-default', 'cursor-hovering', 'cursor-clicking')
    }
  }, [])

  return null
}
