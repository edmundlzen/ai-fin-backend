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
      return { ok: false };
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

    return { ok: true };
  }
}
