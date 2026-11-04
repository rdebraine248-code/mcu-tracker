# Second check: new stages for ties

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/fp/BRIEF.md and the Network brief it points
to: their rules apply. A first checker proposed new stages where two people deal with each other in a title the
tie had no stage for. Check each one INDEPENDENTLY against sources: do the two really deal with each other in that title (and that
episode, for a show), is the text true and about what happens between them there, are the card lines true and about the right
person (the line on a's card describes b), is the kind right, and is nothing in it from a later title?

Each item has the tie's existing `stages`, and either `type: "add"` (the proposed stage) or `type: "question"`. Verdict per item:
**confirm** (right as proposed), **amend** (they do deal with each other there, but fix it: give the corrected stage as `value` in the
same shape), **reject** (they don't deal with each other in that title, or it isn't shown), or for a question **change** (give a stage
as `value`), **keep** (no stage), or **owner** (the rules truly don't decide it).

Write ONE JSON file to your output path: {"verdicts": [{"n": <item n>, "verdict": "...", "value": {...} or null, "why": "one or two
sentences", "source": "URL"}]}. Every item gets a verdict. Reply with ONE line: counts per verdict.

Settled by the owner, apply them: credits scenes belong to their film; Echo's ancestors seen in visions are ties; implied ties stay;
a person seen only in a vision, a mention or a recording (no exchange) is not a stage; an alternate-timeline version of a person (a
Framework copy, the 1983 timeline) may carry a stage on the main tie only where the show treats them as that same person.
