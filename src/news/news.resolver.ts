import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { JwtPayloadType } from 'src/auth/jwt.strategy';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly NewsService: NewsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [News], { name: 'News' })
  findForUser(@JwtPayload() payload: JwtPayloadType) {
    return this.NewsService.findForUser(payload.userId);
  }
}
