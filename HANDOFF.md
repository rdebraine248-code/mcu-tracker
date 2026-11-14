# MCU Tracker: handoff

A Marvel watch tracker, built as a single-file PWA (a "S.H.I.E.L.D. datapad"). This page is everything a new chat needs to pick up the
work. **Read all of it before changing anything, above all "Standing rules from the owner" and "Mistakes not to repeat".**

## Starting a new chat

The owner uploads this file (`HANDOFF.md`) to the new chat; nothing needs pasting. **To the new chat:** this one file is the whole
handoff. Work on the GitHub repo `rdebraine248-code/mcu-tracker`, branch `ccr-5d4aa1b8-sj0vmn` (check it out; it is the source, main
is the built app). Read it in full before changing anything, above all "Standing rules from the owner" and "Mistakes not to repeat".
Ask the owner with options when something is theirs to decide or you're unsure. **Never push to main without the owner's explicit
"push".** If the uploaded copy and the repo's differ, the repo's copy on the working branch is newer.
There is only this one handoff file (owner, 5 November 2026, option 1: the second copy, `MCU_Tracker_Handoff.md`, duplicated it and
had to be edited twice; it's gone, and its checklist is below). Don't make another copy.

## Where things stand (12 November 2026)

- **main is at `c0e0886`** and matches the working branch's build exactly. **Nothing is waiting on "push".** Full suite: 40 of 40
  (`mockup-data/tools/suite.sh <logname>`, logs to `$LOGDIR` or /tmp; it runs check, smoke, feat, ct32, ct36, ct37b, ct38 to ct66,
  ct35, content and swtest; ct67 and ct68 added 13 November 2026).
- **Build everything:** `bash mockup-data/tools/rebuild.sh "note for the test build"` (main build with the Network and Earth map put in,
  the Network rebuild in `network/src/prof`, the test build, the split `out/mainroot`). Then the suite, then (only on the owner's
  "push") the main push in "Build and push" below. `mockup-data/tools/lastgroup.js` dumps every file's runtime groups and steps (used to
  compare a file's last group with the Network's).
- **The test build:** https://claude.ai/artifact/LJbjs1D5nCM5BCKhqKdv4s (v191; republish `out/datapad-test.html` after any rebuild).
  It is main plus the parked mockups (the Time Machine, landscape stage 1) and the six Stones handed out (`MOCKUP BEGIN snapstones`).
- **The working branch** is `ccr-5d4aa1b8-sj0vmn` (source); mirrors `ccr-537d906a-oxzbql` and `claude/gracious-cray-lhdt2k`, pushed
  with it. After a main push: `git merge -s ours origin/main`, push all three.
- **What the last chats did (9 to 12 November 2026), all on main:**
  - The left-out characters in every universe (Sacred Timeline 514 files, the other universes 338, the film people under credited
    names 49), each drafted from transcripts and wiki pages and fact-checked by a second pass, then the owner's one-episode cut (131
    out). Briefs, scripts and every batch's checked file are in `mockup-data/unfiled/` (merge.py, validate.py, DRAFT/CHECK briefs,
    chk*.json, cut.json, filmnames/, oneepisode/, oneepisode_other/). merge.py rebuilds the q "unfiled" adds from the chk files.
  - VisionQuest in full through episode 8 (files, logs, Atlas, Network): `mockup-data/unfiled/visionquest/`.
  - Group fixes: dying at the turn keeps the group (`TURN_KEEP`), a past scene in a later title doesn't move anyone (`PAST_VISIT` in
    index.html, `split.json` "past" for the Network; ct66).
- **Found 12 November 2026 (new chat), on main `3cb8065` (13 November 2026, the owner's "Push"):** main `7e792af` lost VisionQuest's finale
  for three new files. Virgil Horton reads "The Client", Independent, with his episode 7 steps. Jocasta and Paladin also stop at
  episode 7, and Paladin's kind line is the old one. Cause: `7e792af`'s commit reran `unfiled/merge.py`, which re-appends its "unfiled" adds
  at the end of `answers_fix.json`, so VisionQuest's `q "vq"` edits to those files came before the files existed and the build
  skipped them (the 7 "answers: no file" lines no one read), and it rewrote their `ep_tags.json` entries back to the episode-7 ones.
  Fixed: devbuild applies `answers_fix` adds before edits; merge.py leaves the tags of a file a later op rewrites alone; the three
  tags are back as `af463e9` had them; Roxy Glass's Deke Squad stage is fixed in `chk08.json` too (it was only in answers_fix, so a
  rerun reverted it); `tools/rebuild.sh` now stops on any "no step", "no file" or "dup" line. Checked: the seven VisionQuest-touched
  new files equal `45d7459`'s exactly; nothing else in the files changed; in the Network only Virgil Horton, Jocasta and Paladin
  changed (plus the room's layout, as S.W.O.R.D. gains a member); merge.py now reruns with no change to anything. Full suite 38
  of 38 on the fixed build (12.5 minutes); test build v192.
- **Open with the owner (don't act without a yes):**
  - **The Civil War, a Network egg (test build v221; hub-src's `civilWar`, the owner's idea, 14 November 2026).** Hold the names on Tony
    and Steve's card (How they're connected): the card goes, and everyone you've met in the Sacred Timeline crosses the floor; Steve and
    Tony face off in front, the Leipzig airport teams line up behind them (Cap: Bucky, Sam, Wanda, Clint, Scott, Sharon; Iron Man:
    Natasha, Rhodey, T'Challa, Vision, Peter, Thaddeus and Everett Ross), Zemo alone behind the gap, everyone else on a side at random
    in the two crowds; blue and red, "Team Cap · Civil War · Team Iron Man" across the top; no group bubbles or names while it plays
    (`CW`). Then (owner: "the supporting ... as a semi circle half back around the main person ... Zemo is too close and looks like a
    referee ... Have this page be stagnant ... so I can scroll and see whos on what team ... then touching ... activates the 2nd half of
    the egg with a big finish"): each team in a half circle behind its leader; Zemo far back in a dark pool, dimmed; the stand-off holds
    while you pan and pinch; a tap plays the finish (`cwFight`): Steve and Tony clash, Scott grows into Giant-Man, Wanda's red throws three
    of the other side back, Vision cuts his line, Peter webs Steve's shield, then both crowds charge and fight all over the room, and
    everyone goes home. That finish was rejected ("the supporting character fight looks awful. the ensemble fight is a mess and is not
    an even spaced out well staged single red v blue sea ... it blinks into their original color"); now (test build v214): the airport
    duels as the people themselves, each pair circling with small sparks where blows land (`CW_DUEL`: Steve and Tony, Bucky and T'Challa,
    Sam and Rhodey, Clint and Natasha, Wanda and Vision with red and gold glows, Scott growing into Giant-Man via `CW.size` until Peter
    brings him down); then one even sea (`cwSea`): everyone in blue-and-red pairs on a honeycomb, each pair trading blows; then home
    (`cwEnd`): each walks back from where they stood, colour easing to their group's (`cwHome`), zoom held unfolded so no one jumps into
    a bubble, and the floor's names and Earths fade back in once all are home (`cwFade`).
    Then (owner: "SC, ER, and TR aren't doing anything ... support fight starts then ensemble fight starts. They should be evenly spaced
    out ... like a staged choreographed play ... a harmonic sea of blue v red. the transition back to normal looks great"; test build
    v215): Sharon duels Everett Ross; Thaddeus Ross leads Team Iron Man's crowd (he isn't at the airport); the duels never stop, the
    crowds pour in round them; the sea is an even stage (rows 96 by 74 apart, every other row offset, the middle left to the duels),
    every pair moving in time with a ripple running outward from the middle. Then (owner: "too much like dancing than fighting ... they
    turn like ballroom dancers. their 1v1 movements need a little bit eraticness"; test build v216): no circling; each pair faces off on
    its own axis and fights on its own uneven beat (`cwJab`: every 260 to 900 ms one lunges, the other is knocked back or slips aside,
    small shifts between), the fighters stepping sharper than the room (`kFight`), a spark at each contact, none over the header.
    Then (owner, 14 November 2026; test build v217): the duels and the crowds' fight start together; Zemo steps out of the shadows to an
    empty spot just behind the duels when it starts (the sea used to close over him); the title reads "Team Cap vs Team Iron Man", as
    the film's own campaign put it (owner: "should be X vs Y").
    Then (owner: "the transition from normal network into egg is jarring ... the bubbles move into position too quickly, they should
    MOVE there not ZIIIIP there"; test build v218): the card slides away, the camera drifts slowly (`glide.ms` 1600, eased), people ease
    out of their group bubbles (`CW.unf` over 900 ms) while the floor's names and the Earths fade out, and everyone walks to their spot
    on an eased path that takes longer for a longer way (`cwMove`, 900 to 2600 ms), their colour turning from their group's to their
    side's as they go (`cwGo`); the duellists and the sea's pairs walk to their spots the same way and start fighting on arrival.
    Then (owner: "the launch ... still jumps into the animation and looks a bit off with how the card and lines disappear, when the fight
    begins they go back to their original color then back again"; test build v219): the room as it stood, card lines and all, is
    snapshotted and fades away over the live one (`#cwShot`, just over the room, under the header) while the card slides off; everyone
    holds where they stood until their walk begins; only that first walk turns their colour (`cwMove`'s `turn`), so the walks into the
    duels and the sea keep their side's colour.
    Then (owner: "the start of the egg still jumps the bubbles down relative to where they were when the popup was open"; test build
    v220): the stage is set where the camera already looks (`cx = cam.x, cy = cam.y - 40`), so the camera never moves at the start (it
    used to glide down from the card's lifted view to the two's midpoint); the pull back to see both sides starts 1.5 s in, while
    they walk; a glide given a future start no longer runs backwards (k clamped at 0). Measured: every bubble still for 700 ms.
    Then (owner: "What happens when some supporting characters havent been found yet or if there are an uneven number"; v221): it
    never starts before Civil War is watched (Steve and Tony are connected from The Avengers, so it could have spoiled it); anyone not
    met is left out and their half circle spreads evenly; a duel missing one side is dropped and the other fights in the crowd; the sea
    takes full pairs only, and anyone left over joins a pair on their own side as a third, two on one, at their teammate's shoulder.
    Checked with T'Challa and Natasha unmet: five duels, no empty cell, no one idle.
    How it starts: in the Network, Steve's card, tap Tony in his connections (How they're connected), hold the two names for a second. Built in hub-src without a mockup switch (network.html on main would carry it): a
    main push needs the owner's yes and its Agent File entry. **The egg plan:** an egg in every main file (owner: "EVERY (or most) main
    characters/bad guys/items get an index egg (even if its moving the character box ones over) then a few other supporting/minor ones
    too to make it truly secret"); tier counts by titles a file is in: 5+ titles 107 (Compound 54, Raft 10, Collection 43), 3+ 302.
    The Agent File already tracks every egg with locked rows and hints; at this size it needs a section per index.
    **The egg plan page:** https://claude.ai/artifact/MBUUmqKYw5ZLeSrAsqhNHj (picks in its `picks` collection, read with ArtifactData):
    107 ideas, tier 1 (Compound 52, Raft 5, Collection 35; 18 moved from boxes; the Tesseract stays; specimens left out) and 15 secret
    ones in minor files. Each fact-checked against the titles before listing; each kept one is mocked up before it's built.
  - **The Play page (test build, `MOCKUP BEGIN play`; owner, 13 November 2026: "a page to play as though this datapad is in universe
    ... fully interactive play place"; asked which room: "Mock them all up so I can decide what to keep/cut/improve").** A Play
    button on the test build's dock opens four rooms as tabs, each open once its title is watched: the Workshop (the Collection's
    armor you've seen, as a turning hologram: suit up, diagnostics, repulsors, flight), the Compound (incidents you've watched as
    alerts; send up to four heroes you've met; the debrief marks who really answered, from Damage Control's `who`, and shows the real
    outcome), the Bridge (four rotors, lift off once all spin, cloak, a threat scan), the TVA (the Sacred Timeline branching; prune
    with the TemPad's three charges before it breaks). Flagged to the owner: dispatch sits near the cut War Room and the banned lineup
    builder. The icons-in-the-title-row dock was tried and dropped (owner: "Do the dock as before").
  - **The 16 new eggs, a pool offered (13 November 2026), waiting on the owner's picks:** Network: Forget me (No Way Home), The
    Council (Kang's variants); Comms: Commercial break (WandaVision's ads), Trish Talk (Jessica Jones); Compound: Sweet Christmas (Luke
    Cage), The switchboard (Agent Carter), Ironheart's suit; Collection: Cerebro (X-Men), The Iron Fist, Captain Carter's shield (What
    If); Damage Control: Task force (Born Again), Maximum effort (Deadpool & Wolverine), Midland Circle (The Defenders); Raft: Plastic
    prison (X2), Smile (Kilgrave); Paths: The dance (Endgame). First four proposed: Assemble and Hello, Peter. moved, Commercial break,
    Plastic prison. Each mocked up with an MP4, every line and scene checked against its title first.
  - **Eggs: an even spread (owner, 13 November 2026).** Story holds 39 of the 64 eggs (Atlas 14, Logs 4, anywhere 3, Comms 2, Agent
    File 1, Paths 1; Network, Compound, Raft, Collection and Damage Control none); by source Infinity Saga 32, Multiverse Saga 22,
    Marvel TV 4, the Extras 4, whole MCU 2; films 46, shows 16. The goal: an even spread over pages and over sagas, films and shows.
    Rules from the owner: never put an egg inside one file or one connection ("Having like 3 eggs in an index of 600 would be
    impossible to find"); a move needs a real new home and a plan, not "move it to their file"; new eggs go to the least-represented
    pages and must be full scenes with many moving parts that tell a story (the Champions, the Hex, Black Widow), never a picture
    popping in and out. Moves decided: **Assemble to the Network** (the Avengers' group in the room) and **Hello, Peter. to the Raft**
    (its Spider-Verse tab). Stay where they are (owner): the Uni-Mind ("not a fan"), One last page ("a big fury moment"), Redacted
    ("thunderbolts through and through"), Glorious purpose ("paths aren't timelines", and the Sacred Timeline page is already
    "Loki galore"). 16 new eggs (to 80, a fifth Agent File page) "could work", in the lesser pages, high quality. The audit page
    (https://claude.ai/artifact/C3UE6Zb2qccNeG5DxF2jAX, "move into files") is superseded: don't use it.
  - **The Mind Stone egg, redesigned, on main (`6f8eba9`, 13 November 2026).** The original web kept and taken further: Ultron's red
    web spreads from the finger over the whole screen with depth (near and far points drifting with parallax, two fibres braided round
    each thread, a fainter web behind); let go too soon and Ultron wins (red, as before); held, it turns gold and every thread
    straightens into the Mind Stone's cut as a wireframe, glows, then shrinks into the finger and the Stone wakes there. Tried and cut
    on the way: a re-enactment of the lab (J.A.R.V.I.S.'s gold sphere, Ultron's blue cloud: "looks bad"), and the threads burrowing
    into the titles and the dock ("I hate the lines that quickly run through the titles").
  - **A new chapter organization for the Multiverse Saga.** The owner asked for one from scratch; the proposal (12 November 2026) is
    seven chapters: Aftermath (WandaVision, The Falcon and the Winter Soldier, Black Widow, Hawkeye); Fractures (Loki S1, No Way
    Home, Multiverse of Madness, Quantumania, Loki S2); Gods Among Us (Shang-Chi, Eternals, Moon Knight, Werewolf by Night, Love and
    Thunder, the Holiday Special, Vol. 3); New Blood (Ms. Marvel, Wakanda Forever, Eyes of Wakanda, Ironheart, Agatha All Along, The
    Marvels); The Kingpin's City (She-Hulk, Echo, Born Again S1, S2, One Last Kill, S3); Shadow Government (Secret Invasion, Brave New
    World, Thunderbolts*, Wonder Man, VisionQuest); Last Stand of the Multiverse (Deadpool & Wolverine, First Steps, Brand New Day,
    Doomsday, Secret Wars). The owner hasn't decided; the next step offered was a two-chapter sample (opening and closing text) first.
  - VisionQuest stays Chapter 9's last title for now (owner). If a later title confirms on screen that the Ten Rings' adamantium came
    from the Celestial, VisionQuest moves to Chapter 10 after Born Again S2 (agreed reasoning, 11 November 2026).
  - VisionQuest episode 8 had no transcript: its steps, ties and log lines rest on Wikipedia and recaps. When a transcript appears,
    check them against it.
  - Offered, not taken: files for What If's Bruce Banner (#3) and Bucky Barnes (#19) versions (their ties were left out).
  - Seen, not changed: the Your Friendly Neighborhood Spider-Man Otto file dates Ross's arrest of Octavius #9; the transcript has #8.
  - The Snap and its report: the owner said they'd test on the phone; feedback may come (animations, the report's words, the memorial,
    Last seen).
  - Parked (don't raise): the Time Machine. Landscape stage 2 left: the indexes and their files, dialogs, pills, eggs.
- **History:**
  - Main's pushes, newest first: `c0e0886` (14 November 2026, the owner's "push. Now the eggs": the Civil War egg in the Network, recorded in the Agent File as egg 65 when its finish plays; the Agent File's pages grow with the eggs, sixteen or fewer a page, so 5 pages of 13; 40 of 40), `0d8ae71` (14 November 2026, the owner's "Push.": a character log covers the dock however it was
  opened, from the Network, a file or Paths; ct68; full suite 40 of 40). Before it `cba03a9` (13 November 2026, the owner's "push landscape": landscape stage 1 and stage 2 so far,
  promoted from the test build (the dock as a rail on the right, Story's side panel, open boxes in one column with a compact head, the
  Network's one-row bar and its card as a side panel, every title at one height), and the Network's card scrolling as one piece
  upright; full suite 39 of 39). Before it `6f8eba9` (13 November 2026, the owner's "Sure push": the Mind Stone egg redesigned; full suite 39 of
  39). Before it `4621b25` (13 November 2026, the owner's "Push.": the Network's Jack fix, network.html only;
  full suite 39 of 39 with ct67). Before it `3cb8065` (13 November 2026, the owner's "Push": VisionQuest's finale back for Virgil Horton,
  Jocasta and Paladin; full suite 38 of 38). Before it `7e792af` (pushed 12 November 2026, the owner's "fix it that way and push": a past scene in a later title no
  longer decides anyone's group, Sitwell, Pierce, Rollins, Rumlow, Yondu, Foggy, Janet and others; full suite 38 of 38 with ct66).
  Before it `45d7459` (pushed 11 November 2026, the owner's "push when ready": VisionQuest in full, files, logs, Atlas and
  Network through the finale; full suite 37 of 37). Before it `d5c26f9` (11 November 2026, the owner's "Push": dying at the turn keeps the group, Darren Cross in
  Kang's Empire and eleven others; full suite 37 of 37). Before it `99945b6` (pushed 10 November 2026, the owner's "Ok same treatment then push": the left-out characters in every
  universe, the film people under credited names, the one-episode cut (131 out); 2,257 people in the Network; full suite 37 of 37).
  Before it `3e49355` (8 November 2026, the owner's "Push westview and 6degrees": Westview's six residents and Six Degrees, on for
  everyone). Before that `25102ef` (pushed 7 November 2026, the owner's "Push it when ready": the Snap's dust both ways, shared names, no page
  twice running, never on Paths; full suite 37 of 37). Before it: `85527b0` the Snap report and its fixes; `54e3e93` the Snap across the app; `0c7fb46` the Network's Groups line, no hidden universe code, the 1988 Peter Quill with the
  Pyms, Dazzler and Carnage staged; `823d296` Extras character boxes name their universe tab; `6598b5f` new Earths fade in; `ec353bb`
  new groups pop in, the link card's height; `171f2bf` New Asgard from Endgame on, circles from their own titles; `290c01f` Alioth in
  The Void; `3cd6996` the split launch page; `3e844a5` audit parts 6 to 9, the Watcher; `48f2c51` the "No signal" fix; `b5e096e`
  mutual connections; `6f22626` How they're connected slides up.

- **On main (`25102ef`, 7 November 2026; after `85527b0`; owner: Paths "6 times in a row"; "during the bring back Paths sometimes
  dust 1 or 2 away"; "consistent dust away on away and dust back on bring back"):** the page is never the same twice running
  (`state.snapPg`); a shared box or line that keeps some of its people loses only the lost part of its name, by dust, and gets it back by
  dust (`snapNameParts` and `snapNarrow` on the Characters page, `snapSvgParts`, `snapSvgSlide` on Paths); nothing dusts away while coming
  back (the detector now also logs any dust-out during the undo); a shortened name keeps the whole name's colours (`snapNameHtml`).
  Then (owner: "network bring back has no dust"): coming back, the ash gathers in on every page (flakes start where they would have
  drifted and fly in, `inb`; the Network's dust-in runs 1.8 s). The detector keys names by their box or line, not their text.
  Then (owner: "cut the paths as a page where the snap animation takes place ... it doesn't fit"): Paths is out of the page cycle; it
  still changes with every Snap (lines and names go with their people), quietly. The animation picks from the Network, Characters, the
  Compound and the Raft. `SNAP_PAGE = "paths"` still plays it there, for the tests.

- **On main (`3e49355`, 8 November 2026): Westview** (owner: "Do the Westview residents ... have files or network bubbles?"; "Yes do
  both"). Six new Compound files (`answers_fix.json` A, q "westview"): John Collins (Herb), Sarah Proctor (Dottie Jones), Harold Proctor
  (Phil Jones), Isabel Matsueda (Beverly), Abilash Tandon (Norm), Arthur Hart (Vision's boss; his real name, Todd Davis, is only
  mentioned in Agatha All Along, so the file keeps Mr. Hart's), each with its episodes (`ep_tags.json` st) and its sitcom name as an
  alias, like Sharon Davis's. In the Network they stand in a new "Westview" group (`rel/out1.json` places, with Ralph), and 20 ties
  (`rel/westview_out.json`, read by relbake's keep list; `rel/ep_tags.json`): Ralph Bohner's six (Wanda, Billy, Tommy, Vision,
  Agatha, Monica; he had none), the residents' with Wanda, Vision, Agatha, each other, and Mr. Hart with Sharon Davis. Sources: the
  episodes' Wikipedia plots and the MCU wiki's pages (its API, user agent mcu-tracker-research/1.0; WebFetch is refused). Left out:
  Dennis the mailman (no real name). The Network was rebuilt in full; only the six people and three WandaVision episode titles changed.
- **Adding the left-out characters (owner, 8 November 2026: "Just do it I guess", leaning to main, recurring and named film parts;
  then: "they won't have had the writing and quality passes ... Just do it").** The owner's rule for who counts: a name, lines, a part
  in the plot, judged on screen and never on billing (the first list's "main / recurring / top-billed" tiers came from the wikis' credit
  lists and were wrong: Elias Spector "main" for one flashback, Tullk and Eir "top-billed"). Sacred Timeline first. Selection: every
  candidate's MCU wiki biography (scratchpad `wv/bios.json`), 410 single short scenes left out unjudged, 1,664 judged one by one
  (`sel/BRIEF.md`, outputs `sel/o*.json`: 689 in), then an independent second check from the full pages (`sel/VERIFY.md`, `sel/w*.json`),
  which also drops anyone a group file already covers (The Warriors Three, The Castle family). Then two sample files through every
  pass (sourced draft, independent fact-check, writing pass, Network ties, build and suite) shown to the owner before the rest
  (the "small sample first" rule). Agents that judged by script or wrote one reason for everyone were sent back: check `why` lines
  for repeats before trusting a batch. The full list of who is missing, all universes: https://claude.ai/artifact/YUF7vMo4qR9v7wJ53hSvj3.
  Second check done (857 checked from full pages, 184 flipped): 626 Sacred Timeline people in (`sel/final_in.json`). Each file still
  has to pass the name rule when drafted: a name only counts if the screen says or shows it (credits don't count), so Cameron Klein
  (never named on screen) is out, and a name first shown later is staged (Evanora is "Agatha's mother" until Agatha All Along #6).
  **The sample (test build v183, working-branch `332a7ec`):** Nic West (Compound, Doctor Strange and Multiverse of Madness, ties to
  Strange and Christine) and Evanora Harkness (Raft, WandaVision #8 and Agatha All Along #5, ties to Agatha and Alice), new ties in
  `network/rel/unfiled_out.json` (in relbake's keep list), new adds in `answers_fix.json` with q "unfiled". Waiting on the owner's
  look before the rest.
  **The owner's answers (8 November 2026):** (1) crew members inside a group file (The Hood's Crew, Sarge's Crew, The Warriors Three,
  the Howling Commandos, The Wrecking Crew, The Monster Hunters) get their own files too, and the group file stays, as S.H.I.E.L.D.
  does; (2) Evanora's coven is The Salemites from WandaVision on (the on-screen name, no spoiler); (3) the hospital: rename only if
  no title says "Metro-General" on screen. Daredevil does (Claire's hospital), so it stays Metro-General Hospital.
  **Owner, 8 November 2026: "Dennis group should not be presto wth because thats what it says on his shirt? His group is obviously
  westview residents."** A logo on clothes is not a group; go by how the story groups people. Dennis stands with the Westview
  residents (Network place in the Westview circle, file `tm` Independent like theirs). Both briefs (`mockup-data/unfiled/DRAFT.md`,
  `CHECK.md`) carry the rule.
- **The left-out characters, built (10 November 2026; test build v185, full suite 37 of 37, waiting on "push").** 514 new Sacred
  Timeline files (299 Compound, 215 Raft; 15 of them from the owner's re-check of the 391 film and Disney+ people the weak first pass
  had judged out: Costel, Zrinka, Gef, Greller, Yakan, Ponytail Express and others). First 499 plus the two samples, 1,382 new Network ties (all by id, in `network/rel/uni/newfiles/extra_unfiled.json`; the
  samples' by name in `rel/unfiled_out.json`), the Network now 1,987 people. Everything for it is in `mockup-data/unfiled/`: the
  briefs (`DRAFT.md`, `CHECK.md`), `validate.py`, `merge.py` (rerunnable: rebuilds the adds from all `chk*.json`), the 40 checked
  batches and `dropped.json` (135 people the checks dropped, each with why: no name said or shown on screen, no lines, already in
  the app, or drafted twice). How it ran: 40 batches by title, each drafted from the wiki and episode transcripts
  (springfieldspringfield.co.uk), then an independent fact-check of every claim, every drop re-tested, then the format check. People
  only in Agents of S.H.I.E.L.D. seasons 6 and 7 got `by-st-` ids (they stay in Beyond). Owner rules applied: a name the story says
  or shows (credits don't count, staged until said); a logo on clothes is not a group; crew members get their own files and the
  group file stays (Hogun, Fandral, Volstagg in The Warriors Three; the Hood's Crew); footage-only appearances (archive footage, a
  play) are not steps. Shared names: hub2's `APART` keeps five villains apart from same-name heroes (O'Connor, Grace, Tomas, John,
  Diego), its `NOTV` keeps 21 same-name people in one universe from being linked as other versions, relbake's `BY_ID_ONLY` takes
  the shared-name new people by id only. Notable drops: Tullk and Eir (never named on screen), Gabe Jones, Falsworth and Dernier
  (named only in the credits; the Howling Commandos group file covers them), Cameron Klein (credits only). VisionQuest covered to
  episode 7 (episode 8 had no source yet).
  **Next (owner: "do the same for the other universes"; "What If episodes are basically mini movies"):** 1,111 candidates in the
  Spider-Verse, FoX-Men, Pruned and Beyond (scratchpad `sel2/`, one careful pass, `VERIFY.md`): each What If episode judged as its own
  short film; a version of someone the app names elsewhere goes by that name (no name test), judged on lines and story part. The
  wikis started answering 429 under 20 parallel readers: unread people are marked "pending" and checked again later.
  **Owner, 10 November 2026: the name-on-screen rule is too strict for films** ("Their names needed to be said on screen is a
  bad rule i think. May times maybe characters won't have their names mentioned"; picked "Films only"). In films, someone cut only
  because the screen never says their name gets a file under their credited name when they have lines and a real part on screen
  (Doris Toomes, Erik's mother, Nixon, Eir, Tullk, Madame B., Morita ...). Shows keep the name rule.
  Done: 221 film people cut for the name re-judged (scratchpad `sel3/`, JUDGE.md; copies in `mockup-data/unfiled/filmnames/`),
  56 passed, drafted and fact-checked as batches 91 to 97 (FILMNAME.md over DRAFT2/CHECK2): 49 files merged under credited names.
  A credit that is only a description ("Jack's Father", "Kraven's Mother", "Shaman") is not a name: out unless another film's
  credits name them (Sope and Zawavari are named in Wakanda Forever's). Still out on lines or part: Doris Toomes, Eir, Troy,
  Anna Kravinoff, Thaddeus Paine, Retch, Jimmy O'Hoolihan, Abraham Cornelius; Toxin is covered by Patrick Mulligan's file.
  **Owner, 10 November 2026: the show counts are "Way too lopsided"** (Agents of S.H.I.E.L.D. near 200, Daredevil 100, the other
  Netflix shows around 50, films around 30); picked "Cut one-episode guests": a new show person whose whole presence is ONE
  episode is dropped unless that episode's plot turns on them (the episode's villain, the case or victim it is about), or
  ("Unless the connection is important like family, spouse, boss etc") they are family, a spouse or partner, or the boss of
  someone the app has a file for. People in more than one episode, or also in another title, stay.
  Done: 383 possible one-episode guests checked (scratchpad `sel4/`, CUT.md; verdicts in `mockup-data/unfiled/oneepisode/`), 97 cut
  (`unfiled/cut.json`, read by merge.py, which drops them and their ties). Calls on top of the checkers: a corpse is not an
  appearance (Seth Honicky out); a family or boss tie counts only to someone who stays on their own merits, not to another
  one-episode guest (Carlo Eastman, Dwayne Blaskowski, Ana and Manuel Silva out). Sacred Timeline after the cut: 1,135 people
  (Agents of S.H.I.E.L.D. 148, Daredevil 84, Jessica Jones 72, Luke Cage 70, Born Again 52, The Punisher 50).
  Owner ("Ok same treatment then push"): the same one-episode check on the other universes' shows (What If...? left out, its
  episodes are films), scratchpad `sel5/`, 185 candidates, 34 cut (verdicts in `unfiled/oneepisode_other/`; all 131 cuts in
  `unfiled/cut.json`). On main `99945b6`.
  **Under way (10 November 2026):** 360 selected, drafted in batches 51 to 79 (scratchpad `build/`, DRAFT2.md, CHECK2.md, copies in
  `mockup-data/unfiled/`), each fact-checked and merged as it lands (not on main). Calls made on the way, for the owner to see:
  - Silent appearances, one rule as the app's own files do it (Psylocke and Warren "among the mutants on Genosha"): a step when
    the person is part of what happens on screen (Tusk flocking to Genosha, Araki in the throne room as it vanishes, Caliban
    enslaved on the dam), none for a bare glimpse (Leech and Sunder "glimpsed among the Morlocks") or recap and photo spots.
  - merge.py settles shared names: the owner's retarget answers (Logan in Logan is the film's own Logan), each What If episode by
    its episode number (Ross, Natasha, Bucky), a title's lead over its variants (1994 Peter over the Spider Wars Spider-Men, Miles
    over Earth-42's Prowler), and leaves out a What If tie whose other side is a version the app has no file for (Bruce Banner in
    #3, Bucky Barnes in #19: both could get files under the versions rule).
  - Shows with no transcripts (1967 Spider-Man, most of the 1994 show, Spider-Man Unlimited): a name counts only when an episode
    plot summary uses it, not a cast list; unsupported statuses go to At large.
  - Ties between new people from different batches of one show: 240 candidate pairs (same episode, no tie yet, scratchpad
    `build/xpairs.py`), drafted (XTIES.md) and fact-checked (XCHECK.md) as chk81 to chk86: 106 ties, the rest skipped as shared
    crowds. All 338 new files are merged (sv 136, fox 135, pr 44, by 23); two have no tie (Governor Barkley, Master Mold 2055).
  - Seen on the way, not changed: the app's Otto file (Your Friendly Neighborhood Spider-Man) dates Ross's arrest of Octavius #9,
    the transcript has #8.
- **Supporting characters with no presence (owner, 8 November 2026: "How many other supporting characters not have presence in this
  app?").** A scripted sweep (the scratchpad's `wv/sweep.py`, cached; the MCU wiki's Cast and Credits lists through its API, matched by
  name, name parts and aliases against every file and Network name): of 127 title groups, 80 were found on the wiki (it has no Sony, Fox,
  Falcon and the Winter Soldier or Werewolf by Night pages under those names); 3,757 credited characters, about 1,900 with no file or
  bubble, 68 of them in two or more titles (Hogun and Volstagg, Maria Castle, Wanda's parents, Evanora Harkness, Anton Vanko, Falsworth,
  Cameron Klein ...). Approximate: some matches are false (a lone "Dennis" matched Dennis Dunphy), most of the rest are one-scene roles
  and real newsreaders. Agents of S.H.I.E.L.D. alone has 347. Waiting on the owner to say where to draw the line.
- **Six Degrees: zoomed out, only the groups holding someone lit stay bright** (owner: "all the groups are lit up").

## This chat's checklist (5 to 7 November 2026; all on main)

**The Network**
- [x] How they're connected slides up and scrolls like a person's card; its small height matches a person's card; no card opens slid up on its own.
- [x] Mutual connections under How they're connected.
- [x] New groups pop in, groups you knew glow; new Earths fade in while their groups pop (owner's pick of three).
- [x] Alioth stands in The Void.
- [x] The Crews line lost its hidden universe code ("Starforceby"); one "Groups" line on every card (teams, then the group they stand in); "Independent" instead of "No crew".
- [x] Circles: Sacred Timeline (184) checked, seven staged to their titles (Jane, Clint, Billy, Klaue, Jack Duquesne, Goose, the Collector); the other universes (126 people in 81 circles) checked: the 1988 Peter Quill with the Pyms, the zombie Vision Independent, Dazzler and Carnage staged.
- [x] Extras character boxes name their universe tab (the Watcher opens Beyond, and so on).
**Groups and data**
- [x] New Asgard from Endgame on (Thor, Valkyrie, Korg, Miek; Axl, Sif); Jane's New Asgard from Love and Thunder; Clint S.H.I.E.L.D. from Thor.
- [x] Audit parts 6 to 9: random 600 and the full content check; answers 60 to 63 applied (the Watcher's name and insignia, the slim launch page, Mordo's line kept, part 1 recount).
- [x] The coverage list (its own section): everything the app shows and what checks it; three gaps named.
**The app**
- [x] The "No signal" fix (sw.js buffers whole pages, 5 s fallback); the launch page split (2.97 MB plus `data.<hash>.js`).
- [x] The Snap across the app: a random half of everyone you've met, every universe, dead or alive (Thanos included: owner); lost from the Network, the Compound, the Raft, their boxes and Paths; played on one page you've found, at random; "Whatever it takes" brings them back.
- [x] The Snap's animations: the Characters boxes' own dust, light ash, random spots and moments, nothing over the header; lists close up and open round what stays in view; Paths morphs (lines matched title by title, no freeze); the Network draws the dust itself; a pop detector clean on every page both ways.
- [x] The Snap report: a priority message in Comms signed by the first survivor; the ticker's headlines (no totals); the counts without "of X"; the lost are only names, survivors open their file; a row on the Agent ID; the Vanished memorial as a full page (San Francisco's door, "+N more"), shared names with their Earth; Last seen in the Atlas (the Lost switch); "All accounted for" when undone.
**Parked (don't raise):** the Time Machine, Six Degrees, landscape stage 2.
**Offered, not taken:** reading every Network card on screen in every universe (the coverage gap the "by" got through).

## Notes on the November 2026 work (how each piece works and why; read before touching it)

- **On the back burner (owner, 5 November 2026: "I'll get back to these later"):** the Time Machine and Six Degrees, both mockups in
  the test build (see "Drafts: the Time Machine and Six Degrees" under Open items), and their open questions. Don't raise them; the
  owner will come back to them. They stay in the test build; mainprep cuts them from main, so a main push doesn't need them settled.
- **On main (`0c7fb46`) (6 November 2026): the card's Crews line off the Sacred Timeline** (owner: "Why do the crews end in by?"). A crew's
  key carries its universe after an invisible separator (`UK`, \u2063, and \u2064 for a circle named like a crew); `moreHTML` printed the
  raw key, so Beyond read "Starforceby", FoX-Men "...fox", and an off-timeline Independent wasn't filtered out. Now it prints the name
  only. Checked over all 1,480 people: no hidden marker and no "Independent" in any Crews line. Network only (network.html).
- **On main (`54e3e93`, 7 November 2026, owner's "Push"): the Snap across the whole app** (was the v164 mockup; folded in: the hooks lost their `MOCK` guards, the old box-only `snap`/`unsnap` and `dustSweep` went, a save from before keeps its lost boxes until undone (`snapLook`); only the free six Stones stay test-build only, `MOCKUP BEGIN snapstones`) (owner: "if Pepper Potts gets snapped, then her
  Compound file also goes ... his path goes, his character box goes"; answers: every universe; a team box only when every core member
  goes; a shared box drops the lost name on the box and its Paths line; the animation on one of the five pages you've found, at random).
  The Gauntlet's Snap takes a random half of everyone you've met (the Network's people, by file id, dead or alive; `netPool`), kept in
  `state.snapP`; `state.dusted` is now worked out from it (the boxes with nobody left, `SNAP_BOX`: each box's people, part by part).
  Hooks in main code, all behind `MOCK`: `boxName`/`boxNameHtml` (`snapName`), `mapHide`, `cpSteps`/`rfSteps` (`snapGone`), the
  Gauntlet's "Whatever it takes" check. The block is `/* MOCKUP BEGIN snap */` at the end of the script; its data is `var` and its
  helpers declared functions, because the app names boxes and checks files while it loads (a `const` there broke the load).
  The Network (hub-src, inert on main): `SNAPS` keeps the lost off the floor; `netSnapPlay` picks a tab it touches and a busy group,
  and the room draws the dust itself (`dzPaint`: each one on their own canvas just above the floor and under the header, the boxes'
  SVG filter, their name only where the floor writes it, so nothing blinks or jumps), at random over 5 s; the room closes up on the
  Characters list's curve (`roomMove`) with the view on the group that kept the most people; undone, the room opens with their places
  empty and they gather back. The Characters page, Paths and the Compound and Raft use `snapBox` at random moments, with ash scaled to
  each thing's size (`snapAsh`; none off a Paths line), the lists closing up (`snapFlip`). Owner's dust rules from the videos: no
  screen-wide sweep, light ash only, random spots and moments, no zoom out when it's done. Test: `SNAP_PAGE` forces a page.
  - Owner, 7 November 2026: the Characters list closing up lost your place: it now closes up round a box in view that stays
    (`snapKeepTile`). Paths "looked funky": it was refitted, and sliding its lines didn't work (a line's stops and titles change
    with the lines around it); now the view keeps its zoom and place and the new map fades in under the old (`snapMapRedraw`).
  - Confirmed for the owner with Bucky alone: his Network bubble, Compound file and Raft file (`winter-soldier`, merged into him)
    go; "Falcon & Winter Soldier" reads "Falcon" on the box and its Paths line; the Thunderbolts box stays; his other-universe
    versions (`by-bucky-1991`, `by-zombie-bucky`) are separate people and stay (they can be lost on their own, by chance).
  - Owner, 7 November 2026: "Paths pop in before animating back in. Check each animation." Found by a pop detector (the scratchpad's
    `snapvid/app.js`: every tile, name, heading, row, group, Paths line, name, title and stop, before and after each commit; anything
    that appears or goes on screen without dust or a fade is a pop), run on each page both ways, several times each (each run is
    random). Fixed: Paths' titles and stops that only lost lines pass through now dust with them and back (`snapMapCols`); a
    Characters section heading or index group heading that empties goes with its last box or row, and comes back with them; a
    shared box's short name dusts out before its whole name dusts in; anything returning off screen is just there, and anything
    scrolled into view still hidden dusts in (`snapRest`); the lists come back redrawn in one step under the flash (they used to
    slide, which misjudged what was on screen). The dust there is now `snapFilt` (the boxes' own filter numbers) without
    `snapBox`'s full-screen canvas per item, which stalled the page for seconds with dozens of rows (rows then showed undusted).
    The Network: a group's name and an Earth's circle go with the last of their people and wait for them coming back (`dzFade`,
    `dzBack`, `landAt`). Last runs: no pops on Characters, Paths, the Compound or the Raft, both ways.
- **On main (`0c7fb46`) (7 November 2026): the other universes' circles checked** (owner: "Just do other circles and coverage list").
  All 126 people in 81 circles read against their titles; six doubtful ones checked against sources. Two showed early, now staged in
  `CIRC_FROM` (which now also takes other-universe people, keeping their baked circle key): Dazzler on Genosha only from X-Men '97 #5
  (she's Mojo's staff in the 1992 show), Carnage at St. Estes only from Let There Be Carnage (Venom's end-credits scene is a prison).
  Confirmed as they are: Leech at Worthington Labs, the Brood at Weapon X (X-Men '97 S2E5), Finesse with Daredevil (Your Friendly
  Neighborhood Spider-Man), Bruce Banner with the Apex. Kept, wording only: "The Essex Corporation" (the film's Essex House).
  The coverage list is its own section ("Coverage: everything the app shows").
- **On main (`0c7fb46`) (6 November 2026): one word, Groups** (owner: "I don't really understand the difference between circle and group
  ... As an end user the rule of crew seems arbitrary"). The reader never sees "crew" or "circle": the card's line is "Groups", the teams
  they've been in (as far as you've watched) and then the group they stand in now, so a family or a place is named like a team (Peter
  Quill: The Ravagers > Guardians of the Galaxy > The Quill family; Lila Barton: The Barton family). Before, 210 people standing in a
  circle had no line at all. The card's top line reads "Independent" (was "No crew"), like the crowd's name on the floor. Inside, crews
  and circles stay as they were. Rule: don't put "crew" or "circle" in front of the owner or on screen; say "group".
  - Beyond's circles (`rel/uni/by/circles.json`): the 1988 Peter Quill was in a one-off "The Avengers" circle with the zombie world's
    Vision (two worlds in one patch, apart from Wendy's Avengers). Recaps of What If...? S2E2 put him in the Pym household with Hope and
    Goose, so he's in "The Pym family" with Hope; Vision (hiding at Camp Lehigh, no team) is Independent. Beyond has one Avengers now.
- **On main (`823d296`, 6 November 2026): an Extras character box opened names its universe** (owner: "I went into characters and
  finished the watcher, went into networks and its just the sacred timeline stuff? Where's the beyond people and uatu and the what if
  people"). The Beyond tab only counted the Beyond the MCU chapter box or every title in it watched; the Watcher's box doesn't hold AoS
  S6, AoS S7 or Team Thor, so a Characters-path user never got it. `slNamed` now also counts the chapter's Extras box being opened
  (`MV_CHAPTER`). Applies to all four: the Watcher (Beyond), Sony's Spider-Men (Spider-Verse), FoX-Men, Pruned.
- **Since the last main push (5 November 2026):**
  - **How they're connected slides up like a person's card** (owner, 5 November 2026: "should also be scrollable and tapable starting
    at the top etc just like an individuals pop up"). On main (`6f22626`). The grip shows on it, it
    follows your finger and settles small or full, pulled down far it closes; small, it shows the first of it fading out (`#lBody`,
    24vh); full, the whole thing scrolls, always from its top; pulling down from the top of the list drags the card down.
  - **Mutual connections (owner, 5 November 2026: "when two people are selected in network, their mutual connections are shown";
    then "push mutual": no longer a mockup, on for everyone, on main `b5e096e`)**: under How they're connected, "Mutual connections · N": everyone connected to both, each with what they are to each of
    the two and that card line ("Friend · Steve ...", "Ally · Sam ..."), as far as you've watched; "None as far as you've watched."
    when there are none. In the room they stay lit, with a thread to each of the two. Tapping one shows how they and the one you're
    locked on are connected. `MUT` and `mutFill` in hub-src; no gate (`netMockOn()` now only shows Six Degrees' button). Steve and Sam: 22 mutual connections.
- **On main (`48f2c51`, the owner's "push"): the "No signal" fix in `sw.js`** (owner, 5 November 2026: "sometimes now the no network thing pops
  up again for often"). The Android app shows its offline page whenever the page itself fails to load. The old offline copy handed the
  page over as it streamed in and waited on the internet with no limit, so a 4.3 MB page cut off partway or stalled on a weak signal
  reached the app as an error although a good saved copy was there. Now a page (the app, or the Network in its frame) is handed over
  only once all of it has arrived; cut off, the saved copy answers; still downloading after 5 seconds, the saved copy answers and the
  new one finishes in the background for the next open. Found on the way: when network.html failed, the old copy put the whole app in
  the Network's frame (a second copy that could save over the first); each page now falls back to its own saved copy. Checked with a
  server that cuts, stalls and drops the page (`mockup-data/tests/swtest.js`: `node tests/swtest.js out/root ../sw.js`): old: cut and stall never load, the frame got the app; new:
  cut 0.6 s, stall 5.5 s, dropped 0.4 s, all the app, the frame the saved Network. Needs only sw.js on main; the phone picks it up on
  the next open online, and it reloads once as the new offline copy takes over.
- **The launch page is 4.34 MB** (main, 5 November 2026; 3.79 MB on 1 November, the content rounds since): over the "about 3.6 MB"
  this file asks for. The sw.js fix covers the error it caused; moving the 1.7 MB of filled-in data (files, episodes, news, messages) into
  its own file loaded after launch, like the Network, would bring it under 3 MB. Offered to the owner, not started.
- **The audit, parts 1 to 9, is done and on main** (since `0695617`, 4 November 2026; records `mockup-data/audit2/`, `STATE.md` ends
  "AUDIT DONE"). The checklist below had gone stale and still listed parts 4 to 9 as open; a chat on 5 November repeated that to
  the owner, and found the truth in git before running anything. Part 4 the Atlas (300 places, 164 of 187 leads closed, 3 left in
  `atlas/leads_left.json`; fresh 600 at 0%), part 5 the logs (fresh 600 at 1.3%), parts 6 to 9 (Damage Control and Comms 32 fixes,
  titles and insignia, the Multiverse and Incursions 26 fixes) checked and second-checked, but **parts 6 to 9 have no random 600 on
  record**, and the last full content check is from 3 November (`content_full.json`). Those two are what's left of the plan.
- **Part 1's sample recounted under the wrong-only rule (owner's answer 63, 5 November 2026):** of its 12 confirmed non-employer
  errors, 7 are wrong statements (Dottie's whole-show key, Ward's HYDRA a season late, zombie Zemo's and Joy's departures that never
  happen, Deathlok's order, zombie Ikaris in the Survivors, Comanche's ending) and 5 are missing (Matt's Landman and Zack, Fennhoff's
  Soviet army, the Doctor in Izel's crew, B'Kai undercover, Sam's Air Force): 7 of 612, 1.1%, inside the bar. Part 1 is locked.
- **Done 5 November 2026 (owner: options 1 and 2, "use a work flow"): parts 6 to 9's random 600 and the full content check.** Records
  in `mockup-data/audit2/s1105/` (`plan.json` seed 1105, `SAMPLE.md`, `LEADS.md`, `results.json`, `accepted.json`, `apply.py`).
  - Full content check (`content_full_1105.json`): no failures in 1,356 states and 15,896 texts; leads: 46 places, 38 alive-again.
  - The random 600, in proportion to each part (Damage Control and Comms 275 of 504, story lists and quotes 165 of 301, the Agent
    File 96 of 175, the Multiverse, Incursions and Watcher 64 of 117), each finding second-checked by an independent agent: wrong
    statements 1 (0.4%), 1 (0.6%), 0 and 0, all inside the bar: Eddy Costa's fallout line had no title (now Jessica Jones S2), the
    Doctor Strange & Wong box quotes Mordo ("Forget everything you think you know"): the owner keeps it (question 62, option C:
    "Put Mordo's line back"), so it is not an error to fix again. Also
    fixed, completeness: John King's loss line had no title (Ironheart), Hope van Dyne added to the zombie outbreak's losses.
  - The leads: 8 new Atlas entries (Dottie at the Griffith Hotel and the bank, Kasius and Sinara at the Lighthouse in 2091, Ward's
    men at Birch, Monica at Westview, Proteus home to Muir Island, Vision in Edinburgh), 16 At lines moved to the right place
    (One Last Kill is Queens' Little Sicily; Agent Carter S2's scenes are Los Angeles, not Hollywood; Sousa's 1955 rescue on
    Earth-19859's Los Angeles) or taken off, Agatha's ghost step Deceased (the owner's earlier call, never applied), X-Force's party
    step names Peter too. Left: 20 place leads and 37 alive-again leads, each checked and right as they are.
  - **The Watcher, settled (owner, 5 November 2026: "the name to be revealed after loki s1 when the multiverse opens ... the insignia
    and just the insignia unlock after what if (any check in what if even a single episode counts)").** His box is named after Loki S1
    or any What If...? episode (`charNamedNow`); his insignia, its watermark on the box and its badge wait for What If...? itself, any
    one episode in any list (`whatIfAny`, `embWon`, `wmHTML`); hint "Unlocks after any episode of What If...?".
  - On main (`3e844a5`, the owner's answer 60).
- **Michelle Jones's names stay as they are** (owner, 6 November 2026: "Forget michelle Jones it was my mistake"): "Michelle" for
  Homecoming, "MJ" from Far From Home, "Michelle Jones" from No Way Home, alias MJ. Don't reopen.
- **A new Earth arrives too; three ways to try** (owner, 6 November 2026: only for new Earths; "try three different versions").
  `EARTH_ANIM` in hub-src: 'pop' (the circle pops in just before its groups), 'fade' (it fades in while they pop), 'after' (it pops in
  once they've landed); in all three the Earth's name fades in last. A new Earth (all its people new) gets its arrival window when the
  reveal starts (`EPOP`, set in `reveal()`: a lone member's pop would otherwise end it early). An Earth you knew stays drawn. Recorded
  for the owner with Beyond the MCU from 0 to 100% and the Beyond tab opened (27 Earths, all new). Owner: "Definitely not after"; torn between pop and
  fade; Claude recommended fade; the owner chose pop ("Go pop and push"), then
  fade ("Actually go back and push fade instead"), so `EARTH_ANIM` is 'fade'. On main (`ec353bb`) with the group pop-in and the link-card fixes.
- **How they're connected, small, is a person's card's height; no card opens slid up on its own** (owner, 6 November 2026: "too
  tall on collapsed view it should be the same size a single persons pop up" and "it sometimes pops up fully open"). Small, the link
  card takes the height of the person's small card it came from (`--lbh`, `card._h1`; it was 369 px against 256). The "fully open"
  cause, found by driving every way in: a card closed while slid up (a tap on the floor) stayed slid up for the next one; `home()` now
  puts it back small (`self.cardReady` guards the start-up call). Back from a link card returns the person's card as you left it, slid
  up or not (`card._oneBig`). On main (`ec353bb`).
- **New groups pop in, groups you knew glow** (owner, 6 November 2026: "new groups should pop in and existing groups should glow").
  Zoomed out, a group whose people are all newcomers pops in like a person (a little past full size and back, 420 ms) at its first
  person's pop time, and isn't drawn before; a group with anyone you'd already met keeps the swell and blue ring. hub-src, the
  zoomed-out group loop (`gp`, `gs`). On main (`ec353bb`).
- **New Asgard from Endgame on** (owner, 6 November 2026, on Love and Thunder: "Shouldn't they all be new asgard from endgame onward?").
  `TEAM_AUDIT2`: Valkyrie, Korg and Miek New Asgard from Endgame (Thor names Valkyrie king of New Asgard there, Wikipedia's Endgame
  plot; not Love and Thunder); Thor New Asgard in Endgame (he lives there before the heist) and again in Love and Thunder once he
  leaves the Guardians (the Wakanda rule: Asgardian or living there), so `thor|Thor: Love and Thunder` left `TEAM_LEFT` and
  `split.json`; Sif New Asgard from Love and Thunder (she trains the children there); Axl New Asgard. "Asgard" (the people) stays
  for everyone before.
- **Clint is S.H.I.E.L.D. from Thor** (found with the above): his S.H.I.E.L.D. stage was keyed to Black Widow (the Budapest past),
  which sorts after Civil War, so he had no group in Thor and The Avengers. `TEAM_AUDIT2` A:clint-barton.
- **A circle shows only from the title that makes it true** (owner, 6 November 2026; the Network's circles never change as you watch,
  so Jane stood in "New Asgard" from Thor). `CIRC_FROM` in hub-src: [circle, title] per person; before the first they stand on their
  own. The circle check over all 184 circles found seven that showed early: Jane (New Asgard, now from Love and Thunder; owner's call 3C: not Valhalla, and Heimdall, Odin and the Warriors Three stay with Asgard), Clint (The
  Barton family, from Age of Ultron), Billy (The Maximoff family in WandaVision, The Kaplan family from Agatha All Along), Klaue
  (Klaue's crew, then Killmonger's heist crew from Black Panther), Jack Duquesne (Matt's resistance from Born Again S2), Goose
  (S.A.B.E.R. from The Marvels), the Collector (his museum; the Grandmaster as his brother is never said on screen). A new circle
  needs its title in `CIRC_FROM` when its name only becomes true later. Check: scratchpad-style `circ2.js` (each person's circles and
  the title each first shows at).
- **The audit never covered the Network's circles** (owner, 6 November 2026: "pretty pissed off that this was not caught in the
  audit ... This is the how many time I caught something that wasn't caught in the audit"). The nine parts checked records,
  connections and their stages, places, logs, reports, lists, the Agent File and the Multiverse; the circles (built in October) were in
  none of them, and the content check's too-early sweep didn't look at them either. Lesson: before calling an audit done, list every
  kind of data the app shows and name the part or test that covers each.
- **Alioth stands in The Void** (owner, 5 November 2026, asked why Alioth was "part of the Citadel at the end of time" but He Who
  Remains wasn't: option 1). The Citadel was only a circle the Network gives someone with no group; Alioth lives in the Void in all
  its titles and guards the way to the Citadel, so `HOME` in hub-src puts it in The Void. He Who Remains stays with the TVA, his group.
  A place is never a group (the screen never calls the Citadel an organization).
- The landscape layout is set aside (owner: "Ignore landscape for now").
- Ask every open question in one batch before any test run; the full suite runs only before a main push.

## Checklist (up to date, 4 November 2026)

**Done and on main**
- The owner's five notes: Bucky's groups (Wakanda from Black Panther, no group in The Falcon and the Winter Soldier, the Thunderbolts at
  the end); "in 2018" capitalization (already right); Bucky and Vision's stage and every "Now..." card line rewritten; the dock button
  on the page you're on goes back to its main page (every page); the Vienna bombing case linked from Ross's step, plus 391 more steps
  that name an incident.
- The wrap-up plan: the Files pass (89 fixes, checked twice); fresh random 600 rechecks (people 1.6%, Network 4.3%, files 1.2%, all
  fixed after a second check); the Network's last pass over all 7,357 stages (549 changes); the interactive report page.
- The owner's answers to questions 1 to 59, all applied after a second check:
  - Groups (1 to 24, 41): employers, schools, crews, support groups, familiars and the rest: 255 files. Finishing a school is leaving
    it, like dropping out.
  - Splits and merges: combined files split except Dum-E and U and the Toro brothers (25, 42); Gao's champions a group; Venom the
    symbiote alone (26); one Sabretooth file (27); Ralph Bohner's own file, "Pietro" until WandaVision episode 9 (36).
  - Earth numbers: Marvel's B numbers for the film worlds (28); Earth-6799 for the 1967 cartoon (29); no number for the Eminence (31);
    the X-Men as the database has them (52, option 1): original films Earth-41578, the changed timeline and Deadpool's world
    Earth-10005, Logan Earth-17315 with its own files and map (30); the changed timeline's Logan and Sentinels in their own files (35).
    Earth-TRN414 is gone (no source). Note: Earth-41578 and Earth-17315 come from the fan-run Appendix the database cites, not Marvel.
  - Broken-up groups end case by case (32); Robin Hinton stays active (33); the 1994 Electro and Fury tie dropped (34).
  - Names the screen never says are kept (37), except one that gives a reveal away.
  - Cover names until the reveal (51, 57): 22 people (the Goblin, Agnes, Sylvie, the Power Broker, Madelyne as "Jean Grey" and more),
    with kind lines, groups, aliases and the "Also on file" link held back too.
  - Places (39, 58): Wilfred Malick's estate, MJ and Ned's apartment, Elektra's childhood home, the Alchemax lab in Earth-1610B's new
    "Upstate" inset.
  - The calls left to Claude (44 to 50) made from transcripts; 54 to 56 needed no change; Iceman's office job (59); Mystique's groups
    including X-Factor as Val Cooper (53; Creed's "coalition" is only a newscaster's phrase, so he stays in the Friends of Humanity).
  - The Black Order (owner, 4 November): the four (Ebony Maw, Proxima Midnight, Corvus Glaive, Cull Obsidian), Thanos at the head;
    Gamora and Nebula are in "Thanos's forces" while they serve him and stay his children. "Children of Thanos" is what they are, not
    a group name.

**The close-out plan (owner, 4 November 2026: "Do the rest of the plan"), in this order:**
1. The Network's dock dot for every universe (option A). Done: on main (`c5d1946`, 4 November 2026, the owner's "push").
**The bar (owner, 4 November 2026): 1 to 1.5% wrong in a random 600** (it was 0 to 1%; "Let's keep going but 1-1.5% is a better
   window"). Over it, the part goes back through, targeted by the patterns the sample found, then a fresh 600.
2. A fresh random 600 of the Network's connections, so part 2 can be locked. Done 4 November 2026: 23 wrong (3.8%), all fixed after a
   second check (`network/rel/stage_fix_zzzzzzzz_sample5.json`, records in `audit2/net/ns5`). Over the bar, so it goes back through the
   part, **targeted by pattern** (owner's choice over a full re-pass): connections between two people who share no title, pairs both
   on screen after their last stage, a first stage later than their first title together, and every stage in Daredevil: Born Again,
   the Netflix shows and the 1994 cartoon; then a fresh 600.
3. The "Held" line under a file's entry, before the audit (owner: "I think I want a held line so maybe that needs to happen before
   step 3 audit"), so the audit covers it.
4. Audit parts 4 to 9, each with its second checker, its random 600 and the full content check. Done 4 November 2026 except parts
   6 to 9's random 600 and a fresh full content check (see "Where things stand").
5. The final round: the whole test suite, the owner's check of the test build, one push to main on their word, the handoff updated.
6. Landscape, stage 2, last of all (owner: "all the way at the end ... when all is said and done").

**Still open**
- (Updated 5 November 2026.) Everything in the old list here is done: parts 4 to 9, the Network's fresh 600 (1.5%), the Atlas leads
  (3 left), the Held line. Left: parts 6 to 9's random 600, a fresh full content check, landscape stage 2 (set aside by the owner).

**Not coming back** (owner's calls): the VisionQuest audit, the six October pitches, Doomsday and Secret Wars content.

## What the owner cares about

- **Accuracy first.** Every fact must hold up on screen. Verify it yourself against sources rather than asking the owner, and follow a fix
  through to every place it applies.
- **Completeness.** The indexes are meant to be a complete repository: "I could go to look up anything about anyone."
- **Consistency.** The same person, group or rule reads the same everywhere (hero and villain files, logs, boxes, Paths).
- **Intentional design.** Every visual element needs a reason for its shape and spacing ("proportion, intentionality, character").
- **Being asked, not surprised.** Questions come with clear options and a recommendation. Pushes to main wait for an explicit yes.

## Where things live

- **Repo:** `rdebraine248-code/mcu-tracker`.
- **`main`:** the built app that people use: `index.html` (every placeholder filled), `sw.js`, `manifest.webmanifest` and the icons. Nothing
  else goes on main.
- **Working branch `ccr-5d4aa1b8-sj0vmn`** (it carries on from `ccr-9703a988-d86jbb` and `ccr-260b58ec-boqbta`): the source. It holds `index.html` with its data
  placeholders still empty, `mockup-data/` (all the data, the build scripts and the tests) and this file. **Check this branch out**, not
  main. After every push to main it's synced with `git merge -s ours origin/main`, which keeps the source and records main's history.
  `claude/gracious-cray-lhdt2k` is a mirror of it from the October 2026 chat, and `ccr-537d906a-oxzbql` (the 5 November 2026
  drafting chat's branch) another: push all three, so they stay identical. This file (`HANDOFF.md`) is the only handoff.
- Helper scripts written during a session (agent briefs, change appliers, the faction builder) live in that session's scratchpad and are
  gone afterwards. Everything they produced is in the repo: `audit_fix.json`, `raft_teams.json`, `index.html` and the audit records.

## Build and push

All commands run from `mockup-data/`. Everything they write goes to `mockup-data/out/`, which is git-ignored.

```sh
# main: turns the mockup switch off, then fills the data in
python3 mainprep.py out/main_src.html && SRC=out/main_src.html python3 devbuild.py out/main.html
# the test build, for mockups only: everything watched, a "Test · start from" picker, a note card
python3 build_tb.py "what this test build is for"          # -> out/datapad-test.html
```

- `devbuild.py` reads `/home/user/mcu-tracker/index.html`, or `SRC=...` if set, and fills in the placeholders: `/*THREATS*/`,
  `/*ALLIES*/`, `/*COLLX*/`, `/*EPS*/`, `/*EPN*/`, `/*EPO*/`, `/*NEWSX*/`, `/*COMMSX*/`, `/*SRCX*/` and `/*IDMOVE*/`. A build that prints
  `audit: no step`, `audit: no file` or `raft factions: no file` has a broken op: fix it before going on.
- **Pushing main** (only with the owner's explicit go-ahead, every time):
  1. `git worktree add --detach <dir> origin/main`.
  2. Copy `out/main.html` over its `index.html`, commit and `git push origin HEAD:main`. Remove the worktree.
  3. Back on the working branch, run `git merge -s ours origin/main` and push the branch (and its mirror).
  4. Check: `cmp <(git show origin/main:index.html) mockup-data/out/main.html` prints nothing.
  4b. **The launch page is split** (owner, 5 November 2026, question 61: "Slim it"): after the Network step below, run
     `python3 mainsplit.py out/main.html out/mainroot`. It moves the files' data (`COLLX`, `THREATS`, `ALLIES`, `IDMOVE`, the `EPS` line,
     about 1.4 MB) into `data.<hash>.js`, loaded by a plain `<script src>` just before the app's script, so the app runs as before. The
     launch page went from 4.34 MB to 2.97 MB. Main gets `out/mainroot/index.html` and its `data.<hash>.js` (`git rm` the old
     `data.*.js`), then the `cmp` check is against `out/mainroot/index.html`. The hash is the data's own: a code-only push keeps the same
     file, so the phone keeps its saved copy. `sw.js` serves it from the saved copy first, takes it from the internet only whole, and
     clears out old ones; the page retries once if it can't load it. Tests: the full suite runs on the split build (`ROOT` =
     `out/mainroot` with network.html and the icons); the ct tests' routes serve the data file next to the page they're given.
     Checked 5 November 2026: full suite 37 of 37 on the split build (ct46 and ct47 needed the same route change). On main since `3cd6996`.
  5. **The Network on main:** after devbuild, replace `/*EARTHS*/{}` the way build_tb.py does and `/*NETWORK*/null` with
     `"url:network.html"`, and copy `network/network-hub.html` to the worktree as `network.html`. `sw.js` saves it for offline (CORE).
     Never put the Network back inline on main: the launch page must stay near its old size (about 3.6 MB).
- **The mockup switch:** `const MOCK = true;` near the top of the script, with `body.mock` for CSS. `mainprep.py` flips it to false for
  main and asserts that it's there. Mockups go between `/* MOCKUP BEGIN ... */` and `/* MOCKUP END */` lines (CSS and script), which
  `mainprep.py` cuts, or behind `MOCK ?` / `MOCK &&` guards. Pending: the Time Machine (`timemachine`) and landscape.
- **Promoting a mockup to main:** don't just delete its markers. A mockup block often overrides main code at load (reassigns a
  function, deletes entries). Fold it into the code it overrides, delete what it replaced, sweep the CSS and comments it leaves behind,
  rewrite its comments as main's, and update or replace the tests for what it removed.
- **The published test build** is an artifact at https://claude.ai/artifact/LJbjs1D5nCM5BCKhqKdv4s (the old one, FpzxqjpMT8r7jSvb69mNKu,
  is retired). It's at v149 (5 November 2026: the Time Machine and Six Degrees drafts) and otherwise matches main (b5e096e, pushed 5 November 2026: mutual connections; before it 6f22626, the sliding How they're connected card, and 835b077, pushed 5 November 2026: Dottie's episodes, Team Thor on Earth-16828, S.H.I.E.L.D.'s time travel on Earth-19859) except for the landscape mockup, which only it carries. Republish it whenever a mockup changes: copy `out/datapad-test.html` to the scratchpad
  and publish to that URL.

- **The Endgame "On your left" egg plays once per datapad** (owner, November 2026: "forget the Endgame thing"): marking Endgame watched
  again, by hand or by holding a list to mark it all, doesn't replay it. Don't reopen.

- **A file's connections are a small web** (on main since 1 November 2026, replacing the three-row list) (owner, November 2026: "I like a preview of the web from network ... the
  list isn't super great looking"): `npWeb` in the app draws the person in the middle and up to a dozen connections round them (`pick12`
  in the Network takes them a kind at a time so every kind shows), each line in its kind's colour, rivals and enemies dashed, names
  beneath, a count of each kind under it. The box reads "Connections" (owner: cut "Their"); short names drop titles (Abraham, Chester),
  and the tally says "1 partner", not "1 partners". It's a preview, so it's small (owner: "it's supposed to be a preview, not the whole damn file"); it doesn't drag or zoom (tried,
  then cut: owner, November 2026), and only "Open Network ›" at its bottom right opens the Network ("See all N" is gone).

### Landscape (on main since cba03a9; stage 2 still in progress)

Owner, November 2026: "I want this app to work in landscape mode ... I want to be able to use this app fully in landscape". It's a
part of the app since 13 November 2026 (promoted from the test build; no mockup markers), one media query,
`(orientation: landscape) and (max-height: 540px)` (phones on their side; tablets keep the portrait layout).
- **Stage 1 (done; owner: "atlas and left column buttons look great"):** the dock is a rail down the side (`--dockw`; `--dockh` is 0; **on the right since 13 November 2026**, owner: "I meant right side", with Story's panel alone on the left), every page moves over for it, the ticker runs along
  the bottom of the content; Story's header and its mode buttons stand in a column of their own on the left (`.lcol`, `display:contents` in portrait), pinned and
  scrolling on its own, clear of the ticker (`--tkh`), while the boxes are the page on the right (owner: "left and right column should act
  separately"; the shared sticky column overlapped when scrolled far); the Atlas puts its map left and its list right, and redraws when the phone turns; a page's title
  and its tabs share one row.
- **Stage 2 (under way; owner, 13 November 2026: "lets continue landscape"):** the box panels, the Log, the Network's own header and
  card, the indexes and their files, then dialogs, toasts, eggs and the boot screen. Done (test build v202): **an open box keeps one
  column with a compact head that scrolls away** (the name smaller, the label, quote and count on one line, then the bar), so the screen
  goes to the titles. A two-column box (head on the left, titles scrolling on the right) was tried first and rejected (owner: "Why do I
  need to look at the title on the left hand side? I don't. Think a little bit about actual usability before doing some changes"):
  sideways, height is what's short and the titles are what's used, so give them the room and let the label go.
  **The Network (test build v204; owner: "Network looks bad the top section hides so much"):** one bar: the title, the universes as
  tabs like the Log's (mono capitals, a glowing line under the one you're in) and search as a round button (the first try, pills and a
  search field in one row, "looks cheap"); a person's card is a panel on the right that scrolls as one piece, name and file together,
  only its buttons pinned at the foot (owner: "if the network popup isnt interactive it shouldnt be stagnant and should scroll with
  the rest of the pop up"), the file filled on open (`#cMore`), and
  the camera frames them in the middle of the room left of it (`landCard`: half the panel's width, in place of portrait's lift).
  Built into hub-src behind `html.land`, which only the app's landscape mockup sets (`netLandOn`), so main's network.html carries it
  switched off. **The Sacred Timeline's left column has no backing** (owner: "the orange is split with the blue"): the page's own
  screen shows through it. **One header standard, as upright** (owner, 13 November 2026: "In portrait, all the pages and the headers
  all look the same ... Story is two columns, network has a very obvious straight line border cut through"): Story keeps its two
  columns (made one column for a moment and the owner: "Why did you make story 1 column? It looks worse now"; the note pointed out a
  difference, it didn't ask for a change), its title now 28px like every page's; its column is now a side panel (owner: it "doesn't
  look designed with intent just 2 columns split down the middle", and on the phone, about 832x384 sideways, it scrolled): a faint
  surface with a hairline edge, the title, progress and status stacked, the three views as a list down it with the one you're in lit,
  fitting 384px (352 with the ticker) without scrolling; every page's title at the top of its row (`.dockpg .maptop > h2{ align-self:flex-start }`); the Network's title
  28px and its bar's backing fading out over the room (no edge). Checked upright and sideways: the Log, the Atlas and the Network
  keep their headers pinned and Comms and the Agent File scroll theirs away, in both orientations (the owner asked; answered).
  Next: the indexes (the Compound, the Raft, the Collection) and their files, then the Log's Paths.

- **A box's head** (owner, November 2026): no Back row; **Close** (a thin pill, no focus ring round it) stands at the title's right,
  and the chapter label (CH. 1, EXTRAS) sits under the title, before the quote; a character's **Profile** takes that line, in the label's
  look ("PROFILE ›"; owner: "character boxes should match"), never stacked under Close. **Chapter boxes have no Log button** any more ("remove the log button from each chapter"), so the
  per-chapter log pages aren't reached from the box; the Log page's Chapters tab is unchanged.
  **A profile's head matches** (owner: the Back row was "too close to the titles and isn't cohesive"): its title with **Back** at
  its right in the same thin pill (Back, as it returns to the box), "CHARACTER PROFILE" under the title in the label's look, its title
  level with the box's (`pinTop(el)` measures the profile too).
- **A box's top row sits the status bar plus 6px down** (owner, November 2026: "all the contents and headers are so low"): `pinTop()`
  measures each box as it opens and sets `--pinT`, since some wear a band across their top (Chapter 1's stars). Chapter 7's branching
  timeline band leaves the top of its open box (its row is level with every other box; owner: "the point is to have chapter 7 up
  like the rest") and sits between the progress bar and the titles, full width (`chBranch`). Its open box wears its own banner in the background (`CH7_BG`, on main since 1 November 2026; the band under the progress bar it replaced is gone): every strand leaves the one junction and
  finishes level like the original, four each side of the red, compact (300px tall) and faint, mid-box (owner: "splitting all from one
  point with 3 or 4 branches on either side all parallel like the original design but in the background ... not so wide apart". Not a
  tree that splits and splits again: that was a misreading). Four a side (owner's choice). Background
  versions of the band were tried and rejected ("very terrible, messy"): a straight copy of the TVA's monitor, unconnected extra lines,
  even strands, the banner stretched over the box, the banner split and split again.

### Testing checklist (everything on main, end of 1 November 2026)

Close the app fully (swipe it from recent apps) and reopen it online first.

- **Boxes:** the title with Close beside it (thin pill); CH. 1 / EXTRAS under a chapter's title, PROFILE › under a character's; no Log
  button on chapters; the title just under the status bar; Chapter 7's faint banner behind its box. Opening a box never moves the page.
- **Profiles:** Back beside the title, CHARACTER PROFILE under it; Path › on the story line; an On file list of its people's found files;
  reopened, it starts at its top.
- **Links:** a file's record line has Profile › and Path › (each profile's own main characters only; Riri is the Champions'; FoX-Men has
  the films' X-Men and Brotherhood); a Network card has Profile › and Path › beside Open file. Each opens on top and back returns where
  you were; Open Network on a file over a profile, with the Network under it, goes back down to the Network on that person.
- **Files:** one layout; no Transferred status; first and last seen as small lines in the name box; the Raft's name box plain; transfers
  name the Raft only once found; index colours; the connections web (still) with Open Network › at its corner.
- **Network:** Earths as named bubbles, The Void a group; Search the Network; titles by season, counted from the first episode with them;
  no one in 0 titles; resets when left; back lights the right dock button. **Connections change:** Wanda and Bruce enemies after Age of
  Ultron, allies from Infinity War; Darcy enemy to WandaVision episode 7, ally from 9; Coulson and Victoria Hand allies at Agents of
  S.H.I.E.L.D. S1 episode 17.
- **Pills:** swipe away even as the small icon; the page beside a pill can be tapped.
- **Everywhere:** Earth-199999; covers read Unlock / [ Classified ]; no tap text; the ticker plays over Comms.
- **Earlier on main:** the handover (Wanda, Bucky, Loki, Yelena, Vision); WandaVision's episode reveals (4, 5, 7 to 8); the corrected texts
  (Yondu, Frank, Agatha, Crank, "Cherry"); the Log's Chapters and Paths tabs; level page titles; full screen and backup; the
  Watcher's blink; Reset datapad; the sling ring only in the Atlas; Damage Control numbers and A to Z; the Collection holders.
- **Test build only:** landscape, stage 1 (the dock as a left rail; Story's left column scrolling on its own beside the boxes; the Atlas
  map beside its list). Atlas and the left column approved; stage 2 next.

### Owner's answers, 4 November 2026 (evening)
- Network ties kept although the two never really meet: Saunders and Fisk, Mace and Ward (the Framework), Hernandez and Rawlins,
  Valentina and Ross, J.A.R.V.I.S. and Edwin Jarvis, Lorelei and Thor, Gilgamesh and Laufey, Wenwu and Killian, Zola and Maria Stark
  (huge consequences: HYDRA's crash). Removed: John Walker and Steve, Wanda and the London Master.
- Gesture puns in hints stay ("Swipe your clearance.", "Hold on to the team's name"): wordplay, not instructions.
- Insignia: a single-title unlock is fine when that title is the team's only version (Red Star, the Fantastic Four, the Defenders in
  The Defenders, the Thunderbolts*). The Champions also unlock after The Marvels.
- The What If...? S3 Ultron entry stays on Ultron's world (a variant, but moving it would only make things messier).
- Atlas: Ancient Greece's pin on Crete; the First Class CIA scene on its own Langley pin; Wakanda's pin at Lake Turkana as on Civil
  War's map; the HYDRA Academy flashback labelled 1990 ("28 years ago" from 2018). Saint Mabyn's and Project Pegasus stay as they are.
- The Incredible Hulk (1977) keeps the two pilot movies in season 1 (12 episodes), as TVmaze and the DVD sets list it.
- Damage Control's Horde report (2396) stays on the Sacred Timeline: the last Black Panther's own future.
- The error bar (owner, 4 November 2026): the 1 to 1.5% bar counts wrong statements only (a wrong fact, episode, kind or tie). A missing
  stage, where the tie and its text are right but the story skips a turn or starts a title late, is completeness, fixed when found
  but not counted. The Network's seventh 600 is 1.5% on that count (9 wrong, plus 7 missing stages), so the Network is done.
- Network group names (owner, 4 November 2026, on Okoye and Ayo after Black Panther): any group of two or more is named on the floor
  once you're zoomed in, in the smaller lettering; only three or more fold into a bubble zoomed out (hub-src, the floor labels).
  A new group's name fades in once its people have landed (owner: "they should pop in or fade in after"), never on an empty floor.
- Extended cuts count (owner, 4 November 2026: "Both count"): an official extended or alternate cut (X-Men: Days of Future Past's Rogue Cut,
  No Way Home's More Fun Stuff Version) is part of its film; its scenes give stages under the film's own title. Disc-menu deleted scenes don't count.
- Hill stays in Far From Home (owner, 4 November 2026: "Keep it on Hill"): the film stays in Maria Hill's appearances though the Hill on screen is
  Soren. What "Hill" does there belongs to Soren's ties, so Hill gets no new stages in it.
- Reused footage is not an appearance (owner, 4 November 2026: "No, leave it out"): Logan gets no Deadpool 2 entry for the 1979 scene
  (X-Men Origins footage), so the checked Wade and Logan stage stays out.
- Jimmy Weeks has a Raft file (owner, 4 November 2026: "New Raft file"): pr-jimmy-weeks, Frank's FBI partner who sells him out in
  The Punisher (2004) extended cut. In answers_fix.json (q "jimmy-weeks"), at_case.json, earths.json (Earth-58732), and his Network
  ties with Frank and Howard Saint in rel/uni/cuts/out.json.
- The Widows are a group (owner, 4 November 2026: "Yes, from Black Widow on"): Yelena and the Widows file stand together as The Widows
  from the end of Black Widow until its post-credits scene, where Valentina recruits her (O.X.E. Group). Yelena's in TEAM_AUDIT2
  (index.html, A: and T:, the last word on her teams); the Widows file's in raft_teams.json.
- A collective file names everyone it stands for (owner, 4 November 2026, on Sonya and Ana in Hawkeye: fine "if the file is explicit with the
  names and beats of every featured widow ... if not then they need their own files" and the collective becomes a group, not a file).
- The Widows bubble stays a bubble (owner, 4 November 2026: "We don't name groups that are only one ... as it is now, I guess it's fine"):
  no name for a one-member group, collective or not. The owner would rather have the Widows named one by one inside a group; the
  file naming each featured Widow is the agreed alternative.
- No stage that reads before the two meet (owner, 4 November 2026: "Leave it out"): Bruce and Natasha get no Captain Marvel stage for the
  credits-scene pager, since the app orders Captain Marvel at 1995 and it would become their first stage, set after the Snap.
- Ask every open question before any test run, in one batch (owner, 4 November 2026: three full-suite runs in a row because questions
  came up after each one, "a waste of time ... a waste of credits"). Check the parked lists (scratchpad owner_*/held_* files, side
  findings from checkers) before running anything long.
- The full suite (about 15 minutes) runs once, right before a main push. A data-only change gets the quick checks: tests/content.js,
  tests/check.js and the tests that touch what changed (files: ct36, ct49; the Network: ct64, ct65), a couple of minutes.
- Team Thor is Earth-16828 on the Atlas too (owner, 5 November 2026: "Own Earth-16828 map"): the Marvel Database puts the three shorts
  there (a branch after Age of Ultron), as the Network already did. `ATLAS_UNI.teamthor` (Australia, Los Angeles), Multiverse pin `u-16828`.
- Agents of S.H.I.E.L.D.'s 1931 to 1983 episodes are Earth-19859 on the Atlas (owner, 5 November 2026: "Earth-19859 map"): the Marvel
  Database keeps seasons 6 and 7's present day on the main Earth (the team returns in the finale) and puts the time-travel stretch in
  the Chronicoms' branch, where the Network already has Sibyl and the Malicks. `ATLAS_UNI.chronicoms`, pin `u-19859`; file tags for
  those years point there. Area 51 and Malick's estate left the main map (their only entries were from those years).
- What If...? is in Beyond, each world its own (checked 5 November 2026; a "39 entries on the main map" count was a miscount).
- **Next major update ideas, all cut since (Six Degrees and the Time Machine parked; the rest cut 13 November 2026)** (owner, 5 November 2026: wants a new kind of experience that is NOT content heavy, no research, writing
  or audits; no pick yet, "[No preference]"). All four run only on data the app already has:
  1. Six Degrees (recommended): a daily puzzle connecting two people through the Network in the fewest steps, each step showing
     the real stage; scored against the computed shortest path; only watched titles, so spoiler-safe.
  2. Wrapped: a swipeable year-in-review from watch history (titles, busiest month, most-seen person, Earths and places lit,
     ties unlocked, streak), ending in one shareable card.
  3. Time Machine: a slider through story order; the Atlas lights, Network groups form and break, statuses change, up to what
     has been watched.
  4. Compare with a friend: progress as a code or QR; shows what both have seen and what to watch to catch up; no server.
- Families stand together (owner, 4 November 2026: "Why is Laura Barton not part of the Barton family?"): a family circle (rel/out1.json)
  holds every member, parents and siblings included, not only those with no group record; a member stands in it whenever they're in
  no other group (Clint with the Avengers in Endgame, with his family in Hawkeye). And a family or partner tie needs a stage in every
  title where the two deal with each other, so watching any one of them shows it (the Bartons had none in Hawkeye).

### Tests

The tests are in `mockup-data/tests/`. They use the Playwright in `/opt/node22/lib/node_modules/playwright` and Chromium at
`/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`; adjust those paths if the environment differs.

```sh
rm -rf out/root && mkdir -p out/root && cp out/main.html out/root/index.html && cp ../*.png ../manifest.webmanifest ../sw.js out/root/
export ROOT=$PWD/out/root                                                            # feat.js fails without it
for s in check smoke feat; do node tests/$s.js; done                                 # the app at $ROOT
for s in ct32 ct36 ct37b $(seq -f 'ct%g' 38 65); do echo "== $s"; node tests/$s.js $ROOT/index.html; done
node tests/ct35.js                                                                   # test build only (out/datapad-test.html)
```

| Test | Covers |
|---|---|
| ct32 | The Collection |
| ct35 | Specimens and Comms messages (test build) |
| ct36 | Organizations and group files |
| ct37b | Chapter names revealed by watching |
| ct38 | The chapter fold and its save migration |
| ct39 | Level milestones |
| ct40 | No level-up pill and no XP line |
| ct41 | Ids moved from Beyond to MCU |
| ct42 | Chapters 3 to 6 reorganized, and "Completed" once ever, with an old save |
| ct43 | X-Men '97 and I Am Groot seasons in release order only |
| ct44 | The episodes link follows its checkmark |
| ct45 | A chapter's Period from what you've watched; read marks kept |
| ct46 | Nick Fury and S.H.I.E.L.D. as two boxes, from a full old save |
| ct47 | Seasons shown with the title, never in the sentence |
| ct48 | Agents of S.H.I.E.L.D. S6 and S7 as two titles, from an old save |
| ct49 | Factions: staging, roster and group file, grouping, current and Former, the link back |
| ct50 | Opening an index starts at the top; backing out of a file keeps the list's place |
| ct51 | The Sort switch: First seen or A to Z, one setting for the three indexes |
| ct52 | Universe tabs named by the Sacred Timeline's rule; holding the Incursions line marks them all; the Doom egg stays on Doomsday's title |
| ct53 | First seen and Last seen by release order, season by season; the Void's Juggernaut merged into the Last Stand's file |
| ct54 | Search within the tab you're on; the Defenders in two Parts; pills take taps only while open; the Atlas reaches the pole |
| ct55 | Overlays pin the page behind them and give it back; every index file names its universe |
| ct56 | The S.H.I.E.L.D. keycard and the Level 7 files |
| ct57 | Back returns to the file you came from, across indexes |
| ct58 | Damage Control's incident reports: search, grouping, sorting, links into found indexes, the replays' file buttons only into found indexes |
| ct59 | Every index opens with its Atlas place (Damage Control with Midtown, the Collector with Knowhere) |
| ct60 | The Space Stone in the Tesseract's case |
| ct61 | The Darkhold and the Accords held on their titles; only the Tesseract live in the Collection; the sling ring lands only in the Atlas (every realm and submap, never the Incursions); the Watcher's other realities, in his box and in Beyond the MCU |
| ct62 | A holder's name in the Collection: the list of what they held, their own Compound or Raft file only once found, the right person among a tab's many of a name, back to the list; holders go by their files' names; no Benny or AIDA left |
| ct63 | The Held line: the Collection objects a person holds under a title's last entry, gated by the Collection, linked both ways |
| ct64 | A person shows the group they're in during a title you've watched (Peter at Midtown with only Homecoming), files and Network alike |
| ct65 | A file opened from the Network: its group opens the Compound filtered by that group, and back returns to the Network |
| ct66 | No one's last group comes from a scene set in the past inside a later title (Endgame's 2012 visit): Sitwell, Pierce and Rollins end in HYDRA, Rumlow Independent |

**Fixed (November 2026):** six tests had been failing since before the 176c87b main push, five because the app had moved on and one
over a real bug. ct54 (a pill from earlier was still up; now it waits), ct61 (the Character log button left the rings; now the eye's
middle counts too, and the app takes a double-tap there), ct51 (the sort is `state.ixSort`; and its test server answered network.html
with the app, a second copy that saved over the first: tests must serve only the page itself), ct53 and ct55 (first and last seen and
the universe moved onto the ID card) and ct43 (steps carry episodes now). The real bug: a step tagged to an episode of a show split
into seasons ranked after everything, so it read as last seen (Sitwell "Agents of S.H.I.E.L.D. S1 · Episode 16" instead of Endgame,
Coulson S6 instead of S7). `seenRk` now ranks it with its season.
A failing test must stop a push. Don't pipe test output through `tail`, which hides the exit code. Test pages are served as
`text/html; charset=utf-8`, or the text comes out garbled. Screenshots after marking many titles watched: wait about 9 seconds, or the
insignia celebration covers the page.

## Data (mockup-data/)

- **`handover.json`** (November 2026): one person, one history between the Compound and the Raft. `{ allyId: { threat, ho, rewrite,
  drop, add } }`. `ho`: the stretches in order, `[side "C"|"R", title it starts in, 1 when that title is told in both, each its half]`;
  the Sacred Timeline orders by story (`atlOrd`), other universes by release (`REL_IX`, `hoOrd`). `rewrite`/`drop`/`add` per side:
  a step by title and `i` (its index among that file's steps for the title). The app applies it at load (`HANDOVER`); `hoKeep` hides
  the other side's steps, `hoChain` adds "File transferred / opened / reopened" lines (links once the twin is found), a closed file's
  status is Transferred. A one-stretch `ho`, or a Raft file shared by several people, is skipped.

- **Format briefs.** Read the brief before editing its files.
  - `ALLIES_FORMAT.md`: the Compound (heroes).
  - `COLL_FORMAT.md`: Collection objects.
  - `SPEC_FORMAT.md`: specimens.
  - `CUSTODY_FORMAT.md`: chain-of-custody rules.
  - `AUDIT_FORMAT.md`: the status audit.
  - `opp/OPP_FORMAT.md`: who opposed each villain.
  - `opp/ORG_FORMAT.md`: organizations.
- **The Raft (villains):** the `fc_*_out2.json` files, then `cameo_*`, `stages_*` and the opp files.
- **The Compound (heroes):** the `allies_*.json` files. The `allies_zz_*` files are patches applied in order: patch, patch2, patch3,
  patch4, zaudit, zzfix.
- **The Collection:** the `coll_*.json` files. `coll_spec_*` are the specimens. `coll_existing.json` is the old list, kept for reference
  only.
- **`audit_fix.json`: every later change to a Raft, Compound or Collection file.** Lists `T` (Raft), `A` (Compound), `C` (Collection) and
  `idmove`. `devbuild.py` applies them in order, just before the ABC move, so each op is keyed to the data as the ops before it leave it.
  - An op names its source in `f`. `id` is a file id, or a list (the MCU file first, then the show's file that merges into it).
  - `old` is a run of steps that must match exactly and `new` replaces it (an empty `new` deletes). `set` replaces fields (null removes
    one). `add` is a new file. `drop: true` removes a file. `idmove` sends a dropped file's saved marks to another id.
  - To change a file, append an op at the end of its list rather than editing the source files under it.
  - It holds, in order: the lore audit, the owner's decisions on the medium findings, the second sweep, the team-file removals, Area 55,
    and every hero file's teams from the faction work (completeness sweep, re-check, hand fixes) and the Raft group-file flags.
- **`raft_teams.json`: every villain's factions**, id to staged `tm`, read by `devbuild.py` after the ABC move (final ids). Group files
  carry their own name. To change a villain's factions, edit its entry: stages in story order, each keyed to the title that shows it,
  the last one where they stand at the end of the file.
- **`appear_fix.json`: the appearance sweep's changes** (October 2026), keyed to the final ids and applied after the ABC move, before
  `raft_teams.json`. Per file under `T`, `A` or `C`:
  - `ins`: `[anchor, [steps]]` puts steps right after an anchor step (`[sentence, title]`; null puts them first).
  - `fix`: `[old, [new steps]]` swaps one step for others.
  - `move`: `[step, before]` puts a step right before another.
  - `post`: `{old, new}`, `{old, before}` or `{after, new}`, matched against the file as the sweep leaves it.
  - `set`: replaces fields.
  - The top-level `merge` list turns one person's two files into one: the other file's steps join in the given story order, its
    opposers and links follow, and its id goes to `IDMOVE`.
  - To change a file again, add to its entry here (or to `audit_fix.json`), never to the source files under it. The scripts that wrote
    it lived in the session's scratchpad and are gone; `appear_sweep.json` holds what they produced.
- **The audit records:**
  - `audit_findings.json`: the lore audit, F001 to F705, each with its fix, source and status, all settled. `recheck` and `verify` hold
    the two later passes, `lead` the reviewer leads (R1 to R5, decided), `extra` D1 and D2. The 8 entries in `aside` are VisionQuest's.
    Report page: https://claude.ai/artifact/3bB2MxjEMd9mwbv64yWHt4.
  - `audit_sweep.json`: the second sweep and the team-file review with the owner's decision on each (`owner`).
  - `raft_teams_src.json`: the first faction sweep (the Raft's 54 group files), one entry per membership with its source; dropped
    ones are marked with why.
  - `factions_sweep.json`: the completeness sweep (every organization anyone served, with sources), the name map, the hand fixes,
    and `recheck`: the independent pass over all 1,042 claims, with every flag and what changed.
  - `appear_sweep.json`: the appearance sweep.
    - `sweep`: each of the 32 chunks' finds (adds, season fixes, stages, flags, unsure, complete).
    - `recheck`: the independent verdicts on every claim.
    - `flags`: the verdicts on the flagged steps and leftover gaps.
    - `overrides`, `flags_override` and `manual`: my rulings and hand fixes.
    - `owner_calls`: the owner's decisions and the open questions.
  - Log and timeline fixes went straight into `index.html` (DATA, DOSSIERS, SAGA).
- **Names:** `names_common.json` (id to the name the story mostly calls them, with the real name kept for its own row) and
  `names_fix.json` (every other name said on screen, staged; `hold` renames Collection holders to match). The sweep and its re-check are
  in `names_sweep.json`.
  - A Collection holder goes by the name on the person's file ("Ronan" became Ronan the Accuser). Add to `names_fix.json` `hold`, per
    object.
  - A variant in another universe goes by the main universe's file name, unless the sweep set its name on purpose or the screen names it
    differently (Kid Loki, King Thor). Rename a file with `set` in `appear_fix.json`, unless `names_fix.json` already sets its name.
  - Before renaming, check `names_sweep.json`: a name it set on purpose (Wenwu, from the script; Nova Prime Irani Rael, the owner's rank
    rule) is a decision, not a mistake.
- **Writing pass:** `prose_coll.json`, `prose_raft.json` and `prose_cp.json` (file id to `[old text, new text]`, matched on the text as
  built; the build reports any line that no longer matches).
- **In index.html itself:** Damage Control's reports (`DC`, 238 of them, kept in the order they happened, universe by universe), the tactical replays (`TR`, seven battles), the Level 7 files,
  the Watcher's other realities (`ALT_BOXES`) and the easter eggs (`EGGS`, `ROW_EGGS`, `BOX_ROW_EGGS`).
- **Organizations:** `opp/org_*.json`. Villainous groups go to the Raft, heroic ones to the Compound. Group files carry `grp:1`.
- **Ids:** a prefix says the universe tab: none for MCU, `st-` for street-level (also on the MCU tab), `by-` Beyond, `sv-` Spider-Verse,
  `fox-` FoX-Men, `pr-` Pruned.
- **Steps:** `[sentence, exact title, status(, holder or home)]`, in in-universe order.
  - One step per title, unless the status or the fourth field changes inside it.
  - Multi-season shows get one step per season, starting "In season N," in the data. The app hides that phrase and shows the season
    with the title. A scene from the past reads "In season 2, in 1945, ..." and sorts by its year.
  - Titles must match `alltitles.json` exactly.
- **Staged fields:** `n`, `k`, `tm` (and a villain's `cl`) are a string or a list of `[value, title]`; the app shows the last stage whose
  title is watched. Key a stage to a season's own title ("Agents of S.H.I.E.L.D. S3"), never the whole show. Each value must stay true
  until the next stage takes over, and the last one to the end of the file.
- **Statuses:**
  - Raft: Active, In custody, Captive, At large, Missing, Allied, Deceased.
  - Compound: Active, Off-world, Retired, Fugitive, Imprisoned, Missing, Deceased.
  - Collection: In use, Secured, Lost, Destroyed.
  - Specimens: Thriving, Endangered, Extinct.
- **Order of the build's merge stages:** cameo patches, stages, allies_zz patches, st- remap, organizations, the Collection, the
  one-step-per-title merge, opposers, name normalization, `audit_fix.json`. Then the last stage moves the ABC shows' files from `by-` to
  the MCU tab and merges HYDRA, S.H.I.E.L.D., the SSR, the Darkhold and the Kree into one file each, applies `appear_fix.json`, then
  reads `raft_teams.json`.
  `IDMOVE` carries saved "seen" marks to the new ids.
- **`answers_fix.json`: the owner's answers (November 2026), the last word on the files.** Applied by `devbuild.py` after everything
  else (after the writing pass), keyed to the final ids. Under `T` or `A`, ops naming their question in `q`: `add` a new file, `drop`
  (with `into`: the id that inherits its saved marks), `set` fields (null removes one), `steps`: `[[old step, [new steps]], ...]` (the
  old step matched on its text and title; an empty list deletes it). Splits, merges and moved steps are done here; `at_case.json`
  keys and `STEP_AUDIT2`/`TEAM_AUDIT2` entries follow the new ids and step positions.
- **Staged names show by watch progress everywhere** (owner, November 2026, question 51: a cover name until the reveal). The files'
  own staged `n` (`[[name, title or "Title#episode"], ...]`) drives the Files and the Network card alike: the Network takes the
  first name until a later stage's title or episode is watched (hub2 passes the stages as the node's 14th field, hub-src `nameNow`).
  A cover name ("The Green Goblin" until The Spectacular Spider-Man #26) is just a first stage.
- **The Network follows split and merged files** (`network/rel/retarget.json`, read by relbake): each rule moves a connection of a
  file that's gone, or of the steps that moved to another file, to the new file(s): `from` (a Sacred Timeline name, or an id in the
  other universes), `to` (a list; a split gives each their own copy), `titles` (only stages in those titles; none, all).

## How the app works (key ideas in index.html)

- **Three paths, each with its own checklist:** Chapters, the Sacred Timeline (story order or release order) and Characters. A checkmark
  key is `ck(box, title)`; the timeline uses `tl::title`, release order `tr::title`. Episode progress is per list, under the same key.
- **`atlSeenT(t)`:** a title counts as watched if it's checked in any list. A season title also counts when its whole show is checked
  on a timeline.
  - `ATL_SEAS` maps a whole show to its seasons. `ATL_ORDER` is story order: the Chapters' titles in order, then the character boxes'.
  - `atlSeenStep` opens a file step written "In season N," when that season is watched.
  - `stageAt` picks a staged name or description by what you've watched.
  - The first Pick-your-path pop-up (`orderPick`) shows on a new agent's first boot.
- **Seasons on screen:** `stepTxt` drops "In season N," from the sentence, and `stepTtl` adds the season to the title, on the steps and
  on the First seen and Last seen cards (`seenTtl`).
- **The Chapters:** 11 numbered chapters (The Avengers Initiative, A Space Odyssey, Secret Empire, Avengers Disassembled, The Defenders,
  Infinity War, Fallout, Hall of the Gods, Generations, Dark Reign, Secret Wars), then Beyond the MCU, The Spider-Verse, The FoX-Men,
  Pruned Timelines and Incursions. The Chapters page has three missions, one per act.
- **A chapter's Period** (`perNow`) is built from the titles you've watched, in any order, as one range. A read Period stays read when it
  grows (`perInit`, `state.perV2`).
- **Character boxes:** 33, each with its own design (`h2`, `style`, `decor`, `tileDecor` for the tile only). Nick Fury and S.H.I.E.L.D.
  are two boxes (`FURY_BOX`, `SHIELD_BOX`): S.H.I.E.L.D. keeps the facility's hazard stripes; Fury's is black leather with a steel band
  cut by the three claw marks of his insignia (the long marks run down the tile only; the open page keeps just the cuts). Captain
  America's box doesn't include Agent Carter S1 and S2. Item notes show in every box.
- **Insignia:** `EMBLEMS`, `EMBLEM_NAMES`, `EMB_UNLOCK` (the character's main appearances, several per insignia), `EMB_HINT`, `MET_BY`
  and `NAMED_BY`. A file wears one through `em`.
- **Paths: Agents of S.H.I.E.L.D. season by season (owner, October 2026):** one stop per season (S1 to S7 and Slingshot), each placed by
  its premiere among the other stops; S1 is where Fury's and S.H.I.E.L.D.'s lines meet, the rest are on S.H.I.E.L.D.'s line. On main
  (`1b65cfc`). The owner wants Paths changes like this on main right away: the Network may not work out, and Paths may simply stay.
- **Paths:** `mapData` builds the layout at runtime from `DATA.map.rows` (one per character box, in `DATA.chars` order) and `cols` (one per
  title, with the rows standing at it, `o` the row that owns it). Changing who is at a title means changing `rows` and `cols` only.
- **Save migrations, all run at load:** `renameChecks` (`RENAMED`, `SPLIT`, `MOVED`, `FOLDED`), `chReorg`,
  `furySplit`, `logSplit` (`LOGSPLIT`), `perInit`, `relSplit`, `epSplit`, `epFold`, `newsKeysV2`, and the `IDMOVE` remap. There is no save code any more (owner, October 2026: progress lives in the
  Android app); the Agent File ends with Reset datapad.
- **Clearance levels:** counted from XP (`XP_AT`), shown on the Agent ID. The owner removed the XP bar, the "to next level" line and the
  Clearance raised pill.
- **Holds:** holding a chapter or character box, or a timeline's key, marks it all watched. Holding the Incursions line under Avengers:
  Doomsday (shown once Doomsday is checked) marks every Incursion watched; the Doom egg (holding Doomsday's row) skips that line.
- **Pills:** a chapter or character box says Completed once ever (`state.boxDone`). The Sacred Timeline and Multiverse pills fire only
  from the timeline page.
- **The three indexes:** the Raft (villains), the Avengers Compound (heroes) and the Collection (objects and specimens), found through
  discovery eggs in the Atlas. They share one scrolling panel (`collPanel`): opening one starts at the top; backing out of a file returns
  to the list's place (`collY`).
  - **Universe tabs:** Sacred Timeline, Beyond, Spider-Verse, FoX-Men, Pruned (`RF_UNI`, shared by all three). An Extra's tab reads
    "[ Classified ]" until its chapter box is opened, its Extras character box is opened (`MV_CHAPTER`, `state.charOpen`: the Watcher
    opens Beyond, the Sony Spider-Men Spider-Verse, and so on), or every title in it is watched (`slNamed`, the Sacred Timeline page's
    own rule). The same rule names the Network's universe tabs (`rfUniName`). Owner, 6 November 2026: finished the Watcher's box on the
    Characters path and the Network showed only the Sacred Timeline.
  - **First seen and Last seen** go by release order, season by season (`seenRk`: the season's title in `DATA.timelineRelease`, else the
    title, else the Chapters path after the rest). Owner's call, October 2026: the Chapters path ignored seasons and crossovers.
  - **Sort switch** under Group by: First seen (the same release-order rank of the first title, ties A to Z, grouped) or A to Z (the whole tab
    in one list, no groups), ignoring a leading "The"
    (`ixCmp`, `state.ixAZ`, one setting for all three). Groups by Status, Class or Type follow a fixed list; groups by
    Faction, Team, Holder or Opposed by are A to Z. Search results are A to Z.
  - **Factions and teams:** a villain's Factions row (`rfTeams`, `tmChips`) and a hero's Teams row list every group served so far, the
    current one lit (`tmNow`) and the rest marked Former; Independent shows only when it's where they stand now. A villain's header names
    the current faction, a hero's the current team. A tag opens that group's roster, with a Group file button when the group has its own
    file (`rfGroupFile`, `cpGroupFile`). Group by Faction (Raft) or Team (Compound).
  - **Names on files:** a file goes by the name the story mostly calls them (Red Skull, Captain Carter); where that's an alias, the real
  name gets its own Real name row, staged to the title that first says it, and searchable (`rnNow`, `alNow`). Aliases have their own row.
- **Damage Control** (in Midtown on the Atlas, hi-vis green): incident reports in every universe, under the Raft's tabs, with search,
  grouping (year, title, involved, team) and links into the indexes you've found. Seven battle reports carry a tactical replay
  (`trHTML`, `trDraw`): everyone on the field moving beat by beat, armies as swarms, the beat in words underneath.
- **Back always returns to where you were**, across indexes (`collJump`, `collRestore`). Every overlay pins the page behind it.
- **Links between indexes:** every link from one index into another goes through `ixFile`, which opens only an index you've found and only
  a file with a title you've watched (report names, replays' Open file, the Collection's holders, Also on file).
- **Holders in the Collection:** tapping a name lists everything they held. That list carries their own Compound or Raft file
  (`cxHoldFiles`): the file in the object's universe with that name that shares the most titles with the holder's steps. A tie links
  nothing. `CX_HOLD_AKA` covers Steven Grant, Marc's alter, and `CX_HOLD_PICK` the ties settled by hand (the young and the old Charles both
  on Cerebro, each labelled by where you first saw them). Back from the file returns to the holder's list.
- **S.H.I.E.L.D. Level 7:** a sideways swipe on the S.H.I.E.L.D. box's stripes brings up a reader with your own Agent ID; swipe it
  through for the Level 7 files, each tied to one title.
- **The Atlas** has sector codes when zoomed right in (A1 to J24 on the Earth), on every map but the Incursions wall.
- **Held objects:** holding Doctor Strange in the Multiverse of Madness in any list casts the Darkhold (`cxDark` with a scope); holding
  Captain America: Civil War brings up the Sokovia Accords to sign or refuse (`cxAccords`). Each is its own Classified file. In the
  Collection only the Tesseract answers to a touch (`CX_LIVE`): carry its mark off for the Space Stone.
- **The sling ring** (`slingDest`, `slingLand`, `slingPortal`): after Doctor Strange, three circles in one stroke anywhere open a portal
  onto a place in the Atlas you've charted, and land you there (owner, October 2026: Atlas only again). Earth with its cities' spots, the
  Cosmos, Beyond and the multiverse with the places inside its universes, never the Incursions. The realm first, then the place, so
  Earth's hundred places don't drown out Beyond's few; never the place you're looking at. The page is held still once the stroke is a
  circle, and a mouse stroke doesn't click or select what it's drawn over.
- **The Watcher's other realities** (`shatter`, `ALT_BOXES`, `altBox`): holding in the Watcher's box or Beyond the MCU cracks the box
  away onto one of fifteen other realities' boxes (Captain Carter, Strange Supreme, Star-Lord T'Challa, Killmonger, the Hydra Stomper,
  Infinity Ultron, the Queen of the Dead, Zombie Captain America, Spider-Man, Survivor, Party Thor, Nebula of the Nova Corps, Hela of the
  Ten Rings, Kahhori, Storm, Blade Knight), in turn, each a twist on its hero's box with made-up titles (their own and other heroes'
  they turn up in, the same name in every box that shares it), nothing to tick. A few seconds later it shatters back. Its pieces are cut
  while it shows (once the first break's pieces are gone), stacked over it, so the break never blinks. Every piece has `will-change:
  transform` so its contents fall with it on phones. An invisible `.fx-lock` takes taps and scrolls for the whole egg. The Watcher is
  named (Extras cover and tile) with his insignia, after What If...? or Loki S1, the same moment the multiverse opens.
- **The Nick Fury box:** two fingers down throw Coulson's cards (blood on them after The Avengers); two fingers up (or dragging his name
  up with a mouse) play his last page: the pager flicked up, the box turned to dust, her star on the screen, the box gathered back.
- **The Snap** (all six stones, tap the colored line): half the character boxes crumble with Fury's dust (`snapBox`, a filter of its
  own per run), one after another, then they're gone from the Characters page and the list closes up (`gridFlip`); undoing it opens
  their places and they gather back. A heading with nobody left under it is hidden.
- **Hero and villain files of the same person link both ways** ("Also on file": `rf` on the hero file), each shown only once that
    index is discovered and its file has a watched title.

## Standing rules from the owner

- **Added 13 November 2026: what you only read scrolls; what you use stays** (owner: "if the network popup isnt interactive it
  shouldnt be stagnant and should scroll with the rest of the pop up"; then "Yes do portrait too"). The Network's card at full height
  is one scroll, upright and sideways: name, summary and file move together; only the grip (top) and the buttons (foot) stay; pulled
  down from its very top it slides back down (touch handlers on the card, not the file). Built 13 November 2026, waiting on "push".

- **Added 13 November 2026: never describe a design in text. Build it and show it** (owner: "How many times do i have to say I dint
  care about design breakdown by text. Either mp4 or mock it up my god"). Any look or animation goes to the owner as a mockup in the
  test build with an MP4, never as a written plan, an audit line or a report page. Text is for decisions about where things go.

- **Added 11 November 2026: when the owner asks what you think, say what you think.** Asked where VisionQuest belongs, a chat put the
  owner's own question back as options; owner: "I asked what you think and what you did was just ask me the question I had." Give a
  clear opinion with the reasons; options are for decisions that are the owner's to make, after you've said your pick.
- **The owner's chapter rules (11 to 12 November 2026):** a chapter needs a theme, a story with a beginning, middle and end, and a
  reason for being; not too long or too short; each title leads into the next within it, and each chapter into the next. A small
  credit scene isn't split into its own entry ("It's not a big enough end credit to be split").

- **Added 12 November 2026: a scene set in the past inside a later title doesn't move anyone** (owner, on Jasper Sitwell ending in
  S.H.I.E.L.D.: "fix it that way"). Endgame's trip to 2012 meets Sitwell, Pierce, Rollins and Rumlow inside S.H.I.E.L.D.; their files
  listed that stage first (as their earliest), but group stages sort by their title's place in the timeline, so it came out last.
  `PAST_VISIT` in index.html (after `TURN_KEEP`) drops those stages; they end in HYDRA (Rumlow Independent). ct66 checks it.
  The same check over every file (the app's files take the last group in the order written; the Network re-sorts by title order) found
  more, fixed in the Network by `split.json` "past" ("file id|title" -> the title it happens before; hub2.js `soP`): Yondu (the
  Holiday Special's memory of him as a Ravager; he ends with the Guardians), Foggy (Born Again S2's look back; he ends in Nelson,
  Murdock & Page), Janet (Quantumania's thirty years with the rebels; she ends Independent), the cartoon En Sabah Nur (X-Men '97 S2's
  ancient Egypt; he ends with his Horsemen), the 1967, Unlimited and Spectacular Peter Parkers (their own shows before Across the
  Spider-Verse, where they join the Spider-Society). Roxy Glass's Deke Squad stage was keyed to all of S7 instead of her episode, 133.
  ct66 checks all twelve in the Network. What's left differing between file and Network is by rule: Independent only counting at a
  real departure, and the zombie world.

- **VisionQuest aired in full (owner, 11 November 2026: "Indexes, files, networks, logs, paths, all need to be updated for the
  entire show").** It stays Chapter 9's last title (Generations: fathers and sons; it closes Billy looking for Tommy). Its finale's
  post-credits scene (Doctor Doom) is not split into its own entry (owner: "It's not a big enough end credit to be split"). Work in
  the scratchpad `vq/` (sources, briefs VQ_FILES.md, VQ_LOGS.md, VQ_PLACES.md). The episode names 5 to 8 are in `episodes_a.json`.
  Done (all fact-checked by a second pass; copies in `mockup-data/unfiled/visionquest/`): the files through episode 8 (answers_fix q
  "vq", each file's steps before VisionQuest kept, then its checked VisionQuest steps; ep_tags), Ultron's VisionQuest steps, Billy, Raza
  and both Wanda files' steps, new Simon Moorhouse, Victoria Horton and The NEST; the three logs' entries and rows; the Atlas; the
  Network (rel/stage_fix_zzzzzzzzzzzzzzzzz_visionquest.json for existing connections, rel/uni/newfiles/extra_visionquest.json for new
  ones): 51 connections with VisionQuest stages. Episode 8 had no transcript: its claims rest on Wikipedia and at least one of three
  recaps (single-recap details were cut). Left out by the rules: Clancy (one episode, named only in subtitle labels), Violette Horton
  (subtitle label only), the earlier Paladins, the bots, Doctor Doom (the hooded figure is never named).
  Owner, 11 November 2026: "Keep Logan, push when ready" (Earth-17315 Logan keeps his Deadpool & Wolverine step, so he stays in the
  Sacred Timeline room with no connections there; the VisionQuest update goes to main once files, ties, rebuild and suite are done).

- **Added 11 November 2026 (owner, on Darren Cross not showing in Kang's Empire): dying at the turn keeps the group.** Someone who
  turns on their group and dies in the same scene stays in the group they served (Darren in Kang's Empire for Quantumania). People
  who leave a group and live on stay Independent (or in their next group) as before. Done: of 122 people who join and leave a
  group within one title, the 42 whose step there ends Deceased were checked (scratchpad `turn/`); 12 turn and die in the same
  scene and now end in the group they served (`TURN_KEEP` in index.html, after `TEAM_AUDIT2`, drops their closing Independent:
  Darren Cross, Ivan Vanko, Maya Hansen, Jackson Brice, Leland Owlsley, N'Jobu, Daniel Blake, Kayla Silverfox, Caliban, Jack Murdock
  (2003), Dora Skirth, Aaron Davis with his Prowler file); 21 leave and live on (unchanged); 9 are the zombie world, which keeps its
  own rule (killed or destroyed, they leave their group).

- **Added 7 November 2026:** don't change how something works unless asked (Thanos was kept out of the Snap unasked: "Did I ask? No");
  no instruction words anywhere, "scroll" included; a count is fine, "out of X" and totals are not (the files aren't the population);
  check every animation frame by frame (and with the pop detector) before saying it's done; a long check is the owner's time too, so
  time it and say so.

### The owner's answers to the 43 morning-report questions (4 November 2026, submitted on the report page)
Numbers are the report's (`mockup-data/audit2/owner_answers`). Where the owner wrote "make a call", the call made is marked (call).
- 1 A: every named employer counts, even small or brief jobs. 15 A: unnamed workplaces under a plain description ("Anne's law
  firm"). 41 A: the further roles listed (the Lion's kingdom, Longshot at Mojo's network, Nightcrawler's monastery, Moira's Muir
  Island center, Jeri at Rand, Sheikh Abdullah's mosque, Amy's crew, Pilgrim's gang, Krista's hospital, Andre's ring, Raava as
  Rhodes, Dimitri with "Fury", the Fox jobs, Dirk Leyden, Anne and Dan) each count as a group.
- 2: the Watcher joins the Guardians of the Multiverse, then goes back to watching (Independent); Kahhori, Byrdie and Storm stay.
- 3 B: Hive's followers get their own plain-label group (not HYDRA). 4 B: Mace ends on the Framework's Resistance.
- 5 A: Wakanda = Wakandan or living there; Nakia stays. 6 A: students count (school from their first title; expelled or dropping
  out is a departure).
- 7 (call): a support group counts for whoever runs it (Curtis, Malcolm), not for those who only attend.
- 8 C: Havok (Apocalypse) and Victor Timely are members; the others are allies. 9 A: Kraglin a Guardian from Vol. 2.
- 10 (call): Wade ends with no group; his friends are not an organization. 11 B: the hired pair are crew members.
- 12 C: Nomak and Knull count as leading their groups; Dormammu and Arishem don't. 13 A: a familiar is in the house it serves.
- 14 (call, "better safe than sorry"): unnamed crews that stand across a story get a plain label; one-episode crews don't.
- 16 B: a short alliance inside one title is being an ally. 17 B: the Spider-Verse team under a plain label.
- 18 (call) A: Tuklo keeps her Choctaw Nation group only. 19 B: "Cassandra Nova's forces". 20 (call): "Bloodstone's hunters".
- 21 A: a plain label for Kraven's father's operation. 22 A: no Spider-Catchers group. 23 A: "Domingo's crew". 24 A: keep "The Omegas".
- 25 B: split combined files, except 42: Dum-E and U, and the Toro brothers, stay combined; Gao's champions split, made a group.
- 26 B: Venom (Sony) is the symbiote alone, a separate file from Eddie. 27 B: one Victor Creed file. 43 B: Colossus stays two files.
- 28 B: Marvel's "B" Earth numbers everywhere they exist. 29 B: Earth-6799 for the 1967 cartoon. 30 B: Earth-17315 for Logan's
  people, Wolverine's Logan and Deadpool & Wolverine entries in a file of their own. 31 B: the Eminence has no Earth number.
- 32 C: a broken-up group ends case by case ("At large" for the Brotherhood, "Allied" for Horsemen who switch sides, Genosha as is).
- 33 B: Robin Hinton stays active; the 2091 death is told in the text. 34 (call) C: drop the 1994 Electro and Fury connection.
- 35 A: changed-timeline steps go to the changed-timeline files. 36 A: Pietro's WandaVision step moves to a new Ralph file (noted).
- 37 B: keep the current names, even ones the screen never speaks (Graviton, Scarlet Scarab, Final Horsemen, Luphomoid, Wild
  Sentinel, Ryhno's Gang; taken to cover credits names like Crossbones too). A name that gives away a later reveal still goes.
- 38 A: extended and IMAX scenes count. 39 A: add the missing places. 40 B: Peggy keeps the Arctic.
- 44 to 47, 49, 50: "make a call based on what's true in the show" (Black Tom and Banshee, Mike and Raina, Fury and Gonzales,
  Dottie and Krzeminski, Cottonmouth and Diamondback; Marci and Foggy: "if they are said to be together off screen then they're
  together"). 48 A: Scott and Ross's deal stage moves to Infinity War.
- 51 A: a Network card shows the cover name ("Green Goblin") until the episode that reveals who it is, for every such person.

- **No "Layer 1/2/3", plain step-by-step plans** (owner, November 2026: "stop calling it Layer one ... it sounds outdated. Just give me
  step by step"). Call things what they do: the tests (do the features work), the content check (is anything shown too early, does
  anything contradict itself; a fast version before every push, a full one that ticks every title one at a time), the audit (is the
  content true). Lay a plan out as numbered steps.
- **Review passes end** (owner, November 2026: "every time I run a check, something always pops up ... will this nonsense ever be
  done"): a review acts only on factual errors with evidence. Rewordings and "either works" calls are dropped, never reported as fixes.
  A pass that finds only those closes the material; no more passes on it unless new content is added. Tell the owner plainly what a
  pass did and didn't cover.
- **Main only after the owner has checked the test build** (October 2026: "I thought this was ready to launch but this was pushed to
  main still with issues"). "Push when ready" means: fixes go to the test build first, the owner looks, then main on their word.
- **One title height on every page** ("No standard. I've said time and time again at consistency"): every page's title is 28px Anton
  at the status bar plus 6px, 20px in (raised from 26px in two steps, owner, November 2026: "my phone can accommodate them being higher"). Count the status bar once (`env(safe-area-inset-top)`); the Network, in its frame, can't see
  it, so the app passes it in (`netSat()` to `netSeen`, the `--sat` variable). Check with a status bar emulated
  (`Emulation.setSafeAreaInsetsOverride`, top 36): every title's top is 42.
- **The Log keeps its name; its tabs are Chapters and Paths** (owner, November 2026: "Characters" read like the character logs, renamed back) (owner, November 2026: "Story" clashed with the Story page; then
  "Rename paths to characters in the log tab", then back to Paths once character logs took the name). In the code the tab is `paths` (`data-logt`, `mapPanel`).
- **No tap flash anywhere**, inside frames too (`-webkit-tap-highlight-color:transparent` on `*`).
- **The ticker plays on over Comms** (owner, November 2026): opening Comms no longer stops it; each story joins the list as it
  finishes (`newsMark` keeps the open list up to date).
- **Nothing sits under the news ticker**: a card at the bottom of a page rises over it while it runs.
- **The main MCU world is Earth-199999** (owner, November 2026: "The main mcu earth is earth 199999"), the Marvel Database's number:
  every label, district and line of story text uses it (`earthOfFile`, `earthOf`, `HOME`, `earths.json`). The films call it Earth-616;
  Peter B. Parker's Earth-616B in the Spider-Verse is a different world and keeps its name.
- **No "tap / hold / swipe to..." text anywhere** (owner, November 2026: "cut the stupid tap to whatever text everywhere, it's
  immersion breaking"): text names what's there, never how to use it. Box covers read Unlock (can be opened; owner: "Change [ Locked ] to just Unlock") or [ Classified ] (not yet), the same on Chapters and Characters; a locked box
  tapped again counts down "Override: N to go"; the boot screen says AWAITING AUTHORIZATION. Only the eggs' own how-tos, revealed on
  purpose in the Agent File, explain a gesture.
- **Pop-ups have no Back button**: back, or a tap off it, closes it. **The phone's back closes the top thing only**: an open card in the
  Network has its own step back (`netcard`), so back closes the card and leaves the Network open.
- **A pop-up slides open the way it slides closed**, and only slides up for more when there is more to show.
- **A file opens only once it's found**: Open file in the Network shows only when `ixFile` finds them (the Compound or Raft found, and
  them in it).
- **The Network colours people by their group**, not hero or villain ("reductionist"): in the room each crew has its own colour (no
  two neighbours alike), in a web each group is what they are to them.
- **The Network reveals what's new like every page** (owner, November 2026: "there needs to be a reveal animation on network for new
  bubbles like how every other page reveals new additions"): someone you haven't seen there lights its dock button (`netFresh`, counted
  by the frame as you watch, via `newDots`); opening it pops them in, nearest first, with a gold ring (`reveal`, `p.popAt`), and they're
  remembered (`state.netKnown`, `netKnow`). Holding the dock button marks everyone as seen (`netKnowAll`).
  **Every universe counts** (owner, 4 November 2026, option A: a whole Spider-Verse watched lit no dot, since only the room on screen
  was counted): the dock dot counts newcomers in every universe whose tab you've opened up (`fresh`); opening the Network pops in the
  ones in the room it opens on (`freshHere`), a universe tab that still has newcomers wears the app's new dot (as Story's mode buttons
  do), and opening that tab pops them in. The dock dot goes out once every such tab has been opened (`freshTell`).
- **Each Earth is a district of the Network's room** (owner, November 2026: "I thought we separated them by Earths ... having
  Wolverine next to Logan"; then, against Earth tabs: "they could just be a bigger bubble and then within that Earth bubble are the group
  bubbles"): one room per universe, each Earth's crews packed together inside a big labelled bubble (`DIST`), districts placed as
  non-overlapping circles, the biggest in the middle. No Earth tabs, no All universes tab. A person stands where their story lives
  (`HOME` in hub-src): Sylvie, He Who Remains, Kang and America Chavez in Earth-199999; the Void's people (the Lokis, Cassandra Nova, the
  Deadpool & Wolverine variants and that film's Logan) in **The Void**, which is their group; Defender Strange in Earth-617 (the
  director's number, used by the MCU Wiki); Sinister Strange (Earth-TRN954) and The Marvels' Binary and Beast (Earth-TRN1225) by the
  Marvel Database's temporary numbers, which it marks unofficial. Their files keep the Earth they come from. The room opens zoomed out on
  its centre. Every person in every tab now has an Earth or The Void (November 2026 pass, `network/rel/uni/earth/earths.json`, each
  with its source): What If...?'s unnumbered worlds by the Marvel Database's temporary numbers (Earth-TRN908, TRN1089 to TRN1093,
  TRN1491 to TRN1495, TRN1502, TRN1503, TRN1516 for the Eminence, where Captain Carter traps him); the Pruned tab's Runaways, Inhumans and
  Cloak & Dagger in Earth-199999 (the Marvel Database files them all there); Agents of S.H.I.E.L.D.
  season 6's Benson, Keller, Sarge and Izel in Earth-199999, Sibyl in Earth-19859 with Malick; Across the Spider-Verse's Vulture in Earth-65
  and Prowler in Earth-928, where their stories happen; Deadpool & Wolverine's Gambit and Blob in The Void; Uatu in **The Fifth
  Dimension** (the MCU Wiki's home for him: he watches from outside every Earth).
- **Compound and Raft files share one layout** (owner, November 2026: "the same info ... designed the same way but stylistically
  different"): a name box (the Compound's with its round badge; the Raft's plain, no badge and no bars: owner, "cut the insignia thing and the prison bars"), the ID line, the name, who they are, the
  universe on its own line (`uniLine`, no Universe tile), and the status in the corner; then First seen and Last seen, as far from the
  name box as from each other. The Raft's Threat class tile and status banner are gone (its class is on the ID line). A transfer is a
  line of the record like the rest, its title small under it (`hoMark`), and names the other place only once you've found it ("File
  transferred out of the Compound" until then).
- **Network, Paths, the indexes and profiles link both ways** (owner, November 2026: "network, paths, indexes, profiles should all be
  connected to and from each other", the indexes only once found). Each profile links only its own main characters, the people
  its Subjects name, set by hand in `PROFILE_PEOPLE` (owner: "only Wanda and Vision go to that profile ... side characters don't go to a
  profile"): Captain America is Steve; Falcon & Winter Soldier is Sam and Bucky; S.H.I.E.L.D. is Peggy, Howard and the agents (Coulson,
  Daisy, May, Fitz, Simmons, Mack, Elena); someone named in two goes to their own (Bucky to Falcon & Winter Soldier, Kate to Hawkeye; Riri to the Champions, owner's call);
  FoX-Men has the 2000s films' team and Brotherhood leads, the prequels' Charles, Erik, Raven and young team, Deadpool, Laura and D&W's Logan;
  a Raft file goes where its Compound file goes. Other-world versions (Earth-838's Strange, Wanda, Reed) link to none. A new profile, or
  a new main character, needs adding there. Links, each only once the box is
  known (`boxShown`, `boxPath`): a Compound or Raft file's record line carries **Profile ›** and **Path ›** (`xLinks`); a profile's
  story line carries **Path ›**, and its foot an **On file** list of its people's found files (`boxFiles`; "See their path" is gone); a
  Network card carries **Profile** and **Path** beside Open file (`netLinks`, `netProf`, `netPath`); Paths' bar opens the character log (as a link on top, so its Path › comes back down to Paths). Every
  link opens its page **on top** of where you are (`jumpUp`, z-index 81 and up, over a profile's 80; `body.jumped` lifts the dock and the
  Log header) and back takes just that page away (`JUMPS`, `jumpBack` in `onNavBack`), leaving what was under it as it was. A link to a page that's already open underneath (Open Network on a file over a profile, when the Network is under them) goes back
  down to it instead of opening it again hidden (owner's recording, November 2026): each jump marks the history step it opened from
  (`jstamp`, `jt`), and `unwind` / `downTo` close the pages above and step history back to exactly there (`unwindTok` in `onNavBack`).
- **A page held still never jumps** (owner's recording, November 2026): `bodyLock` keeps the status bar's room (`netSat()`), so opening a
  box no longer drops the page behind it 36px. A profile measured while scrolled no longer pads its top (`pinTop` counts `scrollTop`).
- **Pills** (owner: "no longer swipeable away when they're in their icon form"; "touch what's underneath when the pill isn't explicitly
  covering it"): a pill takes touches only where it's drawn (`swipeAway` hit-tests with `elementFromPoint`; while it's the small closed
  frame its `clip-path` is that frame), and a swipe moves it with `translate`, so it works mid-animation.
- **No "Transferred" status** in either index: a file the other index took over keeps its last status. **First and last seen** are two
  small lines in the name box (`seenLine`; "Seen in" when they're one title), not two tiles ("a space suck").
- **Each index wears its own colour** (owner, November 2026: "the Raft red, Damage Control green, but not neon or slime green"):
  `--ix` / `--ixt` on `.collpanel` (Compound blue #5E9BEF, Raft red #D45A4F, Damage Control green #5FAF7E, Collection gold #D9AE52)
  tint the title's glow, the section heads, the tiles, the name box, the search box and the connections box. Damage Control's old neon
  #7FD95A is now #6DBB8A everywhere, its replays included.
- **A file's connections open the Network over the page the file came from** (`netGoTo`, body class `netup`: the Network's panel sits
  under the Agent File and the Atlas otherwise, so it opened out of sight), and back returns to the file (`netFrom`), then to that page.
- **"Profile" is now "Character log"** everywhere it shows (owner, November 2026): the box's line under its name ("CHARACTER LOG ›"), the
  page's own heading, a file's link, the Network card's button, Paths' "Open character log", and the eggs' hints that name it.
- **The Network card** (owner, November 2026): pulled all the way down it slides away and closes; the grip slides it up from where it
  stands, as it slides down; every card's list starts at its top. Double tap on the open floor zooms in there, like the Atlas. New people
  pulse blue (the app's new-dot colour) and every one pops in on its own, within two seconds (it used to stop after 50 and show the rest
  at once). An Earth's bubble is drawn round its people as they stand, so it moves with them. Touching the Network counts as activity, so
  the Watcher's eyes don't open on someone using it (`netWake`).
- **Every page wears the same screen**: the Log's header and the Network (its room is drawn over the texture, its header fades it) use
  the pads' texture (`--padimg`), not flat dark. The dock is solid, so Story never shows through it.
- **Comms**: the filter row sits on the page (no band behind it), its picked chip light like every tab. What the ticker plays shows in the
  open list at once and the ticker runs on (opened from the dock).
- **The Log**: holding it marks both tabs read (Paths included); its entries carry no "Recorded" tag.
- **Zoomed out, a group shows its newcomers** (owner: the Network opens on the group bubbles, so the pop-ins couldn't be seen): a group
  that gains people swells a little and wears the same blue ring. The card's three buttons each stay on one line.
- **Tapping the ticker** opens Comms and the ticker goes: everything it still had waiting counts as delivered (it's in the lists), so it
  doesn't start up again. Opening Comms from the dock lets it run on.
- **A file's Character log › and Path ›** stand at the right of its record line as outlined pills in the index's colour.
- **Connections grow and change** (owner, November 2026: "I thought relationships grow and change"): a connection is stages in story
  order, each with its own kind, so Wanda and Bruce are enemies after Age of Ultron and allies from Infinity War, and Darcy is swept into
  the Hex (WandaVision episode 7) before standing up for Wanda's family (episode 9). Corrections and added stages live in
  `network/rel/stage_fix.json` (`edit` a stage by its place, `add` a later one; applied in `prof/relbake.js` after the text fixes).
  **The review pass is done** (owner: "push everything together"): the 374 connections that ended as enemy or rival while their words
  hinted at a turn were each checked against the sources; 23 really turn (or were mislabeled in their own title), the rest are left as
  they are. Their fixes are `network/rel/stage_fix_review_1..4.json` (each pair with its source): stages turned to ally where the two
  sides team up in that very episode (Coulson and Victoria Hand, Coulson and Gonzales, Matt and Vladimir, Silver Surfer and Sue,
  Ghost with Scott and Hope), later ally or family stages added (Adam Warlock and Rocket, Cal and Coulson, Manfredi with Peggy and
  Jarvis, Joy and Ward, Auran and Black Bolt, Mayhem and Dagger), foreshadowing taken out of earlier stages, and a few wrong details
  fixed (Crank killed BB, not Davos; Vladimir never tortures Matt; Sidewinder never ends up on Sam's side). `edit` can also move a
  stage to its `episode`. Closed by the stopping rule: no further passes on this material unless new connections are added.
- **Network titles are broken down by season** (owner, November 2026): a step on a show that runs several seasons counts at its own
  episode ("In episode 44," is `Show#44`; "In season 2," is the last episode of season 2, so no one shows before their season is done;
  `season` in `prof/hub2.js`), and is listed under its season ("What If...? S2", `lab` and `DATA.seas`); a season the app lists as its own
  title keeps it. "In N titles", Other versions, On screen together and Served with all go by season. Story order puts an episode at its
  season's place (`prof/ord.js`). **After hub2.js, always rerun ord.js and mapx.js before bake.js** (they index hub.json's titles).
  **Rebuilding the Network** (4 November 2026; the intermediate files had lived only in an old scratchpad): from `mockup-data/`, with
  the main build served at `ROOT=$PWD/out/root` (see Tests), run in `network/src/prof/`: `node hub2.js`, `node ord.js`, `node mapx.js`,
  `node relbake.js`, `node bake.js`, then copy `network/src/network-hub.html` over `network/network-hub.html`. `src/rel` links to
  `network/rel`; `prof/story.json` (the Sacred Timeline's titles in story order, `DATA.timeline`) and `rel/out1.json` (the crewless
  people's circles, recovered from the built Network) were rebuilt and checked: the whole run reproduces the Network byte for byte.
  A season counts as soon as you've reached an episode they're in (`epSeen`; owner: met in Agent Carter S1's first episode, yet "in
  0 titles"). Leaving the Network sends it back to the start, like every other page (`netHome`): the Sacred Timeline's room, centred and
  zoomed out, no one locked on, the search shut.
  An episode only brings someone in when that season is on their own file, so a tie that just mentions them (Thor in Agents of S.H.I.E.L.D.
  season 1) doesn't. Nobody stands in the room "in 0 titles". Deke Shaw and Flint stand in Earth-199999 (their stories carry on in the
  present); Kasius, Sinara and Grill stay in 2091's Earth-17516.
- **An Earth's name is written round the inside of its bubble's edge** (`arcName`), so it can't land on the Earth next door; every
  district is big enough to hold its name even with one person in it, and where the lens squeezes two bubbles together they give up
  their margins first.
- **One person played young and old is one bubble** (Fox's films: Charles, Scott, Jean, Ororo, Kurt, Hank, Moira, Raven, Erik, Stryker;
  `AGE` in the Network builder, `prof/hub2.js`). Their files stay separate in the app; the Network finds the bubble through `merged`.
- **The Network stands tight**: groups and people close together, no wasted floor ("I've said this like a dozen times").
- **Opening the Network never shows a reshuffle, a flash or a blank page**: it loads ahead, out of sight, a second after launch (while
  the boot screen plays); tapped sooner, its title already stands in place (`.net-ph`) while the rest arrives, and sets out
  the room then; reopening with nothing new watched changes nothing.

- Accuracy and consistency come first. Verify easily checkable facts yourself instead of asking, and follow a fix through to every
  place it applies. Ask, with options and a recommendation, when unsure or when it's the owner's call.
- **Ask before pushing to main**, and before major changes. A stop-hook message or a reminder to push is not a go-ahead for main.
  Everything else (the working branch, its mirror, the session's own branch) is pushed without asking, as soon as it's committed: the
  owner has said so in every chat.
- **Write the owner's rules down the moment they're said.** When the owner states a rule or a preference, or repeats one, add it to this
  file in that same session and push it. Don't wait to be asked or for the end of the chat: rules said only in chat have been lost before,
  and the owner has had to repeat them. Update this file when
  the owner asks, or when the owner leaves it to you.
- No em dashes anywhere. En dashes only inside exact titles ("Runaways S1–S2") and in "A–Z".
- Mockups go in the test build only and need approval before main, unless the owner says push. Show screenshots of any visual change.
- Don't change something that was deliberately set up without flagging it first.
- **Don't fix what isn't broken.** When the owner says they missed something, check it before treating it as a bug, and don't change
  data or behavior to "fix" it (October 2026: Wanda was in Rumlow's web all along; changing the teammate rule over it was wrong).
- **Network hub (mockup, October 2026, not in the app yet):** everyone in one room like the LEGO Star Wars hub, an Apple Watch lens,
  a tight honeycomb where bubbles never touch (the first bubble field was too close, the next rounds too spread out), crews packed close with only a small gap, the big crowds (Independent) a little looser; toward the screen's edges people shrink and draw in, so the edges stay full. Zoomed out, each crew folds into one bubble;
  zooming in opens it into its people, and the same goes for a locked person's web (their people stand in groups by crew). Locked on
  someone, tapping one of their people shows how the two are connected. Prototype: https://claude.ai/artifact/UkdcJ6p7b9aNw2Zm4m6xsH .
  Where it lives in the app is still the owner's call.
  - **Personal ties are the point of the Network (owner, October 2026):** "Family and personal ties aren't in Network? That's the whole
    point of this page." Jennifer Walters must link to Bruce, her cousin. Family, partners, close friends and mentors are links of their
    own (researched with sources, checked before use), alongside served with, fought and the off-screen ties.
  - **Every connection is explicit and has meaning (owner, October 2026):** "Relationship (to include but not limited to family, friends,
    personal ties etc etc) needs to have a pass done on everyone. This is the CRUX of the network page. Each network connection needs to
    be explicit and have meaning." So links come from a researched relationship list (family, partner, friend, mentor, boss, ally, rival,
    enemy), each with a one-sentence meaning, a title and a source. Sharing a crew is not a connection by itself; it only decides where
    people stand in the room. Fights from the Raft files stay (they're explicit, with the title).
  - **Relationships built (October 2026):** a pass on all 686 people from each character's MCU Wiki relationships, every pair then
    rewritten or reviewed against the wiki text: 2,793 connections kept (enemy 1,067, ally 600, friend 358, boss 316, family 237,
    partner 111, mentor 66, rival 60), 746 dropped (same battle or organization only, the Snap only, variants, never meet, unverifiable).
    Each has one kind, a 1 to 3 sentence meaning, the title it's shown in, and a source. Crews are no longer links. 148 crewless people
    stand in a circle (The Lang family, Midtown High, New Asgard...); 27 truly have no one. Deathlok merged into Mike Peterson and Lash
    into Andrew Garner (one person, one bubble). Working files in the session scratchpad: rel/through.json (the last word), prof/relbake.js. The through-line review changed 66 kinds
    (Steve and Sharon ally, May and Coulson friend, Ward and May enemy, Mordo and Strange ally, Aida and Fitz enemy since the romance is
    Framework only).
  - **No paths inside the Network (owner, October 2026):** "See their paths" is gone; the Network is the room, the webs and the
    connections. Paths stays its own page, likely moving into the Log (owner: "I think paths goes into Log, or is there a better place").
  - **Paths in the Log (owner: "yes it should be on log", October 2026), MOCKUP, NOT APPROVED:** in `index.html` on the working branch,
    not on main. The Story Log has a "Story log | Paths" switch (`logSwitch`, `data-logv`); Paths' header has the same switch; Paths
    left the dock (5 sections until the Network takes the slot; its new-lines dot moved to the Log and the switch); while Paths is open
    the dock shows Log. A picked line in Paths shows Open profile / Open box (`#mapAct`); a character profile has "See their path"
    (`data-dpath`). The switches swap in place (`closeDossier(true)` / `closeMap(true)` and `pushNav`), never through history.back.
    Any push to main before the owner approves must leave this out (build main from main's own source, or ask).
    **Log and Paths are one page (owner, October 2026):** the pill switch was rejected ("moves around and isn't fixed", "not two sides
    of the same coin"), and so was a link per chapter ("See this chapter in Paths is very very very stupid"). The owner prefers tabs,
    just not an on/off look: "Paths and logs now feel like the same page that belongs together." Now one fixed header (`#logHead`)
    sits over both: the title Log and underline tabs, Story and Paths, with a glowing bar that slides to the tab you pick. It never
    moves; only the page under it swaps, in the same history slot. The Chapters tab comes back with the same chapter open at the same
    spot (`logSaved`, `openDossier("saga", { open, y })`). Paths' own title and back button are hidden under it.
  - **The Personal log folds into the Log (owner: "I think personal log should be folded into logs too, not as a separate page though
    but as part of the log", October 2026), MOCKUP, NOT APPROVED, same rule as above:** every title in the Story Log carries your stars
    beside Recorded (or "Rate"), which opens the same rate sheet (`slRate`, `.sl-rate`); a chapter's header shows your average; a new
    rating redraws the open Log's chapters in place (`refreshRates`). The Agent File's Personal log section (`rateSec`) is no longer
    rendered; its Rated / Latest rows on the Agent ID stay.
  - **Episode-level reveals, LATER (owner, October 2026):** "Maybe show moments (comms, network, atlas, other related info) could be
    episode dependent but let's do that after this update launches." Not now; after the current update reaches main.
  - **Paths' picked line: only Open profile (owner, October 2026):** "there should only be open profile. I don't want an open box
    button." The bar shows only when the character has a profile.
  - **A character's profile counts a title watched anywhere (owner, October 2026):** they ticked Captain America: The First Avenger in
    Chapter 1, opened Steve's profile from Paths, and his service history still said No record (it only counted ticks inside his own
    box). Now a character profile reveals from any watch (`atlSeenT`), like the Log and Paths; a chapter's own log keeps its rule.
  - **Connectivity between pages (owner's ideas, October 2026, for when the Network goes into the app):** the Network's "Open file"
    opens their Compound or Raft file, and a file gets a way back to the Network; a person with a character box gets a button to open it
    (and the box back to the Network); the same with Paths (their box's line lit in Paths, and back).
  - **Relationships evolve, in stages (owner, October 2026):** "Relationships can evolve so friends can become partners, allies can turn to
    foes etc." Each connection is a list of stages in story order, each with its kind, the title it begins in and its own text about that
    stretch only. The web colours a connection by the latest stage you've seen, and the link card shows only the stages you've reached,
    so a later turn (Bucky as the Winter Soldier) stays hidden until its title is seen.
    Built: all 2,793 connections staged (rel/staged_1..5.json, which relbake.js prefers): 2,420 one stage, 321 two, 46 three, 5 four,
    1 five (Loki and Thor). Shows are keyed to the season a stage begins in, never the whole show. Limit: stages inside one season
    (Ward joins, then betrays, in AoS S1) both show once that season is seen, since the tracker counts seasons, not episodes.
  - **Connections only grow (owner, October 2026):** "Connections and networks are fluid and change over time. As movies are watched and
    relationships change, more are added, but none are ever removed, because even if the relationship dies, it's still a relationship."
    A connection appears once its first stage's title is watched; later stages add on; nothing is removed as you watch more (only
    unticking a title takes back what it revealed). A death or a falling-out is a stage, never a deletion. The card keeps every stage
    reached; the web's colour shows where it stands now. People move between crews over time, and their connections move with them.
  - **A connection needs two people who know each other (owner, October 2026):** "Connections are both people need to know one another.
    If Gilgamesh says Odin taught him a recipe, that is a connection implied by dialogue, but Agent Cleary isn't connected to Mysterio,
    he just has information." Knowing about someone (a case file, a name in the news, a story told about them, a dead man's legend) is
    not a connection. Off-screen ties count only when the dialogue shows the two really know each other.
    Implied ties stay (owner, 4 November 2026): "I hope you're not removing implied connections... A lot of lore is built in through
    implication and easter eggs. If character one has character two in their phone contact, and it's shown even if briefly then the
    implication is that they are connected through one way or the other." Anything shown on screen that implies the two know each
    other counts: a name in someone's phone contacts, classmates or a shared inner circle, a line that shows they've dealt with each
    other. Only knowing ABOUT someone with nothing that implies they know each other (a case file, the news, a legend) stays out, and so
    does a shared battle where they never deal with each other. When unsure, keep the tie and ask.
    Ancestors seen through visions are ties (owner, 4 November 2026, on Echo's ancestors Chafa, Tuklo, Lowak and Chula: "it sounds
    like a connection to me"): the ancestral echo is real power in the show, so a descendant and the ancestors who reach her are
    connected, and so are the ancestors with each other through the echo.
    Exception (owner): "If one person's knowledge or involvement in another one has huge consequences" it is a connection even if they
    never meet: Bruce Banner and Erskine (recreating Erskine's formula made Bruce the Hulk), Valentina and Clint (she sends Yelena after
    him). Cleary and Mysterio stay out: a case file with no consequence.
    The 70 off-screen ties are settled (owner, October 2026: "the keep cut are good to go"): 19 were already connections; of the 51 left,
    28 are kept (the owner's 17 keeps, plus the "know each other" and "big consequences" ones they left as proposed) and written as
    connections (rel/offscreen_out.json); the rest are cut. Decisions are in the review page's store (PhrBXtnSbMhVsb1o4x9T41).
  - **A connection's kind is its main through-line (owner, October 2026):** "Steve and Sharon aren't really partners in that sense. More
    co-workers or allies, that's the main through line of their relationship. Apply that to the entire thing." A kiss, a brief fling,
    a one-time fight or a late twist doesn't set the kind; what they mostly are to each other does, and the text leads with it.
  - **Connection text reads as real prose (owner, October 2026):** coherent, never choppy or crammed; two or three short sentences
    rather than one overloaded one. Rejected: "Rumlow leads the strike team Steve commands, then turns out to be HYDRA and fights him".
    Better: "Rumlow leads the S.H.I.E.L.D. strike team that works under Steve. When S.H.I.E.L.D. falls, he reveals he has been HYDRA
    all along and turns on him."
  - **No one stands alone who belongs somewhere (owner, October 2026):** "Independent is too big": Cassie Lang, Ned Leeds, Jane Foster,
    Tommy Maximoff and the like stand with their circle (a family, a school, a town, a group named on screen), not in Independent.
  - **Search (owner, October 2026):** a Search button finds anyone you've met by name or by another name they go by (aliases and staged
    names from their files: "she hulk" finds Jennifer Walters). A name that's a reveal only matches once you've seen the title that
    reveals it ("The Power Broker" finds Sharon only after The Falcon and the Winter Soldier). Picking someone locks onto them.
  - **Pull-up person card (owner, October 2026), MOCKUP for two people, awaiting a verdict before the rest:** "when I click one I can
    slide their little pop up up and it shows which projects they [were] in, a little sentence about who each of their connections are".
    Swipe the card up (or tap its grip): Also known as, Crews (in order), every title they're in (seen only), and Who's who grouped by
    kind, one short line each, tap for the whole story. Lines are hand-written for Jennifer Walters and Yelena Belova only (`WHO` in
    hub-src.html); everyone else falls back to the first sentence of their latest seen stage. Doing it for everyone means a short "who"
    line per connection per stage, so a later turn doesn't leak early (Yelena's "Alexei still acts like one" shows at Black Widow today).
    Owner liked it ("But I like it"). It slides like the Atlas: follows your finger, stays where you let go, settles full near the top
    and small near where it started; the grip taps all the way either way; pulling the list down from its top drags the card down.
  - **Credits scenes aren't titles (owner, October 2026):** "Black Widow post credit isn't a separate title (it's only used in chapters
    for narrative purposes)." The Network folds "(Post-Credits Scene)" / "(Mid-Credits Scene)" into the film (hub2.js, relbake.js).
  - **Fact fixes from the owner's check (October 2026):** Yelena never fights or meets Bill Metzger (removed from his opponents in
    opp/opp_mcu.json, so his Raft file changes too); she never meets Jean DeWolff (the sauna scene is with Spider-Man; the research
    mixed up Jean DeWolff and Jean Grey; that tie is gone, 2,792 now); Jennifer and Matt are friends with a one-night stand and a brief
    fling, not partners. Check Spider-Man: Brand New Day claims against the film's plot before trusting them.
  - **Network header (owner, October 2026):** "I don't like the 'sacred timeline everyone in one room, hero villains both sides' ... cut
    that, I don't like where the search button is." Subtitle and legend gone; search is a field under the title ("Search everyone
    you've met"); the universes sit under it as tabs like the indexes.
  - **Universes and other versions (owner, October 2026, MOCKUP):** "a built in way to include or toggle between the other universes
    like in the indexes", and how multiverse connections work (Peter and the other two Peters, Wanda and Earth-838, Strange). Tabs:
    Sacred Timeline, Spider-Verse, FoX-Men, Beyond, Pruned, All universes; each is its own room (crews keyed by universe; hub2.js now
    takes every universe, 1,466 people, the Sacred Timeline first). The rule shown: versions who actually meet get a real connection,
    drawn in the web and labelled with where they're from (the No Way Home Peters, hand-written in `XREL` for the mockup); versions who
    never meet aren't drawn (14 identical bubbles looked messy) but are listed under Other versions in the slide-up card, by universe,
    each with its file's description; tapping one takes you to its universe and onto them. Variants are matched by name (597 pairs) plus
    Sinister Strange and Strange Supreme to Stephen Strange. Gaps: no Earth-838 Wanda, Defender Strange or 838 Strange files exist;
    other universes have no relationship pass yet (Raimi Peter shows only fights).
  - **The Network is in the test build (owner, October 2026: "fold network into the test build, so I can see everything working
    together"), MOCKUP:** a Network button in the dock after Atlas (the slot Paths left). Its page (`#netPanel`) runs the built Network
    (mockup-data/network/network-hub.html) in a frame. The test build carries it inline (build_tb.py puts it into `NET_SRC`); main
    loads it as its own file, `network.html` in the repo root (`NET_SRC` is `"url:network.html"`), so it is fetched only when Network is
    opened. Carried inline it made the launch page 5.7 MB, and the Android app then showed its no-network page on every cold start.
    It follows what you've watched title by title (`netSeen` with `atlSeenT`; the Seen up to picker is hidden), and a universe's tab
    shows once the indexes have revealed it. Open file opens their Compound file (hero or both) or Raft file over it; Back returns to
    the Network, then leaves it. The Network's source and build scripts are in mockup-data/network/src (hub-src.html, prof/*.js); the
    staged relationships are in mockup-data/network/rel (staged_1..5.json, STAGE_BRIEF.md).
  - **Universes stay separate (owner, October 2026: "I prefer the different multiverses being separated. I just don't know how that will
    work when connections cross"):** each universe is its own room. A crossing: someone from another universe they actually meet walks
    into the web with a dashed ring and their universe under their name; the link card says how they're connected; Lock onto takes you
    across ("Crossing into the Spider-Verse"), where the one you left shows the same way, labelled Sacred Timeline.
  - **Network hint and empty room (owner, October 2026):** "Don't like the drag to wander thing." The hint line is gone. An empty room
    (nothing watched yet) shows No data with a small icon in the style of Paths' (a dashed, empty bubble with dotted lines reaching for
    it), not a blank screen.
  - **One place to look (owner, October 2026):** "If the network hub is folded into the test build, why are you still updating the
    network hub separately?" Don't publish the standalone Network artifact (UkdcJ6p7b9aNw2Zm4m6xsH) any more; build the Network into
    the test build (build_tb.py) and publish only the test build.
  - **Other universes have no relationship pass yet (October 2026):** only the Sacred Timeline's 2,792 connections have kinds, prose
    and stages. The other 780 people (Spider-Verse 313, FoX-Men 191, Beyond 143, Pruned 133) have only Raft fights (shown as Enemy, no
    text) and crews, plus three hand-written No Way Home crossings. Doing them means the same pass per universe, plus a list of every
    pair of versions who meet on screen.
  - **Compound and Raft files hand over, LATER (owner, October 2026, "something to ponder about later"):** a person has one active
    file at a time. When someone changes sides, the file they leave closes and the story carries on in the other one: Wanda's Raft file
    closes once she's an ally and is transferred to the Compound, and is no longer updated in the Raft "because she is no longer a member
    of the Raft", "so that we don't repeat entries every time". (Today both files can carry the same titles, with "Also on file" linking
    them.) Not started; raise it after the current update.
  - **False fights removed from the villain files (October 2026):** checking every fight with no written connection found 27 that never
    happened (Coulson and Kasius never meet, Ned never meets the Vulture, Gamora isn't in the Karja fight, ...). 17 were explicit
    entries and are gone from opp/opp_mcu.json, opp_st.json and opp_by.json (like Yelena and Metzger before). The other 10 (Agents of
    S.H.I.E.L.D. and Agent Carter villains) come from an old one-line "op" field ("fought S.H.I.E.L.D.") that the app spreads to every
    member of the team: the same "connected to everyone in HYDRA" mistake. They show nowhere new (the Network draws only written,
    checked connections), but the villain files' team-wide "op" should be replaced with real opponent lists one day.
  - **Earth numbers separate the multiverses (owner, October 2026):** "I like using the Earth numbers to separate the multiverses,
    because it's very in theme with this datapad." Incursions and the Atlas already do it. Anywhere the app tells two worlds apart (the
    Network's other versions and crossings, its circles, labels), use the Earth number, not a film title or a year.
    Owner: "The Earth number separations should have also been included in the indexes and their files, right? So that we know that
    Peter Parker is from Earth x y z, the other Peter Parker is from Earth x y z." MOCKUP: a file's Universe tile reads "Spider-Verse ·
    Earth-96283", and Compound and Raft index rows show the Earth under the name for anyone not from Earth-199999 (`EARTHS`, filled only by
    build_tb.py from network/rel/uni/earth/earths.json; main has an empty map, so nothing shows). Numbers are only ones stated on screen
    or Marvel's official designations (as the Atlas's), null otherwise.
  - **Never send the owner's personal details to outside sites (October 2026):** two research scripts written by agents put the owner's
    email in the User-Agent header of their wiki requests (fox/scripts/fetch.py, sv_new/review/fetch.py, scratchpad only; removed). Any
    script that fetches from the web uses a plain project name ("mcu-tracker-research/1.0"), never an email, name or account. Say so in
    every research brief.
  - **Open questions for the owner after the complete test build (October 2026):** (1) what goes to main (Log and Paths as one page,
    ratings in the Log, the Network in the dock, Earth numbers on files) and whether the data fixes go now (Metzger, the 17 false fights,
    Black Tom); (2) Peter B. Parker as Earth-616B (the film shows E-616); (3) the 70 off-screen ties list (artifact TXwTtZGo8K5NkNwXmnnb3B);
    (4) files for people who meet across worlds but have none (Earth-838 Wanda, Billy and Tommy, Mordo, Christine Palmer, the Illuminati,
    Defender Strange; Nicepool, the Deadpool Corps); (5) app data errors found: the Runaways parents' files list only S3, Affleck's
    Daredevil and Thomas Jane's Punisher are listed in Deadpool & Wolverine, the What If Peter "dies in Paris" is disputed, ten villain
    files spread one-line "fought S.H.I.E.L.D." to the whole team; (6) close calls: the Spider Wars living Uncle Ben as family to the
    1994 Peter, Apocalypse and Candra as partner, M'Baku and Killmonger / Ned and the Vulture left out as never meeting.
  - **Owner's answers to the open questions (October 2026):** (1) "When all remaining questions are closed, everything goes to main" (the
    whole update, with the data fixes); (2) Earth-616B for Peter B. Parker: ok; (3) the 70 off-screen ties: "let's take those one at a
    time or let me review them"; (4) people who meet across worlds with no file: "if they deserve a file then yes add them"; (5) fix the
    Runaways parents' titles, the Deadpool & Wolverine listings for the 2003/2004 Daredevil and Punisher, and the team-wide "fought
    S.H.I.E.L.D." villain lines ("fix what needs to be fixed to make it accurate and consistent"); (6) close calls: "fix what needs to
    be fixed".
  - **New files for people who meet across worlds (owner: "if they deserve a file then yes add them", October 2026):** Earth-838 Wanda,
    Billy, Tommy, Christine, Strange, Mordo (Raft) and the five Illuminati; Defender Strange; Nicepool; Ladypool and a Deadpool variants
    group (Raft); and the Runaways parents with no file, Catherine Wilder and Frank Dean (Raft). In allies_crossings.json and
    cameo_zz_crossings.json. Earth-838 is said on screen; Defender Strange's "Earth-617" is only in a commentary, so none is shown. The
    Sacred Timeline Mordo no longer claims a Multiverse of Madness fight (that was Earth-838's Mordo). Data fixes the same day: the Runaways
    parents' S1–S2 records, the zombie-world Peter and Scott with an unknown fate (not dead), Shang-Chi turned and Katy's fate unknown.
  - **ON MAIN (October 2026, commit ace4a4c, owner: "when all remaining questions are closed, everything goes to main"):** the Network in
    the dock, Log and Paths as one page, ratings in the Log, Earth numbers on files, and the data fixes. The main build now also needs the
    Network and Earth map put in: after `mainprep.py` + `devbuild.py out/main.html`, replace `/*EARTHS*/{}` and `/*NETWORK*/null` in
    out/main.html the way build_tb.py does (network/network-hub.html and network/rel/uni/earth/earths.json).
    **Left for the next session (stopped to save the owner's usage):** (1) write the 28 off-screen connections the owner kept
    (rel/OFFSCREEN_BRIEF.md, input offscreen_keep.json; relbake reads offscreen_out.json); (2) check the 100 suspect connections against the
    know-each-other rule (rel/KNOWAUDIT_BRIEF.md, input knowaudit_input.json; relbake applies knowaudit_out.json). Research inputs are in
    the session scratchpad rel/; copy them into mockup-data/network/rel/ first if the session is new (rerun the scripts in network/src/prof).
  - **Owner on process (October 2026):** "Can you just show me before you do all the suites running ... it takes forever." Show
    screenshots of a mockup first; run the full test suite only before pushing to main or when asked.
  - **No idle bob (owner, October 2026):** the bubbles stand still; the LEGO-hub bobbing was removed.
  - **Crews as of what you've seen (owner, October 2026):** the room isn't fixed at where everyone ends up. Each person stands with the
    crew they're in as of what you've seen: their final crew once you've seen them join it, otherwise the latest one seen, otherwise none
    (Tony at Stark Industries until The Avengers). The room re-packs as crews form and change.
  - **Served with means served together (owner, October 2026):** "just because Wanda was in HYDRA does not mean she's connected to
    EVERYONE in HYDRA". A file records each group at the title they join it; a group holds until their next change. Two people served
    with each other only if they were in the same group at the same time, in a title they're both in. (Wanda: 53 down to 16.)
  - **Paths: the old Paths plus anyone's path (October 2026):** cast stacks and per-person line maps were rejected too. The owner's list
    of what Paths was for: every main character's journey; how they weave in and out of each other's stories; how many and which
    characters are in one title; across the entire timeline, extras included; at a glance, in totality; and keeping things classified
    until revealed (the Ten Rings in Iron Man, Vision through J.A.R.V.I.S.). Now "See their paths" opens the old Paths story map, and it
    grows as you watch like Paths did (owner: not "stagnant to where they will all inevitably end up"): only seen titles, lines closing
    up, an open dot where each line goes next, a story nameless until one of its own titles is seen, with any one person's path in
    gold on top, minor characters too: tap a title for its whole cast, tap anyone for their path.
  - **Paths as cast stacks (October 2026, replaced):** 126 Paths-style lines were rejected ("too busy... useless"). Now each of their titles is a
    stack of bubbles (everyone in it), theirs on top in gold, tied people next; a line only joins someone to the next of these titles
    they're in (dashed where they skip titles or fought). Tap a bubble to pick that person out; tap a title for its full list.
  - **Paths show the whole picture, classified (owner, October 2026):** like Paths did, a person's paths show every title and everyone
    they'll ever cross, even before you've seen it, so you see how many lines are coming and where they weave in. Past what you've seen,
    titles read [ Classified ], lines turn grey, and anyone you haven't met (or a tie you haven't seen) is a nameless [ CLASSIFIED ] line.
  - **Off-screen ties count (owner, October 2026):** a connection counts if it's explicitly stated or implied, even if the two are never
    in a title together ("if character A says 'yea B, love that guy' but they're never in the same movie together, that still counts").
    The files don't record these: naming someone by full name in a step turns up only 2 such ties, so they need a researched,
    hand-checked list.
  - **One person, one bubble (owner):** a hero file and a Raft file of the same person under different ids are one person in the Network
    (Bucky / Winter Soldier, Sharon Carter / Power Broker, Bob / Sentry, Mole Man, Silver Surfer). Vision and White Vision, and Maria
    Rambeau and the Marvels' Binary, are different people and stay apart.
  - **Where it stands (owner, October 2026):** the owner rejected a separate path screen, a two-person path and a "story" layout (messy,
    no single vision, lost Paths' big picture). The old Paths map as the widest zoom was rejected too ("so stupid": it has to be built from
    the Network's characters). Being tried now: tap someone, and "See their paths" on their own card (a button, not a zoom; owner: "click a, see paths",
    not a connection's card) turns their web into lines through their titles (the paths have their own pinch zoom; "Their web" goes back), Paths-style (theirs through the middle; a line for EVERYONE in any of their titles, not just their web: owner, "See their paths should have everyone from that project, not just their connections"; the people tied to them sit nearest; lines also meet in titles the person isn't in); tap a
    title for everyone in it, tap a line for how the two connect and lock onto them to redraw. Owner: "I like the click the character
    and see their paths but I also like in paths that I saw every character involved in a particular movie". Tapping someone still shows their web, and a connection shows how the two are linked. The mockup has a "Seen up to" picker
    standing in for watched titles, with new people walking in and new lines drawing in. Not approved yet. Open: J.A.R.V.I.S. and Vision
    as one line (classified until Age of Ultron, or named, or kept apart).
- Don't schedule anything; the owner says when. The VisionQuest audit is dropped: don't bring it up.
- **No fourth-wall words in file text.** Never write "season", "episode", "finale", "credits", "flashback", "the film" or "the show" in a
  sentence; "In season N," stays at the very start in the data only.
- **Factions and teams record everyone who served a group, willingly or not:** brainwashed, forced and undercover service count (the
  Winter Soldier and the Widows in their groups, Simmons inside HYDRA, Natasha as Natalie Rushman); the steps say how. Any organization
  counts: agencies, armies, companies, crews. A captive, a victim, a one-job hire or an ally doesn't count. Gamora and Nebula are in
  "Thanos's forces" while they serve him (owner, 4 November 2026), never the Black Order. A hero file also notes a villain past, even outside its own titles (the older Magneto's
  Brotherhood). A person's hero and villain files list the same groups.
- **A group's name is the one said on screen:** the Queen of the Dead's Army (not "Red Queen"). One exception by the owner (4 November
  2026): Thanos's four are **the Black Order**, the official name; "Children of Thanos" (what Maw calls them) is what they are, not a
  group name, and all six (Gamora and Nebula too) are his children through their kind lines and family ties, while only the four are
  in the Black Order (sources say so: the MCU wiki keeps Gamora and Nebula out). This replaces the earlier "never the Black Order". Comics, marketing and wiki-only names don't count. A clearly shown but unnamed group may get a plain descriptive name
  ("Kid Loki's Crew").
- **Team files:** a team's own file goes when every member's file carries the team's tag and the team file has nothing of its own. This
  removed 36 Compound and 37 Raft team files; 17 Raft team files with steps of their own stay.
- **Insignia reveal:** each unlocks on the character's main appearances, several titles, not a single one.
- **Universes:** the Earth and universe distinction matters. Tab order: Sacred Timeline (the MCU tab, renamed by the owner in all three indexes), Beyond, Spider-Verse, FoX-Men, Pruned. No Incursions in the
  registries. Tag a group only within its own continuity.
- **Agents of S.H.I.E.L.D. and Agent Carter** are the same universe as the films. AoS seasons 1 to 5 and Slingshot are main line; S6 and
  S7 are two titles and stay in Beyond. Agent Carter's story order: S1 (1946), S2 (1947), then the One-Shot as Peggy's ending.
- **Status means real status**, not what the characters believe. A death revealed in a later title goes in that title's step. A villain
  sealed in another realm is In custody.
- **No visions, dreams or illusions as steps.** Real flashbacks are fine.
- **Every file is complete:** every title its subject is on screen in gets a step (one per season of a show that runs several), with no
  cap on how many. The rest of this rule was settled in the appearance sweep, October 2026.
  - **Counts:**
    - a brief cameo when they're clearly identifiable;
    - a cameo tied to the character only outside the screen, by later statements or actors' and writers' posts (owner's call);
    - someone posing as them, a shapeshifter or a Life Model Decoy, with the step saying who, while their own status stays real;
    - a new recording filmed for that title (Howard's reels, Steve's school videos).
  - **Doesn't count:** a mention, a photo or replayed footage from another title. The exception is a mention that changes where they stand
    (a death revealed), and the step says how.
  - **Avengers Endgame: Encore**'s new footage stays out for now (owner's call).
  - **Agents of S.H.I.E.L.D. seasons 6 and 7** go on the Sacred Timeline tab's files whose subject carries on there.
  - **One person filed on two tabs** becomes one file, on the tab of the show where they're a main character. The 1990s Captain America
    and Red Skull are on the Spider-Verse tab with their X-Men cartoon steps.
  - **Deadpool & Wolverine's Void characters** go in the files of the originals they evoke, even with new actors: we only care about
    them because we want to believe they're the originals (owner). Azazel, Toad, Callisto, Lady Deathstrike and the Omegas sit in their
    Fox files; the Void's Juggernaut is merged into the X-Men: The Last Stand file. The Void's Blob keeps its own file (owner's call:
    the Fox films have two Blobs).
  - **A person with a hero and a villain file:** neither file starts earlier than it does now, and each covers every title from its start
    on.
- **Collection chain of custody:** the holder is who has the object at the end of the step. See `CUSTODY_FORMAT.md`.
- Keep real team names, and a place's real name even when the story moves around it (Area 55 in Venom: The Last Dance). Revealed names
  stay revealed. Empty states say "No data." Every TV show gets a season subpage.
- **A file goes by the name the story mostly calls them**, with the real name on its own row (owner, October 2026).
- **Current context matters:** the Infinity Stones are destroyed ("I used the stones to destroy the stones"); the Time Heist's borrowed
  copies stay in their histories but never set where a stone stands now.
- **Animations need life, a reason and the right timing.** A sliding picture with no character is rejected. Re-enact the scene it comes
  from (Fury's last page plays the Infinity War scene), and record it for the owner before asking for approval.
- **Answer with specifics.** "What's on main" wants a list of what, not a count.
- **No unapproved additions, no rehashing.** Build what was asked; offer ideas as ideas.
- **Don't duplicate a feature.** One thing moves you somewhere (the sling ring); the Watcher only shows another reality.
- **Damage Control's case numbers:** one register a tab, each with its own letters (ST, BY, SV, FX, PR), so no case number is ever
  repeated anywhere: Case No. ST-001. Numbered in release order, the order the incidents reached the screen, as First seen goes; not by
  story order, or ST-001 would wait for a recent show (owner, October 2026). A report filed under a whole show goes by its first season;
  within one title, by year. `DC_NO` computes them, so a new report needs no number; First seen lists by case number.
- **Index orders** (owner, November 2026), in all four indexes: First seen, Last seen (latest on file first), Most seen (Damage Control:
  Most people, plus Most losses: the losses each report records as far as you've watched, since the reports give no casualty
  figures), each sorting inside the groups; and A to Z, which is the whole tab in one straight list (October 2026, kept: the owner
  turned down A to Z inside groups). Ties go A to Z. `ixMode()`, saved as `state.ixSort`.
  Grouped by a name (Team, Faction, Opposed by, Held by, Involved), the groups start folded, so the order sorts the groups themselves
  (owner: it looked broken): First seen from the group's own first record, Last seen the most recently active, Most seen the most titles
  (`ixGroups`; Damage Control by case number, report count and losses). The catch-all group stays last.
- **A person stays in a group until the story moves them** (owner, November 2026): they quit, retire, are fired or disavowed, the group
  splits or ends, they turn on it or join another. A title where they act alone is not a move. The checked list of real departures is
  `split.json` "left" (`network/src/prof/split.json`, from `network/rel/departures.json`) and the same list is `TEAM_LEFT` in index.html,
  so a file's Teams and the Network always agree. An unsure case keeps the group. New "Independent" records need a verdict first.
- **No catch-all "Independent" bubble** in the Network (owner, November 2026: "I don't really love the independent group"): someone in no
  group stands on their own.
- **Groups change by what you've watched, not by story position:** a group step counts once its own title is ticked, so a later change
  is never shown early. **But a person shows the group they're in during a title you've watched** (owner, 4 November 2026, option 1:
  with only Homecoming watched, Peter stood alone, his school being recorded at Civil War, and Tony too): the group they belong to at
  the latest title you've seen them in counts even if they joined it in a title you haven't watched; nothing after that title shows.
  The Network and the files' Teams rows follow the same rule, so they agree.
- **The zombie world's groups go episode by episode** (What If...? S1 episode 5, Marvel Zombies): The Survivors while alive; turned, The
  Zombies, or The Queen of the Dead's Army once in Wanda's horde; killed or destroyed, they leave their group. `split.json` "steps", from
  `network/rel/zombie_timeline.json`; unsure fates keep their last group. Checked against Wikipedia's episode summaries (Marvel Zombies (TV
  series)), which corrected the first pass: Peter, Scott, Katy and Shang-Chi die in episode 4's battle, Thor is zombified between episodes 3
  and 4, Riri is alive at the end. Check fates against a source, not memory.
- **Group records fixed by hand** (`TEAM_FIX` in index.html, November 2026): Bob joins the Thunderbolts and the New Avengers at the end of
  Thunderbolts* (owner); Buck works for Fisk from Born Again S1; Kara and Akela were S.H.I.E.L.D. before HYDRA and Centipede, then freed.
  Steve stays an Avenger after Endgame (owner).
- **Fox's X-Men split at Days of Future Past** (owner, November 2026): the films before it share one Earth; from it on, the changed
  timeline (Apocalypse, Dark Phoenix) is another. **Numbers (owner's answer 52, option 1, 4 November 2026): the Marvel Database's.** The
  original films are Earth-41578 ("Original X-Men Cinematic Timeline"; the number is the fan-run Appendix's, not Marvel's), the changed
  timeline and Deadpool's world are Earth-10005 ("Revised X-Men Cinematic Universe", named on screen in Deadpool & Wolverine), Logan is
  Earth-17315 (also the Appendix's, from the filmmakers' interviews). Earth-TRN414, used before, has no source and is gone. The Deadpool
  files moved with Earth-10005 into the changed timeline (their Atlas entries to `ATLAS_UNI.foxtrn`; Wade's 1979 jump to Three Mile
  Island stays on the original map). A person played young and old is one bubble for the shared past (First Class), and their younger
  self is a bubble of its own in the changed timeline from Days of Future Past on. Havok, one file
  across both, gets a second bubble (`fox-havok-trn`) that opens his one file. In the indexes, young and old were already separate files.
- **The Avengers stand in the middle of the Network** (owner, November 2026): the layout puts them first and the screen centres on them.
  Every other tab opens centred on its biggest Earth, the one with the most people (owner: the tabs opened off to the side, on another
  universe's Avengers or the empty space between Earths). `fitRoom` in hub-src.
  The Earths are a honeycomb, like the Apple Watch's app grid (owner, November 2026: "too much empty space", then "some overlap, not
  sensibly placed", then "the little Earth by itself looks ridiculous ... it doesn't fit the honeycomb"): the biggest in the middle,
  everyone pulled toward it and pushed apart to one even gap (wide enough that the screen's lens never pulls two together), so small
  Earths settle between their neighbours; a little taller than wide for a phone (`applyCut`, hub-src).
- **The file's ID card** (owner, November 2026), the same in the Compound and the Raft: the status stamp sits in the card's top corner so
  the text runs the full width. First and last seen are the two ends of the person's path, a line in the index's colour, with "N titles on
  the path ›" between them opening Paths. One person is first and last seen once: someone on file in both indexes counts both files, so
  their Compound and Raft cards show the same two ends and count. The same for status where a file hands over between the indexes: both
  cards show where the person stands now, from whichever index holds them at the latest title watched, in each index's own words
  (`personSt`, `RF2CP`/`CP2RF`: At large = Fugitive, In custody or Captive = Imprisoned, Allied = Active). Wanda reads Deceased in both. Under it, "Character log" and the box's name open the character log, not the box. Both only
  where the person has them (`seenLine(S, o)`). No Character log or Path buttons on the record's header line. Where the record hands over to
  the other index, that entry is the link, in the other index's colour (red to the Raft, blue to the Compound), and the "Also on file" box
  goes; a twin with no hand-over keeps the box.
- **At and Case under each record entry** (owner, November 2026): the places (At) and the Damage Control reports (Case, number and name on
  one line each) where what the entry describes happens, whether or not the sentence names the place ("sides with Steve" is the airport;
  Infinity War's Mind Stone entry is Wakanda only). Each file shows its own side: Wanda's Raft file has Johannesburg, her Compound file
  doesn't. A place shows once lit, a case once Damage Control is found; each opens on top of the file. Data: `mockup-data/at_case.json`
  ("A|T:file id:step index" -> at: place keys "id|view|sub", cases: report ids), tagged by eight agents from each title's own Atlas
  and Damage Control entries (`mockup-data/atcase/BRIEF.md`); a show's whole world is left off for people who live in it.
  `at_case_missing.json` was the list of 333 places the stories used that the Atlas didn't have; they're now added (below).
- **The missing places, added** (owner, November 2026: "I absolutely want those places added", before the audit). 72 new places, 72
  entries on places that were there, every step re-tagged. Rules from the owner:
  - **Look every place up** ("literally two seconds of googling"): Tony's lake house is upstate New York, Afterlife is in Nepal, the
    Lighthouse is under Lake Ontario, the Playground in Virginia. "Location unknown" only when no source gives one; the pin then sits
    at a stand-in spot and its note says so. Each place's sources are in `mockup-data/places/out*.json` (brief: `BRIEF.md` there).
  - **Ships and bases are places where their location is known**, pinned there like the Lemurian Star (fictional places in real spots).
    The Red Room is a place in the skies over Russia, beside where it comes down. A vehicle with no stated location is left untagged.
  - **The animated world (Earth-92131) has its own Earth map** (`ATLAS_UNI.animx`), like Fox's X-Men: Xavier's School, Genosha, the
    Savage Land, Muir Island, Asteroid M and more. Its Multiverse pin opens it (`uni:"animx"`), and its episode tags moved there.
  - **Off-world places go in an orbit submap, not on the map's edge** (owner, November 2026: the edge "just looks like it's in the south
    pole"; "I kind of like an orbit submap, especially if it can be applied to all orbits"). Every Earth map with something off-world
    has an Orbit inset in its bottom-left corner: a little globe in its ring, with a dot while anything in it is new. In another
    universe it opens that Earth's orbit map (`ATLAS_UNI["animx-o"]` etc.: `map:"orbit"`, `up:` its Earth; the Earth's own list has an
    "Orbit" row, `{uni:"animx-o"}`, drawn as the inset instead of a pin): the Earth in the middle, a low orbit, the Moon's orbit with
    the Moon, and deep space at the rim (Asteroid M, Doom's station in low orbit; Attilan on the Moon; Klyntar, the Beyonder's planet,
    the Axis of Time, the Dark Dimension out at the rim). Its crumb and back go to its Earth, then the Multiverse (`atlorb` step).  The
    main Earth has no inset (owner, November 2026: cut it): the Cosmos already has Earth at its centre with S.A.B.E.R. and Mar-Vell's lab. The Savage Land is
    on Earth, below the map's 58°S edge, so it sits on that edge.
  - **The Atlas splits Fox's X-Men at Days of Future Past, like the Network** (owner, November 2026: "the timeline earth difference
    after DOFP like in networks etc, consistency and accuracy"). Two maps on the Multiverse: Earth-41578 (`ATLAS_UNI.fox`, "The original X-Men films") and
    Earth-10005 (`ATLAS_UNI.foxtrn`, pin `u-foxtrn`, "The changed timeline and Deadpool's world"; question 52). Changed-timeline titles: Days of Future Past's
    1973, Apocalypse, Dark Phoenix. Days of Future Past's 2023 (the Chinese temple, Moscow) is the old timeline's future, so it stays on
    Earth-41578, as the old cast's bubbles do in the Network. Deadpool 2 is on Earth-10005 everywhere (owner, November 2026: "whatever
    makes the most sense for his story as a whole, not a quick punchline"): Deadpool & Wolverine calls Wade's world Earth-10005, so the
    young X-Men's glimpse at the mansion doesn't move it. The Network's split list (`split.json` `post`) no longer has it. A place in both timelines is on both maps with each one's own entries
    (Xavier's School, New York, Washington, Alkali Lake...). Jean's childhood home: New Jersey on Earth-41578 (The Last Stand), Red
    Hook on Earth-10005 (Dark Phoenix). At lines in the files point at the map of their own title.
  **Step indexes:** the keys count a file's `st` steps, so adding or removing a step shifts the rest: re-tag that file. The audit checks it.
- **Links in messages: cut** (owner, November 2026: "useless right now, I'll think of it later"). Tried twice: pills, then the names
  underlined in the text. The problem was that file links can't show before the Compound (Age of Ultron) or the Raft (Civil War) are found,
  so the early messages had none. Parked, not in the app: the matcher `mockup-data/msg/mech.js` and its output `msg_anchors.json` (every
  name with a file, case or place, by universe and title). Don't bring it back unasked.
- **Replies:** the code is in place (`MSG_REPLY`, two choices, kept in `state.cmReply`, changing nothing else) but there are none: the
  owner deleted the first drafts and is writing their own (November 2026). Don't add any. No reply on the Sokovia Accords message: signing
  is the Accords egg's moment.
- **News and messages are separate feeds** (owner, November 2026): tapping a ticker clears only its own feed; the other still gets its
  ticker.
- **Card lines: pronouns only where the person is clear** (owner, November 2026: "He fought him and he won when he lost" is the problem,
  not pronouns themselves). No leading name (the card already shows it); name the card's own person instead of a second him or her.
  Example, Sharon's card about Captain America: "Infects Sharon on the survivors' train." Done, November 2026, before the audit: 11,524
  lines rewritten by ten agents from the owner's 20 approved examples (`network/cards/BRIEF.md`), applied last in relbake from
  `network/rel/line_fix.json` (only where the old line still matches). Each card keeps one short name for its person. On the way the
  agents found and fixed lines describing the wrong person (swapped pairs) and wrong facts against the stage text.
- **A dock button for the page you're on goes back to that page's main page** (owner, November 2026: "im in agent file > compound >
  character file and I press agent file button on the dock again it should bring me back to the main agent file page ... This should
  apply to other pages"). Every page the same: what's on top of it closes, the page opens fresh at its top. Story's box covers the dock.
- **Card lines don't read as live news** (owner, November 2026, on Bucky and Vision: "makes it sound like it's in the present. Shuri is
  working on vision now. What does that have to do with the relationship"). No "Now ..." sentence in a card line ("Once shot by Bucky.
  On the same side in Wakanda.", not "Now on the same side"), and a stage says what happens between the two people, not what a third
  person does nearby. Swept: 58 lines, in `network/rel/line_fix.json`.
- **A step that names a case's incident links that case** (owner, November 2026: Ross's Civil War step names the Vienna bombing and
  showed no case, "Seems like an oversight"). Taking part in it, caught up in it or its aftermath links; sharing a city doesn't.
- **No link in an index opens an index you haven't found.** That includes battle replays and anything added later: use `ixFile`.
- **One person, one name:** a Collection holder reads as the person's file does, and a variant in another universe as the main universe's
  file, unless the screen names it differently. Spellings follow the screen and its credits (Bennie Pollack, Aida).
- **Sources:** Wikipedia raw pages (`https://en.wikipedia.org/w/index.php?title=<Page>&action=raw`) and the fan wikis, which answer only
  through their API (`https://<wiki>.fandom.com/api.php?action=parse&page=<Page>&prop=wikitext&format=json`; marvelcinematicuniverse,
  marvel, spiderman, xmenmovies, marvelanimated, sonys-spider-man-universe). Their `/wiki/` pages return 403. Space requests a second or
  two apart (Wikipedia answers 429 when rushed), and never put personal information in one.

### Rules carried over from older handoffs (October 2026, restored November 2026)

These were the owner's standing rules in earlier handoffs and were lost along the way (owner, November 2026: "some information may have
been lost over the different handoffs that I said to remind new chats about, especially writing and consistency"). They still hold.

**Talking to the owner**
- Answer only what's asked; no unrelated commentary. When the owner says "don't edit", only explain.
- Explain in plain words: lead with the outcome, keep it short, and spell out anything the owner has to do on the phone.
- Show, don't describe: screenshots of any visual change, and an MP4 (never a GIF; it won't play) for anything animated.
- Confirm which page the owner means before changing one ("the log" once meant the Agent File).
- Don't recommend Chrome. The app lives in Samsung Internet on a Galaxy S25 Ultra.
- A big, costly rewrite is shown as a small sample first (two characters, two chapters) before doing the rest.

**Consistency**
- A fix for one place applies to every equivalent place: every submap, pill, box, empty state and index. Search the whole app before
  calling something done.
- Chapter, timeline and character users get parity: whatever one view gets, the others get.
- Empty and waiting states are just their status, with no "yet" and no instruction: "No data", "No signal.", "Awaiting data.",
  "No headlines." (with the no tap-text rule above).

**Writing**
- MCU-accurate and spoiler-safe. A line may use only what the viewer knows by that title, in that box's order: no foreshadowing. No
  actor names.
- Titles from 2026 on get entries only once the owner confirms they're out; look them up first.
- A log's entries are real recaps of their title (three to six sentences: names, places, turns), so a reader remembers what happened,
  never "this happened, then this happened". Each log follows one theme across the whole journey, and every entry reads as a step in
  it. Stories aren't finished, so the last entry stays open. Chapter entries are written from the chapter's angle, not copied from the
  character logs. (The themes agreed per log are in the logs themselves: each chapter's Theme row, each character log's throughline.)
- New titles go into Release Order and the Sacred Timeline automatically; where they go in Chapters and Characters is recommended only,
  and waits for the owner.

**Eggs and effects**
- Every egg ties back to the MCU; no bloat. Quality bar: researched, recognizable, nothing flat or "jpeg" looking, well paced, sized for
  the phone, premium and cinematic. Winter Soldier's egg is the benchmark for emotion and pacing.
- Each pill gets its own moment: one after another, never stacked or cut short. An egg's Agent File pill shows after its animation
  ends (the few that ride their spoken line keep it there: Worthy, Puny god, Eyes only, Dance-off, the Watcher).
- Effects use `fx-` class names.
- **Never propose again:** a build-your-own Avengers lineup, the Citadel at the end of time, a "Previously on" recap, "unlock characters
  as you meet them". **Scrapped by the owner:** every Falcon egg, Ship of Theseus, the Scarlet Witch egg, a face doodle as a file
  photo, the paper case-file / S.H.I.E.L.D. dossier look (replaced by the data log).

**Phone gotchas**
- A phone's hover sticks, so hover effects only apply to a real mouse (`@media (hover:hover)`).
- Samsung's dark mode recolours light SVG art: paint light art with CSS gradients.
- Samsung keeps the icon and name from when the app was added: a change needs the app removed and added again. Icons stay plain, not
  maskable, or Samsung frames them in white.
- A fade read as a blink and a sideways slide as a shake: prefer an instant swap.
- When the owner reports something desktop can't show, ask for a screen recording, pull frames with ffmpeg and measure them (the phone
  is 1080x2340 screen pixels, 2.5 per page pixel).

- **Test build (7 November 2026): the Snap report, built** (owner: "build the report, ticker, memorial etc idk about atlas ... build it
  I guess and let me get my hands on everything"). Worked out once from that Snap's list (`snapReport`, kept in `state.snapRep` until
  Whatever it takes): a priority message in Comms (`COMMS` entry `__snap`, its fields getters; `cmExtra` draws the report, `snapRepHTML`)
  signed by the first survivor of `SNAP_SENDERS` (Natasha, Steve, Rhodey, Okoye ...); the ticker's headlines (`NEWS["__snap:<id>"]`,
  `newsLiveT`); Last seen in the Atlas (a Lost switch beside Fit, red pins with counts, "Last seen here" names on a place's sheet;
  `snapLSPins`, `snapSheetBits`); the Vanished memorial in San Francisco's sheet (a door like Damage Control's; a tab per universe; a name
  several versions share carved once with a count). Names open their Network card (`data-netid`), places open the Atlas with the layer on.
  Undone: "All accounted for" and two headlines; the memorial and the layer go. The Network's `netPool` now also gives each person's
  name, universe, group and connections. Not on main: built straight into the app's code (no MOCK), so it goes with the next main push.
- **The Vanished is a full page** (owner, 7 November 2026: "should open full page to give the impression of a true full sized monument"): `#vnPage`, a stone slab with a cap and base over a dusk sky, the title carved large, a tab per universe, names in two columns; opened from San Francisco's door and from the report's "+N more" (`snapWallOpen`); ✕ or the phone's back closes it and nothing under it (its own history step, `popstate` caught first).
- **The report is on your Agent ID** (owner, 7 November 2026: "don't make it an index, make it on the agent card"; an Archives card came first): while the Snap holds, the ID card gets a row under Files, "THE SNAP · N unaccounted for ›" (`.hf-snap`), opening the report in Comms (delivering it if the ticker hadn't yet). Gone once undone.
- **The lost open nothing** (owner, 7 November 2026: "I can still click them, it opens their Network and then I can still open their file and character log?"): the report's Missing and Last seen names are only names ("Subject lost in the snap."); the Network's `netGo` and its search skip anyone in `SNAPS`. Those still reporting in open their file (owner: "should open their file not their network"; the Compound's, else the Raft's, via `fileGo`, so back returns to the report; a name with no file you can reach yet is plain).
- **Paths' redraw no longer freezes the page** (owner, 7 November 2026: "the path animation took a long time to go through and settle"): sampling each line through the browser (`getPointAtLength`) took 8 s before anything moved; lines are now read from their own M/L/C commands (24 ms). Paths' dust is quicker too (1.3 s over 1.6 s; coming back 1.2 s).
- **Paths closes up and opens like the lists** (owner, 7 November 2026: "it just kind of pops up fully spaced out, or fully closed
  out ... that doesn't match the rest"; and its dots flashed before coming back). `snapMapRedraw` now moves the map on the Characters
  list's curve: each line drawn between its old and new shape, matched title by title (by length they swung); stops, titles, names and
  years slide; a stop that changes shape crossfades (`.snap-old`); anything new waits hidden for its dust. Coming back, a shortened name
  dusts out first. Pop detector clean both ways, several runs.
- **The Snap report's words (owner, 7 November 2026; corrected the same day: "I want the count of how many are gone, just not out of X"):** the report shows how many are gone (Unaccounted for, a big number; a count beside each universe; Hardest hit "N gone" or "Wiped out"), never "of X" or a total. Earlier wording, kept where it still holds: no "of X" and no totals anywhere ("there aren't 1400 people on Earth": the
  files aren't the population), no Earth number in its heading; the message reads "Half of the population is gone. This is the count so
  far. We keep checking."; the first headline "Half of Earth gone in an instant", a place "hardest hit" with no count, a team "only N
  left";  The wall carves a name several people share once
  per Earth, with that Earth under it (the Sacred Timeline's own plain), never "· 2".
- **Rules from this round (owner, 7 November 2026):** don't change how something works without being asked (I kept Thanos out of the
  Snap unasked: "Why would you exclude Thanos? Did I ask? No"; reverted; anyone can be snapped). No instruction words anywhere, "scroll"
  included (the memorial mockup said "362 NAMES · SCROLL"; it reads "362 NAMES").

## Coverage: everything the app shows, and what checks it (7 November 2026)

Owner, 7 November 2026 ("And the audit missed this why? ... Just do other circles and coverage list"). Before calling any audit done,
walk this list; anything new the app shows gets a line here, with its check, the day it ships. "Audit part N" is `mockup-data/audit2/`
(the facts, against sources); "ct.." are the tests in `mockup-data/tests/` (the app's behaviour). **GAP** means nothing checks it.

- **Titles, orders and seasons** (Sacred Timeline, release order, chapters, character boxes, episode names and counts): audit part 7;
  ct42, ct43, ct45, ct46, ct48. **Box quotes:** part 7.
- **Logs** (recaps, staged rows: period, aliases, affiliation, status): audit part 5.
- **People's groups and their stages** (`TEAM_AUDIT2`, `TEAM_LEFT`, split.json), shown in the files and as the Network's teams: audit
  part 1 (locked at 1.1%); ct64 (a person stands in a title's group).
- **Files** (the Raft, the Compound, the Collection: kind lines, steps, statuses, aliases, factions, At, Case and Held lines, First and
  Last seen): audit part 3; ct49 to ct53, ct57, ct60 to ct63; `content.js` (nothing too early, nothing pointing nowhere).
- **The Atlas** (places, pins, Earth maps, the At lines' places): audit part 4; ct54, ct59.
- **Damage Control** (reports, replays), **news headlines**, **Comms messages**: audit part 6; ct58. The news outlets' names (`SRCX`):
  **GAP** (not in part 6's brief; small).
- **The Agent File** (eggs, stones, achievements, insignia, level, keycard): audit part 8; ct40, ct56.
- **The Multiverse map, the Incursions wall, the Watcher's realities:** audit part 9; ct52 (tabs), ct61.
- **The Network's connections** (kinds, stages, texts, who lines, episode tags): audit part 2 (fresh 600 at 3.8%, fixed); the episode
  second pass (`mockup-data/episodes/`). Mutual connections are built from these (no data of their own).
- **The Network's circles** (families and places someone stands in when they have no team): Sacred Timeline, all 184 checked 6 November
  2026 (7 staged); the other universes, all 126 people in 81 circles checked 7 November 2026 (the 1988 Peter Quill and the zombie
  Vision moved; Dazzler and Carnage staged; Leech at Worthington Labs, the Brood at Weapon X, Finesse with Daredevil, Bruce with the Gamma
  Beasts confirmed). One-off reads: **GAP**, no test keeps a circle from showing before its title (`CIRC_FROM`).
- **Which Earth a Network person is on** (`earths.json`, the card's top line off the Sacred Timeline): the Earth numbers are part 9's;
  who stands on which Earth was owner calls, never sampled. **GAP**.
- **The Network's cards as shown** (the top line, Groups, In N titles, Who's who) and the room's group names, in every universe tab:
  ct64 and ct65 open cards on the Sacred Timeline only. **GAP**: nothing reads a card off the Sacred Timeline ("Starforceby" got through
  this way, 6 November 2026). Offered to the owner as "read every card on screen"; not taken up 7 November 2026.
- **The universe tabs' names** (indexes and the Network): ct52 (`slNamed`, the chapter box, the Extras character box, every title).
- **Offline and loading** (sw.js, the split data file, the Network's frame): swtest; smoke.
- **Wording rules** (no em dashes, the owner's words): `check.js`, `content.js`.
- **Parked mockups** (the Time Machine, Six Degrees, landscape): test build only; not covered, not on main.

## Mistakes not to repeat

- **Laying out a page without asking what it's used for (November 2026):** landscape's open box was split into a header column and a
  title column because Story's page had been; the owner: "Think a little bit about actual usability before doing some changes". Before
  any layout change, name what the person does on that page and give that the room.

- **Matching people by name alone, again (November 2026):** the Network merges a Raft file into a Compound file of the same name,
  and links same-name people across universes as "other versions". When the left-out characters went in, Phastos's son Jack (the
  Compound) was merged with Hammer's assistant Jack (the Raft): he stood in Hammer Industries with Hammer's and Vanko's ties, out of his
  family's circle, and five Jacks plus Bobby, Dave, Luis, Sergei, Raza, Talos and Blackwell were each other's "versions". The owner
  found it ("so fucking obvious things that you think would have been caught when I did a multi day god damn audit"). Fixed: a
  name merge also needs a shared title (hub2.js), `NOTVER` keeps first-name and codename matches from being versions, Ben and Jack
  stand in "Phastos's family" (one spelling; the old "Phastos' family" entry went), and ct67 checks every person's current group
  against their own file, every merge for a shared title, and the version links. After adding people, run ct67 and read every new
  person's card in the Network.

- **Rerunning a generator over hand edits, and not reading the build (November 2026):** `unfiled/merge.py` rebuilds its adds and
  episode tags from the `chk*.json` batches. Rerun after VisionQuest and the Roxy Glass fix (both edited elsewhere), it put the
  adds after VisionQuest's edits and reverted the tags and Roxy's stage. The build printed 7 "answers: no file" lines and the
  push went out anyway. Fix data at its source (the chk file a generator reads), never only in its output; after any rerun,
  `git diff` what it wrote; and read every line the build prints (rebuild.sh now stops on them).

- **A stage written for story order, sorted by title order (November 2026):** the group audit put Endgame's 2012 stage first in
  Sitwell's, Pierce's, Rollins's and Rumlow's files, meaning "earliest", but every group stage is ordered by its title's place in the
  timeline, so Endgame's came out last and left all four in S.H.I.E.L.D. with everything watched (the owner found it). Each stage was
  checked as true for its title; nobody checked where the person ends. After any group change, check the last group with the whole
  timeline watched (ct66 does it for past visits in later titles).

- **A gate on the wrong record name (November 2026):** the Case lines and the links into Damage Control asked `earned("damagecontrol")`,
  but the Agent File records a discovery as `egg-damagecontrol`, so no one ever saw a Case line (the owner found it). `dcFound()` reads
  `state.eggs.damagecontrol`, as the Archives do. The content check now fails any `earned("...")` naming a record that doesn't exist.

- **Gathering data with a mockup switched on.** The episode pass gathered its moments from the dev build while the WandaVision mockup
  was in it, so Wanda's real entry took a mockup entry's tag. Gather from a build with no mockups (or the main build), and check a
  sample end to end (`episodes/check.js`) before pushing.
- **Two Sacred Timeline people with one name** (Vision and S.W.O.R.D.'s Vision, Maria Rambeau and Binary, every Earth-838 variant):
  connections are matched by name, so the later one took all of them; the main Karl Mordo had none. relbake's `BY_ID_ONLY` lists the
  ones reached by id only. After any new variant, list the names shared inside the Sacred Timeline and check both sides' connections.
- **The Network laid out while hidden walked everyone over when shown** (it only moves people while on screen). Anything set out out of
  sight must be put straight on its spot.

These happened in earlier chats. Each cost the owner time.

1. **Inferring a group from a place or a person.** Cyclops and Nightcrawler were tagged Weapon X because Stryker brainwashed them at
   Alkali Lake; X2's operation is Stryker's own. Before tagging, confirm the screen shows this person serving that named group in that
   title.
2. **Using names the screen never says.** "Red Queen" comes from comics and marketing (the Black Order is the owner's exception). Fan wikis list affiliations
   from comics and tie-ins: check the film or episode supports them.
3. **Reading an unclear answer as a decision.** "A servant isn't a group, it's an affliction" was taken to mean "drop them", and the owner
   meant the opposite. When an answer can be read two ways, ask again with both readings as options.
4. **Trusting agent output without a second pass.** A sweep of about 1,000 additions had 97 problems that an independent re-check found.
   For any agent-made data, run a separate pass that tries to disprove each claim; give it the claim and the file, not the original
   reasoning. Show the owner what changes before main.
5. **Merging slices without reconciling them.** Separate agents named the same group differently ("Cerberus" and "Cerberus Squad") and
   disagreed on rules. Reconcile names before merging, and check a person's hero and villain files agree.
6. **Leaving past memberships open.** The Winter Soldier showed "U.S. Army" as his current faction and Shaw "Nazi Germany". After any
   faction change, check the current (last) stage of every touched file is where the person really stands.
7. **Keying a stage to a whole multi-season show.** It only opens once every season is watched. Key to the season's own title.
8. **Arbitrary design.** Fury's first band of "redacted bars" had no reason for its spacing. Build one motif with a reason, evenly spaced,
   and show screenshots before committing.
9. **Setting scroll on a hidden element.** A hidden panel ignores `scrollTop`, so the indexes kept each other's scroll. Show first, then
   scroll.
10. **Treating stop-hook messages as permission.** They are not; pushes to main wait for the owner.
11. **Restarting agents after a usage limit.** When parallel agents stop on a limit, resume them with SendMessage after the reset; their
    work is kept.
12. **Capping steps, and only checking what's there.** The original briefs said "2 to 8 steps, merge minor appearances", so Maria Hill had
    no Agents of S.H.I.E.L.D. steps and Jasper Sitwell 2 of his 8 titles. Every audit since had only checked existing steps. Never cap a
    file. A completeness check compares each file with its subject's real appearances.
13. **Letting rulings drift between agents.** Re-checkers ruled differently on Agents of S.H.I.E.L.D. seasons 6 and 7 and on Life Model
    Decoys. When a convention comes up, write it into every brief at once and override the stray verdicts.
14. **Easing on a whole multi-keyframe animation.** It warps every keyframe's timing (Fury's pager dropped early and vanished
    mid-exit). Put the easing on each keyframe.
15. **Answering with a count.** The owner asked what was on main and got "six". Give the list.
16. **Building a feature twice.** The sling ring and the Watcher both teleported. Check what already does the job first.
17. **Building copies at the moment of a swap.** The Watcher's return built ten full-screen copies in the same frame it removed the
    original, so the phone blinked. Build the copies early, stacked over the original, and only start them moving at the swap. But not
    so early that two sets of full-screen pieces exist at once: twenty layers were too many for the owner's phone.
20. **Trusting desktop and emulation for phone rendering.** The Watcher's pieces fell whole in headless Chrome, emulation included, but
    on the owner's Samsung phone their contents stayed behind (fixed-position children not moving with a transformed parent). Make a
    moving element its children's frame explicitly (`will-change: transform`, children absolute), and ask the owner to check on the
    phone before main.
21. **An effect you only watch must not pass taps through.** The Watcher egg's layers ignored taps, so rows under it got ticked. Cover
    such an effect with a layer that takes them.
18. **Copies that miss the box's variables.** `pinCopy` dropped the box's colour variables, so the ticks' boxes went blank on every
    effect that copies a box. A copy carries the box's custom properties.
19. **Testing with a mouse only where a finger is the real input, and the reverse.** A circle drawn with a mouse clicked the box under
    it. Check both, and remember headless can't scroll natively, so touch scrolling needs the owner's phone.
22. **Changing source steps under the fix files.** Adding a "past" label to the Time Heist steps in `coll_mcu_a.json` made two audit
    ops (F640, F650) stop matching, and the Eye of Agamotto's and the Soul Stone's fixes dropped off main until the build's
    `audit: no step` lines were read. After touching any source step, build and read every line the build prints.

23. **Matching people by name alone.** In the Spider-Verse tab "Peter Parker" is nine files, and a name-only match linked the Raimi suit
    to Miguel O'Hara; a hand-made lead sent What If's Helen of Troy to Helen Cho. Require a shared title, let a tie link nothing, and test
    every hand-made link against the data.
24. **Asking to push the working branches.** Only main needs the owner's yes. Asking for anything else (the handoff, the working branch)
    wastes the owner's time and was called out more than once. Push those yourself, and say so in a line.
25. **Filing a found problem instead of raising it.** The Collection's holder list mixing eight Spider-Men was noticed while building the
    holder links and only written under Open items. Tell the owner the moment you find something wrong, with what it is and a fix.
26. **Writing an audit brief from a sample instead of from these rules** (November 2026). The people second pass told checkers that a
    group someone left before their first title is "backstory, not a stage", that brainwashed service and workplaces don't count, and
    let them take group names from fan wikis. HANDOFF says the opposite on all four (a hero file notes a villain past even outside its
    titles; brainwashed, forced and undercover service count; any organization counts, companies included; a group's name is the one
    said on screen). ct49 caught the Winter Soldier's war years; the rest were found on reading HANDOFF and reverted or re-checked.
    Before writing any brief, copy the binding rules from this file into it (`audit2/people/RULES_HANDOFF.md` is the people set).
27. **Changing a file's steps while other data points at them by place.** A file's places and cases (`at_case.json`, "g:id:step"), its
    episode tags (`ep_tags.json`, "title|n"), its handover rewrites and drops (`handover.json`, by title and n) and the Network's card
    rewrites (`line_fix.json`, "a|b|stage|side") are all keyed by position. Inserting or moving a step shifts them all. Re-key them with
    the change and check the result against the built app (every changed file equal to what was checked, every other file unchanged).

## Open items

- **Audit status (4 November 2026, all on main as of ab088a6):** parts 1 to 3 (people, the Network, the files) are done: checked, second-checked,
  applied, then a fresh random 600 of each rechecked (people 1.6%, the Network 4.3%, files 1.2% wrong, all fixed after a second check),
  then the Network's last pass over all 7,357 stages, then the owner's answers to the 59 report questions. Parts 4 to 9 followed the
  same day (see "Where things stand"), all on main since `0695617`. The owner's bar is 0 to 1% wrong; parts 1 to 3's last samples were over it for the Network
  (4.3%), so a fresh Network sample is owed before calling part 2 locked. Audit records: `mockup-data/audit2/`.
- **The round report (5 November 2026)**: https://claude.ai/artifact/4VKPvWnF5NY3zcyirGemoX, decisions 60 to 63 (push the audit fixes
  and the Watcher; slim the launch page; the Doctor Strange & Wong quote; recount part 1's sample under the wrong-only rule). Answers
  save in its `answers` collection and come back as a comment thread on Submit, like the first report's.
- **The report page** (questions and answers): https://claude.ai/artifact/ABJLLQ9XwpJvrReuCNjfny. Answers come back as comment threads
  (the page's Submit). All 59 answered and done; new questions go on as 60 onward.
- **Held (built 4 November 2026; approved by the owner, "Love the held item"; goes to main with the next push):** under a file's entry, beside At and Case, `recHeld` lists
  the Collection objects whose step in that title ends with this person as holder (`heldIx`, matched to files the way a holder's
  list is, `cxHoldFiles`), on the title's last entry only, once the Collection is found and the object's own step is reached; each
  opens the object's file on top (`data-held`). A show's running "In episode N," finds its season (`heldKey`). Specimens have homes,
  not holders. Test: ct63. Holder entries that match no file entry are audit leads in `mockup-data/audit2/held/leads.json`.
  The first ask was a "Held" line under a file's entry, beside At and Case: the Collection
  objects that person holds in that title (the Darkhold under Wanda's Multiverse of Madness entry), shown once the Collection is found.
  It comes before audit parts 4 to 9, so the audit covers it.
- **The audit plan** (owner, November 2026): step by step, in HANDOFF's words above. 1) Build the content check and run it in full,
  fix what it finds. 2) The audit in nine parts, in order: people (groups, Earths, versions), Network connections, files (records,
  statuses, hand-overs, At and Case), Atlas, character logs, Damage Control and Comms (messages and headlines), the story lists and the
  boxes' own text (titles, order, years, running times, episode lists and tags, quotes, unlock lines, rename notes), the Agent File (64
  eggs, 6 stones, 136 achievements, insignia names and hints), the Incursions wall and the Multiverse (lost Earths, TVA notices, the
  Watcher's realities). Paths and the Log have no text of their own: they're covered through the files and logs. The Atlas part also asks
  what's MISSING (owner: Earth-67 had no season 2): the content check flags each file step whose At line names a place with no entry
  for that title, and the Atlas checkers add the entry or correct the At line. Parts 7 to 9 were
  added because nothing had been checked under the locked rules; the October lore audit and the eggs audit were single unlocked passes. Each part: fixed yes/no questions, a change needs
  a source, a second checker confirms it, every checked entry is locked, patterns fixed as a whole. 3) After each part, a random 600
  of the passed entries are rechecked from scratch; the owner's bar is 0%, at worst 0.5 to 1% ("if I can't get 0% wrong then .5-1%"):
  0 wrong in 600 passes, 1 to 3 are fixed with their pattern and a fresh 600 drawn, more goes back through the part. 4) The full content
  check again after each part. The audit's agents need the owner's "use a workflow".
- **Cut completely (owner, 13 November 2026: "It's so bad", then "Cut it completely"):** Story events, the datapad living through
  a title's big turn after you watch it (Ultron getting into the datapad and the Vision burning him out was mocked up and removed;
  the Winter Soldier, Endgame's five years and No Way Home's spell were offered). Don't pitch it again in any form.
- **Cut (owner, 13 November 2026: "These are all terrible and useless"):** Origins (a tree of where powers come from), the Codex
  (a staged glossary), Redacted (guess a blacked-out file), and Wrapped and Compare with a friend ("should have been cut"). Don't
  pitch any of them again.
- **Owner's calls, November 2026:** the six ideas pitched in October (the Doomsday update, a watch diary, time on the clock, a release
  radar, a home screen widget, a share card) are cut: don't pitch them again. Dropped, don't raise again: Doomsday and Secret Wars
  content, the Encore revisit, Banner and Doom, the sky's first-minute redraws, confirming the cold-start fix. The weakly fitting kinds
  on the off-screen connections (Ezekiel and Tony, Walker and Steve, J.A.R.V.I.S. and Edwin Jarvis, Banner and Erskine, Valentina and
  Ross, Ridley and Karen, Lorelei and Thor) stay as they are.
- **Done, on main (November 2026):**
  - **Episode by episode** (owner: Comms, the Network, the Atlas and related info "could be episode dependent"). A title-keyed moment
    can be `"Title#N"` (news keys, a message's `t`, an Atlas entry's title, a Network stage's title); a file step can open "In episode
    N," like "In season N,". `atlSeenT` counts it seen once that episode or a later one is ticked in any list, or the whole title is
    watched (`epMax`, `epReach`: a show filed whole and by season, like Agents of S.H.I.E.L.D., counts ticks in either); `tn`/`tnh` show
    "WandaVision · Episode 7" or "Agents of S.H.I.E.L.D. S2 · Episode 3"; `atlOrd` sorts it inside its title. The Network gets the
    episodes ticked (`netSeen`'s 4th argument), counts an episode-tied stage as meeting, and shows the episode on the connection.
    **The data:** `mockup-data/ep_tags.json` (the app: `st` file steps, `at` Atlas, `nw` news, `ms` messages; applied at load,
    `EPTAGS`) and `network/rel/ep_tags.json` (the Network's stages, applied by relbake). Eight agents tagged all 5,717 moments in 115
    shows with the episode by which everything the text says has happened (never earlier); 4,437 got an earlier episode, 1,280 are
    finale events and stay as they were. `mockup-data/episodes/`: the brief, the gatherer (`dump.js`), the checker and merger
    (`merge.py`: every moment answered, in range, an "In season N," step inside season N), and an end-to-end check (`check.js`).
    Rerunning: gather with the handover applied, then merge. A moment the agents couldn't place falls back to the last episode.
  - **The Compound and Raft handover: done, on main (November 2026)**, see "How the app works" below. 77 people have both files; 54
    are handed over (`mockup-data/handover.json`, researched by four agents against the wikis, validated by
    `validate.py` rules: every pair once, statuses from each side's list, no dashes or fourth-wall words, no title lost, each switch
    title told in halves). 15 who stay on one side all along keep both files whole (a handover would empty one file and make it
    vanish: Leo Fitz as The Doctor, Lash, Sony's Venom, Morbius and Kraven, the Bloodpack, Brigid O'Reilly, the white Vision and
    others). The 8 Runaways parents share one Raft file (PRIDE), which is never handed over.
- **The appearance sweep's open calls are settled** (`appear_sweep.json`, `owner_calls`): Muse gets a Born Again S2 step (Heather's
  memories of his attack, not her hallucinations), Peggy an Agents of S.H.I.E.L.D. S7 step (Simmons posing as her in 1955). No step for
  Jameson in Venom: Let There Be Carnage (promotional footage). Uncle Ben keeps his "Intervention" step (the real night Peter relives;
  the spirit guiding him is a vision and stays out). Jean keeps X-Men: The Animated Series seasons 4 and 5.
- **Drafts: the Time Machine and Six Degrees (5 November 2026, test build v147, mockups, on the back burner).** The owner
  asked to "draft up 6 degrees and time machine in the build". Both run only on data the app already has; nothing new was written or
  researched. Screenshots were shown in the chat.
  - **The Time Machine** (`/* MOCKUP BEGIN timemachine */` in index.html's CSS and script). A "Time Machine" pill on the Sacred
    Timeline page, under its legend, opens an amber band over the dock (the ticker hides under it while it runs): the stop's year
    (the timeline's era, "Undated" where it has none) and title, a slider with ‹ ›, "13 / 147", and Present, which leaves it. The stops
    are the Sacred Timeline's titles you've watched (or reached an episode of), in story order (`DATA.timeline`, always story order).
    It opens on the last watched title. At a stop, `atlSeenT` and `atlEvSeen` (now `let`, the mockup
    wraps them) count a title only up to that stop (`tmIdx`: a title's place on the timeline; an episode of a whole show finds its
    season; a whole show counts once its last season has come), so the Atlas, the Network, the files (steps, statuses, first and last
    seen), Damage Control and Comms all show the story as it stood then. A title off the Sacred Timeline (the Incursions) is outside
    time and stays as watched. On the Story page the titles after the stop dim and the stop is ringed. Nothing is saved while it
    runs (`persist` is held; the state is snapshotted on the way in and put back on the way out, so read marks and the Network's
    known list are as they were). A tick or an episode changed while travelling brings you back to the present with the tick kept.
    Checked in headless Chrome: at The Avengers the Atlas lights 111 places of 278 and Tony's file has 4 entries; at Civil War,
    7 titles, Active, last seen Civil War; back at the present, everything as before.
  - **Six Degrees** (in the Network: `network/src/hub-src.html`, its CSS block and the script at the end; `network/network-hub.html`
    rebuilt by putting the existing baked data back into the new source, so nothing else in the Network changed). A gold "Six
    Degrees" pill at the right of the Network's title, hidden unless the app calls `netMockOn()` (only the app's timemachine mockup
    block does, so main's network.html carries it hidden). It opens a full-screen sheet like Search, on a pair to start from: From
    and To with Par N between them (the shortest chain), a line saying what to do, **New pair** and **Start ›** (owner, 5 November
    2026: "how am I supposed to play? ... no like start or go"). Either name can be tapped to pick your own from a list of everyone in
    the room with a connection (searchable); a pair with no chain says so and can't start. Playing: the chain so far (each link with
    its kind, the latest stage you've watched in full and its title or episode), then "Link N · <name>'s connections", each a card
    with an arrow, by kind; Undo, Reveal (gives up and shows a shortest chain). Linked: "6 links. 2 over par." with both chains,
    **New pair** and "Lock onto <name> ›". A new pair is two familiar faces in the room you're in (the top fifth by titles seen), three
    or four links apart where the room allows, at random. Only people you've met and connections you've seen count, so it's
    spoiler-safe; with the Time Machine on it's that moment's room.
  - **Six Degrees, reworked (owner, 7 November 2026: "make the game in the actual network map ... as I tap on each it becomes a
    chain instead of the list"; "hidden somewhere else so it's a discovery").** No pill: hold the Network's title (0.8 s; `SIX_ON`
    still set only by the app's mockup call, so main's network.html has it off). Played in the room (`GAME`, `gameStart`, `gameTap`):
    the view centres on From (owner: "the camera needs to center on the starting point"); From and To in gold rings, To pulsing; the last link's connections lit with faint threads in their kind's colours, everyone else
    dim; a tap on one adds a gold thread and the view follows; a tap on a link already in the chain goes back to it; a tap on anyone
    else says "Not linked to N". A bar at the bottom (`#six6`): From › To, "Link N · par P", Undo, Reveal, New pair, Done; linked,
    "N links · par" or "N over par", Shortest (a white dashed chain), New pair, Done, and the view pulls back to the whole chain
    (`gameFit`; the chain's people stay standing as themselves, not folded into their groups). The old sheet's code is still there,
    unreachable; cut it when this is promoted.
  - **No daily anything** (owner, 5 November 2026: "Wtf is this daily shit nonsense"): no daily puzzle, daily pair, streak or
    anything else that runs on the calendar. A game gives a new round whenever you ask.
  - **Parked (owner, 5 November 2026: "put them on the back burner"), not to be raised until the owner comes back to them.** Open
    questions, asked in the chat on 5 November 2026: where the Time Machine's way in goes; Release Order;
    ticks while travelling; Six Degrees per universe or Sacred Timeline only; the names. (The daily pair was cut on the owner's word.)
  - main is untouched: mainprep cuts the timemachine block (checked: no `tmBand` or `netSixOn` call in the main build), and check,
    smoke, ct64 and ct65 pass on a main build with the new network.html.
- **Home screen: cut (owner, November 2026: "Cut it completely").** A datapad Home page leading the dock (an Agent ID strip, Up next,
  readouts, every page and archive as a card, then restyled as S.H.I.E.L.D. hardware with dials and a power-up) was tried in the test
  build and removed entirely. Story stays the front page. Don't bring it back unasked.
- **The Classified eggs:** the audit is at https://claude.ai/artifact/5tqx9SYTYccbT2whKbNgfJ (64 ranked, cuts, fixes, gaps, 40 ideas). The
  owner kept all 64. The Agent File's eggs are split as evenly as possible over its pages, and the number of pages grows as eggs are
  added so no page gets long (owner, 14 November 2026: "My rule was never to add agent files by groups of 4 ... It was to split them
  evenly (or as much as possible) over x amount of pages ever growing as more eggs are added"; "add eggs in fours" was a misreading). Its bug list, by number: fixed
  are #4 (the replays' back door), #8 (the mouse holds take a 10px wobble), #9 (On your left's edge counts only above the titles, never
  beside one), #10 (Sorcerer Supreme's rings reach 120px round the corner, never the Profile button) and #11 to #17 (every wrong hint and
  how-to, text only; Marvel Studios is now titled The Marvel Cinematic Universe, like its card). The rest are features, not bugs (owner,
  October 2026), so leave them as they are: #1 Worthy needs the whole Thor box ticked, Doomsday and Secret Wars included; #2 One last
  page and #3 the Battle of New York play without a watch gate; #5 Variant draws a [ Classified ] name's lines; #6 Level 7 counts when
  you tap outside its files; #7 a repeat hold stacks Hello, Peter., Mutant powers, the Uni-Mind and Thwip. The bug list is closed.
- **The Android app (`android-app/`, October 2026):** the owner's chosen way past One UI 9's grey strip. A plain Android shell, no framework:
  one full-screen WebView onto the live site (`MainActivity.java`), so every push to main reaches it with no reinstall. The status bar is
  hidden (a swipe down from the top shows it for a moment), the page draws around the camera (`viewport-fit=cover`, its own
  `env(safe-area-inset-*)` padding), the navigation bar is left alone (the owner goes back with NavStar's side swipe), Back is the page's
  own history (`webView.goBack()`, from the front page the app goes to the background), vibration allowed, an offline page until the site
  has loaded once. Its storage is its own, and progress lives there: there is no save code to move it any more, so Android's own backup
  is on (`allowBackup`, version 1.1, versionCode 2): the phone backs the app's data up to Google with the rest of the phone. Raise
  `versionCode` for every new build, or the phone won't install it over the old one.
  - **Updating:** site changes reach the app when the owner fully closes it (swipes it from recent apps) and reopens it online; Back only
    sends it to the background, so a reopened app keeps the old page. The owner is happy with that: no auto-refresh (October 2026).
  - **A new APK is only for the shell:** full screen and the system bars, the icon or name, Back with nothing left to go back to,
    permissions (notifications, camera, widgets), the offline page, the site's address, or an Android update breaking the shell. Everything
    else is the site.
  - **Build** (from `android-app/`; Android SDK at `/opt/android-sdk`, platform 36 and build-tools 35, with `sdk.dir` in
    `local.properties`): `gradle --no-daemon -I mirror.gradle assembleRelease -PdpStore=<key.jks> -PdpPass=<password>`. Maven Central
    answers 429 in this container, so `mirror.gradle` (an init script, kept outside the repo) puts
    `https://maven-central.storage-download.googleapis.com/maven2/` in front of the project's repositories.
  - **The signing key** is never in this public repo. The owner holds `datapad-release.jks` and its password (sent in the October 2026
    chat). An update to the app itself must be signed with it, or the phone refuses it and the old app has to be uninstalled, which wipes
    its storage: ask the owner for the key before building one. Changes to the site need no new app.
- **The owner's phone:** the Android app above, installed October 2026, fixed the grey strip (owner: "It's fixed"). Before it, the app was
  installed from Samsung Internet. After One UI 9, SystemUI Tuner still hides the status bar, but the
  installed app kept a grey strip where it had been (Samsung Internet itself stayed fully immersive), so `manifest.webmanifest` now asks
  for `"display": "fullscreen"` (October 2026). Nothing in the code checks the display mode. A manifest change needs the app reinstalled
  from Samsung Internet. Wrapping it as an Android app (Capacitor) was discussed and not
  started; battery came first.
- `cxDark` still takes the Collection's case as well as a title (`b`), though only titles use it now.
- **Cut in October 2026 (don't bring back unasked):** J.A.R.V.I.S. search, Sound and the sound board, the War Room, the TVA and Wakanda
  skins, the clearance exams, Eyes Only, the Eye of Agamotto, the arc reactor, the Aether, the Rolex and the other eleven touchable
  cases, Handle with care, and the Watcher's jump elsewhere.
- Upcoming titles (Avengers: Doomsday, Avengers: Secret Wars) stay on the main line on purpose: the main line is finished once they're
  out and watched.
- Decided and closed: Ant-Man and the Wasp stays out of the S.H.I.E.L.D. box; Bucky's hero file keeps HYDRA; Gamora and Nebula are in
  Thanos's forces while they serve him, never the Black Order (owner, 4 November 2026).

## The November 2026 round, all on main (newest last)

- The Network as its own file (`network.html`), loaded ahead out of sight; the launch page back to 3.65 MB.
- The Network: group colours, a tighter room, no jump on open, the camera framing what you've watched, no Back buttons, back closes
  the card (`netcard` step), Open file only once found, a file previews its first connections, a reveal for newcomers (dock dot and
  pop-in). Every page title at one height. The Paths card above the ticker. The main Karl Mordo's own connections (`BY_ID_ONLY`).
- The Log's tabs: Chapters and Characters.
- The Compound and Raft handover: 54 people, one history between their two files (`handover.json`).
- Episode by episode: 5,717 moments in 115 shows (`ep_tags.json`, `network/rel/ep_tags.json`).
- Texts the episode research flagged, checked against the wikis (`mockup-data/episodes/flag_fixes.json`): 21 Network texts rewritten
  and 6 cut through `network/rel/text_fix.json` (relbake applies it last, after the episode tags); D.W.'s Luke Cage step fixed in its
  data files; two Atlas entries that never happen in their titles removed (What If's monster fight in Peggy's world, Slingshot in
  Bogotá), their places' episode tags renumbered. 13 flagged texts checked and kept.
- **The review pass** (the owner asked whether everything had a writing and accuracy pass; it hadn't, fully). An independent review of
  all 124 texts written this round (the handover's rewrites and the earlier corrections) found 3 real errors (Yondu, Joy Meachum,
  Cherry's name). Eight agents re-derived every early episode tag blind (`mockup-data/episodes/`: `BRIEF_second_pass.md`,
  `compare.py`, `apply2.py`): 90% agreed; where the second pass was later, the later episode stands (225 tags moved, so nothing shows
  before it happens). Their sources turned up 11 more wrong texts, each checked against the wiki before fixing (Frank tortures Wolf, not
  the reverse; Agatha kisses Death; Polaris's dismissal; Koenig at Providence; Kazi dies in Hawkeye; Skully's pawn shop; May's
  "strongest recruit" is season 3; Fury's Iliad order; Mack and the Chinatown Crew; Elena's powers; Trip's Quinjets). `text_fix.json`
  now also fixes who lines, and holds `sub` (a name a title never says: Cherry is only "Cherry" in Born Again S1). Unconfirmed, left as
  they are: Marci and Matt in The Defenders, Madisynn's night out with Jen, Black Tom and Banshee as brothers (an earlier deliberate
  call), a Malick hostage date in AoS S7, a May and Yo-Yo line in AoS S7, how Lonnie Lincoln gets his powers.
- **The handover's last calls (owner: "close out the choices"):** Vision is handed over (the Compound, the Raft for WandaVision as
  S.W.O.R.D.'s weapon, the Compound again from VisionQuest). Five who are never on the other side lose their duplicate file
  (`close: 1` in handover.json): Sony's Venom, Morbius and Kraven and the Bloodpack leave the Raft, The Spectacular Spider-Man's Black Cat
  leaves the Compound. Nine whose villain side is a persona inside one show or film keep both files, the Raft file being that persona's
  own record, linked by Also on file (Fitz as the Doctor, Lash, both Jeans' Phoenix, Gambit as Death, Madelyne as the Goblin Queen,
  Mayhem, the Lizard, the Stomper pilot). The Runaways parents keep their own files beside the PRIDE group file (a group's record, like
  HYDRA's). Settled: don't reopen.
- **The owner's stopping rule (November 2026):** a review pass acts only on factual errors with evidence; wording preferences and
  "either episode works" are dropped, not reported. When a pass finds only those, the material is done: no more passes unless new
  content is added.

- **The owner's answers round (4 November 2026, on the working branch, waiting on "push").** Everything checked twice before applying.
  - Groups: all 1,503 people swept under the rulings (30 chunks), every proposal second-checked: 255 files changed, 13 rejected
    (`TEAM_AUDIT2`; records in the scratchpad's `aud/people/job` and `jv`). A finished school is left like dropping out.
  - Cover names (51): 21 files staged (Spectacular Spider-Man's Goblin, Agnes, Sylvie, the Power Broker, Rama-Tut and the rest), with
    their kind lines, groups, aliases and the "Also on file" link (`coverOn`) staged to the reveal too. The Network follows every
    file's staged names. Madelyne Pryor left out (an impostor case; question 57).
  - Files: the combined files split (25, 42), Venom as the symbiote (26), one Sabretooth file (27), Logan's world (Earth-17315: its own
    Logan and Charles files and map, 30), the changed timeline's Logan and Sentinels (35), Ralph Bohner (36, his name from WandaVision
    #9), Robin Hinton (33), Jon Jon, the cloaked stranger, four new places (39), all in `answers_fix.json`; the Network's connections
    follow (`retarget.json`). The 1994 Electro and Fury tie dropped (34). Marvel's B numbers (28) and Earth-6799 (29).
  - New questions for the owner: 52 to 59 on the report page.

## The third October 2026 round, all on main (newest last)

- Battery: the Watcher's eyes blink one blink at a time instead of one looping animation, and the dock drops its blur (idle redraws fell
  from 10 to 15 a second to under 3).
- The sling ring lands only in the Atlas again, every realm and submap, never the Incursions.
- Damage Control's replays open files only in indexes you've found (`ixFile`).
- A holder's list in the Collection carries their own file; holders go by their files' names; Bennie (Item 47); Aida; a variant goes by
  the main universe's name (Ronan the Accuser, Wenwu); Nova Prime Irani Rael in both universes.
- A holder's list is the tapped person's alone (the Spider-Verse's Spider-Man had mixed eight of them).
- The Compound in the dark: dark ID-badge rows, status as an edge stripe, team on the right, about eight people a screen (owner: "too
  white and bright and wasted space").
- The Network is its own file on main (`network.html`), loaded when opened; the launch page is back to 3.65 MB from 5.7 MB, the
  likely cause of the Android app showing its no-network page on every cold start. The 28 reviewed off-screen connections are in.

## The second October 2026 round, all on main (newest last)

- Search within the tab; the Defenders in two Parts; pills let taps through; the Atlas reaches the pole; a box's list waits for its
  first line.
- Insignia: The Avengers opens its heroes' own. Overlays pin the page; every index file names its universe.
- Names and aliases for everyone in the Raft and the Compound; ranks back in titles with ranked forms as aliases; the Incursions box
  quote.
- The S.H.I.E.L.D. Level 7 keycard; Fury's egg renamed "They were in his jacket"; Atlas sector codes.
- Damage Control: 234 incident reports in every universe (Morbius, Madame Web and Kraven included), hi-vis green, archives in order
  (Compound, Raft, Damage Control, Collection); back returns to the file you came from; every index opens with its place.
- Captain America's insignia also unlocks with The Avengers. The writing passes: 376 Collection steps and 812 Raft and Compound steps
  rewritten to read naturally with the same facts.
- Coulson's blood on Fury's cards after The Avengers; Level 7's pill waits for the files to close; the Space Stone in the Tesseract's
  case; the hints pass (every egg and stone hint in one voice, checked against the code).
- The Battle of Titan's report; the stones' cases read Destroyed; every file by the name the story mostly calls them (Real name rows);
  Captain Carter by that name.
- Tactical replays in seven battle reports; Fury's box gestures (cards down, last page up).
- The Darkhold and the Sokovia Accords on their titles, the sling ring anywhere, the Watcher's fifteen realities, the Aether cut (`b846e30`).

## The first October 2026 round, all on main

- **The lore audit** (`51a7b95`): 705 findings with sources over every file, log and both timeline orders, each re-checked. Chapters 3
  to 6 tell one story each. The One-Shot comes after Agent Carter S2. Completed once ever.
- **X-Men '97 and I Am Groot** (`ccb1a6c`): seasons in release order only.
- **Episode sheet** (`1467b4e`, `70922d7`): the episodes link follows its checkmark; no blink.
- **No XP line or level-up pill** (`ec0ec2d`); S.H.I.E.L.D. agents wear the S.H.I.E.L.D. eagle.
- **The medium findings** (`9c93021`, `9e714fe`): 337 re-verified, 265 applied, 48 owner calls. Three act missions. Periods from what
  you've watched.
- **Second sweep** (`9411afd`): 226 changes to stale descriptions, teams and names; seasons shown with the title; AoS S6 and S7 as two
  titles.
- **Nick Fury and S.H.I.E.L.D.** (`78059ce`): two character boxes, with Fury's own insignia, quotes, logs and Paths lines.
- **Team files and Area 55** (`b147d16`): 36 Compound team files removed under the team-file rule.
- **Raft factions** (`58a12e4`), **Raft team files and hero links** (`2f9a9ce`), **factions completeness sweep** (`c2a98be`): every
  organization anyone served, on villain and hero files, current lit and past Former, links both ways, 37 Raft team files folded in,
  24 organizations' own files made group files. Nick Fury's box got its own look.
- **Weapon X only where it is on screen** (`550e553`); **Captain America's box without Agent Carter** (`ed73d74`).
- **Re-check, Sort, scroll** (`310650e`): the independent re-check's corrections, the Sort switch, indexes opening at the top.
- **Last consistency fixes** (`6bfecfc`): Raimi's Otto never worked for Oscorp, Vision's hero file notes S.W.O.R.D., Heather Glenn
  leaves Fisk's administration when Fisk falls.
- **Maria Hill** (`b1f7739`): her Agents of S.H.I.E.L.D. seasons and Soren posing as her in Far From Home.
- **The Sacred Timeline tab** (`5c1ca98`), and **tab names and the Incursions hold** (`e74de76`): the indexes' first tab renamed; Extra
  tabs named like the timeline's; holding the Incursions line marks them all.
- **The appearance sweep** (`ed4dec1`), with First and Last seen by release order and the Void's Juggernaut merged:
  - All 2,132 files were checked against their subjects' on-screen appearances, in 32 chunks, each re-checked by a separate agent.
  - Steps went from 4,782 to 5,421 across 490 files, and 297 steps were given their seasons.
  - 66 flagged existing steps were settled against sources.
  - Captain America and the Red Skull (1990s cartoons) were merged into one file each.
  - The step caps came out of the format briefs.

## Earlier rounds, all on main

- Chapter names revealed by watching. The Sacred Timeline and Multiverse pills come from the timeline only.
- Specimens in the Collection. Fact-check passes over the Collection, specimens and organizations, and a chain-of-custody pass.
- Agent Carter in story order. AoS and Agent Carter folded into the Chapters, with save migration.
- Weighted clearance levels. Stones on the amber line. The ABC shows' files on the MCU tab, with the five duplicates merged.

## The egg redraft (14 November 2026)
- The effect kit: 17 effects that only use the file itself (Rewrite, Recolor, Knock, Fade, Stamp, Counter, Glitch, Slash, Assemble, Freeze, Glow, Stitch, Shrink/Grow, Split, Rewind, Dust, Warp), mocked on Drax's Compound file as an MP4. The kit's code is in the session scratchpad (fx/fxkit.js), not in index.html yet.
- The redrafted list (86 eggs, each tagged with its effect) is on the egg plan page, https://claude.ai/artifact/MBUUmqKYw5ZLeSrAsqhNHj (db collection `picks`, ids r0 to r85). Waiting on the owner's keep/cut/change; nothing is built until they've picked.
