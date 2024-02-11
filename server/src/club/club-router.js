import { Router } from 'express';
import { courtRouter } from '../court/court-router.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { requestHandler } from '../utils/request-handler.js';
import { clubService } from './club-service.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';

export const clubRouter = new Router();

clubRouter.use('/:clubId/court', courtRouter);

clubRouter.get(
  '/',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const { city, surfaces: surfacesQuery, page, pageSize } = req.query;

      const surfaces =
        surfacesQuery === ''
          ? ['clay', 'hard', 'grass']
          : surfacesQuery.split(',');

      const paginatedClubs = await clubService.load(
        city,
        surfaces,
        page,
        pageSize
      );

      res.status(200).send({
        clubs: paginatedClubs.results.map((club) => ({
          id: club.id,
          name: club.name,
          city: club.city,
          userId: club.userId,
        })),
        total: paginatedClubs.total,
      });
    },
    [{ name: AuthenticationError, status: 401 }]
  )
);

clubRouter.get(
  '/:clubId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const clubId = +req.params.clubId;
      const { date } = req.query;

      const club = await clubService.loadClubWithCourts(clubId, date);

      res.status(200).send({ club });
    },
    [{ name: AuthenticationError, status: 401 }]
  )
);

clubRouter.get(
  '/user/:userId',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const id = +req.params.userId;
      const userId = res.locals.user.id;

      if (id !== userId) {
        throw new AuthorizationError('Insufficient permissions');
      }

      const clubs = await clubService.loadClubsForUser(id);

      res.status(200).send({ clubs });
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);

clubRouter.post(
  '/',
  authMiddleware,
  requestHandler(
    async (req, res) => {
      const { clubInfo } = req.body;
      const userId = res.locals.user.id;

      await clubService.createClub(clubInfo, userId);

      res.status(201).send({});
    },
    [{ name: AuthenticationError, status: 401 }]
  )
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
  requestHandler(
    async (req, res) => {
      const clubId = +req.params.clubId;
      const userId = res.locals.user.id;

      await clubService.deleteClub(clubId, userId);

      res.status(200).send({});
    },
    [
      { name: AuthenticationError, status: 401 },
      { name: AuthorizationError, status: 403 },
    ]
  )
);
