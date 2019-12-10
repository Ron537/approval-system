import * as axios from 'axios';
import { IRequest } from '../request/request.interface';
import { config } from '../config';
import { RequestStatus } from '../request/request-status.enum';
import { Spike } from './users-service/spike';

export class ExternalService {

    static async notifyNewRequest(request: IRequest) {
        const result = await axios.default.post(`${config.externalServices.statusService.url}`, {
            ...request,
            status: ExternalService.getStatus(request),
        }).catch(e => undefined);

        return result.data;
    }

    static async notifyStatusChange(request: IRequest) {
        const status = ExternalService.getStatus(request);
        const result = await axios.default.put(`${config.externalServices.statusService.url}/${request.id}`, {
            ...request,
            status
        }).catch(e => undefined);

        if (status === config.externalServices.statusService.statuses.APPROVED) {
            await ExternalService.notifyPushService({ ...request });
        }

        return result.data;
    }

    private static getStatus(request: IRequest): string {
        const { workflow } = request;
        const statuses = workflow.map(task => task.status);
        let status = RequestStatus.PENDING;

        if (statuses.indexOf(RequestStatus.DENIED) !== -1) {
            status = RequestStatus.DENIED;
        } else if (statuses.indexOf(RequestStatus.PENDING) !== -1 || statuses.indexOf(RequestStatus.WAITING_FOR_INFO) !== -1) {
            status = RequestStatus.PENDING;
        } else if (statuses.indexOf(RequestStatus.APPROVED) !== -1) {
            status = RequestStatus.APPROVED;
        }

        return this.convertStatus(status);
    }

    private static convertStatus(status: RequestStatus): string {
        switch (status) {
            case RequestStatus.APPROVED:
                return config.externalServices.statusService.statuses.APPROVED;
            case RequestStatus.DENIED:
                return config.externalServices.statusService.statuses.DENIED;
            default:
                return config.externalServices.statusService.statuses.PENDING;
        }
    }

    static async notifyPushService(request: IRequest) {
        const token = await Spike.getPushServiceToken();
        const result = await axios.default.post(`${config.externalServices.pushServiceURL}`, {
            request
        }, {
            headers: {
                Authorization: token
            }
        }).catch(e => undefined);

        return result.data;
    }
}