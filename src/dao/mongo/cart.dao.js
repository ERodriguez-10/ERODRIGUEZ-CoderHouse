import cartModel from "../../models/cart.model.js";

class CartDAO {
  constructor() {
    this.cartModel = cartModel;
  }

  async getCarts() {
    return await this.cartModel.find();
  }

  async getCartById(id) {
    return await this.cartModel.findById(id);
  }

  async createCart(products) {
    return await this.cartModel.create({ products });
  }

  async addProductToCart(cartId, productId) {
    const selectedCart = await this.getCartById(cartId);

    if (selectedCart) {
      const productIndex = selectedCart.products.findIndex(
        (p) => p.productId === productId
      );

      if (productIndex > -1) {
        selectedCart.products[productIndex].quantity++;
      } else {
        selectedCart.products.push({ productId: productId, quantity: 1 });
      }

      await selectedCart.save();
    } else {
      throw new Error("Cart not found!");
    }
  }
}

export default CartDAO;
