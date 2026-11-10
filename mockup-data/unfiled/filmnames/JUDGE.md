# Who gets a file: film people cut only because their name is never said

A Marvel watch-tracker app has files and Network bubbles for characters. Earlier passes left out film characters whose name the
film never says or shows (only the credits name them). The owner has now ruled (10 November 2026): "Their names needed to be said
on screen is a bad rule i think. May times maybe characters won't have their names mentioned." So for FILMS the name test is gone.
Your batch lists film people cut that way. Re-judge each one on what remains of the rule.

## The rule now (films)
A person gets a file when they have LINES and a PART IN THE PLOT, judged on what they do on screen, never on billing. Their file
uses their credited name.
- In: someone whose actions move a plot (a henchman with a job in the story, a colleague who helps or hinders, family with scenes
  that matter to a lead, a target, a witness the story turns on, a leader who gives orders that drive events), or someone who
  speaks across several films.
- Out: no lines; one short scene that changes nothing; only mentioned or in a photo; a real person as themselves; a creature or
  symbiote with no character of its own (it never speaks or acts for itself); a group.
- The credited name must be a NAME, not a job description: "Tall Zealot", "Commando", "U.S. Marshal", "Secretary of State",
  "Mohawk" (a haircut) stay out (the owner's own call: "Tall Zealot" is OUT). Titles that work as names ("Madame B.", "Mainframe",
  "Mr. Fox") are fine.
- Someone the app already has under any name is out (say who: `same_as`). Someone who is only another character in disguise is out
  (say whose file covers it).
- A group file that covers someone is NOT a reason to leave them out (the owner: crew members get their own files; the group file
  stays). So the Howling Commandos and the Werewolf by Night hunters are judged one by one.
- A logo on clothes is not a group; footage of someone (archive clips, a play) is not an appearance.

## Sources (read before deciding; never decide from memory)
- `page_file` (when set): the person's saved wiki page. Read it in full.
- When `page_file` is null, or to check what they do: the film's transcript on springfieldspringfield.co.uk
  (`movie_script.php?movie=SLUG`, find SLUG with `movie_scripts.php?search=WORD`), Wikipedia's plot summary, and the wikis'
  API (`https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=PAGE&prop=wikitext&format=json&redirects=1`, the
  same on marvel-movies.fandom.com for non-MCU films). curl with `-A 'mcu-tracker-research/1.0'`, about half a second between
  requests, nothing personal. The wikis may answer 429: use the transcript and Wikipedia then.
- `why_out` is the earlier reason, kept for context: the name half of it no longer counts; the rest (lines, part) still does.

## Output
ONE JSON file at your output path: {"d": [{"key": "...", "v": "in|out", "side": "hero|villain|neither", "why": "one plain
sentence naming who they are and what they do on screen", "same_as": "app file they already are, or null"}]}. `key` is the item's
key, unchanged. Every person gets an entry. Decide each person on their own; no script or keyword decides a verdict. Reply with
one line: in, out.
