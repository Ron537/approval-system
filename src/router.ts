import { Router } from "express";
import { RequestRouter } from "./request/request.router";

const AppRouter: Router = Router();

AppRouter.use('/request', RequestRouter);

export { AppRouter };