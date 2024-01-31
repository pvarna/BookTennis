import { requestHandler } from '../utils/request-handler.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { Router } from 'express';
import { reservationService } from './reservation-service.js';
import { io } from '../index.js';
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
} from '../utils/errors.js';

export const reservationRouter = new Router();

export function onMakeReservation() {
  io.emit('refetch-reservations');
}

reservationRouter.get(
  '/:reservationId',
  authMiddleware,
  requestHandler((req, res) => {
    const reservationId = +req.params.reservationId;

    res.send(
      `Fetch the informations about a reservation with id ${reservationId}`
    );
  })
);

reservationRouter.get(
  '/user/:userId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const userId = +req.params.userId;
      const id = res.locals.user.id;

      if (id !== userId) {
        throw new AuthorizationError('Insufficient permissions');
      }

      const reservations = await reservationService.fetchReservationByUserId(
        userId
      );

      res.status(200).send(reservations);
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);

reservationRouter.get(
  '/club/:clubId',
  authMiddleware,
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;

    res.send(
      `Fetch the information about all reservations for a a tennis club with id ${clubId}`
    );
  })
);

reservationRouter.post(
  '/',
  authMiddleware,
  requestHandler(async (req, res) => {
    const { userId, courtId, startingTime } = req.body;

    await reservationService.makeReservation(userId, courtId, startingTime);

    res.status(200).send({});
  })
);

reservationRouter.put(
  '/:reservationId',
  authMiddleware,
  requestHandler((req, res) => {
    const reservationId = +req.params.reservationId;

    res.send(
      `Edit the information about a reservation with id ${reservationId}: ${JSON.stringify(
        req.body
      )}`
    );
  })
);

reservationRouter.delete(
  '/:reservationId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const reservationId = +req.params.reservationId;
      const userId = res.locals.user.id;

      await reservationService.deleteReservation(reservationId, userId);

      res.status(200).send({});
    },
    [
      { name: BadRequestError, status: 400 },
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);
