import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherResolver } from './voucher.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ClaimedVoucherService } from 'src/claimed-voucher/claimed-voucher.service';

@Module({
  providers: [
    VoucherResolver,
    VoucherService,
    PrismaService,
    UserService,
    ClaimedVoucherService,
  ],
})
export class VoucherModule {}
