import { Request, Response, NextFunction } from 'express';
import { UserError, ValidationError } from '../utils/errors/application';

export class UnitValidator {

    static async hasIdAndRanks(req: Request, res: Response, next: NextFunction) {
        if (req.params.id && req.body.ranks && Array.isArray(req.body.ranks)) {
            return next();
        }

        return next(new ValidationError());
    }
}