# Fights with no written connection (Sacred Timeline)

Read uni/BRIEF.md first: the owner's rules and the stage format (kind, title, text, whoA, whoB). The app's villain files list who each one
fought. 137 such fights in fights_mcu_input.json have no written connection yet, and the owner's rule is that every connection is explicit
and has meaning. The fight lists are not trustworthy: one said Yelena Belova fought Bill Metzger in Spider-Man: Brand New Day, and she never
meets him. So for EACH pair: check it against a source (the fandom wiki API, as in the brief; earlier downloads are in w2/dl and w1/raw).
- If they really clash or interact on screen: write the connection in the brief's format (usually enemy, sometimes rival or ally if that's
  the real through-line), with whoA/whoB, keyed to the exact title. Agents of S.H.I.E.L.D., Agent Carter, Daredevil and the other shows must
  be keyed to the SEASON (titles like "Agents of S.H.I.E.L.D. S4", exactly as in story_order.json in uni/), never the show name: the owner
  ruled that every show connection is keyed to its season.
- If they never meet or the fight didn't happen: list it as false, with one line on why.
Output fights_out.json: { "keep": [ {a, b, stages} ... ] (a and b are the names as given), "false": [ {a, b, why} ] }. Validate as the brief
says. Keep scripts in fights/. Reply with counts and the false ones.
