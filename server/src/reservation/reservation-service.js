import { DateTime } from 'luxon';
import { ReservationsModel } from './reservation-model.js';
import { AuthorizationError, BadRequestError } from '../utils/errors.js';
import { fromPSQLDate } from '../utils/lib.js';

class ReservationService {
  async makeReservation(userId, courtId, startTime, durationInMinutes = 60) {
    const start = DateTime.fromISO(startTime);

    if (start < DateTime.now()) {
      throw new BadRequestError('Cannot make reservations for the past');
    }

    const isFreeSlot = (await ReservationsModel.query().where('startTime', startTime)).length === 0
    if (!isFreeSlot) {
      throw new BadRequestError('Slot is already taken');
    }

    await ReservationsModel.query().insert({
      userId,
      courtId,
      startTime: start,
      durationInMinutes,
    });
  }

  async fetchReservationByUserId(userId) {
    return await ReservationsModel.query()
      .where('userId', userId)
      .orderBy('startTime', 'desc');
  }

  async deleteReservation(reservationId, userId) {
    const reservation = await ReservationsModel.query().findById(reservationId);

    if (reservation.userId !== userId) {
      throw new AuthorizationError('Insufficient permissions');
    }

    const reservationStartTime = fromPSQLDate(reservation.startTime);
    if (reservationStartTime.diff(DateTime.now(), 'hours').hours < 2) {
      throw new BadRequestError('Reservation is too soon');
    }

    if (reservationStartTime < DateTime.now()) {
      throw new BadRequestError('Cannot delete past reservations');
    }

    return await ReservationsModel.query().deleteById(reservationId);
  }
}

export const reservationService = new ReservationService();
