import { addProduct } from "#services/product/addProduct.services.js";
import { getProducts } from "#services/product/getProduct.services.js";
import { getProductById } from "#services/product/getProductById.services.js";
import { updateProduct } from "#services/product/updateProduct.services.js";
import { deleteProduct } from "#services/product/deleteProduct.services.js";

export const productServices = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
