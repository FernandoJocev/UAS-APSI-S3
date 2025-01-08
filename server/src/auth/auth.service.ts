import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TestUsersService } from '../test-users/test-users.service';
import { JwtService } from '@nestjs/jwt';
import { JWTSecret } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private findUser: TestUsersService,
    private JwtService: JwtService,
  ) {}

  async singIn(email: string, password: string): Promise<any> {
    const user = await this.findUser.findOne(email);

    if (user != null) {
      try {
        if (user.password !== password) {
          throw new UnauthorizedException();
        }

        return {
          access_token: await this.JwtService.signAsync(user, {
            secret: JWTSecret,
          }),
        };
      } catch (e) {
        throw new e();
      }
    }

    return 'User Tidak Ditemukan';
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const verify = await this.JwtService.verifyAsync(token);

      return verify;
    } catch {
      throw new Error();
    }
  }
}
