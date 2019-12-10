import * as getTokenCreator from 'spike-get-token';
import { config } from '../../config';

export class Spike {
    static getUserServiceToken =
        getTokenCreator({
            ...config.spike.options,
            tokenRedisKeyName: config.spike.options.tokenRedisKeyName.userService,
            tokenAudience: config.spike.audiences.userService
        });

    static getPushServiceToken =
        getTokenCreator({
            ...config.spike.options,
            tokenRedisKeyName: config.spike.options.tokenRedisKeyName.pushService,
            tokenAudience: config.spike.audiences.pushService
        });
}