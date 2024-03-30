import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClaimedVoucherService {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    const userVouchers = await this.prisma.claimedVoucher.findMany({
      where: {
        userId,
      },
    });
    const userVouchersWithCode = await Promise.all(
      userVouchers.map(async (userVoucher) => {
        const voucher = await this.prisma.voucher.findUnique({
          where: {
            id: userVoucher.voucherId,
          },
        });

        return {
          ...userVoucher,
          code: voucher.code,
        };
      }),
    );
    console.log(userVouchersWithCode);
    return userVouchersWithCode;
  }
}
