import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (email != '' && password != '') {
      const user = await this.findUser.findOne(email);

      if (user != null) {
        if (user.password !== password) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Email atau password anda salah!',
            },
            HttpStatus.BAD_REQUEST,
            {
              cause: 'Email atau password anda salah!',
            },
          );
        }

        return {
          access_token: await this.JwtService.signAsync(user, {
            secret: JWTSecret,
          }),
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Email atau password anda salah!',
          },
          HttpStatus.UNAUTHORIZED,
          {
            cause: 'Email atau password anda salah!',
          },
        );
      }
    } else if (email === '' || password === '') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email atau password tidak boleh kosong!',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'Email atau password tidak boleh kosong!',
        },
      );
    } else {
      throw new Error();
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const verify = this.JwtService.verify(token);

      return verify;
    } catch {
      throw new Error();
    }
  }
}
