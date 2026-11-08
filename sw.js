// Coté by Adams Partners : permet d'installer l'appli sur l'écran d'accueil.
// Toujours la dernière version en ligne ; la page de départ reste affichable hors connexion.
const CACHE = "cote-v1";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./", "manifest.webmanifest", "icons/icon-192.png"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if (e.request.mode === "navigate"){ const copy = r.clone(); caches.open(CACHE).then(c => c.put("./", copy)); } return r; })
    .catch(() => caches.match(e.request.mode === "navigate" ? "./" : e.request)));
});
