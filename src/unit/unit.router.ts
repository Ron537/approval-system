import { Router } from "express";
import { UnitController } from "./unit.controller";
import { Wrapper } from "../utils/wrapper";
import { UnitValidator } from "./unit.validator";

const UnitRouter: Router = Router();

UnitRouter.get('/', Wrapper.wrapAsync(UnitController.get));
UnitRouter.post('/', Wrapper.wrapAsync(UnitController.create));
UnitRouter.patch('/:id', UnitValidator.hasIdAndRanks, Wrapper.wrapAsync(UnitController.changeApprovalRanks));

export { UnitRouter };