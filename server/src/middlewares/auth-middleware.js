import { AuthenticationError, InternalServerError, NotFoundError } from '../utils/errors.js';
import { requestHandler } from '../utils/request-handler.js';
import { authService } from '../utils/auth-service.js';

export const authMiddleware = requestHandler(
  async (req, res, next) => {
    const { authorization } = req.headers;

    const user = await authService.validateHeader(authorization);

    res.locals.user = user;
    next();
  },
  [
    { name: AuthenticationError, status: 401 },
    { name: NotFoundError, status: 404 },
    { name: InternalServerError, status: 500 },
  ]
);
