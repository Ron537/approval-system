import { Router } from "express";
import { RequestController } from "./request.controller";
import { Wrapper } from "../utils/wrapper";
import { RequestValidator } from "./request.validator";
import { AuthenticationMiddleware } from "../authentication/middleware";
import { spikeMiddleware } from "../utils/spike.middleware";

const RequestRouter: Router = Router();

RequestRouter.get('/my', AuthenticationMiddleware.requireAuth, Wrapper.wrapAsync(RequestController.getMyRequests));
RequestRouter.get('/approvable', AuthenticationMiddleware.requireAuth, Wrapper.wrapAsync(RequestController.getApprovableRequests));
RequestRouter.patch('/:id', AuthenticationMiddleware.requireAuth, RequestValidator.canChangeStatus, Wrapper.wrapAsync(RequestController.changeStatus));

RequestRouter.post('/', RequestValidator.isValid, spikeMiddleware, Wrapper.wrapAsync(RequestController.create));

export { RequestRouter };