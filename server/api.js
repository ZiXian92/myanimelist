'use strict';
import { Router } from 'express';
import UserRouter from './user/index.js';

const ApiRouter = Router();

ApiRouter.use('/user', UserRouter);

export default ApiRouter;
