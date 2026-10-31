# Crossings between universes (read BRIEF.md first: the same rules and output format apply)

The owner keeps each universe as its own room in the Network, and asked: "I just don't know how that will work when connections cross
between multiverses", "how would multiverse connection work like Peter Parker and the other two Peter Parkers, Wanda with Earth-838,
Dr Strange same question". A connection that crosses universes is shown like any other, so it must be real: two people from different
universes (or two versions of the same person) who actually meet and interact on screen, or whose tie is explicitly stated.

Input: crossings_input.json. "shared_titles": each title where people from more than one universe appear, with everyone in it (id,
name, universe). "variant_pairs": every pair of versions of the same person (same name, or the MCU naming them differently); most never
meet, and those stay out (the app lists them separately). Find every cross-universe pair who really meet: e.g. in Spider-Man: No Way Home
the MCU Peter Parker with the other two Peters and with the villains pulled in from their worlds; in Deadpool & Wolverine; in the X-Men
cartoons and the 1994 Spider-Man show where they cross over; Strange and Sinister Strange (same universe file, but versions). Also any pair
from the variant list who meet. Use universe-correct ids (several people share a name). Output the same format as BRIEF.md, as
crossings_out.json in your folder rel/uni/crossings/. Also list, in your reply, people who meet on screen but have no file at all (for
example Earth-838 Wanda, Defender Strange) so the owner can decide whether to add them.
