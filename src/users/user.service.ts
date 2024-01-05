import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { UserResponse } from './responses/user.response';

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

  async getUser(userId: Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(userId);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async updateUser(userId: Types.ObjectId, dto: UpdateUserDTO): Promise<UserResponse> {
    const user: UserDocument = await this.userModel.findOneAndUpdate<UserDocument>({ _id: userId }, dto, { new: true });
    return new UserResponse(user);
  }
}
