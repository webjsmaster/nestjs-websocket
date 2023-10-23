import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class ClosedAccessGuard implements CanActivate {
  canActivate(): null {
    return null;
  }
}
