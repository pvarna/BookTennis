import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { requestHandler } from '../utils/request-handler.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';
import { clubCreationRequestService } from './club-creation-request-service.js';

export const clubCreationRequestRouter = new Router();

clubCreationRequestRouter.get(
  '/',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const user = res.locals.user;

      if (!user.isAdmin) {
        throw new AuthorizationError('Insufficient Permissions');
      }
      const { page, pageSize } = req.query;

      const paginatedRequests = await clubCreationRequestService.loadRequests(
        page,
        pageSize
      );

      res.status(200).send({
        requests: paginatedRequests.results,
        total: paginatedRequests.total,
      });
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);

clubCreationRequestRouter.post(
  '/',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const user = res.locals.user;

      if (!user.isAdmin) {
        throw new AuthorizationError('Insufficient Permissions');
      }

      const { requestDetails } = req.body;

      await clubCreationRequestService.createRequest(requestDetails, user.id);

      res.status(201).send({});
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);

clubCreationRequestRouter.put(
  '/:requestId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const user = res.locals.user;

      if (!user.isAdmin) {
        throw new AuthorizationError('Insufficient Permissions');
      }

      const requestId = +req.params.requestId;
      const { status } = req.body;

      await clubCreationRequestService.changeRequestStatus(requestId, status);

      res.status(201).send({});
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);
