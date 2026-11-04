# Audit part 6: Damage Control and Comms

You check one batch from a Marvel watch-tracker app: Damage Control's incident reports, their tactical replays, the news headlines,
or the Comms messages. FACTS only, against sources. You edit nothing: you write one JSON verdict file.

## Your batch (its `kind` says which)
- **reports**: each has `id`, `u` (universe tab: mcu = the Sacred Timeline, Earth-199999; by Beyond; sv Spider-Verse; fox FoX-Men;
  pr Pruned), `n` name, `yr` year (negative = BC), `where`, `t` (the title it happens in), `cls` (incident class), `cause`, `out`
  (outcome), `loss` and `fall` (lists of `[text, title]`: each shows once that title is watched), `who` (people involved), `tm`
  (teams), `obj` (objects). Case numbers (`no`) are computed; don't check them.
- **replays**: a battle report's tactical replay: `sides` and the beats (look for each beat's text: what happens, in order).
- **headlines**: per title, news headlines shown once that title is watched.
- **messages**: in-universe messages (`t` the title that unlocks it, `f` from, `to`, `cl` classification, `re` subject, `b` body);
  `t` starting "__" is a system message (skip its facts unless plainly wrong).

## The questions
- **D1 Facts:** is every fact true for its title: who, what, where, when, how it ends? (cause, out, where, yr, a headline, a message
  body, a replay beat).
- **D2 Titles:** is each item tied to the right title? A loss or fallout line must sit on the title where it happens or is revealed.
- **D3 Spoilers:** does anything give away a later title than its own (a cause or outcome naming a later reveal, a headline or message
  knowing what happens later)?
- **D4 Lists:** are `who`, `tm` and `obj` right (each was involved, nobody major missing, names as their files go)?
- **D5 Names and places:** names as said on screen (a group's name is the one said on screen; the owner's one exception is the Black
  Order); the main MCU Earth is Earth-199999.
Headlines and messages are in-universe fiction written for the app: a made-up sender line or turn of phrase is fine; a false fact
about the story is not.

## The owner's rules
- Only what's on screen counts; fan wikis list comics and tie-ins, so check the title supports it. Agents of S.H.I.E.L.D. and Agent
  Carter are the same universe as the films.
- Status means real status. A death revealed later belongs to the later title.
- No "season", "episode", "finale", "credits", "the film" or "the show" in a sentence; no em dashes; no actor names.
- Avengers: Doomsday and Avengers: Secret Wars are unreleased placeholders kept on purpose: don't raise them.

## Evidence rule (the owner's stopping rule)
Change only a factual error you can show, with a source URL and what really happens. No rewording for style, no "reads better". If
unsure, it passes. A fix changes as little as it can.

## Sources (look things up; do not rely on memory)
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`
- Fandom API only (their /wiki/ pages return 403): `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`
  (also marvel, xmenmovies, spiderman, marvelanimated, sonys-spider-man-universe .fandom.com).
- curl with header `User-Agent: mcu-tracker-research/1.0`. NEVER put an email, name or any personal detail in a request.
- Space requests a second or two apart; don't fetch a page twice. Scratch files only in your own work folder.

## Output
ONE JSON file at your output path:
```
{"checked": [every report id, replay report id, headline title, or message index "m<i>" in your batch],
 "changes": [{"key": "<id or title or m<i>>", "field": "cause|out|where|yr|loss:<n>|fall:<n>|who|tm|obj|n|t|headline:<n>|b|re|f|to|beat:<n>",
              "q": "D1..D5", "now": ..., "proposed": ..., "evidence": "what really happens, where", "source": "URL",
              "confidence": "high|medium"}],
 "owner_calls": [{"key": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
Reply to your caller with ONE line: checked, changes, owner calls. Nothing else.
