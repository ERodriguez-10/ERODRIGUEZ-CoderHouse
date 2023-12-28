# Comisión 55610 - Programación Backend en CoderHouse

## Alumno: Emiliano Rodriguez

### Descripción

Este repositorio contiene los trabajos prácticos realizados para la cursada de la comisión 55610 de la carrera de Programación Backend en CoderHouse.
Cada nuevo desafío se encuentra en una rama diferente, y se puede acceder a los mismos desde el menú desplegable de la parte superior izquierda de la pantalla. El primer desafío se encuentra en la rama master.

### Contenido

- [Desafío 1] - Clases ECMAScript y ECMAScript avanzado. Fecha de entrega: 26/10/2023

##

- [Desafío 2] - Manejo de archivos. Fecha de entrega: 02/11/2023.

Al llamar al constructor de ProductManager se guarda en memoria la información del archivo si es que este existe. Esto se hizo para no realizar multiples lecturas al mismo y afectar la performance. En caso de no existir el archivo, se inicializa vacio. Además se utilizó fs.promises.

El resultado final de 'products.json' según los tests existentes debería ser:

`[
	{
		"title": "producto prueba 2",
		"description": "Este es un producto prueba para la generacion de ID",
		"price": 600,
		"thumbnail": "Sin imagen",
		"code": "16712HD",
		"stock": 25,
		"id": 2
	}
]`

##

- [Desafío 3] - Servidor con Express. Fecha de entrega: 08/11/2023.

El archivo "productList.json" contiene 10 productos utilizados para el funcionamiento del servidor. El mismo se encuentra en la carpeta "./src/data". Se trabajó con ES Modules.

##

- [PRE-ENTREGA 1] - Primera pre entrega. Fecha de entrega: 16/11/2023.

El archivo "productList.json" contiene productos utilizados para el funcionamiento del servidor. Mientras que "cartList.json" contiene los productos agregados al carrito, este comienza con dos carritos ya creados. Se trabajó con ES Modules.

API E-Commerce v1.0.0

Endpoints de productos:

- GET /api/products/ => devuelve todos los productos.
- GET /api/products?limit=4 => devuelve los primeros 4 productos.
- GET /api/products/:id => devuelve un producto según su id.
- POST /api/products/ => agrega un producto al listado.
- PUT /api/products/:id => actualiza un producto según su id.
- DELETE /api/products/:id => elimina un producto según su id.

Endpoints de carrito:

- GET /api/carts/:id => devuelve un carrito según su id.
- POST /api/carts/ => agrega un carrito con productos al listado.
- POST /api/carts/:id/product/:idProd => agrega un producto al carrito según su id.

TODO 16/11/2023: Validaciones a la hora de agregar productos al carrito.

##

- [Desafío 4] - WebSockets + Handlebars. Fecha de entrega: 28/11/2023.

Se añadieron los siguientes paquetes:

- express-handlebars
- socket.io
- @picocss/pico -> Minimal framework CSS

Se añadieron los siguientes endpoints:

- GET / => renderiza el index.handlebars donde se encuentran todos los productos.
- GET /realtimeproducts => renderiza el realTimeProducts.handlebars realizando una conexión a través de WebSockets.

##

- [Desafío 5] - Persistencia de datos con MongoDB + Chat. Fecha de entrega: 14/12/2023.

IMPORTANTE: Se incluyó el archivo .env para ejecutar el servidor, el mismo contiene las variables de entorno necesarias para la conexión a la base de datos. Se utilizó MongoDB Atlas. El archivo .env no se encuentra en el repositorio de GitHub por seguridad.
Archivo de ejemplo: .env.example

Se agregó la vista "chat.handlebars" donde se encuentra el chat. Se utilizó el paquete socket.io para la comunicación en tiempo real.

Se modificó la estructura de archivos para que sea más escalable. Nuevos directorios agregados:

- src/dao
- src/dao/filesystem
- src/dao/mongo
- src/models

Se agregaron los siguientes endpoints:

- GET /api/messages/ => devuelve todos los mensajes.
- POST /api/messages/ => agrega un mensaje al listado.

Producto de ejemplo para agregar:

`{
	"title": "Harry Potter and the Goblet of Fire",
	"description": "The fourth novel in the Harry Potter series. It follows Harry Potter, a wizard in his fourth year at Hogwarts School of Witchcraft and Wizardry.",
	"price": 19.99,
	"thumbnail": "https://picsum.photos/id/1/300/300",
	"category": "Fiction",
	"code": "HP004",
	"status": true,
	"stock": 100
}`

- [PRE-ENTREGA 2] - Mongo Avanzado (Parte II). Fecha de entrega: 27/12/2023.
