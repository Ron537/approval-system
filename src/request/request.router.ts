import { Router } from "express";
import { RequestController } from "./request.controller";
import { Wrapper } from "../utils/wrapper";

const RequestRouter: Router = Router();

RequestRouter.post('/', Wrapper.wrapAsync(RequestController.create));

export { RequestRouter };