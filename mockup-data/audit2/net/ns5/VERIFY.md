# Second check of the Network sample's findings

A first checker went through connections in a Marvel watch-tracker's Network (who knows whom, stage by stage) and left proposed
changes and open questions. Check each one INDEPENDENTLY against sources; don't trust their evidence. Read
/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/ns5/BRIEF.md first: its questions (N1 to N7),
binding rules and sources apply to you too.

Each item has `connection` (the whole connection: stages in story order, `check_stage` the one sampled) and either:
- `type: "change"`: a proposed change (`q`, `i`, `proposed`). Verdict: **confirm** (a real factual error and the fix is right),
  **amend** (a real error, but the fix needs correcting: give the corrected `value`), or **reject** (not an error, or not shown by
  sources).
- `type: "question"`: an open question. Settle it under the binding rules wherever they decide it: **change** (give the change as
  `value`, in the same shape as a proposed change: {"i": stage index or null to add, "kind", "title", "text", "on_a_card_about_b",
  "on_b_card_about_a"} with only the fields that change, or {"drop": true} for the whole connection, or {"drop_stage": i}), or
  **keep** (no change). Use **owner** only when the rules truly don't decide it, and say why.

How the rules settle the usual questions:
- Two people who never meet and don't know each other are not connected, unless one's involvement has huge consequences for the
  other. Knowing about someone, a blood tie never met, or a story told about them isn't knowing them.
- A stage must say something that happens between the two people. A shared battle where they never interact, or two separate actions
  side by side, is not a stage.
- No "Now ..." card lines (they read as live news).
- The kind is their main through-line from that title on. A brief fling or enchantment doesn't make partners. When a title clearly
  turns it (fired, betrayed, reconciled), the kind changes there.
- A stage is never earlier than what it says has happened. A connection that clearly starts in an earlier title gets a stage there.
- Only what's on screen counts; tie-in comics don't.

Write ONE JSON file to your output path: {"verdicts": [{"n": <item n>, "verdict": "confirm|amend|reject|change|keep|owner",
"value": {...for amend or change}, "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict. New text: plain,
present tense, one or two sentences, no em dashes, no actor names, no "season/episode/finale/credits/the film/the show"; card lines
short, the described person not named first. Reply with ONE line: counts per verdict.
