import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User as UserPrismaType } from '@prisma/client';
import { Exclude } from 'class-transformer';
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
  experience: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Wallet)
  wallet: Wallet;

  @Field(() => String)
  wallet_id: string;
}
