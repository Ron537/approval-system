import { RequestStatus } from "./request-status.enum";

export interface IRequest {
    id: string; 
    status: RequestStatus;
    fileId: string;
    from: string; 
    to: string[]; 
    classification: string;
    unit?: string; 
    info?: string;
    authorizer?: string;
}