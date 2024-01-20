import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserResponse } from './responses/user.response';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(args: CreateUserDTO): Promise<UserDocument> {
    const { provider, ...basicInfo } = args;
    return await this.userModel.create({ ...basicInfo, accounts: [{ provider }] });
  }

  async isExistUser(email: string): Promise<boolean> {
    const user = await this.userModel.exists({ email });
    return !!user;
  }

  async getUser(userId: string): Promise<UserResponse> {
    const user: UserDocument = await this.userModel.findById(userId);
    return new UserResponse(user);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async updateUser(userId: Types.ObjectId, dto: UpdateUserDTO): Promise<UserResponse> {
    const user: UserDocument = await this.userModel.findOneAndUpdate<UserDocument>({ _id: userId }, dto, { new: true });
    return new UserResponse(user);
  }
}
