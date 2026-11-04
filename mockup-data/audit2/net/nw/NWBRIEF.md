# Last Network pass: does each stage tell what really happens between the two, in its own episode?

You check a batch of connections from a Marvel watch-tracker app's Network (who knows whom). You check FACTS only, against
fetched sources (never from memory), and write one JSON file. You edit nothing.

A fresh random recheck of 600 stages found 26 wrong (4.3%; the owner's bar is 0 to 1%). This pass looks for THOSE kinds of fault on
EVERY stage in your chunk, so the Network ends accurate.

## Input
A JSON list of pairs: `pair` (file ids), `a`, `b`, `a_desc`, `b_desc`, `universe`, `stages` in story order. A stage is how the two
stand FROM its `title` on, until the next stage. "#N" after a title is episode N of that title ("Agents of S.H.I.E.L.D. S3#5" is
season 3 episode 5; a show title with "#N" counts across the whole show in the app's order, which follows Wikipedia's episode list).
A title with no "#N" starts at the beginning of that film or season. `text` = what happens between them there;
`on_a_card_about_b` = the line on a's card that describes b; `on_b_card_about_a` the other way.

## What to look for (the faults the recheck found, most common first)
1. **N2 wrong event:** the text tells an event that isn't what happens between them in that title or episode: the wrong person does
   it (Loki "recruits" Clint: he takes over his mind; Ruby chases Coulson and Talbot, not Daisy), it is a different event (Jubilee never
   fights Mojo beside Longshot; Trevor never goes on live TV), or it happens in another episode (Venom going after Peter's loved ones is
   #13, not #20; Sarge seizing the Zephyr is S6#9, not S6#13). A stage that only tells what a third person does nearby, not
   something between the two, is also wrong (Jiaying's stage was only about Nathaniel killing her).
2. **N4 later facts:** the text or a card line tells something that only happens in a LATER episode or title than the stage's own
   (Bobbi and Hunter "back together" at S2#5: they rekindle in S2#8; a reveal named before its episode).
3. **N3 card lines:** a card line that is false or describes the wrong person (Karja called "the Orgocorp chief"; Nathaniel called
   "Malick's son" on Simmons's card, where Malick means Gideon).
4. **N1/N6, only when plain:** a kind that is clearly wrong for where the title leaves them, or a stage that clearly starts in another
   episode.

## Rules (settled, binding)
- Change a stage ONLY if you can name what happens, in which title and episode, with a source URL you fetched. If unsure, or sources
  disagree, it passes. No rewording for style.
- When the right fix moves later facts out of a stage, keep them: add `"split"` (one object or a list) with `kind`, `title` (the
  later episode), `text`, `on_a_card_about_b`, `on_b_card_about_a`.
- Names are the ones said or shown on screen ("the Children of Thanos"; Daredevil season 1 never names the Hand; First Class never
  says "Brotherhood"). A deleted scene, tie-in, interview or marketing name is not the screen.
- Text: plain, present tense, one or two sentences, no em dashes, no actor names, never "tap/hold/swipe to". Card lines: short, the
  described person not named first, the card's own person named, no sentence starting with "Now".
- Nothing may give away something from a later title, or a reveal before its episode.

## Sources
Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`; season and "List of ... episodes" pages give
per-episode plots), fandom API (`https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`,
also marvel, xmenmovies, spiderman, marvelanimated, blade). curl with `User-Agent: mcu-tracker-research/1.0`; never personal details.
Your chunk is grouped by universe and title: fetch each title's plot or episode list once and check many stages against it. Space
Wikipedia requests a second or two apart (it answers 429 when rushed). Keep downloads in your work folder.

## Output
ONE JSON file: `{"checked": ["a|b", ...every pair...], "changes": [{"pair": "a|b", "q": "N1|N2|N3|N4|N6", "i": <stage index>,
"now": {...the stage...}, "proposed": {only the fields that change, plus "split" if needed}, "evidence": "what happens, in which
episode", "source": "URL", "confidence": "high|medium"}], "owner_calls": [{"pair": "...", "question": "...", "options": [...],
"evidence": "...", "source": "URL"}]}`. Every pair must be in `checked`. Reply with ONE line: checked, changes, owner calls.
