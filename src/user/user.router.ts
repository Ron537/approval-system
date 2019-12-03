import { Router } from "express";
import { UserController } from "./user.controller";
import { Wrapper } from "../utils/wrapper";

const UserRouter: Router = Router();

UserRouter.get('/', Wrapper.wrapAsync(UserController.currentUser));

export { UserRouter };