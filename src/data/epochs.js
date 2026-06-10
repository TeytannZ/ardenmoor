// src/data/epochs.js
// Arc-completion story beats for Act 1 — Phase 1
// Each epoch fires after its arc's final week is fully completed.
// 7 arcs × 1 epoch each = 7 epoch sequences (arcs 0–6).
// Each epoch: ~1800–2500 words, major cliffhanger, hard relationship choice.

import { n, nb, d, dn, ch, op, BG } from './story.js'

// ACT1_EPOCHS[arcIndex] = [ beat, beat, ... ]
// arcIndex: 0–6 (matches planProgress.completedArcIdxs)

export const ACT1_EPOCHS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 0 — "The Cost"
  // Arc 0 complete. Escape done. First arrival at the safe house.
  // The Archive has been burning for three days. This is the first real stillness.
  // Choice: contact Lenne (risk) or hold silence (safety with a cost).
  // Cliffhanger: an envelope at the safe house addressed to the player by name.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The safe house is small. Two rooms — a storage front that smells of dried grain, and a living quarter behind it with a table, three pallets, and a lamp that Dorath has kept burning so low it gives more shadow than light. You arrived at dusk. Maren walked the perimeter once, checked the door on the east side, and said it was clean. Ryn found the water basin. You set down the bag you'd been carrying since the passage door and haven't moved it since.",
      BG.safe_house
    ),

    n("Nobody has spoken in an hour. That is new. For three days, speech was a tool — direction, confirmation, warning. Maren said go left. Ryn said clear. Dorath said this way. The conversation happened in motion, in the gaps between necessary words. There was no space for anything else. Now there is space. The lamp flickers. Outside, a cart moves down the far street — wheels on stone, fading — and then there is only the lamp again."),

    d("MAREN", "left", "thoughtful", "I need to say something before we sleep."),

    d("KAEL", "right", "neutral", "Hm."),

    d("MAREN", "left", "thoughtful", "Nineteen years. That is how long I worked on the Archive's core preservation project. Not the building — the method. The project was to understand the Vraen fragments well enough to document the method in a form another practitioner could follow. I completed the documentation in the twelfth year. The last seven years were refinement, verification, and instruction."),

    n("She stops. The lamp holds."),

    d("MAREN", "left", "quiet", "What burned was the building and most of the paper records. The method itself — the Vraen fragments and my documentation — exists in three forms. Copies at two satellite sites whose current state I do not know. The fragments I carried out. And us. What I carry. What I have taught. What you carry."),

    d("RYN", "left", "quiet", "And the people inside."),

    d("MAREN", "left", "quiet", "Yes."),

    n("Ryn does not look away. This is what she does — she asks the thing nobody else has named yet, and she does not soften it."),

    d("RYN", "left", "quiet", "Who was still inside when we left?"),

    d("MAREN", "left", "thoughtful", "Serath was not there. He hasn't been there since noon — which is why I was watching the door when the bell rang. Orel was in the east wing, which has a separate exit to the alley. He knows to use it. Lenne was in the records room. She keeps late hours. I don't know if she had time."),

    n("Silence. Dorath has been quiet this whole time, seated at the table's edge, watching Maren the way you watch a calculation you're waiting to see resolved."),

    d("DORATH", "left", "neutral", "Lenne is the records keeper."),

    d("MAREN", "left", "quiet", "Yes."),

    d("DORATH", "left", "thoughtful", "I don't have a current contact for her. But I have a channel that moves information in and out of the city's northeast district. If she reached a safe location and is trying to signal out, there's a chance it reaches me."),

    n("This is the choice. You understand it before it's presented. Lenne knows enough to be dangerous to the people who set the fire, which means she is in danger. Sending a signal back into the city — even through Dorath's network — creates a thread. Every message is a risk. Every contact is a risk. You've been traveling under the assumption that silence is survival. But Lenne may not have made it out."),

    ch("EPOCH0_LENNE", [
      op(
        "Try to reach her. Send a signal through Dorath's channel.",
        "REACH_LENNE",
        [
          d("DORATH", "left", "neutral", "All right. Give me until morning."),
          n("She spends the evening carefully. The signal goes through two intermediaries — a contact at a grain warehouse, then a clerk who moves between districts. Maren watches Dorath work without interfering. Ryn sleeps. You don't."),
          n("Nothing comes back before dawn. Dorath tries again mid-morning through a different thread. At midday, something arrives — not from Lenne, but from Dorath's warehouse contact, who heard it from the district clerk, who saw it with his own eyes. Someone matching Lenne's description was seen leaving the northeast district on foot, carrying a document case. Moving east. Three days ago, the morning after the fire."),
          d("DORATH", "left", "thoughtful", "She may have gotten out. That's not confirmation. But it's not nothing."),
          n("The thread stays warm. Unresolved. You hold it."),
        ],
        null,
        { relationships: { dorath: 7, maren: -4 } }  // Dorath steps up; Maren would have held silence
      ),
      op(
        "Hold the silence. Every contact is a thread that can be followed back.",
        "HOLD_SILENCE",
        [
          n("Nobody argues. Maren says 'yes' once, very quietly, and that's the end of it. Three days later, Dorath's network picks up something — not from Lenne, but about a contact in the northeast district being approached by someone trying to use the network from the inside. The contact shut it down immediately. Too exposed. Too obvious. It might have been Lenne trying to reach them. They will never know."),
          d("DORATH", "left", "neutral", "If it was her, she survived long enough to try. That's something."),
          n("Maren says nothing. Which means she is deciding whether it is enough."),
        ],
        null,
        { relationships: { maren: 8 } }  // Matching Maren's strategic restraint — she notices
      ),
      op(
        "This is Maren's Archive, Maren's colleague. Ask her.",
        "ASK_MAREN",
        [
          n("Maren considers. Not performance — actual calculation. Twenty seconds. You count them."),
          d("MAREN", "left", "quiet", "Hold the silence."),
          d("KAEL", "right", "neutral", "Because of the risk."),
          d("MAREN", "left", "quiet", "Because sending a signal back into the city right now is something only someone who loves Lenne would do. And everyone who planned the burning of the Archive knows that I have colleagues I love. A signal back is also a signal about who we are and what we value. We are not far enough out for that to be safe."),
          n("A pause."),
          d("MAREN", "left", "quiet", "If Lenne made it out, she knows what to do. She has been at the Archive for eleven years."),
        ],
        null,
        { relationships: { maren: 15 } }  // She reveals something she loves — deferring to her here builds trust most
      ),
    ]),

    n("The lamp is still burning. Dorath refills it from a small flask and doesn't say anything about it."),

    d("MAREN", "left", "thoughtful", "There is one more thing."),

    d("MAREN", "left", "quiet", "The fire was not opportunistic. It was not a mob. It was prepared — it started in three locations simultaneously, including the records basement, which has no windows and is not visible from the street. Someone walked down into the basement and started a fire there. They knew where the basement was and how to reach it without being seen. This was arranged in advance."),

    d("RYN", "left", "quiet", "Serath."),

    d("MAREN", "left", "thoughtful", "That is the obvious answer. I'm not ready to call it the correct one."),

    d("RYN", "left", "quiet", "Why?"),

    d("MAREN", "left", "thoughtful", "Because Serath's note came after the fire, and the handwriting was his. You don't write a warning after you've arranged what you're warning against. Unless you arranged part of it. Unless you are not the one who arranged it but you knew it was coming and waited too long to act. There are several possibilities, and I don't have enough to close any of them."),

    n("Outside, the cart is long gone. The street is quiet. Ryn has pulled her knees to her chest and is looking at the floor. The lamp flickers once."),

    d("DORATH", "left", "neutral", "Maren."),

    d("MAREN", "left", "neutral", "Yes."),

    d("DORATH", "left", "thoughtful", "I found something when I checked the back room. I should show you now."),

    n("She stands. She does not lead you there — she reaches into her coat and sets something on the table. A folded envelope. Sealed with plain wax, no impression. She turns it so you can see the outside."),

    n("There is a name written on it."),

    n("It is not Maren's name. Not Dorath's. Not Ryn's. It is addressed to you — your name, spelled correctly, in a handwriting none of you recognize."),

    d("DORATH", "left", "urgent", "I did not put this here. The room was locked when I arrived and I have the only key to this building. Someone was inside before us, and they knew you were coming, and they knew your name."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 1 — "The First Threshold"
  // Arc 1 complete. Forest road. The method becomes real — first threshold reached.
  // Maren's completion 14 years ago lands fully.
  // Choice: move faster to reach Sira, or hold the pace the method requires.
  // Cliffhanger: a second message quoting what you said at last night's fire.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "Six weeks from the Archive. The forest road is narrow enough that you travel in single file, the trees pressing close on both sides. The path is maintained — someone keeps the undergrowth back — but there is no visible reason why. You have been thinking about this for three days and have not arrived at a satisfying answer.",
      BG.forest_path
    ),

    n("Four days ago, something shifted in the practice. You weren't sure what to call it at first. The method felt different — not easier in the sense of less effort, but different in kind. Where before you were holding things, now they were simply present. Where before retrieval required intent, now it happened incidentally, the way you recognize a word rather than searching for it. You mentioned it to Maren and she said: that is the first threshold. She said it the way you say something you've said ten thousand times. She returned to walking."),

    n("You've been thinking about it since."),

    d("MAREN", "left", "thoughtful", "You want to understand what it means precisely."),

    d("KAEL", "right", "neutral", "You gave me the short version."),

    d("MAREN", "left", "thoughtful", "The short version is accurate but incomplete. The threshold means the work has changed character, not that it is complete. What you now carry, you carry structurally — it has become load-bearing, not decorative. But load-bearing structures require maintenance. The second stage of the Vraen method is specifically about this."),

    d("KAEL", "right", "neutral", "You said you completed the method."),

    d("MAREN", "left", "quiet", "Fourteen years ago."),

    n("She says it without pause and you have been waiting weeks for that sentence. It lands differently than you expected — not larger. More solid. Like a fact that was always true becoming visible."),

    d("KAEL", "right", "neutral", "That's what makes you certain it works."),

    d("MAREN", "left", "quiet", "That is what makes me certain it is possible. Whether it works depends on what you mean by works. The preservation is complete and stable — I verify that regularly. The carrying is without deterioration. What I cannot tell you is whether it is worth what it cost, because that is not a question the method answers for you."),

    d("RYN", "left", "quiet", "What did it cost?"),

    d("MAREN", "left", "thoughtful", "Fourteen years ago, reaching the completion point required the suspension of several things I thought I would return to. I have not returned to all of them. I don't know if I would choose differently. I'm not certain the question makes sense in retrospect — you cannot choose differently without also being different, and I cannot separate what I chose from who did the choosing."),

    n("Ryn walks without looking at the path, which means she has memorized it. She has been thinking about something else for the last hour. She does that."),

    d("RYN", "left", "quiet", "Maren. The message this morning."),

    d("MAREN", "left", "thoughtful", "Yes."),

    d("RYN", "left", "quiet", "It wasn't from Brek."),

    d("MAREN", "left", "quiet", "No."),

    d("RYN", "left", "quiet", "But it used the same notation."),

    d("MAREN", "left", "thoughtful", "It used a variant. One modification that Brek does not know because I have not yet told it to him. I developed it after I left the Archive. Before Brek departed."),

    n("The trees press close. A bird shifts in the branches somewhere above you. Wind, probably."),

    d("KAEL", "right", "neutral", "Who knows that modification?"),

    d("MAREN", "left", "quiet", "I do. And apparently someone else."),

    n("She doesn't say more immediately. This is unusual for Maren — not that she withholds, but that she is working through something in real time, which she almost never shows. You watch her face and there is something there that is not quite alarm. It is closer to recalibration. The message was three lines. The third used the modified notation as a signature. The first two lines said: you are not as far behind as they believe. And: the person you are trying to reach is already east of the valley."),

    n("Sira. The second line was about Sira."),

    d("KAEL", "right", "thoughtful", "If someone knows that modification, they've been in recent contact with you. Since the Archive."),

    d("MAREN", "left", "thoughtful", "Or they have access to documents I created after my departure. The pool of people who could access both is very small."),

    d("KAEL", "right", "neutral", "Is this good or dangerous?"),

    d("MAREN", "left", "thoughtful", "It is information. I haven't decided what to do with it yet."),

    n("The decision, when it comes, is yours as much as hers. Moving faster means less time for the practice — the threshold holds, but the second stage requires what the second stage requires. And the message said Sira is already east of the valley. If she has been practicing without guidance since before the fire —"),

    ch("EPOCH1_PACE", [
      op(
        "Move faster. Sira is out there alone and the message said she's further ahead than expected.",
        "MOVE_FASTER",
        [
          n("They increase pace. Practice happens in smaller windows — morning before the road warms, brief stops, evening. The threshold holds. The method does not slip."),
          n("On the fourth day at the new pace, Ryn stops and looks at a stone marker at a fork in the road. She doesn't say anything for a moment. Then she turns the marker slightly so you can see the underside. There is a mark scratched into the stone — small, deliberate, in the modified notation. It points left. Away from the planned route."),
          d("MAREN", "left", "thoughtful", "That was not there when Dorath's contact last used this road. This is recent."),
          n("She looks at the mark for a full minute without speaking. Then: left."),
        ],
        null,
        { relationships: { sira: 6, maren: -3 } }  // Concern for Sira; but Maren's "Correct decision" on HOLD_PACE means she'd disagree
      ),
      op(
        "Hold the pace. The method requires what it requires, and Sira has been managing alone.",
        "HOLD_PACE",
        [
          d("MAREN", "left", "thoughtful", "Correct decision."),
          n("She says it and moves on. The practice deepens over the next two days — the second stage begins showing its shape, the maintenance structure becoming clear where before it was abstract. Ryn notices something on the third morning: she says she thinks she reached the first threshold two days ago but wasn't sure what to call it."),
          d("RYN", "left", "quiet", "You said the threshold and I understood that was what happened to me. I should have said so then."),
          d("MAREN", "left", "almost-smiling", "You said it now. That is sufficient."),
        ],
        null,
        { relationships: { maren: 10, ryn: 6 } }  // Maren says "Correct decision"; Ryn reaches her threshold during this pace
      ),
      op(
        "Send a response — establish contact through Dorath's network.",
        "SEND_RESPONSE",
        [],
        { coins: 6 },
        { relationships: { dorath: 8, maren: -6 } }  // Using Dorath's network builds Dorath; Maren would see this as a security risk
      ),
    ]),

    n("The forest road continues east. The path is maintained, and you still don't know by whom."),

    n("That night, Ryn comes to sit beside you while Maren and Dorath go over the route by the fire. She sits without preamble."),

    d("RYN", "left", "quiet", "Can I say something without it being a problem?"),

    d("KAEL", "right", "neutral", "Yes."),

    d("RYN", "left", "quiet", "I reached the first threshold four days ago. I didn't say anything because I wasn't sure that was what it was. And then you said it to Maren and she confirmed it and I understood that what happened to me was the same thing. I thought I should say it. Because you said it first and that made it easier."),

    n("She doesn't look at you while she says this. She looks at the fire."),

    d("KAEL", "right", "neutral", "Mm."),

    d("RYN", "left", "thoughtful", "The notation variant. The one Maren didn't teach Brek yet."),

    d("KAEL", "right", "neutral", "What about it?"),

    d("RYN", "left", "thoughtful", "There are three people who could develop the same modification independently from the same base: someone with direct contact with Maren after she left, someone with access to her post-Archive documents, or someone who completed the method themselves and arrived at the same refinement through their own progression. The second stage produces it if you follow the instruction all the way to its end."),

    n("She stops. The fire crackles. Dorath says something quietly to Maren and Maren responds with a single word."),

    d("KAEL", "right", "neutral", "You're saying Sira could have sent it."),

    d("RYN", "left", "thoughtful", "I'm saying it's possible. Three candidates. The message said Sira is east of the valley. If Sira sent it, she knows exactly where we are."),

    n("Something moves in the trees. A branch settling. Wind. You are almost certain it is only wind. You sleep. In the morning, there is a second message. It came while you slept, slid under Dorath's pallet by a hand that made no sound."),

    n("You read it. The third line uses the modified notation, the same as before. But something is different — it takes you until Maren reads it over your shoulder to understand what is wrong with it."),

    n("The message quotes something. Exactly. Word for word. A thing you said last night, at the fire, in a conversation you believed no one outside the group could hear."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 2 — "The Opened Door"
  // Arc 2 complete. Brek has arrived. The passage was deliberately left open.
  // They are at the lit building in the settlement district. Tal is inside.
  // Choice: approach directly, wait, or send Dorath first — affects Tal's trust.
  // Cliffhanger: a map of this specific room arrives, drawn by someone who was inside.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The building is three stories, narrow as a seam between its neighbors. Lower windows dark. Upper window — third floor, northwest corner — with a light that has been there since before you arrived. You watched it from the tree line for an hour. The light did not move. Whatever is holding it is perfectly still.",
      BG.settlement_exterior
    ),

    n("Brek stands beside you. He arrived two days ago and you're still adjusting to the changed shape of the group — five instead of four, the conversations different, the silences populated differently. Brek takes up space in a way that is not aggressive but is present. He walks quietly for a large person. He goes silent when the problem is not physical."),

    d("BREK", "left", "thoughtful", "I watched the passage for six hours before the fire started. Not from inside — I was on the roof of the grain exchange, east of the square. Watching the approach routes. Maren had asked me to do this every third day without telling me why."),

    d("MAREN", "left", "quiet", "I wasn't certain I was reading the signs correctly. I wanted independent observation without contaminating it with my interpretation."),

    d("BREK", "left", "thoughtful", "The passage door opened twice before the bell rang. First time: forty minutes before, six hours past midnight. Someone entered and didn't come out. Second time: fourteen minutes before the bell. Someone entered and the door stayed open. By the time the bell rang, it was standing wide."),

    d("KAEL", "right", "neutral", "That's not someone escaping."),

    d("BREK", "left", "thoughtful", "No. That's someone making sure the passage was accessible. Cleared and ready."),

    d("MAREN", "left", "quiet", "Serath made the passage clear. He did not light the fire. He arranged for us to be able to get out."),

    n("Nobody speaks. Ryn is watching the upper window. Dorath is watching the street below. The settlement district is quiet at this hour — the kind of quiet that comes from a population that knows to be inside after dark."),

    d("RYN", "left", "quiet", "Then Serath saved us."),

    d("MAREN", "left", "thoughtful", "Serath knew we would need to leave. He made leaving possible. Whether that is the same as saving us depends on what he knew and when he knew it and what he decided to do with that knowledge. I don't think those are the same thing."),

    d("BREK", "left", "thoughtful", "He could have warned you earlier."),

    d("MAREN", "left", "quiet", "Yes. He could have."),

    n("The upper window is still lit. Dorath checked the building registry this morning — listed as private residence, occupied, property held under a name that traces to a merchant family with no current trade record. Old holding. Occupant unknown."),

    d("DORATH", "left", "thoughtful", "We've been watching for an hour. In my experience, if someone is inside waiting for visitors, they stop holding still at forty minutes. They check the window. They move. This person has not moved."),

    d("BREK", "left", "thoughtful", "Either very patient, or they know we're watching and are demonstrating that they can wait longer than we can."),

    d("RYN", "left", "quiet", "Or they don't know we're watching and they're working."),

    n("The three interpretations sit in the cold air. Maren is looking at the building the way she looks at a passage she hasn't fully resolved — not worried, not urgent. Processing."),

    n("The approach shapes the encounter. Whoever is in that window — if it is Tal, Dorath's contact — is someone Maren doesn't know directly and Dorath knows through Eran's network. How you arrive tells them something about who you are. And you don't know yet how Tal reads things."),

    ch("EPOCH2_TAL_APPROACH", [
      op(
        "Walk to the door directly. You are expected.",
        "DIRECT_APPROACH",
        [
          n("You walk to the door as if you belong there. No hesitation at the threshold. You knock once. The door opens before the second knock."),
          n("Tal is inside and she reads you immediately — the way Maren reads a text, quickly, comprehensively, noting things she doesn't share yet. Her initial read: you came openly, which is what someone without something to hide does. The food is already on the table."),
          d("TAL", "left", "neutral", "You're earlier than I calculated. I assumed another hour of observation."),
          d("KAEL", "right", "neutral", "We'd seen enough."),
          d("TAL", "left", "neutral", "Good answer."),
        ],
        null,
        { relationships: { tal: 12, maren: 4 } }  // Tal says "Good answer" — directness works here; Maren respects the read
      ),
      op(
        "Hold the tree line. Let whoever is inside make the next move.",
        "WAIT_SIGNAL",
        [
          n("You hold for thirty minutes. The light extinguishes. Then re-lights twice. Then extinguishes again. Then re-lights once. A pause. Then: nothing."),
          d("MAREN", "left", "thoughtful", "An offer, not a demand. She knew we were watching and she demonstrated she could wait."),
          n("You walk to the door. Tal opens it before you knock, and her expression is not surprise. It is closer to satisfaction at a thing confirmed."),
          d("TAL", "left", "neutral", "Forty-one minutes. That's longer than most."),
          d("MAREN", "left", "neutral", "Is that useful information?"),
          d("TAL", "left", "neutral", "Every decision is useful information."),
        ],
        null,
        { relationships: { tal: 8, maren: 7 } }  // Both value the patience; Tal's "every decision is useful information" respects it
      ),
      op(
        "Send Dorath ahead alone — this is her network and her contact.",
        "SEND_DORATH",
        [],
        { coins: 4 },
        { relationships: { dorath: 10, tal: 4 } }  // Dorath goes first — natural given her connection; Tal gets a softer intro
      ),
    ]),

    nb(
      "However you arrived, you are inside now. One large room on the ground floor. Walls lined floor to ceiling with shelves, most of them empty. Three lamps, well-placed. A table with food — simple, the right amounts, and one extra chair pulled up, which means she knew exactly how many were coming.",
      BG.settlement_interior
    ),

    n("Tal is twenty-two, maybe slightly less. Slight. The particular stillness of someone who has spent years learning not to draw attention. She moves like someone calculating the necessary minimum of motion at all times."),

    d("TAL", "left", "neutral", "Eran told me about you. All of you, by description. He said: when Maren arrives, you will know it is time."),

    d("MAREN", "left", "thoughtful", "Eran told you about me specifically."),

    d("TAL", "left", "neutral", "He said you were the one who would actually carry it through. He said he knew in your third year what the Archive was eventually going to lose. He spent the following years making sure that if it burned, the right people were still walking."),

    n("Maren's expression does not change. But something in the room does."),

    d("MAREN", "left", "quiet", "Eran thought the Archive would burn."),

    d("TAL", "left", "neutral", "He thought an Archive could always burn. He thought that was the fundamental problem with buildings that hold knowledge — the knowledge is only as safe as the building. He gave me this for you, to be delivered when you arrived."),

    n("She reaches under the table. She sets an object on it — wrapped in cloth, careful, tied with a cord that has a specific knot you have seen once before: at the bottom of Maren's bag."),

    n("Maren does not reach for it immediately. She looks at it."),

    d("TAL", "left", "neutral", "He also asked me to tell you something. He said it exactly and asked me to repeat it exactly."),

    n("She reads from a small card."),

    d("TAL", "left", "quiet", "'The person you went to find is where I thought she would go. She has been there for three weeks. She arrived before the Archive burned. She has been practicing without guidance and she is further along than you would expect. She found the chamber. Give this to Maren. Then take them east.'"),

    n("The room is quiet."),

    d("KAEL", "right", "neutral", "She arrived before the Archive burned."),

    d("TAL", "left", "neutral", "That is what he wrote."),

    d("BREK", "left", "thoughtful", "He wrote this before the fire."),

    d("TAL", "left", "neutral", "He gave it to me two months ago. He said I would know when to deliver it."),

    n("Two months ago. Someone knew, two months ago, that this moment was coming — this specific room, this specific group. Eran knew. And Eran is not here, and you don't yet know where Eran is, or whether Eran is still walking."),

    d("TAL", "left", "neutral", "There is one more thing. This one is not from Eran."),

    n("She sets a second paper on the table. Folded. She opens it and turns it so you can see."),

    n("It arrived yesterday through Dorath's channel, forwarded to Tal. At the bottom of the page, below the text, is a small drawing. Precise, clean lines. It takes you a moment to understand what you are looking at."),

    n("It is a map of this room. This specific room — the shelves, the table, the placement of the lamps. Exact in every detail. Drawn by someone who has been inside this room or who has access to someone who has."),

    d("TAL", "left", "urgent", "This arrived yesterday. I have been in this building for three days and I have not opened the door for anyone. Not once. Before tonight."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 3 — "The Four Generations"
  // Arc 3 complete. Tal has given her full account. The 14th fragment understood.
  // The insider who gave access to the Archive's basement is real and unknown.
  // Choice: follow the thread to find the insider, or move east and leave it.
  // Cliffhanger: Sira's book found — last page: coordinates + "Come quickly."
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "It takes Tal four hours to give the full account. She does it the way someone reads a deposition — no theatrical pause, no inflation, exactly as much detail as is accurate. Maren asks three questions during the four hours. Ryn asks one. You listen.",
      BG.settlement_interior
    ),

    n("Afterward the room is quiet in a different way than before. You understand more. Understanding more does not make it easier — it makes the shape of the problem more precise."),

    n("Tal's accounting: Voss is not a person in the usual sense. Voss is an institution — four generations of an approach to preservation that believes whoever controls the method controls what the method produces. The first generation built the early Archive network. The second identified that practitioners who complete the method become autonomous — they carry what they know and it cannot be seized. The third developed a framework for entering Archive institutions at a deep level, so that when the institution is controlled, the practitioners are too. The fourth generation — the current one — determined that the simpler solution was burning Archives and building new ones. Ones they designed from the foundation."),

    d("MAREN", "left", "thoughtful", "They are not trying to destroy the method."),

    d("TAL", "left", "neutral", "No. They want to own it. Owning the source is more useful than eliminating it if you're building an institution. You need the method to be real and you need to be the only path to it."),

    d("BREK", "left", "thoughtful", "A completed practitioner is outside that control."),

    d("TAL", "left", "neutral", "Yes. Incomplete ones are more manageable — far enough along to be useful but still dependent on the infrastructure. Still reachable. The ones who complete it are a different category entirely."),

    n("You understand now why Serath's position is ambiguous. A senior practitioner who hasn't quite completed the method, who found something in the deep records, who arranged the passage to be clear — he is either protecting everyone from outside the institution's reach, or he is exactly what the institution can do with someone who is advanced but not finished. Both possibilities produce identical behavior up to a point you have not yet reached."),

    d("KAEL", "right", "neutral", "The insider. The one who gave the fire teams access to the records basement."),

    d("TAL", "left", "neutral", "I don't know the name. I know the function — someone with legitimate Archive access who provided maps for the fire operation. The basement location, the route that avoids the inhabited quarters, the timing window."),

    d("MAREN", "left", "thoughtful", "The timing prevented the inhabited quarters from burning."),

    d("TAL", "left", "neutral", "Yes. The fire was designed to destroy records and infrastructure, not people. Whether that represents mercy or calculation I can't say. Possibly both."),

    n("This is the decision point. The insider is still in the city — or was, a week ago. Dorath's network has a thread that runs in that direction. Following it would take three days and full network capacity. It would create exposure. But if you don't follow it now, the thread closes. People move. Networks reroute. The insider, if they are reachable, may not stay reachable."),

    n("East is three days away. Sira is there. The group is advancing faster than Maren expected. Every day here rather than east is a day the method doesn't deepen. But the insider exists, and if they are still findable, you know who compromised the Archive and what they have already shared — and possibly who they shared it with."),

    ch("EPOCH3_INSIDER", [
      op(
        "Follow the thread. Identify the insider before moving east.",
        "FOLLOW_THREAD",
        [
          n("Three days. Dorath's full network capacity. What they find is partial — a contact who confirms the insider exists and acted out of fear, not ideology. They were threatened, not recruited. The insider is gone from the city — left two weeks ago, direction unknown."),
          n("The contact gives one more thing before closing the thread: the insider has a scar on their left hand, distinctive, from a specific kind of document press that is only used in the records room. Not enough to name them. Enough to recognize them on sight."),
          d("DORATH", "left", "thoughtful", "We know the shape of them. That's more than we had."),
        ],
        null,
        { relationships: { dorath: 8, maren: 2 } }  // Dorath's network gets used; Maren accepts the delay
      ),
      op(
        "Move east. The insider's identity doesn't change what needs to happen.",
        "MOVE_EAST",
        [
          d("MAREN", "left", "quiet", "Yes."),
          n("The thread closes. You will not be able to return to it. Two days east, Brek says quietly, during a rest stop, that he thinks he knows who the insider was. He noticed something in the deep records that matches a specific detail he observed at the Archive six months ago. He describes it once."),
          d("MAREN", "left", "thoughtful", "I need to think about that."),
          n("She does not speak further on it that day. The next morning she says: it's possible. That's all."),
        ],
        null,
        { relationships: { maren: 8, brek: 6 } }  // Maren agrees; Brek reveals something valuable on the road
      ),
      op(
        "Send Ryn to watch the thread while the rest move east. She catches up on the road.",
        "SEND_RYN",
        [],
        { coins: 8 },
        { relationships: { ryn: 12, dorath: 5 } }  // Trusting Ryn with this alone — she'll handle it; Dorath provides the network
      ),
    ]),

    n("Whatever was decided, the accounting is done. You know more than you did this morning, and the question is what to do with it."),

    n("Maren stands and looks at the table. Then at Dorath. Then at the back room."),

    d("DORATH", "left", "thoughtful", "There is something else. I should have shown you this earlier. I was making sure I understood what it was."),

    n("She has been carrying it since before you entered the building — you understand this from the way she reaches for it, which is not a reach but a release. Something she's been holding in position."),

    n("She sets a book on the table."),

    n("Small, covered in dark cloth, spine unmarked. Pages dense with handwriting — small and consistent, written for the writer and not for presentation. Dorath opens it to the inside cover."),

    n("The name written there is Sira."),

    d("MAREN", "left", "surprised", "Oh—", { preSfx: 'gasp_female' }),

    d("DORATH", "left", "thoughtful", "I found it in the back room of the safe house, three days ago. In a cloth bag behind a loose board that was only slightly loose — meaning she knew about the board or she left it for someone who would know to look."),

    n("You open to the last page. The handwriting continues almost to the bottom. Below a clean line drawn in ink, two things: coordinates written in the Vraen notation, and four words."),

    n("You read them aloud."),

    d("KAEL", "right", "thoughtful", "Come quickly. I found something."),

    n("Dorath nods."),

    d("DORATH", "left", "quiet", "She dated the entry. Eight days ago. She found something and left this for you, expecting you to arrive by now. You are three days from east."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 4 — "The East Wall"
  // Arc 4 complete. All seven at the settlement. Method complete for most.
  // New writing appears on the east wall — unknown hand, ink not yet dry.
  // Choice: go east now, wait two months, or send two practitioners ahead.
  // Cliffhanger: a mark on the wall matching the one from the safe house envelope.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "Seven people in a space built for study. The settlement's interior room was not made for large gatherings — it is a working space, shelves of fragments, a long table, south-facing windows for light. Seven fills it differently than three did. Warmer. Someone keeps extinguishing the lamp at dawn and someone else keeps relighting it by habit.",
      BG.settlement_interior
    ),

    n("Three days ago, Maren completed the method. She came out of the study room at midday and stood in the doorway for a moment that stretched without breaking. Then she said: it is like being very clear. She did not elaborate immediately. That evening she said more: that the experience of completion is not the dramatic event the Vraen documentation implies. It is a resolution — the way a question stops generating sub-questions when you finally have the right framing. She said she spent fourteen years waiting for it to feel different than ordinary understanding. When it happened she understood why it didn't. The understanding was the point."),

    n("Since then, the pace of the room has changed."),

    n("Serath completed the method four months before the fire — you know this from the deep records, which Sira found in the settlement's archive, translated, and shared without being asked. Sira herself: three weeks before the fire, alone, following a path through the notation she developed independently after reading the archivist's personal record on the north wall. Brek: two days after arrival, the problem he'd been working through on the road resolving fully the morning after he finally slept. Ryn: yesterday. She came to find you and said only: I understand now what Maren meant. The clarity is the thing."),

    n("Five. That is five of seven."),

    d("KAEL", "right", "neutral", "Dorath and Tal."),

    d("MAREN", "left", "thoughtful", "Dorath is working at her own pace and has asked not to be tracked. That is a correct boundary. Tal began three weeks ago and is at the first threshold. At her current rate, two months. Possibly less."),

    d("KAEL", "right", "neutral", "And me."),

    d("MAREN", "left", "thoughtful", "You are approaching the second threshold. The gap you are working through — the fifth and sixth fragments and how they relate to the fourth — is the section most practitioners find most difficult. Eran spent eleven months on it. I spent four. Serath spent two weeks, which was one of the first signs I had that he was unusual. You have been in it for eighteen days."),

    d("KAEL", "right", "neutral", "Fast or slow?"),

    d("MAREN", "left", "thoughtful", "Accurate. Eighteen days is inside the range. The gap closes when it closes. Not when you need it to."),

    n("Outside, Brek runs. Every morning the same route — east perimeter, through the orchard, back along the river path — and you can time the day by his footsteps. Today he comes back faster than usual. He is not winded, which is unusual for Brek at that pace. He is thinking, which is even more unusual for Brek in motion."),

    d("BREK", "left", "urgent", "I need everyone to see something."),

    n("He leads you to the east wall. You have been in this room many times. The east wall is the practitioner's personal record — written by the archivist who built this settlement, floor to ceiling, fourteen stages of the method documented in a hand that becomes more precise as it descends. You have read it. Everyone has read it."),

    n("Brek points to the lower right section. The final passage. The note below the last stage that reads: 'What was always true will continue east.' You know this section."),

    n("Below it is something that was not there yesterday."),

    d("BREK", "left", "thoughtful", "I noticed it on the third lap. I thought it was a shadow. I came back after the fourth lap when the light had moved, and it was still there."),

    n("Below the archivist's final line — below everything already on this wall — is new writing. Three lines, written small, in a hand that none of you recognize. Maren touches the edge of the first letter with the back of her finger. She looks at Brek."),

    d("MAREN", "left", "quiet", "This is fresh. The ink is not fully dry."),

    n("Someone who completed the method was in this room within the last three days and wrote on the wall and left without being seen or heard. You all think the same thing at once. Serath. Maren shakes her head before the question is formed. Not Serath's hand. She is certain."),

    n("You read the three lines. They take a long time because the notation at this level is dense — each mark carries more than its surface meaning. When you finish, you understand what it says."),

    n("The sequence has a step that is not written. The documented method is complete — everything the Vraen fragments describe is real and achievable. But there is something after completion that the original archivist did not include in any record because they believed each practitioner had to arrive at it alone. The notation on the wall gives the location of what the archivist left — not written, not documented, not in any fragment. Held. Placed. Waiting for someone who would know what to do with it."),

    n("Then the decision that has been building since the day you arrived east: when do you go?"),

    n("Tal needs two months. You need — however long the gap takes. Going east now means going with five complete practitioners, one approaching completion, one at the threshold. Going later means everyone more prepared. But the writing on this wall was done within three days, by someone who knows what is east, and if they know it and they are not here, they are moving toward it."),

    ch("EPOCH4_DEPART", [
      op(
        "Go east now. Five complete practitioners is sufficient.",
        "GO_NOW",
        [
          d("MAREN", "left", "thoughtful", "Five complete, one approaching, one at threshold. That is enough if what is east is what Eran believed. If it is something else, more people would not have made a difference."),
          n("Tal and Dorath take the news without complaint. Dorath says she'll catch up in a month. Tal says she'll be faster. Maren looks at both of them as if calculating something and then says: I believe you."),
        ],
        null,
        { relationships: { maren: 8, tal: -4, dorath: -4 } }  // Maren supports urgency; Tal/Dorath are left behind
      ),
      op(
        "Wait two months. Everyone at full preparation before going.",
        "WAIT_TWO_MONTHS",
        [
          d("MAREN", "left", "thoughtful", "What changes: Tal reaches completion or close to it. Dorath continues. The group arrives at full strength. What does not change: whoever wrote on the east wall is already three days ahead and moving. Two months is a long lead to give."),
          n("She makes the calculation without arguing either way. It is genuinely uncertain. That is the point."),
        ],
        null,
        { relationships: { tal: 10, dorath: 8, maren: -3 } }  // Tal and Dorath benefit; Maren prefers urgency given the wall writing
      ),
      op(
        "Send two ahead now — Brek and Ryn. The others follow when ready.",
        "SEND_TWO_AHEAD",
        [],
        { coins: 10 },
        { relationships: { brek: 10, ryn: 12, tal: 5, dorath: 5 } }  // Trusting Brek and Ryn with the advance; compromise serves everyone
      ),
    ]),

    n("Whatever is decided, evening comes. The east wall holds its new writing. No one covers it. No one speaks about it further. It is simply there — a fact, a voice that came through without leaving a name."),

    d("SIRA", "left", "thoughtful", "I want to say something."),

    n("Everyone turns. Sira does not often speak in large groups — she is better one on one, where she can adjust for the listener. In a full room she tends to hold back. But she is speaking now."),

    d("SIRA", "left", "thoughtful", "When I was practicing alone, before the fire, I thought I was at a disadvantage. Working through it without guidance, without anyone to ask. I thought it would be harder because of that. I've been here three weeks watching all of you, and I understand now that I was wrong about what the disadvantage was."),

    n("She pauses."),

    d("SIRA", "left", "thoughtful", "The method is designed to be carried alone. Everything else — the Archive, the instruction, the guidance — is support infrastructure. The thing itself is solitary by design. Working alone was not a disadvantage. It was the method doing what the method does."),

    n("Another pause."),

    d("SIRA", "left", "quiet", "Before, the person who went east went alone. That's what Eran's documents say — every archivist who found the original settlement came alone. This is the first time seven people are going together. I don't know what that means for what's east. But I think it means something."),

    n("Maren looks at Sira for a long moment. Something in Maren's expression that is not quite a smile but is in that direction."),

    d("MAREN", "left", "almost-smiling", "Yes. I think it does."),

    n("Night. The east wall is in shadow and the new writing is invisible in the dark, which means you know it is there without being able to see it, which is, you realize, an accurate description of most things that matter."),

    n("In the morning, before you leave, you check the wall again. The ink has dried. The three lines are still there. And at the very bottom, below them — below everything — is a fourth line that was not there the night before."),

    n("It is not notation. Not a word. A mark. Simple, deliberate, drawn with the point of something sharp."),

    n("You have seen this mark once before. At the bottom of the envelope from the safe house — the one addressed to you by name, in a hand no one recognized, in a room that had been locked."),

    n("The same mark. Here. Now. The ink is not fully dry."),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 5 — "The Date"
  // Arc 5 complete. The book ends with a location. Someone set a deadline.
  // The group must decide: move now in daylight, or wait for night and the risk
  // that the deadline arrives before they do.
  // Choice: trust Serath's judgment on timing, or override him.
  // Cliffhanger: the date written in the book is three days from now.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The room is unchanged. The table where the surviving fragment was found. The lamp Dorath adjusted when you arrived. Sira's book open in front of you — the fourteenth fragment described in her handwriting, the method laid out in notes that assume the reader already knows most of it and is filling in the last gap. The last page: a location. Coordinates written in the notation the Archive used for satellite sites. A building at a specific distance northeast of a specific road marker, in terrain that is not on any survey you have seen.",
      BG.settlement_interior
    ),

    n("Maren has read the page four times. You know because you counted."),

    d("MAREN", "left", "thoughtful", "She verified the location in three different ways. The first two are standard survey notation. The third is a landmark description that only makes sense if you have been to the road marker in question."),
    d("KAEL", "right", "neutral", "You've been there."),
    d("MAREN", "left", "neutral", "I passed through that district seven years ago. The marker she describes is accurate. She has been to this location, or she had access to someone who had."),
    d("RYN", "right", "quiet", "When?"),
    d("MAREN", "left", "thoughtful", "The ink on this page is the same age as the rest of the book. Which means it was written before she left the Archive. Before the fire."),

    n("The weight of that settles in the room. Sira knew where she was going before she left. She left two weeks before the fire. She arrived there — wherever there is — without a guide, without the group, carrying the book she had written herself."),

    d("SERATH", "left", "neutral", "She wasn't running. She was leading."),
    d("KAEL", "right", "neutral", "Leading who?"),

    n("Serath looks at the book rather than at you. The expression is not evasion — it is the face of someone who has already computed something and is deciding whether the answer is ready to share."),

    d("SERATH", "left", "neutral", "Sira and I spoke twice before she left. The first time was about the deep records — the same ones I was researching. She asked questions that told me she had already found what I was still looking for. The second time, she told me the Archive would burn within six months and that the method had to reach a specific location before it did. She would not say how she knew the timeline."),
    d("MAREN", "left", "neutral", "You knew."),
    d("SERATH", "left", "neutral", "I knew she knew. I didn't know the source. I still don't."),

    n("Dorath, standing at the window, speaks without turning."),

    dn("DORATH", "left", "neutral", "There's something at the bottom of the page. Below the location."),

    n("Three steps to the table. You look where Dorath is looking. Below the coordinates, below the landmark description, in smaller writing that is denser and more controlled than the rest of the page, as if written more slowly or written last — two things. A notation that matches the administrative index format from the Archive's deepest records. And a date."),

    d("KAEL", "right", "surprised", "What date is this?"),
    d("MAREN", "left", "thoughtful", "Three days from now."),
    d("KAEL", "right", "surprised", "How is that possible? She wrote this before the fire. She didn't know when we would be here."),
    d("MAREN", "left", "thoughtful", "She didn't know when. She knew how long. If she knew how long the method takes — the full practice, all the stages — and she knew when we started, she could calculate the arrival."),
    d("RYN", "right", "quiet", "She knew when we started."),
    d("MAREN", "left", "neutral", "Someone did."),

    n("Three days. The deadline was written before the fire, calculated from a starting date Sira knew — or someone knew. The location is three days' travel northeast. If you leave now, in daylight, with a direct route, you arrive with a day to spare. If something delays you, the margin disappears. The question is not whether to go. The question is when."),

    d("DORATH", "left", "neutral", "Daylight means visibility. Anyone watching this building has had time to see us arrive. They know the group's size."),
    d("SERATH", "left", "neutral", "Night means the road in unknown terrain without lamps. If the route requires any significant navigation, we lose time we don't have."),
    d("MAREN", "left", "neutral", "Dorath, your read on the watchers."),
    dn("DORATH", "left", "thoughtful", "One person. South approach. They've been there since yesterday morning. They haven't moved to act. They're watching, not preparing."),
    d("MAREN", "left", "neutral", "Which means they're reporting. Which means they're waiting for instruction."),
    d("KAEL", "right", "neutral", "How long until instruction arrives."),
    dn("DORATH", "left", "neutral", "Unknown. If the chain is long, we have hours. If it's short, we may already be past the window."),

    ch("EPOCH5_TIMING", [
      op(
        "Leave now. Daylight is manageable. The watcher is watching, not blocking — use that window.",
        "LEAVE_NOW",
        [
          d("SERATH", "left", "neutral", "I'll take the north route. It avoids the south approach entirely."),
          d("DORATH", "left", "neutral", "The north route adds two hours."),
          d("SERATH", "left", "neutral", "It adds one. I've walked it."),
          n("Dorath looks at him for a moment. Then at you. Then she begins packing."),
          n("The decision is made and everything that follows is execution. Dorath draws the south watcher away with a visible exit from the east door — she walks out carrying empty sacks toward the market road, confident and unhurried, the walk of someone doing an errand. The watcher follows her at distance. It buys four minutes. You use all of them."),
          d("MAREN", "left", "neutral", "North route. Serath leads. Dorath meets us at the first field marker."),
        ],
        null,
        { relationships: { serath: 8, dorath: -5, maren: 4 } }  // Trusts Serath's judgment; Dorath loses control of her plan
      ),
      op(
        "Wait for Dorath to neutralize the watcher first. Move when the south approach is clear.",
        "WAIT_DORATH",
        [
          dn("DORATH", "left", "neutral", "Give me an hour."),
          d("MAREN", "left", "neutral", "We have it."),
          n("Dorath does not explain what she will do. She leaves the same way she arrived — through the east door, without ceremony. The hour passes in preparation. You review the location in the book twice more. Ryn packs the fragment case with the additional wrapping she found in the supply crate. Serath writes something in his notebook and tears the page out and puts it in his coat."),
          n("At the end of the hour, Dorath returns. She says: clear. She does not say how she managed it, and no one asks."),
          d("MAREN", "left", "neutral", "Good. North route. Serath leads from the front marker."),
        ],
        null,
        { relationships: { dorath: 12, serath: -3, maren: 4 } }  // Trusts Dorath's field expertise; Serath's route is bypassed
      ),
      op(
        "Ask Serath what he wrote and tore out — before you go anywhere.",
        "ASK_SERATH_NOTE",
        [
          d("KAEL", "right", "neutral", "What did you just put in your coat."),
          n("Serath looks up. The pause is brief — the kind that is real, not manufactured."),
          d("SERATH", "left", "neutral", "Coordinates for a fallback location. If we lose contact, there is a place everyone knows to go. I've used it before."),
          d("KAEL", "right", "neutral", "A fallback no one else knew about until now."),
          d("SERATH", "left", "neutral", "A fallback I am telling you about now. Which is when it became relevant."),
          n("That is not the answer to the question you asked. He knows it and so do you. But Dorath has already signaled clear, and the window is closing, and the choice in this moment is between the note and the road."),
          n("You choose the road. The note stays in his coat. The question stays between you."),
          d("MAREN", "left", "neutral", "North route. Serath leads."),
        ],
        null,
        { relationships: { serath: -6, maren: 3 } }  // Tests Serath; he answers honestly but incompletely
      ),
    ]),

    nb(
      "The north route takes two hours and fifteen minutes. Serath's estimate of one was optimistic. He says nothing about this when you reach the first field marker and wait for Dorath. Dorath arrives seven minutes after you, from a different direction than the route you took, which suggests she already knew a shorter path and chose not to mention it.",
      BG.cold_field
    ),

    n("The terrain northeast of the field marker changes. The road — such as it is — becomes a track, and the track becomes a visible line in the grass where something passes regularly enough to prevent growth but not regularly enough to wear the ground down to stone. You are following use. Someone uses this route. Recently enough that the grass at the edges is still bent."),

    d("MAREN", "left", "thoughtful", "Dorath. That south watcher."),
    dn("DORATH", "left", "neutral", "They'll wake in six hours. No lasting harm."),
    d("MAREN", "left", "thoughtful", "The person they report to."),
    dn("DORATH", "left", "neutral", "Depends on the chain. If short, they already know we've moved. If long, we have until morning."),
    d("MAREN", "left", "thoughtful", "Move faster."),

    n("The track is followed in silence. The terrain is not difficult but it requires attention — the ground shifts from grass to scrub to stone and back again in a pattern that doesn't establish itself cleanly enough to tune out. By the time the light begins to drop and the sky ahead of you shows the particular grey-blue of early evening over elevated ground, you are tired in the way of people who have been attending to small things for a long time."),

    n("Ryn, walking behind you, speaks quietly enough that the words are only for you."),

    d("RYN", "right", "quiet", "The fourteenth fragment. It was hers from the beginning."),
    d("KAEL", "right", "neutral", "Yes."),
    d("RYN", "right", "quiet", "And she knew where to take it. And she knew when we would arrive."),
    d("KAEL", "right", "neutral", "Mm."),
    d("RYN", "right", "quiet", "Someone told her when we started. Not Maren. Maren looks like she's doing the same math we are."),

    n("You have been thinking this for three hours. The fact that Ryn is saying it means she's been thinking it longer. The question of who told Sira when you started is a question about who was watching from inside the beginning — inside the group, not outside it. Inside the Archive, before the fire. Inside a circle that does not have many members."),

    n("The track rounds a low rise and the ground beyond it opens into a flat area, wider than you expected, where the scrub gives way to pressed earth and the pressed earth shows the clear evidence of a structure: a foundation line, recently set, and within it, three walls of dry stone already at shoulder height with a fourth in progress. The structure is being built. Someone is building here, now, in a location that appears on no survey."),

    n("In the doorway of the unfinished fourth wall — in the gap where the wall will eventually close — someone is standing."),

    n("She is holding a lamp."),

    n("She looks at Maren first. Then at Ryn. Then at you."),

    d("SIRA", "left", "neutral", "You're two hours late. I recalculated last night and I still expected two hours ago."),

    n("Her voice is the same. The face is older by exactly the amount of time that has passed, and calmer by an amount that is harder to calculate. She looks like someone who has been here long enough to have stopped worrying about whether anyone would arrive."),

    d("MAREN", "left", "neutral", "We had a watcher."),
    d("SIRA", "left", "neutral", "I know. I saw her from the east rise this morning. Dorath handled it."),

    n("She steps back from the doorway."),

    d("SIRA", "left", "neutral", "Come inside. I have something to show you. It's been waiting."),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 6 — "The Seal Is Set"
  // Arc 6 complete. Serath's full account. The walls of the settlement.
  // The method is done. What it means — and what is east of the settlement.
  // Choice: go east now, or stay until the seal is certified by witness.
  // Cliffhanger: Dorath's map shows something east. One word: COMPLETE.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The walls of the settlement hold something that was not built in. Three months in a structure that is still not finished, and the interior walls are already covered in a writing that is not decoration and not record-keeping in any format the Archive would recognize. It is notation — the same notation as the deep records, the same notation as Sira's book — but expanded outward from the original, as if someone took the compressed form the fragments use and allowed it to breathe. The writing covers all three completed walls from one hand-width above the floor to as high as the writer could reach.",
      BG.settlement_interior
    ),

    n("Sira wrote most of it. You know this because the writing changes in three places — two sections in a hand that is slightly less confident, more deliberate, more space between the elements — and these sections correspond to what she says Serath contributed when he arrived. He arrived two weeks before you. He knew where she was going before she left. He did not say so until now."),

    d("MAREN", "left", "neutral", "Start from the beginning. All of it."),
    d("SERATH", "left", "neutral", "The deep records."),
    d("MAREN", "left", "neutral", "Before that."),
    d("SERATH", "left", "neutral", "I was asked."),

    n("That word in that silence. Everyone in the room stops doing what they are doing. Ryn, who has been tracing one of the wall sections with her eyes, looks at him. Dorath, standing near the east gap in the fourth wall, turns."),

    d("KAEL", "right", "neutral", "Asked. By who."),
    d("SERATH", "left", "neutral", "I don't know. I received a message three years ago — through the Archive's internal postal system, correctly formatted, with the administrative seal. It said: someone in this building will complete the Vraen method. When that becomes clear, send word. The contact notation was a relay, not a direct address. I was never able to trace it."),
    d("MAREN", "left", "neutral", "And you said yes."),
    d("SERATH", "left", "neutral", "I said yes."),
    d("MAREN", "left", "neutral", "Without telling me."),
    d("SERATH", "left", "neutral", "Without telling you. Because if I told you, you would tell me not to, and I believed — I still believe — that the person on the other end of the relay is the same network that built this site. That was preparing for what we are doing now. That whoever asked wanted to know when the method would be complete for the same reason we want it to be complete."),

    n("Maren says nothing. You have learned to read this kind of silence — it is the silence before a judgment, not the silence of someone deciding whether to be angry. She has already decided. She is deciding what to do with the decision."),

    ch("EPOCH6_SERATH", [
      op(
        "Say nothing. This is Maren's conversation.",
        "SERATH_SILENT",
        [
          n("You hold your position. Maren looks at Serath for a long moment — long enough that it becomes something people in the room notice — and then she looks at the wall behind him."),
          d("MAREN", "left", "neutral", "You told them when we started. The date in Sira's book."),
          d("SERATH", "left", "neutral", "I sent a message three weeks before the fire. I said the practice had reached the advanced stage. I didn't give a date — I gave a phase. The date in the book is Sira's calculation from the phase."),
          d("MAREN", "left", "thoughtful", "Then whoever is on the other end of that relay knew how to calculate from the phase. Which means they know the method."),
          n("That lands in the room and does not leave."),
        ],
        null,
        { relationships: { maren: 5, serath: 3 } }  // Defers to Maren; she reads the trust correctly
      ),
      op(
        "Ask Serath directly: do you trust that the person who asked you is not the same as Voss.",
        "SERATH_TRUST",
        [
          d("KAEL", "right", "neutral", "The message you received. The relay contact. Do you believe it came from the same network as Voss?"),
          d("SERATH", "left", "neutral", "No."),
          d("KAEL", "right", "neutral", "Why."),
          d("SERATH", "left", "neutral", "Voss wants to control who completes the method. Dorath said so. The message I received wanted to know when it would be complete. Those are not the same interest. One wants to gate it. The other wants to be notified."),
          d("KAEL", "right", "neutral", "Someone watching for different reasons."),
          d("SERATH", "left", "neutral", "Possibly protecting. Possibly witnessing. I don't know which. I chose to believe it matters which."),
          n("This is not certainty. It is a decision made in the absence of certainty, which is the only kind of decision that is ever actually made."),
        ],
        null,
        { relationships: { serath: 8, maren: -4 } }  // Direct engagement with Serath; bypasses Maren's lead
      ),
      op(
        "Tell Serath that trust is not the issue. The issue is that none of you can verify anything he's told you.",
        "SERATH_VERIFY",
        [
          d("KAEL", "right", "neutral", "We can't verify any of what you've told us. Not the message, not the relay, not your reading of the sender's intent. We're acting on your interpretation of something you received three years ago."),
          d("SERATH", "left", "neutral", "Mm."),
          d("KAEL", "right", "neutral", "I'm not saying you're wrong. I'm saying that we should understand what we're doing."),
          n("Serath nods. Not the nod of someone agreeing — the nod of someone receiving a statement that is accurate and that they already know."),
          d("SERATH", "left", "neutral", "You are doing something that cannot be verified in advance. You are deciding that the risk of doing it is less than the risk of not doing it. That is what everyone in this room has been doing since the Archive burned."),
          n("Ryn makes a small sound. It might be agreement."),
        ],
        null,
        { relationships: { serath: -3, maren: 6, ryn: 5 } }  // Skeptical but fair; Maren notes the precision; Ryn responds to the honesty
      ),
    ]),

    nb(
      "The fourth wall is finished two days after your arrival. Dorath laid the last stones. She said it was a structural question, not a sentimental one. The gap bothered her. Now the interior is complete: four walls, one lamp hook per wall, a table from materials Sira had cached under a tarp outside, and the writing covering all four walls from floor to shoulder-height. You have spent three days reading it. You are not done.",
      BG.settlement_interior
    ),

    n("What the walls say, in the notation that the deep records used for the most compressed elements of the method: the practice in its completed form is not a memorization technique. It is a restructuring of how information is held. The fragments describe the practice using the language of architecture — not metaphorically, but as precise analogy. The Vraen scholars understood what they had built the way an architect understands a building: structurally, from the inside. The method, completed, means that what you hold cannot be taken by burning the paper it was written on."),

    n("You attempted the final stage this morning. Not alone — Sira directed it, Maren watched, Ryn kept time. When it was done, you sat for a long moment with the particular quality of stillness that follows something that has changed without looking different."),

    d("SIRA", "left", "thoughtful", "How does it feel."),
    d("KAEL", "right", "neutral", "Larger. Everything I know is more present than it was."),
    d("SIRA", "left", "thoughtful", "That is accurate. The method does not add — it reveals. What was already there becomes available in a way it wasn't. Like turning on a light in a room that was always the same size."),
    d("MAREN", "left", "neutral", "It needs witness."),
    d("SIRA", "left", "thoughtful", "I know."),
    d("MAREN", "left", "neutral", "Someone outside the group. Someone who can verify that the completion is genuine, not performed. The Archive's protocol required this."),
    d("SIRA", "left", "quiet", "The Archive is not here to require anything."),
    d("MAREN", "left", "neutral", "I am still here. The protocol still applies."),

    n("Sira looks at Maren for a long moment. There is something between them that was not there at the beginning — not warmth exactly, but a different kind of distance. Sira understands something about Maren now that she did not understand before, and Maren understands something about Sira, and what they understand seems to have made them more patient with each other rather than less."),

    d("SIRA", "left", "thoughtful", "There is a person who can witness. East of here. At a location I know but have not visited. The network Serath was contacted by — I believe they have someone at this location who is qualified."),
    d("MAREN", "left", "neutral", "You believe."),
    d("SIRA", "left", "thoughtful", "I believe."),
    d("MAREN", "left", "neutral", "That is not the same as knowing."),
    d("SIRA", "left", "thoughtful", "No. But the method is done, Maren. We cannot stay here indefinitely waiting for certainty."),

    n("Evening. Dorath unfolds a map — a hand-drawn copy of a regional survey, annotated in at least three different inks over what looks like several years. She spreads it on the table."),

    n("She traces the route from the road marker to the settlement with her finger. Then she continues east, past the settlement, into terrain the official survey shows as uninhabited upland with nothing of significance. Her finger stops at a point that has a mark on it — not a notation from the survey, not from her annotations. A mark in a fourth ink, applied more recently than any of the others. Heavier. Like someone pressed harder than they needed to."),

    n("Below the mark, in the same heavy hand: one word."),

    n("COMPLETE."),

    d("KAEL", "right", "surprised", "When did that get there."),
    d("DORATH", "left", "neutral", "I don't know. I've had this map for seven years. That mark was not on it three months ago. I would have seen it."),
    d("MAREN", "left", "thoughtful", "You've been here three months."),
    dn("DORATH", "left", "neutral", "Yes."),
    d("MAREN", "left", "thoughtful", "Someone added it while you were here. While you had the map. While you would have noticed."),
    dn("DORATH", "left", "neutral", "Yes."),

    n("Ryn, looking at the map, points to the mark's location."),

    d("RYN", "right", "quiet", "How far."),
    dn("DORATH", "left", "neutral", "Two days east. Maybe less if the upland route holds."),
    d("RYN", "right", "quiet", "And the mark."),
    dn("DORATH", "left", "neutral", "It's not a survey marker. It's not a landmark notation. I've been trying to place the notation style for an hour. It matches nothing in any reference I carry."),
    d("MAREN", "left", "thoughtful", "And the word."),

    n("Nobody answers. The word is its own answer."),

    n("COMPLETE. Written by someone who was standing in this room, looking at this map, at a time when no one in the group was watching — and who wrote a word that is either a description of what lies at that location, or a message, or both, and who knew what it would mean to the person who found it."),

    n("Maren lifts her eyes from the map. She looks at you."),

    d("MAREN", "left", "neutral", "In the morning. We find out what is east."),

    n("She folds the map with the same precise movements she uses for everything — the same movements she used to check the document case, the same movements you have been watching since the Archive burned. Whatever is east, you will reach it using the same care she applies to everything."),

    n("The lamp burns lower. Outside: wind, and the sound of the unfinished fourth wall holding against it."),

    n("Inside: seven people who are, by any measure, finished — and who are, by the evidence of the map, exactly at the beginning of something else entirely."),
  ],

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 2 EPOCHS — "The Eastern Road"
// Each epoch fires after its arc's final week is fully completed.
// 7 arcs × 1 epoch each = 7 epoch sequences (arcs 0–6).
// Act 2 arc: departure → road → border → city entry → Spire infiltration → placement → return
// ═══════════════════════════════════════════════════════════════════════════════

export const ACT2_EPOCHS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 0 — "The Road Opens"
  // Arc 0 complete. Five days east of the settlement. The wilderness is wider.
  // The method is carried now — the first test of carrying it in motion.
  // Choice: strict two-session daily practice or one long dawn session.
  // Cliffhanger: a signal fire on the horizon — too deliberate to be accidental.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "Five days east of the settlement and the road has narrowed to a track, then the track has narrowed to intention — a direction more than a path. The trees pressed close in the first two days have opened into scrub and low growth, the ground rising and falling in long slow waves that require attention rather than effort. Everyone walks differently now than they did at the Archive. That is not a small thing.",
      BG.act2_wilderness
    ),

    n("The settlement is behind you. Whatever the walls held — the writing, the lamps, the weight of three months of work — is now carried. That is the point. That has always been the point. The Archive burned and the building is gone and none of what mattered is gone, because what mattered was never the building. You understand this structurally now, not as a reassurance but as a fact with load-bearing properties."),

    d("MAREN", "left", "thoughtful", "How is it today?"),

    d("KAEL", "right", "neutral", "Stable. Present. Same as yesterday but more so."),

    d("MAREN", "left", "thoughtful", "That is the correct trajectory. The completion does not plateau — it deepens as the days continue, up to a point. The first month after completion is the most important month of practice. Not because something can go wrong. Nothing goes wrong. But because the first month is when you find out what the completion actually changed."),

    d("KAEL", "right", "neutral", "What did it change for you?"),

    d("MAREN", "left", "thoughtful", "How I read. Before, I read text as a sequence. After, I read it as a structure — the way an architect reads a building. The content was the same. The experience of engaging with it was entirely different. It is not an improvement exactly. It is a translation into a different mode of attention."),

    n("Brek walks ahead, checking the horizon every twenty minutes. Nobody asked him to. He began doing it the morning they left, without comment, and has continued without variation. He finds the function and performs it without requiring credit or acknowledgment."),

    d("RYN", "left", "quiet", "The practice schedule on the road."),

    d("MAREN", "left", "thoughtful", "What about it?"),

    d("RYN", "left", "quiet", "You've been watching how everyone manages it. I can tell because you look at us the way you look at the wall sections when you're assessing accuracy."),

    n("Maren does not deny this. Two morning sessions and one evening session per day was the schedule at the settlement; on the road it has compressed to one strong session at dawn and intermittent engagement during rest stops. She has said nothing about the change. She has been watching."),

    d("MAREN", "left", "thoughtful", "The road conditions require adaptation. What I am watching for is whether adaptation is maintaining structural integrity or beginning to rationalize erosion."),

    d("KAEL", "right", "neutral", "And?"),

    d("MAREN", "left", "thoughtful", "So far: structural integrity. But the road east has five weeks minimum. The pattern you establish in the first week becomes the baseline. I want to have a conversation about what that baseline should be."),

    n("What she is asking, without quite asking it: whether you want to set the standard for what practice looks like on this journey. The road has variable terrain, weather, and threat. The method is complete for five of seven. Maintenance requires consistency. Consistency requires a decision."),

    ch("EPOCH2_0_PRACTICE", [
      op(
        "Two sessions per day — dawn and dusk, regardless of terrain. What the settlement required is what the road requires.",
        "STRICT_SCHEDULE",
        [
          d("MAREN", "left", "thoughtful", "That is the standard I would have chosen. Demanding but achievable. The dusk session will sometimes be brief."),
          d("KAEL", "right", "neutral", "Brief is sufficient for maintenance?"),
          d("MAREN", "left", "thoughtful", "For maintenance, yes. For deepening, no. But maintenance is the goal until we reach a stable location again."),
          n("The sessions become the rhythm of travel. Dorath begins timing her evening reconnaissance to finish before dusk. Brek never misses a session. Ryn practices quickly and efficiently. The road organizes itself around the practice rather than the other way around."),
        ],
        null,
        { relationships: { maren: 10, ryn: 4, brek: 4 } }
      ),
      op(
        "One strong session at dawn. The evening slot is too variable — better one reliable session than two uncertain ones.",
        "SINGLE_SESSION",
        [
          d("MAREN", "left", "thoughtful", "The logic is sound. The risk is that 'one strong session' becomes 'one session' over time, and the standard for strong drifts downward."),
          d("KAEL", "right", "neutral", "You'll notice if it does."),
          d("MAREN", "left", "almost-smiling", "I will."),
          n("One session holds — not without effort, but it holds. The dawn hour in open terrain has a quality that is useful for this kind of work: low light, cold, the day not yet established. Maren noted once that the original Vraen practitioners worked at dawn by preference, and you understand now that this was not sentiment but method."),
        ],
        null,
        { relationships: { maren: 5, ryn: 6 } }
      ),
      op(
        "Ask Serath what practice looks like on a road — he has done this kind of travel before.",
        "ASK_SERATH_PRACTICE",
        [
          d("MAREN", "left", "thoughtful", "Serath."),
          d("SERATH", "left", "neutral", "Dawn only. Ninety minutes minimum. No abbreviation."),
          d("MAREN", "left", "thoughtful", "That is one approach."),
          d("SERATH", "left", "neutral", "It works because you stop negotiating with yourself about whether you have time. You know you have ninety minutes. You do ninety minutes. The negotiation is what erodes the practice."),
          n("Maren considers this for longer than her usual consideration."),
          d("MAREN", "left", "thoughtful", "That is more useful than I expected."),
          n("Serath does not react to the compliment. They have been navigating each other for six weeks with this vocabulary."),
        ],
        null,
        { relationships: { serath: 8, maren: 4 } }
      ),
    ]),

    n("The decision is made. The road continues. On the sixth day, Brek says: stop walking."),

    n("Everyone stops. He is looking northeast — not at the horizon but slightly below it, at a point in the middle distance where the scrub is darker than it should be for this hour."),

    d("BREK", "left", "urgent", "Northeast. Three or four miles. That is not ground fog."),

    n("A column of smoke, too vertical and too sustained to be accidental. Rising from a location with no visible settlement, no road access from the direction you came. In a place where you would not expect a fire."),

    d("DORATH", "left", "thoughtful", "It's burning in a pattern. Watch the base."),

    n("You watch. Dorath is right. The smoke thins, then thickens, then thins again — not the irregular pulse of an uncontrolled fire but something deliberate. Something tended."),

    d("MAREN", "left", "quiet", "A signal."),

    d("SERATH", "left", "neutral", "Addressed to who?"),

    n("Nobody answers. The smoke continues its steady rise into the eastern sky. The question remains open, and you are six days east of the last place you understood entirely, on a road that is becoming less a road with every mile."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 1 — "The Count Stations"
  // Arc 1 complete. Counting stations confirmed real. Eran's intelligence verified.
  // Gavrick steps out from cover — he has been following for three days.
  // Choice: contact a station agent who has information, or pass without contact.
  // Cliffhanger: Gavrick steps forward. He knows about the method.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The count station is a low stone building at a road crossing three weeks east of the settlement. It looked like a wayfarers' shelter on the approach — same roof profile, same proportions. The difference is visible from fifty meters: tally marks covering the door frame, the south wall, the post to the left of the road, a stone marker twenty meters further on. Marks by category, by date, by route. The station has been recording movement on this road for years.",
      BG.act2_eastern_road
    ),

    n("You passed three stations in the first two weeks without understanding what they were. This fourth station is different because Eran told you about it. Eran, who appeared at the border settlement fourteen days ago with two bags and a knowledge of your route that he explained by saying Tal told me. He has been walking with the group since. He said his name once, offered nothing more, and demonstrated over the following hours that he knew how to move in rough terrain and when to be silent and how to cook on a road fire without wasted motion. Maren watched him for three days and then included him in morning practice without consulting Dorath. Dorath noticed. She has said nothing."),

    d("ERAN", "left", "thoughtful", "This station is different from the first three. The first three are census posts — volume, route, approximate group size, shared northward. This one shares eastward."),

    d("MAREN", "left", "neutral", "Shared with who."),

    d("ERAN", "left", "thoughtful", "The Spire maintains a movement registry for the eastern district. Every station within two hundred miles feeds it. They don't stop travelers — they count them. Any group of five or more moving east on this road is category four. Which means a report reaches the Spire within four days of this station seeing us."),

    d("DORATH", "left", "neutral", "We've been category four since the settlement."),

    d("ERAN", "left", "thoughtful", "Three stations. The first two reports are noise — the road gets traffic. The third confirms a pattern. They are currently computing whether you are of interest."),

    d("SERATH", "left", "neutral", "How long before they decide."),

    d("ERAN", "left", "thoughtful", "Four to six days. If they decide you're of interest, they send an inquiry team west. Not to stop you. To observe and report."),

    n("The station agent is visible through the door — a seated figure, a lamp, a ledger open on a table. They haven't come to the door. Standard procedure: they record arrivals on the post outside, not by interview. You don't have to interact with anyone here."),

    n("But Dorath has been watching the station's east post for five minutes with the expression of someone who has found something unexpected."),

    dn("DORATH", "left", "thoughtful", "The east post has a mark I've seen once before. In a contact network I haven't used in three years. It's an availability signal — someone here is willing to communicate outside the official reporting channel. The mark is placed where only someone who knows to look for it would find it."),

    n("Making contact extends your time here and creates a conversation that will be remembered. Passing clean leaves no evidence but walks away from intelligence that may not be available again. Eran is watching you make this calculation with the expression of someone who already knows the right answer."),

    ch("EPOCH2_1_STATION", [
      op(
        "Make contact. The mark is there for a reason and Dorath knows how to read it.",
        "MAKE_CONTACT",
        [
          dn("DORATH", "left", "neutral", "Give me twelve minutes."),
          n("She enters. The group waits in a loose configuration — Brek adjusts his pack, Ryn examines a stone marker, Serath sits on the road verge. Twelve minutes. Dorath emerges."),
          dn("DORATH", "left", "thoughtful", "Category four reports on this route: our group is the third in eight months. The first two are logged but no descriptions kept — only counts. What she could tell me: one of the two previous groups stopped a full day at this station before continuing east. They left a mark. Same network as mine."),
          d("MAREN", "left", "thoughtful", "Someone else is using this road and the same contact network."),
          dn("DORATH", "left", "neutral", "Was. Eight months ago. Before the Archive burned. Before any of us left the settlement."),
          n("Someone was already moving east on this road, using the same network, eight months before everything collapsed. You hold this fact and feel its weight without yet understanding what to do with it."),
        ],
        null,
        { relationships: { dorath: 10, eran: 6, maren: 3 } }
      ),
      op(
        "Pass the station. The mark may be old — contact risk is not worth it.",
        "PASS_CLEAN",
        [
          n("You walk past. The agent does not appear at the door. The mark is behind you in four minutes."),
          n("Two days later, Eran mentions while walking that the agent at that station has been feeding the contact network for six years — one of the most reliable nodes in the eastern district's unofficial information circuit."),
          d("DORATH", "left", "neutral", "You knew that."),
          d("ERAN", "left", "thoughtful", "I thought you might want to know what you decided not to use."),
          dn("DORATH", "left", "neutral", "That is not useful now."),
          d("ERAN", "left", "thoughtful", "Information about a decision's cost rarely is."),
          n("The exchange is tense for about thirty seconds. Then Dorath resumes walking and Eran resumes walking and the information stays between them, inert."),
        ],
        null,
        { relationships: { dorath: 4, eran: -3, maren: 6 } }
      ),
      op(
        "Ask Eran directly how he found you at the border settlement. Before going further east with him.",
        "ASK_ERAN",
        [
          d("KAEL", "right", "neutral", "Before the station. How did you find us at the border."),
          d("ERAN", "left", "thoughtful", "Tal sent a message. I told you."),
          d("KAEL", "right", "neutral", "Tal sent a message to where. You were already in the eastern district. How did you know where to be."),
          n("Eran is quiet — the pause of someone deciding how much of an accurate thing to say."),
          d("ERAN", "left", "thoughtful", "I have been in this district for four months. Before the Archive burned. Before any of you left the settlement."),
          d("MAREN", "left", "quiet", "Four months."),
          d("ERAN", "left", "thoughtful", "The eastern district has a movement recording system more comprehensive than most people know. If you're going to help a group of practitioners reach the city safely, you need to understand how the system works before they enter it."),
          n("Maren says nothing. The question of who planned this, and how far in advance, is becoming a question with an answer that keeps moving east."),
        ],
        null,
        { relationships: { eran: -4, maren: 5, dorath: 3 } }
      ),
    ]),

    n("The station is behind you. On the second evening past it, Ryn stops walking and looks behind her. She does this when she has been computing something for hours."),

    d("RYN", "left", "quiet", "Three days. Two hundred meters. Consistent distance, consistent position. Left side of the road when the road curves right, right side when it curves left. Staying in the angle where our peripheral vision is worst."),

    d("KAEL", "right", "neutral", "Someone following."),

    d("RYN", "left", "quiet", "One person. Patient. They have not closed distance and have not fallen further behind. Exactly two hundred meters."),

    d("DORATH", "left", "neutral", "I clocked them at the stream crossing this morning. I wanted to be sure it was intentional before saying anything."),

    n("Everyone watches behind them. The road curves, and in the last of the light you can see, at two hundred meters, a figure standing still because you have stopped. The distance does not change."),

    d("MAREN", "left", "quiet", "Not a threat posture."),

    d("ERAN", "left", "thoughtful", "No. They want to be seen. This is an announcement."),

    n("Eran takes three steps back down the road and raises one hand, open palm toward the figure. The figure, after a moment, steps off the road's edge and approaches in a wide arc — not advancing on you, but moving to a position where conversation is possible without either side being at a disadvantage. The movement of someone who knows how to have a first meeting."),

    n("He stops at thirty meters. Older than you expected. Road-worn. One hand already visible, open. He looks at Eran, not at Maren or Dorath."),

    d("GAVRICK", "left", "neutral", "I know about the method. I have for four years. I was told to find you when you passed the fourth station."),

    n("His name is Gavrick."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 2 — "The City of Controlled Light"
  // Arc 2 complete. Inside the city. Leven's rooms. The Spire visible from the window.
  // Everything recorded, everything watched. The city as institution.
  // Choice: Dorath's strict presence rules, or Serath's immediate reconnaissance.
  // Cliffhanger: a lamp on the Spire's fourth level moving in a deliberate pattern.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The city gate takes you in without event. A count, a category, a ledger entry. The gate agent does not look up. The gate agent has stopped looking up sometime in the last several years and replaced looking up with recording, which achieves the same institutional purpose with less information than the institution believes it is getting.",
      BG.act2_city_gate
    ),

    n("Inside: the smell of a city in early autumn — stone, charcoal, food, the particular concentrated smoke of a district that burns wood rather than coal. Streets narrow and maintained. Buildings lean toward each other across the upper levels, cutting the sky into corridors. You are used to roads with visible horizons. This is different. The horizon here is architectural — two stories up, angled, a line of sky that moves depending on where you stand."),

    n("And above everything: the Spire. Visible from almost any street because it is that tall, and because the city was designed around it, or grew around it, or was permitted to grow only in patterns that preserved the sightlines. Due east, perhaps half a mile. Seven levels. The stone a different color than everything else in the city — not lighter or darker, but different in quality, as if quarried from somewhere that produced a different kind of density."),

    d("DORATH", "left", "neutral", "Eyes down when you're walking. The observation infrastructure here is not street guards — it's recording. Doorway watchers. Window seats. Everyone you pass is a potential data point in someone's ledger."),

    d("SERATH", "left", "neutral", "The recording is real but the analysis has a lag. Dorath is right about the infrastructure. She may be overcorrecting on response time."),

    dn("DORATH", "left", "neutral", "I would rather overcorrect than give the Spire three days to prepare a reception."),

    n("Eight weeks of travel has established Dorath and Serath as the group's competing risk assessments. Maren says nothing about it. She has decided, you think, that a group with two different risk calculations is more resilient than a group with one."),

    n("Leven's rooms are on the third floor of a building in the merchant district, accessible through a staircase behind a warehouse that legitimately holds grain. Four rooms: two sleeping, one common, one workspace. The workspace faces east. Through the window, partially obscured by the building across the alley: the Spire's upper levels."),

    d("LEVEN", "left", "neutral", "These rooms have been maintained for eleven months. The building's owner asks no questions because I pay quarterly in advance, in full. The warehouse below is a genuine trading operation — enough activity to make the staircase traffic unremarkable."),

    n("Leven is Dorath's contact — mid-thirties, specific movements, the unhurried quality of someone who has been careful for long enough that careful has become resting state. She sets food on the table without being asked and sits at the far end with the orientation of someone who always knows where all the doors are."),

    d("MAREN", "left", "neutral", "How long before we can begin movement?"),

    d("LEVEN", "left", "neutral", "The registration covers a merchant group of seven. Your road record matches the filing. Movement within the merchant district is unremarkable for the first four days. After four days, extended residency without observable trade activity draws a routine inquiry from the city's registry office. I have a solution for that when it becomes relevant."),

    d("SERATH", "left", "neutral", "What solution."),

    d("LEVEN", "left", "neutral", "I'll tell you when it becomes relevant."),

    n("Serath accepts this. He recognizes the approach — information distributed when it's needed. He uses the same approach. The recognition is mutual."),

    ch("EPOCH2_2_MOVEMENT", [
      op(
        "Dorath's approach. Four days of controlled presence first. Establish the rooms before attempting to understand the city.",
        "HOLD_POSITION",
        [
          n("The four days are used to understand the rooms, the building's rhythms, the patterns of the alley and street. Leven provides an annotated map of the merchant district. Dorath plans three exit routes. Maren uses the four days for practice."),
          n("On the third day, Brek says: the warehouse schedule has a two-hour window each morning where the staircase traffic stops completely. Nobody uses the stairs between the third and fifth hour after dawn. The window to move, if moving is needed."),
          dn("DORATH", "left", "neutral", "Good. That's exactly what I needed."),
          n("Brek returns to watching the alley through the workspace window. In four days of this, he has compiled a surveillance read on the alley that Leven later calls one of the better assessments she has seen."),
        ],
        null,
        { relationships: { dorath: 10, brek: 8, maren: 6 } }
      ),
      op(
        "Serath's approach. Begin careful reconnaissance now. Four days is a window, not a waiting period.",
        "MOVE_NOW",
        [
          n("Serath moves first, alone, the afternoon of arrival. He returns two hours later with information that can only be obtained by being somewhere: the Spire's east approach has a steady pattern of intake arrivals on the third day of every week. They arrive willingly, in small groups, each met by an escort with a blue ledger."),
          d("SERATH", "left", "neutral", "The escort carries a ledger. Blue cover, worn at the corner. Same ledger I saw in the deep records documentation three months ago."),
          d("MAREN", "left", "neutral", "The intake registry is physical."),
          d("SERATH", "left", "neutral", "And carried in the open, because the Spire doesn't think anyone here knows what to look for."),
          dn("DORATH", "left", "neutral", "You exposed yourself on day one."),
          d("SERATH", "left", "neutral", "I exposed a face nobody in this city is looking for. Calculated risk."),
          dn("DORATH", "left", "neutral", "All risks in a city become calculated only in retrospect."),
          n("Maren says: noted. Both of you. She says it in a way that closes the conversation and opens the next one."),
        ],
        null,
        { relationships: { serath: 10, dorath: -4, maren: 3 } }
      ),
      op(
        "Observe the Spire from the workspace window first. Before anything else.",
        "OBSERVE_SPIRE",
        [
          n("You spend the first evening at the window. The fourth level and its northeast corner window catches the evening light for approximately forty minutes after sunset."),
          n("Ryn stands beside you for the last twenty minutes."),
          d("RYN", "left", "quiet", "Movement pattern. North wall, fourth level. There is a lamp that moves in a specific direction between sunset and darkness. Not random. Periodic. Every twenty minutes — left side of the window to the other side and back."),
          d("KAEL", "right", "neutral", "Someone keeping a schedule."),
          d("RYN", "left", "quiet", "Or someone signaling."),
          n("Maren enters the workspace from the common room and stands behind both of you. She watches without speaking. Then: I need to know what is on the fourth level before we do anything else."),
        ],
        null,
        { relationships: { maren: 8, ryn: 8, serath: 4 } }
      ),
    ]),

    nb(
      "However the four days begin, the first evening resolves into the same moment. You are in the workspace. The building is quiet. The Spire is visible through the window in the last of the light.",
      BG.act2_spire_exterior
    ),

    n("The upper levels hold something — the quality of the stonework, the window placement, the way the building relates to everything around it — that is different from simple institutional architecture. The Archive had this quality. You didn't understand what it was when you were inside it every day. You understand it now, from the outside, looking at a building that holds something similar: the Spire is designed for the practice. The proportions, the light management, the window placement — not for exterior view but for interior illumination. Someone who understood the method built this building."),

    d("MAREN", "left", "thoughtful", "Yes."),

    d("KAEL", "right", "neutral", "Which means whoever built it had access to the method's architecture."),

    d("MAREN", "left", "thoughtful", "Had access, or had a completed practitioner, or both."),

    n("She is looking at the fourth level. The lamp is moving. Not random — deliberate. From the window's left edge to its center. Pause. Center to right edge. Pause. Back to center. The movement of someone who knows there is a window opposite and is making something visible in it."),

    d("RYN", "left", "quiet", "Pattern of four. Left, center, right, center. Stops, waits, begins again."),

    n("Three cycles. Then the lamp settles and does not move again."),

    d("SERATH", "left", "neutral", "That is the fourth step of the notation cycle. Repeated in movement form."),

    d("MAREN", "left", "quiet", "Someone on the fourth level of the Spire was demonstrating that they know the notation. Either they know we are here and they are identifying themselves. Or they have been doing this every evening for some time and we have arrived on an evening when it was visible."),

    d("KAEL", "right", "neutral", "Is either of those better?"),

    d("MAREN", "left", "quiet", "The second one is more frightening."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 3 — "The Intake Registry"
  // Arc 3 complete. Pellard's full account. The registry located.
  // Choice: use the next intake window (eleven days), or observe one full cycle first.
  // Cliffhanger: someone has been in their room while they were away. Not searched — examined.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "Pellard is not what you expected. Serath described a careful, contained person with precise knowledge of the Spire's internal structure. What you find is all of that — and someone who is frightened in a way he has been managing for so long that the management has become invisible except at moments like this one, when someone is asking direct questions in a room he does not control.",
      BG.act2_city_contact
    ),

    n("The room is Leven's secondary contact space — a back room of a cloth merchant's shop, accessible through a connecting door that is visually indistinguishable from the wall. Pellard knew where to stand when you entered. He has been inside this room before."),

    d("PELLARD", "left", "neutral", "I worked intake for three years. Intake coordinator — I received the registry, logged arrivals, scheduled placement, managed the transition from intake to residence. I stopped two years ago when I understood what residence meant in practice."),

    d("SERATH", "left", "neutral", "What does it mean."),

    d("PELLARD", "left", "neutral", "The intake process is presented as a study residency. Advanced practitioners wanting access to the Spire's collection. That is accurate as far as it goes. What it doesn't include: the collection is curated. Residents access only what the Spire wants them to access. The study sequence is designed to bring a practitioner to a specific stage — one from which continued advancement requires the Spire's guidance and infrastructure."),

    d("MAREN", "left", "neutral", "Not complete the method. Advance to where completion appears to require institutional support."),

    d("PELLARD", "left", "neutral", "Yes. The sequence is designed so that the next stage always requires a specific text that exists only in the fourth-level reading room. Access to the fourth level requires senior residency status. Senior residency requires a formal commitment to the Spire's institutional framework."),

    d("RYN", "left", "quiet", "And if someone enters already complete?"),

    d("PELLARD", "left", "neutral", "That is the question I couldn't answer from inside intake. The completed practitioners I was aware of — three in three years — were treated differently from the beginning. Not restricted. Integrated. Given significant resources. Very quickly very comfortable within the Spire's structure."),

    d("SERATH", "left", "neutral", "Integrated. Not committed."),

    d("PELLARD", "left", "neutral", "I thought so at the time. I am no longer certain."),

    n("The intake schedule sits in the center of this conversation without being named. Pellard brought it — a copy maintained after leaving intake, updated through a contact who still works inside. The next intake cycle opens in eleven days. The arrival window — when new practitioners come to the gate in groups of two and three, unremarkable in the flow — is the morning of intake day itself, when the gate processes between twelve and thirty individuals."),

    n("Eleven days is enough time to prepare. The morning arrival window is eight hours. Dorath has been looking at the schedule for twenty minutes."),

    ch("EPOCH2_3_INTAKE", [
      op(
        "Use the next intake window. Eleven days is sufficient preparation.",
        "USE_NEXT_WINDOW",
        [
          n("The decision focuses the group. Eleven days with a specific objective produces a quality of attention that three weeks of general reconnaissance did not. Dorath maps the gate approach in three configurations. Serath walks the route twice. Brek identifies the observation posts between Leven's building and the gate."),
          n("Maren spends the eleven days on something none of this is: the text she is planning to leave in the fourth-level reading room. She writes and revises in the workspace, the Spire visible through the window across the rooflines. You find her there before dawn on the third day. She shows you what she has written."),
          d("MAREN", "left", "quiet", "If a practitioner at the right stage reads this, it will be recognizable. If someone else reads it, it is an unusual notation system with no interpretable content."),
          d("KAEL", "right", "neutral", "It looks like the settlement wall sections."),
          d("MAREN", "left", "quiet", "It is an extension of them. A practitioner who passes through the Spire's sequence will reach the stage where this is readable at the exact point the sequence is designed to create dependence. They will find the text and they will not need the Spire to continue."),
          n("She says this without drama. It is the plainest thing she has ever said."),
        ],
        null,
        { relationships: { maren: 12, dorath: 6, serath: 4 } }
      ),
      op(
        "Wait and observe one full intake cycle first. See who arrives and how they're processed.",
        "OBSERVE_CYCLE",
        [
          n("Eleven days pass. Intake day. From a position Dorath established on the second building east of the gate road, you watch the morning's arrivals. Nineteen individuals in groups of two and three, each met by an escort with the blue ledger."),
          n("One arrival stands out: a woman traveling alone, older, arriving at the exact midpoint of the window. The escort who meets her does not carry the blue ledger. She is taken directly to the Spire's side entrance, inside in under three minutes."),
          d("DORATH", "left", "thoughtful", "A different category. Someone expected. Not standard intake."),
          d("SERATH", "left", "neutral", "A return, not a new arrival."),
          n("Nobody speaks the next thought. They all think it. The next intake window is in three weeks."),
        ],
        null,
        { relationships: { dorath: 8, serath: 6, maren: -3 } }
      ),
      op(
        "Ask Pellard who is currently on the fourth level — the lamp signal.",
        "ASK_PELLARD_LAMP",
        [
          d("KAEL", "right", "neutral", "The fourth-level reading room. Who has access currently."),
          d("PELLARD", "left", "neutral", "Senior residents and two long-term scholars. And one other — a resident placed six months ago who was moved to fourth-level access unusually rapidly. Standard progression: three months to first level, twelve months to fourth. This resident: six months, first to fourth."),
          d("SERATH", "left", "neutral", "What's unusual about the pace."),
          d("PELLARD", "left", "neutral", "Someone who arrived already complete and was integrated rather than sequenced. The intake staff noticed. Nobody said anything."),
          d("MAREN", "left", "thoughtful", "A completed practitioner. Inside."),
          n("The lamp on the fourth level. The notation pattern. Someone complete, inside the Spire, making themselves visible at the window every evening. Looking at whatever is opposite. Looking at this building."),
        ],
        null,
        { relationships: { pellard: 8, maren: 8, serath: 6 } }
      ),
    ]),

    n("The meeting with Pellard ends. He leaves through the connecting door and does not say when he will be available again. The city around the cloth shop is the same city it always was — recorded, observed, traffic feeding into ledgers feeding into the Spire's registry."),

    n("Back at Leven's rooms by midday. Brek is in the workspace at the window, exactly where you left him. He does not turn when you enter."),

    d("BREK", "left", "urgent", "Something in this room was moved while we were gone."),

    n("Not everything. Nothing is missing. The packs are where they were placed. The document case is latched and seated. Maren's workspace materials are in the same configuration as this morning. But they are in the wrong order. A difference of perhaps three centimeters in the position of the top sheet. The second sheet rotated very slightly. The notation folded when placed back, and the fold line is not in the same place as Maren's fold, which is consistent every time. You know her fold. This is not it."),

    d("MAREN", "left", "quiet", "Someone read this."),

    d("BREK", "left", "thoughtful", "Probably read it. Maybe copied it. They had at least two hours."),

    d("MAREN", "left", "quiet", "If they read it, they could not have understood it without the context of the prior stages. It is not decodable in isolation."),

    d("KAEL", "right", "neutral", "But someone knows this notation exists. Knows that something in this room is worth reading."),

    n("Dorath takes the key from her pocket and looks at it."),

    dn("DORATH", "left", "quiet", "This room is no longer secure. We move today."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 4 — "The Fracture"
  // Arc 4 complete. Orin confirmed. Group moves safe houses.
  // Choice: keep Orin close, release him west, or use him as misdirection.
  // Cliffhanger: Eran's message — Voss arrived at the Spire yesterday. In person.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The second safe house is smaller. Two rooms instead of four, accessed through the tanners' quarter, which smells of work and is populated by people with too much of their own to notice others. Leven knew about this location and provided the key without being asked. She maintains multiple locations as a standard measure. You decide not to ask how many.",
      BG.act2_city_alley
    ),

    n("Orin is not here. He has not been here since the move. Maren asked him to remain in the previous location until she had spoken with Dorath and with you — the instruction delivered with enough directness that Orin understood it was not a suggestion. He complied. You are discussing what to do with that compliance now."),

    d("MAREN", "left", "neutral", "What he shared with whoever accessed the room: the notation materials. Their existence, their approximate content as he understood it, and the staging notes Serath had left in the workspace."),

    d("SERATH", "left", "neutral", "He doesn't have the architectural context. The notation without the prior stages is not interpretable."),

    d("MAREN", "left", "neutral", "Correct. But the person he shared with may have more context than we're assuming."),

    d("RYN", "left", "quiet", "He joined us at week five. The counting station report — our group is the third pattern on this road — he was part of the third report. His presence is logged in the Spire's movement registry."),

    d("MAREN", "left", "neutral", "Which means any inquiry from the Spire about our group starts with a count of seven, and anyone analyzing the count knows roughly when we were on the road."),

    d("BREK", "left", "thoughtful", "Does the count include his contact."),

    dn("DORATH", "left", "neutral", "No. The contact was outside the group."),

    n("Orin is in the previous location, waiting for a decision. He is not hostile — he is frightened, which is a different and in some ways harder thing. He made a decision he could not reverse, for reasons he hasn't fully explained and may not fully understand. The group needs to decide what his presence or absence means for what remains."),

    n("Three options have been named. No one has advocated fully for any of them. Maren has been waiting for you to say which direction."),

    ch("EPOCH2_4_ORIN", [
      op(
        "Keep him close. He knows too much to be released and he is not an enemy.",
        "KEEP_ORIN",
        [
          n("Orin comes to the second safe house. He says little. He contributes to the operational work competently but carefully — he knows he is under observation, and he is performing trustworthiness. You note this to Maren."),
          d("MAREN", "left", "thoughtful", "He is performing it because he cannot yet demonstrate it. That is not nothing. It is a beginning."),
          d("KAEL", "right", "neutral", "How long before performance becomes actual."),
          d("MAREN", "left", "thoughtful", "Depends on whether he is given opportunities to choose correctly under real conditions. Keeping him close creates those opportunities."),
          n("Three days later, one arrives: Orin sees something in the alley below that the others have missed — a mark he recognizes from his contact's network. He reports it immediately. He does not know what to do with the information, but he brings it forward without hesitation."),
          dn("DORATH", "left", "thoughtful", "He flagged it before I saw it."),
          n("She says this without elaboration. It is enough."),
        ],
        null,
        { relationships: { orin: 12, maren: 6, dorath: -3 } }
      ),
      op(
        "Release him. Give him a direction that takes him west and out of the operation.",
        "RELEASE_ORIN",
        [
          n("Maren delivers the decision. Orin receives it with the controlled expression of someone who had been calculating this outcome. He asks two questions: whether he will be watched on the road west, and whether there is anything he can do to be useful in the departure. Maren answers both with 'no.'"),
          n("He leaves through the tanners' quarter the following morning. Dorath watches the route for forty minutes after. He does not double back."),
          dn("DORATH", "left", "neutral", "Clean."),
          d("MAREN", "left", "neutral", "For now."),
          n("For now stays with the group. Orin is west. The operation is six instead of seven. The contact he used knows approximately where you are and when. The operation continues."),
        ],
        null,
        { relationships: { dorath: 8, maren: 4, orin: -8 } }
      ),
      op(
        "Use him as misdirection. His contact expects continued information — give them a version that is real enough to be credible.",
        "REDIRECT_ORIN",
        [
          d("SERATH", "left", "neutral", "I've done this. It requires the person feeding the misdirection to believe they're feeding accurate information — meaning he doesn't know what's real and what we've adjusted."),
          d("KAEL", "right", "neutral", "We give him accurate information about things that don't matter, controlled information about things that do."),
          d("SERATH", "left", "neutral", "His contact gets something real and something shaped. They trust the real and act on the shaped."),
          dn("DORATH", "left", "neutral", "I've run this. It is hard to maintain and requires Orin to cooperate without knowing the full shape of his cooperation."),
          d("MAREN", "left", "neutral", "He will cooperate if he believes it is what keeps him useful. He wants to be useful. That is the clearest thing about him."),
          n("Orin is brought in. The plan is explained in partial form. He listens carefully and agrees with the expression of someone who understands they have been given the version they can handle."),
        ],
        null,
        { relationships: { serath: 10, dorath: 6, orin: 4, maren: 3 } }
      ),
    ]),

    n("Three days after the Orin decision, Eran arrives at the tanners' quarter. He has been outside the city since the move, watching the road approaches. He returns through a route that takes forty minutes longer than the direct path. He sits down at the table and places a folded paper in the center of it."),

    d("ERAN", "left", "neutral", "Voss. Not a contact, not a representative. The name in Dorath's registry is real and the person it refers to arrived at the Spire yesterday. On-site."),

    n("The room is very quiet."),

    d("SERATH", "left", "neutral", "Voss is here."),

    d("ERAN", "left", "neutral", "Fourth generation. The architect of the intake framework. The person whose instructions produced the controlled-access reading room structure. Arrived yesterday."),

    d("MAREN", "left", "quiet", "Why now."),

    d("ERAN", "left", "neutral", "The movement registry shows a group of practitioners on the eastern road — category four, three consecutive station reports. They arrived in the city and entered through the standard gate."),

    dn("DORATH", "left", "neutral", "They tracked us to the gate. What happened after is a question of whether the observation infrastructure inside the city is better than my operational discipline. It isn't. We're clean inside the city."),

    d("ERAN", "left", "neutral", "Voss doesn't know you're here. They know a group of practitioners arrived. The intake window is in eight days. Voss will be present for intake — standard practice for the fourth-generation head when on-site."),

    n("Present for the intake. The intake that contains the entry window. Voss will be in the Spire during the operation."),

    d("MAREN", "left", "quiet", "Then we are operating inside Voss's institution, in Voss's presence, against a system Voss designed."),

    n("She says it without inflection. Statement, not question. And then:"),

    d("MAREN", "left", "thoughtful", "Good. Then when it works, there will be no ambiguity about what happened."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 5 — "The Seed Method"
  // Arc 5 complete. Dorath has the intake registry. Voss's real name confirmed.
  // Fourth-level map obtained. Maren's plan fully revealed.
  // Choice: accept Maren's seeding plan, or propose something more aggressive.
  // Cliffhanger: entry window is 48 hours. Second cohort arrives in 46.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "Dorath spent fourteen hours inside the Spire. She entered with the supplementary intake group — smaller, less scrutinized than the main intake. She carried what she always carries when she needs to be unremarkable: the specific weight and arrangement of a person who belongs where they are, which cannot be faked and can only be practiced until it is no longer performance.",
      BG.act2_city_contact
    ),

    n("She returned to the tanners' quarter at the twenty-third hour. She set three items on the table: a notebook, a folded document, and a small piece of cloth with a mark on it that she explained had been placed on her coat lapel by a person arranging books on a shelf who was, in fact, assessing new arrivals."),

    n("The notebook held what she remembered from four hours in the open-access reading room. The folded document was a hand-transcribed copy of the intake registry from the intake coordinator's desk, obtained during nine minutes of unobserved access."),

    dn("DORATH", "left", "neutral", "Sixty-three residents currently. The intake coordinator on duty managed my entry to the third level. I have her schedule for the next two weeks."),

    d("MAREN", "left", "neutral", "The name at the top of the registry."),

    dn("DORATH", "left", "neutral", "The administrator is listed under an institutional title. But the header notation — the encoding indicating responsible authority — uses a personal name in archive notation format."),

    d("KAEL", "right", "neutral", "Voss."),

    dn("DORATH", "left", "neutral", "Tavren Voss. Senior authority, fourth-generation head. The name traces to a specific archive lineage — I checked it against the deep records we carried out of the settlement. The first-generation Voss: a preservation scholar, two hundred years ago, who developed a theory of knowledge control that the Vraen practitioners explicitly rejected. The fourth generation has been implementing the theory."),

    n("The cloth mark, Eran says, is a signal from the person in the reading room — the completed practitioner who has been signaling from the fourth level. He knows this mark. He put it into the network twelve years ago."),

    d("ERAN", "left", "thoughtful", "It was used twice before today. Someone who received it from me, or from the network I seeded it through. The number of people who could carry it forward to today is small."),

    d("MAREN", "left", "neutral", "Eran. How long have you been building toward this specific operation."),

    d("ERAN", "left", "thoughtful", "The notation: twelve years ago. Eastern district preparation: four months ago. The network covering your route from the settlement: eighteen months. The person on the fourth level was guided toward the Spire three years ago."),

    n("Maren does not speak. Everyone is doing the same calculation at roughly the same moment."),

    d("SERATH", "left", "neutral", "You arranged this."),

    d("ERAN", "left", "thoughtful", "I arranged the conditions that made this possible. What you do inside those conditions is your decision. I have never told any of you what to do."),

    ch("EPOCH2_5_PLAN", [
      op(
        "Maren's plan. Seed the completed method text in the fourth-level reading room. Remove the Spire's terminal control without destroying the institution.",
        "SEED_PLAN",
        [
          d("MAREN", "left", "thoughtful", "The text I have prepared is placed in the reading room among the standard collection. Not hidden — present, available, readable by anyone who reaches the fourth level. Practitioners who advance through the Spire's sequence will reach the stage where the text becomes recognizable at the same point the sequence is designed to create dependence. They will find the completion path and not need what the sequence tells them they need."),
          d("KAEL", "right", "neutral", "The Spire continues. It just stops working."),
          d("MAREN", "left", "thoughtful", "It stops controlling. It continues existing. That is important. Voss built this building using the method's architectural logic. The collection it holds is genuine — possibly the most complete collection outside what we carry. The building should survive."),
          d("SERATH", "left", "neutral", "And Voss."),
          d("MAREN", "left", "thoughtful", "Voss is not our problem to solve. A theory that stops working is its own refutation."),
          n("This is Maren's full plan, stated plainly. It is the plan she has been building since the Archive burned, possibly before. It is not small."),
        ],
        null,
        { relationships: { maren: 15, serath: 6, eran: 8 } }
      ),
      op(
        "The plan is right but the fourth-level contact should know — they can maintain the seeded text after we leave.",
        "EXPAND_PLAN",
        [
          d("KAEL", "right", "neutral", "The fourth-level contact needs to know. Without a custodian, the text can be found and removed."),
          d("MAREN", "left", "thoughtful", "The risk of contact is significant."),
          d("KAEL", "right", "neutral", "The risk of leaving the text unprotected is that it disappears."),
          n("Maren considers this for longer than her usual consideration."),
          d("MAREN", "left", "thoughtful", "The contact has been signaling for weeks. They placed the mark on Dorath's lapel. They are already part of this."),
          d("ERAN", "left", "thoughtful", "A coordination signal through the cloth network. I can establish the contact window for the morning before entry."),
          d("MAREN", "left", "neutral", "Do it."),
          n("The revision makes the plan more complex and more durable at once. Maren does not say she was wrong not to have included it originally."),
        ],
        null,
        { relationships: { maren: 10, eran: 12, dorath: 5 } }
      ),
      op(
        "Ask Eran directly: who is on the fourth level. This is someone you placed there twelve years in the making.",
        "IDENTIFY_CONTACT",
        [
          d("KAEL", "right", "neutral", "The person on the fourth level. You placed them there. You know who they are."),
          d("ERAN", "left", "thoughtful", "Yes."),
          d("KAEL", "right", "neutral", "Tell us."),
          n("Eran looks at the cloth mark. Then at Maren. Then at you."),
          d("ERAN", "left", "thoughtful", "Someone who completed the method eight years ago in conditions that did not include guidance, did not include the Archive, and did not include the fragments. They arrived at completion independently. I found them in my second year of preparation and understood immediately that they were already where we needed someone to be — if we could help them reach the Spire."),
          d("MAREN", "left", "quiet", "Another completed practitioner. Not one I knew."),
          d("ERAN", "left", "thoughtful", "There are more than the Archive recorded. That is also something this operation will eventually demonstrate."),
          n("Something in Maren's face shifts — not relief, not recognition. Closer to a recalibration she didn't know she needed until the data arrived."),
        ],
        null,
        { relationships: { eran: 10, maren: 8, serath: 4 } }
      ),
    ]),

    n("The plan is set. Maren has been writing and revising for three days. The text is ready. The fourth-level map shows the reading room location. Dorath has the entry route."),

    n("Eran comes to the room at the eighteenth hour of the final preparation day."),

    d("ERAN", "left", "urgent", "The entry window is in forty-eight hours."),

    d("MAREN", "left", "neutral", "I know."),

    d("ERAN", "left", "urgent", "The second cohort arrives in forty-six."),

    n("The room is quiet."),

    d("DORATH", "left", "neutral", "Define second cohort."),

    d("ERAN", "left", "urgent", "An arrival group — twenty-three individuals. Not standard intake. Expected arrivals, pre-arranged, admitted directly. Voss arranged this before leaving the capital. They will arrive while you are inside."),

    d("SERATH", "left", "neutral", "Practitioners."),

    d("ERAN", "left", "neutral", "Advanced, by the registry category. Unknown whether complete. They will arrive while you are inside the Spire, during the highest observation state the gate runs."),

    d("MAREN", "left", "neutral", "Then we operate while they are arriving."),

    dn("DORATH", "left", "neutral", "Maren. The gate will be in full intake configuration for twenty-three expected arrivals."),

    d("MAREN", "left", "neutral", "Yes."),

    d("MAREN", "left", "quiet", "The text is ready. The window is the window. We were not given a window without complication."),

    n("She says this without bravado. As a statement of available facts."),

    d("MAREN", "left", "quiet", "Get some sleep."),
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // EPOCH 6 — "What the Spire Holds"
  // Arc 6 complete. Entry done. Text placed. Departure begins.
  // Maren confirms Sira's 14th stage was correct.
  // Choice: observe the second cohort's arrival one more day, or leave at dawn.
  // Cliffhanger: Tal's revelation — the Unnamed Third, completed before any of them. Moving west.
  // ═══════════════════════════════════════════════════════════════════════════
  [
    nb(
      "The entry took four hours and seventeen minutes. Forty-seven minutes longer than projected, which Dorath attributes to a third-level routing change implemented two days prior that Pellard had not been able to anticipate. Maren attributes the delay to a conversation that could not be avoided. She does not say what the conversation was or who it was with.",
      BG.act2_spire_exterior
    ),

    n("Everyone came out. This is the thing you hold first, before anything else. The four-person entry team — Maren, Dorath, Serath, and you — came out through the secondary exit into the alley, as planned, into the grey of early afternoon with the second cohort arriving at the main gate forty meters away. You walked through the alley into the tanners' quarter and into the second safe house and Brek looked at each face and said nothing and put food on the table."),

    n("Ryn sat down beside Maren and asked one question."),

    d("RYN", "left", "quiet", "Is it placed?"),

    d("MAREN", "left", "neutral", "It is placed."),

    n("Ryn nodded and did not ask more."),

    d("SERATH", "left", "neutral", "The fourth-level contact."),

    d("MAREN", "left", "neutral", "They know where it is. They know what it is. They will not draw attention to it."),

    d("SERATH", "left", "neutral", "The conversation. The forty-seven minutes."),

    n("Maren looks at him. The pause of someone deciding how much of an accurate thing to say."),

    d("MAREN", "left", "quiet", "The contact completed the method eight years ago in conditions that did not include guidance or institutional context. What they showed me was that the method is more robust than I had calculated. It is accessible from a wider entry point than the Archive believed. It does not require what the Archive told practitioners it required."),

    n("A pause."),

    d("MAREN", "left", "quiet", "That conversation took forty-seven minutes. It was worth the time."),

    n("Dorath is already looking at exit routes. The operation is done and the next phase is departure, and Dorath has been preparing departure for three days the same way she prepares everything: without announcement, without completion until the thing is ready, and then presenting it as if preparation was the only reasonable response to an obvious fact."),

    n("Sira has been waiting in the second safe house since the night before entry. She did not go in — that was not her function. When the team returned, she stood from the workspace window and looked at Maren."),

    d("MAREN", "left", "quiet", "Your fourteenth stage. The notation sequence you developed alone, before the Archive burned."),

    d("SIRA", "left", "thoughtful", "Yes."),

    d("MAREN", "left", "quiet", "It was correct. The contact inside has a notation development that extends from the same base, independently. You arrived at the same refinement through separate paths."),

    n("Sira is very still. You watch her absorb this — the confirmation of something she had believed in isolation for years, without the ability to verify it, because verification requires a second person and she had not had one."),

    d("SIRA", "left", "quiet", "I thought I might have made an error. I checked it against the fragments many times."),

    d("MAREN", "left", "quiet", "You didn't. The fragments are incomplete in that section. You extended them correctly."),

    n("Something in Sira's face moves. A small resolution — the expression of a question that stops generating sub-questions. She looks back at the window. The Spire is still visible. The second cohort is still arriving."),

    n("The departure question comes in the evening."),

    ch("EPOCH2_6_DEPART", [
      op(
        "Leave at dawn. The operation is complete and every additional day in the city is unnecessary risk.",
        "LEAVE_DAWN",
        [
          dn("DORATH", "left", "neutral", "Departure through the tanners' quarter to the west gate. Standard merchant exit — we match the registry count. No deviation from the gate procedure."),
          n("Dawn comes with the stone-deep cold of a city in autumn. The group moves through the tanners' quarter with the unhurried consistency Dorath trained into them over weeks of movement rehearsal. The west gate processes them in six minutes. The gate agent records the departure. The road opens west."),
          n("The city recedes. The Spire's upper levels are visible for forty minutes above the rooflines, catching the morning light at an angle that makes the different-quality stone visible. Then the city's edge, and the road, and the particular quality of open air that is different from the air inside a place where everyone is being counted."),
          d("MAREN", "left", "quiet", "West."),
        ],
        null,
        { relationships: { dorath: 10, maren: 8, serath: 4 } }
      ),
      op(
        "One more day. Observe the second cohort's integration — what Voss does with twenty-three practitioners tells you something about the fourth generation's current capacity.",
        "ONE_MORE_DAY",
        [
          n("Brek manages the observation from the tanners' quarter rooftop — not the Spire directly, but street-level arrival traffic, movement patterns of the city's recording infrastructure, the acceleration of gate activity. One day from a position not previously used."),
          n("What he brings back: the second cohort was not processed through standard intake. They were admitted through the side entrance — the same entry used for the expected practitioner observed weeks earlier. Not new arrivals to be sequenced. Known individuals being received."),
          d("BREK", "left", "thoughtful", "Twenty-three practitioners. Known to Voss. Received, not enrolled. The Spire is consolidating."),
          d("SERATH", "left", "neutral", "Accelerating the institutional phase. Something moved their timeline."),
          d("ERAN", "left", "thoughtful", "Or someone arrived. Someone that Voss wanted present before consolidation."),
          n("The last day yields the thing that departure without it would not have. You carry it west in the morning."),
        ],
        null,
        { relationships: { brek: 10, serath: 8, eran: 6, dorath: -3 } }
      ),
      op(
        "Ask the fourth-level contact to signal what they observed during the second cohort's arrival.",
        "SIGNAL_CONTACT",
        [
          n("The signal goes through the cloth notation Eran established. The response comes back in three hours — a longer sequence than the four-step lamp pattern, transmitted through an intermediary Eran does not fully explain."),
          d("ERAN", "left", "thoughtful", "The contact confirms the second cohort was admitted. And reports that Voss, before the cohort arrived, spent two hours in the fourth-level reading room. Alone."),
          n("The room is silent."),
          d("SERATH", "left", "neutral", "Voss was in the reading room."),
          d("MAREN", "left", "quiet", "In the four hours between our departure and the cohort's arrival."),
          dn("DORATH", "left", "neutral", "Did they find it."),
          d("ERAN", "left", "thoughtful", "The contact's notation for 'visible': the text is placed, available, visible to anyone who looks at that section. Voss would have looked at that section."),
          d("MAREN", "left", "thoughtful", "Voss read what I wrote."),
          n("The weight of this is different from the weight of anything else this operation has produced. The thing placed is now real in a way it was not before, because the person it was designed to counter has encountered it."),
        ],
        null,
        { relationships: { maren: 12, eran: 10, serath: 6 } }
      ),
    ]),

    nb(
      "The western road is known road — you have been on it. The direction of travel is different and it renders the familiar unfamiliar, which is something you have encountered before in the method and recognize now in movement: the same path traveled with different attention is a different path.",
      BG.act2_eastern_road
    ),

    n("Eran walks with the group for three days west. On the third morning, before the group wakes, he is gone — pack, bedroll, all of it. A note on the ground where his pack was, in the notation style he uses for important information:"),

    n("Three lines. You are reading them when Gavrick crouches beside you and reads them also."),

    d("GAVRICK", "left", "thoughtful", "He says the fourth-level contact will expand the seeded text. He says the movement registry has already processed your departure. He says: there is something west that you will reach before you expect to."),

    d("KAEL", "right", "neutral", "Something west."),

    d("GAVRICK", "left", "thoughtful", "He doesn't say what. He says it will find you. That is his formulation for things he knows are real but cannot be usefully described in advance."),

    n("Eran departing is not surprising — he arrived when he was needed and is now elsewhere. What he does has a shape you understand. What stays is the group: Maren, Dorath, Serath, Ryn, Brek, Sira, Gavrick, you."),

    n("Gavrick departs two days later at a road fork, with a formality characteristic of him — a clear statement of departure, a handshake with Brek, a nod to Maren, a specific long look at you that carries something he has not put into words."),

    d("GAVRICK", "left", "quiet", "What the Archive held — what Maren carries, what all of you carry — I spent four years watching from two hundred meters on the road, not knowing if I was watching something real or watching people who believed something real. I know now."),

    n("He does not say what he knows. He walks west on the other fork."),

    n("Six days west of the city, the group reaches a wayfarers' shelter used by the eastern trade routes. Occupied by a single traveler: Tal."),

    n("Tal, who left the original settlement six weeks before the group did. Tal, who is here — at this specific shelter, which is on the road west from the eastern city but is also the road north from the Archive's ruins."),

    d("TAL", "left", "neutral", "Maren. I need to tell you something I've been holding for four months. I held it because I wasn't certain it was relevant. I'm certain now."),

    d("MAREN", "left", "neutral", "Tell me."),

    d("TAL", "left", "neutral", "The contact network I was part of before I came east — Eran's network. There is a name in it that none of the rest of you know. Someone who was in the network before Eran built it. Someone the network was built around, in the sense that the network's structure exists because this person needed to be protected and connected and eventually found."),

    n("She pauses. She is not building to drama. She is building to accuracy."),

    d("TAL", "left", "neutral", "They are called the Unnamed Third in the network's internal notation. Third because they completed the method third — after the original archivist, after a practitioner two centuries later. Before Maren. Before any of you. They completed it alone, with no institutional context, and disappeared from any record for sixty years. And then they were in the eastern district, four months ago, and Eran asked me to come east because the Unnamed Third was moving. West."),

    d("MAREN", "left", "quiet", "West."),

    d("TAL", "left", "neutral", "Toward the Archive ruins. They have been moving toward the Archive ruins for four months. At a pace that suggests they know something about what is there — something not in any record I have found."),

    n("The shelter is quiet. The road outside runs north and south. The Archive ruins are four days north."),

    n("Maren looks at the road. Then at you."),

    d("MAREN", "left", "neutral", "North."),
  ],

]

// ─────────────────────────────────────────────────────────────────────────────
// Act resolver
// ─────────────────────────────────────────────────────────────────────────────

export function getActEpochs(actId) {
  const map = { act1: ACT1_EPOCHS, act2: ACT2_EPOCHS }
  return map[actId] || ACT1_EPOCHS
}
