import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { $Enums, Task as TaskPrismaType } from '@prisma/client';

@ObjectType()
export class Task implements TaskPrismaType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  points: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  requiredAmount: number;

  @Field(() => $Enums.TaskType)
  type: $Enums.TaskType;

  @Field(() => $Enums.TaskTiming)
  timing: $Enums.TaskTiming;
}

registerEnumType($Enums.TaskType, {
  name: 'TaskType',
});

registerEnumType($Enums.TaskTiming, {
  name: 'TaskTiming',
});
