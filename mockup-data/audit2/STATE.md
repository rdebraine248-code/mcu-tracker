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
