import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as NodeCache from 'node-cache';
import { AdminData } from './entities/admin-data.entity';
import * as dayjs from 'dayjs';
import { $Enums, AccountType } from '@prisma/client';

const adminDataCache = new NodeCache();

@Injectable()
export class AdminDataService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async query() {
    const cachedData = adminDataCache.get('adminData') as AdminData | undefined;
    if (cachedData) {
      console.log('Using cached admin data');
      return cachedData;
    }

    const totalUsersSavingsForLast12Months = await Promise.all(
      Array.from({ length: 12 }, async (_, i) => {
        const monthAggregate = await this.prisma.transaction.aggregate({
          _sum: { amount: true },
          where: {
            createdAt: {
              gte: dayjs(new Date())
                .subtract(i + 1, 'month')
                .set('date', 1)
                .toDate(),
              lt: dayjs(new Date())
                .subtract(i, 'month')
                .set('date', 31)
                .toDate(),
            },
          },
        });
        return {
          month: dayjs(new Date()).subtract(i, 'month').month() + 1,
          year: dayjs(new Date()).subtract(i, 'month').year(),
          value: monthAggregate._sum.amount || 0,
        };
      }),
    );

    const totalActiveUsersForLast12Months = await Promise.all(
      Array.from({ length: 12 }, async (_, i) => {
        const monthAggregate = await this.prisma.userActiveForMonth.aggregate({
          _count: true,
          where: {
            month: dayjs(new Date()).subtract(i, 'month').month() + 1,
            year: dayjs(new Date()).subtract(i, 'month').year(),
          },
        });
        return {
          month: dayjs(new Date()).subtract(i, 'month').month() + 1,
          year: dayjs(new Date()).subtract(i, 'month').year(),
          value: monthAggregate._count,
        };
      }),
    );

    const totalNewUsersForLast12Months = await Promise.all(
      Array.from({ length: 12 }, async (_, i) => {
        const monthAggregate = await this.prisma.user.aggregate({
          _count: true,
          where: {
            createdAt: {
              gte: dayjs(new Date())
                .subtract(i + 1, 'month')
                .set('date', 1)
                .toDate(),
              lt: dayjs(new Date())
                .subtract(i, 'month')
                .set('date', 31)
                .toDate(),
            },
            account_type: AccountType.USER,
          },
        });
        return {
          month: dayjs(new Date()).subtract(i, 'month').month() + 1,
          year: dayjs(new Date()).subtract(i, 'month').year(),
          value: monthAggregate._count,
        };
      }),
    );

    const userAnnualIncomeStats = (
      await this.prisma.userInfo.groupBy({
        by: ['annual_income'],
        _count: {
          _all: true,
        },
      })
    ).map((stat) => ({
      name: stat.annual_income || 'Unknown',
      value: stat._count._all,
    }));

    const userLiabilitiesStats = (
      await this.prisma.userInfo.groupBy({
        by: ['estimated_liabilities'],
        _count: {
          _all: true,
        },
      })
    ).map((stat) => ({
      name: stat.estimated_liabilities || 'Unknown',
      value: stat._count._all,
    }));

    const userMonthlyExpenseStats = (
      await this.prisma.userInfo.groupBy({
        by: ['estimated_monthly_expenses'],
        _count: {
          _all: true,
        },
      })
    ).map((stat) => ({
      name: stat.estimated_monthly_expenses || 'Unknown',
      value: stat._count._all,
    }));

    const data: AdminData = {
      totalUsersSavings: totalUsersSavingsForLast12Months ?? [],
      totalActiveUsers: totalActiveUsersForLast12Months ?? [],
      totalUsers: totalNewUsersForLast12Months ?? [],
      newUsers: totalNewUsersForLast12Months ?? [],
      userAnnualIncomeStats:
        [
          ...userAnnualIncomeStats,
          ...Object.values($Enums.AnnualIncome).reduce((acc, val) => {
            if (!userAnnualIncomeStats.find((stat) => stat.name === val)) {
              acc.push({ name: val, value: 0 });
            }
            return acc;
          }, [] as { name: string; value: number }[]),
        ].sort((a, b) =>
          // Sort by the order in the enum
          Object.values($Enums.AnnualIncome).indexOf(
            a.name as keyof typeof $Enums.AnnualIncome,
          ) >
          Object.values($Enums.AnnualIncome).indexOf(
            b.name as keyof typeof $Enums.AnnualIncome,
          )
            ? 1
            : -1,
        ) ?? [],
      userLiabilitiesStats:
        [
          ...userLiabilitiesStats,
          ...Object.values($Enums.EstimatedLiabilities).reduce((acc, val) => {
            if (!userLiabilitiesStats.find((stat) => stat.name === val)) {
              acc.push({ name: val, value: 0 });
            }
            return acc;
          }, [] as { name: string; value: number }[]),
        ].sort((a, b) =>
          // Sort by the order in the enum
          Object.values($Enums.EstimatedLiabilities).indexOf(
            a.name as keyof typeof $Enums.EstimatedLiabilities,
          ) >
          Object.values($Enums.EstimatedLiabilities).indexOf(
            b.name as keyof typeof $Enums.EstimatedLiabilities,
          )
            ? 1
            : -1,
        ) ?? [],
      userMonthlyExpenseStats:
        [
          ...userMonthlyExpenseStats,
          ...Object.values($Enums.EstimatedMonthlyExpenses).reduce(
            (acc, val) => {
              if (!userMonthlyExpenseStats.find((stat) => stat.name === val)) {
                acc.push({ name: val, value: 0 });
              }
              return acc;
            },
            [] as { name: string; value: number }[],
          ),
        ].sort((a, b) =>
          // Sort by the order in the enum
          Object.values($Enums.EstimatedMonthlyExpenses).indexOf(
            a.name as keyof typeof $Enums.EstimatedMonthlyExpenses,
          ) >
          Object.values($Enums.EstimatedMonthlyExpenses).indexOf(
            b.name as keyof typeof $Enums.EstimatedMonthlyExpenses,
          )
            ? 1
            : -1,
        ) ?? [],
    };

    adminDataCache.set('adminData', data, 1);
    return data;
  }
}
