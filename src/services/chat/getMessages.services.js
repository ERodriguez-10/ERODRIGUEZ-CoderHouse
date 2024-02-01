import messageModel from "#models/chat.model.js";

export async function getMessages() {
  return await messageModel.find().lean();
}
