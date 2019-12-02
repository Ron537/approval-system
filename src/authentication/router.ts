import { Router } from 'express';
import { AuthenticationHandler } from './handler';

const AuthenticationRouter = Router();

AuthenticationRouter.get('/login', AuthenticationHandler.authenticate(), (req, res) => res.status(200).json(req.user));
AuthenticationRouter.all('/callback', AuthenticationHandler.authenticate(), (req, res) => res.status(200).json(req.user));

export { AuthenticationRouter };