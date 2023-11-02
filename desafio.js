class ProductManager {
  constructor() {
    this.products = [];
    this.currentId = 0;
  }

  setIdProduct() {
    let idProduct = this.currentId + 1;
    this.currentId = idProduct;
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const productSelected = this.products.find((p) => p.id == id);

    productSelected
      ? console.log(productSelected)
      : console.log("[ERROR] Not found");
  }

  addProduct(product) {
    let error = false;
    Object.values(product).forEach((value) => {
      if (value == undefined || value == null) {
        return (error = true);
      }
    });

    if (error) {
      console.log("[ERROR] All fields are required");
    } else {
      const exist = this.products.find((p) => p.code == product.code);
      if (exist) {
        console.log("[ERROR] Product code already exist!");
      } else {
        this.setIdProduct();
        this.products.push({ ...product, id: this.currentId });
      }
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}

//TESTING

//Se creará una instancia de la clase "ProductManager"
const ProductManagerTest = new ProductManager();

//Se llamará "getProducts" recién creada la instancia, debe devolver un arreglo vacío
console.log("[TEST #1] getProducts: Array vacío al instanciarse la clase.");

ProductManagerTest.getProducts();

console.log(" ");

//Se llamará al método "addProduct" con los campos:
/*
title: "producto prueba"
description: "Este es un producto prueba"
price: 200,
thumbnail: "Sin imagen",
code: "abc123",
stock: 25
*/
console.log(
  "[TEST #2] addProduct: Crear un productos con los campos del test."
);

ProductManagerTest.addProduct(
  new Product(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
ProductManagerTest.addProduct(
  new Product(
    "producto prueba 2",
    "Este es un producto prueba para la generacion de ID",
    600,
    "Sin imagen",
    "16712HD",
    25
  )
);

//Se llamará el método "getProducts" nuevamente, esta vez debe aparecer el producto recién agregado
console.log(
  "[TEST #3] Los productos deben tener id generado automáticamente sin repetirse."
);
console.log(
  "[TEST #4] getProducts: Debe devolver los productos recién creados."
);

ProductManagerTest.getProducts();

console.log(" ");

//Se llamará al método "addProduct" con los mismos campos de arriba, debe arrojar un error porque el
//código estará repetido
console.log(
  "[TEST #5] addProduct: Producto con código repetido debe arrojar error."
);

ProductManagerTest.addProduct(
  new Product(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

console.log(" ");

//Se evaluará que "getProductById" devuelva error si no encuentra el producto o el producto en caso
//de encontrarlo
console.log("[TEST #6] getProductBy: Id válido");

ProductManagerTest.getProductById(1);

console.log(" ");
console.log("[TEST #7] getProductBy: Id inválido");

ProductManagerTest.getProductById(465213);

console.log(" ");

//EXTRA: Se llamará el método "addProduct" con campos en null o undefined, debe arrojar un error porque
//los campos son todos obligatorios
console.log("[TEST EXTRAS] Todos los campos son obligatorios");

ProductManagerTest.addProduct(
  new Product(
    "producto prueba",
    "Este es un producto prueba",
    null,
    "Sin imagen",
    "abc12",
    25
  )
);

ProductManagerTest.addProduct(
  new Product("producto prueba", undefined, 200, "Sin imagen", "abc12", 25)
);

ProductManagerTest.addProduct(
  new Product(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc1"
  )
);
