const fs = require("fs");

class ProductManager {
  constructor(pathFileName) {
    this.products = [];
    this.currentId = 0;
    this.path = pathFileName;
  }

  setIdProduct() {
    let idProduct = this.currentId + 1;
    this.currentId = idProduct;
  }

  getProducts() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");
      console.log(JSON.parse(data));
    } else {
      console.log(this.products);
    }
  }

  getProductById(id) {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");

      const productSelected = JSON.parse(data).find((p) => p.id == id);

      productSelected
        ? console.log(productSelected)
        : console.log("[ERROR] Product not found");
    } else {
      console.log("[ERROR] We don't have any product");
    }
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

        fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
      }
    }
  }

  updateProduct(id, object) {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");

      let foundIndex = undefined;
      const productSelected = JSON.parse(data).find((p, index) => {
        foundIndex = index;
        return p.id == id;
      });

      if (productSelected) {
        const keyToModify = Object.keys(object);
        const valuesToSet = Object.values(object);
        for (let i = 0; i < keyToModify.length; i++) {
          productSelected[keyToModify[i]] = valuesToSet[i];
        }

        this.products[foundIndex] = productSelected;

        fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
      } else {
        console.log("[ERROR] Product not found");
      }
    } else {
      console.log("[ERROR] We don't have any product");
    }
  }

  deleteProduct(id) {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");

      const productSelected = JSON.parse(data).find((p) => p.id == id);

      if (productSelected) {
        const data = fs.readFileSync(this.path, "utf-8");

        const newArrayProducts = JSON.parse(data).filter((p) => p.id != id);

        this.products = newArrayProducts;

        fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
      } else {
        console.log("[ERROR] ID Product not found. 0 delete product.");
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
const ProductManagerTest = new ProductManager("./products.json");

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

//Se evaluará que "getProductById" devuelva error si no encuentra el producto o el producto en caso
//de encontrarlo
console.log("[TEST #5] getProductBy(1): Id válido");

ProductManagerTest.getProductById(1);

console.log(" ");
console.log("[TEST #6] getProductBy(465213): Id inválido");

ProductManagerTest.getProductById(465213);

console.log(" ");

// Se evaluará que "updateProduct" cambie un campo de algún producto sin eliminar el ID y que lo haya
// actualizado
console.log(
  "[TEST #7] updateProduct(1, {title: 'Nuevo titulo, price: 5555}): Actualiza los campos title y price del Product.ID = 1"
);

ProductManagerTest.updateProduct(1, { title: "Nuevo titulo", price: 5555 });

ProductManagerTest.getProducts();

console.log(" ");

// Se evaluará que "deleteProduct" elimine el producto en caso de encontrarlo o arroje un error en caso
// de no existir
console.log("[TEST #8] deleteProduct(1): Id válido");

ProductManagerTest.deleteProduct(1);

ProductManagerTest.getProducts();

console.log(" ");
console.log("[TEST #9] deleteProduct(465213): Id inválido");

ProductManagerTest.deleteProduct(465213);

ProductManagerTest.getProducts();

console.log(" ");
