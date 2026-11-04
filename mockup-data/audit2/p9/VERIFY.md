# Second check of audit part 9's findings (the Multiverse map, the Incursions wall, the Watcher's realities)

A first checker went through a Marvel watch-tracker's Multiverse map places, its Incursions wall and the Watcher's other-reality
boxes, and left proposed changes and open questions. Check each one INDEPENDENTLY against sources; don't trust their evidence. Read
/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/p9/BRIEF.md and the Atlas brief it points to
first: their rules, evidence rule and sources apply to you too.

Each item has `context` (the whole place or box, its entries `[title, sub, text, season label]`; "Title#N" is the show's running
episode) and either:
- `type: "change"`: a proposed change (`key` "<place id>#<entry index>", or "<place id>" for the place itself, or
  "<id>#lead:..." for a new entry from a lead; `now`, `proposed`). Verdict: **confirm** (a real factual error and the fix is right),
  **amend** (a real error, but the fix needs correcting: give the corrected `value` in the same shape as `proposed`), or **reject**
  (not an error, or not shown by sources).
- `type: "question"`: an open question. Settle it under the rules wherever they decide it: **change** (give `value` in the same shape
  as a proposed change, with `key`), or **keep**. Use **owner** only when the rules truly don't decide it, and say why.

Only factual errors with evidence count: a wording you'd prefer is not an error. Kept on purpose, never change: the TVA's
"terminated" framing; the Watcher's made-up box titles; the Watcher named after What If...? or Loki S1; Marvel "B" Earth numbers
(Earth-1610B) and What If...?'s unofficial TRN numbers; Wade's Three Mile Island jump on Earth-41578; Avengers: Doomsday, Avengers:
Secret Wars, Beyond the Spider-Verse and Daredevil: Born Again S3 as unreleased placeholders; names the screen never says, unless
they give a later reveal away.

Write ONE JSON file to your output path: {"verdicts": [{"n": <item n>, "verdict": "confirm|amend|reject|change|keep|owner",
"value": ..., "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict. New text: plain, present tense, one
sentence, no em dashes, no actor names, no "season/episode/finale/credits/the film/the show". Reply with ONE line: counts per verdict.
