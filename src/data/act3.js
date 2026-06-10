// src/data/act3.js
// Act 3 — "The Spire Ascending"
// Main story beats: 17 segments (a3_seg0 through a3_seg16).
// Covers: the road north → Aevorn → Lenne → the Spire's fracture
//         → Cavar arrives → the test → decision → road south
//
// SEGMENT STRUCTURE — one gate per week completed in the plan:
//   a3_seg0  Always free   — The northern road. What Tal said. The group carries it.
//   a3_seg1  Week  1 gate  — Aevorn. First sight of the northern settlement. Cold.
//   a3_seg2  Week  2 gate  — Lenne. The practitioner who left the Spire and knows why.
//   a3_seg3  Week  3 gate  — Lenne's account. The method discrepancy. The fourteenth stage.
//   a3_seg4  Week  4 gate  — What was altered. Ryn finds it. The Spire's real design.
//   a3_seg5  Week  5 gate  — A letter arrives. The seeded text is working. The Spire is reacting.
//   a3_seg6  Week  6 gate  — Two factions. The Spire is fracturing from inside.
//   a3_seg7  Week  7 gate  — Tal's information leads here. The Unnamed Third is in Aevorn.
//   a3_seg8  Week  8 gate  — The Third makes contact. What they carry. What it changes.
//   a3_seg9  Week  9 gate  — Cavar arrives. He knows Lenne. He is not hostile.
//   a3_seg10 Week 10 gate  — Cavar's proposal. What the reform faction wants.
//   a3_seg11 Week 11 gate  — Maren's test. The conditions she sets.
//   a3_seg12 Week 12 gate  — Cavar passes. But he was followed.
//   a3_seg13 Week 13 gate  — The second operative. Not reform. The other faction.
//   a3_seg14 Week 14 gate  — Brek's intelligence. The second operative's objective.
//   a3_seg15 Week 15 gate  — Dorath's solution. The final decision.
//   a3_seg16 Week 16 gate  — The fracture goes public. The Spire's center cannot hold. South.

import { n, nb, d, dn, ch, op, BG, registerActBeats, attachVoFilesForAct } from './story.js'

export const ACT3_BEATS = [

  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 0 — THE NORTHERN ROAD  (always free)
  // The group moves north. What Tal revealed. The weight of it.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The road north is not the same road as the road east. East had a logic to it — destination, objective, a city on the horizon and a function to serve inside it. North is different. North is the word Tal used when she said where they needed to go next, and she said it the way someone says the name of a place when they know you will not recognize it but will understand from the tone that it is real.",
    BG.act3_northern_road, true,
    { id: 'a3_seg0', title: 'The Northern Road', summary: 'The group moves north after Tal\'s revelation. The Unnamed Third. The method carried forward.' }
  ),

  n("The Unnamed Third. Tal's account of it had taken most of a night to give fully. Not because she was withholding — she gave what she had without preamble — but because what she had was itself a compressed record, the kind of thing that looks brief until you try to follow any thread of it into its full depth. The Unnamed Third was not a person. It was a designation. An actor in the founding structure of the Archive who was written out of the public record two centuries ago and replaced with a gap that had been formatted to look like nothing had ever been there."),

  n("The gap was not nothing. The gap was a load-bearing part of the structure that had been made invisible. This was Tal's specific phrasing, and she used it three times, which meant she considered it exact."),

  d("MAREN", "left", "thoughtful", "The method as the Archive transmitted it is not complete. The Archive knew this. The Unnamed Third held the part the Archive did not include in the public record. The omission was intentional. The reasoning was that the complete method in uncontrolled circulation was more dangerous than an incomplete method whose incompleteness was undisclosed."),

  d("KAEL", "right", "neutral", "And the Third."),

  d("MAREN", "left", "thoughtful", "Left. Took what they held and went north. That was two hundred years ago. What Tal found was a lineage — the practice passed forward, privately, outside the Archive's structure, outside the Spire's reach. The current holder of that lineage is in the North."),

  d("RYN", "right", "quiet", "This is what the Spire was trying to prevent with the registry. The tracking system. The category four inquiry."),

  d("MAREN", "left", "thoughtful", "The Spire knows the lineage exists. They have been trying to locate it for forty years. That is what all of it was for."),

  n("Brek is running the morning's horizon check. The northern road is different from the eastern road in how it forces attention — the trees are denser and closer, the horizon rarely visible for more than a quarter-mile. He has adapted his circuit accordingly: shorter loops, more frequent, covering the tree-line rather than the open ground. You watch him disappear into the first stand of pines and reappear three minutes later, same pace, same face, nothing to report."),

  d("SERATH", "left", "neutral", "There is something I want to say about what Maren has described."),

  n("Everyone is listening."),

  d("SERATH", "left", "neutral", "The Archive burned. The Spire controls what they believe to be the final stage of the method. Now there is a lineage north of here that holds what neither the Archive nor the Spire knows. We are walking toward the only complete picture that exists. I want to say that plainly so everyone understands what this road means."),

  d("DORATH", "left", "neutral", "And the Spire has been looking for it for forty years."),

  d("SERATH", "left", "neutral", "Yes."),

  d("DORATH", "left", "neutral", "Which means our movement north, if the Spire becomes aware of it, will be interpreted correctly."),

  n("This is understood by everyone. The road continues. The pines grow taller as you travel and the air carries a quality of cold that is not yet winter but is preparing for it — the kind of cold that has been in the stone and the soil all summer, waiting."),

  ch("A3_SEG0_RESPONSE", [
    op(
      "What the road means is already clear. You walk without comment, which is its own response.",
      "WALK_SILENT",
      [
        n("Maren glances at you once, then returns to the road. Serath notes your silence and files it as agreement of a particular type: not ignorance of what he said but an understanding that had already arrived. The group moves at the same pace. The pines close in on either side."),
        n("You have learned something in the last four months that the road is reinforcing: most things that need saying have been understood already. The value of saying them aloud is for the people who still need the words. Not for you."),
      ],
      null,
      { relationships: { serath: 6, maren: 8 } }
    ),
    op(
      "Ask Maren: is the lineage holder expecting us.",
      "ASK_EXPECTING",
      [
        d("KAEL", "right", "neutral", "The lineage holder north of here. Are they expecting us."),
        d("MAREN", "left", "thoughtful", "Tal sent a word ahead. A notation in the old form — not the Archive's notation, the Vraen notation, which the lineage holder will recognize. Whether that word arrived before we did and whether it was understood correctly, I do not know."),
        d("KAEL", "right", "neutral", "What does the notation say."),
        d("MAREN", "left", "quiet", "That the method has been completed. That the group carrying it is on the northern road. That they should be received."),
        n("The weight of that last word. Received: not met, not assessed, not evaluated. The word for being brought inside something that had been waiting."),
      ],
      null,
      { relationships: { maren: 10, tal: 8 } }
    ),
    op(
      "Ask Dorath what she considers the main risk of the road north.",
      "ASK_DORATH_RISK",
      [
        d("KAEL", "right", "neutral", "The main exposure. What is it."),
        d("DORATH", "left", "neutral", "Movement north from the eastern city is not common. A group our size on this road is visible. If the Spire has network capacity in the eastern territories — which it does — then our departure from the city registers. The question is how long it takes for that signal to reach someone who interprets it correctly."),
        d("KAEL", "right", "neutral", "Your estimate."),
        d("DORATH", "left", "neutral", "Ten days. Possibly twelve. After that, assume we are known to be heading north."),
        n("This is not alarming. It is simply the operational window. Ten to twelve days to arrive, to make contact, to understand what the lineage holder holds, and to be in a position where arrival of Spire awareness does not change the outcome of the meeting."),
      ],
      null,
      { relationships: { dorath: 10, maren: 5 } }
    ),
  ]),

  n("The road narrows at the fourth mile and then widens again where it crosses a stone bridge over a river that is running fast and cold. Brek checks the bridge first, then waves the group across. On the far side, the pines thin briefly and you can see the ridge to the north — a long grey line against a pale sky, snow visible on the highest points, the horizon suggesting distance that is still days away."),

  n("The method stays with you on the road the way Maren said it would. Not loud. Not heavy. Something more like an additional awareness that has become part of the ordinary register of moving through a landscape. You notice things you would not have noticed six months ago. Not more things — the same things, more fully. This, you understand, is what completion means."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 1 — AEVORN  (Week 1 gate)
  // Arrival in the northern settlement. First contact with Lenne.
  // Cliffhanger: Lenne already knows why they are here.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Aevorn is smaller than the eastern city and larger than a village, which means it has the character of a place that has decided what it is. The stone is grey and thick, built for cold rather than for appearance, and the streets are laid out in a grid that suggests whoever planned this settlement was thinking about movement during winter when the light is bad. Practical. Undecorated. The kind of place that does not need to announce itself because anyone who arrives here already knows why they came.",
    BG.act3_aevorn, true,
    { id: 'a3_seg1', title: 'Aevorn', summary: 'The northern settlement. Arrival. First contact with Lenne, who knows exactly why they are here.' }
  ),

  n("Dorath has done her assessment of the approach in the last three days: two entry roads, a market square that serves as a natural gathering point, a district of working buildings to the east that would house a small-scale practice without drawing attention. She identified three possible locations for the lineage holder before they arrived, which means when the innkeeper mentions a scholar who lives in the stone building on the northeast corner, she is not surprised."),

  d("DORATH", "left", "neutral", "We will need two rooms for now. I will pay for a week."),

  d("MAREN", "left", "thoughtful", "Not yet. We arrive, we settle. One night before any contact."),

  d("DORATH", "left", "neutral", "Agreed."),

  n("The inn is exactly what the exterior suggested: heavy timber, firelight, the smell of something cooking that has been cooking since this morning. Four other guests, none of whom look up when the group enters. Brek does a quiet circuit of the common room and comes back. Nothing."),

  n("That night, after the others have gone to their rooms, you sit at the fire and think about what Tal said. Two hundred years. A lineage preserved in private, passed forward through people who knew what they were carrying and why it could not be registered, catalogued, institutionalized. The method in its complete form, held by someone north of the Archive for two centuries, waiting for the conditions in which it could be brought back into contact with the larger structure without being absorbed by it."),

  n("The door of the inn opens. A woman enters, removes her coat, and sits at the table nearest the fire without ordering anything. She is in her forties, precise in movement, with the look of someone who has been waiting for a specific thing and has learned to occupy waiting without fidgeting. She looks at you once. Then she looks at the fire."),

  d("LENNE", "left", "neutral", "You came faster than I expected."),

  n("You did not announce yourself. She did not announce herself. You are sitting in a public common room and she has just addressed you as though continuing a conversation that began elsewhere."),

  d("KAEL", "right", "neutral", "You know who we are."),

  d("LENNE", "left", "neutral", "Tal's notation reached me eight days ago. I have been watching the road south since."),

  n("She says this without concern. Not performing calm — actually calm, the way someone is calm when they have done the preparation and the event is now simply arriving."),

  {
    type:          'task_gate',
    gateStyle:     'dialogue',
    taskSlots:     2,
    pauseNarrator: "Lenne is here. She is ready to give her account. But there are things about Aevorn and about Lenne herself that need to be understood before this conversation can proceed at full depth. Two tasks before the full meeting.",
    continueNarrator: "The preparation is complete. Lenne speaks.",
  },

  ch("A3_SEG1_FIRST_MEETING", [
    op(
      "Ask her directly: what did Tal tell you about this group.",
      "ASK_WHAT_TAL_SAID",
      [
        d("KAEL", "right", "neutral", "What did Tal tell you about us."),
        d("LENNE", "left", "neutral", "That the method has been completed outside the Archive's structure and outside the Spire's awareness. That the group carrying it came through the eastern city and placed something inside the Spire. That you are heading north because of the information about the lineage."),
        d("KAEL", "right", "neutral", "And you are the lineage."),
        d("LENNE", "left", "neutral", "I am the fourth holder. My teacher received it from her teacher, who received it from the second holder after the Third's departure. I was not born to this — I was found. That is the selection method the lineage has used from the beginning. It cannot pass to a child or a student. It can only pass to someone who demonstrates completion independently, without knowing what they are completing."),
        n("The fire shifts. The implication lands slowly: she was not taught the final stage. She completed it without being told she was completing it. The same way the group at the settlement completed it. The same way the Third left two centuries ago."),
      ],
      null,
      { relationships: { lenne: 12, maren: 8 } }
    ),
    op(
      "Ask about the Spire. She left it — what does she know from the inside.",
      "ASK_SPIRE_INSIDE",
      [
        d("KAEL", "right", "neutral", "You were inside the Spire. Before the North."),
        d("LENNE", "left", "neutral", "Four years inside. Not at the top. I reached the third level and recognized the structure of what the fourth level was designed to do. That recognition was what made staying impossible."),
        d("KAEL", "right", "neutral", "What did you recognize."),
        d("LENNE", "left", "neutral", "That the final stage held in the fourth-level reading room is not the final stage. It is a version of the final stage that has been altered to create dependency — not completion. A practitioner who follows it to the end believes they have completed the method. They have completed something. But it does not carry. It does not move with them the way a true completion does. They need the Spire's ongoing instruction to maintain what they built, which is not what completion is."),
        d("MAREN", "left", "quiet", "You recognized this."),
        d("LENNE", "left", "neutral", "I was two months from the fourth level when I understood. I left without reaching it."),
      ],
      null,
      { relationships: { lenne: 14, serath: 8, maren: 10 } }
    ),
    op(
      "Say nothing. Wait. Let her speak first.",
      "WAIT_LISTEN",
      [
        n("You say nothing. The fire settles. Outside, the wind has picked up — you can hear it in the gap under the door, a thin cold voice."),
        d("LENNE", "left", "neutral", "You are not what I expected. Tal described a group. What I am seeing is something more coherent than a group. The people you traveled with — they have a quality that is distinct. Not just trained. Settled. Like people who have been carrying something long enough that it has stopped being weight."),
        d("KAEL", "right", "neutral", "The method."),
        d("LENNE", "left", "neutral", "Yes. I know what that looks like. I have been looking for it for four years, in every person who has come through Aevorn. Most people who come north are running from something. You are the first group I have seen that was walking toward something. I knew when I saw you on the road."),
      ],
      null,
      { relationships: { lenne: 10, maren: 6 } }
    ),
  ]),

  n("Maren comes downstairs an hour later, which means she was already awake and waiting for this meeting to begin. She sits across from Lenne. For a moment they look at each other without speaking — two practitioners, two different histories of arriving at the same place, recognizing each other across the distance the different paths create."),

  d("MAREN", "left", "quiet", "You are the lineage holder."),

  d("LENNE", "left", "neutral", "Yes."),

  d("MAREN", "left", "quiet", "Then we have a great deal to tell each other."),

  n("This is not the cliffhanger. The cliffhanger is what Lenne says next, very quietly, looking at the fire."),

  d("LENNE", "left", "neutral", "Before you begin — there is something you should know about what the Spire placed in its fourth-level text. I believe you already placed a seeded correction inside it. I believe the correction was accurate. I also believe it was incomplete. The alteration goes deeper than the fourteenth stage."),

  n("Maren is still. In all the months you have traveled with her, you have seen her process difficult information with the equanimity of someone who has accepted that difficult information is simply part of the practice. What you see on her face now is not that equanimity. It is what lies behind it, briefly visible: the knowledge that the thing you built may not be what you thought you built."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 2 — LENNE'S ACCOUNT  (Week 2 gate)
  // Lenne explains the Spire alteration in full. The method discrepancy.
  // Cliffhanger: The alteration was designed to be undetectable to anyone
  // who completed the Spire's version — including Dorath.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Lenne's study occupies the top floor of the northeast building. Three rooms: a sleeping room, a working room, a room that holds nothing but a single table and four chairs. The working room is what you would expect from someone who has been practicing for twenty years in isolation: precise organization, nothing decorative, a shelf of texts that have been read enough times to have their pages marked in a code you cannot yet read. She leads the group into the four-chair room and closes the door.",
    BG.act3_aevorn_study, true,
    { id: 'a3_seg2', title: "Lenne's Account", summary: "Lenne explains the Spire's alteration in full. The discrepancy is deeper than the seeded text reached." }
  ),

  d("LENNE", "left", "neutral", "The alteration was made approximately one hundred and twenty years ago. Not by the Spire's founder — by the second administration. The founding instruction was genuine. What replaced it was designed to appear genuine to anyone who had not seen the original, and to be indistinguishable in practice until the point of completion."),

  d("MAREN", "left", "thoughtful", "Where exactly."),

  d("LENNE", "left", "neutral", "The fourteenth stage is the one you know about. The seeded text you placed corrects the described method. What it does not correct is the frame that the fourteenth stage sits within — the interpretive structure that was built into the preceding six stages. A practitioner who follows the corrected fourteenth stage but arrives at it through the Spire's seventh through thirteenth stages will still not complete correctly. The preceding stages prime the practitioner to interpret the final stage in a way that produces dependency rather than completion."),

  n("The room is very quiet. Serath is writing. Ryn is listening with her eyes closed — her method of holding complex structural information. Dorath is looking at the table."),

  d("SERATH", "left", "neutral", "Can you be specific about which stages were altered."),

  d("LENNE", "left", "neutral", "Seven, nine, and twelve. The changes are subtle — I can show you the original notation alongside the Spire's version and most practitioners would not see the difference. The effect is cumulative. Each altered stage builds a slightly wrong foundation that the next stage inherits. By the time the practitioner reaches the fourteenth, the correction you placed reads correctly but is applied to a structure that was designed not to receive it that way."),

  d("MAREN", "left", "thoughtful", "The lineage holds the original seventh, ninth, and twelfth."),

  d("LENNE", "left", "neutral", "Yes. The complete transmission. What the Third took when they left."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     3,
    pauseNarrator: "Lenne's account requires verification. Three things must be examined before the implications can be accepted: the notation comparison, the structural analysis, and the record of what the Spire's administration changed and when.",
    continueNarrator: "The examination is complete. The discrepancy is real.",
  },

  n("Ryn does the comparison first. Lenne places the lineage's copy of the seventh stage beside her own transcription of the Spire's version, and Ryn reads both without speaking for ten minutes. Then:"),

  d("RYN", "right", "quiet", "The Spire's seventh stage instructs the practitioner to frame the method as something received from an external source. The lineage's version instructs the practitioner to recognize the method as something they are completing in themselves. These are not the same instruction."),

  d("LENNE", "left", "neutral", "Correct."),

  d("RYN", "right", "quiet", "The Spire's version makes the practitioner dependent on the source of the instruction. The lineage's version makes the practitioner independent of it."),

  d("LENNE", "left", "neutral", "And a practitioner who has received the Spire's seventh stage will interpret any subsequent instruction — including the correct fourteenth stage — through that framing. They will look for external validation of what they have completed. They will find it in the Spire's ongoing structure, which is designed to provide exactly that validation."),

  n("What follows this is a silence of the kind that means everyone in the room has understood something that cannot be easily spoken because speaking it would mean acknowledging its full extent. Dorath is the one who speaks it."),

  d("DORATH", "left", "neutral", "I trained inside the Spire's system. Not to the fourth level, but I passed through the seventh."),

  d("LENNE", "left", "neutral", "I know."),

  d("DORATH", "left", "neutral", "Does that mean—"),

  d("LENNE", "left", "neutral", "It means your completion at the settlement was built on a foundation that was partially incorrect. The completion was real — I can see that it was real. But the framing you used to arrive at it may carry a residue of the dependency structure. It is not permanent. It can be worked through. But it is there."),

  n("Dorath says nothing. This is the most difficult thing you have watched anyone in this group face: the discovery that the practice you believed you completed correctly may have been built on something that was quietly wrong from the beginning. Not wrong enough to prevent the completion. Wrong enough to change what the completion means."),

  ch("A3_SEG2_DORATH", [
    op(
      "Go to Dorath. Sit with her. Say nothing — she does not need words right now.",
      "SIT_WITH_DORATH",
      [
        n("You move to her side. She does not look up. The room adjusts slightly — Maren and Lenne continue the conversation at a lower register, giving Dorath the space to hold what she is holding without having to manage an audience while she does it."),
        n("After several minutes, Dorath speaks — not to you, not to anyone in particular."),
        d("DORATH", "left", "neutral", "I spent four years inside the Spire's structure. I thought I understood what I was inside. I thought I had the measure of it."),
        n("You do not say that she did understand it, because that is not what she is saying. She is saying that understanding a structure and being formed by it are not the same thing. She is right."),
      ],
      null,
      { relationships: { dorath: 14, maren: 5 } }
    ),
    op(
      "Ask Lenne: can the residue be corrected. Is there a practice for it.",
      "ASK_CORRECTION",
      [
        d("KAEL", "right", "neutral", "The residue Dorath is carrying. There is a practice for it."),
        d("LENNE", "left", "neutral", "Yes. The lineage developed it after the first practitioners trained under the Spire's system came north and needed to work through what they had inherited. It takes time. Several weeks of deliberate practice using the original seventh, ninth, and twelfth stages. Not re-doing the entire method — only working specifically with the framing those stages established."),
        d("MAREN", "left", "thoughtful", "How many people have done this work."),
        d("LENNE", "left", "neutral", "Three that I know of. All successfully. But it is not easy work. It requires the practitioner to sit with the knowledge that something foundational was wrong without that knowledge destabilizing what was built correctly on top of it."),
        d("DORATH", "left", "neutral", "Tell me what it involves."),
      ],
      null,
      { relationships: { lenne: 12, dorath: 10, maren: 8 } }
    ),
    op(
      "Ask Maren: does this change the seeded text. Does it need to be corrected.",
      "ASK_SEEDED_TEXT",
      [
        d("KAEL", "right", "neutral", "The text we placed inside the Spire. Does what Lenne is describing mean it was the wrong correction."),
        d("MAREN", "left", "thoughtful", "Not wrong. Incomplete. A practitioner who reads the corrected fourteenth stage and has also received stages seven, nine, and twelve from the Spire's version will have partial correction. It will create a question they cannot resolve without finding the original stages."),
        d("LENNE", "left", "neutral", "That question — that specific unresolvable question — is already creating a fracture inside the Spire. The seeded text worked. Just not in the way you intended. It worked by introducing a discrepancy that the Spire's own advanced practitioners are now trying to explain."),
        n("This is the first time any of them have heard that the Spire's internal structure is already responding. The room changes quality slightly, the way rooms change when information arrives that reframes everything said before it."),
      ],
      null,
      { relationships: { maren: 12, lenne: 10, serath: 8 } }
    ),
  ]),

  n("The meeting continues until the candle burns to its last quarter. By the time it ends, everyone in the room understands three things: the Spire's alteration is older and deeper than the seeded text reached; Lenne holds the original stages that can correct it; and the seeded text has already done something inside the Spire — not what was intended, but something real."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 3 — THE FOURTEENTH STAGE  (Week 3 gate)
  // Ryn's analysis. The exact nature of the alteration.
  // Cliffhanger: Someone inside the Spire figured it out too — months ago.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The comparison work takes three days. Ryn leads it, with Serath providing the archival knowledge and Lenne providing the original texts. The working room becomes a space of careful lateral thinking — texts laid out on the table in a precise order, notation marks accumulating on the margins of transcription sheets, the quiet of people who have found the form of work that matches their capacity and are simply doing it.",
    BG.act3_aevorn_study, false,
    { id: 'a3_seg3', title: 'The Fourteenth Stage', summary: "Ryn's analysis reveals the full structure of the Spire's alteration. Someone inside already knows." }
  ),

  n("You work alongside them. Not as the analyst — Ryn and Lenne have that. Your function is different: you hold the thread of what it felt like to complete the method, which is information that the written comparison cannot access. When Ryn or Lenne or Serath asks you to describe a specific quality of what you experienced at a particular stage, you describe it. The description produces results. Three times in three days, a description you give shifts the direction of the analysis in ways that move it forward."),

  d("RYN", "right", "quiet", "This. Here. The quality you described at stage nine — the sensation of placing something in relation to something else. The Spire's version of stage nine uses a construction that substitutes 'receiving from' for 'placing in relation to.' The distinction sounds minor. Structurally it inverts the agency."),

  d("LENNE", "left", "neutral", "Yes. In the original, the practitioner is the one doing the placing. In the Spire's version, the practitioner is receiving something placed by the instruction. The practitioner moves from agent to recipient."),

  d("SERATH", "left", "neutral", "And by stage twelve, this accumulated inversion means the practitioner experiences the completion of the method as something that happened to them, not something they did. Which creates—"),

  d("RYN", "right", "quiet", "The need for someone to confirm that it happened. The Spire is the confirming structure."),

  n("This is the precise articulation of what Lenne described in general terms. Hearing it specific is different from understanding it generally — the specificity adds weight, the way the exact phrasing of a diagnosis adds weight that a general description of symptoms does not."),

  d("MAREN", "left", "thoughtful", "The people inside the Spire who completed the altered method. They believe they have what we have."),

  d("LENNE", "left", "neutral", "Most of them, yes. A practitioner who completes the Spire's version experiences something real. The inversion is not obvious from inside it. You would need to encounter a genuine completion — or the original texts — to recognize the difference."),

  d("MAREN", "left", "thoughtful", "But the seeded text provided the corrected fourteenth stage. Which would produce, in some practitioners, an unexpected experience — the completion reaching further than the Spire's version allowed. Which would be noticed."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     2,
    pauseNarrator: "The analysis is approaching its conclusion. Two final pieces: tracing which specific practitioners inside the Spire would have had the capacity to notice the discrepancy, and understanding what the discovery would have meant for them.",
    continueNarrator: "The analysis completes. The picture is now full.",
  },

  d("LENNE", "left", "neutral", "I want to tell you something about why I left the Spire when I did. I said I recognized the structure of what the fourth level was designed to do. That is true. What I did not say was that someone else recognized it at the same time. A colleague. A man named Cavar."),

  n("New name. Everyone in the room registers it."),

  d("MAREN", "left", "thoughtful", "What happened to him."),

  d("LENNE", "left", "neutral", "He stayed. I left. He believed that the alteration could be corrected from inside the Spire — that if enough practitioners on the upper levels understood what the seventh, ninth, and twelfth stages had done to their completions, the reform could happen internally. I did not believe the Spire's administration would permit that."),

  d("MAREN", "left", "thoughtful", "Four years ago."),

  d("LENNE", "left", "neutral", "Yes. Since then I have heard nothing about him, which could mean he failed, or was removed, or succeeded quietly."),

  d("SERATH", "left", "neutral", "Or is still working."),

  d("LENNE", "left", "neutral", "Yes. Or that."),

  n("The candle in the working room is a different one than last night's. Lenne changes them at the same point every evening — practical precision extended to this small ritual. You note this. The way someone attends to the small structures of a day tells you what they consider worth maintaining. Lenne considers quite a lot worth maintaining."),

  n("The cliffhanger is quiet. Lenne says it at the end of the session, when the texts have been put away and the chairs pushed back."),

  d("LENNE", "left", "neutral", "There is one more thing. Three months ago, a notation arrived for me through the old lineage channel — not through Eran's network, through the older channel that predates it. The notation was in the Vraen form. It said: the seeded text has been read. The discrepancy has been identified. Contact is possible but must be initiated carefully. It was signed with a notation I recognized."),

  d("MAREN", "left", "quiet", "Cavar."),

  d("LENNE", "left", "neutral", "Yes."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 4 — RYN'S FINDING  (Week 4 gate)
  // The full structural analysis is complete. The Spire's real design is understood.
  // Cliffhanger: Ryn finds a fourth alteration no one knew about.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The analysis completes on the fourth morning. Ryn presents the findings at the four-chair table with the same clarity she brings to everything: the structure of the argument first, the evidence second, the implications last. She does not overdress conclusions. What she states is what the evidence states, and she notes the limits of what the evidence can state with the same precision she notes the evidence itself.",
    BG.act3_aevorn_study, false,
    { id: 'a3_seg4', title: "Ryn's Finding", summary: "The structural analysis is complete. A fourth alteration is found — deeper than anyone expected." }
  ),

  d("RYN", "right", "quiet", "Summary. The Spire's alteration to stages seven, nine, and twelve is confirmed. The effect is cumulative and culminates in an inversion of agency at the point of completion. A practitioner following the altered path reaches a state that resembles completion but requires ongoing external validation. The seeded text Maren placed corrects the fourteenth stage. This correction introduces a discrepancy that practitioners who have completed the Spire's version will notice — it reaches further than the Spire's version allows and produces an experience they cannot account for."),

  d("SERATH", "left", "neutral", "Which produces exactly the fracture Lenne described."),

  d("RYN", "right", "quiet", "Yes. The practitioners who are most advanced within the Spire's system are precisely the ones most likely to notice the discrepancy and understand what it means. The seeded text did not correct the Spire. It revealed the Spire to the people inside it who were capable of recognizing what was revealed."),

  n("Maren is listening with the expression she has when information arrives that reorganizes what she thought she had built. Not distress — recalibration. She rebuilds the picture quickly and without visible effort, but you can see the moment of rebuilding."),

  d("MAREN", "left", "thoughtful", "What does the correction require at this point. To fully correct the method as the Spire teaches it."),

  d("RYN", "right", "quiet", "The original seventh, ninth, and twelfth stages — which Lenne holds. And a secondary correction to the fifth stage, which I also found."),

  n("Lenne looks up."),

  d("LENNE", "left", "neutral", "The fifth."),

  d("RYN", "right", "quiet", "Yes. I found it late on the third evening. It is not in the stages you showed me — the lineage's original does not include it. The fifth stage in the Spire's version contains a framing instruction that predates even the alteration to stages seven, nine, and twelve. It is older than what you identified when you left."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     2,
    pauseNarrator: "The fifth stage alteration requires examination. Two tasks: locating the specific notation change and determining when the fifth stage was altered — before or after the founding administration.",
    continueNarrator: "The fifth stage is found and understood.",
  },

  n("The finding takes the morning. When it is confirmed, the room is very quiet."),

  d("LENNE", "left", "neutral", "The lineage transmitted the original version of the fifth stage. I have read it many times. I did not see the alteration."),

  d("RYN", "right", "quiet", "Because the lineage's version and the Spire's version appear identical in content. The alteration is not in the language of the stage. It is in the notation that precedes the stage — a small mark in the Spire's transmission that signals to the student how the stage is to be received. The lineage's notation marks it as instruction. The Spire's notation marks it as revelation."),

  d("MAREN", "left", "thoughtful", "Received as revelation rather than instruction."),

  d("RYN", "right", "quiet", "Yes. A practitioner who receives the fifth stage as revelation treats everything that follows as something divinely given rather than something learned. The distinction shapes how stages six through thirteen are processed. By the time the seventh stage — with its explicit agency inversion — arrives, the practitioner's interpretive frame has already been oriented toward reception rather than action."),

  d("LENNE", "left", "neutral", "The fifth stage is the root. Everything else was built on it."),

  n("This is the finding. Not three alterations but four. Not a structure that could be partially corrected by the seeded text but a structure that requires the original fifth stage — which is in the lineage, which Lenne holds, which the Spire has never encountered — to fully undo."),

  ch("A3_SEG4_RESPONSE", [
    op(
      "The finding changes the scope of what is possible. Say it.",
      "STATE_SCOPE",
      [
        d("KAEL", "right", "neutral", "If the fifth stage is the root — then practitioners who received the Spire's instruction cannot fully correct without the lineage's original fifth stage. Which the Spire does not have. Which means Cavar and whoever is working with him inside the Spire are correcting toward something they do not have the complete materials for."),
        d("LENNE", "left", "neutral", "Yes."),
        d("KAEL", "right", "neutral", "And they know this."),
        d("LENNE", "left", "neutral", "They know the fourteenth stage was corrected by your seeded text. They may or may not know about the fifth. But they will have reached a point where the correction produces a question they cannot answer from inside the Spire's existing texts."),
        d("MAREN", "left", "quiet", "They will need us."),
      ],
      null,
      { relationships: { maren: 10, lenne: 8, ryn: 8 } }
    ),
    op(
      "Ask Lenne: why didn't the original lineage come back. Two hundred years is a long time to stay north.",
      "ASK_WHY_STAYED",
      [
        d("KAEL", "right", "neutral", "Two hundred years. The Third left and the lineage stayed north. Why."),
        d("LENNE", "left", "neutral", "The Third tried twice to return. Both times the Spire identified the approach and the conditions were not safe. After the second attempt, the Third established the rule: the lineage stays north until the Spire fractures from within. A fracture cannot be forced from outside. It must come from practitioners inside who recognize what the structure has done to them."),
        d("KAEL", "right", "neutral", "The seeded text."),
        d("LENNE", "left", "neutral", "Was the first external intervention that created internal fracture. Yes. The Third's rule assumed it would take longer. It took two hundred years and a fire in the Archive."),
        n("The weight of that. The fire in the Archive — the event that began everything — as the necessary precondition for the lineage's return. Not a tragedy in isolation. A catalyst in a structure two centuries in the making."),
      ],
      null,
      { relationships: { lenne: 14, maren: 8, serath: 10 } }
    ),
  ]),

  n("Ryn finishes her presentation. The analysis is complete. The full picture of the alteration is now understood by everyone in the room. What remains is the question that follows any complete analysis: what to do with what has been found."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 5 — THE LETTER  (Week 5 gate)
  // A letter arrives from inside the Spire via Eran's network.
  // The seeded text has produced a visible fracture.
  // Cliffhanger: The letter names who is leading the reform faction. Cavar.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Eight days after the group arrives in Aevorn, a letter arrives through Eran's network. It comes in the old notation, wrapped in the kind of packaging that signals it was handled by multiple contacts in sequence — the courier structure Eran described as designed for information that cannot afford to be intercepted and read as plain language. Dorath receives it, verifies the notation integrity, and brings it to Maren.",
    BG.act3_aevorn_inn, true,
    { id: 'a3_seg5', title: 'The Letter', summary: "A letter from inside the Spire confirms the fracture. Cavar is leading the reform faction." }
  ),

  n("The letter is four paragraphs. Maren reads it twice, then places it on the table and reads it again. Then she reads it aloud."),

  d("MAREN", "left", "thoughtful", "The first paragraph: the seeded text has been examined by seventeen practitioners on the third and fourth levels of the Spire. Of the seventeen, nine have identified the discrepancy between the corrected fourteenth stage and the instruction they completed under. Of the nine, four have recognized the implication — that the Spire's method is altered."),

  d("MAREN", "left", "thoughtful", "The second paragraph: the four who recognized the implication have been removed from their level assignments and placed in what the Spire calls consultation review, which is the administrative mechanism used to evaluate practitioners whose completions are in question. The other five continue to work but are being monitored."),

  d("MAREN", "left", "thoughtful", "The third paragraph: a faction has formed inside the Spire — eight practitioners at the senior level who believe the alteration is institutional corruption and are attempting to document it. They have been meeting privately for six weeks. They are not yet known to the administration."),

  d("MAREN", "left", "thoughtful", "The fourth paragraph: the faction is led by a senior practitioner on the fourth level. His name is Cavar."),

  n("Lenne does not react outwardly. Something shifts in her, very slightly — the kind of internal shift that a person who has been waiting years for a specific piece of information makes when it arrives and is exactly what they hoped."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     2,
    pauseNarrator: "The letter's information requires analysis. Two tasks: understanding the political situation inside the Spire and determining whether Cavar's faction is stable enough to be of use.",
    continueNarrator: "The analysis is complete. The situation is clearer.",
  },

  d("DORATH", "left", "neutral", "Four removed from assignment. Five monitored. Eight in the private faction. The Spire's administration knows something is happening. They may not know what yet."),

  d("MAREN", "left", "thoughtful", "The consultation review process — how long does it run before the practitioners in it are released or sanctioned."),

  d("DORATH", "left", "neutral", "Eran's network description gave a range of two to four weeks. After that, the administration either clears them or removes them from the Spire entirely."),

  d("SERATH", "left", "neutral", "Which means Cavar's faction has two to four weeks before the situation inside the Spire shifts significantly. The four in review may be allies. If they are sanctioned and removed, the faction loses four potential members and the administration becomes more alert."),

  d("LENNE", "left", "neutral", "Cavar will know this. He has been inside the Spire for four years working toward exactly this moment. He will not move before he has to, and he will not wait longer than he can afford to."),

  ch("A3_SEG5_LETTER_RESPONSE", [
    op(
      "The faction needs the original fifth stage. That is what Cavar is working toward but doesn't have. State this clearly.",
      "STATE_FIFTH_STAGE_NEED",
      [
        d("KAEL", "right", "neutral", "Cavar's faction is working with a partial correction. The seeded text gave them the fourteenth stage. Ryn found the fifth stage alteration. The faction cannot complete the reform without the original fifth stage — which is here, with Lenne. Cavar is going to realize this if he has not already."),
        d("LENNE", "left", "neutral", "He will realize it. The original fifth stage is not in any text the Spire possesses. When the faction attempts to construct a full correction, they will encounter a question they cannot answer. The fifth stage will produce a gap they cannot fill."),
        d("MAREN", "left", "quiet", "And then they will need to find someone who has it."),
        n("The implication: Cavar's faction will come north. Or will send someone north. The letter was the first contact. The contact will continue."),
      ],
      null,
      { relationships: { maren: 12, lenne: 10, ryn: 8 } }
    ),
    op(
      "Ask Dorath: what is the operational risk of Cavar's faction finding us before we are ready to be found.",
      "ASK_OPERATIONAL_RISK",
      [
        d("KAEL", "right", "neutral", "If Cavar's faction traces the seeded text back to its source. How much of a risk is that."),
        d("DORATH", "left", "neutral", "The seeded text was placed without attribution. The placement itself was careful — Dorath's work inside the Spire was conducted at the level of a document insertion, not an interaction. There is no direct trace from the text to this group."),
        d("DORATH", "left", "neutral", "However. The seeded text's specific form of correction would have been recognized by a careful analyst as the work of someone who completed the genuine method. Cavar's faction will narrow the origin to a practitioner or group outside the Spire. From there, Eran's network is the most likely conduit — and Cavar knows Lenne, who knows Eran."),
        d("MAREN", "left", "thoughtful", "The chain is short."),
        d("DORATH", "left", "neutral", "The chain is very short."),
      ],
      null,
      { relationships: { dorath: 12, maren: 8, lenne: 6 } }
    ),
  ]),

  n("The letter has a postscript. Maren reads it last, after the discussion has settled."),

  d("MAREN", "left", "quiet", "Postscript: the faction is aware that the correction is incomplete. They have identified the fifth stage as the likely site of a further alteration but cannot confirm it without a reference text. They are requesting contact with anyone outside the Spire who may hold the original transmission. The request is addressed to the lineage."),

  n("Everyone looks at Lenne."),

  d("LENNE", "left", "neutral", "He found the fifth stage on his own."),

  d("MAREN", "left", "quiet", "He is already further along than we thought."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 6 — THE FRACTURE  (Week 6 gate)
  // A second letter arrives — this one from the opposing faction.
  // The Spire's administration is moving against the reform group.
  // Cliffhanger: One of the four in review has been expelled. It is someone Lenne knows.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Three days after the first letter, a second letter arrives through a different node in Eran's network — a node that Dorath identifies as the one used for more urgent communications, the routing that bypasses the standard verification cycle in exchange for speed. The letter is shorter than the first. The tone is different.",
    BG.act3_aevorn_inn, false,
    { id: 'a3_seg6', title: 'The Fracture', summary: "A second letter: the Spire's administration moves against the reform group. One practitioner expelled." }
  ),

  n("Maren reads it once, quickly, then hands it to Dorath. Dorath reads it, sets it down, and reports without editorial."),

  d("DORATH", "left", "neutral", "The consultation review for the four practitioners on the third level has concluded early. Standard review is two to four weeks. This one concluded in nine days. One of the four has been expelled from the Spire — administrative removal, meaning they have been asked to leave the building and their level credentials have been revoked. The other three have been returned to a reduced assignment — the fourth level is now off-limits to them."),

  d("SERATH", "left", "neutral", "The administration accelerated the review."),

  d("DORATH", "left", "neutral", "Yes. The acceleration means they are aware that something is happening at a faster rate than the standard review process was designed to address. They either have intelligence about the faction or they are moving as a precaution because the discrepancy reports are becoming too numerous to manage slowly."),

  d("RYN", "right", "quiet", "How many total discrepancy reports at this point."),

  d("DORATH", "left", "neutral", "The letter does not give a number. It describes the reports as 'sufficient to require administrative attention,' which in Eran's network notation means more than ten and fewer than fifty."),

  d("MAREN", "left", "thoughtful", "The seeded text is doing more than creating a private faction. It is creating a volume of questions the Spire cannot absorb quietly."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     2,
    pauseNarrator: "Two tasks: understanding the identity of the expelled practitioner and analyzing what the accelerated review means for the timeline.",
    continueNarrator: "The practitioner is identified. The timeline is understood.",
  },

  n("The expelled practitioner's name arrives in a third notation, sent separately and in the older cipher that signals information too sensitive for the standard channel. Lenne reads the cipher."),

  n("She is quiet for a long moment."),

  d("LENNE", "left", "neutral", "Her name is Pael. She was a student at the same level as Cavar when I was inside the Spire. She reached the fourth level two years after I left. She was one of the most careful practitioners I knew."),

  d("MAREN", "left", "quiet", "She was in the faction."),

  d("LENNE", "left", "neutral", "She was in the review. Which means she reported the discrepancy officially — went through the Spire's standard channel to document what the seeded text revealed. That is a different action than the faction. That is someone who believed the institution could correct itself if given the right information."),

  d("DORATH", "left", "neutral", "And the institution expelled her."),

  d("LENNE", "left", "neutral", "Yes."),

  ch("A3_SEG6_FRACTURE", [
    op(
      "Ask where Pael will go now. She has been expelled — what happens to a practitioner removed from the Spire.",
      "ASK_PAEL_NOW",
      [
        d("KAEL", "right", "neutral", "Pael. Expelled. Where does she go."),
        d("LENNE", "left", "neutral", "Nowhere immediately. The Spire's expulsion is administrative — they do not remove practitioners by force. She would leave the building, lose access to the fourth-level materials, and find herself outside the structure she has worked inside for years. Some expelled practitioners go to the city. Some leave the eastern territories."),
        d("KAEL", "right", "neutral", "Some go north."),
        d("LENNE", "left", "neutral", "If she knows to look for Aevorn, and if she has the cipher to reach the lineage channel — yes. She might come here."),
        d("MAREN", "left", "thoughtful", "We should be prepared for that."),
      ],
      null,
      { relationships: { lenne: 10, maren: 8, dorath: 6 } }
    ),
    op(
      "Ask what this means for Cavar's faction — the expulsion of someone who used the official channel is a signal to the faction.",
      "ASK_CAVAR_SIGNAL",
      [
        d("KAEL", "right", "neutral", "Pael went through the official channel. She was expelled. Cavar's faction has been working privately. They will see what happened to Pael and know what it means for them."),
        d("LENNE", "left", "neutral", "Yes. The expulsion is a message: the official channel does not work. The administration is not open to correction. Cavar's faction will not be able to work publicly — their only path is through the private documentation they have been building, or through contact with someone outside the Spire."),
        d("SERATH", "left", "neutral", "Contact with us."),
        d("LENNE", "left", "neutral", "Yes. The expulsion will accelerate Cavar's timeline. He cannot wait for the documentation to be complete. He will need to act before the administration identifies the faction."),
        n("The timeline has just shortened significantly. What was days has become perhaps hours. Or it was hours already and the letters were already behind the event."),
      ],
      null,
      { relationships: { lenne: 12, serath: 8, maren: 10 } }
    ),
  ]),

  n("Dorath goes to the window and looks down at the street. It is midday. Aevorn is moving in its ordinary way — market square activity, the sound of the mill, two children running the cobblestones with the heedless energy of children who have not yet been asked to be careful. She watches for a long moment."),

  d("DORATH", "left", "neutral", "We should assume that within a week, someone from the Spire will be moving north. Either Cavar, or someone from the administration trying to locate where the seeded text originated. We should decide how we want to receive whoever arrives first."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 7 — THE UNNAMED THIRD  (Week 7 gate)
  // Tal's information leads to a specific location in Aevorn.
  // The Unnamed Third is not a person. It is something else.
  // Cliffhanger: What they find changes everything.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "On the ninth morning in Aevorn, Serath finds what Tal's notation was pointing to. He has been working through the lineage materials that Lenne made available — not the practice texts but the historical record, the lineage's own documentation of its history north of the Archive. Three pages from the end of the fourth volume, there is an entry dated two hundred and eleven years ago.",
    BG.act3_aevorn_study, false,
    { id: 'a3_seg7', title: 'The Unnamed Third', summary: "Serath finds what Tal\'s information was pointing to. The Unnamed Third is not a person." }
  ),

  d("SERATH", "left", "neutral", "I need everyone in this room."),

  n("When Serath speaks with this register — measured, precise, and carrying a quality you have learned to identify as the sound he makes when he has found something significant — everyone comes without question. Lenne joins them. The lineage materials are spread on the working table. The fourth volume is open to its last section."),

  d("SERATH", "left", "neutral", "The Unnamed Third. Tal's research identified this designation as referring to a founding actor who was removed from the public record. The lineage's own history describes the Third as the practitioner who left the Archive two centuries ago with the original stages. This is correct as far as it goes."),

  d("SERATH", "left", "neutral", "What it does not convey is what the Third left north. Not the original stages — those are what Lenne now holds, passed through the lineage. What the Third left is in this building."),

  n("He turns the page. There is a single notation on the back of the entry — a location marker in the Vraen notation, the same form that Tal used in the word she sent ahead. It corresponds, Serath says, to the address of the building they are in. Lenne's building."),

  d("LENNE", "left", "neutral", "I know what it is. I have known since I received the transmission from my teacher. She showed me the room before she died."),

  n("There is a room on the ground floor of the building that Lenne told the group was storage. She did not lie — it does contain stored items. But the room's primary content is not what was stored recently. It is what was placed there two hundred and eleven years ago by the practitioner who left the Archive and came north with what the Archive's public record says was nothing."),

  {
    type:          'task_gate',
    gateStyle:     'search',
    taskSlots:     2,
    pauseNarrator: "Two tasks before the room is opened: understanding what the lineage's history records about the Third's departure, and preparing to receive information that may be difficult to hold without the right context.",
    continueNarrator: "The room opens.",
  },

  n("Lenne leads them downstairs. The door to the storage room has a latch of the ordinary kind and a second fastening that uses the Vraen notation form — a physical cipher, not a lock. You would not know it was there if you did not know to look for it. Lenne's hands move through the release sequence without hesitation. She has done this before. She does it this time with a formality she did not have before — the formality of doing something in front of witnesses for the first time."),

  n("The room is larger than the ground floor layout suggested. The back wall is further than the front wall's position would indicate — the building's exterior is slightly different from its interior, a small architectural deception that has held for over two centuries. The room contains shelves. On the shelves are texts."),

  d("LENNE", "left", "neutral", "Forty-seven texts. The Third's personal library — the records she kept of the original practice, the full notation, the history of the method before the Archive reorganized it, and three items that have no category in the Archive's system because they predate the Archive."),

  d("MAREN", "left", "quiet", "How long have these been here."),

  d("LENNE", "left", "neutral", "Two hundred and eleven years."),

  d("SERATH", "left", "neutral", "These are the originals."),

  d("LENNE", "left", "neutral", "Yes."),

  n("Serath moves toward the shelves with the careful deliberateness of someone who has spent a career learning how to approach primary sources without disturbing them. He does not touch. He reads the spines where they are legible and uses a small lamp Lenne hands him for the ones that are not."),

  d("SERATH", "left", "neutral", "These are the texts the Archive was built to hold. The ones the Archive said it held. The Archive's founding claim was that it was the repository of the complete method in its original form. This is the original form. It has been here. In this room. Two hundred and eleven years."),

  ch("A3_SEG7_ROOM", [
    op(
      "What does the presence of the originals change. Ask Maren.",
      "ASK_MAREN_IMPLICATIONS",
      [
        d("KAEL", "right", "neutral", "The originals. What does it change."),
        d("MAREN", "left", "quiet", "Everything. The Archive burned. The Spire holds the altered version. The lineage holds the corrected stages. And here, in this room, is the complete original method in the Third's own notation. This is not a partial correction. This is the source."),
        d("KAEL", "right", "neutral", "And if the Spire's reform faction knew it existed."),
        d("MAREN", "left", "quiet", "They would have everything they need to rebuild the practice on a correct foundation. Not correcting the altered version stage by stage. Starting from the original and building forward. The Spire's structure does not survive that."),
        d("DORATH", "left", "neutral", "Which is exactly why the administration would do anything to prevent it from becoming known."),
      ],
      null,
      { relationships: { maren: 14, lenne: 10, serath: 8 } }
    ),
    op(
      "Ask Lenne why she did not tell them immediately. She has held this since she received the transmission.",
      "ASK_WHY_NOT_TOLD",
      [
        d("KAEL", "right", "neutral", "You have known about this since your teacher showed you. Why did you not say so when we arrived."),
        d("LENNE", "left", "neutral", "Because showing the room to people who have not demonstrated completion would violate the Third's original instruction. The transmission the lineage passes includes a specific requirement: the room is not shown until a group arrives carrying a completed method from outside the lineage's own transmission. Tal's notation confirmed you were that group. I needed to be certain before I brought you here."),
        d("KAEL", "right", "neutral", "Certain of what."),
        d("LENNE", "left", "neutral", "That what you completed was real. I have been watching how you hold the method. How it moves with you. Whether it is carried or whether it is wearing you. It is carried. I was certain after the second day."),
        n("You understand. The room was not a secret she was keeping. It was a threshold she was guarding, correctly, until the right people arrived."),
      ],
      null,
      { relationships: { lenne: 16, maren: 10 } }
    ),
  ]),

  n("The cliffhanger is not dramatic. It is quiet. Serath finds it in the third text he examines, the one with no spine label, the one that was placed at a specific position on the middle shelf."),

  d("SERATH", "left", "neutral", "This text is not a practice record. It is a correspondence record. Letters between the Third and someone inside the city — not the Archive, the city — during the period immediately before the Third's departure. The last letter is dated three weeks before the departure."),

  d("SERATH", "left", "neutral", "The letter describes a meeting that will happen after the departure. A meeting that the correspondent is expected to arrange. The correspondent is identified by a notation I have not seen before. But the appointment title they hold is clearly stated."),

  n("He pauses."),

  d("SERATH", "left", "neutral", "The title is Keeper of the Spire's Fifth Level. A level that the Spire's current public structure does not contain. The Spire, as it exists now, has four levels."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 8 — THE FIFTH LEVEL  (Week 8 gate)
  // The correspondence reveals a fifth level. Hidden. Possibly still active.
  // What the Third planned. What the Fifth Level was built to hold.
  // Cliffhanger: Cavar's notation arrives. He is on the northern road.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The correspondence takes two days to fully read. Not because it is long — the letters are concise, the Third's handwriting economical — but because each letter requires cross-referencing with the lineage's historical record to place it in context. Serath and Lenne do this work together. You and Maren and Ryn work through the implications while the reading continues.",
    BG.act3_aevorn_study, false,
    { id: 'a3_seg8', title: 'The Fifth Level', summary: "The correspondence reveals a hidden fifth level in the Spire. Cavar is on the northern road." }
  ),

  n("The Fifth Level was built in the founding period, before the administration changed. It was designed to hold a specific function: the transmission of the original method to practitioners who had been trained by the Spire's system and had reached the point where the alteration was becoming visible to them. A remediation level. A place where the damage done by stages five, seven, nine, and twelve could be corrected, privately, by practitioners who had been admitted to the Spire's fifth level and given the original texts."),

  d("MAREN", "left", "thoughtful", "The Spire was designed to both corrupt and correct. The alteration and the remedy in the same structure."),

  d("SERATH", "left", "neutral", "Yes. The founding administration believed that a small number of practitioners needed to hold the complete original method for structural reasons — to maintain the genuine practice within the institution and to ensure the institution could not entirely lose the real form. The Fifth Level was the mechanism for this."),

  d("RYN", "right", "quiet", "And it was removed."),

  d("SERATH", "left", "neutral", "The second administration removed it. Replaced it with what is now the fourth level's extended reading program. But whether the Fifth Level was physically removed from the building, or merely administratively removed from the public structure, the letters do not say."),

  d("LENNE", "left", "neutral", "I was inside the building for four years. I have been inside the Spire's physical structure on every level. I did not see a fifth level."),

  d("MAREN", "left", "thoughtful", "The same principle as this room."),

  n("The room they are sitting in, whose back wall is further than the building's exterior suggests. The principle of a space that exists inside a larger structure without being accessible to people who are not told to look for it."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     3,
    pauseNarrator: "Three tasks: locating any reference in the Third's correspondence to the Fifth Level's physical position, determining whether the Keeper designation persisted after the Fifth Level's administrative removal, and establishing what material the Fifth Level was designed to hold.",
    continueNarrator: "The investigation is complete.",
  },

  n("The physical position reference is in the seventh letter. The Fifth Level is described as accessible from a specific junction in the fourth level's north corridor — a point that Lenne confirms exists, that she passed through many times, and that has a doorway she always assumed was a utility passage."),

  d("LENNE", "left", "neutral", "I assumed because I was not told to look. The same reason I would not have found the cipher on this room's door if I had not been shown it."),

  d("SERATH", "left", "neutral", "The Keeper designation. The Third's correspondent held it when the Fifth Level was active. The correspondence ends two years after the Third's departure. The final letter is not from the Third — it is from the correspondent, addressed to whoever finds this record."),

  n("He reads it."),

  d("SERATH", "left", "neutral", "It says: the Fifth Level will remain accessible to one individual at a time, selected by the current Keeper and holding the designation privately. The designation is not abolished by the administrative change. It is simply removed from the record. The Keeper continues. The Fifth Level continues. The material it holds continues to be available to practitioners admitted by the current Keeper. The line of Keepers is unbroken from the founding to the present."),

  n("The room is very quiet."),

  d("MAREN", "left", "quiet", "The Fifth Level is still active."),

  d("SERATH", "left", "neutral", "If the line of Keepers is unbroken. Yes."),

  d("LENNE", "left", "neutral", "Cavar is a fourth-level practitioner. He would have been inside the north corridor many times."),

  ch("A3_SEG8_RESPONSE", [
    op(
      "Cavar may be the current Keeper. Ask Lenne if that is possible.",
      "ASK_CAVAR_KEEPER",
      [
        d("KAEL", "right", "neutral", "Cavar. Is it possible he is the current Keeper."),
        d("LENNE", "left", "neutral", "The selection criteria for the Keeper: a fourth-level practitioner who has identified the alteration independently, without being told what to look for. Cavar identified the alteration — I know this because he found it at the same time I did, before I left. If the previous Keeper recognized his identification, and if the line continued—"),
        d("MAREN", "left", "quiet", "He is on the reform faction not because he is a reformer. He is on the reform faction because he is the Keeper. He already has the original fifth stage."),
        n("The shape of the situation rearranges itself completely. Cavar has not been working from inside the Spire's damaged system toward the original method. He has been inside the original method the whole time."),
      ],
      null,
      { relationships: { lenne: 14, maren: 12, serath: 10 } }
    ),
    op(
      "If the Fifth Level is still active, then the Spire contains the complete original method right now — accessible to the Keeper. Say so.",
      "STATE_SPIRE_CONTAINS",
      [
        d("KAEL", "right", "neutral", "The Fifth Level holds the original texts. Accessible to the current Keeper. Which means the complete original method is inside the Spire, inside the building that has been distributing the altered version for a century and a half. Both versions. In the same building."),
        d("SERATH", "left", "neutral", "Yes. The Spire was built to hold both the damage and the remedy. The original design assumed that the damage would be necessary for a period and the remedy would become available when the conditions were right."),
        d("DORATH", "left", "neutral", "The conditions being: practitioners capable of recognizing the alteration, an external pressure that created fracture, and a connection to the lineage north of here."),
        d("MAREN", "left", "quiet", "Which is exactly where we are."),
      ],
      null,
      { relationships: { maren: 12, serath: 12, dorath: 8 } }
    ),
  ]),

  n("Brek comes in from his morning circuit. He has not been inside the study during the analysis — his work has been the perimeter, the road-check, the daily assessment of Aevorn's ordinary movement. He comes in now with a specific quality to his walk: the quality of someone who has found something and has taken two minutes to decide whether it matters before coming inside to report it."),

  d("BREK", "left", "neutral", "Someone came in on the north approach road this morning. He arrived on foot. He is at the inn at the square. I looked at him from the market. He is carrying very little — light pack, no trade goods, nothing that explains why someone would walk this road in this season. His shoes are the kind made in the eastern city."),

  n("He pauses."),

  d("BREK", "left", "neutral", "He is sitting in the inn eating a meal and looking at the northeast building. He is not being obvious about it. He is being careful. But he has looked at this building three times in the time I watched him."),

  n("Lenne closes the correspondence volume."),

  d("LENNE", "left", "neutral", "I know what he looks like. Show me."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 9 — CAVAR ARRIVES  (Week 9 gate)
  // Cavar is in Aevorn. Lenne confirms his identity. He is not hostile.
  // Cliffhanger: He came alone. But he was not the only one who left the Spire.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Lenne goes to the window. The market square is visible from the northeast corner of the building's upper floor. She looks for long enough that the quality of her looking changes from scanning to recognition.",
    BG.act3_aevorn, false,
    { id: 'a3_seg9', title: 'Cavar Arrives', summary: "Cavar has come to Aevorn alone. Lenne confirms his identity. He was not the only one who left." }
  ),

  d("LENNE", "left", "neutral", "That is Cavar."),

  n("She says it the way you say the name of someone you have been expecting to see again for four years when you finally do. Quietly. Without drama."),

  d("DORATH", "left", "neutral", "He came north by himself."),

  d("LENNE", "left", "neutral", "He would not want to be seen traveling in a group. A single practitioner on the northern road is less notable than a group. And he would need to be the one to make the first contact — not as a representative of the faction but as himself."),

  d("MAREN", "left", "thoughtful", "You trust him."),

  d("LENNE", "left", "neutral", "I trusted him four years ago. Whether the four years inside the Spire changed what I trusted — I do not know yet. That is what this meeting is for."),

  n("The question of whether and how to approach him takes an hour to resolve. Dorath wants to observe him for another day before making contact. Maren wants to make contact today but control the terms. Lenne has a specific view: she should approach him first, alone, in public, without the group visible. The first approach establishes the context for everything that follows, and the context should not begin with him being surrounded."),

  n("They agree to Lenne's approach."),

  {
    type:          'task_gate',
    gateStyle:     'dialogue',
    taskSlots:     2,
    pauseNarrator: "While Lenne makes contact, two tasks: establishing a secure meeting location and preparing the group for what the initial conversation may reveal.",
    continueNarrator: "The preparation is complete. Lenne returns.",
  },

  n("Lenne is gone for two hours. When she returns, she comes in the back door, which means she used the route Dorath designated for entries that should not be visible from the square. She sits down without removing her coat."),

  d("LENNE", "left", "neutral", "He is genuine. Four years inside the Spire, working through the Fifth Level's materials, building the reform faction carefully. He recognized the discrepancy in the seeded text immediately. He has been trying to reach the lineage since the first letter."),

  d("MAREN", "left", "thoughtful", "Is he the current Keeper."),

  d("LENNE", "left", "neutral", "He was designated three years ago by the previous Keeper. Yes."),

  d("MAREN", "left", "thoughtful", "Then he already has everything the Fifth Level holds. He came here not for the original texts."),

  d("LENNE", "left", "neutral", "He came here because of the Third's correspondence. He found the reference to the lineage in the Fifth Level materials and understood that the lineage holds something the Fifth Level does not. Forty-seven texts. The Third's personal library. The ones she carried out."),

  d("SERATH", "left", "neutral", "What does he want from us."),

  d("LENNE", "left", "neutral", "He wants to know if the lineage is willing to work with the reform faction directly. Not just provide the corrected stages — work with them. The reform will not succeed if it is only the Fifth Level materials. The reform requires the lineage's transmission as well. Practitioners who completed under the Spire's altered system will need the lineage's original seventh, ninth, and twelfth stages to complete the correction. The Fifth Level can provide the original fifth stage. Lenne — and through her, the group here — holds what remains."),

  ch("A3_SEG9_CAVAR", [
    op(
      "Ask how many people are in the reform faction right now.",
      "ASK_FACTION_SIZE",
      [
        d("KAEL", "right", "neutral", "The faction. How many, and what state are they in after the expulsion."),
        d("LENNE", "left", "neutral", "He says seven. The eighth was Pael — she went through the official channel independently and is now expelled. Of the remaining seven, five are still inside the Spire with their assignments intact. Two have been placed in a monitoring status that limits their fourth-level access."),
        d("DORATH", "left", "neutral", "Five functional. Two restricted. Cavar himself — does the administration know about him."),
        d("LENNE", "left", "neutral", "Not yet. He is the most careful. The faction was structured so that no single member knows the full membership. Cavar knows all of them. None of them know the full list. If any member is pressured for names, they can only give two or three."),
        d("DORATH", "left", "neutral", "Cell structure. He thought about this."),
        d("LENNE", "left", "neutral", "He has been thinking about it for four years."),
      ],
      null,
      { relationships: { lenne: 12, dorath: 10, maren: 8 } }
    ),
    op(
      "You want to meet Cavar directly. Not through Lenne. State this.",
      "MEET_DIRECTLY",
      [
        d("KAEL", "right", "neutral", "I want to meet him. Not a relayed report. Directly."),
        d("MAREN", "left", "thoughtful", "That is exactly what Dorath will want to avoid for now."),
        d("DORATH", "left", "neutral", "Yes. One more day of observation before direct contact. I want to confirm he arrived alone and that the road behind him is clear."),
        d("KAEL", "right", "neutral", "One day."),
        d("DORATH", "left", "neutral", "One day. After that, you can meet him. It is reasonable. It is also necessary."),
        n("Dorath says this with the quality she has when she considers something necessary rather than merely cautious — a distinction that matters to her and that you have learned to recognize."),
      ],
      null,
      { relationships: { dorath: 10, maren: 6 } }
    ),
  ]),

  n("Lenne sits forward."),

  d("LENNE", "left", "neutral", "There is something he told me that I need to say plainly. He came north alone. But he was not the only one to leave the Spire in the last two weeks. The administration expelled Pael, yes. But it also quietly removed two other practitioners from their assignments — practitioners who had nothing to do with the reform faction. Cavar believes the administration is removing anyone who read the seeded text carefully enough to identify the discrepancy, regardless of whether they acted on it."),

  d("MAREN", "left", "quiet", "They are cleaning house."),

  d("LENNE", "left", "neutral", "The administration knows the fracture is real. They are trying to contain it before it reaches the senior levels. Cavar does not know how much time the faction has before the administration identifies the private structure. His estimate is two weeks."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 10 — CAVAR'S PROPOSAL  (Week 10 gate)
  // The full meeting. Cavar speaks directly.
  // Cliffhanger: His proposal requires putting the Third's library at risk.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The meeting happens in Lenne's four-chair room, extended to eight chairs borrowed from the inn. Cavar arrives through the back entrance at the time Dorath designated. He is in his thirties, careful in movement, with the look of someone who has been operating under pressure for long enough that careful movement has become his natural register. He sits where Lenne indicates, looks at each person in the room once, and then begins.",
    BG.act3_aevorn_hall, true,
    { id: 'a3_seg10', title: "Cavar's Proposal", summary: "The full meeting. Cavar presents the reform faction's proposal. It requires risking the Third's library." }
  ),

  d("CAVAR", "left", "neutral", "I will be direct about what I can offer and what I am asking for. I have been inside the Spire for eight years. Four years as a standard practitioner, four years as the Fifth Level's Keeper. The Fifth Level holds the original fifth stage and the Keeper's records back to the founding. What it does not hold is the lineage's transmission of stages seven, nine, and twelve — the three stages that were altered after the Fifth Level's administrative removal."),

  d("CAVAR", "left", "neutral", "The reform faction has the capacity to create a complete corrective document — a text that contains the original versions of all four altered stages plus the original fifth stage from the Fifth Level. If this document is placed in the Spire's general library under a notation that appears to be standard administrative archive material, every practitioner in the Spire will have access to it within forty-eight hours."),

  d("MAREN", "left", "thoughtful", "You want the lineage's stages seven, nine, and twelve."),

  d("CAVAR", "left", "neutral", "Yes. Written in the original Vraen notation, identical to the format of the Fifth Level's existing materials so that a practitioner encountering them will recognize them as authentic."),

  d("DORATH", "left", "neutral", "And the placement. You would do this yourself."),

  d("CAVAR", "left", "neutral", "I and two faction members who still have full library access. The placement would take three hours. If it is done correctly, it will not be attributed to the faction. The document will appear to be a long-archived text that was misfiled a century ago and recently rediscovered."),

  {
    type:          'task_gate',
    gateStyle:     'dialogue',
    taskSlots:     3,
    pauseNarrator: "The proposal requires careful evaluation. Three tasks: understanding the risks to the faction, assessing what the lineage would be committing to, and verifying that the placement can be done without attribution.",
    continueNarrator: "The evaluation is complete.",
  },

  n("The discussion takes three hours. The risk assessment is Dorath's work. The lineage evaluation is Lenne's. The placement mechanics are Cavar's. At the end of three hours, the main shape of the proposal is understood."),

  d("DORATH", "left", "neutral", "The risk to the faction if the placement is discovered and traced: the two faction members who do the placement would be removed immediately. Cavar would be identified as the coordinator and removed. The Keeper designation is not a known institutional role — the administration would not know to look for it, but a thorough investigation would eventually find the Fifth Level."),

  d("CAVAR", "left", "neutral", "Yes. Discovery would effectively end the faction and expose the Fifth Level."),

  d("LENNE", "left", "neutral", "The risk to the lineage: the original stages seven, nine, and twelve, once placed in the Spire's library, are no longer exclusively in the lineage's possession. The document can be copied. It can be studied. It can be misused by practitioners who have the text but not the transmission."),

  d("CAVAR", "left", "neutral", "Yes. I am asking you to give up the exclusivity of what the lineage holds."),

  n("This is the proposal stated at its full cost. No mitigation offered. He is not softening it."),

  ch("A3_SEG10_PROPOSAL", [
    op(
      "Ask Maren what she thinks. This is her decision to make alongside Lenne.",
      "ASK_MAREN",
      [
        d("KAEL", "right", "neutral", "Maren."),
        d("MAREN", "left", "quiet", "The method was not built to be exclusive. The Archive burned trying to hold it exclusively. The lineage has held it exclusively for two centuries out of necessity, not design. The Third's intention was always that the complete method would return to general transmission when conditions allowed it."),
        d("MAREN", "left", "quiet", "The question is not whether to release it. The question is whether this is the right release."),
        d("LENNE", "left", "neutral", "The Third's condition was: when the Spire fractures from within. The fracture is happening. The faction exists. The conditions are as close to met as they are likely to get."),
        d("MAREN", "left", "quiet", "Then I think we are within sight of the right release."),
      ],
      null,
      { relationships: { maren: 14, lenne: 12, cavar: 10 } }
    ),
    op(
      "Ask Cavar: if the placement succeeds, what happens to the Spire's administration.",
      "ASK_ADMINISTRATION",
      [
        d("KAEL", "right", "neutral", "The administration. If the complete corrective text is in the Spire's general library, what happens to the people running the institution."),
        d("CAVAR", "left", "neutral", "The administration has maintained its authority by controlling access to the method's completion. If practitioners can complete correctly without the Spire's ongoing validation — if the method carries without institutional support — the administration loses its primary mechanism of control."),
        d("KAEL", "right", "neutral", "They will not accept that quietly."),
        d("CAVAR", "left", "neutral", "No. There will be a period of significant internal conflict. Some practitioners who have completed under the altered system will not accept that their completion was built on a wrong foundation — the implications for their identity inside the Spire are too large. Others will accept it and need the corrective work. The institution will need to choose what it becomes after that conflict."),
        d("MAREN", "left", "thoughtful", "Whether it becomes a genuine institution or it fractures entirely."),
        d("CAVAR", "left", "neutral", "Yes. I believe it can become genuine. I have been inside it for eight years. The people there are not all working in bad faith. Most of them never knew the method was altered. Most of them want what we all want: completion that is real. The administration is not most of the people."),
      ],
      null,
      { relationships: { cavar: 14, maren: 10, serath: 8 } }
    ),
  ]),

  n("The meeting ends without a decision. Maren asks for a night before she gives an answer. Cavar accepts this. When he leaves, Lenne walks him to the back entrance and says something quiet that the others cannot hear. He nods. She watches him go."),

  n("That night, Serath finds the item in the Third's library that changes what everyone thought the proposal cost."),

  d("SERATH", "left", "neutral", "The forty-seventh text. The one I had not opened yet. It is not a practice record or a correspondence. It is an instruction — addressed to whoever is in possession of the library when the conditions for its release are met. It describes exactly the kind of placement Cavar is proposing. It describes it in enough detail that either Cavar has read this text, or he arrived at the same solution independently."),

  d("SERATH", "left", "neutral", "And it names the condition under which the placement should happen."),

  n("He reads it. The Third's handwriting, two hundred and eleven years old, in the notation that predates the Archive."),

  d("SERATH", "left", "neutral", "The condition: when a group carrying a completed transmission from outside the lineage arrives in the North. When a practitioner from the Spire's Fifth Level requests the lineage's transmission directly. And when the one who holds the lineage judges the request genuine."),

  n("All three conditions are met."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 11 — MAREN'S TEST  (Week 11 gate)
  // Maren designs the conditions under which they will agree.
  // The test she sets for Cavar. What she wants to be certain of.
  // Cliffhanger: The test reveals something unexpected.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The morning after Serath's discovery, Maren asks to speak to Cavar alone. Not in the four-chair room but outside — the ridge path north of the settlement, where the cold is clean and the view runs back toward the plains. You watch them go from the window. They walk side by side without speaking for the first hundred meters.",
    BG.act3_mountain_ridge, true,
    { id: 'a3_seg11', title: "Maren's Test", summary: "Maren designs the conditions for agreement. The test reveals something unexpected about Cavar." }
  ),

  n("They are gone for three hours. When they return, Maren comes inside first. Cavar waits in the yard. She gathers the group."),

  d("MAREN", "left", "thoughtful", "I have a test I want to run before we agree to anything. Cavar has agreed to it. The test is designed to verify a specific quality of his completion — whether the work he has done through the Fifth Level has produced genuine completion or a skilled practitioner's approximation of it."),

  d("DORATH", "left", "neutral", "What distinguishes the two."),

  d("MAREN", "left", "thoughtful", "A practitioner who has completed genuinely, when given a specific problem that cannot be solved by method knowledge alone, will find an answer that is structurally consistent with how a completed method moves. A practitioner who is very good but has not completed will produce an answer that is method-shaped but structurally off. The difference is not in the sophistication of the answer. It is in a quality I can only describe as its direction — genuine completion moves toward something. Very good approximation moves away from something."),

  d("SERATH", "left", "neutral", "What is the problem you will give him."),

  d("MAREN", "left", "thoughtful", "I am not going to describe it in advance. If it is described in advance it becomes a test of what he knows I am looking for, which is not what I am testing."),

  {
    type:          'task_gate',
    gateStyle:     'dialogue',
    taskSlots:     2,
    pauseNarrator: "While Maren prepares the test, two tasks: understanding what the Fifth Level's transmission includes that the lineage's does not, and preparing for the possibility that the test reveals something other than what Maren expects.",
    continueNarrator: "The preparation is done.",
  },

  n("The test takes place in the four-chair room with only Maren and Cavar present. The group waits in the working room. Lenne sits at the table but does not work. Ryn reads. Brek moves to the window and back at intervals that suggest contained restlessness. Serath writes."),

  n("You wait with them."),

  n("After forty minutes, Maren opens the door. She comes into the working room and sits down."),

  d("MAREN", "left", "quiet", "He passed the test."),

  d("LENNE", "left", "neutral", "You expected him to."),

  d("MAREN", "left", "quiet", "I expected him to pass. What I did not expect is what the test also revealed."),

  n("She takes a moment."),

  d("MAREN", "left", "quiet", "The quality I described as direction — what a genuine completion moves toward. Cavar's completion moves toward something I have only seen once before. In the group that completed at the settlement. In the person in this room who completed earliest."),

  n("She looks at you."),

  d("MAREN", "left", "quiet", "Cavar's completion is structurally identical to yours. Not similar. Identical. That is not possible if he came to it through the Fifth Level's transmission alone. The Fifth Level holds the original stages but not the method Sira found. Not the fourteenth fragment. His completion contains something from the lineage of the fourteenth fragment — something that was not in any text the Fifth Level holds."),

  n("The room is quiet."),

  d("LENNE", "left", "neutral", "The Third's personal library. The forty-seven texts."),

  d("MAREN", "left", "quiet", "There is a text in that room that Cavar has read. The one that gave him what the Fifth Level could not. I want to know which one."),

  ch("A3_SEG11_TEST_RESULT", [
    op(
      "Go to Cavar directly. Ask him.",
      "ASK_CAVAR_DIRECTLY",
      [
        n("You go into the four-chair room. Cavar is still seated, his hands on the table. He looks up when you enter."),
        d("KAEL", "right", "neutral", "The text. The one you read that gave you what the Fifth Level did not. You have been in this room before."),
        n("He is quiet for a long moment."),
        d("CAVAR", "left", "neutral", "Once. Seven months ago. The Keeper before me told me of this room before he died. He told me the back entrance would be unlocked for three days after his death. I came north. I read the forty-seventh text."),
        d("KAEL", "right", "neutral", "And you said nothing when you arrived."),
        d("CAVAR", "left", "neutral", "I said I came because of the Third's correspondence. That is true. I also came because I already understood what the forty-seventh text instructed and I needed to know if the conditions it described were met. They are. That is why I am here now."),
      ],
      null,
      { relationships: { cavar: 12, maren: 10 } }
    ),
    op(
      "Tell Maren what the result means: Cavar was already working from the Third's instruction. He was not discovering this — he was executing it.",
      "STATE_EXECUTING",
      [
        d("KAEL", "right", "neutral", "He was not coming to us. He was executing the Third's instruction. He already knew the conditions that needed to be met and he waited for them to be met."),
        d("MAREN", "left", "quiet", "Which means everything he has done inside the Spire — the four years, the Fifth Level work, the reform faction — was preparation for this meeting, not an independent parallel development."),
        d("SERATH", "left", "neutral", "The Third designed this. Two hundred years ago. A practitioner who would find the Fifth Level, read the forty-seventh text, build the faction inside the Spire, and arrive in Aevorn when the lineage group arrived."),
        d("LENNE", "left", "neutral", "The Third designed most of what has happened. We have been inside a plan longer than any of us knew."),
      ],
      null,
      { relationships: { maren: 14, serath: 12, lenne: 10 } }
    ),
  ]),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 12 — CAVAR PASSES  (Week 12 gate)
  // Cavar is genuine. But he was followed.
  // Cliffhanger: A second person arrived in Aevorn this morning.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The decision is made the following morning, after Cavar has answered every question the group had and a few they had not thought to ask. The answer is yes: the lineage will provide the original stages seven, nine, and twelve. Lenne will transcribe them in the Vraen notation. The combined corrective document — the original fifth stage from the Fifth Level, plus the lineage's three stages — will be prepared over the next two days.",
    BG.act3_aevorn_inn, false,
    { id: 'a3_seg12', title: 'Cavar Passes', summary: "The decision is made. Cavar is genuine. But a second operative has arrived in Aevorn." }
  ),

  n("The work of transcription is careful and slow. Lenne works through it with Cavar reviewing each notation against the Fifth Level's format. Ryn observes and takes notes. Serath assists with the historical record sections. The preparation is going well."),

  n("On the second morning, Brek comes in from his horizon check with a quality you have not seen from him since the eastern city: contained alertness, the posture of someone who has found something that requires immediate reporting but is not yet an emergency."),

  d("BREK", "left", "neutral", "Second arrival. Yesterday afternoon, while we were working. She came in on the southern road — not from the east but from the south, which means she came north through the interior road, not the eastern route Cavar used."),

  d("DORATH", "left", "neutral", "Description."),

  d("BREK", "left", "neutral", "Late thirties. Traveling alone. She is staying at the inn on the south side of the square, not the one Cavar is at. She has not made contact with him — I watched both inns this morning and there is no interaction between them. She has been in the square twice, looking at the northeast building both times."),

  d("DORATH", "left", "neutral", "She came from the south. Which means she did not follow Cavar from the eastern city."),

  d("BREK", "left", "neutral", "No. She was already on her way here before he left."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     2,
    pauseNarrator: "Two tasks: identifying who sent her and whether her arrival is connected to Cavar's faction or to the administration.",
    continueNarrator: "The investigation yields a result.",
  },

  n("The identification takes most of the day. The southern road connects to a different node of Eran's network than the eastern route — a node that has historically been used by practitioners moving between the western districts and the North. Dorath cross-references the timing with the letters already received."),

  d("DORATH", "left", "neutral", "The letter that arrived eight days ago — the one through the urgent channel. The routing went through the western network node. The second arrival used the same node. She was sent by whoever sent that letter."),

  d("MAREN", "left", "thoughtful", "The urgent letter came through a different channel than the first. We assumed it was from the same source."),

  d("DORATH", "left", "neutral", "We assumed incorrectly. The first letter was from Cavar's faction. The second letter — the one that reported the accelerated review and Pael's expulsion — came from a different source inside the Spire. Someone who knows about the faction but is not in it."),

  d("SERATH", "left", "neutral", "The administration."),

  d("DORATH", "left", "neutral", "Or someone between the administration and the faction. Someone who has been watching both."),

  ch("A3_SEG12_SECOND_ARRIVAL", [
    op(
      "Ask Cavar if he knows who she is. He has been inside the Spire for eight years — he may recognize the description.",
      "ASK_CAVAR_SECOND",
      [
        d("KAEL", "right", "neutral", "The second arrival. You have been inside the Spire. Late thirties, came from the south. Does she mean anything to you."),
        d("CAVAR", "left", "neutral", "Description of her movement — careful, observational, arrives alone from an unexpected direction. The Spire's observation corps uses exactly that protocol. They do not send agents from the expected direction."),
        d("DORATH", "left", "neutral", "Is she from the administration."),
        d("CAVAR", "left", "neutral", "The observation corps reports to the administration but operates independently. They were sent before I left — which means the administration identified that someone was heading north and dispatched someone to follow the lead. Not me specifically. The general direction."),
        d("DORATH", "left", "neutral", "She is here to find what the administration is looking for. Not specifically us. The lineage."),
        d("CAVAR", "left", "neutral", "Yes."),
      ],
      null,
      { relationships: { cavar: 12, dorath: 10 } }
    ),
    op(
      "The transcription work needs to continue. The second arrival changes the timeline but not the decision. State this.",
      "STATE_CONTINUE",
      [
        d("KAEL", "right", "neutral", "The work continues. The second arrival is a threat we need to manage, but it does not change what we decided to do."),
        d("MAREN", "left", "thoughtful", "Agreed. The question is whether the threat she represents allows us to complete the transcription before the situation requires a response."),
        d("DORATH", "left", "neutral", "How much time do we have before she makes a move."),
        d("CAVAR", "left", "neutral", "The observation corps runs a three-day assessment before they act. She arrived yesterday. We have two days."),
        d("DORATH", "left", "neutral", "Then we have two days. Enough if the transcription stays on schedule."),
      ],
      null,
      { relationships: { dorath: 12, maren: 10, cavar: 8 } }
    ),
  ]),

  n("The transcription continues. The evening of the second day, Lenne finishes the last section. Cavar reviews it against the Fifth Level's notation standards. It is correct. The complete corrective document exists."),

  n("Brek comes in just before the work is finished."),

  d("BREK", "left", "neutral", "She is still at the inn. She has not made a move. But there is a rider who came in on the eastern road an hour ago and went to the inn she is staying at."),

  n("He pauses."),

  d("BREK", "left", "neutral", "The rider is not from the Spire. The rider came from the west. He is wearing the road clothes of a merchant but he has the hands of someone who has been practicing for a long time — the posture is wrong for a merchant. Someone sent him to meet her."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 13 — THE SECOND OPERATIVE  (Week 13 gate)
  // The rider's identity. A third faction.
  // Cliffhanger: The third faction is not the administration.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Dorath makes the identification by the end of the first watch. The rider is not a Spire operative and is not from the reform faction. He came from a different organization entirely — one that Dorath recognized from the notation on a letter she intercepted eighteen months ago in the eastern territories, before the group left the settlement. She had filed the notation and not acted on it because at the time it had no connection to the group's work.",
    BG.act3_aevorn_inn, false,
    { id: 'a3_seg13', title: 'The Second Operative', summary: "The rider represents a third faction. Not the administration. Something older." }
  ),

  d("DORATH", "left", "neutral", "The notation is from an organization that predates the Spire and the Archive both. I know almost nothing about them except that they have been known to appear when the method's transmission becomes a matter of institutional conflict. They do not intervene. They observe. They have never been documented acting against any party involved in the method's history."),

  d("SERATH", "left", "neutral", "Observers. From a third position."),

  d("DORATH", "left", "neutral", "As far as anyone in Eran's network knows. But that assessment is based on limited historical observation."),

  d("CAVAR", "left", "neutral", "The observation corps woman — is she working with the rider, or are they arriving at the same point from different directions independently."),

  d("DORATH", "left", "neutral", "Unknown. The rider met her at the inn. They had a conversation of approximately twenty minutes that I was not close enough to hear. After the conversation, she left the inn and walked to the east end of the square and stood there for ten minutes before returning. The rider went to his room."),

  d("BREK", "left", "neutral", "What did she do during the ten minutes in the square."),

  d("DORATH", "left", "neutral", "Looked at the northeast building."),

  {
    type:          'task_gate',
    gateStyle:     'investigation',
    taskSlots:     3,
    pauseNarrator: "Three tasks: understanding the third faction's historical role, determining whether the observation corps woman is now operating in cooperation with the rider or independently, and preparing for the possibility that both parties make a move before the two-day window closes.",
    continueNarrator: "The picture comes together.",
  },

  n("Serath works through the historical records for most of the night. The third faction — which appears in the lineage's historical notes under a designation that Lenne translates as 'the watchers of the interval' — has appeared at three documented moments in the method's history. Each appearance preceded a period of significant change in the method's institutional structure."),

  d("SERATH", "left", "neutral", "The last documented appearance was eighty years ago. Before the Fifth Level's administrative removal."),

  d("LENNE", "left", "neutral", "They appeared before it was removed. Not after."),

  d("SERATH", "left", "neutral", "Which suggests they knew it was coming. And were present to observe the transition."),

  d("MAREN", "left", "thoughtful", "They are here because what is happening now is another transition. They are not here to prevent it or accelerate it. They are here to document it."),

  d("CAVAR", "left", "neutral", "Or to ensure a specific outcome of the transition."),

  d("DORATH", "left", "neutral", "That is the risk. 'Historical observers' is a comfortable description. What we do not know is what they do with what they observe."),

  ch("A3_SEG13_THIRD_FACTION", [
    op(
      "Ask Lenne: does the lineage's historical record say anything about what the watchers do after they observe.",
      "ASK_WATCHERS",
      [
        d("KAEL", "right", "neutral", "The watchers. The lineage knows of them. What did they do after the observations you described."),
        d("LENNE", "left", "neutral", "After the Second Level observation: nothing recorded. After the Fifth Level observation: a notation, seventy years after the event, that a document appeared in a practitioner's possession that they could not explain the origin of. The document was relevant to the Fifth Level's corrective work."),
        d("SERATH", "left", "neutral", "They place things."),
        d("LENNE", "left", "neutral", "Possibly. The notation is ambiguous — it records the document's appearance, not its source. But the timing, seventy years after the event, suggests a long-term intervention that does not announce itself as intervention."),
        d("MAREN", "left", "quiet", "The Third's forty-seventh text. The one Cavar found. It was placed for him to find, in a room that the watchers may have had access to — or may have known about, or may have influenced its creation."),
        n("The depth of the structure being described. Two hundred years of preparation, designed in advance, with parties playing roles they may not have known were designed for them. The meeting in Aevorn is not an accident."),
      ],
      null,
      { relationships: { lenne: 14, serath: 12, maren: 10 } }
    ),
    op(
      "The completed document is what matters. Whatever the watchers are here for, the document can leave Aevorn tonight.",
      "STATE_DOCUMENT_LEAVES",
      [
        d("KAEL", "right", "neutral", "The document is done. Whatever is happening with the watchers and the observation corps — the document can leave tonight. Cavar can take it back with him. The rest can be resolved after."),
        d("CAVAR", "left", "neutral", "I was planning to leave tomorrow morning."),
        d("DORATH", "left", "neutral", "Tonight is better. Before the rider's intentions become clear. Before the observation corps woman's two-day assessment is complete."),
        d("MAREN", "left", "thoughtful", "Can you travel the eastern road tonight, in this cold, and arrive at the Spire in the time you need."),
        d("CAVAR", "left", "neutral", "Four days on foot, less on horseback. The faction has four days before the administration's next review cycle. It is tight but possible."),
        d("DORATH", "left", "neutral", "Tonight."),
      ],
      null,
      { relationships: { dorath: 12, cavar: 10, maren: 8 } }
    ),
  ]),

  n("The second operative — the observation corps woman — does something that evening that changes the situation. She knocks on the front door of the northeast building."),

  n("Lenne goes to the door. The woman identifies herself. She does not announce who sent her or what organization she represents. She says one sentence."),

  d("LENNE", "left", "neutral", "She said: the document is correct. The placement will succeed. But the document alone is not enough. There is a fourth stage that was altered."),

  n("No one moves."),

  d("LENNE", "left", "neutral", "A stage that is not in the lineage's transmission. Not in the Fifth Level's materials. Not in the Third's forty-seven texts. A stage that was altered before the Archive was founded."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 14 — THE FOURTH ALTERATION  (Week 14 gate)
  // The observation corps woman comes inside. What she holds.
  // Cliffhanger: The fourth alteration is in the first stage.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Her name is Senne. She comes inside without being asked and sits at the four-chair table as though she has been here before, which she has not, or as though she has been somewhere exactly like this before, which she may have. She is not from the Spire's observation corps. She tells them this immediately. The rider from the west told her what she needed to know to approach the building.",
    BG.act3_aevorn_hall, false,
    { id: 'a3_seg14', title: 'The Fourth Alteration', summary: "Senne brings information about a fourth alteration — in the first stage. Older than the Archive itself." }
  ),

  d("SENNE", "right", "neutral", "I was sent here. Not by the Spire. Not by the watchers — the rider you saw is one of the watchers, and he does not know I am here. He brought me north because I told him I was meeting a different contact. I am not."),

  d("DORATH", "left", "neutral", "Who sent you."),

  d("SENNE", "right", "neutral", "I represent an interest that is not institutional and is not political. I am a practitioner. I completed the method eleven years ago under a transmission that predates all the institutional structures involved in this conversation. What I know about the first stage comes from that transmission."),

  d("MAREN", "left", "thoughtful", "The first stage."),

  d("SENNE", "right", "neutral", "The first stage as the Archive transmitted it, as the Spire teaches it, as the lineage holds it — all three versions agree. They agree because all three derived from the same source. A source that was itself an alteration of the original, made before the Archive existed, made at a time when the method was being deliberately simplified for wider transmission."),

  d("MAREN", "left", "thoughtful", "Simplified."),

  d("SENNE", "right", "neutral", "The original first stage required a quality of preparation that the founders of the Archive believed most practitioners could not sustain. The simplification was not malicious — it was practical. But the practical simplification created a foundation for everything that followed. The alterations at stages five, seven, nine, and twelve were built on a first stage that was already not quite the original."),

  {
    type:          'task_gate',
    gateStyle:     'dialogue',
    taskSlots:     3,
    pauseNarrator: "Three tasks: understanding what the original first stage requires, verifying that Senne's transmission is genuine, and determining whether the corrective document needs to include the original first stage to work.",
    continueNarrator: "The understanding arrives.",
  },

  n("The verification of Senne's transmission is Maren's work. She asks Senne the same question she asked Cavar — the test of direction. Senne gives the same answer. Not the same words. The same direction."),

  d("MAREN", "left", "quiet", "You completed genuinely."),

  d("SENNE", "right", "neutral", "Yes."),

  d("MAREN", "left", "quiet", "The transmission that gave you the original first stage. Where does it come from."),

  d("SENNE", "right", "neutral", "I received it from a practitioner who is not affiliated with any institution. Not the Spire, not the old Archive, not the lineage. Someone who has been holding a single piece of the original method privately for the same reason the lineage has been holding three stages privately. Because no one asked, and the right moment had not come."),

  d("LENNE", "left", "neutral", "How many separate transmissions have been preserving parts of the original method outside the institutional structure."),

  d("SENNE", "right", "neutral", "I know of three. There may be more. The original method was distributed deliberately at the point of the Archive's founding — not the Archive's public distribution but a private one, made by the people who understood that the Archive's version was going to be incomplete. They split the original and gave each piece to someone who had no institutional affiliation and no reason to ever bring the pieces back together, unless the conditions called for it."),

  d("SERATH", "left", "neutral", "The conditions being: an institutional fracture, an external catalyst, and a gathering of the pieces."),

  d("SENNE", "right", "neutral", "Yes. The Third's departure was the beginning of the condition. Not the end of it."),

  ch("A3_SEG14_FOURTH", [
    op(
      "Ask what the original first stage requires that the simplified version does not.",
      "ASK_FIRST_STAGE",
      [
        d("KAEL", "right", "neutral", "The original first stage. What does it require."),
        d("SENNE", "right", "neutral", "An acknowledgment. Not of the method's origin — the simplified version includes that. An acknowledgment of what the practitioner is doing in beginning the practice at all. The original first stage is not an instruction. It is a question, given to the practitioner in a form they cannot answer easily, that they must answer genuinely before the practice can proceed."),
        d("MAREN", "left", "quiet", "What is the question."),
        d("SENNE", "right", "neutral", "The question is different for each practitioner. The original first stage provides a method for finding it, not the question itself. The simplified version replaced the method for finding the question with a generic acknowledgment that all practitioners can give. Which means all practitioners begin on the same foundation. Which is not how the original was designed."),
        d("RYN", "right", "quiet", "The original was designed to begin differently for each person."),
        d("SENNE", "right", "neutral", "Yes. The simplified version made it scalable. The original made it true."),
      ],
      null,
      { relationships: { senne: 14, maren: 12, ryn: 10 } }
    ),
    op(
      "The corrective document needs the original first stage. The placement must include it. State this.",
      "STATE_FIRST_STAGE_NEEDED",
      [
        d("KAEL", "right", "neutral", "The document Cavar is carrying — if it does not include the original first stage, practitioners who use it will correct stages five through twelve but begin from the same simplified foundation. The correction will be partial."),
        d("CAVAR", "left", "neutral", "Yes. I had not known about the first stage until this conversation. The Fifth Level does not hold it."),
        d("MAREN", "left", "thoughtful", "Can the document be amended."),
        d("SENNE", "right", "neutral", "I can write it tonight. The original first stage, in the Vraen notation, in the form that the document requires. It is not long. It is precise."),
        d("CAVAR", "left", "neutral", "If the document includes it, practitioners inside the Spire who follow the complete correction will encounter a beginning that requires something genuine from them before they can proceed. Not everyone will be able to do that. Some will do the simplified version because it is easier."),
        d("SENNE", "right", "neutral", "That is correct. The original first stage is not a barrier. It is a beginning. It asks only for what is true. Most practitioners, if given enough time and honest attention, can find it."),
      ],
      null,
      { relationships: { senne: 14, cavar: 12, maren: 10 } }
    ),
  ]),

  n("The night passes in work. Senne writes the original first stage. Ryn reviews the notation. Lenne reads it twice and says nothing for ten minutes and then says it is correct. Cavar integrates it into the document. The complete corrective document now includes the original first stage, the original fifth stage from the Fifth Level, and the lineage's original seventh, ninth, and twelfth stages."),

  n("In the morning, Brek checks the roads."),

  d("BREK", "left", "neutral", "The eastern road is clear. The rider from the west is gone — left before sunrise. The observation corps woman is still at the south inn. She has not made a move."),

  d("DORATH", "left", "neutral", "She was not from the observation corps. She said so."),

  d("BREK", "left", "neutral", "Then she is a practitioner staying at an inn in a northern settlement and she has not done anything alarming. That is fine. But someone will come north from the Spire now that the administration is moving. They will not look like a practitioner staying quietly at an inn."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 15 — DORATH'S SOLUTION  (Week 15 gate)
  // Cavar prepares to leave. The decision about the lineage's safety.
  // Cliffhanger: A Spire administrative operative arrives in Aevorn.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Two days before Cavar plans to leave. The document is finished and sealed in the notation that the Fifth Level uses for its most restricted materials. Cavar is satisfied with its integrity. The faction has been notified through the private channel that a document is coming and where to place it once it arrives. The operational side of the work is as ready as it can be.",
    BG.act3_aevorn_hall, false,
    { id: 'a3_seg15', title: "Dorath's Solution", summary: "The final decision. A Spire administrative operative arrives. The group faces its last choice before the road south." }
  ),

  n("What remains is the question of what happens to the people in Aevorn after Cavar leaves. Dorath has been working on this problem privately for three days. She presents it to the group the morning after the document is sealed."),

  d("DORATH", "left", "neutral", "The administration's operative is already on the northern road. I received confirmation through Eran's network this morning. A single operative, senior level, expected to arrive in Aevorn within two days. The operative is not from the observation corps — this is a direct administrative mission. Their objective is to locate the source of the seeded text and contain it."),

  d("DORATH", "left", "neutral", "Contain it means: remove from circulation whatever is producing the discrepancy reports. Which means us, the lineage, and the Third's library."),

  d("MAREN", "left", "thoughtful", "Options."),

  d("DORATH", "left", "neutral", "Three. First: Cavar leaves with the document tonight, the group leaves Aevorn before the operative arrives, and the northeast building is left empty. The operative finds nothing and has no target. The downside: Lenne's study, the lineage's materials, and the Third's library are abandoned without being secured."),

  d("DORATH", "left", "neutral", "Second: the group stays, meets the operative, and uses Senne's presence and the document's completion as a demonstration that the fracture is already irreversible. The operative has no function if the document is placed inside the Spire before they can act. The downside: this requires trusting that the operative will respond rationally to being presented with a completed action they cannot reverse."),

  d("DORATH", "left", "neutral", "Third: the Third's library is moved. Not abandoned — moved to a location that the operative cannot identify. The group leaves. The lineage materials travel with us. The northeast building is left as a misdirection."),

  {
    type:          'task_gate',
    gateStyle:     'dialogue',
    taskSlots:     2,
    pauseNarrator: "Two tasks: assessing each option's full implications and reaching a decision that the whole group can act on before the operative's arrival.",
    continueNarrator: "The decision is made.",
  },

  n("The discussion takes most of the afternoon. It ends not with a vote but with a convergence — the kind that happens in groups that have been working together long enough to find the same point from different angles."),

  d("MAREN", "left", "quiet", "The third option. Lenne, can the library be moved in one day."),

  d("LENNE", "left", "neutral", "The forty-seven texts are not large. The room's other contents can be left. If we take only the texts, two people can carry them in secured cases."),

  d("DORATH", "left", "neutral", "Where."),

  d("LENNE", "left", "neutral", "There is a location two days north of Aevorn. The Third's record mentions it — a secondary site, established in case the primary site was compromised. I have never needed it before."),

  d("CAVAR", "left", "neutral", "I should leave tonight then. Before the library moves. If the operative arrives and the document is already on its way to the Spire, the Aevorn operation has succeeded regardless of what they find here."),

  d("DORATH", "left", "neutral", "Yes. Tonight."),

  n("The farewell is brief. Cavar and Lenne speak for ten minutes alone in the working room. What they say is private. When Lenne comes out, her expression is the one she has been carrying since the beginning — careful, precise, contained. But there is something new beneath it. Not warmth, exactly. The quality of someone who has been confirmed in something they held with uncertainty for four years."),

  n("Cavar leaves through the back entrance at the second watch. Brek follows to the edge of Aevorn and returns."),

  d("BREK", "left", "neutral", "He is on the eastern road. Moving well."),

  n("The operative arrives in Aevorn twelve hours later. Not two days. Twelve hours."),

  d("DORATH", "left", "neutral", "They accelerated. Someone in the network reported our position earlier than the timeline I estimated."),

  ch("A3_SEG15_OPERATIVE_ARRIVAL", [
    op(
      "The library moves now. Tonight. No further discussion.",
      "MOVE_NOW",
      [
        d("KAEL", "right", "neutral", "The library moves tonight. Anyone not involved in the move secures the route and the exit. We do not wait to see what the operative does."),
        d("DORATH", "left", "neutral", "Agreed. Lenne — the cases."),
        d("LENNE", "left", "neutral", "Ready in an hour."),
        d("MAREN", "left", "quiet", "And Senne."),
        d("SENNE", "right", "neutral", "I am going with the library. I know the secondary site. Lenne has been there once — two people who know the way is better than one."),
        n("Brek is already at the window, noting the positions of people in the square, calculating the movement. This is the thing he does best — not the horizon check but this: the moment when everything needs to move and someone needs to see every piece at once."),
      ],
      null,
      { relationships: { dorath: 12, maren: 10, brek: 10, lenne: 8 } }
    ),
    op(
      "Ask Dorath: do we know who the operative is.",
      "ASK_OPERATIVE",
      [
        d("KAEL", "right", "neutral", "The operative. Who is it."),
        d("DORATH", "left", "neutral", "The network gave a description. A woman, senior level, known within the eastern territories as someone who handles situations where institutional assets are at risk. Her name in the network records is not her actual name. But there is a notation attached to her description that I have not seen on any other operative in Eran's records."),
        d("KAEL", "right", "neutral", "What notation."),
        d("DORATH", "left", "neutral", "The notation for a practitioner who has completed the method under the Spire's system and is aware of the alteration. She knows what the Spire's method is. She has been working for the administration anyway."),
        n("The complexity of that. A practitioner who knows the method is damaged, who placed themselves in service to the institution that damaged it, and is now coming north to contain the people trying to correct it. The choice she made. The fact that choices like that are possible."),
      ],
      null,
      { relationships: { dorath: 12, maren: 8 } }
    ),
  ]),

  n("The library is moving. The cases are packed. The group is at the back entrance, ready. Brek has the route."),

  n("The operative has been in Aevorn for three hours. She has been to the market square. She has not come to the northeast building."),

  d("DORATH", "left", "neutral", "She is doing the same thing Cavar did when he arrived. Assessment before approach. Three hours means she is careful and thorough."),

  d("MAREN", "left", "quiet", "Or she already knows we are leaving."),

  n("A knock on the front door."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 16 — SOUTH  (Week 16 gate)
  // The operative at the door. The fracture goes public.
  // The Spire's center cannot hold. The road south.
  // Cliffhanger: Something larger has begun.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Lenne opens the door. The woman at the door is in her forties. She is wearing road clothes, has traveled light, and has the posture of someone who is not here to be threatening. She looks at Lenne. She looks past Lenne at the group behind her. She looks at the cases.",
    BG.act3_aevorn, false,
    { id: 'a3_seg16', title: 'South', summary: "The operative meets the group. The Spire fractures publicly. The road south opens." }
  ),

  d("NARA", "right", "neutral", "My name is Nara. I was sent here by the Spire's administration. I want to be clear about something before anything else happens: the document that left Aevorn last night — I am aware of it, I know where it is going, and I am not here to stop it."),

  n("No one moves."),

  d("NARA", "right", "neutral", "The administration sent me to locate the source of the seeded text and contain it. I located the source. I have been in Aevorn for three hours. What I found here — the lineage, the Third's library, Cavar's presence, the complete corrective document — is what I expected to find based on four years of information I have been assembling privately."),

  d("DORATH", "left", "neutral", "You have been inside the Spire."),

  d("NARA", "right", "neutral", "Senior level. I know what the alteration is. I have known since my third year inside the Spire. I accepted the administrative assignment because being inside the administration is the only way to know what the administration intends. I have been reporting to Eran's network since year four."),

  n("Dorath looks at Maren. Maren looks at the woman. The silence has the quality of something very large being held up for everyone to see at once."),

  d("MAREN", "left", "quiet", "You are the source of the second letter. The one that reported the accelerated review."),

  d("NARA", "right", "neutral", "Yes. I sent it through the western channel because I did not want the letter associated with the faction's network. I needed you to have the information without the administration connecting me to the source."),

  d("LENNE", "left", "neutral", "The rider from the west brought you here."),

  d("NARA", "right", "neutral", "He did not know why I was coming. I told him I had a contact in Aevorn. I did. You."),

  {
    type:          'task_gate',
    gateStyle:     'dialogue',
    taskSlots:     2,
    pauseNarrator: "Two final tasks: understanding what Nara's presence means for the group's safety and confirming that she is what she says she is before the group makes its final decision.",
    continueNarrator: "The last task is complete.",
  },

  ch("A3_SEG16_NARA", [
    op(
      "Ask her what she wants from the group now.",
      "ASK_WHAT_NARA_WANTS",
      [
        d("KAEL", "right", "neutral", "You have been working inside the Spire for years. You know about the document. You are not trying to stop it. What do you want."),
        d("NARA", "right", "neutral", "I want the administration to believe that I completed my assignment. I found the source, I assessed the situation, and I determined that the corrective document's placement is irreversible — which it will be, once Cavar reaches the Spire. The administration will accept this assessment from me because I have never given them false information about an assignment before."),
        d("KAEL", "right", "neutral", "You will tell them you failed to stop it."),
        d("NARA", "right", "neutral", "I will tell them I succeeded in understanding it. Which is true. And I will tell them that stopping it was not operationally feasible given the state of the situation. Which is also true. And in the time it takes for the administration to process that assessment, the document will be in the Spire's general library and there will be nothing left to contain."),
        d("MAREN", "left", "quiet", "And after that."),
        d("NARA", "right", "neutral", "After that, the Spire's administration will face a fracture they cannot manage. And I will be in a position to assist the people who are trying to build something correct from what remains."),
      ],
      null,
      { relationships: { nara: 14, maren: 12, dorath: 10 } }
    ),
    op(
      "Test her the same way Maren tested Cavar. Ask Maren to do it now.",
      "TEST_NARA",
      [
        d("KAEL", "right", "neutral", "Maren."),
        n("Maren understands immediately. She asks Nara the test question — the same one, given the same way, without explanation of what is being tested."),
        n("Nara is quiet for a long moment. Then she gives an answer. The answer has the same direction as Cavar's. As yours."),
        d("MAREN", "left", "quiet", "She completed genuinely."),
        d("DORATH", "left", "neutral", "Then she is one of us."),
        d("NARA", "right", "neutral", "I have been one of you for longer than you have been in this room. I simply arrived from a different direction."),
      ],
      null,
      { relationships: { nara: 16, maren: 12, dorath: 10 } }
    ),
  ]),

  n("The decision is made. Nara will return to the Spire and deliver her report. The group will leave Aevorn that day, moving south. The Third's library will go with Lenne and Senne to the secondary site and then — eventually, when conditions allow — travel further toward the practitioners who need it."),

  n("They leave at midday. The northeast building is empty by noon. Lenne closes the cipher on the storage room door for the last time, and the group moves south through Aevorn toward the road."),

  n("The road south looks like the road north did, which is the same road traversed from a different direction. Brek runs the first horizon check within twenty minutes of departure. Dorath walks at the rear. Maren walks at the center. Ryn is recording the last notations from the meeting in a small book as she walks."),

  n("The mountain ridge is visible to the north now that they are south of it, the line of it grey and snow-capped in the midday light. Somewhere behind that ridge, the Third's library is moving toward its secondary site. Somewhere east of the current position, Cavar is on the road to the Spire with a document that will, when placed, produce consequences none of them can fully predict."),

  d("MAREN", "left", "quiet", "The seeded text created a question. The corrective document answers the question. But now there are practitioners inside the Spire who have been corrected and practitioners who have not, and practitioners who know about the correction and do not want it, and an administration that is going to fracture — either into something genuine or into something that hardens against correction. We do not know which."),

  d("KAEL", "right", "neutral", "We never knew which. We never controlled the outcome. We only placed what was true."),

  d("MAREN", "left", "quiet", "Yes. That is exactly what we did."),

  n("The road runs south. The pines thin after two miles and the horizon opens. There is a quality to moving south that is different from moving east or north — less the feeling of approaching something, more the feeling of having left something complete."),

  n("On the third day south, a rider comes from the west on a road that intersects the southern route. He carries a letter in the urgent notation, addressed to Maren. She reads it once and hands it to Dorath. Dorath reads it."),

  d("DORATH", "left", "neutral", "The document has been placed. Forty-eight hours after Cavar arrived at the Spire. Seventeen practitioners on the fourth level accessed it in the first day. The administration called an emergency assembly. Two senior administrators have announced they are stepping down. The fracture is public."),

  n("The group continues south."),

  n("Then, at the crossroads where the southern road meets the western road, there is a second rider. He is waiting. Not moving. Waiting, specifically, for this group. He is carrying a letter in a notation form that none of them recognize."),

  d("MAREN", "left", "thoughtful", "What notation is that."),

  d("SERATH", "left", "neutral", "I have not seen it before."),

  n("Lenne, who rejoined the group at the crossroads three hours ago, looks at the letter from a distance."),

  d("LENNE", "left", "neutral", "That is the oldest notation in the Third's library. It predates the Vraen form. It predates the Archive."),

  n("The rider hands the letter to Maren without a word and turns his horse back west."),

  n("Maren reads the letter. She reads it a second time. Then she folds it and holds it for a long moment, looking at the western road."),

  d("MAREN", "left", "quiet", "There is a location west of here. A place the Third's record mentions but does not describe in full. The letter describes it. What is there. What has been there since before the Archive."),

  n("She looks at the group."),

  d("MAREN", "left", "quiet", "What we placed in the Spire — the corrective document, all five stages — is not the complete method. There is a stage that predates all of this. Before the Archive. Before the Vraen form. A stage that was never written down because the people who held it believed writing it would reduce it. It has been transmitted orally for a very long time. It is west of here."),

  d("DORATH", "left", "neutral", "How far west."),

  d("MAREN", "left", "quiet", "Far."),

  n("The crossroads is quiet. The wind moves through the grass on both sides of the road, bending it in the same direction. West."),

  n("The group looks west."),

]

// Register with the multi-act system
registerActBeats('act3', ACT3_BEATS)
attachVoFilesForAct('act3', ACT3_BEATS)
