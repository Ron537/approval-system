import { IRequest } from './request.interface';
import { RequestModel } from './request.model';
import { Repository } from '../utils/repository';

export class RequestRepository extends Repository<IRequest> {
    constructor() {
        super(RequestModel);
    }
}