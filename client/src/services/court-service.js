import { HttpService } from './http-service';

class CourtService {
  constructor() {
    this.httpService = new HttpService();
  }

  async addCourt(courtDetails, clubId) {
    await this.httpService.post(`/club/${clubId}/court`, {
      body: { courtDetails },
    });
  }

  async updateCourt(courtDetails, clubId, courtId) {
    await this.httpService.put(`club/${clubId}/court/${courtId}`, {
      body: { courtDetails },
    });
  }

  async deleteCourt(courtId, clubId) {
    await this.httpService.delete(`/club/${clubId}/court/${courtId}`);
  }
}

export const courtService = new CourtService();
