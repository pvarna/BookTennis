import { HttpService } from './http-service';

class ReservationService {
  constructor() {
    this.httpService = new HttpService();
  }

  async makeReservation(reservationDetails) {
    await this.httpService.post('/reservation', {
      body: reservationDetails,
    });
  }

  async loadReservationsForUser(userId) {
    return await this.httpService.get(`/reservation/user/${userId}`);
  }

  async deleteReservation(reservationId) {
    return await this.httpService.delete(`/reservation/${reservationId}`);
  }
}

export const reservationService = new ReservationService();
