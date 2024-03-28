import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  $Enums,
  UserCompletedTask as UserCompletedTaskPrismaType,
} from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Task } from './task.entity';

@ObjectType()
export class UserCompletedTask implements UserCompletedTaskPrismaType {
  @Field(() => String)
  userId: string;

  @Field(() => User)
  user: User;

  @Field(() => String)
  taskId: string;

  @Field(() => Task)
  task: Task;

  @Field(() => Int)
  createdAt: Date;

  @Field(() => Int)
  achieved: number;
}
