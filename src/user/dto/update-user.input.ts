import { Exclude } from 'class-transformer';
import { SignupUserInput } from './signup-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@InputType()
export class UpdateUserInput extends PartialType(SignupUserInput) {
  @Field(() => String)
  id: string;

  @Exclude()
  password: string;

  @Field(() => [$Enums.NewsTopic])
  news_topics_followed: $Enums.NewsTopic[];
}
