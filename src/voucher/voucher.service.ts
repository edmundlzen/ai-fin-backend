import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VoucherService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async findAll() {
    const vouchers = await this.prisma.voucher.findMany();

    return vouchers;
  }

  async claimVoucher(voucherId: string, userId: string) {
    const voucher = await this.prisma.voucher.findUnique({
      where: {
        id: voucherId,
      },
    });

    if (!voucher) {
      throw new Error('Voucher not found');
    }

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if ((user.level ?? 0) < voucher.levelRequired) {
      throw new Error('Insufficient level');
    }

    if (user.claimedVoucher.some((v) => v.voucherId === voucher.id)) {
      throw new Error('Voucher already claimed');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        claimedVoucher: {
          create: {
            voucherId: voucher.id,
          },
        },
      },
    });

    return {
      success: true,
    };
  }
}
