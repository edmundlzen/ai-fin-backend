import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Int)
  amount: number;

  @Field(() => String)
  wallet_id: string;

  @Field(() => String)
  financial_goal_id: string;
}
