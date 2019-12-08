import * as mongoose from 'mongoose';
import * as mongooseLeanId from 'mongoose-lean-id';
import { RequestStatus } from './request-status.enum';
import { requestTaskSchema } from './request-task.schema';
import { IRequest } from './request.interface';
import { Unit } from '../unit/unit';
import { RequestType } from './request-type.enum';

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
        },
        workflow: [requestTaskSchema],
    },
    {
        _id: false,
        timestamps: true,
    },
);

requestSchema.plugin(mongooseLeanId);

requestSchema.pre('save', async function (next) {
    this._id = this.id;
    const document = this as any;
    const unitName = document.unit;

    try {
        const unit = await Unit.findByName(unitName);
        const workflow = [];

        if (unit.approvers && Array.isArray(unit.approvers) && unit.approvers.length > 0) {
            workflow.push({ type: RequestType.REGULAR });
        }
        if (unit.specialApprovers && Array.isArray(unit.specialApprovers) && unit.specialApprovers.length > 0) {
            workflow.push({ type: RequestType.SPECIAL });
        }

        document.workflow = workflow;
    } catch (err) {
        console.error(err);

        next(err);
    }
});

export const RequestModel = mongoose.model<IRequest & mongoose.Document>('Request', requestSchema);