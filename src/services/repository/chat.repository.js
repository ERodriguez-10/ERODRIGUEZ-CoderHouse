export default class ChatRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getMessages = async () => {
    return await this.dao.getMessages();
  };

  addMessage = async (message) => {
    try {
      return await this.dao.addMessage(message);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
