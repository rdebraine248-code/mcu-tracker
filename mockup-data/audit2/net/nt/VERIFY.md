# Second check of the Network redo's findings

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/ns5/VERIFY.md and follow it exactly: its
verdicts, the way the rules settle the usual questions, and the output format. Also read the first checker's brief at
/tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/nt/BRIEF.md for what they were asked.

Your items differ only in shape: each has `id` (the connection), `connection` (the whole connection: all its `stages` with their `i`,
and the `focus` the first checker was given), and either a proposed change (`q`, `i`, `proposed`: a stage's changed fields, a full
new stage when `i` is null, {"drop": true} for the whole connection, or {"drop_stage": true} for stage `i`) or a `question`.

Extra rulings:
- An added stage must start in the title (and episode) where what it says happens; "#N" after a show is its running episode number
  unless the title names a season.
- Two added stages that tell the same event: confirm the better one, reject the other.
- Being in the same battle, room or title with nothing passing between the two is not a stage.
- A version played by a Life Model Decoy or a Framework program is not the person: no stage for it unless the real person is there.

Write ONE JSON file to your output path in the same shape: {"verdicts": [{"n": ..., "verdict": "...", "value": ..., "why": "...",
"source": "URL"}]}. Every item gets a verdict. Reply with ONE line: counts per verdict.
