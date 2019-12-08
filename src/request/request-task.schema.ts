import { Schema } from 'mongoose';
import { RequestStatus } from './request-status.enum';
import { RequestType } from './request-type.enum';

export const requestTaskSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: Object.keys(RequestType),
    },
    status: {
        type: String,
        default: RequestStatus.PENDING,
        enum: Object.keys(RequestStatus),
    },
    authorizer: {
        type: String,
    }
}, {
    _id: false,
});