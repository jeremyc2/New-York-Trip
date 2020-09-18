importScripts("scripts/jsonUtils.js")

const path = (new URL(self.registration.scope)).pathname

var cacheName = "NYC-V1.0";
const cachefiles = [];

self.addEventListener("install", event => {
    console.log("Installing...")

    self.skipWaiting();
    
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cachefiles);
        })
    );

});
 
self.addEventListener("activate", event => {
    console.log("Activating...")

    clients.claim();

});

self.addEventListener("fetch", event => {
    const parsedUrl = new URL(event.request.url);
    
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//     );

    // navigator.onLine
    // might have to clone request and response

    if(parsedUrl.pathname.endsWith(".js") || parsedUrl.pathname.endsWith(".css") ||
       parsedUrl.pathname.endsWith(".jpg") || parsedUrl.pathname.endsWith(".jpeg") || parsedUrl.pathname.endsWith(".svg"))
        return;

    if(parsedUrl.pathname.match(new RegExp(`^${path}cost*`))) {
        event.respondWith(
            fetch(path + "data/expenses.json")
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    return new Response(`$${calcCost(data)}`)
                })
        )
    }
    else if(parsedUrl.pathname.match(new RegExp(`^${path}data|activities*`))) {
        return;
    }
    else if(parsedUrl.pathname !== path)
        event.respondWith(fetch(path))

})
