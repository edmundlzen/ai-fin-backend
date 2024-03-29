import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [
    TransactionResolver,
    TransactionService,
    PrismaService,
    UserService,
  ],
})
export class TransactionModule {}
