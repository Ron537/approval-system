import { Router } from "express";
import { RequestController } from "./request.controller";
import { Wrapper } from "../utils/wrapper";
import { RequestValidator } from "./request.validator";
import { AuthenticationMiddleware } from "../authentication/middleware";

const RequestRouter: Router = Router();

RequestRouter.get('/approvable', AuthenticationMiddleware.requireAuth, Wrapper.wrapAsync(RequestController.getApprovableRequests));
RequestRouter.post('/', RequestValidator.isValid, Wrapper.wrapAsync(RequestController.create));
RequestRouter.patch('/:id', AuthenticationMiddleware.requireAuth, RequestValidator.canChangeStatus, Wrapper.wrapAsync(RequestController.changeStatus));

export { RequestRouter };