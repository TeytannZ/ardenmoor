/**
 * fix-screenshots.mjs — retakes the 3 screenshots that were wrong
 */
import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = path.join(__dirname, '..', 'assets', 'screenshots')
const BASE      = 'http://localhost:5173/ardenmoor/'
const W = 1440, H = 900

const FAKE_USER     = { id: 'demo-001', email: 'demo@ardenmoor.dev', username: 'Seeker' }
const FAKE_PLAN     = {
  phaseNumber: 1, phaseTitle: 'The Archive Burns',
  goal: 'Master JavaScript and React', category: 'SKILL',
  arcs: [{ arcNumber:0, title:'Foundation', weeks:[{
    weekNumber:0, theme:'Core JavaScript',
    tasks:[
      { title:'Complete JavaScript basics module', type:'study' },
      { title:'Build a calculator app', type:'project' },
      { title:'Read one chapter of YDKJS', type:'reading' },
    ]
  }]}]
}
const FAKE_PROGRESS = {
  currentArcIdx:0, currentWeekIdx:0, streak:7,
  lastActiveDate: new Date().toISOString().slice(0,10),
  inscriptions:12, coins:84, tasksDone:{}, completedArcIdxs:[], completedWeeks:0,
  unlockedScenes:['a1_seg0','a1_seg1'], newUnlockPending:null,
  relationships:{maren:2,ryn:1,serath:0,brek:1,dorath:1,tal:0,sira:0},
  inventory:[], sparkQueue:[], sparkProgress:{}, pendingEpoch:null, pacingMap:{},
}

function loggedInScript(extraKeys = {}) {
  const keys = {
    'ardenmoor:session':       JSON.stringify({ user: FAKE_USER, rememberMe: true }),
    'ardenmoor:plan_current':  JSON.stringify(FAKE_PLAN),
    'ardenmoor:plan_progress': JSON.stringify(FAKE_PROGRESS),
    'ardenmoor:prologue_seen': '1',
    ...extraKeys,
  }
  return `(function(){try{${Object.entries(keys).map(([k,v])=>`localStorage.setItem(${JSON.stringify(k)},${JSON.stringify(v)})`).join(';')}}catch(e){}})()`
}

async function wait(ms) { return new Promise(r => setTimeout(r, ms)) }
async function shot(page, name) {
  await page.screenshot({ path: path.join(OUT_DIR, name), type:'png' })
  console.log('✅', name)
}

// Helper: load app, click EnterScreen, wait for navigation
async function loadToMainMenu(browser, initScript) {
  const ctx  = await browser.newContext({ viewport:{width:W,height:H} })
  const page = await ctx.newPage()
  page.on('console', ()=>{})
  page.on('pageerror', ()=>{})
  await page.addInitScript(initScript)
  await page.goto(BASE, { waitUntil:'domcontentloaded', timeout:15000 })
  await wait(1200)
  // Click the EnterScreen gate div
  try { await page.click('div[style*="fixed"][style*="inset"]', { timeout:3000 }) } catch(_) {}
  await wait(3200) // EnterScreen navigates at 2400ms
  return { page, ctx }
}

const browser = await chromium.launch({ headless:true })

// ── 1. OnboardingScreen: session but NO plan → shows "Enter the Archive" → click it ─
console.log('Fixing onboarding_screen...')
{
  const initScript = `(function(){try{
    localStorage.setItem('ardenmoor:session', ${JSON.stringify(JSON.stringify({ user: FAKE_USER, rememberMe: true }))});
    localStorage.setItem('ardenmoor:prologue_seen', '1');
  }catch(e){}})()`
  const { page, ctx } = await loadToMainMenu(browser, initScript)
  // Now on MainMenu in "new" state — click "Enter the Archive"
  try {
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')]
      const btn  = btns.find(b => b.textContent.includes('Archive'))
      if (btn) btn.click()
    })
    await wait(3000)
  } catch(_) {}
  await shot(page, 'onboarding_screen.png')
  await ctx.close()
}

// ── 2. PlanViewScreen: logged in with plan → click "Tasks" link in top bar ─────
console.log('Fixing plan_view_screen...')
{
  const { page, ctx } = await loadToMainMenu(browser, loggedInScript())
  // Click "Tasks" link in the top bar
  try {
    await page.evaluate(() => {
      const all = [...document.querySelectorAll('button')]
      // Find the "Tasks" LinkButton — its text content should be exactly "Tasks"
      const btn = all.find(b => b.textContent.trim() === 'Tasks')
      if (btn) { btn.click(); return 'clicked Tasks' }
      // Fallback: find any button with "task" or "plan"
      const fallback = all.find(b => /tasks?/i.test(b.textContent.trim()))
      if (fallback) { fallback.click(); return 'clicked fallback' }
      return 'not found'
    })
    await wait(2500)
  } catch(_) {}
  await shot(page, 'plan_view_screen.png')
  await ctx.close()
}

// ── 3. CheckInScreen: logged in, lastCheckin = null → "Daily Check-In" visible ──
console.log('Fixing checkin_screen...')
{
  const extraKeys = {
    'ardenmoor:daily_state': JSON.stringify({ lastCheckin: null, streak: 7, microEventIndex: 0 }),
  }
  const { page, ctx } = await loadToMainMenu(browser, loggedInScript(extraKeys))
  // Click "Daily Check-In" button — it appears below "Continue the Chronicle"
  try {
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')]
      const btn  = btns.find(b => /check.?in|daily/i.test(b.textContent))
      if (btn) { btn.click(); return 'clicked' }
      return 'not found: ' + btns.map(b=>b.textContent.trim()).join(' | ')
    })
    await wait(3000)
  } catch(_) {}
  await shot(page, 'checkin_screen.png')
  await ctx.close()
}

await browser.close()
console.log('\nFix screenshots complete.')
