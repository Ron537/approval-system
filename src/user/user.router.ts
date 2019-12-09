import { Router } from "express";
import { UserController } from "./user.controller";
import { Wrapper } from "../utils/wrapper";

const UserRouter: Router = Router();

UserRouter.get('/', Wrapper.wrapAsync(UserController.currentUser));
UserRouter.get('/search', Wrapper.wrapAsync(UserController.search));

export { UserRouter };