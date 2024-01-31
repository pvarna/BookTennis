import { DateTime } from 'luxon';
import { ReservationsModel } from './reservation-model.js';
import { AuthorizationError, BadRequestError } from '../utils/errors.js';

class ReservationService {
  async makeReservation(userId, courtId, startTime, durationInMinutes = 60) {
    await ReservationsModel.query().insert({
      userId,
      courtId,
      startTime: DateTime.fromISO(startTime),
      durationInMinutes,
    });
  }

  async fetchReservationByUserId(userId) {
    return await ReservationsModel.query().where('userId', userId);
  }

  async deleteReservation(reservationId, userId) {
    const reservation = await ReservationsModel.query().findById(reservationId);

    if (reservation.userId !== userId) {
      throw new AuthorizationError('Insufficient permissions');
    }

    if (
      DateTime.fromISO(reservation.startTime).diff(DateTime.now(), 'hours')
        .hours > 2
    ) {
      throw new BadRequestError('Reservation is too soon');
    }

    return await ReservationsModel.query().deleteById(reservationId);
  }
}

export const reservationService = new ReservationService();
