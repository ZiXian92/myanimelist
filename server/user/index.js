'use strict';
import { Router } from 'express';
import { hash } from 'bcrypt';
import UserModel from './model.js';

const UserRouter = Router();
const SALTROUNDS = 10;

UserRouter.post('/', (req, res) => {
  let userData = req.body;
  if(!userData || !userData || !userData.password) res.sendStatus(400);
  else hash(userData, SALTROUNDS, (err, h) => {
    userData.password = h;
    UserModel.addUser(userData).then(result => res.sendStatus(200), err => res.sendStatus(500));
  });
});

export default UserRouter;
