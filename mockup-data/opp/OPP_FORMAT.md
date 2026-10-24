# The Raft's "Opposed by": every hero and team who stands against each villain

The app (a Marvel watch tracker) has two indexes that should talk to each other: the Raft (every villain) and the Avengers Compound (every
hero and ally, with their teams). Today each villain has one "Opposed by" string, which reads as if they had one enemy and doesn't link to
anyone's file. Replace it with a list of references to the Compound's own files and teams.

Input files in this folder (one set per universe):
- threats_<u>.json: the villains: id, name n (may be staged [[name, title], ...]), kind k, the old single "op" (a hint only), and st: their steps
  [sentence, exact title, status].
- allies_<u>.json: the heroes and allies: id, name n, kind k, teams tm, and the titles they appear in.
- teams_<u>.json: every team name used in that universe's ally files.

Output: a JSON object written to the file named in your task: { "<threat id>": [[ref, title], ...], ... } with EVERY threat id in your
input as a key.
- ref is either an ally id from your allies files, or "team:<name>" with a team name copied exactly from your teams files.
- title is the exact title where that opposer first stands against this villain. It must be one of the titles in this villain's own steps.
- Order the list by that title's place in the villain's steps, then by importance.
- Who counts: a hero or team who actively opposes the villain on screen in that title: fights them, hunts them, arrests or defeats them,
  thwarts their plan, or is their target and fights back. Use individuals for the people with a real part against them (Steve, Tony,
  Natasha against Loki in The Avengers). Add a team ref as well when the team acts as a unit against them (team:The Avengers against Ultron).
  Allies who only stand nearby don't count. Usually 1 to 6 refs, more only for the big villains (Thanos, Ultron, Loki).
- A villain opposed only by other villains, or by nobody with a Compound file, gets an empty list [].
- Universe: only refs from your own allies and teams files. The same name in another universe is a different file (Tobey's Peter is not
  Tom's), so never reach across.
- Accuracy matters most: only what happens on screen in that title. Check anything you're unsure of on Wikipedia
  (curl -s "https://en.wikipedia.org/w/index.php?title=<Page>&action=raw", pause ~1 s between requests to avoid HTTP 429).

Validate with Python: every threat id present, every ref is an id in your allies files or "team:" + an exact name in your teams files, every
title is one of that villain's step titles, no duplicate refs in a list. Report: how many villains, how many refs, how many empty lists
(and which), and anything you doubted.
