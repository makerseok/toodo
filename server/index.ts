import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import mongoose from 'mongoose';
import { MONGO_URL } from './config/dev';

const app = express();

const port = '5000';

app.use(urlencoded({ extended: true }));
app.use(json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/api/welcome', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

app.listen(port, () => {
  console.log(`
  ##################################
    Server listening on port: 5000
  ##################################
  `);
});
