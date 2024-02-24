import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  purchaseDatetime: { type: Date, default: new Date() },
  amount: { type: Number },
  productsBought: { type: Array },
  purchaser: { type: String, required: true },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
