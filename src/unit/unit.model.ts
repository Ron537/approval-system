import * as mongoose from 'mongoose';
import * as mongooseLeanId from 'mongoose-lean-id';
import { IUnit } from './unit.interface';
const unitSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        approvers: [{
            type: String
        }],
        specialApprovers: {
            type: [{
                type: String
            }],
            default: [],
        }
    },
    {
        id: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        }
    }
);

unitSchema.plugin(mongooseLeanId);

export const UnitModel = mongoose.model<IUnit & mongoose.Document>('Unit', unitSchema);