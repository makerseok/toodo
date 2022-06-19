import express from 'express';
import User from '../models/User';
import {
  ILogin,
  ITypedRequestBody,
  IUser,
  ITypedRequestSession,
} from '../types/IUser';

const usersRouter = express.Router();

usersRouter.post(
  '/login',
  async (
    req: ITypedRequestBody<ILogin> &
      ITypedRequestSession<{ user: Omit<IUser, 'password'> }>,
    res: express.Response,
  ) => {
    const user = await User.findByEmail(req.body?.email);
    if (user) {
      if (req.body?.password) {
        if (await user.checkPassword(req.body?.password)) {
          req.session.user = {
            name: user.name,
            email: user.email,
            role: user.role,
          };
          req.session.save();
          res.send({ ...req.session, success: true });
        } else {
          res.send('wrong password!');
        }
      } else {
        res.send('please input password');
      }
    } else {
      res.send('email not exist');
    }
  },
);

usersRouter.get('/logout', (req, res) => {
  req.session.destroy(err => console.log(err));
});

usersRouter.post(
  '/register',
  async (req: ITypedRequestBody<IUser>, res: express.Response) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save((err, userInfo) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
      });
    });
  },
);

export { usersRouter };
