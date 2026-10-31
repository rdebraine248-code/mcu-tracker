# Rewriting Network connections

You're finishing the relationship data for the "Network" page of an MCU (Sacred Timeline) fan app. The owner's rules, word for word:
"Each network connection needs to be explicit and have meaning." and "Ensure coherent, none choppy writing even if it means using a couple of sentences."

Your batch file (given in your task) is a JSON list. Each item is one pair {a, b, kinds, cands, need}. `cands` are earlier drafts (kind, detail, title, source) from different researchers; they may be stiff, templated, thin, or disagree on the kind. Produce ONE final connection per pair, or drop it.

For each pair:
- **kind**: exactly one of family, partner, friend, mentor, boss (one leads, employs or commands the other), ally (they actually work together), rival, enemy. Pick what best describes the relationship as a whole. If they're family AND enemies (Thanos and Gamora), family wins; partners who become enemies are partner.
- **detail**: 1 to 3 short sentences of natural, coherent prose that say what the connection actually is and what happens between them. Present tense, plain words, full first names where it helps, written so it reads well as a card about the two of them. No em or en dashes. No fourth-wall words ("season", "episode", "the film", "the show", "credits", "flashback", "post-credits"). No wiki-label phrasing ("is X's princess", "attempted killer of").
  - Bad: "Rumlow leads the strike team Steve commands, then turns out to be HYDRA and fights him"
  - Good: "Rumlow leads the S.H.I.E.L.D. strike team that works under Steve. When S.H.I.E.L.D. falls, he reveals he has been HYDRA all along and turns on him."
- **title**: the title where the tie is shown or stated, picked from the two people's `titles` in people.json (use the right season for shows with seasons). If they share no title, a title of whoever states or shows the tie.
- **source**: keep the best source URL from the drafts.
- **Drop** the pair (with a one-line reason) if there's no real, meaningful tie behind it: they're only in the same organization or battle, the only link is the Snap, it's a different variant (What If, Framework, other universes), or you can't state it accurately.

Accuracy first. Check facts against the downloaded MCU Wiki pages before writing: `rel/w2/dl/<URL-encoded name>.txt` (one per person, wiki markup) and `rel/w1/raw/*.json` ({title, text}). Use web search only if both are silent. Never invent.

Files: everything is under /tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/rel/. people.json has every person {name, titles, ...}; copy names exactly.

Output: write JSON {"keep": [{a, b, kind, detail, title, source}], "drop": [{a, b, why}]} to the output file named in your task, covering every pair in your batch exactly once. Validate with a short script (names exact, kinds allowed, title is in a's or b's titles, no dashes or fourth-wall words, every pair accounted for). Don't modify any other files; keep your scripts in rel/rw<N>/. Reply with counts and 8 before/after examples.
