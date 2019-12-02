export const config = {
    server: {
        port: 3000,
    },
    db: {
        connectionString: `mongodb://${process.env.DB_SERVERS || 'localhost:27017'}/${process.env.DB_NAME || 'approval-system'}${process.env.DB_REPLICA_NAME ? `?replicaSet=${process.env.DB_REPLICA_NAME}` : ''}`,
    },
    auth: {
        callbackURL: '',
        shragaURL: '',
        useEnrichId: false,
        secret: 'ApPr0vaL_5ySt3m'
    },
    defaultUnitName: 'default'
}