# Personnel files (the Avengers Compound): heroes, allies and support

The app (an MCU watch tracker) already has the Raft: a registry of every villain, each file following them title by title. Now we're building its
counterpart at the Avengers Compound: every hero, ally and supporting character. Read RULES.md (writing rules) and STAGES.md (how staged values work)
in this folder too. Look at fc_mcu_a_out2.json for the villain format this mirrors.

Output: a JSON array written to the file named in your task. One object per person (or team, when they act as a unit and aren't individually distinct):

{"id":"pepper-potts","n":"Pepper Potts","k":[["Tony Stark's assistant","Iron Man"],["CEO of Stark Industries","Iron Man 2"]],
 "tm":[["Stark Industries","Iron Man"],["The Avengers","Avengers: Endgame"]], "em":"arc",
 "st":[["Pepper keeps Tony's life running and helps him expose Obadiah Stane.","Iron Man","Active"], ...]}

- id: lowercase-kebab, unique. Prefix by universe, like the villain files: no prefix for MCU films and Disney+ shows; "st-" for the Netflix/Defenders
  world and the street-level shows (Daredevil, Jessica Jones, Luke Cage, Iron Fist, The Punisher, The Defenders, Daredevil: Born Again, Echo);
  "sv-" Spider-Verse (Sony, Raimi, Webb, the animated Spider-Man series, Spider-Verse films, Spider-Noir); "fox-" FoX-Men (Fox X-Men films and the X-Men
  animated series, Deadpool); "pr-" Pruned Timelines (older Fantastic Four, Blade, Daredevil, Elektra, Punisher, Inhumans, Runaways, Cloak & Dagger...);
  "by-" Beyond the MCU (Agents of S.H.I.E.L.D., Agent Carter, What If...?, Marvel Zombies...). If the same character exists in two universes as
  different versions (Tobey's Peter vs Tom's Peter), they're separate files with their own prefix.
- n: the name as known when first met. A secret identity stays secret: stage it [[name, title], ...] so the real name only shows from the title that
  reveals it (e.g. Spider-Man's identity, the Winter Soldier, Ironheart). Use the name the story uses at that point.
- k: one short line (max ~60 chars), who they are, true at that point; may be staged.
- tm: their team or organization at each point, staged: "The Avengers", "S.H.I.E.L.D.", "Guardians of the Galaxy", "The Defenders", "Wakanda",
  "Masters of the Mystic Arts", "Asgard", "The Thunderbolts", "New Avengers", "The Fantastic Four", "The X-Men", "X-Force", "The TVA", "Stark Industries",
  "The Ravagers", "Nova Corps", "The Eternals", "Young Avengers", "Spider-Society", "Damage Control", "S.W.O.R.D.", "Independent" for no team, or another
  name when none of these fits. Use exactly these spellings when they apply.
- em (optional): an insignia key, only when it's clearly theirs: avengers arc shield mjolnir hourglass hawkeye gamma eagle hala antman starlord spider
  claws agamotto mind redstar loki bolt four dd rings kamala defenders skull eternals moon bloodstone watcher verse xmen tva
- rf (optional): if this person also has a villain file at the Raft (e.g. Bucky as the Winter Soldier, Nebula, Yelena, Loki), the id of that file.
  Search every fc_*_out2.json, pass3_patch.json and cameo_*.json for it.
- cam: 1 if every appearance of this person is a cameo (on screen briefly, outside their own story); omit otherwise.
- st: the service record. Each step: [one sentence, exact title, status]. Titles must be exact strings from alltitles.json. Order by the character's
  own story (in-universe). One sentence each, max ~130 characters, only facts from that title. EVERY title the subject is on screen in gets a step (one per title, one per season of a show that runs several), with no cap on how many: the owner wants each file complete (appearance sweep, October 2026).
  The status is where they stand at the END of what that step describes:
  "Active" (in the field, working, on the team), "Off-world" (in space or another realm, alive), "Retired" (stepped away, at peace),
  "Fugitive" (wanted by the authorities, e.g. Cap's team after Civil War), "Imprisoned" (held: the Raft, a cell, a captive), "Missing" (vanished, e.g.
  dusted in the Blip until Endgame, lost in the Quantum Realm, presumed dead), "Deceased".

Who counts: every named hero, ally and supporting character with a role (friends, family, staff, agents, mentors: Pepper, Happy, May, Wong, Shuri,
Okoye, Maria Hill, Coulson, Sharon Carter, Foggy, Karen, Claire Temple...), plus cameos (named or clearly identifiable heroes/allies on screen briefly:
credits scenes, the Endgame battle and funeral, the Illuminati, the Void heroes in Deadpool & Wolverine, crossovers into another hero's title), flagged
"cam":1 when that's all they are. Not nameless extras, and not characters only mentioned. Villains who become allies get a file here too (with rf),
starting from the point they're on the heroes' side or from their first appearance if they're ambiguous; keep it about them as allies.

Accuracy: be exact. Use Wikipedia (curl -s "https://en.wikipedia.org/w/index.php?title=<Page>&action=raw", pause ~1 s between requests to avoid
HTTP 429) for anything you're not sure of, especially 2025-2026 titles (today is 2026-10-24; skip unreleased titles; VisionQuest has aired episodes
1-4 only). No em dashes or en dashes anywhere in text you write (exact title strings are fine as they are). Spoiler-safe naming as above.

Validate with Python: ids unique (also against the other allies_*.json files already written in this folder), titles exact, statuses allowed, no
dashes, staged lists in step order. Report: count, one line per 10 most notable files, and doubts.
