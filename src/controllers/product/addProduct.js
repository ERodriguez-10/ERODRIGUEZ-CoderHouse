import productModel from "#models/product.js";

export async function addProduct(product) {
  try {
    const productCreated = await productModel.create(product);
    return productCreated;
  } catch (e) {
    throw new Error(e.message);
  }
}
