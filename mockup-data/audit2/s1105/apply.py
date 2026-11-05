# applies the second-checked fixes of 5 November 2026 (s1105/accepted.json): Atlas entries, At lines, Damage Control lines, a box quote, two file steps
import json,re,sys
R='/home/user/mcu-tracker/'; txt=open(R+'index.html',encoding='utf8').read(); src=txt.split('\n')
AC=json.load(open(R+'mockup-data/at_case.json')); log=[]
# 1. Atlas: new entries, appended (ep_tags.json keys entries by position, so nothing already there moves)
start=next(i for i,l in enumerate(src) if l=='const ATLAS = {'); ustart=next(i for i,l in enumerate(src) if l=='const ATLAS_UNI = {')
loc={}; sec=None
for i in range(start,ustart+2500):
    l=src[i]; m=re.match(r'^(\w+): \[$',l)
    if m and i<ustart: sec=m.group(1); continue
    m=re.match(r'^"([\w-]+)": \{"n": ',l)
    if m and i>ustart: sec='uni|'+m.group(1); continue
    if l.startswith('{"id":'): o=json.loads(l.rstrip(',').rstrip()); loc[o['id']+'|'+sec+('|' if not sec.startswith('uni|') else '')]=(i,o)
ADD={'future|beyond|':["Agents of S.H.I.E.L.D.#90","","Simmons is brought to Kasius, the Kree ruler of the Lighthouse, who has Sinara kill a wounded servant and makes Simmons serve him in his place."],
 'ny|earth|#4':["Agent Carter#4","Manhattan, 1946","At the Griffith Hotel, Dottie catches the gunman Otto Mink heading for Peggy's room, snaps his neck, keeps his pistol and hides his body in her room."],
 'ny|earth|#5':["Agent Carter#5","Manhattan, 1946","Over breakfast at the automat, Dottie slips Peggy's room key from her purse, then searches her room at the Griffith and takes a photo of one of Stark's inventions."],
 'ny|earth|#9':["Agent Carter#9","Manhattan, 1947","Dottie robs a bank, but Peggy and Thompson's SSR agents are lying in wait and capture her."],
 'ny|earth|IF':["Iron Fist S1#2","Manhattan","At Birch Psychiatric Hospital, men Ward has sent in as patients try to kill Danny, and he fights them off with the Iron Fist and escapes."],
 'westview|earth|':["WandaVision#4","","Sent by S.W.O.R.D. to help with a missing persons case, Monica finds a strange static field surrounding the town and is pulled inside."],
 'ax-muir|uni|animx':["X-Men: The Animated Series#57","Mutant Research Center","After Xavier calms him, Proteus comes back to the island with his mother, Moira."],
 'edinburgh|earth|':["VisionQuest#2","","Vision answers Paladin's summons to the pub where he used to work, refuses to be blackmailed over the captive Tommy, and attacks him before leaving."]}
for k,e in ADD.items():
    key=k.split('#')[0].replace('|IF','') if '#' in k else k.replace('|IF','')
    key=re.sub(r'\|IF$','',key); key=key if key in loc else key.rsplit('|',0)[0]
    if k.endswith('IF'): key='ny|earth|'
    i,o=loc[key]
    if any(x[0]==e[0] and x[1]==e[1] for x in o['e']): log.append(('dup',key,e[0])); continue
    o['e'].append(e); tail=src[i][len(src[i].rstrip(',')):]; src[i]=json.dumps(o,ensure_ascii=False,separators=(',',':'))+tail; log.append(('add',key,e[0]))
# 2. At lines: off the wrong place, onto the right one where it has an entry for that title
MOVE=[('A:st-frank-castle:4','Manhattan|city|ny','Queens|city|ny'),('T:st-ma-gnucci:0','Manhattan|city|ny','Queens|city|ny'),('A:st-dre:0','Manhattan|city|ny','Queens|city|ny'),
 ('A:st-rose-roberts:1','Hollywood|city|la','Los Angeles|city|la'),('A:st-aloysius-samberly:0','Hollywood|city|la','Los Angeles|city|la'),('A:howard-stark:2','Hollywood|city|la','Los Angeles|city|la'),
 ('T:st-joseph-manfredi:0','Hollywood|city|la','Los Angeles|city|la'),('A:peggy-carter:4','Hollywood|city|la','Los Angeles|city|la'),('A:ssr:3','Hollywood|city|la','Los Angeles|city|la'),
 ('A:st-daniel-sousa:1','Hollywood|city|la','Los Angeles|city|la'),('T:st-dottie-underwood:7','Hollywood|city|la',None),('T:st-dottie-underwood:8','Hollywood|city|la',None),
('A:st-theo-nelson:0','Manhattan|city|ny',"Hell's Kitchen|city|ny"),('T:st-gregory-sallinger:0',"Hell's Kitchen|city|ny",'Manhattan|city|ny'),
 ('T:st-the-hand:2','Midtown|city|ny','Manhattan|city|ny')]
for k,old,new in MOVE:
    e=AC.get(k)
    if not e or old not in e.get('at',[]): log.append(('AT MISS',k,old)); continue
    L=[x for x in e['at'] if x!=old]
    if new and new not in L: L.append(new)
    e['at']=L; log.append(('at',k,old,'->',new))
# 3. Damage Control: two lines with no title, one missing loss
def rep(a,b,what):
    global txt
    if txt.count(a)!=1: log.append(('MISS',what,txt.count(a))); return
    txt=txt.replace(a,b); log.append(('ok',what))
txt='\n'.join(src)
rep('"Detective Eddy Costa, who held his own gun to his head that day, had nightmares about it until Kilgrave died, and offers to work with Jessica."]','["Detective Eddy Costa, who held his own gun to his head that day, had nightmares about it until Kilgrave died, and offers to work with Jessica.", "Jessica Jones S2"]]','dc-15p fall:1')
rep('"John King, suffocated in a sealed greenhouse.",','["John King, suffocated in a sealed greenhouse.", "Ironheart"],','dc-heir loss:1')
rep('["Vision, who ends his own life to give Peter the Mind Stone.", "What If...?"],','["Vision, who ends his own life to give Peter the Mind Stone.", "What If...?"], ["Hope van Dyne, wounded and infected on the way to Camp Lehigh.", "What If...?"],','dc-by-zombie-outbreak loss')
# 4. the box quote: Mordo's line, not Strange's or Wong's
rep('"Doctor Strange & Wong": "Forget everything you think you know."','"Doctor Strange & Wong": "Dormammu, I\'ve come to bargain."','quote Doctor Strange & Wong')
# 5. two file steps, through STEP_AUDIT2 (matched on their text)
m=re.search(r'const STEP_AUDIT2 = (\{.*?\});\n',txt); S=json.loads(m.group(1))
S.setdefault('T:agatha-harkness',[]).append({"now":"In episode 9, Agatha returns as a ghost and sets out with Billy to find Tommy.","status":"Deceased"})
S.setdefault('A:fox-x-force',[]).append({"now":"Shatterstar is alive again at Wade's birthday party, but the rest of the team is still gone.","text":"Shatterstar and Peter are alive at Wade's birthday party."})
for e in S.get('A:st-daniel-sousa',[]):
    if e.get('at')==['Hollywood|city|la'] and 'episode 127' in e['now']: e['at']=['la|uni|chronicoms']; log.append(('at','A:st-daniel-sousa (STEP_AUDIT2, #127)','Hollywood|city|la','->','la|uni|chronicoms'))
txt=txt[:m.start(1)]+json.dumps(S,ensure_ascii=False,separators=(',',':'))+txt[m.end(1):]; log.append(('steps',2))
from collections import Counter; print(Counter(x[0] for x in log)); [print(x) for x in log]
if '--write' in sys.argv:
    open(R+'index.html','w',encoding='utf8').write(txt); open(R+'mockup-data/at_case.json','w',encoding='utf8').write(json.dumps(AC,ensure_ascii=False))
