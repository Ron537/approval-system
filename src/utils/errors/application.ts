export class ApplicationError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super();

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || 'Error: Undefined Application Error';
        this.status = status || 500;
    }
}

export class ServerError extends ApplicationError {
    constructor(message?: string, status?: number) {
        super(message || 'Internal Server Error', status || 500);
    }
}

export class UserError extends ApplicationError {
    constructor(message?: string, status?: number) {
        super(message || 'User Error', status || 400);
    }
}

export class ValidationError extends UserError {
    constructor() {
        super('Validation error', 400);
    }
}

export class NotPermittedError extends UserError {
    constructor() {
        super('Operation not permitted', 403);
    }
}

export class NotFoundError extends UserError {
    constructor() {
        super('Resource not found', 404);
    }
}