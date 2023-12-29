import { Router } from 'express';
import { courtRouter } from '../court/court-router.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { requestHandler } from '../utils/request-handler.js';

export const clubRouter = new Router();

clubRouter.use('/:clubId/court', courtRouter);

clubRouter.get(
  '/',
  requestHandler((req, res) => {
    res.send('Fetch the information about all tennis clubs');
  })
);

clubRouter.get(
  '/:clubId',
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;

    res.send(`Fetch the information about a tennis club with id ${clubId}`);
  })
);

clubRouter.post(
  '/',
  authMiddleware,
  requestHandler(async (req, res) => {
    res.send(`Create a new tennis club: ${JSON.stringify(req.body)}`);
  })
);

clubRouter.put(
  '/:clubId',
  authMiddleware,
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;

    res.send(
      `Update the information about a tennis club with id ${clubId}: ${JSON.stringify(
        req.body
      )}`
    );
  })
);

clubRouter.delete(
  '/:clubId',
  authMiddleware,
  requestHandler((req, res) => {
    const clubId = +req.params.clubId;

    res.send(
      `Delete a tennis club with id ${clubId}: ${JSON.stringify(req.body)}`
    );
  })
);
