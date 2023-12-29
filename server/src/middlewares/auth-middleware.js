import { NotFoundError } from 'objection';
import { userService } from '../user/user-service.js';
import { verifyToken } from '../utils/auth.js';
import { AuthenticationError, InternalServerError } from '../utils/errors.js';
import { requestHandler } from '../utils/request-handler.js';

export const authMiddleware = requestHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthenticationError('Unauthorized');
  }

  const [tokenType, token] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    throw new AuthenticationError(
      'Invalid token type - must be in the format `Bearer <value>'
    );
  }

  try {
    const { id } = verifyToken(token);

    const user = await userService.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.locals.user = user;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AuthenticationError('Token expired');
    }

    throw new InternalServerError('Something went wrong');
  }

  next();
});
