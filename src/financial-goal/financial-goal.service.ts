import { Injectable } from '@nestjs/common';
import { CreateFinancialGoalInput } from './dto/create-financial-goal.input';
import { UpdateFinancialGoalInput } from './dto/update-financial-goal.input';

@Injectable()
export class FinancialGoalService {
  create(createFinancialGoalInput: CreateFinancialGoalInput) {
    return 'This action adds a new financialGoal';
  }

  findAll() {
    return `This action returns all financialGoal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financialGoal`;
  }

  update(id: number, updateFinancialGoalInput: UpdateFinancialGoalInput) {
    return `This action updates a #${id} financialGoal`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialGoal`;
  }
}
