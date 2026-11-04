# Audit part 9: the Multiverse map, the Incursions wall and the Watcher's realities

Read /tmp/claude-0/-home-user-mcu-tracker/aaa79d4d-b5f9-504f-8213-f9273ae90195/scratchpad/atlas/BRIEF.md first: its rules, evidence
rule and sources apply. Your batch (`kind`):
- **multiverse**: the Multiverse map's places (each an Earth or reality): `n`, `r` (a line about it), and entries `[title, sub, text,
  season label]` ("Title#N" is the show's running episode). Check each entry happens in that reality, in that title and episode, and
  is true; check the Earth number is the Marvel Database's or one said on screen (Marvel's "B" numbers are used where they exist; What
  If...?'s unnumbered worlds use the Marvel Database's temporary TRN numbers, marked unofficial, on purpose). `leads`: file entries
  pointing at a Multiverse place with no entry for that title: propose the entry, or say it's the wrong place.
- **incursions**: the Incursions wall: Earths of older or outside Marvel productions (`n` the Earth number, `r` the production and
  year, entries with what happens). Check the Earth number is the one the Marvel Database gives that production (a hoax or invented
  number is an error), the production and year, and every fact in the entries. The app's framing (the TVA marks these worlds
  terminated) is a deliberate device: don't flag it.
- **watcher**: the Watcher's other-reality boxes. Their titles are MADE UP on purpose (twists on real titles): never flag them. Check
  only that each box's hero and premise match the What If...? episode it comes from (who the hero is, the twist).

Output ONE JSON file: {"checked": [...], "changes": [{"key": "<place id>#<entry> or <place id> or <box title>", "q": "...", "now": ...,
"proposed": ..., "evidence": "...", "source": "URL", "confidence": "high|medium"}], "owner_calls": [...]}. Reply with ONE line:
checked, changes, owner calls.
