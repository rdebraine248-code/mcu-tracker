# Second check of the atlas findings (audit part 4)

A first checker went through this part of a Marvel watch-tracker app and left proposed changes and open questions. Check each one
INDEPENDENTLY against sources; don't trust their evidence. First read
/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/atlas/BRIEF.md: its questions, the owner's
rules, the evidence rule and the sources apply to you too.

Each item is either:
- `type: "change"`: verdict **confirm** (a real factual error and the fix is right), **amend** (a real error but the fix needs
  correcting: give the corrected `value` in the same shape as `proposed`), or **reject** (not an error, or sources don't show it).
- `type: "question"`: settle it under the owner's rules wherever they decide it: **change** (give the change as `value`, in the
  shape a proposed change would have) or **keep**. Use **owner** only when the rules truly don't decide it, and say why in one line.

- **Settled by the owner, so keep:** Wade's 1979 jump to Three Mile Island (Deadpool 2's ending, killing Weapon XI) stays on the Earth-41578
  map; the rest of Deadpool 2 is Earth-10005. Two leads that describe one event get one entry.
- A place is pinned where any good source puts it (a production designer, a script, the wiki citing the screen); "Location unknown"
  only when none does. An entry where nothing happens at the place (only a mention) goes: only what's on screen counts.
- A lead marked wrong_place is confirmed only if you agree the event happens elsewhere; say where.

Write ONE JSON file to your output path: {"verdicts": [{"n": <item n>, "verdict": "confirm|amend|reject|change|keep|owner",
"value": ..., "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict. New text: plain, present tense, no em
dashes, no actor names, no "season/episode/finale/credits/the film/the show". Reply with ONE line: counts per verdict.
