import mongoose, { Schema } from "mongoose";

const cartCollection = "carts";

const productSchema = new mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  products: { type: [productSchema], required: true, max: 25 },
});

cartSchema.pre("findOne", function () {
  this.populate("products.productId");
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
