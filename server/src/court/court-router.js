import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { requestHandler } from '../utils/request-handler.js';
import { courtService } from './court-service.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';

export const courtRouter = new Router({ mergeParams: true });

courtRouter.get(
  '/',
  authMiddleware,
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;

    res.send(
      `Fetch the information about all courts of a tennis club with id ${clubId}`
    );
  })
);

courtRouter.get(
  '/:courtId',
  authMiddleware,
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;
    const courtId = +req.params.courtId;

    res.send(
      `Fetch the information about a court with id ${courtId} in a tennis club with id ${clubId}`
    );
  })
);

courtRouter.post(
  '/',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const { courtDetails } = req.body;
      const clubId = +req.params.clubId;
      const userId = res.locals.user.id;

      await courtService.addCourt(courtDetails, userId, clubId);

      res.status(201).send({});
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);

courtRouter.put(
  '/:courtId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const clubId = +req.params.clubId;
      const courtId = +req.params.courtId;
      const userId = res.locals.user.id;
      const { courtDetails } = req.body;

      await courtService.updateCourt(courtDetails, userId, clubId, courtId);

      res.status(201).send({});
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);

courtRouter.delete(
  '/:courtId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const clubId = +req.params.clubId;
      const courtId = +req.params.courtId;
      const userId = res.locals.user.id;

      await courtService.deleteCourt(courtId, userId, clubId);

      res.status(200).send({});
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);
