# Network: episode texts (does the stage tell what happens in that episode?)

A Marvel watch-tracker app's Network shows who knows whom, stage by stage. The last random sample found stage texts that told
another episode's events, or got who did what wrong, in episodes of these shows: Agents of S.H.I.E.L.D., The Spectacular Spider-Man,
Luke Cage, Loki, X-Men '97 and Agent Carter. Your batch is 50 stages from those shows, sorted by episode ("Title#N" is the
show's running episode number across seasons; "Title S2#3" is season 2, episode 3).

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/ns5/BRIEF.md first: its questions,
binding rules (including "Implied ties stay"), evidence rule, sources and house style for text apply exactly. For the stage
`check_stage` of each connection, check:
- **N2 Text:** does it say what actually happens between the two in THAT episode? Events from other episodes, the wrong person doing
  something, or a whole season summed up in one episode's stage are errors. Fix the text to that episode's events between them.
- **N6 Title:** if what the text says happens in a different episode, either move the stage there (`title`) or fix the text: pick
  the one that matches the connection's other stages.
- **N3 Card lines:** true, and about the right person (the line on a's card describes b).
- **N4 Spoilers:** nothing from a later title.
Use the episode summaries (Wikipedia episode tables, the MCU wiki's episode pages, Marvel Animated wikis on fandom.com for the
cartoons), with the User-Agent "mcu-tracker-research/1.0" and nothing personal. Neighbouring items are often the same episode: read
its summary once. The other stages are context only.

Only factual errors with evidence: a wording you'd prefer is not an error.

Output ONE JSON file: {"checked": [every item id], "changes": [{"id": "...", "pair": "...", "q": "N2|N3|N4|N6", "i": <stage index>,
"now": <the stage>, "proposed": {only the fields that change: "text", "title", "kind", "on_a_card_about_b", "on_b_card_about_a"},
"evidence": "...", "source": "URL", "confidence": "high|medium"}], "owner_calls": [...]}. New text: plain, present tense, one or two
sentences, no em dashes, no actor names, no "season/episode/finale/credits/the film/the show"; card lines short, the described
person not named first. Reply with ONE line: checked, changes, owner calls.
