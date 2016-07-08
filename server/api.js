'use strict';
import { Router } from 'express';
import { requireLogin } from './helpers/policies.js';
import UserRouter from './user/index.js';
import MeRouter from './me/index.js';

const ApiRouter = Router();

ApiRouter.use('/user', UserRouter);
ApiRouter.use('/me', requireLogin, MeRouter);

export default ApiRouter;
