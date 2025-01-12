import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Post,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.singIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/verify')
  verifyToken(@Headers('Authorization') token: string) {
    return this.authService.verifyToken(token.split(' ')[1]);
  }
}
