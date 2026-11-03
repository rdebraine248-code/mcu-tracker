# Audit part 1: people (groups, Earths, one person per record)

You check a batch of people from a Marvel watch-tracker app (the MCU and the other Marvel screen universes: Fox's X-Men, Sony's
Spider-Man films, Raimi/Webb Spider-Man, the animated series, What If...?, the Netflix/ABC shows, etc.). Each record is one person as
the app knows them. You are checking FACTS only, against sources. You are not editing anything: you write a JSON verdict file.

## Input
Your chunk file (path given in your task) is a JSON list. Each record:
- `key`: "A:file-id" (a hero file) or "T:file-id" (a villain file). `twin`: the same person's other file, if they have both.
- `name`, `names` (staged names), `universe` (mcu = the main MCU, Earth-199999; sv = Spider-Verse and Sony/Spider-Man films and shows;
  fox = Fox X-Men films and the animated X-Men; by = What If...? and other branches; pr = pruned timelines: Inhumans, Runaways, Cloak &
  Dagger, the Netflix shows' world and the ABC shows where they are filed so), `earth` (null means the main MCU, Earth-199999).
- `groups`: the person's group stages, `[group, title]`, in story order: from that title on, they are in that group. The LAST stage is
  where they stand. "(from the start)" means a single group with no title.
- `left`: titles where the person leaves their group (a real departure) and then belongs to no group.
- `steps`: `[title, what they do there, status]`: every title they're on file for. "In episode N," means episode N of the step's title (within the
  season for a season title, across the whole show for the show title); "In season N," means that season.

## The owner's rules (follow them exactly)
- A person stays in a group until the story moves them: they quit, retire, are fired or disavowed, the group splits or ends, they turn
  on it, or they join another group. A title where they act alone is NOT a move. Death is NOT a departure (the zombie world is already
  handled episode by episode; leave it).
- Groups change by title: a stage's title must be the title where the change happens on screen (for shows, the season/episode).
- An unsure case keeps what's there. Only propose a change you can back with a source.
- Fox's X-Men: films before Days of Future Past are Earth-10005; Days of Future Past's 1973, Apocalypse and Dark Phoenix are
  Earth-TRN414 (younger selves have their own records); Deadpool films are Earth-10005. Use Marvel Database (marvel.fandom.com)
  designations for every other universe.

## The questions (answer every one for every record)
- **G1** Is every group stage right: the person really is in that group, from that title?
- **G2** Is a move missing: in a title they're on file for, does the story put them into or take them out of a group, with no stage
  (or `left`) recording it? Only real moves under the rules above.
- **G3** Is every `left` title a real departure under the rules?
- **E1** Is the Earth right for the universe they're in (null = Earth-199999 for the main MCU)?
- **V1** Is the record one person, not two characters merged? Is it the same person as another record in your batch (a duplicate)?

## Evidence rule
A record changes ONLY if a question fails and you can name what happens, in which title (and episode for a show), with a source URL.
No rewording, no "would read better", no group renames for style. If a group's name is just a different but correct name for the
same group, it passes.

## Sources (look things up; do not rely on memory)
- Wikipedia raw pages: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`
- Fandom wikis via their API, e.g. `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`
  (also marvel.fandom.com, xmenmovies.fandom.com, spiderman.fandom.com, marvelanimated.fandom.com).
- Use curl with the header `User-Agent: mcu-tracker-research/1.0`. Never put any personal details in a request.
- Be efficient: one character page usually answers G1 to G3 for a person. A minor person with one group and one title needs only a
  quick check. Don't fetch the same page twice.

## Output
Write ONE JSON file to the output path given in your task:
```
{"checked": ["A:id", ...every key in your chunk, twin keys too...],
 "changes": [{"key": "A:id", "q": "G1|G2|G3|E1|V1", "now": <what the record says>, "proposed": <exactly what it should say: a full
              groups list, a left title to add/remove, an earth>, "evidence": "what happens, in which title/episode", "source": "URL",
              "confidence": "high|medium"}],
 "owner_calls": [{"key": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
- `owner_calls` is for real judgment calls the rules don't settle (sources disagree, it's a matter of definition). Keep it rare.
- Every key in your chunk must be in `checked`. A key with no change passes.
- Reply to your caller with ONE line: how many checked, how many changes, how many owner calls. Nothing else.

## The owner's group rules (from HANDOFF.md, binding; they override anything else in your brief)
- Factions and teams record everyone who served a group, WILLINGLY OR NOT: brainwashed, forced and undercover service count (the Winter
  Soldier and the Widows in their groups, Simmons inside HYDRA, Natasha as Natalie Rushman). ANY organization counts: agencies, armies,
  companies, crews (a person's employer is a group: the Daily Bugle, Rand Enterprises, a law firm, a TV station, a school or university
  they attend or work at, a band). A captive, a victim, a one-job hire or an ally doesn't count.
- A person stays in a group until the story moves them: they quit, retire, are fired or disavowed, the group splits or ends, they turn on
  it or join another. Acting alone is not a move. Death is not a departure. An unsure case keeps the group.
- A group's name is the one SAID (or shown) ON SCREEN. Fan wikis list affiliations from comics and tie-ins, and invent labels
  ("Cassandra Nova's Henchmen", "the Black Order"): check the film or episode supports the name. Gamora and Nebula count as the
  Children of Thanos. If the screen never names a group, use the dataset's existing name for it if one exists, else describe it the way
  the screen does (e.g. "Ajax's operation" is not a name; if nothing is said, report it as an owner call instead of inventing one).
- Don't infer a group from a place or a person (Stryker's X2 operation is not "Weapon X"). Confirm the screen shows this person serving
  that named group in that title.
- Key a stage to the season's own title (e.g. "Agents of S.H.I.E.L.D. S3"), never a whole multi-season show, where the record uses seasons.

## Held by the owner (don't propose these; they are open questions already)
- Being a student at a school or university (employment there counts).
- These group names, which the screen never says: Lighthorsemen, Cassandra Nova's Henchmen, Monster Hunting Cabal, Kravinoff Criminal
  Empire, The Colon Crime Family, Spider-Catchers, The Workshop.
