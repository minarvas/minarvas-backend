import { UserProvider } from '../enums/user-provider.enum';
import { IBase } from '../../common/interfaces/base.interface';

export interface IAccount extends IBase {
  provider: UserProvider;
}
