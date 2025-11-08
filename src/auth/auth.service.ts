import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { checkPassword } from 'src/common/helpers/hash-password';
import { SignInDto } from './dto/signin.dto';
import { User } from 'src/user/entities/user.entity';
import { httpBadRequest } from 'src/common/helpers/http-response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByUsername(signInDto.username);
    const isActive = user?.isActive;
    const isValidPass = await checkPassword(
      signInDto.password,
      user?.password || '',
    );

    if (!isActive || !isValidPass) {
      throw httpBadRequest('Invalid username or password');
    }

    const payload = this.generatePayload(user);
    return { access_token: await this.jwtService.signAsync(payload) };
  }
  async validateUser(id: string) {
    return await this.userService.findByUserId(id);
  }

  generatePayload(user: User) {
    return {
      sub: user.id,
      username: user.username,
    };
  }
}
