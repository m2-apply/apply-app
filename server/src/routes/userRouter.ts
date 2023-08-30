import express from 'express';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/login', (req, res) => {
  console.log('hit');
  res.send('Success!');
});
// Generate auth url

userRouter.post('/login', userController.generateAuthUrl, (req, res) => {
  console.log('hit');
  res.status(200).json(res.locals.url);
});

userRouter.get('/signup', (req, res) => {});

userRouter.get('/logout', (req, res) => {});

export default userRouter;
