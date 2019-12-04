import { RequestRepository } from './request.repository';
import { IRequest } from './request.interface';
import { Unit } from '../unit/unit';
import { IUser } from '../user/user.interface';
import { RequestStatus } from './request-status.enum';
import { NotPermittedError, NotFoundError } from '../utils/errors/application';
import { UserService } from '../utils/users-service/service';

export class Request {
    private static requestRepository: RequestRepository = new RequestRepository();

    static async create(request: IRequest): Promise<IRequest> {
        const user = await UserService.getById(request.from);
        let unit = await Unit.findByName(user.unit);

        if (!unit) {
            unit = await Unit.create(user.unit);
        }

        request.unit = user.unit;

        if (unit.approvers.indexOf(user.rank) !== -1) {
            request.status = RequestStatus.APPROVED;
            // TODO : send to external service
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

    static async canApprove(user: IUser, request: IRequest): Promise<boolean> {
        const unit = await Unit.findByName(request.unit);

        return (unit && unit.approvers && unit.approvers.length > 0 && unit.approvers.indexOf(user.rank) !== -1 && unit.name === user.unit);
    }

    static async getMyRequests(user: IUser): Promise<IRequest[]> {
        const requests = await Request.requestRepository.find({
            from: user.id
        });

        return await Request.populateRequestUsers(requests);
    }

    static async getApprovableRequests(user: IUser): Promise<IRequest[]> {
        const unit = await Unit.findByName(user.unit);

        if (!unit || !unit.approvers || unit.approvers.indexOf(user.rank) === -1) {
            return [];
        }

        const requests = await Request.requestRepository.find({
            unit: user.unit,
            $or: [
                { status: RequestStatus.PENDING },
                { status: RequestStatus.WAITING_FOR_INFO }
            ]
        });

        return await Request.populateRequestUsers(requests);
    }

    private static async populateRequestUsers(requests: IRequest[]) {
        const requestUsers = requests.map(req => req.from);

        const usersMap = await UserService.getByIds(requestUsers);

        return requests.map(req => {
            if (usersMap.has(req.from)) {
                req.from = usersMap.get(req.from).name;
            }

            return req;
        })
    }
}