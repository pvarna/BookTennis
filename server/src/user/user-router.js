import { Router } from "express";
import { requestHandler } from "../utils/request-handler.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { userService } from "./user-service.js";
import { AuthenticationError, AuthorizationError } from "../utils/errors.js";
import { authService } from "../utils/auth-service.js";

export const userRouter = new Router();
userRouter.get(
  "/",
  authMiddleware,
  requestHandler(async (_, res) => {
    res.send(`Fetch the information about all users`);
  })
);

userRouter.get(
  "/:userId",
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const id = +req.params.userId;
      const userId = res.locals.user.id;

      if (id !== userId) {
        throw new AuthorizationError("Insufficient permission");
      }

      const user = await userService.findById(id);

      res.status(200).send({ user });
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);

userRouter.post(
  "/login",
  requestHandler(
    async (req, res) => {
      const { email, password } = req.body;
      const user = await userService.login(email, password);

      if (!user) {
        throw new AuthenticationError("Wrong credentials");
      }

      const token = authService.generateToken({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
      });

      res.status(200).send({ token });
    },
    [{ name: AuthenticationError, status: 401 }]
  )
);

userRouter.post(
  "/register",
  requestHandler(async (req, res) => {
    const user = await userService.register(req.body);

    res.status(201).send({ user });
  })
);

userRouter.put(
  "/:userId",
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const id = +req.params.userId;
      const userId = res.locals.user.id;

      if (id !== userId) {
        throw new AuthorizationError("Insufficient permission");
      }

      await userService.updateInfo(id, req.body.userInfo);

      res.status(201).send({});
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);
