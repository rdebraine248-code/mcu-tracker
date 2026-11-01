# Compound / Raft handover: brief

The app (an MCU watch tracker, "Marvel Datapad") keeps two indexes of files:
- **The Compound**: personnel files for heroes and allies. Statuses allowed: Active, Off-world, Retired, Fugitive, Imprisoned, Missing, Deceased.
- **The Raft**: threat files for villains and threats. Statuses allowed: Active, In custody, Captive, At large, Missing, Allied, Deceased.

77 people have a file in both. Today both files tell their whole story, so almost every title is told twice. The owner's rule:
"when one closes it's transferred over to the other one. So Wanda has a file in the Raft, but by the time she's allied, that file is
closed and transferred to the Compound, so it's no longer updated in the Raft ... so that we don't repeat entries every time."

## Your job, for each pair in your input file
Each pair has `compound` and `raft` step lists. A step is `[text, title, status]`, in story order. Some texts start "In season N,"
(a season of a multi-season title): keep that prefix exactly when you copy or rewrite such a step.

1. **Decide which side the person is on in each title they appear in**, in story order: "C" (hero, ally, neutral, working with the
   heroes) or "R" (villain, threat, hunted by the heroes, working against them). Base this on what happens on screen, checked against
   the MCU Wiki (marvelcinematicuniverse.fandom.com) or the X-Men / Marvel Database wikis for other universes. Use the MediaWiki API
   (`/api.php?action=parse&page=...&prop=wikitext&format=json`) with the User-Agent header `mcu-tracker-research/1.0` and nothing
   else that identifies anyone. Never put any email or personal detail in a request.
2. **Group the titles into stretches**: maximal runs on one side. `ho` is the list of stretches in story order:
   `[side, title the stretch starts in]`, plus a third element `1` when the person **switches sides partway through that title**
   (they start it on the old side and end it on the new one). The first stretch starts at their first title.
3. **Each title is told once**, by the file whose stretch it falls in. The other file's steps for it are dropped automatically.
   - A **switch title** (marked `1`) is told by both files, each its own half: the old side's file tells it up to the switch, the new
     side's file from the switch on. Rewrite the two steps (`rewrite`) so they don't repeat each other.
   - If the owning file has **no step** for a title but the other file does, write one for the owning file (`add`), from the other
     file's text, with a status from the owning side's list. Otherwise nothing is lost when the other file's step is dropped.
   - If a title has more than one step in a file, identify them by `i`, the index among that file's steps for that title (0 = first).
4. **Statuses**: every rewritten or added step needs a status from its side's list. A Raft step that is "Allied" usually means that
   title belongs in a C stretch; check.
5. **Writing**: match the existing steps. One or two sentences, present tense, plain words, the person's name or "he"/"she". No em
   dashes or en dashes used as dashes. No fourth-wall words ("film", "episode", "season", "scene", "the movie") apart from a kept
   "In season N," prefix. Never invent: every fact must be on screen and checkable.

## Output: a JSON file at the path you're given
```json
[
 { "ally": "<ally id>", "threat": "<threat id>",
   "ho": [["R", "Captain America: The Winter Soldier"], ["C", "Avengers: Age of Ultron", 1], ["R", "Doctor Strange in the Multiverse of Madness"]],
   "rewrite": { "R": [ { "title": "Avengers: Age of Ultron", "i": 0, "text": "...", "status": "At large" } ], "C": [] },
   "add": { "C": [], "R": [] },
   "why": "one or two lines: the switch points and the source you checked" }
]
```
Every pair in your input must be in your output once. Someone who never really switches sides still gets `ho` with their stretches as
they are: one stretch means one file tells everything and the other file is closed from the start; say so in `why`.
Worked examples (already agreed with the owner): Wanda: the Raft from The Winter Soldier (Strucker's test subject), the Compound from
Age of Ultron (a switch title: the Raft tells her joining Ultron, the Compound her turning on him), the Raft again from Doctor Strange
in the Multiverse of Madness. Bucky: the Compound (The First Avenger), the Raft from The Winter Soldier, the Compound again from Ant-Man.
Titles must be copied exactly from the input. When done, report: how many pairs, how many switch titles, anything you were unsure of.
