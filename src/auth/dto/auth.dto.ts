import { JwtAuth } from '../interfaces/auth.interface';
import { IUser } from '../../users/interfaces/user.interface';
import { IAccount } from '../../users/interfaces/account.interface';
import { Types } from 'mongoose';

export class AuthenticatedUser implements JwtAuth, IUser {
  _id: Types.ObjectId;
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
