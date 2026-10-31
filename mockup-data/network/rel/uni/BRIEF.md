# The Network's relationships: the owner's rules (read all of this first)

The MCU Tracker app has a Network page: everyone the viewer has met stands in a room, and tapping someone shows their web of
connections, each with a kind, a few sentences of what they are to each other, and a short line for their card. The Sacred Timeline
(the MCU) is done. Each other universe needs the same pass, to the same standard. The owner's words, which are the rules:
- "Relationship (to include but not limited to family, friends, personal ties etc etc) needs to have a pass done on everyone. This is the
  CRUX of the network page. Each network connection needs to be explicit and have meaning." Family and personal ties are the point:
  parents, siblings, cousins, spouses, partners, best friends, mentors, bosses, teammates, rivals and enemies. Never leave out family.
- Only real connections: shown on screen, or explicitly stated or clearly implied on screen (an off-screen tie counts if it's stated).
  "Just because Wanda was in HYDRA does not mean she's connected to EVERYONE in HYDRA." Sharing a crew or a title is not a connection;
  two people need an actual relationship or interaction that matters.
- "Ensure coherent, none choppy writing even if it means using a couple of sentences." Rejected: "Rumlow leads the strike team Steve
  commands, then turns out to be HYDRA and fights him". Better: "Rumlow leads the S.H.I.E.L.D. strike team that works under Steve. When
  S.H.I.E.L.D. falls, he reveals he has been HYDRA all along and turns on him."
- The kind is the main through-line of that stretch: "Steve and Sharon aren't really partners in that sense. More co workers or allies,
  that's the main through line." A kiss, a fling or a one-time fight doesn't set the kind. ("Jennifer and Matt hooked up and didn't
  officially end up together": friend, not partner.)
- "Relationships can evolve so friends can become partners, allies can turn to foes etc." So each connection is a list of STAGES in story
  order. A new stage only when the relationship really changes, or when a later title adds something the earlier text would spoil. Most
  connections are one stage; 2 to 4 is plenty for the big ones.
- Accuracy first. Never invent. Check every claim against a source. The owner caught made-up ties before (a fight that never happened,
  a meeting with the wrong Jean), so if you can't confirm it, leave it out.

Kinds: family, partner (romantic), friend, mentor, boss (one leads, employs or commands the other), ally (they work together), rival, enemy.

Each stage = { kind, title, text, whoA, whoB }:
- title: where this stage BEGINS, copied exactly from a's or b's "titles" list.
- text: 1 to 3 short sentences of natural prose about THIS stage only, nothing from a later stage or title. Present tense, plain words.
  No em or en dashes and no hyphen used as a dash. No fourth-wall words ("season", "episode", "the film", "the show", "the movie",
  "credits", "flashback", "cameo", "scene").
- whoA: the short line on a's card about b: who b is to a, in at most about 14 words, starting with what they are, from a's side, for
  this stage only. Examples from the owner-approved mockup: "Her cousin. His blood gave her his powers, and he trained her to use them."
  "Her dad." "Daredevil. They face off in court, team up, and have a brief fling." "Sent to kill her. Now on her team."
  "Kate's mother, who paid for the hit on Clint."
- whoB: the same for b's card about a. Get pronouns right for the person each card belongs to (check the source); use a name if unsure.

People are identified by their "id" (several people share a name across worlds, so never use names to identify them in output).
Output: a JSON list of { a, b, stages } with a and b the ids. One entry per pair. Validate it with a script before you finish: ids
exist in the input, kinds allowed, titles in a's or b's titles, stages in story order (story_order.json; a title not in it keeps the
order of its first appearance in the person's titles), no dashes or banned words in text, whoA/whoB present and short, 1 to 3 sentences.

Sources: the person's "record" (the app's own service record, already checked) is the starting point. Check and fill in from wikis
through their APIs with curl or python (a normal page fetch can be blocked; the API works), e.g.
  https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=<Page_Name>&prop=wikitext&format=json&redirects=1
  https://spiderman.fandom.com/api.php?...   https://xmenmovies.fandom.com/api.php?...   https://marvel.fandom.com/api.php?...
  https://en.wikipedia.org/w/api.php?action=parse&page=<Page>&prop=wikitext&format=json&redirects=1 (plot sections)
Save what you download under your own folder and keep your scripts there. Reply with: counts (people covered, connections, how many
split into stages), the family ties you found, 8 sample connections with their stages and who lines, and anything you were unsure of
and left out.
