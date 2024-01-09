import { Router } from 'express';
import { requestHandler } from '../utils/request-handler.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { userService } from './user-service.js';
import { AuthenticationError } from '../utils/errors.js';
import { generateToken } from '../utils/auth.js';

export const userRouter = new Router();
userRouter.get(
  '/',
  requestHandler(async (_, res) => {
    res.send(`Fetch the information about all users`);
  })
);

userRouter.get(
  '/:userId',
  requestHandler(async (req, res) => {
    const userId = +req.params.userId;

    res.send(`Fetch the information about a user with id ${userId}`);
  })
);

userRouter.post(
  '/login',
  requestHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login(email, password);

    if (!user) {
      throw new AuthenticationError();
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
    });

    res.status(200).send({ token });
  })
);

userRouter.post(
  '/register',
  requestHandler(async (req, res) => {
    const user = await userService.register(req.body);

    res.status(201).send({ user });
  })
);

userRouter.put(
  '/:userId',
  authMiddleware,
  requestHandler(async (req, res) => {
    const userId = +req.params.userId;

    res.send(
      `Update the information about an user with id ${userId}: ${JSON.stringify(
        req.body
      )}`
    );
  })
);

userRouter.delete(
  '/:userId',
  authMiddleware,
  requestHandler(async (req, res) => {
    const userId = +req.params.userId;

    res.send(`Delete an user with id ${userId}: ${JSON.stringify(req.body)}`);
  })
);
