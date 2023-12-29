import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { requestHandler } from '../utils/request-handler.js';

export const chatRouter = new Router();

chatRouter.get(
  '/user1/:userId1/user2/:userId2',
  authMiddleware,
  requestHandler((req, res) => {
    const userId1 = +req.params.userId1;
    const userId2 = +req.params.userId2;

    res.send(
      `Fetch the chat information between user with id ${userId1} and user with id ${userId2}`
    );
  })
);

chatRouter.post(
  '/user1/:userId1/user2/:userId2',
  authMiddleware,
  requestHandler((req, res) => {
    const userId1 = +req.params.userId1;
    const userId2 = +req.params.userId2;

    res.send(
      `Add a new message in the chat between the user with id ${userId1} and the user with id ${userId2}: ${JSON.stringify(
        req.body
      )}`
    );
  })
);
