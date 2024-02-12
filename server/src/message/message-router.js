import { Router } from "express";
import { requestHandler } from "../utils/request-handler.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { messageService } from "./message-service.js";
import { io } from "../index.js";
import { SocketEmittedEvents } from "../types.js";

export const messageRouter = new Router();

export function onMessageSent(sentTo, sentFrom) {
  io.emit(SocketEmittedEvents.REFETCH_MESSAGES);
  io.to(sentTo).emit(SocketEmittedEvents.RECEIVE_MESSAGE);
  io.to(sentFrom).emit(SocketEmittedEvents.RECEIVE_MESSAGE);
}

messageRouter.get(
  "/:userId1/:userId2",
  authMiddleware,
  requestHandler(async (req, res) => {
    const fromUser = +req.params.userId1;
    const toUser = +req.params.userId2;

    const allMessages = await messageService.fetchMessagesForUsers(
      fromUser,
      toUser
    );

    res.status(200).send({ messages: allMessages });
  })
);

messageRouter.post(
  "/:userId1/:userId2",
  authMiddleware,
  requestHandler(async (req, res) => {
    const fromUser = +req.params.userId1;
    const toUser = +req.params.userId2;
    const { sentMessage, sentTime } = req.body;

    await messageService.sendMessageToUser(
      fromUser,
      toUser,
      sentMessage,
      sentTime
    );

    res.status(200).send({});
  })
);
