import { Router } from "express";
import { requestHandler } from "../utils/request-handler.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { AuthorizationError } from '../utils/errors.js';
import { messageService } from "./message-service.js";

export const messageRouter = new Router();

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

    res.status(200).send({messages: allMessages});
  })
);

messageRouter.post(
  "/:userId1/:userId2",
  authMiddleware,
  requestHandler(async (req, res) => {
    const fromUser = +req.params.userId1;
    const toUser = +req.params.userId2;
    const { sentMessage, sentTime } = req.body;

    await messageService.sendMessageToUser(fromUser, toUser, sentMessage, sentTime);

    res.status(200).send({});
  })
);
