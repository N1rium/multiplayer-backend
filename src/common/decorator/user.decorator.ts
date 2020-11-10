import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const header =
        request.headers.authorization || request.headers.Authorization;
      return jwt.verify(header.split('Bearer ')[1], process.env.JWT_SECRET);
    } catch (e) {
      throw new UnauthorizedException();
    }
  },
);
