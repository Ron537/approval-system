import { Request, Response } from 'express';
import { Unit } from './unit';

export class UnitController {
    static async create(req: Request, res: Response) {
        res.json(await Unit.create(req.body.name));
    }

    static async get(req: Request, res: Response) {
        res.json(await Unit.getAll());
    }

    static async changeApprovalRanks(req: Request, res: Response) {
        res.json(await Unit.setApprovalRanks(req.params.id, req.body.ranks));
    }

    static async changeSpecialApprovers(req: Request, res:Response) {
        res.json(await Unit.setSpecialApprovers(req.params.id, req.body.specialApprovers));
    }
}