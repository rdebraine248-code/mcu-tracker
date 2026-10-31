# Earth numbers for the Network (owner's rule, October 2026)

The owner: "I like using the Earth numbers to separate the multiverses, because it's very in theme with this datapad." The app already
labels worlds with Earth numbers (the Atlas: Earth-96283 for the Raimi films, Earth-120703 for the Amazing films, Earth-688 for Venom's,
Earth-10005 for the Fox X-Men, Earth-26320 for Blade, Earth-701306 for Daredevil 2003, Earth-58732 for The Punisher 2004, Earth-121698 for
Fantastic Four 2005; Incursions: Earth-12041 for Ultimate Spider-Man). Those are Marvel's official designations.

Input earth_input.json: everyone outside the Sacred Timeline, with their titles and the Earth numbers their titles already map to in the
app. Give each person their own world's Earth number:
- Use the number the work itself states on screen (the Spider-Verse films name many: Gwen's Earth-65, Miguel's Earth-928, Pavitr's
  Earth-50101, Hobie's Earth-138, the Earth-42 Prowler, Peter B. Parker's own world, the 1967 cartoon Peter, etc.), or Marvel's official
  designation (Marvel Database / official handbooks, as the app's existing numbers are). Check each; never guess or invent. If a world has
  no number on screen and no official designation, give null.
- A person whose titles map to the app's numbers keeps that number unless they are really from another world in that title (a Spider-Verse
  film has people from many Earths; a cameo from another show).
- What If...?: each episode is its own world; give the number only if stated or officially designated, else null. Same for Marvel Zombies.
- The Sacred Timeline itself is called Earth-616 on screen (Doctor Strange in the Multiverse of Madness). Confirm and say so.
Write earth/earths.json: { "<id>": { "earth": "Earth-65" or null, "source": "on screen, Across the Spider-Verse" or "Marvel Database:
Earth-65" } }. Keep scripts and downloads in earth/. Reply with counts (numbered, null), every world you numbered with its source, and
anything doubtful.
