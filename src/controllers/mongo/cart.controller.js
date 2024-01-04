import cartModel from "../../models/cart.model.js";

class CartController {
  constructor() {
    this.cartModel = cartModel;
  }

  async getCarts() {
    return await this.cartModel.find();
  }

  async getCartById(id) {
    return await this.cartModel.findById(id).lean();
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

      await this.cartModel.findOneAndUpdate({ _id: cartId }, selectedCart);
    } else {
      throw new Error("Cart not found!");
    }
  }

  async updateProductInCart(cartId, products) {
    try {
      return await this.cartModel.updateOne(
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

  async updateQuantityProductInCart(cartId, productId, quantity) {
    try {
      return await this.cartModel.updateOne(
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

  async deleteAllProductsInCart(cartId) {
    try {
      return await this.cartModel.updateOne(
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

  async deleteProductToCart(cartId, productId) {
    try {
      return await this.cartModel.updateOne(
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
}

export default CartController;
