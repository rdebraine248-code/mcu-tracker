# Off-screen connections the owner kept (read uni/BRIEF.md first: the owner's rules and the stage format)

The owner's rule for these: "a connection means both people know each other", with an exception: "if one person's knowledge or involvement
in another one has huge consequences" (Bruce Banner and Erskine: recreating his formula made Bruce the Hulk; Valentina and Clint: she sends
Yelena after him). The owner reviewed and kept the pairs in offscreen_keep.json: two Sacred Timeline people (names are unique) who are never
in a title together, tied by dialogue (what's said, where, source given). Write each as a connection in the brief's stage format:
- kind: the honest through-line from the list (ally, friend, family, boss, mentor, rival, enemy, partner). The owner kept them as connections,
  so pick the kind that fits what's said (Gilgamesh and Odin: ally; Kingo and Thor: friend; Zola and Maria Stark: enemy, Hydra had her killed).
- title: the title where it's said ("said_in"), exactly as in uni/story_order.json; a show keyed to its season.
- text: 1 to 3 sentences saying what ties them AND that it's told, not shown (e.g. "Gilgamesh tells the others that Odin himself taught him a
  brew recipe after the Eternals helped Asgard in battle."). Never invent beyond what's said; check the source.
- whoA / whoB as the brief says, from each card's side, short.
Never send personal details in web requests: User-Agent "mcu-tracker-research/1.0" only.
Output offscreen_out.json: { "keep": [ {a, b, stages} ] } with the names exactly as given. Validate as the brief says. Scripts in offscreen/.
Reply with the list and anything you couldn't confirm.
