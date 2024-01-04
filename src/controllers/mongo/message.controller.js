import messageModal from "../../models/message.model.js";

class MessageController {
  constructor() {
    this.messageModal = messageModal;
  }

  async getMessages() {
    return await this.messageModal.find().lean();
  }

  async addMessage(message) {
    try {
      return await this.messageModal.create(message);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default MessageController;
