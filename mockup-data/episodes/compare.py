# compares the two independent episode passes
import json,glob,os
D=os.path.dirname(os.path.abspath(__file__))
F=json.load(open(D+'/first.json')); S={}
for f in sorted(glob.glob(D+'/out_*.json')): S.update(json.load(open(f)))
txt={}
for f in glob.glob(D+'/batch_*.json'):
    for t,v in json.load(open(f)).items():
        for k in ['steps','net','atlas','news','msgs']:
            for m in v[k]: txt[m['key']]=(t,len(v['episodes']),m.get('pair') or m.get('file') or m.get('place') or k,m.get('text',''))
keys=[k for k in F if k in S]
same=sum(1 for k in keys if F[k]==S[k]); later=[k for k in keys if S[k]>F[k]]; earlier=[k for k in keys if S[k]<F[k]]
print(f'{len(S)} of {len(F)} rechecked; agree {same} ({same*100//max(1,len(keys))}%); second later {len(later)}; second earlier {len(earlier)}')
big=[k for k in later if S[k]-F[k]>=2]
print('second later by 1:',len(later)-len(big),' by 2 or more:',len(big))
rows=[{'key':k,'title':txt[k][0],'who':txt[k][2],'text':txt[k][3],'first':F[k],'second':S[k],'last':txt[k][1]} for k in later]
json.dump(sorted(rows,key=lambda r:r['first']-r['second']),open(D+'/later.json','w'),ensure_ascii=False,indent=1)
