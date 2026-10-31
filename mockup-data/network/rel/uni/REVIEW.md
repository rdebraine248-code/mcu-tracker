# Independent review of one universe part (you did NOT write it; read BRIEF.md first)

The owner: "if I find some easily verifiable mistake or something within the first ten seconds that should have been caught, especially
something that we talked about in the proof of concept, I'll be so pissed." The Sacred Timeline proof of concept had several separate passes
(research, kinds, a through-line review that changed 66 kinds, a prose rewrite, off-screen ties, staging checked against wikis) and the owner
still caught: a fight that never happened (Yelena and Bill Metzger), a tie to the wrong person (Yelena and Jean DeWolff, mixed up with Jean
Grey), a kind that wasn't the through-line (Steve and Sharon "aren't really partners"; Jennifer and Matt "hooked up and didn't officially end up
together"), choppy prose (the Rumlow sentence), and a later title leaking into an early stage. Your job is to catch those before the owner does.

Your part: <part>.json (people), <part>/out.json (the connections written by another agent; for sv_old also sv_old/extra_peter1967.json),
<part>_review_in.json (fights on file with no written connection, and people with no crew). story_order.json for order.

1. Review EVERY connection: check each claim against a source (the writer's downloads are in <part>/src; fetch more through the wiki APIs as
   BRIEF.md shows). Fix wrong facts, wrong people, the wrong title for a stage, a kind that isn't the through-line, choppy or crammed prose,
   spoilers from a later stage or title, whoA/whoB on the wrong card or with wrong pronouns, missing family. Delete connections you can't
   confirm. Add real connections that are missing (family first).
2. fights_unwritten: these fights come from the app's files and are NOT trustworthy. For each: if they really clash or interact, write the
   connection; if not, list it as false with why.
3. crewless: the owner said "Independent is too big; some characters should be placed elsewhere ... they're not just independent". Give
   each person a circle where one truly fits: a family ("The Parker family"), a school, a workplace, a town, a group named on screen.
   Leave out only people who really have no one.
Write <part>/reviewed.json (the full corrected list, same format as out.json) and <part>/circles.json ({ "id": "Circle name" }), and
<part>/false_fights.json ([{a, b, why}]). Validate as BRIEF.md says. Reply with: how many connections you changed, deleted and added (with the
most important examples), the false fights, how many crewless people got a circle, and anything left uncertain.
