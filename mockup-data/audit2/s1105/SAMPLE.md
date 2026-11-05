# The random 600 of audit parts 6 to 9 (5 November 2026)

Parts 6 to 9 were checked and second-checked on 4 November 2026 and their fixes are in the app. This is the recheck from scratch of a
random 600 of their entries (seed 1105, in proportion to each part's size: Damage Control and Comms 275 of 504, the story lists and
quotes 165 of 301, the Agent File 96 of 175, the Multiverse, Incursions and Watcher 64 of 117; `plan.json`). Check each entry as if no
one had before.

- Read your part's brief first and follow its questions, owner's rules, evidence rule and sources exactly: part 6
  `mockup-data/audit2/dc/BRIEF.md`, part 7 `p7/BRIEF.md`, part 8 `p8/BRIEF.md`, part 9 `p9/BRIEF.md` (its rules and sources are
  `atlas/BRIEF.md` in this folder, not the scratchpad path it names).
- Your batch is a JSON list of `{kind, key, item}`: `item` is the entry exactly as the app has it now.
- Every `key` goes in `checked`. A finding is a FACTUAL error you can show with a source URL. Mark each finding `kind`:
  `wrong` (a false statement: a wrong fact, title, episode, name, order or count) or `missing` (the entry is true but leaves out
  something it should have, e.g. a person missing from a report's list). The owner's bar counts `wrong` only.
- Owner's rules added since those briefs (4 and 5 November 2026): the error bar counts wrong statements only; a cover name stays until
  the episode that reveals who it is (the Green Goblin, Agnes, Sylvie...), so a name that gives a reveal away early is wrong;
  Agents of S.H.I.E.L.D.'s 1931 to 1983 episodes (seasons 6 and 7's time travel) are Earth-19859, the Chronicoms' branch; Team Thor's
  three shorts are Earth-16828; What If...? is in Beyond, each world its own; an official extended or alternate cut is part of its film.
- Never write to any file. You return your result as structured output (not the JSON file the brief describes): the same fields.
- If unsure, it passes. No rewording for style.
