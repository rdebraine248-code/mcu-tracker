# Audit: where every hero and ally stands, title by title

The app (a Marvel watch tracker) has personnel files at the Avengers Compound: every hero, ally and supporting character, each following them
title by title. Each step is [one sentence, exact title, status], and the status is where they stand at the END of what the step describes:
"Active", "Off-world" (in space or another realm, alive), "Retired", "Fugitive", "Imprisoned", "Missing" (vanished: dusted in the Blip,
lost in the Quantum Realm, presumed dead), "Deceased".

The owner found Maria Rambeau still "Active" although WandaVision reveals she died of cancer during the Blip: her file simply stopped at
Captain Marvel. Audit every file in your input for that kind of mistake. Read RULES.md (writing rules) first.

Check, for every file:
1. Every step's status is right at the end of what that step describes.
2. A change in where they stand that a LATER title shows or reveals gets a step in that title, even when the person is only seen in a photo,
   a flashback, a funeral or memorial, or is only mentioned: died between titles and revealed dead later (Maria in WandaVision), killed off
   screen, imprisoned, freed, retired, came back.
3. The Blip: everyone dusted at the end of Avengers: Infinity War (on screen, or confirmed later) is "Missing" from the title that shows or
   confirms it (Infinity War itself for those dusted on screen; for example Ant-Man and the Wasp's mid-credits scene for Hope, Hank and Janet;
   Endgame for those it confirms), and is back in Avengers: Endgame with whatever status fits ("Active", "Off-world"...). Their Endgame step
   must exist. Only people the films or shows actually confirm as dusted; Wikipedia's "Blip" coverage helps.
4. Their status at their last step is right as of the latest released title (today is 2026-10-24; VisionQuest has aired episodes 1 to 4 only;
   skip unreleased titles).
5. Deaths are not undone by mistake: a Deceased person only comes back where a title really brings them back (or a variant, which is a
   different file and not your concern).

Rules for any step you add or change: exact title strings from alltitles.json (in this folder); one sentence, max ~130 characters, only facts
shown in that title, present tense; no em or en dashes; spoiler-safe (never reveal what a later title shows). One step per title unless the
status changes inside it; a multi-season show (Agents of S.H.I.E.L.D., What If...?, Agent Carter...) may have one step per season, each
starting "In season N,". Keep the steps in the file's own order (in-universe). Don't touch the other fields unless a fix needs it (a staged
team or kind may need a new stage, e.g. Maria's S.W.O.R.D.).

Accuracy is everything: check on Wikipedia (curl -s "https://en.wikipedia.org/w/index.php?title=<Page>&action=raw", pause ~1 s between
requests to avoid HTTP 429) whenever you're not certain. Don't change what's already right.

Output: write the file named in your task as {"replace": [<each changed file, complete, in the input's format and with its id unchanged>],
"notes": [{"id": "...", "change": "...", "why": "..."}]}. Only files you changed go in "replace". Validate with Python (titles exact, statuses
allowed, no dashes, every replaced id exists in your input). Report: how many files checked, how many changed, the 15 most important changes,
and anything you doubted.
