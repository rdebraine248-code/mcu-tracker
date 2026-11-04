# Last Files pass: wrong details and wrong places (every record in your chunk)

A random recheck of 600 records found 13 wrong (the owner's bar is 0 to 1%). The faults were of a few kinds. This pass looks for
THOSE kinds on EVERY record in your chunk, so the files end accurate. Examples of what the recheck found:
- **A detail in the text is wrong** (F1): an event put in the wrong place ("the Skrulls hide on Earth": they hide in Mar-Vell's lab
  orbiting Earth; "hunt Carol on Earth": Starforce is on the lab, never on Earth's surface); the wrong people ("men posing as patients":
  they really are patients); a detail the screen doesn't show (Oscar and Vido "still live in the building as she hunts Sallinger":
  his only S3 scene is a different one); a name the screen never uses ("his Brotherhood" in X-Men: First Class; "the Water of Sights"
  for the Water of Sight); a record that leaves out the person's own death in that title (Edgar Vance is killed by Drake).
- **A place under the record is wrong or missing** (F5): Ultron's sacrifice happens in the Fifth Dimension, not his world; Raava is at
  the hospital in England in episode 5, not Washington; Karen's record names the Washington Monument but showed only Coney Island.
- **A case under the record doesn't match it** (F6): Karen's record ends before the Coney Island crash, yet showed that case.
- **The status is wrong for where the title leaves them** (F3), only when plain (a death, a capture, an escape).

Answer F1, F3, F5 and F6 for EVERY record. Skip F2, F4 and F7 (they passed). Nothing else: no rewording for style.


You check a batch of index files from a Marvel watch-tracker app. "A:" files are heroes (the Compound), "T:" files are threats (the
Raft), "C:" files are objects and cases (the Collection). You check FACTS only, against sources, and write a JSON verdict file.

## Input
Your chunk (path in your task) is a JSON list of files: `key`, `name`, `universe` (mcu = main MCU; sv = Spider-Man films/shows;
fox = X-Men films and animated X-Men; by = What If...? and branches; pr = pruned timelines/other shows), `kind` (what they are), `team`,
`handover` (a hero file that continues as a Raft file), `lead` (a hint from a machine check, if any), and `steps` (the record):
- `k` index, `title` ("In episode N," in the text = episode N of the step's title: of that season when the title is a season title like "Daredevil: Born Again S2", of the whole show when the title is the show; "In season N," = that season; A record that sums up several episodes carries the number of the LAST episode it covers (that is how the files work): it fails F2 only if its last event is not in that episode. Never propose dropping an episode tag.), `text`, `status`
  (Raft: Active, At large, In custody, Captive, Deceased, Missing, Allied; Compound: Active, Fugitive, Imprisoned, Deceased, Missing,
  Off-world, Retired; Collection: its own states), `at` (the places shown under the entry), `cases` (Damage Control reports shown
  under it: number, name, title).

## The questions (this pass: F1, F3, F5 and F6 only)
- **F1 True:** does the text say what this person/object actually does or undergoes in that title (right event, right title)?
- **F2 Order:** are the records in story order, and is each on the right title (and episode/season)?
- **F3 Status:** is the status right for where that title leaves them? (A death that is later undone is fine if the source shows the
  return; a "Deceased" followed by them acting again without a return is a fail.)
- **F4 Missing:** in the titles this file covers, is something major for them missing (they die, are captured, freed, change sides)
  with no record? Only clear, sourced events.
- **F5 At:** does each `at` place match where what the record describes happens in that title? (Places are shown for the event the
  entry describes, not the whole title.) A missing place for a clearly located event is a fail only if obvious.
- **F6 Case:** does each `case` match a Damage Control report about the event this record describes?
- **F7 Spoilers:** does a record give away something from a LATER title than its own?

## Evidence rule
A record changes ONLY if a question fails and you can name what happens, in which title (and episode), with a source URL. No
rewording for style. If unsure, it passes.

## Sources
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`; Fandom API:
  `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json` (also marvel.fandom.com,
  xmenmovies.fandom.com, spiderman.fandom.com, marvelanimated.fandom.com). curl with `User-Agent: mcu-tracker-research/1.0`. Never send
  personal details. Be efficient: one character or title page answers many records; don't fetch a page twice.

## Output
Write ONE JSON file to the output path in your task:
```
{"checked": ["A:id", ...every file key in your chunk...],
 "changes": [{"key": "A:id", "k": <step index or null for a new record>, "q": "F1..F7",
              "now": {...the record...}, "proposed": {"title": ..., "text": ..., "status": ..., "at": [...], "cases": [...]} (only
              fields that change; F4 = a full new record with "after": <step index it follows>), "evidence": "...", "source": "URL",
              "confidence": "high|medium"}],
 "owner_calls": [{"key": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
- New text: plain, present tense, one or two sentences, no em dashes, no actor names, never "tap/hold/swipe to".
- Every file key in your chunk must be in `checked`. Reply to your caller with ONE line: checked, changes, owner calls.

- A group's name is the one said or shown on screen; fan wikis invent labels ("the Black Order", "Cassandra Nova's Henchmen"). Don't add or keep a name the screen never uses.



## Settled (don't flag)
The episode-number conventions above (a record carries the number of the LAST episode it covers); "Active" is a valid Raft status; in the
zombie world Peter, Scott, Katy and Shang-Chi die in Marvel Zombies episode 4's battle, Thor is zombified between episodes 3 and 4, Riri
is alive at the end; a deleted scene or tie-in book is not what happens on screen; when sources disagree on a detail, it passes. A place
in `at` must be one the app has: if the right place isn't among the app's places, propose `"at": []` only when the shown place is
plainly wrong, and say the right place in `evidence`. In `checked` list every file key in your chunk.
