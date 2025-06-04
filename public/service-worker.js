const CACHE_NAME = 'beton-cache-v1';
const URLsToCache = [
  '/',
  '/views/index.html',
  '/views/zayavki.html',
  '/public/styles.css',
  '/public/app.js',
  '/public/zayavki.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
