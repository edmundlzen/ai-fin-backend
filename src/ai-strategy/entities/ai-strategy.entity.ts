import { ObjectType, Field, Float } from '@nestjs/graphql';
import { UnitTrustFund } from './unit-trust-fund.entity';

@ObjectType()
export class AiStrategy {
  @Field(() => Boolean)
  loading: boolean;

  @Field(() => Float, { nullable: true })
  expensesRatio?: number;

  @Field(() => Float, { nullable: true })
  turnoverRatio?: number;

  @Field(() => [UnitTrustFund], { nullable: true })
  unitTrustFundRecommendations?: UnitTrustFund[];
}
