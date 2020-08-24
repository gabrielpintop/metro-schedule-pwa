importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const staticCache = 'my-cache-static';
const dynamicCache = 'my-cache-dynamic';
const cacheFiles = [
    '/',
    '/manifest.json',
    '/offline.html',
    '/index.html',
    '/scripts/app.js',
    '/scripts/install.js',
    '/scripts/simpledb.min.js',
    '/styles/inline.css',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg'
];

if (workbox) {
    workbox.core.setCacheNameDetails({
        prefix: 'metro-schedule-pwa',
        suffix: 'v1',
        precache: 'my-precache',
        runtime: 'my-runcache'
    });
    workbox.core.setCacheNameDetails({
        precache: staticCache,
        runtime: dynamicCache
    });
    workbox.precaching.precacheAndRoute(cacheFiles);
    workbox.routing.registerRoute(
        ({ event }) => event.request.mode === 'navigate',
        ({ url }) => fetch(url.href).catch(() => caches.match('/offline.html'))
    );
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://api-ratp.pierre-grimaud.fr',
        new workbox.strategies.CacheFirst({
            cacheName: 'api-stations',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxAgeSeconds: 600
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200]
                })
            ]
        })
    );
    self.addEventListener('install', () => {
        self.skipWaiting();
    });
    self.addEventListener('activate', () => {
        clients.claim();
    });
} else {
    console.log('No workbox');
}