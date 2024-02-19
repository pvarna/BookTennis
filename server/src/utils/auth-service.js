import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { userService } from '../user/user-service.js';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
} from './errors.js';
import { jwtSessionService } from '../jwt-session/jwt-session-service.js';

const PRIVATE_KEY = config.jwt.privateKey;
const EXPIRES_IN = config.jwt.expiresIn;

class AuthService {
  verifyToken(token) {
    return jwt.verify(token, PRIVATE_KEY);
  }

  generateToken(user) {
    return jwt.sign({ ...user }, PRIVATE_KEY, { expiresIn: EXPIRES_IN });
  }

  async validateHeader(authorization) {
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
      const { id } = this.verifyToken(token);

      const user = await userService.findById(id);
      const isValidSession = await jwtSessionService.isValidSession(id);

      if (!isValidSession) {
        throw new AuthenticationError('Token not valid');
      }

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError('Token expired');
      }

      throw new InternalServerError('Something went wrong');
    }
  }
}

export const authService = new AuthService();
