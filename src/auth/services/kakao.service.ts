import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetKakaoProfileDTO, KakaoProfile, KakaoTokenInfo } from '../dto/kakao.dto';

@Injectable()
export class KakaoService {
  private readonly logger = new Logger(KakaoService.name);

  constructor(private readonly httpService: HttpService) {}

  async getKakaoProfile(dto: GetKakaoProfileDTO): Promise<KakaoProfile> {
    const tokenInfo = await this.getKakaoToken(dto);
    const observable = this.httpService.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return (await firstValueFrom(observable)).data;
  }

  async getKakaoToken(dto: GetKakaoProfileDTO): Promise<KakaoTokenInfo> {
    try {
      console.log({
        grant_type: 'authorization_code',
        client_id: dto.clientId,
        redirect_uri: dto.redirectUri,
        code: dto.code,
        client_secret: dto.clientSecret,
      });
      const observable = this.httpService.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: dto.clientId,
          redirect_uri: dto.redirectUri,
          code: dto.code,
          client_secret: dto.clientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            Accept: 'application/json',
          },
        },
      );

      return (await firstValueFrom(observable)).data;
    } catch (err) {
      this.logger.error('Fail to get kakao token', err);
      throw err;
    }
  }
}
