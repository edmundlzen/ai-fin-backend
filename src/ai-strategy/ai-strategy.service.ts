import { Injectable, NotFoundException } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiStrategy } from './entities/ai-strategy.entity';
import * as pb_funds_data from '../../unitTrustFundsData/merged_pb_funds_data.json';
import { UnitTrustFund } from './entities/unit-trust-fund.entity';

const aiStrategyCache = new NodeCache();

@Injectable()
export class AiStrategyService {
  constructor(private prisma: PrismaService) {}

  async fetchForUser(id: string) {
    const cachedAiStrategy = aiStrategyCache.get(id) as AiStrategy;
    if (cachedAiStrategy) {
      return cachedAiStrategy;
    }

    const aiStrategy = await this.generateForUser();
    aiStrategyCache.set(id, aiStrategy, 60 * 30);

    return aiStrategy;
  }

  async generateForUser() {
    const { expensesRatio, turnoverRatio } = {
      expensesRatio: 1.6,
      turnoverRatio: 0.5,
    }; // TODO: Get from server later

    // Based on these values, get the unit trust fund recommendations
    const unitTrustFundRecommendations = Object.keys(pb_funds_data).reduce(
      (acc: any[], curr: string) => {
        const fund = pb_funds_data[curr];
        if (
          +fund.management_fee < expensesRatio &&
          fund.ptr[Object.keys(fund.ptr)[0]] < turnoverRatio
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
      expensesRatio: expensesRatio,
      turnoverRatio: turnoverRatio,
      unitTrustFundRecommendations: unitTrustFundRecommendations.map(
        (fund: any) => {
          return {
            fundName: fund.fund_name,
            expenseRatio: fund.management_fee,
            turnoverRatio: fund.ptr[Object.keys(fund.ptr)[0]],
            riskLevel: fund.risk_level,
            imageUrl: 'https://via.placeholder.com/150',
            phsUrl: 'https://via.placeholder.com/150',
          };
        },
      ) as UnitTrustFund[],
    };

    return aiStrategy;
  }
}
