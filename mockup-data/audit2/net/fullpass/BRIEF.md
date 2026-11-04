# Network: every title makes sense on its own (the full pass)

A Marvel watch-tracker app's Network shows who knows whom, stage by stage. A tie appears once any title it has a stage in is watched.
The owner wants any single title, watched on its own, to give a Network that makes sense: everyone who deals with each other in it is
tied there. Your batch is grouped by title: for each `title`, a list of `pairs` (two people already tied, with the tie's `stages`)
who both appear in that title, though the tie has no stage there. A show's season is one title ("Daredevil S1"); a show without
seasons on file is one title for the whole show.

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/ns5/BRIEF.md first: its binding rules
(above all "Implied ties stay"), evidence rule, sources and house style apply. Read each title's plot (and for a season, its episode
summaries) once, then for every pair decide: do the two deal with each other in this title (a scene together, a call, one acting for
or against the other, a line that shows they know each other)? If yes, propose ONE stage for the moment that matters most between them
there. If they're both in it but never deal with each other (separate storylines, the same battle without an exchange, one only in a
vision or a mention), say none.

A stage's title: a film is its title; in a season, use the episode where it happens: "Title S2#3" (episode 3 of that season) for
season-titled shows, or for a show without seasons on file "Title#N" with N the running episode number. Kinds: family, partner,
friend, mentor, boss, ally, rival, enemy: the through-line between them from that title on, consistent with the tie's other stages
unless this title clearly turns it. Text says only what happens between the two in that title; nothing from a later title.

Kept on purpose, never touch: Avengers: Doomsday, Avengers: Secret Wars, Beyond the Spider-Verse and Daredevil: Born Again S3 are
unreleased placeholders; names the screen never says stay unless they give a later reveal away; Echo's ancestors seen in visions are
ties.

Output ONE JSON file: {"checked": <number of pairs>, "adds": [{"pair": "...", "kind": "...", "title": "...", "text": "...",
"on_a_card_about_b": "short line about b", "on_b_card_about_a": "short line about a", "evidence": "...", "source": "URL", "confidence":
"high|medium"}], "none": [{"pair": "...", "title": "...", "why": "..."}], "owner_calls": [...]}. New text: plain, present tense, one or
two sentences, no em dashes, no actor names, no "season/episode/finale/credits/the film/the show"; card lines short, the described
person not named first. Reply with ONE line: pairs checked, stages proposed, none, owner calls.
