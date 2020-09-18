importScripts("scripts/jsonUtils.js")

const path = (new URL(self.registration.scope)).pathname

self.addEventListener("install", event => {
    console.log("Installing...")

    self.skipWaiting();

});
 
self.addEventListener("activate", event => {
    console.log("Activating...")

    clients.claim();

});

self.addEventListener("fetch", event => {
    const parsedUrl = new URL(event.request.url);

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