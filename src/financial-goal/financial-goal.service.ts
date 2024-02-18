import { Injectable } from '@nestjs/common';
import { CreateFinancialGoalInput } from './dto/create-financial-goal.input';
import { UpdateFinancialGoalInput } from './dto/update-financial-goal.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinancialGoalService {
  constructor(private prisma: PrismaService) {}

  create(createFinancialGoalInput: CreateFinancialGoalInput) {
    return this.prisma.financialGoal.create({
      data: {
        ...createFinancialGoalInput,
        user: {
          connect: { id: 'SOME_USER_ID' },
        },
      },
    });
  }

  findAll() {
    return this.prisma.financialGoal.findMany();
  }

  findOne(id: string) {
    return this.prisma.financialGoal.findUnique({
      where: { id },
    });
  }

  update(id: string, updateFinancialGoalInput: UpdateFinancialGoalInput) {
    return this.prisma.financialGoal.update({
      where: { id },
      data: {
        ...updateFinancialGoalInput,
      },
    });
  }

  remove(id: string) {
    return this.prisma.financialGoal.delete({
      where: { id },
    });
  }
}
