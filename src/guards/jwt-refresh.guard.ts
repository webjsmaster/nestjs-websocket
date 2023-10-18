import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.body.refreshToken) {
      throw new UnauthorizedException(['RefreshToken should not be empty']);
    }
    try {
      const user = this.jwtService.verify(req.body.refreshToken);
      req.user = user;
      return true;
    } catch (error) {
      throw new ForbiddenException('RefreshToken no valid');
    }
  }
}
