import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AiStrategyService } from './ai-strategy.service';
import { AiStrategy } from './entities/ai-strategy.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { JwtPayloadType } from 'src/auth/jwt.strategy';

@Resolver(() => AiStrategy)
export class AiStrategyResolver {
  constructor(private readonly AiStrategyService: AiStrategyService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [AiStrategy], { name: 'aiStrategy' })
  fetchForuser(@JwtPayload() user: JwtPayloadType) {
    return this.AiStrategyService.fetchForUser(user.userId);
  }
}
