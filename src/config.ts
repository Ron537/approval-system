import * as path from "path";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any;

export const config = {
    server: {
        port: 80,
    },
    db: {
        connectionString: `mongodb://${process.env.DB_SERVERS || 'localhost:27017'}/${process.env.DB_NAME || 'approval-system'}${process.env.DB_REPLICA_NAME ? `?replicaSet=${process.env.DB_REPLICA_NAME}` : ''}`,
    },
    auth: {
        callbackURL: 'http://localhost/auth/callback',
        shragaURL: 'http://localhost:3000',
        useEnrichId: true,
        secret: 'ApPr0vaL_5ySt3m',
        daysExpires: 3,
    },
    defaultUnitName: 'default',
    userService: {
        endpoint: 'http://localhost/us',
        token: 'TOKEN'
    },
    spike: {
        options: {
            redisHost: 'redis://localhost',
            ClientId: 'VVFG4sMePMkyMVXo9Z_a8NvTv2lwWyyEqhNwpjii',
            ClientSecret: 'esDNkyivgAUQexvUbhintFC0UVnUIYc1wc49TtG4XbhvsXh5CkVO_nxtcM6dp_4dqejBLGWQTEDHABjQBO28vx3TV~EkWuRl0e1S',
            spikeURL: 'https://51.144.178.121:1337/oauth2/token',
            tokenRedisKeyName: 'token',
            spikePublicKeyFullPath: path.resolve(__dirname, '../certificate/certificate.pem'),
            useRedis: true,
        }
    },
    kartoffel: {
        url: 'http://kartoffel-master.eastus.cloudapp.azure.com:3001/api',
    }
}