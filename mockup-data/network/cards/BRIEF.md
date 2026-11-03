# Rewrite Network card lines so it's always clear who's who

A Marvel watch-tracker app has a Network: each person's card lists the people in their life, one short line each. The other person's
NAME is already shown above each line, so the line itself describes that person in relation to the card's owner.

The owner's problem: lines overuse pronouns for both people ("He fought him and he won when he lost") and repeat the name with a comma.
Pronouns themselves are fine; the confusion is what must go.

## The rule
1. No leading name. The line's subject is the person it's about, left unnamed ("Owes Fisk", not "Norman Osborn, who owes him").
   A leading description is fine ("Kate's mother. ...", "A fellow Avenger. ...").
2. The card's own person is NAMED, by the short name the app uses for them (first name, or surname where that's how they're known:
   Fisk, Rhodes, Charles, Tony, Matt). Never "him"/"her" for the card's person on first mention.
3. A later he/him/she/her/his stays only when just one person is left it could mean. If two people could fit, use the name.
4. Keep the facts exactly. Use the stage text (what happened) to stay accurate. Add nothing that isn't in the stage or the old line.
   Keep it short: about as long as the old line, two short sentences at most.
5. No em dashes, no actor names, no instructions to the user. Plain English. Present tense, as the old lines are.
6. If a line already follows the rule, leave it unchanged.

## The owner approved these 20 (old -> new). Match their style.
- Ayo's card, about Zemo: "The man who killed her king, T'Chaka. She sees him taken to the Raft." -> "Killed T'Chaka, the king Ayo swore to protect. Ayo sees him taken to the Raft."
- Eddie Brock's card, about Baron Mordo: "Baron Mordo, who returns his symbiote." -> "Returns Eddie's symbiote, in exchange for Eddie serving Dormammu."
- Xavier's card, about Storm: "Storm, one of his first X-Men." -> "One of Xavier's first X-Men."
- Fisk's card, about Norman Osborn: "Norman Osborn, who owes him and works under his threats." -> "Owes Fisk, and works under Fisk's threats."
- Fisk's card, about Doctor Octopus: "His head scientist, who builds his collider." -> "Fisk's head scientist. Builds the collider for him."
- Rhodes's card, about Thor: "A fellow Avenger. Unimpressed by his war story, but beside him in Sokovia." -> "A fellow Avenger. Unimpressed by Rhodes's war story, but fights beside him in Sokovia."
- Uzman's card, about Kurt: "One of the X-Cons he holds hostage, who tasers him." -> "One of the X-Cons Uzman holds hostage. Tasers Uzman to save Luis."
- Daredevil's card, about Jameson: "Jameson, who hires him for Peter." -> "Secretly hires Matt to defend Peter."
- Xavier's card, about Hank: "Hank, who stays by his side when everyone else is gone." -> "Stays by Charles's side when everyone else is gone."
- Tony's card, about Ellen Brandt: "Extremis soldier posing as Homeland Security, whom he kills in Rose Hill." -> "An Extremis soldier posing as Homeland Security. Tony kills her in Rose Hill."
- Kazi's card, about Eleanor Bishop: "Kate's mother, whom Fisk orders him to kill." -> "Kate's mother. Fisk orders Kazi to kill her."
- Graydon Creed's card, about Nightcrawler: "Kurt, his half-brother, who defends him." -> "Graydon's half-brother. Defends Graydon at the Acolytes' trial, then strands him in the Antarctic."
- Wade Wilson's card, about Peter Wisdom: "Peter, his ordinary X-Force friend, whom he saves." -> "An ordinary guy on X-Force. Wade goes back in time to save him."
- Miles's card, about Miguel O'Hara: "Spider-Man 2099, who wants him to let his father die." -> "Leads the Spider-Society, and wants Miles to let his father die."
- Hoffman's card, about Blake: "His partner and best friend on the force, whom Fisk forces him to kill." -> "Hoffman's partner and best friend on the force. Fisk forces Hoffman to kill him."
- Fennhoff's card, about Jarvis: "Howard Stark's butler, who flies out to stop his plan." -> "Howard Stark's butler. Takes to the air to stop Fennhoff's plan."
- Kaecilius's card, about Daniel Drumm: "A former fellow trainee, the Sanctum's protector, whom he kills." -> "Trained alongside Kaecilius at Kamar-Taj. Guards the New York Sanctum until Kaecilius kills him."
- Dreykov's card, about Alexei: "Alexei, the agent he marks for death." -> "An agent Dreykov marks for death."
- Scott Lang's card, about Spider-Man: "Spider-Man, who brings down his giant form with webbing at the airport." -> "Brings down Scott's giant form with webbing at the airport."
- Alexandra's card, about Elektra: "Her Black Sky weapon, raised from the dead, who kills her." -> "Alexandra's weapon, the Black Sky she raises from the dead. Turns on Alexandra and kills her."

## Input / output
Input: a JSON array; each item has key, card (the card owner's full name), card_aka (other names), about (the person the line is
about), kind, title, stage (what happened, the source of truth), line (the current line).
Output: a JSON array in the same order: {"key": ..., "new": "<rewritten line>" or "" if unchanged}. Write it to the output path given.
Do every line yourself; a script may read and write files but must not generate the wording. Check your output for em dashes and that
every key is present. Final reply: counts (changed, unchanged) and any line where the stage didn't let you be sure, briefly.
