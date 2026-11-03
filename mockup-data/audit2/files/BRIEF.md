# Audit part 3: the files (the Compound, the Raft, the Collection)

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

## The questions (answer every one for every record)
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
