import { Repository } from '../utils/repository';
import { IUser } from './user.interface';
import { UserModel } from './user.model';

export class UserRepository extends Repository<IUser>{
    constructor() {
        super(UserModel);
    }
}