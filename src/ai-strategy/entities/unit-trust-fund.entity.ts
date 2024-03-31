import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class UnitTrustFund {
  @Field(() => String)
  fundName: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Float)
  expenseRatio: number;

  @Field(() => Float)
  turnoverRatio: number;

  @Field(() => String)
  riskLevel: string;

  @Field(() => String)
  phsUrl: string;
}
