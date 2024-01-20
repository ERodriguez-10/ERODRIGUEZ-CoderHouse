import cartModel from "#models/cart.js";

export async function getCartByUserId(userId) {
  return await cartModel.findOne({ userId, hasPurchased: false }).lean();
}
