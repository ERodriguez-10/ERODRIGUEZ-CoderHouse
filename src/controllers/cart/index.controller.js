import { addProductByCartId } from "#controllers/cart/addProductByCartId.controller.js";
import { cleanCartByCartId } from "#controllers/cart/cleanCartByCartId.controller.js";
import { createCart } from "#controllers/cart/createCart.controller.js";
import { deleteProductByCartId } from "#controllers/cart/deleteProductByCartId.controller.js";
import { getCartByCartId } from "#controllers/cart/getCartByCartId.controller.js";
import { getCartByUserId } from "#controllers/cart/getCartByUserId.controller.js";
import { updateCart } from "#controllers/cart/updateCart.controller.js";
import { updateQuantityProduct } from "#controllers/cart/updateQuantityProduct.controller.js";

export const cartController = {
  addProductByCartId,
  cleanCartByCartId,
  createCart,
  deleteProductByCartId,
  getCartByCartId,
  getCartByUserId,
  updateCart,
  updateQuantityProduct,
};
