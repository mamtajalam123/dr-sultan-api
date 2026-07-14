export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}


export const users: IUser[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@gmail.com",
    password:
      "$2b$10$wH9Kqk6K8kR2wZ0Yf5X8UO6W0W6q5qY7hY7z7vF7vQ1vV8Vx",
    role: "admin"
  }
];