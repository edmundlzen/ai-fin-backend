import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportActionInput } from './dto/report-action.input';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const tasks = await this.prisma.task.findMany();

    return tasks;
  }

  async reportAction(reportActionInput: ReportActionInput, userId: string) {
    const { taskType } = reportActionInput;

    const userCompletedTasks = (
      await this.prisma.userCompletedTask.findMany({
        where: {
          userId,
        },
        include: {
          task: true,
        },
      })
    ).filter(
      (completedTask) =>
        completedTask.achieved === completedTask.task.requiredAmount,
    );

    const applicableTasks = (
      await this.prisma.task.findMany({
        where: {
          type: taskType,
        },
      })
    ).filter((task) => {
      return !userCompletedTasks.some(
        (completedTask) => completedTask.taskId === task.id,
      );
    });

    if (applicableTasks.length === 0) {
      return { success: false };
    }

    await this.prisma.userCompletedTask.upsert({
      where: {
        userId_taskId: {
          taskId: applicableTasks[0].id,
          userId,
        },
      },
      create: {
        achieved: 1,
        task: {
          connect: {
            id: applicableTasks[0].id,
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

    return { success: true };
  }

  async claimReward(taskId: string, userId: string) {
    const originalTask = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    const userProgressForTask = (
      await this.prisma.userCompletedTask.findFirst({
        where: {
          userId,
          taskId,
        },
      })
    ).achieved;
    return { success: true };
  }
}
