import cartModel from "#models/cart.js";

export async function deleteProductByCartId(cartId, productId) {
  try {
    return await cartModel.updateOne(
      {
        _id: cartId,
      },
      {
        $pull: { products: { productId: productId } },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
