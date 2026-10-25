# MCU Tracker: handoff

A Marvel watch tracker, built as a single-file PWA (a "S.H.I.E.L.D. datapad"). This page is everything a new chat needs to pick up the work.

## Where things live

- **Repo:** `rdebraine248-code/mcu-tracker`.
- **`main`:** the built app that people use: `index.html` (every placeholder filled), `sw.js`, `manifest.webmanifest` and the icons. Nothing
  else goes on main.
- **Working branch `ccr-9703a988-d86jbb`** (it carries on from `ccr-260b58ec-boqbta`): the source. It holds `index.html` with its data placeholders still empty, `mockup-data/` (all
  the data, the build scripts and the tests) and this file. **Check this branch out**, not main. After every push to main it's synced
  with `git merge -s ours origin/main`, which keeps the source and records main's history.
- Helper scripts written during a session (agent briefs, change appliers) live in that session's scratchpad and are gone afterwards.
  Everything they produced is in the repo: `audit_fix.json`, `index.html` and the audit records.

## Build and push

All commands run from `mockup-data/`. Everything they write goes to `mockup-data/out/`, which is git-ignored.

```sh
# main: turns the mockup switch off, then fills the data in
python3 mainprep.py out/main_src.html && SRC=out/main_src.html python3 devbuild.py out/main.html
# the test build, for mockups only: everything watched, a "Test · start from" picker, a note card
python3 build_tb.py "what this test build is for"          # -> out/datapad-test.html
```

- `devbuild.py` reads `/home/user/mcu-tracker/index.html`, or `SRC=...` if set, and fills in the placeholders: `/*THREATS*/`,
  `/*ALLIES*/`, `/*COLLX*/`, `/*EPS*/`, `/*EPN*/`, `/*EPO*/`, `/*NEWSX*/`, `/*COMMSX*/`, `/*SRCX*/` and `/*IDMOVE*/`.
- **Pushing main** (only with the owner's go-ahead):
  1. `git worktree add --detach <dir> origin/main`.
  2. Copy `out/main.html` over its `index.html`, commit and `git push origin HEAD:main`. Remove the worktree.
  3. Back on the working branch, run `git merge -s ours origin/main` and push the branch.
  4. Check: `cmp <(git show origin/main:index.html) mockup-data/out/main.html` prints nothing.
- **The mockup switch:** `const MOCK = true;` near the top of the script, with `body.mock` for CSS. `mainprep.py` flips it to false for
  main and asserts that it's there. Mockups hang off this switch. None are pending right now.
- **The published test build** is an artifact at https://claude.ai/artifact/FpzxqjpMT8r7jSvb69mNKu. It's at v39 (the Nick Fury /
  S.H.I.E.L.D. mockup), which is behind main. Only republish it when the owner asks for a mockup.

### Tests

The tests are in `mockup-data/tests/`. They use the Playwright in `/opt/node22/lib/node_modules/playwright` and Chromium at
`/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`; adjust those paths if the environment differs.

```sh
rm -rf out/root && mkdir -p out/root && cp out/main.html out/root/index.html && cp ../*.png ../manifest.webmanifest ../sw.js out/root/
export ROOT=$PWD/out/root                                                            # feat.js fails without it
for s in check smoke feat; do node tests/$s.js; done                                 # the app at $ROOT
for s in ct32 ct36 ct37b ct38 ct39 ct40 ct41 ct42 ct43 ct44 ct45 ct46 ct47 ct48 ct49; do node tests/$s.js $ROOT/index.html; done
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
| ct49 | Raft factions: staging, roster and group file, grouping |

A failing test must stop a push. Don't pipe test output through `tail`, which hides the exit code. The test pages are served as
`text/html; charset=utf-8`, or the text comes out garbled.

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
  - A build prints `audit: no step` or `audit: no file` when an op stops matching. To change a file, append an op at the end of its
    list rather than editing the source files under it.
  - It holds, in order: the lore audit's findings, the owner's decisions on the medium findings, the second sweep and the owner's last
    calls (the team-file removals and Area 55).
- **The audit records:**
  - `audit_findings.json`: the lore audit, F001 to F705, each with its fix, source and status. All are settled: applied, corrected,
    kept, rejected, obsolete or reverted. `recheck` and `verify` hold the counts of the two later passes, `lead` the reviewer leads
    (R1 to R5, decided), `extra` D1 and D2. The 8 entries in `aside` are VisionQuest's, set aside.
    The report page is https://claude.ai/artifact/3bB2MxjEMd9mwbv64yWHt4.
  - `audit_sweep.json`: the second sweep (descriptions, teams and names that went stale later in their file, stages keyed to a whole
    show, the nine leads, the out-of-story lines) and the team-file review with the owner's decision on each (`owner`).
  - `raft_teams_src.json`: who belongs to each of the Raft's 54 factions, one entry per membership with its source; dropped ones are
    marked. `raft_teams.json` (id to staged `tm`) is built from it and read by `devbuild.py` after the ABC move, so it uses final ids.
  - The log and timeline fixes went straight into `index.html` (DATA, DOSSIERS, SAGA).
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
  one-step-per-title merge, opposers, name normalization, `audit_fix.json`. Then the last stage moves the ABC shows' files from `by-` to the MCU tab and
  merges HYDRA, S.H.I.E.L.D., the SSR, the Darkhold and the Kree into one file each. `IDMOVE` carries saved "seen" marks to the new ids.

## How the app works (key ideas in index.html)

- **Three paths, each with its own checklist:** Chapters, the Sacred Timeline (story order or release order) and Characters. A checkmark
  key is `ck(box, title)`; the timeline uses `tl::title`, release order `tr::title`. Episode progress is per list, under the same key.
- **`atlSeenT(t)`:** a title counts as watched if it's checked in any list. A season title also counts when its whole show is checked
  on a timeline.
  - `ATL_SEAS` maps a whole show to its seasons.
  - `atlSeenStep` opens a file step written "In season N," when that season is watched.
  - `stageAt` picks a staged name or description by what you've watched.
  - The first Pick-your-path pop-up (`orderPick`) shows on a new agent's first boot.
- **Seasons on screen:** `stepTxt` drops "In season N," from the sentence, and `stepTtl` adds the season to the title ("Agents of
  S.H.I.E.L.D. S2"), on the steps and on the First seen and Last seen cards (`seenTtl`).
- **The Chapters:** 11 numbered chapters (The Avengers Initiative, A Space Odyssey, Secret Empire, Avengers Disassembled, The Defenders,
  Infinity War, Fallout, Hall of the Gods, Generations, Dark Reign, Secret Wars), then Beyond the MCU, The Spider-Verse, The FoX-Men,
  Pruned Timelines and Incursions. The Chapters page has three missions, one per act: The Infinity Saga, The Multiverse Saga and The
  Marvel Multiverse.
- **A chapter's Period** (`perNow`) is built from the titles you've watched, in any order, as one range: labels first, then years
  "lo to hi". A read Period stays read when it grows (`perInit`, `state.perV2`).
- **Character boxes:** 33. Nick Fury and S.H.I.E.L.D. are two boxes (`FURY_BOX`, `SHIELD_BOX`; the combined box was `FURY_OLD`). Fury's
  Captain Marvel item carries a note to skip the mid-credits scene, which comes later in his box. Item notes show in every box.
- **Insignia:** `EMBLEMS` (the art), `EMBLEM_NAMES`, `EMB_UNLOCK` (the titles that unlock one: the character's main appearances, several
  per insignia), `EMB_HINT`, `MET_BY` and `NAMED_BY` (first named before their own titles). A file wears one through `em`.
- **Paths:** `mapData` builds the layout at runtime from `DATA.map.rows` (one per character box, in `DATA.chars` order) and `cols` (one per
  title, with the rows standing at it). Changing who is at a title means changing `rows` and `cols` only.
- **Save migrations, all run at load and on importing a save code:**
  - `renameChecks`, using the maps `RENAMED`, `SPLIT`, `MOVED` and `FOLDED` (the AoS and Agent Carter fold, and AoS S6–S7 into S6 and S7).
  - `chReorg` for the chapter reorganization, `furySplit` for the Fury / S.H.I.E.L.D. boxes, `logSplit` (`LOGSPLIT`) for read log
    entries of split titles, `perInit` for Periods, `relSplit` for the release-order splits.
  - `epSplit` and `epFold` for episodes.
  - `newsKeysV2` and the news fold for headlines.
  - The `IDMOVE` remap for the Raft, Compound and Collection "seen" marks.
  - `SAVE_KEYS` lists everything a save code carries.
- **Clearance levels:** still counted from XP (`XP_AT = [0, 100, 300, 600, 1000, 1600, 2600, 4400, 5200, 5900]`), and the Agent ID shows
  the level. The owner removed the XP bar, the "to next level" line and the Clearance raised pill.
  - Watching: a film or a season is 10 XP and a short is 3. Each title counts once, in any list.
  - Finishing: a chapter 30, a character 15, the Sacred Timeline 150, the Multiverse 300.
  - Secrets: an easter egg 20, a mission 30, an artifact 40, a final file 100.
- **Pills:**
  - A chapter or character box says Completed once ever (`state.boxDone`, seeded at first load for boxes already done).
  - The Sacred Timeline and Multiverse pills fire only from the timeline page.
  - A chapter's name shows once it's unlocked or all its titles are watched.
- **The Infinity Stones** light the title's line on every path. On the Sacred Timeline that line is a dimmed amber. Tapping the line
  opens the Gauntlet card.
- **The three indexes:** the Raft (villains), the Avengers Compound (heroes) and the Collection (objects and specimens). Each is found
  through a discovery egg in the Atlas, and found ones are listed under Archives in the Agent File.
  - In the Compound, a team tag on a file opens that team's roster, built from everyone's tags (`cpTeams`), with a Group file button
    when the team has its own file (`cpGroupFile`).
  - In the Raft, a villain's Factions row works the same way (`rfTeams`, `rfGroupFile`; it lists factions served, and says Independent only
    for someone who has served none), and the registry can be grouped by Faction. Hero and villain files of the same person link both ways
    ("Also on file": `rf` on the hero file).

## Standing rules from the owner

- Accuracy and consistency come first. Verify easily checkable facts yourself instead of asking, and follow a fix through to every
  place it applies. Ask, with options, when unsure.
- **Ask before any push**, and before major changes. A reminder to push is not a go-ahead. Update this file when the owner asks.
- No em dashes. En dashes only inside exact titles ("Agents of S.H.I.E.L.D. S6–S7" as it once was).
- Mockups go in the test build only and need approval before main, unless the owner says push. Don't update the published test build
  unless the owner wants a mockup.
- Don't change something that was deliberately set up without flagging it first.
- Don't schedule anything; the owner says when. The VisionQuest audit is dropped: don't bring it up.
- **No fourth-wall words in file text.** Never write "season", "episode", "finale", "credits", "flashback", "the film" or "the show" in a
  sentence; "In season N," stays at the very start in the data only.
- **Team files:** a Compound team file goes when every member's file carries the team's tag and the team file has nothing of its own.
  The same rule removed 37 Raft team files once villains carried factions; 17 Raft team files with steps of their own stay.
- **Factions:** on a villain file, a brainwashed or forced servant isn't a member ("a servant isn't a group, it's an affliction"). A hero
  file's teams are the person's history: a villain faction they served shows there (Wanda and Pietro's HYDRA), and Bucky's keeps HYDRA
  ("they were both HYDRA at one point, willingly or not"). Controlled personas (Fitz as the Doctor, Jean as Phoenix) don't count.
- **Insignia reveal:** each unlocks on the character's main appearances, several titles, not a single one.
- **Universes:**
  - The Earth and universe distinction matters.
  - Tab order: MCU, Beyond, Spider-Verse, FoX-Men, Pruned.
  - No Incursions in the registries.
- **Agents of S.H.I.E.L.D. and Agent Carter** are the same universe as the films. AoS seasons 1 to 5 and Slingshot are main line (in the
  Chapters, the timeline and the MCU tab); S6 and S7 are two titles and stay in Beyond. Agent Carter's story order: S1 (1946), S2 (1947),
  then the One-Shot as Peggy's ending.
- **Status means real status**, not what the characters believe. On-screen confirmation includes holograms and displays (the Endgame
  vanished display). A death revealed in a later title goes in that title's step. A villain sealed in another realm is In custody.
- **No visions, dreams or illusions as steps.** Real flashbacks are fine.
- **Collection chain of custody:** the holder is who has the object at the end of the step. The first holder gets a step (Loki's scepter
  starts with Loki). See `CUSTODY_FORMAT.md`.
- Keep real team names, and a place's real name even when the story moves around it (Area 55 in Venom: The Last Dance). Revealed names
  stay revealed. Empty states say "No data." Every TV show gets a season subpage.
- **Sources:** Wikipedia raw pages (`https://en.wikipedia.org/w/index.php?title=<Page>&action=raw`) and the fan wikis, which answer only
  through their API (`https://<wiki>.fandom.com/api.php?action=parse&page=<Page>&prop=wikitext&format=json`; marvelcinematicuniverse,
  marvel, spiderman, xmen, marvelanimated). Space requests about a second apart, and never put personal information in one.

## Open items

- Nothing is waiting on the owner. No mockups are pending.
- Upcoming titles (Avengers: Doomsday, Avengers: Secret Wars) stay on the main line on purpose: the main line is finished once they're
  out and watched.
- Decided and closed: Ant-Man and the Wasp stays out of the S.H.I.E.L.D. box; the 37 Raft team files stay.

## This round (October 2026), all on main

- **The lore audit** (`51a7b95`): 705 findings with sources over every file, log and both timeline orders. The high-confidence fixes,
  each re-checked a second time. Chapters 3 to 6 tell one story each. The One-Shot comes after Agent Carter S2. Completed once ever.
- **X-Men '97 and I Am Groot** (`ccb1a6c`): seasons in release order only; story order and the boxes keep one title.
- **Episode sheet** (`1467b4e`, `70922d7`): the episodes link follows its checkmark, and the sheets no longer blink.
- **No XP line or level-up pill** (`ec0ec2d`); S.H.I.E.L.D. agents wear the S.H.I.E.L.D. eagle.
- **The medium findings** (`9c93021`, `9e714fe`): 337 re-verified, 265 applied, 48 owner calls (36 changed data). The timeline follows
  Marvel's official order where it and the fan wiki agree. Three act missions. Periods from what you've watched.
- **Second sweep** (`9411afd`): 226 changes to stale descriptions, teams and names, stages on whole shows, nine leads and 42
  out-of-story lines. Seasons shown with the title. AoS S6 and S7 as two titles. Joaquin Torres's insignia.
- **Nick Fury and S.H.I.E.L.D.** (`78059ce`): two character boxes, with Fury's own insignia (the eyepatch with three claw marks), quotes,
  logs, Paths lines and save carry-over.
- **Team files and Area 55** (`b147d16`): 36 Compound team files removed under the team-file rule, after
  Agatha and Billy got the "Agatha's coven" tag and Matt (2003) "Nelson & Murdock". Teddy Paine's step names Area 55.
- **Raft factions** (`58a12e4`): 217 villains carry the factions they serve, staged by title, with a tap-to-roster row and a Group by
  Faction option. Brainwashed or forced servants and Kingpin's enforcers (as Alchemax) were left out.
- **Raft team files and hero links** (`2f9a9ce`): 37 Raft team files removed under the team-file rule;
  villain files link back to the hero's file; hero files note the villain factions their person served.

## Earlier rounds, all on main

- Chapter names revealed by watching. The Sacred Timeline and Multiverse pills come from the timeline only.
- Specimens in the Collection.
- Fact-check passes over the Collection, specimens and organizations, then a chain-of-custody pass over all 467 objects.
- Agent Carter in story order. AoS and Agent Carter folded into the Chapters, with save migration.
- The Sacred Timeline's start-up build-in fixed. The pop-up reads "You can switch paths at any time."
- Weighted clearance levels. Stones on the amber line.
- The ABC shows' files on the MCU tab, with the five duplicates merged.
