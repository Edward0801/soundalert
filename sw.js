importScripts('assets/js/libs/sw-utils.js');

const DYNAMIC_CACHE='dynamic-v1';
const INMUTABLE_CACHE='inmutable-v1';
const STATIC_CACHE='static-v1';

const APP_SHELL=[
    '/',
    'index.html',
    'pages/offline.html',

    'assets/img/main.jpg',
    'assets/img/min.png',
    'assets/img/CAR-CUNDINAMARCA.png',
    'assets/img/Carcun.png',
    'assets/img/decibeles.jpeg',
    'assets/img/escudo-ministerio.png',
    'assets/img/face1.jpeg',
    'assets/img/face2.jpeg',
    'assets/img/facebook.png',
    'assets/img/intro-bg.jpg',
    'assets/img/intro-img.svg',
    'assets/img/logo.png',
    'assets/img/logo-car.png',
    'assets/img/logo-twitter.png',
    'assets/img/que.png',
    'assets/img/quienes.png',
    'assets/img/main-patas-arriba.jpg',

    'assets/img/Fotos_Carrucel/imagen1.png',
    'assets/img/Fotos_Carrucel/imagen2.png',
    'assets/img/Fotos_Carrucel/imagen3.png',
    'assets/img/Fotos_Carrucel/imagen4.png',
    'assets/img/Fotos_Carrucel/imagen5.png',
    'assets/img/Fotos_Carrucel/imagen6.png',

    'assets/js/app.js',
    'assets/js/libs/sw-utils.js',

    'assets/vendor/bootstrap/css/bootstrap.css',
    'assets/vendor/bootstrap/css/bootstrap-grid.css',
    'assets/vendor/bootstrap/css/bootstrap-reboot.css',

    'assets/vendor/bootstrap/js/bootstrap.bundle.js',
    'assets/vendor/bootstrap/js/bootstrap.js',

    'assets/css/style.css',
    'assets/css/style-22.css'
];

const APP_SHELL_INMUTABLE=[
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'assets/css/animate.css',
    'assets/js/libs/jquery.js',
    'manifest.json'
];
self.addEventListener('install', e=>{

    const cacheStatic=caches.open(STATIC_CACHE).then(cache=>
        cache.addAll(APP_SHELL));

    const cacheInmutable=caches.open(INMUTABLE_CACHE).then(cache=>
        cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheStatic , cacheInmutable]));

});

self.addEventListener('activate', e=>{

    const respuesta= caches.keys().then(keys=>{
        keys.forEach(key=>{
            if(key!== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(respuesta);
});


self.addEventListener('fetch', e=>{
    const respuesta= caches.match(e.request).then(res=>{
        if (res){
            return res;
        }else{
            return fetch(e.request).then(newRes=>{
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }
    });
    e.respondWith(respuesta);
});


