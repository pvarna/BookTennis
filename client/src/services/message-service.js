import { UserStorage } from "../utils/user-storage";
import { HttpService } from "./http-service";

class MessageService {
  constructor() {
    this.httpService = new HttpService();
    this.userStorage = new UserStorage();
  }

  async loadMessagesBetweenUsers(userId1, userId2) {
    const { messages } = await this.httpService.get(
      `/message/${userId1}/${userId2}`
    );

    return messages;
  }

  async sendMessageBetweenUsers(userId1, userId2, message, sentTme) {
    const data = await this.httpService.post(`/message/${userId1}/${userId2}`, {
      body: { sentMessage: message, sentTime: sentTme },
    });
    if (data) {
      // Emit event for sent message to socket
    }
  }
}

export const messageService = new MessageService();
