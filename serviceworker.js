importScripts("scripts/jsonUtils.js")

self.addEventListener("install", event => {
    console.log("Installing...")
});

self.addEventListener("activate", event => {
    console.log("Activating...")
});

self.addEventListener("fetch", event => {
    const parsedUrl = new URL(event.request.url);

    // navigator.onLine
    // might have to clone request and response

    if(parsedUrl.pathname.endsWith(".js") || parsedUrl.pathname.endsWith(".css") ||
       parsedUrl.pathname.endsWith(".jpg") || parsedUrl.pathname.endsWith(".jpeg") || parsedUrl.pathname.endsWith(".svg"))
        return;

    if(parsedUrl.pathname.match(/^\/cost*/)) {
        event.respondWith(
            fetch("/data/expenses.json")
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    return new Response(`$${calcCost(data)}`)
                })
        )
    }
    else if(parsedUrl.pathname.match(/^\/data|pages*/)) {
        return;
    }
    else if(parsedUrl.pathname !== "/")
        event.respondWith(fetch("/"))

})