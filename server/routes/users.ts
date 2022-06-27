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
          res.json({ ...req.session, success: true });
        } else {
          res.json({
            success: false,
            message: '비밀번호가 올바르지 않습니다.',
          });
        }
      } else {
        res.json({ success: false, message: '비밀번호를 입력해주세요.' });
      }
    } else {
      res.json({
        success: false,
        message: '해당하는 이메일이 존재하지 않습니다.',
      });
    }
  },
);

usersRouter.get('/logout', (req, res) => {
  req.session.destroy(err => console.log(err));
  res.json({ success: true });
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

usersRouter.get(
  '/auth',
  (
    req: ITypedRequestSession<{ user: Omit<IUser, 'password'> }>,
    res: express.Response,
  ) => {
    if (req.session?.user) {
      return res.json({ auth: true, user: req.session.user });
    } else {
      return res.json({ auth: false });
    }
  },
);

export { usersRouter };
