import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ClaimedVoucherService } from 'src/claimed-voucher/claimed-voucher.service';

@Module({
  imports: [
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '60s',
    //   },
    // }),
  ],
  providers: [UserResolver, UserService, PrismaService, ClaimedVoucherService],
})
export class UserModule {}
