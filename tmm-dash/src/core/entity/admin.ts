import { User } from './user'

export interface Admin extends User {
  uid: string;
  name: string;
  email: string;
  role: 'ADMIN';
  pass: string;
}
