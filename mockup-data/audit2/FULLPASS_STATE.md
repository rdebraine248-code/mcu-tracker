# Full pass (owner: "Full pass yes", 4 November 2026): every title makes sense on its own
- fp/chunk_001..089 (by title; films are 001..048, then show seasons). Brief fp/BRIEF.md -> fp/out_NNN.json.
- Second check: fp/VERIFY.md, items built with a mkv like fm/mkv.py (adds + owner calls), -> fp/vout_NNN.json.
- Apply: new stage_fix file (sorts after zzzzzzzzzzzz_sample7), one per wave; rebake; test build after the films wave.
- Family batch (fm/): out_01..08 done; second checks vout_01 done, vvout_2..4 running (vv_2..4 = fm batches 02..08 merged).
- Launched fp 001-080 (081-089 to go; 045 done). Films second check: fv_01..14 -> fvout_01..14, all launched. Apply films with fm/apply.py-style builder -> stage_fix_zzzzzzzzzzzzzz_films.json (14 z).
