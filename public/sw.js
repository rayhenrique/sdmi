const CACHE_NAME = 'sdmi-cache-v1';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
    '/',
    '/logo-sdmi.png',
    '/logo-sdmi2.png',
    '/manifest.json',
];

// Install event - pre-cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - Network First strategy for pages, Cache First for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip external requests
    if (url.origin !== location.origin) return;

    // For API/Inertia requests - always network
    if (request.headers.get('X-Inertia') || url.pathname.startsWith('/api')) {
        return;
    }

    // For navigation requests - Network First with offline fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || caches.match('/');
                    });
                })
        );
        return;
    }

    // For static assets (JS, CSS, images, fonts) - Cache First
    if (
        url.pathname.startsWith('/build/') ||
        url.pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|webp|woff2?|ttf|css|js)$/)
    ) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cache but also update in background
                    fetch(request).then((response) => {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, response);
                        });
                    }).catch(() => {});
                    return cachedResponse;
                }
                return fetch(request).then((response) => {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                });
            })
        );
        return;
    }
});
