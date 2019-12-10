import { Request, Response, NextFunction } from 'express';
import { IRequest } from './request.interface';
import { ValidationError } from '../utils/errors/user';

export class RequestValidator {
    static isValid(req: Request, res: Response, next: NextFunction) {
        const request = req.body as IRequest;

        if (
            !request ||
            !request.id ||
            !request.from ||
            !request.to ||
            !Array.isArray(request.to) ||
            request.to.length === 0 ||
            !request.to.every(usr => usr.id && usr.name) ||
            !request.fileId ||
            !request.classification
        ) {
            return next(new ValidationError());
        }

        return next();
    }

    static async canChangeStatus(req: Request, res: Response, next: NextFunction) {
        if (req.params.id && req.body.status) {
            return next();
        }

        return next(new ValidationError());
    }
}