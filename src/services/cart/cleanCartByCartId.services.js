import cartModel from "#models/cart.model.js";

export async function cleanCartByCartId(cartId) {
  try {
    return await cartModel.updateOne(
      {
        _id: cartId,
      },
      {
        $set: { products: [] },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
