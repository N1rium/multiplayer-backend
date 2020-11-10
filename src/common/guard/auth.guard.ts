import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Simply checks for auth headers
 */

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorized =
      request.headers.Authorization || request.headers.authorization;
    if (!authorized) throw new UnauthorizedException();
    return true;
  }
}
