import { InputType, Field, Int } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  points: number;

  @Field(() => Int)
  requiredAmount: number;

  @Field(() => $Enums.TaskType)
  type: $Enums.TaskType;

  @Field(() => $Enums.TaskTiming)
  timing: $Enums.TaskTiming;
}
