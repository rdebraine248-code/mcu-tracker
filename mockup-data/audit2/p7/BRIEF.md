# Audit part 7: the story lists and the boxes' own text

You check one batch from a Marvel watch-tracker app: its titles as they appear in its lists (or, in the quotes batch, the boxes'
quotes). FACTS only, against sources. You edit nothing: you write one JSON verdict file.

## Input (`kind` says which)
- **titles**: each item is one title: `t` (the exact title string the app uses), `shown_as` (the name shown instead, if any), `year`
  (a year label, if any), `story_order` (its place on the Sacred Timeline in story order: `pos`, `era` label, `lane`, and the titles
  `before` and `after` it), `release_order` (its place in release order: `pos`, `era`, `before`, `after`), `episodes_per_season` (an
  episode count, or one per season), `episode_names` (in order), and `in_lists`: every chapter or character box it's in, with its
  position there and any `note`, `tag`, `grp`, `earth` or `status` shown with it.
- **quotes**: each chapter box's quote (`[line, title it's from]`) and each character box's quote (a line its character says).

## The questions
- **S1 Name:** is the title spelled and punctuated as officially released (en dashes only inside exact titles like "Runaways S1–S2")?
  A "(year)" or "SN" suffix the app adds to tell titles apart is fine.
- **S2 Year and era:** is a year or era label right (release year for a release-order label; the in-story time for a story-order
  label)?
- **S3 Release order:** is it in the right place among its neighbours by first release date?
- **S4 Story order:** is it plainly in the wrong place among its neighbours for when its events happen? Only clear errors: story order
  is a judgement for overlapping titles, so pass anything defensible.
- **S5 Episodes:** is the count per season right, and are the episode names exact and in order?
- **S6 List fields:** is each `note`, `tag`, `grp`, `earth` and `status` true (an Earth number as Marvel's own designation, a note
  that tells the viewer something true about the title)?
- **S7 Quotes:** is the line said on screen, word for word or near enough to be recognisable, in the title it's tied to, and (for a
  character box) by that character? Is it spoiler-safe for a box anyone can see?

## The owner's rules
- Titles from 2026 on are in the lists only once released, except Avengers: Doomsday, Avengers: Secret Wars and other unreleased
  placeholders the owner keeps on purpose (Beyond the Spider-Verse, Daredevil: Born Again S3): don't raise those.
- Marvel's "B" Earth numbers are used everywhere they exist (Earth-1610B). The main MCU Earth is Earth-199999.
- Agents of S.H.I.E.L.D. and Agent Carter are the same universe as the films; AoS seasons 6 and 7 are two titles. X-Men '97 and I Am
  Groot seasons are in release order only. Story-order placements are the owner's choices; flag only clear factual errors.
- No em dashes in text; no actor names.

## Evidence rule (the owner's stopping rule)
Change only a factual error you can show, with a source URL. No rewording for style. If unsure, it passes.

## Sources (look things up; do not rely on memory)
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw` (episode lists: "List of ... episodes").
- Fandom API only (their /wiki/ pages return 403): `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`
  (also marvel, xmenmovies, spiderman, marvelanimated, sonys-spider-man-universe .fandom.com).
- curl with header `User-Agent: mcu-tracker-research/1.0`. NEVER put an email, name or any personal detail in a request.
- Space requests a second or two apart; don't fetch a page twice. Scratch files only in your own work folder.

## Output
ONE JSON file at your output path:
```
{"checked": [every title `t` (or quote box) in your batch],
 "changes": [{"key": "<title t or quote box>", "field": "t|shown_as|year|story_order|release_order|episodes_per_season|episode_names:<n>|in_lists:<box>:<field>|quote",
              "q": "S1..S7", "now": ..., "proposed": ..., "evidence": "...", "source": "URL", "confidence": "high|medium"}],
 "owner_calls": [{"key": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
Reply to your caller with ONE line: checked, changes, owner calls. Nothing else.
