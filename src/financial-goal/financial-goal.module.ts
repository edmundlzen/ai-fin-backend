import { Module } from '@nestjs/common';
import { FinancialGoalService } from './financial-goal.service';
import { FinancialGoalResolver } from './financial-goal.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FinancialGoalResolver, FinancialGoalService, PrismaService],
})
export class FinancialGoalModule {}
