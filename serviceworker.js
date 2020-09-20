const path = (new URL(self.registration.scope)).pathname;

importScripts(path + "scripts/jsonUtils.js");

var cacheName = "NYC-V1.0";
const cachefiles = [
    path,
    path + "manifest.webmanifest",
    path + "activities/sightseeing",
    path + "activities/sightseeing.html",
    path + "fonts/montserrat-latin.woff2",
    path + "images/boringstuff3.jpg",
    path + "images/down-arrow.svg",
    path + "images/icons-40.png",
    path + "images/icons-192.png",
    path + "images/icons-512.png",
    path + "images/nyc-vectorstock.svg",
    path + "images/photodate.jpg",
    path + "images/screen_2x.jpg",
    path + "images/sightseeing-unsplash%20compressed.jpg",
    path + "images/william-wachter-HLNLtyon-xg-unsplash%20compressed.jpg",
    path + "scripts/CSSRulePlugin3.min.js",
    path + "scripts/ScrollMagic.min.js",
    path + "scripts/animation.gsap.min.js",
    path + "scripts/app.js",
    path + "scripts/debug.addIndicators.min.js",
    path + "scripts/gsap.min.js",
    path + "styles/keyframes.css",
    path + "styles/main-mobile.css",
    path + "styles/main.css",
    path + "styles/montserrat.css",
    path + "styles/secondSlide.css",
    path + "styles/sightseeing.css"
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

    // might have to clone request and response

    if(parsedUrl.pathname.endsWith(".js") || parsedUrl.pathname.endsWith(".css") || parsedUrl.pathname.endsWith(".jpg") ||
       parsedUrl.pathname.endsWith(".jpeg") || parsedUrl.pathname.endsWith(".svg") || parsedUrl.pathname.endsWith(".png") ||
       parsedUrl.pathname.endsWith(".woff2") || parsedUrl.pathname.endsWith(".webmanifest")) {
            if(parsedUrl.host == self.location.host) {
                event.respondWith(
                    caches.match(event.request).then(function(response) {
                        return response || fetch(event.request);
                    })
                );
           } else {
               return;
           }
    }
    else if(parsedUrl.pathname.match(new RegExp(`^${path}cost*`))) {
        if(navigator.onLine == false) {
            console.log("You are offline.");
            event.respondWith(new Response("Cannot Load Cost"))
        }
        else {
            event.respondWith(
                fetch(path + "data/expenses.json")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        return new Response(`$${calcCost(data)}`);
                    }).catch(error => {
                        console.log("Could not retrieve cost. Network error.");
                        return new Response("Network Error");
                    })
            );
        }
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
