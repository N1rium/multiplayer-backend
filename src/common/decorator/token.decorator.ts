import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const header =
        request.headers.authorization || request.headers.Authorization;
      return header.split('Bearer ')[1];
    } catch (e) {
      throw new UnauthorizedException();
    }
  },
);
