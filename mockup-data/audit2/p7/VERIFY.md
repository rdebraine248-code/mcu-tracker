# Second check of part 7's findings (the story lists and the boxes' own text)

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/p7/BRIEF.md first: its questions, rules,
evidence rule and sources apply. Check each item INDEPENDENTLY against sources.
- `type: "change"`: **confirm**, **amend** (give `value`), or **reject**.
- `type: "question"`: **change** (give the change as `value` with its field) or **keep**; **owner** only when the rules truly don't
  decide it.
Rulings: a box's quote may be a famous line ABOUT that box's character said by someone else (Odin's "Whosoever holds this hammer" on
Thor's box): that is a design choice, so keep it; only a misquote, or a line never said on screen, is an error. Episode names follow
the official listing (Wikipedia's episode list, else Marvel's); a different but equivalent styling the official listing doesn't use is
an error only when the official name is clearly different. Unreleased episodes or titles are not filled in early.
Write ONE JSON file: {"verdicts": [{"n": ..., "verdict": "...", "value": ..., "why": "...", "source": "URL"}]}. Reply with ONE line:
counts per verdict.
