# MCU Tracker: handoff

A Marvel watch tracker, built as a single-file PWA (a "S.H.I.E.L.D. datapad"). This page is everything a new chat needs to pick up the
work. **Read all of it before changing anything, above all "Standing rules from the owner" and "Mistakes not to repeat".**

## Starting a new chat

Paste this as the first message:

> Work on the repo `rdebraine248-code/mcu-tracker`, branch `ccr-9703a988-d86jbb`. Before doing anything, read `HANDOFF.md` on that
> branch in full and follow it, especially "Standing rules from the owner" and "Mistakes not to repeat". Ask me with options when
> something is mine to decide or you're unsure, and never push without my go-ahead.

## What the owner cares about

- **Accuracy first.** Every fact must hold up on screen. Verify it yourself against sources rather than asking the owner, and follow a fix
  through to every place it applies.
- **Completeness.** The indexes are meant to be a complete repository: "I could go to look up anything about anyone."
- **Consistency.** The same person, group or rule reads the same everywhere (hero and villain files, logs, boxes, Paths).
- **Intentional design.** Every visual element needs a reason for its shape and spacing ("proportion, intentionality, character").
- **Being asked, not surprised.** Questions come with clear options and a recommendation. Pushes wait for an explicit yes.

## Where things live

- **Repo:** `rdebraine248-code/mcu-tracker`.
- **`main`:** the built app that people use: `index.html` (every placeholder filled), `sw.js`, `manifest.webmanifest` and the icons. Nothing
  else goes on main.
- **Working branch `ccr-9703a988-d86jbb`** (it carries on from `ccr-260b58ec-boqbta`): the source. It holds `index.html` with its data
  placeholders still empty, `mockup-data/` (all the data, the build scripts and the tests) and this file. **Check this branch out**, not
  main. After every push to main it's synced with `git merge -s ours origin/main`, which keeps the source and records main's history.
- Helper scripts written during a session (agent briefs, change appliers, the faction builder) live in that session's scratchpad and are
  gone afterwards. Everything they produced is in the repo: `audit_fix.json`, `raft_teams.json`, `index.html` and the audit records.

## Build and push

All commands run from `mockup-data/`. Everything they write goes to `mockup-data/out/`, which is git-ignored.

```sh
# main: turns the mockup switch off, then fills the data in
python3 mainprep.py out/main_src.html && SRC=out/main_src.html python3 devbuild.py out/main.html
# the test build, for mockups only: everything watched, a "Test · start from" picker, a note card
python3 build_tb.py "what this test build is for"          # -> out/datapad-test.html
```

- `devbuild.py` reads `/home/user/mcu-tracker/index.html`, or `SRC=...` if set, and fills in the placeholders: `/*THREATS*/`,
  `/*ALLIES*/`, `/*COLLX*/`, `/*EPS*/`, `/*EPN*/`, `/*EPO*/`, `/*NEWSX*/`, `/*COMMSX*/`, `/*SRCX*/` and `/*IDMOVE*/`. A build that prints
  `audit: no step`, `audit: no file` or `raft factions: no file` has a broken op: fix it before going on.
- **Pushing main** (only with the owner's explicit go-ahead, every time):
  1. `git worktree add --detach <dir> origin/main`.
  2. Copy `out/main.html` over its `index.html`, commit and `git push origin HEAD:main`. Remove the worktree.
  3. Back on the working branch, run `git merge -s ours origin/main` and push the branch.
  4. Check: `cmp <(git show origin/main:index.html) mockup-data/out/main.html` prints nothing.
- **The mockup switch:** `const MOCK = true;` near the top of the script, with `body.mock` for CSS. `mainprep.py` flips it to false for
  main and asserts that it's there. Mockups hang off this switch. None are pending.
- **The published test build** is an artifact at https://claude.ai/artifact/FpzxqjpMT8r7jSvb69mNKu. It's at v40 (the Raft organization
  mockup), which is behind main. Only republish it when the owner asks for a mockup.

### Tests

The tests are in `mockup-data/tests/`. They use the Playwright in `/opt/node22/lib/node_modules/playwright` and Chromium at
`/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`; adjust those paths if the environment differs.

```sh
rm -rf out/root && mkdir -p out/root && cp out/main.html out/root/index.html && cp ../*.png ../manifest.webmanifest ../sw.js out/root/
export ROOT=$PWD/out/root                                                            # feat.js fails without it
for s in check smoke feat; do node tests/$s.js; done                                 # the app at $ROOT
for s in ct32 ct36 ct37b ct38 ct39 ct40 ct41 ct42 ct43 ct44 ct45 ct46 ct47 ct48 ct49 ct50 ct51 ct52; do node tests/$s.js $ROOT/index.html; done
node tests/ct35.js                                                                   # test build only (out/datapad-test.html)
```

| Test | Covers |
|---|---|
| ct32 | The Collection |
| ct35 | Specimens and Comms messages (test build) |
| ct36 | Organizations and group files |
| ct37b | Chapter names revealed by watching |
| ct38 | The chapter fold and its save migration |
| ct39 | Level milestones |
| ct40 | No level-up pill and no XP line |
| ct41 | Ids moved from Beyond to MCU |
| ct42 | Chapters 3 to 6 reorganized, and "Completed" once ever, with an old save |
| ct43 | X-Men '97 and I Am Groot seasons in release order only |
| ct44 | The episodes link follows its checkmark |
| ct45 | A chapter's Period from what you've watched; read marks kept |
| ct46 | Nick Fury and S.H.I.E.L.D. as two boxes, from a full old save |
| ct47 | Seasons shown with the title, never in the sentence |
| ct48 | Agents of S.H.I.E.L.D. S6 and S7 as two titles, from an old save |
| ct49 | Factions: staging, roster and group file, grouping, current and Former, the link back |
| ct50 | Opening an index starts at the top; backing out of a file keeps the list's place |
| ct51 | The Sort switch: First seen or A to Z, one setting for the three indexes |
| ct52 | Universe tabs named by the Sacred Timeline's rule; holding the Incursions line marks them all; the Doom egg stays on Doomsday's title |

A failing test must stop a push. Don't pipe test output through `tail`, which hides the exit code. Test pages are served as
`text/html; charset=utf-8`, or the text comes out garbled. Screenshots after marking many titles watched: wait about 9 seconds, or the
insignia celebration covers the page.

## Data (mockup-data/)

- **Format briefs.** Read the brief before editing its files.
  - `ALLIES_FORMAT.md`: the Compound (heroes).
  - `COLL_FORMAT.md`: Collection objects.
  - `SPEC_FORMAT.md`: specimens.
  - `CUSTODY_FORMAT.md`: chain-of-custody rules.
  - `AUDIT_FORMAT.md`: the status audit.
  - `opp/OPP_FORMAT.md`: who opposed each villain.
  - `opp/ORG_FORMAT.md`: organizations.
- **The Raft (villains):** the `fc_*_out2.json` files, then `cameo_*`, `stages_*` and the opp files.
- **The Compound (heroes):** the `allies_*.json` files. The `allies_zz_*` files are patches applied in order: patch, patch2, patch3,
  patch4, zaudit, zzfix.
- **The Collection:** the `coll_*.json` files. `coll_spec_*` are the specimens. `coll_existing.json` is the old list, kept for reference
  only.
- **`audit_fix.json`: every later change to a Raft, Compound or Collection file.** Lists `T` (Raft), `A` (Compound), `C` (Collection) and
  `idmove`. `devbuild.py` applies them in order, just before the ABC move, so each op is keyed to the data as the ops before it leave it.
  - An op names its source in `f`. `id` is a file id, or a list (the MCU file first, then the show's file that merges into it).
  - `old` is a run of steps that must match exactly and `new` replaces it (an empty `new` deletes). `set` replaces fields (null removes
    one). `add` is a new file. `drop: true` removes a file. `idmove` sends a dropped file's saved marks to another id.
  - To change a file, append an op at the end of its list rather than editing the source files under it.
  - It holds, in order: the lore audit, the owner's decisions on the medium findings, the second sweep, the team-file removals, Area 55,
    and every hero file's teams from the faction work (completeness sweep, re-check, hand fixes) and the Raft group-file flags.
- **`raft_teams.json`: every villain's factions**, id to staged `tm`, read by `devbuild.py` after the ABC move (final ids). Group files
  carry their own name. To change a villain's factions, edit its entry: stages in story order, each keyed to the title that shows it,
  the last one where they stand at the end of the file.
- **The audit records:**
  - `audit_findings.json`: the lore audit, F001 to F705, each with its fix, source and status, all settled. `recheck` and `verify` hold
    the two later passes, `lead` the reviewer leads (R1 to R5, decided), `extra` D1 and D2. The 8 entries in `aside` are VisionQuest's.
    Report page: https://claude.ai/artifact/3bB2MxjEMd9mwbv64yWHt4.
  - `audit_sweep.json`: the second sweep and the team-file review with the owner's decision on each (`owner`).
  - `raft_teams_src.json`: the first faction sweep (the Raft's 54 group files), one entry per membership with its source; dropped
    ones are marked with why.
  - `factions_sweep.json`: the completeness sweep (every organization anyone served, with sources), the name map, the hand fixes,
    and `recheck`: the independent pass over all 1,042 claims, with every flag and what changed.
  - Log and timeline fixes went straight into `index.html` (DATA, DOSSIERS, SAGA).
- **Organizations:** `opp/org_*.json`. Villainous groups go to the Raft, heroic ones to the Compound. Group files carry `grp:1`.
- **Ids:** a prefix says the universe tab: none for MCU, `st-` for street-level (also on the MCU tab), `by-` Beyond, `sv-` Spider-Verse,
  `fox-` FoX-Men, `pr-` Pruned.
- **Steps:** `[sentence, exact title, status(, holder or home)]`, in in-universe order.
  - One step per title, unless the status or the fourth field changes inside it.
  - Multi-season shows get one step per season, starting "In season N," in the data. The app hides that phrase and shows the season
    with the title. A scene from the past reads "In season 2, in 1945, ..." and sorts by its year.
  - Titles must match `alltitles.json` exactly.
- **Staged fields:** `n`, `k`, `tm` (and a villain's `cl`) are a string or a list of `[value, title]`; the app shows the last stage whose
  title is watched. Key a stage to a season's own title ("Agents of S.H.I.E.L.D. S3"), never the whole show. Each value must stay true
  until the next stage takes over, and the last one to the end of the file.
- **Statuses:**
  - Raft: Active, In custody, Captive, At large, Missing, Allied, Deceased.
  - Compound: Active, Off-world, Retired, Fugitive, Imprisoned, Missing, Deceased.
  - Collection: In use, Secured, Lost, Destroyed.
  - Specimens: Thriving, Endangered, Extinct.
- **Order of the build's merge stages:** cameo patches, stages, allies_zz patches, st- remap, organizations, the Collection, the
  one-step-per-title merge, opposers, name normalization, `audit_fix.json`. Then the last stage moves the ABC shows' files from `by-` to
  the MCU tab and merges HYDRA, S.H.I.E.L.D., the SSR, the Darkhold and the Kree into one file each, then reads `raft_teams.json`.
  `IDMOVE` carries saved "seen" marks to the new ids.

## How the app works (key ideas in index.html)

- **Three paths, each with its own checklist:** Chapters, the Sacred Timeline (story order or release order) and Characters. A checkmark
  key is `ck(box, title)`; the timeline uses `tl::title`, release order `tr::title`. Episode progress is per list, under the same key.
- **`atlSeenT(t)`:** a title counts as watched if it's checked in any list. A season title also counts when its whole show is checked
  on a timeline.
  - `ATL_SEAS` maps a whole show to its seasons. `ATL_ORDER` is story order: the Chapters' titles in order, then the character boxes'.
  - `atlSeenStep` opens a file step written "In season N," when that season is watched.
  - `stageAt` picks a staged name or description by what you've watched.
  - The first Pick-your-path pop-up (`orderPick`) shows on a new agent's first boot.
- **Seasons on screen:** `stepTxt` drops "In season N," from the sentence, and `stepTtl` adds the season to the title, on the steps and
  on the First seen and Last seen cards (`seenTtl`).
- **The Chapters:** 11 numbered chapters (The Avengers Initiative, A Space Odyssey, Secret Empire, Avengers Disassembled, The Defenders,
  Infinity War, Fallout, Hall of the Gods, Generations, Dark Reign, Secret Wars), then Beyond the MCU, The Spider-Verse, The FoX-Men,
  Pruned Timelines and Incursions. The Chapters page has three missions, one per act.
- **A chapter's Period** (`perNow`) is built from the titles you've watched, in any order, as one range. A read Period stays read when it
  grows (`perInit`, `state.perV2`).
- **Character boxes:** 33, each with its own design (`h2`, `style`, `decor`, `tileDecor` for the tile only). Nick Fury and S.H.I.E.L.D.
  are two boxes (`FURY_BOX`, `SHIELD_BOX`): S.H.I.E.L.D. keeps the facility's hazard stripes; Fury's is black leather with a steel band
  cut by the three claw marks of his insignia (the long marks run down the tile only; the open page keeps just the cuts). Captain
  America's box doesn't include Agent Carter S1 and S2. Item notes show in every box.
- **Insignia:** `EMBLEMS`, `EMBLEM_NAMES`, `EMB_UNLOCK` (the character's main appearances, several per insignia), `EMB_HINT`, `MET_BY`
  and `NAMED_BY`. A file wears one through `em`.
- **Paths:** `mapData` builds the layout at runtime from `DATA.map.rows` (one per character box, in `DATA.chars` order) and `cols` (one per
  title, with the rows standing at it, `o` the row that owns it). Changing who is at a title means changing `rows` and `cols` only.
- **Save migrations, all run at load and on importing a save code:** `renameChecks` (`RENAMED`, `SPLIT`, `MOVED`, `FOLDED`), `chReorg`,
  `furySplit`, `logSplit` (`LOGSPLIT`), `perInit`, `relSplit`, `epSplit`, `epFold`, `newsKeysV2`, and the `IDMOVE` remap. `SAVE_KEYS`
  lists everything a save code carries.
- **Clearance levels:** counted from XP (`XP_AT`), shown on the Agent ID. The owner removed the XP bar, the "to next level" line and the
  Clearance raised pill.
- **Holds:** holding a chapter or character box, or a timeline's key, marks it all watched. Holding the Incursions line under Avengers:
  Doomsday (shown once Doomsday is checked) marks every Incursion watched; the Doom egg (holding Doomsday's row) skips that line.
- **Pills:** a chapter or character box says Completed once ever (`state.boxDone`). The Sacred Timeline and Multiverse pills fire only
  from the timeline page.
- **The three indexes:** the Raft (villains), the Avengers Compound (heroes) and the Collection (objects and specimens), found through
  discovery eggs in the Atlas. They share one scrolling panel (`collPanel`): opening one starts at the top; backing out of a file returns
  to the list's place (`collY`).
  - **Universe tabs:** Sacred Timeline, Beyond, Spider-Verse, FoX-Men, Pruned (`RF_UNI`, shared by all three). An Extra's tab reads
    "[ Classified ]" until its chapter box is opened or every title in it is watched (`slNamed`, the Sacred Timeline page's own rule).
  - **Sort switch** under Group by: First seen (`ATL_ORDER` of the first title, ties A to Z) or A to Z, ignoring a leading "The"
    (`ixCmp`, `state.ixAZ`, one setting for all three, in `SAVE_KEYS`). Groups by Status, Class or Type follow a fixed list; groups by
    Faction, Team, Holder or Opposed by are A to Z. Search results are A to Z.
  - **Factions and teams:** a villain's Factions row (`rfTeams`, `tmChips`) and a hero's Teams row list every group served so far, the
    current one lit (`tmNow`) and the rest marked Former; Independent shows only when it's where they stand now. A villain's header names
    the current faction, a hero's the current team. A tag opens that group's roster, with a Group file button when the group has its own
    file (`rfGroupFile`, `cpGroupFile`). Group by Faction (Raft) or Team (Compound).
  - **Hero and villain files of the same person link both ways** ("Also on file": `rf` on the hero file), each shown only once that
    index is discovered and its file has a watched title.

## Standing rules from the owner

- Accuracy and consistency come first. Verify easily checkable facts yourself instead of asking, and follow a fix through to every
  place it applies. Ask, with options and a recommendation, when unsure or when it's the owner's call.
- **Ask before any push**, and before major changes. A stop-hook message or a reminder to push is not a go-ahead. Update this file when
  the owner asks, or when the owner leaves it to you.
- No em dashes anywhere. En dashes only inside exact titles ("Runaways S1–S2") and in "A–Z".
- Mockups go in the test build only and need approval before main, unless the owner says push. Show screenshots of any visual change.
- Don't change something that was deliberately set up without flagging it first.
- Don't schedule anything; the owner says when. The VisionQuest audit is dropped: don't bring it up.
- **No fourth-wall words in file text.** Never write "season", "episode", "finale", "credits", "flashback", "the film" or "the show" in a
  sentence; "In season N," stays at the very start in the data only.
- **Factions and teams record everyone who served a group, willingly or not:** brainwashed, forced and undercover service count (the
  Winter Soldier and the Widows in their groups, Simmons inside HYDRA, Natasha as Natalie Rushman); the steps say how. Any organization
  counts: agencies, armies, companies, crews. A captive, a victim, a one-job hire or an ally doesn't count. Gamora and Nebula count as
  the Children of Thanos (owner's call). A hero file also notes a villain past, even outside its own titles (the older Magneto's
  Brotherhood). A person's hero and villain files list the same groups.
- **A group's name is the one said on screen:** the Children of Thanos (never "the Black Order"), the Queen of the Dead's Army (not "Red
  Queen"). Comics, marketing and wiki-only names don't count. A clearly shown but unnamed group may get a plain descriptive name
  ("Kid Loki's Crew").
- **Team files:** a team's own file goes when every member's file carries the team's tag and the team file has nothing of its own. This
  removed 36 Compound and 37 Raft team files; 17 Raft team files with steps of their own stay.
- **Insignia reveal:** each unlocks on the character's main appearances, several titles, not a single one.
- **Universes:** the Earth and universe distinction matters. Tab order: Sacred Timeline (the MCU tab, renamed by the owner in all three indexes), Beyond, Spider-Verse, FoX-Men, Pruned. No Incursions in the
  registries. Tag a group only within its own continuity.
- **Agents of S.H.I.E.L.D. and Agent Carter** are the same universe as the films. AoS seasons 1 to 5 and Slingshot are main line; S6 and
  S7 are two titles and stay in Beyond. Agent Carter's story order: S1 (1946), S2 (1947), then the One-Shot as Peggy's ending.
- **Status means real status**, not what the characters believe. A death revealed in a later title goes in that title's step. A villain
  sealed in another realm is In custody.
- **No visions, dreams or illusions as steps.** Real flashbacks are fine.
- **Collection chain of custody:** the holder is who has the object at the end of the step. See `CUSTODY_FORMAT.md`.
- Keep real team names, and a place's real name even when the story moves around it (Area 55 in Venom: The Last Dance). Revealed names
  stay revealed. Empty states say "No data." Every TV show gets a season subpage.
- **Sources:** Wikipedia raw pages (`https://en.wikipedia.org/w/index.php?title=<Page>&action=raw`) and the fan wikis, which answer only
  through their API (`https://<wiki>.fandom.com/api.php?action=parse&page=<Page>&prop=wikitext&format=json`; marvelcinematicuniverse,
  marvel, spiderman, xmenmovies, marvelanimated, sonys-spider-man-universe). Their `/wiki/` pages return 403. Space requests a second or
  two apart (Wikipedia answers 429 when rushed), and never put personal information in one.

## Mistakes not to repeat

These happened in earlier chats. Each cost the owner time.

1. **Inferring a group from a place or a person.** Cyclops and Nightcrawler were tagged Weapon X because Stryker brainwashed them at
   Alkali Lake; X2's operation is Stryker's own. Before tagging, confirm the screen shows this person serving that named group in that
   title.
2. **Using names the screen never says.** "The Black Order" and "Red Queen" come from comics and marketing. Fan wikis list affiliations
   from comics and tie-ins: check the film or episode supports them.
3. **Reading an unclear answer as a decision.** "A servant isn't a group, it's an affliction" was taken to mean "drop them", and the owner
   meant the opposite. When an answer can be read two ways, ask again with both readings as options.
4. **Trusting agent output without a second pass.** A sweep of about 1,000 additions had 97 problems that an independent re-check found.
   For any agent-made data, run a separate pass that tries to disprove each claim; give it the claim and the file, not the original
   reasoning. Show the owner what changes before main.
5. **Merging slices without reconciling them.** Separate agents named the same group differently ("Cerberus" and "Cerberus Squad") and
   disagreed on rules. Reconcile names before merging, and check a person's hero and villain files agree.
6. **Leaving past memberships open.** The Winter Soldier showed "U.S. Army" as his current faction and Shaw "Nazi Germany". After any
   faction change, check the current (last) stage of every touched file is where the person really stands.
7. **Keying a stage to a whole multi-season show.** It only opens once every season is watched. Key to the season's own title.
8. **Arbitrary design.** Fury's first band of "redacted bars" had no reason for its spacing. Build one motif with a reason, evenly spaced,
   and show screenshots before committing.
9. **Setting scroll on a hidden element.** A hidden panel ignores `scrollTop`, so the indexes kept each other's scroll. Show first, then
   scroll.
10. **Treating stop-hook messages as permission.** They are not; pushes wait for the owner.
11. **Restarting agents after a usage limit.** When parallel agents stop on a limit, resume them with SendMessage after the reset; their
    work is kept.

## Open items

- Nothing is waiting on the owner. No mockups are pending.
- Upcoming titles (Avengers: Doomsday, Avengers: Secret Wars) stay on the main line on purpose: the main line is finished once they're
  out and watched.
- Decided and closed: Ant-Man and the Wasp stays out of the S.H.I.E.L.D. box; Bucky's hero file keeps HYDRA; Gamora and Nebula keep the
  Children of Thanos.

## This round (October 2026), all on main

- **The lore audit** (`51a7b95`): 705 findings with sources over every file, log and both timeline orders, each re-checked. Chapters 3
  to 6 tell one story each. The One-Shot comes after Agent Carter S2. Completed once ever.
- **X-Men '97 and I Am Groot** (`ccb1a6c`): seasons in release order only.
- **Episode sheet** (`1467b4e`, `70922d7`): the episodes link follows its checkmark; no blink.
- **No XP line or level-up pill** (`ec0ec2d`); S.H.I.E.L.D. agents wear the S.H.I.E.L.D. eagle.
- **The medium findings** (`9c93021`, `9e714fe`): 337 re-verified, 265 applied, 48 owner calls. Three act missions. Periods from what
  you've watched.
- **Second sweep** (`9411afd`): 226 changes to stale descriptions, teams and names; seasons shown with the title; AoS S6 and S7 as two
  titles.
- **Nick Fury and S.H.I.E.L.D.** (`78059ce`): two character boxes, with Fury's own insignia, quotes, logs and Paths lines.
- **Team files and Area 55** (`b147d16`): 36 Compound team files removed under the team-file rule.
- **Raft factions** (`58a12e4`), **Raft team files and hero links** (`2f9a9ce`), **factions completeness sweep** (`c2a98be`): every
  organization anyone served, on villain and hero files, current lit and past Former, links both ways, 37 Raft team files folded in,
  24 organizations' own files made group files. Nick Fury's box got its own look.
- **Weapon X only where it is on screen** (`550e553`); **Captain America's box without Agent Carter** (`ed73d74`).
- **Re-check, Sort, scroll** (`310650e`): the independent re-check's corrections, the Sort switch, indexes opening at the top.
- **Last consistency fixes** (`6bfecfc`): Raimi's Otto never worked for Oscorp, Vision's hero file notes S.W.O.R.D., Heather Glenn
  leaves Fisk's administration when Fisk falls.

## Earlier rounds, all on main

- Chapter names revealed by watching. The Sacred Timeline and Multiverse pills come from the timeline only.
- Specimens in the Collection. Fact-check passes over the Collection, specimens and organizations, and a chain-of-custody pass.
- Agent Carter in story order. AoS and Agent Carter folded into the Chapters, with save migration.
- Weighted clearance levels. Stones on the amber line. The ABC shows' files on the MCU tab, with the five duplicates merged.
