# Missing connections in the Sacred Timeline (read uni/BRIEF.md first: the owner's rules and the stage format)

The Sacred Timeline's connections were written, but some real relationships were missed: Thor has no connection to Nick Fury or Natasha
Romanoff, Bruce Banner none to Clint Barton, Groot none to Mantis, Loki none to He Who Remains, Sylvie none to President Loki or Alligator Loki.
The owner will look at Thor's web and see Natasha missing within ten seconds. Your file gaps_<N>.json lists pairs who share titles but have
no connection: { a, b, shared } (names; Sacred Timeline names are unique). Many are only crowd co-appearances (everyone at Tony's funeral):
those are NOT connections. The owner: "Just because Wanda was in HYDRA does not mean she's connected to EVERYONE in HYDRA."

For each pair decide from what actually happens on screen (check sources as BRIEF.md says; earlier downloads in w2/dl and w1/raw):
- A real relationship: teammates who actually work together and interact (fellow Avengers who fight side by side and talk, the Guardians as a
  family), family, friends, a boss, a mentor, a rivalry, enemies who really clash, a meaningful one-time interaction that matters. Write it in
  the stage format with whoA/whoB, through-line kind, staged if it evolves (Thor and Loki style). Key every show stage to its SEASON exactly
  as in uni/story_order.json ("Agents of S.H.I.E.L.D. S4", never the bare show name); the owner ruled that every show connection is keyed to
  its season.
- No real relationship (shared a crowd, a title, a battlefield without interacting): list it under "none".
Output gaps_out_<N>.json: { "keep": [ {a, b, stages} ], "none": [ [a, b] ] }. Validate as BRIEF.md says (names unchanged, titles must be in
story_order.json). Keep scripts in gaps/<N>/. Reply with counts and 10 of the most important connections you added.
