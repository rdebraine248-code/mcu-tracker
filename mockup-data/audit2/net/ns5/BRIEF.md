# Network sample check (audit part 2, fresh random 600)

You check connections from a Marvel watch-tracker app's Network (who knows whom, across the MCU and the other Marvel screen
universes). You are checking FACTS only, against sources. You edit nothing: you write one JSON verdict file.

## Input
Your chunk file (path in your task) is a JSON list of 50 items. Each item: `id` ("fileA|fileB:stage"), `pair` (file ids), `a`, `b`
(names), `a_desc`, `b_desc`, `universe`, `check_stage` (the stage index YOU check), and `stages`: the whole connection in story order,
for context. A stage is how the two stand FROM that title on, until the next stage:
- `kind`: family, partner, friend, mentor, boss, ally, rival or enemy.
- `title`: where the stage starts. "Agents of S.H.I.E.L.D. S3" style for seasons. "Title#N" is episode N: when the title names a
  season ("... S6#13") N counts within that season, otherwise across the whole show ("WandaVision#7").
- `text`: what happens between them in that title.
- `on_a_card_about_b`: the line on a's card describing b. `on_b_card_about_a`: the line on b's card describing a. Their WORDING is
  final; check only that they are TRUE and point at the right person.

## The questions (answer each for the stage `check_stage`; read the other stages for context only)
- **N1 Kind:** is the kind right for where that title LEAVES them? The kind is their main through-line from here, not a kiss, a one-off
  fight or a late twist (a brief fling doesn't make partners; Steve and Sharon are allies).
- **N2 Text:** does the text say what actually happens between them in that title? Wrong person, wrong event, wrong title = fail.
- **N3 Card lines:** is each card line true, and does it describe the right person (the line on a's card describes b)?
- **N4 Spoilers:** does the stage's text or a card line give away something from a LATER title than the stage's own?
- **N5 Missing turn:** between this stage's title and the next stage's (or the end of their story), does the relationship clearly turn
  (allies become enemies, enemies allies, a betrayal, a reconciliation) in a title with no stage? Only clear, sourced turns.
- **N6 Title:** is the stage on the right title, season and episode (never earlier than what it says has happened)?
- **N7 Connection:** do the two actually know each other? Knowing ABOUT someone (a case file, a name in the news, a legend) is not a
  connection. Exception: one's involvement has huge consequences for the other even if they never meet (Banner and Erskine). If the
  connection should not exist at all, say so (q "N7").

## Binding rules (the owner's; don't apply anything else)
- Every connection is explicit and has meaning; sharing a crew or a battle is not a connection by itself.
- Connections only grow: a death or a falling-out is a stage, never a deletion.
- Card lines never read as live news ("Now on the same side" is wrong); a stage says what happens between the two people, not what a
  third person does nearby. Pronouns only where the person is clear.
- Credits scenes belong to their film. Visions, dreams and illusions are not events between people; real flashbacks are.
- Only what's on screen. Fan wikis list comics and tie-in material: check the film or episode supports it.
- A group's name is the one said on screen (the owner's one exception: the Black Order).
- Agents of S.H.I.E.L.D. and Agent Carter are the same universe as the films.

## Evidence rule (the owner's stopping rule)
A stage changes ONLY for a factual error you can show: name what happens, in which title (and episode for a show), with a source URL.
No rewording for style, no "reads better", no "either episode works", no synonym swaps of kind unless the source clearly supports the
other kind AND the current one is wrong. If unsure, it passes.

## Sources (look things up; do not rely on memory)
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`
- Fandom API only (their /wiki/ pages return 403): `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`
  (also marvel, xmenmovies, spiderman, marvelanimated, sonys-spider-man-universe .fandom.com).
- curl with header `User-Agent: mcu-tracker-research/1.0`. NEVER put an email, name or any personal detail in a request.
- Space requests a second or two apart (Wikipedia answers 429 when rushed). A title's plot section or a character's page answers many
  items at once; don't fetch the same page twice. A minor one-stage pair needs only a quick check.
- Write any scratch files only inside your own work folder given in your task.

## Output
Write ONE JSON file to the output path in your task:
```
{"checked": ["<id>", ...every item id in your chunk...],
 "changes": [{"id": "<id>", "pair": "...", "a": "...", "b": "...", "q": "N1|N2|N3|N4|N5|N6|N7", "i": <stage index, or null for an
              added stage>, "now": {...the stage as it is...}, "proposed": {only the fields that change; for N5 a full new stage
              with kind, title, text, on_a_card_about_b, on_b_card_about_a; for N7 {"drop": true}}, "evidence": "what happens, where",
              "source": "URL", "confidence": "high|medium"}],
 "owner_calls": [{"id": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
New or corrected text: plain, present tense, one or two sentences, no em dashes, no actor names, never "tap/hold/swipe to", no
"season", "episode", "finale", "credits", "the film" or "the show" in a sentence. Card lines: short, the described person not named
first, e.g. "Kamala's older brother. Helps plan the wedding."
Every item must be in `checked`. Reply to your caller with ONE line: checked, changes, owner calls. Nothing else.
