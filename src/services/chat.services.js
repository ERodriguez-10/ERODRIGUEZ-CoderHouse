import messageModel from "#models/chat.model.js";

export default class ChatServices {
  constructor() {
    console.log("Working chat with Database persistence in MongoDB");
  }

  getMessages = async () => {
    return await messageModel.find().lean();
  };

  addMessage = async (message) => {
    try {
      return await messageModel.create(message);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
