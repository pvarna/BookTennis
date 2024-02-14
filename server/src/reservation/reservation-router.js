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
import { SocketEmittedEvents } from '../types.js';

export const reservationRouter = new Router();

export function onMakeReservation() {
  io.emit(SocketEmittedEvents.REFETCH_RESERVATIONS);
}

reservationRouter.get(
  '/user/:userId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const userId = +req.params.userId;
      const id = res.locals.user.id;
      const { page, pageSize } = req.query;

      if (id !== userId) {
        throw new AuthorizationError('Insufficient permissions');
      }

      const paginatedReservations =
        await reservationService.fetchReservationByUserId(userId, page, pageSize);

      res.status(200).send({
        reservations: paginatedReservations.results,
        total: paginatedReservations.total,
      });
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
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
