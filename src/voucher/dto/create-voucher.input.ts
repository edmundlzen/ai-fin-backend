import { InputType, Field, Int } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@InputType()
export class CreateVoucherInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  terms: string;

  @Field(() => Int)
  levelRequired: number;
}
