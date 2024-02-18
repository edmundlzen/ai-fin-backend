import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEnum } from 'class-validator';
import {
  AnnualIncome,
  EstimatedLiabilities,
  EstimatedMonthlyExpenses,
  RiskTolerance,
  ExpectedAnnualReturn,
  InvestmentHorizon,
} from '@prisma/client';

@InputType()
export class SetUserInfoInput {
  @IsEnum(AnnualIncome)
  @Field(() => AnnualIncome, { description: 'Annual income of the user' })
  annual_income: AnnualIncome;

  @IsEnum(EstimatedLiabilities)
  @Field(() => EstimatedLiabilities, {
    description: 'Estimated liabilities of the user',
  })
  estimated_liabilities: EstimatedLiabilities;

  @IsEnum(EstimatedMonthlyExpenses)
  @Field(() => EstimatedMonthlyExpenses, {
    description: 'Estimated monthly expenses of the user',
  })
  estimated_monthly_expenses: EstimatedMonthlyExpenses;

  @IsBoolean()
  @Field(() => Boolean, { description: 'Has the user invested before?' })
  invested_before: boolean;

  @IsEnum(RiskTolerance)
  @Field(() => RiskTolerance, {
    description: 'Risk tolerance of the user',
  })
  risk_tolerance: RiskTolerance;

  @IsEnum(ExpectedAnnualReturn)
  @Field(() => ExpectedAnnualReturn, {
    description: 'Expected annual return of the user',
  })
  expected_annual_return: ExpectedAnnualReturn;

  @IsEnum(InvestmentHorizon)
  @Field(() => InvestmentHorizon, {
    description: 'Investment horizon of the user',
  })
  investment_horizon: InvestmentHorizon;
}
