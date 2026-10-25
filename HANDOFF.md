# MCU Tracker: handoff

A Marvel watch tracker, built as a single-file PWA (a "S.H.I.E.L.D. datapad"). This page is everything a new chat needs to pick up the work.

## Where things live

- **Repo:** `rdebraine248-code/mcu-tracker`.
- **`main`:** the built app that people use: `index.html` (every placeholder filled), `sw.js`, `manifest.webmanifest` and the icons. Nothing
  else goes on main.
- **Working branch `ccr-9703a988-d86jbb`** (it carries on from `ccr-260b58ec-boqbta`): the source. It holds `index.html` with its data placeholders still empty, `mockup-data/` (all
  the data, the build scripts and the tests) and this file. **Check this branch out**, not main. After every push to main it's synced
  with `git merge -s ours origin/main`, which keeps the source and records main's history.

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
- The repo-only build was checked to reproduce main byte for byte (main at `0cdbf85`, before the lore audit's fixes).
- **Pushing main:**
  1. Make a worktree of `origin/main`.
  2. Copy `out/main.html` over its `index.html`, commit and push to `main`.
  3. Back on the working branch, run `git merge -s ours origin/main` and push the branch.
- **The mockup switch:** `const MOCK = true;` near the top of the script, with `body.mock` for CSS. `mainprep.py` flips it to false for
  main and asserts that it's there. Mockups hang off this switch. None are pending right now.
- **The published test build** is an artifact at https://claude.ai/artifact/FpzxqjpMT8r7jSvb69mNKu. It's at v36, which is behind main.
  Only republish it when the owner asks for a mockup.

### Tests

The tests are in `mockup-data/tests/`. They use the Playwright in `/opt/node22/lib/node_modules/playwright` and Chromium at
`/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`; adjust those paths if the environment differs.

```sh
mkdir -p out/root && cp out/main.html out/root/index.html && cp ../*.png ../manifest.webmanifest ../sw.js out/root/
export ROOT=$PWD/out/root
for s in check smoke feat; do node tests/$s.js; done                                 # the app at $ROOT
for s in ct32 ct36 ct37b ct38 ct39 ct40 ct41; do node tests/$s.js $ROOT/index.html; done
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
| ct40 | The level-up pill |
| ct41 | Ids moved from Beyond to MCU |

A failing test must stop a push. Don't pipe test output through `tail`, which hides the exit code.

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
- **The lore audit (October 2026):**
  - `audit_findings.json`: every finding (F001 to F705), each with its fix, source and status: applied, open, kept, pending.
    The report page is https://claude.ai/artifact/3bB2MxjEMd9mwbv64yWHt4.
  - `audit_fix.json`: the Raft, Compound and Collection fixes, applied by `devbuild.py` just before the ABC move. Each op names its finding;
    "old" is a run of steps that must match exactly, "new" replaces it. A build prints `audit: no step` if a source edit breaks a match.
  - The log and timeline fixes went straight into `index.html` (DATA, DOSSIERS, SAGA).
- **Organizations:** `opp/org_*.json`. Villainous groups go to the Raft, heroic ones to the Compound. Group files carry `grp:1`.
- **Ids:** a prefix says the universe tab: none for MCU, `st-` for street-level (also on the MCU tab), `by-` Beyond, `sv-` Spider-Verse,
  `fox-` FoX-Men, `pr-` Pruned.
- **Steps:** `[sentence, exact title, status(, holder or home)]`, in in-universe order.
  - One step per title, unless the status or the fourth field changes inside it.
  - Multi-season shows get one step per season, starting "In season N,".
  - Titles must match `alltitles.json` exactly.
- **Statuses:**
  - Raft: Active, In custody, Captive, At large, Missing, Allied, Deceased.
  - Compound: Active, Off-world, Retired, Fugitive, Imprisoned, Missing, Deceased.
  - Collection: In use, Secured, Lost, Destroyed.
  - Specimens: Thriving, Endangered, Extinct.
- **Order of the build's merge stages:** cameo patches, stages, allies_zz patches, st- remap, organizations, the Collection, the
  one-step-per-title merge, opposers, name normalization, the lore audit's fixes. Then the last stage moves the ABC shows' files from `by-` to the MCU tab and
  merges HYDRA, S.H.I.E.L.D., the SSR, the Darkhold and the Kree into one file each. `IDMOVE` carries saved "seen" marks to the new ids.

## How the app works (key ideas in index.html)

- **Three paths, each with its own checklist:** Chapters, the Sacred Timeline (story order or release order) and Characters. A checkmark
  key is `ck(box, title)`; the timeline uses `tl::title`, release order `tr::title`. Episode progress is per list, under the same key.
- **`atlSeenT(t)`:** a title counts as watched if it's checked in any list.
  - `ATL_SEAS` maps a whole show to its seasons.
  - `atlSeenStep` opens a file step written "In season N," when that season is watched.
  - `stageAt` picks a staged name or description by what you've watched.
  - The first Pick-your-path pop-up (`orderPick`) shows on a new agent's first boot.
- **Save migrations, all run at load and on importing a save code:**
  - `renameChecks`, using the maps `RENAMED`, `SPLIT`, `MOVED` and `FOLDED` (the AoS and Agent Carter fold).
  - `epSplit` and `epFold` for episodes.
  - `newsKeysV2` and the news fold for headlines.
  - The `IDMOVE` remap for the Raft, Compound and Collection "seen" marks.
  - `SAVE_KEYS` lists everything a save code carries.
- **Clearance levels (XP):**
  - Watching: a film or a season is 10 XP and a short is 3. Each title counts once, in any list.
  - Finishing: a chapter 30, a character 15, the Sacred Timeline 150, the Multiverse 300.
  - Secrets: an easter egg 20, a mission 30, an artifact 40, a final file 100.
  - Thresholds are `XP_AT = [0, 100, 300, 600, 1000, 1600, 2600, 4400, 5200, 5900]`. Excelsior means every file.
  - Milestones: the main line reaches Level 5, every branch Level 6, plus Incursions Level 7, everything watched Level 8. Levels 9 and 10
    need the secrets.
  - XP pools from anything, in any order. A "Clearance raised" pill shows on level-up (`state.xpLv`).
- **Pills:**
  - Chapters and characters have completion pills.
  - The Sacred Timeline and Multiverse pills fire only from the timeline page.
  - A chapter's name shows once it's unlocked or all its titles are watched.
- **The Infinity Stones** light the title's line on every path. On the Sacred Timeline that line is a dimmed amber. Tapping the line
  opens the Gauntlet card.
- **The three indexes:** the Raft (villains), the Avengers Compound (heroes) and the Collection (objects and specimens). Each is found
  through a discovery egg in the Atlas, and found ones are listed under Archives in the Agent File.

## Standing rules from the owner

- Accuracy and consistency come first. Verify easily checkable facts yourself (Wikipedia raw pages, web search) instead of asking, and
  follow a fix through to every place it applies.
- No em dashes. En dashes only inside exact titles ("S6–S7").
- Mockups go in the test build only and need approval before main, unless the owner says push. Don't update the published test build
  unless the owner wants a mockup.
- Don't change something that was deliberately set up without flagging it first.
- Don't schedule anything; the owner says when. The VisionQuest audit is dropped: don't bring it up.
- **Universes:**
  - The Earth and universe distinction matters.
  - Tab order: MCU, Beyond, Spider-Verse, FoX-Men, Pruned.
  - No Incursions in the registries.
- **Agents of S.H.I.E.L.D. and Agent Carter** are the same universe as the films. AoS S1–S5 and Slingshot are main line (in the Chapters,
  the timeline and the MCU tab); S6–S7 stay in Beyond. Agent Carter's story order: the One-Shot (1946), then S1 (1946), then S2 (1947).
- **Status means real status**, not what the characters believe. On-screen confirmation includes holograms and displays (the Endgame
  vanished display). A death revealed in a later title goes in that title's step.
- **No visions, dreams or illusions as steps.** Real flashbacks are fine.
- **Collection chain of custody:** the holder is who has the object at the end of the step. The first holder gets a step (Loki's scepter
  starts with Loki). See `CUSTODY_FORMAT.md`.
- Keep real team names. Revealed names stay revealed. Empty states say "No data." Every TV show gets a season subpage.

## Open items

- **X-Men '97 and I Am Groot (decision pending):** split each into seasons in the release order only (season 2 came out years later,
  with other titles between); story order and the boxes keep one title. Needs the season titles, episode counts, a `SPLIT` entry that
  carries an old release-order tick to S1 only, and "In season N," on about 116 X-Men '97 steps. See F145 and D1 in `audit_findings.json`.
- **The rest of the audit:** 337 findings are open (mostly medium confidence, plus the questions). Only high-confidence ones were applied.
  F177 (Victor Timely's year) is disputed: don't apply it as written. F038 (an Incursions quote attribution) is held back.
- **VisionQuest:** 8 findings were set aside, per the dropped VisionQuest audit.
- Upcoming titles (Avengers: Doomsday, Avengers: Secret Wars) stay on the main line on purpose: the main line is finished once they're
  out and watched.

## This round: the lore audit (on the working branch; main not yet pushed)

- A read-through of every Raft, Compound and Collection file, every log and both Sacred Timeline orders: 705 findings with sources.
- Applied: the 366 high-confidence ones and the owner's decisions, plus three follow-throughs (L1, D2-ssr, Kora's raft link).
  - 180 "In season N," prefixes on Agents of S.H.I.E.L.D., Agent Carter and What If...?. With them, seven season 6 and 7 files go back to
    Beyond, and IDMOVE carries their saved marks back.
  - The chapter logs got the AoS and Agent Carter seasons; the Beyond log no longer holds whole-show entries it could never open.
  - The One-Shot is 1946, before Agent Carter S1. The Dark World comes before Iron Man 3, and Multiverse of Madness before Hawkeye.
    Years were filled in for recent titles, and two release-order swaps were made.
  - Fact, status, custody and order fixes across the indexes and logs, broken raft links fixed, and vision steps removed.
- Kept by the owner: the Crossover tag on Multiverse of Madness, and the Spider-Verse join on Avengers: Doomsday.

## The round before, all on main


- Chapter names revealed by watching. The Sacred Timeline and Multiverse pills come from the timeline only.
- Specimens in the Collection.
- Fact-check passes over the Collection, specimens and organizations, then a chain-of-custody pass over all 467 objects.
- Agent Carter in story order. AoS and Agent Carter folded into the Chapters, with save migration.
- The Sacred Timeline's start-up build-in fixed. The pop-up reads "You can switch paths at any time."
- Weighted clearance levels. Stones on the amber line.
- The ABC shows' files on the MCU tab, with the five duplicates merged.
