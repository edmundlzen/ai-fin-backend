import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transaction as TransactionPrismaType } from '@prisma/client';
import { FinancialGoal } from 'src/financial-goal/entities/financial-goal.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@ObjectType()
export class Transaction implements TransactionPrismaType {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Wallet)
  wallet: Wallet;

  @Field(() => String)
  wallet_id: string;

  @Field(() => FinancialGoal)
  financial_goal: FinancialGoal;

  @Field(() => String)
  financial_goal_id: string;
}
