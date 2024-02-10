import { HttpService } from './http-service';
import { DateTime } from 'luxon';

class ClubService {
  constructor() {
    this.httpService = new HttpService();
  }

  async loadClubs(filters) {
    return await this.httpService.get('/club', {
      query: { ...filters },
    });
  }

  async loadCLubInfo(clubId, date = DateTime.now()) {
    return await this.httpService.get(`/club/${clubId}`, { query: { date } });
  }
}

export const clubService = new ClubService();
