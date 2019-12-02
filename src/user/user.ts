import { UserRepository } from './user.repository';
import { IUser } from './user.interface';

export class User {
    private static userRepository: UserRepository = new UserRepository();

    static create(user: IUser): Promise<IUser> {
        return User.userRepository.create(user);
    }

    static findById(id: string): Promise<IUser> {
        return User.userRepository.findById(id);
    }
}