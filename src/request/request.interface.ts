import { RequestStatus } from "./request-status.enum";
import { IUser } from "../user/user.interface";
import { IUnit } from "../unit/unit.interface";

export interface IRequest {
    id: string; // get from service
    status: RequestStatus;
    fileUrl: string; // fileId
    from: string; // user-id
    to: IUser; // user-id (can be multiple) - take from phonebook
    unit?: string; // get it from the "from" user
    // info - object / text
}