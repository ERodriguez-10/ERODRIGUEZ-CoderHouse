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

    return { error: "[ERROR] Product not found" };
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

export class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}
