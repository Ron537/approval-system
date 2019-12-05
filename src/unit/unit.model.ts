import * as mongoose from 'mongoose';
import { IUnit } from './unit.interface';

const unitSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        approvers: [{
            type: String
        }]
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

export const UnitModel = mongoose.model<IUnit & mongoose.Document>('Unit', unitSchema);