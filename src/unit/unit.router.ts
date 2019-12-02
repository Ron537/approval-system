import { Router } from "express";
import { UnitController } from "./unit.controller";
import { Wrapper } from "../utils/wrapper";

const UnitRouter: Router = Router();

UnitRouter.post('/', Wrapper.wrapAsync(UnitController.create));

export { UnitRouter };