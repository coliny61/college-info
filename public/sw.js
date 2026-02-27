// Service worker for PWA install support
// Minimal — just enough to make the app installable

const CACHE_NAME = 'college-info-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Network-first strategy — always try network, fall back to cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
})
