import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Voucher as VoucherPrismaType } from '@prisma/client';

@ObjectType()
export class Voucher implements Partial<VoucherPrismaType> {
  @Field(() => String)
  id: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  levelRequired: number;

  @Field(() => String)
  terms: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
