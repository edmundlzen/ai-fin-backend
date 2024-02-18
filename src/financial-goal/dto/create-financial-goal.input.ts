import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFinancialGoalInput {
  @Field(() => String, { description: 'Emoji of the financial goal' })
  emoji: string;

  @Field(() => String, { description: 'Name of the financial goal' })
  name: string;

  @Field(() => Int, { description: 'Amount of the financial goal' })
  amount: number;

  @Field(() => Int, {
    description: 'Target monthly contribution of the financial goal',
  })
  monthly_contribution_goal: number;
}
