# VisionQuest has aired in full: write its log entries

A Marvel watch-tracker app has logs: chapter logs and character logs. Each log follows one theme across a journey, title by title.
Three logs end with an empty VisionQuest slot (`["VisionQuest", null]`) waiting for the show to air: the character logs
`cx-wanda-vision` ("Wanda & Vision") and `cx-the-champions` ("The Champions"), and the chapter log `ch-9` ("Generations"). The show has
now aired in full (8 episodes). The owner keeps VisionQuest as Chapter 9's last title.

## Inputs
- `inventory.json` (same folder), key `logs`: the three logs whole (their `story` entries for every title, the `rows` tables that
  change title by title: subjects, aliases, affiliation, status; Chapter 9's `brief`, `debrief` and `period`; the `links`).
- `src/` (same folder): transcripts e1 to e7, `wikipedia_episodes.txt`, `mcuwiki_e*.txt`, `char_*.txt`, the episode 8 recaps.

## Write
1. Each log's VisionQuest `story` entry: a real recap of VisionQuest from that log's angle, in the voice and length of the log's own
   earlier entries (read them all first; three to six sentences, names, places and turns, never "this happened, then this
   happened"). It is a step in that log's theme. Stories aren't finished: the last entry stays open. Chapter 9's entry is written from
   the chapter's angle, not copied from the character logs.
2. Each `rows` table: a VisionQuest stage wherever VisionQuest changes it (who the log covers, aliases they're now known by,
   affiliation, status), in the same format and style as the existing stages ([value, title] pairs; status lines read like the
   existing ones, e.g. "Wanda: presumed dead. White Vision: whereabouts unknown"). Chapter 9's `period` row: VisionQuest's in-story
   year, from sources (say what supports it).
3. Chapter 9's `debrief` (shown once the chapter is done): update it to where the chapter leaves everyone after VisionQuest, in the
   same style, keeping what still holds.
4. `links` (the log's people and how they're tied to it): add anyone VisionQuest makes part of the log, in the same format.
Rules: spoiler-safe (only what a viewer knows by VisionQuest), MCU-accurate, no actor names, no em or en dashes, no instruction words,
present tense like the existing entries, names only as the screen gives them.

## Output
ONE JSON file at your output path: {"cx-wanda-vision": {"story": "...", "rows": {row: [[value, "VisionQuest"], ...]}, "links_add": [...]},
"cx-the-champions": {...}, "ch-9": {"story": "...", "period": "...", "debrief": "...", "links_add": [...]}, "notes": "sources and
anything uncertain"}. Reply with one short paragraph.
