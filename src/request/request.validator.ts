import { Request, Response, NextFunction } from 'express';
import { IRequest } from './request.interface';
import { UserError, ValidationError } from '../utils/errors/application';

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
            !request.fileId
        ) {
            return next(new UserError('Validation error', 400));
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