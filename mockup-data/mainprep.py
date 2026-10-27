# the session's index.html, less anything that's still a mockup, as the source for main
import re,sys
s=open('/home/user/mcu-tracker/index.html',encoding='utf8').read()
def cut(a,b):   # from the line holding a through the line holding b
    global s
    i=s.rindex('\n',0,s.index(a))+1; k=s.index(b,i); j=s.index('\n',k)+1; s=s[:i]+s[j:]
# the mockups waiting for approval stay in the test build: main ships with the switch off
on='const MOCK = true;'
assert s.count(on)==1, 'mock switch'
s=s.replace(on,'const MOCK = false;')
while 'MOCKUP BEGIN' in s: cut('MOCKUP BEGIN','MOCKUP END')   # the test build's mockup blocks (CSS and script) never reach main
for bad in ['rfIntakePlay','rfIntakeStop','RF_INTAKE','rfiRun','rfi-','rfd-','rfs-','rfl-','PATHS_MOCK','ARCH_MOCK']:
    assert bad not in s, bad
open(sys.argv[1],'w',encoding='utf8').write(s); print('ok')
