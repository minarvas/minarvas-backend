import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { UserProvider } from '../users/enums/user-provider.enum';
import { ConfigService } from '@nestjs/config';
import { AuthUrlResponse } from './responses/auth-url.response';
import { KakaoRedirectInput } from './inputs/auth-kakao.input';
import { KakaoService } from './services/kakao.service';
import { JwtTokenGenerator } from './services/jwt-token.service';
import { JwtToken } from './dto/jwt.dto';
import { AuthenticatedUser } from './dto/auth.dto';
import { JwtAuth } from './interfaces/auth.interface';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateUserDTO } from '../users/dto/user.dto';
import { UserResponse } from '../users/responses/user.response';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly kakaoClientId: string;
  private readonly kakaoRedirectUrl: string;
  private readonly kakaoSecret: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenGenerator: JwtTokenGenerator,
    private readonly configService: ConfigService,
    private readonly kakaoService: KakaoService,
  ) {
    this.kakaoClientId = this.configService.get<string>('KAKAO_CLIENT_ID');
    this.kakaoRedirectUrl = this.configService.get<string>('KAKAO_REDIRECT_URI');
    this.kakaoSecret = this.configService.get<string>('KAKAO_SECRET');
  }

  async socialSignup(payload: CreateUserDTO) {
    const isExistUser = await this.userService.isExistUser(payload.email);
    if (isExistUser) {
      this.logger.log(`Login social user: ${payload.email}`);
      return await this.loginSocialUser(payload);
    }

    this.logger.log(`Register social user: ${payload.email}`);
    return await this.registerSocialUser(payload);
  }

  async registerSocialUser(payload: CreateUserDTO) {
    const user: UserDocument = await this.userService.createUser(payload);
    const jwtToken: JwtToken = this.jwtTokenGenerator.sign(user.id);
    return new AuthenticatedUser({ ...user, ...jwtToken });
  }

  async loginSocialUser(payload: CreateUserDTO) {
    const user: UserDocument = await this.userService.getUserByEmail(payload.email);
    const jwtToken: JwtToken = this.jwtTokenGenerator.sign(user.id);
    return new AuthenticatedUser({ ...user, ...jwtToken });
  }

  async getAuthUrl(provider: UserProvider): Promise<AuthUrlResponse> {
    let url: string = null;

    if (provider === UserProvider.KAKAO)
      url = `https://kauth.kakao.com/oauth/authorize?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoRedirectUrl}&response_type=code`;

    return new AuthUrlResponse(url);
  }

  async signupByKakao(query: KakaoRedirectInput): Promise<JwtAuth> {
    const profile = await this.kakaoService.getKakaoProfile({
      code: query.code,
      redirectUri: this.kakaoRedirectUrl,
      clientId: this.kakaoClientId,
      clientSecret: this.kakaoSecret,
    });

    const {
      _id: userId,
      accessToken,
      refreshToken,
    } = await this.socialSignup({
      email: profile.kakao_account.email,
      name: profile.kakao_account.profile.nickname,
      provider: UserProvider.KAKAO,
    });

    await this.userService.updateUser(userId, { refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    const jwtToken: JwtToken = this.jwtTokenGenerator.refresh(refreshToken);
    const user: UserResponse = await this.userService.getUser(jwtToken.userId);
    return { user, jwtToken };
  }
}
