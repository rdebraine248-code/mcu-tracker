# the session's index.html, less everything that's still a mockup (the drafted comms, the Raft's first-visit animations), as the source for main
import re,sys
s=open('/home/user/mcu-tracker/index.html',encoding='utf8').read()
def cut(a,b):   # from the line holding a through the line holding b
    global s
    i=s.rindex('\n',0,s.index(a))+1; k=s.index(b,i); j=s.index('\n',k)+1; s=s[:i]+s[j:]
cut('// mockup: the drafted headlines and messages','{ const NX = /*NEWSX*/{}')
cut('.rfi{ -webkit-tap-highlight-color:transparent; }','.rf-row.rfl-shut .rf-lamp{ animation:rfllamp')
s=s.replace('.rf-intake.rfi-land{ animation:rfiin .4s ease-out; }\n','')
s=s.replace('  else if (rfIntake && !REDUCED) rfIntakePlay(RF_INTAKE);\n','')
s=s.replace(' rfIntake = 0; rfQ = ""; rfIntakeStop();',' rfIntake = 0; rfQ = "";')
i=s.index('/* the first time you board the Raft, everything already on file comes with it. Three different ways'); j=s.index('\n}\n',s.index('function rfIntakePlay(style)'))+3
s=s[:i]+s[j:]
for bad in ['rfIntakePlay','rfIntakeStop','RF_INTAKE','rfiRun','NEWSX','rfi-','rfd-','rfs-','rfl-']:
    assert bad not in s, bad
open(sys.argv[1],'w',encoding='utf8').write(s); print('ok')
