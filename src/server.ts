import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { config } from './config';
import { AppRouter } from './router';
import { userErrorHandler, serverErrorHandler, unknownErrorHandler } from './utils/errors/handler';
import { AuthenticationHandler } from './authentication/handler';
import { AuthenticationRouter } from './authentication/router';

export class Server {
    public app: express.Application;
    private server: http.Server;

    public static bootstrap(): Server {
        return new Server();
    }

    private constructor() {
        this.app = express();
        this.configureMiddlewares();
        this.app.use('/api/v1', AppRouter);
        this.initializeAuthenticator();
        this.initializeErrorHandler();
        this.server = http.createServer(this.app);
        this.server.listen(config.server.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} environment on port ${config.server.port}`)
        });
    }

    public close() {
        this.server.close();
    }

    private configureMiddlewares() {
        this.app.use(helmet());

        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            const origin = req.headers.origin as string;

            // if (config.cors.allowedOrigins.indexOf(origin) !== -1) {
            //     res.setHeader('Access-Control-Allow-Origin', origin);
            // }
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');

            // if (req.method === 'OPTIONS') {
            //     return res.status(200).end(); 
            // }

            return next();
        });

        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
        }

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(session({
            secret: config.auth.secret,
            resave: false,
            saveUninitialized: true
        }));
    }

    private initializeErrorHandler() {
        this.app.use(userErrorHandler);
        this.app.use(serverErrorHandler);
        this.app.use(unknownErrorHandler);
    }

    private initializeAuthenticator() {
        AuthenticationHandler.initialize(this.app);
        this.app.use('/auth/', AuthenticationRouter);
    }
}
