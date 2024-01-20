import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserResponse } from './responses/user.response';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(args: CreateUserDTO): Promise<UserResponse> {
    const { provider, ...basicInfo } = args;
    const user = await this.userModel.create({ ...basicInfo, accounts: [{ provider }] });
    return new UserResponse(user);
  }

  async isExistUser(email: string): Promise<boolean> {
    const user = await this.userModel.exists({ email });
    return !!user;
  }

  async getUser(userId: string): Promise<UserResponse> {
    const user: User = await this.userModel.findById<User>(userId);
    return new UserResponse(user);
  }

  async getUserByEmail(email: string): Promise<UserResponse> {
    const user = await this.userModel.findOne({ email });
    return new UserResponse(user);
  }

  async updateUser(userId: string, dto: UpdateUserDTO): Promise<UserResponse> {
    const user: UserDocument = await this.userModel.findOneAndUpdate<UserDocument>({ _id: userId }, dto, { new: true });
    return new UserResponse(user);
  }
}
