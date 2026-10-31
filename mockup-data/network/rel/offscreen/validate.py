import json, re
R = "/tmp/claude-0/-home-user-mcu-tracker/74605646-3f88-5dd6-bcf2-d1299d106f7b/scratchpad/rel/"
out = json.load(open(R+"offscreen_out.json"))["keep"]
keep = json.load(open(R+"offscreen_keep.json"))
order = json.load(open(R+"uni/story_order.json"))
people = json.load(open(R+"people.json"))
titles = {}
for p in people: titles.setdefault(p["name"], set()).update(p["titles"])
KINDS = {"family","partner","friend","mentor","boss","ally","rival","enemy"}
BAN = re.compile(r"\b(season|episode|the film|the show|the movie|credits|flashback|cameo|scene)\b", re.I)
DASH = re.compile(r"[‒–—―]|\s-\s|--")
errs = []
want = [(k["a"], k["b"]) for k in keep]
got = [(o["a"], o["b"]) for o in out]
if sorted(want) != sorted(got) or len(set(got)) != len(got): errs.append("pair set mismatch")
for o in out:
    a, b = o["a"], o["b"]
    for n in (a, b):
        if n not in titles: errs.append(f"unknown person {n}")
    for s in o["stages"]:
        if s["kind"] not in KINDS: errs.append(f"{a}/{b} kind {s['kind']}")
        if s["title"] not in order: errs.append(f"{a}/{b} title not in story order: {s['title']}")
        if s["title"] not in titles.get(a, set()) | titles.get(b, set()):
            print(f"note: {a}/{b} title '{s['title']}' not in either person's titles (off-screen tie)")
        for f in ("text", "whoA", "whoB"):
            v = s.get(f, "")
            if not v.strip(): errs.append(f"{a}/{b} empty {f}")
            if DASH.search(v): errs.append(f"{a}/{b} dash in {f}")
            if f == "text" and BAN.search(v): errs.append(f"{a}/{b} banned word in text: {BAN.search(v).group()}")
        n = len(re.findall(r"[.!?](?=\s|$)", re.sub(r"S\.H\.I\.E\.L\.D\.|J\.A\.R\.V\.I\.S\.|\b(Dr|Mr|Ms|Mrs|St)\.|[A-Z]\.(?=[A-Z])", "X", s["text"])))
        if not 1 <= n <= 3: errs.append(f"{a}/{b} {n} sentences")
        for f in ("whoA", "whoB"):
            w = len(s[f].split())
            if w > 15: errs.append(f"{a}/{b} {f} {w} words")
    idx = [order.index(s["title"]) for s in o["stages"]]
    if idx != sorted(idx): errs.append(f"{a}/{b} stage order")
print("ERRORS:" if errs else "OK, no errors", *errs, sep="\n")
print(len(out), "connections,", sum(len(o["stages"]) > 1 for o in out), "multi-stage")
