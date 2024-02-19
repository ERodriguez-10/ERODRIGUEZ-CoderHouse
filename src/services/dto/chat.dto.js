export default class ChatDto {
  constructor(chat) {
    this.user = chat.user;
    this.message = chat.message;
    this.date = chat.date;
  }
}
