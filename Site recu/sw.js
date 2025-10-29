const CACHE_NAME = 'cmds-cache-v1';
const ASSETS = [
  './',
  './gestion_commandes_pwa.html',
  './manifest.json'
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(clients.claim());
});

self.addEventListener('fetch', evt => {
  // Try cache first, then network
  evt.respondWith(
    caches.match(evt.request).then(cached => {
      if(cached) return cached;
      return fetch(evt.request).then(resp => {
        // Optionally cache new requests
        return resp;
      }).catch(()=> caches.match('./'));
    })
  );
});
