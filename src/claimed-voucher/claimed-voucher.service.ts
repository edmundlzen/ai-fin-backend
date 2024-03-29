import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClaimedVoucherService {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    return await this.prisma.claimedVoucher.findMany({
      where: {
        userId,
      },
    });
  }
}
