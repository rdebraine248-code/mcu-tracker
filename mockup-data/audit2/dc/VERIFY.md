# Second check of the Damage Control and Comms findings (audit part 6)

A first checker went through Damage Control's reports, the news headlines and the Comms messages of a Marvel watch-tracker app and
left proposed changes and open questions. Check each one INDEPENDENTLY against sources; don't trust their evidence. First read
/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/dc/BRIEF.md: its questions, the owner's rules,
the evidence rule and the sources apply to you too. Each item carries `context` (the report, the title's headlines, or the message).

- `type: "change"`: verdict **confirm** (a real factual error and the fix is right), **amend** (a real error, fix needs correcting:
  give the corrected `value` in the same shape as `proposed`), or **reject** (not an error, or sources don't show it).
- `type: "question"`: settle it under the owner's rules: **change** (give the change as `value`, with the field it applies to) or
  **keep**. **owner** only when the rules truly don't decide it, with the reason in one line.

Settled by the owner, so reject or keep: Marvel's "B" Earth numbers are used everywhere they exist (Earth-1610B stays). A fourth-wall
word ("episode", "season", "the show"...) in a message body is a house-rule error: reword it as little as possible.

Write ONE JSON file to your output path: {"verdicts": [{"n": <item n>, "verdict": "confirm|amend|reject|change|keep|owner",
"value": ..., "why": "one or two sentences", "source": "URL"}]}. Every item gets a verdict. Reply with ONE line: counts per verdict.
