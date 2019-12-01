import { IRequest } from './request.interface';
import { RequestModel } from './request.model';

export class RequestRepository {
    static create(request: IRequest) {
        return RequestModel.create(request);
    }
}