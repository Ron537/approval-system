import * as axios from 'axios';
import { IRequest } from '../request/request.interface';
import { config } from '../config';
import { RequestStatus } from '../request/request-status.enum';

export class ExternalService {

    static async notifyStatusService(request: IRequest) {
        const result = await axios.default.post(`${config.externalServices.statusService.url}`, {
            ...request,
            status: ExternalService.convertStatus(request.status),
        }).catch(e => undefined);

        return result.data;
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
        const result = await axios.default.post(`${config.externalServices.pushServiceURL}`, {
            request
        }).catch(e => undefined);

        return result.data;
    }
}