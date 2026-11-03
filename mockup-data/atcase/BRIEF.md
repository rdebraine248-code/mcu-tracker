# Tag each file record step with its places ("At") and Damage Control cases ("Case")

You are tagging data for a Marvel watch-tracker app. Each person has index files (Compound = heroes, Raft = villains) made of
record steps: one short sentence per title saying what happened to them. Under each step the app will show:
  AT    the Atlas places where it happens
  CASE  the Damage Control incident reports it is

## The owner's rule (follow it exactly)
Pick the places and cases **where what the step describes happens**, whether or not the place is named in the sentence.
Not everywhere the person went in that title: only what this sentence covers.

Worked examples the owner settled (Wanda Maximoff's Compound file):
- Age of Ultron: "Leaving Ultron, Wanda helps Steve stop a runaway train in Seoul, then fights to save Sokovia, loses Pietro, and joins
  the new Avengers." -> At: Seoul, Sokovia, Avengers Compound (joining the new Avengers happens at the Compound). Case: The Battle of
  Sokovia. NOT Johannesburg or Strucker's fortress (true for her in that film, but this sentence doesn't cover them).
- Civil War: "After a mission in Lagos goes wrong, Wanda sides with Steve and is locked in the Raft until he breaks her out." ->
  At: Lagos, Leipzig (siding with Steve is the airport fight), The Raft. Case: The Lagos Incident, The Battle at Leipzig/Halle Airport.
  NOT the Avengers Compound: she is held there, but the sentence doesn't say so.
- Infinity War: "Wanda destroys the Mind Stone, but Thanos reverses time and kills Vision. Then she turns to dust." -> At: Wakanda.
  Case: The Snap, The Battle of Wakanda. NOT Edinburgh or the Compound.
- Endgame: "Restored, Wanda nearly beats Thanos in the final battle." -> At: Avengers Compound (where the final battle is). Case: The
  Battle of Earth.
- Her Raft file, Age of Ultron: "Wanda joins Ultron, then sees his real plan and fights beside the Avengers in Sokovia." -> At:
  Johannesburg (with Ultron she turns the Hulk loose there), Sokovia. Case: The Johannesburg Rampage, The Battle of Sokovia.

## Input
Your batch is a JSON array of steps. Each: tg (A = Compound, T = Raft), id (file id), k (step number in the file), name, uni, text (the
sentence), title (may say "In episode N," or "In season N," at the start of text: then only that episode or season counts), places
(candidates: key, name, entry = the Atlas entry's title, what = the Atlas entry's text), cases (candidates: id, no, name, where, involved).
Pick ONLY from the candidates. When a step clearly happens somewhere that isn't among the candidates, pick nothing for it and say so in
"missing" (e.g. "missing": "Lagos"). For a show, an Atlas entry for one episode only counts for a step about that episode.

## Accuracy
The owner checks this and has caught many confident mistakes. Use the sentence, the candidate entries' own text, and well-established plot
facts of that title. When you can't tell, pick nothing: an empty line is fine, a wrong place is not. Don't add a place just because the
person is in the title. A brief cameo or "appears" sentence usually gets nothing.

## Output
Write a JSON array to the output path you're given, one object per input step, same order: {"tg","id","k","at":[place keys],
"cases":[case ids],"why":"only when a pick isn't named in the sentence, a few words; else empty","missing":"" }.
No em dashes. Final reply: counts (steps, with At, with Case, missing notes) and anything you weren't sure about, briefly.
