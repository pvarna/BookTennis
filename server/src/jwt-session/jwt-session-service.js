import { JwtSessionModel } from './jwt-session-model.js';

class JwtSessionService {
  async isValidSession(userId) {
    return (await JwtSessionModel.query().where('userId', userId)).length > 0
  }

  async addSession(payload, userId) {
    return await JwtSessionModel.query().insert({ payload, userId });
  }

  async deleteSession(userId) {
    return await JwtSessionModel.query().delete().where('userId', userId);
  }
}

export const jwtSessionService = new JwtSessionService();
