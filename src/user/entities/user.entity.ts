import { ObjectType } from '@nestjs/graphql';
import { User as UserPrismaType } from '@prisma/client';
import { Exclude } from 'class-transformer';

@ObjectType()
export class User implements UserPrismaType {
  id: string;
  email: string;
  username: string;
  phone: string;
  birth_year: number;

  @Exclude()
  password_hash: string;
}
