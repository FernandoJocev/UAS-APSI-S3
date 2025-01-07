import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TestUsersModule } from 'src/test-users/test-users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTSecret } from './constants';

@Module({
  imports: [
    TestUsersModule,
    JwtModule.register({
      global: true,
      secret: JWTSecret,
      signOptions: { expiresIn: '60min' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
