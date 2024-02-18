import { Module } from '@nestjs/common';
import { FinancialGoalService } from './financial-goal.service';
import { FinancialGoalResolver } from './financial-goal.resolver';

@Module({
  providers: [FinancialGoalResolver, FinancialGoalService]
})
export class FinancialGoalModule {}
