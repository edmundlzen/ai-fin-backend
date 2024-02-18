import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Unhashed password of the user' })
  password: string;

  @Field(() => String, { description: 'Username of the user' })
  username: string;

  @Field(() => String, { description: 'Phone number of the user' })
  phone: string;

  @Field(() => Int, { description: 'Birth year of the user' })
  birthYear: number;
}
