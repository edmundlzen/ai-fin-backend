import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReportActionResult {
  @Field(() => Boolean)
  success: boolean;
}
