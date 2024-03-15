import { ObjectType, Field } from '@nestjs/graphql';
import {
  AnnualIncome,
  EstimatedLiabilities,
  EstimatedMonthlyExpenses,
  ExpectedAnnualReturn,
  InvestmentHorizon,
  RiskTolerance,
  UserInfo as UserInfoPrismaType,
} from '@prisma/client';

@ObjectType()
export class UserInfo implements UserInfoPrismaType {
  @Field(() => String)
  userId: string;

  @Field(() => AnnualIncome)
  annual_income: AnnualIncome;

  @Field(() => EstimatedLiabilities)
  estimated_liabilities: EstimatedLiabilities;

  @Field(() => EstimatedMonthlyExpenses)
  estimated_monthly_expenses: EstimatedMonthlyExpenses;

  @Field(() => Boolean)
  invested_before: boolean;

  @Field(() => RiskTolerance)
  risk_tolerance: RiskTolerance;

  @Field(() => ExpectedAnnualReturn)
  expected_annual_return: ExpectedAnnualReturn;

  @Field(() => InvestmentHorizon)
  investment_horizon: InvestmentHorizon;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
