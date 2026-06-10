// src/data/sparks.js
// Task-level story beats for Act 1 — Phase 1
// Fires during a week's task cycle, between the weekly chapter segments.
//
// TARGET: 30+ sparks per week × 13 weeks per phase = ~390+ sparks per phase
// (~65 hours of spark content per phase at ~10 min/spark, for 1hr/day goal)
//
// CURRENT STATUS:
//   Weeks 1–4:  15 sparks each (expanded from 5) — 60 sparks
//   Weeks 5–8:  15 sparks each (expanded from 5) — 60 sparks
//   Weeks 9–16:  5 sparks each (original content) — 40 sparks
//   TOTAL:      160 sparks (target: 390+; expansion ongoing)
//
// Each spark: ~400–700 words + mini-cliffhanger ending.
// Every stopping point is dramatic — user must want to return.

import { n, d, dn, ch, op, BG } from './story.js'

// ACT1_SPARKS[weekNumber][sparkIndex]
// weekNumber: 1–16  (matches completedWeeks count at time of fire)
// sparkIndex: 0–N   (pacing map decides which tasks trigger which spark)
//
// These beats fire between task completions as reward moments.
// They do not gate on segment IDs — they are unlocked by the pacing map system.
// (See: Priority 2 — pacingMap in planProgress)

export const ACT1_SPARKS = {

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 — The Escape
  // Setting: on the road east, the day after the Archive burns.
  // Characters: Player, Maren, Ryn. Dorath joins at week's end.
  // ═══════════════════════════════════════════════════════════════════════════
  w1: [

    // Spark 1: Ryn's thing
    [
      n("The road east is long enough that silence becomes its own kind of speech. You have been walking for two hours and the city behind you has faded into smoke and distance. Ryn walks with the patient efficiency of someone who has done this before — not hurrying, not dragging. You realize you know almost nothing about her beyond what the last twelve hours have shown you."),
      d("KAEL", "right", "neutral", "What did you bring? From the Archive. You must have had a moment to choose."),
      d("RYN",  "right", "quiet",   "I wasn't in my room when the bell rang. I was already in the passage. I had one pack. Maren had given me a list of what to put in it two weeks before."),
      d("KAEL", "right", "neutral", "So nothing of your own."),
      d("RYN",  "right", "quiet",   "My notes. I put them in the pack when Maren gave me the list. She didn't tell me to — I just did."),
      d("KAEL", "right", "neutral", "What notes?"),
      n("She looks ahead at the road for a moment. The kind of pause that isn't evasion — more like someone deciding how much precision is appropriate."),
      d("RYN",  "right", "quiet",   "The fragments I was copying. Not the originals — copies, in my own hand, from the public collection. Not the Vraen material. The older administrative records. The ones that document what the Archive was doing in the years before the Unnamed Third was destroyed."),
      d("KAEL", "right", "neutral", "Why those?"),
      d("RYN",  "right", "quiet",   "Because Maren didn't tell me to copy them. And Serath had been asking about them three weeks ago and then stopped asking about them."),
      n("She does not elaborate. You walk. The road turns slightly north and the angle of the light changes. Behind you: nothing. Ahead: three days of road, and a question about why someone copying administrative records would bother hiding that fact from you."),
    ],

    // Spark 2: Maren's accounting
    [
      n("At midday they find shade at a stone wall — the remnant of a field division long since abandoned — and Maren opens the document case for the first time since the Archive. Not the fragments. Just the case, confirming the seal, pressing the clasp three times in sequence. You count the presses without meaning to."),
      d("MAREN", "left", "neutral", "You're counting."),
      d("KAEL",  "right", "neutral", "Three. Same thing each time. Is it a code?"),
      d("MAREN", "left", "neutral", "A check. Three presses covers all the ways the seal can fail — the main catch, the secondary latch, and the pressure seal underneath. If any of the three feels different from how I last left it, the case has been opened."),
      d("KAEL",  "right", "neutral", "Has it been?"),
      d("MAREN", "left", "neutral", "Not until now. The seal I put on two weeks ago was intact this morning. Whatever was added to the case was added through the top opening, not by breaking the seal. Which means whoever added it knew the case well enough to do it correctly."),
      n("She closes the case. The movement is final."),
      d("KAEL",  "right", "neutral", "You keep saying 'whatever was added.' You know it's a fragment. You said so last night."),
      d("MAREN", "left", "neutral", "I know it is a fragment. What I don't know is whether it is what it appears to be."),
      d("KAEL",  "right", "neutral", "You think it might be a forgery."),
      d("MAREN", "left", "neutral", "I think I have not read it carefully yet, and I won't read something carefully for the first time while walking a road I don't fully know with people behind me who are not close enough to be a problem but not far enough to be irrelevant. When we have a room with four walls and a closed door, I will read it carefully."),
      n("She shoulders the case and resumes walking. Four walls and a closed door, at a distance you don't yet know."),
    ],

    // Spark 3: The first sign
    [
      n("They stop for water at a stream that crosses the road in a culvert, and you watch Maren drink in the precise way she does everything — efficiently, without excess — and you think about how long she was watching what you didn't know to watch."),
      d("KAEL",  "right", "neutral", "When you say you noticed signs eight months ago — what was the first one?"),
      n("She wipes her hands on her coat and looks at the horizon."),
      d("MAREN", "left", "neutral", "A book."),
      d("KAEL",  "right", "neutral", "A book."),
      d("MAREN", "left", "neutral", "A copy of the Vraen administrative index — not the fragments themselves, but the catalog of who had access to them, who had studied them, who had passed through the Archive in the thirty years before my arrival. It went missing from the reference shelf for three days and then came back. The dust disturbance was wrong for someone who had simply borrowed and returned it. It had been copied."),
      d("KAEL",  "right", "neutral", "Someone wanted to know who was close to understanding the fragments."),
      d("MAREN", "left", "neutral", "The index would give you that. Annotated borrowing records, frequency of access. I understood in that moment that someone had been building a picture. Of me. Of the people around me."),
      d("KAEL",  "right", "neutral", "What did you do?"),
      d("MAREN", "left", "neutral", "I started building a picture back."),
      n("She picks up her pack and walks. Three years ago, she says, she found the first external sign: a letter from an institution she recognized by its notation, asking questions about Vraen scholarship in terms that were precise enough to be dangerous. That was when she began planning for where you are now."),
      d("MAREN", "left", "neutral", "Paranoia is a poor tool. Preparation is better. I have spent three years preparing."),
      d("KAEL",  "right", "neutral", "And Ryn?"),
      d("MAREN", "left", "neutral", "Ryn came to me two months after I began preparing. She had noticed the book too."),
    ],

    // Spark 4: What the method feels like
    [
      n("The afternoon road is quiet. Ryn has moved to the back of the group, watching the approaches behind. You fall into step beside Maren. She is working through something in her head — you can tell by the pace variation, the way she walks slightly faster when a thought solidifies and slightly slower when it doesn't."),
      d("KAEL",  "right", "neutral", "Tell me about the method. Not the fragments — the actual practice. What does it feel like, from the outside?"),
      d("MAREN", "left", "thoughtful", "From the outside, you cannot see it. That is the first thing to understand. A person practicing the Vraen method does not look different. They do not act differently, necessarily. The difference is entirely internal."),
      d("KAEL",  "right", "neutral", "Then how do you know anyone has done it?"),
      d("MAREN", "left", "neutral", "Because of what they can do afterward. Not extraordinary things. Practical ones. A person who has been through the full practice can recall any material they have worked with precisely — not approximately, not impressionistically — exactly as it was given. Over years. Over decades. Without the distortion that accumulates in ordinary memory."),
      d("KAEL",  "right", "neutral", "That sounds like a description, not an answer. What does it feel like while you're doing it?"),
      n("A pause. The road makes a small bend around a collapsed wall, then straightens again. Maren's pace steadies into the thinking-fast rhythm."),
      d("MAREN", "left", "thoughtful", "The fragments describe the early stages as uncomfortable. Like pressing on something and finding it does not press back the way you expected. The later stages — the ones very few people have reached — they describe differently. They say it feels like something becoming structural. Not an effort anymore. A property."),
      d("KAEL",  "right", "neutral", "Like the knowledge becomes part of you."),
      d("MAREN", "left", "neutral", "More specific than that. Like you stop carrying it and it stops needing to be carried. It is there the way your hands are there — not retrieved, not remembered. Present."),
      n("You walk that through for a while. Ahead the road runs into a low stand of bare trees that reduces the view to ten yards. Maren's hand moves fractionally — awareness, not a signal. Then you come through the trees and the road opens up again, empty, the distant hills unchanged. She exhales. So do you."),
    ],

    // Spark 5: The missing marker
    [
      n("The last hour before camp. Ryn has been slightly off her usual rhythm — not visibly, but you have spent forty-eight hours learning her rhythms and you know when they change. She is watching the right side of the road more than the left."),
      d("KAEL", "right", "neutral", "What are you watching for?"),
      d("RYN",  "right", "quiet",   "The stone markers. This road was surveyed forty years ago. Markers appear every quarter mile. I've been counting them."),
      d("KAEL", "right", "neutral", "And?"),
      d("RYN",  "right", "quiet",   "We've passed nine. The tenth should have appeared forty minutes ago. It hasn't."),
      n("You look. The right side of the road: grass, old field, a hedgerow in the distance. No marker."),
      d("KAEL", "right", "neutral", "Someone took it?"),
      d("RYN",  "right", "quiet",   "Or moved it. Or removed it to remove the reference point. Or this section of the road has a gap in the survey for reasons that have nothing to do with us."),
      d("KAEL", "right", "neutral", "Which do you think it is?"),
      d("RYN",  "right", "quiet",   "I don't know enough yet. I want to see if the eleventh appears at the distance it should. If it does, there's just a gap. If it doesn't—"),
      n("She doesn't finish the sentence. You walk. The eleventh marker appears exactly where it should. Ryn says nothing. She counts to herself for a moment, then resumes her usual scan."),
      d("RYN",  "right", "quiet",   "The tenth marker gap is about two hundred yards wide. That's exactly the amount of road that can't be seen from either the ninth or eleventh positions."),
      d("KAEL", "right", "neutral", "You think someone removed it deliberately."),
      d("RYN",  "right", "quiet",   "I think we should tell Maren."),
      n("She walks ahead to speak to Maren in a low voice you can't hear. Maren listens without turning her head. When Ryn comes back, she resumes her position at the rear without speaking. Whatever Maren said in response, you do not learn it tonight."),
    ],

    // Spark 6: The smell of smoke
    [
      n("The smell of the Archive's fire reaches you at the third hour of walking. Not the choking thickness of the fire itself but the long memory of it — timber smoke, stone-dry dust, and beneath that something you cannot name, the smell of a building that had not burned in its nine hundred years of existence finally coming apart."),
      d("RYN",  "right", "quiet",   "Do you smell it?"),
      d("KAEL", "right", "neutral", "Yes."),
      n("She does not say more. You walk with it for a while — the smell following you east the way sound does not, persisting, a presence carried on the cold air from the city. Ryn's hand moves slightly and you realize she is counting steps. She does this sometimes. You do not ask about it."),
      d("KAEL", "right", "neutral", "How much of it is still burning, do you think?"),
      d("RYN",  "right", "quiet",   "A fire that starts in the records room travels to the adjacent shelves in about four hours. From there the connecting passages. Three wings connected by covered passages — if the fire was set before the bell, the passages were burning when we left."),
      d("KAEL", "right", "neutral", "You were calculating it in the passage."),
      d("RYN",  "right", "quiet",   "I wanted to know if we were the last ones out, or if there was time after us."),
      n("The road rises slightly, and from the elevated ground you see a faint smoke column above the city — not large now. A fire reaching stone walls, spending itself. The building already consumed, the heat feeding on itself."),
      d("KAEL", "right", "neutral", "Was there time after us?"),
      d("RYN",  "right", "quiet",   "I don't know who was left. Maren knew. I just knew the timing."),
      n("She goes back to counting steps. The smoke column does not grow. Ahead: the road. The smell does not leave you until after nightfall."),
    ],

    // Spark 7: What the records said
    [
      n("At the afternoon rest — brief, ten minutes, Maren's rule — you ask Ryn about the administrative records she carries in her own hand. She has not offered to share them, but she has been thinking about them; you can tell by the quality of her stillness when she is not moving."),
      d("KAEL", "right", "neutral", "The records you copied. What specifically did they show?"),
      d("RYN",  "right", "quiet",   "Access patterns. Three decades of who entered which collection, when, how often. The public collections are logged. The private collections less so — but the patterns of access to the private collections are visible in the public logs, because someone going from one to the other leaves a transition point."),
      d("KAEL", "right", "neutral", "And what did the patterns show?"),
      d("RYN",  "right", "quiet",   "Three researchers who accessed the Vraen materials for nine months and then stopped. Not reduced — stopped completely. Three weeks after each of them stopped, a new name appeared in adjacent collections. Replacements."),
      d("KAEL", "right", "neutral", "Someone cycling through researchers."),
      d("RYN",  "right", "quiet",   "Testing them, perhaps. Building a map of who was getting close to what. The replacements never stayed more than four months."),
      d("KAEL", "right", "neutral", "And then?"),
      d("RYN",  "right", "quiet",   "The last entry is from eight months before the fire. After that the access logs show nothing. No new names. No transition points. As if the research simply stopped."),
      n("You think about what a complete stop means. Someone who got what they needed and stopped looking. Or someone who knew enough to look somewhere the logs couldn't see."),
      d("KAEL", "right", "neutral", "Did you tell Maren this?"),
      d("RYN",  "right", "quiet",   "She already knew it. She's the one who started tracking the transition points. She just didn't know I had noticed her doing it."),
    ],

    // Spark 8: Night watch
    [
      n("Your first watch. Two hours in the middle of the second night, sitting against a stone wall at a field's edge, learning what the dark sounds like when nothing is wrong. Maren gave one instruction: if anything changes, note it. Not sounds of movement — the pattern of the night."),
      n("The pattern: wind from the northwest, moderate. Tree line south of the road. Field, hedge, distant farm to the north. One owl hunting, consistently. Faint rodent movement in the hedge. A low water sound from the east, constant."),
      n("You sit with this for thirty minutes. Then you notice: the water sound doesn't vary with the wind. A real creek at this distance would shift with gusts. This one doesn't. You hold the observation — not creek, then. Water moving through a stone channel. And beneath it, in the intervals when the wind drops, something else. Regular. Spaced. Four beats, silence, four beats again."),
      n("You do not investigate. Maren said: note it. At the end of your watch you wake Ryn and describe both the channel sound and the four-beat pattern. She listens without moving."),
      d("RYN",  "right", "quiet",   "Four beats, not three?"),
      d("KAEL", "right", "neutral", "Four. Then silence. Then four again."),
      d("RYN",  "right", "quiet",   "I'll listen for it."),
      n("She takes position without further comment. You sleep in the cold and dream, for the first time since the Archive fire, not of smoke — but of a room you have never been in, with walls you have not read, in a building you do not yet know exists."),
    ],

    // Spark 9: Maren on Serath
    [
      n("Maren uses the late afternoon light to write. Not the fragments — she writes from memory into a small book, the same method she has used for as long as you have known her. She never re-reads what she writes. The writing is not for retrieval. It is for precision: the act of setting the thing down exactly makes her hold it exactly."),
      d("KAEL",  "right", "neutral", "Where is Serath?"),
      n("She finishes the line, caps the pen."),
      d("MAREN", "left",  "neutral", "He had a separate exit. Two weeks ago I told him which route we would take if things moved quickly. He will use his own route east and meet us at the contact point in six days."),
      d("KAEL",  "right", "neutral", "You trust him."),
      d("MAREN", "left",  "neutral", "I trust his competence absolutely. His commitment to the work — equally. His responses under genuine pressure I have not seen tested until now."),
      d("KAEL",  "right", "neutral", "What pressure will he face?"),
      d("MAREN", "left",  "neutral", "If Voss has the network's composition, Serath is named in it. His connection to the Archive is public record. He is the most identifiable of us."),
      d("KAEL",  "right", "neutral", "Then why does he travel alone?"),
      d("MAREN", "left",  "neutral", "Because together we are four, which is a group. He is faster alone. His route is one I would not take — not because it is more dangerous, but because it requires being publicly visible in a way I cannot manage. He knows how to be seen without being noticed. I do not."),
      n("She opens the book and writes one more line. You think about the difference between visible and noticed. It is the kind of distinction that, once you have it, you cannot stop applying."),
    ],

    // Spark 10: What Kael carried out
    [
      n("You have been carrying the same pack since the Archive and have not opened it once. This evening, at a hollow in the tree line they will use only tonight, you finally do."),
      n("Inside: the practical things. Water container, food, traveling kit. Under those: two books. You did not consciously choose them. You grabbed them in the four minutes between the bell and the passage door."),
      d("KAEL", "right", "neutral", "Maren — do you know which books these are?"),
      n("She looks."),
      d("MAREN", "left", "neutral", "The first is the Vraen secondary commentary. Not one of the originals — the clearest explication of the early method in the standard collection."),
      d("KAEL",  "right", "neutral", "And the second?"),
      d("MAREN", "left", "neutral", "The Archive's botanical record for the eastern territories. Every significant plant of the road we are taking, annotated with access points for the settlements along it."),
      d("KAEL",  "right", "neutral", "I didn't choose them deliberately."),
      d("MAREN", "left", "neutral", "I know. That is what I find interesting."),
      n("You sit with that. Not the books — the fact of them. Two right choices made without deciding. You remember the four minutes: smoke at the door, the passage opening, a shelf at eye level. Your hands moved before you understood what they were reaching for. Maren says nothing further. But she is very slightly not-quite-still in the way that means she is holding something and will continue holding it for a while."),
    ],

    // Spark 11: What approximate means
    [
      n("The tree line thins and for a mile the road is open to the sky. In the exposed stretches, conversation stops by unspoken agreement — not about sound, but about the quality of attention, which changes when you can see far. When they come back under cover, Ryn speaks first."),
      d("RYN",   "right", "quiet",   "Maren. The first instruction — do you know what you know. I have been trying to apply it to the records I carry. Some of them I have exactly. Some approximately. The ones I copied recently are exact. The ones I learned a year before copying — approximate."),
      d("MAREN", "left",  "neutral", "Yes. That is the initial situation for everyone."),
      d("RYN",   "right", "quiet",   "Is the approximate version useful at all?"),
      d("MAREN", "left",  "neutral", "It is useful the way a sketch is useful — for orientation, for direction, for a quick answer. It fails when you need precision. You will rely on the approximate until you hit a situation requiring exact, and then you will feel the gap."),
      d("RYN",   "right", "quiet",   "What does the gap feel like?"),
      d("MAREN", "left",  "neutral", "Reaching for something in the dark and finding your hand two inches from where the thing actually is."),
      n("Ryn considers this. Then:"),
      d("RYN",   "right", "quiet",   "I have felt that. The access pattern for the eastern collections — I know the shape of it. But when I try to produce the specific dates, the specific transition points, I find them as ranges rather than points. Three days' uncertainty in either direction."),
      d("MAREN", "left",  "neutral", "That is approximate working. The exact version gives you the date without uncertainty."),
      d("RYN",   "right", "quiet",   "Can I get the exact version from what I currently have?"),
      d("MAREN", "left",  "neutral", "Go back to your actual copied notes. They will be exact — you copied them precisely. Compare them to what you remember of the pattern. The difference between the two is your current approximation error. Hold that gap. Do not paper over it. The holding is the first practice."),
      n("Ryn produces her notes. The road continues east. Maren walks slightly ahead. You watch Ryn work — not agitated, just focused. The look she has when something matters precisely."),
    ],

    // Spark 12: The fourteenth fragment
    [
      n("Evening. The question has been in your mind since the Archive. You choose this moment because Ryn is on watch, Maren is at rest — still but not sleeping, which is as close to available as she gets."),
      d("KAEL",  "right", "neutral", "The fourteenth fragment. You said it wasn't there when you packed the case. Who placed it?"),
      d("MAREN", "left",  "neutral", "I don't know."),
      d("KAEL",  "right", "neutral", "You have three theories, or you would not be this calm about not knowing."),
      n("A pause. She adjusts position."),
      d("MAREN", "left",  "neutral", "The three most likely candidates are Serath, who has had access to my case and knows how to open the top correctly. Someone in Dorath's network who knew what the case contained. And someone entirely outside our groups who placed it as a message."),
      d("KAEL",  "right", "neutral", "What would a message fragment say?"),
      d("MAREN", "left",  "neutral", "I believe I know. The fragment is written in the deep records' notation — which narrows the list of who could have written it to twenty-three people trained in that system over the past thirty years. Twelve are dead. Four are working against the Archive's purposes. Six I know personally."),
      d("KAEL",  "right", "neutral", "And the twenty-third."),
      d("MAREN", "left",  "neutral", "Documented as completing early training in the notation system and then disappearing from the Archive's records without explanation. Twenty-two years ago. The same year I arrived."),
      n("She does not say more. You sit with the math of twenty-two years — what a person can build in that time if they are preparing precisely and without urgency. The fragments in the case. The case sealed and re-sealed. A message placed by a hand you have not yet found."),
    ],

    // Spark 13: How Maren tested herself
    [
      n("A question you have been circling for three days, not sure it is appropriate. You decide appropriate is the wrong standard."),
      d("KAEL",  "right", "neutral", "Nineteen years of practice. How did you test whether it was working — at the beginning, before the fragments?"),
      d("MAREN", "left",  "neutral", "I found things I had learned years before and tested whether I still had them exactly."),
      d("KAEL",  "right", "neutral", "What things?"),
      d("MAREN", "left",  "neutral", "A book I read at fifteen, before the Archive. A collection of agricultural records from a territory I visited briefly. Notations from a language I studied for one year as a student and then didn't use again."),
      d("KAEL",  "right", "neutral", "And did you have them?"),
      d("MAREN", "left",  "neutral", "The agricultural records — precisely. The book — mostly, with three passages I had clearly compressed and needed to recover. The language notations — exactly, which surprised me. I had not thought of them in eight years."),
      d("KAEL",  "right", "neutral", "Why did the language survive exactly when the book didn't?"),
      d("MAREN", "left",  "neutral", "When I learned the language, imprecision had immediate consequences — I could not communicate. The book I read for pleasure, which means I held it loosely. The practice preserved what I had been forced to hold precisely and let the loose material degrade."),
      n("You turn this over for a long time. The things learned with consequences versus the things learned without. What survives exactly because imprecision was never an option."),
      d("KAEL",  "right", "neutral", "What does that tell you about how to use the method?"),
      d("MAREN", "left",  "neutral", "That consequence is a teaching tool we have been dramatically underusing."),
    ],

    // Spark 14: Ryn's path to the Archive
    [
      n("The second afternoon. Ryn has been walking steadily and you find yourself matching her pace without noticing — which means she has slightly adjusted hers to be matchable. She wants to talk."),
      d("KAEL", "right", "neutral", "How did you end up at the Archive?"),
      d("RYN",  "right", "quiet",   "Testing. The Archive sends problem sets to institutional libraries once a year — notation puzzles, observation exercises. Most institutions treat them as curiosities. The library I worked at had a librarian who took them seriously. She gave them to her best staff."),
      d("KAEL", "right", "neutral", "You solved them."),
      d("RYN",  "right", "quiet",   "Most of them. The last one I couldn't — it asked for the precise date of a transition in a record I had seen once, three years earlier, during cataloguing work. I knew the approximate date but not the exact one. I wrote that I knew I had it approximately, and explained where the error came from. Two months later a letter arrived."),
      d("KAEL", "right", "neutral", "They hired you because you admitted the gap."),
      d("RYN",  "right", "quiet",   "Maren told me later — they look specifically for people who distinguish between approximate and exact. Most people do not make that distinction. They present whatever they have as what they know."),
      d("KAEL", "right", "neutral", "And you made it naturally."),
      d("RYN",  "right", "quiet",   "I made it because my work had consequences for error. A misfiled record stays misfiled. A date wrong by a year produces eighteen months of misattribution. I learned the gap was real because I had experienced the cost of it."),
      n("She says this without emphasis. The consequence is real, therefore you respect the precision. The day's light goes amber. Somewhere behind you, the Archive is still cooling. Somewhere ahead, the road continues east."),
    ],

    // Spark 15: Following sign — CLIFFHANGER
    [
      n("Third day, near dusk: Ryn stops."),
      n("She says nothing. Steps off the road slightly, crouches, holds her hand an inch above the verge without touching it."),
      d("KAEL",  "right", "neutral", "What is it?"),
      d("RYN",   "right", "quiet",   "Someone used this road today. Within the last three hours."),
      d("MAREN", "left",  "neutral", "Ahead of us or behind?"),
      d("RYN",   "right", "quiet",   "Ahead. The displacement pattern goes east."),
      n("You look at the verge. You cannot see what she is seeing — the difference between used road and unused road is not yet legible to you. But Ryn is completely still in the way she goes still when she is certain about something."),
      d("KAEL",  "right", "neutral", "How many?"),
      d("RYN",   "right", "quiet",   "At least one. Possibly two, traveling close together. Walking pace — not hurrying."),
      d("MAREN", "left",  "neutral", "Deliberate. Someone who knows the road, or someone who doesn't care about being visible."),
      n("Maren and Dorath exchange a look — or what passes for one between people who communicate mostly in other ways. Dorath takes point without being asked, slightly faster."),
      d("MAREN", "left",  "neutral", "We close the gap. Slowly."),
      n("The road ahead curves into a stand of trees where nothing can be seen. You follow them into it, the late light cutting sideways through the gaps. Whoever is ahead does not know they're being followed. Or knows, and is not concerned. The difference between those two things is, at this moment, impossible to determine."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 — The Gate and the Road
  // Setting: storage district → city gate → open road east
  // Characters: Player, Maren, Ryn
  // ═══════════════════════════════════════════════════════════════════════════
  w2: [

    // Spark 1: Moving through the storage district
    [
      n("The storage district at pre-dawn has its own logic. Workers moving goods, carters setting out, the smell of grain and rope and animal. Nobody watches you. Nobody looks. You have been in this district for twenty minutes and you are beginning to understand what Maren meant when she chose this route rather than the main thoroughfare — in a place built around the movement of anonymous people, three anonymous people moving anonymously are the least interesting thing in it."),
      d("KAEL",  "right", "neutral", "This was planned. You knew we'd come through here."),
      d("MAREN", "left",  "neutral", "I knew the most likely exit routes from the city. The storage district offers movement cover that the residential streets don't. And the workers here begin early enough that we fit into the morning pattern rather than standing out against an empty street."),
      d("KAEL",  "right", "neutral", "You have thought about being followed before."),
      d("MAREN", "left",  "neutral", "I have thought about everything before. It is how preparation works — you enumerate the scenarios and then you decide which ones warrant preparation and which ones do not."),
      d("KAEL",  "right", "neutral", "What scenarios did you decide not to prepare for?"),
      n("She considers the question. Not dismissing it — genuinely thinking."),
      d("MAREN", "left",  "neutral", "Serath being gone before the fire. I had planned for the fire and for him being inside it. I had not fully planned for him being neither present nor accounted for. His note was — not a scenario I had anticipated."),
      d("KAEL",  "right", "neutral", "Does that worry you?"),
      d("MAREN", "left",  "neutral", "Yes. And it shouldn't, and that is the part that worries me more. I have nineteen years of experience reading people in the Archive. My read on Serath should be reliable. The fact that I cannot make this add up suggests I am missing a significant piece."),
      n("A cart passes between you, breaking the exchange. When it clears, Maren has resumed walking and her face has returned to neutral. You note the admission and file it."),
    ],

    // Spark 2: What the second guard meant
    [
      n("After the gate — after whatever way you handled it — the road empties out quickly. The city's edge becomes a fringe of workshops and livestock pens and then open ground, and suddenly there is only road and flat fields and the cold morning. Ryn watches behind until the gate is out of sight. Then she exhales once."),
      d("RYN",   "right", "quiet",   "The second guard."),
      d("MAREN", "left",  "neutral", "I saw him."),
      d("RYN",   "right", "quiet",   "He's not militia. The coat was wrong — militia standard issue has a different cut at the shoulder. And he wasn't filling in the log. Regular guards log everything. That's the job."),
      d("KAEL",  "right", "neutral", "How do you know what militia standard issue looks like?"),
      d("RYN",   "right", "quiet",   "I studied the city's administrative records when I arrived. Uniform specifications are in the district watch manifests. They updated them fourteen months ago. His coat was the older cut."),
      n("Maren gives her a look that isn't quite approval — more like a notation being confirmed against reality."),
      d("MAREN", "left",  "neutral", "He was there to identify faces. Not to hold anyone. If they wanted to stop us they would have closed the gate, not placed a single observer at it."),
      d("KAEL",  "right", "neutral", "He got a look at all three of us."),
      d("MAREN", "left",  "neutral", "Yes. Which means the question is no longer whether we've been identified. It is how much time identification takes and what it takes to act on it. In my estimation: two days minimum. More likely four."),
      d("KAEL",  "right", "neutral", "Four days' lead."),
      d("MAREN", "left",  "neutral", "Three, if we're cautious. Two, if we're slow. The pace we're setting now gives us two. I would prefer three."),
      n("The group's pace increases fractionally. You do not need to be told why."),
    ],

    // Spark 3: The tail that stops
    [
      n("An hour outside the gate, Ryn slows once — just enough to let Maren pull ahead by half a step, then resumes. You've been with her long enough to know this is a signal, not a hesitation."),
      d("RYN",   "right", "quiet",   "We're still being followed."),
      d("MAREN", "left",  "neutral", "I know."),
      d("KAEL",  "right", "neutral", "The same person as before?"),
      d("MAREN", "left",  "neutral", "Likely. They are maintaining the same distance they held from the gate. Not closing. Not dropping back. This is surveillance, not pursuit."),
      d("KAEL",  "right", "neutral", "What's the difference?"),
      d("MAREN", "left",  "neutral", "Pursuit closes the gap. This person wants to know where we go, not to stop us going there. They may be reporting our direction. Or simply waiting to see if we stop somewhere that tells them more than the gate did."),
      d("KAEL",  "right", "neutral", "What do we do?"),
      d("MAREN", "left",  "neutral", "Nothing different. If we change our behavior because we've spotted the tail, we confirm we spotted it. If we maintain pace and continue east, we tell them nothing they won't learn from a map."),
      d("RYN",   "right", "quiet",   "They stopped."),
      n("You keep walking. Ahead: the road bends around a shallow rise. When you come around the bend, you glance back. The figure that had been maintaining distance is standing still in the middle of the road. Watching. As the bend takes you out of line of sight, you see them turn and begin walking back toward the city."),
      d("KAEL",  "right", "neutral", "They stopped following."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("KAEL",  "right", "neutral", "Why?"),
      n("She doesn't answer. But her pace doesn't slow."),
    ],

    // Spark 4: What east means
    [
      n("Midday. They stop at a milestone — one of the old ones, carved before the current road authority, with the distance recorded in a unit nobody uses anymore. Ryn sits against it and eats. Maren stands and eats. You sit on the ground and watch a line of birds doing something systematic across the old furrows in the south field."),
      d("KAEL",  "right", "neutral", "Where are we going, eventually? Past the immediate destination."),
      d("MAREN", "left",  "neutral", "East. The settlements are the immediate goal — a stopping place where we can work without being on the road. Beyond that depends on what we find in the fragments."),
      d("KAEL",  "right", "neutral", "And after the fragments?"),
      d("MAREN", "left",  "neutral", "The method. What the fragments describe. We came out of the Archive with most of what we needed to continue. The purpose was never to stay in the building. It was to learn what the building contained."),
      d("KAEL",  "right", "neutral", "What does it mean to complete the method? What happens to a person?"),
      d("MAREN", "left",  "thoughtful", "They carry something that cannot be taken. Not metaphorically. Specifically. The knowledge structured by the method becomes — permanent. Structural. A person who completes it fully is a complete Archive, walking. Fire doesn't reach it. Seizure doesn't take it."),
      d("KAEL",  "right", "neutral", "And that's what Voss wants to control."),
      d("MAREN", "left",  "neutral", "Or prevent. Or harness. The distinction matters but I cannot yet determine which."),
      n("Ryn finishes eating and stands. The milestone says you have come two-thirds of the way to the first settlement junction. Maren shoulders her pack."),
      d("MAREN", "left",  "neutral", "When we stop tonight, I want to begin. Not the fragments — the preliminary practice. What the method requires before you can reach the fragments."),
      d("KAEL",  "right", "neutral", "What does it require?"),
      d("MAREN", "left",  "neutral", "Honesty about what you actually know versus what you think you know. They are rarely the same thing."),
    ],

    // Spark 5: Approaching the tree line
    [
      n("The last hour of the second day. They have covered more ground than you expected — Maren's pace, which seemed sustainable, turned out to be aggressively sustainable, the kind that adds up over hours in ways that are not apparent until you try to find the first mile on the map and realize how far behind it is."),
      n("The road has been narrowing. On the left side, tree cover has been growing denser since the last milestone. The right side: still open fields, but the tree line on the left is now close enough that anything in it would have decent cover and a clear line of sight to the road."),
      d("RYN",   "right", "quiet",   "The tree line."),
      d("MAREN", "left",  "neutral", "I see it."),
      d("KAEL",  "right", "neutral", "What about it?"),
      d("RYN",   "right", "quiet",   "There has been movement in it for the past half mile. Keeping pace with us."),
      d("MAREN", "left",  "neutral", "How close?"),
      d("RYN",   "right", "quiet",   "Thirty yards. Maybe twenty-five."),
      d("MAREN", "left",  "neutral", "Not the same pattern as the city tail."),
      d("KAEL",  "right", "neutral", "Different person?"),
      d("MAREN", "left",  "neutral", "Possibly. Or the same person moving differently. Don't change pace. Don't look directly at the trees."),
      n("You walk. The tree cover is dense enough now that the late-afternoon light doesn't reach the interior. Whatever is in there is invisible against the shadow. But Ryn has not stopped watching, and the small tells in her posture — the very slight forward lean, the controlled breathing — tell you that whatever she is tracking has not stopped."),
      n("Ahead: a bend. On the left side, the trees thin slightly, and through the gap you can see that the track curves very close to the tree line — closer to ten yards. In ten minutes you will pass within ten yards of whatever has been pacing you for half a mile."),
      n("You walk toward it."),
    ],

    // Spark 6: Gate documentation
    [
      n("The city gate at pre-dawn. The guard has been on watch since the third hour and has the look of someone present but not engaged — bored, but not inattentive enough to bypass without effort. He looks at the document Maren presents."),
      n("It says, in civic authority notation: four scholars from the northern chapter, traveling east for a symposium on archival practice. The seal is correct. Maren produced the document from her coat with the ease of someone who has been carrying it for months — which she has."),
      d("GUARD",  "left",  "neutral", "Purpose of travel."),
      d("MAREN",  "left",  "neutral", "Symposium. Eastern city. Third year running."),
      d("GUARD",  "left",  "neutral", "Contents of the case."),
      n("A beat."),
      d("MAREN",  "left",  "neutral", "Research materials. Archival consultation documents. The case is sealed under institutional transit protocol."),
      n("He studies the case for exactly three seconds. Then Maren. Then the document again."),
      d("GUARD",  "left",  "neutral", "Did you hear the bell last night?"),
      d("MAREN",  "left",  "neutral", "Yes. We were in the lodging district. We saw the smoke."),
      d("GUARD",  "left",  "neutral", "The Archive."),
      d("MAREN",  "left",  "neutral", "So we were told this morning. A terrible loss."),
      n("He returns the document. The gate opens — not quickly, but without objection. You move through with the pace of four people who belong to the road. The gate closes behind you. The breath you did not know you were holding releases in the cold air."),
    ],

    // Spark 7: Documentation backstory
    [
      n("Two miles from the gate. The open road. Nobody behind you that Ryn can see."),
      d("KAEL",  "right", "neutral", "That document. You had it ready."),
      d("MAREN", "left",  "neutral", "I had it ready for seven months."),
      d("KAEL",  "right", "neutral", "You expected to need it."),
      d("MAREN", "left",  "neutral", "I expected to possibly need it. A prepared document that is never used costs almost nothing. An unprepared document when you need one costs everything."),
      d("KAEL",  "right", "neutral", "What else did you prepare that I don't know about?"),
      n("She walks for a moment. She is actually inventorying — not deflecting."),
      d("MAREN", "left",  "neutral", "Contact arrangements in four cities along the route. Three people who can be trusted for specific kinds of help and not others. Coin reserves in two locations — one we've already passed, one three days ahead. And one contact I have never needed and hope will remain so."),
      d("KAEL",  "right", "neutral", "What kind of contact is that?"),
      d("MAREN", "left",  "neutral", "The kind you call when every other option is exhausted. She is reliable, extremely capable, and reaching her requires admitting everything else has failed. I have maintained her in reserve for years. Prepared her thoroughly. Never needed her."),
      n("The road runs east into morning light. You think about the person Maren has been maintaining at the edge of the map — reliable, unreached, waiting in reserve, hoping to remain that way."),
    ],

    // Spark 8: Ryn reads the guard
    [
      n("An hour from the gate, Ryn drops back to walk beside you. She has said nothing since they came through. This is unusual — Ryn's silence is normally observational. This one is different."),
      d("KAEL", "right", "neutral", "You all right?"),
      d("RYN",  "right", "quiet",   "I was watching the guard's reaction pattern. When he asked about the bell — that question is not in the standard transit protocol. He asked it specifically."),
      d("KAEL", "right", "neutral", "You think he'd been briefed."),
      d("RYN",  "right", "quiet",   "Not on us specifically. On travelers leaving after the bell. He was looking for something. We didn't match what he was looking for."),
      d("KAEL", "right", "neutral", "What do you think he was looking for?"),
      d("RYN",  "right", "quiet",   "People who knew about the Archive before they were supposed to. People who left quickly after the bell. People whose documentation was too precise — or not precise enough."),
      n("You think about Maren's document. The seal, the notation, the third-year-running detail."),
      d("KAEL", "right", "neutral", "Maren's document was exactly right."),
      d("RYN",  "right", "quiet",   "Not suspiciously right — familiarly right. The guard looked at it and it felt like the twentieth one from the same source. Which means Maren has been submitting those documents consistently for years."),
      d("KAEL", "right", "neutral", "Repeat performance makes the story real."),
      d("RYN",  "right", "quiet",   "She told me once: a cover story becomes real through repetition. The document being real is better than the document being perfect."),
      n("She goes back to watching the road. Behind you, the city is below the horizon. The gate guard has already half-forgotten four unremarkable scholars heading east."),
    ],

    // Spark 9: Open road rules
    [
      n("The road has a different quality from the city road — more sky, more horizon, more of everything that was compressed by walls. Maren walks the same but the openness changes the arithmetic of distance."),
      d("MAREN", "left",  "neutral", "Walking rules for open road."),
      d("KAEL",  "right", "neutral", "Tell me."),
      d("MAREN", "left",  "neutral", "First: no more than three of us together at any time. If we stop, we stop at different positions. If someone approaches, we are four individuals traveling in the same direction — not a group."),
      d("KAEL",  "right", "neutral", "Second?"),
      d("MAREN", "left",  "neutral", "Watch behind more than ahead. What's ahead is mostly terrain. What's behind is whether we've been followed. Ryn does this naturally. You are now the second set of eyes for it."),
      d("KAEL",  "right", "neutral", "Third?"),
      d("MAREN", "left",  "neutral", "If someone catches us from behind, do not slow to let them pass. Maintain pace. Let them make the decision to overtake or not. Someone who hesitates to overtake has a reason for hesitating."),
      d("KAEL",  "right", "neutral", "And if they stop when we stop?"),
      d("MAREN", "left",  "neutral", "Then we learn what we need to learn about them before they learn what they need to learn about us."),
      n("You practice the backward watch — not turning your head fully, just giving the road behind you the corner of your attention. Nothing moves there. The gate is gone. The road ahead curves, and beyond the curve you cannot see. Limited information, not threatening information. You are learning the difference."),
    ],

    // Spark 10: What Kael knows about Voss precisely
    [
      n("In all the urgency of the last days you have been operating on a description without content: 'Voss.' A threat, an institution, a name that moves people to action. You apply the first instruction to your own knowledge of it."),
      n("What you know exactly: Voss was mentioned twice in the Archive's public administrative records. Both references were procedural — permissions given to 'the Voss Institute' to access non-sensitive materials in the Archive's eastern branch. The contact address was in the eastern city. Access classified as educational."),
      n("What you know approximately: Voss is dangerous. Voss caused the Archive's burning. Voss wants the fragments. You believe these with high confidence but cannot source any of them precisely."),
      n("What you suspect but don't know: the nature of what they want, the organization's size, whether the eastern address is current, who gave the order."),
      d("KAEL",  "right", "neutral", "Maren — the Voss Institute had public access permissions at the Archive. I saw them in the administrative records."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("KAEL",  "right", "neutral", "That's a very visible position for an organization doing what you describe."),
      d("MAREN", "left",  "neutral", "The most effective way to destroy an institution is to first become part of it. The permissions gave them legitimate reasons to be in proximity to what they were studying."),
      d("KAEL",  "right", "neutral", "They weren't hiding in plain sight. They were operating in plain sight."),
      d("MAREN", "left",  "neutral", "Hiding implies concealment. What they did was more sophisticated. They made themselves routine."),
    ],

    // Spark 11: What Ryn saw in the passage
    [
      n("Second evening on the road. The camp is quiet and you are close enough to Ryn that a low voice carries. She has been holding something since they left the safe house and has chosen now to put it down."),
      d("RYN",  "right", "quiet",   "In the Archive passage. When the bell rang and I was already in it — at the other end, before Maren came through, before you came through — there was something in the passage that I could not explain."),
      d("KAEL", "right", "neutral", "What kind of something?"),
      d("RYN",  "right", "quiet",   "A mark on the wall. Same notation as the symbol in Dorath's building — the deep records' notation. Not old, not from the original construction. Recent. The marking was on the section of wall closest to the exit end."),
      d("KAEL", "right", "neutral", "Someone put it there after the passage was built."),
      d("RYN",  "right", "quiet",   "In the last few years. The technique of the mark was dry — not damp stone, but stone that had been dry long enough for the marking to settle. I study surfaces. I know the difference."),
      d("KAEL", "right", "neutral", "Did you tell Maren?"),
      d("RYN",  "right", "quiet",   "I told her the moment she came through. She said: I know about it. I put it there."),
      n("A long pause."),
      d("KAEL", "right", "neutral", "She marked the passage herself."),
      d("RYN",  "right", "quiet",   "And she knows the deep records' notation. Which means the symbol in Dorath's building — she recognized it because it is her own system. Or a system she trained in. And someone else who knows the same system was in Dorath's building before us."),
    ],

    // Spark 12: Dorath's eastern contacts
    [
      n("Dorath covers ground quickly and speaks efficiently and does not fill silence with conversation. This makes the times she chooses to speak easy to notice."),
      d("DORATH", "left",  "neutral", "There are two people on the road ahead of us from Eran's eastern network. They maintain the waystation junction. If the drop reached them — if they know what happened to the Archive — they will be watching for us."),
      d("KAEL",   "right", "neutral", "If the drop didn't reach them?"),
      d("DORATH", "left",  "neutral", "They will be at the waystation regardless — it is their regular position. They just won't be expecting us specifically. We approach using the recognition signal before we use our names."),
      d("KAEL",   "right", "neutral", "What is the recognition signal?"),
      d("DORATH", "left",  "neutral", "A phrase from the botanical records. The eastern territories section."),
      n("She looks at you. You look at the pack on your back. The botanical record for the eastern territories — the one your hands grabbed from the Archive shelf without deciding to. The signal has been traveling with you since the Archive fire. You just did not know it was a signal."),
      d("KAEL",   "right", "neutral", "The book I'm carrying."),
      d("DORATH", "left",  "neutral", "Yes."),
      n("She says nothing further. The road runs east. The waystation is two days ahead. The signal you are carrying does not know it is a signal, but you do, and the difference between those two states is exactly what makes it useful."),
    ],

    // Spark 13: The marked tree
    [
      n("Ryn finds it on the third day: a birch at the road's edge, marked at shoulder height with a cut that has healed but not fully — a year old at most. The cut is specific: two parallel lines, close, with a third crossing at an angle."),
      d("RYN",    "right", "quiet",   "Archive notation. A waypoint — specifically, one with something to retrieve."),
      d("KAEL",   "right", "neutral", "Someone from the Archive marked this tree?"),
      d("RYN",    "right", "quiet",   "Someone who knows the notation did. The tree is still living — the cut hasn't dried. Recent."),
      d("DORATH", "left",  "neutral", "What does the waypoint symbol specify?"),
      d("RYN",    "right", "quiet",   "Something cached within twenty yards. The angle of the third line gives direction — roughly toward the field hedge on the north side."),
      n("You look at the hedge. Old growth, dense at the base, the kind that has been there long enough to become landscape rather than feature."),
      d("KAEL",   "right", "neutral", "Do we retrieve it?"),
      d("MAREN",  "left",  "neutral", "We note the location and continue. We do not stop here long enough to be seen taking something from the roadside."),
      d("KAEL",   "right", "neutral", "But we come back."),
      d("MAREN",  "left",  "neutral", "If circumstances permit. And if what it contains becomes relevant."),
      n("She records the location in her narrow-margin book using her own notation, not the Archive system. The hedge holds its secret with the patience of something that has been waiting at the side of a road for a very long time. It does not appear to be in any hurry."),
    ],

    // Spark 14: What the fourteenth fragment describes
    [
      n("A conversation deferred all afternoon finally arrives in the failing light because Ryn asks it directly."),
      d("RYN",   "right", "quiet",   "Maren. The fourteenth fragment. Is it from the same author as the others?"),
      d("MAREN", "left",  "neutral", "No. The notation is identical — same system — but the hand is different. A different writer trained in the same tradition. A second-generation student."),
      d("RYN",   "right", "quiet",   "What does it say?"),
      d("MAREN", "left",  "neutral", "It does not continue the instruction sequence. The first thirteen fragments are instructional — they build step by step. The fourteenth describes a specific situation."),
      d("RYN",   "right", "quiet",   "What situation?"),
      d("MAREN", "left",  "neutral", "Someone completing the method while under active threat of having the work taken. What the practice produces when the people who want to capture it are already close."),
      n("The light flattens. The road narrows ahead where a stand of trees crowds both sides. None of you say the obvious thing — that the situation the fourteenth fragment describes is the situation you are currently in. The fragment was written by someone who was there once. And it was placed in Maren's case by someone who understood it was relevant. Now."),
    ],

    // Spark 15: Someone moving fast toward the waystation — CLIFFHANGER
    [
      n("Second night of the open road. Dorath returns from watch two hours early, sits without speaking, picks up her cold cup, sets it down."),
      d("KAEL",   "right", "neutral", "Dorath."),
      d("DORATH", "left",  "neutral", "Someone passed through the junction ahead. About an hour ago. Moving east — fast."),
      d("KAEL",   "right", "neutral", "You saw them?"),
      d("DORATH", "left",  "neutral", "Heard them. And found the remains of a fire near the junction stone. Small — hand-warmth, not camp. Maybe two hours old."),
      d("KAEL",   "right", "neutral", "They stopped to think and then kept moving."),
      d("DORATH", "left",  "neutral", "Long enough to get warm. Short enough to not be sleeping. Whatever they decided at the junction, they decided to move faster afterward."),
      n("Maren is awake — she always seems to be awake when information arrives."),
      d("MAREN",  "left",  "neutral", "How much faster?"),
      d("DORATH", "left",  "neutral", "At that pace, the waystation in twelve hours. At our pace — twenty."),
      n("The fire beside you burns low. Someone is on this road ahead of you, moving toward the same waystation, having stopped to think and then chosen speed. They stopped at the junction you will reach tomorrow. They stood at the same stone. And whatever they decided there, they did not decide to slow down."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 3 — Dorath and the Safe House
  // Setting: the stone outbuilding, Dorath's safe house
  // Characters: Player, Maren, Ryn, Dorath
  // ═══════════════════════════════════════════════════════════════════════════
  w3: [

    // Spark 1: The first night
    [
      n("The safe house has three sleeping spaces — two low shelves against the far wall, one bedroll on the floor. Nobody discusses the arrangement. Ryn takes one shelf, Dorath takes the watch, you take the bedroll, and Maren sits at the table with the case and does not appear to be sleeping at all."),
      d("KAEL",  "right", "neutral", "Maren. You should sleep."),
      d("MAREN", "left",  "quiet",   "I know."),
      d("KAEL",  "right", "neutral", "Are you going to?"),
      d("MAREN", "left",  "neutral", "When I finish what I'm doing."),
      n("You watch her for a moment. She is not working with the case — not opening it, not checking the seal. She is sitting with her hands flat on the table, not quite still, the way someone sits when their mind is fully occupied and the body has been told to wait."),
      d("KAEL",  "right", "neutral", "What are you doing?"),
      d("MAREN", "left",  "neutral", "Making sure I have not missed anything."),
      d("KAEL",  "right", "neutral", "About the symbol?"),
      d("MAREN", "left",  "neutral", "About everything. The symbol is one piece. The fragments are another. The fourteenth piece I did not place — another. Serath's note. The fact that Dorath's contact used the deep records' notation in this building before any of the rest of this happened."),
      n("She moves one hand slightly — the motion of someone arranging something that isn't physical."),
      d("MAREN", "left",  "neutral", "They connect. I can see the outline of how they connect. But I am missing the center of it — the thing they are all pointing toward. And I don't want to sleep until I am sure I cannot find it tonight."),
      d("KAEL",  "right", "neutral", "What if the center is something you don't have access to yet?"),
      n("She looks at you. It is a rare look — the one where she is receiving rather than processing."),
      d("MAREN", "left",  "neutral", "Then I will sleep."),
      n("She doesn't sleep. But she stops moving her hands. Outside, Dorath's footsteps complete their circuit of the building, pause, and continue. The lamp burns steady. The question about the center remains open."),
    ],

    // Spark 2: Dorath's network
    [
      n("Morning. Dorath eats standing up, the way she does most things — efficiently, without ceremony. You ask a question that has been waiting since the road."),
      d("KAEL",   "right", "neutral", "How many people are in your network?"),
      d("DORATH", "left",  "neutral", "Active? Four I would trust with anything. A dozen more I would trust with specific tasks. A broader network of people who know one thing about it and nothing more."),
      d("KAEL",   "right", "neutral", "And the person you saw at the hedgerow — Tal. She was in the inner group?"),
      d("DORATH", "left",  "neutral", "She was. Eran put her in place before he died. She was reliable for three years and then she went quiet. No explanation I could reach."),
      d("KAEL",   "right", "neutral", "What was her role?"),
      d("DORATH", "left",  "neutral", "The passage. There is a passage under the building at the district edge — not the same as the Archive's passage, but similar. She maintained it. Kept it clear, kept it stocked. It was the eastern exit of the network if things went wrong."),
      n("You stop eating. The passage under the Archive. The passage under this building's predecessor. A network with multiple underground routes, put in place before this situation began, by a person who used the deep records' notation on the walls."),
      d("KAEL",   "right", "neutral", "Someone built a parallel system. Underground exits, maintained positions, safe buildings. Before any of this started."),
      d("DORATH", "left",  "neutral", "Eran started it. I maintained it. Who built it before Eran — I do not know. The building you're sitting in was in use before his time. The passage was built before his time. He found it and continued it."),
      d("MAREN",  "left",  "thoughtful", "Someone was preparing for exactly this outcome forty years ago."),
      n("Nobody speaks for a moment. The lamp burns. The implication of what was prepared, by whom, and why, sits in the room with the three of you without moving."),
    ],

    // Spark 3: Ryn notices
    [
      n("Ryn has been doing a systematic walk of the safe house's interior since they arrived — not searching, just moving through it with the attention she gives to every unfamiliar space. She makes a small sound from the far wall — not an exclamation, just a marker."),
      d("RYN",    "right", "quiet",   "The shelf."),
      n("She is standing in front of the storage shelf along the west wall. It holds the provisions Dorath stocked: dry goods, wrapped in cloth, labeled in a terse hand. But there is a gap between two of the packages where something has been removed."),
      d("DORATH", "left",  "neutral", "I left everything I stocked here. I haven't taken anything."),
      d("RYN",    "right", "quiet",   "Something was here and isn't now. The dust pattern is different from the rest of the shelf. The impression in the cloth is still showing."),
      n("You look. She's right. Whatever was between the wrapped flour and the wrapped salt had been there long enough to leave a compressed area in the shelf cloth. It was square-edged. A box, maybe, or a wrapped book."),
      d("KAEL",   "right", "neutral", "Dorath — when you last used this building, was there anything on that shelf?"),
      d("DORATH", "left",  "thoughtful", "There were Eran's things when I first took the building. I went through them and took what was relevant. But that was years ago."),
      d("RYN",    "right", "quiet",   "The impression is recent. A week, maybe two. Something was here and was removed recently."),
      d("MAREN",  "left",  "neutral", "By someone who had access to the building."),
      d("DORATH", "left",  "neutral", "I am the only person with a key. Unless someone made a copy without my knowledge."),
      n("Ryn notes the shape of the impression carefully in her own small book. The ghost of a missing object. Someone was here, took something, left nothing else displaced. Precise. Careful. And the symbol on the wall, undisturbed, watches from below waist height."),
    ],

    // Spark 4: Maren and Dorath's history
    [
      n("The afternoon quiet. Ryn is at the shutter watching the track. Dorath is outside working on the drainage channel. You find yourself alone with Maren, who is reviewing the fragments she knows by feel."),
      d("KAEL",  "right", "neutral", "How well do you know her? Dorath."),
      d("MAREN", "left",  "neutral", "We have corresponded for four years. We have met in person three times before this week. The correspondence is more useful than the meetings — she writes clearly and without self-promotion."),
      d("KAEL",  "right", "neutral", "Do you trust her?"),
      d("MAREN", "left",  "neutral", "I trust her work. Her judgment on operational matters is consistently good. Her judgment on people is occasionally overgenerous — she tends to extend benefit of the doubt past where I would extend it. That trait was an asset before the current situation and may be a liability in it."),
      d("KAEL",  "right", "neutral", "Tal, you mean."),
      d("MAREN", "left",  "neutral", "Among other possibilities. Yes."),
      d("KAEL",  "right", "neutral", "Do you think she's wrong about Tal?"),
      d("MAREN", "left",  "thoughtful", "I think the evidence about Tal is insufficient for certainty in either direction. Dorath believes Tal went dark because of circumstances outside her control. I believe it is possible Tal went dark because the circumstances inside her control changed."),
      n("Through the wall you can hear Dorath working at the drainage channel — a patient, methodical sound. You think about benefit of the doubt. About the difference between generosity and error."),
      d("KAEL",  "right", "neutral", "Do you trust me? You've known me for five weeks."),
      d("MAREN", "left",  "neutral", "I trust what you've shown me. Which is what five weeks allows."),
    ],

    // Spark 5: Planning the route
    [
      n("Evening. The disagreement about routes has settled into a working plan, but not all the way. Dorath has been through it twice. Maren once. You and Ryn have been studying the sketch map Dorath drew on the back of a provision list."),
      d("RYN",    "right", "quiet",   "What is the river valley route? I don't know this territory."),
      d("DORATH", "left",  "neutral", "Three days through lower ground. Scattered farms — people who know me from previous work. Not connected to Eran's network, just regular people I have done honest work for."),
      d("RYN",    "right", "quiet",   "And the open road?"),
      d("DORATH", "left",  "neutral", "Faster. Four hundred yards of open ground between here and the first tree cover, and then the main road east. People use it. We would be invisible in the traffic — but also identifiable if someone is looking."),
      d("MAREN",  "left",  "neutral", "And the compromise route — the river valley path nobody else would expect us to take."),
      d("RYN",    "right", "quiet",   "Which way does the valley exit to the east?"),
      d("DORATH", "left",  "neutral", "There's a waystation at the junction. A traveler's stop — unofficially used for goods people would rather not log at the city gate. It is clean, in the sense that nobody working there asks questions because nobody working there wants questions asked about what they're doing either."),
      d("KAEL",   "right", "neutral", "Neutral ground."),
      d("DORATH", "left",  "neutral", "Useful neutral ground. Provisions we can take without anyone noting what we carry out."),
      n("Maren studies the sketch. Ryn traces the valley path with one finger. Outside, the wind has shifted north — colder now, the hint of weather in it. Tomorrow they leave. And whoever is watching the hedgerow gap has not moved since Dorath last looked, patient, not closing."),
      d("MAREN",  "left",  "neutral", "We leave at first light. Pack tonight."),
    ],

    // Spark 6: Dorath's background
    [
      n("Afternoon. Dorath has been outside checking the perimeter for the second time today — not because she expects trouble, but because she does not trust expectations. When she comes back in and Ryn takes over the watch, you find yourself alone with her for the first time."),
      d("KAEL",   "right", "neutral", "What were you doing before Eran recruited you?"),
      d("DORATH", "left",  "neutral", "Survey work. Eastern territories, mostly. I mapped access points for the provincial authority — routes, bridges, structures, the practical geography of who can get where."),
      d("KAEL",   "right", "neutral", "And that's what made you useful to the network."),
      d("DORATH", "left",  "neutral", "I knew every legitimate route east and every route that wasn't on any map. I knew which bridges held weight and which ones the official records described as holding weight. I knew where things were actually stored versus where the documentation said they were stored."),
      d("KAEL",   "right", "neutral", "When did you realize the survey work was useful for something other than surveys?"),
      d("DORATH", "left",  "neutral", "When Eran told me he had been using my public reports for three years to route materials that needed to travel without being tracked. He came to me because he needed a primary source, not a secondary reading."),
      d("KAEL",   "right", "neutral", "That must have been a strange conversation."),
      d("DORATH", "left",  "neutral", "He said: I have been using your work as if you were part of this. I wanted to ask if you actually wanted to be. I said yes without taking time to think about it, which surprised me."),
      n("She picks up her cup. The lamp burns steady."),
      d("DORATH", "left",  "neutral", "I think what surprised me was that I had already made the decision and hadn't known it. The yes was not a decision. It was the acknowledgment of a decision I had already made somewhere else, without being asked."),
    ],

    // Spark 7: The first practice, attempted
    [
      n("Evening. You decide to try it — not in response to anything Maren said, just because you have been thinking about it for two days and there is something uncomfortable about knowing a thing in theory that you have not tested."),
      n("You pick something specific: a letter you received six months ago, from your unit, before all of this. You know the letter. You remember it."),
      n("You try to hold it precisely. Not the feeling of reading it. Not the summary of what it said. The actual words, in the actual order."),
      n("You hold it for thirty seconds before the first compression appears: you know the letter described three events in sequence, but the exact phrasing of the second event has gone blurry. Not gone — blurry. A range of possible words where one specific word should be."),
      n("You sit with the blur. It is uncomfortable in exactly the way Maren described: reaching for something and finding your hand two inches off."),
      d("MAREN", "left",  "neutral", "You're doing it."),
      n("You look up. She has not been watching — she was working. But she noticed."),
      d("KAEL",  "right", "neutral", "The second event in a letter. I can't get it exactly. Three possible phrasings and I don't know which one is right."),
      d("MAREN", "left",  "neutral", "That is the correct state. The gap you're feeling is accurate — it is the actual state of what you have. Most people paper over that gap without noticing it. You are noticing it."),
      d("KAEL",  "right", "neutral", "What do I do with it?"),
      d("MAREN", "left",  "neutral", "Hold the gap. Do not fill it. Sit with the fact that you have three options and cannot currently determine which is true. The discomfort is the work. Filling it with any of the three options would be the error."),
      n("You hold it. The three phrasings sit in your mind, none of them settling. The lamp burns. Outside, Dorath walks her circuit. The discomfort does not go away, but after a while it becomes familiar, which is not the same thing as comfortable and is, you suspect, exactly the point."),
    ],

    // Spark 8: Ryn and Kael, privately
    [
      n("Second day at the safe house. Maren is working with Dorath on the route. Outside, it is raining. You and Ryn are inside with the lamp and the sound of rain on the stone roof."),
      d("KAEL", "right", "neutral", "What do you think happens if we get the fragments somewhere safe and the method is complete? If that actually works?"),
      d("RYN",  "right", "quiet",   "I don't know. Maren thinks about long timelines in a way I haven't learned yet."),
      d("KAEL", "right", "neutral", "What do you think?"),
      d("RYN",  "right", "quiet",   "I think the method produces people who are harder to manipulate. Not impossible — people can always be manipulated. But the method's first instruction, genuinely applied, produces someone who knows when they are being given approximate information and presented with it as exact. That's a specific kind of resistance to a specific kind of lie."),
      d("KAEL", "right", "neutral", "And that's worth all of this."),
      d("RYN",  "right", "quiet",   "I think it's the only thing worth all of this. Not preserving old texts. Not maintaining institutions. Making it so that specific kinds of manipulation stop working on the people they are used against."),
      n("The rain intensifies briefly and then steadies. You think about what she said. Not the method's instructions — what the instructions produce. A person who knows the difference between what they know and what they only think they know. In a world full of people who do not know that difference, the ability to know it is not just useful. It is something else. Something harder to name."),
      d("KAEL", "right", "neutral", "Is that why Voss wants to control it? Because a person with that skill can't be reliably lied to?"),
      d("RYN",  "right", "quiet",   "That would be my reason, if I were them."),
    ],

    // Spark 9: Maren reads the symbol
    [
      n("Third morning. Maren has been examining the symbol on the safe house wall for an hour — not continuously, but returning to it repeatedly between other work. When she finally sits with it directly, pen out, small book open, you realize she has been working up to this."),
      d("KAEL",  "right", "neutral", "What does it say?"),
      d("MAREN", "left",  "neutral", "It says: the thing you are looking for is not what you think it is. Which is a translation, not a transcription — the deep records' notation is not a language you can translate directly. It expresses relationship rather than content."),
      d("KAEL",  "right", "neutral", "Relationship between what?"),
      d("MAREN", "left",  "neutral", "Between what the fragments are — which is what I have understood them to be — and what they are also, which is something I had not considered. The symbol does not tell me what the second thing is. It tells me the first understanding is not complete."),
      d("KAEL",  "right", "neutral", "That seems deliberate."),
      d("MAREN", "left",  "neutral", "It is a challenge, not an instruction. Someone who understood the fragments put this here to say: look again. Whatever I have found in nineteen years of work, there is another layer I have not found."),
      d("KAEL",  "right", "neutral", "Is that alarming or useful?"),
      n("She closes the notebook. Looks at the symbol once more — the close, studied look she gives to things she is committing exactly."),
      d("MAREN", "left",  "neutral", "Both. And the second without the first is not possible, so I am choosing to lead with the second."),
    ],

    // Spark 10: Message through Dorath's drop
    [
      n("Late afternoon, day three. Dorath produces a folded note from inside her coat without announcement, opens it, reads it twice, folds it again."),
      d("KAEL",   "right", "neutral", "What is that?"),
      d("DORATH", "left",  "neutral", "The drop system. My network has dead drops at seven points in a two-day radius. I check them indirectly — through third parties who don't know what they're carrying. This came through the farm to the north. The farmer doesn't know what it says."),
      d("KAEL",   "right", "neutral", "What does it say?"),
      d("DORATH", "left",  "neutral", "Serath's position. He is one day behind us on a northern route. He has not been identified. He has a second piece of documentation I did not know he was carrying."),
      d("KAEL",   "right", "neutral", "What kind of documentation?"),
      d("DORATH", "left",  "neutral", "He doesn't specify. He says it was in the Archive's restricted administration section and he removed it before the fire. He says Maren will want to see it."),
      n("Maren has been listening without appearing to listen — the quality of stillness that is not passive."),
      d("MAREN", "left",  "neutral", "What was in the restricted administration section that Serath would think relevant to me."),
      n("This is not a question. It is an inventory, running internally. You watch her run it. The lamp flickers in a draft from the shutter. Outside, the wind picks up. In one day, Serath will be here with a document that Maren is already beginning to understand without having seen it."),
    ],

    // Spark 11: Maren's years
    [
      n("A question that has been inappropriate until it isn't — the safe house, the third day, the accumulated weight of what you have learned in the past week making the inappropriate merely direct."),
      d("KAEL",  "right", "neutral", "How old are you?"),
      n("A pause. Not offended — actually calculating."),
      d("MAREN", "left",  "neutral", "Forty-one."),
      d("KAEL",  "right", "neutral", "You don't look forty-one."),
      d("MAREN", "left",  "neutral", "The method, over time, changes how certain kinds of stress are processed. Nineteen years of the practice produces physiological differences that are documented in the late fragments. I did not expect them — I found them when I compared what I expected to see in the mirror with what was actually there."),
      d("KAEL",  "right", "neutral", "The method slows aging."),
      d("MAREN", "left",  "neutral", "That is an imprecise way to describe it. The method reduces the kind of degradation that is caused by holding things loosely and approximately — cognitive load, the friction of imprecision, the recurring cost of managing what you only half-know. It does not stop aging. It removes a specific kind of accelerant."),
      d("KAEL",  "right", "neutral", "You started at twenty-two."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("KAEL",  "right", "neutral", "How long does the original archivist describe the full practice taking?"),
      d("MAREN", "left",  "neutral", "The fragments describe someone achieving the structural state — where the knowledge is present the way hands are present, not retrieved — after approximately forty years of dedicated practice. Some achieve it in thirty. Some require fifty."),
      n("You sit with that arithmetic. Maren is forty-one. She began at twenty-two. She has nineteen years behind her. And ahead of her, somewhere between ten and thirty more years, something she has been building toward since before you were at the Archive."),
    ],

    // Spark 12: What completion produces exactly
    [
      n("You ask it late on the third night when the others are asleep and Maren is at the table with her book."),
      d("KAEL",  "right", "neutral", "What does a person look like — from the outside — after they've completed it? Practically. Day to day."),
      d("MAREN", "left",  "neutral", "They do not look different. I have said this before. The changes are entirely internal."),
      d("KAEL",  "right", "neutral", "Then what can they do that others can't, practically? One specific example."),
      d("MAREN", "left",  "neutral", "They can hear something said once — a statement, an argument, a set of instructions — and reproduce it exactly three years later. Not approximately. Not close. Exactly, including the speaker's emphasis, the context, the adjacent statements."),
      d("KAEL",  "right", "neutral", "Like a recording."),
      d("MAREN", "left",  "neutral", "Better than a recording. A recording captures sound. The method captures meaning. The person does not replay what was said — they re-understand it, from the original understanding, each time. Which means they do not misremember. And they do not misquote."),
      d("KAEL",  "right", "neutral", "That is — practically speaking — an extraordinary capability."),
      d("MAREN", "left",  "neutral", "In a world where most knowledge transmission relies on memory, which degrades, and documentation, which can be altered or destroyed — yes. A person who carries something precisely, in a form that cannot be taken or burned or changed, is carrying something the rest of the world cannot replicate through any other means."),
      n("You think about the Archive's nine centuries. All that preservation, all that careful curation, all those stone buildings and locked cases and sealed vaults. And in the end, the things that matter most are not in vaults at all. They are walking. Moving. Breathing. Crossing the open road east."),
    ],

    // Spark 13: The second displaced item
    [
      n("Ryn finds it on the fourth day — the morning before they leave. Not on the shelf this time. In the passage's interior — the narrow stone corridor that runs beneath the building, which Dorath has checked twice. On the wall, at knee height: a mark. Not the Archive notation. Something smaller. Personal."),
      d("RYN",    "right", "quiet",   "This is a transfer mark. Someone using the passage left a sign for someone following. Specific — the direction sign inside it points east, and the date notation is—"),
      n("She stops. Counts something."),
      d("RYN",    "right", "quiet",   "Eleven days ago."),
      d("DORATH", "left",  "neutral", "I checked this passage. I did not see this."),
      d("RYN",    "right", "quiet",   "It is at knee height, on the interior wall facing the direction you would look if you were entering from the east end. If you checked the passage from the west end, moving east, you would be looking at the opposite wall."),
      n("Dorath is very still for a moment. Then she crouches and looks at the mark directly."),
      d("DORATH", "left",  "neutral", "I always check the passage from the west end."),
      n("Someone who knew this building's check patterns — or who understood that anyone checking would be looking a specific direction — left a message. Not for Dorath. For whoever came next, arriving from the east. Eleven days ago. Before the Archive burned."),
    ],

    // Spark 14: The night sound
    [
      n("Fourth night. The rain has stopped. The wind is down. In the particular silence that follows a night of noise, sounds carry farther than usual. You are on watch, the others sleeping, when you hear it — not outside the building but beneath it. From the passage."),
      n("A scrape. Stone on stone, the sound a door makes when the hinge is old and the fit is not quite right. Then nothing. Then, after a count of forty: footsteps. Single. Moving east through the passage and out."),
      n("You wake Dorath without speaking — just a hand on her shoulder. She is upright immediately. You gesture toward the passage entrance. She understands and is at the passage door with her lamp in under twenty seconds."),
      n("She goes in. You stay at the entrance. A minute passes. Three. Five."),
      n("The others are awake now — Ryn first, then Maren."),
      d("MAREN", "left",  "neutral", "How long has she been in there?"),
      d("KAEL",  "right", "neutral", "Five minutes. Six."),
      n("Maren looks at the passage entrance. Not alarmed — something subtler, the focused stillness of someone who is already thinking about what comes after the information arrives."),
      d("RYN",   "right", "quiet",   "If someone was in the passage and went out the east end — they came in through the east end. The building is locked on both sides."),
      d("MAREN", "left",  "neutral", "Or they have had a key long enough to use it and leave before we knew they were here."),
      n("Dorath's footsteps return. She emerges from the passage door, lamp in hand, and stands in the entrance for a moment before speaking."),
    ],

    // Spark 15: What Dorath found — CLIFFHANGER
    [
      n("Dorath walks to the table, sets the lamp down, and says one word."),
      d("DORATH", "left",  "neutral", "Tal."),
      n("Nobody speaks."),
      d("KAEL",   "right", "neutral", "She was here?"),
      d("DORATH", "left",  "neutral", "She left something in the passage. On the east wall. In her handwriting. I know it because I taught her the shorthand she's using."),
      d("MAREN",  "left",  "neutral", "What does it say?"),
      n("Dorath picks up the lamp, sets it back down, picks it up again — the movement of someone who needs to do something with their hands while their mind is elsewhere."),
      d("DORATH", "left",  "neutral", "It says: I'm not with them. The case is the target. Get it east before the seventh."),
      n("The seventh. Four days. Silence occupies the room the way water occupies a vessel — completely, evenly, finding every corner."),
      d("KAEL",   "right", "neutral", "The seventh from when?"),
      d("DORATH", "left",  "neutral", "The date notation she uses counts from the last post day. Which makes the seventh—"),
      n("She calculates. Her face does not change, but something in her goes very still."),
      d("DORATH", "left",  "neutral", "Tomorrow."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 4 — The Open Road
  // Setting: fast exit → open road east → waystation approaches
  // Characters: Player, Maren, Ryn, Dorath
  // ═══════════════════════════════════════════════════════════════════════════
  w4: [

    // Spark 1: Who Tal is
    [
      n("The open road is faster than any route they discussed, but also more exposed. Dorath sets the pace — faster than Maren would usually walk, but Dorath is the one who knows what the person at the hedgerow might mean, and fast is her answer to it."),
      d("KAEL",   "right", "neutral", "Tell me about Tal. Not what she did in the network. Who she is."),
      d("DORATH", "left",  "neutral", "She was a courier before Eran recruited her. Long-distance work, the kind that requires you to remember routes and arrangements without writing them down. Good at that. Patient in a way that couriers need to be — weather, delays, doors that don't open when they should."),
      d("KAEL",   "right", "neutral", "And her connection to Eran?"),
      d("DORATH", "left",  "neutral", "She had done work that overlapped with his network before she knew it was a network. He identified her from her work patterns, made contact, told her enough of the purpose to ask if she wanted to participate formally. She said yes."),
      d("KAEL",   "right", "neutral", "Did she know what the purpose was?"),
      d("DORATH", "left",  "thoughtful", "She knew the Archive piece. She knew about the method. Eran was more forthcoming with his people than I was with mine — he believed people work better when they understand the full weight of what they're carrying."),
      d("KAEL",   "right", "neutral", "Do you agree with that?"),
      d("DORATH", "left",  "neutral", "I used to. I am less certain now."),
      n("She glances back once. The track and hedgerow are out of sight behind the last curve. The road east is empty in both directions and the morning is cold and grey."),
      d("DORATH", "left",  "neutral", "Tal was reliable for three years. Then she went quiet for two. The only explanation for the quiet that I could not rule out was—"),
      n("She stops mid-sentence. Not for effect. She is genuinely weighing it."),
      d("DORATH", "left",  "neutral", "That she decided the weight was too much. That she found a way out of it that didn't involve me."),
    ],

    // Spark 2: Maren and the cipher
    [
      n("The road at midday. They stop at a fallen tree that provides sitting and a view in both directions. Dorath watches east while Maren does something you haven't seen her do before: she opens the case and removes the cipher, not to read it but to hold it. She sits with it across her knees, looking at the road."),
      d("KAEL",  "right", "neutral", "You've already memorized it."),
      d("MAREN", "left",  "neutral", "Large portions. Not all of it. The cipher uses a notation system I know from other contexts, but there are sections where the usage is different enough that I want to work through them before I rely on my reading."),
      d("KAEL",  "right", "neutral", "You could read it now."),
      d("MAREN", "left",  "neutral", "I could. What I would get is my best current reading. What I want is my confirmed reading. Those are different things."),
      d("KAEL",  "right", "neutral", "The method. Know it exactly, not approximately."),
      n("She looks at you."),
      d("MAREN", "left",  "neutral", "Yes. Exactly."),
      d("KAEL",  "right", "neutral", "You were already doing this. Before we started the formal practice."),
      d("MAREN", "left",  "neutral", "For nineteen years. The distinction between exact and approximate is not something the fragments teach you — it is something you either develop independently or you don't. The fragments clarify it and give it structure. But the instinct that there is a difference is prior to the fragments."),
      n("She folds the cipher closed and replaces it. Ryn, sitting against the log, has been listening with her eyes closed. Nobody comments. It sits there for all of them, the way a thing sits when it is both said and not yet fully understood."),
    ],

    // Spark 3: Ryn's question about the network
    [
      n("Late afternoon. The road has been empty for hours, and the particular quiet of an empty road has settled over the group — not comfortable silence, but the working silence of people who have been together long enough that silence is acceptable."),
      d("RYN",    "right", "quiet",   "Dorath. The person at the hedgerow. If she's with Voss — what does she know?"),
      d("DORATH", "left",  "neutral", "If she went to Voss, she knows the building's location. Eran's network's eastern structure. The route we would most likely take from the building."),
      d("RYN",    "right", "quiet",   "Does she know about Maren?"),
      d("DORATH", "left",  "neutral", "By name, possibly. By face, I don't know — Tal and Maren's paths never crossed directly, so far as I know."),
      d("RYN",    "right", "quiet",   "The fragments?"),
      d("DORATH", "left",  "neutral", "She knew the network existed to support the Archive's work. Whether she knew about the specific fragments — whether Eran told her — I don't know."),
      d("MAREN",  "left",  "neutral", "Eran kept the fragments separate from the network operations. Structural separation — the people doing operational work did not know the details of what they were supporting. That was deliberate."),
      d("RYN",    "right", "quiet",   "So even if Tal is working for Voss, she may not be able to give them the specific target."),
      d("MAREN",  "left",  "neutral", "She can give them a direction and a description. Whether she can give them enough to act precisely on it — that is the question."),
      n("Ryn thinks for a moment and then goes back to watching the road. The answer is not settled, but the shape of the risk is clearer. In the distance, the first tree cover of the day appears on the left — a stand of old growth that the road curves around."),
    ],

    // Spark 4: Walking the road as if you know it
    [
      n("They are on the open road and Dorath is telling you something Eran said once, about how you move when you know the route versus when you're learning it. There is a different quality, he said, and people who know the route show it whether they mean to or not."),
      d("DORATH", "left",  "neutral", "He used to watch travelers on the road outside his network's main routes. He could identify, in most cases, whether someone was on familiar ground or unfamiliar ground. The body knows."),
      d("KAEL",   "right", "neutral", "Is that useful?"),
      d("DORATH", "left",  "neutral", "Very. A person who walks like they know the road is unlikely to be followed carefully — they're expected. A person who walks like they're uncertain is a target. We are on a road I know and you don't. It helps to know that and walk like I do anyway."),
      d("KAEL",   "right", "neutral", "How?"),
      d("DORATH", "left",  "neutral", "Don't decide where you're going. Know it. Don't look at the road to find it. Walk it."),
      n("You try this. It feels presumptuous, walking a road as though you own it, until you realize 'own' is the wrong word. It is more like accepting that the road already goes where you need to go and your job is to follow it rather than negotiate with it. Something in your posture shifts. Dorath notices."),
      d("DORATH", "left",  "neutral", "There."),
      d("KAEL",   "right", "neutral", "That's all it is?"),
      d("DORATH", "left",  "neutral", "That's all it is. Eran said it was the same principle as the Vraen practice. Know the thing. Don't approximate it."),
      n("Maren, walking ahead, does not turn around. But she slows very slightly — the way she slows when something said behind her is worth keeping."),
    ],

    // Spark 5: Approaching the waystation
    [
      n("The waystation appears at the end of the second day on the open road — a single squat building on the east side of a junction, stone and tile, a small stable attached, smoke from the chimney. At this hour there are no other travelers. The light from the building's main window is orange and warm."),
      d("DORATH", "left",  "neutral", "We stop here. Not long — an hour, maybe less. Get what we need from the stores and continue."),
      d("KAEL",   "right", "neutral", "Is it safe?"),
      d("DORATH", "left",  "neutral", "Define safe."),
      d("KAEL",   "right", "neutral", "Do the people here know what we're carrying?"),
      d("DORATH", "left",  "neutral", "No. They know I pass through occasionally and pay for provisions without needing the formal log. That is the extent of our relationship."),
      d("MAREN",  "left",  "neutral", "I want to open the case in there. Properly. I need a table and an hour."),
      d("DORATH", "left",  "neutral", "You'll have it."),
      d("MAREN",  "left",  "neutral", "And a low fire. I may need to check the condition of some of the pieces."),
      n("You approach. The door opens before you knock — the keeper is a large person with a round, unhurried face who steps aside without speaking and gestures to a table near the fire. Dorath reaches into her coat and produces a folded note — payment, negotiated at some previous point. The keeper nods and disappears."),
      d("RYN",    "right", "quiet",   "He doesn't ask."),
      d("DORATH", "left",  "neutral", "He never asks."),
      n("Maren sets the case on the table. Her hands are steady. What comes out of that case in the next hour will change how you understand everything that has happened so far."),
    ],

    // Spark 6: Dorath names a contact — then doesn't
    [
      n("Fast exit from the safe house. Dorath sets the pace — quicker than yesterday, with the urgency of someone who has recalculated and arrived at a number she does not like. You fall into step beside her."),
      d("KAEL",   "right", "neutral", "The seventh is today. Tal said to get the case east before the seventh. We're moving."),
      d("DORATH", "left",  "neutral", "We're moving."),
      d("KAEL",   "right", "neutral", "Is there anyone else on the road we can reach? Another network contact?"),
      d("DORATH", "left",  "neutral", "There's—"),
      n("She stops mid-sentence. A decision being made, not a hesitation."),
      d("DORATH", "left",  "neutral", "There is a contact at the junction station. I have used them three times. They know me."),
      d("KAEL",   "right", "neutral", "Can we trust them?"),
      d("DORATH", "left",  "neutral", "Under normal circumstances, yes. Under circumstances where Tal knows the network's composition, I do not know who else she may have told."),
      n("A gap. The road runs east. The choice between speed and caution does not resolve cleanly."),
      d("KAEL",   "right", "neutral", "You were going to give me a name."),
      d("DORATH", "left",  "neutral", "I know. I decided against it. Names are information. The fewer people who have specific information right now, the better."),
      n("She keeps moving. The name stays where she put it — inside her, where it cannot be found by anyone who has not earned it."),
    ],

    // Spark 7: Ryn teaches route notation
    [
      n("The road on the fast exit. Ryn has pulled out her copied records and reviews them at walking pace — something you did not know was possible until you saw her do it."),
      d("KAEL", "right", "neutral", "How do you read those while moving?"),
      d("RYN",  "right", "quiet",   "Practice. The notation is designed to be read quickly — position on the page carries meaning. Left margin is fixed position. Right margin is relative. Center is the relationship between them."),
      d("KAEL", "right", "neutral", "Show me."),
      n("She holds the page so you can see it. The notation is dense — symbols you recognize from the Archive's administrative collections, used differently here."),
      d("RYN",  "right", "quiet",   "This line: fixed position on left is the waystation junction. Relative position on right is three days at standard pace. Center: the relationship is direct — no intermediate stops required."),
      d("KAEL", "right", "neutral", "And this one?"),
      d("RYN",  "right", "quiet",   "Fixed: the eastern city. Relative: depends on entry point. Center: conditional. The relationship between start and end is not fixed — it changes based on which approach route you use."),
      d("KAEL", "right", "neutral", "Why bake the approach into the destination?"),
      d("RYN",  "right", "quiet",   "Because the route changes the destination. You can enter the eastern city as a traveler, a scholar, a trader, or someone who is none of those. The city you arrive in is different depending on what you arrive as. The notation captures that."),
      n("You walk with that for a while. The destination is conditional. The notation knows this in a way that most maps pretend not to."),
    ],

    // Spark 8: Trust versus verification
    [
      n("The second day from the safe house. Fast pace. The question has been building since Tal's message."),
      d("KAEL",  "right", "neutral", "How do you decide who to trust? Given Tal, given the network, given the fourteenth fragment from an unknown hand. How do you make that call?"),
      d("MAREN", "left",  "neutral", "I don't trust. I verify."),
      d("KAEL",  "right", "neutral", "That is not a real answer."),
      d("MAREN", "left",  "neutral", "It is a precise one. Trust is a commitment made without sufficient evidence. Verification is a process that produces evidence. I do not ask whether I trust someone. I ask what I can verify about them and to what degree."),
      d("KAEL",  "right", "neutral", "And Dorath?"),
      d("MAREN", "left",  "neutral", "Four years of correspondence, internally consistent. Three in-person meetings that matched the correspondence exactly — people performing a version of themselves in letters show a gap in person. I have not detected a gap with Dorath."),
      d("KAEL",  "right", "neutral", "And me?"),
      d("MAREN", "left",  "neutral", "Verified consistency over five weeks. The period limits what can be concluded — but within it, the consistency is high."),
      d("KAEL",  "right", "neutral", "That is a very cold description of working with someone."),
      d("MAREN", "left",  "neutral", "It is a precise one. What people call warmth in the context of trust is usually the emotional residue of consistency over time. The feeling follows from the verification. Not the other way around."),
      n("You walk the rest of the morning thinking about what would change in you if you operated the same way. If you let the feeling follow the evidence instead of preceding it."),
    ],

    // Spark 9: Am I carrying it?
    [
      n("Second afternoon. Dorath has moved to point. You drop back beside Maren."),
      d("KAEL",  "right", "neutral", "The people who complete the method — the people 'carrying it.' Am I, in any sense, one of those?"),
      d("MAREN", "left",  "neutral", "You have begun the first practice. You have held a gap rather than papering over it. You brought the two most useful books from the Archive without planning to. Those are beginnings."),
      d("KAEL",  "right", "neutral", "That is not an answer."),
      d("MAREN", "left",  "neutral", "The answer is: not yet. The question is worth asking and the answer changes with time."),
      d("KAEL",  "right", "neutral", "What changes it?"),
      d("MAREN", "left",  "neutral", "Sustained practice over years, with consequence. The method does not produce anything quickly. It produces something durable — a different category entirely. The original archivist describes the early stages as identical to ordinary learning. The difference only appears when ordinary learning would begin to degrade, and it doesn't."),
      d("KAEL",  "right", "neutral", "When is that?"),
      d("MAREN", "left",  "neutral", "Three to five years in."),
      n("Three to five years. You are on day six of consciously understanding the practice exists. You think about beginning something whose difference only becomes visible after three years — most things you have done, you knew within a week whether they were working."),
    ],

    // Spark 10: The cipher's outer cover
    [
      n("Morning of the second day. The cipher needs re-wrapping — the cloth had worked loose in the movement. In the moment before Maren re-wraps it, you see the outer cover."),
      d("KAEL",  "right", "neutral", "There's writing on the outside. Before the cipher starts."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("KAEL",  "right", "neutral", "I can't read the notation."),
      d("MAREN", "left",  "neutral", "It says: this document describes the method for becoming what the building was. Take it east when the building falls."),
      n("A beat."),
      d("KAEL",  "right", "neutral", "The building is the Archive."),
      d("MAREN", "left",  "neutral", "The building is any Archive. Any building that serves this purpose. The instruction is addressed to whoever is holding it when a building used for this work ceases to exist."),
      d("KAEL",  "right", "neutral", "Who wrote it?"),
      d("MAREN", "left",  "neutral", "The hand is older than any of the fragments. Older than the Archive itself, by at least two centuries. Whoever wrote this was anticipating the Archive's failure before the Archive existed."),
      n("She re-wraps the cipher, closes the case. The road continues east at Dorath's urgent pace. The instruction was written for exactly this moment — this road, this group, this direction — by someone who died before any of you were born and was correct about what would eventually be needed."),
    ],

    // Spark 11: Three silences
    [
      n("The second full day walking. You have been with these people long enough to know their different silences. This seems like useful knowledge."),
      n("Dorath's silence is operational. When she stops talking it is because she is processing terrain, threat, logistics. It is occupied, not withdrawn. You can ask her a direct question in it and she will answer if the answer is needed."),
      n("Maren's silence is structural. She talks when talking produces something and is quiet when it doesn't. The silence is perfectly comfortable with itself. You have learned not to speak into it just to fill it — this took four days to learn."),
      n("Ryn's silence is the most informative. She is quiet when observing, which is most of the time. There is a specific quality when she has found something she has not yet decided to share — a slight change in the angle of her head, attention shifting from external to internal."),
      n("She has had that quality since mid-morning."),
      d("KAEL", "right", "neutral", "Ryn. What have you found?"),
      d("RYN",  "right", "quiet",   "The road was used recently. Past twelve hours. Someone moving east, fast — different from whoever Dorath heard at the junction. Different weight, different stride."),
      d("KAEL", "right", "neutral", "A second person ahead of us."),
      d("RYN",  "right", "quiet",   "Yes. Or the same person — but I don't think so."),
      n("Dorath adjusts pace without being told. Maren says nothing. The road curves ahead and in the far distance the first waystation smoke appears above the tree line. Somewhere between you and it, two people are moving toward the same building."),
    ],

    // Spark 12: The waystation keeper knows Dorath
    [
      n("The waystation. The keeper's face when the door opens — not the face of someone expecting strangers but someone expecting Dorath specifically."),
      d("KEEPER", "left",  "neutral", "You're early."),
      d("DORATH", "left",  "neutral", "We had reason to move quickly."),
      n("He steps aside, looks at each of you in turn — accounting, not suspicion. Keeping count."),
      d("KEEPER", "left",  "neutral", "Three others came through. Past day."),
      d("DORATH", "left",  "neutral", "Together?"),
      d("KEEPER", "left",  "neutral", "No. Two, then one. The two arrived before dawn. The one came two hours before you."),
      d("KAEL",   "right", "neutral", "Did they say where they were going?"),
      n("He looks at you, then at Dorath."),
      d("KEEPER", "left",  "neutral", "Nobody says where they're going here. That's the arrangement."),
      d("DORATH", "left",  "neutral", "Did they ask about other travelers?"),
      d("KEEPER", "left",  "neutral", "The two didn't. The one that came alone—"),
      n("A pause. The pause of someone deciding how much to say."),
      d("KEEPER", "left",  "neutral", "She asked if anyone had come through recently with a document case."),
    ],

    // Spark 13: What Ryn found in the outbuilding
    [
      n("While Maren takes her hour at the table, Ryn does her systematic walk of every unfamiliar space. She is gone fifteen minutes."),
      n("When she comes back she puts a small object on the table between you: a folded cloth, travel-stained, something wrapped inside."),
      d("KAEL", "right", "neutral", "What is that?"),
      d("RYN",  "right", "quiet",   "In the outbuilding. Behind the grain stores. Under a loose floor stone — not hidden carefully. The stone had been lifted recently and not reset completely."),
      d("KAEL", "right", "neutral", "Left deliberately to be found."),
      d("RYN",  "right", "quiet",   "Or left in haste. I can't tell which."),
      n("Neither of you have touched what is inside. Dorath crosses the room, stands over the table, also does not touch it — looks at it for a long moment, then at Maren."),
      d("DORATH", "left",  "neutral", "The wrapping. The folding pattern — that's Tal's. I taught her that pattern for caching things in a way that could be identified. She used it so I would know the contents were from her."),
      n("Whatever is inside this cloth was left here by Tal. In the last day, in this building, in the building where someone just asked about a document case. The fire burns. The room is very quiet."),
    ],

    // Spark 14: Ryn practices openly
    [
      n("Evening at the waystation. Maren has finished with the cipher. The keeper is elsewhere. You and Ryn are at the table, and Ryn takes out her copied records and holds the page at an angle where you can see she is not looking at it."),
      d("KAEL", "right", "neutral", "You're doing the first practice."),
      d("RYN",  "right", "quiet",   "I have been doing it for three days on specific records. Tonight with someone watching. It changes something about the precision when there is a witness."),
      d("KAEL", "right", "neutral", "A witness to what?"),
      d("RYN",  "right", "quiet",   "Whether I say what I actually have or what sounds right. Alone, it is easy to paper over a gap. With someone listening, the gap becomes audible."),
      n("She closes her eyes."),
      d("RYN",  "right", "quiet",   "Access transition. Northern collections to Vraen-adjacent. Researcher named Avel, late autumn — I have this approximately. I know the year. I cannot give you the precise date."),
      d("KAEL", "right", "neutral", "That's the gap."),
      d("RYN",  "right", "quiet",   "That's the gap. I am not filling it."),
      n("She opens her eyes, finds the record, reads the date. Her face does not change, but she looks at it for a long time. Then closes the record."),
      d("RYN",  "right", "quiet",   "Three days before my approximate. I was inside the range. But I had the wrong day."),
      d("KAEL", "right", "neutral", "Does three days matter?"),
      d("RYN",  "right", "quiet",   "The researcher whose date I approximated left the Archive eleven days after the access record. Three days wrong in the other direction and I would have missed the significance of the gap entirely. Three days is the difference between a pattern and noise."),
    ],

    // Spark 15: The figure in the outbuilding — CLIFFHANGER
    [
      n("Before dawn. They are packing to leave. The keeper is not in sight. Maren has the case. Dorath is at the door. Ryn watches the stable road."),
      n("Then, from the outbuilding: movement. Someone who was in the outbuilding — who had been there in the time you were inside — comes out and walks east. Not running, but close."),
      d("RYN",    "right", "quiet",   "I see them."),
      d("DORATH", "left",  "neutral", "Don't move."),
      n("The figure does not look back. The stable road's bend takes them from view in under a minute. In the low light you cannot see the face. Medium height. A pack. No case. Moving fast."),
      d("KAEL",   "right", "neutral", "They heard everything."),
      d("DORATH", "left",  "neutral", "If they were in the outbuilding while we were in the main room, they heard us through the wall. If they arrived before us and stayed—"),
      d("MAREN",  "left",  "neutral", "They were waiting."),
      d("RYN",    "right", "quiet",   "Waiting for what?"),
      n("Maren looks east — at the road the figure has taken. The road they are also about to take."),
      d("MAREN",  "left",  "neutral", "To see which direction we would go. Now they know."),
      n("She shoulders the case and walks east without looking back — the same direction as the figure who has been in this building all night, who knows exactly what they are carrying and exactly where they are going."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — The Cipher Opened
  // Setting: the waystation, then the forest road
  // Characters: Player, Maren, Ryn, Dorath
  // ═══════════════════════════════════════════════════════════════════════════
  w5: [

    // Spark 1: What the fragments feel like
    [
      n("While Maren works through the cipher, you sit close enough to watch. Not interfering — she has not invited help, and interrupting her process would be a specific kind of wrong — but close enough to see how she moves through the material."),
      d("KAEL",  "right", "neutral", "Can I read one? While you work through the others?"),
      d("MAREN", "left",  "neutral", "Fragment seven. The short one. Top of the pile, wrapped in plain cloth."),
      n("You unwrap it. The fragment is small — smaller than you expected given the importance Maren attaches to it. The writing is dense, in the notation system you learned at the Archive, and it describes a specific practice: holding something in the mind and examining not whether it is there but whether it is held precisely. The instructions leave no room for approximation."),
      d("KAEL",  "right", "neutral", "This reads like it was written by someone who had done it wrong first."),
      d("MAREN", "left",  "neutral", "All of them read that way. The original archivist describes failures explicitly. Not to be thorough — to prevent specific errors they made themselves."),
      d("KAEL",  "right", "neutral", "What did they get wrong first?"),
      d("MAREN", "left",  "neutral", "The same thing everyone gets wrong first. They tried to hold everything at once rather than one thing precisely. They describe the result: a kind of blur, useful knowledge but not exact knowledge, a summary you could function on but not build on."),
      d("KAEL",  "right", "neutral", "And the solution?"),
      d("MAREN", "left",  "neutral", "One thing. Precisely. For longer than is comfortable. Until precise is the baseline and approximate is the anomaly."),
      n("The fire burns lower. Outside, the junction road is quiet. You hold the fragment and re-read the third instruction and feel the small, exact discomfort of finding that what you understood to mean one thing means something slightly different when you hold it precisely. Not a bad feeling. The feeling of the gap before the bridge."),
    ],

    // Spark 2: Dorath's patience
    [
      n("Dorath has been outside for an hour — watching the junction roads in both directions. When she comes in, she stamps her boots, fills a cup from the pot on the fire, and sits in the corner with the patience of someone who has been in worse places than this, waiting longer, with less to show for it."),
      d("KAEL",   "right", "neutral", "How do you do that? Wait like that."),
      d("DORATH", "left",  "neutral", "Practice. You get good at what you do repeatedly."),
      d("KAEL",   "right", "neutral", "What do you think about? When you're on watch."),
      d("DORATH", "left",  "neutral", "The same things that need thinking about when I'm not on watch. I find watch time useful because the interruptions are fewer."),
      d("KAEL",   "right", "neutral", "You were thinking about Tal."),
      d("DORATH", "left",  "thoughtful", "I was. And about Eran's documents. There are things in them that connect to what Maren is working through — I know this because Eran told me pieces of it over years. But I cannot make the connection specific until I can access the documents."),
      d("KAEL",   "right", "neutral", "And you can't access them if the network is compromised."),
      d("DORATH", "left",  "neutral", "If Tal is with Voss, they may have the documents already. Three years of Eran's work, annotated by someone who understood what it was."),
      n("She drinks. The fire settles."),
      d("DORATH", "left",  "neutral", "I've been doing this work for ten years. I made seventeen significant decisions about who to trust and how much. I believe twelve of those were correct. I am not sure about two. And three I have evidence I was wrong about."),
      d("KAEL",   "right", "neutral", "Which three?"),
      d("DORATH", "left",  "neutral", "Two are resolved. They led to consequences I managed. The third one is Tal."),
    ],

    // Spark 3: The first instruction
    [
      n("Maren emerges from two hours with the cipher with the expression of someone who has done something that needed doing and is now attending to the fact that it is done. She closes the cipher, refolds it, replaces it in the case, then turns to you."),
      d("MAREN", "left",  "thoughtful", "The first instruction of the method is a question. Not a practice, not a technique. A question."),
      d("KAEL",  "right", "neutral", "What's the question?"),
      d("MAREN", "left",  "neutral", "Do you know what you know?"),
      n("You wait for the clarification. She is watching you wait for it."),
      d("KAEL",  "right", "neutral", "That's the whole instruction?"),
      d("MAREN", "left",  "neutral", "The method is built on the assumption that most people answer yes to that question before they examine whether it is true. The first practice is to examine it. To take something you believe you know and hold it precisely — not loosely, not impressionistically — and determine whether what you have is the thing or a compressed version of the thing."),
      d("KAEL",  "right", "neutral", "And if it's compressed?"),
      d("MAREN", "left",  "neutral", "Then you decompress it. You go back to the source of the learning and you learn it again, this time precisely. Then you hold it. Then you ask the question again. Over time — weeks, months, the fragments are specific about the timeline — the practice changes the baseline. You stop accepting compression automatically."),
      n("She picks up the case."),
      d("MAREN", "left",  "neutral", "The original archivist describes the moment when the practice becomes automatic rather than effortful. They do not have a word for it. They describe it as the difference between carrying something and being something."),
      d("KAEL",  "right", "neutral", "You've done this."),
      d("MAREN", "left",  "neutral", "For nineteen years. Yes."),
    ],

    // Spark 4: Condition of the fragments
    [
      n("Before they leave the waystation, Maren takes ten minutes to re-examine each of the thirteen original fragments. Not reading — she has read them many times. She is checking something physical: the edge quality of the paper, the consistency of the ink, the condition of the oilcloth wrapping."),
      d("KAEL",  "right", "neutral", "What are you checking for?"),
      d("MAREN", "left",  "neutral", "I want to know if anything has happened to these since I made them. Not the originals — my copies. I copied them myself three weeks ago. The condition of my copies tells me if someone has examined them."),
      d("KAEL",  "right", "neutral", "They've been in the case."),
      d("MAREN", "left",  "neutral", "The case keeps humidity out and prevents physical damage. It does not prevent someone with careful hands from examining the contents. I want to know if they were examined since the Archive."),
      n("She finishes the thirteenth. Looks at them all, fanned slightly."),
      d("MAREN", "left",  "neutral", "Undisturbed. All thirteen."),
      d("KAEL",  "right", "neutral", "And the fourteenth?"),
      d("MAREN", "left",  "neutral", "The fourteenth is at the bottom of the case. I have not read it yet."),
      d("KAEL",  "right", "neutral", "You've had it for two days."),
      d("MAREN", "left",  "neutral", "I know. I want to be somewhere still before I read it. Not here."),
      n("She closes the case. Three clicks. Outside: the forest road east, two days of walking, and a stopping place Dorath believes is clean."),
    ],

    // Spark 5: The question behind the 14th
    [
      n("On the forest road, moving again, Ryn falls into step beside you. The path is narrow enough here that the group naturally pairs — Dorath ahead, Maren behind her, you and Ryn at the back."),
      d("RYN",  "right", "quiet",   "She's not going to open the fourteenth fragment until she thinks she knows who wrote it."),
      d("KAEL", "right", "neutral", "She said she'll read it somewhere still."),
      d("RYN",  "right", "quiet",   "That's what she said. But watch her. Every time the case comes out, she goes through the first thirteen. She doesn't touch the fourteenth."),
      n("You think about this."),
      d("KAEL", "right", "neutral", "She's afraid it changes something."),
      d("RYN",  "right", "quiet",   "I think she believes it will confirm something she already suspects. And she's waiting until she has enough of the other pieces to know whether the confirmation is welcome."),
      d("KAEL", "right", "neutral", "What does she suspect?"),
      d("RYN",  "right", "quiet",   "I don't know. But watch her face when the fourteenth comes up. It does a specific thing."),
      n("You watch. For the rest of the day, Maren's face does exactly the thing Ryn described: not anxiety, not dread. The expression of someone who already knows the answer to a question and is not yet ready to hear themselves confirmed."),
      n("The forest closes in. The path narrows. The light is filtered green and grey. Somewhere ahead is the place where Maren will read it. And then you will know what she already knows, and the question will become not 'what does it say' but 'what does it mean for what comes next.'"),
    ],

    // Spark 6: What was in Tal's cloth
    [
      n("The cloth Dorath identified as Tal's is still on the waystation table. In the urgency of the figure leaving the outbuilding before dawn, nobody opened it. In the clear morning light you ask."),
      d("KAEL",   "right", "neutral",    "Are we going to open it?"),
      d("MAREN",  "left",  "neutral",    "Yes. Here, before we leave."),
      n("She unfolds it herself — not because she is the authority, but because her hands are steadiest. Inside: a folded paper and a second wrapping, empty now, the cloth compressed by whatever it had held. The outer cloth is Tal's wrapping pattern. The inner cloth is not."),
      d("DORATH", "left",  "neutral",    "Two sources. She wrapped the outer. Someone else wrapped whatever was inside."),
      d("RYN",    "right", "quiet",      "Or she used cloth she found elsewhere."),
      d("MAREN",  "left",  "neutral",    "The paper."),
      n("She reads it. Four lines in a notation close to the deep records' system. She reads it twice."),
      d("MAREN",  "left",  "neutral",    "Addressed to whoever finds it. It says: what this wrapped has been moved for safekeeping. It will be at the waypoint when you reach the waypoint. Do not try to carry what you do not need to carry."),
      d("KAEL",   "right", "neutral",    "What was the thing?"),
      d("MAREN",  "left",  "neutral",    "I don't know. The note is designed so that if the wrong person finds it, it tells them nothing useful."),
      d("KAEL",   "right", "neutral",    "And to us?"),
      d("MAREN",  "left",  "neutral",    "That Tal moved something east before she left the waystation. And that the something is waiting for us — wherever the waypoint is."),
      n("She folds the paper and replaces it. The empty inner cloth sits on the table. They leave the waystation with one more question than they arrived with, and whatever Tal's waypoint holds, it is east and not yet known."),
    ],

    // Spark 7: The keeper's practice
    [
      n("The waystation keeper comes to clear the table before they leave. He works around the four of you with the efficiency of someone who has been doing this since before any of you could walk — precise, unobtrusive, entirely without curiosity about the case or the group or the reason four people were in his building before dawn."),
      d("KAEL",   "right", "neutral",    "How long has this place been operating?"),
      d("KEEPER", "left",  "neutral",    "Before my time. My father ran it."),
      d("KAEL",   "right", "neutral",    "Your father didn't ask either."),
      n("The keeper looks at him for the first time — a direct look, neither warm nor cold."),
      d("KEEPER", "left",  "neutral",    "No. He didn't."),
      n("He goes back to clearing. Dorath watches this exchange with the expression of someone watching an experiment with a known result."),
      d("DORATH", "left",  "neutral",    "He's not ignorant. He simply understands that not knowing is a service he provides."),
      d("KAEL",   "right", "neutral",    "He doesn't want to know."),
      d("DORATH", "left",  "neutral",    "It would complicate his position. People who use this waystation are usually carrying something or doing something that benefits from his silence. His silence is worth more to them than his knowledge. He has priced himself accordingly."),
      n("The keeper finishes and moves to the back of the building without further conversation. You shoulder your pack. The fire has burned down to its maintenance level. Outside, the forest road east begins at the junction twenty yards from the door."),
      d("KAEL",   "right", "neutral",    "Does he know who Dorath is?"),
      d("DORATH", "left",  "neutral",    "He knows me as someone who pays correctly and leaves no problems. That is the entirety of what he needs to know."),
      n("She walks out. The keeper does not come to the door. The sound of his clearing the back room is audible until the junction takes you out of range of the building, and then it is not."),
    ],

    // Spark 8: The fragments in sequence
    [
      n("On the forest road — the second hour — you ask Maren to describe the fragments in order. Not to read them, not to open the case. Just to tell you what each one is."),
      d("MAREN",  "left",  "neutral",    "Why do you want the sequence?"),
      d("KAEL",   "right", "neutral",    "Because I hold them as a pile of things. I want to hold them as a progression."),
      n("A pause. Then she begins."),
      d("MAREN",  "left",  "neutral",    "Fragment one: the question. What the method begins with. A paragraph. The original archivist was very young when they wrote it — you can tell by the writing. Certain about the question, uncertain about everything else."),
      d("MAREN",  "left",  "neutral",    "Fragment two: the error. Written later. Describes specifically what they got wrong about the first practice, and how they knew they had gotten it wrong."),
      d("KAEL",   "right", "neutral",    "They documented the failure before the success."),
      d("MAREN",  "left",  "neutral",    "Always. The fragments are structured this way throughout — you learn what they did wrong before you learn what they did right. By the fourth fragment the writing has changed — longer sentences, denser construction, more precise language for internal states."),
      d("KAEL",   "right", "neutral",    "Because the practice changed how they used language."),
      d("MAREN",  "left",  "neutral",    "The later fragments are written by someone who has had nineteen more years of practice than the person who wrote the first. It reads that way."),
      n("You walk. Above the forest canopy, the sky is grey and even. Maren continues through six, seven, eight — each one longer than the last, each one denser. By the time she reaches the thirteenth, her voice has the quality of someone reading from memory that has never been anything other than exact."),
      d("KAEL",   "right", "neutral",    "And the fourteenth."),
      d("MAREN",  "left",  "neutral",    "Different hand. Different person. Written two hundred years later. And placed in my case by someone who understood it was relevant."),
      n("She does not describe what it contains."),
    ],

    // Spark 9: Dorath reads the road before the forest
    [
      n("Before entering the forest Dorath stops at the tree line and reads the path in both directions. You watch her work."),
      d("KAEL",   "right", "neutral",    "What do you see?"),
      d("DORATH", "left",  "neutral",    "Last use: four days ago. Single traveler, moving east. Knew the road."),
      d("KAEL",   "right", "neutral",    "Four days ago — before us, before the waystation."),
      d("DORATH", "left",  "neutral",    "Yes. They weren't at the waystation — the keeper would have mentioned them, and their path to the forest road would have passed the junction. They entered the forest from somewhere else."),
      n("She points to the right side of the road, where the tree line and the cleared verge meet."),
      d("DORATH", "left",  "neutral",    "There is a second path. Parallel to this one. Runs south of the forest for the first four miles and then rejoins the road. Adds a day and a half. I know about it from Eran's survey work — it is not on the current provincial maps."),
      d("KAEL",   "right", "neutral",    "Why would someone take a path that adds a day and a half?"),
      d("DORATH", "left",  "neutral",    "To come out at the forest road junction from the south, rather than from the waystation from the west. If you are watching the main road for us, you are watching the western approach. The southern approach is unwatched."),
      n("She looks at the parallel path's entrance — a gap in the undergrowth, nearly invisible unless you know what you're looking for."),
      d("DORATH", "left",  "neutral",    "Our four-day-old traveler used the southern path and entered the forest from the southern junction. Which means they know about that junction. That takes knowledge of the territory, or knowledge of Eran's surveys."),
      d("KAEL",   "right", "neutral",    "Or both."),
      d("DORATH", "left",  "neutral",    "Yes."),
      n("She enters the forest road without looking back at the parallel path. You follow. The gap in the undergrowth closes behind you, swallowed by the shadows."),
    ],

    // Spark 10: Practice under distraction
    [
      n("The forest road and the practice do not combine well. You try for two hours to hold the first fragment's third instruction precisely — not the summary but the exact words — and fail each time within twenty seconds. The forest is too full of things to notice."),
      d("MAREN",  "left",  "neutral",    "You're fighting the environment."),
      d("KAEL",   "right", "neutral",    "The instructions say the practice eventually works in any conditions."),
      d("MAREN",  "left",  "neutral",    "Eventually. Not at the beginning. You are trying to do something in forest conditions that experienced practitioners can barely maintain in clean conditions. You will be frustrated."),
      d("KAEL",   "right", "neutral",    "The fragments describe this as a stage?"),
      d("MAREN",  "left",  "neutral",    "Fragment two. The specific error it describes is exactly this one — the practitioner trying to hold the practice while managing their environment and finding that the environment wins. Every time."),
      d("KAEL",   "right", "neutral",    "What did the original archivist do?"),
      d("MAREN",  "left",  "neutral",    "They stopped trying to hold it in busy conditions and practiced only in quiet ones. For three months. Then they tried the busy conditions again and found the practice had become more robust without their specifically training for that."),
      d("KAEL",   "right", "neutral",    "So I should stop trying now."),
      d("MAREN",  "left",  "neutral",    "I did not say that."),
      n("You try again. A bird takes flight thirty yards to the right — a sharp sound and then gone. The instruction slips. You find it again. Hold it for eight seconds before a root catches your foot and the stumble takes your attention. You start again. The forest does not care about your practice. That is, you realize slowly, exactly the point."),
    ],

    // Spark 11: Ryn teaches sign
    [
      n("Ryn crouches at a muddy section of the forest path and shows you something: two lines in the surface, close together, running parallel for eight inches and then diverging."),
      d("RYN",    "right", "quiet",      "What do you see?"),
      d("KAEL",   "right", "neutral",    "Marks. Animal tracks? Two toes."),
      d("RYN",    "right", "quiet",      "Not toes. The heel of a boot. Narrow-soled. Whoever made this track stopped here, pivoted on the right heel, and changed direction. The left foot came down here—"),
      n("She points to a slight compression six inches away."),
      d("RYN",    "right", "quiet",      "—and then they went a few steps into the tree line and came back onto the path. They heard something in the trees."),
      d("KAEL",   "right", "neutral",    "What did they do after?"),
      d("RYN",    "right", "quiet",      "Continued east. Normal pace."),
      n("She stands, wipes her hand on her coat."),
      d("KAEL",   "right", "neutral",    "How do you know they continued east?"),
      d("RYN",    "right", "quiet",      "Because their footprints continue east. Most things are simpler than they look."),
      d("KAEL",   "right", "neutral",    "But the initial read isn't simple."),
      d("RYN",    "right", "quiet",      "No. The initial read requires learning what ordinary looks like so you can recognize extraordinary. It takes a long time to learn ordinary. The extraordinary is easy once you have that."),
      n("She walks east. Ahead, the path curves and you lose sight of the next fifty yards. Whatever the traveler stopped to listen to, it did not stop them. You follow the track they made, reading it like a transcript of a decision made and unmade in the space of ten steps."),
    ],

    // Spark 12: Three-press check — what it has revealed
    [
      n("The evening camp. Maren performs the three-press check. You watch without asking — you have watched it twenty times now and the rhythm of it is as familiar as the rhythm of her walking. But tonight she pauses on the third press."),
      d("KAEL",   "right", "neutral",    "What is it?"),
      d("MAREN",  "left",  "neutral",    "The pressure seal has shifted slightly. Environmental — we've had two hours in damp conditions and the wood frame tends to absorb moisture."),
      d("KAEL",   "right", "neutral",    "Not tampered with."),
      d("MAREN",  "left",  "neutral",    "No. I would know. But I want you to see the difference, since you're watching."),
      n("She demonstrates both states — the seal correctly pressed and the seal at its current slight displacement. The difference is small but distinct when she names it."),
      d("KAEL",   "right", "neutral",    "You've found it tampered with before."),
      d("MAREN",  "left",  "neutral",    "Three years ago. The pressure seal was off by an amount exactly like this, but not caused by moisture — the humidity was low that week. And it had been correctly sealed when I last checked it."),
      d("KAEL",   "right", "neutral",    "Someone opened it."),
      d("MAREN",  "left",  "neutral",    "Someone with careful hands and knowledge of the seal mechanism. Four people had access. Three I have since verified had no reason to examine it. The fourth—"),
      n("She adjusts the seal, presses twice, checks again."),
      d("MAREN",  "left",  "neutral",    "I increased the distance I kept from the fourth person. Not accusation. Precaution."),
      d("KAEL",   "right", "neutral",    "Was anything taken?"),
      d("MAREN",  "left",  "neutral",    "Nothing physical. What they may have read and remembered — I have no way to determine."),
      n("She closes the case. Three presses: good. Good. Good. The forest camp is quiet. The fire has found its rhythm. Somewhere in the case, the fourth person's curiosity lives on as a fact she cannot verify and has not stopped calculating."),
    ],

    // Spark 13: Night sounds
    [
      n("Second night on the forest road. Your watch. The hour before dawn — the particular silence before the first birds, when the darkness is densest and the world is holding itself ready for something."),
      n("You hold your position and practice the watch as Maren described: note the pattern, mark the changes, trust what you have learned and not what you expect. The forest's pattern at this hour is: wind variable northeast, light. A creek sixty yards south, consistent. Owls: two, separate territories. Rodent activity in the undergrowth, periodic."),
      n("At the forty-five-minute mark, the rodent activity stops. Not gradually — completely. Then resumes three minutes later."),
      n("You note it. At the two-hour mark, you wake Ryn and describe it."),
      d("RYN",    "right", "quiet",      "How long for the stop?"),
      d("KAEL",   "right", "neutral",    "About three minutes. Everything at once."),
      d("RYN",    "right", "quiet",      "Something moved through the north edge of the tree line. Large enough to silence the small-animal activity — deer weight, at minimum. Could be coincidence."),
      d("KAEL",   "right", "neutral",    "Or not."),
      d("RYN",    "right", "quiet",      "Or not. I'll listen."),
      n("She takes position. You wrap yourself in your blanket and lie down but do not close your eyes. The forest makes its sounds. Dawn comes slowly from the east. When Ryn wakes you for departure, she says only:"),
      d("RYN",    "right", "quiet",      "The stop happened again. Same direction. Same duration. Two hours after you came off watch."),
      n("She says it with the neutrality of someone noting a pattern. Not alarmed. Not unalarmed. Recording."),
    ],

    // Spark 14: What the figure at the waystation meant
    [
      n("Third day, midday rest. Dorath brings up the figure from the waystation outbuilding — the one that heard everything and left at dawn. She hasn't spoken about it since it happened."),
      d("DORATH", "left",  "neutral",    "The figure who left the outbuilding. I've been running the possibilities."),
      d("KAEL",   "right", "neutral",    "Tell me."),
      d("DORATH", "left",  "neutral",    "Four options. Voss's observer — placed at the waystation to watch for travelers matching our description and our cargo. A freelance watcher — someone paid to track and report, not to act. Someone from Eran's old network I don't know about. Or Tal."),
      d("KAEL",   "right", "neutral",    "Tal? She left a message for you. She didn't need to hide in an outbuilding."),
      d("DORATH", "left",  "neutral",    "Unless she was at the outbuilding for a different reason. Checking the waystation for another party. Not watching for us specifically."),
      d("RYN",    "right", "quiet",      "The keeper said someone asked about the document case."),
      d("DORATH", "left",  "neutral",    "Right. Which removes option four. Tal would know the case — she knows Maren, she knows what Maren carries. She would not need to ask."),
      n("The field narrows. Dorath is working through it methodically, not with urgency but with the patience of someone who has been doing this kind of accounting her entire professional life."),
      d("DORATH", "left",  "neutral",    "The question about the case narrows it to someone with partial information. They know the case exists. They don't know what it contains. They were trying to identify it by confirmation rather than by description."),
      d("KAEL",   "right", "neutral",    "Someone told them to watch for a case."),
      d("DORATH", "left",  "neutral",    "Someone who knows Maren carries one, but not what it looks like specifically. That is a specific level of proximity. Not inside the group. Not far outside."),
      n("She finishes eating. The rest of the accounting will have to wait until she has more evidence. But the shape of the outsider — partial information, given by someone close enough to know about the case but not close enough to describe it — settles in the space between them."),
    ],

    // Spark 15: The figure with the signal — CLIFFHANGER
    [
      n("Fourth day, mid-afternoon. The tree line ends. The road emerges from the forest into low hills — the first open ground they have had in three days. Dorath checks behind: nothing. Checks ahead."),
      d("DORATH", "left",  "neutral",    "Someone on the road. Ahead. Coming this way."),
      n("A figure, two hundred yards, walking steadily with no particular urgency. Light pack. The specific walk of someone who knows this road by heart."),
      d("MAREN",  "left",  "neutral",    "Maintain pace."),
      n("At one hundred yards: medium build, travel-worn coat. Not hurrying. Not slowing. At eighty yards, the figure raises one hand — two fingers held apart, a third below. Not a greeting. A specific signal."),
      d("DORATH", "left",  "quiet",      "Don't react."),
      n("You don't. The signal is Dorath's network recognition sign — the specific three-finger arrangement she described in the very first days. You have never seen anyone else use it. You walk as if you have not recognized it."),
      n("Fifty yards. Close enough to see the face. Young — younger than expected. Steady eyes, no apparent surprise at finding four people on a road few people use. They hold the signal for one more step, then let the hand drop."),
      d("KAEL",   "right", "quiet",      "Should we—"),
      d("DORATH", "left",  "quiet",      "Wait."),
      n("The figure walks past you at six feet. Does not speak. Does not look directly. As they move past, Dorath exhales once — something between confirmation and question. When the figure is thirty feet behind you, Dorath says, without turning:"),
      d("DORATH", "left",  "neutral",    "That is not anyone from my network. Which means someone gave them my signal. Which means either my network has been compromised, or someone is using that signal to pass us a message they cannot deliver any other way."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 6 — The First Practice
  // Setting: forest road east
  // Characters: Player, Maren, Ryn, Dorath
  // ═══════════════════════════════════════════════════════════════════════════
  w6: [

    // Spark 1: Failing and finding
    [
      n("Maren gave you the first practice three days ago and since then you have been attempting it at every opportunity — walking, resting, lying awake at camp. The instruction is simple: take something you know precisely, hold it exactly, and verify that what you're holding is the thing and not a summary of the thing. The practice is not simple."),
      d("KAEL",  "right", "neutral", "It keeps slipping. I hold it and then something else enters and the first thing is — compressed."),
      d("MAREN", "left",  "neutral", "Yes. That is the normal pattern. The fragments describe this as the first resistance."),
      d("KAEL",  "right", "neutral", "How long does it take to get past it?"),
      d("MAREN", "left",  "neutral", "The fragments give a range. Between three weeks and three months, depending on the foundation you have coming in. What you built at the Archive gives you a stronger foundation than most."),
      d("KAEL",  "right", "neutral", "Three weeks to three months. And that's normal."),
      d("MAREN", "left",  "neutral", "The original archivist was specific about this. They describe their own early practice with candor — the frustration of thinking the thing is held and then finding it slipped while they looked elsewhere. They say the error is treating holding as a static act when it is actually a continuous one."),
      d("KAEL",  "right", "neutral", "Continuous."),
      d("MAREN", "left",  "neutral", "You don't hold a thing and then stop holding it. You hold it and continue to hold it. The practice is not one act. It is an ongoing act."),
      n("You walk. You try again. The fragment of text you've been working with comes in clearly for a moment — sharp and specific, the exact wording and not the summary. Then a tree branch catches your eye and the moment contracts. You start again. It is not discouraging. It is simply work."),
    ],

    // Spark 2: Ryn begins
    [
      n("Ryn has not started the practice yet. You've noticed — she received the same briefing from Maren, clearly heard the instructions, but has not done the obvious thing of beginning. You ask."),
      d("KAEL", "right", "neutral", "You haven't started the practice."),
      d("RYN",  "right", "quiet",   "I've been thinking about whether I want to."),
      d("KAEL", "right", "neutral", "What's the question?"),
      d("RYN",  "right", "quiet",   "The method preserves what you hold. What you know. But what I know is mostly how to notice things and move through places without being noticed. I'm not sure that's what the method is designed for."),
      d("KAEL", "right", "neutral", "The method is designed for knowledge. Any knowledge."),
      d("RYN",  "right", "quiet",   "That's what the fragments say. What I wonder is whether the kind of knowing I do — procedural, practical, how-to — responds the same way as the kind of knowing that comes from text and study."),
      n("You think about this. You don't have an answer. Neither does she — she's raising the question genuinely."),
      d("KAEL", "right", "neutral", "Ask Maren."),
      d("RYN",  "right", "quiet",   "I'm thinking about how to ask it precisely. The question I have doesn't have exact language yet."),
      d("KAEL", "right", "neutral", "Does it need exact language first?"),
      n("She looks at you sideways — the almost-expression she uses when something lands unexpectedly."),
      d("RYN",  "right", "quiet",   "Apparently not."),
      n("That evening she approaches Maren with a question you cannot hear. Maren's answer takes three minutes. When Ryn returns to the fire, she begins the practice for the first time, sitting very still, eyes open, attending to something internal with cautious concentration."),
    ],

    // Spark 3: Eran through Dorath
    [
      n("Midday break on a flat stone that catches the sun. Dorath has been uncharacteristically quiet since the waystation. She eats, checks the road, eats more. When she speaks it is without preamble."),
      d("DORATH", "left",  "neutral", "Eran talked about the method the way people talk about things they cannot fully transmit. He understood it well enough to recognize when someone else was near it. He could not do it himself."),
      d("KAEL",   "right", "neutral", "Why not?"),
      d("DORATH", "left",  "neutral", "He said the prerequisite was a particular kind of foundation — a body of material worked through precisely and deeply over time. His work was in the field, not in study. He had broad shallow knowledge and very specific deep knowledge, but not the even, layered foundation the method requires."),
      d("KAEL",   "right", "neutral", "He understood what he didn't have."),
      d("DORATH", "left",  "neutral", "He was honest about it. He spent a year trying and understood after a year what the limit was. After that he put his energy into supporting people who could have what he couldn't."),
      d("KAEL",   "right", "neutral", "The network."),
      d("DORATH", "left",  "neutral", "Support for the Archive, support for the people doing the work. He spent twelve years building the infrastructure for a result he would not personally achieve. He called it—"),
      n("She stops. Looks at the flat stone."),
      d("DORATH", "left",  "neutral", "He called it the most important work he could do."),
      n("She finishes eating. Stands. The road east is visible around the next bend. She adjusts the strap of her pack with the same care she does everything and walks. You follow. Behind you, the sun has moved off the flat stone already."),
    ],

    // Spark 4: Maren's reading pace
    [
      n("Maren has been reading the fourteenth fragment since they stopped for a midday meal and it is now an hour past midday and she has not finished. Not because it is long — you've seen the size of it. Because she is reading it precisely and not moving on from any section until she has the exact content and not the summary."),
      d("KAEL",  "right", "neutral", "You do this with everything you read."),
      d("MAREN", "left",  "neutral", "Everything that matters. Yes."),
      d("KAEL",  "right", "neutral", "How do you decide what matters?"),
      d("MAREN", "left",  "neutral", "Anything I might need to act on. Anything I might need to transmit to someone else accurately. Anything whose details might change the meaning if I get them slightly wrong."),
      d("KAEL",  "right", "neutral", "That's most things."),
      d("MAREN", "left",  "neutral", "Yes. The Vraen practice, at its final stage, makes this automatic. You don't need to decide. Everything comes in precisely because that is simply how your mind handles incoming material. But before you reach that stage, you decide."),
      d("KAEL",  "right", "neutral", "And you've been deciding for nineteen years."),
      d("MAREN", "left",  "neutral", "The automatic stage — I reached it fourteen years ago."),
      n("You stop walking. She does not."),
      d("KAEL",  "right", "neutral", "You completed it."),
      d("MAREN", "left",  "neutral", "I completed it. Yes."),
      n("She says it with the tone of someone confirming a known fact. The implications take several minutes of walking to begin to unfold."),
    ],

    // Spark 5: The message arrives
    [
      n("They are two hours from what Dorath calls the junction — a fork in the forest road where the settlement district begins. The trees are thinning. The path is widening. The particular quality of the light through dense tree cover has given way to the thinner light of approaching open ground."),
      d("DORATH", "left",  "neutral", "Someone is coming up the road behind us."),
      n("Not alarm in her voice. Observation."),
      d("MAREN",  "left",  "neutral", "Pace?"),
      d("DORATH", "left",  "neutral", "Faster than ours. Single person. Not trying to be quiet."),
      d("KAEL",   "right", "neutral", "Deliberately audible. They want us to know they're coming."),
      d("DORATH", "left",  "neutral", "Or they're moving fast and don't care whether they're heard."),
      n("They stop in a wider section where the trees allow space on both sides. Wait. The footsteps resolve into a person — a courier, carrying the specific pouch of someone paid to deliver something at a specific address and find whoever holds that address wherever they happen to be."),
      d("COURIER", "left",  "neutral", "Which of you is Maren?"),
      d("MAREN",   "left",  "neutral", "I am."),
      n("He hands over a folded message without a seal — the kind of message that has no return address because the sender is not in a position to receive replies. The courier is already turning to leave before Maren has fully unfolded it."),
      n("She reads. Her face does the thing it does when information lands in the precise slot where she expected information to land, confirming something she had computed but not yet confirmed. Not surprise. Completion."),
      n("She passes it to you without speaking. The message is four words."),
      n('"The passage was open on purpose."'),
    ],

    // Spark 6: Unpacking the message
    [
      n("The message — four words, no signature, delivered by a courier with a specific address — sits with all of them for an hour before Maren opens it for discussion."),
      d("MAREN",  "left",  "neutral",    "The passage was open on purpose. Let's establish what that means precisely."),
      d("KAEL",   "right", "neutral",    "Someone opened it deliberately before the fire."),
      d("MAREN",  "left",  "neutral",    "Before. Not in response to the fire. Before it started."),
      d("DORATH", "left",  "neutral",    "Someone knew the fire was coming."),
      d("MAREN",  "left",  "neutral",    "Someone knew the fire was coming, had access to the Archive's lower level, knew about the passage, and made a decision to open it — in advance — so that we would have it when we needed it."),
      d("RYN",    "right", "quiet",      "The presence on the other side of the door. The one we felt before you came through."),
      d("MAREN",  "left",  "neutral",    "Whoever was holding it from the inside."),
      d("KAEL",   "right", "neutral",    "Serath."),
      d("MAREN",  "left",  "neutral",    "Possibly. Or someone who Serath arranged. Or someone who acted without Serath's knowledge."),
      d("KAEL",   "right", "neutral",    "How many people knew the passage existed?"),
      d("MAREN",  "left",  "neutral",    "I knew. Serath knew. And whoever sent this message was telling us they know — which means they know about the passage too."),
      n("She folds the message and puts it in her coat. The forest road continues east. The knowledge that their escape was prepared for them, by someone who knew enough to prepare it, does not comfort. It obligates. Someone arranged for them to survive. That changes the shape of what comes next."),
    ],

    // Spark 7: What Maren already knew
    [
      n("Two hours after the message, you walk beside Maren and ask the question you have been holding."),
      d("KAEL",   "right", "neutral",    "Did you already know the passage was open on purpose?"),
      n("A pause. Not evasion — she is deciding how accurate to be."),
      d("MAREN",  "left",  "neutral",    "I suspected it. Since day two. There were timing details that didn't fit accidental discovery."),
      d("KAEL",   "right", "neutral",    "What details?"),
      d("MAREN",  "left",  "neutral",    "Ryn was in the passage for two hours before we arrived. The presence on the other side was there the full two hours. A person who had discovered the passage accidentally in the course of the fire's chaos would not have stood there for two hours."),
      d("KAEL",   "right", "neutral",    "They waited."),
      d("MAREN",  "left",  "neutral",    "They were stationed there. With intent. They left when we were through — I heard the outer door open and close after I came out."),
      d("KAEL",   "right", "neutral",    "You didn't say anything."),
      d("MAREN",  "left",  "neutral",    "I had a suspicion. Now I have confirmation. The difference matters."),
      d("KAEL",   "right", "neutral",    "What changes with confirmation?"),
      d("MAREN",  "left",  "neutral",    "Now I can act on it instead of only thinking about it."),
      n("She does not elaborate. You walk. Whatever Maren has been holding about the Archive night and who arranged what and why, it is now confirmed enough to act on. Which means she is already planning something she has not yet told you."),
    ],

    // Spark 8: Dorath's surprise
    [
      n("Dorath has been quiet since the message. The kind of quiet that in Dorath means active recalculation. That evening you find her at the edge of the camp, looking east at nothing in particular."),
      d("KAEL",   "right", "neutral",    "Tell me."),
      d("DORATH", "left",  "neutral",    "My network's evacuation plan did not include the Archive's passage. I planned for exits I knew about. I did not know about a planned preparation of that passage."),
      d("KAEL",   "right", "neutral",    "Eran's network, then. Not yours."),
      d("DORATH", "left",  "neutral",    "Or something older than either. Eran died before I knew the passage existed. If he arranged this, he arranged it years before his death and never told me."),
      d("KAEL",   "right", "neutral",    "Is that surprising? He kept things separate."),
      d("DORATH", "left",  "neutral",    "He kept the network's structure separate. He did not keep purposes from me. We discussed everything about what we were trying to do and why. But this—"),
      n("She stops. Her hand moves — the slight adjustment she makes when recalculating."),
      d("DORATH", "left",  "neutral",    "This required someone with direct access to the Archive's foundation. Not just knowledge that the passage existed, but the ability to reach it and hold it without being seen. Eran did not have that access. Whoever arranged this was inside the building."),
      d("KAEL",   "right", "neutral",    "The insider."),
      d("DORATH", "left",  "neutral",    "Someone who was working for Voss and yet opened a passage for us. Which means either the arrangement is more complicated than I thought, or the insider had reasons I don't know about."),
      n("She stands in the east-facing quiet for another minute. Then comes back to the fire. The calculation is not resolved. She will carry it until it is."),
    ],

    // Spark 9: Ryn approaching threshold
    [
      n("The fourth day on the forest road. Ryn has been practicing since the second week and in the past two days something in her practice has shifted — you can tell by the specific quality of her attention when she is doing it. Less effortful."),
      d("KAEL",   "right", "neutral",    "You're close to the first threshold."),
      d("RYN",    "right", "quiet",      "I think so. I've been holding the same record since this morning — the eastern access list I copied at the Archive. Every name, every date, every transition point."),
      d("KAEL",   "right", "neutral",    "Exactly?"),
      d("RYN",    "right", "quiet",      "Exactly. Not approximately, not closely. Exactly. And I didn't feel it slip once while we were walking."),
      n("You both know what this means: the practice is moving from foreground to background, from effortful to structural. The first threshold, approaching."),
      d("KAEL",   "right", "neutral",    "What does it feel like?"),
      d("RYN",    "right", "quiet",      "Like holding something very carefully and then realizing it's sitting on a surface and you didn't put it there. The holding stopped being an act."),
      d("KAEL",   "right", "neutral",    "That's the threshold."),
      d("RYN",    "right", "quiet",      "Maybe. I want to wait before I say it."),
      d("RYN",    "right", "quiet",      "Maren said I should not announce it until I have held the same material for three days without a slip. This is day one."),
      d("KAEL",   "right", "neutral",    "Two more days."),
      d("RYN",    "right", "quiet",      "Two more days."),
      n("She returns her attention to the road. The access list is still there, precise, without compression. She is counting days now as well as steps."),
    ],

    // Spark 10: Who sent the message
    [
      n("The question of the message's sender. Maren has been working it without discussion and now, at the midday rest, brings the result."),
      d("MAREN",  "left",  "neutral",    "The message. I have been examining the courier's hand versus the writer's hand. The courier delivered it — he did not write it. Whoever wrote it used a notation form I recognize."),
      d("KAEL",   "right", "neutral",    "Who uses it?"),
      d("MAREN",  "left",  "neutral",    "The notation form is specific to people trained in the Archive's private communication system. There were seven of us who trained in it formally. The others are Ryn, Serath, and four people I've had no contact with for years."),
      d("RYN",    "right", "quiet",      "You're ruling out Serath because he left the Archive on foot."),
      d("MAREN",  "left",  "neutral",    "Serath could have arranged for a courier in advance. I am not ruling him out. But the message reached us at a specific junction at a specific time. Someone knew our route precisely."),
      d("KAEL",   "right", "neutral",    "Or knew where we'd be."),
      d("MAREN",  "left",  "neutral",    "The message was given to the courier at the junction settlement. Not here. They knew we would reach the junction within a specific window."),
      d("DORATH", "left",  "neutral",    "Who else knew our route?"),
      d("MAREN",  "left",  "neutral",    "Tal knew the direction. Not the specific path. The junction — that is our route, not a standard route. Someone who knew enough to predict our path. Or who has been watching it."),
      n("The midday rest ends. The question of the sender settles into the ongoing accounting — another fact that does not yet have a name."),
    ],

    // Spark 11: Something shifts
    [
      n("The fifth day on the forest road and something in the practice resolves on its own while you are not attending to it."),
      n("You have been working with fragment one, third instruction, for two weeks. This morning it is there — not retrieved, not held against the backdrop of other things. Present. The way the shape of a room becomes present once you know it well enough: not examined, not recalled, simply part of what you already have."),
      d("KAEL",   "right", "neutral",    "Maren."),
      d("MAREN",  "left",  "neutral",    "Mm."),
      d("KAEL",   "right", "neutral",    "The third instruction of the first fragment. I think it has—"),
      d("MAREN",  "left",  "neutral",    "Tell me."),
      d("KAEL",   "right", "neutral",    "It's not something I'm holding anymore. It's just there."),
      n("She looks at you — the direct look she uses when she is verifying rather than evaluating."),
      d("MAREN",  "left",  "neutral",    "Has it slipped today?"),
      d("KAEL",   "right", "neutral",    "No."),
      d("MAREN",  "left",  "neutral",    "Since you noticed it was different?"),
      d("KAEL",   "right", "neutral",    "No. That was three hours ago."),
      d("MAREN",  "left",  "neutral",    "Wait three days. If it has not slipped after three days, you are at the first threshold."),
      n("She continues walking. The road is narrowing — the settlement junction is less than a day ahead. But you hold the third instruction in the back of your mind as you walk, and it holds itself, and the specific relief of something that has been effortful becoming structural is very small and very complete."),
    ],

    // Spark 12: Settlement ground ahead
    [
      n("Sixth day. The forest gives way to managed woodland — trees that have been thinned and maintained, a specific kind of cultivated quiet. The road widens slightly. Posts appear at intervals, weathered, marking something administrative rather than navigational."),
      d("DORATH", "left",  "neutral",    "Settlement district boundary. We are on managed land from here."),
      d("KAEL",   "right", "neutral",    "Are we expected?"),
      d("DORATH", "left",  "neutral",    "We have a mapping contract that gives us reason to be in the district. If questioned, we are surveyors working the eastern extension."),
      n("The change in the trees is subtle but distinct — someone's hand in the landscape, the selective removal of low growth, the evidence of planning. You have been in wilderness and city and road between them, and the settlement district is a different category: inhabited, shaped, but not dense. Space with intent."),
      d("RYN",    "right", "quiet",      "Someone is watching this road."),
      d("DORATH", "left",  "neutral",    "Standard district practice. Not Voss — this is ordinary administrative observation. Anyone using this road is being counted."),
      d("RYN",    "right", "quiet",      "Where?"),
      d("DORATH", "left",  "neutral",    "The third post. There's an observer behind it. Has been since we entered managed land."),
      n("You do not look at the post. The observer counts you among the travelers using this road on this day. Four people, a mapping kit. Nothing extraordinary. The observer makes a mark in their ledger, or will, and you pass by."),
    ],

    // Spark 13: Fourteen years
    [
      n("The revelation from earlier — that Maren completed the method fourteen years ago — has been sitting in you since she confirmed it. On the forest road's last stretch, you come back to it."),
      d("KAEL",   "right", "neutral",    "Fourteen years since you completed the fourteenth stage. What has that been like? In practical terms."),
      n("She walks for a moment before answering."),
      d("MAREN",  "left",  "neutral",    "The primary change was in how I receive information. Everything I encounter — spoken, written, observed — arrives precisely and without compression. I do not choose to hold it. It holds itself."),
      d("KAEL",   "right", "neutral",    "That sounds like — an enormous cognitive difference."),
      d("MAREN",  "left",  "neutral",    "It is a different baseline. Yes. For the first year I found the density uncomfortable — every conversation was a complete transcript rather than an impression. I learned to be more selective about what I attend to, because attending fully to everything was overwhelming."),
      d("KAEL",   "right", "neutral",    "And now?"),
      d("MAREN",  "left",  "neutral",    "Now it is ordinary. I have adapted to the baseline. The discomfort is a distant memory I hold, as it happens, precisely."),
      d("KAEL",   "right", "neutral",    "What do you do with it — with what you carry?"),
      d("MAREN",  "left",  "neutral",    "I use it. I teach from it. I make decisions with it that would be impossible otherwise. And I spend a significant portion of every year simply being a person, because carrying the complete record of everything you have ever attended to is a responsibility as much as a capacity."),
      n("She says 'a responsibility' with the tone of someone who arrived at that word after testing several others. The settlement junction post appears ahead through the trees. Three hours more."),
    ],

    // Spark 14: Before the junction
    [
      n("Half a mile from the junction. Ryn slows fractionally and you match her pace without thinking, letting the gap between yourselves and Maren and Dorath open."),
      d("RYN",    "right", "quiet",      "The access list. Two days now without a slip."),
      d("KAEL",   "right", "neutral",    "One more."),
      d("RYN",    "right", "quiet",      "One more. But it feels different from how it felt on day one. On day one I was checking it constantly. Now I only check it when I want to verify something specific. The maintenance has stopped being maintenance."),
      d("KAEL",   "right", "neutral",    "It's structural now."),
      d("RYN",    "right", "quiet",      "I think so."),
      n("The junction post is visible ahead — weathered stone, the road branching east and northeast. Beyond it, the settlement district opens into a wider valley."),
      d("KAEL",   "right", "neutral",    "When we meet Brek—"),
      d("RYN",    "right", "quiet",      "You think he came this way."),
      d("KAEL",   "right", "neutral",    "Maren said he was using the grain merchant cover. East gate. He would have come through the road east. Different route but this junction is a common junction."),
      d("RYN",    "right", "quiet",      "He'll have information we don't. He came through after us — he'll have seen what was behind us."),
      n("You both look at the junction. The settlement road beyond it is empty. The northeast fork curves away into a tree line. Nothing moves at the junction that you can see."),
      d("KAEL",   "right", "neutral",    "Dorath said Brek would find us. Not us find him."),
      d("RYN",    "right", "quiet",      "Then he's close. He's been close since the waystation."),
      n("She looks ahead, calculating something. Ahead: the junction. And there, at the junction stone, sitting with his back against it and his pack beside him: a person you know."),
    ],

    // Spark 15: Brek at the junction — CLIFFHANGER
    [
      n("Brek sits at the junction stone with the patience of someone who has been waiting for exactly as long as he calculated he would need to wait. He stands when he sees you, picks up his pack, and says:"),
      d("BREK",   "left",  "neutral",    "Maren. Someone is behind you."),
      d("MAREN",  "left",  "neutral",    "How many?"),
      d("BREK",   "left",  "neutral",    "One person. Two hours back, as of this morning. Moving at your pace. Not closing the gap — maintaining it."),
      d("MAREN",  "left",  "neutral",    "Surveillance."),
      d("BREK",   "left",  "neutral",    "That is my read. They have stayed exactly two hours behind since the waystation junction. Which means they know where you are going, or they are tracking you by ground sign. I couldn't tell which."),
      d("DORATH", "left",  "neutral",    "How did you find them?"),
      d("BREK",   "left",  "neutral",    "I came to the junction from the northeast. Different approach angle. I could see the road south for half a mile. They were at the bend — the same bend you would have come around. Sitting still. Waiting for you to start moving again."),
      n("The junction stone behind Brek casts a short shadow. The northeast fork curves away into the hills. The road south — the one you just came from — runs back to the forest."),
      d("KAEL",   "right", "neutral",    "They know we're at the junction now."),
      d("BREK",   "left",  "neutral",    "Yes. When we move, they'll move. Whatever they're doing, they are very good at the distance they're keeping."),
      n("Maren looks at the junction stone and then at the northeast fork and then at the road south."),
      d("MAREN",  "left",  "neutral",    "We cannot let them follow us into the settlement district."),
      d("BREK",   "left",  "neutral",    "No. What do you want to do about them?"),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 7 — Brek Arrives
  // Setting: the settlement road, meeting Brek
  // Characters: Player, Maren, Ryn, Dorath, Brek
  // ═══════════════════════════════════════════════════════════════════════════
  w7: [

    // Spark 1: Brek's road
    [
      n("Brek arrives in the way Brek does things — efficient, unhurried, with the specific quality of someone who has worked out the problem and is now doing the obvious thing the solution requires. He was running, but not from anything. He had been thinking for three days and was nearly done."),
      d("BREK",   "left",  "neutral", "I left two days after you. Different route. I had to move slowly through the eastern market district — they were watching the gates more carefully than usual."),
      d("MAREN",  "left",  "neutral", "How did you get through?"),
      d("BREK",   "left",  "neutral", "I work for a grain merchant on a contract basis. I have done deliveries through the eastern gate many times. They know my face. A face they know does not require the same inspection as a face they don't."),
      d("KAEL",   "right", "neutral", "Smart."),
      d("BREK",   "left",  "neutral", "Maren suggested I develop a legitimate reason to use the east gate when I arrived at the Archive. Two years ago. I thought it was overcautious at the time."),
      d("MAREN",  "left",  "neutral", "Most preparation seems overcautious until it doesn't."),
      d("BREK",   "left",  "neutral", "Yes."),
      n("He accepts water without ceremony and drinks it the way he runs — patiently, in proportion. You look at this person you spent three months working alongside at the Archive, who arrived here three days after the fire with a legitimate cover story and a message, and think about how much preparation was in the building around you that you didn't know about."),
      d("KAEL",   "right", "neutral", "Did Maren tell you everything she was preparing?"),
      d("BREK",   "left",  "neutral", "She told me what I needed for my piece of it. Not everything."),
      d("MAREN",  "left",  "neutral", "I told you what was necessary."),
      d("BREK",   "left",  "neutral", "You did. It was enough."),
    ],

    // Spark 2: What Brek observed
    [
      n("Brek's message — 'the passage was open on purpose' — has been sitting with Maren since the courier, and now that Brek is here she unfolds it."),
      d("MAREN",  "left",  "neutral", "The passage. Tell me what you observed."),
      d("BREK",   "left",  "neutral", "I went back the morning after the fire. Through the external entrance — the side of the building that was not burning. The passage door in the foundation was open. Not broken open. Open."),
      d("KAEL",   "right", "neutral", "Someone opened it from inside."),
      d("BREK",   "left",  "neutral", "From inside, yes. The mechanism works from one direction. Whoever opened it had access to the Archive's lower level and knew where the door was. Which narrows the list considerably."),
      d("MAREN",  "left",  "neutral", "What else?"),
      d("BREK",   "left",  "neutral", "The door was open for some time before anyone used it. The stone on the threshold had been disturbed by the door's movement — the disturbance was old enough that the dust had resettled. It had been open since well before the fire started."),
      n("Maren is very still."),
      d("KAEL",   "right", "neutral", "The presence that was pushing against the door when we arrived — it was already there."),
      d("BREK",   "left",  "neutral", "Whatever was on the other side had been there since the door was opened. Before the fire. Waiting."),
      d("MAREN",  "left",  "neutral", "Then the escape was prepared before the fire began."),
      d("BREK",   "left",  "neutral", "That is my conclusion. Yes. Someone wanted the passage open when you needed it. The fire was the signal, not the cause."),
    ],

    // Spark 3: Running through it
    [
      n("The afternoon. Brek runs the settlement road's perimeter — not fast, just the steady pace he holds. You run with him for a section. He does not talk while running, but you've learned that not talking is its own kind of discussion with Brek — it means he is working."),
      n("At the far end of his circuit he stops, stretches briefly, and speaks."),
      d("BREK",   "left",  "neutral", "Serath knew about the deep records for a year before the fire. He mentioned it once, before he went quiet."),
      d("KAEL",   "right", "neutral", "What did he say?"),
      d("BREK",   "left",  "neutral", "That he had found a section of the archive not listed in the public catalog. That it described a system for tracking people's progress in the method — a detection system, essentially. That someone had been accessing it regularly within the past year."),
      d("KAEL",   "right", "neutral", "Accessing it for what?"),
      d("BREK",   "left",  "neutral", "Making a list. That's what Serath thought. Identifying who was where in the method's stages."),
      d("KAEL",   "right", "neutral", "To find who was close to completing it."),
      d("BREK",   "left",  "neutral", "To find who was close enough to be worth the trouble of taking or stopping."),
      n("He resumes running. You run beside him for a quarter mile and then stop — your lungs are not what his are. He continues his circuit, and you watch him go, and think about a detection system for identifying people by how far along a method they are, and who would build such a system, and why."),
    ],

    // Spark 4: Maren knew
    [
      n("The part you keep returning to: she knew. Not 'suspected' — the way she handled Brek's revelation was the handling of someone confirming what they already knew, not learning it."),
      d("KAEL",   "right", "neutral", "When did you know the escape was arranged?"),
      d("MAREN",  "left",  "neutral", "Day two. After Ryn told me how long she had been in the passage before we arrived. Two hours — and nothing from the other side of the door for those two hours. Whatever was on the other side waited. It waited until we needed the door open."),
      d("KAEL",   "right", "neutral", "And you didn't say anything."),
      d("MAREN",  "left",  "neutral", "I needed to know who arranged it before I knew what to say about it. An escape arranged by an ally is different from an escape arranged by someone who needs us to reach a specific destination."),
      d("KAEL",   "right", "neutral", "Which was it?"),
      d("MAREN",  "left",  "neutral", "I still don't know. Which is why I still haven't said everything about it."),
      n("You sit with that. The admission that she is still working it out, when she has been ahead of you on every other piece of this."),
      d("KAEL",   "right", "neutral", "Is not knowing making you more cautious or less?"),
      d("MAREN",  "left",  "neutral", "More. When I know the source of something, I can calibrate the weight to give it. When I don't know the source, I give it maximum weight and wait."),
      d("KAEL",   "right", "neutral", "That seems like the right call."),
      d("MAREN",  "left",  "neutral", "It is the only call I have available."),
    ],

    // Spark 5: Serath's trail
    [
      n("Brek finishes the longer version of his deductions over dinner — step by step, the evidence leading to the result, the result stated without emphasis. When he is done, he picks up his bowl and continues eating."),
      d("DORATH", "left",  "neutral", "You said the fire was the signal. The signal for what?"),
      d("BREK",   "left",  "neutral", "For Serath to leave. I believe he arranged the passage opening, or facilitated it, and then left the building before the fire started — not because he set the fire, but because he knew it was coming and understood that his leverage would be spent once it was done."),
      d("KAEL",   "right", "neutral", "He used it to get us out."),
      d("BREK",   "left",  "neutral", "He used the threat of making what he knew public to keep the passage open. Once you were through and the fire was set, the threat lost its force. He couldn't stay."),
      d("MAREN",  "left",  "neutral", "Where did he go?"),
      d("BREK",   "left",  "neutral", "That I don't know yet. But he left markers. On the road east of the city, starting from the second day after the fire. I found three of them on the route I took."),
      d("KAEL",   "right", "neutral", "Markers for us."),
      d("BREK",   "left",  "neutral", "For someone who knows the notation system. He assumed we would come east and look. He was right."),
      n("Maren sets her bowl down with the precision she sets everything down."),
      d("MAREN",  "left",  "neutral", "Show me the notation."),
      n("Brek produces a small folded paper and spreads it on the ground between them. The marks are small and specific — the notation from the deep records, the same system as the symbol in Eran's building. And they are pointing east. Specifically east. To a place, not just a direction."),
    ],

    // Spark 6: The tail resolved
    [
      n("The tail from the south road — Maren made a decision at the junction and they executed it. In the morning, when they moved northeast, Brek and Dorath circled south and then east through the farm tracks, coming around to the junction from the east. The tail, watching the northeast fork, did not see them until they were thirty yards away."),
      d("BREK",   "left",  "neutral",    "They were professional. When they realized we'd flanked them, they did not run. They sat down at the road's edge and waited."),
      d("KAEL",   "right", "neutral",    "What did you do?"),
      d("BREK",   "left",  "neutral",    "Dorath asked them a question."),
      d("DORATH", "left",  "neutral",    "I asked who sent them. They said they couldn't say. I asked what they were watching for. They said they couldn't say. I asked if they were working for Voss."),
      d("KAEL",   "right", "neutral",    "What did they say?"),
      d("DORATH", "left",  "neutral",    "They said: no. Specifically and without hesitation. And then: find the eastern contact before he is moved."),
      n("A beat."),
      d("BREK",   "left",  "neutral",    "That's all. They said find the eastern contact before he is moved, and then they stood up and walked south."),
      d("KAEL",   "right", "neutral",    "They were warning us."),
      d("MAREN",  "left",  "neutral",    "Or testing us. Or both."),
      d("DORATH", "left",  "neutral",    "The eastern contact. I know who that refers to. Eran's eastern network has one person I've been unable to reach for six months. If he is being moved—"),
      n("She doesn't finish. The path runs east into the settlement district. The tail is gone south. The eastern contact, somewhere ahead, is running out of time."),
    ],

    // Spark 7: Ryn's threshold
    [
      n("The third day from the junction. Ryn comes to you in the morning and says:"),
      d("RYN",    "right", "quiet",      "Three days."),
      d("KAEL",   "right", "neutral",    "No slips?"),
      d("RYN",    "right", "quiet",      "None. Not a compression, not an approximation. The full eastern access list, in sequence, exactly as copied. And it has been there without active holding."),
      n("You look at her. The first threshold, achieved. Weeks of practice from a standing start."),
      d("KAEL",   "right", "neutral",    "Maren."),
      d("RYN",    "right", "quiet",      "I want to tell her myself."),
      d("KAEL",   "right", "neutral",    "Then tell her."),
      n("She does, that afternoon, direct and factual, without ceremony. Three days of the access list with no slip. Maren notes it and says:"),
      d("MAREN",  "left",  "neutral",    "Begin the second practice. Tonight."),
      d("RYN",    "right", "quiet",      "What does the second practice involve?"),
      d("MAREN",  "left",  "neutral",    "You hold two things at once. Adjacent. With precision on both. The space between them becomes as important as the things themselves."),
      d("RYN",    "right", "quiet",      "Two things simultaneously."),
      d("MAREN",  "left",  "neutral",    "Yes. It is harder than one."),
      n("Ryn considers this for a moment. Then:"),
      d("RYN",    "right", "quiet",      "What are the right two things to start with?"),
      d("MAREN",  "left",  "neutral",    "Any two things you know exactly. The relationship between them will teach you what the practice is for."),
      n("That evening, at camp, Ryn holds two things — you can see the quality of attention it takes, more focused than anything you have seen from her. And then: a small shift in her expression. She has found the space between them. And it is not empty."),
    ],

    // Spark 8: Brek and Ryn compare notes
    [
      n("Brek and Ryn have not spoken directly until this morning on the settlement road — Ryn is careful about new people and Brek is careful about interrupting established patterns. Today the road is wide enough for three and they fall into step together."),
      d("BREK",   "left",  "neutral",    "You were at the Archive for the last eight months."),
      d("RYN",    "right", "quiet",      "Yes."),
      d("BREK",   "left",  "neutral",    "The eastern access records — the ones you were copying — did you find the third cross-reference set?"),
      d("RYN",    "right", "quiet",      "In the lower catalog. Under the survey notations."),
      d("BREK",   "left",  "neutral",    "That's the one. The survey notations were a mislabeling — whoever filed the cross-references didn't know what category they belonged to."),
      d("RYN",    "right", "quiet",      "Or put them there deliberately."),
      d("BREK",   "left",  "neutral",    "I considered that. The handwriting matches the librarian who processed documents in that period — not someone who would deliberately miscatalog. An honest error by someone who recognized neither the records nor their significance."),
      d("RYN",    "right", "quiet",      "Did you record the cross-references?"),
      d("BREK",   "left",  "neutral",    "Memory only. Copying them would have drawn attention. You?"),
      d("RYN",    "right", "quiet",      "I copied the cross-references directly. They are the most complete section I have."),
      n("He looks at her with the expression Brek uses when he has located a piece that fits somewhere he was holding a gap."),
      d("BREK",   "left",  "neutral",    "You have the full third set."),
      d("RYN",    "right", "quiet",      "Yes."),
      d("BREK",   "left",  "neutral",    "Can I see them tonight?"),
      d("RYN",    "right", "quiet",      "Yes."),
      n("They walk the rest of the morning talking about records and what was in them and what is in each other's holdings that is not in the other's. By noon, without ceremony, they have divided the work between them. She has the documents he doesn't; he knows where the gaps in her record are. The settlement road runs east under their feet, already significantly better-mapped than it was this morning."),
    ],

    // Spark 9: What Brek carried out
    [
      n("The midday rest. Brek's pack has been the most efficiently organized pack you have ever seen. At rest he opens it and removes a small, flat parcel."),
      d("KAEL",   "right", "neutral",    "What is that?"),
      d("BREK",   "left",  "neutral",    "Archive records. Administrative documents from the two years before the fire. I found them in the restricted access section on my last morning."),
      d("KAEL",   "right", "neutral",    "You took administrative documents."),
      d("BREK",   "left",  "neutral",    "Specific administrative documents. The building permit applications for the eastern city construction project that started eighteen months ago. The permits describe the structure. The structure matches what Maren and I had computed the Voss building would need to be."),
      d("KAEL",   "right", "neutral",    "You have the specifications for their building."),
      d("BREK",   "left",  "neutral",    "Permit applications. They describe the intended use, the required features, the structural specifications. Enough to understand what the building is for, how it is organized, where its significant spaces are."),
      n("He passes them to you. They are dense documents — columns of specifications, official seals. You cannot follow most of it, but in the margin of the last page, in a hand you recognize from the markers: a small notation."),
      d("KAEL",   "right", "neutral",    "Serath annotated these."),
      d("BREK",   "left",  "neutral",    "He found them before I did. He wanted me to have them. He left the note so I would know he had seen them."),
      n("The note is three words: internal north section."),
      d("KAEL",   "right", "neutral",    "What's in the internal north section?"),
      d("BREK",   "left",  "neutral",    "That is what I have been trying to determine since I found them."),
    ],

    // Spark 10: Practice comparison
    [
      n("In the evening camp, all of them are doing the practice in their different ways. You can see it without them announcing it: Ryn in early second practice, her attention divided and deliberate; Brek in something denser, the look of the third or fourth level; Maren at whatever level Maren maintains, effortless as breathing; and you, at the first threshold, verifying that what you have is still there without having to check."),
      d("KAEL",   "right", "neutral",    "What level is Brek at?"),
      d("MAREN",  "left",  "neutral",    "Ask him."),
      d("KAEL",   "right", "neutral",    "Brek. What practice are you doing?"),
      d("BREK",   "left",  "neutral",    "Fourth. The chain practice has fifteen links active."),
      d("KAEL",   "right", "neutral",    "The chain practice. You're at the fourth stage?"),
      d("BREK",   "left",  "neutral",    "The fourth practice runs chains of related things held in sequence. Each link feeds the next. Currently fifteen — which is a high number for someone at my stage, according to Maren's notes, which I read three months ago."),
      d("KAEL",   "right", "neutral",    "You read Maren's notes."),
      d("BREK",   "left",  "neutral",    "She left them in the study room. They were accessible."),
      d("MAREN",  "left",  "neutral",    "I left them accessible."),
      n("Everyone stops."),
      d("KAEL",   "right", "neutral",    "You left them on purpose."),
      d("MAREN",  "left",  "neutral",    "I left them where Brek would find them, at a stage when he needed the fourth practice and I could not give it to him directly without telling him how much I already knew about his progress. Which would have interrupted the progress."),
      n("Brek looks at her. He does not say anything. He returns to the fourth practice with exactly the expression of someone who has confirmed a long-held suspicion and found that being confirmed is both satisfying and exasperating."),
    ],

    // Spark 11: What the detection system reveals
    [
      n("Brek explains the identification system on the second day in the settlement district. You have been asking about the part of the deep records that tracks practitioners by observable markers in their work."),
      d("BREK",   "left",  "neutral",    "The detection system works like this: it describes specific patterns in how a person reasons, writes, organizes knowledge. Patterns that change as the practice advances. At early stages the patterns are barely detectable. At later stages they become characteristic."),
      d("KAEL",   "right", "neutral",    "What patterns?"),
      d("BREK",   "left",  "neutral",    "Precision in reporting. Distinction between exact and approximate. Resistance to using impressionistic language for things that can be stated precisely. The willingness to hold a gap rather than fill it. These behaviors are markers the system describes."),
      d("KAEL",   "right", "neutral",    "Someone observing me would see these."),
      d("BREK",   "left",  "neutral",    "Someone who knew what to look for. The insider at the Archive was using this system to identify practitioners. Everyone who had passed the first threshold would have been visible to them."),
      d("KAEL",   "right", "neutral",    "Was I visible to them?"),
      d("BREK",   "left",  "neutral",    "You arrived two months before the fire. At your stage at that point — maybe not. But Maren was."),
      d("KAEL",   "right", "neutral",    "Maren was visible."),
      d("BREK",   "left",  "neutral",    "Maren's completion would be unambiguous to anyone reading the detection system correctly. She has been visible to anyone with the system and the knowledge to use it for fourteen years."),
      n("Fourteen years of visibility. Fourteen years of someone — or successive someones — knowing where she was and what she carried and choosing to wait rather than move. Which raises the question Brek is already running: why wait?"),
    ],

    // Spark 12: Ryn finds the hidden marker
    [
      n("The northeast track junction. Brek has been following Serath's markers since they diverged from the main settlement road. He stops at the fork to check the post and finds the surface mark — the route indicator at knee height. Then resumes his position."),
      d("BREK",   "left",  "neutral",    "Northeast fork, same as yesterday's direction."),
      d("RYN",    "right", "quiet",      "There's a second one."),
      d("BREK",   "left",  "neutral",    "Where?"),
      d("RYN",    "right", "quiet",      "The post cap. Top surface."),
      n("Brek looks at the top of the post. He leans in. The cap is weathered, lichen-covered — a surface that should be hard to read."),
      d("BREK",   "left",  "neutral",    "I see it. A mark inside the lichen pattern. Deliberate."),
      d("RYN",    "right", "quiet",      "Same notation as the others, but abbreviated. Made in a hurry, or made with the expectation that it would be hard to find."),
      d("BREK",   "left",  "thoughtful", "It says: I was followed here. I lost them but they know the district."),
      n("The path forks. East: open ground. Northeast: the direction Serath's markers have consistently pointed. The morning is still and the district is quiet and Serath, somewhere ahead on the northeast fork, was followed by someone who knows the district well enough to follow someone without being seen."),
      d("MAREN",  "left",  "neutral",    "He left this for whoever was reading his markers. As a warning."),
      d("BREK",   "left",  "neutral",    "Or as a record. He didn't know we were coming. He was noting it for himself."),
      d("MAREN",  "left",  "neutral",    "Either way. He was followed. And whatever followed him is still in this district."),
    ],

    // Spark 13: Night in the district
    [
      n("The first night camped inside the settlement district proper. Not a waystation, not a safe house — a cleared area in the managed woodland between two farms, the kind of space that travelers use by implicit agreement with the land's owners. A fire is acceptable here. So are questions about who you are if a farm worker passes."),
      d("DORATH", "left",  "neutral",    "The district has three types of watchers: official district recorders, private estate staff, and the kind of independent observer who makes money selling information about traffic patterns. The third type is the one to manage."),
      d("KAEL",   "right", "neutral",    "How?"),
      d("DORATH", "left",  "neutral",    "Be unsurprising. Surveyors camp in the district regularly. Their equipment is distinctive. Our equipment does not look like survey equipment."),
      d("BREK",   "left",  "neutral",    "I have survey equipment."),
      d("DORATH", "left",  "neutral",    "Since when."),
      d("BREK",   "left",  "neutral",    "Since the junction. The junction settlement has a supply post. Survey instruments are for sale there. I bought what was necessary."),
      n("Dorath looks at him for a moment. Then:"),
      d("DORATH", "left",  "neutral",    "That is useful."),
      d("BREK",   "left",  "neutral",    "Yes."),
      n("The fire burns low. The night sounds of the managed woodland settle in — closer than forest sounds, more domestic, the intermittent sound of farm animals in the distance and the particular quiet of land that has been settled long enough to have its own rhythm. You do your watch and nothing passes. But in the northeast, where the managed woodland ends and the track to the building begins, a light burns in the distance for exactly two hours and then goes out."),
    ],

    // Spark 14: The marker addressed to Maren
    [
      n("The morning of the third day in the district. Brek finds the marker at the base of the tracking stone — not the standard knee-height marker, not the abbreviated cap notation. Something else: a mark carved into the stone's base, deep enough that it won't weather, in the full deep records' notation rather than Serath's shorthand."),
      d("BREK",   "left",  "thoughtful", "This is not Serath's."),
      d("MAREN",  "left",  "neutral",    "No."),
      d("BREK",   "left",  "thoughtful", "The notation is complete form. Formal. This was placed by someone trained in the full deep records system, not someone who taught themselves from documents."),
      d("KAEL",   "right", "neutral",    "When?"),
      d("BREK",   "left",  "neutral",    "Recently — the cuts are fresh. The stone dust hasn't settled."),
      d("MAREN",  "left",  "neutral",    "What does it say?"),
      n("Brek reads it twice. Ryn reads it after him. They exchange a look."),
      d("BREK",   "left",  "neutral",    "It is addressed to Maren. Specifically. It says: you have been carrying two things. The cipher is one. The fourteenth fragment is the other. You know who wrote the fourteenth. The building is north of this marker. Come before the full day is done."),
      n("The air in the morning is perfectly still. Maren's expression does not change. But she looks at the tracking stone for a long time — the formal notation, freshly cut, addressed to her by name by someone who knows what she carries."),
      d("KAEL",   "right", "neutral",    "Someone left this for you today."),
      d("MAREN",  "left",  "neutral",    "Yes."),
      d("KAEL",   "right", "neutral",    "Someone who knows the deep records and knows what you carry and knows you are following the markers."),
      d("MAREN",  "left",  "neutral",    "Yes."),
      n("She straightens and looks north. The managed woodland thins out in that direction, and through the thinning, a track runs between two hills."),
      d("MAREN",  "left",  "neutral",    "Let's go."),
    ],

    // Spark 15: What the summoned building held — CLIFFHANGER
    [
      n("The building north of the tracking stone held one person, who left before they arrived. What it held: a single candle still burning on the table, three pages of notation in the full deep records' system, and the answer to the question of who placed the formal marker."),
      d("MAREN",  "left",  "neutral",    "The notation in the building. Tell them what you found."),
      d("BREK",   "left",  "neutral",    "Three pages, formal deep records notation. The handwriting is not Serath's. Older — the same formation Maren uses for that system, but the individual character style is specific to someone who learned it in a different context."),
      d("KAEL",   "right", "neutral",    "What does it say?"),
      d("MAREN",  "left",  "neutral",    "It says: the markers northeast are clear — follow them. The building at the end of the track is where the answers you're looking for are. The person who wrote the fourteenth fragment knew what would come next. So do I."),
      d("KAEL",   "right", "neutral",    "Who wrote it?"),
      d("MAREN",  "left",  "neutral",    "I believe I know. I have been believing I know for several weeks and being careful not to conclude faster than the evidence allows."),
      d("KAEL",   "right", "neutral",    "Who?"),
      n("She folds the three pages and places them in the case, beside the fourteenth fragment."),
      d("MAREN",  "left",  "neutral",    "The person who wrote the fourteenth fragment is not dead. The fragment was not a historical document. It was written recently, for us, for this situation."),
      n("The candle burns down in the empty building behind you as you leave. The northeast track runs ahead. Three pages from the person who wrote the fourteenth fragment — who is not only alive but somewhere on this path. And who has been placing markers and waiting."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 8 — The Deep Records
  // Setting: settlement road, moving east following Serath's markers
  // Characters: Player, Maren, Ryn, Dorath, Brek
  // ═══════════════════════════════════════════════════════════════════════════
  w8: [

    // Spark 1: What the deep records are
    [
      n("Following Serath's markers means moving more slowly — not because the markers are hard to find, but because each one requires reading before you follow it, and reading requires Maren and Brek both, because the notation is dense and their interpretations occasionally diverge."),
      d("KAEL",   "right", "neutral", "What exactly are the deep records? Not what they're used for — what they are."),
      d("MAREN",  "left",  "neutral", "A subsection of the Vraen collection that predates the Archive itself. Older than the building. They were incorporated into the Archive when it was established, but not listed in the public catalog — whether by oversight or design, we don't know."),
      d("KAEL",   "right", "neutral", "What's in them?"),
      d("MAREN",  "left",  "neutral", "Three things. Detailed records of the method's stages — more granular than the fragments we have. A system for identifying which stage a practicing person is at based on observable markers in their work and behavior. And something else that I have not finished reading but that appears to be a full account written by the original archivist of the decisions they made after completing the method."),
      d("KAEL",   "right", "neutral", "Decisions they made after."),
      d("MAREN",  "left",  "neutral", "What to do with the completion. What it obligated them to. Why they built the Archive rather than doing something else."),
      n("Ahead, Brek stops at a marker notched into a fence post — checks it, reads it, adjusts their direction fractionally northeast."),
      d("MAREN",  "left",  "neutral", "The deep records are the answer to the question the fragments raise. The fragments show you how. The deep records show you why."),
      d("KAEL",   "right", "neutral", "And Serath found them."),
      d("MAREN",  "left",  "neutral", "And found something in them that he decided the Archive could not contain."),
    ],

    // Spark 2: The insider
    [
      n("Midday break. Brek eats and runs the problem he's been carrying for days — you can tell by the way he cuts his food, the precise attention of someone whose hands are doing one thing and whose mind is doing something else entirely."),
      d("KAEL",   "right", "neutral", "Brek. The person Serath found accessing the deep records — do you know who it was?"),
      d("BREK",   "left",  "neutral", "No. Serath identified them from the access pattern — the records use a system of physical marks left by each reader, like a sign-in log in physical form. Someone had been leaving marks over the past eight months. He went to find the person who matched the handwriting."),
      d("KAEL",   "right", "neutral", "And found them."),
      d("BREK",   "left",  "neutral", "At noon on the day of the fire. That was his last morning in the Archive."),
      d("KAEL",   "right", "neutral", "Do you know what he said to them?"),
      d("BREK",   "left",  "neutral", "Only what the markers tell me. The notation he left on the route east uses specific code phrases from the deep records — things only someone who had read them would understand. One of them translates approximately as: 'the list was made and the maker was identified and the maker was told I knew.'"),
      d("KAEL",   "right", "neutral", "He threatened them. Used his knowledge as leverage."),
      d("BREK",   "left",  "neutral", "He gave them an incentive to keep the passage open. If the passage was closed, he released what he knew. If the passage stayed open — they had a reason to keep their arrangement quiet."),
      n("The road picks up the northeast curve. A marker is visible three hundred yards ahead — a scratch on a stone, indistinguishable from weathering unless you know what to look for."),
      d("KAEL",   "right", "neutral", "He spent his leverage to save us and then couldn't stay."),
      d("BREK",   "left",  "neutral", "That appears to be what happened. Yes."),
    ],

    // Spark 3: The fourth problem
    [
      n("On the road Brek runs ahead and comes back. Twice on this stretch. You ask."),
      d("KAEL",   "right", "neutral", "What are you running?"),
      d("BREK",   "left",  "neutral", "The fourth problem. I have been running it since the Archive."),
      d("KAEL",   "right", "neutral", "What is it?"),
      d("BREK",   "left",  "neutral", "The relationship between the method's completion and what happens to adjacent knowledge afterward."),
      d("KAEL",   "right", "neutral", "What does that mean?"),
      d("BREK",   "left",  "neutral", "When you hold one thing precisely, things adjacent to it become more precise too. Not because you're trying to hold them precisely — because the practice makes precision the baseline condition rather than the exception. I noticed this three months ago and have been trying to work out the mechanism."),
      d("KAEL",   "right", "neutral", "Does Maren know the mechanism?"),
      d("BREK",   "left",  "neutral", "She describes it as a structural change. The way a building that gets its foundation right can support more floors than one that doesn't. The strength doesn't stay at the foundation — it propagates upward."),
      d("KAEL",   "right", "neutral", "And the problem you're running is why."),
      d("BREK",   "left",  "neutral", "Is the mechanism what makes the method worth fighting over. Whether it is the preservation that matters or the propagation. Whether they want you because of what you hold or because of what you can hold afterward."),
      n("He runs ahead again. The road east is long and the markers are at increasing distance from each other — which Brek says means Serath was moving faster. Which means something was behind him too."),
    ],

    // Spark 4: Reading the markers
    [
      n("Brek teaches you the notation as they walk — not the full deep records system, but enough to read the markers Serath left. It is denser than you expected."),
      d("BREK",   "left",  "neutral", "The notation is a compression system. Each mark carries multiple layers of meaning depending on its position relative to other marks. The same symbol means different things at the beginning of a sequence versus the middle versus the end."),
      d("KAEL",   "right", "neutral", "Like a language."),
      d("BREK",   "left",  "neutral", "Like a language designed by someone who was already a highly precise thinker and was designing for other highly precise thinkers. It is dense. Serath uses it fluently, which tells you something."),
      d("KAEL",   "right", "neutral", "How long had he been reading the deep records?"),
      d("BREK",   "left",  "neutral", "Based on the fluency in the markers — months at minimum. Possibly the full six months he was at the Archive before you arrived."),
      d("KAEL",   "right", "neutral", "He was studying something he wasn't supposed to know about, in a notation system he taught himself, and Maren didn't notice."),
      d("BREK",   "left",  "neutral", "Maren noticed something was different about him in the fifth week. She was two weeks behind where he actually was."),
      n("You think about this. About how far ahead everyone in this group has been at different moments — Maren ahead of you by months, Serath ahead of Maren by weeks, and somewhere east, the markers pointing toward a destination that was arranged before any of them decided to go there."),
    ],

    // Spark 5: Three days ahead
    [
      n("The last marker of the day is at the edge of a cleared area where the settlement district begins — not a settlement yet, but the evidence of settled ground: maintained paths, cleared brush, a water trough recently used. Brek reads the marker carefully."),
      d("BREK",   "left",  "neutral", "He was here three days ago."),
      d("MAREN",  "left",  "neutral", "Three days."),
      d("BREK",   "left",  "neutral", "The marker indicates direction and time-since-placement. He is three days ahead of us on the same path. If we maintain our pace—"),
      d("MAREN",  "left",  "neutral", "We don't close the gap in three days."),
      d("BREK",   "left",  "neutral", "No. He is moving faster. The gaps between markers are increasing."),
      d("DORATH", "left",  "neutral", "Is he being followed?"),
      d("BREK",   "left",  "neutral", "The last marker includes a notation I have not seen before. It may indicate presence behind him. Or it may indicate something else — the notation is new."),
      d("KAEL",   "right", "neutral", "New notation. He invented it."),
      d("BREK",   "left",  "neutral", "Or adapted it from something in the deep records I haven't read. The meaning is in a context I don't have yet."),
      n("Maren looks at the marker for a long time. Then at the path ahead — the settlement district, roads maintained and full of people with ordinary reasons to be there. Ahead somewhere, three days on faster feet: Serath, leaving marks in a notation that has one more layer than Brek can fully read."),
      d("MAREN",  "left",  "neutral", "We press the pace tomorrow. Not running. But pressing."),
    ],

    // Spark 6: Dorath reads the approach
    [
      n("On the second day following the northeast markers, Dorath maps the approach as they walk — the habit of someone who cannot enter new terrain without knowing how to leave it."),
      d("DORATH", "left",  "neutral",    "The track has three approach angles. This one is the second — the one the markers lead down. There's a northern approach through the farm pasture, and a southern approach from the stream track."),
      d("DORATH", "left",  "neutral",    "The track we're on shows old use and new use — two different periods of regular traffic. The new use is consistent with Serath's timeline. The old use is different — more parties, more weight. This track was used regularly before Serath."),
      d("KAEL",   "right", "neutral",    "For what?"),
      d("DORATH", "left",  "neutral",    "I don't know. But the approach road to any building reveals what the building was used for — how many people, carrying what weight, in what groupings. This building was receiving regular visitors. Not surveyors. Not farm workers."),
      d("BREK",   "left",  "neutral",    "The network."),
      d("DORATH", "left",  "neutral",    "Possibly. Eran's surveys didn't cover this area specifically. But the traffic pattern is similar to what he described for his eastern node buildings."),
      n("Brek runs the southern approach later that day and returns: the stream track shows same-period use as the main track. One user, consistent with Serath's weight and stride. He also reports something else."),
      d("BREK",   "left",  "neutral",    "The fourth problem. I have the full mechanism."),
      d("KAEL",   "right", "neutral",    "Tell me."),
      d("BREK",   "left",  "neutral",    "The detection system identifies practitioners by behavioral markers. But it works in both directions. A person who has passed the first threshold and knows what the markers are can recognize when someone else is applying the detection system to them."),
      d("KAEL",   "right", "neutral",    "The watcher is visible to someone who knows to look."),
      d("BREK",   "left",  "neutral",    "Maren knew she was being observed for years — not because she noticed someone watching, but because specific interactions in the Archive fit the observation pattern. She just called it something else."),
      d("MAREN",  "left",  "neutral",    "I called it 'unusual interest.'"),
      n("Fourteen years of unusual interest from various people over various periods. All of them, in retrospect, applying the same detection protocol. And every one of them chose to keep watching rather than act."),
    ],

    // Spark 7: What the markers say about Serath
    [
      n("Brek studies the markers' pattern over two days before he will speak about what they tell him beyond direction and timing. On the third day he is ready."),
      d("BREK",   "left",  "neutral",    "The markers started as standard notation. First three use the system exactly as documented. Then they begin to drift."),
      d("KAEL",   "right", "neutral",    "Drift how?"),
      d("BREK",   "left",  "neutral",    "He starts abbreviating. Not sloppily — precisely. He is compressing the notation because he is thinking faster than the standard form allows. By marker six, he is using a notation I don't recognize."),
      d("KAEL",   "right", "neutral",    "Something he invented."),
      d("BREK",   "left",  "neutral",    "Or adapted from materials I haven't read. The pattern of adaptation suggests he found something in the deep records that he was integrating while leaving the markers. He was learning and noting what he learned simultaneously."),
      d("KAEL",   "right", "neutral",    "What did he find?"),
      d("BREK",   "left",  "neutral",    "I can't determine that yet. But the new symbol appears for the first time on the marker at the district boundary, and its structure suggests — a stage transition. Something changed in his practice at that point."),
      d("MAREN",  "left",  "neutral",    "A threshold."),
      d("BREK",   "left",  "neutral",    "That is my interpretation. The symbol's form matches what a circle-within-circle notation would mean if you extended the system's internal logic. Completion of one thing and beginning of another."),
      n("They walk. The markers narrow their gaps — the building is getting closer. Somewhere ahead, Serath is three days out with a practice that has been advancing since he left the Archive, leaving a notation trail of where his mind has been going."),
    ],

    // Spark 8: Night watch — movement
    [
      n("Third night following the markers. Your watch. The track's clearing has enough sky overhead that you can see the cloud cover moving from the northwest. The building is — Brek calculates — six hours of walking. Close enough that you watch the northeast carefully."),
      n("At the second hour of watch: movement. North of the track, parallel, moving northeast at a pace faster than walking but not running. For four minutes. Then nothing."),
      n("You wake Brek. Not Maren, not Dorath — Brek, because his mind in the hour between sleep and full consciousness is more reliable than any other mind you know."),
      d("KAEL",   "right", "neutral",    "Something moved. North of the track. Four minutes."),
      n("He sits up immediately. Listens."),
      d("BREK",   "left",  "neutral",    "Direction of movement?"),
      d("KAEL",   "right", "neutral",    "Northeast. Toward the building."),
      d("BREK",   "left",  "neutral",    "Deliberate?"),
      d("KAEL",   "right", "neutral",    "Even pace. Not escape — transit."),
      n("Brek is quiet for a moment. The sky turns slightly as the cloud cover shifts."),
      d("BREK",   "left",  "neutral",    "A second party. Moving to the building from a different approach angle than ours."),
      d("KAEL",   "right", "neutral",    "Serath?"),
      d("BREK",   "left",  "neutral",    "The stride I found in Serath's markers is specific. This was heavier. Different person. Someone who knows the northern approach."),
      n("You finish your watch. In the northeast, the track is quiet. But now there are two groups moving toward the building — yours, and whoever passed north of you in the night, at transit pace, unhurried, as if the building at the end of the track is exactly where they intended to be."),
    ],

    // Spark 9: Two sets of tracks
    [
      n("Brek reads the track on the morning of the fourth day from the settlement district. He reads it for longer than usual and when he stands his expression has the quality of someone integrating two things they expected to find separately."),
      d("BREK",   "left",  "neutral",    "Two sets of tracks. Both northeast. Both recent."),
      d("KAEL",   "right", "neutral",    "Serath and who?"),
      d("BREK",   "left",  "neutral",    "The second set is lighter than Serath's. Different pace pattern — steadier, less variation. Someone who walks as a primary mode of travel rather than someone who also runs."),
      d("DORATH", "left",  "neutral",    "Two days ahead or three?"),
      d("BREK",   "left",  "neutral",    "Serath: three days. The second person: the same, possibly slightly less. They entered the track from the east side — see here, the approach angle is different from ours."),
      d("RYN",    "right", "quiet",      "Coming from the city."),
      d("BREK",   "left",  "neutral",    "That is my read. They know the eastern approach to this track, which is not obvious. They've been here before, or they have a map."),
      d("MAREN",  "left",  "neutral",    "Do the tracks intersect?"),
      d("BREK",   "left",  "neutral",    "Not before the building. They converge on the same destination, on parallel lines."),
      n("Two people ahead of you in the same building, arriving from different directions on the same day. The building that the formal marker described, the building where a wall full of notation waits, is receiving visitors from at least two directions. You are the third group."),
    ],

    // Spark 10: What Maren is preparing for
    [
      n("Maren walks with the quality of someone whose mind is engaged with something at a distance. You recognize it and ask."),
      d("KAEL",   "right", "neutral",    "What are you thinking about?"),
      d("MAREN",  "left",  "neutral",    "The building ahead. The walls. What a first-person account of the fourteenth stage would give me that I have not had."),
      d("KAEL",   "right", "neutral",    "What do you not have?"),
      d("MAREN",  "left",  "neutral",    "The fourteenth stage requires precise self-knowledge of where you are in the practice. Not 'I believe I am at the thirteenth stage.' Exact. The fragments describe the final stage as requiring accurate knowledge of your own current state — not approximate."),
      d("KAEL",   "right", "neutral",    "And you don't have that."),
      d("MAREN",  "left",  "neutral",    "I have a high-quality approximation. Which is the same as not having it, for the fourteenth stage."),
      d("KAEL",   "right", "neutral",    "What would give you the precision?"),
      d("MAREN",  "left",  "neutral",    "A first-person account of what the fourteenth stage requires, written by someone who has completed it. Which the walls are. If what the notes in the summoned building described is accurate—"),
      n("She stops mid-sentence. The track runs northeast. In the distance, for the first time, a roofline is visible above the tree line — stone, solid, old."),
      d("MAREN",  "left",  "neutral",    "The walls will give me what I need to reach the fourteenth stage. And then I will have it. Not approximately."),
    ],

    // Spark 11: Ryn's second practice
    [
      n("Ryn has been at the second practice since the junction. At the midday rest on the fourth day she describes where she is."),
      d("RYN",    "right", "quiet",      "The two things I've been holding — the eastern access list and the cross-reference set. For three days they were adjacent but separate. This morning they're not separate."),
      d("KAEL",   "right", "neutral",    "They merged?"),
      d("RYN",    "right", "quiet",      "Not merged. The relationship between them became visible as a third thing. I wasn't holding two things anymore — I was holding two things and the structure of their relationship."),
      d("KAEL",   "right", "neutral",    "That's the second practice."),
      d("RYN",    "right", "quiet",      "I know. What I didn't expect was what the relationship showed me. The cross-reference set covers the same period as the access list — the same three years before the fire. When I hold both precisely, the pattern of who was in those collections during that period—"),
      n("She stops. The look she uses when something is still resolving."),
      d("RYN",    "right", "quiet",      "There's a researcher who accessed both collections on specific dates. The dates match the dates when the detection system was being actively used in the deep records."),
      d("KAEL",   "right", "neutral",    "The insider."),
      d("RYN",    "right", "quiet",      "Someone who knew about the fragments and was tracking practitioners. I don't have the name — the cross-references use initials only. But I have the dates. And I have something else."),
      d("KAEL",   "right", "neutral",    "What?"),
      d("RYN",    "right", "quiet",      "They used this track. In the old-use period. Before Serath. They knew about this building before anyone in our group did."),
    ],

    // Spark 12: Serath's new symbol
    [
      n("The marker Brek finds on the fourth morning has notation he has not seen before — not a new character in the existing system, but a new symbol entirely. He crouches over it for a long time before rising."),
      d("BREK",   "left",  "thoughtful", "Serath invented this."),
      d("MAREN",  "left",  "neutral",    "Or adapted it from something in the deep records he read that we haven't."),
      d("BREK",   "left",  "thoughtful", "Either way, it's intentional. Too deliberate to be an error in the existing notation. He wanted to communicate something he didn't have a symbol for."),
      d("KAEL",   "right", "neutral",    "What does the symbol look like?"),
      d("BREK",   "left",  "neutral",    "A closed circle inside an open one. In the deep records' system, circles indicate stages of completion. Nested circles have been used for transitions between stages. This is a new configuration."),
      d("MAREN",  "left",  "neutral",    "What might 'stage completed, new stage beginning' look like in that notation?"),
      n("Brek considers this."),
      d("BREK",   "left",  "thoughtful", "That. It would look exactly like that."),
      d("MAREN",  "left",  "neutral",    "Serath crossed a threshold. Between the last standard marker and this one."),
      d("BREK",   "left",  "neutral",    "At a minimum the second threshold. Possibly — given the form of the symbol — the third."),
      n("He does not finish. But you understand: the markers are not only a trail. They are a diary of what happened to Serath while he was leaving them. And the most recent marker, in new notation, records a change in him that does not have a word yet in the existing language."),
    ],

    // Spark 13: The building visible
    [
      n("Sixth day from the settlement district. The track crests a low ridge — and there, below, the building. Stone construction, well-maintained. Three structures in a cluster around a larger main building. Still. Quiet. No movement visible."),
      d("BREK",   "left",  "neutral",    "Occupied. The track from the east has fresh use. The path to the outbuilding door is compressed."),
      d("DORATH", "left",  "neutral",    "How many?"),
      d("BREK",   "left",  "neutral",    "Hard to say from here. Two at minimum, based on the tracks we've been following."),
      d("RYN",    "right", "quiet",      "Windows on the south face are shuttered from inside. Someone is maintaining light discipline."),
      d("KAEL",   "right", "neutral",    "They don't want to be seen from the valley."),
      d("DORATH", "left",  "neutral",    "Or they are used to not being seen and it is habit. The approach from the west — our approach — is not the one they are watching for."),
      d("MAREN",  "left",  "neutral",    "We approach from the west."),
      d("DORATH", "left",  "neutral",    "Slowly. Not hiding — we want whoever is inside to see us approach. An unannounced arrival to a building occupied by unknown people is not a comfortable situation."),
      n("They descend toward the building at a pace that is deliberate without being cautious — the pace of people who have a reason to be here. The valley is quiet. Nothing moves below."),
      n("And then: from the main building's chimney, a thin line of smoke."),
      d("BREK",   "left",  "neutral",    "Someone is in there right now. Not just recently — right now."),
    ],

    // Spark 14: Forty yards
    [
      n("They walk to within forty yards of the main building's door. At thirty yards, the door opens."),
      n("No face appears. The door stands open on an interior that is dim — shuttered windows — and silent."),
      d("DORATH", "left",  "neutral",    "Don't rush it."),
      n("They hold at forty yards for thirty seconds. Nothing moves in the open doorway. The smoke from the chimney continues. The building is occupied, the door is open, and whatever is waiting inside is waiting for them to decide whether to close the distance."),
      d("BREK",   "left",  "neutral",    "Someone opened it from inside. They can see us from the interior."),
      d("MAREN",  "left",  "neutral",    "They are being careful too."),
      d("KAEL",   "right", "neutral",    "Is that good?"),
      d("MAREN",  "left",  "neutral",    "I don't know yet."),
      n("At thirty seconds: a hand appears at the door's edge. Precise — the gesture practiced and specific. Not a wave. A word in sign, the kind used in the Archive for communication in spaces where sound carried too far."),
      d("RYN",    "right", "quiet",      "Archive sign language. Come forward."),
      n("The hand withdraws. The door stays open. Whoever is inside knows the Archive's communication protocols, is asking you forward, and will not come out to meet you."),
      d("MAREN",  "left",  "neutral",    "Walk."),
      n("They close the distance. At the threshold: the interior is one large room, walls visible from the door. And what is on the walls — floor to ceiling, notation filling every surface — stops you in the doorway."),
    ],

    // Spark 15: The building's interior — CLIFFHANGER
    [
      n("The walls of the main building are covered from floor to ceiling in notation. Not newly made — old, settled, the marks of someone who spent a long time in one place doing one thing. Dense. Layered. The notation is Vraen and older than Vraen."),
      n("In the far corner: a figure, back to you, reading the west wall. She has not looked up. She has heard you come in and has not stopped what she was doing, because what she was doing mattered more than turning around."),
      d("KAEL",   "right", "neutral",    "Maren."),
      d("MAREN",  "left",  "neutral",    "I see her."),
      d("KAEL",   "right", "neutral",    "Is that—"),
      d("MAREN",  "left",  "neutral",    "Yes."),
      n("The figure at the west wall says, still without turning:"),
      d("SIRA",   "right", "neutral",    "The west wall is the hardest one. I've been working on it for eleven days. I think I have the layering right but I want to check it before I move on."),
      n("She turns. Her face is the face she has always had — specific, direct, with the small quality of reserve that means she is already thinking about the next thing."),
      d("SIRA",   "right", "neutral",    "I left you a book at the eastern waypoint. You found the building, so you came through the district. Did you find it?"),
      d("KAEL",   "right", "neutral",    "Not yet. We came from the north fork."),
      d("SIRA",   "right", "neutral",    "Then you'll find it on the way back. It will explain what I've been doing. The walls—"),
      n("She looks at them, at the notation filling every surface."),
      d("SIRA",   "right", "neutral",    "The walls are everything. Read them in order. Start with the north wall."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 9 — The Trail
  // Setting: settlement district, following markers, approaching the building
  // Characters: Player, Maren, Ryn, Dorath, Brek
  // ═══════════════════════════════════════════════════════════════════════════
  w9: [

    // Spark 1: The settlement district
    [
      n("The settlement district is nothing like the Archive's city. It is a scatter of buildings connected by paths that were made by use rather than plan, the kind of landscape that comes from a hundred individual decisions made over decades without coordination. The people here know each other's names. They watch strangers with the attention of places where strangers are uncommon."),
      d("DORATH", "left",  "neutral", "Stay in pairs. Don't wander. If anyone asks, we are working a mapping contract for the northern survey — I have documentation."),
      d("KAEL",   "right", "neutral", "You have documentation for a mapping contract."),
      d("DORATH", "left",  "neutral", "I have documentation for several things. This is the most useful one here."),
      d("RYN",    "right", "quiet",   "How many people in this district might be watching for us specifically?"),
      d("DORATH", "left",  "neutral", "Unknown. I know this district by reputation, not by direct network contact. Assume some. Behave accordingly."),
      n("They move through the outer edge in two pairs. You stay with Brek. He does the thing he does in new spaces: walks the obvious path, notes the alternatives, files the exits. By the time you reach the district's center junction he has mapped it in his head and is ready for four contingencies."),
      d("KAEL",   "right", "neutral", "Is there a marker here?"),
      d("BREK",   "left",  "neutral", "On the junction post. East side. Not the path marker — that's standard. The one below it, at knee height."),
      n("He looks at the knee-high mark for a long time. His face does the thing it does when something lands in the right slot."),
      d("BREK",   "left",  "neutral", "He's close. The gap has shortened."),
    ],

    // Spark 2: What the practice produces
    [
      n("You have been practicing for two weeks and something has changed in the past three days. Not dramatically. Specifically: when you take up something you know and hold it precisely, it stays held for longer than it used to. The practice that required continuous re-application is beginning to require less."),
      d("KAEL",   "right", "neutral", "Maren. The practice — something is different."),
      d("MAREN",  "left",  "neutral", "Describe it."),
      d("KAEL",   "right", "neutral", "I hold something and it stays. I don't have to keep holding it — it just... continues."),
      d("MAREN",  "left",  "neutral", "Yes. That is the first threshold. The practice has become a background process rather than a foreground one. You don't have to allocate attention to it anymore — it runs."),
      d("KAEL",   "right", "neutral", "Is that what it's supposed to feel like?"),
      d("MAREN",  "left",  "neutral", "The fragments describe the first threshold in almost exactly those terms. 'The work which was effort has become property.' That is the original archivist's description. You've reached it."),
      n("She says this without fanfare. It is a notation. Here is a fact. The fact is: you have reached the first threshold of a practice that nineteen years ago took Maren fourteen years to complete. The implication of the timeline difference is something you do not calculate immediately."),
      d("KAEL",   "right", "neutral", "What comes after the first threshold?"),
      d("MAREN",  "left",  "neutral", "The second practice. Which is harder than the first, and more important. When we stop for the night, I'll begin it with you."),
    ],

    // Spark 3: Dorath and the network
    [
      n("Dorath has been making contact with settlement people throughout the day — not through her network, but through the legitimate surface of the mapping cover. Small conversations that gather ambient information. In the evening she brings the results."),
      d("DORATH", "left",  "neutral", "Someone passed through this district four days ago. Alone. Moving fast. The description matches Serath well enough."),
      d("MAREN",  "left",  "neutral", "Did they note where he went?"),
      d("DORATH", "left",  "neutral", "Northeast of the main settlement. Following the old survey track. One of the smallholders saw him at the track entrance and didn't think anything of it — it's a legitimate path. But it's not a path that goes anywhere obvious."),
      d("BREK",   "left",  "neutral", "There's a building at the end of that track. I saw it on approach. Stone outbuilding, well-maintained."),
      d("MAREN",  "left",  "neutral", "You've been there?"),
      d("BREK",   "left",  "neutral", "I ran the perimeter of the district yesterday morning. Mapping contract habit."),
      n("Dorath and Maren exchange a look — not concern exactly, more like the look of two people who have been on the same side of a situation long enough to know when it is developing in a direction they did not fully anticipate."),
      d("DORATH", "left",  "neutral", "One more thing. The smallholder said the person she saw wasn't alone. She mentioned a second figure she'd noticed at the building two days before he arrived. Someone who was already there."),
      d("MAREN",  "left",  "neutral", "Waiting."),
      d("DORATH", "left",  "neutral", "It seems like it."),
    ],

    // Spark 4: The second practice
    [
      n("That night Maren begins the second practice. She sits across from you at the fire and says: you know how to hold one thing precisely. Now hold two."),
      d("KAEL",   "right", "neutral", "Simultaneously."),
      d("MAREN",  "left",  "neutral", "Adjacent. Not overlapping — adjacent. Two things held at the same time with the same precision. The space between them is as important as the things themselves."),
      d("KAEL",   "right", "neutral", "Why the space between them?"),
      d("MAREN",  "left",  "neutral", "Because what the method produces, at later stages, is structural. The relationship between things held precisely generates something that neither generates alone. The fragments call it resonance. The original archivist spends considerable time on this one word."),
      d("KAEL",   "right", "neutral", "What does resonance produce?"),
      d("MAREN",  "left",  "neutral", "New understanding. Not invention — you don't know things you haven't learned. But the connections between things you have learned become visible in a way they weren't before. The structure of the knowledge becomes perceivable."),
      n("You try it. Two things, precisely held, space between them. It is significantly harder than one thing. It is also — immediately, unmistakably — different. The relationship between the two held objects is real, specific, and was not apparent before you held them this way."),
      d("MAREN",  "left",  "neutral", "Yes. That."),
      n("She goes back to her notes without further comment. The fire burns low."),
    ],

    // Spark 5: The lit window
    [
      n("The building is at the end of the northeast track — stone and timber, well-maintained in the particular way of a building that is actually used rather than maintained for appearance. The path to it is clear, the approach visible in both directions."),
      n("At this hour the building should be dark."),
      d("BREK",   "left",  "neutral", "Someone is there."),
      d("DORATH", "left",  "neutral", "One light. Upper window."),
      d("MAREN",  "left",  "neutral", "It is the hour when no one legitimate would still have a lamp burning."),
      d("KAEL",   "right", "neutral", "It could be Serath."),
      d("MAREN",  "left",  "neutral", "Serath did not leave a marker for this building. The markers led to the district. Not to this building specifically."),
      d("BREK",   "left",  "neutral", "Someone who knew we would follow the markers here, and knew we would reach the district but not the specific building, and lit the light so we would find it."),
      n("They stand at the track entrance and watch the lit window for two minutes. Nobody moves in the light. Nobody opens the door. The light simply burns, steady, at the hour when no light should be burning, in a window that faces the track entrance exactly."),
      d("RYN",    "right", "quiet",   "It knows we're here."),
      d("MAREN",  "left",  "neutral", "They. They know we're here. Come."),
      n("They walk toward the building. Thirty yards from the door, the light extinguishes. The building goes dark. And the door, without sound, opens."),
    ],

    // Spark 6: Entry
    [
      n("Inside: a single lamp on a table, turned low. Papers in three organized stacks. A locked cabinet in the back corner. A shelf with a gap where something has been removed. One person, sitting at the table, who does not stand when you enter."),
      d("TAL",    "left",  "neutral", "I thought there would be five. There are six."),
      d("DORATH", "left",  "neutral", "Brek joined us at the settlement junction."),
      d("TAL",    "left",  "neutral", "I know Brek. We worked a northern supply route three years ago. Close the door."),
      n("Dorath closes the door. Brek moves to the window without being asked and checks the angle of view from outside — old habit. Maren sets down the document case with the specific care she always gives it. Nobody speaks for a moment. The building has the quality of a place that has been lived in carefully — no unnecessary objects, every surface functional, the lamp positioned for working rather than comfort."),
      d("KAEL",   "right", "neutral", "You were expecting us."),
      d("TAL",    "left",  "neutral", "I was expecting someone. The marker in the settlement district — that was mine. I updated it when I heard the Archive had burned."),
      d("KAEL",   "right", "neutral", "How did you hear?"),
      d("TAL",    "left",  "neutral", "The district smallholder. Third road east. She picks up information I would otherwise need a network to gather. She told me three days ago."),
      n("Three days. The Archive burned nine days ago. The information traveled six days to reach here. Someone is maintaining information channels the group doesn't know about. You look at Dorath, who is looking at Tal with an expression that contains several things at once."),
    ],

    // Spark 7: The network silence
    [
      n("Dorath's question comes after everyone has settled — Maren reading, Ryn at the table with her records, Brek at his chosen position near the door. The question is the one that has been waiting since the first night."),
      d("DORATH", "left",  "neutral", "Seventeen months, Tal. Not a word."),
      d("TAL",    "left",  "neutral", "I know."),
      d("DORATH", "left",  "neutral", "Not even confirmation that you were operational. Just silence."),
      d("TAL",    "left",  "neutral", "If I sent confirmation I was operational, anyone following the network's communications would know the eastern node was active. The silence was the security."),
      d("DORATH", "left",  "neutral", "Or we would know the eastern node was active, which would have changed how we operated. We moved under the assumption the eastern contact was dead or captured. That assumption cost us decisions we could have made differently."),
      n("A pause. Tal does not argue this."),
      d("TAL",    "left",  "neutral", "You're right. The silence was correct for security and incorrect for operational accuracy. I made a judgment. I would make a different one now."),
      d("DORATH", "left",  "neutral", "I know. I'm not asking you to defend it. I'm telling you that it had consequences so that when you make the next judgment, you have the full picture."),
      d("TAL",    "left",  "neutral", "Understood."),
      n("Dorath returns to the map she has been studying. The conversation is complete — not resolved, complete. The distinction matters in the way they both speak: resolution requires agreement, completion requires only that the information has been transmitted and received."),
    ],

    // Spark 8: Six hours in the passage
    [
      n("Late in the evening. Maren has been waiting for this since the door opened — you can tell by the way she has not asked anything else. When there is a moment of quiet, she sets down her notes."),
      d("MAREN",  "left",  "neutral", "The passage. You were in it for six hours."),
      d("TAL",    "left",  "neutral", "From the evening meal to the fourth hour after midnight. I entered from the lower level, through the maintenance access that Dorath's original contact mapped. The passage is about forty feet of stone corridor with two ventilation gaps. You can hear the floor above through them."),
      d("MAREN",  "left",  "neutral", "What did you hear?"),
      d("TAL",    "left",  "neutral", "For the first three hours: normal. Then a change in foot traffic — more people, moving with purpose rather than routine. Then, about an hour before the bell, the smell of smoke from the eastern ventilation gap."),
      d("KAEL",   "right", "neutral", "You knew what was coming."),
      d("TAL",    "left",  "neutral", "I suspected. I moved to the Archive side of the passage and waited at the access point. The smoke was present but not thick — the fire was in the upper levels first. The access door opened and the document case came through."),
      d("KAEL",   "right", "neutral", "Someone handed it to you through the door."),
      d("TAL",    "left",  "neutral", "A hand. I did not see who. The door closed immediately. I waited twenty more minutes to be certain the passage was clear, then moved west."),
      n("The room holds this. The image of it: a hand through a door in a burning building, a case being passed, a door closing. Precision and trust and no time for anything else."),
      d("MAREN",  "left",  "neutral", "Was it the case you expected?"),
      d("TAL",    "left",  "neutral", "I was told to expect a case with a three-press seal. Yes. That was the case."),
    ],

    // Spark 9: The building's purpose
    [
      n("Tal does not give a formal tour — she simply moves through the building doing what she was doing before you arrived, and explains the relevant parts as she goes. The locked cabinet in the back corner. The shelf."),
      d("KAEL",   "right", "neutral", "The shelf — there's a gap there. Something was removed."),
      d("TAL",    "left",  "neutral", "A book. I took it when I went dark on the network seventeen months ago. It needed to be copied before I lost access to the person who could do it correctly."),
      d("KAEL",   "right", "neutral", "What kind of book?"),
      d("TAL",    "left",  "neutral", "A record kept by the previous occupant of this building. Someone who was working in the same direction as your group, without knowing your group existed. They got further than I expected anyone could get without Eran's framework."),
      d("KAEL",   "right", "neutral", "You copied it?"),
      d("TAL",    "left",  "neutral", "The relevant sections. The copy is in the locked cabinet. The original I returned to the shelf six months ago, but the shelf was already in use."),
      n("You look at the locked cabinet. Tal sees you looking and does not offer to open it."),
      d("TAL",    "left",  "neutral", "This building is the eastern node of a network that Eran established twelve years ago. It is one of three buildings that serve as waypoints on the route to the settlement. I am the only person who knows the locations of all three."),
      d("DORATH", "left",  "neutral", "The other two."),
      d("TAL",    "left",  "neutral", "Are maintained. I check them quarterly. They have not been visited by anyone other than me since Eran died."),
    ],

    // Spark 10: Night watch
    [
      n("Dorath organizes the night without ceremony. Rotations. Who sleeps first. The window angle. Brek runs the exterior circuit and comes back to report: clear, one soft approach from the south that she marks on the floor plan with her finger, one blind spot on the northeast corner."),
      d("DORATH", "left",  "neutral", "Maren is not on rotation."),
      d("MAREN",  "left",  "neutral", "I won't sleep anyway."),
      d("DORATH", "left",  "neutral", "Then sit wherever you won't be in the light from the window."),
      n("Maren moves her chair without comment. Dorath takes the first watch. The lamp is turned lower but not out — out means blackness that takes time to adjust from, and adjustment time is a liability."),
      d("KAEL",   "right", "neutral", "You've done this before. Stayed in places like this."),
      d("DORATH", "left",  "neutral", "I have been running logistics for eleven years. This is the work."),
      d("KAEL",   "right", "neutral", "Does it get easier?"),
      d("DORATH", "left",  "neutral", "The protocols get faster. You stop spending attention on whether to do them — you just do them. The vigilance itself doesn't diminish. It shouldn't."),
      n("The building settles into its night sounds — the kind a stone building makes when the temperature drops and the frame adjusts. Outside: nothing. Inside: the lamp, the watch, five people who know how to be quiet in different ways."),
    ],

    // Spark 11: Tal's intelligence
    [
      n("Tal has been building a picture since the Archive burned. She lays it out in the middle of the night, for the people still awake."),
      d("TAL",    "left",  "neutral", "The Spire receives reports from seven contact points across the archive network. My absence will be noted when the next reporting cycle passes with no contact from this region. That cycle runs every fourteen days. The last cycle was six days ago."),
      d("DORATH", "left",  "neutral", "Eight days."),
      d("TAL",    "left",  "neutral", "Eight days before my silence triggers an inquiry. The inquiry will come from a collector, not directly from the Spire — someone who aggregates regional reports. They will send a person to the last known address of my contact. That person is an address I abandoned two years ago."),
      d("BREK",   "left",  "neutral", "That buys more time."),
      d("TAL",    "left",  "neutral", "It buys two more weeks, if they follow procedure. The Spire may not follow procedure. The Archive's burning is not a normal event — they may accelerate their response. I would assume accelerated response."),
      d("MAREN",  "left",  "neutral", "How much time total, on the conservative assumption?"),
      d("TAL",    "left",  "neutral", "Eight days before the inquiry, two weeks before it escalates. Three weeks before active search."),
      n("The calculation sits on the table next to the lamp. Three weeks. The route to the settlement is three days east. Three weeks is enough time, if they move when they've finished what they need to do here."),
    ],

    // Spark 12: Alone with Tal
    [
      n("The second rotation. Most of the group is sleeping. Ryn is on watch at the window. You find Tal at the far end of the table, still working."),
      d("KAEL",   "right", "neutral", "Do you sleep?"),
      d("TAL",    "left",  "neutral", "When I need to. I have a tolerance for long hours that Eran said was either a gift or a problem, depending on the situation."),
      d("KAEL",   "right", "neutral", "He talked about you. Maren mentioned someone in the eastern network, once."),
      d("TAL",    "left",  "neutral", "He talked about all of you. In terms of what you were working on, where you were, what stage you'd reached. He tracked you the same way I track waypoints — current position, current state, trajectory."),
      d("KAEL",   "right", "neutral", "You know about the practice, then. The method."),
      d("TAL",    "left",  "neutral", "Eran believed people work better with full information. I reached the first threshold three years ago. Without his framework I would have taken longer, but I was working in that direction independently."),
      d("KAEL",   "right", "neutral", "You're practicing the method yourself."),
      d("TAL",    "left",  "neutral", "At the first threshold. The second practice requires a level of stationary concentration I haven't been able to sustain. The work here doesn't allow for it."),
      n("You sit with this. A network contact running eastern waypoints, alone in this building for seventeen months, practicing the Vraen method in whatever time the work allows. The kind of fact Eran would have filed without sentiment, because sentiment wasn't what it needed."),
    ],

    // Spark 13: Ryn's records
    [
      n("Ryn spreads the copied administrative records at one end of the table during her off-rotation. She has been waiting for a moment to do this since the Archive."),
      d("RYN",    "right", "quiet",   "The access codes in the third column — do you recognize the notation?"),
      d("TAL",    "left",  "neutral", "Which column."),
      d("RYN",    "right", "quiet",   "Third from the left. The six-digit strings with the prefix letters."),
      n("Tal leans over the pages. She does not touch them — she reads at a distance and turns her head slightly to check the angle of two different entries."),
      d("TAL",    "left",  "neutral", "These are Spire access codes. Not Archive. The prefix format is Spire internal — I've seen it in documents that came through the network from their administrative contractors."),
      d("RYN",    "right", "quiet",   "These are Archive administrative records. They shouldn't contain Spire access codes."),
      d("TAL",    "left",  "neutral", "No. They shouldn't. Where were these filed?"),
      d("RYN",    "right", "quiet",   "Lower administrative level. Third section. The records that documented archive borrowing and access."),
      n("Tal straightens up. The expression she uses when something fits into a slot where a different thing had been."),
      d("TAL",    "left",  "neutral", "Someone at the Archive was filing Spire access codes in Archive records. As if they were Archive codes. Eleven records in this set, from the look of it."),
      d("RYN",    "right", "quiet",   "Seventeen. I found more in the secondary stack."),
    ],

    // Spark 14: What Dorath carries
    [
      n("Dorath's pack is the one she never sets down in a new place. At the Archive she carried it from the moment the bell rang. On the road east she has carried it in front. At Tal's building she set it against her chair and not against the wall."),
      d("KAEL",   "right", "neutral", "What's in the pack. The specific one."),
      n("She is on the second watch. She doesn't look at you."),
      d("DORATH", "left",  "neutral", "Why do you ask?"),
      d("KAEL",   "right", "neutral", "You've never put it down except to sleep. Even then it's within reach."),
      d("DORATH", "left",  "neutral", "Fallback documents. Network contact addresses — coded, not readable without the key. Three sets. The original set, which I made when I started this work eleven years ago. A second set from five years ago when the network changed shape. A third set I updated two weeks before the Archive burned."),
      d("KAEL",   "right", "neutral", "You knew something was going to happen."),
      d("DORATH", "left",  "neutral", "I didn't know specifically. I updated the third set because it was time to update it. I update it every six months regardless. If the network collapses and we separate, those addresses are how we find each other."),
      d("KAEL",   "right", "neutral", "Have you ever had to use them? The fallback addresses."),
      d("DORATH", "left",  "neutral", "No. Eleven years and I've never had to use them. I've always hoped I wouldn't. I've always updated them anyway."),
    ],

    // Spark 15: The document case
    [
      n("Before dawn. Tal moves to the locked cabinet. There is no announcement — she simply moves there, opens it with a key she produces from somewhere about her coat, and takes out an object."),
      n("Not a book. A document case. Smaller than Maren's, the same construction: a clasp, a pressure seal, leather worn smooth in the way of something handled regularly. She sets it on the table between the lamp and the papers."),
      d("TAL",    "left",  "neutral", "I have been deciding when to show you this since you walked through the door. I've decided now."),
      d("MAREN",  "left",  "neutral", "What is it."),
      d("TAL",    "left",  "neutral", "This is what I spent six hours in the Archive's passage carrying. The case I was handed through the door. I have not opened it since I arrived here — the seal has been intact."),
      n("She presses the clasp three times. Maren is watching. The look on her face is not surprise."),
      d("MAREN",  "left",  "neutral", "You recognize the seal check."),
      d("TAL",    "left",  "neutral", "Eran taught me. Three presses."),
      n("She opens the case. Inside: a single document, folded once, in a hand that is not Maren's and not Eran's. Old paper. The kind that comes from original sources rather than copy stock."),
      d("MAREN",  "left",  "neutral", "The fourteenth fragment. The original."),
      d("TAL",    "left",  "neutral", "The one that should have burned with the Archive. Yes."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 10 — Voss
  // Setting: Tal's building
  // Characters: Player, Maren, Ryn, Dorath, Brek, Tal
  // ═══════════════════════════════════════════════════════════════════════════
  w10: [

    // Spark 1: Tal and the passage
    [
      n("The morning after. Tal sits at the table where they spent last night going through her complete account. She has been holding pieces back until she could judge the room's reception, and the room has been accepting. She continues."),
      d("TAL",    "left",  "neutral", "The passage door. I was the one in the passage from the Archive side. Six hours, from the evening before the fire until you came through."),
      d("KAEL",   "right", "neutral", "Six hours in the dark."),
      d("TAL",    "left",  "neutral", "I had water and a lamp with the wick turned low. The passage is not uncomfortable if you're prepared."),
      d("KAEL",   "right", "neutral", "Why you? Why not someone else?"),
      d("TAL",    "left",  "neutral", "Because I knew the Archive's lower level. I'd been in it twice, legitimately — Dorath's network had occasional reasons to move things through the building before the current situation. I knew the door. I knew how it worked."),
      d("KAEL",   "right", "neutral", "Dorath thought you had disappeared."),
      d("TAL",    "left",  "neutral", "I had to go dark on the network to go dark on anything watching the network. If Dorath had been followed, contact with me would have led them here. The safest thing for this building was for Dorath not to know it existed."),
      d("DORATH", "left",  "neutral", "You could have sent word that you were operational. Not where. Just that."),
      d("TAL",    "left",  "neutral", "I thought about it. I decided the silence was cleaner. I was wrong about that. I'm sorry."),
      n("Dorath is quiet for a moment. The look on her face is not anger — more the specific expression of someone who has spent two years computing the wrong explanation for a gap and is now correcting the record."),
    ],

    // Spark 2: What Voss is
    [
      n("Tal's account of Voss comes in the afternoon, when they have had a meal and sleep and the raw urgency of last night has settled into something more workable."),
      d("TAL",    "left",  "neutral", "Voss is not a person's name. It is a designation — the person currently holding a specific position in an institution that has been working toward the same goal for four generations."),
      d("MAREN",  "left",  "neutral", "Four generations. The goal being control of whoever completes the Vraen method."),
      d("TAL",    "left",  "neutral", "Not control, precisely. Capture. And not control of the person — of what they carry. The method's completion generates something that has no physical form. It cannot be seized directly. The only way to access it is through the person who has it."),
      d("KAEL",   "right", "neutral", "So they need the person alive."),
      d("TAL",    "left",  "neutral", "They need the person available. Cooperative. This is why the Archive was burned rather than seized. They couldn't take it and they couldn't stop what was already in progress, so they removed the building to force the practitioners into the open where they're easier to find."),
      d("MAREN",  "left",  "neutral", "And the four generations."),
      d("TAL",    "left",  "neutral", "This has been recurring. The Archive was disrupted once before, two hundred and sixty years ago. The records of that disruption were destroyed — officially — but Eran found evidence in the deep records that the disruption was Voss. Different person, same position, same goal."),
      n("The silence in the room has the quality of something old and large being fully understood for the first time."),
      d("BREK",   "left",  "neutral", "They have been trying for two hundred and sixty years."),
      d("TAL",    "left",  "neutral", "At least."),
    ],

    // Spark 3: The fragment's margins
    [
      n("The fragment on the table — the one that should have burned — is the original fourteenth piece. Maren has now read both the copy she carried and Tal's original, and the comparison she is running is visible in the way she holds very still."),
      d("KAEL",   "right", "neutral", "What's the difference between the copy and the original?"),
      d("MAREN",  "left",  "neutral", "The copy is accurate. Every word. But the original carries marginal notation that the copyist did not transcribe — they may not have known the notation was significant."),
      d("KAEL",   "right", "neutral", "Who copied the fourteenth fragment?"),
      d("TAL",    "left",  "neutral", "Your sibling. Sira. She found the original in the deep records six months before the fire. She copied it and left the original in the Archive because she wasn't certain what it meant yet. When the fire was coming, she went back for it. She gave it to me before she left."),
      d("KAEL",   "right", "surprised", "Sira knew about the fourteenth fragment."),
      d("TAL",    "left",  "neutral", "She found it independently. No one told her where to look. She was reading the deep records the same way Serath was reading them — separately, each not knowing the other was doing it."),
      d("MAREN",  "left",  "thoughtful", "Hmm."),
      n("The notation in the margins of the original — Maren is reading it with the care she gives to things she may only see once. It is not in the original archivist's hand. Older, added at some point between the original's composition and the Archive's founding. Someone annotated the fourteenth fragment in the four hundred years since it was written."),
      d("MAREN",  "left",  "neutral", "The marginal notation describes what the fourteenth stage produces. In more specific terms than the fragment itself."),
      d("KAEL",   "right", "neutral", "What does it say?"),
      d("MAREN",  "left",  "neutral", "It says: the fourteenth stage is the only stage that cannot be taken from you. Everything before it can be disrupted. After it, the question of seizure becomes irrelevant."),
    ],

    // Spark 4: Dorath and Tal
    [
      n("A moment without Maren or Brek — you and Dorath and Tal sitting at the far end of the room, two cups of something warm. The history between Dorath and Tal fills the air without needing to be named."),
      d("DORATH", "left",  "neutral", "The building. How long have you had it?"),
      d("TAL",    "left",  "neutral", "Three years. Since the contact we both know set it up as an eastern node."),
      d("DORATH", "left",  "neutral", "I didn't know it existed."),
      d("TAL",    "left",  "neutral", "I know. The eastern contacts and the western contacts were kept separate. Less surface."),
      d("DORATH", "left",  "neutral", "You knew about the Vraen method."),
      d("TAL",    "left",  "neutral", "Everything our contact was willing to tell me, which was most of it. He believed people work better with the full weight."),
      d("DORATH", "left",  "neutral", "I disagreed with him on that."),
      d("TAL",    "left",  "neutral", "I know. He told me. He also said you were right more often than you were wrong about practical things, and he was right more often than you were wrong about people. He thought you were both necessary."),
      n("A long pause. Dorath looks at her cup."),
      d("DORATH", "left",  "neutral", "He was a good person."),
      d("TAL",    "left",  "neutral", "Yes. He was."),
      d("KAEL",   "right", "neutral", "What do we call him? You both just say 'our contact' and 'he.'"),
      d("TAL",    "left",  "neutral", "Eran. His name was Eran. I think you knew him too."),
    ],

    // Spark 5: The question Ryn asks
    [
      n("Maren has finished the marginal notation. She sets the fragment down and looks at Tal."),
      d("MAREN",  "left",  "neutral", "The fourteen stages. They have never been fully completed by any recorded person. The Archive was only ever producing the preparation."),
      d("TAL",    "left",  "neutral", "That is the consensus in the deep records, yes."),
      d("MAREN",  "left",  "neutral", "And the person who wrote the fourteenth fragment?"),
      d("TAL",    "left",  "neutral", "Unknown. The notation places it two hundred years after the first thirteen. Someone completed the work two hundred years after the original archivist left thirteen stages, added the fourteenth, and then — there is no record of what happened to them."),
      d("BREK",   "left",  "neutral", "A person who carried something that couldn't be taken."),
      d("TAL",    "left",  "neutral", "Whatever they knew goes with them. Except the fragment, which they left."),
      d("KAEL",   "right", "neutral", "Why?"),
      d("TAL",    "left",  "neutral", "Same reason the original archivist left the first thirteen. So the next person wouldn't have to start from scratch."),
      n("The night has settled in fully. The lamp burns at its usual steady height. Ryn, who has been reading in the corner, looks up. Her expression is the one she uses when she is very nearly ready to say something."),
      d("RYN",    "right", "quiet",   "Sira found the fourteenth fragment independently. Six months before the fire. And then left the Archive two weeks before the fire started, following a lead."),
      n("Nobody speaks."),
      d("RYN",    "right", "quiet",   "Where was she going?"),
    ],

    // Spark 6: The fourteen stages in sequence
    [
      n("Morning. The day after the revelation of the fourteenth fragment, the document put safely away, the group rested in shifts. Maren maps the stages against the group's current positions at the breakfast table. Not for sentiment — for operational clarity."),
      d("MAREN",  "left",  "neutral", "Fourteen stages. The practice builds on itself — each threshold changes the character of what comes after. Where we are: I have completed the method. Brek is approaching the second threshold. Kael reached the first threshold two weeks ago. Ryn is beginning the first practice."),
      d("KAEL",   "right", "neutral", "And Serath?"),
      d("MAREN",  "left",  "neutral", "Based on the deep records' description of how the method progresses — if he found the records four months before the fire and has been practicing — third threshold. Possibly. The timing is compressed, but Serath has the kind of mind that compresses well."),
      d("BREK",   "left",  "neutral", "And Sira?"),
      n("A pause. Maren looks at the case on the shelf where the fragment is kept."),
      d("MAREN",  "left",  "neutral", "Sira found the fourteenth fragment six months before the fire. The marginal notation describes what the fourteenth stage produces. She would have been reading it with the second practice established. She is ahead of where any of us were at the equivalent point."),
      d("TAL",    "left",  "neutral", "She was in the Archive longer than Kael. She had more time with the material."),
      d("MAREN",  "left",  "neutral", "Time is part of it. But the quality of her independent work — she found the same things I found, by the same route, without being told which direction to look. That is not only time."),
    ],

    // Spark 7: How Voss identifies practitioners
    [
      n("The detection question comes from Brek, in the afternoon, while Tal is out running her district contacts and the group has the building to itself."),
      d("BREK",   "left",  "neutral", "The deep records describe the method. They also describe how to detect people who are practicing it."),
      d("MAREN",  "left",  "neutral", "Yes. This is the fundamental design problem the original archivist did not solve."),
      d("BREK",   "left",  "neutral", "The same text that teaches you teaches you how to find others who've learned it."),
      d("MAREN",  "left",  "neutral", "The original records were written for practitioners who wanted to verify each other's progress — a collegial purpose. The detection descriptions are precise enough that someone who reads them and understands them can identify practitioners by behavioral observation. Changes in how they process incoming information. Specific response patterns."),
      d("KAEL",   "right", "neutral", "And Voss has been reading the deep records."),
      d("MAREN",  "left",  "neutral", "They have had the deep records, or access to them, for at least two of the four generations Tal described. The detection capability they developed is built on the same documentation that built the Archive."),
      d("RYN",    "right", "quiet",   "So everything the Archive did to protect the practice — Voss has been using the same records to hunt it."),
      d("MAREN",  "left",  "neutral", "Yes. That is correct."),
    ],

    // Spark 8: What happened to the third generation's target
    [
      n("Tal's account of the third generation comes in pieces — she doesn't have a complete record, only what survived in the eastern network's archives. She gives what she has without dramatizing the gaps."),
      d("TAL",    "left",  "neutral", "The third generation's target was a practitioner who had reached the thirteenth stage. This was two hundred years ago — different institution, different context, but the method was the same. Voss found them because the detection records described a specific change in how a person at the thirteenth stage interacts with unfamiliar material."),
      d("KAEL",   "right", "neutral", "They were captured."),
      d("TAL",    "left",  "neutral", "Held. The deep records describe it obliquely — 'retained in cooperative arrangement' is the phrase. For twelve years."),
      d("MAREN",  "left",  "neutral", "Cooperative."),
      d("TAL",    "left",  "neutral", "The word they use. The practitioner disappeared from the record after twelve years. Whether they completed the method in that time, or whether they died without completing it, the records don't say."),
      d("BREK",   "left",  "neutral", "What did Voss get from twelve years with them?"),
      d("TAL",    "left",  "neutral", "A better description of the detection markers. The practitioner's cooperation — willing or otherwise — gave them documentation of what each stage looks like from the outside. That is the basis for their current detection capability."),
      n("The room holds this. Twelve years. The improvement on their detection system. The practitioner who may or may not have completed the method while in their custody. The specific cruelty of having produced, through twelve years of extraction, the tool that makes future capture easier."),
    ],

    // Spark 9: Maren's response to Sira's independence
    [
      n("It comes out in the afternoon, unprompted. Maren has been quiet for an hour, reading the fragment's marginal notation again. Then she sets it down."),
      d("MAREN",  "left",  "neutral", "The probability of what Sira did is very low."),
      d("KAEL",   "right", "neutral", "Finding the fourteenth fragment independently."),
      d("MAREN",  "left",  "neutral", "Finding it by the correct route at the correct stage to understand what she was reading. The deep records' third section is accessible — the Archive was not fully restricted. But knowing what to look for, and knowing how to read what you find, requires the practice to be sufficiently developed. She reached that point independently, without a teacher, without the framework I had from Eran."),
      d("KAEL",   "right", "neutral", "Does that surprise you?"),
      n("A long pause. Maren looks at the case."),
      d("MAREN",  "left",  "neutral", "It tells me I underestimated her. I was aware of her work in the Archive — she worked near my section for three years. I knew she was capable. I did not know she was doing this."),
      d("KAEL",   "right", "neutral", "She didn't tell you."),
      d("MAREN",  "left",  "neutral", "She didn't tell me. And she was right not to — if she had told me, I would have absorbed her into my work rather than letting her independent line develop. Her path has produced something different from mine. From the walls' description, this will matter."),
    ],

    // Spark 10: What Voss cannot have planned for
    [
      n("The gap in Voss's knowledge — Tal identified it three months ago, working through the detection records they have access to. She explains it that evening."),
      d("TAL",    "left",  "neutral", "The detection system they built is designed to identify practitioners who completed the method within institutional contexts. Someone who advanced through a controlled setting — consistent behavioral baseline, observable changes against a known background."),
      d("MAREN",  "left",  "neutral", "Someone who completed it in the Archive."),
      d("TAL",    "left",  "neutral", "Or in any of the predecessor institutions. The detection markers they documented are calibrated for institutional practitioners. Someone who completed the method outside an institution, independently, without institutional behavioral baseline — the markers don't apply in the same way."),
      d("KAEL",   "right", "neutral", "Sira. And you."),
      d("TAL",    "left",  "neutral", "At the first threshold, in this building, alone. Yes. Their detection system cannot have been designed for this."),
      d("MAREN",  "left",  "neutral", "They will adapt."),
      d("TAL",    "left",  "neutral", "Eventually. But adaptation requires encountering the thing they haven't designed for. We have a window of invisibility for those who completed or are advancing outside their expected framework."),
      n("Maren looks at Ryn. Ryn has been copying her administrative records since before the fire, for reasons she herself didn't fully understand until now. Outside institutional context. Independently. Practicing."),
    ],

    // Spark 11: Eran described
    [
      n("The two people in the room who knew Eran best — Dorath and Tal — end up at the same end of the table without intending to. You stay within hearing range and say nothing."),
      d("DORATH", "left",  "neutral", "He built this entire eastern structure without telling me it existed."),
      d("TAL",    "left",  "neutral", "He kept the networks separate. His reasoning: one compromised network shouldn't expose the other. Two independent structures that can still function if the other is damaged."),
      d("DORATH", "left",  "neutral", "He was right. The western network is compromised — the Archive burned, my contacts are scattered. The eastern network is intact because he never told the western side it existed. He was right and I still want to argue with him about it."),
      d("TAL",    "left",  "neutral", "He expected that. He told me: if Dorath ever finds out, she'll understand the reasoning and disagree with the method. He said he'd find that fair."),
      n("A sound that isn't quite a laugh from Dorath. It moves past quickly."),
      d("DORATH", "left",  "neutral", "What else did he say. About us. About the work."),
      d("TAL",    "left",  "neutral", "That the work was further along than anyone in it could see from the inside. That the group was what he'd been building toward. That he'd hoped to see this part of it and he didn't have enough time."),
      d("DORATH", "left",  "neutral", "He ran out of time."),
      d("TAL",    "left",  "neutral", "Yes. He did. He was disappointed about it in the specific way he was disappointed about things — he noted it once, precisely, and moved on to the next task."),
    ],

    // Spark 12: The marginal notation in full
    [
      n("Maren reads the marginal notation aloud, slowly, because some of it requires the cipher to decode and she translates as she reads. The group is quiet. This is the only first-person account of the fourteenth stage's effect that anyone in the room has ever encountered."),
      d("MAREN",  "left",  "neutral", "The writer describes it this way: 'The Archive burns. I mean this literally and I mean it as a figure. The institution that housed my work is now irrelevant to my continued work. What I carry does not reside in any building. It does not require any building. This is what I tried to say to everyone who would listen, and no one understood me until they reached it themselves, and now I understand why.'"),
      d("KAEL",   "right", "neutral", "They're describing the structural permanence."),
      d("MAREN",  "left",  "neutral", "The fourteenth stage is the first stage where the structural change is not subject to erosion. The first thirteen are practices — they must be maintained. The fourteenth is a different category. It is not a practice anymore."),
      d("RYN",    "right", "quiet",   "What is it?"),
      d("MAREN",  "left",  "neutral", "The marginal notation uses a word I will translate loosely as 'property.' Not something you do. Something you are. The distinction is — "),
      n("She pauses. Reads the next section without speaking."),
      d("MAREN",  "left",  "neutral", "The distinction is that it cannot be extracted. The thirteen practices can theoretically be disrupted — remove the practitioner from their material, impose sufficient stress, interrupt the practice long enough. The fourteenth cannot be disrupted because there is nothing discrete to disrupt. It has become the practitioner."),
    ],

    // Spark 13: How many completers in history
    [
      n("Tal has been going through the eastern network's copy of the deep records' third section. She brings her findings to the group before bed."),
      d("TAL",    "left",  "neutral", "The deep records document completion of the fourteen stages four times in recorded history. Four confirmed. Two probable, based on notation that describes behavioral effects consistent with completion without explicit confirmation. And one more, older — predating the Archive, from a source that describes the method in terms that suggest direct experience but without explicit stage accounting."),
      d("KAEL",   "right", "neutral", "Seven total, possible."),
      d("TAL",    "left",  "neutral", "In five hundred years of documented work. Across every institution that has housed the practice."),
      d("BREK",   "left",  "neutral", "And Maren is number five confirmed."),
      d("TAL",    "left",  "neutral", "As of now. With three more people in this building who are actively advancing."),
      n("The implication of the arithmetic is something you do not say aloud. In five hundred years: seven. In this room, in the next months or years: possibly three more. The concentration of it here is either the result of Eran's work succeeding beyond what anyone planned for, or it is the result of something the method produces in people when they work in proximity."),
      d("MAREN",  "left",  "neutral", "The resonance effect. It propagates in proximity as well as internally. Working with people who are practicing accelerates the practice. I have known this for years. I did not mention it because the information would not have changed how we worked."),
      d("KAEL",   "right", "neutral", "Why not?"),
      d("MAREN",  "left",  "neutral", "Because you were already working. Telling you would only have added an expectation layer that would have gotten in the way."),
    ],

    // Spark 14: What Brek finds in Ryn's records
    [
      n("Brek and Ryn at one end of the table, midday, going through the administrative records together. Brek has been at this since Ryn laid them out — a systematic cross-reference."),
      d("BREK",   "left",  "neutral", "The permit applications. Third stack, the ones you marked with a red corner."),
      d("RYN",    "right", "quiet",   "Building permits for the eastern city, upper district. Filed under a contracting name I recognized from a secondary administrative record — a name used by a shell entity associated with Spire administrative spending."),
      d("BREK",   "left",  "neutral", "Building permits for what kind of structure."),
      d("RYN",    "right", "quiet",   "A research facility. Description: three floors, restricted upper level, controlled-access ground entry. Filed three years ago. Construction completion projected for this year."),
      n("Brek goes still in the way he goes still when a large number resolves into a shape he wasn't expecting."),
      d("BREK",   "left",  "neutral", "They've been building for three years."),
      d("RYN",    "right", "quiet",   "Under a false name, in the eastern city's upper district. And there's an annotation in the margin of the permit application — not by whoever filed it. Different hand."),
      d("BREK",   "left",  "neutral", "Serath."),
      d("RYN",    "right", "quiet",   "It's his notation style. He wrote in the margin: 'internal north section — restricted to four personnel.' He knew about this building before the fire."),
    ],

    // Spark 15: The person at the entrance
    [
      n("Night. Second rotation. Brek comes in from a circuit without urgency — which is a different thing from coming in without information."),
      d("BREK",   "left",  "neutral", "There's a person at the district's western entrance. They've been there for forty minutes."),
      d("DORATH", "left",  "neutral", "Movement?"),
      d("BREK",   "left",  "neutral", "None. Standing. Not concealed — they're in the open, at the road's edge. They have a lamp."),
      d("DORATH", "left",  "neutral", "Lamp on or off?"),
      d("BREK",   "left",  "neutral", "Off. They're carrying it unlit. And a satchel with a document case inside — the satchel has the shape of it."),
      n("Dorath and Maren look at each other."),
      d("MAREN",  "left",  "neutral", "The shape of what kind of case."),
      d("BREK",   "left",  "neutral", "The kind with a three-press seal. Based on the satchel dimensions."),
      n("The room is quiet. The person at the western entrance is standing in the dark with an unlit lamp and a document case in a satchel, forty yards from this building, not moving. Waiting."),
      d("DORATH", "left",  "neutral", "How long has Serath been ahead of us on the eastern road."),
      d("TAL",    "left",  "neutral", "Twelve days. Fifteen if he moved slower than the markers suggested."),
      d("MAREN",  "left",  "neutral", "The markers he left. They were for us. So we would follow the route. But someone else may have followed the markers too."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 11 — What You Carry
  // Setting: Tal's building, the settlement district
  // Characters: Player, Maren, Ryn, Dorath, Brek, Tal
  // ═══════════════════════════════════════════════════════════════════════════
  w11: [

    // Spark 1: Three days of practice
    [
      n("Three days in one place. Maren gives the group three full days of stationary work — not resting, not waiting. Working. You practice. She practices alongside you for the first time, not demonstrating but doing. The difference between watching someone do the second practice and doing it alongside them is significant."),
      d("KAEL",   "right", "neutral", "You're doing the fourth practice."),
      d("MAREN",  "left",  "neutral", "The eighth. There are fourteen in the method. I completed the fourteenth fourteen years ago. I maintain the practice now because cessation reverses the later stages."),
      d("KAEL",   "right", "neutral", "If you stopped."),
      d("MAREN",  "left",  "neutral", "If I stopped entirely for a long enough period, the structural changes begin to erode. The fragments are specific about this — the method is not a destination. It is a practice. The destination is continued practice."),
      d("KAEL",   "right", "neutral", "That's not what I expected."),
      d("MAREN",  "left",  "neutral", "What did you expect?"),
      d("KAEL",   "right", "neutral", "That completing it meant — done. Finished. You carry it."),
      d("MAREN",  "left",  "neutral", "You carry it through continuing to hold it. The method is not a box. It is a practice that, once integrated, becomes very low-cost to maintain — but low-cost is not zero. The original archivist describes people who completed early stages and stopped, thinking they had arrived. They describe what happened to those people's knowledge over years."),
      d("KAEL",   "right", "neutral", "What happened?"),
      d("MAREN",  "left",  "neutral", "It compressed. Slowly. The way all knowledge compresses without maintenance. The difference is that with the method, you notice it — because the standard for what you're holding is precise, the degradation is detectable."),
      n("You hold what you were working with and check it. It is there, precise, without compression. The practice is working. You understand, now, what it means for it to keep working."),
    ],

    // Spark 2: Tal's building history
    [
      n("You ask Tal about the building in the afternoon, while she is working on the external drainage that Dorath has been helping with."),
      d("KAEL",   "right", "neutral", "This building. Who used it before you?"),
      d("TAL",    "left",  "neutral", "A contact of Eran's who was doing work in the settlement district before the eastern network formalized. She moved north when the work moved north. The building sat empty for three years before I took it."),
      d("KAEL",   "right", "neutral", "How old is it?"),
      d("TAL",    "left",  "neutral", "Old. Forty years, maybe more. The stone is the same cut as the earlier settlement buildings in the district, before they switched quarries."),
      d("KAEL",   "right", "neutral", "And the shelf where Ryn found the removed object."),
      d("TAL",    "left",  "neutral", "I took it. Six months ago, before I went dark on the network. It was a book — not mine, I found it when I moved in. I moved it to the locked cabinet because I wasn't sure what it was yet."),
      d("KAEL",   "right", "neutral", "What was it?"),
      d("TAL",    "left",  "neutral", "Notes. A record of someone's independent work — not the Vraen fragments specifically, but working in parallel with them. Using the same principles, arriving at the same structures, without having read the original source."),
      d("KAEL",   "right", "neutral", "Someone who discovered the method on their own?"),
      d("TAL",    "left",  "neutral", "Someone who got very close. The notes stop mid-practice. They left the building at some point in the middle of the work and did not come back to finish the record."),
      n("She returns to the drainage. You look at the locked cabinet and think about unfinished work and abandoned records and the long gap between someone starting the practice and someone completing it."),
    ],

    // Spark 3: Brek's fourth problem solved
    [
      n("Brek runs the morning circuit and comes back different — the particular stillness of someone who has finished a calculation and is now in the space after."),
      d("KAEL",   "right", "neutral", "You have it."),
      d("BREK",   "left",  "neutral", "Most of it. The mechanism of adjacency — why the practice makes adjacent knowledge more precise rather than just held knowledge. It has to do with the threshold."),
      d("KAEL",   "right", "neutral", "The first threshold."),
      d("BREK",   "left",  "neutral", "When the practice becomes structural, the baseline for incoming material changes. Things you encounter after the threshold land differently — more precisely, because the mind's default processing is now configured for precision."),
      d("KAEL",   "right", "neutral", "So it's not just what you hold."),
      d("BREK",   "left",  "neutral", "It's what you receive afterward. Yes. The method changes the incoming process, not just the storage process."),
      n("You think about what you've been learning in the past three days. The way the second practice's resonance is beginning to produce connections you didn't make before."),
      d("KAEL",   "right", "neutral", "You said you were close to the fourth problem two days ago. What changed?"),
      d("BREK",   "left",  "neutral", "I reached the second threshold of the practice this morning. The mechanism became visible from inside it."),
      n("He says this the same way he says everything — flatly, factually. The second threshold of the Vraen practice. Two thresholds, in the time since the Archive burned. For Brek, the fourth problem and the second threshold arrived together, which is exactly what he would have predicted if he had known to predict it."),
    ],

    // Spark 4: What Tal knows about Sira
    [
      n("Tal knows more about Sira than she's said. You've been feeling this since the first night — the way she answers questions about Sira with slightly less precision than she answers everything else. You ask directly."),
      d("KAEL",   "right", "neutral", "You know more about where Sira went. Don't you."),
      n("A pause. She looks at her hands."),
      d("TAL",    "left",  "neutral", "I knew where she was going. I gave her the route."),
      d("KAEL",   "right", "neutral", "Where?"),
      d("TAL",    "left",  "neutral", "The original settlement. The place where the practice was first documented — before the Archive existed, before any institution existed. The original archivist's location. The deep records describe it. Sira found the description."),
      d("KAEL",   "right", "neutral", "And you knew where it was."),
      d("TAL",    "left",  "neutral", "Eran believed he had identified it. He was not certain. He gave me the coordinates twelve years ago and told me if anyone needed to go there, they would need to cross through this district. Through my node."),
      d("KAEL",   "right", "neutral", "You were the eastern waypoint."),
      d("TAL",    "left",  "neutral", "For anyone going to the settlement. Yes."),
      d("KAEL",   "right", "neutral", "And Sira used you."),
      d("TAL",    "left",  "neutral", "She came through here six weeks ago. I gave her the route."),
      n("The thing that has been sitting in the room since the first night — what Ryn's question was pointing at — resolves. Sira is not missing. Sira is somewhere specific. And Tal knows where."),
    ],

    // Spark 5: The locked cabinet
    [
      n("The cabinet Tal mentioned is in the back corner of the building, behind a partition. She opens it in the evening."),
      d("TAL",    "left",  "neutral", "I have been deciding whether to show you this. I have decided."),
      n("She places a small book on the table between you. Leather-bound, the kind of journal you carry when the work is ongoing. The cover is plain. The spine is worn."),
      d("KAEL",   "right", "neutral", "The notes you found when you moved in."),
      d("TAL",    "left",  "neutral", "No. This is a different book. This was placed on the shelf recently. Within the last month."),
      d("KAEL",   "right", "neutral", "By who?"),
      d("TAL",    "left",  "neutral", "By whoever uses this district as a waypoint going east."),
      n("You open the cover. The handwriting is familiar — you have known it since you could read, since you were young, since every letter and every note and every shared page of study. On the first page, in handwriting you know as well as your own: a date from three weeks ago."),
      n("And a sentence."),
      n('"I left this for you. You will find it when you find this building. By then, you will know enough to understand what I found."'),
      n("It is Sira's writing. She was here. She left this for you. She knew you would come through this building because she knew the route. And by the date on the page, she was here and gone three weeks ago, ahead of all of you, on a path that leads to a place the deep records describe and Tal knows how to reach."),
    ],

    // Spark 6: Reading through the night
    [
      n("The journal is dense. You read until the lamp needs refilling, then read by the light of the refilled lamp. Sira writes the way she does everything: precisely, in sequence, without editorializing. The entries cover six months."),
      n("The first section is familiar — the same stacks you both worked in, the same notation conventions, the same administrative indexing system. She found the Vraen administrative records twelve weeks before you did. She didn't tell you. You find you are not surprised."),
      d("RYN",    "right", "quiet",   "She found the detection records too. Look at the entry from the fourth month."),
      n("The fourth month's entry: 'Detection records in secondary section. The same notation describes how to advance the practice and how to identify those who have. Someone who reads this without the practice to contextualize it has a weapon. I am not going to copy this section.'"),
      d("KAEL",   "right", "neutral", "She knew not to copy it."),
      d("RYN",    "right", "quiet",   "She made a judgment about what to take. The administrative access records she left me — the ones with the Spire codes embedded — she copied those specifically. She was curating what she left."),
      n("Not random archival work. Selection. What she kept, what she left, what she copied for Ryn, what she didn't copy. The journal is a record of those decisions as much as anything else."),
    ],

    // Spark 7: Sira's parallel discoveries
    [
      n("The second section of the journal. Two months before the fire. She has found the fourteenth fragment, read it twice, and set it back in the deep records where she found it. The entry for that day is brief: 'The fourteenth fragment confirms the structure. The method is complete. What I have is the first thirteen. What I need is time to reach the stages the fourteenth describes.'"),
      d("KAEL",   "right", "neutral", "She left it in the records. She could have taken it."),
      d("BREK",   "left",  "neutral", "Leaving it was a choice. She wanted someone else to be able to find it."),
      d("KAEL",   "right", "neutral", "Or she trusted that it would still be there when she needed to come back for it."),
      d("BREK",   "left",  "neutral", "Or both."),
      n("You read the next entry: three days later. 'Found an administrative annotation in the access records that suggests the detection section has been accessed recently by someone with a Spire access code. I don't know who. I am being more careful about when I work in the lower stacks.'"),
      d("KAEL",   "right", "neutral", "She saw the Spire codes in the access records before Ryn copied them."),
      d("RYN",    "right", "quiet",   "She didn't tell me what to look for. She just suggested which records were worth copying. I didn't know why until now."),
      d("KAEL",   "right", "neutral", "She was working three steps ahead of everyone."),
      d("RYN",    "right", "quiet",   "She was working independently and leaving the right things in reach of people who could use them. That's not the same thing. It's better."),
    ],

    // Spark 8: Brek's second threshold in practice
    [
      n("Brek's second threshold announcement — flat, factual — has had time to settle. In the afternoon you find him doing what he always does with new information: applying it to a concrete problem."),
      d("KAEL",   "right", "neutral", "What did you immediately use it for."),
      d("BREK",   "left",  "neutral", "The route east. I've been going over Tal's account and Dorath's map and the eastern survey records. Separately they're three incomplete pictures. After this morning they're one picture."),
      d("KAEL",   "right", "neutral", "The resonance effect."),
      d("BREK",   "left",  "neutral", "The second practice makes relationships between things visible. I have the survey data, the account, the map. I now see how they connect. The eastern valley has a secondary approach that isn't marked on the main route — it's in the survey records under a different designation. The standard route is watched. The secondary one is not."),
      d("KAEL",   "right", "neutral", "How do you know it's not watched?"),
      d("BREK",   "left",  "neutral", "Because the survey records list it as a water access path, not a transit route. Someone watching the eastern approach would watch the routes, not the water access paths. It adds two hours. It means arriving at the valley from the west face instead of the north."),
      d("KAEL",   "right", "neutral", "You found this this morning."),
      d("BREK",   "left",  "neutral", "I found it this morning. Before this morning I had all three pieces. I just couldn't see the connection."),
    ],

    // Spark 9: Route detail
    [
      n("Dorath and Tal at the table with the map spread open. The planning session is practical and specific — not about the destination but the path to it, which is where most problems actually occur."),
      d("DORATH", "left",  "neutral", "Three days if we move at standard pace. Two if we push. We don't push — pushed pace degrades observation quality, and observation quality on an unknown road is what keeps you alive."),
      d("TAL",    "left",  "neutral", "The eastern road is old but maintained. The first day's terrain is open — visible from distance in both directions. The second day enters the tree line section, which provides cover but also limits sightline."),
      d("DORATH", "left",  "neutral", "Brek's secondary approach."),
      d("TAL",    "left",  "neutral", "I know it. Eran used it twice. The water access path cuts east through the valley's lower drainage and emerges below the main settlement building. The approach is less visible from the eastern ridge."),
      d("DORATH", "left",  "neutral", "Is the path clear enough to walk without marking it?"),
      d("TAL",    "left",  "neutral", "If it rained in the past two weeks, the soft sections will show prints. If it hasn't, it's stone and root — no print."),
      d("DORATH", "left",  "neutral", "We'll know when we get there. We take the secondary approach regardless and accept the soft section risk. The alternative is arriving via the route a watcher would expect."),
    ],

    // Spark 10: Maren's assessment of Sira's journal
    [
      n("Maren asks to see the journal after the evening meal. She reads for two hours. When she hands it back, she says one thing."),
      d("MAREN",  "left",  "neutral", "She reached the adjacency threshold in week three of formal practice."),
      d("KAEL",   "right", "neutral", "The second threshold?"),
      d("MAREN",  "left",  "neutral", "Second practice, first threshold. Which is different from the second practice's completion threshold. But still: week three."),
      d("KAEL",   "right", "neutral", "Is that fast?"),
      d("MAREN",  "left",  "neutral", "I reached it in week eleven. Brek reached it in week four, which I considered exceptional. Week three, without a teacher and without the framework I had from Eran, is outside the range I would have predicted for anyone."),
      n("She sits with this. Not distress, not amazement. Assessment."),
      d("MAREN",  "left",  "neutral", "The walls will give her more than they will give any of us. The walls are written in first-person experiential terms. Reading them with the method sufficiently advanced is like being taught by the person who developed the method. She will be reading them at a stage where that teaching is fully legible."),
      d("KAEL",   "right", "neutral", "She'll be ahead of us when we arrive."),
      d("MAREN",  "left",  "neutral", "Probably significantly. And that's a resource, not a problem."),
    ],

    // Spark 11: What Tal kept from Eran
    [
      n("Tal has one more thing to show the group. She has been deciding about it since they arrived. She shows it on the second stationary day, in the morning, without ceremony."),
      n("Not from the locked cabinet. From a compartment in the table's base — a flat space, fitted flush. She sets a sealed envelope on the table."),
      d("TAL",    "left",  "neutral", "Eran gave me this three days before he died. He said to open it when I had the full group in the same room. I have never had a full group. I am interpreting 'full' as this."),
      d("DORATH", "left",  "neutral", "What did he mean by full."),
      d("TAL",    "left",  "neutral", "He described it as: the people who are doing the work, assembled in one place, with the method having progressed to a point where they can read what he wrote."),
      d("MAREN",  "left",  "neutral", "He expected us to have the practice advanced to a certain stage before reading it."),
      d("TAL",    "left",  "neutral", "He said: if they read it too early they'll understand the words but not the substance. If they read it at the right stage, the words will open something."),
      n("She does not open it. She sets it on the table in front of Maren."),
      d("TAL",    "left",  "neutral", "You'll know if we're at the right stage."),
    ],

    // Spark 12: Reading Eran's letter
    [
      n("Maren opens the envelope. The letter inside is one page, in Eran's handwriting — the specific cramped precision of someone who learned to write for function rather than legibility. She reads it through once. Then she reads it aloud."),
      d("MAREN",  "left",  "neutral", "He writes: 'If you are reading this, the work has reached the point I spent twelve years trying to build toward. I don't know who is in the room with you. I know the shape of who I hoped would be there. Here is what I know that I have not been able to say to anyone while I was alive, because saying it would have changed how the work was done, and the work needed to be done as it was done.'"),
      d("MAREN",  "left",  "neutral", "'There is a building. Not Voss's building — older. The original settlement that predates the Archive. The walls in that building are the complete practice, written by the person who developed it. I have been there. I read what I could at the stage I was at, which was not sufficient to read all of it. I am leaving you the route.'"),
      n("She folds it and looks up."),
      d("MAREN",  "left",  "neutral", "He has been to the settlement."),
      d("KAEL",   "right", "neutral", "He told Tal he believed he had identified the location."),
      d("TAL",    "left",  "neutral", "I know. He told me he believed. He did not tell me he had been there. He did not tell me he had read the walls."),
    ],

    // Spark 13: The route Eran left
    [
      n("The second page of the letter — folded inside the first — is the route. In the specific notation Eran used for waypoint directions: readable only with the cipher's secondary key, which Maren holds. She decodes it while the group watches."),
      d("MAREN",  "left",  "neutral", "The route he used is the secondary approach. The water access path."),
      d("BREK",   "left",  "neutral", "The same one I found this morning from the survey records."),
      d("MAREN",  "left",  "neutral", "The same one. He came back this way and used the secondary approach on exit as well as entry. The valley has a watcher on the eastern ridge. This was true twelve years ago when he visited. He notes it specifically: 'approach from below, not from the north.'"),
      d("DORATH", "left",  "neutral", "The watcher has been there for twelve years."),
      d("MAREN",  "left",  "neutral", "Possibly the same person. Possibly a rotation. The note is twelve years old. But the observation that the watcher exists is still current intelligence."),
      d("TAL",    "left",  "neutral", "He gave me the coordinates and said he believed he had identified the location. He said 'believed' because he was protecting the information — he wanted me to discover the route myself so I could verify his coordinates, not simply trust them."),
      d("MAREN",  "left",  "neutral", "He verified. The coordinates in this letter are precise. He was there."),
    ],

    // Spark 14: Night before departure
    [
      n("The last evening at Tal's building. Packs are ready. The route is set. The building has the quality of a place that has given what it had to give."),
      d("TAL",    "left",  "neutral", "I'll maintain the building when you're gone. It will be here if you need it on the way back."),
      d("DORATH", "left",  "neutral", "What will you do?"),
      d("TAL",    "left",  "neutral", "The same thing I've been doing. Keep the eastern node active. Maintain the waypoints. Continue the practice when the work allows."),
      d("MAREN",  "left",  "neutral", "You could come."),
      d("TAL",    "left",  "neutral", "Someone needs to be here. The network needs an eastern node. If things go badly, this building is where people will come. I need to be the person who answers the door."),
      n("The group settles for the last night. Brek runs the circuit at the usual time. Ryn reads until the second watch. Maren does her practice in the far corner, the one that has become hers by habit over three days. You hold what you're working with and feel the first threshold holding steady under it — the background process, continuous, requiring no active maintenance. The practice works even here, in the dark, on the night before the last part of the journey."),
    ],

    // Spark 15: What Brek found in Eran's letter
    [
      n("Before dawn. Brek at the table, Eran's letter in front of him. Not reading — he has read it. He is looking at the route annotation in the margin."),
      d("BREK",   "left",  "neutral", "The secondary approach route. Eran marked a waypoint on it. Three miles from the valley entrance, at a rock formation he describes as 'the split stone facing east.'"),
      d("KAEL",   "right", "neutral", "A cache?"),
      d("BREK",   "left",  "neutral", "A cache marker. The description says: 'what was too heavy to carry out, left for whoever comes next.' Twelve years ago he cached something at the split stone."),
      d("KAEL",   "right", "neutral", "We don't know what's there."),
      d("BREK",   "left",  "neutral", "We know it's been there for twelve years. And we know he left it specifically for whoever reads this letter — because the letter is the only document that describes the cache location. He expected the letter to outlast him. He planned for the cache to be found by the right people at the right time."),
      n("The dawn is beginning outside. An hour until the group leaves. Three days to the valley. Three miles into the approach: a stone formation facing east, and something Eran carried all the way to the settlement and decided was too important to risk carrying back."),
      d("BREK",   "left",  "neutral", "It's been sitting there for twelve years. Waiting."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 12 — Sira's Book
  // Setting: Tal's building, then preparing to depart east
  // Characters: Player, Maren, Ryn, Dorath, Brek, Tal
  // ═══════════════════════════════════════════════════════════════════════════
  w12: [

    // Spark 1: Reading — the early months
    [
      n("You read through the first half of the journal before dawn. The writing is dense — she writes the way she thinks, without ceremony, each entry the exact length the thought requires. The first entry is eight months ago."),
      n('"Found the administrative index for pre-Archive Vraen scholarship in the lower stacks. The catalog uses notation I don\'t recognize from the standard collection — different enough that I went back to verify I wasn\'t misreading. I was not misreading. Someone organized the lower stacks using a separate notation system."'),
      d("KAEL",   "right", "neutral", "She found the deep records the same way you found the Vraen fragments. By noticing the notation was different."),
      d("RYN",    "right", "quiet",   "She was independent of Maren's work this whole time."),
      n("The entries in the middle months describe a parallel discovery — each piece Maren has been working through, found and worked through separately, in different order, with different starting assumptions. She approaches the method from the administrative records outward rather than from the fragments inward. The conclusions she reaches are the same. The path is completely different."),
      d("KAEL",   "right", "neutral", "She completed the second practice. Look."),
      n("You find the entry: six weeks before the fire, brief, dated in the precise way she dated everything when something was worth recording exactly."),
      n('"Second threshold this morning. The adjacency effect is real. Everything I\'ve been learning separately is now connected in ways I can see. The structure is becoming visible."'),
      n("Six weeks before the fire. The Archive was still standing. Serath was studying. You were still two months away from arriving. And Sira had already crossed the second threshold."),
    ],

    // Spark 2: What Sira found
    [
      n("The middle section of the journal is denser. She found the deep records' third section — the original archivist's account of what they did after completing the method — and read it in full."),
      n("Her summary of what she read fills four pages of tight writing. You read it twice."),
      d("KAEL",   "right", "neutral", "She says the original archivist found the settlement deliberately. Not by accident. They went looking for the place where the practice had been done before, because the deep records described it and they wanted to see it."),
      d("RYN",    "right", "quiet",   "Before the Archive."),
      d("KAEL",   "right", "neutral", "Long before. Before any institution. There was a place — she uses the word 'settlement' in quotes, like it's a translation of something older — where the practice was first documented. The archivist found it and spent time there. The walls."),
      d("RYN",    "right", "quiet",   "She writes about the walls."),
      n("She does. One entire page is about the walls of the settlement building — floor-to-ceiling notation in the deep records' system, a complete record of the practice in someone's hand. Not the original archivist's hand. Older. A completed person left their practice on the walls in full."),
      d("KAEL",   "right", "neutral", "The walls are the original archive. Before the Archive existed."),
      d("RYN",    "right", "quiet",   "And Sira went to see them."),
      n("You turn to the last entry. The date is three weeks ago. The last line reads: 'I'm going to find the walls. I'll be there when you get there.'"),
    ],

    // Spark 3: Dorath and the route
    [
      n("Dorath has been going through the route details since yesterday, laying out what she knows against what Tal knows. She comes to you with the map."),
      d("DORATH", "left",  "neutral", "Three days east. Possibly two if the weather holds and the path through the lower valley hasn't closed for the season. The settlement is in a valley basin — sheltered, not visible from the main roads."),
      d("KAEL",   "right", "neutral", "You've been there?"),
      d("DORATH", "left",  "neutral", "No. Eran described it to me. Tal has been closer — she knows the approach road."),
      d("KAEL",   "right", "neutral", "And Sira is three weeks ahead of us."),
      d("DORATH", "left",  "neutral", "Yes. She would have arrived roughly twelve days ago, assuming no delays. She'll have had time to settle in."),
      d("KAEL",   "right", "neutral", "Will the settlement be safe?"),
      d("DORATH", "left",  "neutral", "The settlement itself is not widely known. Eran's information came from one source in the deep records and his own verification thirty years ago. He confirmed it existed and was empty — the kind of place only found by people looking for it specifically."),
      d("KAEL",   "right", "neutral", "And Voss?"),
      d("DORATH", "left",  "thoughtful", "Voss has the deep records — or access to them through the insider Serath confronted. Whether they have had time to identify the settlement and reach it before us—"),
      n("She folds the map."),
      d("DORATH", "left",  "neutral", "We leave tomorrow. Early."),
    ],

    // Spark 4: Ryn's first threshold
    [
      n("Ryn has been practicing since the second week and in the days at Tal's building her practice has produced the first threshold. You didn't see it happen — it announced itself only in the way her attention changed, the quality of quiet that replaced the quality of effort."),
      d("KAEL",   "right", "neutral", "Ryn. First threshold."),
      d("RYN",    "right", "quiet",   "Yesterday morning. I almost told you and then I thought I should wait to be sure it wasn't coincidental."),
      d("KAEL",   "right", "neutral", "How do you know it's not coincidental?"),
      d("RYN",    "right", "quiet",   "Because it's still happening this morning. The things I had been learning since the Archive — procedural things, routes, arrangements, the reading I did of administrative records — they are all present exactly. Not the way memory is usually present. They are simply there."),
      d("KAEL",   "right", "neutral", "The first threshold."),
      d("RYN",    "right", "quiet",   "I wasn't sure the method would apply to the kind of material I hold. It does."),
      n("You both sit with that for a moment. Two people with the first threshold, reached at different times, sitting in the building where someone else reached the second threshold three weeks ago and then continued east."),
      d("KAEL",   "right", "neutral", "Maren said the second threshold comes faster after the first."),
      d("RYN",    "right", "quiet",   "How fast?"),
      d("KAEL",   "right", "neutral", "She didn't say exactly. But she said 'considerably faster' and for Maren, 'considerably' is precise."),
    ],

    // Spark 5: Brek at the tree line
    [
      n("The morning of departure. Packs loaded, route planned. Brek does his last circuit of the area — the habit of knowing where things are before you leave them."),
      d("DORATH", "left",  "neutral", "Brek."),
      d("BREK",   "left",  "neutral", "What."),
      d("DORATH", "left",  "neutral", "The tree line. North."),
      n("She says it without alarm — the tone of someone noting a relevant fact."),
      d("BREK",   "left",  "neutral", "I see it. A person, standing. Not watching the road."),
      d("DORATH", "left",  "neutral", "Watching the building."),
      d("BREK",   "left",  "neutral", "Yes. For — a while. Maybe the last hour. They were there when I started the circuit."),
      d("KAEL",   "right", "neutral", "Threat?"),
      d("BREK",   "left",  "neutral", "I don't think so. The positioning is wrong for threat. They have a clear view of the approach road — if they wanted to stop us, the road is where you stop people, not the tree line thirty yards north."),
      d("MAREN",  "left",  "neutral", "They're ranging."),
      d("BREK",   "left",  "neutral", "That's what I think. Watching the approaches and reporting back. Or—"),
      d("MAREN",  "left",  "neutral", "Or confirming we're still here before moving to the next position."),
      d("DORATH", "left",  "neutral", "If they know the route east."),
      d("MAREN",  "left",  "neutral", "Then they're already there."),
      n("The figure in the tree line does not move. You shoulder your pack. The route east is three days. Whatever is at the other end is now the question, and the answer requires walking toward it."),
    ],

    // Spark 6: No change of plan
    [
      n("The figure in the tree line watches while the group finishes its final preparations. Nobody changes what they're doing. Brek continues his circuit. Dorath continues checking documentation. Maren continues the practice she has been doing in the corner since dawn. The figure watches all of this."),
      d("KAEL",   "right", "neutral", "We're not going to confront them."),
      d("DORATH", "left",  "neutral", "No. We're going to finish what we're doing and leave on schedule."),
      d("KAEL",   "right", "neutral", "What if they follow us."),
      d("DORATH", "left",  "neutral", "If they follow us on the eastern road, Brek will know within the first hour. We'll have a gap — they're on foot and so are we, but we know the secondary approach and they may not."),
      d("BREK",   "left",  "neutral", "Also they're ranging. Not pursuing. Their position is observational. If they wanted to follow, they'd be in position to follow, not position to watch."),
      d("DORATH", "left",  "neutral", "Brek is right. We proceed."),
      n("The group proceeds. You shoulder your pack. The building behind you grows smaller in the distance. The tree line to the north is still. The figure, if they are still there, has chosen not to be visible."),
    ],

    // Spark 7: What the figure left
    [
      n("Brek runs the perimeter at first light before anyone else rises. He comes back with something in his hand — a folded piece of paper, small, the kind used for short messages. He sets it on the table without speaking and waits for Maren and Dorath to read it."),
      d("MAREN",  "left",  "neutral", "The notation style."),
      d("BREK",   "left",  "neutral", "Not current notation. Older. Eran used the current style — this predates his version of the cipher."),
      d("MAREN",  "left",  "neutral", "I've seen this before. In the Archive's oldest administrative records. This is original network notation. Pre-Eran, pre-Archive."),
      d("DORATH", "left",  "neutral", "What does it say?"),
      d("MAREN",  "left",  "neutral", "Three words. The cipher is the old version — I know it, I studied the administrative history. It says: 'The approach is watched.'"),
      n("The figure in the tree line left a message in a notation style that predates Eran's work by thirty years. Either they learned it from someone who was active thirty years ago, or they are the person who was active thirty years ago. The eastern road is one day's walk from here. At the end of three days: the settlement. And the approach: watched, by who, from where."),
    ],

    // Spark 8: First hours on the road
    [
      n("The eastern road is old in the way the settlement district is old — built by use first and by plan second. The stones are a different color than the western roads. Tal's account places their origin with the network that preceded the Archive, when the settlement was still the primary site and the city was secondary. Someone built this road to reach a destination they considered important enough to build a road for."),
      d("KAEL",   "right", "neutral", "How long has this road existed."),
      d("TAL",    "left",  "neutral", "Based on the stone — sixty years minimum. The eastern survey records place it as contemporary with the first network that Eran's predecessor established."),
      d("KAEL",   "right", "neutral", "So someone sixty years ago knew about the settlement."),
      d("TAL",    "left",  "neutral", "The settlement is older than the Archive. The network has known about it for as long as there has been a network. The question has always been who else knows."),
      n("You walk. The formation settles: Brek ahead at a distance that keeps him in sight, Dorath behind at a similar distance, Maren and Ryn in the middle, you at the center. Not arranged for comfort — arranged for the specific way six people can move through open terrain without looking like they're moving through open terrain with intention."),
    ],

    // Spark 9: Sira's journal entry for this road
    [
      n("During a rest at midday, you open Sira's journal to the entries from her second day on the eastern road. She describes the road's stone in the same terms you just used to describe it to yourself. She notes the same color difference from the western roads. She observes the same formation pattern in the flagstones — a specific laying pattern that predates modern road construction."),
      d("KAEL",   "right", "neutral", "She was on this road. Standing where we're standing."),
      d("RYN",    "right", "quiet",   "Three weeks before us. What else does she write?"),
      n("You read: 'Third observation: someone maintains this road. There is no recent wagon traffic but the stone is clear of debris at regular intervals — the kind of clearing that requires periodic attention. Someone walks this road regularly enough to have cleared it within the last two months.'"),
      d("BREK",   "left",  "neutral", "Tal."),
      d("KAEL",   "right", "neutral", "Or whoever the person with the pre-Eran notation was."),
      n("The journal continues: 'If someone maintains the road, someone knows the route. The note I found at the district junction suggested protection, not surveillance. I'm treating maintenance the same way.'"),
      d("RYN",    "right", "quiet",   "She made the same call. Before any of us."),
      d("KAEL",   "right", "neutral", "Three weeks before any of us."),
    ],

    // Spark 10: Ryn's first threshold
    [
      n("The second day. Ryn has been quiet since the district, which is unusual enough that you check. She is not withdrawn — she is working."),
      d("KAEL",   "right", "neutral", "How is the practice."),
      d("RYN",    "right", "quiet",   "I've been checking it against what I'm doing with the administrative records. The records are procedural — access patterns, usage frequencies, cross-reference structures. I've been holding those as objects."),
      d("KAEL",   "right", "neutral", "And?"),
      d("RYN",    "right", "quiet",   "They stopped requiring active maintenance three days ago. I hold them and they stay. I've been testing it — waiting, letting my attention drift, coming back. They're still there. Precise."),
      d("KAEL",   "right", "neutral", "The first threshold."),
      d("RYN",    "right", "quiet",   "It's less dramatic than I expected. It just became different. I was doing the work and then the work was different."),
      n("'The work which was effort has become property.' Maren's translation of the original archivist's description. You recognize it precisely in what Ryn just said, from the other side of the threshold from where you stood when Maren said something similar to you."),
      d("KAEL",   "right", "neutral", "Maren's going to want to know."),
      d("RYN",    "right", "quiet",   "I know. I'll tell her tonight. I wanted to be sure it wasn't a coincidence."),
    ],

    // Spark 11: The figure's tracks
    [
      n("Brek checks the approach road on the second morning, before anyone else is fully awake. The soft section near the tree line's edge, where the drainage runs shallow over the stone."),
      d("BREK",   "left",  "neutral", "The figure from the tree line. They came this way."),
      d("DORATH", "left",  "neutral", "Before or after us?"),
      d("BREK",   "left",  "neutral", "Before. The prints are dry. They moved east on this road sometime in the middle of the night. Before the rain that came at second watch. They're ahead of us."),
      d("DORATH", "left",  "neutral", "Moving toward the settlement."),
      d("BREK",   "left",  "neutral", "East, yes. The stride is steady — they know the road. And they're carrying something heavy on the left shoulder. Same impression as the print I found near the tree line two days ago. Same person."),
      n("The figure with the pre-Eran notation and an unlit lamp and something heavy on the left shoulder. They left a warning. Then moved toward the settlement ahead of the group. Moving to protect the approach, or moving to be at the settlement when the group arrives."),
      d("MAREN",  "left",  "neutral", "Keep pace."),
    ],

    // Spark 12: Dorath's contingency
    [
      n("Dorath walks beside you for a stretch of the second day, which she does when she has something to work through and walking is the way she works through it."),
      d("DORATH", "left",  "neutral", "If the settlement is already compromised when we arrive."),
      d("KAEL",   "right", "neutral", "Serath isn't there. Sira isn't there."),
      d("DORATH", "left",  "neutral", "Then we do not enter the building. We assess from distance. Brek reads the approach. We determine whether extraction is possible or whether we continue to the second contingency."),
      d("KAEL",   "right", "neutral", "What's the second contingency."),
      d("DORATH", "left",  "neutral", "We use Brek's secondary approach to reach the valley floor without being seen from the eastern ridge. We establish a position. We determine what is in the building and what has happened to the people who should be in it. Then we decide."),
      d("KAEL",   "right", "neutral", "And if they're both there. Serath and Sira."),
      d("DORATH", "left",  "neutral", "Then we have the group assembled in the same place and we do the work we came to do."),
      n("She says this the way she says most things — the plan laid out, the contingencies laid out, the decision points identified. Whether the outcome is the best or the worst, the protocol is the same: assess, determine, decide."),
    ],

    // Spark 13: Night camp
    [
      n("The second night. The eastern road's tree line has closed in on both sides — the kind of old growth that has been here longer than the road, undisturbed, the road a lane cut through it. At night: no wind. The sound of the trees is the kind of quiet that has depth to it, like a room with good walls."),
      n("Brek sets the watch. Dorath takes first. The fire is small and placed against the stone face that blocks the light from the road. Maren is doing the practice — the eighth, maintenance. You do the first practice and feel it run without effort."),
      d("KAEL",   "right", "neutral", "Maren. When you're at the eighth and ninth practices simultaneously — does it feel like work?"),
      d("MAREN",  "left",  "neutral", "The higher the stage, the less it feels like work in the foreground sense. The later practices are structural — they are the background in which foreground work happens. Doing the eighth is not effortful. It is simply what is present."),
      d("KAEL",   "right", "neutral", "And the fourteenth?"),
      d("MAREN",  "left",  "neutral", "The fourteenth is not a practice anymore. I told you this. It has a different category."),
      n("She returns to what she was doing. The fire burns. Outside: nothing. The road, the tree line, the distance between here and the settlement."),
    ],

    // Spark 14: Third day morning
    [
      n("The third morning. The terrain has been changing since dawn — the trees giving way to open hillside, the road climbing steadily toward a ridge that has been visible for the past two hours. The view from the ridge, Eran's letter noted, shows the valley."),
      d("BREK",   "left",  "neutral", "Two hours to the ridge. Maybe one and a half at this pace."),
      d("DORATH", "left",  "neutral", "Keep pace. We want daylight in the valley."),
      n("You walk. The road climbs. The air changes — colder, drier, the smell of open altitude rather than tree line. Maren pauses the third practice at the ridge's base and looks up at the line where the road meets the sky."),
      d("KAEL",   "right", "neutral", "What do you see from the ridge, typically? Eran's letter describes the view."),
      d("MAREN",  "left",  "neutral", "The settlement valley. The building in the center. The walls visible from outside if you know what you're looking at."),
      d("KAEL",   "right", "neutral", "Can you see who's there from the ridge?"),
      d("MAREN",  "left",  "neutral", "At this time of day, the sun angle will give us the windows. If there's smoke from the chimney, someone is in the building."),
      d("BREK",   "left",  "neutral", "Smoke. I can see it from here."),
      n("The ridge is still an hour away. He is seeing something in the sky above the ridge line — not visible as smoke yet, but as a quality of the air, the kind of thin haze that comes from a chimney and disperses at altitude. Someone is in the building. Someone has been in it long enough to need a fire."),
    ],

    // Spark 15: Fresh marks on the approach
    [
      n("Forty minutes from the ridge. The road narrows. Brek stops."),
      d("BREK",   "left",  "neutral", "Wait."),
      n("He kneels at the road's edge. A section of the stone face where the rock has been recently cut — the cut is bright, the edges crisp, not weathered. No one cuts stone on a road by accident. He examines the cut without touching it."),
      d("BREK",   "left",  "neutral", "Someone marked this in the last day. The stone hasn't had time to oxidize."),
      d("DORATH", "left",  "neutral", "What does it say?"),
      d("BREK",   "left",  "neutral", "It's not writing. It's a symbol — a small circle with a line through it. The kind of mark you use when you want to leave information for someone who knows the code but not in a form that anyone else can read."),
      d("MAREN",  "left",  "neutral", "The secondary network notation. Eran's predecessor's system. The same as the note the figure left at Tal's building."),
      d("BREK",   "left",  "neutral", "Whoever left the note came this way. Within the last day. And they left this mark here."),
      d("KAEL",   "right", "neutral", "What does the symbol mean?"),
      d("MAREN",  "left",  "neutral", "In the old notation system — I've seen it twice in the Archive's historical records — it means: the building ahead is occupied by the right people, and you are followed."),
      n("The group is still. The road is empty in both directions. The ridge is thirty minutes away. The settlement is beyond the ridge. And somewhere behind you, on this road, in the last day: someone who has been watching the approach and moving ahead of you and is now telling you, in a notation older than any of you, that you are not alone on this road."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 13 — The Journey East
  // Setting: road east, three-day journey toward the settlement
  // Characters: Player, Maren, Ryn, Dorath, Brek, Tal
  // ═══════════════════════════════════════════════════════════════════════════
  w13: [

    // Spark 1: The last road
    [
      n("The road east from the settlement district is older than the roads behind you — the stone is a different cut, laid by a different hand, in a period before the current road authority standardized the eastern routes. It has been maintained by whoever uses it rather than by any institution. The maintenance is good."),
      d("TAL",    "left",  "neutral", "This road was built by Eran's predecessor's predecessor. Three generations back in the network. Whoever built it knew this road would be needed."),
      d("KAEL",   "right", "neutral", "How did they know?"),
      d("TAL",    "left",  "neutral", "The deep records. Anyone who read them and understood what they described would know that eventually someone would need to make this journey."),
      d("DORATH", "left",  "neutral", "So the road has been maintained for forty years in anticipation of this."),
      d("TAL",    "left",  "neutral", "At least forty. The original stone is older than that."),
      n("You walk. The road climbs slightly — the terrain becoming hillier, the air colder. Behind you the settlement district has already disappeared in the grey morning. Ahead: nothing visible yet. Three days of walking and whatever is at the end of it."),
      d("KAEL",   "right", "neutral", "What do you expect to find?"),
      d("TAL",    "left",  "neutral", "What Eran described. A valley settlement. Stone buildings. The walls Sira went to read."),
      d("KAEL",   "right", "neutral", "And Sira."),
      d("TAL",    "left",  "neutral", "And Sira. Yes."),
    ],

    // Spark 2: Brek ranging ahead
    [
      n("Brek runs ahead twice on the first day — not for speed but for information. Each time he comes back with notes: the road condition, what is visible from the next rise, whether the track diverges anywhere that wasn't on Dorath's map."),
      d("KAEL",   "right", "neutral", "What are you finding?"),
      d("BREK",   "left",  "neutral", "The road is clean. No recent heavy traffic — no wagon ruts since the last rain. One person, walking fast, the stride pattern of someone who knows the route. Matches the timeline for Serath."),
      d("KAEL",   "right", "neutral", "He came this way."),
      d("BREK",   "left",  "neutral", "He came this way. Twelve days ago, possibly thirteen. He moved faster than we're moving."),
      d("KAEL",   "right", "neutral", "He knew the route."),
      d("BREK",   "left",  "neutral", "He knew the route. Which means he found it from the deep records, or found it from someone who had. And he has been there for twelve days."),
      n("You walk. The calculation plays out behind your eyes: twelve days, Serath, the walls of the settlement, what he would do with twelve days in a place where floor-to-ceiling Vraen notation covers every surface."),
      d("KAEL",   "right", "neutral", "He's been reading the walls."),
      d("BREK",   "left",  "neutral", "If I were him, yes."),
      d("KAEL",   "right", "neutral", "And Sira has been there even longer."),
      d("BREK",   "left",  "neutral", "She arrived roughly twelve days before him. So twenty-four days. By now she has read everything on the walls twice."),
    ],

    // Spark 3: The third practice
    [
      n("Maren begins the third practice while walking on the second day — she doesn't announce it, just starts. You recognize the shift in her attention, the way her answers to questions become slightly slower as she processes through an additional layer."),
      d("KAEL",   "right", "neutral", "You're doing the third practice."),
      d("MAREN",  "left",  "neutral", "I haven't done it in a week. The stationary days were good for the lower practices. On the road I prefer to maintain the higher ones."),
      d("KAEL",   "right", "neutral", "What does the third practice involve?"),
      d("MAREN",  "left",  "neutral", "You are holding adjacent pairs — what the second practice built. The third practice asks you to build chains. Three things, precisely held, in sequence, with the relationships between them explicit."),
      d("KAEL",   "right", "neutral", "Chains of knowledge."),
      d("MAREN",  "left",  "neutral", "Chains of understood relationships. The difference is important. Knowledge without relationship is a collection. Knowledge with explicit relationship is a structure. The method builds the structure."),
      d("KAEL",   "right", "neutral", "And structures do what collections can't."),
      d("MAREN",  "left",  "neutral", "They propagate. When you add something to a structure, it connects to what's already there. When you add something to a collection, it sits next to what's already there. The outcome for any complex body of knowledge is completely different."),
      n("You try the third practice. Three things, precisely held, relationships explicit. It is significantly harder than two. It is also, immediately, producing something that neither thing alone and neither pair alone was producing: a view."),
    ],

    // Spark 4: Tal and Maren at the fire
    [
      n("The second night's camp. Tal and Maren are across the fire from each other, talking low. Not privately — they aren't trying to exclude anyone — but at the volume of two people working through something specific."),
      d("TAL",    "left",  "neutral", "Eran described you to me as the person he most wanted to have reached this point."),
      d("MAREN",  "left",  "neutral", "He was overgenerous."),
      d("TAL",    "left",  "neutral", "He was precise. He said: of everyone I have watched doing this work, Maren is the one who will get to the end of it and will know what to do when she gets there. That was his phrasing. Will know what to do."),
      d("MAREN",  "left",  "neutral", "I don't know what to do yet."),
      d("TAL",    "left",  "neutral", "You know some of it."),
      d("MAREN",  "left",  "thoughtful", "Some."),
      d("TAL",    "left",  "neutral", "What he meant, I think — knowing what to do is not the same as having a plan. It is having the foundations that a plan can be built on. When you arrive at the settlement and see what Sira has been working with, you will know the next thing."),
      d("MAREN",  "left",  "neutral", "You're confident about that."),
      d("TAL",    "left",  "neutral", "Eran was confident about it. I am extending his confidence."),
      n("Maren looks at the fire. The expression she uses when she is genuinely receiving something rather than cataloging it."),
      d("MAREN",  "left",  "neutral", "He was a good person."),
      d("TAL",    "left",  "neutral", "Yes. I told you that."),
    ],

    // Spark 5: The valley appears
    [
      n("Third day. The road crests a low ridge and the valley opens below — not dramatically, not like a revelation. Just: there. A basin of sheltered ground, stone buildings visible from this distance as grey shapes against the hillside, a line of old trees marking a watercourse. Still. Quiet. The kind of place that has been there long enough to stop looking like it was built and start looking like it always was."),
      n("Someone is standing at the valley's edge."),
      d("DORATH", "left",  "neutral", "They're watching us."),
      d("BREK",   "left",  "neutral", "Known route in. Single person, no cover."),
      d("RYN",    "right", "quiet",   "Not hostile. The posture's wrong for hostile."),
      n("You know the posture. You recognize the way she stands even at this distance — the particular way she holds still when she is confirming something against expectation. You know it because you grew up watching it."),
      d("KAEL",   "right", "surprised", "That's—"),
      d("MAREN",  "left",  "neutral", "Yes."),
      n("She says it before you finish speaking. She has been watching the figure for longer than you have, and she arrived at the conclusion first."),
      n("In the valley below: the settlement, and the walls Sira came to read, and all the questions that have accumulated since the Archive burned — all of it is forty minutes of walking away. But first: the figure at the valley's edge is beginning to walk toward you, and she has seen you, and the distance between you is closing."),
    ],

    // Spark 6: Sira arrives
    [
      n("She reaches you before you reach the valley floor. The closing distance is quick — she covers it the way she covers terrain, efficiently, without hurry, with the specific stride of someone who has been walking this ground for three weeks and knows every feature of it."),
      n("She stops four paces away. She looks at you. She looks at Maren. She looks at the group."),
      d("SIRA",   "right", "neutral", "I thought there would be five. There are six."),
      d("DORATH", "left",  "neutral", "Brek."),
      d("SIRA",   "right", "neutral", "I know Brek. The journal entry from the district — you found it."),
      d("KAEL",   "right", "neutral", "How did you know we'd come through the district?"),
      d("SIRA",   "right", "neutral", "I know how Dorath routes people. And I know Tal's building is on the eastern route. I wrote the entry for you specifically."),
      n("She turns and begins walking back toward the valley. Matter of fact. The same way she approached. Three weeks in a stone building with walls full of notation, alone with Serath, and she walks back to it the way you walk back to work."),
      d("SIRA",   "right", "neutral", "There's something I want to show you before you go inside. The west wall's final corner. I've been working on a section I'm not certain I'm reading correctly."),
    ],

    // Spark 7: The west wall's final corner
    [
      n("She shows you the section from outside before you enter the building. Through the narrow window on the west face, you can see the notation she's describing — the corner section is denser than the surrounding wall, the characters smaller, the spacing compressed."),
      d("SIRA",   "right", "neutral", "The rest of the west wall is a record of the practitioner's experience through the middle stages. This section is different. The notation compresses — the same compression pattern the fragments use when describing something the writer considered important enough to protect against casual reading."),
      d("KAEL",   "right", "neutral", "What does it say?"),
      d("SIRA",   "right", "neutral", "I can read most of it. But there's a specific section that uses a term I haven't encountered before — not in the fragments, not in the cipher, not in the administrative records. Serath doesn't recognize it either."),
      d("MAREN",  "left",  "neutral", "Show me."),
      n("Inside. The west wall's final corner: the notation Sira described, dense and compressed, in a hand that is different from the rest of the wall — more deliberate, as if the writer was being especially careful. Maren looks at it for a long time without speaking."),
      d("MAREN",  "left",  "neutral", "I know this term. It was in the Archive's oldest administrative records — the ones that predate the building. It means 'what comes to a place.' It's not describing the practitioner's experience. It's describing a future arrival."),
    ],

    // Spark 8: What the west wall's final section describes
    [
      n("The section in full, translated by Maren with Sira's cipher notes. It takes an hour. The group sits against the opposite wall and waits."),
      d("MAREN",  "left",  "neutral", "The practitioner who wrote this wall knew someone would come after them. The final section is addressed to that person. It describes the conditions: those who arrive will have come from a burned institution. They will be carrying fragments. They will be practicing the method. The writer is specific enough that the description matches us."),
      d("BREK",   "left",  "neutral", "How specific."),
      d("MAREN",  "left",  "neutral", "A group. Multiple people. The method practiced by more than one person simultaneously. An institution that was disrupted. Fragments in transit."),
      d("SERATH", "left",  "neutral", "They could not have known the Archive would burn. They were describing the conditions under which someone would need to come."),
      d("MAREN",  "left",  "neutral", "Yes. The conditions under which someone would need what the walls contain. They wrote to the circumstances, not to specific events. The circumstances: disruption, displacement, practice in transit. That is always what brings someone here."),
      d("SIRA",   "right", "neutral", "It says one more thing. The section ends with: 'I tried to leave everything. Whether I succeeded, you will know before I do.' That's not metaphorical. The walls are what they tried to leave. Everything."),
    ],

    // Spark 9: The settlement building from inside
    [
      n("The main building is larger from inside than it appears from outside — the walls account for it, floor to ceiling on all four faces, the notation so dense in places that the stone itself is barely visible underneath. The light comes through narrow windows on the south and east faces, angled to illuminate the notation rather than the center of the room."),
      n("Someone designed this building to be read. The angles of the windows, the height of the notation, the way it flows around the doorframe rather than stopping at it — every architectural choice is in service of the walls."),
      d("SERATH", "left",  "neutral", "The windows are positioned to give maximum light to the north and east walls in the morning. The south and west walls are better lit in the afternoon. There is never a time of day when all four walls are simultaneously well-lit."),
      d("KAEL",   "right", "neutral", "You have to stay multiple days to read all of it."),
      d("SERATH", "left",  "neutral", "You have to stay long enough to read each wall in its ideal light. The person who built this understood that the reader would spend time here. They planned for it."),
    ],

    // Spark 10: Serath's three months described
    [
      n("Serath tells it in pieces over the first two days, filling in the gaps in what the group already knows. You listen when the chances present themselves."),
      d("SERATH", "left",  "neutral", "I found the deep records in my third month at the Archive. The notation in the third section was distinctive. I had been working in the Vraen collection for two months and I recognized the connection immediately."),
      d("KAEL",   "right", "neutral", "You didn't tell anyone."),
      d("SERATH", "left",  "neutral", "I had no way to know who was safe to tell. I knew about Maren's work — everyone in the Vraen section knew Maren was there, even if they didn't know what she was working on. I didn't know about you. I didn't know about Ryn or Brek. I was working alone."),
      d("KAEL",   "right", "neutral", "When did you find out about us."),
      d("SERATH", "left",  "neutral", "The detection records. I found them before I understood what they were. Someone had been using them recently — the access dust was fresh. I began tracking that person's access pattern. It led me to the annotation in the administrative records."),
      d("KAEL",   "right", "neutral", "The Spire codes Ryn found."),
      d("SERATH", "left",  "neutral", "I confronted them the day of the fire. I don't know if they connected my confrontation to whatever prompted the fire. I don't know if the fire was already planned."),
    ],

    // Spark 11: Pel
    [
      n("The figure who left the marks on the road — she is at the settlement when you arrive, already inside, already known to Serath and Sira. Her name is Pel. She has been maintaining the eastern approach for twenty-two years."),
      d("KAEL",   "right", "neutral", "Twenty-two years."),
      d("PEL",    "left",  "neutral", "Eran placed me here. Before the Archive was established — when the original network was just a collection of people who knew about the settlement and thought it should be protected."),
      d("KAEL",   "right", "neutral", "You knew Eran before the Archive."),
      d("PEL",    "left",  "neutral", "I knew him when there was no Archive. When the settlement was the only site. He decided to build the Archive specifically to provide a structure around what the settlement already contained. He expected the Archive to be disrupted eventually — that's why he maintained the settlement approach separately."),
      d("MAREN",  "left",  "neutral", "He expected the Archive to burn."),
      d("PEL",    "left",  "neutral", "He expected that anything housed in a building could be removed from a building. The walls cannot be removed. He built the Archive as a temporary structure. An approach path, not a destination."),
    ],

    // Spark 12: What the walls did to Serath and Sira
    [
      n("Pel's account of watching Serath and Sira in the first days at the settlement. She does not interpret — she describes what was visible from outside."),
      d("PEL",    "left",  "neutral", "Serath arrived first. He went into the building immediately and did not come out for eight hours. When he came out, he went to the east face and sat with his back to the building for an hour. Then he went back in."),
      d("KAEL",   "right", "neutral", "For eight days until Sira arrived?"),
      d("PEL",    "left",  "neutral", "He came out to eat and to run the perimeter. Otherwise: inside. The fourth day he stopped keeping notes and just read. The pattern changed again."),
      d("KAEL",   "right", "neutral", "What happened on the fourth day?"),
      d("PEL",    "left",  "neutral", "I don't know. I was outside. But he came out on the fourth afternoon and looked at the valley for a long time. The same way you look at something when you've understood something that changes the size of what you thought you were dealing with."),
      n("She looks at the building."),
      d("PEL",    "left",  "neutral", "Sira arrived eight days later. She read for five hours on the first day. Then she came outside and sat exactly where Serath had sat. Then she went back in."),
    ],

    // Spark 13: The valley
    [
      n("The valley floor itself. Beyond the buildings: a flat expanse of old grassland, the kind that grows back when regular human use stops. Four outbuildings in varying states of maintenance. A well — functional, with a stone cap that is newer than the others, maintained recently. A second stone building smaller than the main one, used for storage."),
      d("BREK",   "left",  "neutral", "The outbuilding to the east. Someone's been using it recently."),
      d("DORATH", "left",  "neutral", "Serath."),
      d("SERATH", "left",  "neutral", "I converted it into a sleeping space. The main building is better used for work — it's difficult to sleep there."),
      d("KAEL",   "right", "neutral", "Difficult how."),
      d("SERATH", "left",  "neutral", "The notation. At a certain stage of the practice, the walls are not background. They are present in a specific way. Reading them and being in the same room as them are not the same experience. Being in the room activates something that makes sleep difficult."),
      d("SIRA",   "right", "neutral", "I sleep in the main building."),
      d("SERATH", "left",  "neutral", "She does."),
      n("He says it with the specific neutrality of someone describing a fact they have given up trying to explain."),
    ],

    // Spark 14: What Sira's first twelve days looked like
    [
      n("Sira's account of arriving alone. She tells it at the end of the second day, when the group is settling in."),
      d("SIRA",   "right", "neutral", "The first day, I mapped the west wall. I didn't read it — I mapped it. The notation density, the section breaks, where the hand changes. I wanted to understand the structure before I started interpreting."),
      d("KAEL",   "right", "neutral", "You mapped it before you read it."),
      d("SIRA",   "right", "neutral", "The west wall took four days to map. Then I read it. By the time I read it, I understood the structure of what I was reading. The north wall took a different approach — it's not structured like the west wall. It's a record, not a description. I had to learn how to read it before I could map it."),
      d("KAEL",   "right", "neutral", "What's the difference. Between a description and a record?"),
      d("SIRA",   "right", "neutral", "A description tells you how to do something. A record tells you what it was like to do it. The west wall is instructions. The north wall is a diary. You need both. You need the instructions to know what to do and you need the diary to know what doing it feels like."),
      n("She looks at the north wall. The notation there, dense and cramped, in a hand that was working quickly — the urgency of someone trying to write everything down before the understanding slips away."),
    ],

    // Spark 15: What the walls say about an arrival
    [
      n("The final evening of the second day. Maren has been in the northeast corner for most of the afternoon. Sira sits near her, not reading — working through a section in her notes. Serath is at the south wall. You are in the center of the room, between all four walls, and you turn slowly to look at each of them."),
      n("The walls look different when you're inside looking at them from the center than they look when you approach from outside. From the center, the four faces form a continuous document, flowing from north to east to south to west in a circuit that you can follow with your eyes."),
      d("SERATH", "left",  "neutral", "The south wall has a section I've been working on for three days. I want to show you. Tomorrow. When the light is right for the south face."),
      n("Maren, without turning around: 'Read me the first line.'"),
      d("SERATH", "left",  "neutral", "'What I tried to leave, I have left. What comes to a place stays in it after the person is gone. I am gone now. What I tried to leave remains.'"),
      n("The room is quiet. The lamp burns. Outside: the valley, the dark, the road back west. Inside: four walls full of what one person tried to leave for whoever came next, and seven people who have come next, and the specific feeling of being exactly where you were supposed to arrive."),
      d("MAREN",  "left",  "neutral", "Tomorrow. The south wall. All of us."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 14 — The Settlement
  // Setting: the settlement, the walls, Serath's account
  // Characters: Player, Maren, Ryn, Dorath, Brek, Tal, Sira, Serath
  // ═══════════════════════════════════════════════════════════════════════════
  w14: [

    // Spark 1: The walls
    [
      n("The main building of the settlement is as Sira described in her journal: stone, larger than the others, interior walls covered from floor to ceiling in notation that is both Vraen and older than Vraen — the same system but an ancestral version, the first notation that later became the notation that became the fragments you carry."),
      d("KAEL",   "right", "neutral", "How do you read this?"),
      d("SERATH", "left",  "thoughtful", "Slowly. There are sections that require the cipher to decode — not all of it, but specific sections where the writer switched to compressed notation to fit more on the available surface. Those sections are the most important."),
      d("KAEL",   "right", "neutral", "How much have you read?"),
      d("SERATH", "left",  "neutral", "Most of the north and east walls. The south wall is partially weathered. Sira has been working on the west wall — she found the starting point, which is the most complex section. You need to read in order."),
      d("KAEL",   "right", "neutral", "In order."),
      d("SERATH", "left",  "neutral", "The walls are not a document. They are a practice. The person who wrote them organized the notation the same way the Vraen method is organized — each wall builds on the previous. You can read any individual section, but you only understand what it means if you have read what comes before it."),
      n("You stand in the middle of the room and turn slowly. Floor to ceiling: notation dense enough that the stone beneath is barely visible. A complete person wrote this. Forty years ago, in this building, in this valley, someone carried the fourteenth stage and left it on the walls in full."),
      n("And then, the final line of the east wall: 'I tried to leave all of it.'"),
    ],

    // Spark 2: Serath and the insider
    [
      n("Serath tells it in the morning, sitting against the south wall, the spring light through narrow windows cutting the room into alternating gold and shadow. He tells it without drama."),
      d("SERATH", "left",  "neutral", "I found the deep records in my third month at the Archive. I kept it private because the notation made it clear the section was not public — the header marks are 'not for catalog.' I worked through them over four months."),
      d("KAEL",   "right", "neutral", "Alone."),
      d("SERATH", "left",  "neutral", "Alone. And then in month five I found evidence of someone else accessing the same section. Fresh disturbance in the physical record. Recent notations made by a reader who was not me."),
      d("KAEL",   "right", "neutral", "Compiling a list."),
      d("SERATH", "left",  "neutral", "Using the detection section of the deep records to identify practitioners and their current stage. I identified the handwriting from other Archive administrative documents. The person was well-placed. Had access to everything."),
      d("KAEL",   "right", "neutral", "Who was it?"),
      d("SERATH", "left",  "neutral", "I confronted them at noon on the day of the fire. I told them I knew what they were doing. I told them the passage would remain open or the information became public. They agreed. I left."),
      d("KAEL",   "right", "neutral", "You didn't say who it was."),
      d("SERATH", "left",  "neutral", "I don't know if they got out of the building. Naming them now may be naming someone who is dead. I will say this: they were not working for Voss out of ideology. They were working for Voss because they were afraid of what Voss would do if they refused."),
    ],

    // Spark 3: Sira's twenty-four days
    [
      n("Sira has been at the settlement for twenty-four days when you arrive. She shows you what she has been doing — methodically, without rushing."),
      d("SIRA",   "right", "neutral", "The west wall took me eleven days to map. The notation is layered — the original practitioner wrote in three passes, each building on the previous. If you don't read all three layers in sequence, you get a confused picture."),
      d("KAEL",   "right", "neutral", "You mapped it."),
      d("SIRA",   "right", "neutral", "I copied it in my journal, in sequence, with the layers labeled. The cipher helps with the compressed sections. Serath found that independently — we overlapped on the south wall work."),
      d("KAEL",   "right", "neutral", "Did you compare notes?"),
      d("SIRA",   "right", "neutral", "When we stopped being careful about it. For the first three days we worked in the same building and didn't tell each other what we'd found. Then Serath said something that showed he'd read the second layer, and I said something that showed I'd read the third, and we realized there was no point."),
      n("You look at her notes. They are dense, careful, methodical — and they contain something you didn't expect."),
      d("KAEL",   "right", "neutral", "You reached the third practice. Before coming here."),
      d("SIRA",   "right", "neutral", "Two weeks before the fire. The third practice is when the walls started making sense — when I could see the structure of what they were showing."),
      n("Third practice, two weeks before the fire, reached independently, without a teacher, from a starting point of administrative records in the lower stacks. The silence this creates in you is a particular kind of silence."),
    ],

    // Spark 4: The north wall
    [
      n("Serath is precise about the north wall in a way that suggests he has spent time deciding how to present it."),
      d("SERATH", "left",  "neutral", "The north wall is the practitioner's personal record. Not instructions — personal. They describe their practice in first person, stage by stage, with the specific failures they encountered and how they overcame them."),
      d("KAEL",   "right", "neutral", "Same as the fragments. The original archivist described their failures."),
      d("SERATH", "left",  "neutral", "Related document. This person predates the original archivist by approximately forty years. This is the source the archivist was working from. They found these walls and used them to write the fragments."),
      d("KAEL",   "right", "neutral", "The walls came first."),
      d("SERATH", "left",  "neutral", "The walls came first. And they describe the full fourteen stages in first-person experiential terms — not instruction, but account. What it felt like. What changed. What became possible."),
      d("KAEL",   "right", "neutral", "All fourteen."),
      d("SERATH", "left",  "neutral", "All fourteen. Including the fourteenth. Including the final line I mentioned — 'I tried to leave all of it.' I want to show you what comes immediately before that line."),
      n("He leads you to the northeast corner where the north wall meets the east wall. The notation here is smallest — compressed, using the cipher's notation for things that need to say more than the space allows."),
      d("SERATH", "left",  "thoughtful", "This section reads: 'I tried to leave all of it. I do not know if I succeeded. The person who reads this will know better than I do whether I left enough.'"),
    ],

    // Spark 5: What they're each doing
    [
      n("Seven people in the settlement and all seven of them are working. Not performing work, not keeping busy — doing the specific things that each of them is positioned to do. Brek runs the perimeter. Ryn is working with Sira on the west wall notation. Dorath and Tal are reviewing route maps. Serath is in the main building. And Maren has not left it since they arrived."),
      n("You find her in the northeast corner, where the notation is smallest and densest, reading with the particular attention she gives to things that matter."),
      d("KAEL",   "right", "neutral", "How long have you been reading this wall?"),
      d("MAREN",  "left",  "neutral", "Since we arrived."),
      d("KAEL",   "right", "neutral", "Did you sleep?"),
      d("MAREN",  "left",  "neutral", "Two hours. I didn't want to lose the thread."),
      n("She turns to look at you. Her face is doing the thing it does when she has arrived somewhere she was trying to get to for a long time."),
      d("MAREN",  "left",  "neutral", "The walls describe everything. The complete practice, in sequence, in first-person experiential terms. The person who wrote this — they knew that whoever read it next would need to do what they did. So they wrote it as precisely as they could."),
      d("KAEL",   "right", "neutral", "Have you done it?"),
      d("MAREN",  "left",  "neutral", "I am going to."),
      d("KAEL",   "right", "neutral", "Now?"),
      d("MAREN",  "left",  "neutral", "Now. The walls have given me the precision I was missing for the later stages. I have been at the thirteenth stage for seven years. I believe — based on this — I know what the fourteenth requires."),
      n("She turns back to the wall."),
      d("MAREN",  "left",  "neutral", "Stay. If it works, I want you to see what happens."),
    ],

    // Spark 6: What the south wall holds
    [
      n("The south wall in the afternoon light — the angle Serath has been waiting for. The notation here is different from the other three faces: larger characters, more space between lines. Easier to read at first glance, harder to understand once you begin."),
      d("SERATH", "left",  "neutral", "The south wall is the practitioner's technical record. Not experiential — technical. They were trying to describe the mechanism of the method, not what the method feels like. How each threshold actually functions. Why the practices work. This is the information missing from the fragments."),
      d("BREK",   "left",  "neutral", "The fragments describe what to do. The south wall describes why it works."),
      d("SERATH", "left",  "neutral", "The fragments are instructions. The south wall is the explanation of the instruction set. They were written later — the character depth suggests the practitioner had already completed the method and was trying to reconstruct the reasoning from the result."),
      d("MAREN",  "left",  "neutral", "This is the section they tried hardest to leave behind. The west wall is description. The north wall is record. The east wall is transition mechanism. The south wall is the theoretical basis. Without it, the method can be learned but not fully understood."),
      d("KAEL",   "right", "neutral", "And with it?"),
      d("MAREN",  "left",  "neutral", "With it, you understand why each stage works, which means you can recognize when you've done it correctly and when you've only done it approximately."),
    ],

    // Spark 7: Kael and Sira's first morning
    [
      n("The third morning. You and Sira are at the well before anyone else is awake. The valley is cold at this hour."),
      d("KAEL",   "right", "neutral", "How long were you working in parallel to Maren without knowing you were doing the same work."),
      d("SIRA",   "right", "neutral", "From the beginning. The fragment collection was in the same section as the administrative records I was using. I found the administrative records first, which led me to the fragments, which led me to the method. I was three months into the practice before I understood what I was doing."),
      d("KAEL",   "right", "neutral", "I found the practice through Maren's guidance. You found it independently."),
      d("SIRA",   "right", "neutral", "Different starting points. The endpoint is the same room."),
      n("You look at the main building. The south wall is visible through the east window at this angle — a slice of notation, the characters still legible from here."),
      d("KAEL",   "right", "neutral", "When you left the Archive. Two weeks before the fire. You knew something was coming."),
      d("SIRA",   "right", "neutral", "I saw the detection records being accessed by someone I couldn't identify. I copied what I needed to copy, left the things in reach of the people who would need them, and left. I did not know about the fire specifically. I knew that whatever was using those records was close to doing something with the information."),
    ],

    // Spark 8: The east wall's mechanism
    [
      n("The east wall takes three days to work through in detail. Maren begins with the cipher's secondary key and the compression sections that have been unreadable without it. She reads the mechanism of each threshold aloud for the sections that all seven people need to hear."),
      d("MAREN",  "left",  "neutral", "The first threshold is the point at which the practice becomes self-sustaining. The second threshold is the point at which the practice begins to modify incoming material automatically — the resonance effect. The third threshold is when the resonance generates new structural connections rather than just facilitating existing ones."),
      d("BREK",   "left",  "neutral", "The propagation. What I described from the second threshold."),
      d("MAREN",  "left",  "neutral", "The east wall describes it as 'the mechanism by which the practice extends itself through material that has not yet been explicitly worked.' Brek's word — propagation — is accurate."),
      d("SERATH", "left",  "neutral", "What is the fourth threshold?"),
      d("MAREN",  "left",  "neutral", "The east wall describes it as the threshold at which the practitioner begins to understand the mechanism from inside the mechanism. The south wall is the practitioner's attempt to write down what they understood from that position."),
    ],

    // Spark 9: The settlement's age
    [
      n("Serath's dating work has been running alongside the reading since he arrived. He presents it on the fourth day."),
      d("SERATH", "left",  "neutral", "The mortar between the building's stones uses a preparation technique documented in pre-Archive construction records — techniques that went out of use approximately two hundred years before the Archive was established. The building predates the Archive by at least that margin."),
      d("KAEL",   "right", "neutral", "Five hundred years."),
      d("SERATH", "left",  "neutral", "At minimum. The north wall's earliest notation layer — there are layers, the top notation is the most recent — the earliest layer uses a character form consistent with a dialect of the original notation system that was current seven hundred years ago."),
      d("MAREN",  "left",  "neutral", "Seven hundred years. The method has been developed and documented for seven hundred years."),
      d("SERATH", "left",  "neutral", "The original archivist — the writer of the thirteen fragments — was working from a tradition that predated them by centuries. The fragments are not the beginning. The walls are not the beginning. Something older led here."),
      n("The room holds this. Seven hundred years. The method working its way through time in walls and fragments and people who reached it and tried to leave it for the next person, across a span longer than the institution built to house it."),
    ],

    // Spark 10: Dorath outside
    [
      n("Third day. You find Dorath outside at the valley's perimeter, walking the sight lines with the systematic attention she gives to all physical spaces. She has been doing this since the first morning."),
      d("KAEL",   "right", "neutral", "You're not going in."),
      d("DORATH", "left",  "neutral", "I have gone in. I've read the south wall's first section. I'm doing the work that needs doing out here."),
      d("KAEL",   "right", "neutral", "What work."),
      d("DORATH", "left",  "neutral", "The approaches. The sight lines from the eastern ridge. The departure routes — not just the one we came in by. Where a person could leave the valley without being seen from the ridge, if they needed to."),
      d("KAEL",   "right", "neutral", "You're planning for an exit."),
      d("DORATH", "left",  "neutral", "I'm planning for twelve exits, depending on the situation. The building has one door. That's the limitation. If the situation requires leaving quickly and through the door is not available, there are four possible alternatives. I'm testing them."),
      n("She continues the perimeter. The valley is quiet. The eastern ridge is visible at the valley's edge — the point from which a watcher would see the main building. Dorath is mapping the watcher's blind spots."),
    ],

    // Spark 11: What Ryn finds in the north wall
    [
      n("Ryn has been at the north wall for most of the fourth day. She works differently from the others: she goes through the administrative content first, the organizational annotations that run through the wall's middle section."),
      d("RYN",    "right", "quiet",   "There's a section here about the network. Not Eran's network — something older. The original structure the practitioner built around the settlement."),
      d("MAREN",  "left",  "neutral", "What does it describe?"),
      d("RYN",    "right", "quiet",   "Contact points. Waypoints. The idea of maintaining approach routes and protecting the settlement's existence without drawing attention to it. The same architecture Eran built. But it's described here as if they built it themselves, from first principles."),
      d("SERATH", "left",  "neutral", "The network structure was documented here first."),
      d("RYN",    "right", "quiet",   "The original practitioner built the first protection network. Eran rebuilt it following the same logic. The walls contain both the method and the infrastructure for preserving the method. They tried to leave everything."),
    ],

    // Spark 12: Maren at the northeast corner
    [
      n("Day five at the settlement. Maren has been in the northeast corner since the second morning. Not continuously — she eats, she sleeps in two-hour intervals, she runs the practice. But the northeast corner is where she returns."),
      n("You find her there late in the afternoon. She is not reading. She is sitting with the wall at her back, her eyes closed, the practice in some form you can't see from the outside."),
      n("After a long time she opens her eyes."),
      d("MAREN",  "left",  "neutral", "Fourteen years at the thirteenth stage. The fragments describe the fourteenth but not with enough specificity for me to know if what I was attempting was the fourteenth or a facsimile of it. The walls describe it in first-person experiential terms."),
      d("KAEL",   "right", "neutral", "You know what to do now."),
      d("MAREN",  "left",  "neutral", "I know exactly what it requires. I have known, at various points in the past fourteen years, a version of what it requires. The walls have given me the precision I was missing. The version I had was approximately correct. The version I have now is correct."),
      d("KAEL",   "right", "neutral", "When?"),
      d("MAREN",  "left",  "neutral", "When I've held this long enough to be certain I haven't misread. I don't want to rush a stage that cannot be repeated. Two more days."),
    ],

    // Spark 13: What the north wall says about going east
    [
      n("Ryn completes her account of the north wall's final section in the morning of day six. The group assembles to hear it."),
      d("RYN",    "right", "quiet",   "The north wall's final section describes what the practitioner did after completing the method. They went east. Specifically: to find the institution that had disrupted the settlement forty years before they completed."),
      d("KAEL",   "right", "neutral", "They went to confront Voss's predecessor."),
      d("RYN",    "right", "quiet",   "They went to understand the disruption — not to confront, to understand. The notation says: 'I went to learn what they wanted, because you cannot address what you have not understood.'"),
      d("SERATH", "left",  "neutral", "Did they find out?"),
      d("RYN",    "right", "quiet",   "The wall doesn't say directly. The final line of the north section says: 'I learned what they wanted. What I found changed what I believed about whether it could be addressed. I am still deciding what to do about that.'"),
      d("MAREN",  "left",  "neutral", "They were still deciding when they wrote this."),
      d("RYN",    "right", "quiet",   "The east wall has a date. Forty years later. Another person made the same journey. The notation is different but the intent is described the same way. Someone goes east, confronts the disruption, comes back and writes what they found. Forty years later, someone else goes."),
      d("MAREN",  "left",  "neutral", "The cycle."),
    ],

    // Spark 14: The night before
    [
      n("Night six. You are sitting in the main building's center, all seven of you, for what has become the pattern of late evenings here — working, reading, practicing, comparing notes. Maren has been in the northeast corner for four hours. She does the practice with the quality of attention she gives to the things she is almost certain about."),
      d("KAEL",   "right", "neutral", "Serath. The third practice. Where are you?"),
      d("SERATH", "left",  "neutral", "The third threshold approached. The wall's description of the mechanism has accelerated something. When you understand why the practice works, it works faster."),
      d("BREK",   "left",  "neutral", "I've been at the second threshold for five weeks. The wall's south section — the mechanism description — I've had it twice. It's correct. What I was doing was correct. Knowing it's correct from the outside has made the inside more precise."),
      d("SIRA",   "right", "neutral", "Third threshold yesterday. The walls describe the transition so specifically — I knew when I was there."),
      n("Maren, without turning around: 'The wall was written by someone who wanted the reader to be able to recognize each threshold from inside. They succeeded.'"),
    ],

    // Spark 15: Stay
    [
      n("Day seven. Morning. Maren is in the northeast corner when you come in before dawn. She has been there all night. She does not look up."),
      d("MAREN",  "left",  "neutral", "Good. Stay."),
      n("She turns back to the wall. Begins the practice again — the eighth, the maintenance. Then something shifts. Not in the room. In her. The quality of the stillness changes. The quality of her attention changes."),
      n("The light comes through the east window and crosses the north wall. Maren is still. Completely still. Not in the way of someone thinking — in the way of someone in the middle of something."),
      n("You stay."),
      n("The morning comes fully. The others come in, one at a time, and read the room, and stay. Seven people and one lamp turned low and the walls and whatever is happening in the northeast corner."),
      n("Nobody speaks. Nobody leaves."),
      n("She has been at the thirteenth stage for fourteen years. The walls have given her the precision she was missing. She knows what the fourteenth requires. She said: two more days. It is day seven."),
      n("She is not waiting anymore."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 15 — The Method Complete
  // Setting: the settlement, the walls
  // Characters: Player, Maren, Ryn, Dorath, Brek, Tal, Sira, Serath
  // ═══════════════════════════════════════════════════════════════════════════
  w15: [

    // Spark 1: What completion looks like
    [
      n("Maren completes the fourteenth stage on the morning of the third day. You are there because she asked you to stay."),
      n("You cannot see it happen. It is entirely internal. What you see is a person doing the practice — sitting still, attending to something you cannot access — and then something changing in the quality of her stillness. Not relaxation. Resolution. The difference between a question and an answer."),
      n("She opens her eyes. She looks at you."),
      d("MAREN",  "left",  "neutral", "It's done."),
      d("KAEL",   "right", "neutral", "What is it like?"),
      d("MAREN",  "left",  "neutral", "It is like being very clear."),
      n("You wait for more. She doesn't give more. You understand, after a moment, that 'very clear' is not an understatement — it is the exact description. The practice built structural changes in what she carries. The fourteenth stage made those changes irreversible. What she carries now cannot be taken from her because it is no longer something she carries. It is something she is."),
      d("KAEL",   "right", "neutral", "The Archive."),
      d("MAREN",  "left",  "neutral", "Yes. The Archive, in the only form that fire doesn't reach."),
      n("She stands. She stretches once, with the deliberateness of someone who has been very still for a long time. Then she begins preparing for the day's work the same way she always has — efficiently, without ceremony. The completion is not the end. It is the first moment of what comes after."),
    ],

    // Spark 2: The others' thresholds
    [
      n("The threshold dates, when they are finally compared: Brek reached the second threshold two days before you arrived at the settlement. Serath's threshold dates are different — he reached the second threshold four months ago, in the Archive, during the final weeks before the fire. Sira reached the second threshold three weeks before the fire and the third practice threshold two weeks before the fire."),
      d("KAEL",   "right", "neutral", "Serath. Four months ago you crossed the second threshold. While you were still in the Archive."),
      d("SERATH", "left",  "neutral", "While I was finding the deep records. The resonance the second practice produces — it makes connections visible. I began seeing the deep records' organization differently from the rest of the Archive collection. That's what led me to look for the section that wasn't publicly cataloged."),
      d("KAEL",   "right", "neutral", "The practice produced the discovery."),
      d("SERATH", "left",  "neutral", "The practice and the discovery are the same process. You cannot separate them."),
      n("You think about this. About the way the practice produces resonance, and resonance produces structure, and structure produces visibility, and visibility produces — in different people, in different ways — the specific thing they were positioned to find. Serath found the deep records. Sira found the fourteenth fragment. Brek found the mechanism. And you—"),
      d("KAEL",   "right", "neutral", "What did I find?"),
      n("Nobody answers immediately. Ryn looks up from the west wall."),
      d("RYN",    "right", "quiet",   "You found the group."),
    ],

    // Spark 3: Approaching the second threshold
    [
      n("You have been practicing at the first threshold for three weeks. The second practice has been producing resonance for ten days. And this morning, at the wall, you reach for the structure you've been building — the complete architecture of the first five Vraen fragments, held in relationship — and something happens."),
      n("The structure is not five things in relationship. It is one thing. They have resolved into each other."),
      d("KAEL",   "right", "neutral", "Maren."),
      d("MAREN",  "left",  "neutral", "Mm."),
      d("KAEL",   "right", "neutral", "The five fragments I've been working with. They're — not five anymore."),
      d("MAREN",  "left",  "neutral", "No. They're not."),
      d("KAEL",   "right", "neutral", "When did that happen?"),
      d("MAREN",  "left",  "neutral", "When you approached the second threshold. The resonance effect — what Brek described as propagation — it builds until the held things resolve into structure. You're at the entrance to the second threshold."),
      n("You hold the resolved structure and examine it. Clean. Precise. Without approximation or compression. Five fragments you know fully and hold in relationship so complete that accessing any part gives you the rest without effort."),
      d("KAEL",   "right", "neutral", "How much of the complete material is in here now?"),
      d("MAREN",  "left",  "neutral", "What you've practiced with. The five fragments are a foundation. They will not be lost and they will not compress. From here, everything you add to the structure lands in relationship to what's already there."),
    ],

    // Spark 4: The west wall's final section
    [
      n("Ryn has been sitting in front of the west wall's final section for an hour. She does not move. When she comes away from it, her expression is the one she uses when something very large has arrived very quietly."),
      d("KAEL",   "right", "neutral", "What is it?"),
      d("RYN",    "right", "quiet",   "The final section of the west wall. It's not about the practice. It's about what the practice means for the question of what happens next."),
      d("KAEL",   "right", "neutral", "What does it say?"),
      d("RYN",    "right", "quiet",   "It describes the person who completed it before writing the walls. Where they went after. What they did with what they carried."),
      d("KAEL",   "right", "neutral", "What did they do?"),
      d("RYN",    "right", "quiet",   "They went east. To find whoever had made the decision that led to the Archive's first disruption. The same disruption, two hundred and sixty years before ours. They went to find the original Voss."),
      n("The silence in the room."),
      d("KAEL",   "right", "neutral", "Did they find them?"),
      d("RYN",    "right", "quiet",   "The wall doesn't say. The record ends before that."),
      d("KAEL",   "right", "neutral", "So we don't know what happened."),
      d("RYN",    "right", "quiet",   "We know they went. We know they were carrying something that couldn't be taken. We know they didn't come back to the settlement. Beyond that—"),
      n("She folds her notes."),
      d("RYN",    "right", "quiet",   "The east wall shows a date. Forty years ago, someone else went. Same direction. The cycle has been repeating."),
    ],

    // Spark 5: The attempt
    [
      n("You sit in front of the north wall's final notation. You hold what you have — the resolved structure of the five fragments, the second practice beginning, the third practice in early stages. And you hold the wall's description of what comes next."),
      n("It doesn't work. Not yet. The stage requires a completeness you have not yet reached. But the wall's description is precise enough that you understand what the gap is — not a vague sense of 'more to do' but a specific, locatable gap between where you are and where the stage requires you to be."),
      d("MAREN",  "left",  "neutral", "You tried."),
      d("KAEL",   "right", "neutral", "Yes."),
      d("MAREN",  "left",  "neutral", "What did you find?"),
      d("KAEL",   "right", "neutral", "The gap is specific. I know exactly what's missing."),
      d("MAREN",  "left",  "neutral", "That is the second thing the walls give you. The first is the description. The second is the ability to locate yourself in it precisely."),
      d("KAEL",   "right", "neutral", "How long?"),
      d("MAREN",  "left",  "neutral", "To close the gap from where you are? Months. The practice doesn't have shortcuts."),
      n("You accept this. The months between you and the fourteenth stage are not discouraging — they are specific. You know the path. You know how long the path is. You know that at the end of it is the thing the original archivist wrote thirteen fragments to describe, and the thing the person on the walls wrote a whole building to describe."),
      d("KAEL",   "right", "neutral", "Then let's not waste the months."),
    ],

    // Spark 6: What they saw
    [
      n("The account of what it looked like from the outside comes from four different people."),
      d("BREK",   "left",  "neutral", "She sat down. She had been standing at the northeast wall and she sat down against it. That was the only visible change for two hours."),
      d("SERATH", "left",  "neutral", "The quality of her stillness was different from practice stillness. Practice stillness is active — there is attention operating underneath. This was something else. The attention was elsewhere."),
      d("RYN",    "right", "quiet",   "Three hours in, I noticed the lamp. We hadn't refilled it. The oil should have burned out. It was still burning at the same level."),
      d("SIRA",   "right", "neutral", "I was watching her hands. They were still for the first two hours. Then they moved once — a specific gesture, small, the kind you make when you've found what you were looking for. Then still again."),
      d("KAEL",   "right", "neutral", "And then?"),
      d("BREK",   "left",  "neutral", "She opened her eyes. She looked at Kael. She said: it's done."),
      n("Each account names a different detail. Each account is correct. The whole thing is in none of them."),
    ],

    // Spark 7: Maren's first full account
    [
      n("She gives one full account, in the evening of the day she completed the method, after she has eaten and slept for four hours and the quality of her has settled into whatever it will be going forward."),
      d("MAREN",  "left",  "neutral", "The first thirteen stages are practices. They require continuous work. The structural changes they produce are real, but they can erode without maintenance. The fourteenth is different in the following specific way: it is not a practice. It is a state. States don't erode."),
      d("KAEL",   "right", "neutral", "What changed. When it completed."),
      d("MAREN",  "left",  "neutral", "The original practitioner used an analogy in the north wall that is accurate. They describe it as 'becoming the ground rather than working on the ground.' The first thirteen stages produce changes in how you work. The fourteenth changes the character of what you are. The distinction is not metaphorical."),
      d("RYN",    "right", "quiet",   "Can you describe it precisely?"),
      d("MAREN",  "left",  "neutral", "The marginal notation was accurate. What I carry does not reside in a building. It does not require a building. It does not require continuous maintenance. It cannot be taken, because taking requires that the thing taken be discrete. What I now carry is not discrete. That is the fourteenth stage."),
    ],

    // Spark 8: Serath's timeline
    [
      n("The day after Maren completes the method. The group is reconfiguring — the map of where everyone is has changed."),
      d("KAEL",   "right", "neutral", "Serath. The third threshold. The walls described the transition mechanism. Does knowing the mechanism change how close you are?"),
      d("SERATH", "left",  "neutral", "It changes what I'm looking for. Before reading the south wall, I knew the practice was producing effects — the resonance, the connection structure. I didn't know what the fourth threshold would feel like from inside. Now I have a description."),
      d("KAEL",   "right", "neutral", "How long."),
      d("SERATH", "left",  "neutral", "With the walls visible and the group present — I'm estimating three months. Perhaps less."),
      d("MAREN",  "left",  "neutral", "Less. You're being conservative. The resonance effect in proximity — with seven practitioners in the same space — accelerates each individual practice. I've seen this before, in smaller groups. You're underestimating it."),
      d("SERATH", "left",  "neutral", "How much less."),
      d("MAREN",  "left",  "neutral", "Six weeks if we stay here. Possibly four."),
    ],

    // Spark 9: What the resolved structure feels like
    [
      n("You try to describe it to Sira, who reaches you where you've been working."),
      d("SIRA",   "right", "neutral", "The five fragments. Tell me what they feel like now."),
      d("KAEL",   "right", "neutral", "They don't feel like five things. They feel like one thing that was always one thing. I could always access any fragment individually — now that's not how it works. Accessing one aspect means the whole structure is present. It's not connected. It's unified."),
      d("SIRA",   "right", "neutral", "The second practice's first result."),
      d("KAEL",   "right", "neutral", "Second threshold approach. Yes. But the walls have changed how I understand what's happening. The south wall's mechanism section — I read it and I could recognize what I was already experiencing. The recognition changed the experience. I understand what I'm doing from inside rather than from outside."),
      d("SIRA",   "right", "neutral", "That's the fourth threshold's description in the south wall. Understanding the mechanism from inside the mechanism."),
      d("KAEL",   "right", "neutral", "I'm not at the fourth threshold."),
      d("SIRA",   "right", "neutral", "Not yet. But you can see it from here."),
    ],

    // Spark 10: Sira's acceleration
    [
      n("Maren finds Sira at the west wall on the third day after completion. Sits with her for a moment."),
      d("MAREN",  "left",  "neutral", "The third threshold, two days ago. The resonance is visible in the way you're working."),
      d("SIRA",   "right", "neutral", "Reading the west wall at the second threshold was useful. Reading it at the third threshold is different. The wall's descriptions open differently depending on what stage you're at when you read them."),
      d("MAREN",  "left",  "neutral", "The original practitioner designed it that way. The notation layers correspond to different stages. Ryn identified this from the administrative section. The same text reads as different information at different stages."),
      d("SIRA",   "right", "neutral", "I've been going through sections I read at the first threshold. They say different things now."),
      d("MAREN",  "left",  "neutral", "Yes. That is correct. This is why the original practitioner built the building: not to be read once, but to be read repeatedly as the method advances. The walls are the method, not just its description."),
      n("Sira looks at the wall for a long time."),
      d("SIRA",   "right", "neutral", "How long did it take you, from the third threshold to the fourteenth stage?"),
      d("MAREN",  "left",  "neutral", "Eleven years. But you are not working under the conditions I worked under. And you have the south wall's mechanism descriptions."),
    ],

    // Spark 11: The east wall's cycle dates
    [
      n("The east wall's cycle dates. Brek has been working through the full accounting, date by date."),
      d("BREK",   "left",  "neutral", "Seven recorded journeys east over five hundred years. The notation for each identifies the practitioner's stage at departure. Every departure is after completion. No one has gone east without completing the fourteenth stage first."),
      d("KAEL",   "right", "neutral", "They waited until they were complete."),
      d("BREK",   "left",  "neutral", "The north wall has a single line about this: 'Go when you carry the thing that cannot be taken. Not before. Before is the wrong time.'"),
      d("SERATH", "left",  "neutral", "Strategic. You go when you cannot be reduced. When what you carry cannot be extracted."),
      d("BREK",   "left",  "neutral", "The last recorded departure was forty years ago. The notation says: 'I go understanding that the institution has moved. I may not find what the first person found. I go anyway, because not going is also a choice.'"),
      d("MAREN",  "left",  "neutral", "They knew the institution had moved."),
      d("BREK",   "left",  "neutral", "They went anyway. The east wall's final entry after that departure date is blank. There's no return date. No account."),
    ],

    // Spark 12: The forty-year cycle
    [
      n("The question of why forty years. Serath has been working through this since the second day."),
      d("SERATH", "left",  "neutral", "The disruption cycle is forty years. Consistent across five hundred years of recorded history. The institution — what we're calling Voss — disrupts the settlement or the Archive on a forty-year cycle. The east wall documents this precisely."),
      d("KAEL",   "right", "neutral", "Why forty years."),
      d("SERATH", "left",  "neutral", "The deep records' detection capability requires recalibration after a disruption. Whatever the group that went east did — even if they didn't stop the institution — they disrupted the detection system. It takes forty years to rebuild the detection capability to the point where it can identify a new generation of advanced practitioners."),
      d("MAREN",  "left",  "neutral", "The Archive burned. That's a disruption."),
      d("SERATH", "left",  "neutral", "The Archive burned. And we left. We are not where they expect practitioners to be. We are in a settlement that predates their detection framework by seven hundred years."),
      d("BREK",   "left",  "neutral", "We have forty years."),
      d("SERATH", "left",  "neutral", "We have less. The detection rebuilds faster if they capture a practitioner who can describe the behavioral markers. But we have time."),
    ],

    // Spark 13: What Maren is now
    [
      n("You ask Maren to describe it again, on the fifth day after completion, because the first description was abstract and you want the specific version."),
      d("KAEL",   "right", "neutral", "What can you do now that you couldn't do before."),
      d("MAREN",  "left",  "neutral", "Specific answer: I can receive incoming material and immediately understand its relationship to everything else I've encountered. Not as a search process — as direct perception. The resonance is permanent rather than something I have to generate."),
      d("KAEL",   "right", "neutral", "The propagation effect."),
      d("MAREN",  "left",  "neutral", "Continuous. Not a process I initiate — the way breathing is not a process you initiate. What you encounter is immediately placed and understood. The original archivist described this as 'the knowledge which does not require knower and known to be separate.' I didn't understand this until now. It's accurate."),
      d("KAEL",   "right", "neutral", "What can you not do."),
      d("MAREN",  "left",  "neutral", "Everything I couldn't do before that has nothing to do with the method. My limits are what they have always been, minus the method's previous constraints on my access to what I know. I am not unlimited. I am precisely the person I was, with this one change."),
    ],

    // Spark 14: The gap in full
    [
      n("Your attempt on the north wall's final notation. Not an attempt at the fourteenth stage — you know you are not ready. An attempt to understand the gap between where you are and where you need to be."),
      n("You sit in front of the notation. You hold the resolved structure — the five fragments in their unified form. You look at the first-person account that the practitioner tried to leave for you. The gap is specific. Not large. Not vague. It has a location."),
      d("KAEL",   "right", "neutral", "Maren. The gap. It's in the third practice. There's a part of the third practice that I've been doing approximately rather than exactly."),
      d("MAREN",  "left",  "neutral", "Describe the approximation."),
      d("KAEL",   "right", "neutral", "The chain construction. I've been building chains of three or four. The wall's account describes structures of twelve or more with no additional effort at that stage. I've been working in the right direction but at one-third of the depth required."),
      d("MAREN",  "left",  "neutral", "Yes. That is accurate. The south wall has the mechanism description for this — it is about the density of the chain structure, not its length. You've been building length. You need to build density."),
    ],

    // Spark 15: What Ryn found in the allocation records
    [
      n("Ryn comes to you before the departure planning meeting. She has been quiet for two days, going through the administrative records in the evenings after the main work of reading the walls."),
      d("RYN",    "right", "quiet",   "The allocation records for Voss's eastern building. The ones I found from the permit applications."),
      d("KAEL",   "right", "neutral", "The building under construction."),
      d("RYN",    "right", "quiet",   "It went operational. I've been tracking the allocation records across the entire document set — cross-referencing supply purchases, staff designations, maintenance schedules. The building's operational date is in the supply records. Fourteen days before we left Tal's building."),
      d("KAEL",   "right", "neutral", "It's open."),
      d("RYN",    "right", "quiet",   "It's been running for three weeks. At minimum three people inside — the allocation records show three sleeping-space designations. Maximum six based on the supply volumes. They are not building it for future use. They built it for right now. They are already using it."),
      n("The planning meeting is in an hour. This is what Ryn will bring to it. The building is not a future problem. The building is a present one."),
      d("RYN",    "right", "quiet",   "And the north section that Serath annotated. The supply allocation includes materials consistent with what you would need for extended study of a practitioner who is not there voluntarily."),
    ],

  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 16 — What the Archive Was For
  // Setting: the settlement, final days of Act One
  // Characters: Player, Maren, Ryn, Dorath, Brek, Tal, Sira, Serath
  // ═══════════════════════════════════════════════════════════════════════════
  w16: [

    // Spark 1: Seven people at work
    [
      n("Seven people in the settlement, doing seven things in the direction of one. The division of labor is not assigned — it emerged in three days, each person moving toward the work they were most positioned to do."),
      d("BREK",   "left",  "neutral", "The perimeter is clean. No indication of approach."),
      d("DORATH", "left",  "neutral", "The eastern routes. I've been going through what Tal has and what I know. There are three viable paths east to the city."),
      d("TAL",    "left",  "neutral", "And one less obvious option that Eran identified before his death. It adds four days but avoids the main junction points."),
      d("MAREN",  "left",  "neutral", "We need to decide on a sequence. Not just a route — what we do when we arrive."),
      d("SIRA",   "right", "neutral", "I finished the west wall's final section yesterday. And found something in the last line that changes what I thought I understood."),
      d("SERATH", "left",  "neutral", "The date."),
      d("SIRA",   "right", "neutral", "The date. Yes."),
      n("The group is working together with the specific efficiency of people who have been moving toward the same place from different starting points and have finally arrived at it. The settlement, which was the destination, is now the beginning. The map is on the table. The question is east."),
    ],

    // Spark 2: Maren's accounting
    [
      n("You find Maren in the morning, outside the main building, standing with a view of the valley. Not thinking the way she thinks when something needs solving — thinking the way she thinks when something has been solved and needs to be looked at from a distance."),
      d("KAEL",   "right", "neutral", "What are you thinking about?"),
      d("MAREN",  "left",  "neutral", "The Archive."),
      d("KAEL",   "right", "neutral", "The building or what it was for?"),
      d("MAREN",  "left",  "neutral", "The decision to build it. Someone five hundred years ago decided that what the original archivist had done was worth institutionalizing. Worth building around. Worth staffing and maintaining and protecting for decades. They were right. The building burned. The work continues."),
      d("KAEL",   "right", "neutral", "Because you and Serath and Sira—"),
      d("MAREN",  "left",  "neutral", "Because of everyone the building produced over five hundred years. Most of them never reaching the final stages. Some of them reaching them. The product was never the paper. The product was people."),
      d("KAEL",   "right", "neutral", "And Voss has been working against this for two hundred and sixty years."),
      d("MAREN",  "left",  "neutral", "Working to control it. Not against. Control. The distinction matters because it tells you something about what they are and what they want."),
      d("KAEL",   "right", "neutral", "What do they want?"),
      d("MAREN",  "left",  "neutral", "I believe I know. And I believe the east wall's final date is telling us that someone who completed the method forty years ago arrived at the same conclusion."),
    ],

    // Spark 3: Serath on the next step
    [
      n("Serath tells you in the afternoon. He has been working through the question of next steps since he arrived, and now he has the answer, or enough of one to work with."),
      d("SERATH", "left",  "neutral", "Voss is an institution. Not one person — a position. The person currently holding the position is based in the eastern city. The building under construction that the east wall describes — it is their building. They are building another Archive."),
      d("KAEL",   "right", "neutral", "Another Archive that produces people who complete the method. Under their control."),
      d("SERATH", "left",  "neutral", "A machine that produces what the original Archive produced, but outputs to them rather than to the world. If a person who completes the method carries what cannot be taken — then the only way to have access to that is to be the institution that produces the person. To own the preparation."),
      d("KAEL",   "right", "neutral", "They burned the Archive to remove the competition."),
      d("SERATH", "left",  "neutral", "And are building a replacement they control."),
      n("The architecture of what Voss has been doing for four generations resolves into a single coherent intention: not destruction, not seizure. Capture of the source."),
      d("KAEL",   "right", "neutral", "What do we do about it?"),
      d("SERATH", "left",  "neutral", "We go east. And we are not alone."),
      n("He gestures toward the valley entrance, then toward the building behind you, then at his own chest."),
      d("SERATH", "left",  "neutral", "We carry what the Archive carried. In the only form it can travel."),
    ],

    // Spark 4: Ryn's decision
    [
      n("Ryn has been quiet in the final days at the settlement — not withdrawn, just working. She brings her decision to you directly, without ceremony."),
      d("RYN",    "right", "quiet",   "Maren told me, when she first brought me into the preparation, that the goal was to get the work out of the building. She said the building was the instrument and the work was the point. She said if the building went, the work would survive if the people carrying it survived."),
      d("KAEL",   "right", "neutral", "The work survived."),
      d("RYN",    "right", "quiet",   "More than survived. The people who were doing it are all in this valley. I have been watching for weeks to see if what I have from the practice is what was intended. Whether procedural knowledge responds the same way."),
      d("KAEL",   "right", "neutral", "Does it?"),
      d("RYN",    "right", "quiet",   "Yes. The routes, the arrangements, the access points, the administrative records I copied from the Archive — they are all there. Precisely. Without compression. And in relationship to each other in a way that makes each one more usable."),
      d("KAEL",   "right", "neutral", "What does that mean for what comes next?"),
      d("RYN",    "right", "quiet",   "It means I know every route into and out of the eastern city. I know the access records for every building constructed or renovated in the past three years. I know what was and I know what has changed."),
      n("She says this with the quietness of someone stating a fact they have already integrated. Not pride. Precision."),
      d("RYN",    "right", "quiet",   "I know the building they're constructing. I know where it is. I know who has been in and out of it."),
    ],

    // Spark 5: Before they leave
    [
      n("The last evening at the settlement. Everyone present — the seven of them together in the main building for the last time in whatever configuration this is. The map is open. The routes have been decided. What has not been said is what will happen when they arrive."),
      d("MAREN",  "left",  "neutral", "I want to say one thing before we leave."),
      n("Everyone is quiet. When Maren says she wants to say one thing, she says one thing."),
      d("MAREN",  "left",  "neutral", "The Archive was a machine for producing people who complete the Vraen method. The building is gone. The machine is not gone. We are the machine."),
      n("She touches the case on the table — the fragments, the cipher, the fourteenth fragment."),
      d("MAREN",  "left",  "neutral", "When we go east, we are not going to recover something lost. We are going to continue something that has been continuing for five hundred years, through buildings and their disruptions, through people and their deaths, through every attempt to control it or stop it."),
      d("SERATH", "left",  "neutral", "And it has not been stopped."),
      d("MAREN",  "left",  "neutral", "No."),
      d("SIRA",   "right", "neutral", "The person who wrote the walls went east and didn't come back. And forty years ago another person went east. And the cycle has been going on longer than we know."),
      d("MAREN",  "left",  "neutral", "Yes. But there is a difference this time."),
      d("KAEL",   "right", "neutral", "What's different?"),
      n("She looks at all of them, one at a time. Each look exact."),
      d("MAREN",  "left",  "neutral", "Before, the person who went east went alone."),
    ],

    // Spark 6: Departure morning
    [
      n("The last morning at the settlement. First light. The valley is cold and clear. Seven people with packs at the settlement building's door."),
      n("The walls are visible through the open door. You look at them for the last time from the threshold. Not the northeast corner — the whole room. The circuit of it, north to east to south to west. The complete document that one person tried to leave for whoever came next, and the people who came next, and what they are carrying out of it."),
      d("SERATH", "left",  "neutral", "We could come back."),
      d("MAREN",  "left",  "neutral", "The building will still be here."),
      d("SERATH", "left",  "neutral", "Yes."),
      n("He closes the door. Pel, at the valley's edge: 'I'll maintain the approach. If anyone comes, I'll send word through the network.' Dorath: 'What's left of it.' Pel: 'What's left of it is still functional. I'll manage.'"),
      n("They walk. The valley falls behind. The ridge ahead. Seven people moving east."),
    ],

    // Spark 7: What Sira packed
    [
      n("On the road, you fall in beside Sira. She is carrying a pack heavier than when she arrived at the settlement. Her journal has tripled in thickness — it contains not just her original entries but three weeks of walls."),
      d("KAEL",   "right", "neutral", "How much of the walls do you have in there."),
      d("SIRA",   "right", "neutral", "All four walls. In sequence. With notation on which sections correspond to which stages — Serath's contribution. And the south wall's mechanism descriptions cross-referenced to each stage."),
      d("KAEL",   "right", "neutral", "You've documented the entire thing."),
      d("SIRA",   "right", "neutral", "The walls cannot move. What I have in here can. If the settlement is ever compromised — if someone finds it and damages the notation — the walls exist in this journal."),
      d("KAEL",   "right", "neutral", "You've been doing this since you arrived."),
      d("SIRA",   "right", "neutral", "Day three. I started with the west wall because it was the one I understood first. Serath joined the documentation project on day six."),
      n("He moves up alongside you."),
      d("SERATH", "left",  "neutral", "We have three copies. One in Sira's journal. One in my notes. One that I wrote out in a notation style designed to be unreadable without the cipher's secondary key."),
    ],

    // Spark 8: What Serath knows about the insider
    [
      n("Two hours east on the road. Serath has been working through this since the confrontation and he brings the final accounting out on the road, because roads are where you say things you haven't said yet."),
      d("SERATH", "left",  "neutral", "The person I confronted at the Archive. I have narrowed it to two candidates. The confrontation gave me information: they used a specific notation shorthand in the accusation I made. They corrected my terminology without thinking about it."),
      d("DORATH", "left",  "neutral", "Automatic correction. Someone who uses the notation professionally."),
      d("SERATH", "left",  "neutral", "One of seven people in the Archive with access to the detection records. The notation correction narrows to one of three. The timing of the confrontation narrows to two. Only two of the three had access at that hour."),
      d("MAREN",  "left",  "neutral", "Who."),
      d("SERATH", "left",  "neutral", "Either someone who survived the fire and is still in the eastern city. Or someone who didn't. I don't know which one without more information. The Spire's building may tell us — if either of those two is in the building."),
    ],

    // Spark 9: What they're carrying east
    [
      n("The road descends from the ridge. The eastern road runs now toward the city rather than away from it."),
      d("KAEL",   "right", "neutral", "When we reach the city. What are we actually doing?"),
      d("MAREN",  "left",  "neutral", "Ryn's information gives us the building. Its location, its operational pattern, its supply schedule. We have a window: the supply delivery that Ryn identified creates a gap in the building's normal external observation. Three hours. During that gap, the external observation is reduced."),
      d("KAEL",   "right", "neutral", "Three hours to do what."),
      d("MAREN",  "left",  "neutral", "Document what is inside. Determine who is being held and in what condition. And, if possible, introduce information into the building's internal communication system that tells the people inside it something they don't currently know."),
      d("KAEL",   "right", "neutral", "What don't they know."),
      d("MAREN",  "left",  "neutral", "That the method they believe they control was completed outside their framework. Three times. By people they are not watching for. That changes the premise of everything they've built that building to do."),
    ],

    // Spark 10: Maren on the Archive
    [
      n("Second day on the road. You walk with Maren for a stretch."),
      d("KAEL",   "right", "neutral", "The person who built the settlement — they built a different machine. Older. The walls."),
      d("MAREN",  "left",  "neutral", "The walls don't require an institution. They don't require a staff or a location within a city or an administrative structure. They require a building in a valley and someone willing to make the journey. That is a more durable machine than the Archive was."),
      d("KAEL",   "right", "neutral", "The Archive was built because the settlement wasn't accessible enough."),
      d("MAREN",  "left",  "neutral", "The Archive made the method more accessible and more vulnerable simultaneously. The original practitioner understood this tradeoff and chose durability over accessibility. The archivist who built the Archive chose accessibility over durability."),
      d("KAEL",   "right", "neutral", "And both choices are here on this road."),
      d("MAREN",  "left",  "neutral", "Yes. That is exactly right."),
    ],

    // Spark 11: Ryn's full accounting
    [
      n("Midday camp on the second day. Ryn has been going through the administrative records one final time. She lays out the complete picture."),
      d("RYN",    "right", "quiet",   "The building is on the upper eastern district's fourth block, north face. Three floors. The ground level is administrative. The second floor is staff quarters and working space. The third floor is restricted access — the permit describes it as a 'research facility, restricted to four authorized personnel.'"),
      d("DORATH", "left",  "neutral", "Research."),
      d("RYN",    "right", "quiet",   "The supply allocation includes materials I wouldn't associate with research in the normal sense. I would associate them with extended occupancy under controlled conditions."),
      d("BREK",   "left",  "neutral", "Holding."),
      d("RYN",    "right", "quiet",   "The supply volumes are consistent with four people for three months. Three authorized personnel plus one additional occupant whose designation is not in the permit applications. The non-permit occupant is the reason for the restricted access designation."),
      d("MAREN",  "left",  "neutral", "Someone is in the building who was not meant to be documented."),
      d("RYN",    "right", "quiet",   "Yes. And based on the detection records' calibration for the stage they would need to be at to be worth holding — we should assume they are not there voluntarily."),
    ],

    // Spark 12: Brek's security analysis
    [
      n("Brek presents his route analysis for the city approach on the second afternoon."),
      d("BREK",   "left",  "neutral", "The eastern city's upper district is accessed through three main entry points. The standard approach from the western road passes through the second entry point. The permit application gives us the building's address, which I can cross-reference against the city's administrative records that Ryn has."),
      d("RYN",    "right", "quiet",   "I have a map of the upper district from the Archive's reference collection. I copied it three years ago."),
      d("BREK",   "left",  "neutral", "The supply delivery Ryn identified comes through the third entry point — the goods entrance on the district's east face. Three hours on the day of delivery when the building's external observation rotates to watch the goods entry rather than the main approach."),
      d("DORATH", "left",  "neutral", "Two people."),
      d("BREK",   "left",  "neutral", "Two. The others need to be positioned for the contingency."),
    ],

    // Spark 13: The last evening before the city
    [
      n("Last camp before the city. A hollow in the terrain, one mile from the eastern gate. The fire is smaller than usual. The city's lights are visible on the horizon."),
      d("SIRA",   "right", "neutral", "The person in the building. The one in the restricted third floor. What stage do you think they're at?"),
      d("MAREN",  "left",  "neutral", "The holding conditions Ryn described are consistent with what Voss's third generation used on the practitioner they captured two hundred years ago. That practitioner was at the thirteenth stage. I believe that is who they look for — people approaching the final stage. Close enough to be interesting, not complete enough to be unextractable."),
      d("SIRA",   "right", "neutral", "Someone at the thirteenth stage."),
      d("MAREN",  "left",  "neutral", "The detection system Voss built is designed to find people at that stage. And the building was opened three weeks ago. Which means they found someone recently."),
      n("The fire. The city lights. One mile away. Inside that mile: a building on the fourth block, third floor restricted, someone at the thirteenth stage who was found by a detection system while the group was reading walls in a valley."),
      d("DORATH", "left",  "neutral", "We go at first light. Rest now."),
    ],

    // Spark 14: What Dorath carries (final)
    [
      n("Third day. The road approaches the eastern city. You walk beside Dorath."),
      d("KAEL",   "right", "neutral", "The contingency positions. If two people go in and don't come out."),
      d("DORATH", "left",  "neutral", "Three extraction routes. The fallback addresses I maintain — I updated the third set before the Archive burned. If we separate, the addresses are how we find each other. Same as before."),
      d("KAEL",   "right", "neutral", "Have you had to use them. Actually use them."),
      d("DORATH", "left",  "neutral", "No. Eleven years and they've never been used."),
      d("KAEL",   "right", "neutral", "What's different about this situation."),
      d("DORATH", "left",  "neutral", "Nothing. The protocol is the protocol. It's never been used because the protocol was followed before the situation required it. That's how it's supposed to work."),
      n("She says this flatly, the way she says all practical things. The city's roofline against the afternoon sky. Three hours to the eastern gate. Whatever is in that building on the fourth block's north face."),
    ],

    // Spark 15: The rider in the dark
    [
      n("Second watch. Dorath wakes Maren — not urgently, precisely. You are awake already."),
      d("DORATH", "left",  "neutral", "A rider. Eastern road, moving west. Fast. They'll pass us in twenty minutes if they hold pace."),
      d("MAREN",  "left",  "neutral", "Lamp?"),
      d("DORATH", "left",  "neutral", "No lamp. Moving in the dark, at speed, on a road they know well enough to navigate without light."),
      n("Maren stands up fully. She looks east."),
      d("MAREN",  "left",  "neutral", "Riding from the city. At night. Without a lamp."),
      d("DORATH", "left",  "neutral", "West. Away from the city. At speed."),
      d("MAREN",  "left",  "neutral", "Not away. Toward."),
      n("A beat."),
      d("DORATH", "left",  "neutral", "The settlement."),
      d("MAREN",  "left",  "neutral", "If someone in that building understood what the settlement is — if they've been inside long enough to access whatever the Spire has on it — they know exactly what the settlement is and where it is."),
      d("BREK",   "left",  "neutral", "They're sending someone ahead of us."),
      d("MAREN",  "left",  "neutral", "Or they've already sent someone. And this is the acknowledgment coming back."),
      n("The rider passes them at a distance of thirty yards in the dark without seeing them. The sound of it fades. Pel is at the settlement. The approach is watched. But the rider is going toward it at a pace that means they'll arrive before morning."),
    ],

  ],

}

// ─── Act 2 sparks ─────────────────────────────────────────────────────────────
// ACT2_SPARKS[weekNumber][sparkIndex]
// Initial content: 5 sparks per week (expansion ongoing)

export const ACT2_SPARKS = {

  // ── Week 1: Departure and the road ────────────────────────────────────────
  w1: [
    [
      n("The settlement is smaller from the outside. You have been in the valley long enough that the buildings felt permanent, immovable — the way any place that becomes routine feels permanent. Walking out through the valley entrance and looking back, it is a cluster of stone structures against a hillside, and then the hill curves and it is gone."),
      d("BREK",  "left", "neutral",  "Is it always this quick? The way a place stops existing once you leave it."),
      d("RYN",   "right", "quiet",   "The place still exists."),
      d("BREK",  "left", "neutral",  "That's not what I meant."),
      d("RYN",   "right", "quiet",   "I know."),
      n("The valley drops behind you. The eastern road begins."),
    ],
    [
      n("Maren walks at the front. You have watched her walk at the front for weeks now and you notice something you did not notice on the road from the city: the pace she sets is not her own comfortable pace. It is exactly the pace the slowest person in the group can maintain without effort. She has calibrated to the group without announcing it."),
      d("SERATH", "left", "neutral", "You're watching her set the pace."),
      d("KAEL",   "right", "neutral", "You noticed."),
      d("SERATH", "left", "neutral", "It's what she does. She did it when she was teaching. Framed everything at the edge of what each person could hold without quite struggling. The lesson looks like it belongs to the student. The work of finding that edge belongs to her."),
      n("The road runs through low grass country, the sky wide and grey above it. Somewhere ahead: five days of wilderness, then the first border settlement."),
    ],
    [
      n("Sira walks with Dorath for the first day and a half. You watch them from a distance — not eavesdropping, just the unconscious monitoring of someone who has been in a group long enough to read its minor weather patterns. Whatever they are saying, they are saying it seriously."),
      d("KAEL",   "right", "neutral", "What did she want to know?"),
      d("DORATH", "left", "neutral", "What the network looks like from the outside. What a person traveling alone through that kind of structure sees, versus what someone inside it sees. She was asking useful questions."),
      d("KAEL",   "right", "neutral", "And?"),
      d("DORATH", "left", "neutral", "She knows things I don't. Not about my network. About the one that preceded mine. Eran taught her before he died. That's not something I knew until yesterday."),
      n("You file this and keep walking."),
    ],
    [
      n("The first night. A cleared area at the road's edge, stones from a previous fire already arranged in a circle. Whoever used this last was traveling the same road, in the same direction. They were careful with the stones. Whoever they were, they knew how to leave a place the way they found it."),
      d("MAREN", "left", "quiet", "I want to say something about what we're walking into."),
      n("The fire is low. Everyone is listening."),
      d("MAREN", "left", "quiet", "The city we're going to has a different character from any city any of you have been in. It has been under a specific kind of administration for long enough that it is visible in how people move through it. Not fear exactly. Something more deliberate than fear. Caution that has become habit."),
      d("RYN",   "right", "quiet", "What does that mean in practice?"),
      d("MAREN", "left", "quiet", "It means questions are suspicious. It means too much interest in any building or its construction is noticed. It means we will need to be exactly what we appear to be, for longer than is comfortable."),
    ],
    [
      n("The third day on the road. The landscape has changed: less flat, more folded, the road running between low hills that make you feel watched even when they are clearly empty. Brek has been running again in the mornings — not the courtyard circuit but the road ahead, enough to see what's coming and come back before the group reaches it."),
      d("BREK",  "left", "neutral", "Nothing on the road ahead for two miles. Clear."),
      d("MAREN", "left", "neutral", "How far back?"),
      d("BREK",  "left", "neutral", "I didn't check back."),
      d("MAREN", "left", "neutral", "Check back tomorrow."),
      d("BREK",  "left", "neutral", "Already planning on it."),
      n("He says this without defensiveness. It is simply two people in the same practice, adjusting."),
    ],

    // Spark 6: What Sira carries
    [
      n("Sira walks at the center of the group. Not the front, not the rear — the center, where the least observation is needed and the most protection exists. You do not think this was assigned. You think it is where she went instinctively and nobody moved her."),
      d("KAEL", "right", "neutral", "You wrote the fourteenth stage."),
      d("SIRA", "right", "quiet",   "I found the words for what was already there. That's different from writing."),
      d("KAEL", "right", "neutral", "Maren said it was exactly correct. That the Archive had been looking for it for two hundred years."),
      d("SIRA", "right", "quiet",   "She told me. I have been thinking about that since she said it."),
      d("KAEL", "right", "neutral", "What are you thinking about it?"),
      n("She looks at the road ahead. The pace doesn't change."),
      d("SIRA", "right", "quiet",   "That the Archive looked for two hundred years and didn't find it. And I was in a room in a valley for three months and I found it. Which is either a statement about me or a statement about the Archive. I am not sure which would be more uncomfortable to accept."),
      d("KAEL", "right", "neutral", "Why uncomfortable?"),
      d("SIRA", "right", "quiet",   "Because if it's about me, that means I was somehow different from people who tried for two centuries and failed. And if it's about the Archive — if the Archive's structure itself was what prevented it — then everything built there was built on a wrong foundation, and the fire is not the only thing that should have ended."),
      n("She does not ask for a response. The road absorbs the question."),
    ],

    // Spark 7: The cover story holds
    [
      n("Two traders moving west, pack animals loaded. They meet on a straight section of road and there is no natural way to avoid contact, so Dorath adjusts her posture — a small shift — and you understand this is the cue to perform."),
      d("TRADER",  "left", "neutral", "Heading east? Road's clear to the settlement junction."),
      d("SERATH",  "left", "neutral", "We know the junction. Thank you. Are the roads after it the same?"),
      d("TRADER",  "left", "neutral", "Haven't been past. But there was no trouble when I came through two weeks back."),
      n("The traders move on. You walk. Dorath does not comment until the traders are fully out of hearing."),
      d("DORATH",  "left", "neutral", "Serath. Good. The question was the right weight — curious without being informational."),
      d("SERATH",  "left", "neutral", "First instinct."),
      d("DORATH",  "left", "neutral", "In this work, first instinct is what gets tested first, because it's what comes out when you have no time to think. It held."),
      d("KAEL",    "right", "neutral", "What would the wrong weight have sounded like?"),
      d("DORATH",  "left", "neutral", "Too interested in road conditions. Too specific. Any question that reveals you know more than a scholar ought to know about what might be on a road."),
      n("You file this and keep walking. One test. Passed. There will be more, and they will not all be this clean."),
    ],

    // Spark 8: What Brek left behind
    [
      n("Brek runs ahead in the morning. Not far — two miles at most, enough to see the road and come back. He does this every day without being asked, and when he returns he reports in the exact same order: terrain ahead, any structures, any people, any tracks."),
      d("KAEL", "right", "neutral", "What did you leave at the settlement?"),
      n("He doesn't break stride."),
      d("BREK", "left",  "neutral", "Nothing I can't rebuild. The training circuit. The morning route."),
      d("KAEL", "right", "neutral", "I mean did you have things there. Personal things."),
      d("BREK", "left",  "neutral", "A notebook I'd been keeping. Records of the physical progression — what the practice did to the body over time. How the muscles adapt. How recovery changes. I left it because if it's found in the right hands it might be useful and if it's found in the wrong hands the notation is too technical for anyone outside the method to understand."),
      d("KAEL", "right", "neutral", "And if it's not found at all?"),
      d("BREK", "left",  "neutral", "Then I carry it. The content, not the object."),
      n("This is not philosophy for Brek. It is a practical statement about data storage."),
      d("KAEL", "right", "neutral", "Did you mind leaving it?"),
      d("BREK", "left",  "neutral", "I mind having to leave things. I mind less the specific things I leave. The method teaches you the difference."),
      n("Three hundred yards ahead the road bends. Brek will check around that bend before the group reaches it."),
    ],

    // Spark 9: First night watch
    [
      n("Your watch begins at the second hour of dark. Dorath hands off with a single phrase — 'nothing, entire perimeter, last check was two minutes ago' — and then she sleeps with the practiced speed of someone who has learned that sleep is a skill with a window."),
      n("The road at night is different from the road in daylight. Not the sounds — the shape of attention. In daylight you scan. In the dark you listen, and the listening takes a different kind of quiet."),
      d("KAEL", "right", "neutral", "You're awake."),
      d("RYN",  "right", "quiet",   "I couldn't sleep. Not anxiety. Just — alert."),
      d("KAEL", "right", "neutral", "The practice?"),
      d("RYN",  "right", "quiet",   "The practice holds differently in the dark. During the day it feels even. At night there's more of it — like the reduced input lets it expand into the space."),
      n("You hold this alongside your own watch. The road is quiet. The hills on either side are dark shapes without detail."),
      d("RYN",  "right", "quiet",   "Can I ask you something?"),
      d("KAEL", "right", "neutral", "Yes."),
      d("RYN",  "right", "quiet",   "Do you trust Serath?"),
      n("The question comes without preamble. You take a moment with it — not because the answer is unclear, but because you want to give it the precision it deserves."),
      d("KAEL", "right", "neutral", "I trust what I've seen him do. I don't know all of what he's been doing. The two are different."),
      d("RYN",  "right", "quiet",   "Yes. I suppose that's the right answer."),
      n("She does not say whether it is also the answer she was hoping for."),
    ],

    // Spark 10: The settlement becomes memory
    [
      n("Second day. The valley is thirty miles behind you, which is enough distance that the specific smell of the place — stone, lamp oil, the particular damp of the courtyard at dawn — is already fading from immediate recall and becoming something that requires effort to retrieve. Maren warned you this would happen with places. She was right."),
      d("MAREN", "left",  "neutral", "The settlement is still there."),
      d("KAEL",  "right", "neutral", "I know."),
      d("MAREN", "left",  "neutral", "I say this because it is easy to experience departure as ending. The settlement continues. What we built there continues. We are not carrying it away — we are carrying what the work produced, which is different."),
      d("KAEL",  "right", "neutral", "Sira stays."),
      d("MAREN", "left",  "neutral", "Sira stays. And what she continues to do there — the work with whoever arrives — that is not secondary to what we are doing. It is the same work in a different location."),
      n("You walk in silence for a while. The road runs through scrub grass and the sky is pale and wide."),
      d("KAEL",  "right", "neutral", "What would you have done if the method hadn't been completed before we had to leave?"),
      d("MAREN", "left",  "neutral", "Left anyway. But differently."),
      d("KAEL",  "right", "neutral", "How differently?"),
      d("MAREN", "left",  "neutral", "With less certainty about whether what we placed in the Spire would hold. The completion matters not because the Spire placement requires a completed practitioner specifically — but because an incomplete practitioner placing something in that room is doing something they cannot fully account for. I needed to be able to account for it."),
      n("This is what she means by completion: not an ending but an accuracy."),
    ],

    // Spark 11: What the records contained
    [
      n("Midday break at a stream crossing. Ryn has her notes out — not reading them, just checking that they are dry and intact in the waxed folder she uses. You have not asked about the content directly. This seems like the moment."),
      d("KAEL", "right", "neutral", "The administrative records. The ones you copied before the fire."),
      d("RYN",  "right", "quiet",   "Yes."),
      d("KAEL", "right", "neutral", "You said Serath had been asking about them and then stopped."),
      d("RYN",  "right", "quiet",   "He was asking through indirect channels — not Serath specifically, but someone connected to him. A librarian in the eastern collection. The pattern of the questions. Four in three weeks, then nothing."),
      d("KAEL", "right", "neutral", "What did the records show that made you copy them before anything went wrong?"),
      n("She takes a moment before answering."),
      d("RYN",  "right", "quiet",   "They show who had access to the Vraen administrative index thirty years before the Archive was founded. Not scholars. Institutional administrators. People who were not studying the method — people who were deciding whether the Archive would be permitted to exist. And their decision was: yes, but with conditions."),
      d("KAEL", "right", "neutral", "What conditions?"),
      d("RYN",  "right", "quiet",   "That's the part not in the records. That's the part I've been trying to reconstruct from what is there. Something was agreed. Something about what the Archive would produce and where that would go."),
      n("She puts the notes away. The stream runs under the crossing stones. What was agreed, thirty years before any of you were part of this — that is what the records contain the shape of, without quite naming it."),
    ],

    // Spark 12: What Maren managed alone
    [
      n("The group makes camp early on day two — a site Dorath had identified from Eran's advance information, a sheltered depression behind a stone embankment. The site is exactly as described. You note that someone described it in advance with enough precision that it could be located from a written account alone."),
      d("KAEL",  "right", "neutral", "How long have you been in contact with Eran?"),
      d("MAREN", "left",  "neutral", "Twelve years."),
      d("KAEL",  "right", "neutral", "Before the Archive."),
      d("MAREN", "left",  "neutral", "Before I went to the Archive, yes. Eran was the reason I went there. He identified the collection and told me what it contained and said someone needed to be inside to work it systematically. I was one of three people he considered. I was the one who could sustain the commitment."),
      d("KAEL",  "right", "neutral", "The other two?"),
      d("MAREN", "left",  "neutral", "One is dead. One is in the eastern territories and doesn't know what we are doing."),
      n("The fire is built. The sky is clearing to stars."),
      d("KAEL",  "right", "neutral", "How many things have you been managing simultaneously?"),
      d("MAREN", "left",  "neutral", "More than I've told any single person. Less than I would have needed to if more people had been prepared to hold certain things independently."),
      d("KAEL",  "right", "neutral", "That sounds like a statement about trust."),
      d("MAREN", "left",  "neutral", "It is a statement about capacity. Trust and capacity are different problems. I trust most of this group. Fewer of them are built to carry the specific weight of certain information without letting it change how they operate day to day."),
      n("The fire settles into coals. You understand you are being told something about your own category in that assessment, without being told directly which category it is."),
    ],

    // Spark 13: Serath's terrain lesson
    [
      n("Serath walks with the efficiency of someone who has been moving through difficult terrain for most of his adult life. Not quickly — efficiently. You find yourself watching his feet and then his eyes and then the small adjustments his shoulders make when something on the road's edge changes."),
      d("KAEL",   "right", "neutral", "You said before — deviation from consistency is information."),
      d("SERATH", "left",  "neutral", "Yes."),
      d("KAEL",   "right", "neutral", "What kind of consistency am I looking for?"),
      d("SERATH", "left",  "neutral", "Vegetation first. Anything that grows along a road grows in a pattern dictated by traffic, water, and soil. Where the pattern breaks, something has changed. A cart took a different route. Animals have been through recently. Someone moved through the brush."),
      d("KAEL",   "right", "neutral", "What else?"),
      d("SERATH", "left",  "neutral", "Sound patterns. What you hear on an empty road has a baseline — wind, distant birds, the road surface underfoot. Anything that is absent from that baseline is as informative as something that is present."),
      n("You walk and listen. After ten minutes: a section of road where the usual scrub-bird calls stop."),
      d("KAEL",   "right", "neutral", "The birds stopped."),
      d("SERATH", "left",  "neutral", "What does that tell you?"),
      d("KAEL",   "right", "neutral", "Something disturbed them. Ahead and to the left, given the direction of the gap."),
      d("SERATH", "left",  "neutral", "Correct. Now — does it matter?"),
      d("KAEL",   "right", "neutral", "I don't know yet."),
      d("SERATH", "left",  "neutral", "Good answer. Most people decide immediately. The correct approach is: note, observe, decide later. Deciding immediately costs you information."),
      n("The birds resume. Ahead: a deer crossing the road through the scrub, moving south. The disturbance was the deer."),
    ],

    // Spark 14: How the group travels together
    [
      n("The third day on the road, late morning. Nobody has spoken in over an hour. Not tension — something more organized than that. Each person occupying a part of the road's attention: Brek at the edge of forward sight, Serath reading the margins, Ryn checking behind every twenty minutes, Dorath working through something internal that has made her eyes precise and distant. Maren moving at the group's center and doing all of the above simultaneously, with no visible effort."),
      d("KAEL",  "right", "neutral", "This is not how groups usually travel."),
      n("Maren does not ask what he means."),
      d("MAREN", "left",  "neutral", "No."),
      d("KAEL",  "right", "neutral", "How long did it take to get here? The group knowing how to do this together."),
      d("MAREN", "left",  "neutral", "Not as long as I expected. The practice accelerates this kind of coordination. When people are genuinely doing the same work in their internal life, the external coordination follows without requiring instruction."),
      d("KAEL",  "right", "neutral", "Even Brek."),
      d("MAREN", "left",  "neutral", "Brek especially. He does the work in a different idiom. But the idiom is consistent, and consistency is legible."),
      n("The road runs through a low pass between two hills. In the gap, for a moment, you can see for twenty miles in every direction. East: where you are going. West: where you came from. What is in front of you is larger than what is behind."),
    ],

    // Spark 15: Brek's report
    [
      n("Day three, late afternoon. Brek returns from his forward check at a pace slightly faster than usual. Not running — but the increase is visible if you know what his usual pace looks like. You know."),
      d("BREK",  "left",  "neutral", "Clear on the road for two miles."),
      d("MAREN", "left",  "neutral", "But."),
      d("BREK",  "left",  "neutral", "At the two-mile mark, where the road bends around the low granite — there are fire remains. Not old ones. Two days at most. A camp for multiple people."),
      d("DORATH","left",  "neutral", "How many?"),
      d("BREK",  "left",  "neutral", "Hard to say from the fire pit. More than three. Less than ten."),
      d("DORATH","left",  "neutral", "Which direction did they move?"),
      d("BREK",  "left",  "neutral", "East. Same as us. I followed the tracks forty meters before I turned back."),
      n("The group stops. The calculation is clear: a party of unknown size, on the same road, heading the same direction, two days ahead. Either they are travelers with no connection to anyone and this is nothing. Or they are something else."),
      d("MAREN", "left",  "neutral", "We keep our pace. We do not close on them. If they stop and we reach them, Dorath and Serath speak first."),
      d("DORATH","left",  "neutral", "And if they are waiting?"),
      n("Maren does not answer. Which is itself an answer."),
    ],
  ],

  // ── Week 2: Eran ──────────────────────────────────────────────────────────
  w2: [
    [
      n("The border settlement is larger than Dorath's description suggested. Not a village — a working town, two streets, a mill, animal pens on the eastern edge. It has the look of a place that processes things moving between the eastern territories and the settled districts. Traffic, commerce, the kind of practical neutrality that comes from serving both directions without caring about either."),
      d("DORATH", "left", "neutral", "We don't stay longer than we need to. Supplies, information about the road, and then east."),
      d("KAEL",   "right", "neutral", "What about the contact you mentioned?"),
      d("DORATH", "left", "neutral", "He finds us. If he's here and if he is what he was the last time I heard from him, he'll have seen us come in. We let him make the approach."),
      n("You buy provisions. You ask about the road in the way travelers ask, which is different from the way investigators ask, and the people you ask answer in the way that local people answer strangers: practical, minimal, not unfriendly."),
    ],
    [
      n("Eran approaches in the evening, at the inn's common table. He does not sit down immediately. He orders something at the counter and carries it past your table and then stops, as if he has just noticed something he needed to look at more carefully, and then he sits."),
      d("ERAN",   "left", "neutral", "Dorath."),
      d("DORATH", "left", "neutral", "Eran."),
      d("ERAN",   "left", "neutral", "You brought more than I expected."),
      d("DORATH", "left", "neutral", "The situation grew."),
      d("ERAN",   "left", "neutral", "I see that. Good evening."),
      n("He says this to all of you, with the particular courtesy of a person who was taught manners in an era when they meant something specific and has not revised them since. He is older than most people in this room, and he carries it with the comfort of someone who has stopped being surprised by anything."),
    ],
    [
      n("Eran speaks that night in the room Dorath arranged. He speaks carefully — not slowly, not evasively, but with the precision of someone who has spent a long time around people who took notes and learned that imprecision is a kind of debt that comes due."),
      d("ERAN",  "left", "neutral", "The city you're going to has been under active management for eight years. It began as observation, moved to recruitment, and is now in a third phase that I would describe as consolidation. The infrastructure you're looking for — the building, the program — that's the consolidation. It is the mechanism for ensuring that what they have recruited and trained produces outputs they can use."),
      d("MAREN", "left", "thoughtful", "Practitioners who have been through part of the preparation."),
      d("ERAN",  "left", "neutral", "Part of it, yes. Not complete. The program does not complete anyone. It produces people who are partway through something that has no terminus in the program's design. The important thing — the thing I want you to understand before you arrive — is that the people in this program do not know they are partway through something."),
      d("SERATH","left", "neutral", "They think they've completed it."),
      d("ERAN",  "left", "neutral", "They have completed the program. The program is not the method."),
    ],
    [
      n("Maren asks Eran the question she has been framing since he sat down. You can tell she has been framing it because of the specific stillness that precedes her considered questions, the way her hands settle on the table."),
      d("MAREN", "left", "thoughtful", "How complete is the building?"),
      d("ERAN",  "left", "neutral", "The structural work: done. The internal installation: six weeks from complete, as of my last reliable information, which is three months old."),
      d("MAREN", "left", "thoughtful", "Three months ago it was six weeks from complete."),
      d("ERAN",  "left", "neutral", "Yes. I would not assume it's still six weeks from complete."),
      n("The arithmetic settles in the room. Three months plus six weeks is, at minimum, nine weeks ago. The building may be complete now, or close to it. The window everyone was calculating against may already have closed."),
      d("DORATH","left", "neutral", "We move faster."),
      d("MAREN", "left", "neutral", "Yes."),
    ],
    [
      n("Eran gives you information over two evenings in the border settlement. He does it methodically, in categories: the city's layout, the Spire's location within it, the people he knows who are still there and can be reached, the people he knew who are no longer there for reasons he states plainly. He does not dramatize the ones who are no longer there. He gives you their names and the last circumstance he has and moves on. You understand that he is not without feeling about this. He simply believes that the facts are what you need, and the feelings about the facts are his own."),
      d("KAEL",  "right", "neutral", "Why are you helping us?"),
      d("ERAN",  "left", "neutral", "Because I have been watching what is being built in that city for eight years and I have not been able to stop it alone. And because I knew Dorath's contact, who knew Maren, and the chain of that knowing leads here."),
      d("KAEL",  "right", "neutral", "And the method itself? Does it matter to you?"),
      d("ERAN",  "left", "neutral", "What the method is for matters to me. Yes. Very much."),
    ],

    // Spark 6: The settlement between worlds
    [
      n("The border settlement is built for transit, not residence. Everything in it is designed to be used briefly — the inn's tables scrubbed because they are scrubbed fifty times a week, not because anyone cares about cleanliness as virtue, but because turnover requires it. The merchants in the stalls sell provisions and tools and rope and the things people need when they are going somewhere and realize they are missing something."),
      d("KAEL",   "right", "neutral", "Who lives here permanently? Not in transit."),
      d("SERATH", "left",  "neutral", "The people who run it. The mill family, Dorath said. Probably two or three extended families who found that a permanent position serving transients was more stable than being transients themselves."),
      d("DORATH", "left",  "neutral", "The mill is a tell. You need flour, you stop here. The settlement exists because the mill exists, and the mill exists because the eastern road needs provisioning at this distance."),
      d("KAEL",   "right", "neutral", "Which means everyone who passes through is logged."),
      d("DORATH", "left",  "neutral", "Everyone who buys from the mill is logged. The mill family keeps records of purchase volume. It is ordinary commerce. But those records, held in the right hands, tell you the volume of eastbound traffic — and any unusual concentrations."),
      n("You buy provisions at the mill. The owner writes your purchase in a ledger with the practiced speed of someone who has been writing in that ledger for thirty years. You are on three pages of three different ledgers by the time you have bought bread and dried provisions and rope."),
    ],

    // Spark 7: Dorath's assessment of Eran
    [
      n("Dorath speaks to you privately, the morning after Eran's first evening of information. She finds you at the inn's water pump before the others are awake."),
      d("DORATH", "left",  "neutral", "I want to tell you what I think about Eran. Not for consensus. For your awareness."),
      d("KAEL",   "right", "neutral", "Go ahead."),
      d("DORATH", "left",  "neutral", "His information is good. It is well-sourced, internally consistent, and matches what I know through channels he should not have access to. That means either he has sources I've never mapped, or he has my sources and knows how to obscure that."),
      d("KAEL",   "right", "neutral", "The second option means what?"),
      d("DORATH", "left",  "neutral", "It means he is further inside the structure than he presents himself. Not necessarily against us. But not fully disclosed."),
      d("KAEL",   "right", "neutral", "Have you told Maren?"),
      d("DORATH", "left",  "neutral", "Maren knows Eran better than I do. I believe she has already made this calculation. I'm telling you because if there is a moment where his information turns and I am not positioned to act, you need to understand why I might act."),
      n("The water pump handles the morning cold the way old iron does — stiff, then fluid. You fill your container and think about what the difference is between someone not fully disclosed and someone not fully trustworthy. Dorath does not offer an answer."),
    ],

    // Spark 8: Ryn's questions for Eran
    [
      n("Ryn sits with Eran during the second evening. She has her notes in her hands but does not open them — she has a way of holding documents like a counterweight, something to keep her still while her mind moves."),
      d("ERAN", "left",  "neutral", "The founding agreement. Yes. I've read what remains of it."),
      d("RYN",  "right", "quiet",   "The conditions. What was agreed when the Archive was permitted to exist. It's not in the Archive's records — what I found was the shape of an agreement but not its terms."),
      d("ERAN", "left",  "neutral", "The terms were not written in the Archive's records because the terms were not the Archive's to hold. They were held by the institution that permitted the Archive to exist."),
      d("RYN",  "right", "quiet",   "Voss's network."),
      d("ERAN", "left",  "neutral", "What would become the Voss network, yes. The agreement was: the Archive may study the Vraen material. What it produces would be documented and made available to the institution at specific intervals. The Archive agreed because it believed the institution would never have access to practitioners capable of understanding what they were receiving."),
      d("RYN",  "right", "quiet",   "They underestimated how long it would take to complete the method."),
      d("ERAN", "left",  "neutral", "They underestimated how close someone would get."),
      n("Ryn opens her notes. She writes a single line and closes them again. The line is very short — the kind of short line that is the synthesis of a long chain of reasoning, finally arrived at."),
    ],

    // Spark 9: Brek and Eran
    [
      n("Brek watches Eran with the attention that he gives to anything physical — the way a person moves, what their body records. Eran has the build of someone who was once very capable and is now capable in different ways, the reduction of pure muscle into something more managed and directed. Brek finds this interesting."),
      d("BREK", "left", "neutral", "How far have you traveled on this road?"),
      d("ERAN", "left", "neutral", "In forty years: probably two hundred times in one direction or the other."),
      d("BREK", "left", "neutral", "When you travel alone, how long can you maintain a march pace?"),
      d("ERAN", "left", "neutral", "At my current condition: eight hours comfortably. Ten with discipline. After ten I make errors I wouldn't make otherwise, which means I lose more time correcting errors than I gained by not stopping."),
      d("BREK", "left", "neutral", "What kind of errors?"),
      d("ERAN", "left", "neutral", "Directional. Route selection. The kind that a fresh body handles without thinking. After ten hours the body handles them slowly and the mind has to compensate. The mind is less efficient at compensation than a rested body."),
      n("Brek considers this. It is the kind of answer that makes sense to him entirely, which means it is the answer of someone who has thought carefully about the same things he thinks about."),
      d("BREK", "left", "neutral", "You've taken care of your body."),
      d("ERAN", "left", "neutral", "It was pointed out to me early that the alternative was not a long career."),
    ],

    // Spark 10: What the program extracts
    [
      n("Eran returns to the question of what the Spire's program actually does — not its structure, but the mechanism. He takes more time with this than with the building's layout or the cohort schedule. He takes more time because it is harder to describe."),
      d("ERAN",   "left",  "neutral",    "The method, practiced partially, creates something the practitioners are not aware of. A thread. The thread is not the method. It is what the method's early stages produce as a byproduct of the work."),
      d("MAREN",  "left",  "thoughtful", "And the program extracts the thread."),
      d("ERAN",   "left",  "neutral",    "It uses the thread's existence. The practitioners in the program have been doing the early work under the program's supervision. The program then provides a framework that uses the thread's orientation — the direction it naturally points — and redirects it to a different purpose."),
      d("SERATH", "left",  "neutral",    "What purpose?"),
      d("ERAN",   "left",  "neutral",    "What the institution needs. The thread, redirected, produces a person who is precisely placed. Aligned to specific outcomes in the institutional structure. Not controlled, exactly. Oriented. And orientation that deep is more durable than control."),
      d("KAEL",   "right", "neutral",    "Do the practitioners know what has been done?"),
      d("ERAN",   "left",  "neutral",    "They know they have completed a program. They know they are skilled in ways that feel authentic to them, because they are. The orientation feels like their own conviction. That is the design."),
      n("The room is quiet after this. What is being built in the city ahead is not a coercion machine. It is a conviction machine. And what has been done to the practitioners inside it will feel, to them, like their own beliefs."),
    ],

    // Spark 11: How Eran came to this
    [
      n("In the inn's common room, late in the second evening, when the other patrons have gone and the fire has settled to a steady heat, Eran tells you something he has not told the group."),
      d("ERAN", "left",  "neutral", "I was not always doing this from the outside."),
      d("KAEL", "right", "neutral", "What do you mean?"),
      d("ERAN", "left",  "neutral", "Thirty-five years ago I was in a version of this situation — not the Spire, which did not exist yet, but a predecessor. A smaller institution with the same design, in a different city. I was part of it. I believed what it told me about what I was doing."),
      d("KAEL", "right", "neutral", "You went through the program."),
      d("ERAN", "left",  "neutral", "A version of the program. The thread was produced in me. The orientation was applied. For eleven years I worked inside the structure. I was very good at it."),
      d("KAEL", "right", "neutral", "What changed?"),
      d("ERAN", "left",  "neutral", "A practitioner I met in the seventh year. She was not part of the institution. She was part of an older network — the one that Maren is part of now, though it was different then. She showed me the difference between the thread redirected and the thread complete. I could tell the difference because I had the thread."),
      n("He looks at the fire."),
      d("ERAN", "left",  "neutral", "I have spent thirty-five years since then trying to ensure that other people with the thread have access to the same demonstration. Until this group, I have not succeeded."),
    ],

    // Spark 12: What Serath knew about Eran's network
    [
      n("Serath and Eran speak on the second morning in the border settlement, in the inn's small garden area while the others are preparing. You are near enough to hear without appearing to listen."),
      d("SERATH", "left", "neutral", "The contact at the third station. The one in the eastern network I've been running for five years. That was yours."),
      d("ERAN",   "left", "neutral", "One of mine. He didn't tell you."),
      d("SERATH", "left", "neutral", "He told me he had a prior arrangement he was not able to disclose. I assumed it was Dorath's network. I was wrong."),
      d("ERAN",   "left", "neutral", "You built a good eastern network. The information that came back through it was useful to us for four of the five years you ran it."),
      d("SERATH", "left", "neutral", "You were reading my network's output."),
      d("ERAN",   "left", "neutral", "We were receiving what your contact chose to share with us, which was a fraction of what he was sending you. He was selective. Loyalty, I think."),
      n("Serath is quiet for a moment."),
      d("SERATH", "left", "neutral", "How many layers does Maren have that I don't know about?"),
      d("ERAN",   "left", "neutral", "I would not know. I am one of them."),
      n("They do not speak further on this subject."),
    ],

    // Spark 13: What the group knows now
    [
      n("The night before leaving the border settlement. Maren has the group together — not all in one room, which would be conspicuous, but in pairs and threes in adjacent spaces with the doors managed so that what she says reaches all of them. She does this efficiently, without announcing the format. It simply happens."),
      d("MAREN", "left",  "neutral", "We leave at first light. The road east from here is the main eastern corridor — documented, monitored at intervals. We are scholars. We remain scholars for the entire road."),
      d("DORATH","left",  "neutral", "If we're approached at the counting stations, Eran handles the passage. The rest of us don't speak unless directly addressed."),
      d("SERATH","left",  "neutral", "What do we know now that we didn't know four days ago?"),
      n("Maren answers with precision."),
      d("MAREN", "left",  "neutral", "The structure of what we are going to. The mechanism of what it does to people. The timeline. A contact inside the city who can be reached. And Eran, who knows the road between here and there in a way none of us did."),
      d("SERATH","left",  "neutral", "That is more than four days ago."),
      d("MAREN", "left",  "neutral", "Yes."),
      n("The night holds. First light is six hours away."),
    ],

    // Spark 14: The numbers and what they mean
    [
      n("On the road east from the border settlement, Ryn does the arithmetic aloud. Not to anyone specifically. To make the number real."),
      d("RYN",   "right", "quiet",   "The first cohort: through the program already. Oriented. They are in the Spire. The second cohort: eleven days from now, based on Eran's information from three months ago."),
      d("SERATH","left",  "neutral",  "Which means the second cohort may already be in intake."),
      d("RYN",   "right", "quiet",   "Yes. The three-month gap is the problem. Every number we have is from three months ago and the situation does not hold still."),
      d("DORATH","left",  "neutral",  "The deployment cohort is the critical date. The fourth cohort — that is what we cannot allow to complete."),
      d("KAEL",  "right", "neutral",  "How long do we have?"),
      d("SERATH","left",  "neutral",  "Eran's estimate: two and a half months from when the second cohort enters. But that estimate is from three months ago."),
      d("RYN",   "right", "quiet",   "Which means we may have two and a half months. Or we may have less."),
      n("The road is long. The walking gives the numbers somewhere to go — forward motion as a way of holding arithmetic that cannot be resolved with the information available."),
      d("BREK",  "left",  "neutral",  "Then we move faster."),
      d("MAREN", "left",  "neutral",  "Yes."),
    ],

    // Spark 15: What Maren asked Eran privately
    [
      n("Eran travels with the group east — this was not the original plan; he was to supply information and remain at the border settlement. He changed this on the second morning. He announced it to Dorath and Maren and did not elaborate."),
      d("KAEL",  "right", "neutral", "Why did he decide to come with us?"),
      d("DORATH","left",  "quiet",   "He and Maren spoke privately on the second night. After that, he said he was coming."),
      d("KAEL",  "right", "neutral", "Do you know what they discussed?"),
      d("DORATH","left",  "quiet",   "No. Maren hasn't told me and I haven't asked."),
      n("You consider asking Maren directly. You decide not to. You walk beside Eran for half an hour instead."),
      d("KAEL",  "right", "neutral", "What did Maren ask you, the second night?"),
      n("He does not answer immediately. He walks. Then:"),
      d("ERAN",  "left",  "neutral", "She asked me whether the method could be completed faster than the fragments suggest. Whether there is a shorter path."),
      d("KAEL",  "right", "neutral", "What did you tell her?"),
      d("ERAN",  "left",  "neutral", "I told her there is one. I told her I had seen it used. And I told her the cost of it, which she needed to know before she could decide whether it was relevant."),
      n("He does not say what the cost is. Whatever Maren knows and you don't is now walking with the group, unspoken, in the space between Maren's precise face and the horizon ahead."),
    ],
  ],

  // ── Week 3: The road accelerates ──────────────────────────────────────────
  w3: [
    [
      n("The group is larger now — eight, with Eran. Eight people moving together is different from seven. The configuration at the front changes. The pace has to be re-calibrated. Maren does this without discussion. It takes her one morning to find the new pace and then it holds."),
      d("SERATH", "left", "neutral", "He knows the city better than anyone."),
      d("KAEL",   "right", "neutral", "You trust him."),
      d("SERATH", "left", "neutral", "I trust what he knows. That's different from trust. But the information he has given us is internally consistent with everything Dorath and I already knew, and it adds detail that resolves questions I had. That's a reasonable basis."),
      d("KAEL",   "right", "neutral", "You've been checking it against what you know."),
      d("SERATH", "left", "neutral", "Since he sat down. Yes."),
    ],
    [
      n("Serath explains himself on the road between the first border settlement and the second. He has waited until Eran is out of earshot — walking ahead with Maren — and then he begins."),
      d("SERATH", "left", "thoughtful", "I want to account for the months I was absent."),
      d("KAEL",   "right", "neutral", "Then account for them."),
      d("SERATH", "left", "thoughtful", "Maren gave me a different set of instructions than she gave everyone else. After the first year at the Archive. She identified that I had access to a network she didn't — the eastern contacts. She asked me to keep that network alive, outside the Archive's formal structure, and to use it to track what was happening with the deep records' information. Which I did. For five years."),
      d("KAEL",   "right", "neutral", "And the two weeks before the fire?"),
      d("SERATH", "left", "thoughtful", "What I found in the deep records. The notation. The map reference. The timing. It was too much to hold and continue working here — I had to follow it. I left a message. The message found you."),
    ],
    [
      n("Serath's full account takes most of the day's walking. By the end of it you understand: he did not disappear. He ran an operation that Maren designed, that neither of them disclosed to the group, because the value of the operation depended on its independence from what was happening inside the Archive. You find this both clarifying and uncomfortable, and you do not hide which."),
      d("KAEL",   "right", "neutral", "You both kept this from everyone."),
      d("SERATH", "left", "neutral", "Yes."),
      d("KAEL",   "right", "neutral", "Including from people who needed to trust each other in a burning building."),
      d("SERATH", "left", "neutral", "The operation's integrity required it. If I had told Brek, Brek might have acted differently. And Brek's specific behavior in the Archive, on the night it burned — Maren needed that to be genuine and unrehearsed."),
      n("You walk for a while in silence after this. The account is true. The logic is sound. You do not fully reconcile with it by the time the sun goes down."),
    ],
    [
      n("Second border settlement. Smaller than the first — a way station more than a town, built for travelers and nothing else. You stay one night."),
      n("Dorath's contact here is not available. The room she arranged through her network is correct, the key is in the agreed location. The contact is simply not present and has left no explanation."),
      d("DORATH", "left", "quiet", "This is not unusual. Contacts have their own situations. But I want to note it."),
      d("MAREN",  "left", "neutral", "Noted."),
      n("It might mean nothing. It might mean the network here has been disrupted. It might mean the contact moved and forgot to notify. All three are equally plausible. Dorath's expression says she has assigned probabilities to each and the distribution is not comfortable."),
    ],
    [
      n("The road east of the second settlement is paved. Stone-laid, maintained, wider than anything in the western districts. This is old infrastructure — built before any living person was born, kept up because the city at its eastern end still needs it. The group moves faster on stone."),
      d("BREK",  "left", "neutral", "The road feels different."),
      d("ERAN",  "left", "neutral", "You are on the eastern provinces' main transport route now. This is not road. This is corridor."),
      d("BREK",  "left", "neutral", "Meaning?"),
      d("ERAN",  "left", "neutral", "Meaning there are counting stations at intervals and what moves on this road is documented. We have already passed two. There will be three more before the city."),
      n("Nobody says anything. The road continues east. You keep moving and try to look like you belong on this road, which is easier when you have a reason to be on a road and harder when the reason you have is the one you have."),
    ],

    // Spark 6: The paved road's character
    [
      n("The stone road begins at a junction marked by a carved post — a distance marker, eastern script, the kind of inscription that survives centuries because stone survives centuries. The group makes the transition from packed earth to fitted stone and the sound of walking changes. The pace increases not because anyone chooses to increase it but because the surface invites it."),
      d("ERAN",   "left",  "neutral", "The road was built two hundred and sixty years ago. The counting stations were added forty years later, when the traffic density warranted documentation."),
      d("BREK",   "left",  "neutral", "What did they document?"),
      d("ERAN",   "left",  "neutral", "Commerce first. Then everything. The stations' original purpose was taxation — they counted goods. Now they count people."),
      d("SERATH", "left",  "neutral", "When did they start counting people?"),
      d("ERAN",   "left",  "neutral", "Sixteen years ago. The year the eastern administration changed hands. Before that, people moved freely. After that — freely with documentation."),
      n("The distinction between free movement and documented movement is one that most people never have to think about. Walking this road, you think about it."),
    ],

    // Spark 7: Brek's rhythm on stone
    [
      n("The faster pace suits Brek. He adjusts his forward scouting circuit to account for the longer sight lines the paved road provides — running a mile ahead rather than two, returning faster, covering more ground. By the second day on stone he has the rhythm calibrated and it shows in the quality of what he reports back."),
      d("BREK",  "left",  "neutral", "A cart, single person, heading east. Half a mile ahead. Moving at a slow pace — goods transport."),
      d("MAREN", "left",  "neutral", "Can we pass them without stopping?"),
      d("BREK",  "left",  "neutral", "Road's wide enough. They won't require conversation."),
      d("DORATH","left",  "neutral", "We pass. Nobody initiates."),
      n("They pass the cart twenty minutes later. The carter looks up, nods, keeps moving. You nod back. The group continues east. Eight people passing a carter on a road is ordinary. The ordinariness of it — the way you've all learned to occupy ordinary space without performing it — that took months. It works now without effort."),
      d("KAEL",  "right", "neutral", "How many carters have you passed in your scouting this morning?"),
      d("BREK",  "left",  "neutral", "Four. All westbound except this one."),
      d("KAEL",  "right", "neutral", "What does westbound traffic tell you?"),
      d("BREK",  "left",  "neutral", "The city's producing more than it's consuming. Or there's a market cycle. Eran would know which."),
    ],

    // Spark 8: After Serath explains himself
    [
      n("Serath's full account takes most of the day. By evening it has been absorbed by everyone in different ways. Brek has asked no questions and has moved Serath into a different position in his mental map of the group — you can tell by the way Brek's eyes track him now, not suspicious, just re-calibrated. Ryn has said nothing and is watching Serath with the look of someone reading a text that has been substantially amended."),
      d("KAEL",   "right", "neutral", "Are you angry at him?"),
      d("RYN",    "right", "quiet",   "I'm deciding."),
      d("KAEL",   "right", "neutral", "What are you deciding between?"),
      d("RYN",    "right", "quiet",   "Whether what he and Maren did was the right kind of compartmentalization or the wrong kind."),
      d("KAEL",   "right", "neutral", "What's the difference?"),
      d("RYN",    "right", "quiet",   "The right kind protects the operation. The wrong kind protects the people doing it from having to explain themselves. The two are usually in the same box, and they feel identical from inside, but they're not the same thing."),
      n("You walk. The question of which box Serath and Maren's decision falls into is one that probably cannot be resolved from outside it."),
      d("KAEL",   "right", "neutral", "Does it matter now?"),
      d("RYN",    "right", "quiet",   "Not to what we do next. Yes to how I understand the people I'm doing it with."),
    ],

    // Spark 9: Ryn confronts compartmentalization
    [
      n("Ryn asks Maren directly. She chooses the pace's neutral time — mid-afternoon, steady walking, no landmarks to negotiate. She asks without preamble."),
      d("RYN",   "right", "quiet",   "Is there anything else you've kept from the group that I would need to know to trust the decisions being made?"),
      n("Maren considers this with the care it deserves."),
      d("MAREN", "left",  "neutral", "There are things I have not told the group because the information would not change what anyone does and would add to the weight of what people are carrying. There are things I have not told the group because they belong to specific people. And there is one thing I am not going to tell you now because it is not yet decided and giving you an undecided thing to hold would be a different problem."),
      d("RYN",   "right", "quiet",   "What's the undecided thing?"),
      d("MAREN", "left",  "neutral", "What happens after the Spire. Not during. After. There are two paths forward from whatever we do in the city, and I need to know which one is possible before I can tell you what I'm considering."),
      d("RYN",   "right", "quiet",   "When will you know?"),
      d("MAREN", "left",  "neutral", "When Eran and I have finished a conversation we have been building toward since the border settlement."),
      n("Ryn nods. The specific nod of someone who has asked for the truth and received it in the particular form the truth is available in. Not complete. But not obscured."),
    ],

    // Spark 10: How the group gathers intelligence
    [
      n("Walking through the second day on the paved road, you become aware of how the group functions as an intelligence-gathering body. Not deliberately — by proximity and attention. Each person is picking up different things from the same road."),
      d("SERATH", "left",  "neutral", "The counting at the second station took longer than the first. The guard wrote more."),
      d("DORATH", "left",  "neutral", "I noted that. The ledger notation was different — he opened to a new page rather than continuing on the existing one. A new page means a new category."),
      d("ERAN",   "left",  "neutral", "It means we're outside the normal pattern for this road. Most groups of this size are commercial. A group of eight with academic documentation and no goods is worth a separate page."),
      d("BREK",   "left",  "neutral", "The guard looked at me twice."),
      d("DORATH", "left",  "neutral", "That was expected. Your build is unusual for an academic party. He's filing us as someone's security escort, probably. Odd for academics but not unknown."),
      n("The group absorbs this. What the guard filed them as is now a piece of information about what the counting stations are building — a picture of this group on this road, in a ledger, under a category that marks them as different."),
    ],

    // Spark 11: Eran's landmark knowledge
    [
      n("Eran names landmarks. Not always — only the ones that carry information. A specific formation of stones at the road's edge that means you are twelve miles from the next station. A tree that marks the watershed. A section of road where the stone's color changes."),
      d("KAEL",   "right", "neutral", "How do you know the depth to water at that section?"),
      d("ERAN",   "left",  "neutral", "The road's builders documented this road in detail. The documentation was kept by the eastern administration for two hundred years and then moved to the city's archive. I read it fifteen years ago. The water table information was there."),
      d("KAEL",   "right", "neutral", "You read the road's construction documentation to travel it."),
      d("ERAN",   "left",  "neutral", "I read everything available before I traveled anywhere important. The documentation is almost always available somewhere. People document things very thoroughly and then put it in places where it accumulates dust instead of being used."),
      d("SERATH", "left",  "neutral", "The same is true of network records. Most of what I know about my own network's history came from documents that someone filed and forgot."),
      d("ERAN",   "left",  "neutral", "The document is the institutional memory. The institution forgets. The document doesn't."),
      n("Three hundred meters ahead: the stone-color change Eran described. He glances at it as the group passes over it."),
    ],

    // Spark 12: Night camp without shelter
    [
      n("No shelter at the night camp on the second day east of the border settlement. The road is open, the sky is open, and Dorath sets a watch perimeter in a circle rather than at a single point — four positions, which requires rotating two people through the night instead of one."),
      d("DORATH","left",  "neutral", "The open ground changes the equation. Inside a room you have natural chokepoints. Out here — the threat surface is a full circle."),
      d("KAEL",  "right", "neutral", "Have you ever been attacked on the road?"),
      d("DORATH","left",  "neutral", "On this road, no. On other roads: twice. Neither time with a group this size."),
      d("KAEL",  "right", "neutral", "What changed things?"),
      d("DORATH","left",  "neutral", "The second time: size. A group of eight is more trouble than it's worth to anyone looking for an opportunistic incident. The first time: Serath."),
      d("SERATH","left",  "quiet",   "I was there for a different reason."),
      d("DORATH","left",  "neutral", "You were there, and the situation resolved, and I don't fully understand how. I have accepted this."),
      n("Serath does not explain. The fire is low. The circle of watch positions holds the night."),
    ],

    // Spark 13: Maren's internal work on the placement
    [
      n("You notice that Maren is working while she walks. Not with the fragments — they are packed and sealed. Something internal. The pace-variation tells you: she is moving through a problem, and the problem is large enough that the variations are frequent."),
      d("KAEL",  "right", "neutral", "What are you working through?"),
      d("MAREN", "left",  "neutral", "The placement. The specifics of it. What I will put in the reading room, and how, and whether it will be detectable before it can be found by the right person."),
      d("KAEL",  "right", "neutral", "When did you start planning the placement?"),
      d("MAREN", "left",  "neutral", "Before the fire. I knew, once the fourteenth stage was found, that the placement was possible. Before that I did not know what to place — the method without all fourteen stages is incomplete and an incomplete placement would do harm."),
      d("KAEL",  "right", "neutral", "What kind of harm?"),
      d("MAREN", "left",  "neutral", "The same kind the Spire does. Partial completion oriented toward a specific purpose. If I had placed something incomplete in the reading room, it would have been used — but used incompletely. Oriented. A version of what we are trying to prevent."),
      n("She adjusts the pace. The problem she is working through is not just tactical. It is the specific precision required to place something that cannot be misused — and the difference between that and what it is being placed against."),
    ],

    // Spark 14: The absent contact and what it means
    [
      n("Dorath has been quiet since the second border settlement. Not distracted — focused inward in the way she gets when she is processing something she cannot resolve with available information."),
      d("DORATH","left",  "quiet",   "My contact at that settlement has been in place for seven years. In seven years, there has been one absence: a family illness, three weeks, and she left word through the alternate channel."),
      d("KAEL",  "right", "neutral", "This time nothing."),
      d("DORATH","left",  "quiet",   "The key was in the right location. The room was prepared. She was not there and there is no message."),
      d("KAEL",  "right", "neutral", "How many explanations are there?"),
      d("DORATH","left",  "quiet",   "More than three. She left urgently and had no time to leave word. She was moved by the network through a different channel and the left hand didn't know. She was compromised and the key placement was maintained to appear normal. Or she is simply delayed and this is unrelated to anything."),
      d("KAEL",  "right", "neutral", "Which do you believe?"),
      d("DORATH","left",  "quiet",   "I believe I don't have enough information to assign a probability, and my instinct is not reliable when I'm invested in a particular answer."),
      n("She walks. The absence walks with her."),
    ],

    // Spark 15: A rider behind
    [
      n("End of day three on the paved road. Brek returns from his backward check — a new addition to the scouting protocol since the second border settlement — and his report is brief."),
      d("BREK",  "left",  "neutral", "Single rider. Eastern horse, traveling light. Coming from the direction of the border settlement."),
      d("DORATH","left",  "neutral", "Distance?"),
      d("BREK",  "left",  "neutral", "Three miles when I spotted them. Moving at a road pace, not urgency. But consistent — not stopping, not browsing. Point-to-point travel."),
      d("DORATH","left",  "neutral", "Same direction as us."),
      d("BREK",  "left",  "neutral", "Yes. With the pace difference — horse versus foot — they reach us in about two hours."),
      n("A rider behind, catching up. It may be a courier on the same road. It may be someone from the border settlement's network. It may be something else."),
      d("MAREN", "left",  "neutral", "We set camp at the next shelter-point. We let the rider pass."),
      d("DORATH","left",  "quiet",   "And if they don't pass?"),
      n("Nobody has an answer ready for that one."),
    ],
  ],

  // ── Week 4: Checkpoint and Gavrick ────────────────────────────────────────
  w4: [
    [
      n("The counting station is a structure built into a gap in a low stone wall that runs perpendicular to the road — two gateposts and a booth, one guard who sits at a desk and records passage. The process is formal but quick: names, origin, destination, number of party. Documentation reviewed if you have it, noted if you don't."),
      d("ERAN",   "left", "neutral", "Keep moving through. Do not slow before the guard waves you. Do not stop unless instructed. If instructed, I speak first."),
      d("KAEL",   "right", "neutral", "You've done this before."),
      d("ERAN",   "left", "neutral", "Fourteen times on this road. I know the pace they want."),
      n("The guard waves you through without looking up. The notation in his ledger takes four seconds. You are past the wall and on the road before you have processed that it is over."),
    ],
    [
      n("The second counting station. Different guard — younger, more thorough. He counts the group twice, writes something longer in the ledger. Asks Eran a question about destination. Eran answers precisely. The guard looks at the group's faces in a way that is professional rather than suspicious — the look of someone doing their job rather than of someone who has been told to look."),
      n("Behind the guard station, fifty yards back on the western side, a figure stands at the road's edge. Not part of the station's staff — civilian clothes, travel pack. Standing still. Watching."),
      d("DORATH", "left", "quiet", "Don't look at the figure. Keep moving."),
      n("You keep moving. But you have seen. And from the slight change in Dorath's breathing as you pass, so has she. The figure watches until the curve of the road takes you out of sight."),
    ],
    [
      n("That evening, two miles past the counting station, Dorath describes what she saw."),
      d("DORATH", "left", "neutral", "The figure at the station. I've seen that posture before. Not a local, not a traveler, not a functionary. Someone who was placed there to observe traffic."),
      d("MAREN",  "left", "neutral", "Placed by whom."),
      d("DORATH", "left", "neutral", "The posture is Voss-network. The way they stand when they're watching — weight on the back foot, hands not quite at rest. They practice that. It's a discipline."),
      d("KAEL",   "right", "neutral", "Did they see us?"),
      d("DORATH", "left", "neutral", "Yes. But seeing is different from identifying. We are eight people on the main eastern road with documentation and a practiced reason to be here. What they saw may not have been remarkable."),
    ],
    [
      n("The third counting station. The figure from the second station is here ahead of you. Standing at the same position, same posture, watching. They watched you arrive and they watch you go through the station without incident. As you pass: they turn to watch you leave."),
      d("MAREN",  "left", "quiet", "They followed us between stations."),
      d("ERAN",   "left", "neutral", "The stations are linked. Someone moves between them when there is a reason to move."),
      d("SERATH", "left", "neutral", "We gave them a reason."),
      d("MAREN",  "left", "neutral", "Or we are the continuation of a reason they already had. It is possible someone at the border settlement notified the road network before we arrived at the first station."),
      n("The figure watches until the road turns. You do not look back, but Brek does."),
      d("BREK",   "left", "neutral", "Still there. Not following. Watching."),
    ],
    [
      n("At the fourth station the figure is already there. And this time, after the group passes through without incident, the figure walks forward — not quickly, not urgently — and falls into step with Eran. Eran does not break stride."),
      d("GAVRICK", "left", "neutral", "Eran."),
      d("ERAN",    "left", "neutral", "Gavrick."),
      d("GAVRICK", "left", "neutral", "I've been following you since the second settlement."),
      d("ERAN",    "left", "neutral", "I know. I recognized you at the first station."),
      d("GAVRICK", "left", "neutral", "I have a question for the group."),
      n("He says this without looking at anyone except Eran. Not threatening. Not urgent. Simply a person who has a question and has decided this is the appropriate time to ask it."),
      d("ERAN",    "left", "neutral", "Then ask it."),
    ],

    // Spark 6: Nine — the group after Gavrick joins
    [
      n("Nine people now. The person who joined them was, until this morning, assigned to watch them by the institution they are traveling toward. The group processes this by continuing to walk and letting the conversation catch up with the reality."),
      d("SERATH", "left",  "neutral", "He walked the road stations. He knew our documentation format."),
      d("DORATH", "left",  "neutral", "He knew more than our format. He knew our count, our pace pattern, and probably our origin point within a few days."),
      d("KAEL",   "right", "neutral", "He had a description. Eran's description."),
      d("DORATH", "left",  "neutral", "Yes. So the question is whether the description was the only reason he stopped his surveillance and approached us, or whether there's a second reason we don't yet have."),
      d("SERATH", "left",  "neutral", "What would the second reason look like?"),
      d("DORATH", "left",  "neutral", "It would look exactly like the first reason. That's the problem with good reasons."),
      n("Gavrick walks at the group's edge, giving them space to process without appearing to demand a verdict. This consideration itself is a data point."),
    ],

    // Spark 7: Gavrick's full account
    [
      n("Gavrick explains himself that evening. His voice has the particular flatness of someone delivering an account they have already delivered in their own mind many times and have decided to make as factual as possible."),
      d("GAVRICK","left",  "neutral", "I have been in the Voss network for nine years. For the first six I believed its stated purpose. The stated purpose is scholarly research and archival preservation — it presents itself that way to its lower-tier members and to the institutions that fund it."),
      d("KAEL",   "right", "neutral", "When did that change?"),
      d("GAVRICK","left",  "neutral", "Year four I was moved into an operational role. Year six I was assigned to the Spire's planning phase. That was when I understood what the stated purpose was covering."),
      d("MAREN",  "left",  "thoughtful", "And you continued for three more years."),
      d("GAVRICK","left",  "neutral", "For two years after understanding, yes. The third year I began withdrawing. Not formally — I remained in the network but began holding back operational information and began preparing to exit."),
      d("SERATH", "left",  "neutral", "Why three years? Why not immediately?"),
      d("GAVRICK","left",  "neutral", "Because leaving immediately provides one clean data point: this person understood and left. Remaining and withdrawing slowly provides no clean data point. A network can handle a clean departure. An extended withdrawal leaves them uncertain about what was retained."),
      n("This is the logic of someone who is very good at the work they have been trying to stop doing."),
    ],

    // Spark 8: Destroy or expose
    [
      n("Gavrick's initial question — whether you are going to destroy the Spire or expose it — gets a fuller answer than the first exchange provided. Maren takes it in camp that evening."),
      d("MAREN",  "left",  "neutral", "Neither. Destroying the Spire addresses the infrastructure, not the knowledge of the method's existence. Another institution could build another Spire in fifteen years with what Voss has already disseminated."),
      d("GAVRICK","left",  "neutral", "And exposure?"),
      d("MAREN",  "left",  "neutral", "Exposure requires an audience with the capacity to act on what they learn. That audience does not exist in the current structure. Who would receive it? The administrative authorities that permitted the Spire to be built?"),
      d("GAVRICK","left",  "neutral", "Then what are you going to do?"),
      d("MAREN",  "left",  "neutral", "Something that makes both destruction and exposure unnecessary. The Spire's power comes from being the only source of partial method completion. If there is another source — one that completes rather than partially completes — the Spire becomes irrelevant."),
      n("Gavrick is quiet. He is doing the same calculation you are doing."),
      d("GAVRICK","left",  "neutral", "You are going to give the Spire's practitioners access to what the Spire withholds from them."),
      d("MAREN",  "left",  "neutral", "Yes."),
      d("GAVRICK","left",  "neutral", "Using the thread they already carry."),
      d("MAREN",  "left",  "neutral", "The thread leads. They follow, or they don't."),
    ],

    // Spark 9: Brek sizes Gavrick up
    [
      n("Brek walks with Gavrick on the second morning. He does this deliberately — the way he checks terrain, he is checking the person. Gavrick notices and does not adjust. He walks as he walks, which means he also knows what Brek is doing."),
      d("BREK",   "left", "neutral", "How far can you travel in a day on foot?"),
      d("GAVRICK","left", "neutral", "At road pace: twelve hours. Rough terrain: eight. Carrying: ten, depending on load."),
      d("BREK",   "left", "neutral", "You were on a horse at the stations."),
      d("GAVRICK","left", "neutral", "The horse was the assignment's requirement. Not my preference. Mounted surveillance attracts a specific kind of attention that I don't like."),
      d("BREK",   "left", "neutral", "You prefer foot work."),
      d("GAVRICK","left", "neutral", "Foot work allows you to disappear into a crowd. A horse requires a hand to hold it at all times, which anchors you to a location. I find anchoring to locations professionally inconvenient."),
      n("Brek absorbs this. It is not the answer of someone who learned their physical discipline in a structured institution. It is the answer of someone who developed it for specific problems."),
      d("BREK",   "left", "neutral", "What do you do when something goes wrong physically on an operation?"),
      d("GAVRICK","left", "neutral", "Depends on what went wrong. If it's terrain: adapt and continue. If it's injury: assess, determine whether continuing or stopping costs more, act accordingly."),
      d("BREK",   "left", "neutral", "Good answer."),
    ],

    // Spark 10: Ryn does not trust easily
    [
      n("Ryn does not speak to Gavrick directly for the first full day he is with the group. She observes him with the particular quality of attention she gives to things she has categorized as requiring verification before use."),
      d("KAEL", "right", "neutral", "You're watching him."),
      d("RYN",  "right", "quiet",   "I'm gathering data."),
      d("KAEL", "right", "neutral", "What are you looking for?"),
      d("RYN",  "right", "quiet",   "Whether his behavior is consistent across contexts. Someone performing honesty is consistent in one context — when they are being assessed. Someone who is actually being honest is consistent when they think no one is watching."),
      d("KAEL", "right", "neutral", "And?"),
      d("RYN",  "right", "quiet",   "He thinks no one is watching approximately fifteen percent of the time. His behavior in those windows is consistent with his behavior when he knows he's being assessed."),
      d("KAEL", "right", "neutral", "That's a point in his favor."),
      d("RYN",  "right", "quiet",   "It is one data point. A person who is very good at what he does could sustain consistent behavior across contexts. That's also consistent with what I'm observing."),
      n("She is not dismissing him. She is keeping the question open. You understand that for Ryn, keeping a question open is the responsible thing to do, and closing it prematurely is what gets people hurt."),
    ],

    // Spark 11: Dorath and Eran on Gavrick
    [
      n("You overhear Dorath and Eran speak. They have moved slightly apart from the group — the specific separation that is not private but is intended to be heard only by someone paying attention."),
      d("DORATH","left", "neutral", "You knew Gavrick's name before he approached."),
      d("ERAN",  "left", "neutral", "He was a junior member of the Voss network when I was still inside it. He was careful even then. Too careful for his position."),
      d("DORATH","left", "neutral", "What does too careful look like?"),
      d("ERAN",  "left", "neutral", "Like a person preparing for an exit that hasn't happened yet. The specific way information is handled — shared precisely, without embellishment, without retention of leverage."),
      d("DORATH","left", "neutral", "You didn't tell us you knew him before he approached."),
      d("ERAN",  "left", "neutral", "If I had said I knew Gavrick and expected him to approach, you would have treated the approach differently. His sincerity needed to be evaluated without my endorsement weighting it."),
      d("DORATH","left", "neutral", "You managed our assessment of him."),
      d("ERAN",  "left", "neutral", "I set up conditions for a clean assessment. That is different."),
      n("Dorath is quiet. The distinction Eran is drawing is real. The act of drawing it is also what Dorath did with Orin later, in a city she has not yet reached."),
    ],

    // Spark 12: What Gavrick was told about you
    [
      n("You walk beside Gavrick on the road to the fifth counting station. He speaks first, which is unusual — he has been the one to respond, not initiate, since he joined."),
      d("GAVRICK","left",  "neutral", "The description Eran gave. The one I was watching for."),
      d("KAEL",   "right", "neutral", "What did it include?"),
      d("GAVRICK","left",  "neutral", "A group of practitioners traveling east, led by a woman with a document case who sets the pace for everyone and does it without appearing to. One member who is not a practitioner but moves like one. A younger woman who always checks behind. Someone who runs the road ahead every morning."),
      d("KAEL",   "right", "neutral", "And me?"),
      d("GAVRICK","left",  "neutral", "A person the leader consults not because they are senior but because they ask questions that matter. Someone who is genuinely not certain of their own role in what is happening but who has continued anyway."),
      n("You walk with that for a while."),
      d("KAEL",   "right", "neutral", "That's an oddly specific thing to include in an identification profile."),
      d("GAVRICK","left",  "neutral", "When I saw the group, I understood why. The certainty level is visible. Most people traveling toward something difficult perform more certainty than they feel. You don't."),
      d("KAEL",   "right", "neutral", "Is that an advantage or a liability?"),
      d("GAVRICK","left",  "neutral", "Both. In my experience it's usually the people who are genuinely uncertain who keep going when the certain ones stop."),
    ],

    // Spark 13: The fifth station
    [
      n("The fifth counting station. The guard here has been watching the same road for several years — you can tell by the way he handles the ledger without looking at it. He looks at nine people and adds a small notation to whatever he wrote for eight people two stations ago."),
      d("GUARD",   "left",  "neutral", "The party has grown."),
      d("ERAN",    "left",  "neutral", "A colleague joined us at the third station junction. His documentation was registered at the east branch."),
      d("GUARD",   "left",  "neutral", "Name."),
      d("GAVRICK", "left",  "neutral", "Gavrick. Academic registry, eastern division."),
      n("The guard writes. His notation is longer this time. A party that keeps growing is an unusual characteristic for a group of traveling scholars. Nine people is not a typical research party. Something about the arithmetic is wrong and the guard can feel it without quite having language for what is wrong."),
      n("He stamps. You are through."),
      d("DORATH",  "left",  "quiet",   "He noted the addition."),
      d("GAVRICK", "left",  "neutral", "He would. The party's growth pattern is abnormal. Two stations ago there were eight. Now nine. Whoever reads the ledger will see that."),
      d("DORATH",  "left",  "quiet",   "And they will see it."),
      d("GAVRICK", "left",  "neutral", "Yes."),
    ],

    // Spark 14: Gavrick's question for the group
    [
      n("That evening's camp. Gavrick asks the group something after the meal, which is the careful timing of someone who has learned that questions land differently on full stomachs than empty ones."),
      d("GAVRICK","left",  "neutral", "What do you each believe the method is for?"),
      n("The question takes a moment to settle. Not because it's difficult to answer — because everyone has an answer and nobody expected to be asked to give it."),
      d("BREK",   "left",  "neutral", "The work. The practice itself. The physical discipline that carries the rest."),
      d("RYN",    "right", "quiet",   "The archive. The accumulation of what the method preserves — the way it holds knowledge differently than writing."),
      d("SERATH", "left",  "neutral", "Transmission. Making sure what is understood doesn't die with the person who understands it."),
      d("DORATH", "left",  "neutral", "I don't know what it's for. I know what it's worth defending. Those are different questions."),
      d("KAEL",   "right", "neutral", "Why are you asking?"),
      d("GAVRICK","left",  "neutral", "Because the Spire has an answer to that question. Its answer is: the method is for whatever the institution that controls it decides. I want to understand whether the people taking it toward the Spire have a different answer, and whether those answers are strong enough to hold against the Spire's."),
      n("Maren does not answer. She listens to all the other answers and then she looks at Gavrick with the look she has when she is filing something important."),
    ],

    // Spark 15: What Gavrick knows about the third cohort
    [
      n("The last night before the city comes into view. Gavrick, in the quiet after watch changes, says something he has been holding since he joined the group."),
      d("GAVRICK","left",  "neutral", "There is something about the third cohort I have not told you."),
      n("The camp is still. The fire is low."),
      d("MAREN",  "left",  "neutral", "Tell us now."),
      d("GAVRICK","left",  "neutral", "The third cohort is not a random recruitment from the eastern scholarly population. The network spent four years identifying and approaching these individuals specifically. They are the people most likely to complete the method independently."),
      d("SERATH", "left",  "neutral", "They're targeting the people who might do what Maren did."),
      d("GAVRICK","left",  "neutral", "If those people complete the program instead of the method, the probability of independent completion in the next generation drops significantly. The third cohort is not just intake. It is containment."),
      n("The fire settles. The calculation is new and it is large."),
      d("MAREN",  "left",  "neutral", "When does the third cohort enter?"),
      d("GAVRICK","left",  "neutral", "Four weeks after the second. The second cohort entered three days ago."),
      n("Three days ago. The window everyone has been calculating is twenty-five days shorter than they thought."),
    ],
  ],

  // ── Weeks 5–16: basic sparks (5 per week) ────────────────────────────────
  w5: [
    [
      n("Gavrick's question, asked on the road in the late afternoon: whether the group is going to the city to stop the Spire or to expose it."),
      d("KAEL",    "right", "neutral", "Why does the distinction matter to you?"),
      d("GAVRICK", "left",  "neutral", "Because I have been inside the program. For three years. And whether you are going to destroy what is there or make it visible changes what I am able to offer you."),
      n("He says this with the particular calm of someone who has thought through this conversation in advance and has decided to be direct because indirection will cost more than it saves."),
    ],
    [
      n("You camp that night with Gavrick in the group. He does not explain himself further that evening — he answered the question about his purpose, which was: he was a Voss network agent assigned to road surveillance, and he has been watching this group since the border settlement because you matched a description that was circulated. He stepped aside at the stations rather than reporting because the group also matched something else: the description Eran gave him, three years ago, of what the people carrying the method east would look like."),
      d("DORATH", "left", "neutral", "Eran gave you a description of us."),
      d("ERAN",   "left", "neutral", "I gave him a description of what to look for. Not of any specific people."),
      d("DORATH", "left", "neutral", "And we matched it."),
      d("ERAN",   "left", "neutral", "Very closely."),
    ],
    [
      n("Sira asks Gavrick the question nobody else has found the words for yet."),
      d("SIRA",    "right", "neutral", "You've been inside the program. You know what it does to the people in it."),
      d("GAVRICK", "left",  "neutral", "Yes."),
      d("SIRA",    "right", "neutral", "And you kept working for the network. While knowing what the program does."),
      d("GAVRICK", "left",  "neutral", "For two years after I understood what it was. Yes. I kept working."),
      n("He does not defend this. He states it the way Maren states facts that are uncomfortable to hold — because they are facts, and because pretending they are something other than what they are would be a different kind of damage."),
    ],
    [
      n("Ryn takes watch first that night. When you take over, she says only one thing before she sleeps."),
      d("RYN",  "right", "quiet", "The person at the road station — the posture Dorath identified. If Gavrick matched our description to something Eran described, Voss's people at the stations are matching us to a different description."),
      d("KAEL", "right", "neutral", "We already knew they saw us."),
      d("RYN",  "right", "quiet", "We knew they saw us. We don't know yet whether they recognized us. Those are different things."),
      n("She closes her eyes. You watch the road. Nothing moves."),
    ],
    [
      n("The city is visible the next morning, on the horizon. Maren stops the group at the road's high point and everyone looks at it together. A city at this distance is less a place than an assertion: here is something large enough to be seen from here, something that has organized enough stone and labor to be visible from this distance."),
      d("ERAN",  "left", "neutral", "The Spire is not yet visible at this distance. It will be in two hours."),
      d("MAREN", "left", "neutral", "Is it distinguishable from the city's other structures?"),
      d("ERAN",  "left", "neutral", "Yes. It is built differently from everything around it. You will know it when you see it."),
      n("The group resumes walking. Two hours ahead: the thing they have been walking toward for three weeks."),
    ],

    // Spark 6: Gavrick and Kael — what it means to leave a network
    [
      n("On the road with the city on the horizon. Gavrick walks at a distance from the rest of the group that is not isolation — just space for a conversation that is not for everyone."),
      d("KAEL",   "right", "neutral", "When you withdrew from the network — did anyone notice before you were ready for them to?"),
      d("GAVRICK","left",  "neutral", "One person. A woman who ran logistics for the eastern region. She noticed because the flow of information I was providing had changed — not stopped, just changed in character. She asked me directly."),
      d("KAEL",   "right", "neutral", "What did you tell her?"),
      d("GAVRICK","left",  "neutral", "The truth. That I had begun to understand what the network's actual purpose was and could not continue in good conscience."),
      d("KAEL",   "right", "neutral", "What did she do?"),
      d("GAVRICK","left",  "neutral", "She gave me three weeks to finish my current assignment and arrange a clean handoff. She did not report the conversation. I believe she was also in the process of deciding."),
      d("KAEL",   "right", "neutral", "Did she leave?"),
      d("GAVRICK","left",  "neutral", "I don't know. I left before she told me. That is one of the things I don't know the end of."),
      n("He says this without apparent distress. The not-knowing is simply part of the account."),
    ],

    // Spark 7: Dorath reads the city's approach
    [
      n("Two miles from the city. The road traffic has increased — not dramatically, but perceptibly. More carters heading both directions. A group of merchants with pack animals who give your group the professional glance of people assessing whether you represent competition and concluding that you do not."),
      d("DORATH", "left",  "neutral", "The traffic tells you the gate schedule. More outbound in the morning, more inbound by midday. We are arriving at the right time for inbound traffic — we will not stand out in the volume."),
      d("ERAN",   "left",  "neutral", "The gate officials change shift at midday. The morning shift has been at work for four hours. They are at their most alert in the first hour and their most routine by the fourth. We are arriving in the fourth."),
      d("KAEL",   "right", "neutral", "That sounds like a detail you planned."),
      d("ERAN",   "left",  "neutral", "I know this gate's schedule from fourteen previous crossings. I planned the departure from the border settlement around it."),
      n("You have been traveling with someone who counted these things on fourteen previous approaches to this city. You are not traveling blind. You are traveling with someone whose map includes the time of day."),
    ],

    // Spark 8: What Ryn noticed about the Spire
    [
      n("Ryn sees the Spire first. She does not say anything immediately. She looks for a full ten seconds before she speaks, which is longer than it sounds when you are waiting."),
      d("RYN",  "right", "quiet",   "The notation on the exterior. Do you see it?"),
      d("KAEL", "right", "neutral", "Where?"),
      d("RYN",  "right", "quiet",   "The upper section. The pale band just below the fourth level's windows. It looks like a decorative element from here. It isn't decorative."),
      n("You look. At this distance it is a line of something that is not stone and is not ornamentation."),
      d("KAEL", "right", "neutral", "Notation as in — from the Vraen method?"),
      d("RYN",  "right", "quiet",   "From the administrative notation. The same system the Archive used for cataloging access to the fragments. Displayed on the exterior of the building."),
      n("She does not say what this means. She does not have to. The Spire's builders decorated its exterior with the notation system that the method uses for administrative reference. Whether this is a statement of ownership or an invitation is the question you will be going inside to answer."),
    ],

    // Spark 9: Sira and the method in open territory
    [
      n("Sira has been walking at the group's center for days. This morning she shifts to the front, beside Maren, and stays there. It is the first time she has voluntarily chosen the front position."),
      d("KAEL", "right", "neutral", "The front."),
      d("SIRA", "right", "quiet",   "The practice is different here. Closer to the city. I noticed yesterday and I wanted to confirm it this morning."),
      d("KAEL", "right", "neutral", "Different how?"),
      d("SIRA", "right", "quiet",   "More present. Like I can feel the distance to the city in it — the way a compass needle points not just north but toward the specific north that is here, now. The Spire is doing something at a distance. Or rather, the method responds to whatever the Spire is doing, the way a thread responds to tension."),
      n("She does not look alarmed. She looks like someone making a careful observation."),
      d("KAEL", "right", "neutral", "Should that worry us?"),
      d("SIRA", "right", "quiet",   "I don't think it's a warning. I think it's information. The Spire is built around practitioners who have the thread. Whatever is in there — the extraction, the program — the method can feel the proximity of that."),
      d("MAREN","left",  "neutral", "Yes. I have been feeling it since the second day east of the last settlement. I did not say anything because I did not want to weight the observation before others could make it independently."),
      n("She had been feeling it and waiting for one of them to notice. That is how she teaches."),
    ],

    // Spark 10: Brek's question about what he will do inside
    [
      n("Brek's question is not tactical. He asks it on the road with the city visible ahead, with the specific bluntness of someone who has been saving a question for the right moment."),
      d("BREK",  "left",  "neutral", "I'm not a practitioner. What I carry is physical. The method for me is what it does to the body. Inside the city — inside the operation — what is my role going to be?"),
      d("MAREN", "left",  "neutral", "The same as it has been."),
      d("BREK",  "left",  "neutral", "Which is what, specifically?"),
      d("MAREN", "left",  "neutral", "The physical reality of the group. You are the person who can be in two locations and move between them faster than anyone else. You are the person who can hold a position under pressure that others would leave. You are the person who, if things go wrong, buys time for what matters to happen."),
      d("BREK",  "left",  "neutral", "That's a description of a problem."),
      d("MAREN", "left",  "neutral", "It is a description of what you are best at. I said 'if things go wrong.' Things may not go wrong."),
      n("Brek nods. The nod of someone who has decided that understanding their role clearly, even when it includes the hard version, is better than understanding it vaguely."),
    ],

    // Spark 11: Serath on city protocol
    [
      n("Serath has been in more cities than most of the group. He shares what is specific about this one on the last hour of the road in."),
      d("SERATH", "left",  "neutral", "Every city has a character that tells you what it values. The value here is order. Not justice, not commerce — order. You see it in the street layout. The building codes. The way the gate documentation is structured. Everything is designed to ensure that what enters and leaves is known."),
      d("KAEL",   "right", "neutral", "Which means we'll be watched."),
      d("SERATH", "left",  "neutral", "Everyone is watched. The trick is not to avoid being watched but to be boring while being watched. Interesting people get remembered. Boring people get filed and forgotten."),
      d("KAEL",   "right", "neutral", "How do we be boring?"),
      d("SERATH", "left",  "neutral", "Behave exactly like what you say you are. Not a performance of it — actually doing it. A scholar who is not actually looking at the Spire most of the time is more convincing than a scholar who is performing not-looking."),
      d("KAEL",   "right", "neutral", "How does a scholar who is not looking at the Spire behave?"),
      d("SERATH", "left",  "neutral", "They look at everything else with the same degree of interest. A scholar who finds the market architecture interesting and the Spire merely one building among many is plausible. A scholar who avoids one specific building is suspicious."),
      n("You file this. The city gate is forty minutes away."),
    ],

    // Spark 12: Maren on what success looks like
    [
      n("The last rest stop before the gate. Maren sits on a low stone wall at the road's edge and opens the document case — not the fragments, just the case's inventory, a final check. You sit near her."),
      d("KAEL",  "right", "neutral", "What does success look like? When we leave the city."),
      d("MAREN", "left",  "neutral", "The placement is made. We leave intact. Whatever comes from the placement does not happen because we are present to see it — it happens in its own time, in the practitioners who carry the thread."),
      d("KAEL",  "right", "neutral", "And if the placement isn't possible?"),
      d("MAREN", "left",  "neutral", "Then we learn what prevented it and we decide from that information what comes next."),
      d("KAEL",  "right", "neutral", "You have fallback positions."),
      d("MAREN", "left",  "neutral", "I have an understanding of what the primary goal requires and what it cannot survive without. A plan is only as good as its understanding of its own requirements."),
      n("She closes the case and stands. The gate is in sight now — the city's main entrance, formal, staffed. Nine people on a road with academic documentation and a reason to be here that is boring enough to be believed."),
    ],

    // Spark 13: What Gavrick felt inside the program
    [
      n("The gate queue. Three groups ahead of you. Twenty minutes at most. Gavrick stands at the group's edge with the stillness of someone who has entered this gate before."),
      d("KAEL",   "right", "neutral", "Have you been back here since you left?"),
      d("GAVRICK","left",  "neutral", "Once. Eight months ago. The road network still had me active. I used that cover to map the security rotation."),
      d("KAEL",   "right", "neutral", "What was it like? Coming back."),
      d("GAVRICK","left",  "neutral", "Familiar. The city's character doesn't change quickly. I knew the street layout. I knew which routes carried more observation and which carried less."),
      d("KAEL",   "right", "neutral", "I meant what it felt like. To be back."),
      n("A pause. The gate queue moves forward one group."),
      d("GAVRICK","left",  "neutral", "Like visiting a place where something important happened that you are not proud of. The place remembers nothing. You remember everything. The asymmetry is uncomfortable."),
    ],

    // Spark 14: Dorath runs the final approach protocol
    [
      n("Two hundred meters from the gate. Dorath cycles through the final checklist in her head — you can tell because her lips move very slightly on certain items. Then she speaks to the group at a volume that travels only as far as it needs to."),
      d("DORATH","left",  "neutral", "Last reminder. Names, in order, from how we registered on the road. Eran first, then the group in the order he introduced us. Documentation ready but not visible — they will ask, not search, unless something triggers a search. If something triggers a search, stop moving. Do not make it worse by moving."),
      d("BREK",  "left",  "neutral", "What triggers a search?"),
      d("DORATH","left",  "neutral", "Someone in the group acting inconsistently with their stated identity. Or a flag in the ledger system from the road stations."),
      d("KAEL",  "right", "neutral", "We may already be flagged from the station's notation about group size."),
      d("DORATH","left",  "neutral", "Possibly. If so, the gate official will ask a clarifying question. Eran answers it. We do not supplement his answer."),
      n("One hundred meters. Fifty. You are in the queue. The gate official is visible — middle-aged, experienced, going through the motions with the efficiency of someone who has done this a thousand times."),
    ],

    // Spark 15: Through the gate — and something is wrong
    [
      n("Through the gate. The city opens around you — the immediate area behind the main entrance is a wide receiving space, designed to disperse crowds that accumulate at processing. The group moves through it in the dispersal direction, which is correct, which is what Dorath said to do."),
      d("DORATH","left",  "quiet",   "Keep walking. The second street on the left."),
      n("You take the second street on the left. It is an ordinary city street. You walk it. After three turns and ten minutes, Dorath stops the group in a short passage between two warehouses."),
      d("DORATH","left",  "neutral", "The gate official flagged Gavrick's documentation. Not visibly — he did not stop us, he did not call anyone. But I watched him write an additional notation after the stamp."),
      d("GAVRICK","left", "neutral", "The eastern registry. My registration is eighteen months old. Current registrations are renewed annually."),
      d("MAREN",  "left", "neutral", "They will check the registry."),
      d("GAVRICK","left", "neutral", "Yes. The eastern registry will show my registration as inactive. I did not expect the gate procedure to have access to registry currency status."),
      n("A beat of silence."),
      d("DORATH","left",  "neutral", "How long before that check returns a result?"),
      d("GAVRICK","left", "neutral", "The registry is in the city's administrative office. End of the day. Maybe sooner."),
      n("They have hours. Maybe less. And they have just entered a city that now has a reason to look for them."),
    ],
  ],

  w6: [
    [
      n("The Spire. At two hours' distance it is visible above the city's roofline — taller than the walls, different in material from what surrounds it. Not one spire: a complex, a building that rises at different heights in different sections, unified by the same pale stone and the same deliberate regularity of its construction. It is the most precisely built thing you have ever seen."),
      d("BREK",  "left", "thoughtful", "It is almost beautiful."),
      d("SERATH","left", "neutral",   "It would be. They have had eight years and sufficient resources and people who know what they are doing. Capability doesn't care about intent."),
      d("BREK",  "left", "thoughtful", "I know. I just didn't expect it to look like that."),
    ],
    [
      n("Orin appears on the road an hour from the city. You have not seen him since the Archive burned — he escaped through the east wing exit Maren mentioned, and he has been making his own way east through a different network. He is thinner and watchful and he reaches the group with the specific relief of someone who has been traveling alone for a long time."),
      d("ORIN",  "left", "neutral", "Maren. I didn't think I'd find you before the city."),
      d("MAREN", "left", "neutral", "Orin. You made it through the east wing."),
      d("ORIN",  "left", "neutral", "Just. The passage was being checked when I went through. I had to go around."),
      n("Maren welcomes him back with the economy of someone who has a great deal of experience processing the return of people she was not certain would return. A nod. A check of his condition. And then: forward."),
    ],
    [
      n("The city gate. Grander than the Archive city's lower gate — a main entrance with formal logging procedures and multiple officials, the kind of gate that is built to make arrival feel supervised. The documentation you carry is correct. You have a reason to be here that is boring enough to be believed."),
      d("GATE_OFFICIAL", "left", "neutral", "Purpose of visit."),
      d("ERAN",          "left", "neutral", "Academic correspondence. I am presenting to the eastern scholarly exchange."),
      d("GATE_OFFICIAL", "left", "neutral", "Duration of stay."),
      d("ERAN",          "left", "neutral", "Three weeks. Possibly four."),
      n("The gate official stamps the documentation. Seven stamps for seven people. He looks at the eighth before stamping."),
      d("GATE_OFFICIAL", "left", "neutral", "Your party has grown since the road registration."),
      d("ERAN",          "left", "neutral", "My associate joined us at the second settlement. His documentation was submitted at the junction station."),
      n("The official checks his ledger. Stamps. You are through."),
    ],
    [
      n("The city is wrong in a way that is not visible and is very felt. The streets are orderly. The buildings are maintained. The people moving through them are going about their business in a way that looks normal from any angle you look at it. And yet after twenty minutes inside the gate you understand what Maren meant about caution becoming habit. Nobody here asks questions. Nobody stops to speculate. People keep their eyes at the middle distance and they move with the purpose of people who have learned that purpose is protective."),
      d("DORATH","left", "quiet", "Don't look at the Spire from the street."),
      d("KAEL",  "right", "neutral", "What?"),
      d("DORATH","left", "quiet", "Looking at the Spire is something travelers do. That's fine. But we are not travelers who happened to end up here. We are people who are in this city for a specific reason. Don't look at it like you're seeing it for the first time."),
      n("You walk and don't look at the Spire and spend considerable effort not looking at the Spire."),
    ],
    [
      n("Dorath's contact is a woman named Leven who runs a textile import business from a building on the city's western edge. She takes one look at eight people arriving at her back door and does not blink."),
      d("LEVEN",  "left", "neutral", "This is too many people for the arrangement I have."),
      d("DORATH", "left", "neutral", "I know. We will be distributed."),
      d("LEVEN",  "left", "neutral", "I have two other places. They can hold three each. That accounts for six. Dorath, you and one other stay here."),
      d("DORATH", "left", "neutral", "Agreed."),
      n("Leven distributes addresses on paper, gives them to Dorath, and takes the paper back when Dorath has memorized them. This is a person who has been doing this kind of work for a long time and has made her peace with the operational requirements of it. She has not made peace with having eight people at her back door, but that is a different matter."),
    ],

    // Spark 6: The registry problem resolves — narrowly
    [
      n("The registry check returns four hours after they entered the city. Gavrick's registration shows as inactive, as expected. The gate official sends a routine inquiry to the eastern academic exchange office. The inquiry arrives at the exchange office where Eran's active registration is held. Eran is known there. The exchange office responds that the traveling party is under Eran's academic sponsorship."),
      d("ERAN",    "left",  "neutral", "My registration is current and my standing is active. Sponsoring a colleague's participation in a research visit is within the normal scope."),
      d("DORATH",  "left",  "neutral", "You knew this would happen."),
      d("ERAN",    "left",  "neutral", "I knew it might. The eastern registry's connection to the gate's documentation system is newer than my last visit — four years ago. I did not know with certainty whether the gate would check. When Dorath told me the official made an additional notation, I sent a precautionary message to the exchange office through Leven."),
      d("DORATH",  "left",  "neutral", "Through Leven. Before you told any of us."),
      d("ERAN",    "left",  "neutral", "Before there was time to tell you. The check returned faster than I expected."),
      n("He says this precisely. Not apologetically. The distinction matters."),
    ],

    // Spark 7: The three safe houses
    [
      n("The group is distributed across three locations by evening. The distribution is not comfortable — nine people who have been traveling together for weeks separated into groups of three. But Dorath is correct that the alternative is more dangerous than the discomfort."),
      d("KAEL",   "right", "neutral", "Which location am I in?"),
      d("DORATH", "left",  "neutral", "Serath and Ryn. Above the grain warehouse. The one with the south-facing window."),
      d("KAEL",   "right", "neutral", "Why that configuration?"),
      d("DORATH", "left",  "neutral", "Serath knows the city's secondary routes. Ryn has the administrative records. If anything changes while the group is separated, the two people most able to reconstruct the operation's information from scratch are in the same location."),
      n("You understand: Dorath has planned not just where everyone sleeps but what each configuration can survive if the others are lost."),
      d("KAEL",   "right", "neutral", "And my role in that location?"),
      d("DORATH", "left",  "neutral", "You are the connection to Maren. If something changes at her location, you are the one who moves between positions. You know how she thinks. That is worth more than any specific skill here."),
    ],

    // Spark 8: What the city feels like from inside
    [
      n("The first full day inside the city. You walk Serath's reconnaissance route — two hours, systematic, covering the western quadrant. The city is exactly what Maren described and different from the description in all the ways that description cannot capture."),
      d("KAEL",   "right", "neutral", "I keep expecting something to feel like a threat. It doesn't."),
      d("SERATH", "left",  "neutral", "That's the design. A city that felt like a threat would be harder to administer. This feels like a city that is being very well managed."),
      d("KAEL",   "right", "neutral", "Which is itself threatening."),
      d("SERATH", "left",  "neutral", "Yes. But the threat is distributed, structural, and invisible unless you're looking for it. Most people are not looking for it. Most people are going about their lives."),
      n("And the people going about their lives in this city are going about their lives in a city where the Spire exists and the Spire is part of the background. The way an unusual building becomes part of the sky after you have lived under it long enough."),
      d("KAEL",   "right", "neutral", "Do the people here know what the Spire is?"),
      d("SERATH", "left",  "neutral", "They know what it presents itself as. An academic and research institution supported by the eastern administration. The people who go inside come back changed in ways that are not visible from outside. Which is the point."),
    ],

    // Spark 9: Orin's arrival changes the picture
    [
      n("Orin's arrival had been expected as a possibility — he knew the route, he had the escape protocol, and Maren said she believed he would find them. But his timing adds a new variable. He has traveled a different road, and different roads carry different information."),
      d("MAREN", "left",  "neutral", "What did you see on your road east?"),
      d("ORIN",  "left",  "neutral", "Traffic at the border settlement I passed through was higher than usual. Not commercial — organized. Two groups that looked like they were from the same source moving east three days apart."),
      d("DORATH","left",  "neutral", "Following each other?"),
      d("ORIN",  "left",  "neutral", "Moving independently on the same schedule. I noticed because the documentation patterns were similar."),
      d("MAREN", "left",  "neutral", "Which border settlement?"),
      d("ORIN",  "left",  "neutral", "The northern route. Fourteen days east."),
      n("Dorath and Serath exchange a look. The northern route is not the route your group took. Two groups moving east on the northern route, on a similar schedule — the Spire's intake is drawing people from multiple directions, through multiple access points."),
      d("DORATH","left",  "neutral", "The second cohort is larger than Pellard's count suggested."),
      d("MAREN", "left",  "neutral", "Or the count was accurate and these are network staff, not practitioners."),
      n("Both possibilities are uncomfortable. They sit with both."),
    ],

    // Spark 10: Leven and the city's character
    [
      n("Leven runs her textile business with the efficiency of someone who has made their peace with a particular kind of double life. She is pleasant to her trade contacts and precise to Dorath. The two modes operate in different registers without apparent friction."),
      d("KAEL",  "right", "neutral", "How long have you been in this city?"),
      d("LEVEN", "left",  "neutral", "Twelve years. I arrived for the textile trade and I stayed because the trade is good and because I was asked to stay by a person I trusted."),
      d("KAEL",  "right", "neutral", "Dorath."),
      d("LEVEN", "left",  "neutral", "Dorath's predecessor. A man named Caval, who is no longer living. He built this network before Dorath inherited it and he built it carefully."),
      d("KAEL",  "right", "neutral", "What was this city like twelve years ago?"),
      d("LEVEN", "left",  "neutral", "Like this, but louder. The quieting was gradual. You don't notice it happening — you notice it when you try to do something you used to do and find you no longer do it. You stopped asking questions at the market. You stopped commenting on the Spire's construction to your neighbors. At some point it became normal."),
      n("She says this without apparent distress. She has been watching it happen for twelve years and she has her own way of holding the watching."),
    ],

    // Spark 11: The practice in the safe house
    [
      n("Three of you in the grain warehouse room: Serath, Ryn, and you. The south window gives light for most of the afternoon. Serath practices in the morning. Ryn works with the administrative notes. You find yourself doing something you have not done since the valley: simply holding what the method has produced, without working on it, without adding to it. Present."),
      d("RYN",   "right", "quiet",   "You're not working."),
      d("KAEL",  "right", "neutral", "I'm not sure what I'd call it."),
      d("RYN",   "right", "quiet",   "Maren calls it carrying. As opposed to working. She said the practice has two modes — the active mode, where you are building the structure, and the passive mode, where you inhabit what has been built."),
      d("KAEL",  "right", "neutral", "She said that to you?"),
      d("RYN",   "right", "quiet",   "Three months ago. At the settlement. She was describing what completion would feel like from the inside. She said most practitioners who complete the method don't recognize the passive mode immediately — they think something has gone wrong because they're not working anymore."),
      n("You have been thinking something has gone wrong because you are not working anymore. You had not had language for this until Ryn just gave it to you."),
    ],

    // Spark 12: What Brek does in the city
    [
      n("Brek does not fit a city the way the city is designed to be fit. He is too visible, too large, too obviously capable for the context of academic scholarship. He and Dorath work this out on the first morning."),
      d("DORATH","left",  "neutral", "You don't go to markets."),
      d("BREK",  "left",  "neutral", "I know. I recognized the look from the station."),
      d("DORATH","left",  "neutral", "You have a limited operating radius: the warehouse, the street directly adjacent, and the eastern alley that gives sight lines to two of the contact locations. That's your territory."),
      d("BREK",  "left",  "neutral", "What do I do in that territory?"),
      d("DORATH","left",  "neutral", "What you've been doing on the road. Observe. Know where everything is. Know how long things take. If something changes in your radius, tell me."),
      d("BREK",  "left",  "neutral", "And if something happens inside your radius that requires more than observing?"),
      d("DORATH","left",  "neutral", "Then you handle it. I trust your judgment on physical situations."),
      n("This is a precise and considerable grant of authority. Brek takes it seriously, which is visible in how he looks at his radius differently once she's defined it."),
    ],

    // Spark 13: Serath and the eastern notation on the Spire
    [
      n("Serath walks the Spire's perimeter in the evening — Dorath's approved single pass. He returns and spends ninety minutes with the map Orin produced on his own pass, comparing. Then he tells you what he found."),
      d("SERATH", "left",  "neutral", "The notation Ryn identified on the upper exterior — I was able to read more of it at close range."),
      d("KAEL",   "right", "neutral", "And?"),
      d("SERATH", "left",  "neutral", "It is not administrative notation from the Archive's system. It is older. Pre-Archive. The notation style Eran described from the documents beneath the Archive."),
      d("KAEL",   "right", "neutral", "The Unnamed Third's notation."),
      d("SERATH", "left",  "neutral", "The notation associated with it. Displayed on the exterior of a building that is specifically designed to produce controlled, incomplete practitioners."),
      d("KAEL",   "right", "neutral", "What does that mean?"),
      d("SERATH", "left",  "neutral", "I'm not certain. Either the builders are claiming descent from the original method's tradition — which would be a lie given what they do — or they are using the notation as a signal. For whom, I don't yet know."),
      n("He has the specific look of someone who has added a fact to a picture and found it makes the picture stranger, not clearer."),
    ],

    // Spark 14: Maren holds a session in the city
    [
      n("Maren holds a session with those who have been practicing the method on the third morning in the city. Not at the grain warehouse — the space is wrong, too enclosed. She uses Leven's back courtyard, which is walled on all four sides and accessible only through the textile office."),
      d("MAREN", "left",  "neutral", "The practice will be tested in what comes next. Not by difficulty — by context. Everything about this city and what we are trying to do here will create pressure on what you hold. The practice has to be solid enough to hold through that. Not almost solid. Solid."),
      n("You work for two hours in the walled courtyard with the pale city light coming from above. At the end you can tell, precisely, whether what you hold is solid or not. It is. Not perfectly — but solidly enough to hold under pressure. That is what the practice is for."),
      d("SIRA",  "right", "quiet",   "The proximity to the Spire is — not destabilizing. But present."),
      d("MAREN", "left",  "neutral", "Yes. I feel it also. What you are feeling is the method registering the presence of people who are partial through it. The thread calls to other threads."),
      d("SIRA",  "right", "quiet",   "Are the practitioners inside calling to us?"),
      d("MAREN", "left",  "neutral", "Not intentionally. But the thread does not require intention. It is a property, not a signal."),
    ],

    // Spark 15: Dorath's network goes quiet
    [
      n("Day five in the city. Dorath sends two messages through Leven and receives nothing back. The first might be timing. The second is a pattern."),
      d("DORATH","left",  "quiet",   "My western contact is not responding. He has a twenty-four hour response window under the protocol — I am now at thirty-six hours."),
      d("MAREN", "left",  "neutral", "Is there a secondary contact?"),
      d("DORATH","left",  "quiet",   "There is a fallback address. I am not going to it yet because using the fallback address signals distress within the network, and distress signals propagate to people I don't want knowing our status."),
      d("MAREN", "left",  "neutral", "What is your read?"),
      d("DORATH","left",  "quiet",   "The contact is either disrupted or choosing not to respond. The second would be unusual. The first — the network here has been quiet in ways I've attributed to local caution. But quiet networks don't go silent for thirty-six hours without a reason."),
      n("She holds both possibilities the way she holds all things she cannot resolve: without collapsing them into one. The city continues outside the warehouse walls, ordinary and careful and not showing what is happening inside it."),
    ],
  ],

  w7: [
    [
      n("The contact address is a room above a grain merchant's warehouse. Clean, bare, with a window that faces south and not toward the Spire. This was not an accident. Whoever arranged this room arranged it knowing that a window facing north would be looking at the Spire all day."),
      d("RYN",    "right", "quiet",   "Someone thought carefully about this room."),
      d("SERATH", "left",  "neutral", "Eran's network at work. He has been preparing access points here for years."),
      n("You set down your pack. Through the south window: a street, an ordinary city street, people going about ordinary city business. The Spire is somewhere to your north. Not visible from here. Present everywhere."),
    ],
    [
      n("The first three days in the city are reconnaissance without appearing to reconnoiter. Eran walks the public areas. Serath makes contact with someone from his own network who is still inside the city. Dorath coordinates information between them through Leven. You and Brek walk the streets in the way that people walk streets when they are trying to understand a city's logic — not its geography, which is easy, but its mood, which takes longer."),
      d("BREK",  "left",  "neutral", "I have been in five different cities. This one is the quietest."),
      d("KAEL",  "right", "neutral", "Not quiet. Careful."),
      d("BREK",  "left",  "neutral", "What's the difference?"),
      d("KAEL",  "right", "neutral", "Quiet is the absence of sound. This is sound arranged to avoid certain frequencies."),
      n("Brek considers this for half a block and then nods."),
    ],
    [
      n("Serath's contact is a man named Pellard who works in the city's administrative records office. He has been passing information out of the city through Serath's network for eighteen months. He is precise, methodical, and visibly frightened in a way he manages with professional thoroughness."),
      d("PELLARD","left", "neutral", "The Spire's intake processing began four weeks ago. The first cohort went through the orientation program and have been assigned to roles inside the structure. They have not come back out into the general population."),
      d("SERATH", "left", "neutral", "At all?"),
      d("PELLARD","left", "neutral", "Not in a public-observable way. Their housing registrations are intact. Their administrative status is active. But nobody has seen any of them at the usual locations."),
      d("MAREN",  "left", "thoughtful", "They are inside the Spire."),
      d("PELLARD","left", "neutral", "That is the only conclusion."),
    ],
    [
      n("The information from Pellard resolves something everyone has been calculating since Eran told you the Spire was complete. The first cohort is already through the program. What the program does to them — the extraction, the partial completion — is already done. What happens next depends on what the Spire's intake schedule looks like."),
      d("ERAN",   "left", "neutral", "There is a second cohort registered for intake in eleven days."),
      d("DORATH", "left", "neutral", "Eleven days."),
      d("MAREN",  "left", "neutral", "How many in the second cohort?"),
      d("ERAN",   "left", "neutral", "Thirty-two."),
      n("Thirty-two practitioners, partway through a method they believe they have completed, processed through a program designed to extract what they carry. Thirty-two more people who will come out the other end of the Spire shaped to a purpose they did not choose. Eleven days."),
    ],
    [
      n("Sira finds you in the evening. She has been working with Maren on the fourteenth fragment — using the settlement's quiet as a basis, extending it into the city's different texture. She sits with the look of someone who has found something and is deciding how to say it."),
      d("SIRA",  "right", "neutral", "The practice holds here. I wasn't sure it would — the city has a different quality than anywhere I've worked. But it holds. If anything it's clearer."),
      d("KAEL",  "right", "neutral", "Clearer how?"),
      d("SIRA",  "right", "neutral", "Like — in the settlement, everything I hold feels like it belongs to me. Here, it feels like it belongs to something larger that I'm part of. The difference is subtle but I can't unfeel it now that I've noticed it."),
      n("You think about this for a long time after she says it."),
    ],

    // Spark 6: Pellard's method of survival
    [
      n("Serath's contact Pellard arranges the meeting himself — through a system of chalk marks on a specific warehouse post that Serath reads without stopping. The meeting is in a public garden at midday, the kind of meeting that is difficult to surveil because it is surrounded by other people doing the same thing."),
      d("PELLARD","left",  "neutral", "I need to understand something before we continue. How long are you planning to stay in this city?"),
      d("SERATH", "left",  "neutral", "Two to three weeks."),
      d("PELLARD","left",  "neutral", "I have been providing information out of this city for eighteen months. In those eighteen months I have changed my route to work eleven times, my residence four times, and my primary contact three times. Each change bought me more time. I am running out of changes."),
      d("SERATH", "left",  "neutral", "What are you telling me?"),
      d("PELLARD","left",  "neutral", "That what I can provide to you has a cost that I am now measuring carefully. I will give you what I have. After this meeting, I want to discuss what I need in return."),
      n("This is not a threat. Pellard is not threatening. He is a person who has been doing something dangerous for a long time and has arrived at the moment of reckoning between what he can continue to sustain and what he cannot."),
    ],

    // Spark 7: What the intake registry shows
    [
      n("Pellard's information, received over two meetings and parsed by Serath and Ryn together in the grain warehouse room over the following evening: the Spire's intake registry, as much of it as Pellard can reconstruct from administrative records."),
      d("RYN",   "right", "quiet",   "The first cohort had thirty practitioners. All from the eastern scholarly network. All with documented work in — she pauses — in Vraen-adjacent study. Not the fragments specifically. The related material."),
      d("SERATH","left",  "neutral",  "Adjacent study was enough."),
      d("RYN",   "right", "quiet",   "Enough to produce the thread, apparently. The program doesn't need someone who has done the full early work. It needs someone who has done enough to have started."),
      d("KAEL",  "right", "neutral",  "How much is enough?"),
      d("RYN",   "right", "quiet",   "Based on this registry — approximately six months of sustained work with the related material. That is a low bar."),
      n("Low bar meaning: the number of people in the eastern academic world who qualify for the program is much larger than any of you had assumed. The Spire does not need rare practitioners. It needs people who have spent half a year on a particular kind of study."),
    ],

    // Spark 8: Brek in the eastern alley
    [
      n("Brek has been in his designated territory for six days. He knows it the way he knows any space where he has worked — completely, without effort, the knowledge becoming structural. He tells you what he has observed on the evening of day six."),
      d("BREK",  "left",  "neutral", "There is a patrol that passes the south end of the alley every two hours. Irregular by about twelve minutes — the variation is genuine, not a pattern I've failed to decode."),
      d("KAEL",  "right", "neutral", "What are they watching for?"),
      d("BREK",  "left",  "neutral", "Nothing specific that I can see. It's a presence patrol. They're not looking for anything — they're making sure their presence is visible. That's different from targeted surveillance."),
      d("KAEL",  "right", "neutral", "Presence patrol as deterrent."),
      d("BREK",  "left",  "neutral", "Yes. And it works. The people in this neighborhood move differently when the patrol passes than when it doesn't. They've internalized the boundary."),
      n("He says this with the detached interest of someone who finds the mechanics of human behavior under observation genuinely fascinating. He has been watching a city manage its population for six days and he has learned things about how this works that nobody in the warehouse room has thought to ask."),
    ],

    // Spark 9: Ryn finds something in the records
    [
      n("Ryn has been cross-referencing the administrative records she brought from the Archive against what Pellard has provided. On day seven she surfaces from three hours of close work and says:"),
      d("RYN",  "right", "quiet",   "The agreement. The founding agreement between the Archive and the institution — I have found the specific condition that wasn't in the Archive's records."),
      d("KAEL", "right", "neutral", "What was it?"),
      d("RYN",  "right", "quiet",   "The Archive agreed that any practitioner who completed the method within its walls would be made available to the institution for an 'assessment period' of thirty days. The language is deliberately vague. But the intent — the intent is that any completed practitioner was considered partially the institution's asset."),
      d("KAEL", "right", "neutral", "Maren completed the method."),
      d("RYN",  "right", "quiet",   "Yes. The Archive burned before the institution could activate that clause. Which is, possibly, not a coincidence."),
      n("The silence that follows this is the silence of something clicking into place. The fire was not random. The fire was specific. And whoever set it may have been destroying the Archive not to stop the method — but to prevent the institution from claiming what the Archive had produced."),
    ],

    // Spark 10: Dorath's western contact resurfaces
    [
      n("The western contact resurfaces on day eight. Not through the usual channel — through Leven, directly. He delivers a single written message and does not wait for a response."),
      d("DORATH","left",  "neutral", "He was dark for forty-two hours because he had company. Someone using the network's secondary channel who was not his contact. He shut down and waited."),
      d("MAREN", "left",  "neutral", "Someone else was using the channel."),
      d("DORATH","left",  "neutral", "Using the correct codes for the secondary channel. Either the codes were compromised or someone inside the network was probing."),
      d("SERATH","left",  "neutral", "Probing for what?"),
      d("DORATH","left",  "neutral", "For evidence of our presence here. The Voss network knows we entered the city — the gate documentation ensures that. If they know Dorath's network is also present, they can map the overlap and narrow down our position."),
      n("The forty-two hours of silence was Dorath's contact protecting them. He is back now. But the probe — whoever sent it — knows the secondary channel exists."),
    ],

    // Spark 11: Gavrick and the Spire's fourth level
    [
      n("Gavrick asks to speak with Maren and Serath together. He has been quiet since the gate incident, processing something. When he speaks, he speaks carefully."),
      d("GAVRICK","left",  "neutral", "The fourth level. The section I described as the extraction room and the preparation room adjacent to it. I want to add something I didn't say before."),
      d("MAREN",  "left",  "neutral", "Go ahead."),
      d("GAVRICK","left",  "neutral", "The preparation room is not where people wait before extraction. I said that because it is the administrative description. The actual function — what I observed in the two sessions I attended before I requested reassignment — is different."),
      d("SERATH", "left",  "neutral", "What is it?"),
      d("GAVRICK","left",  "neutral", "It is where they explain to the practitioner what has been done to them. After the extraction. Not before."),
      n("A moment."),
      d("MAREN",  "left",  "neutral", "They tell them."),
      d("GAVRICK","left",  "neutral", "They tell them, in precise terms, what the process produced and what their orientation now is. And they explain why this is a gift, not a diminishment. Most of the practitioners accept this explanation. Because by that point, the orientation already feels like their own conviction."),
    ],

    // Spark 12: Dorath on Orin's behavior
    [
      n("Day nine. Orin has asked where Maren will be on day eleven. He has asked this twice, in two different conversations, with a precision that Dorath has logged."),
      d("DORATH","left",  "quiet",   "He is not asking because he is concerned for her welfare."),
      d("KAEL",  "right", "neutral", "You think he's reporting."),
      d("DORATH","left",  "quiet",   "I think he may have reported already. What I don't know is whether his contact was the person probing my western channel."),
      d("KAEL",  "right", "neutral", "Have you told Maren?"),
      d("DORATH","left",  "quiet",   "I am telling you first because you have access to Maren that I currently don't without moving through two other contact points. I need you to tell her directly, in person, without using any of the established channels."),
      n("She means: say nothing to Leven, nothing through Serath, nothing written. Go to Maren's location and tell her yourself."),
      d("KAEL",  "right", "neutral", "Is it urgent?"),
      d("DORATH","left",  "quiet",   "The pattern I'm seeing gives us thirty-six to forty-eight hours before someone acts on Orin's information. Yes. It is urgent."),
    ],

    // Spark 13: The practice session becomes something else
    [
      n("You tell Maren what Dorath told you. She listens. She does not change expression. Then she says:"),
      d("MAREN", "left",  "neutral", "Sit down."),
      d("KAEL",  "right", "neutral", "The information—"),
      d("MAREN", "left",  "neutral", "I heard the information. Sit down. I want to do something before I respond to it."),
      n("She works for ten minutes in the way she works — precisely, with the particular quality of attention that makes the air in a room feel different when she is practicing. Then she opens her eyes."),
      d("MAREN", "left",  "neutral", "Dorath is correct. I have been aware of the pattern in Orin for four days. I was giving him time to decide differently."),
      d("KAEL",  "right", "neutral", "Did you think he would?"),
      d("MAREN", "left",  "neutral", "I thought it was worth finding out. Now I know. The practice tells me what I already knew — that what is given freely to someone who is not ready to hold it freely is not returned the same way."),
      n("She stands. The decision is made. It is visible in how she stands."),
    ],

    // Spark 14: Sira's discovery
    [
      n("Sira finds you on day ten. She has been working with the method in the walled courtyard and has found something she did not expect."),
      d("SIRA",  "right", "quiet",   "There is something in the reading room."),
      d("KAEL",  "right", "neutral", "You can feel it from here?"),
      d("SIRA",  "right", "quiet",   "Not specifically from here. From what the practice opens. It's — it's like an echo. Something in the Spire that resonates the same way the method resonates, but wrong. Not the thread redirected. Something older than the thread."),
      d("KAEL",  "right", "neutral", "The Unnamed Third."),
      n("She looks at you."),
      d("SIRA",  "right", "quiet",   "I don't know what it is. But it is there. And it has been there longer than the Spire has. The building was built around it or built over it or built toward it — I can't tell which. But whatever Maren is planning to put in the reading room is not going into an empty space."),
      n("You take this to Maren immediately. She is quiet for a long time."),
      d("MAREN", "left",  "neutral", "I suspected. This changes the placement. Not whether to do it — how."),
    ],

    // Spark 15: Day ten ends with everything in motion
    [
      n("Day ten. The window Dorath identified — thirty-six to forty-eight hours before Orin's information produces action — is now running. Maren has made two decisions that she communicates to the group through the contact chain: the safe houses move tonight, and the placement is moved to day twelve."),
      d("DORATH","left",  "neutral", "Day twelve is inside the window."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("DORATH","left",  "neutral", "If Orin's reporting is as specific as I believe it is, our current positions will be known to someone by tomorrow morning. Moving tonight buys us thirty-six hours at new positions."),
      d("MAREN", "left",  "neutral", "Which is enough for day twelve."),
      d("DORATH","left",  "neutral", "Barely."),
      d("MAREN", "left",  "neutral", "Barely is a position I have planned for. Have the moves ready to execute by midnight."),
      n("Dorath does not waste time on the observation that barely is a difficult position to execute from. She knows this. She begins the moves."),
    ],
  ],

  w8: [
    [
      n("Orin asks to see the Spire. Not from a distance — he wants to walk the perimeter of the block it occupies. Dorath considers this for a day and then agrees, conditionally: no stopping, no looking up for more than a moment, no questions at any shop or market near it."),
      d("ORIN",   "left", "neutral", "I want to understand the access points. I know how buildings like this are structured on the inside because I spent eight months in one during the Archive's renovation period. The layout logic carries over."),
      d("DORATH", "left", "neutral", "You get one pass. If anything feels wrong on the pass, you leave immediately."),
      d("ORIN",   "left", "neutral", "Agreed."),
      n("He returns two hours later with eight pages of notes in a hand so small you need to hold it up to the light to read it."),
    ],
    [
      n("Brek is almost caught at the market on the sixth day. Not because he did anything wrong — he was buying provisions in the ordinary way, at an ordinary stall — but because someone at the next stall recognized his face. Not Brek's face. Something about his face. The look of a person who has done sustained physical practice for years, and who is in a market when the market's demographic is people who have not."),
      n("The person who recognized the type said something quietly to someone next to them. Brek noticed before the conversation finished. He bought his provisions and left the market and did not look behind him."),
      d("BREK",  "left", "neutral", "I was not followed. I took four extra routes and I was not followed."),
      d("MAREN", "left", "neutral", "The recognition itself is the event. Even if they did not follow, they saw you. Adjust where you go."),
      d("BREK",  "left", "neutral", "I understand."),
    ],
    [
      n("Dorath's network delivers a message on day eight. Not from inside the city — from outside it. From the road. The message is brief, in a cipher that Dorath reads in ninety seconds."),
      d("DORATH", "left", "quiet", "Someone is asking whether our group arrived in this city safely. The inquiry came through my network from a source I know — a contact in the second border settlement. The one who wasn't there when we passed through."),
      d("MAREN",  "left", "neutral", "The contact who was absent."),
      d("DORATH", "left", "quiet", "Yes. They're asking if we made it. Which means they know we were coming here, and they know the road we took, and something on that road worried them enough that they tried to verify our arrival."),
      d("MAREN",  "left", "neutral", "Or they were the thing that followed us on the road, and this is how they're confirming we are here."),
      n("Two possibilities. Dorath holds them both without resolving them."),
    ],
    [
      n("Serath and Pellard meet on day nine. The meeting is brief — ten minutes at a public fountain — and Serath returns with the thing Pellard has been holding back: the Spire's full intake schedule."),
      d("SERATH", "left", "neutral", "Second cohort: eleven days. Third cohort: four weeks after that. Then a break in the schedule — six weeks of no new intakes. Then the fourth cohort, which Pellard says is three times the size of the first three combined."),
      d("MAREN",  "left", "neutral", "The fourth cohort is the deployment."),
      d("SERATH", "left", "neutral", "That's my reading. The first three cohorts are preparation. The fourth is the actual operation going live."),
      d("KAEL",   "right", "neutral", "How long before the fourth cohort?"),
      d("SERATH", "left", "neutral", "Eleven days plus four weeks plus six weeks. Two and a half months."),
    ],
    [
      n("Maren holds a session with those who have been practicing the method, on the morning of day ten. You, Sira, Serath. Not Brek — he works differently, and his contribution is not the practice itself but the body that knows what practice costs. She runs the session in the contact room above the warehouse, in the quiet that is always available there in the early morning before the street wakes up."),
      d("MAREN", "left", "neutral", "The practice will be tested in what comes next. Not by difficulty — by context. Everything about this city and what we are trying to do here will create pressure on what you hold. The practice has to be solid enough to hold through that. Not almost solid. Solid."),
      n("You work for two hours. At the end of two hours you can tell, precisely, whether what you hold is solid or not. It is. Not perfectly — but solidly enough to hold under pressure. That is what the practice is for."),
    ],

    // Spark 6: The new safe houses
    [
      n("The move happens in four hours starting at midnight. Not all at once — staggered, three locations shifting to three new ones through different routes, with Dorath coordinating through Leven as the single hub. By four in the morning everyone is in a new position and Dorath has confirmed all moves through a check signal."),
      d("KAEL",   "right", "neutral", "The new location."),
      d("SERATH", "left",  "neutral", "A room above a cartwright's workshop. Three streets west of the previous one. The window faces an interior courtyard — no line of sight from the main street."),
      d("KAEL",   "right", "neutral", "Dorath arranged this in four hours."),
      d("SERATH", "left",  "neutral", "Leven had alternatives already mapped. This is what Dorath's network is — it is the preparation she did years before we needed it. We are spending capital she banked in advance."),
      n("You sleep four hours. The city sounds outside the courtyard are different from the sounds outside the grain warehouse. The cartwright starts work at dawn. The unfamiliar sounds orient you: new location, new routine, same mission."),
    ],

    // Spark 7: Pellard's second meeting — intake schedule in full
    [
      n("Pellard's second meeting. He delivers the Spire's intake schedule with the efficiency of someone who has decided this is the last thing he will provide before he leaves. Not emotional. Practical."),
      d("PELLARD","left",  "neutral", "Second cohort: entered four days ago, thirty-two practitioners. Current status: orientation phase, which lasts approximately three weeks. Third cohort: registered for entry in seven days. Thirty-six practitioners."),
      d("MAREN",  "left",  "thoughtful", "The third cohort is larger than the second."),
      d("PELLARD","left",  "neutral", "Yes. The fourth cohort is larger still. Pellard lowers his voice: the fourth cohort's registration is not from the eastern academic population. It is from the institution's own personnel. People who have been through a different preparation entirely."),
      d("SERATH", "left",  "neutral", "Their own network members."),
      d("PELLARD","left",  "neutral", "The ones who have been doing related work for the institution for years. The fourth cohort is the deployment cohort — people who will carry the oriented thread into specific positions across the administrative structure."),
      n("Pellard closes his notebook. He will not be attending a third meeting."),
    ],

    // Spark 8: Dorath and Maren on the fourth cohort
    [
      n("Maren and Dorath meet alone that evening. You are in the adjacent room, close enough to hear some of what passes between them, and they know you are there."),
      d("DORATH","left",  "neutral", "The fourth cohort changes what this is."),
      d("MAREN", "left",  "neutral", "It changes the scale. Not the method."),
      d("DORATH","left",  "neutral", "The scale is the method at this point. What you place in the reading room — how quickly can it work? How quickly can a practitioner who finds it follow the thread to completion?"),
      d("MAREN", "left",  "neutral", "Months. For someone who has the early work well established. Possibly faster for someone who was close to completing independently before the program redirected them."),
      d("DORATH","left",  "neutral", "The fourth cohort's deployment is in two and a half months."),
      d("MAREN", "left",  "neutral", "I know."),
      d("DORATH","left",  "neutral", "So what you're placing may not work fast enough to matter."),
      d("MAREN", "left",  "neutral", "No. It may not. That is the honest assessment. We do it anyway because the alternative is doing nothing, and doing nothing has a guaranteed outcome."),
      n("Dorath accepts this. Not comfortably. But she accepts it."),
    ],

    // Spark 9: Eran walks the Spire's administrative entrance
    [
      n("Eran walks the Spire's administrative entrance on day twelve. He does this using his academic credential, presenting himself as a scholar wishing to consult the Spire's public reading room. This is an allowed activity — the public reading room exists to give the program legitimacy. Scholars from the eastern network use it occasionally."),
      d("ERAN",  "left",  "neutral", "The credential was accepted. The public reading room is on the second level. The access to the second level passes through a checkpoint where credentials are verified and a log is kept."),
      d("MAREN", "left",  "neutral", "They logged you."),
      d("ERAN",  "left",  "neutral", "Yes. My name is in the Spire's entry log. This is either the worst problem we have created this week or a manageable one, depending on whether someone reviews the log before we've done what we came to do."),
      d("DORATH","left",  "neutral", "Who reviews the log?"),
      d("ERAN",  "left",  "neutral", "Administrative staff. Weekly, I believe, from what I observed of the desk procedure. We have approximately six days before a weekly review would catch my entry."),
      n("Six days. That is the window, now sharply defined."),
    ],

    // Spark 10: Dorath enters the Spire
    [
      n("Day thirteen. Dorath enters through the secondary access point Gavrick identified — a supply entrance used during construction that has been inadequately updated in the security rotation. She goes in alone. The group watches her go from three separate positions."),
      d("GAVRICK","left",  "neutral", "The rotation gap at the secondary entrance is twenty-two minutes, based on my last observation three weeks ago. The gap may have changed."),
      d("MAREN",  "left",  "neutral", "Has anything changed in the rotation in the weeks we have been here?"),
      d("BREK",   "left",  "neutral", "The east and north faces have tightened. The secondary entrance side — I've watched it for five days. The gap is still present. Closer to eighteen minutes now."),
      d("DORATH", "left",  "neutral", "Eighteen minutes is enough."),
      n("She goes in. The group disperses to positions. Leven receives the first signal thirty minutes later: clean entry. The second signal will come in two hours. Everyone who is not Dorath has the particular work of waiting with no way to affect anything."),
    ],

    // Spark 11: The two hours of waiting
    [
      n("Two hours. Maren practices in the walled courtyard with the method at full depth, which is how she manages long waiting. Brek runs the eastern alley's length in small circuits. Serath reviews the fourth-level map for the fourteenth time. You hold what you hold and find that it holds."),
      d("KAEL",  "right", "neutral", "Ryn. What are you doing?"),
      d("RYN",   "right", "quiet",   "Reading Pellard's intake schedule."),
      d("KAEL",  "right", "neutral", "You've read it three times."),
      d("RYN",   "right", "quiet",   "I'm looking for something I keep expecting to find and keep not finding."),
      d("KAEL",  "right", "neutral", "What?"),
      d("RYN",   "right", "quiet",   "A practitioner's name I recognize from the Archive's extended network. The third cohort especially. Thirty-six people, all identified by the network as being closest to independent completion. Some of them must be people Maren taught, or people who were at the Archive peripherally."),
      d("KAEL",  "right", "neutral", "Are any?"),
      d("RYN",   "right", "quiet",   "Four. I found four names I know from the Archive's research correspondence. Four people who were, in some small way, connected to what we were doing. And they are in the third cohort."),
      n("The second signal arrives exactly two hours after the first. Dorath is in. She is at C-VII."),
    ],

    // Spark 12: Gavrick and Kael on the fourth level
    [
      n("While waiting for Dorath's third signal, you and Gavrick are at position two. The secondary exit is behind you. The street ahead runs east-west and gives a sight line to the Spire's northern face. From this position, the fourth level is visible."),
      d("KAEL",   "right", "neutral", "What was it like? Overseeing the sessions in that room."),
      d("GAVRICK","left",  "neutral", "Precise. The room was organized with great care — the arrangement, the seating, the specific conditions of light and temperature. Every element was calibrated. The practitioners who came through were not frightened. That was the most difficult thing. They came in expecting something like an examination and they came out — different. And they had accepted the difference."),
      d("KAEL",   "right", "neutral", "Did any of them resist?"),
      d("GAVRICK","left",  "neutral", "One. In the second session I attended. She said something was wrong before the process completed — that she could feel something being — taken. She used that word. Taken."),
      d("KAEL",   "right", "neutral", "What happened to her?"),
      d("GAVRICK","left",  "neutral", "She was given additional time in the preparation room. When she came out she had accepted it. Or she had learned to say she had accepted it. I could not tell the difference."),
      n("That was session two of four. He requested reassignment after session four."),
    ],

    // Spark 13: The third signal doesn't come
    [
      n("An hour past when Dorath's third signal was due. Serath holds the position. His voice has the flat quality it gets when he is managing something he does not want to manage."),
      d("SERATH", "left",  "neutral", "The absence of a signal is not yet diagnostic. There are four reasons a signal might not come and only one of them is the one we don't want."),
      d("KAEL",   "right", "neutral", "What are the other three?"),
      d("SERATH", "left",  "neutral", "Signal delivery delayed in the chain. She moved locations and the new position doesn't have line of access to the relay. She found something large enough to occupy her attention completely."),
      d("KAEL",   "right", "neutral", "What's the fourth?"),
      d("SERATH", "left",  "neutral", "The fourth reason is that the delivery chain is correct and she is in a position where sending a signal is not possible."),
      n("He does not say: she was found. He does not say: something went wrong. He names the diagnostic possibilities and holds them open. This is the discipline of someone who has been in this kind of waiting before and knows that collapsing the possibilities prematurely costs more than it saves."),
    ],

    // Spark 14: The group holds position
    [
      n("An hour and forty minutes after the missing third signal. The group is still in position. Nobody has moved. Nobody has suggested moving. The instruction was: wait for the fourth signal. The fourth signal is the only signal that means go."),
      d("BREK",  "left",  "neutral", "Is there a point at which waiting is the wrong choice?"),
      d("MAREN", "left",  "neutral", "There is a point at which the probability shifts. We are not at that point yet."),
      d("BREK",  "left",  "neutral", "When are we at it?"),
      d("MAREN", "left",  "neutral", "Two hours past the expected third signal. We are at one hour and forty minutes."),
      n("Twenty minutes. Twenty minutes before the calculation changes. Brek nods and resumes his circuit of the eastern alley. The circuit gives him something to do that is not waiting, even though it is waiting."),
      d("KAEL",  "right", "neutral", "What happens at two hours?"),
      d("MAREN", "left",  "neutral", "We reassess. We don't act — we reassess. Acting without information is what we do only when doing nothing is clearly worse."),
    ],

    // Spark 15: The fourth signal
    [
      n("The fourth signal arrives three hours and forty minutes after the third was expected. Leven: 'Complete. Exit in progress.' Then nothing, which is correct — the next information will be Dorath, in person, at the secondary exit."),
      n("Twenty minutes of the correct silence. Then the door at the secondary exit opens, and Dorath walks out."),
      d("KAEL",   "right", "neutral", "Intact."),
      d("DORATH", "left",  "neutral", "Intact. The delay was a guard rotation extension — maintenance crew on level three required extended supervision and the rotation held position for twenty-two hours longer than the schedule indicated. I could not signal. I am completely fine."),
      d("MAREN",  "left",  "neutral", "And what you found."),
      d("DORATH", "left",  "neutral", "Three things. The registry, a fourth-level map that goes beyond what Pellard had, and a name."),
      n("She says the name. It is a person's name — specific, present, on site three days a week. Not an institution. Not a network. A person who is in the building they have been planning around for weeks."),
      d("MAREN",  "left",  "neutral", "She's here."),
    ],
  ],

  w9: [
    [
      n("The wrong thing about Orin becomes visible on day twelve. Not a single event — a pattern. He asks questions that are a half-step too specific. He asks where certain people are at certain times with a precision that looks like concern but feels like logging. Ryn notices first. Then Dorath. Then Serath, who has the most experience recognizing this specific pattern."),
      d("SERATH", "left", "quiet", "The contact who was absent from the border settlement. The inquiry Dorath received asking if we arrived safely. Orin has been on a different road."),
      d("DORATH", "left", "quiet", "The inquiry described our group accurately. Only someone traveling with us after the first border settlement would have that level of detail."),
      d("SERATH", "left", "quiet", "Orin joined us between the settlements."),
      n("The arithmetic is straightforward and nobody wants to say it out loud."),
    ],
    [
      n("Maren confronts Orin directly. Not accusation — statement of observation, followed by a question. She does this with the same precision she does everything else, which means Orin has no room to deflect before deciding whether to answer honestly."),
      d("MAREN", "left", "neutral", "You were approached before you found us on the road. Someone gave you a reason to stay with our group and report on our movements. I want to know who, and I want to know what you have told them."),
      n("Orin is quiet for a long time. Then he answers."),
      d("ORIN",  "left", "neutral", "The contact was at the east wing exit on the night of the fire. They were waiting there. They said — they said they were Archive allies who had been protecting the operation from the outside. They gave me a code that Dorath herself had used the previous winter. I believed them. I'm sorry."),
    ],
    [
      n("Dorath's code. From the previous winter. Someone inside the network had access to it, or had found it, or had extracted it from someone who knew it. This is what the Spire's extraction program produces: not just practitioners who are partially through the method, but access to the networks that protect the method."),
      d("DORATH", "left", "quiet", "What did you report?"),
      d("ORIN",   "left", "quiet", "Our route. Our numbers. That we were heading to this city. The names of the contacts we stopped at. The name of Eran."),
      n("Silence. The contact above Leven's warehouse holds it."),
      d("DORATH", "left", "quiet", "Eran."),
      d("ERAN",   "left", "neutral", "I assumed I was known here. I have been managing that assumption for two years. It changes the parameters, not the direction."),
    ],
    [
      n("They move safe houses that night. All three locations, simultaneously, with no communication between moves until everyone is in the new position. Dorath coordinates this through Leven, who does not ask questions and does not sleep while it happens."),
      n("Orin moves with them. This is a choice that is not unanimous and is made by Maren on the grounds that leaving him behind creates a different problem than keeping him close. Ryn disagrees with this. She says so once and then abides by it. The disagreement is noted and held."),
      d("BREK",  "left", "neutral", "What do they know now?"),
      d("DORATH","left", "neutral", "Everything Orin knew until last night. Nothing we have done since."),
      d("BREK",  "left", "neutral", "Which means we have a window."),
      d("MAREN", "left", "neutral", "A small one. Yes."),
    ],
    [
      n("The window is three to four days, Dorath estimates. After that, the absence of new reporting will itself be noticed, and people will come to the last known addresses to understand why the reporting stopped."),
      d("MAREN",  "left", "neutral", "Then we use three days."),
      d("SERATH", "left", "neutral", "For what, specifically?"),
      d("MAREN",  "left", "neutral", "For what we came here to do. Not at leisure. With whatever time is available."),
      n("She says this in the same voice she uses when she says difficult things — not heavy, not urgent, simply stating the situation with the precision it deserves. Three days in a city where they now know you are. What you do with three days determines what comes next."),
    ],

    // Spark 6: Orin's account, heard whole
    [
      n("After Orin tells Maren who gave him the code, Maren asks him to tell the whole account from the beginning. Not to assess guilt — to understand the mechanism. She needs to know how the contact at the east wing exit had access to Dorath's winter code."),
      d("ORIN",  "left",  "neutral", "They said they were part of the Archive's external protection network. They gave me the code as proof. They said Dorath had asked them to meet anyone who came through that exit."),
      d("MAREN", "left",  "neutral", "And you believed this."),
      d("ORIN",  "left",  "neutral", "The code was genuine. Dorath confirmed it — the winter code was real. I didn't know how they had it."),
      d("DORATH","left",  "neutral", "Someone inside my network gave them that code. Not the current season's code — the previous winter's. Which means the compromise was not recent."),
      d("MAREN", "left",  "neutral", "How long has your network been partially penetrated?"),
      d("DORATH","left",  "neutral", "I don't know. The winter code was retired eight months ago. The penetration happened before that."),
      n("Eight months. Everything Dorath's network has done in eight months has had a partially open door. The safe houses move tonight. This explains why the moves needed to happen."),
    ],

    // Spark 7: Moving safe houses in the dark
    [
      n("The move: four hours of coordination, all three locations shifting simultaneously to remove the possibility that one move tips off someone watching another location. Dorath does this with the efficiency of someone who has rehearsed it without being able to say when she would need it."),
      d("MAREN", "left",  "neutral", "Orin moves with us."),
      d("RYN",   "right", "quiet",   "I don't agree."),
      d("MAREN", "left",  "neutral", "I know."),
      d("RYN",   "right", "quiet",   "If he is still reporting—"),
      d("MAREN", "left",  "neutral", "If he is still reporting, keeping him close means we know what he reports and can account for it. If we leave him behind, what he reports is whatever he has already seen, and we cannot account for what we don't know he's saying."),
      n("Ryn is quiet. The logic is complete. The logic does not make the decision comfortable."),
      d("RYN",   "right", "quiet",   "I will keep my own account of what he sees from his new position."),
      d("MAREN", "left",  "neutral", "Yes. Do that."),
    ],

    // Spark 8: The window and what it means
    [
      n("Three days. Dorath's estimate: three to four days before the absence of new reports from Orin causes someone to act. Three days in which the group has full operational freedom, because whoever is waiting for Orin's reports is still waiting."),
      d("SERATH","left",  "neutral", "Three days is enough for the placement."),
      d("MAREN", "left",  "neutral", "Three days is exactly enough for the placement and nothing more."),
      d("SERATH","left",  "neutral", "Which means we don't use any of those three days for anything that isn't the placement."),
      d("MAREN", "left",  "neutral", "Correct. We use three days for preparation and entry. The preparation is already mostly done. What remains: Eran confirms the academic credential path into the reading room is still viable. Dorath maps the specific entry timing. And I hold the fourteenth stage precisely enough to place it."),
      d("KAEL",  "right", "neutral", "What does placing it precisely mean?"),
      d("MAREN", "left",  "neutral", "The method, when complete, is structural. Placing it means locating it in a space in a way that it can be found by the thread that is looking for it. Not hidden. Not obvious. Specifically located. Like a key placed precisely where a lock that is also precisely placed can receive it."),
    ],

    // Spark 9: Serath's network contact, last piece
    [
      n("Serath reaches his inside-city contact — not Pellard, a different person, someone Serath has been protecting throughout this operation by not using them unless necessary. He uses them now. The contact provides one thing: the Spire's current guard roster for the reading room."),
      d("SERATH", "left",  "neutral", "The reading room is supervised by a single staff member during open hours. During closed hours — evening — it is on the same general rotation as the public areas of the second level."),
      d("MAREN",  "left",  "neutral", "Open or closed?"),
      d("SERATH", "left",  "neutral", "Open. The placement needs to be in a location that practitioners access during use. A closed room with staff present is actually harder to surveil."),
      d("MAREN",  "left",  "neutral", "Then we enter during open hours. Eran and I as visiting scholars."),
      d("SERATH", "left",  "neutral", "There may be practitioners in the room."),
      d("MAREN",  "left",  "neutral", "There will likely be practitioners in the room. That changes the timing, not the plan."),
      n("This is the specific quality of Maren's planning: she plans for the difficult version. When the difficult version is what they get, she is not surprised."),
    ],

    // Spark 10: Ryn and Kael the night before entry
    [
      n("The night before Maren and Eran enter the Spire. Ryn is at the window. The south-facing window looks at a wall and a piece of sky. No Spire from here. This was intentional."),
      d("RYN",   "right", "quiet",   "If it works — if someone in the first or second cohort finds what she places — what happens to them?"),
      d("KAEL",  "right", "neutral", "They complete the method."),
      d("RYN",   "right", "quiet",   "What does that mean for someone who has been through the program? Their orientation has already been applied. The thread has been redirected."),
      d("KAEL",  "right", "neutral", "Following the thread to completion undoes the redirection?"),
      d("RYN",   "right", "quiet",   "I don't know. I don't think Maren knows with certainty. The method completes something. What completing something that was redirected produces — that's not in the fragments she's read."),
      n("The window holds its piece of sky. Somewhere in the building to the north: practitioners who carry something redirected and something that might lead them somewhere else if they can find what Maren is going to put in their reading room."),
      d("KAEL",  "right", "neutral", "She's doing it anyway."),
      d("RYN",   "right", "quiet",   "Yes. Because the alternative is not doing it, and not doing it is not an alternative."),
    ],

    // Spark 11: Maren the night before entry
    [
      n("You stay with Maren the night before the entry, as she asked you to. The lamp is low. The fragments are arranged in the sequence she always arranges them. She is not reading them. She is holding what they describe."),
      d("MAREN", "left",  "quiet",   "I want to say one thing before tomorrow."),
      d("KAEL",  "right", "neutral", "Yes."),
      d("MAREN", "left",  "quiet",   "When I began this — the Archive, the preparation, the eight months of watching before the fire — I did not know if anyone else would be capable of doing what needed to be done alongside me. The method, completed, is not a solitary thing. It produces a person who is structurally different from what they were. That person needs to operate in the world as it is."),
      d("KAEL",  "right", "neutral", "And?"),
      d("MAREN", "left",  "quiet",   "This group has given me the confidence that what I place tomorrow will be found by people who can follow it to completion. Not because of what I place — because of what I now know is possible. I did not have that confidence before the settlement."),
      n("The fragments rest in their sequence. She holds what they contain. Outside the walled courtyard: a city with a building in it, and in that building tomorrow, something she has been preparing her entire working life."),
    ],

    // Spark 12: What happens to Orin
    [
      n("On the second day of the window, Orin asks to speak with Maren again. He does not ask for privacy this time. He speaks in the group's hearing, which is itself a choice."),
      d("ORIN",  "left",  "neutral", "I want to tell you what I am going to do. Not ask permission. Tell you."),
      d("MAREN", "left",  "neutral", "Go ahead."),
      d("ORIN",  "left",  "neutral", "After we leave this city, I am going to find the person who was waiting at the east wing exit. Not to report to them — to give them something inaccurate. To feed information back through the channel in a direction that is useful to you rather than to them."),
      d("MAREN", "left",  "neutral", "Double work."),
      d("ORIN",  "left",  "neutral", "I owe this group a debt I cannot pay by staying with it. This is what I can do."),
      n("Nobody says: we trust you. The room holds the offer without endorsing it or refusing it."),
      d("DORATH","left",  "neutral", "If you attempt this and your control discovers you are feeding them inaccurate information, the outcome is not survivable."),
      d("ORIN",  "left",  "neutral", "Yes. I know."),
    ],

    // Spark 13: Dorath maps the entry timing
    [
      n("Dorath spends the second day doing what she does best: the operational preparation that nobody else thinks to do because they are thinking about the goal rather than the path to it."),
      d("DORATH","left",  "neutral", "The entry timing. Eran and Maren arrive at the administrative entrance at the third hour of the working day. This is when the credential check is being done by junior staff, not senior staff — a consistent pattern I've observed over twelve days."),
      d("KAEL",  "right", "neutral", "You've been watching the entrance."),
      d("DORATH","left",  "neutral", "Every day since we arrived. The senior administrator who does the credential review arrives at the fourth hour. If anything triggers a concern in the junior check, it escalates to her. What we want is an unconcerning credential presented before she arrives."),
      d("MAREN", "left",  "neutral", "Eran's credential will be presented by someone who has used it in this building three days ago."),
      d("DORATH","left",  "neutral", "Yes. His name is in the entry log. This makes the repeat visit normal rather than unusual."),
      n("Dorath has thought through every variable. The path from here to the reading room is as clear as it can be made. What happens in the reading room is Maren's domain and always has been."),
    ],

    // Spark 14: The night before everything
    [
      n("The last night of the window. Tomorrow Maren and Eran go in. Tonight the group is distributed across three positions. Each position does what it does at night: watches, holds, waits."),
      d("BREK",  "left",  "neutral", "I want to say something."),
      d("KAEL",  "right", "neutral", "Say it."),
      d("BREK",  "left",  "neutral", "I don't know if I've done the method correctly. I know what it does to the body. I know what the practice feels like from inside the physical discipline. Whether what I'm carrying is what Maren means by carrying — I don't know."),
      d("KAEL",  "right", "neutral", "Does it matter?"),
      d("BREK",  "left",  "neutral", "It matters to whether I'm useful. Not to me personally. To whether my presence in this operation actually contributes something beyond the physical."),
      d("KAEL",  "right", "neutral", "The physical is not nothing. Dorath said you are the person who buys time if things go wrong."),
      d("BREK",  "left",  "neutral", "Buying time is not the same as completing the method."),
      d("KAEL",  "right", "neutral", "No. And completing the method is not the same as holding a position under pressure so the people who have completed it can do what they came to do."),
      n("Brek considers this. After a while, he nods. The nod of someone who has received an argument they cannot immediately counter."),
    ],

    // Spark 15: Voss confirmed present — and a choice
    [
      n("On the morning of entry day, Brek's eastern alley report includes something he has not seen before: a figure entering the Spire's administrative entrance who matches Dorath's description of Voss-network senior staff posture."),
      d("BREK",  "left",  "neutral", "The figure used the administrative entrance, not the public access. They were recognized by the door staff — no credential check, just acknowledgment and entry."),
      d("DORATH","left",  "neutral", "Gavrick. The posture."),
      d("GAVRICK","left", "neutral", "Senior operational staff. The specific entrance protocol for someone who is either network leadership or their direct representative."),
      d("MAREN", "left",  "neutral", "She may be in the building today."),
      n("This is the information no one wanted on entry day. The person who has been building what they are here to undermine may be in the building while they are in it."),
      d("KAEL",   "right", "neutral", "Does it change the plan?"),
      d("MAREN",  "left",  "neutral", "No."),
      d("KAEL",   "right", "neutral", "Does it change the risk?"),
      d("MAREN",  "left",  "neutral", "Yes. Considerably. We go anyway."),
    ],
  ],

  w10: [
    [
      n("Day fourteen. Serath's contact Pellard delivers the last thing he can deliver safely: the Spire's internal access map. Not detailed — Pellard is not inside the Spire, only adjacent to its administrative records — but enough. Entry points. Guard rotation schedule, which Pellard has assembled from four months of observation. The floor designations for each section."),
      d("PELLARD","left", "neutral", "I am leaving the city tonight. My usefulness here is past its safe duration."),
      d("SERATH", "left", "neutral", "I understand."),
      d("PELLARD","left", "neutral", "Good luck, Serath. I mean that specifically — not as a pleasantry. I mean luck in the precise technical sense of forces beyond skill or planning."),
      n("He shakes Serath's hand and leaves. He does not look back. Serath watches him go with the expression of someone filing a person in the 'uncertain' category for future reference."),
    ],
    [
      n("Gavrick has information that nobody else has: how the Spire's personnel move, because he has been one of them. The guard rotation. The method by which access is verified at each internal level. The location of the sections that Pellard's map labeled only with administrative codes."),
      d("GAVRICK","left", "neutral", "The section marked D-IV is the intake processing area. C-VII is the records storage. The section that doesn't appear on the administrative map at all is on the fourth level, north side. That is the extraction room."),
      d("MAREN",  "left", "thoughtful", "You've been in it."),
      d("GAVRICK","left", "neutral", "I oversaw four sessions in the first year. I stopped being assigned to that room after I requested a reassignment. They didn't ask why."),
      d("SERATH", "left", "neutral", "Why didn't they ask?"),
      d("GAVRICK","left", "neutral", "Because a person who has seen what is done in that room and requests reassignment is less surprising than a person who has seen it and doesn't."),
    ],
    [
      n("The plan is made over six hours on day fifteen. Not formal — built by people who know each other well enough by now to think together efficiently, revising the logic in real time as new information is introduced, with Maren serving as the axis around which the revision happens. The final form is not simple. Simple plans break when the first variable goes wrong. This plan has branches."),
      d("DORATH","left", "neutral", "I go in first. Ahead of everyone. If my entry causes a response, the rest of you know before you arrive."),
      d("MAREN", "left", "neutral", "And if it doesn't?"),
      d("DORATH","left", "neutral", "Then you follow at the intervals we discussed."),
      n("The plan is agreed. The intervals are memorized. Everyone knows their branch."),
    ],
    [
      n("Day sixteen. The plan begins. Dorath enters the Spire at the secondary access point Gavrick identified — a supply entrance used during construction that has been inadequately updated in the security rotation. She is inside for forty minutes before the first signal comes back through Leven."),
      d("LEVEN", "left", "neutral", "The message: clean entry. On schedule. Second signal in two hours."),
      n("Two hours. Everyone in the contact room above Leven's warehouse sits with the waiting. Maren practices. Brek does the slow version of his morning circuit — measured, deliberate, the version for when the body needs to be occupied while the mind is elsewhere. Ryn reads. Serath goes over the internal map for the fourteenth time."),
      n("The second signal comes exactly two hours later."),
    ],
    [
      n("Dorath's second signal: she is in. She is at C-VII. She has found something. The third signal will tell you what she found. Forty minutes. You wait."),
      n("No third signal comes. An hour. An hour and a half."),
      d("SERATH", "left", "neutral", "The absence of a signal is not yet diagnostic. There are four reasons a signal might not come and only one of them is bad."),
      d("ERAN",   "left", "neutral", "What are the other three?"),
      d("SERATH", "left", "neutral", "Signal delivery delayed in the chain. She moved locations and the new position doesn't have line of access to the relay. She found something large enough to occupy her attention completely."),
      d("KAEL",   "right", "neutral", "What's the fourth?"),
      n("Serath does not answer. The silence holds the fourth reason clearly enough."),
    ],

    // Spark 6: The entry — inside the Spire
    [
      n("Maren and Eran enter. The rest of the group watches from positions and does not watch — they hold their positions and they wait, and the watching is Brek's task, and the baton of information passes from Brek through Dorath through Leven to whatever signal Maren will send when she is in."),
      d("BREK",  "left",  "neutral", "They're through the door."),
      d("DORATH","left",  "neutral", "Time."),
      d("BREK",  "left",  "neutral", "Third hour, twelve minutes."),
      d("DORATH","left",  "neutral", "Junior staff credential check, as expected."),
      d("BREK",  "left",  "neutral", "No extended scrutiny visible. Normal pace through."),
      n("Normal pace through. They are inside. The next information comes from Leven in two hours — the first signal, if Maren has reached the reading room without incident. The two hours begin."),
      d("KAEL",  "right", "neutral", "What do we do?"),
      d("SERATH","left",  "neutral", "We hold position. We let the plan run at the speed the plan runs at. We do not try to run it faster."),
    ],

    // Spark 7: Dorath's assessment of the Voss contact on-site
    [
      n("In the second hour of waiting, Dorath does the work of not waiting by doing operational work instead. She has been processing the information about the senior Voss-network figure entering the building."),
      d("DORATH","left",  "neutral", "The senior figure's arrival changes one thing. The credential log in the Spire — my assessment was six days before review. With a senior operational person on-site, the review of recent entries may happen today. Not next week."),
      d("GAVRICK","left", "neutral", "Standard protocol when senior network staff visits is a facility review. Access logs, guard rotation logs, visitor credentials."),
      d("DORATH","left",  "neutral", "Which means Eran's name is in the entry log. And it will be reviewed today."),
      d("GAVRICK","left", "neutral", "Eran's name in the entry log reads as: an academic scholar using the public reading room. That is allowed. It is only alarming if someone connects his name to the network he has been running for thirty-five years."),
      d("DORATH","left",  "neutral", "Does Voss know his name?"),
      d("GAVRICK","left", "neutral", "Voss knows every significant actor in the eastern scholarly network. She has been watching it for thirty years."),
      n("Yes. She knows his name."),
    ],

    // Spark 8: The second signal
    [
      n("The second signal arrives at the two-hour mark. Leven: 'In position. Reading room. Company.' Company means there are practitioners in the room. Maren is waiting."),
      d("KAEL",   "right", "neutral", "Company. How long does she wait?"),
      d("SERATH", "left",  "neutral", "As long as it takes. The instruction for this was: she waits until the room is clear. That was built into the time estimate."),
      d("KAEL",   "right", "neutral", "The room may not clear."),
      d("SERATH", "left",  "neutral", "The reading room is a study space. People come and go. The probability of an extended occupied period is lower than the probability of a rotation."),
      d("KAEL",   "right", "neutral", "But not zero."),
      d("SERATH", "left",  "neutral", "Not zero. If the room remains occupied until close of access hours, she leaves without completing the placement and we reconsider."),
      n("He says 'we reconsider' in the specific tone of someone who has planned for a scenario they hope not to use but have planned for it thoroughly anyway."),
    ],

    // Spark 9: What the registry Dorath brought reveals
    [
      n("In the position room, Ryn reads through the registry Dorath retrieved from C-VII during her forty-eight hours inside the Spire. The registry is thick — the full intake documentation for both cohorts, including names, originating networks, and assessment codes that the Spire uses internally."),
      d("RYN",   "right", "quiet",   "The assessment codes. Do you know the Spire's taxonomy?"),
      d("GAVRICK","left", "neutral", "I was trained in it. Yes."),
      d("RYN",   "right", "quiet",   "What does this code mean?"),
      n("She shows him a sequence. He reads it."),
      d("GAVRICK","left", "neutral", "That is the code for a practitioner who showed — resistance. During the process. The code flags them for additional monitoring and a follow-up session."),
      d("RYN",   "right", "quiet",   "There are nine practitioners in the first cohort with this code. Nine out of thirty."),
      d("GAVRICK","left", "neutral", "Nine who pushed back."),
      d("RYN",   "right", "quiet",   "Nine who may still be pushing back. Who may recognize what Maren places in the reading room more readily than the others."),
      n("She closes the registry. Nine. That is the number they are specifically placing the method for."),
    ],

    // Spark 10: Gavrick's departure plan
    [
      n("Gavrick asks to speak with Dorath about his exit. He has held this question for the right moment and the right moment is now — before the placement, before anything can change, while there is still space for contingencies."),
      d("GAVRICK","left",  "neutral", "I will leave the city the day after the placement. Through my own route, not through your network."),
      d("DORATH", "left",  "neutral", "Agreed."),
      d("GAVRICK","left",  "neutral", "I want to give you three contacts before I go. People in the Voss network who are in the same position I was in two years ago. People who are deciding. If you reach them through the right channel, they may be useful to you."),
      d("DORATH", "left",  "neutral", "What's the right channel?"),
      d("GAVRICK","left",  "neutral", "A specific phrase that identifies the source as someone who left voluntarily and was not discovered. They will know what it means."),
      d("DORATH", "left",  "neutral", "You've been building this."),
      d("GAVRICK","left",  "neutral", "I've been maintaining it. For two years. People who are deciding need somewhere to decide toward."),
      n("Dorath takes the three names and the phrase. She will hold them carefully."),
    ],

    // Spark 11: The extended wait — what each person does
    [
      n("Three hours past the second signal. The third signal has not come. Each person in the position rooms manages the extended wait in the way that is specific to them."),
      n("Serath reviews the fourth-level map for the fifteenth time, this time annotating it against the registry data Ryn has been working through. Brek has exhausted his eastern alley circuit and is now doing the slow practice form that Maren taught early in the settlement — the one for when the body needs to move but the space is too small for anything else. Ryn has the registry fully annotated. She has flagged thirty-two names in red ink and nine names in blue."),
      d("KAEL",  "right", "neutral", "What's blue?"),
      d("RYN",   "right", "quiet",   "The nine resisters. What's red is what I want to talk to Dorath about when there's time."),
      d("KAEL",  "right", "neutral", "What is red?"),
      d("RYN",   "right", "quiet",   "Twenty-three practitioners in the first cohort whose assessment codes indicate full completion of the extraction with no resistance flag. The ones who accepted the orientation without pushback."),
      n("She sets the registry down."),
      d("RYN",   "right", "quiet",   "If Maren's placement works for the nine resisters, it may also work for some of the twenty-three. The thread doesn't care whether you accepted the orientation or fought it. The thread points the same direction regardless."),
    ],

    // Spark 12: Sira reaches through the practice
    [
      n("Sira, alone in the courtyard, has been practicing for the three hours of the extended wait. When you find her she is still. Not asleep — the quality of the stillness is different from sleep."),
      n("After a while she opens her eyes."),
      d("SIRA",  "right", "quiet",   "She found the location."),
      d("KAEL",  "right", "neutral", "Maren?"),
      d("SIRA",  "right", "quiet",   "I can feel it. Not precisely — not like receiving a message. But the method resonates differently now than it did an hour ago. Like a key in a lock, when the key finds the tumblers. Something has aligned."),
      d("KAEL",  "right", "neutral", "She hasn't placed it yet."),
      d("SIRA",  "right", "quiet",   "No. But she has found where to place it. The location is — present now. Like something that was waiting to be found has been found."),
      n("You take this to Serath. He does not dismiss it. He is a rigorous person and he takes seriously what rigorous practitioners report, even when it is not information he knows how to file."),
    ],

    // Spark 13: What Eran was doing while Maren placed
    [
      n("Maren and Eran come through the secondary exit. Eran is slower than when he went in — not injured, tired in the specific way of someone who has spent a long time managing a situation quietly. When they are inside and the door is secure, he explains what he was doing while Maren worked in the reading room."),
      d("ERAN",  "left",  "neutral", "The staff member in the reading room was a practitioner from the first cohort. Not a guard — assigned to the room as a junior researcher. Maren waited for them to be occupied. I kept them occupied."),
      d("MAREN", "left",  "neutral", "He talked to them for two hours."),
      d("ERAN",  "left",  "neutral", "I gave them a lecture on eastern scholarly notation, in considerable detail. I am not often in a position where my academic knowledge is the most operationally critical thing I have. Today it was."),
      d("KAEL",  "right", "neutral", "Did they notice anything?"),
      d("ERAN",  "left",  "neutral", "They were listening to a lecture on notation. No. They did not notice anything except that I have extensive knowledge of notation they had not previously encountered, which is accurate and which interested them genuinely."),
      n("Maren places something in the reading room. Eran teaches the person in the room for two hours while she does it. This is the shape of this operation."),
    ],

    // Spark 14: The placement described
    [
      n("That night, everyone in the same room. Maren explains what happened in the reading room. She explains it once, precisely, and does not repeat it."),
      d("MAREN", "left",  "neutral", "The placement required forty-seven additional minutes beyond the estimate because the room had a second practitioner working in a far alcove who I did not see when I entered. I completed the placement with them present, at a distance. The placement is not visible to a partial practitioner. It requires the thread to find it."),
      d("KAEL",  "right", "neutral", "What does it look like? The placement."),
      d("MAREN", "left",  "neutral", "Nothing. It does not look like anything. It is a structural presence in a specific location in the reading room. The way a held note is a presence in a room even after the instrument has stopped. The method completed, held in a place."),
      d("SERATH","left",  "neutral", "And when someone with the thread enters that room?"),
      d("MAREN", "left",  "neutral", "They will know something is there. They will not know what it is unless they follow it. Following it is the same as following the method to completion. The placement is the method, not a description of it. The thread leads them directly."),
      n("Directly. Not through instruction, not through study. The thread leads, and the person with it follows, or they don't."),
    ],

    // Spark 15: What comes after the placement
    [
      n("The question nobody has been asking, because the placement was the horizon: what now? The Spire is still standing. The third cohort enters in four days. The fourth cohort — the deployment — is eight weeks beyond that."),
      d("DORATH","left",  "neutral", "We leave."),
      d("MAREN", "left",  "neutral", "We observe the second cohort's entry first. Two days. Then we leave."),
      d("DORATH","left",  "neutral", "Why observe?"),
      d("MAREN", "left",  "neutral", "The second cohort's entry is the last point at which we have real-time information about the Spire's intake process. After we leave, everything we know about what happens here is secondhand. I want to see it directly once."),
      n("This is also: she has placed something in that building, and she wants to hold it in sight for two more days before she walks away and trusts what she has done to work on its own timeline. It is not sentimentality. It is what she does with things that matter to her: she holds them as long as she responsibly can and then she releases them."),
    ],
  ],

  w11: [
    [
      n("Dorath emerges from the secondary access point forty-eight hours after she entered. She is intact, composed, and carrying something in her coat that she does not show anyone until they are inside and the door is secure."),
      d("DORATH", "left", "neutral", "I'm fine. I had to hold position for twenty-two hours in C-VII because the guard rotation was extended after a shift change. I could not signal. I am fine."),
      d("MAREN",  "left", "neutral", "And what you found?"),
      d("DORATH", "left", "neutral", "Three things. Let me put them in order."),
      n("She puts them in order. The first is a document from the administrative records — the Spire's full intake registry going back to the first cohort. The second is a map of the fourth-level north section that goes beyond what Pellard's administrative map showed. The third is a name."),
    ],
    [
      n("The name is Voss. Not a person's name — not the person Maren has been describing as the network's authority for years, who seems to be an institutional identity more than an individual. A person. A woman. Specific. Listed as the Spire's chief academic administrator. Present on the premises three days a week."),
      d("MAREN",  "left", "thoughtful", "She's here."),
      d("DORATH", "left", "neutral", "Based on this registry, she was here two days ago."),
      d("SERATH", "left", "neutral", "Not a figurehead. On site."),
      d("MAREN",  "left", "thoughtful", "No. Never a figurehead. I should have assumed."),
      n("Something resolves in Maren's expression. Not relief — acknowledgment. The kind of acknowledgment that comes from having had a suspicion for a long time and then finding it confirmed."),
    ],
    [
      n("Gavrick reads the fourth-level map. He reads it twice, and his reading changes between the first and second pass in a way that is visible."),
      d("GAVRICK","left", "neutral", "The section I knew as the extraction room — it is smaller than this indicates. There is a section adjacent to it that I was not aware of."),
      d("SERATH", "left", "neutral", "What is it?"),
      d("GAVRICK","left", "neutral", "According to this map — which uses designation codes I recognize from the administrative taxonomy — it is a preparation room. Preceding the extraction."),
      d("MAREN",  "left", "thoughtful", "Where people arrive before they go into the extraction."),
      d("GAVRICK","left", "neutral", "Or where they are held, if the extraction requires — extended preparation."),
      n("Extended preparation. Everyone holds this quietly."),
    ],
    [
      n("Brek returns from his afternoon walk with news: the secondary access point has been updated. The security gap Gavrick identified is closed. The Spire's outer security rotation has been tightened."),
      d("BREK",  "left", "neutral", "Not dramatically. Not obviously. But tightened. Three additional positions on the east and north faces."),
      d("DORATH","left", "neutral", "They know someone was inside."),
      d("MAREN", "left", "neutral", "They may know. Or they are responding to the change in Orin's reporting. Either way — the window we had has narrowed further."),
      d("KAEL",  "right", "neutral", "How far does it narrow before it closes?"),
      d("MAREN", "left", "neutral", "We have two days before the second cohort's intake begins. After that, the Spire will be in active processing and the security context changes entirely."),
    ],
    [
      n("The night before the second cohort's intake begins. Everyone in the contact room. Maren has been reading the intake registry Dorath brought out — not for strategy, or not only for strategy. For the names. The thirty-two people in the second cohort are named in the registry. She reads each name slowly."),
      d("SIRA",  "right", "quiet", "You know some of them."),
      d("MAREN", "left",  "quiet", "Some. Not all. Three from the Archive's extended network. One who was a student eight years ago and didn't finish."),
      d("SIRA",  "right", "quiet", "Can we get them out?"),
      d("MAREN", "left",  "quiet", "No. Getting them out is not the right frame. What needs to happen is not individual rescue."),
      n("She folds the registry carefully. The names stay in the room."),
    ],

    // Spark 6: Voss on site — what Gavrick knows
    [
      n("The morning after the placement. Dorath has confirmed through Brek's observation that the senior Voss-network figure entered and exited the Spire in a single day — gone by evening. But Gavrick has information about what a same-day visit means."),
      d("GAVRICK","left",  "neutral", "A same-day visit from senior operational staff is an inspection visit. Not a working visit — those are multi-day. She was here to receive a report and assess the program's status."),
      d("DORATH", "left",  "neutral", "The access log review."),
      d("GAVRICK","left",  "neutral", "Would have been part of her inspection. Eran's name in the entry log — if she reviewed it, she saw it."),
      d("SERATH", "left",  "neutral", "And?"),
      d("GAVRICK","left",  "neutral", "Eran's academic credential is legitimate. His presence in the public reading room is permitted. She may have flagged it for follow-up. She may have filed it as expected and moved on. I don't know which."),
      n("She may have filed it. She may have sent an instruction to watch the academic entrance for his return. Both are equally possible and there is no way to determine which without information they do not have."),
    ],

    // Spark 7: The second cohort enters
    [
      n("The observation Maren requested: the second cohort's entry into the Spire. They watch from the position Maren chose — not directly facing the entrance, at an angle that makes looking like not-looking. The cohort arrives in small groups over two days. Ordinary people, moving through an extraordinary door."),
      d("RYN",   "right", "quiet",   "They look like scholars. Which they are."),
      d("SERATH","left",  "neutral",  "They are scholars. The program doesn't recruit people who are performing scholarly work. It recruits people who are actually doing it."),
      d("RYN",   "right", "quiet",   "Which means they have the thread."),
      d("SERATH","left",  "neutral",  "Yes. And after the program completes, they will have the thread redirected, and they will believe the redirection is their own conviction. And they will go back into the eastern scholarly world carrying that."),
      n("Three people enter the Spire's main entrance as you watch. They do not look back. Whatever they have come for, they believe they are going toward something genuine. They are. The program is genuine. What it does with them is the problem."),
    ],

    // Spark 8: Eran's credential — the follow-up comes
    [
      n("Day twenty-two in the city. An inquiry arrives at the eastern academic exchange office. Addressed to Eran by name. From the Spire's administrative staff."),
      d("ERAN",  "left",  "neutral", "The inquiry asks whether I am planning to return to the reading room and requests that I confirm my visit through the standard academic appointment process."),
      d("MAREN", "left",  "neutral", "Standard appointment process means logging your purpose in advance."),
      d("ERAN",  "left",  "neutral", "And provides them with what they didn't have before: official notification of when I will be in the building. This is how they invite someone back on terms they control."),
      d("DORATH","left",  "neutral", "Can you decline?"),
      d("ERAN",  "left",  "neutral", "I can decline. A decline, from a registered scholar who made an unannounced visit, is an unusual thing to decline. The subsequent attention it draws is undesirable."),
      d("MAREN", "left",  "neutral", "When were you planning to leave the city?"),
      d("ERAN",  "left",  "neutral", "I had planned on your timeline. But this changes my timeline. I should leave before they expect a response."),
      n("He is gone by the following morning."),
    ],

    // Spark 9: Dorath on what the fourth cohort represents
    [
      n("Two days after the second cohort's entry observation. The group is still in the city, holding the new safe house positions, planning the departure. Dorath raises the fourth cohort question in the way she raises things she has been holding for a while: directly."),
      d("DORATH","left",  "neutral", "The fourth cohort. The deployment cohort. I want to name what it means if it completes."),
      d("MAREN", "left",  "neutral", "Go ahead."),
      d("DORATH","left",  "neutral", "Thirty-two practitioners placed into administrative positions across the eastern structure, oriented to the network's purpose. Not by coercion — by conviction they believe is their own. In five years those thirty-two practitioners are mid-level administrators in twelve different institutions. In ten years some of them are senior."),
      d("SERATH","left",  "neutral", "And their conviction shapes policy."),
      d("DORATH","left",  "neutral", "Their conviction shapes everything their institutions touch. The Spire doesn't need to be visible for this to happen. The work happens through the people it has oriented."),
      n("The long-term shape of this, laid out plainly, is not comforting."),
      d("MAREN", "left",  "neutral", "What we placed in the reading room disrupts this."),
      d("DORATH","left",  "neutral", "If it works."),
      d("MAREN", "left",  "neutral", "If it works."),
    ],

    // Spark 10: Serath and Maren on what comes next
    [
      n("Serath and Maren, in the walled courtyard, the morning before departure. The conversation is practical — they are planning the road west — but it becomes something larger."),
      d("SERATH","left",  "neutral", "The Unnamed Third. Under the Archive. You've been thinking about it since the settlement."),
      d("MAREN", "left",  "neutral", "Since Tal's preliminary notes. What she found changes the shape of what is possible."),
      d("SERATH","left",  "neutral", "If the Unnamed Third is what she believes it is — the original completion, placed by the person who completed first — then accessing it is not scholarship. It is not research."),
      d("MAREN", "left",  "neutral", "No. It is the same thing that the first cohort's nine resisters will be doing when they follow the thread in the reading room. Following to completion. Except the original placement is five centuries older and has been waiting under a building for two hundred of those years."),
      d("SERATH","left",  "neutral", "Can we access it?"),
      d("MAREN", "left",  "neutral", "I believe we can. The Archive burned but what is under the Archive is stone, not wood. Tal's notes say the entrance is not from the Archive's basement. It is older than the Archive's foundation."),
    ],

    // Spark 11: Brek's assessment of the group's condition
    [
      n("Brek does the same thing on departure-minus-one-day that he does before any sustained physical effort: he assesses the group's condition the way he would assess his own before a long push."),
      d("BREK",  "left",  "neutral", "We have been here twenty-three days. In three different safe house positions. Without adequate sleep for at least twelve of those days. Before we put everyone on a road for five days, I want to say: we need two days of rest before we leave, not one."),
      d("DORATH","left",  "neutral", "We don't have two days. The registry check is on a weekly cycle. Eran's departure may have drawn attention. Every additional day in this city is additional exposure."),
      d("BREK",  "left",  "neutral", "I understand the operational argument. I'm giving you the physical argument. People who are operating on twelve days of partial sleep for a five-day road walk make errors. Errors on the road have consequences."),
      n("Nobody immediately answers him. He is correct. The operational pressure is also correct. Both things are true."),
      d("MAREN", "left",  "neutral", "One full day of rest. Departure the morning after."),
      d("BREK",  "left",  "neutral", "One day is better than none."),
    ],

    // Spark 12: What the nine resisters will find
    [
      n("Ryn has been thinking about the nine practitioners with resistance flags in the registry. She comes to you with her thinking, the way she does when she needs to say something to someone before she can decide whether it's true."),
      d("RYN",  "right", "quiet",   "The nine who resisted. They felt what was happening. They recognized that something was being — taken. The practitioner that Gavrick described in the extraction room used that word."),
      d("KAEL", "right", "neutral", "Yes."),
      d("RYN",  "right", "quiet",   "If the thread still points in the right direction for those nine — if the redirection didn't hold as completely as the assessment codes suggest — then when they find Maren's placement in the reading room, they will recognize it. Not as an external thing. As something their thread was already pointing toward."),
      d("KAEL", "right", "neutral", "They've been looking for it."),
      d("RYN",  "right", "quiet",   "Without knowing they were looking. Yes. The placement is — it will feel like finding something they had been reaching for. That is how the method works. The thread is not looking for a lesson. It is looking for the thing it was already reaching toward."),
      n("She is quiet for a moment."),
      d("RYN",  "right", "quiet",   "I hope they find it soon."),
    ],

    // Spark 13: Orin's farewell
    [
      n("Orin leaves the safe house on departure-minus-one-day to begin his own preparations. His farewell to the group is brief. He is not a person who makes farewells large, which is either because he is genuinely not given to sentiment or because he understands that what he did means he does not have the standing for a large farewell. You cannot tell which."),
      d("ORIN",  "left",  "neutral", "I know what I cost you. I don't have a way to pay it back that isn't what I told Maren I would do."),
      d("MAREN", "left",  "neutral", "Then do it."),
      d("ORIN",  "left",  "neutral", "If it works — if what I feed them is useful — you won't know from where you are. But I'll know it worked if a certain thing doesn't happen to me."),
      n("He does not say what the certain thing is. He does not need to."),
      d("DORATH","left",  "neutral", "If you change your mind about this—"),
      d("ORIN",  "left",  "neutral", "I won't."),
      n("He goes. The group holds the space he leaves."),
    ],

    // Spark 14: The rest day
    [
      n("The rest day. One day where the only task is restoration. Maren has said it plainly: what comes next — the road west, the Archive's ruins, whatever is under the Archive — requires the practice to be at full capacity. A degraded practice is not useful. A restored one is."),
      n("Each person does what restoration looks like for them. Brek sleeps for eleven hours and runs his eastern alley circuit three times in the afternoon with the focused pleasure of someone who has been deprived of adequate movement. Ryn reads. Serath holds the practice. Dorath reviews the departure route map until she can recite it. Sira works in the courtyard."),
      d("KAEL",  "right", "neutral", "What do I do with a rest day?"),
      d("MAREN", "left",  "neutral", "Whatever the practice indicates. Not whatever your thinking about what comes next produces. The practice. What does it tell you it needs?"),
      n("You hold the question. The practice answers it in the way the practice always answers things: not in words. In a clear signal of where the attention wants to go. You spend the day there."),
    ],

    // Spark 15: Departure eve — what was accomplished
    [
      n("Departure evening. The city outside the warehouse walls continues its careful business. The Spire stands where it has stood. Nothing visible has changed."),
      d("SERATH","left",  "neutral", "We didn't destroy it."),
      d("MAREN", "left",  "neutral", "No."),
      d("SERATH","left",  "neutral", "We didn't expose it."),
      d("MAREN", "left",  "neutral", "No."),
      d("SERATH","left",  "neutral", "We placed something in its reading room that may, in the coming months, cause some of its practitioners to complete a process that the program left incomplete. May."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("SERATH","left",  "neutral", "I want to say that I think this is the right thing to have done. I'm not certain. But I think so."),
      d("MAREN", "left",  "neutral", "The certainty isn't available until we can observe the outcome. The decision had to be made without certainty. Yes. I think so too."),
      n("Tomorrow: the gate, the road west, the counting stations in reverse, the border settlements going the other direction. The Spire in their backs. The ruins ahead."),
    ],
  ],

  w12: [
    [
      n("Maren tells the group the plan on the morning of day eighteen. It is not the plan everyone expected. The plan everyone expected was some version of entering the Spire, accessing the extraction room, disrupting the program. This plan is different."),
      d("MAREN", "left", "neutral", "We are not here to destroy the Spire. We cannot destroy the Spire with what we have. And destroying the Spire addresses the symptom, not the condition. The condition is that what Voss has built here is a machine for producing a controlled version of what the method produces when completed. The only way to make that machine irrelevant is to make what it produces — the controlled, partial, extraction-based version — obsolete."),
      d("SERATH","left", "neutral", "You want to complete the method. Inside the Spire."),
      d("MAREN", "left", "neutral", "Not inside it. In a place where what we complete is visible to the Spire's structure. Where a practitioner who has been through the program would be able to find it."),
    ],
    [
      n("The logic: the Spire's program produces people who have been through part of the method. Part of the method creates a thread. The thread, once created, can lead further if there is something to lead to. If what Maren completes is placed in a location the Spire's practitioners access, those practitioners — who already have the thread — will find it. And following the thread to completion is not under the Spire's control."),
      d("GAVRICK","left", "neutral", "You want to seed the Spire's own practitioners with something that completes what the program leaves incomplete."),
      d("MAREN",  "left", "neutral", "Yes."),
      d("GAVRICK","left", "neutral", "That is—"),
      n("He stops. Considers."),
      d("GAVRICK","left", "neutral", "I want to understand the mechanism before I say anything further. But yes. I understand the intent."),
    ],
    [
      n("The location: the Spire's central reading room. A space all practitioners pass through as part of the program's curriculum. Open to the cohort. Visible — not to everyone, but to anyone who has the method's early stages completed, which is the point."),
      d("SERATH", "left", "neutral", "Getting Maren into the reading room requires an authorized access credential and a reason to be there."),
      d("MAREN",  "left", "neutral", "Eran has an academic credential that is still active in the eastern scholarly registry. It predates the Spire. It would allow entry as a visiting academic."),
      d("ERAN",   "left", "neutral", "It would. I used it here three years ago, before the Spire's access procedures became what they are."),
      d("MAREN",  "left", "neutral", "Could it work now?"),
      d("ERAN",   "left", "neutral", "There is a version of that question I can answer with yes. Whether the version that applies to tomorrow is that version — that, I cannot say with certainty."),
    ],
    [
      n("The night before the entry attempt. Maren works alone with the fragments and the fourteenth's text. Not preparing — she says she does not need to prepare. She says what she is doing is ensuring that what she will place is placed with the specificity the method requires, which means she needs the night to hold it precisely."),
      d("KAEL",   "right", "neutral", "Can I stay?"),
      d("MAREN",  "left",  "quiet", "You can stay."),
      n("You sit in the room while she works. The lamp is low. The fragments are arranged in the specific order she always arranges them — fourteen in a sequence that corresponds to the instruction set they carry. She is not reading them. She is holding what they describe. You watch a person hold a lifetime's work and not let it become weight."),
      d("MAREN",  "left",  "quiet", "I want to say one thing. For when this is over."),
      d("KAEL",   "right", "neutral", "Mm."),
      d("MAREN",  "left",  "quiet", "Thank you for staying in the Archive's final weeks when you had reason to leave. It mattered."),
    ],
    [
      n("The morning of the entry. The plan is in motion. Dorath has the route confirmed. Eran has the credential ready. Gavrick has described the internal protocol three times to everyone who needs to know it. Brek and Ryn have positions at two locations on the outside that allow them to receive a signal from Leven if anything changes externally. Serath and you are inside the city, at two points Gavrick specified as the fastest access to the Spire's secondary exit if extraction is needed."),
      n("Maren looks at the group one final time before she goes."),
      d("MAREN", "left", "neutral", "This is what the Archive was for."),
      n("She walks with Eran toward the Spire. You watch them go until the turn in the street takes them."),
    ],

    // Spark 6: Leaving the city — the gate going west
    [
      n("The gate going west is different from the gate going east. A different shift, different rhythm. The documentation is the same. Nine people registered as scholars, departing after their academic business is concluded. The stamp is the same. The direction is opposite."),
      d("DORATH","left",  "neutral", "Keep pace through. Same as entry."),
      n("You keep pace through. The gate official stamps the departure documentation and writes the exit time. You are outside. The city is behind you. The Spire is somewhere behind the gate in the direction you are not looking."),
      d("BREK",  "left",  "neutral", "We're out."),
      d("SERATH","left",  "neutral", "We're out."),
      n("Three words that carry more weight than three words usually do. You are on the road heading west and the city is receding. Nothing follows you out the gate except the documentation notation that nine scholars of no particular interest have concluded their visit."),
    ],

    // Spark 7: The road west, first day
    [
      n("The road west feels different from the road east in a way that the legs know before the mind does. Going toward something and going from something produce different rhythms even when the legs are doing the same work. The group's pace is the same. The group's posture is different."),
      d("GAVRICK","left",  "neutral", "I leave at the settlement junction."),
      d("MAREN",  "left",  "neutral", "We know."),
      d("GAVRICK","left",  "neutral", "Dorath has the contacts and the phrase. If she uses them through the right channel, two of the three will likely respond."),
      d("DORATH", "left",  "neutral", "I'll use them when the time is right."),
      d("GAVRICK","left",  "neutral", "The time is right when you need something and I'm not available to be asked. Which I won't be after today."),
      n("He says this without apparent difficulty. The matter-of-fact quality of someone who has thought through the logistics of their own departure and found it manageable."),
    ],

    // Spark 8: Gavrick's goodbye
    [
      n("The settlement junction is a carved post at the road's fork — a distance marker, eastern script, the same kind that marks the beginning of the paved road. Gavrick stops at the post. The group stops."),
      d("GAVRICK","left",  "neutral", "The description Eran gave of what to look for — I found it. The group is what he said it was."),
      n("He says this to all of them, but in the way of someone completing a sentence they started a long time ago."),
      d("ERAN",   "left",  "neutral", "Yes."),
      d("GAVRICK","left",  "neutral", "Good."),
      n("He takes the left fork. The group takes the right. You watch him until the fork's angle takes him out of sight. He does not look back, which is either because he has processed the departure or because he is already thinking about what comes next. With Gavrick, both are possible simultaneously."),
    ],

    // Spark 9: Maren and Ryn compare notes on the road
    [
      n("Third day west. Maren and Ryn walk together for most of the afternoon. You are close enough to hear some of what passes between them."),
      d("RYN",   "right", "quiet",   "The administrative records I brought from the Archive. I've mapped what I found against everything Eran and Pellard provided."),
      d("MAREN", "left",  "neutral", "Show me."),
      n("Ryn unfolds a page — dense, her small hand, a diagram that interconnects names and institutions and dates. Maren reads it without speaking. She reads it a second time."),
      d("MAREN", "left",  "neutral", "This is complete."),
      d("RYN",   "right", "quiet",   "It's complete as far as the records go. There are three gaps I can't fill from what I have."),
      d("MAREN", "left",  "neutral", "I can fill one of them."),
      d("RYN",   "right", "quiet",   "Which one?"),
      d("MAREN", "left",  "neutral", "The gap in the founding agreement. The specific clause about completed practitioners."),
      n("She tells Ryn what the clause says. Ryn's pen moves. The gap closes."),
    ],

    // Spark 10: Serath and Brek on the road
    [
      n("Serath and Brek have not spoken much during twenty-three days in the city. Different positions, different functions, different routines. On the road they end up at the same pace for a stretch of open country."),
      d("BREK",   "left",  "neutral", "The physical practice. What you do — it's not the same as what I do."),
      d("SERATH", "left",  "neutral", "No."),
      d("BREK",   "left",  "neutral", "But the method is the same method."),
      d("SERATH", "left",  "neutral", "The method works through whatever the person's primary idiom is. For you: physical. For me: informational. The structure it builds is the same structure."),
      d("BREK",   "left",  "neutral", "How do you know?"),
      d("SERATH", "left",  "neutral", "Because what I carry now — what the completed practice produced — it has the same quality that Maren describes and that Sira describes and that you describe when you talk about the body after sustained work. The quality of something structural rather than held."),
      d("BREK",   "left",  "neutral", "Like it doesn't need carrying anymore."),
      d("SERATH", "left",  "neutral", "Yes."),
      n("Brek nods. The nod of someone who has found a description that exactly matches their experience."),
    ],

    // Spark 11: The border settlement on the way back
    [
      n("The first border settlement going west. Different from the border settlement going east in the way that all familiar places are different when you arrive from an unexpected direction. You know this place. You passed through it weeks ago, anxious about the road ahead. Now it is a waypoint, a rest, a confirmation that you are correctly on the way back."),
      d("DORATH","left",  "neutral", "My contact here. She was absent when we came east."),
      d("MAREN", "left",  "neutral", "Is she here now?"),
      d("DORATH","left",  "neutral", "I won't know until we've stopped. Her signal location is unchanged — if she's active, the signal will be there."),
      n("The signal is there. Dorath's contact has returned to her position, apparently from an urgency she declined to explain even now. Dorath reads the brief message the signal leaves and exhales with the specific quality of someone releasing forty-two days of held uncertainty."),
      d("DORATH","left",  "neutral", "She's fine. The absence was a family situation. She is sorry for the disruption."),
      d("SERATH","left",  "neutral", "Forty-two days of uncertainty about a family situation."),
      d("DORATH","left",  "neutral", "Yes. That is what operational security looks like from the inside."),
    ],

    // Spark 12: What the fourth cohort means in concrete terms
    [
      n("Third day west. Dorath catches up with Maren on the road with a question she has been preparing."),
      d("DORATH","left",  "neutral", "The fourth cohort. Thirty-two practitioners placed into administrative positions across the eastern structure, oriented to the network's purpose. In five years those thirty-two practitioners are mid-level administrators in twelve different institutions."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("DORATH","left",  "neutral", "In ten years some of them are senior. Their conviction shapes everything their institutions touch. And the Spire doesn't need to be visible for this to happen — the work happens through the people it has oriented."),
      d("MAREN", "left",  "neutral", "That is the long-term shape of it."),
      d("DORATH","left",  "neutral", "What we placed in the reading room disrupts this only if the resisters find it and complete the method before they are placed into those positions. The timeline is very tight."),
      d("MAREN", "left",  "neutral", "I know."),
      d("DORATH","left",  "neutral", "So what do we do about the short-term situation?"),
      n("Maren does not answer immediately. The answer is under the Archive's ruins, and it is not yet clear what the answer is."),
    ],

    // Spark 13: Sira on the placement's propagation
    [
      n("Sira walks at the front of the group on the fourth day west. This has become her default position since the city — the practice in motion, moving ahead."),
      d("SIRA",  "right", "quiet",   "If someone in the first cohort follows the thread to completion — completes the method through what Maren placed — they are then a completed practitioner. And a completed practitioner can do what Maren did. They can place."),
      d("KAEL",  "right", "neutral", "They can place the method somewhere else."),
      d("SIRA",  "right", "quiet",   "Not the same way Maren did — that required years of preparation. But a simpler version. One completed practitioner working with the thread of someone who already has the early stages."),
      n("The Spire extracts. What Maren placed offers. The difference is one of direction. An extraction machine goes outward and takes. An offering stays still and waits for the person with the thread to come to it."),
      d("KAEL",  "right", "neutral", "How long before the chain can reach the fourth cohort?"),
      d("SIRA",  "right", "quiet",   "If someone in the first cohort completes in the next three weeks and places it for the second cohort — and someone in the second cohort completes before the fourth enters — then yes. But that requires two completions on a very compressed timeline."),
    ],

    // Spark 14: Ryn's fear, said plainly
    [
      n("Day four west, late afternoon. Ryn says something she has been holding for a long time."),
      d("RYN",   "right", "quiet",   "I'm afraid it won't work."),
      d("KAEL",  "right", "neutral", "The placement."),
      d("RYN",   "right", "quiet",   "All of it. The Spire will complete the fourth cohort. The deployment will happen. The placement will work for three practitioners out of sixty-two if we're fortunate. And the Unnamed Third — we don't know what accessing it produces or if it produces anything useful in the timeframe we need."),
      d("KAEL",  "right", "neutral", "You've been holding that since the city."),
      d("RYN",   "right", "quiet",   "Since Maren explained the plan, actually. I held it because the time to say it was not when we were inside a city with a window closing. Now is the time."),
      n("You walk. The fear is real. It is also compatible with continuing."),
      d("KAEL",  "right", "neutral", "Maren knows all of that."),
      d("RYN",   "right", "quiet",   "Yes. She's doing it anyway. That's either wisdom or something else and I can't tell which."),
    ],

    // Spark 15: The counting station watches east
    [
      n("The second border settlement going west. The counting station at its eastern approach. The same guard who wrote the longer notation going east is on shift. He recognizes the group. He checks the departure ledger from the city."),
      d("GUARD", "left",  "neutral", "Returning from the city."),
      d("ERAN",  "left",  "neutral", "Yes. The academic exchange concluded."),
      n("The guard writes his notation. You are through. But as you clear the station, you notice: the guard looks east, not west, as you pass. He is not watching you leave. He is watching what is behind you on the road."),
      d("SERATH","left",  "quiet",   "He wasn't looking at us."),
      d("DORATH","left",  "quiet",   "No."),
      d("SERATH","left",  "quiet",   "He was looking for something coming behind us on the road east."),
      n("Someone has told the counting station to watch the road east for something coming from the city. The watch is recent — newer than the group's passage through this station weeks ago. Something changed while they were in the city. Something may be following west."),
    ],
  ],

  w13: [
    [
      n("The wait. Ryn at position one. Brek at position two. You and Serath at the secondary exit. Gavrick in the contact room, which is the communication hub. Dorath moving between them."),
      n("The first signal from Leven: entry successful. Maren and Eran are inside."),
      n("The second signal, two hours later: they are in the reading room."),
      n("The third signal does not come at the expected time."),
    ],
    [
      n("An hour past the third signal's expected time. Serath: 'Hold position.' His voice has the flat quality it gets when he is managing something he does not want to manage."),
      d("KAEL",   "right", "neutral", "What does delayed mean in this case?"),
      d("SERATH", "left",  "neutral", "It means either the placement is taking longer than estimated or there is a complication. Both are possible."),
      d("KAEL",   "right", "neutral", "How long do we hold before we move?"),
      d("SERATH", "left",  "neutral", "Maren's instruction was: until the fourth signal, regardless of timing. We do not move until the fourth signal."),
      n("You hold. The secondary exit is a narrow door in a wall you have been looking at for two hours. The door does not open."),
    ],
    [
      n("The fourth signal arrives three hours and forty minutes after the third was expected. Leven: 'Complete. Exit in progress.'"),
      n("Maren and Eran come through the secondary exit at dusk. Maren is intact. Eran is intact but slower, tired in the specific way of someone who has spent a long time managing a situation quietly."),
      d("MAREN", "left", "neutral", "It is done."),
      n("She says it the same way she says everything — precisely. Not with relief, not with triumph. Stating a fact that has just changed the configuration of several things. She looks at you and Serath and at the secondary exit door closing behind her, and then she begins to walk."),
    ],
    [
      n("That night. Everyone in the same room, which is rare — the distributed safe house arrangement has kept the group in fragments for days. Maren explains what happened in the reading room."),
      d("MAREN", "left", "neutral", "The placement required more time than estimated because the room had two practitioners from the first cohort working in it when we arrived. I waited. When they left I worked."),
      d("KAEL",  "right", "neutral", "Could they have seen what you were doing?"),
      d("MAREN", "left", "neutral", "No. The placement is not visible to a partial practitioner. It requires the thread to find it. If they have the thread, they will find it in time. If they don't, they won't see it regardless."),
      d("SERATH","left", "neutral", "How long before someone finds it?"),
      d("MAREN", "left", "neutral", "That I cannot predict. Weeks. Months. The method works on its own timeline, not ours."),
    ],
    [
      n("Gavrick's departure, the next morning. He has a route out of the city that does not use Dorath's network — his own, the remnant of the Voss network he has been quietly unwinding for the past year. He gives Dorath three specific contacts who can be trusted, with verification codes, and then he gives you his version of a goodbye."),
      d("GAVRICK","left", "neutral", "The thing Eran described — the description of what to look for. I was looking for it because Eran asked me to. I found it."),
      d("KAEL",   "right", "neutral", "Does it change what you do next?"),
      d("GAVRICK","left", "neutral", "It changes what I believe is possible. Whether that changes what I do — I haven't decided yet. But the space for that decision is wider now than it was."),
      n("He leaves by the morning's first light. You do not see him again in this city."),
    ],

    // Spark 6: The rider on the road behind
    [
      n("Brek checks behind on the second day west. The road behind is not empty. A single rider, distant, not closing — maintaining a distance that is consistent enough to be deliberate."),
      d("BREK",  "left",  "neutral", "Same rider as yesterday. Same distance. They've been pacing us."),
      d("DORATH","left",  "neutral", "Not closing means not urgent. Pacing means they want to know where we go, not intercept us here."),
      d("SERATH","left",  "neutral", "The counting station guard watching east. This rider. Someone knows we're on the road west."),
      d("MAREN", "left",  "neutral", "What does maintaining distance for two days indicate?"),
      d("DORATH","left",  "neutral", "Observation only. They have instructions to track, not to approach. Which means whoever gave the instructions wants to know our destination."),
      d("KAEL",  "right", "neutral", "Our destination is the Archive's ruins."),
      n("Dorath's expression says: yes, and that is the problem. Someone following them to the Archive's ruins is someone who will then know where they are looking — and possibly why."),
    ],

    // Spark 7: How to lose a rider
    [
      n("Dorath proposes the solution at the evening camp on day two. She proposes it with the efficiency of someone who has thought through three options and chosen the one with the least cost."),
      d("DORATH","left",  "neutral", "The rider is maintaining distance to avoid triggering a response. If we move at night — a short deviation, three miles, then return to the road from a different approach — we lose them in the dark."),
      d("BREK",  "left",  "neutral", "Night travel on unfamiliar road."),
      d("DORATH","left",  "neutral", "Two miles of road we know, then one mile of cross-country. Serath has walked this section. The terrain is manageable."),
      d("SERATH","left",  "neutral", "Manageable. Not comfortable."),
      d("MAREN", "left",  "neutral", "Do it."),
      n("The night move happens without incident, which means Brek's assessment of 'manageable' was correct. When you regain the road from the northern approach, the rider, if they are looking for the camp you left, will find an empty space and a cold fire."),
      d("BREK",  "left",  "neutral", "Two hours to camp. I'll check behind at first light."),
      d("DORATH","left",  "neutral", "Thank you."),
    ],

    // Spark 8: The road through familiar territory
    [
      n("Day three west. The road begins to be familiar. The specific rock formation at the road's north edge that Serath identified as a landmark on the way east. The stream crossing where you stopped for water. The stand of bare trees. Everything in reverse order, running backward."),
      d("RYN",  "right", "quiet",   "I keep seeing it forward."),
      d("KAEL", "right", "neutral", "The road east."),
      d("RYN",  "right", "quiet",   "The first time we walked this. The cold. Brek's tracks in the frost. The feeling of not knowing what was ahead. And now I know what's ahead because I've been there."),
      d("KAEL", "right", "neutral", "It's the same road."),
      d("RYN",  "right", "quiet",   "The road hasn't changed. We have."),
      n("This is true in a way that is not metaphorical. The practice, completed, changes the structure of how the road is experienced — not more dramatically, not less. More precisely. What you are walking through now has more detail than what you were walking through going east."),
    ],

    // Spark 9: Maren on what comes after the ruins
    [
      n("Day four west. Maren speaks on the road about what she thinks the Unnamed Third will show them. Not what she hopes — what she thinks, based on the fragments and Tal's preliminary account."),
      d("MAREN", "left",  "neutral", "The person who completed the method first placed something under a building they knew would be built over. Not randomly — deliberately. They chose a location that was central, stable, and surrounded by structures that would preserve it."),
      d("KAEL",  "right", "neutral", "They knew the Archive would be built there."),
      d("MAREN", "left",  "neutral", "They knew a building would be built there. The Archive was built much later. The Archive was built over the original placement because the original placement made the ground stable — it left something in the stone that made the site appropriate for a collection of this kind."),
      d("SERATH","left",  "neutral", "The Archive was built on it on purpose?"),
      d("MAREN", "left",  "neutral", "Not knowingly, I believe. The founders of the Archive chose the site for practical reasons — stability, central location, the stone quality. They didn't know why those qualities existed. They chose well without knowing what they were choosing."),
      n("Under the building that burned, something that made the site appropriate is still there, unchanged by fire."),
    ],

    // Spark 10: Dorath on the long game
    [
      n("Day four. Dorath walks beside Maren for an hour, which is the pattern of Dorath having thought through something and arrived at a conclusion she needs to test against another person's thinking."),
      d("DORATH","left",  "neutral", "The long game."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("DORATH","left",  "neutral", "We have disrupted the Spire's short-term control of the method's completion. We may have seeded independent completion in some practitioners. We are going to access whatever the Unnamed Third is and see if it changes what is possible. None of this stops the fourth cohort."),
      d("MAREN", "left",  "neutral", "No."),
      d("DORATH","left",  "neutral", "So in the short term, the deployment still happens. In the medium term, some practitioners may complete and begin to work against the deployment from inside. In the long term — the Unnamed Third changes the long term."),
      d("MAREN", "left",  "neutral", "If we can access it."),
      d("DORATH","left",  "neutral", "If we can access it. And if what is there is what Tal thinks it is."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("DORATH","left",  "neutral", "A lot of 'if.'"),
      d("MAREN", "left",  "neutral", "Yes. That is also the honest assessment."),
    ],

    // Spark 11: Brek's first light check — no rider
    [
      n("First light on day three after the night move. Brek runs behind before the group is fully assembled and returns with a report that is short."),
      d("BREK",  "left",  "neutral", "No rider. Road behind is clear for three miles."),
      n("The group receives this. Not with relief — with the flat acknowledgment of people who have been operating under observation and have successfully stopped being observed."),
      d("DORATH","left",  "neutral", "They may have given up. Or they reported our last known position and transferred the follow to someone further along the road."),
      d("BREK",  "left",  "neutral", "The road ahead?"),
      d("DORATH","left",  "neutral", "Clear."),
      d("BREK",  "left",  "neutral", "Then we're between."),
      n("Between observation and whatever is ahead of them on the road. The gap between is not comfortable, but it is the best available position. They use the gap to move faster."),
    ],

    // Spark 12: What the Archive's ruins will look like
    [
      n("Eran walks with Maren on the final day before the city. He has been to the Archive's ruins once since the fire — a brief assessment, enough to know whether access is possible and how the city has managed the site."),
      d("ERAN",  "left",  "neutral", "The city blocked the main entrance within two weeks of the fire. There is a temporary barrier at the front and permanent debris at the east entrance — that wing collapsed."),
      d("MAREN", "left",  "neutral", "The basement access."),
      d("ERAN",  "left",  "neutral", "Through the north face. A service entrance that was below ground level before the fire and is now below debris level. It was not blocked by the city — they don't know it exists."),
      d("MAREN", "left",  "neutral", "You assessed this on your visit."),
      d("ERAN",  "left",  "neutral", "I have been thinking about the Unnamed Third for three years. Yes. I assessed the access point."),
      n("He has been preparing for this visit for three years. The rest of the group has been walking toward it for three months. Maren has been preparing for it for twelve years. All of them arrive at the ruins of the Archive tomorrow at different levels of readiness for the same thing."),
    ],

    // Spark 13: Serath in the final camp before the city
    [
      n("The last camp before the city. Five days west, the familiar outskirts of the Archive's city visible from the road's high point. Serath builds the fire with the specific efficiency of someone who has made a great many camps on roads going to difficult places."),
      d("SERATH","left",  "neutral", "When we're done — when whatever is under the Archive is found or not found — what happens to the group?"),
      d("MAREN", "left",  "neutral", "That depends on what we find."),
      d("SERATH","left",  "neutral", "And if we find what you believe is there?"),
      d("MAREN", "left",  "neutral", "Then the group becomes the carrier of what the Unnamed Third is. And the work of the next period is not discovery — it is transmission. Getting what we carry to the people who need it."),
      d("SERATH","left",  "neutral", "The nine resisters in the Spire."),
      d("MAREN", "left",  "neutral", "Among others. The people Gavrick identified in the network. The contacts Eran has cultivated for thirty-five years. Everyone who has the thread and has not yet found the way to follow it to completion."),
      n("The fire builds. The city is visible on the horizon. Tomorrow."),
    ],

    // Spark 14: Ryn before the ruins
    [
      n("The morning of arrival at the city. You are at the outskirts before the main streets begin — the edge of the city, where the buildings are less dense and the character of the place is legible from outside."),
      d("RYN",   "right", "quiet",   "We started here."),
      d("KAEL",  "right", "neutral", "Yes."),
      d("RYN",   "right", "quiet",   "The night the Archive burned. We came out through the east passage. Down this road. We were running."),
      d("KAEL",  "right", "neutral", "I remember."),
      d("RYN",   "right", "quiet",   "And now we're going back in."),
      n("Not running this time. Walking, deliberately, toward a site that is marked and blocked and officially not accessible. Walking with a specific purpose that did not exist the night they left, because completing the method was not yet possible the night they left, and the Unnamed Third was not yet a specific location but only a document reference Eran had found."),
      d("RYN",   "right", "quiet",   "The Archive's ruins. I never thought we'd come back here."),
      d("KAEL",  "right", "neutral", "Did you think we'd see it again?"),
      d("RYN",   "right", "quiet",   "I thought — I thought we'd never have a reason to."),
    ],

    // Spark 15: The ruins at last light
    [
      n("The Archive's ruins at last light, the first evening back in the city. The building has not been cleared — two months after the fire, it is still a marked site, debris in the shell, the entrance blocked with temporary barriers. The streets around it are quieter than the rest of the city."),
      d("MAREN", "left",  "neutral", "We enter tomorrow. At first light, before the streets have people on them."),
      d("ERAN",  "left",  "neutral", "The north service entrance. I'll take point."),
      d("MAREN", "left",  "neutral", "Yes."),
      n("Everyone looks at the ruins. Not for long — looking at a blocked site from the street is conspicuous. But long enough to hold what it means that they are back here. The building that was the center of everything they did, burned to its shell, still standing in the way that buildings stand after fires: the bones visible, the inside gone."),
      d("BREK",  "left",  "neutral", "How far down?"),
      d("ERAN",  "left",  "neutral", "Based on Tal's account: seven meters below the Archive's original floor level. The room was built into the stone before the Archive was built over it."),
      n("Tomorrow. Seven meters down. The original completion of the method, waiting under a burned building in a city they left as fugitives and have returned to as something else."),
    ],
  ],

  w14: [
    [
      n("The city in the days after Maren's placement. You cannot see what she did in the reading room. The Spire stands exactly as it stood. The city moves through its careful routines exactly as it moved before. Nothing on the surface has changed. And yet something has changed, in a way that is not visible but is structural — the way a change in foundation is not visible from the street but is present in everything built on it."),
      d("DORATH","left", "neutral", "We should leave."),
      d("MAREN", "left", "neutral", "Yes."),
      d("DORATH","left", "neutral", "Today?"),
      d("MAREN", "left", "neutral", "The day after tomorrow. I want to observe the second cohort's entry into the Spire first."),
      d("DORATH","left", "neutral", "From a distance."),
      d("MAREN", "left", "neutral", "From a distance."),
    ],
    [
      n("The second cohort enters the Spire in small groups over two days. Ordinary people, moving through an extraordinary door. From your position on the opposite side of the square — not directly facing the Spire's main entrance, at an angle that makes looking like not-looking — you watch them arrive and enter and not look back."),
      d("SIRA",  "right", "quiet", "They don't know."),
      d("KAEL",  "right", "neutral", "No."),
      d("SIRA",  "right", "quiet", "Some of them will find what Maren placed."),
      d("KAEL",  "right", "neutral", "Yes."),
      d("SIRA",  "right", "quiet", "And some won't."),
      d("KAEL",  "right", "neutral", "Yes."),
      n("This is the nature of what was placed. Not a mechanism. A possibility. The thread leads there; following it is a choice that belongs to the person with the thread."),
    ],
    [
      n("Eran leaves the city before Maren's observation is complete. His credential — the academic registration that got them through the Spire's entrance — has been used once too recently. He decides, with the calculation of someone who has been managing this kind of risk for decades, that the window for that credential is closed."),
      d("ERAN",  "left", "neutral", "What was done will do what it is designed to do. My remaining here serves nothing except the comfort of knowing the ending, which is not a sufficient reason."),
      d("MAREN", "left", "neutral", "Safe road, Eran."),
      d("ERAN",  "left", "neutral", "You too. Though I note that safety is not the primary characteristic of the road you have been traveling."),
      n("He shakes her hand with both of his, formally, and then he leaves. He walks like someone who has been leaving cities for a long time and has decided that doing it well is a form of respect for the city, regardless of what the city was."),
    ],
    [
      n("Three days after Maren's placement. The city has not changed. The Spire stands. The third cohort has not yet arrived. What has changed: the group has been in this city for three weeks, in positions that required constant maintenance and careful management. The maintenance cost is visible now — in how people move, in the edge of attention that has been held too long."),
      d("BREK",  "left", "neutral", "We have been too careful for too long. I don't mean that's wrong. I mean it costs something."),
      d("MAREN", "left", "neutral", "Yes."),
      d("BREK",  "left", "neutral", "How much longer?"),
      d("MAREN", "left", "neutral", "Two more days. Then we leave."),
      n("Two more days. Brek nods. The decision is filed. The maintenance continues."),
    ],
    [
      n("Orin's request, on the last day before departure. He asks to speak with Maren alone. The conversation lasts forty minutes. When Maren comes out, she says only that Orin will be taking a different route out of the city, and that she believes he means to follow it."),
      d("SERATH", "left", "neutral", "Do you trust that?"),
      d("MAREN",  "left", "neutral", "I trust that his account of how he came to be used was accurate. Whether he will do what he says he will do after we separate — that I cannot verify. I have given him what he needs to make a genuine choice. What he does with it is his."),
      n("This is how Maren handles things that cannot be controlled: she ensures that what can be done has been done, and then she releases her hold on the outcome."),
    ],

    // Spark 6: First light, below the Archive
    [
      n("The north service entrance is a door in a wall below street level, accessible through a maintenance passage that the city's debris clearance has not reached. Eran leads. The group follows. The door opens on the first try — the lock is the same as it was before the fire, because the fire did not reach the north face at this level."),
      d("ERAN",   "left",  "neutral", "The passage runs north-south, ten meters, then a stair descending. The stair was here before the Archive was built. It goes down six meters to a platform. Below the platform: the room."),
      d("MAREN",  "left",  "neutral", "The room Tal described."),
      d("ERAN",   "left",  "neutral", "The room the Eran documents describe. Tal reconstructed the description from those same documents. I have been reading the documents for three years."),
      n("The passage is narrow. Single file. The ceiling is intact — the north face held. You go down."),
    ],

    // Spark 7: The room below
    [
      n("The room is not what any of them imagined. Not because it is extraordinary — because it is ordinary. A room below a building, stone walls, stone floor, the ceiling low enough that Brek ducks. No ornamentation. No inscription visible on any wall. A room that has been here for five hundred years and has had no visitors in the last two hundred of those years."),
      d("MAREN",  "left",  "thoughtful", "The air is different here."),
      d("ERAN",   "left",  "neutral",    "Yes. I noticed it on my previous assessment."),
      d("SERATH", "left",  "neutral",    "What does that mean?"),
      d("MAREN",  "left",  "thoughtful", "The practice responds to this space the way it responds to the reading room in the Spire. Something has been placed here. A very long time ago."),
      n("She says this precisely, without drama. Something has been placed here by a person who completed the method five hundred years ago and chose to leave what they had completed in a specific location where the people who needed it could find it."),
      d("SIRA",   "right", "quiet",      "I can feel it."),
      d("MAREN",  "left",  "thoughtful", "Yes."),
    ],

    // Spark 8: What the Unnamed Third actually is
    [
      n("Maren works in the room for two hours. The group holds the space around her in whatever configuration their own practice calls for. Eran sits at the stair. Dorath holds the passage. Brek holds the entrance."),
      n("When Maren comes out of the two hours of work, she says:"),
      d("MAREN", "left",  "neutral", "The Unnamed Third is not a text. It is not a collection. It is the completion of the method, held in this location by the person who first completed it, left as an instruction for every subsequent practitioner who finds this room."),
      d("KAEL",  "right", "neutral", "An instruction for what?"),
      d("MAREN", "left",  "neutral", "For what comes after completion. The fourteen stages produce completion. The Unnamed Third is the first account of what completion enables — what it is for. Not in words. In the practice itself. A completed practitioner in this room does not read anything. They receive what was placed here as a continuation of what they already carry."),
      n("This is the thing the Archive has been looking for for two hundred years. Not a document. A presence. Placed by the first person who completed the method, for every person who completed it after."),
    ],

    // Spark 9: Each practitioner in the room
    [
      n("Maren, Sira, Serath. The three practitioners who have completed the method fully. They take the room in turns, not because it is prescribed but because the room seems to work that way — it holds one person at its center at a time, the others at the edges."),
      n("Sira comes out first. She sits at the stair and does not speak for ten minutes. Then:"),
      d("SIRA",  "right", "quiet",   "I understand the fourteenth stage now. I understood it when I wrote it. But I understand it differently now — not as what I found, but as what it was always pointing toward. It was not the end of the method. It was the instruction to find this."),
      n("Serath comes out of the room and says nothing. He sits at the passage wall and looks at the ceiling of a room that has been here for five hundred years and is continuous with what he now carries, in a way that does not require language."),
      d("MAREN", "left",  "neutral", "What do you each receive?"),
      d("SIRA",  "right", "quiet",   "What the completion is for. Not what I decided it was for. What it is for."),
      d("SERATH","left",  "neutral", "The same."),
    ],

    // Spark 10: Dorath and Eran, outside the room
    [
      n("Dorath holds the upper passage. Eran sits with her. Neither of them has the thread — neither has done the early work in the method's specific idiom. They hold the outside of the room while the inside does what the inside does."),
      d("DORATH","left",  "neutral", "What are they finding in there?"),
      d("ERAN",  "left",  "neutral", "What the method is for. The original account of it, from the person who completed it first. I have been reading descriptions of it for three years. I do not have the practice that would let me receive it directly."),
      d("DORATH","left",  "neutral", "Do you wish you did?"),
      d("ERAN",  "left",  "neutral", "I have spent thirty-five years serving this. Not completing it — serving the people who could. I made peace with this distinction a long time ago."),
      d("DORATH","left",  "neutral", "And now?"),
      d("ERAN",  "left",  "neutral", "Now I am at the location where the first completion left its account. And I understand, for the first time, that my work was not lesser for not being the completion itself. It was what the completion required to survive."),
      n("Dorath receives this. Coming from Eran, it carries the weight of a person who has made peace with a thirty-five year question."),
    ],

    // Spark 11: The choice about what to do with the room
    [
      n("The group reconvenes above ground, in the passage. Maren poses the question directly."),
      d("MAREN", "left",  "neutral", "This room is intact. It is below a burned building. The city does not know it exists. We can leave it as it is, tell no one, and let it work the way it has worked — slowly, for people who find it."),
      d("SERATH","left",  "neutral", "Or?"),
      d("MAREN", "left",  "neutral", "Or we document its location and begin the work of bringing practitioners to it. Which requires a network and a level of operation that we have not previously attempted."),
      d("RYN",   "right", "quiet",   "Documenting the location creates risk. If the document is found—"),
      d("MAREN", "left",  "neutral", "Yes. The Voss network would destroy the room rather than allow it to complete practitioners outside their program."),
      n("The choice is not easy. Slow and safe, or faster and exposed. The group holds both."),
      d("DORATH","left",  "neutral", "How many practitioners need to complete the method to meaningfully counter the fourth cohort's deployment?"),
      d("MAREN", "left",  "neutral", "More than the room can produce alone, at its current pace."),
    ],

    // Spark 12: What Brek noticed about the room
    [
      n("Brek held the entrance. He did not go into the room. He is not a practitioner in the method's specific sense. But he has spent three months in close proximity to people who are, and the practice has shaped him in the idiom that his body understands. When the group comes back up, he says:"),
      d("BREK",  "left",  "neutral", "The room changes something."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("BREK",  "left",  "neutral", "I didn't go in. But I could feel it at the entrance. The same quality as the completed practice in the settlement — but more. Like the settlement was a pool and the room is where the water comes from."),
      d("MAREN", "left",  "neutral", "That is an accurate description."),
      d("BREK",  "left",  "neutral", "Is there something there for me? If I went in."),
      d("MAREN", "left",  "thoughtful", "I don't know. The room was left for practitioners who have the thread. Whether what you carry — the physical practice — creates a thread of the same kind as the one the fragments build — I genuinely don't know."),
      n("She does not know. This is not a deflection. Maren does not know is a significant statement."),
    ],

    // Spark 13: Ryn's question about the Archive
    [
      n("Before they leave the ruins, Ryn asks to go down to the room. Not to stay — just to the passage, to the stair. She stands at the top of the stair and looks down and then she comes back up."),
      d("RYN",  "right", "quiet",   "The Archive. The whole Archive. Built over this room."),
      d("KAEL", "right", "neutral", "Yes."),
      d("RYN",  "right", "quiet",   "Everything the Archive collected. All the fragments. The scholars. The administrative apparatus. The network that protected it. Built over a room that was already complete. That already had everything the method produces. For two hundred years."),
      n("She comes up from the stair and stands in the north passage."),
      d("RYN",  "right", "quiet",   "The Archive was looking for what was under it."),
      d("KAEL", "right", "neutral", "Yes."),
      d("RYN",  "right", "quiet",   "And never looked down."),
      n("This is not accusation. It is the specific sadness of a scholar who has just understood the shape of two hundred years of misdirected effort."),
    ],

    // Spark 14: Maren at the Archive's surface
    [
      n("Maren stands in the Archive's shell before the group leaves. The main hall's ceiling is mostly gone — the fire took the roof and left the walls. The shelving is burned. The catalog room is ash. She stands at the center of it for five minutes."),
      n("Nobody interrupts. They understand this is not delay. This is a specific kind of accounting — the person who spent eight years building something, inside a building that no longer exists, holding both the loss and what the loss produced."),
      d("MAREN", "left",  "neutral", "The Archive was the right structure for its time. What comes next will need to be a different structure."),
      d("KAEL",  "right", "neutral", "What kind of structure?"),
      d("MAREN", "left",  "neutral", "Not a building. A network that doesn't live in one place. Distributed, resilient, designed to continue if any part of it is disrupted. The Voss network has existed for thirty years by being exactly that. We have been learning, in these months, what its shape is. I think we can build the opposite of it using the same design principles."),
      n("She looks at the burned ceiling one more time."),
      d("MAREN", "left",  "neutral", "The Archive served. Now we carry what it served."),
    ],

    // Spark 15: Departure from the city again
    [
      n("The second departure from this city. This time not at night, not running, not away from a fire. Morning, with the group assembled at the city's northern gate, documentation in order, a legitimate reason to travel."),
      d("DORATH","left",  "neutral", "North."),
      d("MAREN", "left",  "neutral", "North."),
      n("The direction Tal mentioned in her letters. The direction Eran's documents point, in the oldest account of what the method enables: a location north, further than the settlement, where the original network placed people when the method was first practiced publicly. A location that has been undisturbed for three centuries."),
      d("KAEL",  "right", "neutral", "What is north?"),
      d("MAREN", "left",  "neutral", "The beginning of what comes after. The Unnamed Third told us what the method is for. The location north tells us who it was first built for. Which tells us who it needs to reach now."),
      n("The city gate opens. The road north begins. This is where Act Two ends. The answer that began in a burning building months ago is not a destination. It is a direction."),
    ],
  ],

  w15: [
    [
      n("Departure morning. The eastern city from the outside of the gate is different from the city from the inside. Not smaller — but contained. A thing with edges, which is not how a city feels when you are inside it. You look at the gate closing behind the last of your group and the city becomes a thing you have been inside of, which is different from the thing you are in."),
      d("RYN",   "right", "quiet", "I keep thinking about the practitioners in the first cohort."),
      d("MAREN", "left",  "neutral", "What about them?"),
      d("RYN",   "right", "quiet", "Whether they'll find it."),
      d("MAREN", "left",  "neutral", "Some will. The thread is there. The choice is theirs."),
      d("RYN",   "right", "quiet", "And the ones who don't choose it?"),
      d("MAREN", "left",  "neutral", "They will still carry what the program gave them. Which is less than the method. But not nothing."),
    ],
    [
      n("The road west feels different from the road east. Not easier — the physical conditions are the same — but directional. When you were going east, the city was in front of you and the Archive was behind. Now the Archive's ruins are in front of you, and the city is behind. The thing you were walking toward has become a thing you are walking from."),
      d("BREK",  "left", "neutral",  "Did we do what we came to do?"),
      d("SERATH","left", "neutral",  "We did what Maren came to do. Whether that's the same thing as what we came to do depends on what you think we came to do."),
      d("BREK",  "left", "neutral",  "We came to stop the Spire."),
      d("SERATH","left", "neutral",  "The Spire is still standing."),
      d("BREK",  "left", "thoughtful","But what it was building — the controlled version — that's now in competition with what Maren placed. And the controlled version needs to hold against something that has been building for five hundred years."),
      d("SERATH","left", "neutral",  "Yes."),
    ],
    [
      n("Maren tells Sira something on the second day west. Not privately — in the group's hearing, while they walk. She says it the way she says things that should be on record: clearly, for all of them."),
      d("MAREN", "left", "neutral", "The fourteenth stage. The one you wrote. I want you to know that it was correct. Not approximately — exactly correct. What you described in the settlement's walls is what the complete method produces, stated from the inside by someone who was in the middle of producing it."),
      d("SIRA",  "right", "quiet", "I wasn't sure."),
      d("MAREN", "left", "neutral", "I know. But it was correct. The Archive has been looking for the fourteenth stage for two hundred years. You found it because you did the work, and the work found it."),
      n("Sira does not say anything. She walks. After a while: she nods."),
    ],
    [
      n("Third day west. They are past the second border settlement, on the road through the foothills. The pace is faster now — not urgent, but purposeful in a way that road travel east never fully achieved. Going toward something and going from something produce different rhythms even when the legs are doing the same work."),
      d("DORATH","left", "neutral", "I want to name what comes next."),
      d("MAREN", "left", "neutral", "Go ahead."),
      d("DORATH","left", "neutral", "What comes next is not over. The Spire is still operating. The third cohort still enters in four weeks. The fourth cohort, which is the deployment cohort, is still eight weeks beyond that. What Maren placed changes the long-term trajectory. It does not change the short-term situation."),
      d("MAREN", "left", "neutral", "Correct."),
      d("DORATH","left", "neutral", "So what do we do about the short-term situation?"),
    ],
    [
      n("The answer to Dorath's question takes a day and a half. It is not a simple answer. It involves: what the fourth cohort's deployment means in concrete terms, what a group of eight people who are not an institution or an army can realistically do about an institution, and what the method itself — now further along in completion than it has ever been in two centuries — makes possible that was not possible before."),
      d("MAREN", "left", "neutral", "There is a place the Eran documents describe that none of us have been. That I believe is the original location — the Unnamed Third, which is not a collection and not a building. I have been thinking about it since we left. I think we need to go there before anything else."),
      d("KAEL",  "right", "neutral", "Where is it?"),
      d("MAREN", "left", "neutral", "Under the Archive. Under where the Archive stood."),
      n("The Archive's ruins. Back to the beginning."),
    ],

    // Spark 6: The road north — new terrain
    [
      n("North of the city the road's character changes. Less traveled, less maintained — not rough, but the difference between a road that carries commerce and a road that carries what people carry when they are going somewhere that commerce doesn't go."),
      d("ERAN",   "left",  "neutral", "The northern road was active three hundred years ago. After the Archive was founded, the traffic shifted east. The north road has been quiet since."),
      d("SERATH", "left",  "neutral", "Quiet roads are easier to move on and harder to navigate."),
      d("ERAN",   "left",  "neutral", "Yes. I have Tal's reconstructed map. It is approximate."),
      d("MAREN",  "left",  "neutral", "Approximate is better than nothing."),
      d("ERAN",   "left",  "neutral", "In this case it is significantly better than nothing, because 'nothing' would mean relying on the fragments' directional references, which are in the Vraen notation and require a specific idiom to read."),
      d("MAREN",  "left",  "thoughtful", "Can you read that idiom?"),
      d("ERAN",   "left",  "neutral", "After forty years of study: approximately."),
    ],

    // Spark 7: Serath and the northern map
    [
      n("Serath takes Tal's reconstructed map and walks with it for half the morning. He does what he does with any document of this kind: reads it against the terrain rather than against itself, checking the terrain's logic against the map's assertions."),
      d("SERATH","left",  "neutral", "The map is reliable on roads and unreliable on landmarks. The roads are old enough that they leave traces in the vegetation pattern even when the paving is gone. The landmarks have changed — Tal's sources were describing territory from records three hundred years old."),
      d("ERAN",  "left",  "neutral", "What does the vegetation pattern tell you?"),
      d("SERATH","left",  "neutral", "The main northern route ran along this hillside and then turned northeast at a ridge. We are currently on the hillside portion. The ridge should be visible in approximately two hours."),
      d("DORATH","left",  "neutral", "And after the ridge?"),
      d("SERATH","left",  "neutral", "That is where the map becomes approximate. Tal's annotation says 'valley with stone markers.' I'm working on what that looks like, three hundred years later."),
    ],

    // Spark 8: Who is still here
    [
      n("On the road north, you take stock of the group. Not a formal accounting — the unconscious arithmetic of someone who has been in this group long enough to feel its shape."),
      n("Nine left the settlement. Eran joined at the border. Gavrick joined on the road. Orin joined on the road to the city. Now: Maren, Ryn, Brek, Dorath, Serath, Sira, Eran. Seven — the original seven, intact."),
      d("BREK",  "left",  "neutral", "We're all still here."),
      d("MAREN", "left",  "neutral", "Yes."),
      n("One word. The weight of it is all the roads between the settlement and the road north."),
      d("KAEL",  "right", "neutral", "The whole group."),
      d("MAREN", "left",  "neutral", "The group that left the settlement: yes. Intact."),
      d("RYN",   "right", "quiet",   "That was not guaranteed."),
      d("MAREN", "left",  "neutral", "No. It was not."),
    ],

    // Spark 9: What Sira understands now
    [
      n("Sira and Maren walk together for the afternoon. When they fall into step together, the group's configuration shifts slightly to accommodate the new shape without anyone deciding to."),
      d("SIRA",  "right", "quiet",   "The room below the Archive. What it showed me — I want to describe it to you."),
      d("MAREN", "left",  "neutral", "I'm listening."),
      d("SIRA",  "right", "quiet",   "The fourteenth stage — when I found it, I described it as what the method produces when it is complete. The room showed me that this is correct but incomplete. The method produces a practitioner who can perceive what the method is for. Not theoretically. Directly."),
      d("MAREN", "left",  "thoughtful", "And what is it for."),
      d("SIRA",  "right", "quiet",   "The closest I have is: it is for the work of ensuring that what human beings carry at their best — the accumulated understanding that the method protects — does not die when the circumstances of any given generation make it dangerous to hold."),
      n("Maren walks. After a while: she nods."),
      d("MAREN", "left",  "thoughtful", "Yes. That is what I received in the room also."),
    ],

    // Spark 10: Brek on the northern road
    [
      n("The road north is harder on the body than the eastern road. More elevation change, less even surface, the weather turning colder. Brek adjusts to this with the practical pleasure of someone who finds harder roads more engaging than easier ones."),
      d("BREK",  "left",  "neutral", "The body likes this."),
      d("KAEL",  "right", "neutral", "It's colder."),
      d("BREK",  "left",  "neutral", "Cold is cleaner. The eastern road was warm and flat and after three weeks of it the body starts operating below its capacity. Elevation and cold require the body to actually work."),
      d("KAEL",  "right", "neutral", "That's how the practice prefers it."),
      d("BREK",  "left",  "neutral", "Yes. The physical practice runs deeper when the body has something to respond to. In the flat road's warmth, I was keeping it at maintenance level. Here — it's running properly."),
      n("He runs the ridge check when they reach the northeastern turn Serath predicted. He goes up and comes back: clear road, two structures visible at a distance, smoke from one. Inhabited."),
    ],

    // Spark 11: The first structures on the northern road
    [
      n("Two structures at four hours' distance. One with smoke — inhabited, recently. One without — older, possibly derelict. Serath cross-references the map."),
      d("SERATH","left",  "neutral", "The inhabited structure is not on Tal's map, which means it was built after the records Tal was working from. The second structure — the one without smoke — corresponds to a 'waystation' notation on the map. Three hundred years old minimum."),
      d("ERAN",  "left",  "neutral", "The waystation's notation on the road documents includes a resting specification. It was built for travelers doing exactly what we are doing — traveling the northern route to what the original records call 'the valley station.'"),
      d("MAREN", "left",  "neutral", "The valley with stone markers."),
      d("ERAN",  "left",  "neutral", "The valley with stone markers."),
      n("Someone is living next to a three-hundred-year-old waystation on the northern road. The reason for that adjacency is not immediately clear."),
    ],

    // Spark 12: Dorath on what to build next
    [
      n("Dorath has been quiet since the Archive's ruins. On the second evening north, she speaks."),
      d("DORATH","left",  "neutral", "The Voss network's structure. Thirty years old. Distributed, resilient. No single point of failure. No central location that, if disrupted, collapses the whole."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("DORATH","left",  "neutral", "We need to build the same structure. Not the same purpose — the same architecture. A network that does not live in one place, that can lose nodes without losing the whole, that has redundant paths for transmission."),
      d("MAREN", "left",  "neutral", "Yes."),
      d("DORATH","left",  "neutral", "I want to be the person who builds that. Not just maintains it — builds it from the design principles up."),
      n("Maren looks at Dorath with the look she has when she is confirming something she already knew."),
      d("MAREN", "left",  "neutral", "Yes. That was already my intention."),
    ],

    // Spark 13: Ryn catalogs the room
    [
      n("Ryn has been writing on the road north. Not in her administrative notes — a different document, begun since the room below the Archive."),
      d("KAEL",  "right", "neutral", "What are you making?"),
      d("RYN",   "right", "quiet",   "A working document. The room below the Archive has the original account of the method's completion. But the original account is not in a notation anyone can read without the thread and years of practice with the specific idiom. I'm translating the structure — so that someone who has the method's early stages and the administrative notation can find their way."),
      d("KAEL",  "right", "neutral", "A guide."),
      d("RYN",   "right", "quiet",   "A more accessible guide. The one in the room is complete but not accessible to everyone who needs it. If someone has done the method's first eight stages and reads my document, they might find the rest of the path without needing to go to the room itself."),
      n("This is what Ryn does: she finds the gap between what exists and who can use it, and she builds the bridge."),
    ],

    // Spark 14: Maren's question repeated
    [
      n("Third evening north. Camp in a sheltered curve of the hillside. Maren asks the group the same question she asked at the beginning of the journey east."),
      d("MAREN", "left",  "neutral", "What do you believe the method is for?"),
      n("The group recognizes the question. They give the same kind of answers as before — but the answers are different. Not the form. The depth."),
      d("BREK",  "left",  "neutral", "The work that sustains what cannot be sustained any other way."),
      d("RYN",   "right", "quiet",   "The transmission of understanding across the gaps that destroy most understanding. Not just preservation — active movement."),
      d("SERATH","left",  "neutral", "The network that carries it. The method is the network's foundation. The foundation is not the purpose. The purpose is what the foundation makes possible."),
      d("DORATH","left",  "neutral", "I know now what it's worth defending. That's become — the same thing as knowing what it's for."),
      n("Maren does not give her own answer. She listens to all of them and the fire builds and the night is clear and cold."),
    ],

    // Spark 15: Arriving at the valley entrance
    [
      n("Fourth day north. Late afternoon. The valley Tal described opens below the ridge — wide and shallow, a stream running through it, and at its far end: three stone markers. Large stones, placed deliberately, visible from the ridge even at this distance."),
      d("SERATH","left",  "neutral", "The valley with stone markers."),
      d("ERAN",  "left",  "neutral", "Yes."),
      d("MAREN", "left",  "thoughtful", "What do the markers mean?"),
      d("ERAN",  "left",  "neutral", "The documents describe them as navigation marks for the original practitioners. The valley was a gathering point — where people came when they had completed enough of the method to receive what was held here. The first intentional gathering of completed practitioners. Before the Archive. Before any formal structure."),
      n("The valley is empty. Three stone markers. A stream. And the particular quality of a place that has been waiting for a long time for people who carry the right things to arrive."),
      d("BREK",  "left",  "neutral", "It knew we were coming."),
      d("MAREN", "left",  "thoughtful", "Something like that. Yes."),
    ],
  ],

  w16: [
    [
      n("The settlement, briefly. They stop two nights. Tal is there. She has been maintaining the valley's records and has additions to what Eran left behind — documents that arrived after the group departed east. She lays them out on the table the way she always does: organized, sequential, with her own annotations marking the points that changed her understanding and the points she still cannot resolve."),
      d("TAL",   "left", "neutral", "The Unnamed Third. I've been working on this since Maren told me what Eran's documents described."),
      d("MAREN", "left", "neutral", "And?"),
      d("TAL",   "left", "neutral", "It is not a collection. It is not a building. It is a person. Or rather — it is what a person who completed the method left in place, deliberately, in a location they chose because it was central and stable. The Unnamed Third is the completion of the method, left in a physical location, as an imprint."),
      d("MAREN", "left", "neutral", "Like what I placed in the Spire."),
      d("TAL",   "left", "neutral", "Like what you placed in the Spire. But original. And centuries older."),
    ],
    [
      n("The implications hold in the room for a long time. The Unnamed Third is not a lost collection. It is the original method, complete, placed in a location beneath the Archive by the person who completed it first — and then buried under everything built above it."),
      d("SIRA",  "right", "quiet", "It's been there the whole time. Under the building."),
      d("SERATH","left", "neutral", "Under the building that burned."),
      d("MAREN", "left", "neutral", "Buildings burn. What they are built on does not."),
      n("This is the direction. Back to the Archive's ruins. Down rather than across. What was preserved under everything built above it, waiting for people who had completed enough of the preparation to find it."),
    ],
    [
      n("The preparation for departure from the settlement. Sira stays to manage the settlement's work while the main group goes west — not because she is excluded but because someone needs to hold the valley, and she is the right person for that. They say goodbye without making it large."),
      d("SIRA",  "right", "quiet", "Come back."),
      d("KAEL",  "right", "neutral", "Yes."),
      n("She nods. You go."),
    ],
    [
      n("The road west from the settlement to the Archive's ruins is the reverse of the road they took east in the first weeks after the fire. Every landmark in reverse. The field marker. The hedgerow gap. The stand of bare trees where Ryn first noticed the tail. Everything in correct order, now running backward, the way a sentence reads differently when you encounter it the second time knowing how it ends."),
      d("RYN",   "right", "quiet", "I keep seeing it forward."),
      d("KAEL",  "right", "neutral", "The road east."),
      d("RYN",   "right", "quiet", "The first time we walked this. I keep seeing it from the first time. The cold. The tail. The voice."),
      d("KAEL",  "right", "neutral", "It's the same road."),
      d("RYN",   "right", "quiet", "It's not the same road. The road hasn't changed. We have."),
    ],
    [
      n("The Archive's ruins at last light, the first evening back in the city. The building has not been cleared — two months after the fire, it is still a marked site, debris in the shell, the entrance blocked with temporary barriers. The streets around it are quieter than the rest of the city, with the specific quiet of places where something has ended and the ending is still being absorbed."),
      d("MAREN", "left", "neutral", "We enter tomorrow. At first light."),
      d("BREK",  "left", "neutral", "What are we looking for, exactly?"),
      d("MAREN", "left", "neutral", "A way down. The Eran documents describe a foundation element — part of the original construction, below the ground-level Archive. Not a passage. A room. Built before the Archive was built over it."),
      n("The ruins. The city around them. Somewhere below: the Unnamed Third, waiting for people who had done enough of the preparation to find it. Tomorrow."),
      n("This is where Act Two ends. And what began as a road east has become something else entirely."),
    ],

    // Spark 6: What Tal has found
    [
      n("Tal lays the documents out on the table the way she always does: organized, sequential, with her own annotations marking the points that changed her understanding. She has been working alone in the settlement for weeks and the work has been good."),
      d("TAL",   "left",  "neutral", "The Unnamed Third. I've found three additional references since you left. Not in the fragments — in the administrative records adjacent to them. References that describe the Third not as a text or a collection but as an event."),
      d("MAREN", "left",  "neutral", "An event."),
      d("TAL",   "left",  "neutral", "The first completion of the method. Documented by the people who were present when it happened. The Third is what they called the first person who completed — not a name, because the naming convention was different then. The Unnamed Third means the third practitioner to attempt the full work. The first two did not complete. The third did."),
      n("The room holds this. The Unnamed Third is a person — was a person — and what they left under the Archive is the record of what they found when they completed first."),
    ],

    // Spark 7: The third practitioner
    [
      n("Tal continues. She has been waiting for this conversation since before the group left for the eastern road."),
      d("TAL",   "left",  "neutral", "The accounts describe the third practitioner as a woman. Older than the first two. She had been working with the method's early stages for twenty years before completing. Twenty years of preparation."),
      d("RYN",   "right", "quiet",   "Twenty years."),
      d("TAL",   "left",  "neutral", "The first two attempted completion in eight and eleven years respectively. Neither held. The accounts don't say why — only that something was incomplete in their preparation. The third practitioner waited. She observed what the first two lacked and she spent additional years building what they hadn't built."),
      d("MAREN", "left",  "thoughtful", "She built the fourteenth stage."),
      d("TAL",   "left",  "neutral", "The accounts describe something she found that the first two had not found. Yes. They describe it as — the completion of what the structure of the method was pointing toward. The last piece."),
      n("The fourteenth stage. Found by Sira in three months of work at the settlement. Found by the Unnamed Third after twenty years of preparation. Both found it. The path matters less than the arrival."),
    ],

    // Spark 8: The settlement holds
    [
      n("The settlement while the group was away: Tal and three other practitioners who arrived through the network during the six weeks of the group's absence. Three people who found the valley through routes the network maintains. They have been working and are further along than when the group left."),
      d("TAL",   "left",  "neutral", "The work continued. We had access to the practice documentation. The three who arrived brought their own records of the early stages."),
      d("MAREN", "left",  "neutral", "How far have they progressed?"),
      d("TAL",   "left",  "neutral", "One of them — a woman named Cael, who came from the northern route — completed stage eleven while you were east. She was working on twelve when you arrived."),
      d("SIRA",  "right", "quiet",   "Stage eleven."),
      d("TAL",   "left",  "neutral", "Yes. She is not slowing."),
      n("Someone at stage eleven, in the settlement, who arrived through the network while the group was doing everything they did in the eastern city. The work continued. It always continued."),
    ],

    // Spark 9: Ryn and Tal compare records
    [
      n("Ryn and Tal spend the first evening of the stop at the table with documents spread between them. You watch them work — the specific efficiency of two people who think similarly comparing notes without needing to explain their reasoning to each other."),
      d("TAL",  "left",  "neutral", "The founding agreement clause. The one about completed practitioners."),
      d("RYN",  "right", "quiet",   "I found it. Maren filled in the specific language."),
      d("TAL",  "left",  "neutral", "So did I, from a different source. The sources agree exactly, which means the language is reliable."),
      d("RYN",  "right", "quiet",   "The clause was never activated."),
      d("TAL",  "left",  "neutral", "No. The Archive burned before it could be. Which is the most significant thing about the fire — not what it destroyed, but what it prevented."),
      n("They work through the night. By morning they have a combined document that is more complete than either had separately — the shape of a thirty-year agreement that shaped the entire field, now readable for the first time because two careful people compared their separately-held pieces."),
    ],

    // Spark 10: Sira and Cael
    [
      n("Sira and Cael, the practitioner who arrived at the settlement during the group's absence. Two people at different stages of the same work, meeting for the first time. The conversation begins at the courtyard."),
      d("SIRA",  "right", "quiet",   "Stage eleven. How did you find stage eleven without the fragments?"),
      d("CAEL",  "left",  "neutral", "I had copies of the early fragments — the first seven stages. From a network contact in the north. Not the originals, but copies made in the Archive's first years, before the access protocols tightened."),
      d("SIRA",  "right", "quiet",   "Copies from the Archive's first years."),
      d("CAEL",  "left",  "neutral", "Yes. They existed in the northern network for sixty years. I have had them for four. I was at stage seven when I found them and they showed me stages eight through eleven. I've been working eleven since then."),
      n("Sixty-year-old copies of the early fragments, held in the northern network, that nobody in the southern network knew existed. The method has been moving through channels that don't all connect — until now."),
    ],

    // Spark 11: What the stop at the settlement produces
    [
      n("Two nights at the settlement. In those two nights: Tal's new documents added to the group's picture. Cael's progress noted. The northern map refined by Eran against Tal's additional references. The combined record that Ryn and Tal have built."),
      d("MAREN", "left",  "neutral", "The settlement's work continues after we leave. Tal and Cael and whoever arrives next through the network."),
      d("TAL",   "left",  "neutral", "Yes."),
      d("MAREN", "left",  "neutral", "And if the Voss network identifies this location—"),
      d("TAL",   "left",  "neutral", "We have protocols. The documents have three separate storage locations. The practice records are distributed. The valley's location is not in any written record held here."),
      d("MAREN", "left",  "neutral", "Good."),
      d("TAL",   "left",  "neutral", "We've been thinking about these things while you were east. You weren't the only ones working."),
      n("Maren receives this with the particular expression she has when she receives information that confirms something she already believed but is glad to have confirmed."),
    ],

    // Spark 12: The road back to the Archive city
    [
      n("The departure from the settlement, heading back to the Archive's ruins. The road west from the valley — the same road the group used going east, now traveled in the fourth direction this journey has taken. West from the settlement to the Archive city."),
      d("RYN",   "right", "quiet",   "I keep doing the accounting."),
      d("KAEL",  "right", "neutral", "What accounting?"),
      d("RYN",   "right", "quiet",   "The roads. Settlement to eastern city, eastern city back west, west to Archive city ruins, ruins to settlement, settlement to Archive ruins again. We have traveled more roads in these months than most people travel in a decade."),
      d("KAEL",  "right", "neutral", "Does it feel like it?"),
      d("RYN",   "right", "quiet",   "No. It feels like we've been in one continuous place that changes as we move through it. The practice changes the experience of distance. I've been trying to understand why."),
      d("KAEL",  "right", "neutral", "And?"),
      d("RYN",   "right", "quiet",   "I think it's because what the method carries doesn't have a location. It's always where you are. So the distance between locations is — less absolute."),
    ],

    // Spark 13: Dorath prepares the network
    [
      n("The road to the Archive's ruins. Dorath works while she walks — sending messages through the network's remaining active channels, confirming that three contact points she has been rebuilding since the city are now operational."),
      d("DORATH","left",  "neutral", "The western contact from the city: active, relocated, new channel established. Gavrick's three contacts: two have responded through the phrase he gave me. One has not responded and I am treating them as inactive."),
      d("MAREN", "left",  "neutral", "Two of three."),
      d("DORATH","left",  "neutral", "Two is enough to work with. And the contacts at the border settlements are confirmed. The network west of the city is more intact than I thought when we were inside it."),
      d("MAREN", "left",  "neutral", "What do you need from me to build the distributed structure?"),
      d("DORATH","left",  "neutral", "Time and practitioners. The structure requires nodes. Nodes require people who can hold the practice and the operational knowledge simultaneously. I can build the architecture. I need the people."),
      d("MAREN", "left",  "neutral", "That is what the Unnamed Third and the valley are for."),
    ],

    // Spark 14: Eran at the end
    [
      n("Eran walks with the group to the Archive's ruins and no further. Not because he cannot — because his assessment of his own role in this is that it ends at the ruins. He has been building toward this arrival for thirty-five years. He has arrived."),
      d("KAEL",  "right", "neutral", "What do you do next?"),
      d("ERAN",  "left",  "neutral", "There are people in the eastern network who are close to completing the early stages and do not know what to do next. I know where they are. I know how to reach them. I know, now, what to tell them to do next. That is a significant amount of work."),
      d("KAEL",  "right", "neutral", "You're going back east."),
      d("ERAN",  "left",  "neutral", "I have been going east and west on this road for thirty-five years. I am good at it. And I am now the person who knows where the room is and what the valley is and what the Unnamed Third provides. That knowledge, moving east through the network, is — the most useful thing I can be."),
      n("He shakes hands with Maren, both of his around hers, formally. And then he goes. Thirty-five years of this work, and what it produced was the knowledge he now carries east."),
    ],

    // Spark 15: At the ruins' entrance — the act's ending
    [
      n("The Archive's ruins. The group stands at the north service entrance — the same entrance they used on the first visit. Below them: seven meters of stone, and the room, and what the room contains."),
      d("BREK",  "left",  "neutral", "Again."),
      d("MAREN", "left",  "neutral", "Again. But different."),
      d("BREK",  "left",  "neutral", "How different?"),
      d("MAREN", "left",  "neutral", "The first time, we were going down to find what was there. This time, we are going down to complete what needs to happen now that we know what is there. The room and what it holds will still be there after us. What happens now is what we do with what we received."),
      n("The group goes down. The practice, which has been carrying the method's completion through roads and cities and a burned building and a valley with three stone markers, goes into the room below a burned building and meets what was placed there five hundred years ago."),
      n("And what began east, on a morning after a fire, becomes north. A direction. The act does not end. It turns."),
    ],
  ],

}

// ─── Act resolver ─────────────────────────────────────────────────────────────

// ─── Act resolver ─────────────────────────────────────────────────────────────
export function getActSparks(actId) {
  const map = { act1: ACT1_SPARKS, act2: ACT2_SPARKS }
  return map[actId] || ACT1_SPARKS
}
