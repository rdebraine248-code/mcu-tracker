# Second check of the logs findings (audit part 5)

A first checker went through this part of a Marvel watch-tracker app and left proposed changes and open questions. Check each one
INDEPENDENTLY against sources; don't trust their evidence. First read
/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/logs/BRIEF.md: its questions, the owner's
rules, the evidence rule and the sources apply to you too.

Each item is either:
- `type: "change"`: verdict **confirm** (a real factual error and the fix is right), **amend** (a real error but the fix needs
  correcting: give the corrected `value` in the same shape as `proposed`), or **reject** (not an error, or sources don't show it).
- `type: "question"`: settle it under the owner's rules wherever they decide it: **change** (give the change as `value`, in the
  shape a proposed change would have) or **keep**. Use **owner** only when the rules truly don't decide it, and say why in one line.

- A name the screen hasn't said yet may stay unless it gives a later reveal away (owner's rule 37): naming which Infinity Stone
  something is before the films say so gives it away, so it goes; a persona's name shown but not yet spoken (Ronin) stays.
- Status means real status. A row stage must be true from its title until the next stage, and the last one to the end.
- A fix changes as little of the recap as it can and keeps the log's voice.

Write ONE JSON file to your output path: {"verdicts": [{"n": <item n>, "verdict": "confirm|amend|reject|change|keep|owner",
"value": ..., "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict. New text: plain, present tense, no em
dashes, no actor names, no "season/episode/finale/credits/the film/the show". Reply with ONE line: counts per verdict.
