import cartModel from "#models/cart.js";

export async function updateCart(cartId, products) {
  try {
    return await cartModel.updateOne(
      {
        _id: cartId,
      },
      {
        $set: { products },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
