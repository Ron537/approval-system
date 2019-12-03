import { Router } from 'express';
import { AuthenticationHandler } from './handler';

const AuthenticationRouter = Router();

AuthenticationRouter.get('/login', AuthenticationHandler.authenticate(), (req, res) => res.status(200).json(req.user));
AuthenticationRouter.post('/callback', AuthenticationHandler.authenticate(), (req, res) => res.redirect('/'));

export { AuthenticationRouter };