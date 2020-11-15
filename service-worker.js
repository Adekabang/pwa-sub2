const CACHE_NAME = "firstpwa-v223";
var urlsToCache = [
  "/",
  "/icon.png",
  "/index.html",
  "/lapangan.jpg",
  "/Logo.png",
  "/manifest.json",
  "/nav.html",
  "/team.html",
  "/pages/contact.html",
  "/pages/home.html",
  "/pages/team.html",
  "/pages/teams.html",
  "/css/materialize.min.css",
  "/js/api.js",
  "/js/materialize.min.js",
  "/js/script.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());

          console.log("ServiceWorker: Gunakan aset dari server: ", response.url);

          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request,{ ignoreSearch: true }).then(function (response) {
        console.log(
          "ServiceWorker: Memuat aset dari cache: ",
          event.request.url
        );
        return response || fetch(event.request);
      })
    );
  }
});
