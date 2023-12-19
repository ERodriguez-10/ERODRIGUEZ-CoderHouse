import chatModel from "../../models/chat.model.js";

class ChatDAO {
  constructor() {
    this.chatModel = chatModel;
  }

  async getChats() {
    return await this.chatModel.find().lean();
  }

  async addChat(chatObject) {
    try {
      return await this.chatModel.create(chatObject);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ChatDAO;
