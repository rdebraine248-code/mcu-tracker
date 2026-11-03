# Second check of proposed group changes (audit part 1: people, second pass)

Another checker proposed the changes in your file to a person's group stages in a Marvel watch-tracker. Check each one
INDEPENDENTLY against sources: look it up yourself, do not trust their evidence. One wiki page per person is usually enough; use
episode summaries (Wikipedia season pages) for timing.

## The record
`groups` = `[group, title]` stages in story order: from that title on, the person is in that group; the LAST stage is where they
stand. ["Independent", title] = they leave for no group. "(from the start)" = a single group they hold from their first title.
"In episode N," in a step = episode N of that step's title (a season title like "Daredevil S2" counts within the season).

## The owner's rules
- A stage is membership the person HAS during or after a title they're on file for. A group they left before their first title is
  backstory, not a stage (kind B). A membership shown only in flashback, that ended before their first title, is backstory too.
- A move (kind M): they quit, retire, are fired or voted out, a firm or team closes or disbands, they defect, rejoin, or join a group.
- NOT moves: being captured, held, imprisoned, hypnotized or mind-controlled; acting alone; dying. An unsure case keeps what's there.
- Stage titles must be titles the person's record already uses (or the record's form of a season title). Don't invent group names
  the record or the dataset doesn't use unless the source names the group plainly.
- Workplaces, schools and bands the record doesn't track as groups: reject, the owner is deciding those separately.

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
