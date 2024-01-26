import cartModel from "#models/cart.model.js";

export async function updateQuantityProduct(cartId, productId, quantity) {
  try {
    return await cartModel.updateOne(
      {
        _id: cartId,
        "products.productId": productId,
      },
      { $set: { "products.$.quantity": quantity } }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
