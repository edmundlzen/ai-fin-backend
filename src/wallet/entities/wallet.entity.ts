import { ObjectType, Field } from '@nestjs/graphql';
import { Wallet as WalletPrismaType } from '@prisma/client';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@ObjectType()
export class Wallet implements WalletPrismaType {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Transaction])
  transactions: Transaction[];
}
