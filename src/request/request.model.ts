import * as mongoose from 'mongoose';
import { RequestStatus } from './request-status.enum';
import { IRequest } from './request.interface';

const requestSchema: mongoose.Schema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: Object.keys(RequestStatus),
            default: RequestStatus.PENDING,
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        }
    },
    {
        id: true,
        timestamps: true,
    },
);

export const RequestModel = mongoose.model<IRequest & mongoose.Document>('Request', requestSchema);