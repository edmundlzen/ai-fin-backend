import { CreateFinancialGoalInput } from './create-financial-goal.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFinancialGoalInput extends PartialType(
  CreateFinancialGoalInput,
) {
  @Field(() => String)
  id: string;
}
