import * as fs from 'fs';
import * as path from 'path';
import { Router, Request, Response } from "express";
import { RequestRouter } from "./request/request.router";
import { UnitRouter } from './unit/unit.router';
import { UserRouter } from "./user/user.router";
import { AuthenticationMiddleware } from "./authentication/middleware";
import { requireAdmin } from './admin/admin.middleware';
import { Wrapper } from './utils/wrapper';

const AppRouter: Router = Router();

AppRouter.use('/request', RequestRouter);
AppRouter.use('/unit', AuthenticationMiddleware.requireAuth, Wrapper.wrapAsync(requireAdmin), UnitRouter);
AppRouter.use('/user', AuthenticationMiddleware.requireAuth, UserRouter);
AppRouter.get('/ranks', AuthenticationMiddleware.requireAuth, Wrapper.wrapAsync(requireAdmin), (req: Request, res: Response) => {
    fs.readFile(path.resolve(__dirname, '../assets/ranks.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send();
        }

        return res.json(JSON.parse(data));
    });
});

export { AppRouter };