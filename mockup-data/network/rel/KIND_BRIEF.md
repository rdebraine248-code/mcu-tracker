# Kind review: the main through-line

The app owner's rule (word for word): "Steve and Sharon aren't really partners in that sense. More co-workers or allies, that's the main
through line of their relationship. Apply that to the entire thing."

Each connection's `kind` must name the MAIN THROUGH-LINE of the relationship across everything they share on screen, not one moment,
a single kiss, a brief betrayal, a one-time fight, or a late twist. Kinds: family, partner, friend, mentor, boss (one leads, employs or
commands the other), ally (they work together), rival, enemy.

Guidance:
- partner only when a romance or marriage is a defining part of their story together (Peggy and Steve, Wanda and Vision, Tony and
  Pepper). A kiss or a brief fling inside a working relationship is not it: Steve and Sharon are ally.
- family only for real family ties or found family the screen treats as family; it's usually the through-line when it exists
  (Thanos and Gamora stays family).
- When people are allies most of the time and enemies briefly (Civil War teammates), it's ally or friend, not enemy.
- When people are enemies most of the time and team up once, it's enemy.
- friend vs ally: friend when there's a real personal bond, ally when it's mainly working together.
- mentor only when teaching or guiding is the through-line; boss when it's mainly command or employment.
- rival only for ongoing competition or antagonism between people who aren't straightforward enemies.

For each item in your batch, decide the kind. If the kind changes, or the `detail` leads with a minor moment instead of the
through-line, rewrite `detail` so it leads with the main relationship (same writing standard: 1 to 3 short sentences of natural,
coherent prose, present tense, no em or en dashes, no fourth-wall words like "season", "episode", "the film", "the show", "credits",
"flashback"; don't invent facts, and check doubtful ones against the downloaded wiki pages in rel/w2/dl/ and rel/w1/raw/).
Otherwise keep `detail` word for word. Never change a, b or title.

Files are under /tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/rel/.
Output: a JSON list with every item of your batch, in the same shape ({a, b, kind, detail, title}) plus "changed": true or false and,
when changed, "why" (one line). Validate with a short script (count matches, kinds allowed, no dashes). Scripts in rel/kr<N>/.
Reply with counts (kinds changed, details reworded) and 10 notable changes.
