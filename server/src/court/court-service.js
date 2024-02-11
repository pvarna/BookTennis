import { ClubModel } from '../club/club-model.js';
import { AuthorizationError } from '../utils/errors.js';
import { CourtModel } from './court-model.js';

class CourtService {
  async addCourt(courtDetails, userId, clubId) {
    this.isAuthorized(userId, clubId);

    return await CourtModel.query().insert({
      clubId,
      surface: courtDetails.surface,
      price: courtDetails.price,
    });
  }

  async updateCourt(courtDetails, userId, clubId, courtId) {
    this.isAuthorized(userId, clubId);

    return await CourtModel.query().findById(courtId).update({
      surface: courtDetails.surface,
      price: courtDetails.price,
    });
  }

  async deleteCourt(courtId, userId, clubId) {
    this.isAuthorized(userId, clubId);

    return await CourtModel.query().deleteById(courtId);
  }

  async isAuthorized(userId, clubId) {
    const club = await ClubModel.query().findById(clubId);

    if (club.userId !== userId) {
      throw new AuthorizationError('Insufficient Permissions');
    }
  }
}

export const courtService = new CourtService();
