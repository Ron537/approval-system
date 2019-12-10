import * as mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
}, {
    _id: false,
});

adminSchema.pre('save', function() {
    this._id = this.id;
});

export const AdminModel = mongoose.model<{id: string} & mongoose.Document>('Admin', adminSchema);