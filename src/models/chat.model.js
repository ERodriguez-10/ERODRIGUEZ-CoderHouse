import { Schema, model } from "mongoose";

const messageCollection = "messages";

const messageSchema = new Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 250 },
  date: { type: String, required: true },
});

const messageModel = model(messageCollection, messageSchema);

export default messageModel;
