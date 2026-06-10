// src/data/act2.js
// Act 2 — "The Eastern Road"
// Main story beats: 17 segments (a2_seg0 through a2_seg16).
// Covers: departure from settlement → eastern road → border → city entry
//         → Spire infiltration → placement → return west → Archive ruins
//
// SEGMENT STRUCTURE — one gate per week completed in the plan:
//   a2_seg0  Always free   — Departure. The method carried. The road opens east.
//   a2_seg1  Week  1 gate  — The first counting stations. Something is tracking movement.
//   a2_seg2  Week  2 gate  — The signal fire. Eran arrives at the border settlement.
//   a2_seg3  Week  3 gate  — Eran's account. Serath's contact. The Spire confirmed real.
//   a2_seg4  Week  4 gate  — Gavrick steps forward. The cost of being watched.
//   a2_seg5  Week  5 gate  — Orin joins. The city visible. The Spire on the horizon.
//   a2_seg6  Week  6 gate  — City entry. Leven's rooms. The controlled atmosphere.
//   a2_seg7  Week  7 gate  — Contact rooms. Pellard. The intake registry physical.
//   a2_seg8  Week  8 gate  — Brek's close call. Dorath's delayed signal. The window.
//   a2_seg9  Week  9 gate  — Orin confirmed. Maren's decision. The second safe house.
//   a2_seg10 Week 10 gate  — Dorath inside the Spire. The registry obtained. Voss's name.
//   a2_seg11 Week 11 gate  — Dorath emerges. Voss on-site. Fourth-level map.
//   a2_seg12 Week 12 gate  — Maren's plan revealed. The seeded text prepared.
//   a2_seg13 Week 13 gate  — Entry. The placement. Forty-seven extra minutes.
//   a2_seg14 Week 14 gate  — Second cohort observed. Eran departs. Gavrick departs.
//   a2_seg15 Week 15 gate  — The road west. Maren tells Sira the truth.
//   a2_seg16 Week 16 gate  — Tal's account. The Unnamed Third. North.

import { n, nb, d, dn, ch, op, BG, registerActBeats, attachVoFilesForAct } from './story.js'

export const ACT2_BEATS = [

  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 0 — DEPARTURE  (always free)
  // The settlement behind them. The completed method in motion. The road opens.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The settlement is behind you. Four walls, a lamp hook in each corner, writing that covers all four walls from floor to shoulder-height — and now none of that is in front of you. What is in front of you is the eastern road, which begins as a road and then narrows and then becomes a direction. The trees are familiar for the first mile. After that they are not.",
    BG.act2_wilderness, false,
    { id: 'a2_seg0', title: 'Departure', summary: 'The settlement is behind you. The method is carried, not stored. The road east begins.' }
  ),

  n("You have been walking for two hours when you understand what is different about today compared to every other morning of movement in the past months. Before, you were moving toward something — the settlement, the group, the practice. Now you are moving with something. What was built in three months of work at the settlement is not left behind at the settlement. It is here, on this road, in the group that moves along it. It is structurally different from anything you had previously called carrying something."),

  d("MAREN", "left", "thoughtful", "You notice it this morning."),

  d("KAEL", "right", "neutral", "The difference."),

  d("MAREN", "left", "thoughtful", "The method, completed, does not feel the same in motion as it did in stillness. It did not feel the same in stillness either — completion changes how the practice works. But movement adds another dimension. Some practitioners describe it as louder. More present. Others say it becomes like a second sense of balance — not balance of the body but balance of what you hold."),

  d("KAEL", "right", "neutral", "Which did it feel like for you?"),

  d("MAREN", "left", "thoughtful", "More like the second. But the first month of carrying in motion is not predictable. Pay attention to what changes and what stays constant. Tell me if something changes that surprises you."),

  n("Brek is already twenty meters ahead, checking the horizon with the same twenty-minute rhythm he has kept since they left. He is not running today — the road is too variable for the long stride, and he has adapted without comment. This is Brek entirely: the form changes, the function continues."),

  n("Sira walks beside Ryn. They have been walking together for an hour, and in that hour they have said perhaps twelve words between them. You notice Ryn glancing sideways at Sira occasionally, the way someone looks at a text they cannot quite place in the collection they know. Sira does not seem to notice or is used to it."),

  d("DORATH", "left", "neutral", "I want to establish a few procedures before we're too deep in the road to correct them."),

  d("MAREN", "left", "neutral", "Go ahead."),

  dn("DORATH", "left", "neutral", "Rest stops: fifteen minutes maximum, position-based, no stopping at structures we have not assessed first. Night: rotation in pairs, I set the watch schedule. Communication during daylight: normal, but nothing about the method or the operation by name in any location that could have listeners. We are scholars on a research journey. That is what any inquiry gets."),

  d("KAEL", "right", "neutral", "Has anyone asked?"),

  dn("DORATH", "left", "neutral", "Not yet. That is exactly when to establish the habit."),

  ch("A2_SEG0_ROLE", [
    op(
      "Take the rear position. You want to know what is behind the group as well as ahead.",
      "REAR_GUARD",
      [
        n("Dorath notes this without comment, which means she has filed it as useful information about how you operate. The rear position gives you the group's full length — seven people in motion, the way they space themselves, the habits of pace. Serath, you observe, always leaves an extra gap between himself and whoever walks ahead of him. Sira walks the exact same distance behind Ryn every hour, without apparent effort. Brek maintains twenty-meter intervals regardless of terrain, adjusting his stride rather than his position."),
        n("You also notice: nobody has looked behind them in the last hour except Dorath. Twice."),
      ],
      null,
      { relationships: { dorath: 8, maren: 4 } }
    ),
    op(
      "Walk beside Maren. The first days of carrying in motion — you want her near.",
      "WALK_MAREN",
      [
        n("She does not object. For the first two hours she is focused on the road ahead — not vigilant, simply present in it. Then, during a rest stop at a stream crossing, she says:"),
        d("MAREN", "left", "thoughtful", "There is something I want you to notice when we reach the first open terrain. Not to analyze yet. Just notice."),
        d("KAEL", "right", "neutral", "Notice what."),
        d("MAREN", "left", "thoughtful", "You'll recognize it when it happens. The method in open terrain versus the method in an enclosed space. The range of it."),
        n("You notice it at the ridge two hours later — a widening, a sense of more room available than you had been using. It is exactly what she meant and you understand why she didn't describe it in advance."),
      ],
      null,
      { relationships: { maren: 12, ryn: 3 } }
    ),
    op(
      "Walk with Serath. He has traveled roads like this before. You want to understand how he reads terrain.",
      "WALK_SERATH",
      [
        n("Serath walks with the economy of someone who has done this many times — not rushing, not slowing, adjusting for the terrain with small corrections that you would miss if you weren't watching for them. He does not offer conversation. He does not refuse it."),
        d("KAEL", "right", "neutral", "How many times have you done this kind of travel?"),
        d("SERATH", "left", "neutral", "This specific route: once. Similar conditions: several times."),
        d("KAEL", "right", "neutral", "What do you watch for?"),
        d("SERATH", "left", "neutral", "Change. What is consistent reveals the terrain's natural state. What deviates from consistency is information."),
        n("He does not elaborate. He does not need to. For the next three hours you find yourself watching for deviations, and you find three that you would have ignored before he named the principle."),
      ],
      null,
      { relationships: { serath: 8, dorath: 3 } }
    ),
  ]),

  n("Evening. The first camp is in a hollow where the ground flattens and the wind breaks against a low ridge to the northwest. Dorath establishes the watch before anyone has unpacked. The settlement — its walls, its lamp hooks, its writing — is somewhere behind the horizon now. The writing on the walls of the settlement is not."),

  n("Ryn, looking at the stars in the way she looks at texts when she is working something out in the lateral direction, says: I want to say something before we sleep."),

  d("RYN", "left", "quiet", "When I was at the Archive — before the fire — I thought about the method as a thing I was learning. An object. Something you put down when you were not using it. I understand now that I was thinking about it wrong. The method is not something you hold. The method is a change in how you hold everything else."),

  n("Nobody responds immediately. The fire burns at the level Dorath has decided is appropriate for the terrain and the exposure, and it casts the particular light of a road fire — low, amber, the world past it very dark."),

  d("SIRA", "left", "quiet", "Yes."),

  n("Just that. Ryn nods. The conversation is complete."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 1 — THE COUNT STATIONS  (Week 1 gate)
  // Counting stations revealed. The eastern road is observed.
  // Cliffhanger: the group has been logged as category four in three consecutive stations.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The counting stations become visible the second week, once you know what to look for. The tally marks were there on the first day — you had thought they were the ordinary marks of travelers noting rest stops. They are not. Dorath recognizes the format on the fourth day, stops at a post, examines the marks for two full minutes, and then says nothing. She resumes walking. That evening she gives the full account.",
    BG.act2_eastern_road, false,
    { id: 'a2_seg1', title: 'The Count Stations', summary: 'The eastern road is under systematic observation. Every group is logged. The Spire receives reports.' }
  ),

  dn("DORATH", "left", "neutral", "Counting stations. They run the eastern road network from the valley border to the city gate — roughly a hundred and twenty miles. Every station records group size, approximate composition, and direction of travel. The data feeds northward and, more relevantly, eastward."),

  d("MAREN", "left", "neutral", "Eastward to what."),

  dn("DORATH", "left", "neutral", "I know one institution with the administrative infrastructure to maintain a monitoring network at this scale in this district. The Spire."),

  n("The name settles over the group. You have heard it — in the deep records at the settlement, in the account Tal gave before the group left, in Eran's message that arrived through the notation network. The Spire is where the fourth generation of Voss has been building its institutional version of the method — a controlled approach to preservation that requires the institution for each stage. The Spire is where you are going. It is also, apparently, where information about your approach is already arriving."),

  d("KAEL", "right", "neutral", "How long has our group been in their records?"),

  dn("DORATH", "left", "neutral", "From the first station we passed. Day three of travel, which means our count is in three consecutive reports. That's the threshold for category four status — a group of five or more moving east on this road, three consecutive confirmations. Category four generates an inquiry review."),

  d("SERATH", "left", "neutral", "An inquiry review means what."),

  dn("DORATH", "left", "neutral", "They decide whether to send someone west to observe the group. Not stop — observe. Collect further data. The decision takes four to six days after the third report."),

  d("RYN", "left", "quiet", "So we have four to six days before someone is watching us who we haven't identified."),

  dn("DORATH", "left", "neutral", "Possibly. Or possibly the inquiry review concludes we're unremarkable and files us. Practitioners on the eastern road are not unusual — the Spire receives several groups per season. What makes a group remarkable is if the data shows something specific."),

  d("MAREN", "left", "thoughtful", "Something specific like seven people, consistent eastward movement, practicing at dawn."),

  dn("DORATH", "left", "neutral", "The dawn practice is visible from the road if anyone is on the road at that hour. Yes. That could flag the report."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Three days until the inquiry review completes. The road ahead has two more stations before the border settlement. What you carry and how you carry it on the road may matter more than it did this morning.",
    continueNarrator: "You know what you know. The station is behind you and the road continues east.",
  },

  ch("A2_SEG1_RESPONSE", [
    op(
      "Adjust the practice schedule — move the dawn session to midday rest stops. Reduce visibility.",
      "ADJUST_PRACTICE",
      [
        d("MAREN", "left", "thoughtful", "The midday window is shorter and less reliable. What we lose in consistency—"),
        dn("DORATH", "left", "neutral", "We recover in not being flagged as a practitioner group before we reach the city."),
        d("MAREN", "left", "thoughtful", "Agreed. Midday windows, variable schedule. We adapt."),
        n("The adjustment is harder than expected in the first three days, then becomes the new pattern. The method does not slip. Maren notes this with visible but understated approval — the ability to maintain structural integrity under schedule disruption is something she was not certain the group had achieved."),
      ],
      null,
      { relationships: { dorath: 10, maren: 5 } }
    ),
    op(
      "Keep the dawn practice unchanged. Consistency matters more than concealment — the method requires what it requires.",
      "KEEP_PRACTICE",
      [
        d("MAREN", "left", "thoughtful", "My preference also. The consistency is the practice. Altering it for perception management is a different kind of risk."),
        dn("DORATH", "left", "neutral", "Understood. We proceed visible and we accept the inquiry review may flag us."),
        d("SERATH", "left", "neutral", "If the inquiry review sends someone to observe, we will identify them before they identify anything specific about what we're doing. That's the counter."),
        dn("DORATH", "left", "neutral", "That is not a comfortable counter."),
        d("SERATH", "left", "neutral", "No. But it's the accurate one."),
      ],
      null,
      { relationships: { maren: 8, serath: 6, dorath: -3 } }
    ),
    op(
      "Ask Serath if he has experience with this kind of monitoring from his time before the Archive.",
      "ASK_SERATH_MONITORING",
      [
        d("KAEL", "right", "neutral", "Serath. The monitoring network. Have you navigated something like this before?"),
        d("SERATH", "left", "neutral", "Once. Different institution, same structure. The counter is to give the network data that is real but unremarkable. You cannot fake not being a group of practitioners. You can make the group look like practitioners doing something the institution already categorizes as routine."),
        d("KAEL", "right", "neutral", "What category would that be."),
        d("SERATH", "left", "neutral", "Archival survey. A group documenting eastern road settlements for a westward institution's records. Category two on most networks — low interest, filed and forgotten."),
        dn("DORATH", "left", "thoughtful", "That requires documentation. Actual paper. A credible filing."),
        d("SERATH", "left", "neutral", "I can produce that in two days."),
        n("Dorath looks at him for a moment with the expression she uses when something is useful but she would not have predicted it."),
      ],
      null,
      { relationships: { serath: 12, dorath: 5, maren: 4 } }
    ),
  ]),

  n("Day eleven. The border settlement appears in the mid-morning — a collection of stone buildings around a central well, a wayfarers' shelter, a permanent market with half its stalls empty at this season. Ordinary, unremarkable, the kind of place that exists to service travelers passing through rather than to be a destination."),

  n("A figure stands at the wayfarers' shelter, watching the road from the east. He has been standing there for some time — the posture of someone who arrived early and has been waiting without impatience. He has two bags and the calm of someone who knows exactly where he is going and is simply waiting for it to arrive."),

  n("He looks at Maren. He does not look at Dorath or Serath or you. He looks at Maren the way you look at something you have been expecting to see for a long time and have now seen."),

  d("ERAN", "left", "neutral", "Tal sends her regards. She said you would be at this settlement within eleven days. You're at twelve. That's close enough to be impressive."),

  d("MAREN", "left", "neutral", "Who are you."),

  d("ERAN", "left", "neutral", "Someone who has been in this district for four months, preparing the conditions that make what you're planning possible. Tal told me to give you this."),

  n("He reaches into his coat and produces a folded note in Tal's handwriting. Maren reads it. She reads it a second time. She folds it with the care she uses for important things."),

  d("MAREN", "left", "thoughtful", "Walk with us."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 2 — ERAN'S ACCOUNT  (Week 2 gate)
  // Eran explains the eastern district, the Spire's structure, the counting network.
  // Cliffhanger: the signal fire — Eran says it was a message addressed to this group.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Eran's account takes three evenings to give in full. He gives it the way someone gives a careful briefing — organized, sequenced, each piece placed before the next builds on it. He does not improvise. He does not editorialize. When he is uncertain about a fact he says so, notes the source of the uncertainty, and continues. This is, you gradually realize, a trained practice — the kind that comes from years of working in environments where imprecise information is dangerous.",
    BG.act2_border_inn, false,
    { id: 'a2_seg2', title: "Eran's Account", summary: 'Eran explains the Spire, the district network, and why the group has been expected.' }
  ),

  d("ERAN", "left", "thoughtful", "The Spire was built forty years ago. The external history describes it as a scholarly institution for advanced preservation research. That description is accurate as far as it goes. What it omits: the Spire was designed from its foundation to operate as an intake system — drawing in practitioners, guiding them through a specific sequence, and producing practitioners who are dependent on the Spire's infrastructure for continued advancement."),

  d("MAREN", "left", "neutral", "The method's completion point is gated."),

  d("ERAN", "left", "thoughtful", "Gated is the right word. The Spire's sequence is designed to bring practitioners to the stage just before completion, then present the final element as something that requires institutional access. Not false — the text exists, the instruction is real. But the access is controlled. You cannot complete the method without the Spire, is the message the sequence delivers."),

  d("SERATH", "left", "neutral", "Except that Maren has already completed it."),

  d("ERAN", "left", "thoughtful", "Which is why this operation is possible. The Spire's entire framework assumes it controls the final stage. It assumes no practitioner enters the city already complete. Maren's completion, and yours\" — he glances at you — \"and the others who completed at the settlement — that is an assumption the Spire cannot have planned for."),

  d("KAEL", "right", "neutral", "How do you know so much about the Spire's internal structure."),

  d("ERAN", "left", "thoughtful", "I have a contact on the fourth level. I placed them there three years ago. They have been inside since."),

  n("The border inn's common room is nearly empty at this hour — the innkeeper's family asleep, a single other traveler who arrived after dark and went straight to his room. The fire burns low. Dorath has been sitting with her back to the wall and her eyes on the door since they arrived, which means she has missed none of this conversation and none of the room's movement."),

  d("DORATH", "left", "neutral", "The counting network. The category four reports. You said the district infrastructure was preparing the conditions. What specifically did you prepare?"),

  d("ERAN", "left", "thoughtful", "Eighteen months of work. The eastern contact network — a series of individuals and locations that will provide cover, accommodation, and information between here and the city. A movement registry adjustment at two of the intermediate stations so that our specific group's data is categorized differently than it would be normally. Not falsified. Recategorized. The category four inquiry review will route to a different analyst than standard — an analyst who is in the network."),

  dn("DORATH", "left", "thoughtful", "You changed the data infrastructure."),

  d("ERAN", "left", "thoughtful", "I created redundancy in the data infrastructure. The primary channel still flows. What I created is a secondary channel that runs alongside it and ensures we have advance notice of anything flagged."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Eran's briefing is not complete. There are three questions he has offered to answer that require the kind of attention that the road does not provide. The border inn has a back room and two hours before the other traveler wakes.",
    continueNarrator: "The questions are answered. The briefing is as complete as it needs to be before the road continues.",
  },

  ch("A2_SEG2_ERAN_TRUST", [
    op(
      "Ask Eran who sent him — who is on the other side of the network he's describing.",
      "ASK_WHO_SENT",
      [
        d("KAEL", "right", "neutral", "The network you built this on. Who is at the other end of it. Who are you working for."),
        d("ERAN", "left", "thoughtful", "No one who gives me instructions. The network was built to serve a function: ensuring that practitioners who complete the method can continue operating outside institutional control. The person who initially identified that function as a problem worth solving — who provided the resources to begin building the network — asked only to be notified when the function was being used for the purpose it was built for."),
        d("KAEL", "right", "neutral", "And this operation qualifies."),
        d("ERAN", "left", "thoughtful", "This operation is the reason the network was built."),
        d("MAREN", "left", "quiet", "Who is that person."),
        d("ERAN", "left", "thoughtful", "I will tell you when it becomes relevant. It is not yet relevant."),
        n("Maren considers whether to press this. She decides not to, which means she has concluded the information will arrive at the correct time or it will not be available at all."),
      ],
      null,
      { relationships: { eran: 6, maren: 5 } }
    ),
    op(
      "Ask about the contact on the fourth level — what have they observed that couldn't be sent through the network.",
      "ASK_FOURTH_LEVEL",
      [
        d("KAEL", "right", "neutral", "Your contact on the fourth level. What have they been observing that required placement rather than communication."),
        d("ERAN", "left", "thoughtful", "The fourth-level reading room holds the text that Voss describes as the final stage of the method. The contact's function was to verify that the text is genuine, to map the room's physical layout, and to maintain a presence that allows for a specific kind of operation when the time comes."),
        d("MAREN", "left", "neutral", "An operation that requires someone already inside."),
        d("ERAN", "left", "thoughtful", "Yes. The map, the room layout, the contact's signal availability — all of it is in place. It has been in place for eight months. We have been waiting for you."),
        n("The emphasis is not on 'you' in a personal sense. It is on 'waiting' — the weight of eight months of preparation being described in a single word by someone who does not overstate."),
      ],
      null,
      { relationships: { eran: 10, maren: 8, serath: 5 } }
    ),
    op(
      "Accept the briefing and say: what do you need from us before we continue east.",
      "ACCEPT_BRIEFING",
      [
        d("KAEL", "right", "neutral", "The briefing is sufficient. What do you need from the group before we move?"),
        d("ERAN", "left", "thoughtful", "Patience with the pace I'm going to recommend. And agreement that if the contact network indicates a change of route, you will follow my guidance without requiring full explanation of why in the moment. Context after, not during."),
        dn("DORATH", "left", "thoughtful", "That is a significant ask."),
        d("ERAN", "left", "thoughtful", "It is the ask that makes the rest of this possible."),
        n("Dorath looks at Maren. Maren looks at you. The decision, as it so often does, arrives here."),
      ],
      null,
      { relationships: { eran: 8, dorath: 4, maren: 6 } }
    ),
  ]),

  n("The second evening, after Eran has finished the section on the counting network and before he begins the city's internal geography, he mentions the signal fire almost as an addendum."),

  d("ERAN", "left", "thoughtful", "The fire you saw on the horizon. Northeast, six days east of the settlement."),

  d("MAREN", "left", "neutral", "We saw it."),

  d("ERAN", "left", "thoughtful", "It was addressed to this group. A contact I stationed at the border region — one of the network nodes — was confirming that the movement data had been adjusted and the category four review was routed correctly. The pattern you observed was the notation for 'received and handled.' She will not signal again."),

  d("KAEL", "right", "neutral", "Someone was signaling to a group that hadn't confirmed they would be on that road."),

  d("ERAN", "left", "thoughtful", "I have been running this network for eighteen months. I knew you would be on that road."),

  n("No one says what everyone is thinking: that the depth of preparation in this statement either means the operation is better supported than they realized, or that something about how well they are known should be more alarming than it currently feels."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 3 — SERATH'S KNOWLEDGE  (Week 3 gate)
  // Serath reveals what he learned from the deep records about the Spire's real purpose.
  // Cliffhanger: Serath was contacted three years ago to report on the group.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Three days east of the border settlement, the road improves — the track widens to a proper road, the paving older but maintained, the kind of road that connects an institution with its supply chain. The group is moving well. Brek's horizon check has become the punctuation of each day: regular, reliable, unchanged. You have come to find it reassuring, which is something you would not have predicted.",
    BG.act2_eastern_road, false,
    { id: 'a2_seg3', title: "Serath's Knowledge", summary: 'Serath reveals what the deep records contained. The Spire is not what it presents itself as.' }
  ),

  n("Serath finds you at the evening fire, after Eran and Dorath have gone to establish the perimeter. He sits with the deliberateness of someone who has been deciding to have this conversation for several days and has finally decided."),

  d("SERATH", "left", "neutral", "The deep records at the Archive. You know I was working on them."),

  d("KAEL", "right", "neutral", "Maren mentioned it."),

  d("SERATH", "left", "neutral", "I found something in the last month before the fire. Not the fire — before it. A set of administrative records from the Archive's second reorganization, roughly one hundred and thirty years ago. Buried in the index structure in a way that looked like misfiling but was not misfiling."),

  d("KAEL", "right", "neutral", "What were they."),

  d("SERATH", "left", "neutral", "Correspondence between the Archive's then-director and a third party who is identified only by a cipher notation I couldn't fully decode. The correspondence was about the Spire — which did not yet exist at the time of the correspondence. It was being planned. And the Archive's director was aware of the planning and chose not to oppose it."),

  d("KAEL", "right", "neutral", "The Archive knew about the Spire."),

  d("SERATH", "left", "neutral", "The Archive's director knew about the Spire and concluded that an institution controlling the method's final stage was preferable to no institution controlling anything. The rationale was stability. The method, completed, produces practitioners who operate outside institutional oversight. The director believed this was a problem."),

  d("MAREN", "left", "quiet", "Erel. The second director."),

  n("She has come to the fire without either of them hearing her. She sits. She looks at the fire."),

  d("MAREN", "left", "quiet", "I always thought Erel's reorganization was about the collection's physical arrangement. The three years he spent on it, the way the catalog was restructured. I thought it was scholarship. It was also this."),

  d("SERATH", "left", "neutral", "The reorganization buried the correspondence and created the misfiling structure that made it difficult to find. He was either protecting the Archive from the knowledge, or protecting himself, or protecting the correspondence from someone who would have acted on it. I don't know which."),

  d("MAREN", "left", "quiet", "It doesn't change what we're doing."),

  d("SERATH", "left", "neutral", "No. But it means the Spire is not a recent development that could have been prevented. It was planned a century ago, with the Archive's director's knowledge and acceptance."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "The deep records Serath described — he carried notes. The correspondence, the cipher notation he couldn't fully decode. Two days of road ahead before the terrain changes. The notes are worth examining while there is time to think.",
    continueNarrator: "The notes are as complete as they can be made. What they reveal about the Spire's foundation is now understood. The road continues.",
  },

  ch("A2_SEG3_SERATH_SECRET", [
    op(
      "Ask Serath: if you knew this before the fire, why didn't you tell Maren then?",
      "WHY_SILENT",
      [
        d("KAEL", "right", "neutral", "You had this before the fire. Why didn't you tell Maren when you found it?"),
        d("SERATH", "left", "neutral", "Because telling Maren would have required explaining how I found it, and how I found it was through a method of access I had been given by someone outside the Archive. Someone who asked me to report on certain developments."),
        n("The fire burns. Maren does not move."),
        d("KAEL", "right", "neutral", "You were reporting to someone outside the Archive."),
        d("SERATH", "left", "neutral", "I was receiving access permissions I shouldn't have had, in exchange for notifications about specific developments. I did not understand at the time whether the person providing the permissions was part of the same network as Voss or separate from it. I still don't know with full certainty."),
        d("MAREN", "left", "quiet", "But you chose to continue."),
        d("SERATH", "left", "neutral", "I chose to continue because what I was finding was real and useful and I could not find it any other way."),
        n("This is the closest to an apology that Serath's syntax allows. Maren receives it with the expression of someone cataloging a fact that is not surprising and also not comfortable."),
      ],
      null,
      { relationships: { serath: 5, maren: -5 } }
    ),
    op(
      "Ask Maren: what do you think the Archive's second director was actually protecting?",
      "ASK_MAREN_EREL",
      [
        d("KAEL", "right", "neutral", "Erel. The reorganization. What do you think he was actually trying to protect?"),
        d("MAREN", "left", "quiet", "I have been thinking about that for ten minutes."),
        n("She thinks for ten more."),
        d("MAREN", "left", "thoughtful", "Erel was a conservationist in the deepest sense — he believed that institutions preserve what individuals cannot. He may have believed that a controlled approach to the method's final stage was preferable to no approach at all. That some practitioners reaching completion with institutional support was better than the method disappearing entirely. He may have been wrong. He may have been right about a version of that problem and wrong about how it would be implemented."),
        d("KAEL", "right", "neutral", "He couldn't have known what the Spire would become."),
        d("MAREN", "left", "thoughtful", "No. That is the thing about institutions: they are designed by people who cannot fully see their own design's effects across a century."),
      ],
      null,
      { relationships: { maren: 8, serath: 3 } }
    ),
    op(
      "Say nothing. Let Serath and Maren work through this between themselves. The road will take care of the rest.",
      "LET_IT_SETTLE",
      [
        n("You do not speak. The fire burns. Serath and Maren sit with the information between them — the knowledge and the silence around it and the knowledge that the silence cannot last indefinitely on a road with five weeks still ahead. You let it settle."),
        n("In the morning, before the group moves out, Maren says to Serath in a normal tone: I want to review the cipher notation this evening. After the camp is set. He says: yes. Neither of them mentions the previous night."),
        n("The work resumes. This is, you realize, how Maren resolves most difficult things: she turns them into problems with methods."),
      ],
      null,
      { relationships: { maren: 6, serath: 6, ryn: 5 } }
    ),
  ]),

  n("The road widens further on the third day east of the border settlement. The wider road means more traffic — not much, but visible evidence of regular movement. A cart heading west with empty grain sacks. Two travelers going east who do not speak and do not look at the group in the particular way of people who have been briefed on how to behave in the presence of observed groups. Eran watches them pass and says nothing until they are a hundred meters behind."),

  d("ERAN", "left", "thoughtful", "They are not from the network. I don't know who they are."),

  dn("DORATH", "left", "neutral", "That's the honest answer."),

  n("Brek, returning from a horizon check, says: someone is on the road behind us. One person. Two hundred meters."),

  n("You know this pace — this exact distance, this precise trailing interval. You have been on the other end of it."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 4 — GAVRICK  (Week 4 gate)
  // Gavrick revealed. His four years of watching. What he knows about the method.
  // Cliffhanger: Gavrick says he was placed on this road specifically — by Eran.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Gavrick's approach takes thirty minutes from the moment Brek spots him to the moment he steps off the road into the scrub for the conversation. He moves with the patience of someone who has done nothing quickly in four years and sees no reason to begin now. When he is close enough to see clearly, you understand: road-worn but not road-damaged. Someone who has been here long enough that the road is simply where he is.",
    BG.act2_eastern_road, false,
    { id: 'a2_seg4', title: 'Gavrick', summary: "Gavrick has been on this road for four years. He knows about the method. He knows about all of them." }
  ),

  d("GAVRICK", "left", "neutral", "I have been on this road for four years, two months, and eleven days. I know because I started counting from the day I arrived and I have not stopped. The count is not obsessive — it is operational. I need to know how long the observation has been going on to understand whether it has produced the kind of data that changes decisions."),

  d("DORATH", "left", "neutral", "You've been observing this road for four years."),

  d("GAVRICK", "left", "neutral", "Observing what uses this road. Which includes the Spire's counting infrastructure, the movement patterns of individuals with practitioner activity profiles, and the occasional group from the western Archive network that has enough information to attempt what your group is attempting."),

  d("MAREN", "left", "neutral", "Have there been other groups."),

  d("GAVRICK", "left", "neutral", "Two. One three years ago, one fourteen months ago. Neither reached the city with enough operational cover intact to proceed with the inside work. The first group was flagged by the counting network and had an inquiry team on them by the time they reached the city gates — they dispersed before entry. The second group entered but was identified inside and left before placing anything."),

  d("KAEL", "right", "neutral", "You watched both groups fail."),

  d("GAVRICK", "left", "neutral", "I watched both groups stop before they completed the operation. Fail is a judgment about intent. Their intent was the same as yours. The conditions were not yet right."),

  d("SERATH", "left", "neutral", "And the conditions are right now."),

  d("GAVRICK", "left", "neutral", "Eran built the network. The fourth-level contact is in place. And you have something neither of the previous groups had."),

  d("KAEL", "right", "neutral", "Which is what."),

  d("GAVRICK", "left", "neutral", "Complete practitioners entering the city. The Spire's entire framework is built on the assumption that no one arrives already complete. Both previous groups had advanced practitioners. Not complete."),

  n("He looks at Maren when he says 'complete.' Not accusingly — with the specific recognition of someone who has been looking for something for a long time and has now found it."),

  {
    type:             'task_gate',
    gateStyle:        'collection',
    taskSlots:        3,
    pauseNarrator:    "Gavrick has been watching this road for four years. What he knows about the route ahead — the specific positions, the observation nodes, the traffic patterns between here and the city — is not in any document. He will share it, but sharing takes time and requires the kind of focused exchange that moving cannot accommodate.",
    continueNarrator: "Gavrick's knowledge of the road is now yours. The approach to the city is mapped. You know what to watch for.",
  },

  ch("A2_SEG4_GAVRICK_JOIN", [
    op(
      "Ask Gavrick to join the group. Four years of road knowledge is something you need.",
      "INVITE_GAVRICK",
      [
        d("KAEL", "right", "neutral", "Walk with us. The road ahead is yours better than anyone's."),
        d("GAVRICK", "left", "neutral", "I was going to ask."),
        n("He falls into position beside Brek, who acknowledges him with a nod and resumes his horizon check. Gavrick does not displace Brek from the forward position — he establishes himself on the left flank, which places the forward-left quadrant under observation for the first time."),
        n("Later, Dorath notes this to you: he took the one gap in the group's coverage without being told about it, and without asking whether it was appropriate to fill it."),
        dn("DORATH", "left", "thoughtful", "Either Eran briefed him on our formation, or he diagnosed it in twenty minutes."),
        d("KAEL", "right", "neutral", "Which is more reassuring?"),
        dn("DORATH", "left", "neutral", "The second, and only barely."),
      ],
      null,
      { relationships: { gavrick: 12, brek: 6, dorath: 5 } }
    ),
    op(
      "Ask Eran directly: you knew Gavrick was here. You placed him here.",
      "CONFRONT_ERAN",
      [
        d("KAEL", "right", "neutral", "Eran. You knew he was on this road."),
        d("ERAN", "left", "thoughtful", "Yes."),
        d("KAEL", "right", "neutral", "You placed him here."),
        d("ERAN", "left", "thoughtful", "Four years ago. I told you the network preparation was eighteen months. The observation on the road itself is older. Gavrick was the first element I placed."),
        d("MAREN", "left", "quiet", "Four years ago you knew we would be on this road."),
        d("ERAN", "left", "thoughtful", "Four years ago I knew someone would be on this road who needed the information he was collecting. I was not certain it would be you specifically. I am certain now."),
        n("Maren says nothing. The calculation this requires — the network, the contacts, the four years of Gavrick on the road — either represents protection or surveillance, and the difference between them is not yet fully visible."),
      ],
      null,
      { relationships: { eran: -4, maren: 5, gavrick: 3 } }
    ),
    op(
      "Ask Gavrick: what do you actually know about the method. Not the observation — what you understand.",
      "ASK_GAVRICK_METHOD",
      [
        d("KAEL", "right", "neutral", "The method. You said you've known about it for four years. What do you understand about it?"),
        d("GAVRICK", "left", "neutral", "Structurally: what the Vraen fragments describe. Practically: the difference between practitioners who have completed it and practitioners who haven't, as observable from a distance. Behaviorally: what completion changes in how someone moves, makes decisions, relates to time. I've been watching practitioners on this road for four years. I can identify a completed practitioner at two hundred meters."),
        d("KAEL", "right", "neutral", "How."),
        d("GAVRICK", "left", "neutral", "The way they carry the road. Incomplete practitioners carry the road as a problem to be solved — terrain, weather, threat. Complete practitioners carry the road as information. The difference is visible in how often they stop to assess versus how often they simply know."),
        n("He says this without self-consciousness. You process it without speaking. He is describing something you have been doing without having words for it."),
      ],
      null,
      { relationships: { gavrick: 10, maren: 4, ryn: 5 } }
    ),
  ]),

  n("Evening camp. The city is not visible yet but Gavrick says: three days, and the Spire becomes visible before the city walls do, because it is taller than anything else in the eastern district for thirty miles. You will see it first from the rise called the Shepherd's Break by the local traffic, which you will reach on the second morning."),

  n("He is right. The second morning, the rise, and above the scrub line on the horizon: the Spire. Taller than the estimate of everyone in the group who has only seen drawings. Different in proportion — the stone has a weight at this distance that the drawings did not convey, a solidity that implies the building was designed to be permanent in a way most buildings are not."),

  n("The group stops. Everyone looks. Nobody speaks for a full minute."),

  d("BREK", "left", "thoughtful", "That is a large building."),

  n("It is Brek's characteristic understatement — the kind that carries more weight than elaboration would. Yes. It is a very large building. And you are going inside it."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 5 — THE CITY APPROACH  (Week 5 gate)
  // Orin joins. The city visible. The Spire seen at full height.
  // Cliffhanger: Orin's arrival was not expected by Eran.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The road to the city gates takes one full day from the Shepherd's Break, and it is a different kind of day than any since the settlement. The road is populated — carts in both directions, travelers in groups, the peripheral activity of a city that extends its economic life out into the surrounding land before you reach the walls themselves. Everyone here has business. Everyone here is moving with a purpose the city requires.",
    BG.act2_city_approach, false,
    { id: 'a2_seg5', title: 'The City Approach', summary: 'The city is ahead. The Spire is visible at full height. A new arrival joins without Eran expecting him.' }
  ),

  n("The group adjusts to the populated road with the kind of automatic recalibration that five weeks of travel has produced. Dorath's word spacing changes — normal conversation, nothing about the operation, scholars on a survey. Gavrick drops back into the general flow of travelers rather than the forward position. Brek stops running the horizon check. Everyone is, unremarkably, people on a road that many people use."),

  d("ERAN", "left", "thoughtful", "At the waymarker half a day from the gate, there is a food stall operated by someone in the network. We stop there. It is a normal stop — food, water, thirty minutes. While we are there, information passes. Nothing discussed openly."),

  dn("DORATH", "left", "neutral", "What information."),

  d("ERAN", "left", "thoughtful", "Current gate procedure. Any changes to the intake schedule in the last two weeks. Status of Leven's rooms."),

  n("The waymarker food stall is a permanent structure, stone-built, with a woman of perhaps fifty operating it with the practiced efficiency of someone who has been doing this for decades. She prepares food without being asked — the right amount for a group of eight, which means she knew the count. Eran takes a folded paper from her along with his bowl. He reads it while eating. He does not change expression."),

  n("There is a ninth person at the food stall."),

  n("He is eating alone, one bench removed from the group, looking at the Spire on the horizon with the focused attention of someone trying to commit something to memory. He is young — twenty-two, perhaps twenty-three — with the specific thin quality of someone who has been traveling hard for several weeks without enough food. When he realizes you are looking at him, he looks back without evasion."),

  d("ORIN", "left", "neutral", "I have been looking for this group for three weeks. I knew you were coming east. I didn't know which road."),

  n("Eran stands. Very slowly."),

  d("ERAN", "left", "neutral", "Who told you this group was on the eastern road."),

  d("ORIN", "left", "neutral", "A contact in the settlement's western district. They said a group of practitioners was heading east on the road through the border station. I have been at three waymarkers in the last week trying to identify you."),

  d("ERAN", "left", "neutral", "Who is your contact."),

  d("ORIN", "left", "neutral", "Someone I trust. They helped me leave the city six months ago when leaving was no longer optional."),

  {
    type:             'task_gate',
    gateStyle:        'dialogue',
    taskSlots:        2,
    pauseNarrator:    "Orin has information about the city and specific knowledge about how to leave it under pressure. He also has a contact that Eran did not know about. Both things require assessment before the city gate.",
    continueNarrator: "The assessment is done. You know what Orin brings. The city gate is ahead.",
  },

  ch("A2_SEG5_ORIN", [
    op(
      "Accept Orin. He knows the city from inside and he is not affiliated with the Spire — that combination is rare.",
      "ACCEPT_ORIN",
      [
        d("KAEL", "right", "neutral", "He walks with us."),
        d("ERAN", "left", "thoughtful", "I have not confirmed his contact."),
        d("KAEL", "right", "neutral", "The gate is ahead. Confirm after."),
        n("Eran accepts this. He is not happy about it — the expression of someone whose operational discipline is being overridden by someone else's judgment — but he accepts it."),
        n("Orin falls in beside you. He says nothing for several minutes, and then, quietly: the Spire's side entrance, the one they use for expected arrivals. It is on the south face, thirty meters from the main gate road. It has a painted mark on the doorframe — blue, low, the height of a child's reach. That is how you identify it when you need it."),
        d("KAEL", "right", "neutral", "How do you know that."),
        d("ORIN", "left", "neutral", "I was inside for seven months. I left when I understood what continued residency required."),
      ],
      null,
      { relationships: { orin: 10, eran: -4, dorath: -3 } }
    ),
    op(
      "Let Eran decide. This is his network and his operational structure.",
      "DEFER_ERAN",
      [
        d("KAEL", "right", "neutral", "Eran. Your call."),
        n("Eran considers Orin for a long moment with the unhurried assessment of someone who has had to make this kind of calculation before."),
        d("ERAN", "left", "neutral", "He walks with us to the gate. Inside, he stays with Gavrick. He shares nothing about the city's interior until I have confirmed his contact."),
        d("ORIN", "left", "neutral", "That's fair."),
        d("ERAN", "left", "neutral", "I know."),
        n("Gavrick, hearing this, moves to walk beside Orin without being asked. This is also characteristic of Gavrick — the function found and performed without comment."),
      ],
      null,
      { relationships: { eran: 8, gavrick: 6, orin: 3 } }
    ),
    op(
      "Ask Orin: what made you decide to find us. What do you actually want from this operation.",
      "ASK_ORIN_WHY",
      [
        d("KAEL", "right", "neutral", "Why. Not how you found us — why you were looking."),
        d("ORIN", "left", "neutral", "The Spire took seven months from me. I arrived thinking it was what it presented itself as. A study residency for advanced practitioners. I left when I understood that the final stage of the sequence was not academic — it was institutional. A commitment to the Spire's framework in exchange for the completion path."),
        d("KAEL", "right", "neutral", "And you refused."),
        d("ORIN", "left", "neutral", "I refused and they made it clear that the refusal had consequences. My contact helped me leave before the consequences became concrete."),
        d("KAEL", "right", "neutral", "So you want to go back in."),
        d("ORIN", "left", "neutral", "I want what was done to the sequence of people after me to stop. Whatever you're planning — if it does that — I want to be part of it."),
        n("This is an honest answer. Honest answers are not the same as trustworthy actors. But they are a better starting point than most."),
      ],
      null,
      { relationships: { orin: 8, maren: 5, eran: 2 } }
    ),
  ]),

  n("The city gate is less than two hours ahead. The Spire is visible above the walls now — its top four levels above the city's roofline, the stone with its particular quality of density catching the late afternoon light."),

  n("Eran, at the front of the group, says quietly: the gate agent's count will be nine. Nine is not category four. Nine is category five — a large scholarly group, higher interest level, automatic first-day observation inside the city. This was not the plan."),

  dn("DORATH", "left", "neutral", "Can we split the entry."),

  d("ERAN", "left", "thoughtful", "The gate checks are comprehensive enough that splitting a group that was observed together at the waymarker creates a suspicious gap. It is better to enter as nine and manage the first-day observation than to trigger a split-group inquiry."),

  d("MAREN", "left", "neutral", "We are scholars on a survey. Nine scholars is unusual but not unheard of. The survey has documented seven settlements between the border and the city. Eran has papers."),

  d("ERAN", "left", "thoughtful", "Eight settlements, actually. I amended the papers this morning."),

  n("Nine people walk toward the city gate."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 6 — INSIDE  (Week 6 gate)
  // City entry. Leven's rooms. The controlled atmosphere.
  // Cliffhanger: the fourth-level lamp signal — the notation pattern.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The gate procedures are what Eran described. A count, a category, a ledger entry. Nine. Category five. The gate agent records it without looking up. Your group passes into the city with the smooth uniformity of a rehearsed action — the pace consistent, the spacing consistent, the expressions of nine people who have legitimate business and are not thinking about anything except their legitimate business.",
    BG.act2_city_gate, false,
    { id: 'a2_seg6', title: 'Inside', summary: 'The city receives them. Leven\'s rooms. The Spire visible. The fourth-level lamp moves in the notation pattern.' }
  ),

  n("The city's interior is what the approach suggested and something it could not suggest — the specific weight of a city built around an institution. Everything is oriented toward the Spire. The streets run at angles that preserve the sightlines. The buildings are shorter on the east side than the west, as if they grew with the awareness that the Spire should be visible from any point in the city. The architecture knows it is secondary. It has designed itself that way."),

  n("Leven's rooms are approached through the grain warehouse, through the staircase, through a door on the third floor that opens onto four clean rooms and a workspace with a window facing east. Leven is there. She takes one look at nine faces instead of the expected seven or eight, and her expression accommodates this without surprise — the look of someone who has prepared for contingencies and has just seen one."),

  d("LEVEN", "left", "neutral", "The registration covers a merchant group of seven. I will file an amendment by morning — a last-minute addition, two members of the survey team who joined at the eastern waymarker. That is a plausible explanation for category five entry."),

  d("ERAN", "left", "thoughtful", "How quickly can the amendment be processed."),

  d("LEVEN", "left", "neutral", "Twenty-four hours. Until the amendment processes, the nine-person count is an anomaly in the records. That is the window of highest attention."),

  dn("DORATH", "left", "neutral", "Twenty-four hours inside these rooms, no movement."),

  d("LEVEN", "left", "neutral", "Except for one. The first-day observation protocol assigns a city registry clerk to track category five arrivals for twenty-four hours. The clerk will note the building, the entry and exit traffic, and submit a summary report. Any movement that departs from a scholarly survey pattern flags the report."),

  d("SERATH", "left", "neutral", "Does the clerk watch this building specifically or the district traffic?"),

  d("LEVEN", "left", "neutral", "The building. From a fixed observation point on the street below that I can point out from the workspace window. It is not a skilled observer — it is an administrative function. The purpose is to confirm that category five arrivals are doing what their registration says they are doing."),

  d("KAEL", "right", "neutral", "Scholars don't go into their rooms and not come out for twenty-four hours."),

  d("LEVEN", "left", "neutral", "No. Scholars make one or two visible movements per day — to a market, to a noted site, to a city library. Purposeful but unremarkable. I can provide two members of the group with cover for brief movements that confirm the survey activity profile."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "The city is not the road. Every observation here produces a record. The workspace window shows the street below. The Spire is visible from the window. The first twenty-four hours are also the window in which the most can be learned about the environment without being remarkable.",
    continueNarrator: "The twenty-four hours are used. The amendment will have processed. The observation protocol has run its course.",
  },

  ch("A2_SEG6_FIRST_DAY", [
    op(
      "Take one of the cover movement slots — go to the city library as a surveying scholar.",
      "COVER_LIBRARY",
      [
        n("The city library is four streets from Leven's building — a public collection, open, staffed by two clerks who look up when you enter and look back down. You spend two hours. The library holds a general collection with a small section on the eastern district's institutional history. You pull three volumes on the Spire's public founding history and read them with the focus of a scholar who is exactly where their registration says they should be."),
        n("What you find: the public founding history is comprehensive and consistent with Eran's account on every point that both address — which means the points Eran's account addresses that the public history does not are the points that matter."),
        n("What you also find: a librarian who notes your visit in a log with the date and the specific volumes you requested. You are now a data point in the city's record. That data point is unremarkable."),
      ],
      null,
      { relationships: { dorath: 6, eran: 4, maren: 4 } }
    ),
    op(
      "Stay in the workspace and watch the Spire from the window. There is information in a building that cannot be obtained from a library.",
      "WATCH_SPIRE",
      [
        n("The workspace window provides the clearest view of the Spire's upper levels available from this building. You spend the full first day watching — the movement of figures visible at the windows, the pattern of traffic in the street below the Spire's east face, the rhythm of the gate opening and closing."),
        n("Ryn joins you in the afternoon. She keeps her own notes."),
        d("RYN", "left", "quiet", "The third level. Two figures with a consistent movement pattern — they exchange positions every forty minutes. That is a watch rotation."),
        d("KAEL", "right", "neutral", "Thirty-minute intervals would be standard. Forty is unusual."),
        d("RYN", "left", "quiet", "Forty means they have enough personnel to allow a longer rotation. That means the Spire is more staffed than its public function requires."),
        n("You record this. It will matter when the entry planning begins."),
      ],
      null,
      { relationships: { ryn: 10, maren: 5, serath: 4 } }
    ),
    op(
      "Let Gavrick and Orin take the movement slots — they have the most natural reason to be visible in this city.",
      "SEND_GAVRICK_ORIN",
      [
        n("Gavrick goes first, in the morning, with the unhurried pace of a traveler doing an errand. He visits the market district and the waymarker exchange and returns with information about the city's commercial movement patterns — which streets are busy when, which corners have city registry observers, the location of the two secondary observation posts that are not marked on any map."),
        n("Orin goes second, in the afternoon, and returns with something different: a contact. A person he knows from his previous residency who is still in the city and who is willing to provide one piece of information that Eran did not have: the exact day of the next intake cycle."),
        d("ERAN", "left", "thoughtful", "My estimate was within three days. His is exact."),
        dn("DORATH", "left", "neutral", "Noted."),
      ],
      null,
      { relationships: { gavrick: 8, orin: 8, eran: 3 } }
    ),
  ]),

  nb(
    "Evening. The city settles into whatever cities settle into at this hour — not quiet, but a different quality of noise. The workspace window catches the last light. The Spire's upper levels hold the color of the sky long after the streets below go dark.",
    BG.act2_spire_exterior, false
  ),

  n("Ryn is at the window when the lamp on the fourth level begins to move."),

  d("RYN", "left", "quiet", "Look at this."),

  n("The lamp moves from the window's left edge to its center. Pause. Center to right edge. Pause. Back to center. Deliberate, periodic, the rhythm of someone who has done this before."),

  d("RYN", "left", "quiet", "Pattern of four. Left, center, right, center. Every twenty minutes. Third cycle now."),

  d("SERATH", "left", "neutral", "That is the fourth step of the notation cycle. Repeated in movement form."),

  n("The lamp settles. The cycle ends."),

  d("MAREN", "left", "quiet", "Someone on the fourth level knows the notation. Either they know we are here. Or they do this every evening."),

  d("KAEL", "right", "neutral", "Is either of those better?"),

  d("MAREN", "left", "quiet", "The second one is more frightening."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 7 — CONTACT ROOMS  (Week 7 gate)
  // Reconnaissance established. Pellard gives his full account.
  // Cliffhanger: the notation materials were read while the group was away.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The amendment processes. Category five becomes category two — a small scholarly survey group, low ongoing interest, filed. Dorath confirms the street-level observer has been reassigned. The rooms are now, by the city's records, occupied by researchers who are doing exactly what researchers do. The operational window opens.",
    BG.act2_city_alley, false,
    { id: 'a2_seg7', title: 'Contact Rooms', summary: "Pellard gives the full account of the Spire's intake structure. Something reads Maren's materials while the group is away." }
  ),

  n("Serath's contact Pellard is accessed through Leven's secondary location — a cloth merchant's back room, a connecting door that is visually a wall. Pellard knows the door. He has been inside this room before. He gives his account with the particular care of someone who has been waiting to give it for two years and has spent those two years deciding how to make it precise."),

  d("PELLARD", "left", "neutral", "The intake process is presented as a study residency. Advanced practitioners wanting access to the Spire's collection. That presentation is accurate but incomplete. What it doesn't include: the study sequence is designed to bring a practitioner to a specific stage — a stage from which continued advancement requires the Spire's guidance and infrastructure. The text that makes the final stage accessible exists only in the fourth-level reading room. Access to the fourth level requires senior residency status. Senior residency requires a formal institutional commitment."),

  d("MAREN", "left", "neutral", "The completion path is gated behind institutional commitment."),

  d("PELLARD", "left", "neutral", "Yes. And practitioners who arrive already complete are treated differently — not sequenced but integrated. Given resources. Made comfortable within the Spire's structure very quickly."),

  d("SERATH", "left", "neutral", "Integrated rather than committed."),

  d("PELLARD", "left", "neutral", "At first. I was less certain of the distinction by the time I left."),

  n("What Pellard does not say directly but says in the way he says things: he left because he saw what happened to the practitioners who were integrated. Not visibly different from what they were before — more comfortable, well-resourced, advancing in the Spire's network of recognized scholars. But something in them had resolved that he could not articulate precisely. They had arrived with questions about the method and they no longer seemed to have those questions. The questions had been answered, or the questions had been replaced by other questions that the Spire was better placed to address. He is not certain which."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Pellard's account covers the intake structure, the residency framework, and the three completed practitioners he observed during his three years. The details of what was done with those three practitioners are specific and require careful examination before the next steps can be planned.",
    continueNarrator: "Pellard's full account is documented. The intake structure is understood. The three completed practitioners' cases are as clear as they can be made from Pellard's observation.",
  },

  ch("A2_SEG7_PELLARD", [
    op(
      "Ask Pellard about the fourth-level lamp — he worked intake, he would know who has fourth-level access.",
      "PELLARD_LAMP",
      [
        d("KAEL", "right", "neutral", "The fourth-level reading room. Who has current access."),
        d("PELLARD", "left", "neutral", "Senior residents, two permanent scholars, and one resident placed six months ago who was moved to fourth-level access in six months total. Standard progression is twelve months minimum. Six months means they arrived complete."),
        d("MAREN", "left", "thoughtful", "The lamp signal."),
        d("PELLARD", "left", "neutral", "I don't know about a lamp signal. But if someone complete is on the fourth level, and they know someone outside is watching the Spire — they would know how to make themselves visible to that someone without triggering the observation infrastructure."),
        n("He says this with the tone of someone who has worked out the conclusion before being asked to draw it."),
      ],
      null,
      { relationships: { pellard: 10, maren: 8, eran: 5 } }
    ),
    op(
      "Ask Pellard what he would want you to do with the information he has given you.",
      "PELLARD_WANT",
      [
        d("KAEL", "right", "neutral", "If you could choose what we do with what you've told us — what would it be."),
        n("Pellard is quiet for a moment. Not performance — genuine consideration."),
        d("PELLARD", "left", "neutral", "I would want the sequence to stop producing what it produces. The practitioners who are integrated — not harmed, not removed from what they've built inside the Spire. But the sequence itself — the controlled approach to completion — I would want that to stop being the only path."),
        d("PELLARD", "left", "neutral", "I don't know if that's what you're planning. I don't need to know."),
        n("He stands to leave. He says one more thing before the connecting door:"),
        d("PELLARD", "left", "quiet", "I spent three years cataloguing what the Spire does. I would rather have spent three years doing what the Spire claims to do."),
      ],
      null,
      { relationships: { pellard: 8, maren: 10, serath: 4 } }
    ),
    op(
      "Ask Serath to relay what Pellard confirmed versus what Serath already suspected from the deep records.",
      "SERATH_CONFIRM",
      [
        d("KAEL", "right", "neutral", "Serath. What did Pellard confirm that you already believed from the Archive's records?"),
        d("SERATH", "left", "neutral", "The integration pattern. The deep records I found showed three instances from the Archive's own history — practitioners who went east and did not return or returned in a different capacity than they left. The Archive's records describe this as advancement. Pellard's description of what advancement means in practice confirms that the Archive's records were accurate and the Archive's interpretation was wrong."),
        d("KAEL", "right", "neutral", "The Archive knew about the integration."),
        d("SERATH", "left", "neutral", "Knew about the outcomes. Did not understand what produced them."),
        d("MAREN", "left", "quiet", "Or chose not to understand."),
        n("A pause. Serath and Maren rarely agree overtly. The silence that follows is the closest thing to it."),
      ],
      null,
      { relationships: { serath: 8, maren: 7, pellard: 5 } }
    ),
  ]),

  n("Returning to Leven's rooms, Brek says what he always says when there is something to say: at the threshold, without entering, in the tone that is different from his normal tone."),

  d("BREK", "left", "urgent", "Something in this room was moved while we were gone."),

  n("Nothing missing. Nothing displaced. Only the notation materials — Maren's workspace — in a configuration that is nearly identical to how she left them but is not identical. The fold line on the top sheet is wrong. The order of the lower sheets is wrong. Wrong by the margin of someone being careful, not by the margin of carelessness. By the margin of someone who almost but did not quite know how Maren organizes her materials."),

  d("MAREN", "left", "quiet", "Someone read this."),

  d("BREK", "left", "thoughtful", "They had two hours. Maybe copied it."),

  d("MAREN", "left", "quiet", "The notation without the prior stages is not interpretable. But someone now knows this notation exists. Knows that something in this room is worth reading. And knows enough to be almost careful about how they replaced it."),

  dn("DORATH", "left", "quiet", "This room is no longer secure. We move today."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 8 — THE INTAKE WINDOW  (Week 8 gate)
  // Brek's close call outside. Dorath's delayed signal resolved.
  // The second safe house. Orin is still with the group.
  // Cliffhanger: the intake window opens in eleven days — and Orin knows something about it.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The second safe house is the tanners' quarter — two rooms instead of four, the smell of work and practical necessity. Leven provides the key without being asked, from a pocket that seems to hold keys to several places. The move happens in four hours. Brek carries the most, Sira the fastest, and the route Dorath chooses through the city's back passages is one that, Orin mentions, avoids three observation nodes he knows from his previous residency.",
    BG.act2_city_alley, false,
    { id: 'a2_seg8', title: 'The Intake Window', summary: 'The second safe house. The intake window identified. Brek nearly gets caught outside.' }
  ),

  n("The close call happens on the third day in the tanners' quarter. Brek is doing what Brek does — observing, quietly, from a position that gives him maximum coverage — when a city registry sweep comes through the alley. A routine sweep, Dorath says afterward, the kind that happens twice a week in the commercial districts. Not targeted. But the registry sweep in the tanners' quarter means the tanners' quarter is being looked at, and someone in a registry sweep who does the function well notices a person who is not a tanner and who cannot immediately account for what they are doing in the alley."),

  n("Brek is back in the safe house sixteen minutes later. He sits down and reports with the calm of someone who has processed an adrenaline event and filed it as information."),

  d("BREK", "left", "thoughtful", "A registry clerk. Female, thirty-five approximately, thorough. She asked me my business in the quarter. I said I was checking on a supply delivery for my employer's survey operation. She wrote it down. She will file it. If the category five entry was truly downgraded to category two, the filing will be routine. If the downgrade was not fully processed, it flags."),

  dn("DORATH", "left", "neutral", "I confirmed the downgrade processed two days ago."),

  d("BREK", "left", "thoughtful", "Then it should be routine."),

  dn("DORATH", "left", "neutral", "Should be."),

  n("The two words sit in the room."),

  d("MAREN", "left", "neutral", "We proceed. 'Should be' is the standard we are operating under throughout this city."),

  n("Two days later, Dorath's delayed signal resolves. She has been waiting for a contact acknowledgment that was supposed to arrive within a week of entry — a confirmation through the network that the intake registry amendment was received and accepted. The acknowledgment arrives fourteen days late, through an intermediary that is different from the expected channel, with a notation that explains the delay: the standard channel had been under observation for the previous three weeks and the contact had rerouted to avoid creating a data point."),

  dn("DORATH", "left", "thoughtful", "The standard channel was being observed. That means someone in the Spire's analysis infrastructure flagged our entry and checked the registration network."),

  d("ERAN", "left", "thoughtful", "But the check concluded we were category two. The acknowledgment confirms this. The channel was observed and returned a clean result."),

  dn("DORATH", "left", "thoughtful", "A clean result obtained by a channel the Spire was watching. Which means the Spire now knows the category two registration is real, by checking the real channel. That is better than not being checked at all."),

  {
    type:             'task_gate',
    gateStyle:        'collection',
    taskSlots:        2,
    pauseNarrator:    "The intake window opens in eleven days. The preparation period between now and then is specific: gate approach mapping, entry timing, the workspace for Maren's text. Eleven days is enough time to do this correctly. It is exactly enough time.",
    continueNarrator: "The preparation work is done. The eleven days have been used.",
  },

  ch("A2_SEG8_ORIN_INFO", [
    op(
      "Ask Orin what he knows about the intake procedure that Eran and Pellard don't have.",
      "ASK_ORIN_INTAKE",
      [
        d("KAEL", "right", "neutral", "Orin. The intake day. You've been through it. What does Pellard's account miss?"),
        d("ORIN", "left", "neutral", "The intake escort. Pellard described the blue ledger, the eight-minute processing time. What he didn't mention: the escort who carries the blue ledger is always the same two people on alternating weeks. The first escort is methodical — eight minutes, no variation, no conversation. The second is faster but pays attention differently — she is assessing the arrivals, not just processing them."),
        d("KAEL", "right", "neutral", "What is she assessing."),
        d("ORIN", "left", "neutral", "Whether they are what they say they are. Whether their level matches their paperwork. She has turned away two arrivals in her three years of working intake, both of whom were, in her assessment, not at the level they claimed."),
        d("ERAN", "left", "thoughtful", "Which escort rotation runs on the next intake day."),
        d("ORIN", "left", "neutral", "The second. The assessing one."),
        n("Eran looks at Maren. Maren looks at the wall."),
      ],
      null,
      { relationships: { orin: 10, eran: 5, maren: 3 } }
    ),
    op(
      "Spend the preparation period working with Maren on the text — the thing being placed is the most important element of the operation.",
      "WORK_WITH_MAREN",
      [
        n("The eleven days in the tanners' quarter produce, in the workspace Leven arranged, a text of approximately forty pages in the notation that the Vraen fragments use for their most compressed elements. Maren writes it. You read each section as she finishes it, not to correct — to confirm that it is readable at the stage for which it is intended."),
        n("On the seventh day, you tell her: this section, the transition between the eighth and ninth stages, requires more context than a practitioner at that level will have."),
        d("MAREN", "left", "thoughtful", "How much more."),
        d("KAEL", "right", "neutral", "One page. Maybe two."),
        n("She writes two more pages. On the ninth day, the text is complete. She holds it for a moment and does not say what she is thinking. You do not ask. There are things that are finished in silence."),
      ],
      null,
      { relationships: { maren: 15, sira: 4, ryn: 4 } }
    ),
    op(
      "Give Orin something real to do during the preparation period — he needs to demonstrate he belongs here.",
      "TASK_ORIN",
      [
        d("KAEL", "right", "neutral", "Orin. There is work you can do that nobody else can."),
        d("ORIN", "left", "neutral", "Tell me."),
        d("KAEL", "right", "neutral", "The side entrance — the south face, the blue mark at child's height. Map everything between Leven's first building and that entrance that I would not find in any document."),
        d("ORIN", "left", "neutral", "Give me three days."),
        n("He produces what he promised in two and a half days. A hand-drawn map of three routes from the merchant district to the Spire's south face, with each route's observation nodes marked, their watch timings noted, and a gap in the third route's coverage identified: a seven-minute window each morning when both visible observers are engaged with incoming carts at the eastern market entrance."),
        dn("DORATH", "left", "thoughtful", "Seven minutes."),
        d("ORIN", "left", "neutral", "Seven minutes every morning. Consistent for the last three days."),
        dn("DORATH", "left", "thoughtful", "That is enough."),
      ],
      null,
      { relationships: { orin: 12, dorath: 8, gavrick: 4 } }
    ),
  ]),

  n("Day nine of the preparation period. Evening. The intake window in two days."),

  n("Orin has been quiet since he returned from the last reconnaissance. Not unhappy — something else. The look of someone who has resolved a question they were not asking out loud."),

  d("KAEL", "right", "neutral", "What is it."),

  d("ORIN", "left", "neutral", "I have a contact outside the city. Someone I trust from before I left. I have been sending them information since we arrived."),

  n("The room is very quiet."),

  d("KAEL", "right", "neutral", "What information."),

  d("ORIN", "left", "neutral", "Nothing operational. Location generally. That the group was practicing scholars, which is what we are, which is what the records say. That the operation was in preparation, without saying what the operation was."),

  d("KAEL", "right", "neutral", "Does your contact know who your contact's contacts are."),

  d("ORIN", "left", "quiet", "I thought so. I'm no longer certain."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 9 — THE FRACTURE  (Week 9 gate)
  // Orin confirmed. Maren's decision. The safe house move.
  // Cliffhanger: Eran delivers word that Voss has arrived at the Spire. In person.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Maren does not shout. She has never, in your observation, shouted. What she does instead is become very still and very precise, and the precision functions in the room the way volume would in a smaller person. Orin sits across the table and receives this precision with the composure of someone who had been expecting it.",
    BG.act2_city_alley, false,
    { id: 'a2_seg9', title: 'The Fracture', summary: 'Orin confirms what the contact knows. Maren decides. The group moves. Voss arrives.' }
  ),

  d("MAREN", "left", "neutral", "Tell me the exact content of what you transmitted. Every detail. In order."),

  d("ORIN", "left", "neutral", "Arrival in the city, the entry date, as a nine-person group. Category classification — I transmitted the category five entry and the subsequent downgrade to category two. The building in the merchant district — general location, not specific address. That the group was conducting a scholarly survey with a secondary research purpose. Nothing about the secondary research. Nothing about the Spire directly."),

  d("MAREN", "left", "neutral", "The secondary research."),

  d("ORIN", "left", "neutral", "I said 'secondary research purpose' and nothing more. I did not name it."),

  d("MAREN", "left", "neutral", "Your contact's analysis of 'secondary research purpose' from a nine-person practitioner group arriving in this city at this time."),

  n("Orin is quiet for a moment."),

  d("ORIN", "left", "quiet", "They would probably conclude: something related to the Spire."),

  d("MAREN", "left", "neutral", "Yes."),

  n("Dorath has been standing at the window, watching the street. She does not turn."),

  dn("DORATH", "left", "neutral", "The question is what Orin's contact does with that conclusion."),

  d("ORIN", "left", "neutral", "My contact has no connection to the Spire. They are not ideologically aligned with the Spire's framework. They were helping me leave when leaving was necessary. That is the full extent of what I know about their current connections."),

  d("MAREN", "left", "neutral", "When was the last transmission."),

  d("ORIN", "left", "neutral", "Two days ago."),

  {
    type:             'task_gate',
    gateStyle:        'escape',
    taskSlots:        3,
    pauseNarrator:    "The rooms are compromised, or may be compromised, or are compromised from a direction that cannot be closed. The second safe house route is in Dorath's memory and Leven's key. Three things need to happen before dark and before the information in Orin's last transmission reaches whoever processes it next.",
    continueNarrator: "The second safe house. The move completed. The previous location is behind you.",
    enemyName:        "Registry Observer",
  },

  ch("A2_SEG9_ORIN_DECISION", [
    op(
      "Keep Orin in the group. He acted badly but he is not an enemy and he knows the city.",
      "KEEP_ORIN",
      [
        d("KAEL", "right", "neutral", "He stays. He made a decision he can't reverse. We use what he knows."),
        dn("DORATH", "left", "neutral", "We monitor what he transmits from this point forward."),
        d("KAEL", "right", "neutral", "Yes."),
        n("Orin says nothing. He accepts the conditions with the expression of someone who expected worse and has received the version that leaves them a function to perform. He will perform the function. You believe this — not because Orin is trustworthy in the abstract, but because what he wants is to be useful, and useful requires being inside the operation, and being inside the operation requires not acting alone again."),
        d("ORIN", "left", "quiet", "I won't send anything else. You have my word."),
        d("KAEL", "right", "neutral", "I know."),
      ],
      null,
      { relationships: { orin: 12, dorath: -3, maren: 5 } }
    ),
    op(
      "Release Orin. Give him a direction west. He has told what he knows and the group is safer with fewer moving parts.",
      "RELEASE_ORIN",
      [
        d("MAREN", "left", "neutral", "We are going to give you a route west and a contact at the border settlement. You take the route, you reach the contact, you wait there. When the operation is done, someone will come west on the same road and you will be able to continue from there."),
        d("ORIN", "left", "quiet", "You're not going to ask me anything else."),
        d("MAREN", "left", "neutral", "I'm telling you what happens now. You don't have a negotiating position."),
        n("Orin leaves the following morning through the tanners' quarter, west. Dorath watches until he is out of sight. She does not say what she is thinking. You don't ask."),
        n("The group is eight. The operation continues."),
      ],
      null,
      { relationships: { dorath: 8, maren: 6, orin: -8 } }
    ),
    op(
      "Ask Maren: is the intake window still viable. Everything Orin transmitted — does it change whether we proceed.",
      "ASK_VIABLE",
      [
        d("KAEL", "right", "neutral", "Maren. The intake window is in eight days. Does what Orin transmitted change whether we proceed?"),
        n("She considers this for longer than her usual consideration."),
        d("MAREN", "left", "neutral", "What Orin transmitted was general enough to conclude 'practitioner group, secondary purpose related to Spire' and specific enough to locate us in the merchant district building, which we have already left. The intake window requires us to enter as individual arrivals, not as a known group. The connection between the merchant district group and the intake arrivals requires inference, not evidence."),
        d("MAREN", "left", "neutral", "The window is still viable. But it is viable with a margin that is smaller than I would choose."),
        d("KAEL", "right", "neutral", "Is it viable enough."),
        d("MAREN", "left", "neutral", "Yes."),
      ],
      null,
      { relationships: { maren: 8, dorath: 5, serath: 4 } }
    ),
  ]),

  n("Eran returns to the second safe house on the second evening after the move. He has been outside the city since the morning of the move, watching the road approaches. He sits at the table and places a folded paper in the center."),

  d("ERAN", "left", "neutral", "Voss. Not a representative. The person identified in the intake registry header arrived at the Spire yesterday. In person. On-site."),

  d("SERATH", "left", "neutral", "Voss is here."),

  d("ERAN", "left", "neutral", "Tavren Voss, fourth-generation head. Arrived yesterday. Will be present for the next intake day."),

  d("MAREN", "left", "quiet", "Then we are operating inside Voss's institution, in Voss's presence, against a system Voss designed."),

  n("Statement, not question. And then, after a pause:"),

  d("MAREN", "left", "thoughtful", "Good. Then when it works, there will be no ambiguity about what happened."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 10 — DORATH INSIDE  (Week 10 gate)
  // Dorath enters the Spire through supplementary intake.
  // Returns with the registry and Voss's real name.
  // Cliffhanger: the cloth mark from the fourth-level contact on Dorath's lapel.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Dorath goes in on the supplementary intake day — the smaller, quieter version of the main intake that Pellard had identified as a lower-scrutiny entry. She carries what she always carries when she needs to be unremarkable: nothing. The specific weight of a person who belongs where they are. She enters at the third hour after dawn and does not return until the twenty-third.",
    BG.act2_spire_exterior, false,
    { id: 'a2_seg10', title: 'Dorath Inside', summary: 'Dorath spends fourteen hours in the Spire. Returns with the intake registry and three items.' }
  ),

  n("The group waits. This is the kind of waiting that is also work — Maren continues the text, Serath reviews the fourth-level map, Brek maintains the exterior observation, Ryn works on the practice with Sira in the inner room. Eran sits with the cloth notation he has been developing for the contact signal, adding elements that expand the vocabulary of what can be transmitted through the lamp's movement. Gavrick watches the street."),

  n("You find the waiting harder than the road."),

  d("SIRA", "left", "thoughtful", "That is because on the road you are moving toward the problem. Here the problem is moving toward you. The passive form of the same work."),

  d("KAEL", "right", "neutral", "Does the method make waiting easier."),

  d("SIRA", "left", "thoughtful", "The method makes everything that requires patience more achievable. Not easier — more achievable. The patience is still required. What changes is the capacity for it."),

  n("At the twenty-third hour, Dorath comes through the back entrance of the tanners' building with the controlled pace of someone who has completed something that required sustained performance and is now on the other side of it. She sets three items on the table: a notebook, a folded document, and a small piece of cloth with a mark on it."),

  dn("DORATH", "left", "neutral", "The notebook is what I could hold in memory from four hours in the reading rooms. The document is a hand copy of the intake registry — nine minutes of unobserved access at the intake coordinator's desk. The cloth mark I will explain separately."),

  d("MAREN", "left", "neutral", "The registry."),

  n("Dorath unfolds it. The header notation at the top of the registry page — the section that indicates responsible authority — uses a personal name in archive notation format."),

  dn("DORATH", "left", "neutral", "Tavren Voss. Fourth-generation head, senior authority. The name traces to a specific archive lineage — I cross-referenced it against the deep records from the settlement. First-generation Voss: a preservation scholar, two hundred years ago, who developed a theory of knowledge control that the Vraen practitioners explicitly rejected. The fourth generation has been implementing the theory."),

  n("The cloth mark. Eran takes it from the table and holds it for a moment with the expression of someone who has not seen something in a very long time and had not expected to see it in this room."),

  d("ERAN", "left", "thoughtful", "I put this notation into the contact network twelve years ago. It was used twice before today. The mark means: I am here. I know who you are. I am not hostile."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "The registry is real and Dorath copied it in nine minutes from memory. There are names, dates, categories, and a notation system that requires careful reading to produce the operational picture of the Spire's current resident population.",
    continueNarrator: "The registry is read and understood. The picture of the Spire's current resident population is as clear as the copy can make it.",
  },

  ch("A2_SEG10_FOURTH_CONTACT", [
    op(
      "The cloth mark — attempt contact with whoever placed it. They are inside and they are reachable.",
      "CONTACT_FOURTH",
      [
        d("KAEL", "right", "neutral", "The fourth-level contact. Eran's notation network — can we reach them?"),
        d("ERAN", "left", "thoughtful", "The cloth mark was delivered today. Which means the contact knows Dorath was inside, knows she is connected to our group, and chose to identify themselves. They are prepared for communication."),
        d("MAREN", "left", "neutral", "Establish the contact window."),
        n("It takes two days to establish through the lamp signal and Eran's network. The first communication is brief — a confirmation of availability. The second is substantive: a map of the reading room's internal layout, drawn from memory, accurate to the detail the fourth-level map shows, plus two corrections where the map is wrong. And a notation: the text you place, I will maintain."),
        d("MAREN", "left", "quiet", "They know what we're planning."),
        d("ERAN", "left", "thoughtful", "They have been planning for the same thing for three years. From inside."),
      ],
      null,
      { relationships: { eran: 12, maren: 10, dorath: 5 } }
    ),
    op(
      "Ask Dorath about the four hours in the reading room — what did the collection actually hold.",
      "ASK_COLLECTION",
      [
        d("KAEL", "right", "neutral", "The open-access reading room. Four hours. What was in there."),
        dn("DORATH", "left", "thoughtful", "More than I could document properly. The collection is genuine — texts on the practice going back to the Archive's founding period, including materials I have not seen references to in the deep records. If the Spire's access framework were different, this would be an institution worth preserving."),
        d("MAREN", "left", "neutral", "The framework is the problem. Not the collection."),
        dn("DORATH", "left", "neutral", "Yes. The collection itself is not the issue. Which is why the plan is to leave something in it rather than remove something from it."),
        n("She says this with a neutrality that means she has spent four hours coming to this conclusion and has arrived."),
      ],
      null,
      { relationships: { dorath: 8, maren: 8, serath: 4 } }
    ),
    op(
      "Ask Eran: who is the fourth-level contact. You have been building toward them for twelve years.",
      "IDENTIFY_FOURTH",
      [
        d("KAEL", "right", "neutral", "The contact. You placed them three years ago. You know who they are. Tell us."),
        d("ERAN", "left", "thoughtful", "Someone who completed the method eight years ago. Independently. Without institutional context, without the Archive, without the fragments as we know them. They arrived at completion through a different entry point — one I would not have predicted was viable."),
        d("MAREN", "left", "quiet", "Eight years ago."),
        d("ERAN", "left", "thoughtful", "Before your project was formalized. Before the Archive's recent structure. They did not know what the Archive was doing. They simply followed the practice to its end."),
        d("MAREN", "left", "quiet", "The method is accessible from more entry points than the Archive documented."),
        d("ERAN", "left", "thoughtful", "That is one of the things this operation will eventually demonstrate. Yes."),
      ],
      null,
      { relationships: { eran: 10, maren: 8, serath: 5 } }
    ),
  ]),

  n("The registry sits on the table. Sixty-three residents. The intake schedule. The administrative authority notation at the top: Tavren Voss, in a handwriting that has produced these documents for what the founding dates suggest is thirty years."),

  n("Thirty years. Someone has been running this institution for thirty years with this specific design. Maren, looking at the header notation, has been quiet for several minutes."),

  d("SIRA", "left", "thoughtful", "What are you thinking."),

  d("MAREN", "left", "quiet", "That the theory requires an institution to implement it. Which means the theory depends on the institution surviving. Which means the most effective counter to the theory is not to destroy the institution — which would be temporary, since it can be rebuilt — but to make the institution unable to produce the thing the theory requires."),

  n("She looks at the text she has been writing for eleven days."),

  d("MAREN", "left", "quiet", "Which is what we are going to do."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 11 — THE FOURTH LEVEL  (Week 11 gate)
  // Voss confirmed on-site. Fourth-level map finalized with contact's corrections.
  // The second cohort registry found — twenty-three practitioners expected.
  // Cliffhanger: second cohort arrives the same day as the intake window.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The week after Dorath's entry is preparation at a different scale than before. Not broader — more specific. The fourth-level map with the contact's two corrections changes the entry route by nine meters and one door. Nine meters is the difference between the watch rotation's blind spot and its overlap. One door is the difference between a six-minute crossing and a fourteen-minute one. The corrections are not small.",
    BG.act2_city_contact, false,
    { id: 'a2_seg11', title: 'The Fourth Level', summary: 'Voss confirmed on-site. The map finalized. The second cohort arrives the same day as the entry window.' }
  ),

  n("Eran and the fourth-level contact have established a communication rhythm through the lamp signal and the cloth notation. The contact's transmissions are terse — they work in the notation economy of someone who has been doing this for a long time in a constrained environment. Each transmission takes sixty seconds to deliver and eight minutes to decode fully. Eran decodes them in six."),

  n("On the fourth day after Dorath's return, a transmission arrives that contains three elements: a confirmation that Voss has been on the fourth level twice this week, an update on the watch rotation timing that requires a change to the entry window, and a notation that Eran reads twice before translating."),

  d("ERAN", "left", "thoughtful", "The Spire's administrative records have been updated with a new arrival category. Expected practitioners — advanced level, arriving directly rather than through standard intake. The contact's count: twenty-three."),

  d("SERATH", "left", "neutral", "A second cohort."),

  d("ERAN", "left", "thoughtful", "Twenty-three practitioners expected. Category: pre-arranged, admitted directly. Not standard intake — side entrance."),

  dn("DORATH", "left", "neutral", "When."),

  d("ERAN", "left", "thoughtful", "The arrival date in the administrative records is the same as the next intake day."),

  n("The room processes this."),

  d("KAEL", "right", "neutral", "The intake window that we have been preparing for is the day twenty-three expected practitioners arrive at the Spire's side entrance."),

  d("ERAN", "left", "thoughtful", "Yes."),

  dn("DORATH", "left", "neutral", "The gate will be at maximum observation state. Both entry points active simultaneously."),

  d("MAREN", "left", "neutral", "The main intake goes through the front. The cohort goes through the side. The front arrival traffic provides cover."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "The fourth-level contact's two corrections to the map need to be integrated with the existing entry plan. The window timing has changed. The second cohort adds an element that requires planning for both the entry and the exit.",
    continueNarrator: "The revised plan is complete. The corrections are integrated. The second cohort is accounted for.",
  },

  ch("A2_SEG11_SECOND_COHORT", [
    op(
      "The overlap is a complication but also a cover — the high-activity intake day provides the best camouflage.",
      "OVERLAP_COVER",
      [
        d("KAEL", "right", "neutral", "The cohort arrival is high activity at the gate. That same high activity is cover for individuals moving through the front intake."),
        d("SERATH", "left", "neutral", "The analysis infrastructure is stretched across two simultaneous intake events. Pattern-matching degrades when the volume doubles."),
        dn("DORATH", "left", "neutral", "That is true for human observers. Automated recording does not degrade."),
        d("SERATH", "left", "neutral", "The automated recording produces data that requires human analysis. The analysis is what degrades. We enter in the window between recording and analysis."),
        d("MAREN", "left", "thoughtful", "Then the revised plan uses the overlap. We proceed."),
      ],
      null,
      { relationships: { serath: 10, maren: 8, dorath: 3 } }
    ),
    op(
      "Ask Eran what the second cohort represents — who are twenty-three expected practitioners.",
      "ASK_COHORT",
      [
        d("KAEL", "right", "neutral", "Twenty-three practitioners. Expected and pre-arranged. What does Voss want with twenty-three practitioners arriving at once."),
        d("ERAN", "left", "thoughtful", "The fourth generation is consolidating. Building the institutional network that the theory requires — not just the Spire but connected nodes. Twenty-three practitioners arriving at once, admitted directly without the intake sequence, means they are known to Voss already. Recruited, not discovered."),
        d("MAREN", "left", "neutral", "They are the institution's personnel. Not students."),
        d("ERAN", "left", "thoughtful", "Some will be. Some are already advanced enough to manage the intake process for others. Voss is staffing for expansion."),
        d("SERATH", "left", "neutral", "Which means our window is not just the intake day. It is potentially the last intake day before the Spire becomes something larger than it currently is."),
      ],
      null,
      { relationships: { eran: 8, maren: 6, serath: 8 } }
    ),
    op(
      "Contact the fourth-level person directly — they need to know the second cohort is arriving the same day.",
      "WARN_CONTACT",
      [
        n("The warning goes through the cloth notation. The response comes back in the lamp signal two hours later."),
        n("Four characters: already known."),
        d("MAREN", "left", "thoughtful", "They knew."),
        d("ERAN", "left", "thoughtful", "They have access to the administrative records. Of course they knew."),
        n("A pause."),
        d("MAREN", "left", "thoughtful", "Ask them if the second cohort's arrival changes the internal timeline for placing the text."),
        n("The response this time is longer. Seven characters in the notation, which Eran translates as: second cohort arrival creates three hours of standard process disruption. Use the first two hours."),
      ],
      null,
      { relationships: { maren: 10, eran: 8, dorath: 5 } }
    ),
  ]),

  n("The evening before the intake window. Maren has been in the workspace for six hours. The text is forty-one pages. It is complete."),

  n("She comes to the common room and sits at the table with the expression of someone who has finished something they have been working on for nineteen years."),

  d("MAREN", "left", "quiet", "If someone reads this at the correct stage — the stage the Spire's sequence brings them to — the method does not stop there. They continue. The Spire's framework cannot prevent continuation in a practitioner who has read this."),

  d("SIRA", "left", "quiet", "You are certain."),

  d("MAREN", "left", "quiet", "I am certain that what is in this text is real and correct. I am not certain that the Spire will not find and remove it before the right person reaches it. That is the risk."),

  d("KAEL", "right", "neutral", "The contact will maintain it."),

  d("MAREN", "left", "quiet", "Yes. If the contact can."),

  n("If. The word sits in the room the way 'should be' sat in the room after Brek's close call. The word for the margin."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 12 — THE PLAN COMPLETE  (Week 12 gate)
  // Maren's full plan understood by the group. Eran confirms the network is ready.
  // Entry team confirmed: Maren, Dorath, Serath, the player.
  // Cliffhanger: Voss is scheduled to be in the fourth-level reading room that morning.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The night before the entry, the group meets in the second safe house's common room. All nine — Maren, Dorath, Serath, you, Ryn, Brek, Sira, Gavrick, Orin. The lamp burns at Dorath's preferred level. The table holds the fourth-level map with the contact's corrections, the entry timing notes, and Maren's forty-one pages in a case that has been with her since the Archive.",
    BG.act2_city_contact, false,
    { id: 'a2_seg12', title: 'The Plan Complete', summary: "The full plan is understood by everyone. Eran's network is confirmed. Voss's schedule creates a complication." }
  ),

  d("MAREN", "left", "neutral", "The entry team is four. Myself, Dorath, Serath, and you. We enter through the front intake flow in the morning window. The intake escort on this day is the assessing one — which means the entry requires practitioners who are genuinely at or past the stage the intake process is designed to accept."),

  d("DORATH", "left", "neutral", "We are all complete or approaching completion."),

  d("MAREN", "left", "neutral", "Yes. The escort's assessment will find what the assessment is designed to find. We are not misrepresenting anything to the assessment — we are practitioners, and we are at the level practitioners entering the Spire are expected to be at. What we are not disclosing is that we already have what the Spire is claiming to offer."),

  d("KAEL", "right", "neutral", "What happens after we are inside."),

  d("MAREN", "left", "neutral", "Dorath and Serath have specific functions — I will not describe them in full detail here. Your function and mine: we reach the fourth-level reading room. We place the text in the collection. We verify the contact has seen us and knows the placement location. We exit through the secondary exit."),

  d("KAEL", "right", "neutral", "The forty-seven steps in the route between the third and fourth levels."),

  d("MAREN", "left", "neutral", "Thirty-nine. With the contact's corrections."),

  d("SERATH", "left", "neutral", "Eran."),

  d("ERAN", "left", "thoughtful", "The network is ready. The cloth notation contact is established. If the team needs to abort, the signal is through Brek at the building across the alley. The signal goes to me in six minutes. Gavrick and Orin are on the exit route."),

  n("Orin, hearing his name, looks up. His expression is the one he has had since the night of his disclosure — careful, present, the expression of someone trying to demonstrate that the demonstration is real."),

  {
    type:             'task_gate',
    gateStyle:        'collection',
    taskSlots:        2,
    pauseNarrator:    "The preparation is complete. What remains for the night is the kind of work that cannot be done in motion: reviewing the text one final time, reviewing the entry route one final time, and the practice session that Maren says is not optional.",
    continueNarrator: "The night's work is done. The practice held. The text is exactly what it should be. The morning comes.",
  },

  ch("A2_SEG12_NIGHT_BEFORE", [
    op(
      "Spend the night reviewing the entry route until it is automatic. Dorath has a drill.",
      "ROUTE_DRILL",
      [
        dn("DORATH", "left", "neutral", "The thirty-nine steps from third to fourth level. Every turn, every door, the watch rotation window at each point. We walk it in the common room."),
        n("You walk it in the common room floor plan that Dorath has chalked on the boards. Thirty-nine steps. Then again. Then again with the variables: what changes if the watch rotation is late, if the third-level landing has an additional presence, if the secondary exit is occupied. Each variable has a response. The response becomes the movement."),
        n("At the end of two hours, Dorath says: that's enough. You know it. Repeating it now produces diminishing returns."),
        n("You believe her. The route is yours."),
      ],
      null,
      { relationships: { dorath: 12, serath: 5, maren: 4 } }
    ),
    op(
      "Spend the last hours with Maren. She wrote this text for nineteen years. She should not be alone the night before it is placed.",
      "WITH_MAREN",
      [
        n("She is in the workspace when you find her. Not writing — the text is done. Reading it. Or not reading it exactly — looking at it the way you look at something that has been part of you for a long time and is about to exist in the world separately from you."),
        d("KAEL", "right", "neutral", "How does it feel."),
        d("MAREN", "left", "quiet", "I have been working on the method for nineteen years. Fourteen of those years were practice. Five were preparation to ensure the practice could be shared. The text is the end of the five years and the meaning of the fourteen."),
        n("She looks at the case."),
        d("MAREN", "left", "quiet", "It is strange to complete something. It is different from what I expected. I expected it to feel final. It feels like a beginning."),
        n("You sit with her until the lamp needs refilling."),
      ],
      null,
      { relationships: { maren: 15, sira: 4 } }
    ),
    op(
      "Find Sira and ask her what she would do if the operation succeeds — what she plans for afterward.",
      "TALK_SIRA",
      [
        n("Sira is in the inner room, not practicing — sitting, the particular quality of stillness that is different from rest. She has been expecting someone."),
        d("KAEL", "right", "neutral", "After this. If the text is placed. What do you plan?"),
        d("SIRA", "left", "thoughtful", "The practice continues regardless of what is placed in the Spire. What changes: who has access to the continuation path. That is important. That is worth the operation."),
        d("KAEL", "right", "neutral", "And you specifically."),
        d("SIRA", "left", "thoughtful", "I want to go back to the Archive ruins. Not to rebuild anything. To understand what was there that wasn't recorded. The Unnamed Third — the collection that was catalogued once and then destroyed. The method produces a specific kind of understanding. I want to try to read what is left of that understanding in what the Archive left behind."),
        n("You think of Maren's comment about reading text structurally — the way an architect reads a building. Yes. You understand what Sira means by reading the Archive ruins. You think she might actually find something."),
      ],
      null,
      { relationships: { sira: 10, maren: 5, ryn: 4 } }
    ),
  ]),

  n("Dawn. Eran comes to the room before the light fully establishes."),

  d("ERAN", "left", "urgent", "The contact's morning transmission. Voss is scheduled to be in the fourth-level reading room this morning. The schedule shows: after the second cohort arrives. Which is the same window as the entry. Voss will be in the reading room while the entry team is on the third level."),

  dn("DORATH", "left", "neutral", "That changes the timing."),

  d("MAREN", "left", "neutral", "It doesn't change the operation. It changes the timing inside the operation. We go later in the morning window — after Voss moves from the fourth level to the second-cohort reception."),

  d("ERAN", "left", "thoughtful", "The contact's transmission gives us the reception time: fourth hour after dawn. Voss moves from the reading room to the reception at the fourth hour."),

  d("MAREN", "left", "neutral", "Then we enter at the third hour. We are in the reading room before the fourth hour, out before Voss is back."),

  d("KAEL", "right", "neutral", "The timing is precise."),

  d("MAREN", "left", "neutral", "It is always precise."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 13 — THE ENTRY  (Week 13 gate)
  // The intake window. Entry. Placement. Four hours and seventeen minutes.
  // Cliffhanger: the forty-seven extra minutes — Maren had a conversation.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The intake morning arrives with the cold particular to a city in late autumn — stone-cold, the kind that was in the air before dawn and has settled permanently into the stones by the time the first workers appear. The four of you leave the tanners' quarter in the seven-minute observation gap that Orin identified. Seven minutes at the pace Dorath requires is three hundred and forty meters.",
    BG.act2_city_gate, false,
    { id: 'a2_seg13', title: 'The Entry', summary: 'Entry through the intake window. Placement done. Four hours and seventeen minutes.' }
  ),

  n("The gate processing is eight minutes. The assessing escort takes eight minutes with the group of four that enters ahead of you. She takes seven minutes with you. The blue ledger records four names — the survey team's names, correctly spelled, against the category classification that matches the registration on file. She looks at each of you once, directly, the look of someone who is doing what she does and knows when it is complete."),

  n("Inside."),

  n("The Spire's interior is the building Dorath described and something Dorath's description could not convey: the specific quality of a space built for the practice. The proportions of the corridors, the placement of the windows, the height of the ceilings — everything is calibrated for a kind of attention that most buildings do not consider. You notice this the way you notice a word in a language you speak well. The building knows what it is for."),

  d("MAREN", "left", "quiet", "Don't stop. Keep moving."),

  n("You keep moving."),

  n("The third level. The watch rotation is at a different position than the revised plan indicated — not a problem, but a note. Dorath adjusts the route by four meters without speaking, making a small sign with her left hand that means: follow, not alongside. Serath processes this in his stride. You process it in yours."),

  n("Thirty-nine steps to the fourth level. Thirty-six taken without incident. On the thirty-seventh step there is a sound from behind the door you are about to pass — not alarming, not movement, but a sound that means someone is in a room you had mapped as empty at this hour. Maren stops. She looks at the door. She makes a decision."),

  {
    type:             'task_gate',
    gateStyle:        'escape',
    taskSlots:        3,
    pauseNarrator:    "The sound behind the door is not the watch rotation — it is someone else, in a room that should be empty. Thirty-seven steps in. Two steps and a door between you and the reading room. Forty-seven minutes are about to be spent. You don't know this yet.",
    continueNarrator: "Four hours and seventeen minutes. Everyone is out. The secondary exit. The alley. The tanners' quarter.",
    enemyName:        "Spire Scholar",
  },

  ch("A2_SEG13_CONVERSATION", [
    op(
      "Ask Maren what happened behind that door. The forty-seven extra minutes — who was there.",
      "ASK_CONVERSATION",
      [
        d("KAEL", "right", "neutral", "The door. The sound. Forty-seven minutes. Who was in that room."),
        n("They are in the second safe house. Dorath is checking the route behind them. Serath is compiling his observational notes from the entry. Maren is sitting at the table with the empty case — the text is placed — and the expression of someone who has closed one chapter and opened another."),
        d("MAREN", "left", "quiet", "The fourth-level contact. They were not in the reading room. They were in the room I heard. Waiting."),
        d("KAEL", "right", "neutral", "They knew you were coming."),
        d("MAREN", "left", "quiet", "They knew the entry team would pass that door. They wanted forty-seven minutes before we reached the reading room. Forty-seven minutes for a conversation."),
        d("KAEL", "right", "neutral", "What did you talk about."),
        d("MAREN", "left", "quiet", "The method. What it is accessible from. What the Archive believed about access points that was wrong. What the Spire believes about access points that is also wrong. And what is correct."),
        n("She is quiet for a moment."),
        d("MAREN", "left", "quiet", "It was worth the time."),
      ],
      null,
      { relationships: { maren: 12, eran: 6 } }
    ),
    op(
      "Don't ask. The operation succeeded. What happened in forty-seven minutes is Maren's to carry.",
      "DON'T_ASK",
      [
        n("You don't ask. The operation is done. Everyone is out. The text is placed. Whatever happened in forty-seven minutes is inside the operation and inside the building and inside Maren, and you have learned, in the months since the Archive burned, that there are things Maren carries that are hers to carry and do not require accounting to anyone else."),
        n("Later, walking the group through the tanners' quarter and into the safe house, Brek looks at each face and sets out food and says nothing. Ryn asks one question: is it placed? Maren says: yes. That is enough."),
      ],
      null,
      { relationships: { maren: 8, brek: 5, ryn: 5 } }
    ),
    op(
      "Ask Dorath what she observed during the forty-seven minutes — she was in the building with you.",
      "ASK_DORATH",
      [
        d("KAEL", "right", "neutral", "Dorath. The forty-seven extra minutes. What did you see."),
        dn("DORATH", "left", "thoughtful", "I was maintaining the third-level position. I saw the watch rotation complete its cycle twice. I saw three individuals enter the stairwell from the second level and exit from the fourth — not the reading room stairwell, the administrative one. And I saw the secondary exit remain clear for the full duration."),
        d("KAEL", "right", "neutral", "You didn't know what Maren was doing."),
        dn("DORATH", "left", "neutral", "No. I knew the plan had changed and the new plan required forty-seven minutes in a room that was not in the plan. I held the position."),
        n("She says this with the neutrality of someone who has held many positions in many operations and knows that holding the position is the function."),
        dn("DORATH", "left", "neutral", "The text is placed and everyone is out. What happened in the forty-seven minutes produced that. I don't need to know more."),
      ],
      null,
      { relationships: { dorath: 10, maren: 5, serath: 3 } }
    ),
  ]),

  n("The text is placed. The case is empty. In the Spire's fourth-level reading room, in the collection alongside the Spire's own texts on the practice, there is now a forty-one page text in the notation that the Vraen fragments use for their most compressed elements. A practitioner at the correct stage — the stage the Spire's sequence is designed to gate — will find it. They will recognize it. They will continue without needing what the Spire tells them they need."),

  n("The fourth-level contact knows where it is."),

  n("The second cohort is arriving at the side entrance forty meters away."),

  d("DORATH", "left", "quiet", "Move."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 14 — AFTERMATH  (Week 14 gate)
  // The second cohort observed. Eran's departure. Gavrick's departure.
  // Cliffhanger: Eran's note — something west will find them. The Unnamed Third.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The second cohort's arrival at the side entrance, observed from Brek's position, takes forty-two minutes from first arrival to last entry. Twenty-three individuals. The escort at the side entrance is not the intake escort — a different person, Orin says, who he recognizes from his previous residency. Senior staff. The twenty-three arrivals are received rather than processed. The distinction is visible in the pace and the posture.",
    BG.act2_spire_exterior, false,
    { id: 'a2_seg14', title: 'Aftermath', summary: 'The second cohort is observed. Eran departs. Gavrick departs. Something in Eran\'s note.' }
  ),

  n("The question of whether to observe one more day or leave at dawn has not yet been asked, but it is in the room the way questions are before they are spoken. Dorath is already planning the departure route. Maren is at the workspace window watching the Spire's upper levels. Eran is writing."),

  n("Eran has been writing since they returned. Not the cloth notation, not the contact network's encoded format — something in his own hand. When he finishes, he folds it once and sets it on the table without addressing it."),

  d("ERAN", "left", "thoughtful", "The network will maintain communication with the fourth-level contact through the lamp signal. A protocol Dorath can activate from the western side if it becomes relevant — I'll give her the sequence before we leave."),

  dn("DORATH", "left", "neutral", "When do we leave."),

  d("ERAN", "left", "thoughtful", "Tomorrow at dawn. The departure route is the same as the entry filing described. Category two research completion — the survey is documented as done. Gate exit is routine."),

  d("MAREN", "left", "neutral", "The contact is prepared."),

  d("ERAN", "left", "thoughtful", "For the long term, yes. They have been preparing for three years. What was placed is what they have been prepared to protect."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Brek's observation of the second cohort is not complete. What the cohort's behavior reveals about the Spire's current state and the fourth generation's plans is information the group will carry west. The afternoon and the evening are available.",
    continueNarrator: "The observation is as complete as the external position can make it. What Brek collected is documented.",
  },

  ch("A2_SEG14_ERAN_DEPART", [
    op(
      "Ask Eran if he is leaving with the group or continuing his own work.",
      "ASK_ERAN_STAY",
      [
        d("KAEL", "right", "neutral", "Tomorrow at dawn. Are you coming west with us."),
        d("ERAN", "left", "thoughtful", "I have work in the eastern district that is not finished. The network maintains itself now that the operation is complete, but there are three contact nodes that require direct attention. I will not be on the western road."),
        d("MAREN", "left", "neutral", "Will we see you again."),
        d("ERAN", "left", "thoughtful", "I don't know. I'm not the kind of person who makes that kind of answer."),
        n("Maren receives this with the expression of someone who respects precision."),
        d("MAREN", "left", "neutral", "Then: what you built made this possible. That is what I will carry."),
        n("Eran nods once. The kind of nod that is the end of a conversation."),
      ],
      null,
      { relationships: { eran: 8, maren: 8, dorath: 5 } }
    ),
    op(
      "Ask Gavrick what he plans now — four years on this road, and the operation is done.",
      "ASK_GAVRICK",
      [
        d("KAEL", "right", "neutral", "Gavrick. Four years on this road for this operation. What now."),
        d("GAVRICK", "left", "quiet", "The road west for a while. Then south, probably. There is a contact network in the southern district that Eran has been building toward for two years. It needs what I know about observation infrastructure and movement analysis."),
        d("KAEL", "right", "neutral", "You'll keep watching roads."),
        d("GAVRICK", "left", "quiet", "It is what I know how to do. What the Archive held — what Maren carries, what you all carry — I spent four years watching from two hundred meters, not knowing if I was watching something real. I know now."),
        n("He does not elaborate. He does not need to. He knows, and knowing is what four years of road produced."),
      ],
      null,
      { relationships: { gavrick: 10, dorath: 4, brek: 6 } }
    ),
    op(
      "Ask Orin if he is coming west or staying in the eastern district.",
      "ASK_ORIN_DEPART",
      [
        d("KAEL", "right", "neutral", "Orin. The road west."),
        d("ORIN", "left", "neutral", "West. The contact I used — I need to understand who their contacts are now. If there was a chain that reached the Spire's analysis infrastructure, that chain should not remain active."),
        d("KAEL", "right", "neutral", "You're going to trace it."),
        d("ORIN", "left", "neutral", "It is my responsibility to trace it. The disclosure was mine. The consequences of the disclosure are mine to close."),
        n("This is the most accountable thing Orin has said since the night of the disclosure. You believe it is genuine — not because you trust Orin perfectly, but because you trust that Orin understands what he owes the operation and intends to pay it."),
      ],
      null,
      { relationships: { orin: 8, dorath: 5, maren: 4 } }
    ),
  ]),

  n("Dawn. The gate processes nine. Category two completion. The gate agent does not look up. The road opens west."),

  n("Eran is not in the group. They left the tanners' quarter and he did not come to the departure point. Dorath checked the second safe house. His pack was gone. Leven's key was on the table. The note on the table:"),

  n("Three lines in Eran's notation, which Gavrick translates:"),

  d("GAVRICK", "left", "thoughtful", "He says: the fourth-level contact will expand the seeded text. The movement registry has processed the departure. And: there is something west that you will reach before you expect to."),

  d("KAEL", "right", "neutral", "Something west."),

  d("GAVRICK", "left", "thoughtful", "He does not say what. That is his formulation for things that are real but cannot be usefully described in advance."),

  n("Two days west of the city, at a road fork, Gavrick departs. A handshake with Brek. A nod to Maren. A long look at you that carries something he has not put into words and does not put into words now."),

  d("GAVRICK", "left", "quiet", "I know now."),

  n("He takes the south fork. His route will not converge with yours for a long time, if at all."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 15 — THE ROAD WEST  (Week 15 gate)
  // The western road. Maren tells Sira the truth about her fourteenth stage.
  // Cliffhanger: Tal is at the wayfarers' shelter six days west of the city.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "The western road is known road — you traveled it east. The direction of travel renders it unfamiliar, which is the method working: the same path traveled with different attention is a different path. The trees on the left were on the right before. The ridge that blocked the morning light now catches the afternoon. The stream that ran south-to-north from your right now runs from your left. You know this road and you have never been on it before.",
    BG.act2_eastern_road, false,
    { id: 'a2_seg15', title: 'The Road West', summary: 'Heading home. Maren tells Sira what the contact confirmed. Tal is at the wayfarers\' shelter.' }
  ),

  n("The group is seven. Eran gone. Gavrick gone. Orin has not yet separated — he is traveling west also, on the same road, heading toward his contact and the chain he intends to trace. He walks with them but not in the formation, a slight distance that is not unfriendly but is aware of the difference between his purpose and theirs."),

  n("The practice has resumed its full schedule. Dawn and dusk, whatever the terrain. The method did not change inside the city — the consistency Maren noted in the first week of travel holds through the city and out the other side. You note this to her."),

  d("MAREN", "left", "thoughtful", "Yes. This is something the fragments describe and the Archive did not fully document: the method in motion, under operational conditions, with significant pressure. It deepens rather than degrades. The pressure is information the practice uses."),

  d("KAEL", "right", "neutral", "The Archive didn't document this because nobody at the Archive had done it."),

  d("MAREN", "left", "thoughtful", "No. The fragments describe it from the Vraen practitioners' own experience — they were moving people, persecuted, operating under significant pressure. The practice was developed in those conditions. The Archive studied the fragments in safety and assumed safety was the prerequisite. It was not."),

  n("On the third day west, Maren finds Sira at the evening fire."),

  d("MAREN", "left", "quiet", "I need to tell you something."),

  n("Sira looks at her. This is not a common opening from Maren."),

  d("MAREN", "left", "quiet", "The fourth-level contact. The conversation in the forty-seven minutes. They showed me their development of the notation — the work they had been doing in the Spire's reading room for three years. It extends from the same base that your fourteenth stage notation extends from. The two developments are independent and they produce the same refinement."),

  d("SIRA", "left", "quiet", "My fourteenth stage was correct."),

  d("MAREN", "left", "quiet", "Your fourteenth stage was correct. The fragments are incomplete in that section, and you extended them correctly. I thought you should know that from a source that is not your own judgment."),

  n("Sira is quiet for a long time. The fire burns. Ryn is watching from across the camp with the particular quality of attention she uses when something important is happening and she does not want to interrupt it."),

  d("SIRA", "left", "quiet", "I checked it many times."),

  d("MAREN", "left", "quiet", "I know."),

  d("SIRA", "left", "quiet", "I was never certain."),

  d("MAREN", "left", "quiet", "Now you are."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "The road west is the same length as the road east was. The counting stations are there. The border settlement is ahead. The practice continues. What changed in the eastern city — what the operation produced and what Maren's forty-seven minutes produced — requires the kind of examination that a moving road allows.",
    continueNarrator: "The examination is done. The border settlement is behind you. The western road opens into familiar terrain.",
  },

  ch("A2_SEG15_REFLECTION", [
    op(
      "Ask Ryn what the operation changed in her practice — she was not inside the Spire but she held the position for four hours.",
      "ASK_RYN",
      [
        d("KAEL", "right", "neutral", "Ryn. Four hours in the tanners' quarter while the entry team was inside. What did that change."),
        d("RYN", "left", "quiet", "The practice in a waiting position is different from the practice in a moving position and different again from the practice in a static study position. I understood this differently today than I understood it before. The waiting position requires holding the method while also holding uncertainty about something you cannot control."),
        d("KAEL", "right", "neutral", "What did it feel like."),
        d("RYN", "left", "quiet", "Like the method was something I was doing rather than something I had. The distinction is subtle. I want to think about it more before I say it fully."),
        n("She does think about it more. Three days later she says: the method in a waiting position is the practice's most honest form. You cannot do anything else while you are doing it. It is only itself."),
      ],
      null,
      { relationships: { ryn: 10, maren: 5, sira: 4 } }
    ),
    op(
      "Walk a full day without talking. The road needs to be under your feet and nothing else.",
      "SILENT_DAY",
      [
        n("You do not talk for an entire day. Nobody talks for the first three hours. Then Brek and Serath have a brief exchange about the terrain — purely functional, two sentences. Then silence again until the evening camp."),
        n("At the evening camp, Maren says: the Vraen practitioners sometimes made entire journeys in silence. Not as practice. As acknowledgment that what they were carrying was too full for words to be added to it."),
        n("She says this and goes to set up her bedroll. The fire burns. The silence continues until it becomes the natural register of people who have done a significant thing and are in the part of it that doesn't require description."),
      ],
      null,
      { relationships: { maren: 8, brek: 5, serath: 5 } }
    ),
    op(
      "Ask Brek what he noticed from the observation position during the entry — he was watching the whole time.",
      "ASK_BREK",
      [
        d("KAEL", "right", "neutral", "Brek. The observation position during the entry. What did you see."),
        d("BREK", "left", "thoughtful", "The second cohort's arrival was more orderly than standard intake. More orderly means more rehearsed. Twenty-three practitioners who know the procedure, know the entrance, know the reception sequence. They have been to this specific site before, or they have been trained for this specific site."),
        d("KAEL", "right", "neutral", "Training."),
        d("BREK", "left", "thoughtful", "Training means an institutional structure that reaches beyond the city. Voss is not just the Spire. The Spire is the visible part."),
        n("He says this and resumes his horizon check, which he has resumed on the western road because on a different road, the function is the same."),
      ],
      null,
      { relationships: { brek: 8, serath: 6, maren: 5 } }
    ),
  ]),

  n("Six days west of the city, a wayfarers' shelter at a crossroads that the trade routes use. The group arrives at midday. The shelter is not empty."),

  n("A single figure at the table inside. She has been there long enough to have eaten and set the plates aside and be looking at the door with the patience of someone who has been waiting for a specific arrival and has calculated that the arrival should be soon."),

  n("Tal looks at Maren first. Then at Ryn. Then at you."),

  d("TAL", "left", "neutral", "I have been here for three days. I came west from a different route — not the counting road. I needed to be here before you passed through."),

  d("MAREN", "left", "neutral", "Why."),

  d("TAL", "left", "neutral", "Because there is something I have been holding for four months and the road north is four days from here and once you take the road north there will not be a good moment to say it first."),


  // ════════════════════════════════════════════════════════════════════════════
  // SEGMENT 16 — NORTH  (Week 16 gate)
  // Tal's full account. The Unnamed Third. Eran's real purpose.
  // The Archive ruins are four days north. Act Two closes.
  // ════════════════════════════════════════════════════════════════════════════

  nb(
    "Tal's account takes the afternoon and into the evening. She gives it the way she gives everything — in complete form, with every relevant element in its correct order. When she finishes, the shelter is darker than when she started. Someone has filled the lamp and nobody remembers doing it.",
    BG.act2_border_inn, false,
    { id: 'a2_seg16', title: 'North', summary: "Tal's account of the Unnamed Third. The Archive ruins are north. Act Two closes." }
  ),

  d("TAL", "left", "neutral", "Eran's network. I was part of it before I came east. What I knew: the network exists to protect and connect practitioners who have completed the method and ensure they can operate outside institutional control. What I did not know until four months ago: the network was not built for the operation in the eastern city. The operation was one function of the network. The network's primary purpose is something else."),

  d("MAREN", "left", "neutral", "What purpose."),

  d("TAL", "left", "neutral", "There is a name in the network's internal notation: the Unnamed Third. In the Archive's history, the Unnamed Third refers to the third collection — the one destroyed during the first major disruption, two hundred and sixty years ago. But in Eran's network, the Unnamed Third is a person."),

  n("The fire burns. Outside: wind, and the sound of the road that runs north from this shelter."),

  d("TAL", "left", "neutral", "The notation I found: third because they completed the method third. After the original archivist. After a practitioner two hundred years later. Before Maren. Before any of you. They completed the method alone, without institutional context, without the fragments as we know them, and then disappeared from any record for sixty years."),

  d("RYN", "left", "quiet", "Disappeared how."),

  d("TAL", "left", "neutral", "I don't know. I know they were in the eastern district four months ago — Eran told me this directly, which is the only time Eran told me something directly without my asking. He said the Unnamed Third was moving west. He said the network was built to protect that movement. He said if I reached you before you reached the Archive ruins, I should tell you."),

  d("MAREN", "left", "quiet", "Why."),

  d("TAL", "left", "neutral", "He said: because Maren will know what it means. And Maren will know what to do with someone who completed the method two hundred years before the Archive recorded the first completion."),

  n("Maren is very still."),

  d("MAREN", "left", "quiet", "Two hundred years."),

  d("TAL", "left", "neutral", "The notation in the network is specific about the timeline. I checked it against the deep records from the settlement. The deep records have one reference — a single notation, in the third director's catalog, describing an encounter with a practitioner whose capacity exceeded anything the Archive had seen. The director's notation was filed under a category reserved for anomalies. The notation was two hundred and twelve years ago."),

  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Tal's account is complete. What it means for what is north — for the Archive ruins and whatever the Unnamed Third is moving toward — requires the kind of attention that cannot be done while the account is still being absorbed. The shelter is here and the evening is available.",
    continueNarrator: "The account is understood as fully as it can be understood before what is north provides more context.",
  },

  ch("A2_SEG16_UNNAMED_THIRD", [
    op(
      "Ask Tal what Eran wanted you to understand about the Unnamed Third — not what happened, what it means.",
      "TAL_MEANING",
      [
        d("KAEL", "right", "neutral", "Eran wanted Maren to know this before reaching the Archive ruins. What do you think he wanted her to understand — not just about who this person is, but about what it means."),
        d("TAL", "left", "neutral", "I think Eran wanted Maren to know that the method's history is longer than the Archive's history. That the Archive was not the beginning. That whatever is at the Archive ruins — whatever the Unnamed Third is moving toward — is connected to something that existed before the Archive was built and will exist after it is rebuilt."),
        d("MAREN", "left", "quiet", "The Archive studied the method. It was not the source of the method."),
        d("TAL", "left", "neutral", "The fragments suggest this. The Archive treated the fragments as its original source. They may not be."),
        n("The fire burns. Something in this room has shifted — not dramatically, but structurally. The way Maren looks when a recalibration completes. The way the walls hold the lamplight differently when the lamp has been refilled."),
      ],
      null,
      { relationships: { tal: 10, maren: 8, sira: 6 } }
    ),
    op(
      "Ask Maren what she knows about what was at the Archive ruins — what has always been north.",
      "ASK_MAREN_RUINS",
      [
        d("KAEL", "right", "neutral", "The Archive ruins. Before the fire — before any of this — what did you know was there."),
        d("MAREN", "left", "quiet", "The original structure. The Archive was built on the site of something older — the foundations are different stone, older mortar, the kind of construction that predates the Archive's architecture by at least a century. The original collections — the ones before the Aethyn records, before the Vraen fragments as we have them — were housed in the original structure. The Vraen fragments reference the original site as the place where the practice was first documented."),
        d("KAEL", "right", "neutral", "You knew this and didn't go."),
        d("MAREN", "left", "quiet", "I knew it and was not ready to go. Going to the site of where the practice began, carrying the practice completed — that is different from studying the site as an archive. You need to arrive carrying something before the arrival means what it should mean."),
        n("A pause."),
        d("MAREN", "left", "quiet", "Now I am carrying something."),
      ],
      null,
      { relationships: { maren: 12, sira: 8, ryn: 6 } }
    ),
    op(
      "Ask about the network — what Eran built and who else is in it that you don't know about.",
      "ASK_NETWORK",
      [
        d("KAEL", "right", "neutral", "Eran's network. The Unnamed Third is in it. Who else is in it that we haven't met."),
        d("TAL", "left", "neutral", "I only know the nodes I had contact with. The network is compartmented — each person knows their connections and not the full structure. That is standard for a network that needs to protect its members."),
        d("RYN", "left", "quiet", "The people who completed the method before the Archive knew about the method. Where are they."),
        d("TAL", "left", "neutral", "I don't know. The notation I found in the network's internal records suggests there are more than the Archive documented. The Archive's documentation was based on what the Archive could observe. The Archive could not observe practitioners who never came to the Archive."),
        d("SERATH", "left", "neutral", "They exist outside the institutional record."),
        d("TAL", "left", "neutral", "Yes. That is what the network was built to protect. And what the Unnamed Third, moving west toward the Archive ruins, appears to represent."),
      ],
      null,
      { relationships: { tal: 8, ryn: 6, serath: 8, eran: 5 } }
    ),
  ]),

  n("Morning. The crossroads. The road west continues. The road north begins."),

  n("Tal has joined the group. She states this as a fact, not a request — she sets her pack beside Ryn's and takes a position in the group with the specificity of someone who has been planning where to stand for several weeks."),

  n("The Archive ruins are four days north."),

  n("Maren looks at the road. The road north. The original site of the practice. Whatever the Unnamed Third is moving toward, and whatever the Unnamed Third has been carrying for two hundred years since completing the method alone, in conditions none of them can imagine, without the Archive, without the fragments, without any of the infrastructure they spent months at the settlement building."),

  d("MAREN", "left", "neutral", "In the morning. We go north."),

  n("She says it the same way she said 'In the morning, we find out what is east' seven months ago, in the settlement with Dorath's map on the table and the word COMPLETE in heavy ink. The same tone. The same certainty that the morning will bring what it brings, and that what matters is arriving at it carrying exactly what she carries."),

  n("You are carrying it."),

  n("The group is eight. The road is north. The method is complete and continuing and four days from a site where it was documented for the first time, by a hand two hundred years older than the Archive's records go."),

  n("In the morning."),

]

// Register Act 2 beats and stamp VO filenames at module load time
registerActBeats('act2', ACT2_BEATS)
attachVoFilesForAct('act2', ACT2_BEATS)
