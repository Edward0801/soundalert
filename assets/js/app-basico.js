

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

//2b
if (window.caches){

	caches.open('prueba-1');
	caches.open('prueba-2');
	//para preguntar si una cache existe
	//caches.has('prueba-2').then(console.log);
    //para borrar cache
    //caches.delete('prueba-1').then(console.log)

    caches.open('cache-v1.1').then(cache=>{
      // agregar individual en la cache	
    	//cache.add('/111.html');
     //agregar en bloque en la cache
    	/*
    	cache.addAll([
          '/111.html',
          '/css/style.css',
          '/img/main.jpg'
    	]);
    	*/

    	//agregar en bloque en la cache y eliminar un archivo especifico en el mismo momento de la cache
    	/*
    	cache.addAll([
          '/111.html',
          '/css/style.css',
          '/img/main.jpg'
    	]).then (()=>{
	       //cache.delete('/css/style.css')
	       //para reemplazar algun archivo de la cache
    	   //cache.put('111.html', new Response('Archivo reemplazado'));
    	});
        */

    	//para devolver todos los caches
    	/*
    	caches.keys().then(keys=>{
    		console.log(keys);
    	})
    	*/
    });
}