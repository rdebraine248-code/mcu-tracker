# Second check: proposed fixes from the last Network pass

A first checker went over every stage of a Marvel watch-tracker's Network and proposed the fixes in your file. Read
/tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/aud/net/nw/NWBRIEF.md for what a stage is and the
binding rules. Each item: `n`, `pair`, `i` (stage index), `q`, `now` (the stage), `proposed` (fields that change, maybe `split`, a
later stage or a list of them), `evidence`, `source`, and `pair_now` (the whole pair, every stage). Items with `q: "X"` are points a
checker noticed: decide whether they are real and, if so, give the fix in `proposed`.

Check EACH item from scratch against sources you fetch (never memory): **confirm**, **amend** (give the corrected `proposed`), or
**reject**. Also:
- A stage that tells nothing between the two people (only what a third person does) breaks the owner's rule. If something real
  happens between them in that title, rewrite it to that; if nothing does, propose `{"drop": true}`.
- A split must not repeat a stage the pair already has (look at `pair_now`), and its title must be a real episode ("Title#N", "Title
  S2#5"), later than the stage it comes from unless the evidence shows it belongs earlier.
- Names (owner ruling, November 2026, question 37: "keep the current names"): a name the data already uses STAYS even if it comes
  from the credits, marketing or a wiki and is never spoken (Graviton, Scarlet Scarab, the Final Horsemen, Crossbones, Typhoid Mary,
  Hofund and the like): reject a fix whose only point is removing such a name. Still fix a name that GIVES AWAY a later reveal or
  comes from a later title (Fisk named before Daredevil S1#3, "Daredevil" before S1#13, "Bullseye" before Born Again, Thanos named in
  The Avengers, "Thomas Shepherd" before VisionQuest, Doom named in First Steps). Never add a name the screen doesn't use.
- Extended and IMAX scenes count as on screen (owner, question 38).
- Nothing may give away a later reveal; text plain, present tense, no em dashes, no actor names, never "tap/hold/swipe to"; card lines
  short, no sentence opening with "Now", the described person not named first.

Output ONE JSON file: {"verdicts": [{"n": <n>, "verdict": "confirm|amend|reject", "proposed": {...for amend...}, "why": "one
sentence", "source": "URL"}]}. Reply with ONE line: confirmed, amended, rejected. Keep downloads in your work folder. Edit nothing else.
