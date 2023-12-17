import { knexSnakeCaseMappers } from 'objection';
import { config } from './src/config.js';

const knexConfig = {
  development: {
    client: 'postgresql',
    connection: config.db,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    ...knexSnakeCaseMappers(),
  },
};

export default knexConfig;
