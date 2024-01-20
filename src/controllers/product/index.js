import { addProduct } from "#controllers/product/addProduct.js";
import { getProducts } from "#controllers/product/getProducts.js";
import { getProductById } from "#controllers/product/getProductById.js";
import { updateProduct } from "#controllers/product/updateProduct.js";
import { deleteProduct } from "#controllers/product/deleteProduct.js";

export const productController = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
