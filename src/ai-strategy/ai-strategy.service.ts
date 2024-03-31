import { Injectable, NotFoundException } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiStrategy } from './entities/ai-strategy.entity';
import * as pb_funds_data from '../../unitTrustFundsData/merged_pb_funds_data.json';
import { UnitTrustFund } from './entities/unit-trust-fund.entity';
import { $Enums } from '@prisma/client';

const AnnualIncomeToAverage: Record<$Enums.AnnualIncome, number> = {
  LessThan10K: 5000,
  From10KTo25K: 17500,
  From25KTo50K: 37500,
  From50KTo100K: 75000,
  From100KTo200K: 150000,
  MoreThan200K: 250000,
};

const aiStrategyCache = new NodeCache();

@Injectable()
export class AiStrategyService {
  constructor(private prisma: PrismaService) {}

  async fetchForUser(id: string) {
    const cachedAiStrategy = aiStrategyCache.get(id) as AiStrategy;
    if (cachedAiStrategy) {
      return cachedAiStrategy;
    }

    const aiStrategy = await this.generateForUser(id);
    aiStrategyCache.set(id, aiStrategy, 1);

    return aiStrategy;
  }

  async generateForUser(id: string) {
    const userData = (
      await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          user_info: {
            select: {
              annual_income: true,
              risk_tolerance: true,
            },
          },
        },
      })
    )?.user_info;

    const userMonthlyIncome = (
      +AnnualIncomeToAverage[
        userData?.annual_income as keyof typeof AnnualIncomeToAverage
      ] / 12
    ).toFixed(0);
    const userRiskTolerance =
      userData?.risk_tolerance === $Enums.RiskTolerance.Low
        ? 0.3
        : userData?.risk_tolerance === $Enums.RiskTolerance.Medium
        ? 0.5
        : 0.7;
    const { expense_ratio, portfolio_turnover_ratio } = await (
      await fetch(
        `${process.env.AI_SERVER_URL}/calculate-recommendation` as string,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            investment_amount: +userMonthlyIncome,
            sigma: +userRiskTolerance,
          }),
        },
      )
    ).json();

    console.log('Expenses ratio: ', expense_ratio);
    console.log('Turnover ratio: ', portfolio_turnover_ratio);
    console.log('User monthly income: ', userMonthlyIncome);
    console.log('User risk tolerance: ', userRiskTolerance);

    // Based on these values, get the unit trust fund recommendations
    const unitTrustFundRecommendations = Object.keys(pb_funds_data).reduce(
      (acc: any[], curr: string) => {
        const fund = pb_funds_data[curr];
        if (
          +fund.management_fee < expense_ratio &&
          fund.ptr[Object.keys(fund.ptr)[0]] < portfolio_turnover_ratio
        ) {
          acc.push(fund);
        }
        return acc;
      },
      [],
    );

    console.log(
      'Recommended amount of funds: ',
      unitTrustFundRecommendations.length,
    );

    const aiStrategy: AiStrategy = {
      loading: false,
      expensesRatio: expense_ratio,
      turnoverRatio: portfolio_turnover_ratio,
      unitTrustFundRecommendations: unitTrustFundRecommendations.map(
        (fund: any) => {
          return {
            fundName: fund.fund_name,
            expenseRatio: fund.management_fee,
            turnoverRatio: fund.ptr[Object.keys(fund.ptr)[0]],
            riskLevel: fund.risk_level,
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/ms/9/9d/Public.gif',
            phsUrl: 'https://via.placeholder.com/150',
          };
        },
      ) as UnitTrustFund[],
    };

    return aiStrategy;
  }
}
