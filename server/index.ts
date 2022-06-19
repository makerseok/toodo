import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import mongoose from 'mongoose';
import { MONGO_URL, SESSION_SECRET } from './config/dev';
import { usersRouter } from './routes/users';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

const port = '5000';

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  }),
);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/api/welcome', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`
  ##################################
    Server listening on port: 5000
  ##################################
  `);
});
