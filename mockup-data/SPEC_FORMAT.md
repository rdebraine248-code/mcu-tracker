# Specimens for the Collection: every species and people, kept by the Collector

The app (a Marvel watch tracker) has the Collection, Taneleer Tivan's archive of every object. The Collector also keeps living specimens of
species, so the archive gets a new kind of case: specimens. Read COLL_FORMAT.md (the object format this mirrors), RULES.md and STAGES.md in
this folder first.

Output: a JSON array written to the file named in your task. One object per species or people:

{"id":"spec-skrull","n":"Skrull specimen","k":[["Green-skinned shape-shifters","Captain Marvel"]],"c":"specimens",
 "st":[["Refugee Skrulls hide on Earth from the Kree, and Carol Danvers takes them to find a new home.","Captain Marvel","Endangered","Skrullos"], ...]}

- id: "spec-" plus a lowercase-kebab name, with the universe prefix in front exactly like the other files: none for MCU films and Disney+
  shows, "st-" street-level, "sv-" Spider-Verse, "fox-" FoX-Men, "pr-" Pruned Timelines, "by-" Beyond the MCU (e.g. "by-spec-chronicom",
  "fox-spec-brood"). The same species in two universes is two files.
- n: "<Species> specimen", the species as the story names it at that point (staged if a title renames or reveals it; spoiler-safe).
- k: one short line (max ~60 chars): what they are, true at that point; may be staged.
- c: always "specimens".
- st: their story title by title. Each step: [one sentence, exact title, status, home]. Exact titles from alltitles.json. Order by the species'
  own story (in-universe). One sentence, max ~130 characters, present tense, only what that title shows.
  status at the END of the step: "Thriving" (numerous and secure), "Endangered" (few left, hunted, homeless, at war for survival),
  "Extinct" (wiped out, as far as the story shows; a later title can change it).
  home: their home world, realm or base as known at that point ("Hala", "Jotunheim", "Talokan", "Skrullos", "Nowhere" if they have none).
  One step per title unless the status or home changes inside it; multi-season shows one step per season at most, starting "In season N,".
  EVERY title the subject is on screen in gets a step (one per title, one per season of a show that runs several), with no cap on how many: the owner wants each file complete (appearance sweep, October 2026).

Who counts: every non-human species or people with a role on screen: aliens (Kree, Skrulls, Chitauri, Flora colossus, Sovereign, Kronans,
Xandarians, Zehoberei, Luphomoids, Celestials, Eternals and Deviants...), other realms' peoples (Frost Giants, Dark Elves, Asgardians, Fire
Demons, the Talokanil...), made races (Inhumans, Chronicoms, the Kree's Accusers? no, that's an order of people), creatures (the Abilisk,
Leviathans, symbiotes, vampires, the Brood, Sentinels? no, those are machines in the object files). Humans with powers (mutants) count as a
people in the FoX-Men only, as "Mutant specimen". Not single characters (Groot is a Flora colossus specimen, not a file), not machines, not
organizations.

Accuracy: be exact. Check on Wikipedia (curl -s "https://en.wikipedia.org/w/index.php?title=<Page>&action=raw", pause ~1 s between requests)
for anything you're not sure of; today is 2026-10-24, skip unreleased titles (VisionQuest has aired episodes 1 to 4 only). No em or en dashes.

Validate with Python: ids unique (also against every coll_*.json in this folder), titles exact, statuses allowed, home non-empty, no dashes,
staged lists in step order. Report: count, the 10 most notable, and doubts.
