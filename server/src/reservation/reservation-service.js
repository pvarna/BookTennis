import { DateTime } from 'luxon';
import { ReservationsModel } from './reservation-model.js';

class ReservationService {
  async makeReservation(userId, courtId, startTime, durationInMinutes = 60) {
    await ReservationsModel.query().insert({
      userId,
      courtId,
      startTime: DateTime.fromISO(startTime),
      durationInMinutes,
    });
  }
}

export const reservationService = new ReservationService();
