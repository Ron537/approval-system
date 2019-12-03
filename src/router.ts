import { Router } from "express";
import { RequestRouter } from "./request/request.router";
import { UnitRouter } from './unit/unit.router';
import { UserRouter } from "./user/user.router";
import { AuthenticationMiddleware } from "./authentication/middleware";

const AppRouter: Router = Router();

AppRouter.use('/request', RequestRouter);
AppRouter.use('/unit', AuthenticationMiddleware.requireAuth, UnitRouter);
AppRouter.use('/user', AuthenticationMiddleware.requireAuth, UserRouter);


export { AppRouter };