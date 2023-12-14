import productModel from "../../models/product.model.js";

class ProductDAO {
  constructor() {
    this.productModel = productModel;
  }

  async getProducts() {
    return await this.productModel.find().lean();
  }

  async getProductById(id) {
    const productSelected = await this.productModel.findById(id);
    if (productSelected !== null) {
      return productSelected;
    } else {
      throw new Error("Product not found");
    }
  }

  async addProduct(product) {
    try {
      const productCreated = await this.productModel.create(product);
      return productCreated;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateProduct(id, product) {
    return await this.productModel.updateOne({ _id: id }, product);
  }

  async deleteProduct(id) {
    return await this.productModel.deleteOne({ _id: id });
  }
}

export default ProductDAO;
