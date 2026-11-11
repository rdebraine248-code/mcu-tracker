# Fact-check: VisionQuest files

Read VQ_FILES.md (same folder) first: it is the brief the drafter followed, with the inputs, the owner's rules and the output format,
and it points to DRAFT.md for the writing rules. Your inputs: the draft (files_a.json or files_b.json), inventory.json (the files as
they stand) and src/ (transcripts e1 to e7, wikipedia_episodes.txt, mcuwiki_e*.txt, char_*.txt, recap_e8_*.txt; episode 8 has no
transcript, so check its claims against all three recaps and Wikipedia, and say what rests on them).

1. Every step: each claim, the episode it is keyed to (the last event in it), its status, its name staging (a name only once the
   screen has given it), and that nothing in it is a later reveal. Fix what is wrong; cut what no source supports.
2. Completeness: compare each person's steps with their real appearances across all eight episodes; add a missing part of their
   story. A step for every stretch that matters, none for a mention, a photo or reused footage.
3. Groups and names: groups as said on screen (never inferred from a place or a person; a logo is not a group); someone who turns on
   their group and dies in that scene keeps it. Name and description stages right.
4. New files and drops: re-test each against the rules in VQ_FILES.md (name said or shown on screen, lines, part; the one-episode
   rule with its family, spouse and boss exception). Re-test every drop; restore one that passes.
5. `keep_from_old`: every kept step's text must equal the old step exactly.
6. A retcon: when VisionQuest shows that someone thought dead in an earlier title lived (Raza in Iron Man), leave the earlier
   title's step as the viewer knew it then (the app does this for Coulson: Deceased in The Avengers, Active again later), and let the
   VisionQuest step show the survival.
Writing rules as in DRAFT.md. Validate with a short script.

Write chk_files_a.json or chk_files_b.json (matching your draft) in the same shape as the draft, plus "changes": one-line notes.
Do not edit any other file. Reply with one line: kept, fixed, added, cut.
