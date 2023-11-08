# Comisión 55610 - Programación Backend en CoderHouse

## Alumno: Emiliano Rodriguez

### Descripción

Este repositorio contiene los trabajos prácticos realizados para la cursada de la comisión 55610 de la carrera de Programación Backend en CoderHouse.
Cada nuevo desafío se encuentra en una rama diferente, y se puede acceder a los mismos desde el menú desplegable de la parte superior izquierda de la pantalla. El primer desafío se encuentra en la rama master.

### Contenido

- [Desafío 1] - Clases ECMAScript y ECMAScript avanzado. Fecha de entrega: 26/10/2023
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

- [Desafío 3] - Servidor con Express. Fecha de entrega: 08/11/2023.

El archivo "productList.json" contiene 10 productos utilizados para el funcionamiento del servidor. El mismo se encuentra en la carpeta "./src/data". Se trabajó con ES Modules.
