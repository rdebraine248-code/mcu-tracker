# Fact-check: ties between new people from different batches

Read XTIES.md first (same folder): it is the brief the drafter followed, with the tie rule and format. Your inputs: xNN_in.json (the
candidate pairs and both people's files) and xNN_out.json (the drafter's ties and skipped pairs).

1. Every tie: check each claim in `text`, `whoA`, `whoB`, the `kind`, the `title` and `ep` against sources (transcripts on
   springfieldspringfield.co.uk, the saved wiki pages under
   /tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad/wv/cache/, work_NN folders next to this
   file, Wikipedia episode summaries; User-Agent "mcu-tracker-research/1.0", nothing personal). Fix what is wrong. Remove a tie when
   no source shows the two dealing with each other on screen (a shared crowd is not a tie), and move it to `skipped` with why.
2. Skipped pairs: read each `why`. Where it says they never interact, spot-check the ones that look doubtful (a skipped pair that
   fights or works together on screen should be a tie); write the tie if a source shows it.
3. Writing rules as in XTIES.md. Validate with a short Python script (kinds, no dashes, banned words, sentence length, every pair
   accounted for).

Write chkNN.json in this folder: {"files": [], "ties": [...final ties...], "skipped": [...], "dropped": []}. Do not edit any other
file. Reply with one line: ties kept, fixed, removed, added.
