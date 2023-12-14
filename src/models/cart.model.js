import mongoose from "mongoose";

const cartCollection = "carts";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  products: { type: [productSchema], required: true, max: 25 },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
