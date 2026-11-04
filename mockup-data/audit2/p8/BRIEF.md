# Audit part 8: the Agent File (eggs, stones, achievements, insignia)

You check one batch of a Marvel watch-tracker app's Agent File text: hidden easter eggs (`name`, a `hint`, and a `how_to` revealed
after it's found), the six Infinity Stones (`hint`, `how_to`), achievements (`title`, `text`, `hint`, `how_to`), or insignia (`name`,
`hint`, `unlocks_on`: the titles that unlock it, `met_by`, `named_by`). FACTS only. You edit nothing: you write one JSON verdict file.

## The questions
- **A1 MCU facts:** every MCU reference in a name, hint or text is true (who says or does what, in which title; a quoted line is said
  on screen, word for word or near enough to be recognisable, by the person it's tied to).
- **A2 Insignia:** the name fits the character's emblem; `unlocks_on` are that character's main appearances (several titles, never a
  single one; a title where they barely appear is wrong); the `hint` matches `unlocks_on` exactly (every title it names is in the list
  and none is left out).
- **A3 Consistency:** a hint, text and how-to for the same thing don't contradict each other (one says hold, the other swipe).
- **A4 House rules:** no em dashes, no actor names; no "tap/hold/swipe to" wording EXCEPT in `how_to`, which is where the owner keeps
  the gestures on purpose.
How the code actually triggers an egg is not yours to check: judge only the text and the MCU facts.

## Evidence rule (the owner's stopping rule)
Change only a factual error you can show, with a source URL. No rewording for style. If unsure, it passes.

## Sources
Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`), Wikiquote raw (same URL on en.wikiquote.org), and the
Fandom API only (`https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`). curl with
`User-Agent: mcu-tracker-research/1.0`; NEVER put personal details in a request; space requests out; scratch files only in your work
folder.

## Output
ONE JSON file: {"checked": [every id], "changes": [{"key": "<id>", "field": "name|hint|how_to|title|text|unlocks_on", "q": "A1..A4",
"now": ..., "proposed": ..., "evidence": "...", "source": "URL", "confidence": "high|medium"}], "owner_calls": [...]}. Reply with ONE
line: checked, changes, owner calls.
