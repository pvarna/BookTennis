import { ClubCreationRequestModel } from './club-creation-request-model.js';
import { clubService } from '../club/club-service.js';

class ClubCreationRequestService {
  async loadRequests(page, pageSize) {
    return await ClubCreationRequestModel.query()
      .page(page, pageSize)
      .orderBy('id', 'desc');
  }

  async createRequest(requestDetails, userId) {
    return await ClubCreationRequestModel.query().insert({
      userId,
      city: requestDetails.city,
      name: requestDetails.name,
      status: 'Pending',
    });
  }

  async cancelRequest(requestId) {
    await ClubCreationRequestModel.query()
      .findById(requestId)
      .update({ status: 'Cancelled' });
  }

  async acceptReqest(requestId) {
    return await ClubCreationRequestModel.transaction(async (transaction) => {
      const clubCreationRequest = await ClubCreationRequestModel.query(
        transaction
      ).findById(requestId);

      await ClubCreationRequestModel.query(transaction)
        .findById(requestId)
        .update({ status: 'Accepted' });

      return await clubService.createClub(
        { name: clubCreationRequest.name, city: clubCreationRequest.city },
        clubCreationRequest.userId,
        transaction
      );
    });
  }

  async changeRequestStatus(requestId, status) {
    if (status === 'Accepted') {
      return await this.acceptReqest(requestId);
    }

    return await this.cancelRequest(requestId);
  }
}

export const clubCreationRequestService = new ClubCreationRequestService();
