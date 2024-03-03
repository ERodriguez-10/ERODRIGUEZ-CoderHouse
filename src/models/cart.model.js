import { Schema, model } from "mongoose";

const cartCollection = "carts";

const productSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema({
  products: { type: [productSchema], required: true, max: 25 },
  userId: { type: Schema.Types.ObjectId, ref: "accounts", required: true },
  hasPurchased: { type: Boolean, default: false },
});

cartSchema.pre("findOne", function () {
  this.populate("products.productId");
});

const cartModel = model(cartCollection, cartSchema);

export default cartModel;
