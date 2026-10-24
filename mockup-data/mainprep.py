# the session's index.html, less everything that's still a mockup (the drafted comms), as the source for main
import re,sys
s=open('/home/user/mcu-tracker/index.html',encoding='utf8').read()
def cut(a,b):   # from the line holding a through the line holding b
    global s
    i=s.rindex('\n',0,s.index(a))+1; k=s.index(b,i); j=s.index('\n',k)+1; s=s[:i]+s[j:]
cut('// mockup: the drafted headlines and messages','{ const NX = /*NEWSX*/{}')
for bad in ['rfIntakePlay','rfIntakeStop','RF_INTAKE','rfiRun','NEWSX','rfi-','rfd-','rfs-','rfl-','PATHS_MOCK']:
    assert bad not in s, bad
open(sys.argv[1],'w',encoding='utf8').write(s); print('ok')
