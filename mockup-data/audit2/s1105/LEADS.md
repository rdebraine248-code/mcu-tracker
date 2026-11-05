# The content check's leads (5 November 2026)

The app's content check flags two kinds of leads (not failures). Decide each one against sources. Read
`mockup-data/audit2/atlas/BRIEF.md` first: its owner's rules, evidence rule and sources apply (look things up; never rely on memory;
curl with `User-Agent: mcu-tracker-research/1.0`, never any personal detail; space requests out). Never write to any file; return
structured output.

## place-lead
A Compound (A), Raft (T) or Collection (C) file's step tags a place (its At line) for a title, or one episode of it ("Title#N"), but
that place has no Atlas entry for that title (`place.entries` are `[title, sub, text]`, "Title#N" being episode N, counted within a
season title like "Daredevil S2#10", across the whole show otherwise). Decide:
- **add**: the step's event really happens at this place in that title (and episode): propose the entry `[title or "Title#N", sub,
  text]`. Entry text is one or two plain sentences of what happens there; no "season", "episode", "finale", "credits", "the film",
  "the show"; no em dashes; no actor names; nothing from a later title. `sub` is a spot inside a city map, a year for a flashback, or "".
- **untag**: the event doesn't happen at this place: say where it does (`happens_at`); the step's At line is then wrong.
- **fine**: nothing to change (say why in one line; e.g. the place has an entry for the same moment under the season's title).
The Agents of S.H.I.E.L.D. 1931 to 1983 episodes are Earth-19859 (its own map), not the main Earth; Agent Carter is the main Earth.

## alive-lead
A file's status goes from Deceased to a living one (Active, Missing, At large, Allied, In custody, Fugitive, Retired). Steps are in
in-universe order (a scene from the past sorts by its year), each with its status at the end of that step; status means real status,
not what characters believe; a death revealed in a later title goes in that title's step. Decide:
- **fine**: a real return the screen shows (brought back, revived, a reset timeline such as Days of Future Past's, the Void, a variant
  the file rightly covers, a death later undone).
- **wrong**: say what's wrong and the fix: the status of which step (by its sentence), or the step order.
Settled by the owner, so fine: Robin Hinton stays Active (the 2091 death is told in the text); the zombie world's Peter, Scott and
Katy keep an unknown fate where their files say so.
