import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';
import { config } from './config.js';
import express, { json } from 'express';
import cors from 'cors';
import { userRouter } from './user/user-router.js';
import { clubRouter } from './club/club-router.js';
import {
  onMakeReservation,
  reservationRouter,
} from './reservation/reservation-router.js';
import { chatRouter } from './chat/chat-router.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { socketAuthMiddleware } from './middlewares/socket-auth-middleware.js';

const port = config.server.port;

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: config.client.baseUrl,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

io.use(socketAuthMiddleware);

io.on('connection', (socket) => {
  socket.on('modify-reservation', onMakeReservation);
});

app.use(json());
app.use(cors());

app.use('/user', userRouter);
app.use('/club', clubRouter);
app.use('/reservation', reservationRouter);
app.use('/chat', chatRouter);

server.listen(port, () => console.log(`Server is listening on port ${port}`));

export { knexClient };
