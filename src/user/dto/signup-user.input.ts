import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class SignupUserInput {
  @IsEmail()
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Field(() => String, { description: 'Unhashed password of the user' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Field(() => String, { description: 'Username of the user' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Phone number of the user' })
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Birth year of the user' })
  birth_year: number;
}
