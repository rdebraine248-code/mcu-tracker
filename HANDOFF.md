# MCU Tracker: handoff

A Marvel watch tracker, built as a single-file PWA (a "S.H.I.E.L.D. datapad"). This page is everything a new chat needs to pick up the
work. **Read all of it before changing anything, above all "Standing rules from the owner" and "Mistakes not to repeat".**

## Starting a new chat

Paste this as the first message:

> Work on the repo `rdebraine248-code/mcu-tracker`, branch `ccr-9703a988-d86jbb`. Before doing anything, read `HANDOFF.md` on that
> branch in full and follow it, especially "Standing rules from the owner" and "Mistakes not to repeat". Ask me with options when
> something is mine to decide or you're unsure, and never push to main without my go-ahead.

## What the owner cares about

- **Accuracy first.** Every fact must hold up on screen. Verify it yourself against sources rather than asking the owner, and follow a fix
  through to every place it applies.
- **Completeness.** The indexes are meant to be a complete repository: "I could go to look up anything about anyone."
- **Consistency.** The same person, group or rule reads the same everywhere (hero and villain files, logs, boxes, Paths).
- **Intentional design.** Every visual element needs a reason for its shape and spacing ("proportion, intentionality, character").
- **Being asked, not surprised.** Questions come with clear options and a recommendation. Pushes to main wait for an explicit yes.

## Where things live

- **Repo:** `rdebraine248-code/mcu-tracker`.
- **`main`:** the built app that people use: `index.html` (every placeholder filled), `sw.js`, `manifest.webmanifest` and the icons. Nothing
  else goes on main.
- **Working branch `ccr-9703a988-d86jbb`** (it carries on from `ccr-260b58ec-boqbta`): the source. It holds `index.html` with its data
  placeholders still empty, `mockup-data/` (all the data, the build scripts and the tests) and this file. **Check this branch out**, not
  main. After every push to main it's synced with `git merge -s ours origin/main`, which keeps the source and records main's history.
  `claude/gracious-cray-lhdt2k` is a mirror of it from the October 2026 chat: push both, so they stay identical.
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
  3. Back on the working branch, run `git merge -s ours origin/main` and push the branch (and its mirror).
  4. Check: `cmp <(git show origin/main:index.html) mockup-data/out/main.html` prints nothing.
- **The mockup switch:** `const MOCK = true;` near the top of the script, with `body.mock` for CSS. `mainprep.py` flips it to false for
  main and asserts that it's there. Mockups go between `/* MOCKUP BEGIN ... */` and `/* MOCKUP END */` lines (CSS and script), which
  `mainprep.py` cuts, or behind `MOCK ?` / `MOCK &&` guards. None are pending.
- **Promoting a mockup to main:** don't just delete its markers. A mockup block often overrides main code at load (reassigns a
  function, deletes entries). Fold it into the code it overrides, delete what it replaced, sweep the CSS and comments it leaves behind,
  rewrite its comments as main's, and update or replace the tests for what it removed.
- **The published test build** is an artifact at https://claude.ai/artifact/LJbjs1D5nCM5BCKhqKdv4s (the old one, FpzxqjpMT8r7jSvb69mNKu,
  is retired). It's at v68 and matches main. Republish it whenever a mockup changes: copy `out/datapad-test.html` to the scratchpad
  and publish to that URL.

### Tests

The tests are in `mockup-data/tests/`. They use the Playwright in `/opt/node22/lib/node_modules/playwright` and Chromium at
`/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`; adjust those paths if the environment differs.

```sh
rm -rf out/root && mkdir -p out/root && cp out/main.html out/root/index.html && cp ../*.png ../manifest.webmanifest ../sw.js out/root/
export ROOT=$PWD/out/root                                                            # feat.js fails without it
for s in check smoke feat; do node tests/$s.js; done                                 # the app at $ROOT
for s in ct32 ct36 ct37b $(seq -f 'ct%g' 38 62); do echo "== $s"; node tests/$s.js $ROOT/index.html; done
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
| ct53 | First seen and Last seen by release order, season by season; the Void's Juggernaut merged into the Last Stand's file |
| ct54 | Search within the tab you're on; the Defenders in two Parts; pills take taps only while open; the Atlas reaches the pole |
| ct55 | Overlays pin the page behind them and give it back; every index file names its universe |
| ct56 | The S.H.I.E.L.D. keycard and the Level 7 files |
| ct57 | Back returns to the file you came from, across indexes |
| ct58 | Damage Control's incident reports: search, grouping, sorting, links into found indexes, the replays' file buttons only into found indexes |
| ct59 | Every index opens with its Atlas place (Damage Control with Midtown, the Collector with Knowhere) |
| ct60 | The Space Stone in the Tesseract's case |
| ct61 | The Darkhold and the Accords held on their titles; only the Tesseract live in the Collection; the sling ring lands only in the Atlas (every realm and submap, never the Incursions); the Watcher's other realities, in his box and in Beyond the MCU |
| ct62 | A holder's name in the Collection: the list of what they held, their own Compound or Raft file only once found, the right person among a tab's many of a name, back to the list; holders go by their files' names; no Benny or AIDA left |

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
- **`appear_fix.json`: the appearance sweep's changes** (October 2026), keyed to the final ids and applied after the ABC move, before
  `raft_teams.json`. Per file under `T`, `A` or `C`:
  - `ins`: `[anchor, [steps]]` puts steps right after an anchor step (`[sentence, title]`; null puts them first).
  - `fix`: `[old, [new steps]]` swaps one step for others.
  - `move`: `[step, before]` puts a step right before another.
  - `post`: `{old, new}`, `{old, before}` or `{after, new}`, matched against the file as the sweep leaves it.
  - `set`: replaces fields.
  - The top-level `merge` list turns one person's two files into one: the other file's steps join in the given story order, its
    opposers and links follow, and its id goes to `IDMOVE`.
  - To change a file again, add to its entry here (or to `audit_fix.json`), never to the source files under it. The scripts that wrote
    it lived in the session's scratchpad and are gone; `appear_sweep.json` holds what they produced.
- **The audit records:**
  - `audit_findings.json`: the lore audit, F001 to F705, each with its fix, source and status, all settled. `recheck` and `verify` hold
    the two later passes, `lead` the reviewer leads (R1 to R5, decided), `extra` D1 and D2. The 8 entries in `aside` are VisionQuest's.
    Report page: https://claude.ai/artifact/3bB2MxjEMd9mwbv64yWHt4.
  - `audit_sweep.json`: the second sweep and the team-file review with the owner's decision on each (`owner`).
  - `raft_teams_src.json`: the first faction sweep (the Raft's 54 group files), one entry per membership with its source; dropped
    ones are marked with why.
  - `factions_sweep.json`: the completeness sweep (every organization anyone served, with sources), the name map, the hand fixes,
    and `recheck`: the independent pass over all 1,042 claims, with every flag and what changed.
  - `appear_sweep.json`: the appearance sweep.
    - `sweep`: each of the 32 chunks' finds (adds, season fixes, stages, flags, unsure, complete).
    - `recheck`: the independent verdicts on every claim.
    - `flags`: the verdicts on the flagged steps and leftover gaps.
    - `overrides`, `flags_override` and `manual`: my rulings and hand fixes.
    - `owner_calls`: the owner's decisions and the open questions.
  - Log and timeline fixes went straight into `index.html` (DATA, DOSSIERS, SAGA).
- **Names:** `names_common.json` (id to the name the story mostly calls them, with the real name kept for its own row) and
  `names_fix.json` (every other name said on screen, staged; `hold` renames Collection holders to match). The sweep and its re-check are
  in `names_sweep.json`.
  - A Collection holder goes by the name on the person's file ("Ronan" became Ronan the Accuser). Add to `names_fix.json` `hold`, per
    object.
  - A variant in another universe goes by the main universe's file name, unless the sweep set its name on purpose or the screen names it
    differently (Kid Loki, King Thor). Rename a file with `set` in `appear_fix.json`, unless `names_fix.json` already sets its name.
  - Before renaming, check `names_sweep.json`: a name it set on purpose (Wenwu, from the script; Nova Prime Irani Rael, the owner's rank
    rule) is a decision, not a mistake.
- **Writing pass:** `prose_coll.json`, `prose_raft.json` and `prose_cp.json` (file id to `[old text, new text]`, matched on the text as
  built; the build reports any line that no longer matches).
- **In index.html itself:** Damage Control's reports (`DC`, 238 of them, kept in the order they happened, universe by universe), the tactical replays (`TR`, seven battles), the Level 7 files,
  the Watcher's other realities (`ALT_BOXES`) and the easter eggs (`EGGS`, `ROW_EGGS`, `BOX_ROW_EGGS`).
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
  the MCU tab and merges HYDRA, S.H.I.E.L.D., the SSR, the Darkhold and the Kree into one file each, applies `appear_fix.json`, then
  reads `raft_teams.json`.
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
- **Save migrations, all run at load:** `renameChecks` (`RENAMED`, `SPLIT`, `MOVED`, `FOLDED`), `chReorg`,
  `furySplit`, `logSplit` (`LOGSPLIT`), `perInit`, `relSplit`, `epSplit`, `epFold`, `newsKeysV2`, and the `IDMOVE` remap. There is no save code any more (owner, October 2026: progress lives in the
  Android app); the Agent File ends with Reset datapad.
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
  - **First seen and Last seen** go by release order, season by season (`seenRk`: the season's title in `DATA.timelineRelease`, else the
    title, else the Chapters path after the rest). Owner's call, October 2026: the Chapters path ignored seasons and crossovers.
  - **Sort switch** under Group by: First seen (the same release-order rank of the first title, ties A to Z, grouped) or A to Z (the whole tab
    in one list, no groups), ignoring a leading "The"
    (`ixCmp`, `state.ixAZ`, one setting for all three). Groups by Status, Class or Type follow a fixed list; groups by
    Faction, Team, Holder or Opposed by are A to Z. Search results are A to Z.
  - **Factions and teams:** a villain's Factions row (`rfTeams`, `tmChips`) and a hero's Teams row list every group served so far, the
    current one lit (`tmNow`) and the rest marked Former; Independent shows only when it's where they stand now. A villain's header names
    the current faction, a hero's the current team. A tag opens that group's roster, with a Group file button when the group has its own
    file (`rfGroupFile`, `cpGroupFile`). Group by Faction (Raft) or Team (Compound).
  - **Names on files:** a file goes by the name the story mostly calls them (Red Skull, Captain Carter); where that's an alias, the real
  name gets its own Real name row, staged to the title that first says it, and searchable (`rnNow`, `alNow`). Aliases have their own row.
- **Damage Control** (in Midtown on the Atlas, hi-vis green): incident reports in every universe, under the Raft's tabs, with search,
  grouping (year, title, involved, team) and links into the indexes you've found. Seven battle reports carry a tactical replay
  (`trHTML`, `trDraw`): everyone on the field moving beat by beat, armies as swarms, the beat in words underneath.
- **Back always returns to where you were**, across indexes (`collJump`, `collRestore`). Every overlay pins the page behind it.
- **Links between indexes:** every link from one index into another goes through `ixFile`, which opens only an index you've found and only
  a file with a title you've watched (report names, replays' Open file, the Collection's holders, Also on file).
- **Holders in the Collection:** tapping a name lists everything they held. That list carries their own Compound or Raft file
  (`cxHoldFiles`): the file in the object's universe with that name that shares the most titles with the holder's steps. A tie links
  nothing. `CX_HOLD_AKA` covers Steven Grant, Marc's alter, and `CX_HOLD_PICK` the ties settled by hand (the young and the old Charles both
  on Cerebro, each labelled by where you first saw them). Back from the file returns to the holder's list.
- **S.H.I.E.L.D. Level 7:** a sideways swipe on the S.H.I.E.L.D. box's stripes brings up a reader with your own Agent ID; swipe it
  through for the Level 7 files, each tied to one title.
- **The Atlas** has sector codes when zoomed right in (A1 to J24 on the Earth), on every map but the Incursions wall.
- **Held objects:** holding Doctor Strange in the Multiverse of Madness in any list casts the Darkhold (`cxDark` with a scope); holding
  Captain America: Civil War brings up the Sokovia Accords to sign or refuse (`cxAccords`). Each is its own Classified file. In the
  Collection only the Tesseract answers to a touch (`CX_LIVE`): carry its mark off for the Space Stone.
- **The sling ring** (`slingDest`, `slingLand`, `slingPortal`): after Doctor Strange, three circles in one stroke anywhere open a portal
  onto a place in the Atlas you've charted, and land you there (owner, October 2026: Atlas only again). Earth with its cities' spots, the
  Cosmos, Beyond and the multiverse with the places inside its universes, never the Incursions. The realm first, then the place, so
  Earth's hundred places don't drown out Beyond's few; never the place you're looking at. The page is held still once the stroke is a
  circle, and a mouse stroke doesn't click or select what it's drawn over.
- **The Watcher's other realities** (`shatter`, `ALT_BOXES`, `altBox`): holding in the Watcher's box or Beyond the MCU cracks the box
  away onto one of fifteen other realities' boxes (Captain Carter, Strange Supreme, Star-Lord T'Challa, Killmonger, the Hydra Stomper,
  Infinity Ultron, the Queen of the Dead, Zombie Captain America, Spider-Man, Survivor, Party Thor, Nebula of the Nova Corps, Hela of the
  Ten Rings, Kahhori, Storm, Blade Knight), in turn, each a twist on its hero's box with made-up titles (their own and other heroes'
  they turn up in, the same name in every box that shares it), nothing to tick. A few seconds later it shatters back. Its pieces are cut
  while it shows (once the first break's pieces are gone), stacked over it, so the break never blinks. Every piece has `will-change:
  transform` so its contents fall with it on phones. An invisible `.fx-lock` takes taps and scrolls for the whole egg. The Watcher is
  named (Extras cover and tile) with his insignia, after What If...? or Loki S1, the same moment the multiverse opens.
- **The Nick Fury box:** two fingers down throw Coulson's cards (blood on them after The Avengers); two fingers up (or dragging his name
  up with a mouse) play his last page: the pager flicked up, the box turned to dust, her star on the screen, the box gathered back.
- **The Snap** (all six stones, tap the colored line): half the character boxes crumble with Fury's dust (`snapBox`, a filter of its
  own per run), one after another, then they're gone from the Characters page and the list closes up (`gridFlip`); undoing it opens
  their places and they gather back. A heading with nobody left under it is hidden.
- **Hero and villain files of the same person link both ways** ("Also on file": `rf` on the hero file), each shown only once that
    index is discovered and its file has a watched title.

## Standing rules from the owner

- Accuracy and consistency come first. Verify easily checkable facts yourself instead of asking, and follow a fix through to every
  place it applies. Ask, with options and a recommendation, when unsure or when it's the owner's call.
- **Ask before pushing to main**, and before major changes. A stop-hook message or a reminder to push is not a go-ahead for main.
  Everything else (the working branch, its mirror, the session's own branch) is pushed without asking, as soon as it's committed: the
  owner has said so in every chat.
- **Write the owner's rules down the moment they're said.** When the owner states a rule or a preference, or repeats one, add it to this
  file in that same session and push it. Don't wait to be asked or for the end of the chat: rules said only in chat have been lost before,
  and the owner has had to repeat them. Update this file when
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
- **Every file is complete:** every title its subject is on screen in gets a step (one per season of a show that runs several), with no
  cap on how many. The rest of this rule was settled in the appearance sweep, October 2026.
  - **Counts:**
    - a brief cameo when they're clearly identifiable;
    - a cameo tied to the character only outside the screen, by later statements or actors' and writers' posts (owner's call);
    - someone posing as them, a shapeshifter or a Life Model Decoy, with the step saying who, while their own status stays real;
    - a new recording filmed for that title (Howard's reels, Steve's school videos).
  - **Doesn't count:** a mention, a photo or replayed footage from another title. The exception is a mention that changes where they stand
    (a death revealed), and the step says how.
  - **Avengers Endgame: Encore**'s new footage stays out for now (owner's call).
  - **Agents of S.H.I.E.L.D. seasons 6 and 7** go on the Sacred Timeline tab's files whose subject carries on there.
  - **One person filed on two tabs** becomes one file, on the tab of the show where they're a main character. The 1990s Captain America
    and Red Skull are on the Spider-Verse tab with their X-Men cartoon steps.
  - **Deadpool & Wolverine's Void characters** go in the files of the originals they evoke, even with new actors: we only care about
    them because we want to believe they're the originals (owner). Azazel, Toad, Callisto, Lady Deathstrike and the Omegas sit in their
    Fox files; the Void's Juggernaut is merged into the X-Men: The Last Stand file. The Void's Blob keeps its own file (owner's call:
    the Fox films have two Blobs).
  - **A person with a hero and a villain file:** neither file starts earlier than it does now, and each covers every title from its start
    on.
- **Collection chain of custody:** the holder is who has the object at the end of the step. See `CUSTODY_FORMAT.md`.
- Keep real team names, and a place's real name even when the story moves around it (Area 55 in Venom: The Last Dance). Revealed names
  stay revealed. Empty states say "No data." Every TV show gets a season subpage.
- **A file goes by the name the story mostly calls them**, with the real name on its own row (owner, October 2026).
- **Current context matters:** the Infinity Stones are destroyed ("I used the stones to destroy the stones"); the Time Heist's borrowed
  copies stay in their histories but never set where a stone stands now.
- **Animations need life, a reason and the right timing.** A sliding picture with no character is rejected. Re-enact the scene it comes
  from (Fury's last page plays the Infinity War scene), and record it for the owner before asking for approval.
- **Answer with specifics.** "What's on main" wants a list of what, not a count.
- **No unapproved additions, no rehashing.** Build what was asked; offer ideas as ideas.
- **Don't duplicate a feature.** One thing moves you somewhere (the sling ring); the Watcher only shows another reality.
- **Damage Control's case numbers:** one register a tab, each with its own letters (ST, BY, SV, FX, PR), so no case number is ever
  repeated anywhere: Case No. ST-001. Numbered in release order, the order the incidents reached the screen, as First seen goes; not by
  story order, or ST-001 would wait for a recent show (owner, October 2026). A report filed under a whole show goes by its first season;
  within one title, by year. `DC_NO` computes them, so a new report needs no number; First seen lists by case number.
- **A to Z sorts the whole tab into one list**, with no groups, in all four indexes (owner, October 2026); grouping comes back with First
  seen.
- **No link in an index opens an index you haven't found.** That includes battle replays and anything added later: use `ixFile`.
- **One person, one name:** a Collection holder reads as the person's file does, and a variant in another universe as the main universe's
  file, unless the screen names it differently. Spellings follow the screen and its credits (Bennie Pollack, Aida).
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
10. **Treating stop-hook messages as permission.** They are not; pushes to main wait for the owner.
11. **Restarting agents after a usage limit.** When parallel agents stop on a limit, resume them with SendMessage after the reset; their
    work is kept.
12. **Capping steps, and only checking what's there.** The original briefs said "2 to 8 steps, merge minor appearances", so Maria Hill had
    no Agents of S.H.I.E.L.D. steps and Jasper Sitwell 2 of his 8 titles. Every audit since had only checked existing steps. Never cap a
    file. A completeness check compares each file with its subject's real appearances.
13. **Letting rulings drift between agents.** Re-checkers ruled differently on Agents of S.H.I.E.L.D. seasons 6 and 7 and on Life Model
    Decoys. When a convention comes up, write it into every brief at once and override the stray verdicts.
14. **Easing on a whole multi-keyframe animation.** It warps every keyframe's timing (Fury's pager dropped early and vanished
    mid-exit). Put the easing on each keyframe.
15. **Answering with a count.** The owner asked what was on main and got "six". Give the list.
16. **Building a feature twice.** The sling ring and the Watcher both teleported. Check what already does the job first.
17. **Building copies at the moment of a swap.** The Watcher's return built ten full-screen copies in the same frame it removed the
    original, so the phone blinked. Build the copies early, stacked over the original, and only start them moving at the swap. But not
    so early that two sets of full-screen pieces exist at once: twenty layers were too many for the owner's phone.
20. **Trusting desktop and emulation for phone rendering.** The Watcher's pieces fell whole in headless Chrome, emulation included, but
    on the owner's Samsung phone their contents stayed behind (fixed-position children not moving with a transformed parent). Make a
    moving element its children's frame explicitly (`will-change: transform`, children absolute), and ask the owner to check on the
    phone before main.
21. **An effect you only watch must not pass taps through.** The Watcher egg's layers ignored taps, so rows under it got ticked. Cover
    such an effect with a layer that takes them.
18. **Copies that miss the box's variables.** `pinCopy` dropped the box's colour variables, so the ticks' boxes went blank on every
    effect that copies a box. A copy carries the box's custom properties.
19. **Testing with a mouse only where a finger is the real input, and the reverse.** A circle drawn with a mouse clicked the box under
    it. Check both, and remember headless can't scroll natively, so touch scrolling needs the owner's phone.
22. **Changing source steps under the fix files.** Adding a "past" label to the Time Heist steps in `coll_mcu_a.json` made two audit
    ops (F640, F650) stop matching, and the Eye of Agamotto's and the Soul Stone's fixes dropped off main until the build's
    `audit: no step` lines were read. After touching any source step, build and read every line the build prints.

23. **Matching people by name alone.** In the Spider-Verse tab "Peter Parker" is nine files, and a name-only match linked the Raimi suit
    to Miguel O'Hara; a hand-made lead sent What If's Helen of Troy to Helen Cho. Require a shared title, let a tie link nothing, and test
    every hand-made link against the data.
24. **Asking to push the working branches.** Only main needs the owner's yes. Asking for anything else (the handoff, the working branch)
    wastes the owner's time and was called out more than once. Push those yourself, and say so in a line.
25. **Filing a found problem instead of raising it.** The Collection's holder list mixing eight Spider-Men was noticed while building the
    holder links and only written under Open items. Tell the owner the moment you find something wrong, with what it is and a fix.

## Open items

- **The appearance sweep's open calls are settled** (`appear_sweep.json`, `owner_calls`): Muse gets a Born Again S2 step (Heather's
  memories of his attack, not her hallucinations), Peggy an Agents of S.H.I.E.L.D. S7 step (Simmons posing as her in 1955). No step for
  Jameson in Venom: Let There Be Carnage (promotional footage). Uncle Ben keeps his "Intervention" step (the real night Peter relives;
  the spirit guiding him is a vision and stays out). Jean keeps X-Men: The Animated Series seasons 4 and 5.
- Revisit Encore once Doomsday is out.
- No mockups are pending.
- **The Classified eggs:** the audit is at https://claude.ai/artifact/5tqx9SYTYccbT2whKbNgfJ (64 ranked, cuts, fixes, gaps, 40 ideas). The
  owner kept all 64, so the Agent File stays at 4 pages of 16. Pages must stay even: add eggs in fours. Its bug list is still open (Worthy
  needs Doomsday and Secret Wars ticked; One last page and the Battle of New York have no watch gate; Variant shows hidden names; the
  shield's hint says it comes back).
- **The Android app (`android-app/`, October 2026):** the owner's chosen way past One UI 9's grey strip. A plain Android shell, no framework:
  one full-screen WebView onto the live site (`MainActivity.java`), so every push to main reaches it with no reinstall. The status bar is
  hidden (a swipe down from the top shows it for a moment), the page draws around the camera (`viewport-fit=cover`, its own
  `env(safe-area-inset-*)` padding), the navigation bar is left alone (the owner goes back with NavStar's side swipe), Back is the page's
  own history (`webView.goBack()`, from the front page the app goes to the background), vibration allowed, an offline page until the site
  has loaded once. Its storage is its own, and progress lives there: there is no save code to move it any more, so Android's own backup
  is on (`allowBackup`, version 1.1, versionCode 2): the phone backs the app's data up to Google with the rest of the phone. Raise
  `versionCode` for every new build, or the phone won't install it over the old one.
  - **Updating:** site changes reach the app when the owner fully closes it (swipes it from recent apps) and reopens it online; Back only
    sends it to the background, so a reopened app keeps the old page. The owner is happy with that: no auto-refresh (October 2026).
  - **A new APK is only for the shell:** full screen and the system bars, the icon or name, Back with nothing left to go back to,
    permissions (notifications, camera, widgets), the offline page, the site's address, or an Android update breaking the shell. Everything
    else is the site.
  - **Build** (from `android-app/`; Android SDK at `/opt/android-sdk`, platform 36 and build-tools 35, with `sdk.dir` in
    `local.properties`): `gradle --no-daemon -I mirror.gradle assembleRelease -PdpStore=<key.jks> -PdpPass=<password>`. Maven Central
    answers 429 in this container, so `mirror.gradle` (an init script, kept outside the repo) puts
    `https://maven-central.storage-download.googleapis.com/maven2/` in front of the project's repositories.
  - **The signing key** is never in this public repo. The owner holds `datapad-release.jks` and its password (sent in the October 2026
    chat). An update to the app itself must be signed with it, or the phone refuses it and the old app has to be uninstalled, which wipes
    its storage: ask the owner for the key before building one. Changes to the site need no new app.
- **The owner's phone:** the Android app above, installed October 2026, fixed the grey strip (owner: "It's fixed"). Before it, the app was
  installed from Samsung Internet. After One UI 9, SystemUI Tuner still hides the status bar, but the
  installed app kept a grey strip where it had been (Samsung Internet itself stayed fully immersive), so `manifest.webmanifest` now asks
  for `"display": "fullscreen"` (October 2026). Nothing in the code checks the display mode. A manifest change needs the app reinstalled
  from Samsung Internet. Wrapping it as an Android app (Capacitor) was discussed and not
  started; battery came first.
- `cxDark` still takes the Collection's case as well as a title (`b`), though only titles use it now.
- **Cut in October 2026 (don't bring back unasked):** J.A.R.V.I.S. search, Sound and the sound board, the War Room, the TVA and Wakanda
  skins, the clearance exams, Eyes Only, the Eye of Agamotto, the arc reactor, the Aether, the Rolex and the other eleven touchable
  cases, Handle with care, and the Watcher's jump elsewhere.
- Upcoming titles (Avengers: Doomsday, Avengers: Secret Wars) stay on the main line on purpose: the main line is finished once they're
  out and watched.
- Decided and closed: Ant-Man and the Wasp stays out of the S.H.I.E.L.D. box; Bucky's hero file keeps HYDRA; Gamora and Nebula keep the
  Children of Thanos.

## The third October 2026 round, all on main (newest last)

- Battery: the Watcher's eyes blink one blink at a time instead of one looping animation, and the dock drops its blur (idle redraws fell
  from 10 to 15 a second to under 3).
- The sling ring lands only in the Atlas again, every realm and submap, never the Incursions.
- Damage Control's replays open files only in indexes you've found (`ixFile`).
- A holder's list in the Collection carries their own file; holders go by their files' names; Bennie (Item 47); Aida; a variant goes by
  the main universe's name (Ronan the Accuser, Wenwu); Nova Prime Irani Rael in both universes.
- A holder's list is the tapped person's alone (the Spider-Verse's Spider-Man had mixed eight of them).
- The Compound in the dark: dark ID-badge rows, status as an edge stripe, team on the right, about eight people a screen (owner: "too
  white and bright and wasted space").

## The second October 2026 round, all on main (newest last)

- Search within the tab; the Defenders in two Parts; pills let taps through; the Atlas reaches the pole; a box's list waits for its
  first line.
- Insignia: The Avengers opens its heroes' own. Overlays pin the page; every index file names its universe.
- Names and aliases for everyone in the Raft and the Compound; ranks back in titles with ranked forms as aliases; the Incursions box
  quote.
- The S.H.I.E.L.D. Level 7 keycard; Fury's egg renamed "They were in his jacket"; Atlas sector codes.
- Damage Control: 234 incident reports in every universe (Morbius, Madame Web and Kraven included), hi-vis green, archives in order
  (Compound, Raft, Damage Control, Collection); back returns to the file you came from; every index opens with its place.
- Captain America's insignia also unlocks with The Avengers. The writing passes: 376 Collection steps and 812 Raft and Compound steps
  rewritten to read naturally with the same facts.
- Coulson's blood on Fury's cards after The Avengers; Level 7's pill waits for the files to close; the Space Stone in the Tesseract's
  case; the hints pass (every egg and stone hint in one voice, checked against the code).
- The Battle of Titan's report; the stones' cases read Destroyed; every file by the name the story mostly calls them (Real name rows);
  Captain Carter by that name.
- Tactical replays in seven battle reports; Fury's box gestures (cards down, last page up).
- The Darkhold and the Sokovia Accords on their titles, the sling ring anywhere, the Watcher's fifteen realities, the Aether cut (`b846e30`).

## The first October 2026 round, all on main

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
- **Maria Hill** (`b1f7739`): her Agents of S.H.I.E.L.D. seasons and Soren posing as her in Far From Home.
- **The Sacred Timeline tab** (`5c1ca98`), and **tab names and the Incursions hold** (`e74de76`): the indexes' first tab renamed; Extra
  tabs named like the timeline's; holding the Incursions line marks them all.
- **The appearance sweep** (`ed4dec1`), with First and Last seen by release order and the Void's Juggernaut merged:
  - All 2,132 files were checked against their subjects' on-screen appearances, in 32 chunks, each re-checked by a separate agent.
  - Steps went from 4,782 to 5,421 across 490 files, and 297 steps were given their seasons.
  - 66 flagged existing steps were settled against sources.
  - Captain America and the Red Skull (1990s cartoons) were merged into one file each.
  - The step caps came out of the format briefs.

## Earlier rounds, all on main

- Chapter names revealed by watching. The Sacred Timeline and Multiverse pills come from the timeline only.
- Specimens in the Collection. Fact-check passes over the Collection, specimens and organizations, and a chain-of-custody pass.
- Agent Carter in story order. AoS and Agent Carter folded into the Chapters, with save migration.
- Weighted clearance levels. Stones on the amber line. The ABC shows' files on the MCU tab, with the five duplicates merged.
