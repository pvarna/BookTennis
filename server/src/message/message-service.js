import { DateTime } from "luxon";
import { MessagesModel } from "./messages-model.js";

class MessageService {
  async fetchMessagesForUsers(userId1, userId2) {
    const messagesFromFirstUser = await MessagesModel.query()
      .select("*")
      .where("user1_id", userId1)
      .andWhere("user2_id", userId2)
      .orderBy("time", "asc");

    const messagesFromSecondUser = await MessagesModel.query()
      .select("*")
      .where("user1_id", userId2)
      .andWhere("user2_id", userId1)
      .orderBy("time", "asc");



      const combined = [...messagesFromFirstUser,... messagesFromSecondUser]

    return [...messagesFromFirstUser,... messagesFromSecondUser];
  }

  async sendMessageToUser(fromUserId, toUserId, data, sentTime) {

    await MessagesModel.query().insert({
      user1_id: fromUserId,
      user2_id: toUserId,
      data,
      time: sentTime,
    });
  }
}

export const messageService = new MessageService();
