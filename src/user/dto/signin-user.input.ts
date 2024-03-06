import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class SigninUserInput {
  @IsEmail()
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Field(() => String, { description: 'Unhashed password of the user' })
  password: string;
}
