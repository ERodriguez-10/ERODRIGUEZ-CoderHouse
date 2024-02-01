import { addProductByCartId } from "#services/cart/addProductByCartId.services.js";
import { cleanCartByCartId } from "#services/cart/cleanCartByCartId.services.js";
import { createCart } from "#services/cart/createCart.services.js";
import { deleteProductByCartId } from "#services/cart/deleteProductByCartId.services.js";
import { getCartByCartId } from "#services/cart/getCartByCartId.services.js";
import { getCartByUserId } from "#services/cart/getCartByUserId.services.js";
import { updateCart } from "#services/cart/updateCart.services.js";
import { updateQuantityProduct } from "#services/cart/updateQuantityProduct.services.js";

export const cartServices = {
  addProductByCartId,
  cleanCartByCartId,
  createCart,
  deleteProductByCartId,
  getCartByCartId,
  getCartByUserId,
  updateCart,
  updateQuantityProduct,
};
