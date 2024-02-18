import { Exclude } from 'class-transformer';
import { SignupUserInput } from './signup-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(SignupUserInput) {
  @Field(() => String)
  id: string;

  @Exclude()
  password: string;
}
