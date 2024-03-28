import { InputType, Field, Int } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@InputType()
export class ReportActionInput {
  @Field(() => $Enums.TaskType)
  taskType: $Enums.TaskType;
}
