import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTransactionInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  id: string;
}
