import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';
import { config } from './config.js';

const express = require("express");
var bodyParser = require('body-parser');
const userRouter = require("./user/UserRouter");
const clubRouter = require("./club/ClubRouter");
const reservationRouter = require("./reservation/ReservationRouter");
const chatRouter = require("./chat/ChatRouter");
const port = config.server.port;

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();
app.use(bodyParser.json())
app.get("/", (_, res) => res.send("Hello from the Express server!"));

app.use("/user", userRouter);
app.use("/club", clubRouter);
app.use("/reservation", reservationRouter);
app.use("/chat", chatRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));

export { knexClient };
