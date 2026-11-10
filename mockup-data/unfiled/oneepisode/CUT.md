# One-episode guests: keep or cut

A Marvel watch-tracker app recently gained files for show characters it had left out. The owner finds the shows now far too
crowded next to the films and has ruled (10 November 2026): a new show person whose WHOLE presence is ONE episode is cut, unless
that episode's plot turns on them. Your batch lists new files that may be one-episode guests (each has one service-record step,
or the wiki credits them in one episode). For each one, find out and decide.

## Decide
1. How many episodes are they ON SCREEN in, across every title? Count real appearances only (not a mention, a photo, a recap or
   reused footage). Use the person's wiki page `page_file` (its appearances list and history), the episode transcripts and the
   file's own steps. A single step can cover several episodes of one season, so do not count steps.
2. In more than one episode, or also in a film or another show: KEEP (`"v": "keep"`).
3. In exactly one episode: CUT, unless that episode's plot turns on them. It turns on them when they are the episode's villain or
   main antagonist, the case, client, victim or target the episode is about, or the person whose choice decides how it ends. A
   helper, witness, guard, doctor, colleague or relative with a few lines in someone else's story is CUT. Judge what they do on
   screen, never billing.

## Sources
- `page_file`: the saved wiki page (read it). The wiki API: `https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json&redirects=1`.
- Transcripts: springfieldspringfield.co.uk `view_episode_scripts.php?tv-show=SLUG&episode=s01e01`. Wikipedia episode summaries.
- curl with `-A 'mcu-tracker-research/1.0'`, about half a second between requests, nothing personal. If the wiki answers 429, use
  the saved page and transcripts.

## Output
ONE JSON file at your output path: {"d": [{"id": "...", "v": "keep|cut", "episodes": N, "why": "one plain sentence: where they
appear and, for a one-episode keep or cut, what they do in it"}]}. Every person gets an entry. Decide each person on their own;
no script or keyword decides a verdict. Reply with one line: keep, cut.

## Added by the owner: important connections stay
"Unless the connection is important like family, spouse, boss etc." A one-episode person is also KEPT when they are family
(parent, child, sibling, grandparent), a spouse or partner, or the boss (employer, commanding officer, leader) of someone the app
has a file for. Look at the file's ties and steps and at the wiki page. Say the connection in `why`.
