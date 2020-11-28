console.log ("Estamos desde el service worker.....");

/*
fetch('homepage-2.html')
  .then(response => response.json())
  .then(data => console.log(data));
*/

/*
self.addEventListener("fetch", event=> {
     console.log(event);
});
*/

/*
self.addEventListener("fetch", event=> {
     console.log(event.request.url);
});
*/

/*
self.addEventListener("fetch", event=> {
     console.log(event.request.url.includes("css"));
});
*/

/*
self.addEventListener("fetch", event=> {
     if (event.request.url.includes("jpg")){
	     console.log(event.request.url)

     }
});
*/

/*
self.addEventListener("fetch", event=> {
     if (event.request.url.includes("jpg")){
	     event.respondWith(null);
     }else{
	     event.respondWith(fetch(event.request));
     }
});
*/

/*
self.addEventListener('fetch', event=> {

     if (event.request.url.includes("main.jpg")){
     	let imagenreq=fetch('img/main-patas-arriba.jpg');
	     event.respondWith(imagenreq);
     }else{
	     event.respondWith(fetch(event.request));
     }
});


/*
self.addEventListener('fetch', event=> {

     if (event.request.url.includes("jpg")){
     	let imagenreq=fetch(event.request.url);
	     event.respondWith(imagenreq);
     }else{
	     event.respondWith(fetch(event.request));
     }
});
*/

/*
self.addEventListener('fetch', event=> {

     if (event.request.url.includes("jpg")){
     	let imagenreq=fetch(event.request);
	     event.respondWith(imagenreq);
     }else{
	     event.respondWith(fetch(event.request));
     }
});
*/

/*
self.addEventListener('fetch', event=> {

     if (event.request.url.includes("jpg")){
     	let imagenreq=fetch(event.request);
	     event.respondWith(imagenreq);
     }else{
	     event.respondWith(fetch(event.request));
     }
});
*/

/*
self.addEventListener('fetch', event=> {

    if (event.request.url.includes("style.css")){
        event.respondWith(null);
    }else{
        event.respondWith(fetch(event.request));
    }
});
*/



