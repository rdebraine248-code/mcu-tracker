# VisionQuest has aired in full: its connections in the Network

A Marvel watch-tracker app has a Network: a bubble per person and a connection between two people who share real screen time and a
relationship. A connection is a list of stages in story order; each stage is [kind, title, text, whoA, whoB]: `kind` is what they are
to each other at that point (family, partner, friend, mentor, boss, ally, rival, enemy), `title` the title and episode it happens in
(for VisionQuest, "VisionQuest" with the episode number), `text` two or three plain sentences on what they share there with names and
turns, `whoA` how b appears on a's card (under about 70 characters), `whoB` how a appears on b's card. Relationships grow and change:
a new stage where the relationship turns (enemies become allies), not one per episode for the same thing. A stage that tells nothing
between the two goes.

VisionQuest (8 episodes) was connected only up to episode 7. Make every VisionQuest connection complete and correct for the whole show.

## Inputs (same folder)
- `ties_in.json`: `people`, everyone with VisionQuest steps (their final, checked VisionQuest steps and episodes, groups, names);
  `ties`, every existing connection between two of them, with every stage numbered `i` (all titles, not only VisionQuest).
- `src/`: transcripts e1 to e7, `wikipedia_episodes.txt`, `mcuwiki_e*.txt`, `char_*.txt`, `recap_e8_*.txt` (episode 8 has no
  transcript: check its claims against all three recaps and Wikipedia).
- Writing rules: /tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad/build/DRAFT.md, "Network ties".
  Present tense, no em or en dashes, no actor names, never the words "season", "episode", "finale", "credits", "flashback", "the film"
  or "the show" inside a sentence, spoiler-safe (a stage says only what a viewer knows by its episode; names only once the screen gives
  them: the Client is Virgil Horton only from episode 8).

## Do
1. Every existing VisionQuest stage: check it; fix kind, text, card lines or episode; drop it if it tells nothing.
2. Add the stages each existing connection is missing in VisionQuest (above all episode 8).
3. New connections: every pair of these people who share real screen time and a relationship in VisionQuest but have no connection
   yet (a shared scene with no exchange is not a connection). Simon Moorhouse and Victoria Horton have none yet.
Never change a stage from another title.

## Output
ONE JSON file at your output path:
{"edits": [{"a": id, "b": id, "edit": [{"i": N, "kind"?, "text"?, "whoA"?, "whoB"?, "episode"?, "drop"?: true}],
   "add": [{"kind", "title": "VisionQuest", "episode": N, "text", "whoA", "whoB"}]}],
 "new": [{"a": id, "b": id, "stages": [{"kind", "title": "VisionQuest", "ep": N, "text", "whoA", "whoB"}]}],
 "notes": "..."}
In "edits", a and b are exactly as the connection lists them (whoA is a's card line about b). Validate with a short script. Work
pair by pair from sources; no script writes any sentence. Reply with one short paragraph.
