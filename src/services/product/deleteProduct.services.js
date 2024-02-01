import productModel from "#models/product.model.js";

export async function deleteProduct(id) {
  return await productModel.deleteOne({ _id: id });
}
