/* Midnight 网速检测 — Service Worker
   策略:网络优先(network-first)。有网时总是拿最新页面,
   离线时才回退到缓存,保证更新能立即生效。 */
const CACHE = 'midnight-v4';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // 测速 / 跨域探测请求永远走网络,不缓存、不拦截
  if (url.origin !== location.origin) return;

  // 网络优先:成功就更新缓存并返回;失败(离线)再用缓存
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
