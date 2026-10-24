# Organizations: every group gets a file, in the Raft or the Compound

The app (a Marvel watch tracker) has two indexes: the Raft (every villain, each file following them title by title) and the Avengers Compound
(every hero and ally). Some groups already have their own file because they act as one (the Hand, the Flag Smashers, the Tracksuit Mafia, the
Watchdogs, Leviathan, the Howling Commandos), but the biggest ones don't (HYDRA, S.H.I.E.L.D., the TVA, the Ravagers, the Red Room...). Fix
that: every organization that matters on screen gets one file. Villainous groups go to the Raft, heroic or neutral ones to the Compound.
Read ../next/RULES.md and ../next/STAGES.md first.

Inputs in this folder: org_threats_<u>.json (the Raft's files for your universes), org_allies_<u>.json (the Compound's), and allies_*.json /
teams_*.json (ids and team names, for opposers). Look at both before adding anything: if a group already has a file, don't make a second one;
if its file misses titles, list the fix (see output).

What matters most, because it is easy to miss: organizations recur. HYDRA runs from The First Avenger through The Winter Soldier, Age of
Ultron, Agents of S.H.I.E.L.D. and The Falcon and the Winter Soldier; S.H.I.E.L.D. falls and rises; the Ten Rings span Iron Man to Shang-Chi.
Follow each group through EVERY title where it acts or is shown to act, including small but real appearances (a HYDRA cell in Age of Ultron's
opening, the Ten Rings in Iron Man and Iron Man 3's one-shot). Check every title in alltitles.json (../next/alltitles.json) for each group.

Raft file (villainous groups):
{"id":"hydra","n":"HYDRA","k":[["The Nazis' deep science division","Captain America: The First Avenger"],["A secret order inside S.H.I.E.L.D.","Captain America: The Winter Soldier"]],
 "cl":"Global","grp":1,
 "opp":[["steve-rogers","Captain America: The First Avenger"],["team:S.H.I.E.L.D.","Captain America: The Winter Soldier"]],
 "st":[["HYDRA breaks from the Nazis under Red Skull and builds weapons powered by the Tesseract.","Captain America: The First Avenger","Active"], ...]}
- cl: threat class (Street, City, Global, Cosmic, Multiversal), may be staged. grp: 1 (marks a group file).
- opp: who stood against the group, as in OPP_FORMAT.md in this folder: ally ids from your allies files or "team:<exact team name>".
- status per step, as the group stands at the end of it: "Active" (operating openly or at full strength), "At large" (driven underground,
  hunted, but operating), "In custody" (broken up, its leaders arrested), "Missing" (vanished), "Allied" (gone over to the heroes),
  "Deceased" (destroyed or disbanded for good; a later title can bring it back).
Compound file (heroic or neutral groups):
{"id":"shield","n":"S.H.I.E.L.D.","k":"The world's spy agency","tm":"S.H.I.E.L.D.","grp":1,
 "st":[["Peggy Carter and Howard Stark found S.H.I.E.L.D. after the war.","Captain America: The First Avenger","Active"], ...]}
- tm: the group's own team name, exactly as the Compound's files spell it (see teams_*.json), so the group's file and its team are one thing.
- status: "Active", "Off-world", "Retired" (disbanded peacefully), "Fugitive" (outlawed, operating in hiding), "Imprisoned" (members held),
  "Missing", "Deceased" (destroyed).
A group that changes sides keeps one file, in the index of what it mostly is, and its status says when it changes (Allied, or Fugitive...).
Common ids: no prefix MCU, "st-" street-level, "by-" Beyond, "sv-" Spider-Verse, "fox-" FoX-Men, "pr-" Pruned. The same group in another
universe is another file.
Steps: [one sentence, exact title, status]; in-universe order; max ~130 characters; present tense; only what that title shows; one step per
title unless the status changes inside it; multi-season shows one step per season, "In season N,". No em or en dashes. Spoiler-safe naming
(stage n or k where a title reveals something, e.g. HYDRA inside S.H.I.E.L.D. only from The Winter Soldier).

Output: write the file named in your task: {"raft": [new Raft files], "compound": [new Compound files], "fixes": [{"id": existing id,
"add_steps": [[sentence, title, status], ...], "why": "..."}]}. Validate with Python (ids unique against all inputs, titles exact, statuses
allowed, opp refs valid, no dashes). Accuracy first: check Wikipedia (curl -s "https://en.wikipedia.org/w/index.php?title=<Page>&action=raw",
pause ~1 s between requests). Today is 2026-10-24; skip unreleased titles. Report: the groups added (Raft / Compound), fixes, and doubts.
