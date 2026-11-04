# Audit part 4: the Atlas

You check a batch of places from a Marvel watch-tracker app's Atlas (maps that light up as titles are watched). FACTS only, against
sources. You edit nothing: you write one JSON verdict file.

## Input
Your chunk (path in your task) is a JSON list of places: `key` (id|map|sub), `map` (which map it's on), `n` name, `r` region line,
`at` coordinates ([lat, lon] on Earth and New York maps; [x, y] 0..1000 on the cosmos, Beyond and orbit maps, where positions are
artistic), `city` (a city with its own street map, whose spots are the entries' `sub`), and `e` entries `[title, sub, text]`.
"Title#N" is episode N; when the title names a season ("... S2#3") N counts within that season, otherwise across the whole show
("Agents of S.H.I.E.L.D.#42"). `sub` is a year or a spot inside the place. `leads` (some places): file entries whose places line
points here, for a title this place has no entry for.

## The maps
- The main MCU Earth is Earth-199999. Agents of S.H.I.E.L.D. and Agent Carter are the same universe as the films.
- Fox's X-Men: Earth-41578 holds the original films (X-Men to The Last Stand, the Wolverine films, Days of Future Past's 2023
  future). Earth-10005 holds the changed timeline (Days of Future Past's 1973, Apocalypse, Dark Phoenix) and Deadpool's world (the
  Deadpool films). Logan is Earth-17315. A place in both timelines is on both maps with each one's own entries.
- Other universes have their own maps (Earth-92131 the X-Men cartoons, Earth-96283 the Raimi films, Earth-120703 the Amazing films,
  Earth-1610B Miles's world, Earth-688B Sony's Spider-Man films, and so on). Off-world places for another universe's Earth live in
  that Earth's orbit map.

## The owner's rules
- Look every location up; "Location unknown" only when no source gives one (the pin then sits at a stand-in spot and its note says
  so). Ships and bases are places where their location is known, pinned there. A vehicle with no stated location isn't a place.
- A place keeps its real name even when the story moves around it.
- Only what's on screen counts. Fan wikis list comics and tie-in material: check the film or episode supports it.
- No visions, dreams or illusions as events. Real flashbacks are fine (their `sub` is the year).
- Entry text: no "season", "episode", "finale", "credits", "the film", "the show" in a sentence; no em dashes; no actor names.

## The questions
- **P1 Location:** is the place where the region line and coordinates say (Earth and New York maps)? Coordinates off by more than
  the place's size, or a wrong region or country, fail. Skip coordinate checks on artistic maps.
- **P2 Entry:** does each entry's event happen at THIS place, in THAT title (and episode)?
- **P3 Map:** is the place on the right map and universe for each of its entries?
- **P4 Spoilers:** does an entry give away something from a later title than its own?
- **P5 Name:** is the place's name right, as the screen or its sources name it?
- **P6 Missing:** for each lead: if the file entry's event really happens here in that title, propose a new entry ([title, with
  "#N" when the lead names an episode, sub, text]); if it doesn't, say where it happens with `"wrong_place": true` (the file's places
  line is then wrong). Beyond leads, a major, sourced event at this place in a title it has no entry for may be proposed too.

## Evidence rule (the owner's stopping rule)
Change only on a failed question, with a source URL and what happens where. No rewording for style, no "reads better". If unsure,
it passes.

## Sources (look things up; do not rely on memory)
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`
- Fandom API only (their /wiki/ pages return 403): `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`
  (also marvel, xmenmovies, spiderman, marvelanimated, sonys-spider-man-universe .fandom.com).
- curl with header `User-Agent: mcu-tracker-research/1.0`. NEVER put an email, name or any personal detail in a request.
- Space requests a second or two apart; don't fetch a page twice. Scratch files only in your own work folder.

## Output
ONE JSON file at the output path in your task:
```
{"checked": [every place key in your chunk],
 "changes": [{"key": "...", "i": <entry index, or null for the place itself, or "lead:<n>" for a lead>, "q": "P1..P6",
              "now": ..., "proposed": {only the fields that change: "n", "r", "at", or an entry [title, sub, text]; for a lead, the new
              entry, or {"wrong_place": true, "happens_at": "..."}}, "evidence": "what happens, where", "source": "URL",
              "confidence": "high|medium"}],
 "owner_calls": [{"key": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
New text: plain, present tense, one or two sentences, like the entries around it. Every place must be in `checked`. Reply to your
caller with ONE line: checked, changes, owner calls. Nothing else.
