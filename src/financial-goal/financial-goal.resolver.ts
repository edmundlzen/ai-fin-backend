import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FinancialGoalService } from './financial-goal.service';
import { FinancialGoal } from './entities/financial-goal.entity';
import { CreateFinancialGoalInput } from './dto/create-financial-goal.input';
import { UpdateFinancialGoalInput } from './dto/update-financial-goal.input';

@Resolver(() => FinancialGoal)
export class FinancialGoalResolver {
  constructor(private readonly financialGoalService: FinancialGoalService) {}

  @Mutation(() => FinancialGoal)
  createFinancialGoal(@Args('createFinancialGoalInput') createFinancialGoalInput: CreateFinancialGoalInput) {
    return this.financialGoalService.create(createFinancialGoalInput);
  }

  @Query(() => [FinancialGoal], { name: 'financialGoal' })
  findAll() {
    return this.financialGoalService.findAll();
  }

  @Query(() => FinancialGoal, { name: 'financialGoal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.financialGoalService.findOne(id);
  }

  @Mutation(() => FinancialGoal)
  updateFinancialGoal(@Args('updateFinancialGoalInput') updateFinancialGoalInput: UpdateFinancialGoalInput) {
    return this.financialGoalService.update(updateFinancialGoalInput.id, updateFinancialGoalInput);
  }

  @Mutation(() => FinancialGoal)
  removeFinancialGoal(@Args('id', { type: () => Int }) id: number) {
    return this.financialGoalService.remove(id);
  }
}
