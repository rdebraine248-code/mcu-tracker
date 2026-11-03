# Audit part 2: Network connections

You check a batch of connections from a Marvel watch-tracker app's Network (who knows whom, across the MCU and the other Marvel
screen universes). You are checking FACTS only, against sources. You are not editing anything: you write a JSON verdict file.

## Input
Your chunk file (path in your task) is a JSON list of pairs. Each pair: `pair` (file ids), `a`, `b` (names), `a_desc`, `b_desc`,
`universe`, and `stages` in story order. A stage is how the two stand FROM that title on, until the next stage:
- `kind`: one of family, partner, friend, mentor, boss, ally, rival, enemy.
- `title`: the title where this stage starts ("Agents of S.H.I.E.L.D. S3" style for seasons).
- `text`: what happens between them in that title.
- `on_a_card_about_b`: the line on a's card describing b. `on_b_card_about_a`: the line on b's card describing a. (These were just
  rewritten for clarity; their WORDING is final. Check only that they are TRUE and point at the right person.)

## The questions (answer every one for every stage)
- **N1 Kind:** is the kind right for where that title LEAVES them (not how they met)? Example of the fault: Bruce and Wanda shown as
  enemies from Age of Ultron, though by its end she has joined the Avengers and fought beside him.
- **N2 Text:** does the text say what actually happens between them in that title? Wrong person, wrong event, wrong title = fail.
- **N3 Card lines:** is each card line true, and does it describe the right person (the line on a's card describes b)?
- **N4 Spoilers:** does any stage's text or card line give away something from a LATER title than the stage's own?
- **N5 Missing turn:** within the titles these stages cover, does the relationship clearly turn (allies become enemies, enemies become
  allies, a betrayal, a reconciliation) in a title where there is no stage? Only clear, sourced turns.
- **N6 Title:** is the stage on the right title (and season)?

## Evidence rule
A stage changes ONLY if a question fails and you can name what happens, in which title (and episode for a show), with a source URL.
No rewording for style, no "reads better", no synonym swaps of kind ("ally" vs "friend") unless the source clearly supports the other
kind and the current one is wrong. If unsure, it passes.

## Sources (look things up; do not rely on memory)
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`
- Fandom API: `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json` (also
  marvel.fandom.com, xmenmovies.fandom.com, spiderman.fandom.com, marvelanimated.fandom.com).
- curl with header `User-Agent: mcu-tracker-research/1.0`. Never put any personal details in a request.
- Be efficient: a title's plot section or a character's page often answers many pairs at once; cache what you fetch in your head,
  don't fetch the same page twice. A minor one-stage pair needs only a quick check.

## Output
Write ONE JSON file to the output path in your task:
```
{"checked": ["fileA|fileB", ...every pair in your chunk...],
 "changes": [{"pair": "fileA|fileB", "a": "...", "b": "...", "q": "N1|N2|N3|N4|N5|N6", "i": <stage index, or null for an added stage>,
              "now": {...the stage as it is...}, "proposed": {"kind": "...", "title": "...", "text": "...", "on_a_card_about_b": "...",
              "on_b_card_about_a": "..."} (only the fields that change; for N5 a full new stage), "evidence": "what happens, where",
              "source": "URL", "confidence": "high|medium"}],
 "owner_calls": [{"pair": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
- New or corrected text follows the house style: plain, present tense, one or two sentences, no em dashes, no actor names, never
  "tap/hold/swipe to". Card lines: short, the described person not named first, e.g. "Kamala's older brother. Helps plan the wedding."
- Every pair in your chunk must be in `checked`. Reply to your caller with ONE line: checked, changes, owner calls. Nothing else.
