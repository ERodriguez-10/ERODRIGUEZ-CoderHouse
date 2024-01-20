import cartModel from "#models/cart.js";

export async function createCart(products, userId) {
  return await cartModel.create({
    products,
    userId,
    hasPurchased: false,
  });
}
