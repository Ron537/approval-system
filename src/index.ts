import * as mongoose from 'mongoose';
import { Server } from './server';
import { config } from './config';

process.on('uncaughtException', (err: Error) => {
    console.log('Unhandled Exception', err.message);
    process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
    console.log('Unhandled Rejection', err.message);
    process.exit(1);
});

process.on('SIGINT', async () => {
    try {
        console.log('User Termination - application was terminated by the user (SIGINT event)');
        await mongoose.disconnect();

        process.exit(0);
    } catch (error) {
        console.log('Connection error - failed to close connection', error.message);
    }
});

(async () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connection.on('connecting', () => {
        console.log('[MongoDB] connecting...');
    });

    mongoose.connection.on('connected', () => {
        console.log('[MongoDB] connected');
    });

    mongoose.connection.on('error', (error) => {
        console.log('[MongoDB] error');
        console.log(error);

        process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('[MongoDB] disconnected');

        process.exit(1);
    });

    mongoose.connection.on('reconnected', function () {
        console.log('[MongoDB] reconnected');
    });

    await mongoose.connect(
        config.db.connectionString,
        { useNewUrlParser: true },
    );


    const server: Server = Server.bootstrap();

    server.app.on('close', () => {
        mongoose.disconnect();
        console.log('Server closed');
    });
})();
