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

export { IUser, ILogin, ITypedRequestBody };
