import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { FinancialGoalModule } from './financial-goal/financial-goal.module';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UserModule,
    UserInfoModule,
    FinancialGoalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
