import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Request } from './request';
import { IUser } from '../user/user.interface';

export class RequestController {
    static async create(req: ExpressRequest, res: ExpressResponse) {
        res.json(await Request.create(req.body));
    }

    static async changeStatus(req: ExpressRequest, res: ExpressResponse) {
        res.json(await Request.changeStatus(req.params.id, req.user as IUser, req.body.status, req.body.additionalInfo));
    }

    static async getMyRequests(req: ExpressRequest, res: ExpressResponse) {
        res.json(await Request.getMyRequests(req.user as IUser));
    }

    static async getApprovableRequests(req: ExpressRequest, res: ExpressResponse) {
        res.json(await Request.getApprovableRequests(req.user as IUser));
    }
}