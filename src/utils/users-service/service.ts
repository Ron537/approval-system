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

    static async getByIds(ids: string[]): Promise<Map<string, IUser>> {
        const uniqueIds = Array.from(new Set(ids));
        const userPromises = uniqueIds.map(id => UserService.getById(id).catch(e => undefined));
        const users = await Promise.all(userPromises);
        const usersMap: Map<string, IUser> = new Map();
        users.forEach((user: IUser) => {
            if (user) {
                usersMap.set(user.id, user);
            }
        });

        return usersMap;
    }

    static async search(term: string) {
        const token = await Spike.getToken();

        const params = new URLSearchParams();
        params.append('fullname', term);

        const result = await axios.default.get(`${config.kartoffel.url}/persons/search`, {
            headers: {
                Authorization: token
            },
            params
        });

        const data = result.data && Array.isArray(result.data) ? result.data : [];

        return data.map(usr => ({id: usr.id, name: usr.fullName}));
    }
}