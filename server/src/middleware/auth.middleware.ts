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
    const token = req.headers.authorization.split(' ')[1];

    try {
      if (this.JWTService.verify(token)) {
        return next();
      }
    } catch {
      try {
        if (jwtDecode(token)) {
          return next();
        }
      } catch {
        throw new UnauthorizedException();
      }
    }
  }
}
