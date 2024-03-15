import { Field, ObjectType } from '@nestjs/graphql';
import { User as UserPrismaType } from '@prisma/client';

@ObjectType()
export class Jwt {
  @Field(() => String)
  access_token: string;
}
