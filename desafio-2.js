const fs = require("fs");

class ProductManager {
  constructor(pathFileName) {
    this.path = pathFileName;
    try {
      let productsFile = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(productsFile);
    } catch {
      this.products = [];
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t"),
        "utf-8"
      );
    } catch (error) {
      console.log(`[ERROR] ${error}`);
    }
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const productSelected = this.products.find((p) => p.id == id);

    productSelected
      ? console.log(productSelected)
      : console.log("[ERROR] Product not found");
  }

  async addProduct(product) {
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
        const newProduct = { ...product, id: this.products.length + 1 };
        this.products.push(newProduct);

        await this.saveFile();

        console.log("Product added successfully.");
      }
    }
  }

  async updateProduct(id, object) {
    let foundIndex = undefined;
    const productSelected = this.products.find((p, index) => {
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

      await this.saveFile();

      console.log("Product updated successfully.");
    } else {
      console.log("[ERROR] Product not found");
    }
  }

  async deleteProduct(id) {
    const productSelected = this.products.find((p) => p.id == id);

    if (productSelected) {
      const newArrayProducts = this.products.filter((p) => p.id != id);

      this.products = newArrayProducts;

      await this.saveFile();

      console.log("Product deleted successfully.");
    } else {
      console.log("[ERROR] ID Product not found. 0 delete product.");
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

async function runTests() {
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

  await ProductManagerTest.addProduct(
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
  await ProductManagerTest.addProduct(
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

  await ProductManagerTest.updateProduct(1, {
    title: "Nuevo titulo IX",
    price: 1234,
  });

  ProductManagerTest.getProducts();

  console.log(" ");

  // Se evaluará que "deleteProduct" elimine el producto en caso de encontrarlo o arroje un error en caso
  // de no existir
  console.log("[TEST #8] deleteProduct(1): Id válido");

  await ProductManagerTest.deleteProduct(1);

  ProductManagerTest.getProducts();

  console.log(" ");
  console.log("[TEST #9] deleteProduct(465213): Id inválido");

  await ProductManagerTest.deleteProduct(465213);

  ProductManagerTest.getProducts();

  console.log(" ");
}

runTests();
