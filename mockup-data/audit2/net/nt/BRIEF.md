# Network: the targeted redo (audit part 2, by pattern)

You check connections from a Marvel watch-tracker app's Network (who knows whom, stage by stage). The last random sample found
errors in clear patterns, so these connections were picked by pattern. FACTS only, against sources. You edit nothing: you write
one JSON verdict file.

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/ns5/BRIEF.md first: its questions (N1 to
N7), binding rules, evidence rule, sources and house style for text apply here exactly. The only difference is what you look at.

## Input
A JSON list of connections: `id` ("fileA|fileB"), `a`, `b`, `a_desc`, `b_desc`, `universe`, `stages` (all of them, in story order,
each with `i`), and `focus`, which says what to check:
- `share_no_title: true`: the two are never on screen in the same title. Do they actually know each other (N7)? Keep it only if they
  do (an off-screen tie stated on screen counts) or one's involvement has huge consequences for the other. A blood tie never met, or
  knowing about someone, is not a connection: propose dropping it.
- `both_in_after_last_stage: [titles]`: both are on screen in these titles after the last stage. Does anything happen BETWEEN them
  there that turns or adds to the relationship (a betrayal, reconciliation, a death, a new alliance, a romance ending)? If so, propose
  the missing stage (N5). Being in the same title with nothing between them needs nothing.
- `both_in_before_first_stage: [titles]`: both are on screen in these titles before the first stage. Does the connection really
  start earlier, in one of them (they meet and something passes between them)? If so, propose an earlier stage (N5/N6).
- `check_every_stage: true`: check every stage of this connection on all of N1 to N7, not only the ones above.

Answer only what the focus asks (plus anything plainly false you see in passing). If unsure, it passes.

## Output
ONE JSON file at your output path:
```
{"checked": ["<id>", ... every connection in your batch],
 "changes": [{"id": "...", "q": "N1..N7", "i": <stage index, or null for an added stage>, "now": {...} or null,
              "proposed": {only fields that change: "kind", "title" (with "#N" for an episode), "text", "on_a_card_about_b",
              "on_b_card_about_a"; a full new stage for an added one; {"drop": true} to drop the whole connection; {"drop_stage": true}
              to drop stage i}, "evidence": "what happens, where", "source": "URL", "confidence": "high|medium"}],
 "owner_calls": [{"id": "...", "question": "...", "options": ["..."], "evidence": "...", "source": "URL"}]}
```
Owner calls only when the rules really don't decide. Reply to your caller with ONE line: checked, changes, owner calls.
