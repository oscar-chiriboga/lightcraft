// LightCraft PWA shell cache only. WASM, photos, and worker scripts remain network-managed.
// Keeping runtime artifacts out of Cache Storage prevents large, stale binaries and quota failures.
const CACHE = "lightcraft-mobile-shell-v1";
const SHELL = ["./", "./manifest.webmanifest", "./mobile-icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("lightcraft-mobile-shell-") && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || event.request.mode !== "navigate") return;
  event.respondWith(fetch(event.request).catch(() => caches.match("./").then(cached => cached || Response.error())));
});
