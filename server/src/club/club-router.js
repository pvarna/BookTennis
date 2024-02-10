import { Router } from 'express';
import { courtRouter } from '../court/court-router.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { requestHandler } from '../utils/request-handler.js';
import { clubService } from './club-service.js';

export const clubRouter = new Router();

clubRouter.use('/:clubId/court', courtRouter);

clubRouter.get(
  '/',
  authMiddleware,
  requestHandler(async (req, res) => {
    const { city, surfaces: surfacesQuery, page, pageSize } = req.query;

    const surfaces =
      surfacesQuery === ''
        ? ['clay', 'hard', 'grass']
        : surfacesQuery.split(',');

    const paginatedClubs = await clubService.load(city, surfaces, page, pageSize);

    res.status(200).send({
      clubs: paginatedClubs.results.map((club) => ({
        id: club.id,
        name: club.name,
        city: club.city,
        userId: club.userId,
      })),
      total: paginatedClubs.total
    });
  })
);

clubRouter.get(
  '/:clubId',
  authMiddleware,
  requestHandler(async (req, res) => {
    const clubId = +req.params.clubId;
    const { date } = req.query;

    const club = await clubService.loadClubWithCourts(clubId, date);

    res.status(200).send({ club });
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
