import * as mongoose from 'mongoose';
import { RequestStatus } from './request-status.enum';
import { IRequest } from './request.interface';

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
        fileUrl: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        to: [{
            type: String,
            required: true,
        }],
        unit: {
            type: String,
            required: true,
        }
    },
    {
        _id: false,
        timestamps: true,
    },
);

requestSchema.pre('save', function() {
    this._id = this.id;
});

export const RequestModel = mongoose.model<IRequest & mongoose.Document>('Request', requestSchema);