// sw.js
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => self.clients.claim());
// sin handler de 'fetch' para evitar warning "no-op fetch handler"
