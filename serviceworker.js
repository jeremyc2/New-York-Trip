importScripts("scripts/jsonUtils.js");

const path = (new URL(self.registration.scope)).pathname;

var cacheName = "NYC-V1.0";
const cachefiles = [
    path, 
    path + "cost", 
    path + "images/boringstuff3.jpg", 
    path + "images/down-arrow.svg", 
    path + "images/icons8-new-york-40.png", 
    path + "images/photodate.jpg", 
    path + "images/screen_2x.jpg", 
    path + "images/sightseeing-unsplash%20compressed.jpg", 
    path + "images/william-wachter-HLNLtyon-xg-unsplash%20compressed.jpg", 
    path + "scripts/app.js", 
    path + "styles/keyframes.css", 
    path + "styles/main-mobile.css", 
    path + "styles/main.css", 
    path + "styles/secondSlide.css", 
    "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js", 
    "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js", 
    "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js", 
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js", 
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap", 
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/CSSRulePlugin3.min.js"
]

self.addEventListener("install", event => {
    console.log("Installing...");

    self.skipWaiting();
    
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cachefiles);
        })
    );

});
 
self.addEventListener("activate", event => {
    console.log("Activating...");

    clients.claim();

});

self.addEventListener("fetch", event => {
    const parsedUrl = new URL(event.request.url);

    // navigator.onLine
    // might have to clone request and response

    if(parsedUrl.pathname.endsWith(".js") || parsedUrl.pathname.endsWith(".css") ||
       parsedUrl.pathname.endsWith(".jpg") || parsedUrl.pathname.endsWith(".jpeg") || parsedUrl.pathname.endsWith(".svg")) {
           event.respondWith(
                caches.match(event.request).then(function(response) {
                    return response || fetch(event.request);
                })
           );
    }
    else if(parsedUrl.pathname.match(new RegExp(`^${path}cost*`))) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(path + "data/expenses.json")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        return new Response(`$${calcCost(data)}`);
                    });
            })
        );
    }
    else if(parsedUrl.pathname.match(new RegExp(`^${path}data|activities*`))) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
    else {
        event.respondWith(
            caches.match(path).then(function(response) {
                return response || fetch(path);
            })
        );
    }

});
