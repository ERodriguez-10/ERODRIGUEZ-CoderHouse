import cartModel from "#models/cart.model.js";

export default class CartServices {
  constructor() {
    console.log("Working cart with Database persistence in MongoDB");
  }

  addProductByCartId = async (cartId, productId) => {
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
  };

  cleanCartByCartId = async (cartId) => {
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
  };

  createCart = async (products, userId) => {
    return await cartModel.create({
      products,
      userId,
      hasPurchased: false,
    });
  };

  deleteProductByCartId = async (cartId, productId) => {
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
  };

  getCartByCartId = async (id) => {
    return await cartModel.findById(id).lean();
  };

  getCartByUserId = async (userId) => {
    return await cartModel.findOne({ userId, hasPurchased: false }).lean();
  };

  updateCart = async (cartId, products) => {
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
  };

  updateQuantityProduct = async (cartId, productId, quantity) => {
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
  };
}