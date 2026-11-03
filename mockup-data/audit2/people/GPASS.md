# Audit part 1, second pass: group stages and moves

A first pass checked these records, and a random recheck found it missed too much (about 5% wrong, the owner's bar is under 1%). Almost
every miss was one of two kinds. This pass looks ONLY for those two kinds, record by record, and must look each person up.

## Input
Your chunk (path in your task) is a JSON list of person records (see fields below). `groups` = `[group, title]` stages in story order:
from that title on, the person is in that group; the LAST stage is where they stand. `left` = titles where they leave a group for none.
`steps` = `[title, what they do, status]`, every title they're on file for ("In episode N," = episode N of the step's title: that season for a season title like "X-Men '97 S2", the whole show
when the title is the show; "In season N," = that season). `twin` = the same person's other file.

## The two kinds of miss
1. **Backstory as a stage (B):** a group they belonged to only BEFORE the first title they're on file for (Laura Barton's S.H.I.E.L.D.
   service, Bakuto's K'un-Lun training, Everett Ross's Air Force years). A stage must be membership the person HAS during or after a
   title they're on file for. Fix: remove that stage, or move its title to where it's shown.
2. **Missing move (M):** within the titles and episodes they're on file for, the story moves them and no stage records it: they quit,
   retire, are fired or voted out, a firm or team closes or disbands, they defect, rejoin, or join a new group. Being
   captured, held or imprisoned is NOT a move under the owner's rules (don't propose it or raise it as a call) (Matt and Foggy close their firm in Daredevil S2 episode 9; Storm leaves the X-Men in X-Men '97 episode 3; Fitz
   and Simmons retire in the Agents of S.H.I.E.L.D. finale). Owner's rules: a title where they act alone is not a move; death is not a
   departure; an unsure case keeps what's there.

## Method (required)
For EVERY record: fetch the character's wiki page (MCU wiki for the main MCU, Marvel Database / the right fandom wiki for others) and
read its biography and affiliations against the record's `groups` and `steps`. Do not answer from memory. One page per person is
usually enough; use episode summaries (Wikipedia episode lists) for shows when the page is vague about timing.
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`
- Fandom API: `https://<wiki>.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json` (marvelcinematicuniverse, marvel,
  xmenmovies, spiderman, marvelanimated). curl with `User-Agent: mcu-tracker-research/1.0`. Never send personal details.

## Output
ONE JSON file at your output path:
```
{"checked": [every key in your chunk, twin keys too],
 "changes": [{"key": "A:id", "kind": "B|M", "now": <current groups>, "proposed": <the FULL corrected groups list, [[group, title]...];
              a departure to no group is ["Independent", title]>, "evidence": "what happens, in which title/episode", "source": "URL",
              "confidence": "high|medium"}],
 "owner_calls": [{"key": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
- Titles in `proposed` must be titles the record already uses (the show's title, or its season title like "Agents of S.H.I.E.L.D. S7"
  where the record uses those), never invented ones. "(from the start)" only when the person has a single group.
- Every key must be in `checked`. Reply with ONE line: checked, changes, owner calls.

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
