import { IAccount } from '../../users/interfaces/account.interface';
import { IUser } from '../../users/interfaces/user.interface';
import { JwtAuth } from '../interfaces/auth.interface';

export class AuthenticatedUser implements JwtAuth, IUser {
  id: string;
  email: string;
  name: string;
  lastLoginTime: Date;
  accessToken: string;
  refreshToken: string;
  accounts: IAccount[];
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<AuthenticatedUser>) {
    Object.assign(this, partial);
  }
}
