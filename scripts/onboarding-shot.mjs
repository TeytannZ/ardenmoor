import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const OUT   = path.join(__dir, '..', 'assets', 'screenshots', 'onboarding_screen.png')
const BASE  = 'http://localhost:5173/ardenmoor/'

const FAKE_USER = { id:'demo-001', email:'demo@ardenmoor.dev', username:'Seeker' }
const FAKE_CHAT = [
  { role:'maren', content:'Welcome, Seeker. Before we begin, I need to understand your goal with precision — not an aspiration, but a real thing you intend to accomplish. What is it you want to achieve?' },
  { role:'user',  content:'I want to learn JavaScript and React to become a web developer.' },
  { role:'maren', content:'That is specific enough to work with. How much time can you realistically commit each week? And when you say learn — do you mean enough to understand existing codebases, or enough to build production software from scratch?' },
]

const browser = await chromium.launch({ headless: true })
const ctx     = await browser.newContext({ viewport:{ width:1440, height:900 } })
const page    = await ctx.newPage()
page.on('console', ()=>{})
page.on('pageerror', ()=>{})

await page.addInitScript(`(function(){try{
  localStorage.setItem('ardenmoor:session',       '${JSON.stringify({ user:FAKE_USER, rememberMe:true }).replace(/'/g,"\\'")}');
  localStorage.setItem('ardenmoor:settings',      '{"apiKey":"sk-or-fake-key","muted":true}');
  localStorage.setItem('ardenmoor:onboarding_chat','${JSON.stringify(FAKE_CHAT).replace(/'/g,"\\'")}');
  localStorage.setItem('ardenmoor:prologue_seen', '1');
}catch(e){}})()`
)

await page.goto(BASE, { waitUntil:'domcontentloaded', timeout:15000 })
await new Promise(r=>setTimeout(r,1200))
try { await page.click('div[style*="fixed"][style*="inset"]', { timeout:3000 }) } catch(_) {}
await new Promise(r=>setTimeout(r,3500))

// Navigate to onboarding — click "Continue with Maren" or "Enter the Archive"
await page.evaluate(()=>{
  const btns = [...document.querySelectorAll('button')]
  const btn  = btns.find(b => /maren|archive/i.test(b.textContent))
  if (btn) btn.click()
})
await new Promise(r=>setTimeout(r,3500))

await page.screenshot({ path:OUT, type:'png' })
console.log('✅ onboarding_screen.png')
await browser.close()
