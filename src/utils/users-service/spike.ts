import * as getTokenCreator from 'spike-get-token';
import { config } from '../../config';

export class Spike {
    static getToken = getTokenCreator(config.spike.options);
}