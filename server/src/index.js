import express from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';
import { config } from './config.js';

const app = express();
const port = config.server.port;

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export { knexClient };
