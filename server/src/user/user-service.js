import { UniqueViolationError } from 'objection';
import { UserModel } from './user-model.js';
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

class UserAlreadyRegisteredError extends Error {}

class UserService {
  async findById(id) {
    return await UserModel.query().findById(id);
  }

  async login(email, password) {
    const user = await UserModel.query().findOne({ email });
    const areIdentical = await compare(password, user.password);

    return areIdentical ? user : undefined;
  }

  async register(userDetails) {
    const hashedPassword = await hash(userDetails.password, SALT_ROUNDS);
    try {
      return await UserModel.query()
        .insert({
          ...userDetails,
          password: hashedPassword,
          isAdmin: false,
        })
        .returning('*');
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        throw new UserAlreadyRegisteredError('User is already registered');
      }
      throw error;
    }
  }
}

export const userService = new UserService();
