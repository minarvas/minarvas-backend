import { IAccount } from './account.interface';
import { IBase } from '../../common/interfaces/base.interface';

export interface IUser extends IBase {
  email: string;
  name: string;
  lastLoginTime: Date;
  refreshToken?: string | null;
  accounts: IAccount[];
}
