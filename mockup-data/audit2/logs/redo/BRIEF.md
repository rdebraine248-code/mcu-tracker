# Logs: the targeted redo (row stages, and the Incursions recaps)

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/logs/BRIEF.md first: its questions, the
owner's rules, the evidence rule and the sources apply exactly. A random recheck found two patterns, and your batch (`kind`) is one:

- **rows**: every row of these logs. Each row is stages `[value, title]`: the value holds from that title until the next stage, and the
  last stage holds to the end of the box (`order`). The pattern found: a later title changes things and the row was never updated
  (Fisk out of prison by Hawkeye, S.H.I.E.L.D. named from the Agent Carter One-Shot). For each stage, ask: is it true when it starts,
  and does it STAY true through every title in `order` up to the next stage? If a title in between changes it, propose the missing
  stage there. Also: is a stage shown before the title that reveals it? `recaps` (the log's entries) are context.
- **recaps**: the two Incursions logs' recaps (each a title from outside the main MCU). Check every fact in each recap (L1 to L3).
  The closing line "On the TVA's monitors, Earth-X is marked terminated" is the app's own framing device for this box, set up on
  purpose: don't flag it.

Avengers: Doomsday, Avengers: Secret Wars, Beyond the Spider-Verse and Daredevil: Born Again S3 are unreleased placeholders kept on
purpose. Names the screen hasn't said stay unless they give a later reveal away (owner's rule 37).

Output ONE JSON file: {"checked": ["<log id>:rows" or "<log id>:<entry i>", ...], "changes": [{"key": "<log id>:rows:<row>:<stage>"
or "<log id>:<i>", "q": "L1..L5", "now": ..., "proposed": <the corrected value, or for a missing stage {"insert_after": <stage
index>, "stage": [value, title]}>, "evidence": "...", "source": "URL", "confidence": "high|medium"}], "owner_calls": [...]}. Reply with
ONE line: checked, changes, owner calls.
