# The Collection (the Collector's archive on Knowhere): every object

The app (an MCU watch tracker) has two indexes already: the Raft (every villain) and the Avengers Compound (every hero and ally). Each file
follows its subject title by title. Now the third: the Collector's archive, every object that matters. Read RULES.md (writing rules) and
STAGES.md (how staged values work) in this folder. Look at allies_mcu_a.json for the format this mirrors, and coll_existing.json for the
27 objects the archive already has (reuse their facts; rewrite them into this format).

Output: a JSON array written to the file named in your task. One object per object:

{"id":"tesseract","n":"The Tesseract","k":[["A cube of unknown power","Captain America: The First Avenger"],["Holds the Space Stone","Avengers: Infinity War"]],
 "c":"stones",
 "st":[["Red Skull takes the cube from a church in Tønsberg and powers HYDRA's weapons with it.","Captain America: The First Avenger","In use","HYDRA"],
       ["Howard Stark pulls it from the ocean while searching for Steve.","Captain America: The First Avenger","Secured","S.H.I.E.L.D."], ...]}

- id: lowercase-kebab, unique. Prefix by universe exactly like the villain and ally files: no prefix for MCU films and Disney+ shows; "st-" for
  the Netflix/Defenders world and the street-level shows (Daredevil, Jessica Jones, Luke Cage, Iron Fist, The Punisher, The Defenders,
  Daredevil: Born Again, Echo); "sv-" Spider-Verse; "fox-" FoX-Men; "pr-" Pruned Timelines; "by-" Beyond the MCU (Agents of S.H.I.E.L.D.,
  Agent Carter, What If...?, Marvel Zombies...). The same object in two universes is two files (Tobey's web-shooters are not Tom's).
  Keep the ids from coll_existing.json for the MCU ones; the non-MCU ones there get their prefix (claws becomes fox-claws, bladesword pr-bladesword,
  billyclub st-billyclub).
- n: the object's name as the story knows it at that point, staged when a title renames or reveals it (the Orb is only the Power Stone once a title
  says so; the Aether becomes the Reality Stone). Spoiler-safe: never a name before the title that gives it.
- k: one short line (max ~60 chars), what it is, true at that point; may be staged.
- c: one category: "stones" (Infinity Stones and what holds them: gauntlets, the Tesseract, the Scepter), "weapons", "armor" (suits, armor, costumes
  that are gear), "tech" (devices, AI, gadgets, machines), "mystic" (magic relics, books, talismans, enchanted things), "substances" (serums,
  particles, mists, elements, metals like vibranium), "vehicles" (ships, jets, cars, the Helicarrier), "keepsakes" (personal things with a story:
  the Awesome Mix, Cap's compass, a photo, a letter).
- cam: 1 if every appearance is a brief cameo or easter egg (Cap's shield on Tony's workbench in Iron Man 2); omit otherwise.
- st: the chain of custody. Each step: [one sentence, exact title, status, holder]. Titles must be exact strings from alltitles.json. Order by the
  object's own story (in-universe). One sentence, max ~130 characters, only facts shown in that title.
  status at the END of what the step describes: "In use" (wielded, worn, carried, running, flown), "Secured" (kept safe or locked away: a vault,
  a museum, the Collector's cases, an archive, hidden by its keeper), "Lost" (nobody knows where it is, or it's adrift), "Destroyed".
  holder: who has it at the end of the step, a short display name as the story knows them at that point (spoiler-safe: "Spider-Man" before his name
  is out, never a hidden identity), or a group ("S.H.I.E.L.D.", "HYDRA", "The TVA"), or "Nobody".
  ONE STEP PER TITLE: a title gets a second step only when the status or the holder changes inside it. A title that runs several seasons
  (Agents of S.H.I.E.L.D., What If...?, Agent Carter...) may have one step per season, each sentence starting "In season N,".
  EVERY title the subject is on screen in gets a step (one per title, one per season of a show that runs several), with no cap on how many: the owner wants each file complete (appearance sweep, October 2026).

Who counts: every named or clearly identifiable object with a role in a title: the Infinity Stones and gauntlets; signature weapons (Mjolnir,
Hawkeye's bow, Black Widow's batons, the Ten Rings, Killmonger's...); suits and armor (one file per character's line of suits, e.g. "Iron Man's
armor", plus a separate file for a suit with its own story: the Hulkbuster, the Iron Spider, War Machine); tech (devices and machines: E.D.I.T.H., the
time-travel GPS, the Quantum Tunnel, the cradle that builds Vision's body); mystic relics (the Darkhold, the Book of Vishanti, the Cloak of Levitation, Moon Knight's scarab); substances (the
super soldier serum, Terrigen, Pym Particles, the Heart-Shaped Herb, vibranium); vehicles (the Milano, the Benatar, the Quinjet, the
Helicarrier, Zephyr One, the Bus, the Statesman, Sanctuary II); keepsakes (Peter Quill's Walkman and tapes, Cap's compass with Peggy's photo).
Cameos and easter eggs count, flagged cam:1. Not places, not people or AIs that are characters (Vision, F.R.I.D.A.Y.), not generic guns or
unnamed props, not buildings.

Accuracy: be exact. Use Wikipedia (curl -s "https://en.wikipedia.org/w/index.php?title=<Page>&action=raw", pause ~1 s between requests to avoid
HTTP 429) and the Marvel Cinematic Universe Wiki pages via WebSearch for anything you're not sure of, especially 2025-2026 titles (today is
2026-10-24; skip unreleased titles; VisionQuest has aired episodes 1-4 only). No em dashes or en dashes anywhere in text you write (exact title
strings are fine as they are). Spoiler-safe naming as above.

Validate with Python: ids unique (also against the other coll_*.json files already written in this folder, except coll_existing.json), titles
exact, categories and statuses allowed, holder non-empty, no dashes, staged lists in step order, no two adjacent steps with the same title,
status and holder. Report: count per category, one line per 10 most notable files, and doubts.
