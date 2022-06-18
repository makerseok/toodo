import express from 'express';
import User from '../models/User';
import { ILogin, ITypedRequestBody, IUser } from '../types/IUser';

const usersRouter = express.Router();

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
