import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserActiveForMonth as UserActiveForMonthPrismaType } from '@prisma/client';

@ObjectType()
export class UserActiveForMonth implements UserActiveForMonthPrismaType {
  @Field(() => String)
  userId: string;

  @Field(() => Int)
  month: number;

  @Field(() => Int)
  year: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
