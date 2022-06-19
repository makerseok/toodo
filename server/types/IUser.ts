import session from 'express-session';

interface IUser {
  name: string;
  email: string;
  password: string;
  role: number;
  image?: string;
  tokens?: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface ITypedRequestBody<T> extends Express.Request {
  body: T;
}

interface ITypedRequestSession<T> extends Express.Request {
  session: session.Session & Partial<session.SessionData & T>;
}

export { IUser, ILogin, ITypedRequestBody, ITypedRequestSession };
