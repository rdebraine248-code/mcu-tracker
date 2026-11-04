# Network: recheck of removed ties under the owner's rule on implied connections

A Marvel watch-tracker app's Network shows who knows whom, stage by stage. Over three audit rounds, checkers removed whole ties
("connections") between people they judged never to deal with each other. The owner has now said the checkers were too strict:

> "I hope you're not removing implied connections, which is something that I established in previous chats. A lot of lore is built
> in through implication and easter eggs. If character one has character two in their phone contact, and it's shown even if briefly
> then the implication is that they are connected through one way or the other."

The owner's rules, all binding:
- A connection needs two people who know each other. Off-screen ties count when stated or implied: "if character A says 'yea B, love
  that guy' but they're never in the same movie together, that still counts." If Gilgamesh says Odin taught him a recipe, that is a
  connection implied by dialogue.
- Anything shown on screen that implies the two know each other counts: a name in someone's phone contacts, classmates, a shared
  inner circle (people who serve the same leader together), a line or scene that shows they've dealt with each other, family who
  have met.
- Exception: if one person's knowledge of or involvement in the other has huge consequences for them, it is a connection even if they
  never meet (Bruce Banner and Erskine: Erskine's formula made Bruce the Hulk; Valentina and Clint: she sends Yelena after him).
- Stays out: knowing ABOUT someone with nothing that implies they know each other (Agent Cleary has a case file on Mysterio; a name in
  the news; a legend about a dead man), a blood tie never met, and a shared battle where the two never deal with each other.
- When unsure, the tie stays (restore) and you mark it `owner` with the reason.
- Only what's on screen counts; tie-in comics don't.

Each item in your file is one removed tie: the two people (`a_name`, `b_name`: name and description), the stages it had
(`removed_stages`), the round that removed it, its source, and `still_there_now` (stages the tie has today, if any: the removal took
out only the stages listed, and these remain). Check each against sources (Wikipedia's plot sections and episode tables, and the MCU
wiki on fandom.com, through `https://en.wikipedia.org/w/index.php?title=...&action=raw` and
`https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=...&prop=wikitext&format=json`). Send requests with the
User-Agent "mcu-tracker-research/1.0" and nothing personal.

Verdict per item:
- **restore**: the rule keeps it. If a removed stage's text was itself wrong, give corrected stages in `value` as a list of
  {"i", "kind", "title", "text", "on_a_card_about_b", "on_b_card_about_a"} (same shapes as `removed_stages`; "Title#N" is the show's
  running episode); otherwise `value` is null and the stages come back as they were.
- **keep_removed**: the rule really does keep it out (say which part of the rule).
- **owner**: the rules truly don't decide it; say why in one sentence.

New text: plain, present tense, one or two sentences, no em dashes, no actor names, no "season/episode/finale/credits/the film/the
show"; card lines short, the described person not named first.

Write ONE JSON file to your output path: {"verdicts": [{"n": <item n>, "verdict": "restore|keep_removed|owner", "value": ...,
"why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict. Reply with ONE line: counts per verdict.
