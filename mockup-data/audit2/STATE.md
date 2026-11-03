# overnight audit state (scratchpad aud/)
Launched: people 01-06, net 01-04. Next to launch: people 07.., net 05.. (keep ~10 running; launch one when one finishes).
Each agent writes aud/<part>/out_NN.json; brief aud/<part>/BRIEF.md. After all out files: verify changes (second checker), apply, sample 600, lock.
No main push. No questions to the owner. Owner calls -> morning report.
Ready to launch: files chunk_01..39 (aud/files), atlas chunk_01..11 (aud/atlas). Parts 5-9 not yet dumped.
Queue order when a slot frees: people -> net -> files -> atlas (people & net first).
NEXT: people 08 | net 05 | files 01 | atlas 01   (done: people 02)
NEXT: people 12 | net 05 | files 01 | atlas 01   (done people: 01 02 05 06; running people 03 04 07-11, net 01-04)
NEXT: people 15 | net 05 | files 01 | atlas 01   (done people: 01-06; running people 07-14, net 01-04)
NEXT: people 18 | net 05 | files 01 | atlas 01   (done people: 01-09; running people 10-17, net 01-04). Main NOT yet pushed with the dcFound fix (3258d94) - owner must say push.
NEXT: people 22 | net 05 | files 01 | atlas 01
NEXT: people 26 | net 08 | files 01 | atlas 01. Pending: suite5 running (b0cxkb6ct) then MAIN PUSH (owner said push: dcFound, orbit cut, network centring).
MAIN PUSHED b1e7cd4 (dcFound, orbit cut, network centring). Test build v132. People 26-32 + net 08-10 launched. NEXT: net 11 | files 01 | atlas 01. After people all done: verification pass on people changes.
Packing commit 571a2bb on branch, suite6 running (b7ox8af6o); NOT pushed to main (owner didn't say push for it). NEXT: net 12 | files 01 | atlas 01
Even ring layout commit on branch; suite7 running (b9jifb6bx); not on main. NEXT: net 16 | files 01 | atlas 01; people 26,27 still running
Ring orbit commit; suite8 running (bp6tyersv). People: 171 changes, 42 owner calls -> verify vchunk_1-5 running. NEXT: net 17 | files 01 | atlas 01
MAIN PUSHED f32017e (honeycomb). Test build v133. People verify done (vout_1..5). Net done 01-17; running 18-27. NEXT net 28. TODO: apply people verified changes (TEAM_FIX/TEAM_LEFT/split left/earths.json); reject Earth-67->6799 (on-screen rule).
People applied (commit). Sample 600: aud/people/sample_01..12 -> sout_NN.json (same BRIEF). Then error rate.
Sample batches 01-06 running; 07-12 to launch. Net 18-27 running; NEXT net 28. People data commit f25b013 on branch (NOT on main; tests not yet run on it).
Suite10 running (bvv67a0pw) for MAIN PUSH of people fixes + Earth-67 (owner said push what can be pushed). Atlas chunks now have leads + P6. Held parked in HANDOFF.
MAIN PUSHED 0282527 (people + Earth-67). Test build v134. Resumed after 5h limit: sample 01,05,06; net 18,20,21,22,25,26,27. Done: sample 02,03,04; net 19,23,24. Launched sample 07-09. NEXT: sample 10-12, net 28-41, files, atlas.
Sample 01-05 done (12 proposed errors in 250 = high; verify them, then categorize -> re-audit by type if >3 confirmed of 600). Running sample 06-12; net 20,26,27,28-32. NEXT net 33.
Net done up to 27 except running 28-36. NEXT net 37. Sample errors ~all G2 (missing moves in shows) -> plan G2-only re-pass for multi-title people after sample+verify.
All net batches launched (41 last). Sample done except 07,10.
Files 01-03 launched. NEXT files 04. Waiting sample 10.
SAMPLE RESULT: 31/605 proposed (29 valid, 5%) -> over bar. Second pass GPASS.md (B backstory, M missing moves) on 1108 multi-title records: g_01..45 -> gout_NN. Launched g01-03. NEXT g04, files 04. After gpass: verify (VERIFY.md) gout+sample changes, apply, new sample 600.
Files export bug fixed (at names); files 01-03 relaunched on new chunks (old out_01 -> out_01_noF5.json). gpass running 01-07. NEXT g08, files 04. Net remaining: 30,33,35,37-41 running. Note: 'In episode 4, In 2018' capital after prefix: fix in EPTAGS prefix code later.
Caps fix a8ad856 on branch. gpass 01-10 launched; files 01-04. NEXT g11, files 05.
NOTE for apply: by-zombie-* group changes must go to split.json steps / network/rel/zombie_timeline.json (episode-level), not only TEAM_AUDIT. NEXT g12.
gpass launched to 15; files to 06. NEXT g16, files 07. Net waiting 30, 41.
NET DONE: 786 changes, 40 owner calls. Verify: aud/net/vchunk_01..18 -> vout_NN (VERIFY.md). gpass to 17, files to 06.
Launched: net verify 01-02, g18-19, files 07. NEXT: net verify 03, g20, files 08.
Done: g06-11,13,14,16,17; files 03,04. Launched g20-23, net verify 03, files 08. NEXT: g24, net verify 04, files 09. Note g11 counted captivity (Tony/Rhodey/Yinsen) - verify should drop per owner rule; g13 Trevor Ten Rings is captivity too.
g18 done. Launched g24. NEXT g25, net verify 04, files 09.
g19 done (0 changes; owner call: workplace groups Eddie/Anne/Gwen band - same question as g18 Riri/Peter/MJ). Launched g25. NEXT g26, net verify 04, files 09.
g12 done (7 ch, 4 calls; Clint/Wanda Raft calls = captivity, drop per owner rule). Launched g26. NEXT g27, net verify 04, files 09.
files 05 done (1 ch Sharon pardon, 2 calls Coulson LMD status, Peggy one-shot order). Launched files 09. NEXT g27, net verify 04, files 10.
g20 done (1 ch Peter 1994 Fisktronics; calls MJ cult=held->drop, Debra ESU=workplace q). Launched g27. NEXT g28, net verify 04, files 10.
files 06 done (4 ch). Episode numbering: season-titled step = within-season (seenRk uses REL_IX[title]+e/1000). files03 Jack Duquesne ep3->12 change is WRONG, drop at verify. BRIEFs clarified. NEXT g28, net verify 04, files 10.
g22 done (1 ch Martha Connors; call Hector Jones Rebellion). Launched g28. NEXT g29, net verify 04, files 11.
g23 done (5 ch Daredevil). Extra for verify: Karen 'Matt's resistance' stage dated BA S2 but group gathers end of BA S1 ep9 (Matt dates it S1) - check all resistance members' title. Launched g29. NEXT g30, net verify 04, files 11.
g21 done (5 ch Spider-Men disband ep65, Six American Warriors; calls Cap 1994, Eddie 1994 Bugle). Launched g30. NEXT g31, net verify 04, files 11.
g25 done (6 ch Iron Fist/Punisher; calls Saunders, Soledad, resistance end). Launched g31. NEXT g32, net verify 04, files 11.
g24 done (5 ch Luke/Malcolm/Misty/Pop; calls Malcolm groups, Reva, D.W.). Launched g32. NEXT g33, net verify 04, files 11.
files 07 done (7 ch). net verify 01 done (44 ok, 1 amended). Launched net verify 04, files 11. NEXT g33, net verify 05, files 12.
NET VERIFY RULE: N6 earlier moves that spoil -> split (value + split stage). Added to VERIFY.md after v01-03. FIXUP NEEDED: v02 rejected n45,50,77,78,82,83,85,86,88,89 (need split); v03 amended 92,97,101,105,118,119,123,125,126,127 (need split stage for cut facts). Run a fixup batch for these 20 under new rule. g26 done (2 ch; calls Savva, Loki TVA end, Blonsky Kamar-Taj).
g27 done (5 ch; call Thanos Endgame). Launched g33, g34, net v05, net fix1 (20 splits). NEXT g35, net v06, files 12.
g29 done (5 ch; call Sadie Deever DODC). Launched g35. NEXT g36, net v06, files 12.
g28 done (6 ch; call Sylvie McDonald's). APPLY NOTE: same key may appear in 2 chunks (Zemo in g14 'Independent (from start)' vs g28 'no groups') - dedupe and normalize 'no groups' vs Independent-from-start to one form at apply. Launched g36. NEXT g37, net v06, files 12.
files 09 done (6 ch). RULE: multi-episode records carry LAST episode covered; files09 TVA k0 and Xavier k0 'drop tag' proposals -> reject at verify. Added to BRIEF. Launch files 12.
g30 done (2 ch Bullseye Army B, T:Elektra Indep; calls Timely TVA, Grotto, Bullseye/Fisk BA S1, Kingpin exile). Launched g37. NEXT g38, net v06, files 13.
LIMIT HIT (5-hour cap, resets 17:00 UTC). Stopped mid-run, resume with SendMessage "continue":
 files08 ac58c2760e5bc560c, files10 a5fc87d64e8dc3de7, files11 ac105862a4e414b5f, files12 af95ec89903764984,
 g31 a6b0c38642d671c10, g32 a31007987a5791803, g33 a6b8f3a328e3708ce, g34 a1769df4c464e8c3a, g35 abbb9f4248d77ed37, g36 a6cf60f884758dc7f, g37 a96bccb756891f433,
 netv04 a818fd0ff88f4af34, netv05 acdab92f1d83af517, netfix1 a89246eb2c3cebbd5.
 If resume fails (worker restarted), relaunch same prompts fresh.
17:05 UTC: limit reset. files08 had finished (54 checked, 7 ch, 2 calls). Resumed 13 stopped agents via SendMessage. Launched files 13. NEXT g38, net v06, files 14.
files 10 done (1 ch Darkhold LMD May). Launched files 14. NEXT g38, net v06, files 15.
g31 done (13 ch Hand K'un-Lun B, Russo, Rawlins, IGH, Trish TV, Davos). PATTERN for verify: New York Veteran Support Group as a group (Lewis Wilson proposed; Curtis Hoyle g25 noted) - treat both the same, likely owner call with workplace q. Launched g38. NEXT g39, net v06, files 15.
g35 done (1 ch Shocker 1994; call Rhino Fisk stage place). Launched g39. NEXT g40, net v06, files 15.
g32 done (7 ch AoS; calls Zabo, Eli Morrow). APPLY CHECK: g32 uses titles not in record (Garrett 'AoS S7', Radcliffe 'S4') - at apply, validate every proposed title is a real title id in TITLES/REL_IX, whatever the record uses. Launched g40. NEXT g41, net v06, files 15.
g34 done (2 ch Hobgoblin, Kingpin 1994; calls Electro 1967 team-up, Doc Ock Battleworld). Launched g41. NEXT g42, net v06, files 15.
g37 done (7 ch: Cassandra Nova's Henchmen for D&W Fox villains - new group name, ties to held Void-variants call; call Sentinels DOFP). Launched g42. NEXT g43, net v06, files 15.
files 11 done (2 ch Fitz cryo pod). Launched files 15. NEXT g43, net v06, files 16.
g36 done (5 ch SSM/Noir; calls Hammerhead SSM Tombstone org, Fox Magneto Last Stand). Launched g43. NEXT g44, net v06, files 16.
files 12 done (3 ch Kree beacon, Krylar ship, Monolith). Launched files 16. NEXT g44, net v06, files 17.
g33 done (2 ch Sarge, Morgan le Fay; calls Deschaine, Goblin 2002 Oscorp, Sarge SHIELD). Launched g44. NEXT g45, net v06, files 17.
net fix1 done (20 amended with splits; v02/v03 verdicts for those n superseded by vout_fix1). Launched net v06. NEXT g45, net v07, files 17.
g41 done (1 ch T:m-baku matches A:m-baku). APPLY CHECK: twins (A:x vs T:x) must agree on groups after apply - run a twin-diff script. Launched g45 (last gpass), files 17. NEXT net v07, files 18; then people VERIFY of all gout.
g40 done (3 ch; calls Brannis Leviathan, Donnie Gill relapse, Agatha Stark Pictures). files13 done (1 ch Redwing; calls Soul stone order, Redbook). PEOPLE VERIFY ready: GVERIFY.md, gvchunk_01..10 (219 items: done gouts + 31 sample changes; g38,39,42-45 to add later as gvchunk_11+). Out: gvout_NN.json. NEXT as slots free: gverify 01.., net v07, files 19.
net v04 done (34 ok, 11 amended incl 10 splits). Note n168 Mike Peterson cut fact has no S2 stage - add split at apply if missing. Launched gverify 01. NEXT gverify 02, net v07, files 19.
g45 done (0), g39 done (3 ch WI/zombies; calls Strange Supreme, Zola, Quill 1988). Launched gverify 02, 03. NEXT gverify 04, net v07, files 19. Later gvchunk_11+ from g38,39,42,43,44,45.
files 14 done (2 ch billy club pen, spider suit Endgame). Launched files 19. NEXT gverify 04, net v07, files 20.
g42 done (1 ch Nagel; calls Comanche Indep, Herbert Landon Brand). NEW PATTERN lead: records with EMPTY groups though the person is in a group throughout (Domingo Colon - Colon Crime Family; Man-Bull/Porcupine/Saracen - Abomaste). GPASS didn't cover this kind; after people verify, scan all empty-groups records vs wiki affiliation (a 'G0 missing membership' pass). Launched gverify 04.
g44 done (1 ch Frank Dean; call AWOL Dark Dimension). Launched gverify 05. Remaining gpass running: g38, g43.
g43 done (4 ch; calls Scorch, Vernon Masters). Launched gverify 06. Only g38 left in gpass.
GPASS ALL DONE (45). g38 6 ch; calls Omega Red Soviet, Doom VDI. gvchunk_11 = 15 items from g38-45. 21 dup keys across gout/sample (17 sample changes re-found by gpass = good); reconcile at apply. Launched gverify 07. NEXT gverify 08-11, net v07, files 20.
G0 PASS ready: G0.md, z_01..08.json (194 empty-groups records) -> zout_NN.json. Launch as slots free after gverify.
net v05 done (30 ok, 15 amended). (VisionQuest: HANDOFF says the VisionQuest audit is dropped, do not bring it up.) n192 Davis/Coulson may need S4 stage. Launched net v07.
files 17 done (4 ch Adam, Agatha x2, Bob; call Agatha ghost status). Raft 'Active' is a valid app status (RF_ST) - brief list fixed, not an error. Launched files 20.
files 16 done (0 ch). Launched G0 z01. NEXT gverify 08, files 21, z02.
gverify 02 done (12 ok, 1 amend, 11 reject - mostly captivity stages). Zombie horde stages kept (dataset pattern: zombies in Queen of the Dead's Army; zombie changes go to split.json steps at apply). Launched gverify 08.
files 15 done (1 ch skull vest). FILES VERIFY must also look at 'passed but noted' items: Elektra sai k0 (fights with sai before getting them), Rabbit in a Snowstorm Damaged vs Destroyed, Nadeem video sends vs left - collect all such 'noted' items from out_* reports into the files verify. Launched files 21.
files 15, gverify 04 done (17 ok, 4 amend, 3 reject captivity). APPLY CHECK: gv items' 'now' differ from all.json for some keys (Selvig, Monica, Sharon, Ross) - all.json is pre-first-pass dump; at apply, compute from LIVE data (index.html TEAM_FIX+TEAM_AUDIT applied) and check 'now' == live before applying, else re-derive. Launched gverify 09, 10.
gverify 05 done (19 ok, 4 amend, 1 reject). PATTERN: Landman and Zack is backstory for Matt (i111) - apply same to Foggy/others with L&Z stage; i189 (sample copy) conflicts, use i111. Ta Lo name = 'Ta Lo'. Launched gverify 11, z02.
z01 done (5 ch new group names: Monster Hunting Cabal, Council of Godheads, Cassandra Nova's Henchmen, Loki Bandits, Muspelheim; 4 calls Klaue Intelligencia, Dormammu Zealots, Sinister Strange, Arishem). Launched z03.
gverify 01 done (18 ok, 3 amend, 3 reject). Launched z04.
gverify 06 done (22 ok, 1 amend, 1 reject). NORMALIZE at apply: no group = EMPTY groups (never an opening Independent / 'Independent (from the start)'); drop 'left' entries whose stage was removed (Ghost AatW, Ammit Moon Knight, Lion EoW, Batroc CA:TWS). Zemo A/T both empty. Launched z05.
gverify 03 done (17 ok, 6 amend, 1 reject). OWNER CALL (grouped): mind-controlled/possessed memberships - my GVERIFY added 'mind-controlled is not a move' as an extension of the owner's captivity rule; owner never said it. Cases: Morph Nasty Boys (removed by gv03), Jean/Phoenix Inner Circle via Mastermind (existing), Gambit Horsemen '97 S2 possessed (existing), zombie Queen of the Dead's Army (kept), Gargantos (z01). Ask owner one question: do mind-controlled memberships count? Apply consistently after answer; until then keep existing stages, hold new removals. Running 15 now - wait.
files 19 done (8 ch; F2 episode moves Alexandra/Hoffman/Wolf/Confederacy - check vs last-episode convention at verify). Launched files 22.
gverify 10 done (3 ok). files 18 done (8 ch HYDRA order + 5 side-change records; calls HYDRA ep30->23 = same as files03 Howling Commandos ep30->23 pattern, step13 status). Launched files 23, z06.
gverify 07 done (16 ok, 4 amend, 4 reject). i164 Hellfire Hive rejected as mind control -> goes into the mind-control owner call (hold). Launched z07.
net v06 done (20 ok, 20 amend, 5 reject). PATTERN: Father Lantom dies DD S3E10 not E11 - files07 also fixed k3; at apply grep all data (network, files, atlas, comms) for Lantom death ep 11 and fix together. Launched net v08.
z02 done (2 ch Morgan's coven, Diamondback Stokes; 4 calls Healy, Radcliffe, Deschaine ring name, Knull Xenophages). RECONCILE: Morgan le Fay - use existing name "Morgan's coven" (z02) not g33's 'Morgan le Fay's Coven'; Wizard (company) = workplace -> owner q. Launched z08 (last G0).
gverify 08 done (20 ok, 4 amend). FIX at apply: i190 Michelle donut shop = workplace -> hold for owner workplace q (don't apply the Independent). Cassandra Nova's Henchmen confirmed for 7 - but ties to held Void-variants call; apply only if owner OKs. Launched net v09.
files 20 done (6 ch). Its owner call on Raft 'Active' is moot (valid app status) - drop. Launched files 24.
gverify 11 done (12 ok, 1 amend Magneto rejoins '97 S1, 2 reject). Only gverify 09 left.
z05 done (6 ch; 4 calls), z06 done (8 ch; 5 calls). net v07 done (32 ok, 11 amend, 2 reject; n314 B-15/Renslayer split may duplicate another chunk's stage - dedupe at apply). Launched net v10, files 25. Live tm dumped: aud/live_tm.json (via http://localhost:8765 on out/mainroot).
z03 done (4 ch: Kravinoff Criminal Empire, Spider-Catchers x3; 4 calls). z07 done (4 ch; Rosalie Carbone already live = no-op). Live dump: no-group records have tm undefined (absent from live_tm.json) - not missing records. gvchunk 'now' matches live for all but sample-shaped items. Launched net v11, files 26, 27.
z04 done (6 ch; 4 calls). Only z08 left in G0; then build zvchunk for second check (GVERIFY).
G0 ALL DONE. z08 2 ch; calls Lia, Edgar Vance familiar, Candra. zvchunk_1/2 built -> zvout_1/2 (GVERIFY). People verify (gv) all done: 204 accepted, 30 rejected (apply2_raw.json). Rule: E1 Earth-6799 for 1967 records rejected (owner rule: app uses on-screen Earth-67).
!! RULE CORRECTION (HANDOFF lines 751-756, 968-): brainwashed/forced/undercover service COUNTS; ANY organization counts (companies = workplaces, schools, bands); one-job hire/captive/victim/ally don't; group name must be SAID ON SCREEN (no fan-wiki labels). My GVERIFY/G0/GPASS 'workplace' and 'mind-control' exclusions were WRONG. The two planned owner questions (workplaces, mind control) are ANSWERED by HANDOFF - drop from morning report.
 Fix pass launched: rfix_names (22 new wiki names -> on-screen check) -> rfix_names_out.json; rfix_people (35 workplace/brainwash cases) -> rfix_people_out.json. Rules in people/RULES_HANDOFF.md.
 TEAM_AUDIT2 already in index.html on branch (not main) - will be revised after fix pass (names, Morgan's coven, etc). Files verify/net verify briefs should get the 'name said on screen' rule too.
 files 26 done (6 ch), files 24 (0), files 27 (2 ch, 1 call Miriam ep 23), files 21 (13 ch; call Zhou Cheng). zv1 (17 ok,1 amend), zv2 (15 ok,1 amend,2 reject).
files 29 (4 ch; 3 calls Morph status, Rogue ep, Nightcrawler), files 30 (2 ch), net v08 (30/15/0), v09 (22/21/2), v11 (38/7/0) done. Net notes: n315 B-15/Renslayer ordering needs vchunk_07 stage0 move; n346 season-level vs #22 order; n403 McCaffrey title later. Launching net v12-15, files 33-36.
files 28 done (10 ch; calls Spot place, Genosha status). Launched files 37.
!! BACKSTORY REVERT: GPASS kind B ("backstory is not a stage") was MY invention and contradicts HANDOFF 754 (hero file notes a villain past even outside its titles; hero and villain files list the same groups); ct49 failed on Winter Soldier's U.S. Army. Reverted 67 B-only keys (left at live), merged 3 mixed (Fury, Loki, Luke). TEAM_AUDIT2 now 110 changes; left add 51, del 3. ct49 ok. Factual G1 removals kept (Forge title, Emma X-Factor, Elena Slingshot, Tafari, Enoch, Cottonmouth). Sample "errors" of the backstory type were not errors.
 net v10 done (22/21/2). Launched net v16.
files 31 (0), 32 (2 ch) done. Launched files 38. Left: files 39, net v17-18, then files verify, net apply, people sample 600.
22:00 second LIMIT hit at ~21:5x; resuming: rfix_people afcc78c0ee1f97a84, rfix_names a1e93ad447b3462ad, files33 aa8dd45c4b4044435, 34 a7c220021a7f0154b, 35 aa7ecbf3d6dbcbf5e, 36 a1139da98a10a4365, 37 a7e9124c88e1fc3bd, 38 aa64c047a15970a3e, net12 ab5de5eae6661a172, 13 a331ea856eb656e4d, 14 a5d2c4474b3f50aef, 15 a5deb3453789734eb, 16 a1d343f6a43a31663
files 35 done (2 ch). CHECK: zombie Peter/Scott/Katy fate - HANDOFF 820 says Wikipedia: they die in Marvel Zombies ep4; files35 kept 'Missing/fate unknown'; HANDOFF 702 says 'unknown fate (not dead)' - conflicting lines; resolve at files verify (look at which is newer/owner).
files 38 done (2 ch).
files 34 (1 ch; calls Horsemen group Deceased, 'The Omegas' name). net v14 (1/43/1). FILES VERIFY: FVERIFY.md, fvchunk_01..07 (135 items from out_01-36,38; 37/39 later as fvchunk_08) -> fvout_NN. owner_calls_files.json (24). Launched fv01-04.
files 37 done (8 ch). Launched fv05.
rfix_names done: 8 keep, 3 rename (Morgan's coven, President Loki's army, Council of the Gods), 4 none (Muspelheim, Russian Armed Forces, Latveria, Tivan Group: drop), 7 owner (Lighthorsemen, Cassandra Nova's Henchmen, Monster Hunting Cabal x2, Kravinoff, Colon Crime Family, Spider-Catchers: HOLD, don't apply).
net v13 done (17/27/1). Launched fv06.
net v15 done (16/29/0; Battleworld card line n633 name unconfirmed). Launched fv07.
net v16 done (37/8/0).
FILES PART DONE (39/39). files 39: 6 ch. fvchunk_08 (37+39).
rfix_people done: 18 changes, 1 no change (Donnie Gill), 16 owner calls. SCHOOLS: HANDOFF lists agencies, armies, companies, crews - schools were MY extension; hold student-at-school stages as one owner question ("do schools count?"). Second check rvchunk_1 (18) -> rvout_1, told to strip school-as-student stages.
files fv01 (9/1/10), fv02 (8/3/9), fv03 (16/2/2), fv04 (16/1/3). net v12 (17/24/4), v18 (13/8/0).
NET APPLY: aud/net/build_fix.py -> stage_fix_zaudit.json (rel/). relbake patched: edit.title; line_fix matches by text within pair too. Dry run: stage fixes 1012, 708 'stale' = the card lines the audit itself replaced. New card lines (1321) need the owner's card-line style (network/cards/BRIEF.md) -> lines_NN.json style pass.
fv07 done (11/4/0). Launched card style passes 1-5, rvchunk second check.
NET VERIFY ALL DONE (18 + fix1). net v17 (35/9/1). Card style passes 1-7 done (163 changed of 1321), pass 8 for 54 v17 lines running. stage_fix_zaudit.json has styled lines; after pass 8, apply ids then copy to rel/ (repo + scratch), run pipeline. FILES VERIFY ALL 8 DONE (fv06 16/1/3, fv08 11/2/1, fv05 15/4/1). Next: build STEP_AUDIT for files (runtime block in index.html; re-key AT_CASE). live_files.json = raw st/ac; place names via ATLAS walk (dump3.js).
FILES APPLIED: STEP_AUDIT block after HANDOVER in index.html (108 files, 120 changes; 29 rejected), AT_CASE re-keyed, ep_tags.json recomputed for 43 files, handover drop flags carried. Verified: all 108 match, 0 untouched files changed. rvout_1 done (7 ok, 5 amend, 6 reject).
PEOPLE APPLIED v3 (apply3.json: 131 group changes, departures list 250, names per on-screen check, 8 names held). NETWORK APPLIED: rel/stage_fix_zaudit.json (1065 stage fixes incl prior; 0 warnings), card lines styled; network rebuilt. Full suite running.
SUITE: all 33 pass on branch build (content: 0 fails; flags places 165, alive-again 39). HANDOFF updated (mistakes 26-27, audit status). PEOPLE SAMPLE 600 launched: SBRIEF.md (BRIEF + RULES_HANDOFF + held list), s2_01..12 -> s2out_NN (seed 20261104, from all_now.json). Morning calls triage agent running -> morning_calls.json.
people s2out_08 (1 ch zombie Ikaris not in Survivors; 4 calls), s2out_09 (2 ch, 1 call). FILES SAMPLE 600: FSBRIEF.md, fs_01..12 (512 files, 600 drawn steps) -> fsout_NN; launched 01-02.
people s2out 02,06,11,12 done. Pattern: missing EMPLOYERS (Shang-Chi Fairmont, Vanessa gallery, Morbius Horizon Labs, Alexei limo, Madeline shop, Ben Parker FDNY) - HANDOFF says companies count but the Oct sweep never added minor jobs: make it ONE owner question (how far: every employer even minor jobs?) not a night pass. Mechanical: stages keyed to whole multi-season show (lesson 7): Dottie Leviathan 'Agent Carter'->'Agent Carter S1', Rama-Tut 'X-Men '97' -> S2 (ep14). Launched files sample 07.
PEOPLE SAMPLE (11/12 in): 27 proposed changes. ~11 are missing EMPLOYERS (owner question on scope). Real non-employer errors ~13: Matt Landman&Zack (MY apply: gout_23 amend dropped it as backstory, not reverted - fix), Fennhoff Soviet army (backstory past counts), Dottie (season key), Ward HYDRA S2E22, Doctor/Fitz Izel (possessed service counts), B'Kai Greek army undercover, zombie Zemo left, Sam USAF FATWS, Joy left S2, Deathlok SHIELD S1E10, zombie Ikaris, Robert Minoru V1, Comanche left (undercover counts), AWOL. => >3 wrong: per owner bar, re-audit aimed at the error types (corrected rules: past/backstory memberships, undercover/brainwashed/forced service, missing moves, season keys). Next: second-check the 27, then targeted pass.
PEOPLE SAMPLE ALL 12 IN: 27 proposed (s2out_05: 0 ch). Second check svchunk_1/2 -> svout_1/2 (SBRIEF rules). morning_calls.json ready: 34 questions (102 items), 30 settled fix entries (166 items), 2 moot.
svout_2: 11 confirm, 2 reject (Robert Minoru twin link = group file, AWOL keeps LAPD). Employers confirmed: Alexei limo, Shang-Chi Fairmont, Vanessa gallery, Schultzes Testament, Owlsley Silver & Brent, Cassie FDNY, Morbius Horizon Labs - HOLD employers for owner scope question (don't apply). files fsout_02: 0 ch.
SAMPLES DONE. People: 12 confirmed non-employer errors /600 (Matt L&Z, Fennhoff, Dottie, Ward, Doctor/Izel, B'Kai, zombie Zemo, Sam USAF FATWS, Joy left, Deathlok, Ikaris, Comanche) + 13 employer (held for owner) -> FAILS bar (2%). Files: 11 proposed /600 -> second check fsvchunk_1 -> fsvout_1.
People recheck fixes applied (apply4: 140 changes; Matt L&Z, Alisa/Malus IGH restored; Rama-Tut S2; zombie Zemo/Ikaris steps in split.json). Network rebuilt.
FILES SAMPLE VERIFIED: 7 confirmed of 11 (0-8-4 status, Nightcrawler Deceased, Strange watch, Warriors Three, Doctor ep86 + no Siberia [MY place error], The Thing text) -> FAILS bar (>3). MORNING REPORT published https://claude.ai/artifact/ABJLLQ9XwpJvrReuCNjfny . NETWORK SAMPLE 600: NSBRIEF.md, ns_01..12 (586 pairs) -> nsout_NN, all 12 launched.
Files recheck fixes applied (7 into STEP_AUDIT, 113 files, ep_tags updated; verified).
PEOPLE AIMED RE-AUDIT ready: RBRIEF.md, r_01..51.json (30 each, from all_now2) -> rout_NN. Launch as slots free.
LIMIT 3 hit (~00:xx UTC), resets 03:00 UTC. Stopped: net samples ac8156849db8b8808(01) a456480357fc0546b(02) a6713342568102a95(03) aa4a14482a02dba7f(04) a6fbc3a07e2f51edd(05) a4ee1d9366b42dc25(06) a81f1012f80828bd3(07) a07181c462a7dd4be(08) ab668407784af1b59(09) a6ceb06a9939c4c91(10) a4c1cba4af15a60ed(11) a0eaf858b6419bdd3(12); people re-audit a501730c6eaefcdd5(r01) ad3c7211b88195b63(r02).
Twin sync (hero/villain same groups) tried and REVERTED: villain files key past groups to their own first title (ct49). Follow-up: sync with re-keying. 10 pairs: lash, anim phoenix, gambit-death, winter-soldier, white-vision, power-broker, bob-sentry, silver-surfer, lizard 1994/ssm.
NET SAMPLE: ns08 4 ch, ns09 6 stage fixes (+5 splits) -> already >3: Network FAILS bar. Main error type: N6 stage starts too late (facts first hold an earlier episode) + some N2 text. Re-audit aimed at N6 across all pairs needed. People re-audit r01 (4 ch), r02 (3 ch, 1 call) done; r03-06 running.
net ns01 4, ns02 4, ns03 9, ns06 6, ns10 2-3, ns11 10, ns12 4 changes (+ ns08 4, ns09 6). Error types: N6 late start AND N2 wrong text facts. Network re-audit must recheck N2+N6 on all stages. people r04 0, r05 1, r06 0, r07 2. Running r03,r08-r18; net ns04,05,07.
net ns04 9, ns05 11, ns07 5 (all 12 done). people r03 4, r09 3, r13 1, r15 0, r17 0. Running r08,r10-12,r14,r16,r18-20; launching r21-25.
people r10 1, r12 2, r18 0, r19 1, r20 0, r21 0, r22 0. NET SAMPLE SECOND CHECK: vsc_01..04 (80 changes from nsout) -> vscout_NN, launched. Running r08,r11,r14,r16,r23-31.
people r14 1, r16 1, r23 4, r25 0. NET AIMED RE-AUDIT ready: NRBRIEF.md (N2+N6 only, split rule), nr_01..53 (120 stages each, grouped by show; skip_stages = vsc items) -> nrout_NN. Launched nr01,02, r33. Running r08,r11,r24,r26-33, vsc01-04.
people r11 6, r24 0, r27 0. FILES AIMED RE-AUDIT ready: files/FRBRIEF.md (F1,F2,F3), fr_01..50 (110 recs, from live_now.json 2146 files 5509 recs) -> frout_NN.
people r08 6 (3 calls), r26 3, r29 3. Launched fr01, r38, r39.
people r30 2, r31 0. PEOPLE SECOND CHECK wave1: rvchunk_01..03 (48 items from 30 routs listed in rv_wave1_files.json) -> rvout_NN (GVERIFY.md).
people r33 3, r38 0. rv01-03 launched (51 items incl r33). Running: r28,32,34-37,39-41; vsc01-04; nr01-02; fr01; rv01-03. NEXT: r42-51, nr03.., fr02..
people r28 2. vsc03: 18 conf 2 amend (n57 Sheila split to Brand New Day; n58/59 depend on n60 in vsc04; n40 on n39).
people r32 4. vsc01: 14 conf 6 amend (splits kept). NOTE n19 B-15: Renslayer custody fact belongs to S1#5, check a stage exists at apply.
people r35 2, r39 2. vsc04: 12 conf 6 amend 2 rej. Waiting vsc02.
people r37 1, r40 2, r41 0, r43 0. nr02 10 ch. NET SAMPLE FIXES APPLIED: rel/stage_fix_zsample.json (66 pairs, 23 stages added; n40 dup dropped; 2 rejected in aud/net/zsample_rejected.json); verified 90/90 in rel.json. NOTE nr_* indices predate zsample: apply nr changes by matching now.text, not i.
