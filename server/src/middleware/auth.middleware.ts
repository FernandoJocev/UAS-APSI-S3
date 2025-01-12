import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private JWTService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (jwtDecode(token) || this.JWTService.verify(token)) {
        return next();
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
