import express, { NextFunction, Request, Response } from 'express';

const app = express();

const port = '5000';

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
