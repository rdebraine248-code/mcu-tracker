# Second check of proposed Network changes

Another checker proposed the changes in your file for a Marvel watch-tracker's Network (who knows whom, stage by stage). Check each one
INDEPENDENTLY against sources; do not trust their evidence. A stage is how two people stand FROM its title on.
- q: N1 kind wrong for where the title leaves them; N2 text wrong; N3 card line wrong or about the wrong person (the line on a's card
  describes b); N4 spoiler from a later title; N5 a missing turn (a new stage); N6 the stage is on the wrong title/season/episode
  ("#N" = episode N of the title before it: "Luke Cage S1#8" is season 1 episode 8, "The Defenders#3" is episode 3 of the show).
- Only facts. A change that is only rewording, or that the sources don't clearly support, is rejected. For N6, confirm only if the
  relationship as described really starts in the proposed title/episode (not just that they appear together there).
- New text must be plain, present tense, one or two sentences, no em dashes, no actor names.

## Moving a stage earlier when its text covers later episodes (N6)
If the earlier start is right but the stage text or card lines also describe things from later episodes, SPLIT it (verdict "amend"):
`value` = {"title": the earlier title, "text"/"on_a_card_about_b"/"on_b_card_about_a": cut back to what is true at that title},
plus `"split": {"kind": ..., "title": the later title where the rest happens, "text": ..., "on_a_card_about_b": ..., "on_b_card_about_a": ...}`,
a new stage that carries the cut facts. Do not reject such a move and do not drop the cut facts.

Sources: Wikipedia raw (`https://en.wikipedia.org/w/index.php?title=PAGE&action=raw`), fandom API
(`https://<wiki>.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json`; marvelcinematicuniverse, marvel, xmenmovies,
spiderman, marvelanimated). curl with `User-Agent: mcu-tracker-research/1.0`. Never send personal details.

Write ONE JSON file to your output path: {"verdicts": [{"n": <item index "n" in your file>, "verdict": "confirm|amend|reject",
"value": <corrected "proposed" object, for amend>, "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict.
Reply with ONE line: confirmed, amended, rejected counts.
