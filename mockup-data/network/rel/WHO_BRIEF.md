# Short "who" lines for the Network cards (Sacred Timeline)

Read rel/uni/BRIEF.md for the owner's rules, especially the whoA / whoB part. The owner liked the mockup of a slide-up card listing a
person's connections, each with one short line of who they are to them, and asked for it for everyone. Lines must follow the stages:
each stage gets its own pair of lines, because a viewer partway through the story must not read about later stages ("Alexei still acts
like one" leaked a later title).

Input: your file rel/staged_<N>.json, a list of { a, b, stages: [{ kind, title, text }] } where a and b are names (Sacred Timeline, so
names are unique). Output: the same list with whoA and whoB added to every stage, nothing else changed, as rel/who/who_<N>.json.
- whoA: on a's card, who b is to a, for this stage only, at most about 14 words, starting with what they are, from a's side.
- whoB: on b's card, who a is to b, the same way.
- Base it on that stage's text plus what you know is accurate; never invent; no em or en dashes; no fourth-wall words; get pronouns right
  for the card's owner (check the person if unsure, or use the name).
Examples (owner-approved): Jennifer Walters' card: Bruce Banner "Her cousin. His blood gave her his powers, and he trained her to use
them." Morris Walters "Her dad." Matt Murdock "Daredevil. They face off in court, team up, and have a brief fling." Yelena Belova's card:
John Walker "Sent to kill her. Now on her team." Eleanor Bishop "Kate's mother, who paid for the hit on Clint."
Validate with a script (every item and stage kept, unchanged fields, lines present and short, no dashes). Reply with counts and 10
sample lines (both sides of 5 connections, one of them staged).
