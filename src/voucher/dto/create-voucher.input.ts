import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateVoucherInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  terms: string;

  @Field(() => Int)
  levelRequired: number;

  @Field(() => String)
  imageUrl: string;
}
