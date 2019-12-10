import { Request, Response, NextFunction } from 'express';
import { Admin } from './admin';

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
    const isAdmin = await Admin.isAdmin((req.user as any).id);

    if(isAdmin) {
        return next();
    }

    return res.status(401).send();
}