const cache_name="static_cache"

const Staticassets=['index.html','resources','stylesheet.css']
async function preCache(){
const cache = await caches.open(cache_name)
return cache.addAll(Staticassets);
}

self.addEventListener('install',event=>{
    console.log("sw installed");
    event.waitunitil(preCache())
})

self.addEventListener('activate',event=>{
    console.log("sw activated")
})

async function fetchAssets(event){
    try{
        const response = await fetch(event.request)
        return response;
    }
    catch(error)
    {
        const cache=await caches.open(cache_name)
        return cache.match(event.request)
    }
}
self.addEventListener('fetch',event=>{
    console.log("sw fetched")
    event.respondWith(fetchAssets(event))
})