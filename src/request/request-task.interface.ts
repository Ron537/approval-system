import { RequestStatus } from "./request-status.enum";
import { RequestType } from "./request-type.enum";

export interface IRequestTask {
    status: RequestStatus;
    type: RequestType;
    authorizer?: string;
}