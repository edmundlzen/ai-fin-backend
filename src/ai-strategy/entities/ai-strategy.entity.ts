import { ObjectType, Field, Float } from '@nestjs/graphql';
import { UnitTrustFund } from './unit-trust-fund.entity';

@ObjectType()
export class AiStrategy {
  @Field(() => Float)
  expensesRatio: number;

  @Field(() => Float)
  turnoverRatio: number;

  @Field(() => [UnitTrustFund])
  unitTrustFundRecommendations: UnitTrustFund[];
}
