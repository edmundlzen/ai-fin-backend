import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { ReportActionInput } from './dto/report-action.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadType } from 'src/auth/jwt.strategy';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { SuccessResult } from './entities/success-result.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly TaskService: TaskService) {}

  @Query(() => [Task], { name: 'Task' })
  findAll() {
    return this.TaskService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SuccessResult)
  reportAction(
    @Args('reportActionInput') reportActionInput: ReportActionInput,
    @JwtPayload() payload: JwtPayloadType,
  ) {
    return this.TaskService.reportAction(reportActionInput, payload.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SuccessResult)
  claimReward(
    @Args('taskId', { type: () => String }) taskId: string,
    @JwtPayload() payload: JwtPayloadType,
  ) {
    return this.TaskService.claimReward(taskId, payload.userId);
  }
}
