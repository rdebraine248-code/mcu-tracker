# Atlas: the random 600 recheck

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/atlas/BRIEF.md first: its maps, owner's rules, questions P1 to P5, evidence rule and sources apply exactly (there are no leads
here, so skip P6). Each item in your batch is ONE sampled entry: `check_entry` is the index in `e` you check (P2 to P5); also
check the place itself (P1, P5) once per item. The other entries are context only. Check from scratch: don't assume it was already
checked.
Output ONE JSON file: {"checked": [every item `id`], "changes": [{"id": "...", "q": "P1..P5", "now": ..., "proposed": ...,
"evidence": "...", "source": "URL", "confidence": "high|medium"}], "owner_calls": [...]}. Reply with ONE line: checked, changes,
owner calls.
