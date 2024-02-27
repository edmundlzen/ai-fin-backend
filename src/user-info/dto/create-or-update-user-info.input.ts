import { InputType, Int, Field } from '@nestjs/graphql';
import {
  AnnualIncome,
  EstimatedLiabilities,
  EstimatedMonthlyExpenses,
  ExpectedAnnualReturn,
  InvestmentHorizon,
  RiskTolerance,
} from '@prisma/client';

@InputType()
export class CreateOrUpdateUserInfoInput {
  @Field(() => String, {
    description: 'User ID of the user info to be created or updated',
  })
  user_id: string;

  @Field(() => AnnualIncome, { description: 'Annual income of the user' })
  annual_income: AnnualIncome;

  @Field(() => EstimatedLiabilities, {
    description: 'Estimated liabilities of the user',
  })
  estimated_liabilities: EstimatedLiabilities;

  @Field(() => EstimatedMonthlyExpenses, {
    description: 'Estimated monthly expenses of the user',
  })
  estimated_monthly_expenses: EstimatedMonthlyExpenses;

  @Field(() => Boolean, { description: 'Whether the user has invested before' })
  invested_before: boolean;

  @Field(() => RiskTolerance, { description: 'Risk tolerance of the user' })
  risk_tolerance: RiskTolerance;

  @Field(() => ExpectedAnnualReturn, {
    description: 'Expected annual return of the user',
  })
  expected_annual_return: ExpectedAnnualReturn;

  @Field(() => InvestmentHorizon, {
    description: 'Investment horizon of the user',
  })
  investment_horizon: InvestmentHorizon;
}
