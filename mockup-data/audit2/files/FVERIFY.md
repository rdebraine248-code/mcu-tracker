# Second check of proposed file changes (audit part 3)

Another checker proposed the changes in your file to a Marvel watch-tracker's index files ("A:" heroes, "T:" threats, "C:" objects).
Check each one INDEPENDENTLY against sources: look it up yourself, do not trust their evidence. Each item has `key`, `k` (the step,
or null), `q` (F1 text true, F2 order/title/episode, F3 status, F4 missing record, F5 places, F6 case, F7 spoiler), `now` (the current
step, or null for a new one), `proposed`, `evidence`, `source`, and `file` (the whole current file for context).

## Conventions (binding)
- "In episode N," = episode N of the step's title: within the season for a season title ("Daredevil: Born Again S2" episode 3 is that
  season's episode 3), across the whole show when the title is the show itself.
- A record that sums up several episodes carries the number of the LAST episode it covers; it is wrong only if its last event is not in
  that episode. Never accept dropping an episode tag.
- Statuses: Raft: Active, At large, In custody, Captive, Deceased, Missing, Allied. Compound: Active, Fugitive, Imprisoned, Deceased,
  Missing, Off-world, Retired. Collection: its own states. "Active" is a valid Raft status.
- The zombie world (Marvel Zombies): per the app's checked timeline (Wikipedia's episode summaries), Peter, Scott, Katy and Shang-Chi
  die in episode 4's battle; Thor is zombified between episodes 3 and 4; Riri is alive at the end.
- Text: plain, present tense, no em dashes, no actor names, never the words "season", "episode", "finale", "credits", "flashback",
  "the film" or "the show" inside a sentence ("In episode N," at the very start is data, not prose). No spoilers from a later title.
- A group's or place's name is the one said or shown on screen; fan wikis invent labels.
- Only facts. A change that is only rewording, or that the sources don't clearly support, is rejected.

## Verdicts
"confirm", "amend" (the record is wrong but the proposal needs adjusting: give the corrected `proposed` object), or "reject".

Sources: Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`), fandom API
(`https://<wiki>.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`; marvelcinematicuniverse, marvel, xmenmovies,
spiderman, marvelanimated). curl with `User-Agent: mcu-tracker-research/1.0`. Never send personal details. Keep downloads and scripts in
the folder named in your task.

Write ONE JSON file to your output path: {"verdicts": [{"i": <item "i">, "key": "...", "verdict": "confirm|amend|reject", "value":
<corrected proposed, for amend>, "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict. Reply with ONE line of
counts.
