import mongoose from "mongoose";

const chatCollection = "messages";

const chatSchema = new mongoose.Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 250 },
  date: { type: String, required: true },
});

const chatModel = mongoose.model(chatCollection, chatSchema);

export default chatModel;
