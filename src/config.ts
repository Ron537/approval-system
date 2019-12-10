import * as path from "path";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any;

export const config = {
    server: {
        port: process.env.PORT || 80,
    },
    db: {
        connectionString: `mongodb://${process.env.DB_SERVERS || 'localhost:27017'}/${process.env.DB_NAME || 'approval-system'}${process.env.DB_REPLICA_NAME ? `?replicaSet=${process.env.DB_REPLICA_NAME}` : ''}`,
    },
    auth: {
        callbackURL: process.env.AUTH_CALLBACK_URL || 'http://localhost/auth/callback',
        shragaURL: process.env.SHRAGA_URL || 'http://localhost:3000',
        useEnrichId: true,
        secret: 'ApPr0vaL_5ySt3m',
        daysExpires: 3,
    },
    defaultUnitName: 'default',
    spike: {
        options: {
            redisHost: process.env.SPIKE_REDIS_HOST || 'redis://localhost',
            ClientId: process.env.SPIKE_CLIENT_ID || 'VVFG4sMePMkyMVXo9Z_a8NvTv2lwWyyEqhNwpjii',
            ClientSecret: process.env.SPIKE_CLIENT_SECRET || 'esDNkyivgAUQexvUbhintFC0UVnUIYc1wc49TtG4XbhvsXh5CkVO_nxtcM6dp_4dqejBLGWQTEDHABjQBO28vx3TV~EkWuRl0e1S',
            spikeURL: process.env.SPIKE_URL || 'https://51.144.178.121:1337/oauth2/token',
            tokenRedisKeyName: {
                userService: process.env.SPIKE_USER_SERVICE_REDIS_KEY_NAME || 'user-token',
                pushService: process.env.SPIKE_PUSH_SERVICE_REDIS_KEY_NAME || 'push-token'
            },
            spikePublicKeyFullPath: process.env.SPIKE_PUBLIC_KEY_FULL_PATH || path.resolve(__dirname, '../certificate/certificate.pem'),
            useRedis: true,
        },
        scopes: ['write'],
        audiences: {
            app: process.env.SPIKE_APP_AUDIENCE || 'jznKHa4iUVUOpqhBusr~qOrIgGI24y',
            userService: process.env.SPIKE_USER_SERVICE_AUDIENCE || 'kartoffel',
            pushService: process.env.SPIKE_PUSH_SERVICE_AUDIENCE || 'jznKHa4iUVUOpqhBusr~qOrIgGI24y',
        },
    },
    kartoffel: {
        url: process.env.KARTOFFEL_URL || 'http://kartoffel-master.eastus.cloudapp.azure.com:3001/api',
    },
    client: {
        url: process.env.CLIENT_URL || 'http://localhost:4200'
    },
    externalServices: {
        statusService: {
            url: process.env.STATUS_SERVICE_URL || 'http://localhost/api/v1/status',
            statuses: {
                APPROVED: process.env.STATUS_SERVICE_APPROVED_STATUS || 'approved',
                DENIED: process.env.STATUS_SERVICE_DENIED_STATUS || 'denied',
                PENDING: process.env.STATUS_SERVICE_PENDING_STATUS || 'pending',
            }
        },
        pushServiceURL: process.env.PUSH_SERVICE_URL || 'http://localhost/api/v1/push',

    }
}