import { Request, Response, NextFunction } from 'express';

export class AuthenticationMiddleware {
    static requireAuth(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            return next();
        }

        return res.redirect('/auth/login');
    }
}