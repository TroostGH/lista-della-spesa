// Service worker — abilita l'uso offline (utile al supermercato)
const CACHE = 'lista-spesa-v3';
const ASSETS = [
  './', './index.html', './styles.css?v=2', './app.js?v=2',
  './catalog.js', './firebase-config.js', './manifest.json',
  './icons/icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(ASSETS.map((a) => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Lascia passare le richieste non-GET e quelle esterne (es. Firebase)
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // Network-first: quando sei online prendi sempre la versione aggiornata
  // e aggiorni la cache; offline usi l'ultima copia salvata.
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then((cached) => cached || caches.match('./index.html')))
  );
});
