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

  async createClub(clubInfo) {
    await this.httpService.post('/club', {
      body: { clubInfo },
    });
  }
}

export const clubService = new ClubService();
