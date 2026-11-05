// MCU Watch Tracker: lets the installed app open without a connection.
// The app itself always tries the internet first, checking past the phone's own short-term copy, so a new index.html shows up on the next open;
// the saved copy is only used when you're offline, when the internet answers with an error, or when the download is cut off or too slow.
// The fonts never change, so once they've been fetched they come straight from the saved copy (and work offline from then on).
const CACHE = "mcu-tracker";
const CORE = ["./", "./manifest.webmanifest", "./icon-192.png", "./network.html"];   // the Network is its own file, saved for offline too

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
});
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
// only a good answer is saved, so one bad response can't replace the copy that works offline
const keep = (req, res) => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); } return res; };
// a page (the app, or the Network in its frame) is handed over only once all of it has arrived: a download cut off partway, on a weak
// signal, falls back to the saved copy instead of reaching the app as an error (the Android app's "No signal" page, owner, November
// 2026: "the no network thing pops up again"). Still downloading after WAIT with a saved copy at hand, the saved copy answers and the new
// one finishes in the background, ready for the next open. Each page falls back to its own saved copy, never the app in the Network's frame
const WAIT = 5000;
function page(e, r) {
  const fresh = fetch(r.url, { cache: "no-cache", credentials: "same-origin" }).then(res => { if (!res.ok) return res;
    const h = new Headers(res.headers); h.delete("content-encoding"); h.delete("content-length");   // the body below is already unpacked
    return res.blob().then(b => keep(r, new Response(b, { status: res.status, statusText: res.statusText, headers: h }))); });
  const saved = () => caches.match(r, { ignoreSearch: true }).then(m => m || (r.destination === "document" ? caches.match("./") : undefined));
  e.waitUntil(fresh.catch(() => {}));
  return new Promise(done => { let over = false; const give = x => { if (x && !over) { over = true; done(x); } };
    fresh.then(res => res.ok ? give(res) : saved().then(m => give(m || res)), () => saved().then(m => give(m || Response.error())));
    setTimeout(() => saved().then(give), WAIT); });
}
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  if (/^https:\/\/fonts\.(gstatic|googleapis)\.com\//.test(r.url)) { e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => keep(r, res)))); return; }
  if (r.mode === "navigate") { e.respondWith(page(e, r)); return; }
  // the files' data (data.<hash>.js, mainsplit.py): named by its contents, so a saved copy is always right. It comes from the saved copy,
  // or the internet whole (never half a file), and a new one clears out the old
  if (/\/data\.[0-9a-f]{12}\.js$/.test(new URL(r.url).pathname)) { e.respondWith(caches.match(r).then(m => m || fetch(r.url, { cache: "no-cache", credentials: "same-origin" }).then(res => {
    if (!res.ok) return res; const h = new Headers(res.headers); h.delete("content-encoding"); h.delete("content-length");
    return res.blob().then(b => { const out = new Response(b, { status: res.status, statusText: res.statusText, headers: h }), copy = out.clone();   // copied before the page reads it
      e.waitUntil(caches.open(CACHE).then(c => c.put(r, copy).then(() => c.keys()).then(K => Promise.all(K.filter(k => /\/data\.[0-9a-f]{12}\.js$/.test(new URL(k.url).pathname) && k.url !== r.url).map(k => c.delete(k))))).catch(() => {}));
      return out; }); }))); return; }
  e.respondWith(fetch(new Request(r, { cache: "no-cache" })).then(res => keep(r, res)).catch(() => caches.match(r)));
});
