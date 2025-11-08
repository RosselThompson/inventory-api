import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secrets.accessToken'),
    });
  }

  async validate(payload: any) {
    if (!payload.sub) {
      return null;
    }
    const response = await this.authService.validateUser(payload.sub);
    return {
      id: response.id,
      username: response.username,
      email: response.email,
      businessId: response.business.id,
    };
  }
}
