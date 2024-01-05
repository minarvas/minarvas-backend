import { JwtAuth } from '../interfaces/auth.interface';
import { Types } from 'mongoose';

export class JwtToken implements JwtAuth {
  userId: Types.ObjectId;
  accessToken: string;
  refreshToken: string;
}

export class JwtPayload {
  userId: Types.ObjectId;
}
