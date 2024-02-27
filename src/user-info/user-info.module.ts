import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoResolver } from './user-info.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserInfoResolver, UserInfoService, PrismaService],
})
export class UserInfoModule {}
