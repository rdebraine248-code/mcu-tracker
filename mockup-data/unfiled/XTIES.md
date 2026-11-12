# Ties between new people from different batches

A Marvel watch-tracker app ("S.H.I.E.L.D. datapad") has a Network of connections between people. New files for people the app
left out were written in batches, one batch at a time, so two new people from DIFFERENT batches of the same show never got a tie
to each other. Your input lists candidate pairs: two new people who both have a step in the same episode and no tie yet. For each
pair, decide from sources whether they have a real connection on screen, and write the tie if they do.

## Input (your xNN_in.json)
- `pairs`: [{"a": id, "b": id, "a_name", "b_name", "shared": ["Title #ep", ...]}].
- `files`: each person's file (`add`: name `n`, steps `st`, group `tm`; `ep`: each step's episode).
- Sources: episode transcripts on springfieldspringfield.co.uk (view_episode_scripts.php?tv-show=SLUG&episode=s01e01), the saved
  wiki pages under /tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad/wv/cache/ (grep them), the
  batch work folders next to this file (work_NN, with transcripts some drafters saved), Wikipedia episode summaries. Send
  User-Agent "mcu-tracker-research/1.0" and nothing personal. The wikis may answer 429: use the saved pages.

## The rule for a tie
Write a tie only when the two share real screen time AND a relationship in that episode: they talk, fight, work together, one
leads or holds the other, they are family. Being in the same crowd, the same room with no exchange, or the same episode in
different plots is NOT a tie: skip the pair. Most crowd episodes give few or no ties. Never guess: if no source shows them
dealing with each other, skip.

## Tie format (the same as every other tie in the app)
{"a": a_name, "b": b_name, "stages": [{"kind", "title", "text", "whoA", "whoB", "ep"}]}
- `a` and `b`: the names exactly as given in the pair (`a_name`, `b_name`).
- `kind` is the MAIN THROUGH-LINE across everything they share: family, partner (romance or marriage that defines their story),
  friend (a personal bond), mentor, boss (one leads, employs or commands the other), ally (they work together), rival, enemy.
  Allies most of the time and enemies briefly is ally; enemies who team up once is enemy.
- One stage per episode run they share (the `title` is the step's exact title string from their files, e.g.
  "X-Men: The Animated Series" or "X-Men '97 S1"; `ep` the episode number as their files' `ep` give it).
- `text`: two or three plain sentences recapping what they share there, with names and turns. `whoA` (under about 70
  characters): how B appears on A's card; `whoB`: how A appears on B's card.
- Writing rules: present tense, no em or en dashes, no actor names, never the words "season", "episode", "finale", "credits",
  "flashback", "the film" or "the show" inside a sentence, spoiler-safe (only what a viewer knows by then; names only once said).

## Output
Write ONE JSON file at your output path: {"files": [], "ties": [...], "skipped": [{"a": a_name, "b": b_name, "why": "short"}],
"dropped": []}. Every input pair is either a tie or in `skipped`. Validate with a short Python script before you finish (every
pair accounted for, kinds allowed, no dashes, no banned words, sentences under about 135 characters). Work pair by pair from
sources; no script writes any sentence for you. Reply with one line: ties written, pairs skipped.
