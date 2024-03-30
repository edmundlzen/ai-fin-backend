import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as NodeCache from 'node-cache';
import { AdminData } from './entities/admin-data.entity';
import * as dayjs from 'dayjs';

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

    const data = {
      totalUsersSavings: totalUsersSavingsForLast12Months || [],
      totalActiveUsers: [],
      totalUsers: [],
      newUsers: [],
      userAnnualIncomeStats: [],
      userLiabilitiesStats: [],
      userMonthlyExpenseStats: [],
    };

    adminDataCache.set('adminData', data, 60 * 5);
    return data;
  }
}
