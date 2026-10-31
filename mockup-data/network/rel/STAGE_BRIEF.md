# Stages: relationships evolve

The app owner's rules, word for word: "Relationships can evolve so friends can become partners, allies can turn to foes etc." Earlier:
"Each network connection needs to be explicit and have meaning", "Ensure coherent, none choppy writing even if it means using a couple
of sentences", and a kind is the main through-line of that stretch of the relationship, not one moment (a single kiss inside a working
relationship doesn't make partners).

The app reveals things in story order: a viewer who has only seen some titles must not read about what happens later. So each
connection becomes an ordered list of STAGES. Each stage = { kind, title, text }:
- kind: family, partner, friend, mentor, boss (one leads, employs or commands the other), ally (they work together), rival, enemy.
- title: the title where this stage BEGINS, chosen from the two people's titles in people.json (exact strings, right season).
- text: 1 to 3 short sentences of natural, coherent prose about THIS stage only: what they are to each other from that title until the
  next stage. Never mention anything from a later stage or a later title. Present tense, plain words, no em or en dashes, no
  fourth-wall words ("season", "episode", "the film", "the show", "credits", "flashback").

When to split:
- Start a new stage when the relationship really changes (friends become partners, allies turn into enemies, an enemy becomes an ally,
  someone is revealed as a traitor), or when a later title adds something so important that the earlier text would spoil it.
  Example: Steve Rogers and Bucky Barnes: friend (Captain America: The First Avenger) -> enemy while Bucky is the brainwashed Winter
  Soldier (Captain America: The Winter Soldier) -> friend again (Captain America: Civil War).
  Example: Grant Ward and Melinda May: ally (teammates on Coulson's team) -> partner (their secret affair, if it's a defining stretch)
  -> enemy (once he's exposed as HYDRA).
- Keep ONE stage when it all happens in one title or the relationship doesn't change. Most connections are one stage. Don't split for
  every appearance; 2 to 4 stages is plenty for the big ones.
- Stages must be in story order (the app's order, given in rel/story_order.json as a list of titles; a title not in it counts at its
  first season). Same kind twice in a row is fine only if the second stage adds a real turn the first must not spoil.

Use the current text as your starting point and keep its good wording where you can, cut across stages. Check facts and which title
something happens in against the downloaded wiki pages (rel/w2/dl/<URL-encoded name>.txt and rel/w1/raw/*.json). Never invent.

Files are under /tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/rel/. Input: your batch file
(items {a, b, kind, detail, title}). Output: a JSON list, one item per input item, {a, b, stages: [{kind, title, text}]}. Validate with a
script: every item present once, names unchanged, kinds allowed, every stage title in a's or b's titles, stages in story order, no
dashes or fourth-wall words, 1 to 3 sentences each. Scripts in rel/st<N>/. Reply with counts (how many split, into how many stages) and
8 examples of split connections.
