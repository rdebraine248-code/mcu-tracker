import json, sys, os, urllib.request, urllib.parse
UA = {"User-Agent": "mcu-tracker-research/1.0"}
def wiki(page, host="marvelcinematicuniverse.fandom.com", path="/api.php"):
    q = urllib.parse.urlencode({"action":"parse","page":page,"prop":"wikitext","format":"json","redirects":1})
    url = f"https://{host}{path}?{q}"
    r = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30)
    d = json.load(r)
    if "error" in d: return None
    return d["parse"]["wikitext"]["*"]
def raw(url):
    r = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30)
    return r.read().decode("utf-8", "replace")
if __name__ == "__main__":
    host = os.environ.get("HOST", "marvelcinematicuniverse.fandom.com")
    for p in sys.argv[1:]:
        fn = "src/" + p.replace("/", "_").replace(":", "_") + ".txt"
        try:
            t = wiki(p, host, "/w/api.php" if "wikipedia" in host else "/api.php")
            if t is None: print("MISSING", p); continue
            open(fn, "w").write(t); print("ok", p, len(t))
        except Exception as e:
            print("ERR", p, e)
