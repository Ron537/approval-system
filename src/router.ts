import { Router } from "express";
import { RequestRouter } from "./request/request.router";
import { UnitRouter } from './unit/unit.router';

const AppRouter: Router = Router();

AppRouter.use('/request', RequestRouter);
AppRouter.use('/unit', UnitRouter);

export { AppRouter };