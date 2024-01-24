import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { KakaoRedirectInput } from './inputs/auth-kakao.input';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly clientRedirectionUrl: string;

  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    this.clientRedirectionUrl = `${this.configService.get<string>('CLIENT')}/auth`;
  }

  @Get('kakao/callback')
  async authKakao(@Query() query: KakaoRedirectInput, @Res() res: Response) {
    this.logger.log(`Client redirection url: ${this.clientRedirectionUrl}`);
    const { accessToken, refreshToken } = await this.authService.signupByKakao(query);
    res.redirect(`${this.clientRedirectionUrl}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }
}
