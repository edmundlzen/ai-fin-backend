import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { FinancialGoalModule } from './financial-goal/financial-goal.module';
import { UserInfoModule } from './user-info/user-info.module';
import { TransactionModule } from './transaction/transaction.module';
import { WalletModule } from './wallet/wallet.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { TaskModule } from './task/task.module';
import { VoucherModule } from './voucher/voucher.module';
import { ClaimedVoucherModule } from './claimed-voucher/claimed-voucher.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: true,
    }),
    UserModule,
    UserInfoModule,
    FinancialGoalModule,
    TransactionModule,
    WalletModule,
    AuthModule,
    NewsModule,
    TaskModule,
    VoucherModule,
    ClaimedVoucherModule,
  ],
})
export class AppModule {}
