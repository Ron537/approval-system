import { RequestRepository } from './request.repository';
import { IRequest } from './request.interface';
import { Unit } from '../unit/unit';
import { IUser } from '../user/user.interface';
import { RequestStatus } from './request-status.enum';
import { NotPermittedError, NotFoundError } from '../utils/errors/user';
import { UserService } from '../utils/users-service/service';
import { ExternalService } from '../utils/external-services';
import { IUnit } from '../unit/unit.interface';
import { RequestType } from './request-type.enum';

export class Request {
    private static requestRepository: RequestRepository = new RequestRepository();

    static async create(request: IRequest): Promise<IRequest> {
        const user = await UserService.getById(request.from);
        let unit = await Unit.findByName(user.unit);

        if (!unit) {
            unit = await Unit.create(user.unit);
        }

        request.unit = user.unit;

        const req = await Request.requestRepository.create(request);
        await ExternalService.notifyNewRequest(req);

        return req;
    }

    static async changeStatus(requestId: string, user: IUser, status: RequestStatus, additionalInfo?: string): Promise<IRequest> {

        const request = await Request.requestRepository.findById(requestId);

        if (!request) {
            throw new NotFoundError();
        }

        const unit = await Unit.findByName(request.unit);
        const hasApprovePermission = this.hasApprovePermission(user, unit);
        const hasSpecialApprovePermission = this.hasSpecialApprovePermission(user, unit);

        if (!hasApprovePermission && !hasSpecialApprovePermission) {
            throw new NotPermittedError();
        }

        let condition = { _id: request.id };
        let updateExpression = {};

        if (hasApprovePermission && hasSpecialApprovePermission) {
            updateExpression = {
                $set: {
                    'workflow.$[].status': status,
                    'workflow.$[].authorizer': request.from,
                }
            }
        } else if (hasApprovePermission || hasSpecialApprovePermission) {
            condition['workflow.type'] = hasApprovePermission ? RequestType.REGULAR : RequestType.SPECIAL;
            updateExpression = {
                $set: {
                    'workflow.$.status': status,
                    'workflow.$.authorizer': request.from,
                }
            }
        }

        if (additionalInfo && updateExpression['$set']) {
            updateExpression['$set']['additionalInfo'] = additionalInfo;
        }

        const req = await Request.requestRepository.updateOne(condition, updateExpression);
        await ExternalService.notifyStatusChange(req);

        return req;
    }

    private static hasApprovePermission(user: IUser, unit: IUnit) {
        return (unit && unit.approvers && unit.approvers.length > 0 && unit.approvers.indexOf(user.rank) !== -1 && unit.name === user.unit);
    }

    private static hasSpecialApprovePermission(user: IUser, unit: IUnit) {
        return (unit && unit.specialApprovers && unit.specialApprovers.length > 0 && unit.specialApprovers.indexOf(user.id) !== -1);
    }

    static async getMyRequests(user: IUser, search?: string): Promise<IRequest[]> {
        let condition = {
            from: user.id
        } as Object;

        if (search) {
            condition = { id: { $regex: '^' + search }, ...condition };
        }

        const requests = await Request.requestRepository.find(condition);

        return await Request.prepareRequests(requests);
    }

    static async getApprovableRequests(user: IUser, search?: string): Promise<IRequest[]> {
        const unit = await Unit.findByName(user.unit);

        if (!unit) {
            throw new NotFoundError();
        }

        const hasApprovePermission = this.hasApprovePermission(user, unit);
        const hasSpecialApprovePermission = this.hasSpecialApprovePermission(user, unit);

        const regularApproveCondition = {
            unit: user.unit,
            'workflow.type': RequestType.REGULAR,
        };

        const specialApproveCondition = {
            'workflow.type': RequestType.SPECIAL,
        }

        let condition = {
            'workflow.status': {
                $in: [RequestStatus.PENDING, RequestStatus.WAITING_FOR_INFO],
                $nin: [RequestStatus.DENIED],
            }
        } as Object;

        if (!hasApprovePermission && !hasSpecialApprovePermission) {
            return [];
        } else if (hasApprovePermission && hasSpecialApprovePermission) {
            condition['$or'] = [
                regularApproveCondition,
                specialApproveCondition
            ];
        } else if (hasApprovePermission || hasSpecialApprovePermission) {
            condition = { ...condition, ...(hasApprovePermission ? regularApproveCondition : specialApproveCondition) };
        }

        if (search) {
            condition = { id: { $regex: '^' + search }, ...condition };
        }

        const requests = await Request.requestRepository.find(condition);

        return await Request.prepareRequests(requests);
    }

    private static applyStatuses(request: IRequest[]): IRequest[] {
        return request.map(request => {
            const statuses = request.workflow.map(task => task.status);
            let status = RequestStatus.PENDING;

            if (statuses.indexOf(RequestStatus.DENIED) !== -1) {
                status = RequestStatus.DENIED;
            } else if (statuses.indexOf(RequestStatus.WAITING_FOR_INFO) !== -1) {
                status = RequestStatus.WAITING_FOR_INFO;
            } else if (statuses.indexOf(RequestStatus.PENDING) !== -1) {
                status = RequestStatus.PENDING;
            } else if (statuses.indexOf(RequestStatus.APPROVED) !== -1) {
                status = RequestStatus.APPROVED;
            }

            request.status = status;

            return request;
        })
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

    private static prepareRequests(requests: IRequest[]) {
        const requestsWithStatuses = Request.applyStatuses(requests);

        return Request.populateRequestUsers(requestsWithStatuses);
    }
}