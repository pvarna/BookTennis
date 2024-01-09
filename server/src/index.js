import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';
import { config } from './config.js';
import express, { json } from 'express';
import cors from 'cors';
import { userRouter } from './user/user-router.js';
import { clubRouter } from './club/club-router.js';
import { reservationRouter } from './reservation/reservation-router.js';
import { chatRouter } from './chat/chat-router.js';

const port = config.server.port;

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();
app.use(json());
app.use(cors());
app.get('/', (_, res) => res.send('Hello from the Express server!'));

app.use('/user', userRouter);
app.use('/club', clubRouter);
app.use('/reservation', reservationRouter);
app.use('/chat', chatRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));

export { knexClient };
