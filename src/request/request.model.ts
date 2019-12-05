import * as mongoose from 'mongoose';
import { RequestStatus } from './request-status.enum';
import { IRequest } from './request.interface';

const toSchema: mongoose.Schema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        _id: false,
    }
);

const requestSchema: mongoose.Schema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        id: String,
        status: {
            type: String,
            enum: Object.keys(RequestStatus),
            default: RequestStatus.PENDING,
            required: true,
        },
        fileId: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        to: [toSchema],
        unit: {
            type: String,
            required: true,
        },
        info: {
            type: String
        },
        authorizer: {
            type: String,
        },
        classification: {
            type: String,
            required: true,
        }
    },
    {
        _id: false,
        timestamps: true,
    },
);

requestSchema.pre('save', function () {
    this._id = this.id;
});

export const RequestModel = mongoose.model<IRequest & mongoose.Document>('Request', requestSchema);