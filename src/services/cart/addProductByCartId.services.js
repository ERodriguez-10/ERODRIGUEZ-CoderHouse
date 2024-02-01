import cartModel from "#models/cart.model.js";
import { getCartByCartId } from "#services/cart/getCartByCartId.services.js";

async function addProductByCartId(cartId, productId) {
  const selectedCart = await getCartByCartId(cartId);

  if (selectedCart) {
    const productIndex = selectedCart.products.findIndex(
      (p) => p.productId._id.toString() === productId
    );

    if (productIndex > -1) {
      selectedCart.products[productIndex].quantity++;
    } else {
      selectedCart.products.push({ productId: productId, quantity: 1 });
    }

    await cartModel.findOneAndUpdate({ _id: cartId }, selectedCart);
  } else {
    throw new Error("Cart not found!");
  }
}

export { addProductByCartId };
