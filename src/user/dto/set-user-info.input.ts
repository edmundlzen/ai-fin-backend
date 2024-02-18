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
  annualIncome: AnnualIncome;

  @IsEnum(EstimatedLiabilities)
  @Field(() => EstimatedLiabilities, {
    description: 'Estimated liabilities of the user',
  })
  estimatedLiabilities: EstimatedLiabilities;

  @IsEnum(EstimatedMonthlyExpenses)
  @Field(() => EstimatedMonthlyExpenses, {
    description: 'Estimated monthly expenses of the user',
  })
  estimatedMonthlyExpenses: EstimatedMonthlyExpenses;

  @IsBoolean()
  @Field(() => Boolean, { description: 'Has the user invested before?' })
  investedBefore: boolean;

  @IsEnum(RiskTolerance)
  @Field(() => RiskTolerance, {
    description: 'Risk tolerance of the user',
  })
  riskTolerance: RiskTolerance;

  @IsEnum(ExpectedAnnualReturn)
  @Field(() => ExpectedAnnualReturn, {
    description: 'Expected annual return of the user',
  })
  expectedAnnualReturn: ExpectedAnnualReturn;

  @IsEnum(InvestmentHorizon)
  @Field(() => InvestmentHorizon, {
    description: 'Investment horizon of the user',
  })
  investmentHorizon: InvestmentHorizon;
}
