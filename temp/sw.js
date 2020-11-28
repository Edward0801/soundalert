

const CACHE_STATIC_NAME='static-v8';
const CACHE_DYNAMIC_NAME='dynamic-v1';
const CACHE_INMUTABLE_NAME='inmutable-v1';
const CACHE_DYNAMIC_LIMIT=50;

function limpiarCache(cacheName,numeroItems){
  caches.open(cacheName)
  .then(cache=>{
    return cache.keys()
        .then(keys=>{
          console.log(keys);
          if(keys.lenght>numeroItems){
            cache.delete(keys[0])
               .then(limpiarCache(cacheName,numeroItems))
          }
        })
  })
}

self.addEventListener('install', e=>{

	const cacheProm= caches.open(CACHE_STATIC_NAME)
         .then(cache=>{
        return cache.addAll([
            '/',
            '/111.html',
            '/pages/index.html',
            '/pages/offline.html',

            '/assets/img/main.jpg',
            '/assets/img/CAR-CUNDINAMARCA.png',
            '/assets/img/Carcun.png',
            '/assets/img/decibeles.jpeg',
            '/assets/img/escudo-ministerio.png',
            '/assets/img/face1.jpeg',
            '/assets/img/face2.jpeg',
            '/assets/img/facebook.png',
            '/assets/img/intro-bg.jpg',
            '/assets/img/intro-img.svg',
            '/assets/img/logo.png',
            '/assets/img/logo-car.png',
            '/assets/img/logo-twitter.png',
            '/assets/img/que.png',
            '/assets/img/quienes.png',
            '/assets/img/main-patas-arriba.jpg',

            '/assets/img/Fotos_Carrucel/imagen1.png',
            '/assets/img/Fotos_Carrucel/imagen2.png',
            '/assets/img/Fotos_Carrucel/imagen3.png',
            '/assets/img/Fotos_Carrucel/imagen4.png',
            '/assets/img/Fotos_Carrucel/imagen5.png',
            '/assets/img/Fotos_Carrucel/imagen6.png',

            '/assets/js/app.js',

            '/assets/vendor/bootstrap/css/bootstrap.css',
            '/assets/vendor/bootstrap/css/bootstrap-grid.css',
            '/assets/vendor/bootstrap/css/bootstrap-reboot.css',

            '/assets/vendor/bootstrap/js/bootstrap.bundle.js',
            '/assets/vendor/bootstrap/js/bootstrap.js',

            '/assets/css/style.css',
            '/assets/css/style-22.css'
    	]);
});

   const cacheInmutable= caches.open(CACHE_INMUTABLE_NAME)
         .then(cache=>{
          return cache.addAll([
          'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
      ]);
});

   e.waitUntil(Promise.all([cacheProm,cacheInmutable]));

});

self.addEventListener('activate', e=>{
    
   const respuesta= caches.keys().then(keys=>{
      keys.forEach(key=>{
        if(key!==CACHE_STATIC_NAME&& key.includes('static')){
          return caches.delete(key);
        }
      });
    });
    e.waitUntil(respuesta);
});



// estrategia cache with network fallback
 
self.addEventListener('fetch', e=>{
  const respuesta=caches.match(e.request)
  .then(res=>{
     if(res)return res;
     //si no existe el archivo entonces debo ir a la web
     //console.log('no existe', e.request.url);
     
     return fetch(e.request).then(newResp=>{
       caches.open(CACHE_DYNAMIC_NAME)
        .then(cache=>{
           cache.put(e.request,newResp);
           limpiarCache(CACHE_DYNAMIC_NAME,CACHE_DYNAMIC_LIMIT);
        });
        return newResp.clone();
        
     })
     .catch(err=>{
        if(e.request.headers.get('accept').includes('text/html')){
           return caches.match('/pages/offline.html');
        }
  });
     });

  e.respondWith(respuesta);
});

