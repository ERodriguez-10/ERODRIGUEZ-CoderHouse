import cartModel from "#models/cart.js";

export async function getCartByCartId(id) {
  return await cartModel.findById(id).lean();
}
