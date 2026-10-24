# the test build for this round of mockups: dev.html (the working app with the drafted data filled in) made playable, starting with everything
# watched, plus a "Start from" picker so the briefing, Up next and the Raft can be tried partway through the story
import json, subprocess, sys
SP='/tmp/claude-0/-home-user-mcu-tracker/e04629fe-1d85-5cbd-a7d3-e43b10375bb1/scratchpad/'
subprocess.run(['python3', SP+'next/devbuild.py', SP+'next/dev.html'], check=True)
src=open(SP+'t/buildtb.py').read().replace("open('/home/user/mcu-tracker/index.html',encoding='utf8').read()","open(SP+'next/dev.html',encoding='utf8').read()")
MSG=sys.argv[1] if len(sys.argv)>1 else ""
sys.argv=['buildtb.py','full','next1',MSG]
exec(compile(src,'buildtb','exec'))
s=open(SP+'datapad-test.html',encoding='utf8').read()
tool=r'''
<div id="tbProg" style="position:fixed;left:12px;bottom:calc(var(--dockh) + 44px);z-index:199">
  <button type="button" id="tbProgBtn" style="padding:6px 10px;border:1px solid #3A78C9;border-radius:999px;background:#0D1320;color:#9FC3FF;font:10.5px/1 'Share Tech Mono','Courier New',monospace;letter-spacing:2px;text-transform:uppercase">Test · start from</button>
</div>
<script>
(() => {
  const main = DATA.chapters.filter(c => c.num), T = main.flatMap(c => c.items.map(i => i.t));
  const btn = document.getElementById("tbProgBtn");
  btn.addEventListener("click", () => {
    const old = document.getElementById("tbPick"); if (old) { old.remove(); return; }
    const d = document.createElement("div"); d.id = "tbPick";
    d.style.cssText = "position:fixed;left:12px;right:12px;bottom:calc(var(--dockh) + 84px);z-index:201;max-width:460px;margin:0 auto;padding:14px;border:1px solid #3A78C9;border-radius:12px;background:#0D1320;color:#D5DCE8;font:14px/1.45 'IBM Plex Sans Condensed','Arial Narrow',sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5)";
    d.innerHTML = `<div style="font:11px/1.4 'Share Tech Mono','Courier New',monospace;letter-spacing:2px;text-transform:uppercase;color:#7FA6D8">Test build · start from</div>
      <p style="margin:6px 0 10px">Pick the next title to watch. Everything in the chapters before it is marked watched, and the Extras aren't. This page only.</p>
      <select id="tbSel" style="width:100%;padding:10px;border:1px solid #2B3F62;border-radius:8px;background:#0B1019;color:#EEF1F6;font-size:15px"><option value="">Everything watched</option>${T.map(t => `<option value="${t.replace(/"/g, "&quot;")}">Next up: ${t}</option>`).join("")}</select>`;
    document.body.appendChild(d);
    d.querySelector("select").addEventListener("change", ev => {
      const upto = ev.target.value, st = { checks: {}, unlocked: {}, seen: {}, mode: "chapters", entered: 1, charOpen: {}, mvEver: 1, incEver: 1, onLeftSeen: true, codename: state.codename, ava: state.ava };
      const W = new Set(); let stop = false;
      DATA.chapters.filter(c => c.num || !upto).forEach(c => { if (stop) return; st.unlocked[c.id] = true; for (const i of c.items) { if (upto && i.t === upto) { stop = true; break; } st.checks[c.id + "::" + i.t] = true; W.add(i.t); } });
      DATA.chars.forEach(c => c.items.forEach(i => { if (W.has(i.t)) { st.checks[c.id + "::" + i.t] = true; st.charOpen[c.id] = 1; st.seen[c.id] = true; } }));
      if (!upto) { DATA.chars.forEach(c => { st.charOpen[c.id] = 1; st.seen[c.id] = true; c.items.forEach(i => st.checks[c.id + "::" + i.t] = true); }); DATA.timeline.forEach(e => st.checks["tl::" + e.t] = true); DATA.timelineRelease.forEach(e => st.checks["tr::" + e.t] = true); }
      try { localStorage.setItem("mcu-watch-tracker-v1", JSON.stringify(st)); } catch (e) {}
      location.reload();
    });
  });
})();
</script>
'''
s=s.rstrip()+'\n'+tool
open(SP+'datapad-test.html','w',encoding='utf8').write(s); print('test build bytes', len(s.encode()))
