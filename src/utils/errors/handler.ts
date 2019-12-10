import * as express from 'express';
import { ServerError, UserError } from './application';

export function errorHandler(error, req: express.Request, res: express.Response, next: express.NextFunction) {
    return res.status(error && error.status ? error.status : 500).send(error.message);
}

export function userErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof UserError) {
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function serverErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof ServerError) {
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function unknownErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
