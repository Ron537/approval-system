import {AdminModel} from './admin.model';

export class Admin {
    static async isAdmin(userId:string) {
        const admin = await AdminModel.findById(userId).exec();

        return !!admin;
    }
}