# Audit part 5: the logs (character logs and chapter logs)

You check log entries from a Marvel watch-tracker app. Each character box and chapter has a log: one recap entry per title, in the
box's own order, plus staged rows (period, subjects, aliases, affiliation, status and so on). FACTS only, against sources. You edit
nothing: you write one JSON verdict file.

## Input
Your chunk is a JSON list of logs (a long log may come in parts): `id`, `kind` (char or chapter), `name`, `order` (the box's titles in
its own order), `rows` (each row a list of stages `[value, title]`: the value holds from that title until the next stage), and
`story`: entries `{i, t (title), x (the recap)}`.

## The questions
- **L1 Facts:** is every fact in the recap true for that title (who, what, where, when, how it ends)? Names, places, relationships,
  who does what to whom.
- **L2 Spoilers:** does a recap use anything the viewer can't know yet in this box's order (a later title's reveal, a death, a
  twist)? Foreshadowing counts. A recap may use only what the viewer knows by that title in the box's order.
- **L3 Title:** is each recap about the title it's under (not mixing in another title's events)?
- **L4 Rows:** is each row stage true from its title until the next stage, and not shown before the title that reveals it?
- **L5 House rules:** no actor names; no em dashes; titles from 2026 on only if released (check the release date).

Writing style, theme and length are NOT checked: a recap that is true and spoiler-safe passes even if you'd word it differently.

## The owner's rules
- MCU-accurate and spoiler-safe. Only what's on screen counts; fan wikis list comics and tie-ins, so check the title supports it.
- Agents of S.H.I.E.L.D. and Agent Carter are the same universe as the films. The main MCU Earth is Earth-199999.
- Status means real status, not what the characters believe. A death revealed in a later title belongs to that title.
- A group's name is the one said on screen (the owner's one exception: the Black Order, Thanos's four).
- Stories aren't finished: the last entry of a log stays open, so an open ending is not an error.

## Evidence rule (the owner's stopping rule)
Change only a factual error you can show, with a source URL and what really happens. No rewording for style, no "reads better",
no "either works". If unsure, it passes. A fix changes as little as possible of the recap.

## Sources (look things up; do not rely on memory)
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`
- Fandom API only (their /wiki/ pages return 403): `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`
  (also marvel, xmenmovies, spiderman, marvelanimated, sonys-spider-man-universe .fandom.com).
- curl with header `User-Agent: mcu-tracker-research/1.0`. NEVER put an email, name or any personal detail in a request.
- Space requests a second or two apart; don't fetch a page twice. Scratch files only in your own work folder.

## Output
ONE JSON file at the output path in your task:
```
{"checked": ["<log id>:<entry i>", ... every entry, and "<log id>:rows" for each log whose rows you were given],
 "changes": [{"key": "<log id>:<i>" or "<log id>:rows:<row name>:<stage index>", "q": "L1..L5", "now": "...",
              "proposed": "the corrected recap or row value", "evidence": "what really happens, where", "source": "URL",
              "confidence": "high|medium"}],
 "owner_calls": [{"key": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
Reply to your caller with ONE line: checked, changes, owner calls. Nothing else.
