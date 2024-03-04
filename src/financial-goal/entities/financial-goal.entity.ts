import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FinancialGoal as FinancialGoalPrismaType } from '@prisma/client';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@ObjectType()
export class FinancialGoal implements FinancialGoalPrismaType {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  emoji: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  monthly_contribution_goal: number;

  @Field(() => Date)
  deletedAt: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Transaction])
  transaction: Transaction[];
}
