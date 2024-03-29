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

  async loadClubsForUser(userId) {
    return await this.httpService.get(`/club/user/${userId}`);
  }

  async createClub(clubInfo) {
    await this.httpService.post('/club', {
      body: { clubInfo },
    });
  }

  async deleteClub(id) {
    return await this.httpService.delete(`/club/${id}`);
  }
}

export const clubService = new ClubService();
