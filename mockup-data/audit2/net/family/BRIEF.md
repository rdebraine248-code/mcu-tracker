# Network: family and partner ties missing a stage in a title where both appear

A Marvel watch-tracker app's Network shows who knows whom, stage by stage. A tie appears once any title it has a stage in is watched.
The owner watched only Hawkeye and found the Barton kids not tied to their parents: every Barton tie starts at Age of Ultron and none
has a Hawkeye stage, though the family is together in Hawkeye. Your batch is family and partner ties where both people appear in a
title (`titles_to_check`) that the tie has no stage for.

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/ns5/BRIEF.md first: its binding rules
(including "Implied ties stay"), evidence rule, sources and house style for text apply. For each pair and each title in
`titles_to_check`, check the sources: do the two deal with each other in that title (a scene together, a call, one acting for or
against the other)? If yes, propose a stage for it. If they're both in it but never deal with each other (separate storylines, a crowd
scene, one only mentioned), say no stage. Titles of shows: use the show's title with the episode where it happens: "Title#N" where N
is the show's running episode number, or for a season-titled show ("Title S2") "Title S2#N" with N the episode in that season. A film
is just its title.

Kinds: family, partner, friend, mentor, boss, ally, rival, enemy. The kind is the through-line between them from that title on: for a
family tie it's usually family; partner for a couple. Keep it consistent with the tie's other stages unless the title clearly turns it.

Output ONE JSON file: {"checked": [every pair], "adds": [{"pair": "...", "kind": "...", "title": "Title or Title#N", "text": "what
happens between them in that title", "on_a_card_about_b": "short line about b", "on_b_card_about_a": "short line about a", "evidence":
"...", "source": "URL", "confidence": "high|medium"}], "none": [{"pair": "...", "title": "...", "why": "..."}], "owner_calls": [...]}.
New text: plain, present tense, one or two sentences, no em dashes, no actor names, no "season/episode/finale/credits/the film/the
show"; card lines short, the described person not named first. Reply with ONE line: pairs checked, stages proposed, none, owner calls.
