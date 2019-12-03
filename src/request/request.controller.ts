import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Request } from './request';
import { IUser } from '../user/user.interface';

export class RequestController {
    static async create(req: ExpressRequest, res: ExpressResponse) {
        res.json(await Request.create(req.body));
    }

    static async changeStatus(req: ExpressRequest, res: ExpressResponse) {
        res.json(await Request.changeStatus(req.params.id, req.user as IUser, req.body.status));
    }
}