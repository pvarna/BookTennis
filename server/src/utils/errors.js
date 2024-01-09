class HttpError extends Error {
  constructor(status, name, message) {
    super(status, name, message)
  }
}

export class AuthenticationError extends HttpError {
  constructor(message) {
    super(401, 'AuthenticationError', message)
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(404, 'NotFoundError', message)
  }
}

export class InternalServerError extends HttpError {
  constructor(message) {
    super(500, 'InternalServerError', message)
  }
}