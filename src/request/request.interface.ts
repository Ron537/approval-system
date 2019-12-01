import { RequestStatus } from "./request-status.enum";
import { IUser } from "../user/user.interface";
import { IUnit } from "../unit/unit.interface";

export interface IRequest {
    id: string;
    status: RequestStatus;
    fileUrl: string;
    from: IUser; // user-id
    to: IUser;
    unit: IUnit;
}