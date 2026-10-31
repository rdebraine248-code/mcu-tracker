// MCU Watch Tracker: lets the installed app open without a connection.
// The app itself always tries the internet first, checking past the phone's own short-term copy, so a new index.html shows up on the next open;
// the saved copy is only used when you're offline, or when the internet answers with an error.
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
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  if (/^https:\/\/fonts\.(gstatic|googleapis)\.com\//.test(r.url)) { e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => keep(r, res)))); return; }
  e.respondWith(
    (r.mode === "navigate" ? fetch(r.url, { cache: "no-cache", credentials: "same-origin" }) : fetch(new Request(r, { cache: "no-cache" })))
      .then(res => res.ok || r.mode !== "navigate" ? keep(r, res) : caches.match("./").then(m => m || res))
      .catch(() => caches.match(r).then(m => m || (r.mode === "navigate" ? caches.match("./") : undefined)))
  );
});
