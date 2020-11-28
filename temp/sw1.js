//3 3.	Guardar el APP SHELL a la hora de instalar el SW

const CACHE_NAME='cache-1';
self.addEventListener('install', e=>{

	const cacheProm= caches.open('CACHE_NAME')
        .then(cache=>{
            return cache.addAll([
                '/',
                '/111.html',
                '/assets/css/style.css',
                '/assets/css/style-22.css',
                '/assets/img/main.jpg',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/assets/js/app.js',
                '/pages/index.html'
    	]);
});
         e.waitUntil(cacheProm);

});

//4. estrategia cache only
/*
self.addEventListener('fetch', e=>{
	e.respondWith(caches.match(e.request));
});
*/




//5. estrategia cache with network fallback

self.addEventListener('fetch', e=>{
    const respuesta=caches.match(e.request)
        .then(res=>{
            if(res)return res;
            //si no existe el archivo entonces debo ir a la web
            //console.log('no existe', e.request.url);
     
            return fetch(e.request).then(newResp=>{
                //aqui trae archivo de la web pero no la guarda
                //return newResp;
                //aqui trae archivos de la web y los guarda en el cache
                caches.open(CACHE_NAME)
                    .then(cache=>{
                        cache.put(e.request,newResp);
                    });
                return newResp.clone();
        
            });
        });

    e.respondWith(respuesta);

});
