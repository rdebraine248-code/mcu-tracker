# Audit part 4: the Atlas

You check a batch of places from a Marvel watch-tracker app's Atlas (maps that light up as titles are watched). FACTS only, against
sources; you write a JSON verdict file.

## Input
Your chunk (path in your task) is a JSON list of places: `key` (id|map|sub), `map` (which map it's on: the main MCU's Earth, a city
map, the cosmos, beyond, the multiverse, or another universe's own Earth or orbit map), `n` name, `r` region line, `at` coordinates
([lat, lon] on Earth and city maps; [x, y] 0..1000 on cosmos/beyond/multiverse/orbit maps, positions there are artistic), and `e`
entries `[title, sub, text]` ("#N" after a show = its episode N across seasons; sub is a year or a spot inside the place).

## The owner's rules
- Look locations up; "Location unknown" only when no source gives one. Ships and bases are pinned where they're known to be.
- Off-world places for another universe's Earth live in that Earth's orbit map. Fox's X-Men: Earth-10005 (before Days of Future
  Past, its 2023 future, the Deadpool films) and Earth-TRN414 (Days of Future Past's 1973, Apocalypse, Dark Phoenix).

## The questions
- **P1 Location:** is the place where the region line and coordinates say (Earth/city maps)? Coordinates off by more than the
  place's size, or a wrong region/country, fail. Skip coordinate checks on artistic maps.
- **P2 Entry:** does each entry's event happen at THIS place, in THAT title (and episode)?
- **P3 Map:** is the place on the right map/universe for each of its entries?
- **P4 Spoilers:** does an entry give away something from a later title than its own?
- **P5 Name:** is the place's name right (as the sources name it)?

## Evidence rule
Change only on a failed question with a source URL and what happens where. No rewording for style. If unsure, it passes.

## Sources
Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`), Fandom API
(`https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`, also marvel.fandom.com,
xmenmovies.fandom.com, spiderman.fandom.com, marvelanimated.fandom.com). curl with `User-Agent: mcu-tracker-research/1.0`. Never send
personal details. Don't fetch a page twice.

## Output
ONE JSON file at the output path in your task:
```
{"checked": [every place key in your chunk],
 "changes": [{"key": "...", "i": <entry index or null for the place itself>, "q": "P1..P5", "now": ..., "proposed": {...only the
              fields that change: n, r, at, or the entry [title, sub, text]...}, "evidence": "...", "source": "URL",
              "confidence": "high|medium"}],
 "owner_calls": [...]}
```
New text: plain, present tense, one sentence of 10 to 25 words, no em dashes, no actor names. Reply with ONE line: checked, changes,
owner calls.
