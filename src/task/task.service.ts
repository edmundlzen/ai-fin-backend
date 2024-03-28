import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const tasks = await this.prisma.task.findMany();

    return tasks;
  }
}
