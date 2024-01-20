import productModel from "#models/product.js";

export async function updateProduct(id, product) {
  return await productModel.updateOne({ _id: id }, product);
}
