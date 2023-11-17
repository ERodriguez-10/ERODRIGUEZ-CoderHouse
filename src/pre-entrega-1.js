import fs from "node:fs";

export class ProductManager {
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
    return this.products;
  }

  getProductById(id) {
    const productSelected = this.products.find((p) => p.id == id);

    if (productSelected) return productSelected;

    throw new Error(
      "Invalid product ID. Please try with a different Product ID"
    );
  }

  async addProduct(product) {
    let isValid = true;

    for (let key in product) {
      if (key !== "thumbnails" && product[key] === undefined) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      throw new Error("All fields are required but 'Thumbnail' is optional");
    } else {
      const exist = this.products.find((p) => p.code == product.code);
      if (exist) {
        throw new Error("Product code already exist!");
      } else {
        if (product.thumbnails === undefined) {
          const newProductWithThumbnail = {
            ...product,
            thumbnails: [],
            id: this.products[this.products.length - 1].id + 1,
          };

          this.products.push(newProductWithThumbnail);

          await this.saveFile();
        } else {
          const newProduct = {
            ...product,
            id: this.products[this.products.length - 1].id + 1,
          };

          this.products.push(newProduct);

          await this.saveFile();
        }
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

      if (keyToModify.length === 0)
        throw new Error(
          "We couldn't process your request. You need to provide values to update the product. Try again"
        );

      const valuesToSet = Object.values(object);
      for (let i = 0; i < keyToModify.length; i++) {
        productSelected[keyToModify[i]] = valuesToSet[i];
      }

      this.products[foundIndex] = productSelected;

      await this.saveFile();
    } else {
      throw new Error("Something went wrong. Please try again");
    }
  }

  async deleteProduct(id) {
    const productSelected = this.products.find((p) => p.id == id);

    if (productSelected) {
      const newArrayProducts = this.products.filter((p) => p.id != id);

      this.products = newArrayProducts;

      await this.saveFile();
    } else {
      throw new Error("ID Product not found. 0 delete product.");
    }
  }
}

export class Product {
  constructor(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
    status
  ) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnails = thumbnails),
      (this.code = code),
      (this.stock = stock),
      (this.category = category),
      (this.status = status ?? true);
  }
}

export class CarritoManager {
  constructor(path) {
    this.path = path;
    try {
      const cartData = fs.readFileSync(this.path, "utf-8");
      this.carts = JSON.parse(cartData);
    } catch {
      this.carts = [];
    }
  }

  async saveFile() {
    try {
      fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, "\t"),
        "utf-8"
      );
    } catch {
      throw new Error("Something went wrong saving data!");
    }
  }

  getCartById(id) {
    const findCart = this.carts.find((cid) => cid.id === id);

    if (findCart) return findCart;

    throw new Error(`Cart with ID ${id} doesn't exist. Try again.`);
  }

  async createCart(products) {
    const newCart = {
      id: this.carts[this.carts.length - 1].id + 1,
      products: products.map((p) => {
        const fullObject = {
          productId: p,
          quantity: 1,
        };

        return fullObject;
      }),
    };

    this.carts.push(newCart);

    await this.saveFile();

    return newCart;
  }

  async addProductToCart(cartId, productId) {
    let isValid = true;

    try {
      this.getCartById(cartId);
    } catch (e) {
      isValid = false;
      throw new Error(e);
    }

    if (isValid) {
      const hasExistProduct = this.getCartById(cartId).products.find(
        (p) => p.productId === productId
      );

      if (hasExistProduct) {
        hasExistProduct.quantity++;
      } else {
        this.getCartById(cartId).products.push({
          productId: productId,
          quantity: 1,
        });
      }

      await this.saveFile();
    } else {
      throw new Error("Cart ID doesn't exist. Try to create a cart first!");
    }
  }
}
