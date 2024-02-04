class HttpError extends Error {
  status;
  name;
  constructor(status, name, message) {
    super(message);
    this.status = status;
    this.name = name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message) {
    super(400, 'BadRequestError', message);
  }
}

export class AuthenticationError extends HttpError {
  constructor(message) {
    super(401, 'AuthenticationError', message);
  }
}

export class AuthorizationError extends HttpError {
  constructor(message) {
    super(403, 'AuthorizationError', message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(404, 'NotFoundError', message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message) {
    super(500, 'InternalServerError', message);
  }
}
