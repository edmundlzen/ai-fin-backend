import { Module } from '@nestjs/common';
import { ClaimedVoucherService } from './claimed-voucher.service';
import { ClaimedVoucherResolver } from './claimed-voucher.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ClaimedVoucherResolver, ClaimedVoucherService, PrismaService],
})
export class ClaimedVoucherModule {}
