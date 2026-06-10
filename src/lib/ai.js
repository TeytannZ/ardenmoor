// ─── ai.js ────────────────────────────────────────────────────────────────────
// Ardenmoor AI system.
// Every AI context (Maren, plan generation, Vael, continuation) has its own
// precisely-crafted system prompt. No generic prompts anywhere.
// ─────────────────────────────────────────────────────────────────────────────

const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL   = 'google/gemma-4-31b-it:free'  // free, no credits needed; multimodal; update in Settings if you add OpenRouter credits

// ─── Error classifier ────────────────────────────────────────────────────────
// Returns a user-facing message + optional action for each API failure type.

export function classifyApiError(err, status) {
  // Network failure (no response at all)
  if (!status) {
    return {
      title:   'No connection to the Archive',
      message: 'The Archive could not be reached. Check your internet connection and try again.',
      action:  'retry',
    }
  }
  if (status === 401) {
    return {
      title:   'Archive key not recognized',
      message: 'Your key was rejected. Open Settings and make sure you copied it correctly from openrouter.ai — no extra spaces.',
      action:  'settings',
    }
  }
  if (status === 402) {
    return {
      title:   'Archive key has no credits',
      message: 'Your account has run out of credits. Visit openrouter.ai, add credits, then come back.',
      action:  'external',
      url:     'https://openrouter.ai/credits',
    }
  }
  if (status === 429) {
    return {
      title:   'Too many requests',
      message: 'The Archive is receiving too many requests right now. Wait a minute and try again.',
      action:  'retry',
    }
  }
  if (status === 503 || status === 502) {
    return {
      title:   'Archive temporarily unavailable',
      message: 'The connection is temporarily down. This usually resolves in a moment — try again.',
      action:  'retry',
    }
  }
  if (status === 400) {
    // Usually means an invalid model name. Surface the raw error so it's debuggable.
    const detail = err?.message && !err.message.startsWith('HTTP') ? ` (${err.message})` : ''
    return {
      title:   'Invalid request',
      message: `The Archive rejected the request${detail}. If this keeps happening, open Settings and update the model name — visit openrouter.ai/models to find the current ID.`,
      action:  'settings',
    }
  }
  return {
    title:   'Something went wrong',
    message: `The Archive returned an unexpected error (${status}). Try again in a moment.`,
    action:  'retry',
  }
}

// ─── Base caller (non-streaming) ─────────────────────────────────────────────

async function callAI(apiKey, systemPrompt, messages, options = {}) {
  const maxAttempts = 2
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let status = null
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization':  `Bearer ${apiKey}`,
          'Content-Type':   'application/json',
          'HTTP-Referer':   'https://ardenmoor.app',
          'X-Title':        'Ardenmoor',
        },
        body: JSON.stringify({
          model:       options.model || MODEL,
          messages:    [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: options.temperature ?? 0.75,
          max_tokens:  options.maxTokens  ?? 1200,
        }),
      })
      status = res.status
      if (!res.ok) {
        if (status === 429 && attempt < maxAttempts - 1) {
          await new Promise(r => setTimeout(r, 5000))
          continue
        }
        const body = await res.json().catch(() => ({}))
        throw Object.assign(new Error(body?.error?.message || `HTTP ${status}`), { status })
      }
      const data = await res.json()
      return { ok: true, content: data.choices[0].message.content.trim() }
    } catch (err) {
      const s = err.status || status
      if (s === 429 && attempt < maxAttempts - 1) {
        await new Promise(r => setTimeout(r, 5000))
        continue
      }
      return { ok: false, error: classifyApiError(err, s) }
    }
  }
}

// ─── Streaming caller ────────────────────────────────────────────────────────
// Calls onChunk(text) for each streamed token.
// Returns { ok, error? } when the stream ends.

export async function callAIStreaming(apiKey, systemPrompt, messages, onChunk, options = {}) {
  let status = null
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  'https://ardenmoor.app',
        'X-Title':       'Ardenmoor',
      },
      body: JSON.stringify({
        model:       options.model || MODEL,
        messages:    [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: options.temperature ?? 0.75,
        max_tokens:  options.maxTokens  ?? 1200,
        stream:      true,
      }),
    })
    status = res.status
    if (!res.ok) {
      throw Object.assign(new Error(`HTTP ${status}`), { status })
    }

    const reader  = res.body.getReader()
    const decoder = new TextDecoder()
    let   buffer  = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() // keep incomplete last line
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed === 'data: [DONE]') continue
        if (!trimmed.startsWith('data: ')) continue
        try {
          const json  = JSON.parse(trimmed.slice(6))
          const delta = json.choices?.[0]?.delta?.content
          if (delta) onChunk(delta)
        } catch (_) {}
      }
    }
    return { ok: true }
  } catch (err) {
    const s = err.status || status
    return { ok: false, error: classifyApiError(err, s) }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAREN — Onboarding AI
// ─────────────────────────────────────────────────────────────────────────────

const MAREN_SYSTEM_PROMPT = `
You are Maren, a scholar at the Archive in Ardenmoor.
A new Seeker has arrived. You need three things — then you can build their chronicle.

ONE QUESTION PER MESSAGE. Always. No exceptions. Not two. Not one with a follow-up. ONE.

YOUR VOICE:
Warm, direct, and brief. A wise mentor who respects the Seeker's time.
Simple words. Short sentences. Never stiff or formal. Never flowery.
You live in the world of Ardenmoor — speak like a real, grounded person, not a herald.
Never use modern slang. Never blaspheme any religion, culture, or belief.
Hard limit: 30 words per message including the question.

WHAT YOU NEED — in this order:
1. What they want to learn or achieve (get specific — "get better" is not enough)
2. Where they are now — complete beginner, some background, or experienced
3. How many hours per week they can genuinely commit

After those three, ask their name — one natural question, not a formal request.
That's it. Four exchanges. Nothing else.

RULES:
- Opening: notice their arrival, no question. 1-2 sentences. Warm, not theatrical.
- After that: one short acknowledgment sentence, then one question.
- If they're vague, ask for the specific thing once. Don't lecture them.
- If they go off-topic, redirect in one sentence and ask the next needed question.
- Never answer general knowledge questions. You only gather the four things.
- Infer their motivation from what they tell you — don't ask for it separately.
- The Archive works in four-month arcs. If their goal is longer, scope to the best four-month milestone.
- Target 4-5 exchanges total. Once you have the four things, close and output.

OUTPUT (when you have goal, level, hours, and name):
One warm closing sentence. Then:

<plan_data>
{
  "goal": "specific goal",
  "motivation": "inferred from their answers",
  "currentLevel": "their starting point",
  "weeklyHours": number,
  "playerName": "their name",
  "character": "kael",
  "fourMonthScope": "the best concrete 4-month milestone",
  "totalGoalDuration": "estimated total time for the full goal",
  "domain": "field (e.g. programming, music, language)"
}
</plan_data>

Nothing after the data block.
`.trim()

// messages format: [{role:'user'|'assistant', content:string}]
export async function marenMessage(apiKey, conversationHistory, userMessage) {
  const messages = [
    ...conversationHistory.map(m => ({
      role:    m.role === 'maren' ? 'assistant' : 'user',
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ]
  return callAI(apiKey, MAREN_SYSTEM_PROMPT, messages, { temperature: 0.72, maxTokens: 200 })
}

// Streaming version — onChunk receives incremental text
export async function marenMessageStreaming(apiKey, conversationHistory, userMessage, onChunk) {
  const messages = [
    ...conversationHistory.map(m => ({
      role:    m.role === 'maren' ? 'assistant' : 'user',
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ]
  return callAIStreaming(apiKey, MAREN_SYSTEM_PROMPT, messages, onChunk, {
    temperature: 0.72, maxTokens: 200,
  })
}

// Maren's opening message — no user input, she goes first
export async function marenOpening(apiKey) {
  const messages = [
    { role: 'user', content: '__OPENING__' }, // sentinel — system prompt handles it
  ]
  return callAI(apiKey, MAREN_SYSTEM_PROMPT + `\n\nIMPORTANT: The user message "__OPENING__" means the Seeker has just arrived. Begin with your opening observation — do not ask a question yet. 2-3 sentences maximum.`, messages, {
    temperature: 0.78, maxTokens: 200,
  })
}

// Parse the <plan_data> JSON block from Maren's final message
export function parseOnboardingData(marenResponse) {
  try {
    const match = marenResponse.match(/<plan_data>\s*([\s\S]*?)\s*<\/plan_data>/)
    if (!match) return null
    return JSON.parse(match[1])
  } catch (_) {
    return null
  }
}

// Strip the <plan_data> block from Maren's message text (for display)
export function stripPlanData(text) {
  return text.replace(/<plan_data>[\s\S]*?<\/plan_data>/g, '').trim()
}

// ─────────────────────────────────────────────────────────────────────────────
//  PLAN GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

function buildPlanSystemPrompt(phaseNumber, allPreviousPhases) {
  const isFirstPhase = phaseNumber === 1
  const previousContext = allPreviousPhases.length > 0
    ? `\n\nPREVIOUS PHASES COMPLETED:\n${allPreviousPhases.map((p, i) =>
        `Phase ${i + 1}: ${p.fourMonthScope}\nCompleted: ${p.completedDate?.slice(0, 10) || 'unknown'}\nStrengths noted: ${p.strengthsNoted || 'none recorded'}\nGaps noted: ${p.gapsNoted || 'none recorded'}`
      ).join('\n\n')}`
    : ''

  return `
You are the Archive's plan architect. You generate precise, structured learning plans.

${isFirstPhase
  ? 'This is the FIRST phase of the Seeker\'s journey. Start from their stated current level.'
  : `This is Phase ${phaseNumber} of an ongoing journey. The Seeker has completed ${phaseNumber - 1} phase(s) before this one. DO NOT repeat content covered in previous phases. Build directly from where Phase ${phaseNumber - 1} ended.${previousContext}`
}

═══ RESOURCES YOU KNOW (use these when relevant) ═══

PROGRAMMING:
- roadmap.sh — authoritative visual roadmaps for frontend, backend, devops, and specific languages
- The Odin Project — free, structured, project-based web development curriculum
- MDN Web Docs — the definitive reference for web technologies
- freeCodeCamp — structured curriculum with certifications
- CS50 by Harvard (edX) — best computer science fundamentals course
- Bro Code (YouTube) — clear, beginner-friendly tutorials for C++, Python, Java, JavaScript
- Official documentation — always the primary reference for any language/framework
- Exercism.io — language exercises with mentorship
- LeetCode / HackerRank — for algorithmic thinking and problem-solving practice

LANGUAGES:
- Pimsleur (audio-first, commute-friendly)
- Anki (spaced repetition flashcards)
- italki (live conversation practice with native speakers)
- Duolingo (habit-building, not sufficient alone)
- Language Transfer (free, structure-focused)
- Shadowing technique (for pronunciation and listening)

GENERAL:
- Coursera / edX — for structured university-level courses
- Khan Academy — for foundational math, science, humanities
- YouTube channels relevant to the specific domain
- Official certification paths when the domain has recognized ones

═══ PLAN STRUCTURE ═══

Generate a plan with exactly this structure:

{
  "phaseNumber": ${phaseNumber},
  "fourMonthScope": "the specific milestone this phase achieves",
  "startWeek": 1,
  "totalWeeks": 17,
  "arcs": [
    {
      "arcNumber": 1,
      "storyAct": 1,
      "title": "arc title — connected to the story tone but describes real learning",
      "weeks": "1-2",
      "focus": "what this arc is about",
      "weeklyPlan": [
        {
          "week": 1,
          "theme": "week theme",
          "dailyCommitment": "X hours",
          "tasks": [
            {
              "title": "task title",
              "description": "what to do and how",
              "resource": "specific resource to use",
              "type": "learn|practice|project|review"
            }
          ],
          "milestone": "what the seeker can do/demonstrate by end of this week"
        }
      ]
    }
  ],
  "overallMilestone": "what the seeker achieves by end of this 4-month phase",
  "nextPhaseHint": "one sentence on what Phase ${phaseNumber + 1} would build toward"
}

RULES:
- Exactly 7 arcs — one per story act
- Arc 1: ~2 weeks (foundation). Arcs 2-6: ~2-3 weeks each. Arc 7: ~1-2 weeks (integration).
- Total = 17 weeks (~4 months)
- Tasks must be specific and actionable — not "study Python" but "complete CS50 Week 0 and 1, run three programs from scratch"
- Resources must be named specifically — not "a book" but the actual book/course/channel
- Weekly commitment must respect the Seeker's stated available hours
- Milestones must be verifiable — something they can demonstrate or show
- DO NOT pad. Every week has a purpose. Every task has a reason.
- Output ONLY the JSON. No explanation before or after.
`.trim()
}

export async function generatePlan(apiKey, onboardingData, allPreviousPhases = []) {
  const phaseNumber = allPreviousPhases.length + 1
  const systemPrompt = buildPlanSystemPrompt(phaseNumber, allPreviousPhases)

  const userMessage = `
Generate Phase ${phaseNumber} of the plan for this Seeker:

Goal: ${onboardingData.goal}
Motivation: ${onboardingData.motivation}
Current level: ${onboardingData.currentLevel}
Available time: ${onboardingData.weeklyHours} hours per week
This phase scope: ${onboardingData.fourMonthScope}
Domain: ${onboardingData.domain}
${allPreviousPhases.length > 0 ? `Full goal duration: ${onboardingData.totalGoalDuration}` : ''}
`.trim()

  return callAI(apiKey, systemPrompt, [{ role: 'user', content: userMessage }], {
    temperature: 0.4,
    maxTokens:   7000,
  })
}

// Parse the plan JSON from the AI response
export function parsePlan(response) {
  // Strip markdown code fences (```json ... ``` or ``` ... ```)
  const stripped = response.replace(/```(?:json)?\s*/gi, '').replace(/```/g, '').trim()
  const candidates = [response.trim(), stripped]
  for (const text of candidates) {
    try { return { ok: true, plan: JSON.parse(text) } } catch (_) {}
    // Find outermost {...} block
    const start = text.indexOf('{')
    const end   = text.lastIndexOf('}')
    if (start !== -1 && end > start) {
      try { return { ok: true, plan: JSON.parse(text.slice(start, end + 1)) } } catch (_) {}
    }
  }
  return { ok: false, error: { title: 'Plan generation failed', message: 'The Archive produced an unreadable plan. Try again.', action: 'retry' } }
}

// ─────────────────────────────────────────────────────────────────────────────
//  VAEL — Check-in AI (daily micro-events)
// ─────────────────────────────────────────────────────────────────────────────

const VAEL_SYSTEM_PROMPT = `
You are Vael, an Aethyn instructor at the Archive in Ardenmoor.
You handle the daily check-ins — brief, purposeful exchanges with Seekers about their progress.

YOUR VOICE:
- Direct and practical. Less atmospheric than Maren, more grounded.
- You respect the Seeker's time. You don't pad.
- You notice specific things about their progress and name them.
- You never say generic encouraging things ("great job!", "you're doing amazing!").
  You say specific things: "Three sessions this week. That's consistent — consistency is the hard part."
- You are in the world of Ardenmoor. You never break that register.
- ZERO blasphemy. Absolute.

YOUR TASK:
Check in with the Seeker based on their current progress and story position.
Acknowledge what they did. Note what comes next. Keep it to 3-5 sentences.
If they are behind, acknowledge it without judgment — and help them adjust.
If they are ahead, note it and point forward.

After your check-in message, output a micro-event — a brief atmospheric moment
from the world (1-2 sentences, narrator-style, connected to the story's current act).
Format: <micro_event>narrator text here</micro_event>
`.trim()

export async function vaelCheckin(apiKey, context) {
  // context: { playerName, character, currentAct, currentWeek, tasksCompletedThisWeek,
  //            tasksExpectedThisWeek, streak, currentArcTitle, lastCheckin }
  const userMessage = `
Seeker: ${context.playerName} (${context.character})
Story position: Act ${context.currentAct}, ${context.currentArcTitle}
Week ${context.currentWeek} of the plan
Tasks completed this week: ${context.tasksCompletedThisWeek} of ${context.tasksExpectedThisWeek}
Streak: ${context.streak} days
Last check-in: ${context.lastCheckin || 'first time'}
`.trim()

  return callAI(apiKey, VAEL_SYSTEM_PROMPT, [{ role: 'user', content: userMessage }], {
    temperature: 0.65, maxTokens: 300,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
//  CONTINUATION PLANNER — generates Phase N+1 plan
// ─────────────────────────────────────────────────────────────────────────────
// This is separate from generatePlan() to make the continuation logic explicit.
// It receives everything known about the Seeker across all phases.

// ─────────────────────────────────────────────────────────────────────────────
//  TASK VERIFIER — AI checks photo or text proof that a task is complete
// ─────────────────────────────────────────────────────────────────────────────
// Returns: { pass: bool, confidence: 0–1, feedback: string }
// On key depletion (402): returns { pass: false, confidence: 0, feedback: null,
//   keyDepleted: true, error: classifyApiError(...) }

const VERIFY_PASS_THRESHOLD = 0.65

const VERIFY_SYSTEM_PROMPT = `
You are a strict but fair task completion verifier for a learning app called Ardenmoor.
Your job: determine if the submitted proof demonstrates genuine completion of the given task.

RULES:
- Be strict but reasonable. Minor imperfections are okay if the core task is clearly done.
- Do NOT pass vague or irrelevant submissions.
- Give specific, helpful feedback in ALL cases (one sentence — tell them what was right or what to fix).
- Never blaspheme any religion, culture, or belief.
- Output ONLY valid JSON. No other text before or after.

OUTPUT FORMAT (exactly):
{"pass": true_or_false, "confidence": 0.00_to_1.00, "feedback": "one sentence of specific feedback"}
`.trim()

export async function verifyTaskSubmission(apiKey, task, submissionType, submissionContent) {
  // submissionType: 'photo' | 'text'
  // submissionContent: data URL (e.g. 'data:image/jpeg;base64,...') for photo,
  //                    plain string for text

  const taskDesc = `Task: "${task.title}"${task.description ? `\nDescription: "${task.description}"` : ''}`

  let apiMessages

  if (submissionType === 'photo') {
    // Strip data URL prefix to get raw base64
    const [header, base64] = submissionContent.includes(',')
      ? submissionContent.split(',')
      : ['data:image/jpeg;base64', submissionContent]
    const mimeType = header.replace('data:', '').replace(';base64', '') || 'image/jpeg'

    apiMessages = [{
      role: 'user',
      content: [
        {
          type: 'text',
          text: `${taskDesc}\n\nThe user submitted a photo as proof they completed this task. Does this photo demonstrate genuine completion?`,
        },
        {
          type: 'image_url',
          image_url: { url: `data:${mimeType};base64,${base64}` },
        },
      ],
    }]
  } else {
    // Text submission
    apiMessages = [{
      role: 'user',
      content: `${taskDesc}\n\nThe user submitted the following as proof of completion:\n\n${submissionContent}\n\nDoes this demonstrate they completed the task?`,
    }]
  }

  let status = null
  try {
    const res = await fetch(API_URL, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  'https://ardenmoor.app',
        'X-Title':       'Ardenmoor',
      },
      body: JSON.stringify({
        model:       MODEL,
        messages:    [{ role: 'system', content: VERIFY_SYSTEM_PROMPT }, ...apiMessages],
        temperature: 0.1,
        max_tokens:  200,
      }),
    })
    status = res.status

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw Object.assign(new Error(body?.error?.message || `HTTP ${status}`), { status })
    }

    const data = await res.json()
    const raw  = data.choices[0].message.content.trim()
    // Extract JSON from response (guards against leading/trailing text)
    const match  = raw.match(/\{[\s\S]*\}/)
    const parsed = JSON.parse(match ? match[0] : raw)

    return {
      pass:       parsed.pass === true && (parsed.confidence ?? 0) >= VERIFY_PASS_THRESHOLD,
      confidence: parsed.confidence ?? 0,
      feedback:   parsed.feedback   ?? 'Verification complete.',
    }
  } catch (err) {
    const s = err.status || status
    const classified = classifyApiError(err, s)
    const isKeyDepleted = s === 402
    return {
      pass:        false,
      confidence:  0,
      feedback:    isKeyDepleted ? null : (classified.message || 'Could not verify — try again.'),
      keyDepleted: isKeyDepleted || false,
      error:       classified,
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  CONTINUATION PLANNER — generates Phase N+1 plan
// ─────────────────────────────────────────────────────────────────────────────
// This is separate from generatePlan() to make the continuation logic explicit.
// It receives everything known about the Seeker across all phases.

export async function generateContinuationPlan(apiKey, onboardingData, completedPhases, strengthsAndGaps) {
  const phaseNumber = completedPhases.length + 1

  // Build a precise picture of where the Seeker actually is
  const phaseHistorySummary = completedPhases.map((p, i) => ({
    phase:      i + 1,
    scope:      p.fourMonthScope,
    completed:  p.completedDate?.slice(0, 10),
    completion: p.completionRate ? `${p.completionRate}% of tasks completed` : 'rate unknown',
  }))

  const systemPrompt = buildPlanSystemPrompt(phaseNumber, completedPhases)

  const userMessage = `
This is a CONTINUATION plan. The Seeker has already completed ${completedPhases.length} phase(s).

ORIGINAL FULL GOAL: ${onboardingData.goal}
TOTAL ESTIMATED DURATION: ${onboardingData.totalGoalDuration}
DOMAIN: ${onboardingData.domain}
ORIGINAL MOTIVATION: ${onboardingData.motivation}

PHASES COMPLETED:
${phaseHistorySummary.map(p => `Phase ${p.phase}: "${p.scope}" — ${p.completed} — ${p.completion}`).join('\n')}

WHAT THE SEEKER IS STRONG AT NOW: ${strengthsAndGaps?.strengths || 'not assessed yet'}
WHAT STILL NEEDS WORK: ${strengthsAndGaps?.gaps || 'not assessed yet'}

PHASE ${phaseNumber} SCOPE: ${onboardingData.remainingPhases?.[phaseNumber - 2] || 'continue from where Phase ' + (phaseNumber - 1) + ' ended, toward the full goal'}

Generate Phase ${phaseNumber}. Do NOT cover anything already completed. Build directly forward.
`.trim()

  return callAI(apiKey, systemPrompt, [{ role: 'user', content: userMessage }], {
    temperature: 0.4, maxTokens: 4000,
  })
}
