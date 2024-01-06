# Overview
The app is configured to work with `postgres` as a database and uses `Express` for the server.

## First time running the app
If it is your first time using the app, you will need to execute the following before proceeding with executing any of the available scripts:
```bash
npm install
```

The first time you want to run the app you have to take the following steps:
- If your `postgres` credentials differ from the default ones set in [src/config.js](src/config.js), you need to create a `.env` file and fill it in with the required in the [.env.template](.env.template) file fields.
- You have to to execute the migration for the database. For this, you have to be in the `server` directory and execute the following 
```bash
npx knex migrate:latest
```

# Start the server
You need to execute the following in the `server` directory:
```bash
npm start
```
