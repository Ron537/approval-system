import { Request, Response } from 'express';
import { Unit } from './unit';

export class UnitController {
    static async create(req: Request, res: Response) {
        res.json(await Unit.create(req.body.name));
    }
}