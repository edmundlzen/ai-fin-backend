import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ClaimedVoucherService } from 'src/claimed-voucher/claimed-voucher.service';

@Module({
  providers: [
    TaskResolver,
    TaskService,
    PrismaService,
    UserService,
    ClaimedVoucherService,
  ],
})
export class TaskModule {}
