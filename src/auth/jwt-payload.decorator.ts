import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadType } from './jwt.strategy';

export const JwtPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtPayloadType => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
