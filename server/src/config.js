import { config as envConfig } from 'dotenv';

envConfig();

export const config = {
  server: {
    port: process.env.SERVER_PORT ?? 1337,
  },
  client: {
    baseUrl: process.env.CLIENT_BASE_URL ?? '127.0.0.1:3000',
  },
  db: {
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    port: process.env.DATABASE_PORT ?? 5432,
    database: process.env.DATABASE_NAME ?? 'booktennis',
    user: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
  },
};
