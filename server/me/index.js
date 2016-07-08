'use strict';
import { Router } from 'express';

const MeRouter = Router();

MeRouter.get('/', (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    admin: req.user.admin
  });
});

export default MeRouter;
