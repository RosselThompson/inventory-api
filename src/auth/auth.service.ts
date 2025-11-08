import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { checkPassword } from 'src/common/helpers/hash-password';
import { SignInDto } from './dto/signin.dto';
import { User } from 'src/user/entities/user.entity';
import { httpBadRequest } from 'src/common/helpers/http-response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByUsername(signInDto.username);
    const isActive = user?.isActive;
    const isVerified = user?.isVerified;
    const isValidPass = await checkPassword(
      signInDto.password,
      user?.password || '',
    );

    if (!isActive || !isValidPass || !isVerified) {
      throw httpBadRequest('Invalid username or password');
    }

    const tokens = this.generateTokens(user);
    return tokens;
  }
  async validateUser(id: string) {
    return await this.userService.findByUserId(id);
  }

  generatePayload(user: User) {
    return {
      sub: user.id,
      username: user.username,
      email: user.email,
      businessId: user.business.id,
    };
  }

  async generateTokens(user: User) {
    const payload = this.generatePayload(user);
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: this.configService.get<string>('jwt.secrets.accessToken'),
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      {
        expiresIn: '8h',
        secret: this.configService.get<string>('jwt.secrets.refreshToken'),
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
