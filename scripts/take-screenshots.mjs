/**
 * take-screenshots.mjs
 * Uses Playwright to capture all report screenshots.
 * Run: node scripts/take-screenshots.mjs
 * Dev server must be running on port 5173.
 */

import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = path.join(__dirname, '..', 'assets', 'screenshots')
const BASE      = 'http://localhost:5173/ardenmoor/'
const W = 1440, H = 900

const FAKE_USER = { id: 'demo-001', email: 'demo@ardenmoor.dev', username: 'Seeker' }

const FAKE_PLAN = {
  phaseNumber: 1, phaseTitle: 'The Archive Burns',
  goal: 'Master JavaScript and React over 16 weeks', category: 'SKILL',
  arcs: [{
    arcNumber: 0, title: 'Foundation',
    weeks: [
      { weekNumber: 0, theme: 'Core JavaScript', tasks: [
        { title: 'Complete JavaScript basics module', type: 'study' },
        { title: 'Build a calculator app', type: 'project' },
        { title: 'Read one chapter of YDKJS', type: 'reading' },
      ]},
    ]
  }]
}

const FAKE_PROGRESS = {
  currentArcIdx: 0, currentWeekIdx: 0,
  streak: 7, lastActiveDate: new Date().toISOString().slice(0,10),
  inscriptions: 12, coins: 84,
  tasksDone: {}, completedArcIdxs: [], completedWeeks: 0,
  unlockedScenes: ['a1_seg0','a1_seg1'],
  newUnlockPending: null,
  relationships: { maren:2, ryn:1, serath:0, brek:1, dorath:1, tal:0, sira:0 },
  inventory: [], sparkQueue: [], sparkProgress: {}, pendingEpoch: null, pacingMap: {},
}

function makeInitScript(extraKeys = {}) {
  return `
    (function() {
      try {
        const base = {
          'ardenmoor:session':       ${JSON.stringify(JSON.stringify({ user: FAKE_USER, rememberMe: true }))},
          'ardenmoor:plan_current':  ${JSON.stringify(JSON.stringify(FAKE_PLAN))},
          'ardenmoor:plan_progress': ${JSON.stringify(JSON.stringify(FAKE_PROGRESS))},
          'ardenmoor:prologue_seen': '1',
        };
        const extra = ${JSON.stringify(extraKeys)};
        Object.assign(base, extra);
        Object.entries(base).forEach(([k,v]) => localStorage.setItem(k, v));
      } catch(e) {}
    })();
  `
}

async function wait(ms) { return new Promise(r => setTimeout(r, ms)) }

async function screenshot(page, name) {
  await page.screenshot({ path: path.join(OUT_DIR, name), type: 'png' })
  console.log('✅', name)
}

async function gotoWithState(browser, initScript) {
  const ctx  = await browser.newContext({ viewport: { width: W, height: H } })
  const page = await ctx.newPage()
  page.on('console', () => {})
  page.on('pageerror', () => {})
  await page.addInitScript(initScript)
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 })
  // Click EnterScreen gate — waits 2400ms internally then navigates
  await wait(1200)
  try { await page.click('div[style*="position: fixed"]', { timeout: 3000 }) } catch(_) {}
  await wait(3200) // wait for navigation to complete
  return { page, ctx }
}

const browser = await chromium.launch({ headless: true })

// ── 1. EnterScreen (no click — capture idle state) ───────────────────────────
console.log('Capturing EnterScreen...')
{
  const ctx  = await browser.newContext({ viewport: { width: W, height: H } })
  const page = await ctx.newPage()
  page.on('console', () => {})
  await page.addInitScript(`
    (function(){ try { Object.keys(localStorage).filter(k=>k.startsWith('ardenmoor')).forEach(k=>localStorage.removeItem(k)); } catch(_){} })()
  `)
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 })
  await wait(2000)
  await screenshot(page, 'enter_screen.png')
  await ctx.close()
}

// ── 2. OpeningScreen (no session → prologue shows after click) ────────────────
console.log('Capturing OpeningScreen...')
{
  const ctx  = await browser.newContext({ viewport: { width: W, height: H } })
  const page = await ctx.newPage()
  page.on('console', () => {})
  await page.addInitScript(`
    (function(){ try {
      Object.keys(localStorage).filter(k=>k.startsWith('ardenmoor')).forEach(k=>localStorage.removeItem(k));
    } catch(_){} })()
  `)
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 })
  await wait(1200)
  try { await page.click('div[style*="position: fixed"]', { timeout: 3000 }) } catch(_) {}
  await wait(4500) // prologue takes ~4s to start rendering first section
  await screenshot(page, 'opening_screen.png')
  await ctx.close()
}

// ── 3. AuthScreen (no session, prologue seen → goes to auth after click) ──────
console.log('Capturing AuthScreen...')
{
  const ctx  = await browser.newContext({ viewport: { width: W, height: H } })
  const page = await ctx.newPage()
  page.on('console', () => {})
  await page.addInitScript(`
    (function(){ try {
      Object.keys(localStorage).filter(k=>k.startsWith('ardenmoor')).forEach(k=>localStorage.removeItem(k));
      localStorage.setItem('ardenmoor:prologue_seen', '1');
    } catch(_){} })()
  `)
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 })
  await wait(1200)
  try { await page.click('div[style*="position: fixed"]', { timeout: 3000 }) } catch(_) {}
  await wait(3200)
  await screenshot(page, 'auth_screen.png')
  await ctx.close()
}

// ── 4. MainMenu (logged in, plan exists) ─────────────────────────────────────
console.log('Capturing MainMenu...')
{
  const { page, ctx } = await gotoWithState(browser, makeInitScript())
  await screenshot(page, 'main_menu.png')
  await ctx.close()
}

// ── 5. OnboardingScreen (session but NO plan → shows onboarding state in menu) ─
console.log('Capturing OnboardingScreen...')
{
  const ctx  = await browser.newContext({ viewport: { width: W, height: H } })
  const page = await ctx.newPage()
  page.on('console', () => {})
  await page.addInitScript(`
    (function(){ try {
      localStorage.setItem('ardenmoor:session', ${JSON.stringify(JSON.stringify({ user: FAKE_USER, rememberMe: true }))});
      localStorage.setItem('ardenmoor:prologue_seen', '1');
      // No plan — shows "Enter the Archive" button which leads to onboarding
    } catch(_){} })()
  `)
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 })
  await wait(1200)
  try { await page.click('div[style*="position: fixed"]', { timeout: 3000 }) } catch(_) {}
  await wait(3200)
  // Click "Enter the Archive" to go to onboarding
  try {
    await page.click('button', { timeout: 3000 })
    await wait(2500)
  } catch(_) {}
  await screenshot(page, 'onboarding_screen.png')
  await ctx.close()
}

// ── 6. StoryScreen ────────────────────────────────────────────────────────────
console.log('Capturing StoryScreen...')
{
  const extraKeys = {
    'ardenmoor_story_v1': JSON.stringify({ segmentId: 'a1_seg1', beatIdx: 4, flags: {}, actComplete: false }),
  }
  const { page, ctx } = await gotoWithState(browser, makeInitScript(extraKeys))
  // Should be on MainMenu — click Continue the Chronicle
  try {
    // Find and click the continue button
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')]
      const btn  = btns.find(b => /continue|chronicle/i.test(b.textContent))
      if (btn) btn.click()
    })
    await wait(3000)
  } catch(_) {}
  await screenshot(page, 'story_screen.png')
  await ctx.close()
}

// ── 7. PlanViewScreen ─────────────────────────────────────────────────────────
console.log('Capturing PlanViewScreen...')
{
  const { page, ctx } = await gotoWithState(browser, makeInitScript())
  // Navigate to PlanView
  try {
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button, a')]
      const btn  = btns.find(b => /plan|task|view/i.test(b.textContent))
      if (btn) btn.click()
    })
    await wait(2500)
  } catch(_) {}
  await screenshot(page, 'plan_view_screen.png')
  await ctx.close()
}

// ── 8. CheckInScreen ──────────────────────────────────────────────────────────
console.log('Capturing CheckInScreen...')
{
  const extraKeys = {
    'ardenmoor:daily_state': JSON.stringify({ lastCheckin: null, streak: 7, microEventIndex: 0 }),
  }
  const { page, ctx } = await gotoWithState(browser, makeInitScript(extraKeys))
  // Click Daily Check-In button if visible
  try {
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')]
      const btn  = btns.find(b => /check.?in|vael|daily/i.test(b.textContent))
      if (btn) btn.click()
    })
    await wait(3000)
  } catch(_) {}
  await screenshot(page, 'checkin_screen.png')
  await ctx.close()
}

await browser.close()
console.log('\nDone. Screenshots at assets/screenshots/')
