
//1.Inicio del proyecto y respuesta offline basica
/*
self.addEventListener('fetch', event=>{

	const offlineResp=new Response(`
         Bienvenido a nuestra aplicación web,
         lo sentimos pero no cuentas con servicio
         de internet y para el correcto funcionamiento 
         necesitamos de internet

		`);
	const resp= fetch(event.request)
	            .catch(()=> offlineResp);
	event.respondWith(resp);
});

*/

//2. respuesta oflline HTML String
  // 2 a

  /*
self.addEventListener('fetch', event=>{

	const offlineResp=new Response(`
         <!DOCTYPE html>
			<html lang="en">
			<head>
			    <meta charset="UTF-8">
			    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			    <meta http-equiv="X-UA-Compatible" content="ie=edge">
			    <title>Mi PWA</title>

			    </head>
			<body class="container p-3">
			<h1> Trabajando en modo offline</h1>
			</body>
			</html>
		`,{
			headers:{
				'Content-Type':'text/html'
			}
		});
	const resp= fetch(event.request)
	            .catch(()=> offlineResp);
	event.respondWith(resp);
});
*/

// 2b estrategias del cache

 
self.addEventListener('fetch', event=>{

	const offlineResp= fetch('pages/offline.html');
	const resp= fetch(event.request)
	            .catch(()=> offlineResp);
	event.respondWith(resp);
});

