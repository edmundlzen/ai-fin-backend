import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FinancialGoal as FinancialGoalPrismaType } from '@prisma/client';

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
}
