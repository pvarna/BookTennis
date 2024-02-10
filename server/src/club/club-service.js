import { DateTime } from 'luxon';
import { ClubModel } from './club-model.js';

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
}

export const clubService = new ClubService();
