import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoRedirectInput } from './inputs/auth-kakao.input';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private readonly host: string;
  private readonly clientRedirectionUrl: string;
  private readonly serviceEnv;

  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    this.host = this.configService.get<string>('HOST');
    this.clientRedirectionUrl = this.configService.get<string>('CLIENT');
    this.serviceEnv = this.configService.get<string>('SERVICE_ENV');
    console.log(this.serviceEnv);
  }

  @Get('kakao/callback')
  async authKakao(@Query() query: KakaoRedirectInput, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.signupByKakao(query);

    res
      .cookie('Refresh-Token', refreshToken, {
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: true,
      })
      .header('Access-Control-Expose-Headers', 'Access-Token, Refresh-Token')
      .header('Access-Control-Allow-Credentials', 'true')
      .header('Access-Control-Allow-Origin', this.host)
      .redirect(`${this.clientRedirectionUrl}?accessToken=${accessToken}`);
  }
}
