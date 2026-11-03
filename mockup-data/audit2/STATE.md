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
