import express from 'express';

const userRouter = express.Router();

userRouter.get('/login', (req, res) => {});

userRouter.get('/signup', (req, res) => {});

userRouter.get('/logout', (req, res) => {});

export default userRouter;
