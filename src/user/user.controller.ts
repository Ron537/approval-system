import { Request, Response } from 'express';
import { IUser } from './user.interface';
import { UserService } from '../utils/users-service/service';

export class UserController {
    static async currentUser(req: Request, res: Response) {
        const { name, unit } = req.user as IUser;

        res.json({ name, unit });
    }

    static async search(req: Request, res: Response) {
        const { term } = req.query;

        res.json(await UserService.search(term));
    }
}