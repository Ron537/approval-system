import { Request, Response, NextFunction } from 'express';
import { IUser } from '../user/user.interface';

export class AuthenticationMiddleware {
    static requireAuth(req: Request, res: Response, next: NextFunction) {
        req.user = {
            id: '5d9b57b9d8c49cc66964b1f6',
            name: 'ליברמן כבר',
            rank: 'mega',
            unit: 'יחידת ביג מאם'
        } as IUser;
        if (req.user) {
            return next();
        }

        return res.status(401).send();
    }
}