# Network: screen of one-stage ties (do the two know each other?)

A Marvel watch-tracker app's Network shows who knows whom. Your batch is 150 connections that each have a single stage. Read
/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/ns5/BRIEF.md first, above all the
"Implied ties stay" rule and N7: they are binding. You check ONE thing: N7, does this tie belong in the Network at all.

The owner's rule, in short: a tie stays when the two know each other, stated OR implied on screen (a name in someone's phone
contacts, classmates, a shared inner circle, a line or scene showing they've dealt with each other, family who have met), or when one's
involvement has huge consequences for the other. It goes only when it is clearly one of these: knowing ABOUT someone with nothing
implying they know each other (a case file, the news, a legend, a story told about a dead man), a blood tie never met, or a shared
battle or scene where the two never deal with each other (two separate actions side by side). When unsure, it STAYS: do not flag it.

How to work: read each connection's stage text, names and descriptions. Most are plainly fine: move on without looking anything up.
For any you suspect, check sources (Wikipedia plot sections and episode tables, the MCU wiki on fandom.com, through
`https://en.wikipedia.org/w/index.php?title=...&action=raw` and
`https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=...&prop=wikitext&format=json`, with the User-Agent
"mcu-tracker-research/1.0" and nothing personal). Flag only what sources show. Avengers: Doomsday, Avengers: Secret Wars, Beyond the
Spider-Verse and Daredevil: Born Again S3 are unreleased placeholders kept on purpose.

Output ONE JSON file: {"checked": <number of connections>, "changes": [{"id": "<connection id>", "pair": "...", "q": "N7", "i": 0,
"now": <the stage>, "proposed": {"drop": true}, "evidence": "what sources show (and that nothing implies they know each other)",
"source": "URL", "confidence": "high|medium"}], "owner_calls": [{"id": "...", "question": "...", "evidence": "..."}]}. A wrong text on
a tie that should stay is out of scope, but if you notice one that is plainly false, add it as an owner_call. Reply with ONE line:
checked, flagged, owner calls.
