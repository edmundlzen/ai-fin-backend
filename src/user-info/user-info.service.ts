import { Injectable } from '@nestjs/common';
import { CreateOrUpdateUserInfoInput } from './dto/create-or-update-user-info.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { registerEnumType } from '@nestjs/graphql';
import {
  AnnualIncome,
  EstimatedLiabilities,
  EstimatedMonthlyExpenses,
  ExpectedAnnualReturn,
  InvestmentHorizon,
  RiskTolerance,
} from '@prisma/client';

@Injectable()
export class UserInfoService {
  constructor(private prisma: PrismaService) {
    registerEnumType(AnnualIncome, { name: 'AnnualIncome' });
    registerEnumType(EstimatedLiabilities, { name: 'EstimatedLiabilities' });
    registerEnumType(EstimatedMonthlyExpenses, {
      name: 'EstimatedMonthlyExpenses',
    });
    registerEnumType(ExpectedAnnualReturn, { name: 'ExpectedAnnualReturn' });
    registerEnumType(InvestmentHorizon, { name: 'InvestmentHorizon' });
    registerEnumType(RiskTolerance, { name: 'RiskTolerance' });
  }

  createOrUpdate(createUserInfoInput: CreateOrUpdateUserInfoInput) {
    const { user_id, ...rest } = createUserInfoInput;
    return this.prisma.userInfo.upsert({
      where: { userId: user_id },
      update: rest,
      create: {
        user: {
          connect: { id: user_id },
        },
        ...rest,
      },
    });
  }

  findAll() {
    return this.prisma.userInfo.findMany();
  }

  findOne(id: string) {
    return this.prisma.userInfo.findUnique({
      where: { userId: id },
    });
  }
}
