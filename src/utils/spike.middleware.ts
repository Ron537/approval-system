import { config } from '../config';
const { getSpikeAuthMiddleWare } = require("spike-auth-middleware");

const configuration = {
    audience: config.spike.audience,
    allowedScopes: config.spike.scopes,
    pathToPublicKey: config.spike.options.spikePublicKeyFullPath,
};

export const spikeMiddleware = getSpikeAuthMiddleWare(configuration);