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
        secret: 'ApPr0vaL_5ySt3m'
    },
    defaultUnitName: 'default'
}