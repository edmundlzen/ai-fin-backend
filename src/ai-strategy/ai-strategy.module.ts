import { Module } from '@nestjs/common';
import { AiStrategyService } from './ai-strategy.service';
import { AiStrategyResolver } from './ai-strategy.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AiStrategyResolver, AiStrategyService, PrismaService],
})
export class AiStrategyModule {}
