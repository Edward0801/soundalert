

//3 3.	Guardar el APP SHELL a la hora de instalar el SW 


const CACHE_STATIC_NAME='static-v1';
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
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      ]);
});

   e.waitUntil(Promise.all([cacheProm,cacheInmutable]));

});

//4. estrategia cache only
/*
self.addEventListener('fetch', e=>{
	e.respondWith(caches.match(e.request));
});

*/



//5. estrategia cache with network fallback
 /*
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
        
     });
  });

  e.respondWith(respuesta);
});

*/



//6. Estrategia network with cache fallback
 
self.addEventListener('fetch', e=>{
  const respuesta=fetch(e.request).then(res=>{
       if(!res)return caches.match(e.request);//se pregunta en caso que no se tenga acceso a la web, entonces buscar en la cache
       
       caches.open(CACHE_DYNAMIC_NAME)
        .then(cache=>{
           cache.put(e.request,res);
           limpiarCache(CACHE_DYNAMIC_NAME,5);
        });
        return resp.clone();
        
     }).catch(err=>{
       return caches.match(e.request);
     
     
  });

  e.respondWith(respuesta);
});


/*
//7. Estrategia cache with network update
 
self.addEventListener('fetch', e=>{
  
if(e.request.url.includes('bootstrap')){
  return e.respondWith(caches.match(e.request));
}
  const respuesta=caches.open(CACHE_DYNAMIC_NAME).then(cache=>{
       fetch(e.request).then(newRes=>
          cache.put(e.request,newRes));
       return caches.match(e.request);
       
  });

  e.respondWith(respuesta);
});
*/
/*
//8. Estrategia cache and network race
 
self.addEventListener('fetch', e=>{
  
const respuesta=new Promise((resolve,reject)=>{
   let rechazada=false;
   const falloUnaVez=()=>{
      if (rechazada){//si entra aca es porque no hubo respuesta ni del fetch ni de la cache
          if(/\.(png|jpg)$/i.test(e.request.url)){
             resolve(caches.match('img/main-patas-arriba.jpg'));
          }else{
            reject('no se encontró respuesta');
          }

      }else{
        rechazada=true;
       }
   };

   fetch(e.request).then(res=>{
      res.ok? resolve(res): falloUnaVez();//:

   }).catch(falloUnaVez) ;
   caches.match(e.request).then(res=>{
     res ? resolve(res):falloUnaVez();

   }).catch(falloUnaVez);

});

  e.respondWith(respuesta);
});

*/

