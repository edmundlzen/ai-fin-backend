import { SignupUserInput } from './signup-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(SignupUserInput) {
  @Field(() => Int)
  id: number;
}
