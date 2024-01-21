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
}

export const reservationService = new ReservationService();
