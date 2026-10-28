/* PARKED (October 2026), lifted out of the test build whole: put back inside index.html's last script to restore it. MOCKUP BEGIN: the War Room (test build only; mainprep cuts it). The Compound's tactical table: each great battle replayed beat by beat,
   who was where and what turned it, with a scrubber. It opens from the Compound in the Atlas and from a battle's incident report,
   and every marker on the table opens that person's file */
const WR_COL = { A: "#5FA8FF", B: "#F4C542", T: "#FF5A4E" };
const wrLab = (x, y, t, a) => `<text class="wr-lab" x="${x}" y="${y}"${a ? ` text-anchor="${a}"` : ""}>${t}</text>`;
const wrGrid = () => { let g = ""; for (let x = 0; x <= 400; x += 20) g += `<path d="M${x} 0V300" stroke="rgba(255,90,78,.05)"/>`; for (let y = 0; y <= 300; y += 20) g += `<path d="M0 ${y}H400" stroke="rgba(255,90,78,.05)"/>`; return g; };
const WR_LINE = 'stroke="rgba(255,130,118,.28)" fill="none"', WR_BLD = 'fill="rgba(255,90,78,.07)" stroke="rgba(255,130,118,.3)"';
const WAR = [
  { id: "wr-bny", no: "WR-2012-01", n: "The Battle of New York", t: "The Avengers", yr: 2012, where: "Midtown Manhattan", dc: "dc-bny",
    sides: { A: "The Avengers", T: "Loki and the Chitauri" },
    map: () => wrGrid() + [60, 130, 200, 270, 340].map(x => `<path d="M${x} 0V300" ${WR_LINE} stroke-width="${x === 200 ? 5 : 3}"/>`).join("") + [40, 80, 120, 160, 240, 280].map(y => `<path d="M0 ${y}H400" ${WR_LINE} stroke-width="1.6"/>`).join("") + `<path d="M0 200H400" ${WR_LINE} stroke-width="3.4"/>`
      + `<rect x="175" y="148" width="50" height="44" ${WR_BLD}/><path d="M170 145V197H230V145" stroke="rgba(255,130,118,.35)" stroke-dasharray="3 3" fill="none"/><rect x="191" y="121" width="18" height="18" fill="rgba(255,90,78,.18)" stroke="rgba(255,150,140,.6)"/>`
      + wrLab(64, 12, "5th Ave") + wrLab(134, 12, "Madison") + wrLab(204, 12, "Park Ave") + wrLab(274, 12, "Lexington") + wrLab(344, 12, "3rd Ave") + wrLab(6, 196, "E 42nd St") + wrLab(228, 172, "Grand Central") + wrLab(214, 118, "Stark Tower") + wrLab(204, 234, "Pershing Sq"),
    fx: [{ k: "ring", x: 200, y: 130, r: 34, from: .9, to: 10.25, lab: "Portal, overhead" }, { k: "mark", x: 150, y: 205, from: 3.72, to: 11, lab: "Quinjet down" }, { k: "bolt", x: 200, y: 130, r: 34, from: 6.3, to: 8.4 }, { k: "blast", x: 200, y: 210, at: 5.08, r: 26 }, { k: "blast", x: 200, y: 130, at: 9.5, r: 80 }],
    swarms: [{ s: "T", n: 64, keys: [[1, 200, 130, 10, .3], [1.7, 200, 150, 80, 1], [3, 200, 160, 120, 1], [9.5, 200, 165, 135, 1], [9.95, 200, 165, 135, 0]] }],
    units: [
      { c: "IM", n: "Iron Man", s: "A", f: "A:tony-stark", p: [[0, 200, 131], [.55, 200, 131], [.7, 214, 152], [.85, 240, 120], [1, 236, 104], [2, 170, 100], [3, 250, 92], [3.8, 200, 60], [4.9, 200, 202], [5, 200, 212], [6, 207, 212], [6.4, 300, 110], [6.8, 110, 100], [7.2, 290, 230], [7.6, 120, 240], [8, 320, 180], [8.55, 345, 258], [8.8, 320, 232], [9.05, 240, 170], [9.3, 200, 131], [9.45, null], [9.75, 200, 131], [10.2, 200, 192], [10.4, 200, 208]] },
      { c: "LO", n: "Loki", s: "T", f: "T:loki", down: 7.6, p: [[0, 205, 134], [2.5, 205, 134], [2.8, 232, 110], [3.2, 172, 148], [3.5, 150, 186], [4, 230, 92], [5, 262, 70], [6, 240, 110], [6.8, 206, 133], [7, 205, 134]] },
      { c: "TH", n: "Thor", s: "A", f: "A:thor", p: [[2, 200, 60], [2.2, 197, 128], [4.6, 197, 128], [4.9, 196, 206], [5, 194, 215], [6, 192, 215], [6.3, 194, 122]] },
      { c: "QJ", n: "The Quinjet", s: "A", p: [[3, -10, 30], [3.4, 120, 92], [3.55, 160, 150], [3.7, 150, 205], [3.72, null]] },
      { c: "CA", n: "Captain America", s: "A", f: "A:steve-rogers", p: [[3.72, 150, 205], [4.2, 188, 216], [5, 192, 220], [6, 196, 222], [6.5, 176, 236], [7, 196, 222], [8, 216, 228], [10, 204, 222]] },
      { c: "BW", n: "Black Widow", s: "A", f: "A:natasha-romanoff", p: [[3.72, 150, 205], [4.2, 196, 224], [5, 208, 222], [6.6, 210, 222], [7, 205, 150], [7.2, 208, 128], [10, 208, 128]] },
      { c: "HE", n: "Hawkeye", s: "A", f: "A:clint-barton", p: [[3.72, 150, 205], [4.2, 204, 228], [5, 214, 214], [6.2, 214, 214], [6.6, 266, 166], [10, 266, 166]] },
      { c: "HU", n: "The Hulk", s: "A", f: "A:bruce-banner", p: [[4.6, 200, 305], [5, 202, 224], [5.6, 212, 218], [6.4, 232, 160], [7, 200, 138], [7.6, 200, 136], [8, 212, 172], [9.8, 200, 208], [10.4, 202, 212]] },
      { c: "LV", n: "A Leviathan", s: "T", big: 1.6, p: [[4, 200, 131], [4.95, 200, 204], [5.1, 200, 208], [5.15, null]] },
      { c: "NK", n: "The Council's missile", s: "T", p: [[8, 405, 305], [8.55, 345, 262], [8.8, 322, 234], [9.05, 242, 172], [9.3, 202, 133], [9.45, null]] }
    ],
    beats: [
      "Tony Stark tries to shut down Selvig's device on top of Stark Tower, then confronts Loki in the penthouse. Loki throws him out of the window, and his new armor catches him.",
      "The device opens a portal above the tower, and the Chitauri army pours through into Midtown.",
      "Thor lands on the tower to stop his brother. They fight, and Loki takes to the air on a Chitauri chariot.",
      "Steve, Natasha and Clint fly in on the Quinjet. Loki shoots it down, and it crash-lands in the streets of Midtown.",
      "A Leviathan comes through the portal, and Tony leads it down Park Avenue toward the team.",
      "Bruce Banner arrives and turns into the Hulk, who stops the Leviathan with one punch. The team assembles.",
      "Steve gives the orders: Clint takes a rooftop to call out positions, Tony holds the perimeter, Thor bottlenecks the portal with lightning, and the Hulk smashes.",
      "Natasha rides a chariot up to the tower, where Selvig tells her Loki's scepter can close the portal. Inside, the Hulk smashes Loki into the floor.",
      "The World Security Council fires a nuclear missile at Manhattan. Tony catches it and carries it toward the tower.",
      "Tony flies the missile up through the portal into the Chitauri mothership. It explodes, and the army on Earth collapses.",
      "Natasha closes the portal with the scepter as Tony falls back through, and the Hulk catches him."
    ] },
  { id: "wr-lhz", no: "WR-2016-01", n: "The Battle at Leipzig/Halle Airport", t: "Captain America: Civil War", yr: 2016, where: "Leipzig/Halle Airport, Germany", dc: "dc-lhz",
    sides: { A: "Steve's side", B: "Tony's side" },
    map: () => wrGrid() + `<rect x="20" y="20" width="150" height="50" ${WR_BLD}/><rect x="300" y="100" width="88" height="76" ${WR_BLD}/><circle cx="255" cy="52" r="9" ${WR_BLD}/><rect x="0" y="246" width="400" height="34" fill="rgba(255,90,78,.05)" stroke="rgba(255,130,118,.28)"/>`
      + `<path d="M10 263H390" stroke="rgba(255,150,140,.35)" stroke-dasharray="10 8"/><path d="M95 70V246M170 120H300M240 70V246" ${WR_LINE} stroke-dasharray="2 4"/><path d="M80 150l18-5 4-14 4 14 18 5-18 4-4 10-4-10z" fill="rgba(255,130,118,.16)"/><path d="M150 205l18-5 4-14 4 14 18 5-18 4-4 10-4-10z" fill="rgba(255,130,118,.16)"/><path d="M336 140l14-4 4-10 4 10 14 4-14 4-4 8-4-8z" fill="rgba(255,150,140,.25)"/>`
      + wrLab(26, 48, "Terminal") + wrLab(304, 96, "Hangar") + wrLab(268, 56, "Tower") + wrLab(12, 242, "Runway") + wrLab(60, 176, "Airliner") + wrLab(130, 232, "Airliner"),
    fx: [{ k: "beam", x1: 252, y1: 112, x2: 338, y2: 80, from: 8.55, to: 8.75 }, { k: "blast", x: 340, y: 78, at: 8.7, r: 18 }, { k: "mark", x: 334, y: 238, from: 9.85, to: 11, lab: "Rhodes down" }],
    swarms: [],
    units: [
      { c: "CA", n: "Captain America", s: "A", f: "A:steve-rogers", p: [[0, 100, 86], [.8, 160, 130], [1.3, 170, 128], [3, 196, 146], [4, 205, 150], [4.9, 300, 140], [6.8, 340, 140], [7.7, 350, 140], [7.75, null]] },
      { c: "WS", n: "The Winter Soldier", s: "A", f: "A:bucky-barnes", p: [[0, 92, 92], [.8, 152, 134], [3, 190, 152], [4, 200, 156], [4.9, 300, 146], [6.8, 346, 146], [7.7, 352, 142], [7.75, null]] },
      { c: "FA", n: "Falcon", s: "A", f: "A:sam-wilson", down: 10, p: [[2, 40, 30], [2.5, 196, 104], [3, 214, 140], [7, 230, 130], [8, 330, 90], [8.4, 362, 84], [9, 350, 120], [9.8, 336, 226]] },
      { c: "SW", n: "Scarlet Witch", s: "A", f: "A:wanda-maximoff", down: 10, p: [[2, 120, 72], [2.8, 178, 150], [3, 186, 160], [7, 220, 196], [10, 220, 196]] },
      { c: "HE", n: "Hawkeye", s: "A", f: "A:clint-barton", down: 10, p: [[2, 130, 72], [2.8, 170, 166], [3, 176, 170], [7, 196, 212], [10, 196, 212]] },
      { c: "AM", n: "Ant-Man", s: "A", f: "A:scott-lang", down: 10, grow: [5, 6.8], p: [[2.3, 226, 142], [3, 206, 160], [4.9, 236, 176], [5, 250, 190], [6.8, 262, 200], [7, 262, 202]] },
      { c: "IM", n: "Iron Man", s: "B", f: "A:tony-stark", p: [[0, 262, 30], [.6, 232, 140], [3, 214, 150], [5, 240, 165], [6, 260, 150], [6.6, 262, 176], [7, 250, 150], [8, 300, 98], [8.6, 336, 84], [9.8, 334, 230]] },
      { c: "WM", n: "War Machine", s: "B", f: "A:james-rhodes", down: 9.85, p: [[0, 282, 30], [.6, 252, 150], [3, 222, 160], [5, 246, 214], [6.4, 270, 190], [7, 252, 152], [8, 312, 86], [8.6, 340, 78], [9.85, 334, 236]] },
      { c: "BW", n: "Black Widow", s: "B", f: "A:natasha-romanoff", p: [[.4, 330, 200], [.9, 272, 160], [3, 222, 140], [6, 280, 160], [7, 304, 146], [10, 304, 146]] },
      { c: "BP", n: "Black Panther", s: "B", f: "A:tchalla", down: 7.5, p: [[.4, 340, 186], [.9, 266, 136], [3, 210, 136], [6, 270, 150], [7, 300, 140], [7.5, 306, 140]] },
      { c: "VI", n: "Vision", s: "B", f: "A:vision", p: [[.5, 330, 30], [1, 272, 100], [3, 220, 120], [7, 236, 112], [8.5, 252, 112], [10, 252, 112]] },
      { c: "SM", n: "Spider-Man", s: "B", f: "A:peter-parker", p: [[1, 330, 40], [1.4, 178, 124], [1.8, 230, 120], [3, 204, 140], [5.5, 240, 210], [6, 270, 214], [6.4, 250, 186], [7, 240, 170], [10, 240, 170]] },
      { c: "QJ", n: "The Quinjet", s: "A", p: [[7.75, 352, 140], [8.1, 395, 120], [8.5, 440, 100]] }
    ],
    beats: [
      "Steve Rogers and Bucky Barnes reach the airport to take a Quinjet. Tony Stark and James Rhodes land on the tarmac to stop them, with Natasha Romanoff, T'Challa and Vision close behind.",
      "Tony calls in Peter Parker, who webs up Steve's hands and takes his shield.",
      "Steve's side strikes back: Sam Wilson, Wanda Maximoff and Clint Barton join the fight, and so does Scott Lang.",
      "The two sides charge each other across the tarmac.",
      "Steve and Bucky break for the Quinjet in the hangar, while the others keep Tony's side busy.",
      "Scott grows to giant size, tearing through the airport to cover their run.",
      "Peter ties Scott's legs with his webbing, and Tony and Rhodes bring him down.",
      "T'Challa chases Steve and Bucky to the hangar. Natasha stuns him, and the Quinjet takes off.",
      "Rhodes and Tony chase the jet, and Sam turns to stop them. Vision fires at Sam, but the beam hits Rhodes.",
      "Rhodes falls from the sky. Tony and Sam dive after him, but neither reaches him in time.",
      "Sam, Wanda, Clint and Scott are arrested and taken to the Raft."
    ] },
  { id: "wr-earth", no: "WR-2023-01", n: "The Battle of Earth", t: "Avengers: Endgame", yr: 2023, where: "The Avengers Compound, Upstate New York", dc: "dc-earth",
    sides: { A: "The Avengers and their allies", T: "Thanos and his army" },
    map: () => wrGrid() + `<path d="M0 60C40 80 50 140 30 190S40 280 0 300Z" fill="rgba(90,140,255,.07)" stroke="rgba(140,180,255,.25)"/><ellipse cx="200" cy="165" rx="92" ry="56" fill="rgba(255,90,78,.06)" stroke="rgba(255,130,118,.32)" stroke-dasharray="4 3"/><ellipse cx="200" cy="165" rx="50" ry="28" fill="rgba(255,90,78,.08)" stroke="rgba(255,130,118,.2)"/>`
      + wrLab(8, 120, "Lake") + wrLab(200, 230, "The Compound, in ruins", "middle"),
    fx: [{ k: "ship", x: 200, y: 40, from: 0, to: 7.62 }, { k: "barrage", from: 0, to: .9 }, { k: "barrage", from: 6.75, to: 7.5 }, { k: "blast", x: 200, y: 40, at: 7.6, r: 70 },
      ...[[52, 244], [110, 284], [330, 282], [372, 222], [40, 170], [364, 150]].map(([x, y], i) => ({ k: "ring", x, y, r: 16, from: 4 + i * .08, to: 4.9 + i * .08, c: "#FFB347" })), { k: "blast", x: 238, y: 178, at: 10.05, r: 140, c: "#FFE9A8" }],
    swarms: [{ s: "T", n: 80, dust: 10.1, keys: [[3, 200, 60, 20, .3], [3.5, 200, 95, 120, 1], [4, 200, 105, 150, 1], [10, 215, 115, 150, 1], [10.6, 215, 115, 150, 0]] }, { s: "A", n: 60, keys: [[4, 200, 250, 40, 0], [4.4, 200, 235, 170, 1], [11, 200, 225, 170, 1]] }],
    units: [
      { c: "TN", n: "Thanos", s: "T", f: "T:thanos", down: 10.3, p: [[1, 200, 150], [2, 196, 152], [3, 210, 122], [4, 216, 112], [6, 216, 136], [6.8, 230, 150], [8, 248, 170], [8.6, 238, 175], [10, 236, 176]] },
      { c: "TH", n: "Thor", s: "A", f: "A:thor", p: [[.5, 120, 232], [1, 182, 160], [1.6, 168, 176], [2, 150, 178], [4, 170, 220], [10, 182, 204]] },
      { c: "IM", n: "Iron Man", s: "A", f: "A:tony-stark", down: 10.4, p: [[.5, 300, 232], [1, 216, 162], [1.6, 240, 184], [2, 262, 200], [4, 242, 212], [8.8, 246, 182], [9.2, 242, 182], [10, 242, 182]] },
      { c: "CA", n: "Captain America", s: "A", f: "A:steve-rogers", p: [[.5, 200, 242], [1, 202, 172], [2, 204, 160], [2.6, 200, 176], [3, 200, 200], [4, 200, 206], [10, 192, 210]] },
      { c: "HE", n: "Hawkeye", s: "A", f: "A:clint-barton", p: [[4.6, 200, 172], [5, 204, 176], [5.4, 232, 220], [10, 232, 222]] },
      { c: "BP", n: "Black Panther", s: "A", f: "A:tchalla", p: [[4.1, 52, 244], [5, 150, 236], [5.4, 236, 224], [5.9, 288, 244], [10, 288, 246]] },
      { c: "SM", n: "Spider-Man", s: "A", f: "A:peter-parker", p: [[4.2, 110, 284], [5.6, 260, 260], [5.95, 296, 250], [10, 298, 252]] },
      { c: "SW", n: "Scarlet Witch", s: "A", f: "A:wanda-maximoff", p: [[4.3, 372, 222], [6, 244, 142], [6.75, 236, 146], [7, 300, 226], [10, 300, 228]] },
      { c: "CM", n: "Captain Marvel", s: "A", f: "A:carol-danvers", p: [[7.3, 200, -20], [7.6, 200, 40], [7.9, 296, 246], [8.2, 262, 192], [8.6, 244, 178], [8.8, 318, 250], [10, 318, 250]] },
      { c: "G", n: "The Nano Gauntlet", s: "B", small: 1, p: [[4.7, 200, 170], [5, 204, 174], [5.4, 234, 218], [5.9, 290, 242], [5.95, 298, 248], [7.9, 298, 248], [8.2, 264, 190], [8.6, 238, 174], [10, 236, 174]] }
    ],
    beats: [
      "Thanos's warship opens fire on the Avengers Compound and flattens it.",
      "Thor, Steve and Tony face Thanos in the ruins, and Thanos overpowers Thor and Tony.",
      "Steve lifts Mjolnir and fights Thanos on his own, until Thanos breaks his shield.",
      "Thanos's army comes down from the warship and lines up against Steve alone.",
      "Portals open around the field. Wakanda's army, the Asgardians, the Ravagers, the sorcerers and every returned hero come through, and Steve calls the Avengers to assemble.",
      "Clint carries the Nano Gauntlet out of the ruins and hands it to T'Challa, and it reaches Peter Parker.",
      "Wanda attacks Thanos and nearly tears him apart, until he orders his warship to fire on the battlefield.",
      "Carol Danvers arrives and destroys the warship.",
      "Carol takes the gauntlet from Peter and fights Thanos for it, until he knocks her away with the Power Stone.",
      "Thanos snaps, but nothing happens. Tony has taken the stones into his own armor.",
      "Tony snaps. Thanos and his army turn to dust, and Tony dies of the stones' power."
    ] }
];
const warSeen = w => atlSeenT(w.t);
// the War Room is one more mode of the index panel, so back, jumps to files and the way back all work as they do in the indexes
const openColl1 = openColl;
openColl = function (mode, keep, step) {
  const cp = document.getElementById("collPanel");
  if (mode !== "war") { cp.classList.remove("warx"); return openColl1(mode, keep, step); }
  collMode = "war"; cp.classList.remove("raft", "cpx", "dcx"); cp.classList.add("warx"); cp.setAttribute("aria-label", "War Room");
  const h2 = cp.querySelector(".maptop h2"); h2.textContent = "War Room"; h2.dataset.glow = h2.textContent;
  collRec = null; collY = 0; renderColl(); cp.hidden = false; collOpen = true; bodyLock(); cp.scrollTop = 0;
  if (!step) try { history.pushState({ mcu: "coll", cm: "war" }, ""); } catch (e) {}
  document.getElementById("collBack").focus({ preventScroll: true });
};
const renderColl1 = renderColl0;
renderColl0 = function () { if (collMode === "war") renderWar(); else renderColl1(); };
let wrB = 0, wrPlay = false, wrRaf = 0, wrPick = null;
function renderWar() {
  const v = document.getElementById("collView"), L = WAR.filter(warSeen);
  cancelAnimationFrame(wrRaf); wrPlay = false; wrPick = null;
  if (collRec) {
    const w = WAR.find(x => x.id === collRec); if (!w) { collRec = null; renderWar(); return; }
    const sides = Object.keys(w.sides), N = w.beats.length, people = w.units.filter(u => u.f);
    wrB = 0;
    v.innerHTML = `<div class="co co-rec"><button type="button" class="co-crumb" data-co-back><svg width="11" height="11" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="2"/></svg>War Room</button>
      <small class="cx-lot">${w.no} · ${w.yr} · ${esc(w.where)}</small><h3>${esc(w.n)}</h3>
      <div class="wr-table"><svg viewBox="0 0 400 300" aria-label="Tactical map">${w.map()}<g class="wr-fx"></g><path class="wr-sw" d=""/><g class="wr-us"></g></svg><i class="wr-scan"></i></div>
      <div class="wr-ctl"><button type="button" data-wr="prev" aria-label="Previous beat"><svg width="14" height="14" viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="2"/></svg></button><button type="button" class="pp" data-wr="pp" aria-label="Play">${WR_PLAY}</button><button type="button" data-wr="next" aria-label="Next beat"><svg width="14" height="14" viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2"/></svg></button><input type="range" min="0" max="${N - .001}" step=".01" value="0" aria-label="Scrub through the battle"></div>
      <div class="wr-cap" aria-live="polite"></div>
      <div class="wr-legend">${sides.map(k => `<span><i style="background:${WR_COL[k]}"></i>${esc(w.sides[k])}</span>`).join("")}</div>
      <div class="co-h">Beat by beat</div><ol class="co-chain wr-beats">${w.beats.map((b, i) => `<li data-wrb="${i}"><p>${esc(b)}</p></li>`).join("")}</ol>
      <div class="co-h">On the field</div><div class="wr-chips">${people.map(u => `<button type="button" data-wrf="${u.f}" style="border-color:${WR_COL[u.s]}66;color:${WR_COL[u.s]}">${esc(u.n)}</button>`).join("")}</div>
      ${DC.some(d => d.id === w.dc) ? `<button type="button" class="wr-link" data-wrdc="${w.dc}">Incident report · ${esc(DC.find(d => d.id === w.dc).no)}<span style="margin-left:auto">&#8250;</span></button>` : ""}</div>`;
    wrDraw(w); return;
  }
  v.innerHTML = `<div class="co"><div class="co-top"><small>Avengers Compound · tactical archive</small><p class="co-sub">${L.length} engagement${L.length === 1 ? "" : "s"} on file</p></div>
    ${L.length ? `<div class="wr-list">${L.map(w => `<button type="button" class="wr-card" data-co="${w.id}"><span class="wr-no">${w.no}</span><span><b>${esc(w.n)}</b><small>${esc(w.where)} · ${w.yr}</small><small>${w.beats.length} beats · ${tnh(w.t)}</small></span><em aria-hidden="true">&#8250;</em></button>`).join("")}</div>` : `<p class="sr-empty">No data.</p>`}</div>`;
}
const WR_PLAY = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>', WR_PAUSE = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor"/></svg>';
const wrEase = f => f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
function wrPos(u, b) {   // where a marker is at beat b: eased between its keys; a key with no place hides it until the next
  const P = u.p; if (b < P[0][0]) return null;
  let i = 0; while (i < P.length - 1 && P[i + 1][0] <= b) i++;
  const a = P[i]; if (a[1] == null) return null; const c = P[i + 1];
  if (!c || c[1] == null) return c && c[1] == null && b >= c[0] ? null : [a[1], a[2]];
  const f = wrEase((b - a[0]) / (c[0] - a[0])); return [a[1] + (c[1] - a[1]) * f, a[2] + (c[2] - a[2]) * f];
}
const wrKey = (K, b) => { if (b <= K[0][0]) return b < K[0][0] ? null : K[0].slice(1); let i = 0; while (i < K.length - 1 && K[i + 1][0] <= b) i++; const a = K[i], c = K[i + 1]; if (!c) return a.slice(1); const f = (b - a[0]) / (c[0] - a[0]); return a.slice(1).map((v, k) => v + (c[k + 1] - v) * f); };
function wrDraw(w) {
  const v = document.getElementById("collView"), svg = v.querySelector(".wr-table svg"); if (!svg) return;
  const b = wrB, N = w.beats.length, beat = Math.min(N - 1, Math.floor(b)), now = performance.now();
  // the forces in numbers: a swarm of small arrowheads around a moving center
  let d = "", sw = svg.querySelector(".wr-sw"); const S = w.swarms;
  sw.setAttribute("d", ""); svg.querySelectorAll(".wr-swx").forEach(e => e.remove());
  S.forEach((s, si) => { const k = wrKey(s.keys, b); if (!k || k[3] <= 0) return; const [cx, cy, r, dens] = k; let dd = "";
    const dust = s.dust != null && b > s.dust ? Math.min(1, (b - s.dust) * 2) : 0;
    for (let i = 0; i < s.n; i++) { if (i / s.n > dens) continue; const q = i * 2.399 + si, rr = r * Math.sqrt((i + .5) / s.n), wob = Math.sin(now / 700 + i) * 3;
      const x = cx + Math.cos(q + b * .3) * rr + wob, y = cy + Math.sin(q + b * .3) * rr * .7 + Math.cos(now / 650 + i) * 2, a = q + b;
      dd += `M${(x + Math.cos(a) * 2.6).toFixed(1)} ${(y + Math.sin(a) * 2.6).toFixed(1)}L${(x + Math.cos(a + 2.4) * 2).toFixed(1)} ${(y + Math.sin(a + 2.4) * 2).toFixed(1)}L${(x + Math.cos(a - 2.4) * 2).toFixed(1)} ${(y + Math.sin(a - 2.4) * 2).toFixed(1)}Z`; }
    svg.querySelector(".wr-us").insertAdjacentHTML("beforebegin", `<path class="wr-swx" d="${dd}" fill="${dust ? `rgba(150,140,135,${.8 * (1 - dust)})` : WR_COL[s.s]}" opacity="${Math.min(1, k[3]) * .8}"/>`); });
  // effects: the portal, a crash, lightning, blasts, the warship and its barrage
  let fx = "";
  w.fx.forEach(e => {
    if (e.k === "ring" && b >= e.from && b <= e.to) { const o = Math.min(1, (b - e.from) * 4, (e.to - b) * 4), c = e.c || "#7FD3FF";
      fx += `<circle cx="${e.x}" cy="${e.y}" r="${e.r * (.4 + .6 * o)}" fill="none" stroke="${c}" stroke-width="1.6" stroke-dasharray="5 3" opacity="${o}" transform="rotate(${now / 40 % 360} ${e.x} ${e.y})"/><circle cx="${e.x}" cy="${e.y}" r="${e.r * (.4 + .6 * o) + 4}" fill="none" stroke="${c}" stroke-opacity=".3" opacity="${o}"/>`
        + (e.lab ? `<text class="wr-lab" x="${e.x - e.r - 6}" y="${e.y - e.r + 4}" text-anchor="end" opacity="${o}">${e.lab}</text>` : ""); }
    if (e.k === "mark" && b >= e.from && b <= e.to) fx += `<path d="M${e.x - 5} ${e.y - 5}l10 10M${e.x + 5} ${e.y - 5}l-10 10" stroke="#FF8A7E" stroke-width="1.6"/><text class="wr-lab" x="${e.x - 8}" y="${e.y + 3}" text-anchor="end">${e.lab}</text>`;
    if (e.k === "bolt" && b >= e.from && b <= e.to) for (let k = 0; k < 3; k++) { const a = now / 300 + k * 2.1; let p = `M${e.x} ${e.y - 6}`; for (let j = 1; j <= 5; j++) { const f = j / 5; p += `L${(e.x + Math.cos(a) * e.r * f + (Math.random() - .5) * 6).toFixed(1)} ${(e.y - 6 + Math.sin(a) * e.r * f + (Math.random() - .5) * 6).toFixed(1)}`; } fx += `<path d="${p}" stroke="#CFE6FF" stroke-width="1.1" fill="none" opacity=".9"/>`; }
    if (e.k === "beam" && b >= e.from && b <= e.to) fx += `<path d="M${e.x1} ${e.y1}L${e.x2} ${e.y2}" stroke="#FFE27A" stroke-width="2.4" opacity=".95"/>`;
    if (e.k === "blast" && b >= e.at && b < e.at + .6) { const f = (b - e.at) / .6; fx += `<circle cx="${e.x}" cy="${e.y}" r="${e.r * f}" fill="${e.c || "#FFD27A"}" fill-opacity="${.35 * (1 - f)}" stroke="${e.c || "#FFD27A"}" stroke-opacity="${1 - f}" stroke-width="2"/>`; }
    if (e.k === "ship" && b >= e.from && b <= e.to) { const o = Math.min(1, (e.to - b) * 5); fx += `<path d="M${e.x - 120} ${e.y}C${e.x - 60} ${e.y - 26} ${e.x + 60} ${e.y - 26} ${e.x + 120} ${e.y}C${e.x + 60} ${e.y + 18} ${e.x - 60} ${e.y + 18} ${e.x - 120} ${e.y}Z" fill="rgba(255,90,78,.12)" stroke="#FF5A4E" stroke-width="1.2" opacity="${o}"/><text class="wr-lab" x="${e.x}" y="${e.y + 3}" text-anchor="middle" opacity="${o}">Warship, overhead</text>`; }
    if (e.k === "barrage" && b >= e.from && b <= e.to) for (let k = 0; k < 6; k++) { const s = Math.floor(now / 140) + k * 7, x = 40 + (s * 73 % 320), y = 90 + (s * 41 % 190), f = (now % 140) / 140; fx += `<circle cx="${x}" cy="${y}" r="${4 + 10 * f}" fill="#FFB347" fill-opacity="${.4 * (1 - f)}" stroke="#FFB347" stroke-opacity="${1 - f}"/>`; }
  });
  svg.querySelector(".wr-fx").innerHTML = fx;
  // the people and machines, each a lettered marker; who's down goes grey
  svg.querySelector(".wr-us").innerHTML = w.units.map((u, i) => { const p = wrPos(u, b); if (!p) return "";
    const down = u.down != null && b >= u.down, big = u.grow && b >= u.grow[0] && b < u.grow[1] + .3 ? 2.4 : u.big || 1, r = (u.small ? 4.6 : 8.6) * big, col = down ? "#7C7470" : WR_COL[u.s], pick = wrPick === i;
    return `<g class="wr-u" data-wru="${i}" transform="translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})"${down ? ' opacity=".75"' : ""}>${pick ? `<circle r="${r + 5}" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="2 2"/>` : ""}<circle r="${r}" fill="#0E0A0B" stroke="${col}" stroke-width="1.6"/>${u.small ? `<circle r="2" fill="${col}"/>` : `<text fill="${col}" font-size="${7.4 * Math.min(big, 1.8)}">${u.c}</text>`}${down ? `<path d="M${-r} ${-r}L${r} ${r}" stroke="${col}" stroke-width="1"/>` : ""}</g>`; }).join("");
  // the caption, the scrubber and the beat list follow along
  const cap = v.querySelector(".wr-cap"); if (cap.dataset.b !== String(beat)) { cap.dataset.b = beat; cap.innerHTML = `<small>Beat ${beat + 1} of ${N}</small>${esc(w.beats[beat])}`;
    v.querySelectorAll(".wr-beats li").forEach((li, i) => li.classList.toggle("now", i === beat)); }
  const rg = v.querySelector(".wr-ctl input"); if (document.activeElement !== rg) rg.value = b;
  if (wrPick != null) { const u = w.units[wrPick], tb = v.querySelector(".wr-table"); let who = tb.querySelector(".wr-who"); if (!who) { tb.insertAdjacentHTML("beforeend", `<div class="wr-who"><span></span>${u.f ? `<button type="button" data-wrf="${u.f}">Open file</button>` : ""}</div>`); who = tb.querySelector(".wr-who"); } who.firstChild.textContent = u.n; }
}
function wrLoop(w) {
  let last = performance.now();
  const step = now => { const v = document.getElementById("collView"); if (collMode !== "war" || collRec !== w.id || !v.querySelector(".wr-table")) { wrPlay = false; return; }
    if (wrPlay) { wrB += (now - last) / 3600; if (wrB >= w.beats.length - .001) { wrB = w.beats.length - .001; wrPlay = false; v.querySelector('[data-wr="pp"]').innerHTML = WR_PLAY; } }
    last = now; wrDraw(w); wrRaf = requestAnimationFrame(step); };
  cancelAnimationFrame(wrRaf); wrRaf = requestAnimationFrame(step);
}
document.getElementById("collView").addEventListener("click", ev => {
  if (collMode !== "war") {   // a battle's incident report opens its replay
    const g = ev.target.closest("[data-war]"); if (g) { ev.stopImmediatePropagation(); haptic(10); collJump("war", g.dataset.war); } return; }
  const w = WAR.find(x => x.id === collRec);
  const c = ev.target.closest("[data-wr]"); if (c && w) { ev.stopImmediatePropagation(); haptic(8); const N = w.beats.length;
    if (c.dataset.wr === "pp") { if (wrB >= N - .01) wrB = 0; wrPlay = !wrPlay; c.innerHTML = wrPlay ? WR_PAUSE : WR_PLAY; c.setAttribute("aria-label", wrPlay ? "Pause" : "Play"); }
    else { wrPlay = false; v0().querySelector('[data-wr="pp"]').innerHTML = WR_PLAY; const cur = Math.floor(wrB + 1e-6); wrB = c.dataset.wr === "next" ? Math.min(N - .001, cur + 1) : wrB - cur > .15 ? cur : Math.max(0, cur - 1); }
    wrLoop(w); return; }
  const bi = ev.target.closest("[data-wrb]"); if (bi && w) { ev.stopImmediatePropagation(); haptic(8); wrB = +bi.dataset.wrb; wrPlay = true; v0().querySelector('[data-wr="pp"]').innerHTML = WR_PAUSE; wrLoop(w); v0().closest("#collPanel").scrollTo({ top: 0, behavior: "smooth" }); return; }
  const u = ev.target.closest("[data-wru]"); if (u && w) { ev.stopImmediatePropagation(); haptic(8); wrPick = +u.dataset.wru === wrPick ? null : +u.dataset.wru; const o = v0().querySelector(".wr-who"); if (o) o.remove(); wrDraw(w); return; }
  const f = ev.target.closest("[data-wrf]"); if (f) { ev.stopImmediatePropagation(); haptic(10); const [tg, id] = f.dataset.wrf.split(":"), o = (tg === "A" ? ALLIES : THREATS).find(x => x.id === id); if (!o) return; if (tg === "A") cpUni = rfUniOf(o); else rfUni = rfUniOf(o); collJump(tg === "A" ? "cp" : "raft", id); return; }
  const r = ev.target.closest("[data-wrdc]"); if (r) { ev.stopImmediatePropagation(); haptic(10); dcUni = "mcu"; collJump("dc", r.dataset.wrdc); return; }
  if (w && ev.target.closest(".wr-table") && wrPick != null) { wrPick = null; const o = v0().querySelector(".wr-who"); if (o) o.remove(); wrDraw(w); }
}, true);
const v0 = () => document.getElementById("collView");
document.getElementById("collView").addEventListener("input", ev => { if (collMode !== "war" || !ev.target.matches(".wr-ctl input")) return; const w = WAR.find(x => x.id === collRec); if (!w) return;
  wrPlay = false; v0().querySelector('[data-wr="pp"]').innerHTML = WR_PLAY; wrB = +ev.target.value; wrLoop(w); });
// a replay starts drawing as soon as it opens
const renderWar0 = renderWar;
renderWar = function () { renderWar0(); const w = collRec && WAR.find(x => x.id === collRec); if (w) wrLoop(w); };
// the door: in the Atlas, the Compound's place sheet, under its personnel files
const atlSheet1 = atlSheet;
atlSheet = function (p, fresh) {
  let h = atlSheet1(p, fresh); if (p.id !== "compound" || !WAR.some(warSeen)) return h;
  const i = h.indexOf("atl-cpb"); if (i < 0) return h; const j = h.indexOf("</button>", i) + 9;
  return h.slice(0, j) + `<button type="button" class="atl-war"><i aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2.4" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 0v4M8 12v4M0 8h4M12 8h4" stroke="currentColor" stroke-width="1.3"/></svg></i><span><b>War Room</b><small>Every great battle, replayed</small></span><em aria-hidden="true">&#8250;</em></button>` + h.slice(j);
};
document.addEventListener("click", ev => { if (ev.target.closest(".atl-war")) { ev.stopPropagation(); haptic(12); openColl("war"); } }, true);
// and from the incident report of a battle on the table
const renderDc1 = renderDc;
renderDc = function () { renderDc1(); if (!collRec) return; const w = WAR.find(x => x.dc === collRec && warSeen(x)); const hd = document.querySelector("#collView .dc-head"); if (!w || !hd) return;
  hd.insertAdjacentHTML("afterend", `<button type="button" class="dc-war" data-war="${w.id}">Replay in the War Room<span style="margin-left:auto">&#8250;</span></button>`); };
/* MOCKUP END */
