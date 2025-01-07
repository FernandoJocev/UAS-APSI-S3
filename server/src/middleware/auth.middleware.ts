import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private JWTService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (this.JWTService.verify(req.headers.authorization.split(' ')[1])) {
        return next();
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
