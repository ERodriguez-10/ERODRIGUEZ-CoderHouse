import cartModel from "#models/cart.model.js";

export async function getCartByCartId(id) {
  return await cartModel.findById(id).lean();
}
