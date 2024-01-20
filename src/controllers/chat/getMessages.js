import messageModel from "#models/chat.js";

export async function getMessages() {
  return await messageModel.find().lean();
}
