import { authService } from '../utils/auth-service.js';

export const socketAuthMiddleware = async (socket, next) => {
  const authorization = socket.request.headers?.authorization;

  try {
    await authService.validateHeader(authorization);
  } catch (e) {
    next(new Error('Authetication error!'));
  }
  next();
};
