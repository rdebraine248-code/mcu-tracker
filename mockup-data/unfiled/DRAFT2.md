# Write files for people the app left out (the other universes)

A Marvel watch-tracker app ("S.H.I.E.L.D. datapad") has a file for every character, in two indexes: the Compound (heroes, allies,
family, staff, bystanders: tag "A") and the Raft (threats, people who work against the heroes: tag "T"), plus a Network of
connections between people. The people in your batch were left out. Write each one's file and their Network ties.

## Input (your batch file)
- `people`: `page` (their MCU wiki page), `name`, `titles` (titles they're credited in), `side` (a first guess: hero, villain,
  neither), `why` (what a reviewer says they do on screen).
- `titles`: for each title: `title_strings` (the ONLY title strings you may use, exactly), `network_people` (everyone the app has in
  that title, by their Network name), `groups_in_app` (group names the app already uses there), `example_files` (two existing files
  from that title: copy their conventions for ids, title strings, "In season N," prefixes, staged fields, length and tone).

## This run: the other universes
The people are in the Spider-Verse (ids "sv-"), the FoX-Men ("fox-"), the Pruned timelines ("pr-") or Beyond ("by-"): each item's
`uni` says which. Use the prefix and id style of the example files from the same title (a cartoon version: "sv-...-1994",
"fox-anim-..."; a What If version: as that episode's other files are named). Owner rules for this run:
- **What If...? episodes are short films:** each episode is its own story; a version's file covers what they do in that episode.
- **A version of someone the app names elsewhere goes by that name** (a What If Ramonda is "Ramonda"; a cartoon Flash Thompson is
  "Flash Thompson"): no name test for them. The name test applies in full to people who exist only in this universe.
- **The wikis (fandom) are blocking live requests.** Each item has `page_file`: the person's full wiki page, saved earlier. Title
  pages (plots, cast lists) are saved in /tmp/claude-0/-home-user-mcu-tracker/13e06574-b05a-50ee-830d-59d89dc2d0d9/scratchpad/wv/cache
  (JSON with parse.wikitext; `mm_` = Marvel Movies wiki, `md_` = Marvel Database with its episode pages, no prefix = MCU wiki):
  grep them. Wikipedia and the transcripts still work. Don't call the fandom wikis.

## Sources (look everything up; never write from memory)
- MCU wiki API: `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json&redirects=1`
  (the person's page; episode pages for plots and who says what).
- Wikipedia raw: `https://en.wikipedia.org/w/index.php?title=PAGE&action=raw` (episode lists and plots; pause 1 s between calls).
- Transcripts, to confirm a name is SAID: springfieldspringfield.co.uk. Films: find the slug with
  `https://www.springfieldspringfield.co.uk/movie_scripts.php?search=WORD`, then `.../movie_script.php?movie=SLUG`
  (Guardians of the Galaxy Vol. 3 is `guardians-of-the-galaxy-volume-3`). Shows:
  `https://www.springfieldspringfield.co.uk/view_episode_scripts.php?tv-show=SLUG&episode=s01e01` (find SLUG with
  `.../tv_episode_scripts.php?search=WORD`). Subtitles have no speaker names, so search the dialogue for the name. A name missing
  from the wiki's citations is NOT a reason to drop someone: check the transcript, and remember a name can also be SHOWN (a name
  tag, a file, a sign, a caption). Drop only when neither the dialogue nor anything shown gives the name.
- curl with `-A 'mcu-tracker-research/1.0'`. Never send any personal details anywhere. Keep downloads in a folder named
  `work_NN` (your batch number) next to your batch file.

## First: does this person qualify? (the owner's rule, binding)
A file needs a NAME THE STORY USES (said or shown on screen; the credits don't count), lines, and a part in the plot. If the screen
never says or shows their name, DROP them (example: Cameron Klein is only named in the credits, so he is out). Also drop anyone
the app already has under another name (check `network_people`: "Mack" is Alphonso Mackenzie). Put each drop in `dropped` with why.
A group file that already covers them (The Howling Commandos, The Warriors Three, The Hood's Crew, Sarge's Crew, The Wrecking Crew,
The Monster Hunters and the like) is NOT a reason to drop: the owner decided each named member gets their own file and the group
file stays (8 November 2026).

## The file (binding rules from the owner's handoff)
- `id`: lowercase-kebab, unique; use the prefix the example files from that show use (e.g. "st-" for the Netflix and ABC shows).
- `n`: the name as the story uses it at that point. A name first said in a later title or episode is staged:
  [["Agatha's mother", "WandaVision"], ["Evanora Harkness", "Agatha All Along#6"]] ("Title#N" = from episode N of that title).
  A secret identity stays secret until the reveal.
- `k`: one short line (about 60 characters), who they are, true at that point; may be staged the same way.
- `tm`: their group at each point, staged [[group, title], ...] or a plain string. Groups record everyone who served a group,
  willingly or not (brainwashed, forced and undercover service count). Any organization counts: agencies, armies, companies, crews,
  an employer (a newspaper, a law firm, a hospital, a school they attend or work at, a band). A captive, a victim, a one-job hire
  or an ally doesn't count. A person stays in a group until the story moves them (quit, fired, the group ends, they turn on it,
  they join another). Death is not a departure. A group's name is the one SAID OR SHOWN ON SCREEN; use the app's existing name from
  `groups_in_app` when it's the same group (spell it exactly). Fan wikis invent labels: if the screen never names a group, use
  "Independent" and say so in `notes`. Never infer a group from a place or a person. Key a stage to the season's own title string
  where the show uses season titles.
- `st`: the service record. One step per title they are ON SCREEN in (every title, no cap, including titles not in `titles` if
  they appear there; one per season for a multi-season show), in the person's own story order: [sentence, exact title string,
  status]. Copy how the example files from that show title their steps and use "In season N," at the start where they do.
  One sentence, about 130 characters at most, present tense, only facts from that title, what THEY do. No em or en dashes. No actor
  names. Never the words "season", "episode", "finale", "credits", "flashback", "the film" or "the show" inside a sentence (an
  "In season N," at the very start is data). Spoiler-safe: only what a viewer knows by that title; use names only once said.
- Status at the END of what the step describes. Compound: Active, Off-world, Retired, Fugitive, Imprisoned, Missing, Deceased.
  Raft: Active, In custody, Captive, At large, Missing, Allied, Deceased.
- Raft files also need `cl` (Street, City, Global, Cosmic or Multiversal: their threat level), `op` (the main hero who opposes them,
  by name) and `opp`: [[hero id, title], ...] using ids from the example files or `network_people` (write the id as the example
  files do; if unsure, write the name and the build will match it).
- A/T: a hero file for allies, family, staff, bystanders and victims; a Raft file for anyone who works against the heroes. A person
  who changes sides gets the file for the side they spend most time on, and says the change in the steps.
- `ep`: for each step in a show, the episode its LAST event happens in: {"Title string|i": N}, where i counts that file's steps with
  that title string from 0, and N is the episode number within that title string (within the season when the title string is a
  season; across the whole show when the title string is the show itself, as "Agents of S.H.I.E.L.D." is). Films: none.

- A logo on someone's clothes is not their group (owner, 8 November 2026: Dennis the mailman is a Westview resident, not "Presto" because it's on his shirt). Go by how the story groups them.

## Network ties
For each person, their real connections: everyone they share real screen time and a relationship with (usually 2 to 6), to people
in `network_people` (use that exact name) or to others in your batch. `kind` is the MAIN THROUGH-LINE across everything they share:
family, partner (romance or marriage that defines their story), friend (a personal bond), mentor, boss (one leads, employs or
commands the other), ally (they work together), rival, enemy. Allies most of the time and enemies briefly is ally; enemies who team
up once is enemy. One stage per title they share: `text` recaps what they share there in two or three plain sentences with names
and turns; `whoA` (short, under about 70 characters) is how B appears on A's card; `whoB` is how A appears on B's card; `ep` the
episode number (as above) or null for a film. Same writing rules: no dashes, no spoilers, names only once said.

## Output
Write ONE JSON file at your output path:
{"files": [{"page": "...", "tg": "A|T", "add": {...the file...}, "ep": {...}, "notes": "anything uncertain"}],
 "ties": [{"a": "Name", "b": "Name", "stages": [{"kind": "...", "title": "...", "text": "...", "whoA": "...", "whoB": "...", "ep": N|null}]}],
 "dropped": [{"page": "...", "why": "..."}]}
`a` is always the new person (their `n`, the final name). Validate with a short Python script before you finish: ids unique, every
title string in `title_strings`, statuses allowed, no em or en dashes, no banned words, sentences under about 135 characters, every
tie name in `network_people` or in your batch. Work person by person from sources; no script writes any sentence for you.
Reply with one line: files written, ties, dropped.
