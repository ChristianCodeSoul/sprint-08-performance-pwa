const CACHE_NAME = "sprint8-static-v2";
const API_CACHE_NAME = "sprint8-api-v2";

const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.webmanifest",
]; 

self.addEventListener("install", (event) => {
    event.waitUntil( 
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames 
                .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
                .map((name) => caches.delete(name))
                );
            })
        );
        self.clients.claim();
    });

    self.addEventListener("fetch", (event) =>  {
        const request = event.request;

        if(request.method !== "GET") {
            return;
        }

        const url = new URL(request.url );

        if (url.origin === self.location.origin) {
            event.respondWith(cacheFirst(request));
            return;
        }

        if (
            url.hostname === "dummyjson.com" && 
            url.pathname.startsWith("/products")
        ) {
            event.respondWith(networkFirst(request));
        }
    });
    
    async function cacheFirst(request) {
        const cachedResponse  = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const  networkResponse = await fetch(request);
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
            return networkResponse;

        } catch {
            if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
                const appShell = await caches.match("/index.html");
                if (appShell) {
                    return appShell;
                }
            }
            return new Response("Offline and this resource is not cached.", {
                    status: 503,
                    headers: {"Content-Type": "text/plain" },
                });
            }
        }
        
        async function networkFirst(request) {
            try {
                const networkResponse = await fetch(request);
                const cache = await caches.open(API_CACHE_NAME);
                await cache.put(request, networkResponse.clone());
                return networkResponse;
            
            } catch {
                const cachedResponse = await caches.match( request,);
                if (cachedResponse) {
                    return cachedResponse;
                }
                return new Response (
                    JSON.stringify({
                        error: "Offline and no cached API response is available.",
                    }),
                    
                    {
                        status: 503,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        }
