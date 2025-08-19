// sw.js — Monaco CRM (v4)
const CACHE = "monaco-crm-v4";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./supabaseClient.js",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(STATIC_ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isApi = (url) =>
  url.pathname.startsWith("/api/") || url.hostname.endsWith("googleapis.com");

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET") return;

  if (isApi(url)) {
    // network-first para API
    event.respondWith((async () => {
      try { return await fetch(req); }
      catch {
        const cache = await caches.open(CACHE);
        return (await cache.match(req)) || new Response("{}", { status: 503 });
      }
    })());
  } else {
    // cache-first para estáticos
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      const fresh = await fetch(req);
      if (fresh.ok && url.origin === location.origin) cache.put(req, fresh.clone());
      return fresh;
    })());
  }
});
