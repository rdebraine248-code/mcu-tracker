# Chain of custody: who really has it at the end of each step

The app (a Marvel watch tracker) keeps the Collection: one file per object, following it title by title. Each step is
[sentence, exact title, status, holder]; status and holder describe the object at the END of the step (COLL_FORMAT.md, in this folder).
The owner found this: Loki's scepter ended The Avengers as "In use / Natasha Romanoff", because she was the last one shown touching it. It
read as if she kept it. In fact S.H.I.E.L.D. took it after the battle, and Avengers: Endgame shows HYDRA agents inside S.H.I.E.L.D. carrying it
off in 2012, which is how Strucker has it in The Winter Soldier. That Endgame step sat at the end of the file instead of in its 2012 place.
It is fixed now (see "scepter" in coll_mcu_a.json): it starts with Loki, who wields it, then passes to S.H.I.E.L.D. in the same title.
Find every case like it.

Check every object's chain, step by step:
1. End state, not last touch. The holder is who has the object when the step's events are over, not whoever last used it. A suit someone
   takes off and leaves, a gift laid on a grave, a weapon thrown away, a device handed over: the holder follows the object. If the title
   never shows where it went and no later title says, keep the last one shown only if they plausibly still have it; otherwise "Nobody" with
   status "Lost". Example found already: st-paper-rose, Frank "lays it on Lisa's grave", but the holder says Frank Castle.
2. Status fits the holder: "In use" means wielded, worn, carried, running, flown. "Secured" means kept safe or locked away. A named person
   actively carrying it is not "Secured"; "Lost" or "Destroyed" with a named holder is a contradiction (use "Nobody").
3. Continuity. Step N's holder must be who has it when step N+1 begins. If it jumps (A, then suddenly B) find the title that shows the handover.
   If that title's step is missing, add it; if it exists but is out of place, move it.
4. In-universe order. Steps follow the object's own story: a flashback or a trip to the past sits where those events happen, as with the
   scepter's 2012 step. Exception: Endgame's Time Heist steps for the Infinity Stones, which branch off the main line and lead into Loki's
   TVA story, stay at the end. Real flashbacks are fine as steps; visions, dreams and illusions are not.
5. The first holder matters. When an object changes hands inside a title, that title gets a step for each holder (one step per title UNLESS the
   status or holder changes inside it). Who wields it first is often the biggest fact about it (Loki with his scepter): never skip straight to
   where it ends up. Don't split for trivial touches (someone picks it up for a moment); split for real owners and keepers.
6. Only what the titles show, spoiler-safe naming (a group's secret, like HYDRA inside S.H.I.E.L.D., only from the title that reveals it).

Look facts up when you are not sure (Wikipedia: curl -s "https://en.wikipedia.org/w/index.php?title=<Page>&action=raw", pause ~1 s between
requests; and web search). Do not guess: the owner checks.

Keep the rules: exact titles from ../next/alltitles.json; one sentence per step, max ~130 characters, present tense; one step per title unless
the status or holder changes inside it; multi-season shows one step per season ("In season N,"); no em or en dashes; ids unchanged; today is
2026-10-24 (skip unreleased titles; VisionQuest has aired episodes 1 to 4).

Edit your files in place, keeping their format (JSON array, indent 1, ensure_ascii False). Do NOT leave backup copies in this folder: put any
backup in ./custody_bak/. Validate after (titles exact, statuses allowed, holder non-empty, no dashes, ids unchanged).
Report: every change as id / step / old / new / why (one line each), and what you doubted but left.
