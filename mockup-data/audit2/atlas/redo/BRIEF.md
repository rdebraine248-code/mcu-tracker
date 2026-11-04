# Atlas: the targeted redo (episode entries)

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/atlas/BRIEF.md first: its maps, owner's
rules, evidence rule and sources apply exactly. A random recheck found that entries tied to one episode ("Title#N") often describe
the wrong episode, or sum up the whole series, or put the event at the wrong place. Your batch lists places with `check_entries`: the
indexes of their episode entries. For EACH of those entries ask:
- Does what the text says happen in THAT episode ("#N" is the show's running episode number unless the title names a season, as in
  "Daredevil S3#4")? If it happens in another episode, propose the right "#N". If the text sums up more than one episode, rewrite it
  to the one event of that episode at this place.
- Does it happen at THIS place? If not, propose {"remove": true, "wrong_place": true, "happens_at": "..."}.
- Is every detail true (who does what to whom)?
The other entries are context. If unsure, it passes.
Output ONE JSON file: {"checked": ["<place key>#<entry index>", ...], "changes": [{"id": "<place key>#<entry index>", "q": "P2|P3|P4",
"now": [...], "proposed": [title, sub, text] or {...}, "evidence": "...", "source": "URL", "confidence": "high|medium"}],
"owner_calls": [...]}. Reply with ONE line: checked, changes, owner calls.
