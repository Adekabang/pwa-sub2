const CACHE_NAME = "firstpwa-v63463";
const urlsToCache = [
  "/",
  "/icon.png",
  "/index.html",
  "/lapangan.jpg",
  "/Logo.png",
  "/manifest.json",
  "/nav.html",
  "/team.html",
  "/pages/favorite.html",
  "/pages/home.html",
  "/pages/team.html",
  "/pages/teams.html",
  "/css/materialize.min.css",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/materialize.min.js",
  "/js/script.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
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

self.addEventListener("fetch", (event) => {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());

          // console.log("ServiceWorker: Gunakan aset dari server: ", response.url);

          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          // console.log(
          //   "ServiceWorker: Memuat aset dari cache: ",
          //   event.request.url
          // );
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener("push", (event) => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
