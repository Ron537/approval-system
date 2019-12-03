import { Request, Response } from 'express';
import { IUser } from './user.interface';

export class UserController {
    static async currentUser(req: Request, res: Response) {
        const { name, unit } = req.user as IUser;
        
        res.json({ name, unit });
    }
}