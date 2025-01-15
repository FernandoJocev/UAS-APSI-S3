import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../test-users/test-users.service';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private JWTService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      if (this.JWTService.verify(token).role === 'admin') {
        return next();
      }

      throw new UnauthorizedException();
    } catch {
      try {
        const admin: UserInterface = jwtDecode(token);

        if (admin.role === 'admin') {
          return next();
        }

        throw new UnauthorizedException();
      } catch {
        throw new UnauthorizedException();
      }
    }
  }
}
