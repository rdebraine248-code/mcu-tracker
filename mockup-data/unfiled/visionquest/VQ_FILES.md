# VisionQuest has aired in full: complete every file for the whole show

A Marvel watch-tracker app ("S.H.I.E.L.D. datapad") keeps a file for every character: the Compound (heroes, allies, family, staff,
bystanders: tag "A") and the Raft (threats: tag "T"); the Collection holds objects. VisionQuest (8 episodes, October 13 to November
10, 2026) was filed up to episode 7. It has now aired in full. Your job: make the VisionQuest part of every file in your list complete
and correct for all eight episodes, and write files for credited people who should have one and don't.

## Inputs
- `inventory.json` (same folder): every file that now has VisionQuest steps, whole (id, tg, n, k, tm, st, al ...), with `_ep_tags`
  (each VisionQuest step's episode, keyed "VisionQuest|i", i counting that file's VisionQuest steps from 0), `_team_audit` (the group
  stages the app actually uses, which win over `tm`), `_at_case` (places tied to steps, keyed by step position).
- `src/`: transcripts e1 to e7, `wikipedia_episodes.txt` (all 8 summaries), `mcuwiki_e*.txt`, `char_*.txt`, `recap_e8_*.txt` and
  `recap_e7_*.txt`, `INDEX.md`. Episode 8 has no transcript: use the recaps and Wikipedia, and say in `notes` what rests on them.
- The writing rules: read /tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad/build/DRAFT.md in full
  (file fields, steps, statuses, groups, staged names, the ban on dashes and on the words "season", "episode", "finale", "credits",
  "flashback", "the film", "the show" inside a sentence, spoiler safety). Copy how the existing VisionQuest steps in inventory.json are
  written and keyed: several steps per person, each its own part of their story, each with the episode its last event happens in.

## The owner's rules that bind here
- A new file needs a name the story says or shows on screen (credits and subtitle speaker labels don't count), lines, and a part in
  the plot. A person whose whole presence is one episode is left out unless that episode turns on them (its villain, the case or
  victim it is about) or they are family, a spouse or partner, or the boss of someone who stays on their own merits.
- A version of someone the app names elsewhere (Ultron, Billy Maximoff, Raza) is judged on lines and part only.
- Groups: the name the screen says; a logo on clothes is not a group; never infer a group from a place or a person. Someone who
  turns on their group and dies in that same scene stays in that group.
- Names are staged: a step uses a name only once the viewer has heard it (the Client until his name is given; Jo Carrington and
  Jocasta; Thomas Shepherd and Tommy). Status at the END of what the step describes.

## Your list
Work only on the people in your list (the prompt gives it). For each existing file: return its full VisionQuest step list (keep an
existing step's exact text when it is right, so the app's links to it hold; fix what's wrong; add what's missing, ep 8 above all), its
VisionQuest episodes, its VisionQuest group stages, and any name or description stage VisionQuest changes. For a credited person in
your list with no file: decide in or out by the rules, and write the file if in.

## Output
ONE JSON file at your output path:
{"existing": [{"id": "...", "tg": "A|T|C", "vq_steps": [[sentence, "VisionQuest", status], ...], "vq_eps": [N, ...],
   "keep_from_old": {"new index": "old index", ...}, "tm_vq": [[group, "VisionQuest"], ...] or null if unchanged,
   "set": {"n": ..., "k": ...} or {}, "notes": "..."}],
 "new": [{"page": "...", "tg": "A|T", "add": {full file as in DRAFT.md}, "ep": {"VisionQuest|0": N, ...}, "notes": "..."}],
 "dropped": [{"name": "...", "why": "..."}]}
`keep_from_old` maps each new VisionQuest step to the old one it keeps unchanged (by their VisionQuest-only indices), so places tied to
it can follow. Validate with a short script (no dashes, banned words, statuses allowed, sentences under about 135 characters). Work
person by person from sources; no script writes any sentence. Reply with one short paragraph: files updated, new, dropped, uncertain.
