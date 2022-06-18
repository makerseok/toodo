interface User {
  name: string;
  email: string;
  password: string;
  role: number;
  image?: string;
  tokens?: string;
}

export { User };
