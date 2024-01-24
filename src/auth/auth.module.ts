import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtTokenGenerator } from './services/jwt-token.service';
import { KakaoService } from './services/kakao.service';

@Module({
  imports: [UserModule, JwtModule.register({ global: true }), HttpModule],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, KakaoService, JwtTokenGenerator],
})
export class AuthModule {}
