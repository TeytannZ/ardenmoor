// ─── presets.js ────────────────────────────────────────────────────────────────
// Arabic Language Foundations — 4-Month Plan
// One plan. 16 weeks. 5 arcs. Script → Vocabulary → Grammar → Reading → Integration.
//
// SEGMENT ALIGNMENT — no sceneUnlockMap needed.
// The story has exactly 16 gated segments (a1_seg1 through a1_seg16).
// storage.advanceWeek() defaults to unlocking a1_seg{completedWeeks} when
// no sceneUnlockMap is present — so completing week N unlocks a1_segN, 1:1.
//
//   Week  1 → a1_seg1   — escape from the Archive, the passage, Ryn
//   Week  2 → a1_seg2   — Maren's confession, the city gate, east
//   Week  3 → a1_seg3   — the voice in the trees, Dorath, the safe house
//   Week  4 → a1_seg4   — what the symbol means, the house unsafe
//   Week  5 → a1_seg5   — the cipher opened, the fourteenth fragment
//   Week  6 → a1_seg6   — the first practice, Brek's message arrives
//   Week  7 → a1_seg7   — Brek arrives, the escape was allowed
//   Week  8 → a1_seg8   — what Maren knew, the deep records, Serath ahead
//   Week  9 → a1_seg9   — the trail, the building at the road's end
//   Week 10 → a1_seg10  — Voss, the fragment that survived the fire
//   Week 11 → a1_seg11  — what you carry, Sira's book found
//   Week 12 → a1_seg12  — the book's full content, the settlement's location
//   Week 13 → a1_seg13  — the settlement, Sira found, Serath is there
//   Week 14 → a1_seg14  — Serath's truth, the settlement's history
//   Week 15 → a1_seg15  — the method complete, it works
//   Week 16 → a1_seg16  — what the Archive was for, Act One closes
// ─────────────────────────────────────────────────────────────────────────────

import { storage } from './storage.js'

// ─── Shared onboarding data ───────────────────────────────────────────────────
export const PRESET_ONBOARDING = {
  goal:              'Master the Arabic script, build a 500-word foundation vocabulary, and read simple Modern Standard Arabic texts with confidence',
  motivation:        'Seeking direct access to one of the oldest living languages and the ancient script that carries it',
  currentLevel:      'Complete beginner — no prior Arabic, unfamiliar with Arabic script or pronunciation',
  weeklyHours:       10,
  playerName:        'Darian',
  character:         'kael',
  fourMonthScope:    'Learn all 28 Arabic letters in isolation and connected form, master short-vowel pronunciation, build a 500-word active vocabulary, understand basic MSA sentence structure, and write a personal paragraph in Arabic by week 16',
  totalGoalDuration: '4 months — the full arc of Act I',
  domain:            'Arabic language foundations',
}

// ─── Arabic Language Foundations — 4-Month Plan ──────────────────────────────
// 16 weeks. 5 arcs. Perfectly aligned with Act 1's 16 story gates.
// No sceneUnlockMap — the default 1:1 mapping handles everything.
const PHASE_1 = {
  phaseNumber:    1,
  fourMonthScope: 'Learn all 28 Arabic letters, master pronunciation with short vowels, build a 500-word vocabulary, understand basic MSA sentence structure, and produce a handwritten paragraph in Arabic by week 16',
  startWeek:      1,
  totalWeeks:     16,
  _isPreset:      true,
  _presetPhase:   1,
  storyConnection: 'Every week you complete, another gate opens in the Archive. Kael moves through the world as you move through the script — each fragment he recovers mirrors something you have learned to read. The chronicle ends when you have built something that will outlast the learning.',

  arcs: [

    // ─── Arc 1: The Script ───────────────────────────────────────────────────
    // Weeks 1–3 · a1_seg1, a1_seg2, a1_seg3
    // Story: escape from the Archive, the road east begins, Dorath appears
    {
      arcNumber: 1, storyAct: 1,
      title:      'The Script',
      storyTheme: 'The Archive Burns — The Road Begins',
      weeks:      '1–3',
      focus:      'Learn all 28 Arabic letters — their isolated and connected forms, correct pronunciation, and the logic of the Arabic writing system',
      weeklyPlan: [
        {
          week: 1, theme: 'The First Fourteen',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn Arabic letters aleph through zayn (14 letters)',
              type:        'learn',
              description: 'Arabic has 28 letters. This week you learn the first half: ا ب ت ث ج ح خ د ذ ر ز س ش ص. For each letter: its name, its isolated form, and its sound. Arabic letters connect within words and change shape depending on position — right now, focus only on isolated form and sound. Write each letter ten times by hand. Do not skip letters or merge sessions. The script has been written this way for over a thousand years. Learn it as it was designed.',
              resource:    'Madinah Arabic Book 1 (free online) or "Arabic from the Beginning" — use any book that shows isolated letter forms clearly',
            },
            {
              title:       'Daily handwriting drill — 15 minutes before sleep',
              type:        'practice',
              description: 'Each night this week: open your Arabic notebook to a blank page and write each of the 14 letters you have learned, from memory, three times each. No copying from a reference — try to recall first, then check. Circle the ones you got wrong. The next night, write those first. Do not stop the drill if you make mistakes. That is the point of the drill.',
              resource:    'Dedicated Arabic notebook — handwriting only, no phone or typing for this practice',
            },
          ],
          milestone: 'All 14 letters (aleph–zayn) recognizable on sight and writable from memory; handwriting drill completed every night for 7 days',
        },
        {
          week: 2, theme: 'The Second Fourteen',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn Arabic letters dad through ya (14 letters)',
              type:        'learn',
              description: 'The second half: ض ط ظ ع غ ف ق ك ل م ن ه و ي. These include some of the most distinctive Arabic sounds — the emphatic consonants (ض, ط, ظ) and the pharyngeal letters (ع, غ). Pay particular attention to ع and غ — they have no equivalent in most other languages and require deliberate practice. Write each letter ten times. Review the first 14 at the start of each session.',
              resource:    'Same resource as week 1 — continue through the alphabet section',
            },
            {
              title:       'Begin reading three-letter roots',
              type:        'practice',
              description: 'Arabic is built on three-letter roots from which all words in a family are derived. This week, practice reading 10 simple root combinations you encounter in your textbook — do not worry about meaning yet. Focus only on the act of reading left to right, recognizing letters in sequence. If a word takes you more than 5 seconds to decode, write it out letter by letter. Speed comes from repetition.',
              resource:    'Madinah Arabic Book 1 vocabulary lists — use only for reading practice, not memorization yet',
            },
          ],
          milestone: 'All 28 letters recognized on sight; second-half letters writable from memory; 10 three-letter combinations read correctly',
        },
        {
          week: 3, theme: 'Short Vowels and First Words',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Master the three short vowels (harakat)',
              type:        'learn',
              description: 'Arabic has three short vowels written as marks above or below letters: fatha (َ), kasra (ِ), damma (ُ). Most printed Arabic omits these — but you must learn them now so you can read fully-voweled text and understand pronunciation precisely. Practice reading 20 fully-voweled words this week, sounding out each vowel. These marks are the key to reading classical Arabic texts correctly.',
              resource:    'Arabic short vowels chart from your textbook; Quran.com uses fully-voweled text for reading practice',
            },
            {
              title:       'Learn and write your first 30 Arabic words',
              type:        'practice',
              description: 'By now you can read the script. This week, add meaning to it. Memorize 30 common Arabic words from your textbook vocabulary list — household objects, people, places, simple verbs. For each: write it three times, cover it, write it again from memory. Test yourself at the end of each day. The words you actually write by hand go into memory faster than the ones you only look at.',
              resource:    'Madinah Arabic Book 1 vocabulary lists; or Anki with an Arabic beginners deck as a supplementary review tool',
            },
          ],
          milestone: 'Short vowels applied correctly in 20 test words; 30 vocabulary words memorized and writable from memory; full alphabet review passed (all 28 from memory)',
        },
      ],
    },

    // ─── Arc 2: First Fragments ──────────────────────────────────────────────
    // Weeks 4–6 · a1_seg4, a1_seg5, a1_seg6
    // Story: the symbol deciphered, the hidden fragment found, the first practice
    {
      arcNumber: 2, storyAct: 1,
      title:      'First Fragments',
      storyTheme: 'The Cipher Opens — The Safe House',
      weeks:      '4–6',
      focus:      'Build a 200-word active vocabulary and learn the Arabic definite article, basic nouns, and the structure of simple Arabic sentences',
      weeklyPlan: [
        {
          week: 4, theme: 'The Definite Article',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn how the definite article al- works',
              type:        'learn',
              description: 'Arabic has one definite article: ال (al-). It attaches to the front of nouns. It also partially assimilates to the next letter — "al-shams" becomes "ash-shams" because ش is a sun letter. This week: learn which of the 28 letters are sun letters (14) and which are moon letters (14), and practice the assimilation rule until it is automatic. Everything in Arabic connects — grammar, script, and sound are one system.',
              resource:    'Madinah Arabic Book 1 lessons on the definite article; write 20 noun pairs (with and without al-)',
            },
            {
              title:       'Expand vocabulary to 100 words — grouped by category',
              type:        'practice',
              description: 'Add 70 new words to your 30 from week 3, grouped into categories: family members (أب، أم، أخ...), body parts, classroom objects, colors, and action verbs (read, write, go, come, speak). Group learning is faster than random lists because the brain stores words in networks. Review all 100 daily using flashcards or handwritten self-testing.',
              resource:    'Anki deck "Arabic Frequency List — Top 500" (free) for category grouping; write each new word in your notebook',
            },
          ],
          milestone: 'Sun/moon letter rule applied correctly in 20 test words; 100 total vocabulary words memorized and producible from memory',
        },
        {
          week: 5, theme: 'Numbers and Questions',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn Arabic numbers 1–100 and question words',
              type:        'learn',
              description: 'Numbers in Arabic have masculine and feminine forms, and counter-intuitive agreement rules — but for now, learn cardinal numbers 1–10 deeply (both genders) and recognize 11–100. More important this week: the question words. ما (what), من (who), أين (where), متى (when), كيف (how), لماذا (why), كم (how many). These words unlock your ability to actually ask and understand questions in Arabic.',
              resource:    'Madinah Arabic Book 1 number and question chapters; practice by writing 10 questions using different question words',
            },
            {
              title:       'Write 20 simple sentences using your vocabulary',
              type:        'practice',
              description: 'Arabic sentence structure is flexible but the most common order is Verb–Subject–Object (VSO). This week, write 20 sentences using words you already know. Example: كتب الطالب الدرس (The student wrote the lesson). Do not translate word by word from English — think about what you want to say, then build the sentence in Arabic directly. Corrections can come from a grammar reference, not from fear of getting it wrong the first time.',
              resource:    'Your Arabic notebook — handwritten sentences only; check against Madinah Arabic answer keys',
            },
          ],
          milestone: 'Numbers 1–100 recognizable; question words producible from memory; 20 original Arabic sentences written and checked',
        },
        {
          week: 6, theme: 'Masculine and Feminine',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Master Arabic gender agreement rules',
              type:        'learn',
              description: 'All Arabic nouns are either masculine or feminine — there is no neutral gender. Most feminine nouns end in ta marbuta (ة), but many do not, and these must be memorized individually. This week: review your 100-word vocabulary list and mark the gender of each noun. Then learn the pattern: adjectives must agree with their nouns in gender, number, and definiteness. This is the most important grammar rule you will learn this month.',
              resource:    'Madinah Arabic Book 1 gender chapters; rewrite your vocabulary list with gender markers',
            },
            {
              title:       'Begin a personal vocabulary notebook with Arabic-only entries',
              type:        'project',
              description: 'Create a dedicated vocabulary notebook organized by category. For each word: Arabic script, pronunciation (do not use romanization), and a sentence you wrote using it. This notebook is your personal lexicon — it grows throughout the program and becomes a reference you understand from the inside. By week 16, it will contain your full 500-word foundation. Start it this week. Write the first 100 words in.',
              resource:    'A dedicated second notebook — clean, organized, Arabic script only; start with the words you already know',
            },
          ],
          milestone: 'Gender of 100 vocabulary words correctly marked; personal vocabulary notebook started with all 100 words entered',
        },
      ],
    },

    // ─── Arc 3: The Grammar Gate ─────────────────────────────────────────────
    // Weeks 7–9 · a1_seg7, a1_seg8, a1_seg9
    // Story: Brek arrives, what Maren knew, the trail east
    {
      arcNumber: 3, storyAct: 1,
      title:      'The Grammar Gate',
      storyTheme: 'What Was Known — The Trail East',
      weeks:      '7–9',
      focus:      'Learn Arabic verb conjugation (past and present tense), basic sentence patterns, and build vocabulary to 300 words',
      weeklyPlan: [
        {
          week: 7, theme: 'The Past Tense',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn Arabic past-tense verb conjugation',
              type:        'learn',
              description: 'Arabic verb conjugation is highly systematic. In the past tense, suffixes change to indicate who did the action. Start with the singular forms: he/she/you-masculine/you-feminine/I. Learn 10 common verbs this week and conjugate each one fully in the past tense. The key insight: once you know the pattern, every new verb follows the same rules. كَتَبَ (he wrote), كَتَبَتْ (she wrote), كَتَبْتَ (you wrote, m.), etc.',
              resource:    'Madinah Arabic Book 1 past-tense chapter; write out the conjugation table for 10 verbs',
            },
            {
              title:       'Write 15 past-tense sentences from your own life',
              type:        'practice',
              description: 'Write 15 sentences describing things that happened to you this week — or things you did earlier today. Use only vocabulary you already know and past-tense verbs from this week\'s study. If you do not know a word, find it and add it to your vocabulary notebook. The goal is sentences that are actually true. False practice sentences are harder to remember because they have no anchor.',
              resource:    'Your Arabic notebook — connect new grammar to real events in your life',
            },
          ],
          milestone: '10 common verbs conjugated fully in past tense; 15 personal past-tense sentences written and checked',
        },
        {
          week: 8, theme: 'The Present Tense',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn Arabic present/imperfect tense conjugation',
              type:        'learn',
              description: 'The Arabic present (imperfect) tense uses prefixes and suffixes rather than just suffixes. Learn the same 10 verbs from last week in present tense: يَكْتُبُ (he writes), تَكْتُبُ (she writes), تَكْتُبُ (you write, m.), etc. Then add 10 new verbs to your active conjugation list. Notice the pattern: the present tense prefix tells you the person; the suffix refines it. The same logic applies to all regular verbs.',
              resource:    'Madinah Arabic Book 1 present-tense chapter; write out full conjugation tables for 20 verbs total',
            },
            {
              title:       'Add 100 words to reach 300 total',
              type:        'practice',
              description: 'This week, push your vocabulary to 300 words by adding 100 new entries from your textbook. Focus on verbs — you need verbs more than nouns now that you can conjugate. Add at least 40 new verbs to your vocabulary notebook. For each new verb: write the past-tense root form, the present-tense he-form, and one example sentence. Review all 300 words by category once this week.',
              resource:    'Madinah Arabic Book 1 vocabulary lists; your personal vocabulary notebook',
            },
          ],
          milestone: '20 verbs conjugated in both past and present tense; vocabulary expanded to 300 words; all entries in vocabulary notebook',
        },
        {
          week: 9, theme: 'Negation and Questions',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn to negate sentences and form questions',
              type:        'learn',
              description: 'Negation in Arabic works differently for past and present tense. Past: لَمْ + present tense (لم يذهب — he did not go). Present: لا + present tense (لا يذهب — he does not go). Future: لن + present tense. Questions: add هَلْ or أَ to the beginning, or use question words you already know. Practice by taking 10 of your past-tense sentences from week 7 and converting them to questions, then to negatives.',
              resource:    'Madinah Arabic Book 1 negation chapter; write 10 question-negative sentence pairs from your earlier work',
            },
            {
              title:       'Self-assessment — write 20 sentences you could not have written in week 1',
              type:        'practice',
              description: 'Write 20 Arabic sentences that require grammar you did not know at the start of the program: gender agreement, definite article, a conjugated verb in past or present tense, and a question. Review them against your grammar reference and mark any errors. Then look at the sentence you wrote in week 3. The gap between those two things is what you have built. Record this observation in your vocabulary notebook.',
              resource:    'Your Arabic notebook — this exercise is a checkpoint, not a test; it is data about your progress',
            },
          ],
          milestone: 'Negation in past and present tense applied correctly; 20 multi-element sentences written demonstrating grammar from arcs 1–3',
        },
      ],
    },

    // ─── Arc 4: Reading Ancient Lines ────────────────────────────────────────
    // Weeks 10–12 · a1_seg10, a1_seg11, a1_seg12
    // Story: Voss revealed, what you carry, Sira's book found
    {
      arcNumber: 4, storyAct: 1,
      title:      'Reading Ancient Lines',
      storyTheme: 'The Fragment Survives — Sira Found',
      weeks:      '10–12',
      focus:      'Begin reading short Arabic texts, practice listening comprehension, and build vocabulary to 400 words',
      weeklyPlan: [
        {
          week: 10, theme: 'First Readings',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Read Surah Al-Fatiha in Arabic — word by word',
              type:        'learn',
              description: 'Al-Fatiha is seven short verses and contains some of the most commonly heard Arabic in the world. This week, read each word, look up any you do not recognize, and write a full word-by-word translation in your notebook. This is not a religious exercise — it is a reading exercise using one of the most precisely preserved Arabic texts available. By the end of the week, you should be able to read the seven verses with correct pronunciation and understand what each word means.',
              resource:    'Quran.com with word-by-word translation enabled; your vocabulary notebook for new words found',
            },
            {
              title:       'Read 5 short MSA paragraphs from a beginner reader',
              type:        'practice',
              description: 'Find a graded Arabic reader at A1 level — Readers in Arabic series or similar. Read five short passages this week. For each: read once without stopping, then read again marking every word you do not understand. Look up those words and add them to your vocabulary notebook. Then read the passage a third time without looking anything up. The third reading measures how much you actually retained.',
              resource:    'Graded Arabic reader A1 level; your vocabulary notebook for new words',
            },
          ],
          milestone: 'Al-Fatiha fully translated word-by-word and read from memory; 5 graded passages read with unknown words identified and added to vocabulary',
        },
        {
          week: 11, theme: 'Listening and Speaking',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Begin daily Arabic listening practice — 20 minutes/day',
              type:        'learn',
              description: 'You have been reading. Now hear what you know. Use Arabic Pod 101 or YouTube channels aimed at MSA beginners — look for content with on-screen Arabic subtitles so you can connect the written and spoken word simultaneously. The first few sessions will feel overwhelming — that is normal. Focus on recognizing words you already know, not understanding everything. Comprehension grows from recognition.',
              resource:    'ArabicPod101 (free tier); YouTube: "Learn Arabic with ArabicPod101" — use episodes with subtitles only',
            },
            {
              title:       'Record yourself reading a passage aloud — compare to native audio',
              type:        'practice',
              description: 'Choose one of the passages you read last week. Record yourself reading it aloud. Then find a native speaker audio version of the same text (or a similar passage). Listen to both back to back. Identify the three biggest pronunciation differences. Work on those three specifically. Do not try to sound perfect — identify the gaps and close them one at a time. Repeat next week with a different passage.',
              resource:    'Voice memo app on your phone; Forvo.com for native pronunciation of specific words',
            },
          ],
          milestone: '7 days of 20-minute listening practice completed; self-recording done and three pronunciation targets identified',
        },
        {
          week: 12, theme: 'Vocabulary to 400',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Add 100 high-frequency words to reach 400 total',
              type:        'learn',
              description: 'Arabic\'s most common 500 words cover roughly 75% of everyday written text. This week, use a frequency list to identify the 100 most useful words you do not yet know and add them to your vocabulary notebook. Prioritize prepositions, conjunctions, and common adverbs — these are the connective tissue of sentences and the words that make reading suddenly feel easier. Review all 400 this week.',
              resource:    'Wiktionary "Arabic frequency lists" or "Arabic Swadesh list"; your vocabulary notebook',
            },
            {
              title:       'Write a short paragraph (8–10 sentences) entirely from memory',
              type:        'practice',
              description: 'Write a paragraph about your week in Arabic — what you did, where you went, what you read. Do not look anything up until you have finished. Then check. The number of words you could write without looking anything up is your real vocabulary size. Update your notebook with anything you had to invent or skip. This exercise will be repeated in week 16 as the final measure of progress.',
              resource:    'Your Arabic notebook — date this entry; you will compare it to the week 16 version',
            },
          ],
          milestone: 'Vocabulary at 400 words; 8-sentence paragraph written from memory without reference; listening practice maintained daily',
        },
      ],
    },

    // ─── Arc 5: The Living Script ────────────────────────────────────────────
    // Weeks 13–16 · a1_seg13, a1_seg14, a1_seg15, a1_seg16
    // Story: the settlement found, Serath's truth, the method complete, Act One closes
    {
      arcNumber: 5, storyAct: 1,
      title:      'The Living Script',
      storyTheme: 'The Settlement — The Method Complete',
      weeks:      '13–16',
      focus:      'Consolidate all grammar and vocabulary, begin reading unsimplified short texts, write a full personal document in Arabic, and close the foundation phase',
      weeklyPlan: [
        {
          week: 13, theme: 'Mid-Program Recalibration',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Grammar review — test yourself on all five key rules',
              type:        'learn',
              description: 'Five rules you must know cold by now: (1) definite article al- and sun/moon letters, (2) masculine/feminine gender agreement, (3) past-tense verb conjugation for the six singular persons, (4) present-tense verb conjugation for the six singular persons, (5) negation in past and present tense. Write 10 test sentences for each rule without looking at your notes. Grade yourself honestly. Any rule below 70% correct needs one more week of focused practice.',
              resource:    'Your Arabic notebook — grammar test; Madinah Arabic answer keys for self-checking',
            },
            {
              title:       'Read one complete short article in Arabic without a translation',
              type:        'practice',
              description: 'Find a short article from BBC Arabic or Al Jazeera Arabic — look for short news summaries, 3–5 sentences. Read it once without any help. Mark every word you understand. Then look up the words you did not and reread. The point is not to understand everything — the point is to discover how much you actually understand from genuine Arabic writing, not simplified practice material. This is the real test of weeks 1–12.',
              resource:    'BBC Arabic (bbc.com/arabic) — Homepage headlines are short enough; Al Jazeera Arabic for slightly longer pieces',
            },
          ],
          milestone: 'Grammar self-test completed for all 5 rules with scores recorded; one real Arabic article read and marked for comprehension',
        },
        {
          week: 14, theme: 'Dual and Plural',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Learn the Arabic dual and the two plural patterns',
              type:        'learn',
              description: 'Arabic has three numbers: singular, dual (exactly two), and plural. Dual is formed regularly by adding ان (nominative) or ين (oblique). Plural is split into sound plural (regular suffix) and broken plural (the root changes shape — كتاب → كتب, book → books). Broken plurals must be memorized individually. This week: learn the sound plural suffixes and the 15 most common broken plural patterns. Add the plural form of all nouns in your vocabulary notebook.',
              resource:    'Madinah Arabic Book 1 plural chapter; Wright\'s Arabic Grammar for broken plural patterns (online)',
            },
            {
              title:       'Expand vocabulary to 500 words — the program target',
              type:        'practice',
              description: 'This is the week you reach the 500-word goal. Add the final 100 words from whatever domains are still thin in your vocabulary notebook — adjectives, adverbs, abstract nouns, or topic-specific vocabulary from a field you care about. For each: Arabic script, a sentence you compose, and plural form if it is a noun. You now have a complete foundation. Every word you add from here goes into a structure that already has walls and a floor.',
              resource:    'Your vocabulary notebook — mark the 500th word with the date; this is a real milestone',
            },
          ],
          milestone: 'Dual and sound/broken plural patterns learned; vocabulary notebook at 500 words with the 500th entry marked and dated',
        },
        {
          week: 15, theme: 'Putting It Together',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Read 3 full short articles with dictionary support',
              type:        'learn',
              description: 'Read three BBC Arabic or Al Jazeera short articles this week — one per session, with full dictionary support. For each article: read, mark unknowns, look them up, add the new words to your vocabulary notebook, reread once. Track how many new words per article — this number should decrease across the three articles as your foundation becomes strong enough to handle real written Arabic. Keep the articles. Reread them in week 16 without any dictionary.',
              resource:    'BBC Arabic / Al Jazeera Arabic; dictionary: Hans Wehr Arabic-English Dictionary (highly recommended, available online)',
            },
            {
              title:       'Begin the final personal document — first draft',
              type:        'project',
              description: 'Write the first draft of your final document: a one-page personal statement in Arabic. Include: your name, where you are from, what you study and why, one thing you have learned this month that changed how you see something, and one thing you intend to do next. This is not a translation exercise — write in Arabic from the beginning, using vocabulary you know, rephrasing what you cannot express rather than translating literally. Imperfect is correct.',
              resource:    'Your Arabic notebook — first draft, handwritten; do not use any translation tools',
            },
          ],
          milestone: '3 real Arabic articles read with dictionary support; first draft of personal document written in Arabic, minimum 10 sentences',
        },
        {
          week: 16, theme: 'The Script Is Yours',
          dailyCommitment: '1.5 hours/day',
          tasks: [
            {
              title:       'Reread the 3 articles from week 15 — no dictionary',
              type:        'learn',
              description: 'Return to the three articles you read in week 15. Read each one from start to finish without any dictionary or reference. Mark any word you still do not recognize — but do not look it up until you have finished. After all three, count how many words you could not read. Then look up those words one final time and add them to your vocabulary notebook with the note "final week." The comparison between your first and second pass through these articles is your progress measurement.',
              resource:    'The saved articles from week 15; your vocabulary notebook for final additions',
            },
            {
              title:       'Write the final draft of your personal paragraph — then reread your week 12 entry',
              type:        'project',
              description: 'Write the final, clean version of your personal statement from week 15. Handwrite it carefully. Then return to the paragraph you wrote in week 12. Place them side by side. The difference in fluency, vocabulary, and structure between those two pieces of writing is what you built over four months. Keep both. The program is complete — but the script is now yours, not a code to be decoded.',
              resource:    'Your Arabic notebook — final document, handwritten and dated; compare side by side with week 12 entry',
            },
          ],
          milestone: 'Week 15 articles reread without dictionary; final personal document completed in Arabic; week 12 entry compared and progress documented',
        },
      ],
    },

  ],

  overallMilestone: 'All 28 Arabic letters mastered — isolated, connected, and with short vowels — 500-word active vocabulary built with personal notebook — past and present tense verb conjugation across 20+ verbs — four graded and real Arabic texts read — daily listening practice sustained — and a handwritten personal statement produced in Arabic from scratch, without translation tools',
  nextPhaseHint:    'The second chronicle continues east — intermediate grammar, the broken plural mastered, Classical Arabic reading, and your first extended conversation in the language you have been building from the inside out',
}

// ─── Exported collection ──────────────────────────────────────────────────────
// One plan. That's it.
export const PRESET_PLANS = [PHASE_1]

// ─── Pacing map generator ─────────────────────────────────────────────────────
// Maps story week key → { taskCount, triggerAt } for spark timing.
const MAX_STORY_WEEKS = 16

export function generatePacingMap(plan) {
  const arcs = plan?.arcs || []
  const map  = {}
  let storyWeek = 1

  for (const arc of arcs) {
    for (const week of (arc.weeklyPlan || [])) {
      if (storyWeek > MAX_STORY_WEEKS) break
      const taskCount = week.tasks?.length || 1
      const numSparks = Math.min(taskCount, 5)
      const triggerAt = []

      if (numSparks <= 1 || taskCount <= 1) {
        triggerAt.push(0)
      } else if (numSparks >= taskCount) {
        for (let i = 0; i < taskCount; i++) triggerAt.push(i)
      } else {
        for (let i = 0; i < numSparks; i++) {
          triggerAt.push(Math.round(i * (taskCount - 1) / (numSparks - 1)))
        }
      }

      map[`w${storyWeek}`] = { taskCount, triggerAt }
      storyWeek++
    }
    if (storyWeek > MAX_STORY_WEEKS) break
  }

  return map
}

// ─── Load preset into storage ─────────────────────────────────────────────────
export function loadPreset(phaseNumber = 1) {
  const phase = PRESET_PLANS[phaseNumber - 1]
  if (!phase) return

  storage.clearAll()
  storage.saveOnboardingData(PRESET_ONBOARDING)

  const s = storage.getSettings()
  storage.saveSettings({
    ...s,
    character:  PRESET_ONBOARDING.character,
    playerName: PRESET_ONBOARDING.playerName,
  })

  storage.savePlan(phase)

  const pacingMap = generatePacingMap(phase)
  storage.setPacingMap(pacingMap)
}

// ─── Change to preset (non-destructive plan swap) ─────────────────────────────
export function changePlanToPreset(phaseNumber = 1) {
  const phase = PRESET_PLANS[phaseNumber - 1]
  if (!phase) return

  storage.replacePlan(phase)
  storage.saveOnboardingData(PRESET_ONBOARDING)

  const s = storage.getSettings()
  storage.saveSettings({
    ...s,
    character:  s.character  || PRESET_ONBOARDING.character,
    playerName: s.playerName || PRESET_ONBOARDING.playerName,
  })
}
