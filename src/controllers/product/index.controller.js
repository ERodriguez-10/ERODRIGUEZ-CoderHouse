import { addProduct } from "#controllers/product/addProduct.controller.js";
import { getProducts } from "#controllers/product/getProducts.controller.js";
import { getProductById } from "#controllers/product/getProductById.controller.js";
import { updateProduct } from "#controllers/product/updateProduct.controller.js";
import { deleteProduct } from "#controllers/product/deleteProduct.controller.js";

export const productController = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
