// the datapad's sounds, one library for the sound board and the app alike: every sound made in the browser as it plays, from a few voices
// (clean tones, glassy FM, filtered noise, sweeps with a flutter, data chatter, a servo), so the two always sound the same
const DPSND = (() => {
  let ctx = null, master = null, noiseBuf = null, level = .7;
  function ready() {
    if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return false; ctx = new C();
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4; master = ctx.createGain(); master.gain.value = level; master.connect(comp); comp.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    if (ctx.state !== "running") ctx.resume(); return true;
  }
  const T = () => ctx.currentTime;
  const envOut = (t, peak, a, dur, hold) => { const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); if (hold) g.gain.setValueAtTime(peak, t + a + hold); g.gain.exponentialRampToValueAtTime(.0001, t + dur); g.connect(master); return g; };
  // a short digital tone; steps: a staircase of pitches, like a terminal
  function blip(at, f, dur, o = {}) {
    const t = T() + at, osc = ctx.createOscillator(), lp = ctx.createBiquadFilter(); osc.type = o.type || "square"; lp.type = "lowpass"; lp.frequency.value = o.lp || 6000;
    if (o.steps) o.steps.forEach((s, i) => osc.frequency.setValueAtTime(s, t + i * (dur / o.steps.length))); else osc.frequency.setValueAtTime(f, t);
    osc.connect(lp); lp.connect(envOut(t, o.g || .06, o.a || .002, dur, o.hold)); osc.start(t); osc.stop(t + dur + .02);
  }
  const sine = (at, f, dur, o = {}) => blip(at, f, dur, { ...o, type: "sine", lp: 14000 });
  // glassy FM: a sine bent by a second one, its brightness falling away; smooth glides, nothing stepped
  function fm(at, f, dur, o = {}) {
    const t = T() + at, c = ctx.createOscillator(), m = ctx.createOscillator(), mg = ctx.createGain(); c.type = "sine"; m.type = "sine";
    c.frequency.setValueAtTime(f, t); m.frequency.setValueAtTime(f * (o.ratio || 2), t);
    if (o.to) { c.frequency.exponentialRampToValueAtTime(o.to, t + (o.glide || dur * .6)); m.frequency.exponentialRampToValueAtTime(o.to * (o.ratio || 2), t + (o.glide || dur * .6)); }
    mg.gain.setValueAtTime(f * (o.index || 1), t); mg.gain.exponentialRampToValueAtTime(f * .01 + 1, t + dur * .7);
    m.connect(mg); mg.connect(c.frequency); c.connect(envOut(t, o.g || .05, o.a || .004, dur)); c.start(t); m.start(t); c.stop(t + dur + .02); m.stop(t + dur + .02);
  }
  // filtered noise: seals, reads, static, and the glassy swipe of a panel
  function nz(at, dur, o = {}) {
    const t = T() + at, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(); s.buffer = noiseBuf;
    f.type = o.ft || "bandpass"; f.Q.value = o.q || 2; f.frequency.setValueAtTime(o.f || 3000, t); if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t + dur);
    s.connect(f); f.connect(envOut(t, o.g || .05, o.a || .003, dur)); s.start(t, Math.random()); s.stop(t + dur + .02);
  }
  // a sweep with a fast flutter on it: a reader's or a sensor's scan
  function scan(at, f0, f1, dur, o = {}) {
    const t = T() + at, osc = ctx.createOscillator(), am = ctx.createOscillator(), amg = ctx.createGain(), g = ctx.createGain(), p = o.g || .04;
    osc.type = "sine"; osc.frequency.setValueAtTime(f0, t); osc.frequency.linearRampToValueAtTime(f1, t + dur); am.frequency.value = o.rate || 34; amg.gain.value = p * .5;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(p, t + .02); g.gain.setValueAtTime(p, t + Math.max(.03, dur - .04)); g.gain.linearRampToValueAtTime(0, t + dur);
    am.connect(amg); amg.connect(g.gain); osc.connect(g); g.connect(master); osc.start(t); am.start(t); osc.stop(t + dur + .02); am.stop(t + dur + .02);
  }
  const DATA_F = [1760, 1976, 2349, 2637, 2960, 3520];
  function chatter(at, dur, o = {}) { const every = o.every || .035, n = Math.floor(dur / every); for (let i = 0; i < n; i++) if (Math.random() < (o.density || .8)) blip(at + i * every, DATA_F[Math.random() * DATA_F.length | 0] * (o.oct || 1), .018, { g: o.g || .018, type: o.type || "square", lp: 5000 }); }
  function servo(at, f0, f1, dur, o = {}) {
    const t = T() + at, osc = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain(), p = o.g || .05; osc.type = "sawtooth"; lp.type = "lowpass"; lp.frequency.value = o.lp || 1100; lp.Q.value = 3;
    for (let i = 0; i <= 10; i++) osc.frequency.setValueAtTime(f0 + (f1 - f0) * i / 10, t + dur * i / 10);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(p, t + .03); g.gain.setValueAtTime(p, t + dur - .05); g.gain.linearRampToValueAtTime(0, t + dur);
    osc.connect(lp); lp.connect(g); g.connect(master); osc.start(t); osc.stop(t + dur + .02); nz(at, dur, { f: 900, q: .8, g: p * .35 });
  }
  const thump = (at, g = .22) => blip(at, 90, .18, { type: "sine", lp: 14000, steps: [90, 70, 55, 46], g });
  const click = (at, g = .05) => nz(at, .012, { ft: "highpass", f: 3500, g });
  // the sounds, by name
  const S = {
    tap: () => sine(0, 3400, .022, { g: .022 }),
    select: () => { blip(0, 2349, .03, { g: .035 }); blip(.035, 3136, .035, { g: .03 }); },
    back: () => { blip(0, 2637, .03, { g: .03 }); blip(.035, 1976, .04, { g: .028 }); },
    check: () => { blip(0, 1760, .03, { g: .04 }); blip(.04, 2349, .03, { g: .04 }); blip(.08, 3520, .07, { g: .045, hold: .02 }); click(.1, .04); },
    uncheck: () => { blip(0, 2349, .035, { g: .03 }); blip(.045, 1568, .06, { g: .028 }); },
    rating: n => { for (let i = 0; i < (n || 4); i++) blip(i * .06, [1760, 2093, 2637, 3136, 3520][i], .045, { g: .03, type: "triangle", lp: 9000 }); },
    saved: () => { chatter(0, .12, { g: .012 }); sine(.14, 2960, .05, { g: .03 }); },
    denied: () => { blip(0, 180, .09, { g: .06, lp: 900, hold: .05 }); blip(.12, 150, .14, { g: .06, lp: 900, hold: .08 }); },
    // opening and closing a box: three takes, each smooth and glassy, none stepped
    openA: () => { nz(0, .09, { f: 2400, to: 7500, q: 7, g: .035 }); fm(.015, 760, .22, { to: 1180, glide: .12, ratio: 2.01, index: 1.1, g: .045 }); sine(0, 150, .1, { g: .045 }); fm(.11, 2360, .22, { ratio: 3.5, index: .35, g: .016 }); },
    closeA: () => { nz(0, .09, { f: 7500, to: 2400, q: 7, g: .03 }); fm(.01, 1180, .2, { to: 760, glide: .12, ratio: 2.01, index: 1.1, g: .04 }); sine(.1, 130, .1, { g: .04 }); },
    openB: () => { const t = T(), g = ctx.createGain(), lp = ctx.createBiquadFilter(), am = ctx.createOscillator(), amg = ctx.createGain(); lp.type = "lowpass"; lp.frequency.value = 5200;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.05, t + .03); g.gain.exponentialRampToValueAtTime(.0001, t + .32); am.frequency.value = 46; amg.gain.value = .02; am.connect(amg); amg.connect(g.gain); g.connect(lp); lp.connect(master);
      [600, 607].forEach(f => { const o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 2, t + .16); o.connect(g); o.start(t); o.stop(t + .34); }); am.start(t); am.stop(t + .34); sine(.17, 3400, .03, { g: .02 }); },
    closeB: () => { const t = T(), g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 5200; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.045, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .26); g.connect(lp); lp.connect(master);
      [1200, 1213].forEach(f => { const o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f / 2, t + .15); o.connect(g); o.start(t); o.stop(t + .28); }); sine(.15, 2600, .03, { g: .016 }); },
    openC: () => { fm(0, 320, .09, { to: 210, glide: .06, ratio: 1, index: .4, g: .06 }); sine(.01, 3520, .06, { g: .016 }); },
    closeC: () => { fm(0, 260, .09, { to: 170, glide: .06, ratio: 1, index: .4, g: .055 }); sine(.01, 2637, .05, { g: .014 }); },
    dock: () => { scan(0, 900, 1500, .12, { g: .025, rate: 60 }); blip(.12, 2637, .03, { g: .03 }); },
    path: () => { chatter(0, .3, { every: .022, g: .015 }); blip(.32, 0, .16, { steps: [1320, 1760, 2349], g: .035 }); },
    drawIn: () => { scan(0, 600, 640, 1.6, { g: .018, rate: 12 }); for (let i = 0; i < 8; i++) sine(.1 + i * .19, 2637, .025, { g: .022 }); },
    drawBack: () => { scan(0, 640, 520, .8, { g: .016, rate: 18 }); for (let i = 0; i < 5; i++) sine(.06 + i * .14, 2093, .022, { g: .018 }); click(.82, .03); },
    map: () => { scan(0, 300, 1100, .55, { g: .03, rate: 40 }); chatter(.2, .45, { every: .03, g: .012 }); },
    pick: () => { [0, .18, .36].forEach((a, i) => { blip(a, [1568, 1976, 2349][i], .06, { g: .035, hold: .02 }); click(a + .01, .02); }); },
    pill: () => { [0, .07, .14].forEach((a, i) => blip(a, [1976, 2637, 3520][i], .07, { g: .04, hold: .02 })); click(.22, .03); },
    complete: () => { chatter(0, .18, { g: .014 }); [0, .08, .16, .24].forEach((a, i) => blip(.2 + a, [1760, 2349, 2960, 3520][i], .07, { g: .045, hold: .02 })); thump(.2, .12); },
    levelup: () => { scan(0, 500, 2400, .45, { g: .03 }); [0, .1, .2].forEach((a, i) => blip(.5 + a, [2093, 2637, 3136][i], .09, { g: .05, hold: .04 })); thump(.5, .16); },
    message: () => { [0, .1, .2, .3].forEach((a, i) => sine(a, i % 2 ? 1568 : 2349, .07, { g: .035 })); },
    headline: () => { blip(0, 1320, .05, { g: .03 }); chatter(.07, .55, { every: .04, density: .65, g: .012, type: "triangle" }); },
    hacked: () => { nz(0, .25, { f: 2200, q: .6, g: .06 }); blip(.05, 220, .2, { g: .05, lp: 1400, steps: [220, 330, 196, 440, 165] }); nz(.27, .08, { f: 4000, g: .04 }); },
    intake: () => { chatter(0, .7, { every: .018, density: .9, g: .013 }); blip(.74, 2960, .1, { g: .04, hold: .04 }); click(.76, .03); },
    newrec: () => { blip(0, 3136, .04, { g: .03 }); blip(.06, 3136, .04, { g: .03 }); },
    swipe: () => nz(0, .28, { f: 1800, to: 4200, q: 3, g: .05 }),
    readok: () => sine(0, 2637, .07, { g: .04, hold: .03 }),
    reject: () => { blip(0, 196, .12, { g: .06, lp: 900, hold: .06 }); blip(.15, 196, .12, { g: .06, lp: 900, hold: .06 }); },
    doors: () => { nz(0, .35, { ft: "highpass", f: 2500, g: .07 }); thump(.05, .2); servo(.25, 70, 120, 1.1, { g: .05 }); thump(1.35, .18); },
    barcode: () => { scan(0, 1200, 1300, .6, { g: .03, rate: 70 }); blip(.62, 2960, .06, { g: .04 }); },
    atlas: () => { sine(0, 55, .9, { g: .08, a: .2 }); scan(.05, 300, 900, .5, { g: .02, rate: 50 }); chatter(.4, .35, { every: .03, g: .012 }); blip(.8, 2349, .05, { g: .03 }); },
    pin: () => { blip(0, 2637, .025, { g: .03 }); sine(.04, 3520, .05, { g: .035 }); },
    city: () => { blip(0, 0, .3, { steps: [600, 800, 1000, 1300, 1700, 2200], g: .025, lp: 3500 }); scan(.05, 400, 1600, .3, { g: .02 }); },
    zoom: () => sine(0, 3136, .015, { g: .016 }),
    launch: () => { sine(0, 60, .5, { g: .07, a: .05 }); scan(.1, 600, 1400, .35, { g: .025 }); [0, .09].forEach((a, i) => blip(.5 + a, [2349, 3136][i], .06, { g: .035, hold: .02 })); },
    // the first boot, beat by beat (the app plays each as its animation reaches it; the board strings them together)
    bootPower: () => { sine(0, 50, .5, { g: .09, a: .25 }); nz(.05, .35, { ft: "highpass", f: 6000, g: .02 }); },
    bootOpen: () => { thump(0, .2); scan(0, 200, 700, .3, { g: .025, rate: 80 }); },
    bootType: d => chatter(0, d || .85, { every: .045, density: .95, g: .016 }),
    bootTrace: () => scan(0, 900, 1400, .7, { g: .02, rate: 22 }),
    bootLit: () => { [0, .08, .16].forEach((a, i) => blip(a, [1760, 2349, 2960][i], .08, { g: .04, hold: .03 })); thump(0, .14); },
    bootWait: () => sine(0, 1175, .9, { g: .012, a: .4 }),
    bootLine: ok => { chatter(0, .14, { every: .025, g: .012 }); if (ok) blip(.16, 2637, .03, { g: .03 }); else { blip(.16, 196, .06, { g: .045, lp: 900 }); blip(.24, 196, .06, { g: .045, lp: 900 }); } },
    bootBar: () => scan(0, 500, 1800, 1.4, { g: .015, rate: 30 }),
    bootGranted: () => { [0, .09, .18].forEach((a, i) => blip(a, [2093, 2637, 3520][i], .1, { g: .05, hold: .05 })); thump(0, .2); },
    bootClear: () => servo(0, 160, 90, .35, { g: .03, lp: 1500 }),
    bootHome: () => { for (let i = 0; i < 6; i++) blip(i * .11, [1760, 2093, 2349, 2637, 2960, 3136][i], .025, { g: .022 }); }
  };
  return { play(name, arg) { if (!S[name] || !ready()) return; try { S[name](arg); } catch (e) {} }, ready, setLevel(v) { level = v; if (master) master.gain.value = v; }, has: n => !!S[n] };
})();
