# builds the playable test page (scratchpad/datapad-test.html) from the repo's index.html: everything watched, no service worker
import json, sys
# the starting point: "full" (everything watched, every box open) or "timeline" (only the Sacred Timeline finished, on the Characters page, no box opened)
MODE = sys.argv[1] if len(sys.argv) > 1 else "full"; SEED = sys.argv[2] if len(sys.argv) > 2 else "1"
SP=OUT
s=open('/home/user/mcu-tracker/index.html',encoding='utf8').read()
l=[x for x in s.split('\n') if x.startswith('const DATA')][0]
D=json.loads(l[l.index('=')+1:].strip().rstrip(';'))
st={"checks":{},"unlocked":{},"seen":{},"charOpen":{},"mode":"chapters","entered":1,"mvEver":1,"incEver":1,"onLeftSeen":True}
for c in D['chapters']:
    st['unlocked'][c['id']]=True
    for i in c['items']: st['checks'][c['id']+'::'+i['t']]=True
for c in D['chars']:
    st['charOpen'][c['id']]=1; st['seen'][c['id']]=True
    for i in c['items']: st['checks'][c['id']+'::'+i['t']]=True
for e in D['timeline']: st['checks']['tl::'+e['t']]=True
if MODE == "timeline":
    st={"checks":{('tl::'+e['t']):True for e in D['timeline']},"unlocked":{},"mode":"chars","entered":1,"mvEver":1,"incEver":1,"onLeftSeen":True}
for e in D['timelineRelease']: st['checks']['tr::'+e['t']]=True
def cut(a,b=''):
    global s
    assert s.count(a)==1,(a[:60],s.count(a)); s=s.replace(a,b)
cut('<!doctype html>\n<html lang="en">\n<head>\n')
cut('<meta charset="utf-8">\n'); cut('<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n')
cut('<title>Marvel Datapad</title>','<title>Datapad Test Build</title>')
cut('<link rel="manifest" href="manifest.webmanifest?v=6">\n'); cut('<link rel="icon" href="icon-192.png">\n'); cut('<link rel="apple-touch-icon" href="icon-192.png?v=6">\n')
cut('</head>\n<body>\n','\n'); cut('</body>\n</html>','')
cut('if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {','if (false) {   // test build: no service worker')
seed='''<script>
/* test build: starts with everything watched (every box met, every chapter unlocked) so every egg is open to try. It lives only in this page's own storage */
try { if (localStorage.getItem("tb-seed") !== "%s") { localStorage.setItem("mcu-watch-tracker-v1", JSON.stringify(%s)); localStorage.setItem("tb-seed", "%s"); localStorage.setItem("tb-note", "1"); } } catch (e) {}
</script>
''' % (SEED, json.dumps(st, ensure_ascii=False), SEED)
i=s.index('<script'); s=s[:i]+seed+s[i:]
MSG = sys.argv[3] if len(sys.argv) > 3 else "Everything is marked watched here, and your real datapad isn't touched."
s=s.rstrip()+'\n<script>const TB_MSG = '+json.dumps(MSG)+';</script>\n'+open(R+'tests/tbnote.html',encoding='utf8').read()
open(SP+'datapad-test.html','w',encoding='utf8').write(s)
print(len(s.encode()))
