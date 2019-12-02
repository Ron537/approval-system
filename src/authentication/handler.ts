import { Application, Request, Response } from "express";
import * as passport from 'passport';
import { Strategy } from 'passport-shraga';
import { config } from '../config';
import { User } from '../user/user';

export class AuthenticationHandler {
    static initialize(app: Application) {
        app.use(passport.initialize());

        passport.serializeUser(AuthenticationHandler.serialize);
        passport.deserializeUser(AuthenticationHandler.deserialize);

        passport.use(new Strategy(config.auth, (profile, done) => {
            console.log(profile);

            done(null, profile);
        }));

        return passport.initialize();
    }

    static handleUser(req:Request, res:Response){
        
    }

    static authenticate() {
        return passport.authenticate('shraga', {
            failureRedirect: '/failed',
            failureFlash: true
        });
    }

    private static serialize(user: { id: string }, done: (err?: Error, id?: string) => void) {
        done(undefined, user.id);
    }

    private static async deserialize(id: string, done: (err?: Error, user?: any) => void) {
        try {
            const user = await User.findById(id.toLowerCase());
            done(undefined, user);
        } catch (err) {
            done(err, null);
        }
    }
}