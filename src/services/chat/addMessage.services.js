import messageModel from "#models/chat.model.js";

export async function addMessage(message) {
  try {
    return await messageModel.create(message);
  } catch (e) {
    throw new Error(e.message);
  }
}
