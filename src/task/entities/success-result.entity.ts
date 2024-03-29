import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SuccessResult {
  @Field(() => Boolean)
  success: boolean;
}
