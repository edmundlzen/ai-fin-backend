import { Module } from '@nestjs/common';
import { AdminDataService } from './admin-data.service';
import { AdminDataResolver } from './admin-data.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ClaimedVoucherService } from 'src/claimed-voucher/claimed-voucher.service';

@Module({
  providers: [
    AdminDataResolver,
    AdminDataService,
    PrismaService,
    UserService,
    ClaimedVoucherService,
  ],
})
export class AdminDataModule {}
