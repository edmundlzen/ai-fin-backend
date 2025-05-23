import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { $Enums, User as UserPrismaType } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ClaimedVoucher } from 'src/claimed-voucher/entities/claimed-voucher.entity';
import { FinancialGoal } from 'src/financial-goal/entities/financial-goal.entity';
import { UserCompletedTask } from 'src/task/entities/user-completed-task.entity';
import { UserInfo } from 'src/user-info/entities/user-info.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@ObjectType()
export class User implements UserPrismaType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  phone: string;

  @Field(() => Number)
  birth_year: number;

  @Exclude()
  password_hash: string;

  @Field(() => Int)
  level: number;

  @Field(() => Int)
  experience: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Wallet)
  wallet: Wallet;

  @Field(() => String)
  wallet_id: string;

  @Field(() => $Enums.AccountType)
  account_type: $Enums.AccountType;

  @Field(() => [FinancialGoal])
  financial_goal: FinancialGoal[];

  @Field(() => [$Enums.NewsTopic])
  news_topics_followed: $Enums.NewsTopic[];

  @Field(() => [UserCompletedTask])
  user_completed_task: UserCompletedTask[];

  @Field(() => [ClaimedVoucher])
  claimedVoucher: ClaimedVoucher[];

  @Field(() => UserInfo, { nullable: true })
  user_info?: UserInfo;
}

registerEnumType($Enums.NewsTopic, {
  name: 'NewsTopic',
});

registerEnumType($Enums.AccountType, {
  name: 'AccountType',
});
