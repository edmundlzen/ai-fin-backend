import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportActionInput } from './dto/report-action.input';
import { $Enums } from '@prisma/client';
import dayjs from 'dayjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async findAll() {
    const tasks = await this.prisma.task.findMany();

    return tasks;
  }

  async reportAction(reportActionInput: ReportActionInput, userId: string) {
    const { taskType } = reportActionInput;

    const inapplicableTasks = (
      await this.prisma.userCompletedTask.findMany({
        where: {
          userId,
        },
        include: {
          task: true,
        },
      })
    )
      .filter(
        (completedTask) =>
          completedTask.achieved === completedTask.task.requiredAmount,
      )
      .filter((completedTask) => {
        switch (completedTask.task.timing) {
          case $Enums.TaskTiming.ONCE:
            return !completedTask.lastClaimed;
          case $Enums.TaskTiming.DAILY:
            return (
              dayjs(completedTask.lastClaimed).isBefore(
                dayjs().subtract(1, 'day'),
              ) || !completedTask.lastClaimed
            );
          case $Enums.TaskTiming.WEEKLY:
            return (
              dayjs(completedTask.lastClaimed).isBefore(
                dayjs().subtract(1, 'week'),
              ) || !completedTask.lastClaimed
            );
          case $Enums.TaskTiming.MONTHLY:
            return (
              dayjs(completedTask.lastClaimed).isBefore(
                dayjs().subtract(1, 'month'),
              ) || !completedTask.lastClaimed
            );
          default:
            return false;
        }
      });

    const applicableTasks = (
      await this.prisma.task.findMany({
        where: {
          type: taskType,
        },
      })
    ).filter((task) => {
      return !inapplicableTasks.some(
        (completedTask) => completedTask.taskId === task.id,
      );
    });

    if (applicableTasks.length === 0) {
      return { success: false };
    }

    applicableTasks.forEach(async (task) => {
      await this.prisma.userCompletedTask.upsert({
        where: {
          userId_taskId: {
            taskId: task.id,
            userId,
          },
        },
        create: {
          achieved: 1,
          task: {
            connect: {
              id: task.id,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
        update: {
          achieved: {
            increment: 1,
          },
        },
      });
    });

    return { success: true };
  }

  async claimReward(taskId: string, userId: string) {
    const completedTask = await this.prisma.userCompletedTask.findFirst({
      where: {
        taskId,
        userId,
      },
      include: {
        task: true,
      },
    });

    if (!completedTask) {
      return { success: false };
    }

    if (completedTask.achieved !== completedTask.task.requiredAmount) {
      return { success: false };
    }

    const canClaim = (() => {
      switch (completedTask.task.timing) {
        case $Enums.TaskTiming.ONCE:
          return !completedTask.lastClaimed;
        case $Enums.TaskTiming.DAILY:
          return (
            dayjs(completedTask.lastClaimed).isBefore(
              dayjs().subtract(1, 'day'),
            ) || !completedTask.lastClaimed
          );
        case $Enums.TaskTiming.WEEKLY:
          return (
            dayjs(completedTask.lastClaimed).isBefore(
              dayjs().subtract(1, 'week'),
            ) || !completedTask.lastClaimed
          );
        case $Enums.TaskTiming.MONTHLY:
          return (
            dayjs(completedTask.lastClaimed).isBefore(
              dayjs().subtract(1, 'month'),
            ) || !completedTask.lastClaimed
          );
        default:
          return false;
      }
    })();

    if (!canClaim) {
      return { success: false };
    }

    await this.userService.addExperience(userId, completedTask.task.points);

    await this.prisma.userCompletedTask.update({
      where: {
        userId_taskId: {
          taskId: completedTask.taskId,
          userId,
        },
      },
      data: {
        lastClaimed: new Date(),
      },
    });

    return { success: true };
  }
}
