import { Request, Response } from 'express';
import { RequestRepository } from './request.repository';

export class RequestController {
    static async create(req: Request, res: Response) {
        res.json(await RequestRepository.create(req.body));
    }
}