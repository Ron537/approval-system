import * as mongoose from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        _id: {
            type: String,
            required: true,
        },
        mail: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        rank: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    {
        versionKey: false,
        id: true,
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
)

userSchema.virtual('id').set(function (this: IUser & mongoose.Document, id: string) {
    this._id = id;
});

export const UserModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);
