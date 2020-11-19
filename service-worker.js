importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: "/icon.png", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/lapangan.jpg", revision: "1" },
  { url: "/Logo.png", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/team.html", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
]);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  new RegExp("/js/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "js",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "material-icons",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "material-icons-font",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-api",
  })
);

workbox.routing.registerRoute(
  new RegExp("/team.html"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "team-details",
  })
);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
  workbox.strategies.cacheFirst({
    cacheName: "img-all",
  })
);

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  const options = {
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
