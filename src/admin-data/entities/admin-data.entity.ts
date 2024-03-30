import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AdminData {
  @Field(() => [DateData])
  totalUsersSavings: DateData[];

  @Field(() => [DateData])
  totalActiveUsers: DateData[];

  @Field(() => [DateData])
  totalUsers: DateData[];

  @Field(() => [DateData])
  newUsers: DateData[];

  @Field(() => [NameData])
  userAnnualIncomeStats: NameData[];

  @Field(() => [NameData])
  userLiabilitiesStats: NameData[];

  @Field(() => [NameData])
  userMonthlyExpenseStats: NameData[];
}

@ObjectType()
export class DateData {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  year: number;

  @Field(() => Int)
  value: number;
}

@ObjectType()
export class NameData {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  value: number;
}
