import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.wallet.findMany();
  }

  findOne(id: string) {
    return this.prisma.wallet.findUnique({
      where: { id },
    });
  }
}
