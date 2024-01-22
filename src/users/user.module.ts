import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserProfileService } from './services/user-profile.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserResolver, UserService, UserProfileService],
  exports: [UserService],
})
export class UserModule {}
