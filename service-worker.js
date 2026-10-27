const CACHE_NAME = 'zen-aura-shell-v1';
const APP_SHELL = ["./","./index.html","./manifest.webmanifest","./zen-aura-logo.png","./pwa-icons/icon-192.png","./pwa-icons/icon-512.png","./sequence-frames/frame_000001.webp","./sequence-frames/frame_000002.webp","./sequence-frames/frame_000003.webp","./sequence-frames/frame_000004.webp","./sequence-frames/frame_000005.webp","./sequence-frames/frame_000006.webp","./sequence-frames/frame_000007.webp","./sequence-frames/frame_000008.webp","./sequence-frames/frame_000009.webp","./sequence-frames/frame_000010.webp","./sequence-frames/frame_000011.webp","./sequence-frames/frame_000012.webp","./sequence-frames/frame_000013.webp","./sequence-frames/frame_000014.webp","./sequence-frames/frame_000015.webp","./sequence-frames/frame_000016.webp","./sequence-frames/frame_000017.webp","./sequence-frames/frame_000018.webp","./sequence-frames/frame_000019.webp","./sequence-frames/frame_000020.webp","./sequence-frames/frame_000021.webp","./sequence-frames/frame_000022.webp","./sequence-frames/frame_000023.webp","./sequence-frames/frame_000024.webp","./sequence-frames/frame_000025.webp","./sequence-frames/frame_000026.webp","./sequence-frames/frame_000027.webp","./sequence-frames/frame_000028.webp","./sequence-frames/frame_000029.webp","./sequence-frames/frame_000030.webp","./sequence-frames/frame_000031.webp","./sequence-frames/frame_000032.webp","./sequence-frames/frame_000033.webp","./sequence-frames/frame_000034.webp","./sequence-frames/frame_000035.webp","./sequence-frames/frame_000036.webp","./sequence-frames/frame_000037.webp","./sequence-frames/frame_000038.webp","./sequence-frames/frame_000039.webp","./sequence-frames/frame_000040.webp","./sequence-frames/frame_000041.webp","./sequence-frames/frame_000042.webp","./sequence-frames/frame_000043.webp","./sequence-frames/frame_000044.webp","./sequence-frames/frame_000045.webp","./sequence-frames/frame_000046.webp","./sequence-frames/frame_000047.webp","./sequence-frames/frame_000048.webp","./sequence-frames/frame_000049.webp","./sequence-frames/frame_000050.webp","./sequence-frames/frame_000051.webp","./sequence-frames/frame_000052.webp","./sequence-frames/frame_000053.webp","./sequence-frames/frame_000054.webp","./sequence-frames/frame_000055.webp","./sequence-frames/frame_000056.webp","./sequence-frames/frame_000057.webp","./sequence-frames/frame_000058.webp","./sequence-frames/frame_000059.webp","./sequence-frames/frame_000060.webp","./sequence-frames/frame_000061.webp","./sequence-frames/frame_000062.webp","./sequence-frames/frame_000063.webp","./sequence-frames/frame_000064.webp","./sequence-frames/frame_000065.webp","./sequence-frames/frame_000066.webp","./sequence-frames/frame_000067.webp","./sequence-frames/frame_000068.webp","./sequence-frames/frame_000069.webp","./sequence-frames/frame_000070.webp","./sequence-frames/frame_000071.webp","./sequence-frames/frame_000072.webp","./sequence-frames/frame_000073.webp","./sequence-frames/frame_000074.webp","./sequence-frames/frame_000075.webp","./sequence-frames/frame_000076.webp","./sequence-frames/frame_000077.webp","./sequence-frames/frame_000078.webp","./sequence-frames/frame_000079.webp","./sequence-frames/frame_000080.webp","./sequence-frames/frame_000081.webp","./sequence-frames/frame_000082.webp","./sequence-frames/frame_000083.webp","./sequence-frames/frame_000084.webp"];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (let i = 0; i < APP_SHELL.length; i += 12) {
      await cache.addAll(APP_SHELL.slice(i, i + 12));
    }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('zen-aura-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try { return await fetch(request); }
    catch (error) {
      if (request.mode === 'navigate') return (await caches.match('./index.html')) || Response.error();
      return Response.error();
    }
  })());
});
