// ─── supabase.js ──────────────────────────────────────────────────────────────
// Supabase client and all database operations.
// DISABLED until the USE_SUPABASE flag is flipped in storage.js.
//
// Tables:
//   chronicles       — { id, user_id, data (jsonb), created_at, updated_at }
//   deeds            — { id, chronicle_id, deed_id, completed, notes, logged_at }
//   checkins         — { id, chronicle_id, epoch_index, chapter_index, messages (jsonb), created_at }
//   ai_conversations — { id, user_id, type ('onboarding'|'checkin'), messages (jsonb), created_at }
//   story_data       — { id, user_id, data (jsonb), updated_at }
//                      data: { journal: { scenes: [...] } }
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// ── Client ────────────────────────────────────────────────────────────────────
// Will throw at runtime if env vars are not set — intentional until activated.
export let supabase = null

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession:    true,   // keep session in localStorage
      autoRefreshToken:  true,   // auto-refresh before expiry
      storageKey:        'ardenmoor-auth', // unique key so no conflicts
    }
  })
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function signUp(email, password, username) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  })

  if (error) throw error
  return data.user
}

export async function signIn(email, password) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data?.user ?? null
}

export async function getSessionUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data?.session?.user ?? null
}

// ── Profiles ──────────────────────────────────────────────────────────────────

export async function getProfileDB(userId) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, created_at')
    .eq('id', userId)
    .single()

  if (error) return null
  return data
}

// ── Chronicles ────────────────────────────────────────────────────────────────

export async function saveChronicleDB(userId, chronicle) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { data, error } = await supabase
    .from('chronicles')
    .upsert({
      id:         chronicle.id,
      user_id:    userId,
      data:       chronicle,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function loadChronicleDB(userId) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { data, error } = await supabase
    .from('chronicles')
    .select('data')
    .eq('user_id', userId)
    .eq('data->>status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) return null
  return data?.data ?? null
}

// ── Deeds ─────────────────────────────────────────────────────────────────────

export async function logDeedDB(chronicleId, deedId, completed, notes = null) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  // Skip sync when there is no active Supabase auth session (e.g. mock auth)
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  // maybeSingle returns null (not 406) when no row matches
  const { data: existing } = await supabase
    .from('deeds')
    .select('id')
    .eq('chronicle_id', chronicleId)
    .eq('deed_id', String(deedId))
    .maybeSingle()

  if (existing?.id) {
    const { error } = await supabase
      .from('deeds')
      .update({ completed, notes, logged_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('deeds')
      .insert({ chronicle_id: chronicleId, deed_id: String(deedId), completed, notes })
    if (error) throw error
  }
}

export async function getDeedLogsDB(chronicleId) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { data, error } = await supabase
    .from('deeds')
    .select('*')
    .eq('chronicle_id', chronicleId)

  if (error) throw error
  return data || []
}

// ── Check-ins ─────────────────────────────────────────────────────────────────

export async function saveCheckInDB(checkIn) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { error } = await supabase
    .from('checkins')
    .insert({
      chronicle_id:   checkIn.chronicleId,
      epoch_index:    checkIn.epochIndex,
      chapter_index:  checkIn.chapterIndex,
      messages:       checkIn.messages,
      created_at:     new Date().toISOString(),
    })

  if (error) throw error
}

export async function getCheckInsDB(chronicleId) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { data, error } = await supabase
    .from('checkins')
    .select('*')
    .eq('chronicle_id', chronicleId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

// ── AI Conversations ──────────────────────────────────────────────────────────

export async function saveConversationDB(userId, type, messages) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  const { error } = await supabase
    .from('ai_conversations')
    .insert({
      user_id:    userId,
      type,
      messages,
      created_at: new Date().toISOString(),
    })

  if (error) throw error
}

// ── Story Data (journal, progress flags) ──────────────────────────────────────
// Single row per user — upserts on user_id.
// data shape: { journal: { scenes: [...] } }

export async function saveStoryDataDB(userId, data) {
  if (!supabase) throw new Error('[Supabase] Client not initialized.')

  // Verify we have an active session before writing
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  const { error } = await supabase
    .from('story_data')
    .upsert({
      user_id:    userId,
      data,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

  if (error) throw error
}

export async function loadStoryDataDB(userId) {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('story_data')
    .select('data, updated_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) return null
  return data ?? null
}
