import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly TaskService: TaskService) {}

  @Query(() => [Task], { name: 'Task' })
  findAll() {
    return this.TaskService.findAll();
  }
}
