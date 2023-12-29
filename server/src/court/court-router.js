import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { requestHandler } from '../utils/request-handler.js';

export const courtRouter = new Router();

courtRouter.get(
  '/',
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;

    res.send(
      `Fetch the information about all courts of a tennis club with id ${clubId}`
    );
  })
);

courtRouter.get(
  '/:courtId',
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
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;

    res.send(
      `Create a new court in a tennis club with id ${clubId}: ${JSON.stringify(
        req.body
      )}`
    );
  })
);

courtRouter.put(
  '/:courtId',
  authMiddleware,
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;
    const courtId = +req.params.courtId;

    res.send(
      `Update the information about a court with id ${courtId} in a tennis club with id ${clubId}: ${JSON.stringify(
        req.body
      )}`
    );
  })
);

courtRouter.delete(
  '/:courtId',
  authMiddleware,
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;
    const courtId = +req.params.courtId;

    res.send(
      `Delete a court with id ${courtId} in a tennis club with id ${clubId}: ${JSON.stringify(
        req.body
      )}`
    );
  })
);
