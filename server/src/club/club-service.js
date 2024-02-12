import { DateTime } from 'luxon';
import { ClubModel } from './club-model.js';
import { AuthorizationError } from '../utils/errors.js';

class ClubService {
  async load(city, surfaces, page, pageSize) {
    const query = ClubModel.query()
      .withGraphJoined('courts')
      .whereIn('surface', surfaces);

    if (city !== '') {
      query.where('city', city);
    }

    return await query.page(page, pageSize).orderBy('name', 'asc');
  }

  async loadClubWithCourts(clubId, date) {
    return await ClubModel.query()
      .findById(clubId)
      .withGraphJoined('courts')
      .withGraphJoined('courts.reservations')
      .modifyGraph('courts.reservations', (builder) =>
        builder.whereBetween('start_time', [
          DateTime.fromISO(date).startOf('day'),
          DateTime.fromISO(date).endOf('day'),
        ])
      );
  }

  async loadClubsForUser(userId) {
    return await ClubModel.query()
      .where('userId', userId)
      .withGraphJoined('courts')
      .orderBy('name', 'asc');
  }

  async createClub(clubInfo, userId, transaction) {
    return await ClubModel.query(transaction).insert({
      userId,
      name: clubInfo.name,
      city: clubInfo.city,
    });
  }

  async deleteClub(clubId, userId) {
    const club = await ClubModel.query().findById(clubId);

    if (club.userId !== userId) {
      throw new AuthorizationError('Insufficient permissions');
    }

    return await ClubModel.query().deleteById(clubId);
  }
}

export const clubService = new ClubService();
