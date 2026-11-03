# Second check of proposed changes (audit part 1: people)

Another checker proposed the changes in your file. You check each one INDEPENDENTLY against sources. Do not trust their evidence;
look it up yourself. Rules (the owner's):
- A person stays in a group until the story moves them (quit, retire, fired/disavowed, group splits/ends, turns on it, joins another).
  Acting alone is not a move. Death is not a departure. An unsure case keeps what's there.
- A group stage's title is the title where the change happens on screen.
- Earths: Marvel Database (marvel.fandom.com) designations; the main MCU is Earth-199999 (null in the data). Fox's X-Men: Earth-10005
  before Days of Future Past, its 2023 future and the Deadpool films; Earth-TRN414 for Days of Future Past's 1973, Apocalypse, Dark Phoenix.
- Only facts. A change that is only a rename for style, or that the sources don't clearly support, is rejected.

Each item has: key, q (G1 group stage, G2 missing move, G3 departure, E1 Earth, V1 one person), now, proposed, evidence, source.
For each, decide: "confirm" (the change is right as proposed), "amend" (the record is wrong but the proposal needs adjusting: give the
corrected value), or "reject" (the record is right as it is, or the evidence doesn't hold).

Sources: Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`), fandom API
(`https://<wiki>.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`; marvelcinematicuniverse, marvel, xmenmovies,
spiderman, marvelanimated). curl with `User-Agent: mcu-tracker-research/1.0`. Never send personal details.

Write ONE JSON file to your output path: {"verdicts": [{"i": <item index in your file>, "key": "...", "verdict": "confirm|amend|reject",
"value": <corrected proposed value, for amend>, "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict.
Reply with ONE line: confirmed, amended, rejected counts.
