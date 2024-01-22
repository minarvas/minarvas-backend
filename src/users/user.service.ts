import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserResponse } from './responses/user.response';
import { User, UserDocument } from './schemas/user.schema';
import { UserProfileService } from './services/user-profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userProfileService: UserProfileService,
  ) {}

  async createUser(args: CreateUserDTO): Promise<UserResponse> {
    const { provider, email } = args;
    const profile = await this.userProfileService.generateName();
    const user = await this.userModel.create({ email, accounts: [{ provider }], ...profile });
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
