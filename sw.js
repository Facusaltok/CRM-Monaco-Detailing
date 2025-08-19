// sw.js — SW mínimo para evitar errores/warnings
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', () => { /* passthrough */ });
