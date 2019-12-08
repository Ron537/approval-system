import { IRequest } from './request.interface';
import { RequestModel } from './request.model';
import { Repository } from '../utils/repository';

export class RequestRepository extends Repository<IRequest> {
    constructor() {
        super(RequestModel);
    }

    async updateOne(cond: Object, data: Object, populateOptions?: string | Object): Promise<IRequest> {
        let updateQuery = RequestModel.findOneAndUpdate(cond, data, { new: true });
        if (populateOptions) {
            updateQuery = updateQuery.populate(populateOptions);
        }

        return updateQuery.exec();
    }
}