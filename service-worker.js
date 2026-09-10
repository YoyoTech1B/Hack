"use strict";

/* =====================================================
   CYBERLAB
   SERVICE WORKER
===================================================== */

const CACHE_NAME = "CYBERLAB-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./favicon.png"
];


/* =====================================================
   INSTALL
===================================================== */

self.addEventListener("install", event => {

    console.log("[CYBERLAB] Installing service worker...");

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                console.log(
                    "[CYBERLAB] Caching application files..."
                );

                return cache.addAll(FILES_TO_CACHE);

            })

            .then(() => {

                return self.skipWaiting();

            })

    );

});


/* =====================================================
   ACTIVATE
===================================================== */

self.addEventListener("activate", event => {

    console.log("[CYBERLAB] Service worker activated.");

    event.waitUntil(

        caches.keys()

            .then(cacheNames => {

                return Promise.all(

                    cacheNames

                        .filter(
                            cacheName =>
                                cacheName !== CACHE_NAME
                        )

                        .map(
                            cacheName =>
                                caches.delete(cacheName)
                        )

                );

            })

            .then(() => {

                return self.clients.claim();

            })

    );

});


/* =====================================================
   FETCH
===================================================== */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {

        return;

    }


    event.respondWith(

        caches.match(event.request)

            .then(cachedResponse => {

                if (cachedResponse) {

                    return cachedResponse;

                }


                return fetch(event.request)

                    .then(networkResponse => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type !== "basic"
                        ) {

                            return networkResponse;

                        }


                        const responseClone =
                            networkResponse.clone();


                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(
                                    event.request,
                                    responseClone
                                );

                            });


                        return networkResponse;

                    })

                    .catch(() => {

                        return caches.match(
                            "./index.html"
                        );

                    });

            })

    );

});


/* =====================================================
   MESSAGE HANDLER
===================================================== */

self.addEventListener("message", event => {

    if (!event.data) {

        return;

    }


    if (event.data.type === "SKIP_WAITING") {

        self.skipWaiting();

    }

});
