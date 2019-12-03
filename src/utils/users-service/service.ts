import * as axios from 'axios';
import { Spike } from './spike';
import { config } from '../../config';
import { IUser } from '../../user/user.interface';

export class UserService {

    static async getById(id: string) {
        const token = await Spike.getToken();
        const result = await axios.default.get(`${config.kartoffel.url}/persons/${id}`, {
            headers: {
                Authorization: token
            }
        });

        const data = result.data;

        const user: IUser = {
            id: data.id,
            name: data.fullName,
            rank: data.rank,
            unit: data.currentUnit,
        };

        return user;
    }
}