#!/bin/bash
# main build, Network rebuild, test build (the order the handoff gives); $1 = the test build's note
set -e
cd /home/user/mcu-tracker/mockup-data
python3 mainprep.py out/main_src.html >/dev/null
SRC=out/main_src.html python3 devbuild.py out/main.html > out/build.log 2>&1
if grep -iE "no step|no file|error|warn|dup" out/build.log; then echo "BUILD PRINTED THE LINES ABOVE: a broken op, fix it first (out/build.log)"; exit 1; fi
python3 - <<'PY'
import json
s=open('out/main.html',encoding='utf8').read(); E=json.load(open('network/rel/uni/earth/earths.json',encoding='utf8'))
s=s.replace('/*EARTHS*/{}', json.dumps({k:(v or {}).get('earth') for k,v in E.items()}),1).replace('/*NETWORK*/null','"url:network.html"',1); open('out/main.html','w',encoding='utf8').write(s)
PY
cp out/main.html out/root/index.html && export ROOT=$PWD/out/root
(cd network/src/prof && node hub2.js 2>&1 | tail -1 && node ord.js >/dev/null && node mapx.js >/dev/null && node relbake.js 2>&1 | tail -1 && node bake.js 2>&1 | tail -1 && cp ../network-hub.html ../../network-hub.html)
python3 build_tb.py "$1" 2>&1 | grep -iE "error|bytes" || true
python3 -I -c "import json;H=json.load(open('network/src/prof/hub.json'));print(len(H['nodes']),'people')"
rm -rf out/mainroot && python3 mainsplit.py out/main.html out/mainroot >/dev/null && cp ../*.png ../manifest.webmanifest ../sw.js out/mainroot/ && cp network/network-hub.html out/mainroot/network.html
echo ready
