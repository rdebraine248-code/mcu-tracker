# Episode by episode: independent second pass

The app (an MCU watch tracker, "Marvel Datapad") reveals things as you watch: news headlines, messages, Atlas places, entries in
people's files, and connections between people in its Network. Today, anything tied to a TV show only appears once the whole show (or
season title) is ticked. The owner wants these to appear episode by episode as episodes are ticked.

## Your input
A JSON file: `{ title: { title, episodes: [names in order], seasons: [episodes per season] or null, steps, net, atlas, news, msgs } }`.
Episodes are numbered **through the title**, starting at 1: for a title with seasons [10, 13], season 2's first episode is 11. Each list
holds moments `{ key, text, ... }` (file steps, Network connection stages with the pair and kind, Atlas entries with the place,
headlines, messages).

## Your job
For **every moment**, give the episode number **by which everything the text says has happened** on screen, counted through the title.
- If the text tells events from several episodes, use the **latest** of them (never reveal something early).
- A step starting "In season N," must get an episode inside season N.
- If the text sums up the whole run, its last event decides (often the finale).
- If you cannot pin it down with confidence, give the **last episode of the title** (or of its season, for an "In season N," step):
  that is always safe. Never guess earlier.
- Base every answer on episode synopses: the MCU Wiki (marvelcinematicuniverse.fandom.com) episode or season pages, the Marvel
  Database or X-Men wikis for other shows, or Wikipedia's episode tables. Use the MediaWiki API
  (`/api.php?action=parse&page=...&prop=wikitext&format=json`) with the User-Agent header `mcu-tracker-research/1.0` and nothing else
  that identifies anyone. Never put any email or personal detail in a request.
- Do not change any text. Only assign episode numbers.

## Output: a JSON file at the path you're given
`{ "<moment key>": episode number, ... }` covering **every** key in your input (steps, net, atlas, news and msgs together; keys are
unique). Keep your scripts and downloaded pages in the work folder you're given. When done, report how many moments you tagged, how
many fell back to the last episode for lack of a source, and anything you were unsure of.

## This is an independent second pass
Another researcher already tagged these moments; you are not shown their answers, on purpose. Work from the sources yourself. Every
moment in your input was placed **before** its title's last episode by that first pass, so think carefully: is everything the text
says really on screen by the episode you pick? If a moment's text says something that never happens in its title at all, add it to a
separate list in your report (key and one line why); still give it an episode (the last one, the safe choice).
