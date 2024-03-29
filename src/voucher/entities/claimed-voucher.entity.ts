import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClaimedVoucher as ClaimedVoucherPrismaType } from '@prisma/client';

@ObjectType()
export class ClaimedVoucher implements ClaimedVoucherPrismaType {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  voucherId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
