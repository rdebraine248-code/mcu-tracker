# Second check of proposed group changes (audit part 1: people, second pass)

Another checker proposed the changes in your file to a person's group stages in a Marvel watch-tracker. Check each one
INDEPENDENTLY against sources: look it up yourself, do not trust their evidence. One wiki page per person is usually enough; use
episode summaries (Wikipedia season pages) for timing.

## The record
`groups` = `[group, title]` stages in story order: from that title on, the person is in that group; the LAST stage is where they
stand. ["Independent", title] = they leave for no group. "(from the start)" = a single group they hold from their first title.
"In episode N," in a step = episode N of that step's title (a season title like "Daredevil S2" counts within the season).

## The owner's rules
- A stage is membership the person HAS, including a PAST group the screen shows or tells (a flashback, a line about who they
  used to serve): those count as stages, keyed to the person's first title (owner's rule, HANDOFF mistake 26). A group named
  only in wikis or tie-ins is not shown, so it doesn't count.
- A move (kind M): they quit, retire, are fired or voted out, a firm or team closes or disbands, they defect, rejoin, or join a group.
- NOT moves: being captured, held or imprisoned; acting alone; dying. (Brainwashed or forced SERVICE in a group does count as membership.) An unsure case keeps what's there.
- Stage titles must be titles the person's record already uses (or the record's form of a season title). Don't invent group names
  the record or the dataset doesn't use unless the source names the group plainly.

## Verdicts
"confirm" (right as proposed), "amend" (the record is wrong but the proposal needs adjusting: give the full corrected groups list),
or "reject" (the record is right as it is, the evidence doesn't hold, or it breaks a rule above).

Sources: Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`), fandom API
(`https://<wiki>.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`; marvelcinematicuniverse, marvel, xmenmovies,
spiderman, marvelanimated). curl with `User-Agent: mcu-tracker-research/1.0`. Never send personal details. Keep downloads in the
folder named in your task.

Write ONE JSON file to your output path: {"verdicts": [{"i": <item index "i" in your file>, "key": "...", "verdict":
"confirm|amend|reject", "value": <corrected full groups list, for amend>, "why": "one or two sentences", "source": "URL"}]}.
Every item gets a verdict. Reply with ONE line: confirmed, amended, rejected counts.

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
