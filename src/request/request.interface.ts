import { RequestStatus } from "./request-status.enum";
import { IRequestTask } from "./request-task.interface";

export interface IRequest {
    id: string;
    status: RequestStatus;
    fileId: string;
    from: string;
    to: { id: string, name: string }[];
    classification: string;
    unit?: string;
    info?: string;
    authorizer?: string;
    workflow: IRequestTask[];
}