# Fact-check new files (independent; try to disprove every claim)

Another writer drafted files and Network ties for people a Marvel watch-tracker app had left out. You check every claim against
sources and correct what's wrong. Nothing in the draft is evidence: look each fact up yourself. Read DRAFT2.md in this folder first:
its rules are binding and you check against them too.

Your input: the draft (`outNN.json`) and the batch it was written from (`inNN.json`: title strings, Network names, example files).

Fandom wikis are blocking live requests: use each item's `page_file`, the saved pages in ../wv/cache, Wikipedia and the transcripts
(DRAFT2.md says where). A version of someone the app names elsewhere goes by that name (no name test for them).

## Check, for every file
1. Name: is the name said or shown on screen by the title it's first used in? (Credits don't count.) Staged right? If the person is
   never named on screen, move them to `dropped`.
2. Completeness: every title they're on screen in has a step (one per season for a multi-season show); no step for a title they're
   not on screen in.
3. Each step: true, right title string, right order, right status at its end, nothing from a later title, names only once said,
   right episode in `ep` (the LAST event's episode).
4. Group (`tm`): really their group, named on screen (or the app's existing name for it), staged at the right title, kept until the
   story moves them, the last stage where they really end up.
- A logo on someone's clothes is not their group (owner, 8 November 2026: Dennis the mailman is a Westview resident, not "Presto" because it's on his shirt). Go by how the story groups them.

5. A or T: the right index for what they do.
6. Each tie: true, right kind (the main through-line), right title, spoiler-safe, whoA/whoB the right way round (whoA = how B
   appears on A's card). Any important tie missing?
7. Writing rules: one sentence per step, about 130 characters at most, present tense, no em or en dashes, no actor names, none of
   the words "season", "episode", "finale", "credits", "flashback", "the film", "the show" inside a sentence.

## Sources
- Transcripts, to confirm a name is SAID: springfieldspringfield.co.uk. Films: find the slug with
  `https://www.springfieldspringfield.co.uk/movie_scripts.php?search=WORD`, then `.../movie_script.php?movie=SLUG`
  (Guardians of the Galaxy Vol. 3 is `guardians-of-the-galaxy-volume-3`). Shows:
  `https://www.springfieldspringfield.co.uk/view_episode_scripts.php?tv-show=SLUG&episode=s01e01` (find SLUG with
  `.../tv_episode_scripts.php?search=WORD`). Subtitles have no speaker names, so search the dialogue for the name. A name missing
  from the wiki's citations is NOT a reason to drop someone: check the transcript, and remember a name can also be SHOWN (a name
  tag, a file, a sign, a caption). Drop only when neither the dialogue nor anything shown gives the name.

## Re-check every drop
For each entry in the draft's `dropped`: if the person's name IS said or shown on screen (check the transcript), or they were
dropped only because a group file covers them (the owner decided each named member gets their own file and the group file stays),
write their file and ties in full and take them out of `dropped`.

## Output
Write `chkNN.json` (NN = the batch number) in this folder: the CORRECTED batch in exactly the draft's format ({"files", "ties",
"dropped"}), plus "changes": [{"page": "...", "where": "...", "was": "...", "now": "...", "why": "...", "source": "URL"}] listing
every change you made. Change only what a source shows is wrong; no rewording for style. Validate with a short Python script (same
checks as DRAFT.md). Reply with one line: files, changes, newly dropped.
