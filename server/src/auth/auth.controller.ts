import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Post,
  Get,
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
  verifyToken(@Body() req: Record<string, any>) {
    return this.authService.verifyToken(req.token);
  }
}
