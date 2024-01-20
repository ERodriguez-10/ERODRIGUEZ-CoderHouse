import productModel from "#models/product.js";

export async function getProductById(id) {
  const productSelected = await productModel.findById(id).lean();
  if (productSelected !== null) {
    return productSelected;
  } else {
    throw new Error("Product not found");
  }
}
