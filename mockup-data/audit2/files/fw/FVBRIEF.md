# Second check: proposed fixes to a Marvel watch-tracker's index files

A first checker went through every record of the app's files looking for a wrong detail in the text (F1), a wrong status (F3), a wrong
or missing place (F5) or a case that doesn't match (F6), and proposed the fixes in your chunk. Check EACH from scratch against sources
and give a verdict:
- confirm: the fault is real and the proposed value is right;
- amend: the fault is real but the value needs a change (give the corrected `proposed` fields);
- reject: the fault isn't real, or the fix makes things worse.

## Your chunk
A list of items `{n, key, name, k, q, now, proposed, evidence, source, file_steps}`. `now` is the record as it stands (`title`, `text`
with its "In episode N," part, `status`, `at` place names, `cases`). `file_steps` is the whole file for context. Some items are
`q: "X"`: a fault a checker noticed outside its questions (an episode tag, a spoiler in a record's text, a spelling); for those,
decide whether it is real and give the fix in `proposed` if you amend or confirm.

## Rules (settled, binding)
- A record that sums up several episodes carries the number of its LAST episode; places are shown for the events the record
  describes; a missing place is a fault only when the record plainly describes an event there.
- A place must be one the app has. Use the place names already used in the files (the `at` lists you see); if the right place is
  not one of them, the record may lose a wrong place (`"at": []` or fewer), never gain a new name.
- A Life Model Decoy or other copy can give a person a record, but the person's own status stays theirs (a dead person's file stays
  Deceased when only their LMD carries on).
- A group's or thing's name is the one said or shown on screen ("Brotherhood" is said in X-Men (2000) and The Last Stand, not in
  First Class). A deleted scene or tie-in book is not on screen. When sources disagree on a detail, the record stays.
- Nothing may give away something from a later title, or a reveal before its episode.
- New text: plain, present tense, one or two sentences, no em dashes, no actor names, never "tap/hold/swipe to".

## Sources
Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`), fandom API
(`https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`, also marvel, xmenmovies,
spiderman, marvelanimated, blade), transcripts where you find them. curl with `User-Agent: mcu-tracker-research/1.0`; never personal
details. Keep downloads in your work folder.

## Output
ONE JSON file: `{"verdicts": [{"n": <n>, "verdict": "confirm|amend|reject", "proposed": {...only for amend...}, "why": "one
sentence", "source": "URL"}]}`, one per item. Reply with ONE line: confirmed, amended, rejected. Edit nothing else.
