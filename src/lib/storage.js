// ─── storage.js ───────────────────────────────────────────────────────────────
// Handles all persistence for the full application.
// ─────────────────────────────────────────────────────────────────────────────

import { saveStoryDataDB, loadStoryDataDB } from './supabase.js'

const KEYS = {
  SESSION:         'ardenmoor:session',
  SETTINGS:        'ardenmoor:settings',
  NAV_STATE:       'ardenmoor:nav_state',
  ONBOARDING_CHAT: 'ardenmoor:onboarding_chat', // Maren conversation messages[]
  ONBOARDING_DATA: 'ardenmoor:onboarding_data', // extracted plan_data from Maren
  PLAN_CURRENT:    'ardenmoor:plan_current',     // active phase plan object
  PLAN_HISTORY:    'ardenmoor:plan_history',     // array of all completed phases
  PLAN_PROGRESS:   'ardenmoor:plan_progress',    // daily task tracking, streak, inscriptions, scene unlocks
  STORY_PROGRESS:  'ardenmoor:story_progress',   // { act, scene, cutscene, unlockedActs[] }
  DAILY_STATE:     'ardenmoor:daily_state',      // { lastCheckin, streak, microEventIndex }
  STORY_DATA:      'ardenmoor:story_data',       // { journal: { scenes: [] }, ... } — mirrors cloud
  STORY_BEATS:     'ardenmoor_story_v1',         // StoryScreen beat position — must be cleared on plan reset
}

const ls = {
  get: (key) => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) {
      console.warn('[Storage] localStorage write failed:', e)
    }
  },
  remove: (key) => {
    try { localStorage.removeItem(key) } catch {}
  },
}

class StorageClass {

  // ── Session ────────────────────────────────────────────────────────────────

  getSession() { return ls.get(KEYS.SESSION) }

  saveSession(session) {
    ls.set(KEYS.SESSION, { ...session, updatedAt: new Date().toISOString() })
  }

  clearSession() { ls.remove(KEYS.SESSION) }

  // ── Settings ───────────────────────────────────────────────────────────────

  getSettings() {
    return ls.get(KEYS.SETTINGS) || {
      musicVolume:   0.45,
      ambientVolume: 0.3,
      sfxVolume:     0.6,
      voVolume:      0.9,
      muted:         false,
      apiKey:        '',
      character:     '',
      playerName:    '',
    }
  }

  saveSettings(settings) { ls.set(KEYS.SETTINGS, settings) }

  // ── Nav state ──────────────────────────────────────────────────────────────

  saveNavState(state) { ls.set(KEYS.NAV_STATE, state) }
  getNavState()       { return ls.get(KEYS.NAV_STATE) }

  // ── Onboarding ─────────────────────────────────────────────────────────────
  // chat: [{role:'maren'|'user', content:string, ts:iso}]
  // data: the parsed plan_data JSON block Maren outputs when onboarding is done

  getOnboardingChat()       { return ls.get(KEYS.ONBOARDING_CHAT) || [] }
  saveOnboardingChat(msgs)  { ls.set(KEYS.ONBOARDING_CHAT, msgs) }
  clearOnboardingChat()     { ls.remove(KEYS.ONBOARDING_CHAT) }

  getOnboardingData()       { return ls.get(KEYS.ONBOARDING_DATA) }
  saveOnboardingData(data)  {
    ls.set(KEYS.ONBOARDING_DATA, data)
    // New chronicle — reset chronicle-specific progress so tasks don't carry over
    // from a previous run. Streak, inscriptions, coins, relationships, inventory
    // are kept as cross-chronicle meta-progression.
    const p = this.getPlanProgress()
    p.tasksDone        = {}
    p.currentArcIdx    = 0
    p.currentWeekIdx   = 0
    p.completedArcIdxs = []
    p.completedWeeks   = 0
    p.unlockedScenes   = ['a1_seg0']
    p.newUnlockPending = null
    p.sparkQueue       = []
    p.sparkProgress    = {}
    p.pendingEpoch     = null
    p.pacingMap        = {}
    this.savePlanProgress(p)
    // Also clear saved story beat position so story restarts from the beginning
    ls.remove(KEYS.STORY_BEATS)
  }
  clearOnboardingData()     { ls.remove(KEYS.ONBOARDING_DATA) }

  // ── Plan ───────────────────────────────────────────────────────────────────
  // current: the active phase plan { phaseNumber, goal, fourMonthScope, arcs[], startDate, ... }
  // history: array of completed phases — each item is the full plan object + completedDate

  getPlan()           { return ls.get(KEYS.PLAN_CURRENT) }
  savePlan(plan)      { ls.set(KEYS.PLAN_CURRENT, plan) }
  clearPlan()         { ls.remove(KEYS.PLAN_CURRENT) }

  // Replace the active plan without wiping story progress, journal, or session.
  // The old plan is archived to history with status:'replaced'.
  replacePlan(newPlan) {
    const current = this.getPlan()
    if (current) {
      const history = this.getPlanHistory()
      ls.set(KEYS.PLAN_HISTORY, [
        ...history,
        { ...current, completedDate: new Date().toISOString(), status: 'replaced' },
      ])
    }
    this.savePlan(newPlan)
  }

  getPlanHistory()    { return ls.get(KEYS.PLAN_HISTORY) || [] }
  addCompletedPhase(phase) {
    const history = this.getPlanHistory()
    ls.set(KEYS.PLAN_HISTORY, [...history, { ...phase, completedDate: new Date().toISOString() }])
  }
  clearPlanHistory()  { ls.remove(KEYS.PLAN_HISTORY) }

  // ── Story progress ─────────────────────────────────────────────────────────
  // { act:1–7, scene:'S01', cutscene:0, unlockedActs:[1], introSeen:bool }

  getStoryProgress() {
    return ls.get(KEYS.STORY_PROGRESS) || {
      act: 1, scene: 'S01', cutscene: 0, unlockedActs: [1], introSeen: false,
    }
  }
  saveStoryProgress(progress) { ls.set(KEYS.STORY_PROGRESS, progress) }
  resetStoryProgress()        { ls.remove(KEYS.STORY_PROGRESS) }

  // ── Daily state ────────────────────────────────────────────────────────────
  // { lastCheckin: iso|null, streak: number, microEventIndex: number }

  getDailyState() {
    return ls.get(KEYS.DAILY_STATE) || {
      lastCheckin: null, streak: 0, microEventIndex: 0,
    }
  }
  saveDailyState(state) { ls.set(KEYS.DAILY_STATE, state) }

  // ── Player identity helper ─────────────────────────────────────────────────

  getPlayerIdentity() {
    const s = this.getSettings()
    const data = this.getOnboardingData()
    const name = data?.playerName || s.playerName || 'Seeker'
    const char = data?.character  || s.character  || 'kael'
    return {
      character:  char,
      playerName: name,
      pronouns: char === 'sira'
        ? { they: 'she', them: 'her', their: 'her', they_cap: 'She' }
        : { they: 'he',  them: 'him', their: 'his', they_cap: 'He'  },
    }
  }

  // ── Story Data — journal + misc flags, synced to cloud ────────────────────
  // Local shape: { journal: { scenes: [] } }
  // Cloud shape: story_data.data in Supabase (same shape, jsonb column)

  _getStoryData() {
    return ls.get(KEYS.STORY_DATA) || { journal: { scenes: [] } }
  }
  _setStoryData(data) {
    ls.set(KEYS.STORY_DATA, data)
  }

  // Journal — array of { id, title, summary, actId, visitedAt, skipped }
  getJournal() {
    return this._getStoryData().journal?.scenes || []
  }

  saveJournal(scenes) {
    const data = this._getStoryData()
    data.journal = { scenes }
    this._setStoryData(data)
  }

  // Save an epoch entry to the journal so it can be replayed from the Scene Journal.
  // Called when the user clicks "Play" on EpochBanner — before navigating to StoryScreen.
  saveEpochToJournal(arcIdx, arcTitle) {
    const id     = `epoch_arc${arcIdx}`
    const scenes = this.getJournal()
    if (scenes.find(s => s.id === id)) return   // already saved
    scenes.push({
      id,
      title:     arcTitle || `Arc ${arcIdx + 1} Epoch`,
      summary:   'The arc reaches its culmination — a turning point inscribed in the Chronicle.',
      type:      'epoch',
      arcIdx,
      visitedAt: Date.now(),
    })
    this.saveJournal(scenes)
  }

  // Push local story_data to Supabase for the logged-in user.
  // Fire-and-forget — never throws to the caller.
  async syncJournalToCloud(userId) {
    try {
      const data = this._getStoryData()
      await saveStoryDataDB(userId, data)
    } catch (e) {
      console.warn('[Storage] Journal cloud sync failed:', e)
    }
  }

  // Pull story_data from Supabase and merge with local (cloud wins on conflict).
  // Returns merged scenes array.
  async loadJournalFromCloud(userId) {
    try {
      const remote = await loadStoryDataDB(userId)
      if (!remote) return this.getJournal()

      const remoteScenes = remote.data?.journal?.scenes || []
      const localScenes  = this.getJournal()

      // Merge: keep all unique scene ids; cloud entry wins if both exist
      const byId = {}
      for (const s of localScenes)  byId[s.id] = s
      for (const s of remoteScenes) byId[s.id] = s   // cloud overwrites
      const merged = Object.values(byId).sort((a, b) => (a.visitedAt < b.visitedAt ? -1 : 1))

      this.saveJournal(merged)
      return merged
    } catch (e) {
      console.warn('[Storage] Journal cloud load failed:', e)
      return this.getJournal()
    }
  }

  // ── Plan Progress — daily task tracking, streak, inscriptions ─────────────
  // tasksDone: { 'a0_w0_t0': true, ... } — permanent once checked
  // unlockedScenes: ['a1_s1', 'a1_s2', ...] — story scenes available to play
  // completedArcIdxs: [0, 1, ...] — arc indices fully finished

  // Story segment keys follow the pattern a1_seg{n} where n = weeks completed.
  // Segment 0 is always free. Each call to advanceWeek() unlocks the next one.
  // This constant is kept for migration reference only.
  static _LEGACY_SCENE_UNLOCKS = ['a1_s2', 'a1_s3', 'a1_s4', 'a1_s5']



  getPlanProgress() {
    const saved = ls.get(KEYS.PLAN_PROGRESS)
    // Migrate old unlockedScenes: ['a1_s1'] → ['a1_seg0']
    if (saved?.unlockedScenes?.[0] === 'a1_s1') {
      saved.unlockedScenes = saved.unlockedScenes
        .filter(s => s !== 'a1_s1')
        .concat(['a1_seg0'])
      ls.set(KEYS.PLAN_PROGRESS, saved)
    }
    return saved || {
      currentArcIdx:      0,
      currentWeekIdx:     0,
      streak:             0,
      lastActiveDate:     null,   // 'YYYY-MM-DD'
      inscriptions:       0,
      coins:              0,      // spendable in story choices
      tasksDone:          {},     // 'a{arc}_w{week}_t{task}': true
      completedArcIdxs:   [],
      completedWeeks:     0,      // total weeks advanced; drives story segment unlocks
      unlockedScenes:     ['a1_seg0'],  // a1_seg0 always free; a1_seg{n} unlocks after week n
      newUnlockPending:   null,   // segment id waiting for notification banner
      // ── Priority 2: pacing map ──────────────────────────────────────────
      sparkQueue:         [],     // [{weekKey, sparkIdx}] — queued to play next
      sparkProgress:      {},     // {w1: 3, w2: 1, ...} — next spark index per week
      pendingEpoch:       null,   // arcIdx of epoch waiting to be triggered
      pacingMap:          {},     // {w1: [0,1,2,3,4], ...} — generated from plan
      // ── Priority 3: relationships ───────────────────────────────────────
      relationships:      { maren: 0, ryn: 0, serath: 0, brek: 0, dorath: 0, tal: 0, sira: 0 },
      // ── Priority 5: inventory ───────────────────────────────────────────
      inventory:          [],     // [{id, name, qty}]
    }
  }

  savePlanProgress(p) { ls.set(KEYS.PLAN_PROGRESS, p) }
  resetPlanProgress() { ls.remove(KEYS.PLAN_PROGRESS) }

  // Mark task done. Returns updated progress.
  completeTask(arcIdx, weekIdx, taskIdx) {
    const p    = this.getPlanProgress()
    const key  = `a${arcIdx}_w${weekIdx}_t${taskIdx}`
    if (p.tasksDone[key]) return p

    p.tasksDone[key]  = true
    p.inscriptions   += 5
    p.coins           = (p.coins || 0) + 2   // 2 coins per task completed

    // Streak logic
    const today     = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
    if (!p.lastActiveDate)               p.streak = 1
    else if (p.lastActiveDate === today) { /* same day, no change */ }
    else if (p.lastActiveDate === yesterday) p.streak += 1
    else                                 p.streak = 1
    p.lastActiveDate = today

    // ── Priority 2: Queue next spark using pacing map ──────────────────
    // triggerAt stores 0-indexed task positions within the week that fire a spark.
    // e.g. a 10-task week: triggerAt=[0,2,5,7,9] → only 5 of 10 tasks fire a spark.
    // Falls back to old behaviour (every task, cap 5) when no pacing map is stored.
    const storyWeekKey = `w${(p.completedWeeks || 0) + 1}`
    if (!p.sparkProgress) p.sparkProgress = {}
    if (!p.sparkQueue)    p.sparkQueue    = []
    const nextSpark = p.sparkProgress[storyWeekKey] ?? 0

    if (nextSpark < 5) {
      const weekPacing = p.pacingMap?.[storyWeekKey]
      let shouldQueue  = false

      if (weekPacing?.triggerAt) {
        // Count how many tasks in this plan week are done (current task already set above)
        const weekPrefix     = `a${arcIdx}_w${weekIdx}_t`
        const tasksCompleted = Object.keys(p.tasksDone).filter(k => k.startsWith(weekPrefix)).length
        shouldQueue = weekPacing.triggerAt.includes(tasksCompleted - 1)
      } else {
        // No pacing map — fire on every task (backward compat for AI-generated plans)
        shouldQueue = true
      }

      if (shouldQueue) {
        const alreadyQueued = p.sparkQueue.some(
          s => s.weekKey === storyWeekKey && s.sparkIdx === nextSpark
        )
        if (!alreadyQueued) {
          p.sparkQueue.push({ weekKey: storyWeekKey, sparkIdx: nextSpark })
          p.sparkProgress[storyWeekKey] = nextSpark + 1
        }
      }
    }

    this.savePlanProgress(p)
    return p
  }

  // Un-complete a task (toggle off). Returns updated progress.
  uncompleteTask(arcIdx, weekIdx, taskIdx) {
    const p   = this.getPlanProgress()
    const key = `a${arcIdx}_w${weekIdx}_t${taskIdx}`
    if (!p.tasksDone[key]) return p
    delete p.tasksDone[key]
    p.inscriptions = Math.max(0, p.inscriptions - 5)
    p.coins        = Math.max(0, (p.coins || 0) - 2)
    this.savePlanProgress(p)
    return p
  }

  // Spend coins in a story choice. Returns true if successful.
  spendCoins(amount) {
    const p = this.getPlanProgress()
    if ((p.coins || 0) < amount) return false
    p.coins -= amount
    this.savePlanProgress(p)
    return true
  }

  // Returns true if every task in the given week is done
  isWeekComplete(plan, arcIdx, weekIdx, progress) {
    const tasks = plan?.arcs?.[arcIdx]?.weeklyPlan?.[weekIdx]?.tasks
    if (!tasks?.length) return false
    return tasks.every((_, ti) => progress.tasksDone[`a${arcIdx}_w${weekIdx}_t${ti}`])
  }

  // Advance to next week, or complete current arc and start next.
  // Every successful advance unlocks the next story segment (a1_seg{n}).
  // Returns { newProgress, arcCompleted, unlockedScene }
  advanceWeek(plan, progress) {
    const p       = { ...progress, tasksDone: { ...progress.tasksDone } }
    const arc     = plan?.arcs?.[p.currentArcIdx]
    if (!arc) return { newProgress: p, arcCompleted: false, unlockedScene: null }

    const totalWeeksInArc = arc.weeklyPlan?.length || 2
    const nextWeek        = p.currentWeekIdx + 1
    let arcCompleted  = false
    let unlockedScene = null

    // ── Unlock story segment(s) ───────────────────────────────────────────
    // Default: one segment per completed week (week 1 → a1_seg1, etc.).
    // If plan.sceneUnlockMap[week] exists, those specific keys unlock instead —
    // this lets a 13-week plan cover all 16 gated segments (some weeks unlock 2).
    const newCompletedWeeks = (p.completedWeeks || 0) + 1
    p.completedWeeks = newCompletedWeeks
    const unlockKeys = plan.sceneUnlockMap?.[newCompletedWeeks]
      ? plan.sceneUnlockMap[newCompletedWeeks]
      : [`a1_seg${newCompletedWeeks}`]

    const newlyUnlocked = []
    for (const segKey of unlockKeys) {
      if (!(p.unlockedScenes || []).includes(segKey)) {
        p.unlockedScenes = [...(p.unlockedScenes || ['a1_seg0']), segKey]
        newlyUnlocked.push(segKey)
      }
    }
    if (newlyUnlocked.length > 0) {
      p.newUnlockPending = newlyUnlocked[0]   // show banner for first unlocked
      unlockedScene      = newlyUnlocked[0]
    }

    if (nextWeek >= totalWeeksInArc) {
      // ── Arc complete ───────────────────────────────────────────────────
      arcCompleted = true
      const completedArcIdx = p.currentArcIdx   // capture before advancing
      p.completedArcIdxs = [...(p.completedArcIdxs || []), completedArcIdx]
      p.inscriptions    += 50   // arc completion bonus
      p.coins            = (p.coins || 0) + 10  // arc bonus coins

      // ── Priority 2: Set pending epoch ─────────────────────────────────
      // Only set if not already pending (don't overwrite unplayed epoch)
      if (p.pendingEpoch === null || p.pendingEpoch === undefined) {
        p.pendingEpoch = completedArcIdx
      }

      // Advance arc index (if not the last arc)
      const nextArc = p.currentArcIdx + 1
      if (nextArc < (plan.arcs?.length || 7)) {
        p.currentArcIdx  = nextArc
        p.currentWeekIdx = 0
      }
    } else {
      // ── Week advance ───────────────────────────────────────────────────
      p.currentWeekIdx  = nextWeek
      p.inscriptions   += 10   // week completion bonus
      p.coins           = (p.coins || 0) + 3   // week bonus coins
    }

    this.savePlanProgress(p)
    return { newProgress: p, arcCompleted, unlockedScene }
  }

  // Dismiss the pending unlock notification
  clearUnlockPending() {
    const p = this.getPlanProgress()
    if (!p.newUnlockPending) return
    p.newUnlockPending = null
    this.savePlanProgress(p)
  }

  // ── Priority 2: Spark / Epoch queue helpers ────────────────────────────────

  // Returns the next queued spark or null if none.
  getNextSpark() {
    return (this.getPlanProgress().sparkQueue || [])[0] || null
  }

  // Removes the first spark from the queue (after it has been played).
  shiftSpark() {
    const p = this.getPlanProgress()
    p.sparkQueue = (p.sparkQueue || []).slice(1)
    this.savePlanProgress(p)
  }

  // Store the generated pacing map (weekKey → sparkIndices).
  setPacingMap(map) {
    const p = this.getPlanProgress()
    p.pacingMap = map
    this.savePlanProgress(p)
  }

  // Clear the pending epoch flag after the epoch beat has been triggered.
  clearPendingEpoch() {
    const p = this.getPlanProgress()
    p.pendingEpoch = null
    this.savePlanProgress(p)
  }

  // ── Priority 3: Relationship tracking ─────────────────────────────────────

  // Adjust a character's relationship score by delta (positive or negative).
  // Clamped to [-100, 100]. Silently ignores unknown chars.
  adjustRelationship(char, delta) {
    const p = this.getPlanProgress()
    if (!p.relationships) {
      p.relationships = { maren: 0, ryn: 0, serath: 0, brek: 0, dorath: 0, tal: 0, sira: 0 }
    }
    if (char in p.relationships) {
      p.relationships[char] = Math.max(-100, Math.min(100, (p.relationships[char] || 0) + delta))
      this.savePlanProgress(p)
    }
  }

  // ── Priority 5: Inventory ──────────────────────────────────────────────────

  // Give the player an item. Stacks qty if already owned.
  giveItem(itemId, name = itemId, qty = 1) {
    const p = this.getPlanProgress()
    if (!p.inventory) p.inventory = []
    const existing = p.inventory.find(i => i.id === itemId)
    if (existing) {
      existing.qty = (existing.qty || 1) + qty
    } else {
      p.inventory.push({ id: itemId, name, qty })
    }
    this.savePlanProgress(p)
  }

  // Returns true if the player owns at least one of this item.
  hasItem(itemId) {
    return (this.getPlanProgress().inventory || []).some(i => i.id === itemId && (i.qty || 0) > 0)
  }

  // Consume one of an item. Returns true if successful.
  useItem(itemId) {
    const p = this.getPlanProgress()
    if (!p.inventory) return false
    const item = p.inventory.find(i => i.id === itemId)
    if (!item || (item.qty || 0) < 1) return false
    item.qty -= 1
    if (item.qty <= 0) p.inventory = p.inventory.filter(i => i.id !== itemId)
    this.savePlanProgress(p)
    return true
  }

  // ── Game data reset — clears progress but keeps session + settings ─────────
  // Used by "Start Anew". Auth stays. Audio prefs stay.

  clearGameData() {
    const keep = new Set([KEYS.SESSION, KEYS.SETTINGS])
    Object.values(KEYS).forEach(k => { if (!keep.has(k)) ls.remove(k) })
  }

  // ── Full clear (used when user resets everything including auth) ────────────

  clearAll() {
    Object.values(KEYS).forEach(k => ls.remove(k))
  }
}

export const storage = new StorageClass()

// Helper: segment key for a given week number (0 = free intro, 1+ = weekly unlocks)
export function storySegmentKey(weekNumber) { return `a1_seg${weekNumber}` }
