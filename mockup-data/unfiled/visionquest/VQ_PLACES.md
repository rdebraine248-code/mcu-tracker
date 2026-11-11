# VisionQuest has aired in full: its places in the Atlas

A Marvel watch-tracker app has an Atlas: real places, each with entries [title key, sub-place, one sentence] for what happens there.
A show's entries are keyed to their episode ("VisionQuest#6"). VisionQuest (8 episodes) has entries only for London (episode 2),
Edinburgh (1 and 2) and Madripoor (6): `inventory.json` key `places` (same folder) has them, with the place records' shape.

Using `src/` (transcripts e1 to e7, `wikipedia_episodes.txt`, `mcuwiki_e*.txt`, the episode 8 recaps), list every real-world place
VisionQuest's story visits on screen, episode by episode (a city, a country, a named site in it; not the Mindspace or other virtual
spaces), and write one entry per place and episode where something happens there. Keep the existing entries when they are right; fix
them if not. For each place say whether the app has it already (ids in inventory `places`, or name a likely existing id such as
"london", "edinburgh", "madripoor"; for a new place give "n", region "r" and coordinates "at": [lat, lon]).
Rules: one plain sentence per entry, present tense, spoiler-safe, no actor names, no em or en dashes, no instruction words, names only
as the screen gives them.

ONE JSON file at your output path: {"places": [{"id": "...", "new": false or {"n": "...", "r": "...", "at": [lat, lon]},
"e": [["VisionQuest#N", "sub-place or empty", "sentence"], ...]}], "notes": "..."}. Reply with one short paragraph.
