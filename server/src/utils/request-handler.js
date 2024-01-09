export function requestHandler(handler) {
  return async (request, response, next) => {
    try {
      await handler(request, response, next);
    } catch (error) {
      console.error(error);

      response.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
