// sw.js — Monaco CRM (v4)
const CACHE = "monaco-crm-v4"; // ⬅️ bump de versión (antes v3)
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./supabaseClient.js",
  "./manifest.webmanifest",
  // agrega aquí cualquier otro archivo estático que quieras cachear
];

// Estrategia: 
// - Rutas API => network-first (no cacheamos peticiones dinámicas)
// - Estáticos => cache-first (rápidos y offline)

self.addEventListener("install", (event) => {
  // toma control lo antes posible
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // limpia caches viejos
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== CACHE)
          .map((k) => caches.delete(k))
      );
      // controla todas las pestañas abiertas
      await self.clients.claim();
    })()
  );
});

// helper: detectar si es una URL de API (no conviene cachearla)
const isApi = (url) =>
  url.pathname.startsWith("/api/") ||
  url.hostname.endsWith("googleapis.com");

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // No cacheamos peticiones con método diferente a GET
  if (req.method !== "GET") return;

  if (isApi(url)) {
    // Network-first para API
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          return fresh;
        } catch {
          const cache = await caches.open(CACHE);
          const cached = await cache.match(req);
          return cached || new Response("{}", { status: 503 });
        }
      })()
    );
  } else {
    // Cache-first para assets estáticos
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(req);
        if (cached) return cached;
        const fresh = await fetch(req);
        // solo cacheamos respuestas 200 OK y del mismo origen
        if (fresh.ok && url.origin === location.origin) {
          cache.put(req, fresh.clone());
        }
        return fresh;
      })()
    );
  }
});
