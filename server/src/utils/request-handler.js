import { AuthenticationError } from './errors.js';

export function requestHandler(handler, errors = []) {
  return async (request, response, next) => {
    try {
      await handler(request, response, next);
    } catch (error) {
      console.error(error);

      const errorDescription = errors.find((err) => error instanceof err.name);
      if (errorDescription) {
        response.status(errorDescription.status).json(error);
        return;
      }

      response.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
