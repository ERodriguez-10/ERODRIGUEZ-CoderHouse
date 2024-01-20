import { addProductByCartId } from "#controllers/cart/addProductByCartId.js";
import { cleanCartByCartId } from "#controllers/cart/cleanCartByCartId.js";
import { createCart } from "#controllers/cart/createCart.js";
import { deleteProductByCartId } from "#controllers/cart/deleteProductByCartId.js";
import { getCartByCartId } from "#controllers/cart/getCartByCartId.js";
import { getCartByUserId } from "#controllers/cart/getCartByUserId.js";
import { updateCart } from "#controllers/cart/updateCart.js";
import { updateQuantityProduct } from "#controllers/cart/updateQuantityProduct.js";

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
