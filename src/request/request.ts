import { RequestRepository } from './request.repository';
import { IRequest } from './request.interface';
import { Unit } from '../unit/unit';
import { IUser } from '../user/user.interface';
import { RequestStatus } from './request-status.enum';
import { NotPermittedError, NotFoundError } from '../utils/errors/application';

export class Request {
    private static requestRepository: RequestRepository = new RequestRepository();

    static async create(request: IRequest): Promise<IRequest> {
        const unit = await Unit.findByName(request.unit);

        if (!unit) {
            await Unit.create(request.unit);
        }

        return Request.requestRepository.create(request);
    }

    static async changeStatus(requestId: string, user: IUser, status: RequestStatus): Promise<IRequest> {

        const request = await Request.requestRepository.findById(requestId);

        if (!request) {
            throw new NotFoundError();
        }

        const canApprove = await Request.canApprove(user, request);

        if (canApprove) {
            return await Request.requestRepository.update(requestId, { status });
        }

        throw new NotPermittedError();
    }

    private static async canApprove(user: IUser, request: IRequest): Promise<boolean> {
        const unit = await Unit.findByName(request.unit);

        return (unit && unit.approvers && unit.approvers.length > 0 && unit.approvers.indexOf(user.rank) !== -1 && unit.name === user.name);
    }
}