import { HttpService } from './http-service';

class ClubCreationRequestService {
  constructor() {
    this.httpService = new HttpService();
  }

  async loadRequests(pagination) {
    return await this.httpService.get('/clubCreationRequest', {
      query: { ...pagination },
    });
  }

  async createRequest(requestDetails) {
    return await this.httpService.post('/clubCreationRequest', {
      body: { requestDetails },
    });
  }

  async changeRequestStatus(requestId, status) {
    return await this.httpService.put(`/clubCreationRequest/${requestId}`, {
      body: { status },
    });
  }
}

export const clubCreationRequestService = new ClubCreationRequestService();
