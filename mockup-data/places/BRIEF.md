# Write new Atlas places and entries for a Marvel watch-tracker app

The app's Atlas is a set of maps. Each place: {"id", "n" (name), "r" (region line shown under the name, e.g. "Upstate New York"),
"at" (coordinates), "e" (entries: [title, sub, text], one per title that happens there)}. An entry shows only once its title is watched.

## Entry style (match the existing Atlas; see atlas.json for real examples)
- title: the app's exact title string as given in your input (episode titles look like "Agents of S.H.I.E.L.D.#62"; keep them exactly).
- sub: a short spot label if useful ("The Triskelion, 1989", "Brooklyn"), else "".
- text: ONE sentence, present tense, 10 to 25 words, saying what happens there in that title. Plain English. No em dashes, no actor
  names, no instructions to the reader, nothing from later titles (spoiler-safe for that title).

## Locations: look them up, never guess
The owner caught several places wrongly marked "Location unknown" that a quick search answers (Tony's lake house: upstate New York;
Afterlife: Nepal; the Lighthouse: under Lake Ontario). For every place, find its in-story location from a source: Wikipedia
(https://en.wikipedia.org/w/index.php?title=<Page>&action=raw) or the fan wikis through their API
(https://marvelcinematicuniverse.fandom.com/api.php?action=parse&page=<Page>&prop=wikitext&format=json; also marvel, spiderman,
xmenmovies, marvelanimated). Their /wiki/ pages return 403. Send header User-Agent: mcu-tracker-research/1.0 and nothing personal; space
requests a second apart. Record the URL you relied on in "source". Use "Location unknown" ONLY when the sources genuinely give no
location, and say so in "note". Real-world places get real lat/lon. Fictional places with a stated real-world location (a base, a
facility, a fictional town) get that location's lat/lon.

## Output
Write JSON to the output path you're given:
{"places": [{"view", "inside", "id", "n", "r", "at", "e": [[title, sub, text], ...], "source", "note", "steps": [the input steps it serves]}],
 "entries": [{"place_key", "e": [title, sub, text], "source", "note", "steps": [...]}],
 "retag": [{"steps": [...], "place_key", "why"}], "skip": [{"steps": [...], "why"}]}
- view/inside: as in your input ("earth"; "city" with inside "ny"/"la"/"london"; "cosmos"/"beyond"/"multi"; "uni" with inside the
  universe key like "fox").
- place_key for existing places: "id|view|inside" exactly as atlas.json gives them (inside "" when none).
- ids: short lowercase, unique against atlas.json.
- City places ("city" view): "at" is the spot's [lat, lon] inside that city; the spot name is the place name.
- Non-Earth maps (cosmos, beyond, multi): "at" is [x, y] in the same 0 to 1000 space as that view's existing places; keep at least 60
  units from every existing place of that view.
Final reply: counts, sources you couldn't find, and anything you weren't sure of. Accuracy over coverage; the owner checks this.
