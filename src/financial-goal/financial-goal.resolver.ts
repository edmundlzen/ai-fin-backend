import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FinancialGoalService } from './financial-goal.service';
import { FinancialGoal } from './entities/financial-goal.entity';
import { CreateFinancialGoalInput } from './dto/create-financial-goal.input';
import { UpdateFinancialGoalInput } from './dto/update-financial-goal.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { JwtPayloadType } from 'src/auth/jwt.strategy';

@Resolver(() => FinancialGoal)
export class FinancialGoalResolver {
  constructor(private readonly financialGoalService: FinancialGoalService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FinancialGoal)
  createFinancialGoal(
    @Args('createFinancialGoalInput')
    createFinancialGoalInput: CreateFinancialGoalInput,
    @JwtPayload() payload: JwtPayloadType,
  ) {
    return this.financialGoalService.create(
      createFinancialGoalInput,
      payload.userId,
    );
  }

  @Query(() => [FinancialGoal], { name: 'financialGoal' })
  findAll() {
    return this.financialGoalService.findAll();
  }

  @Query(() => FinancialGoal, { name: 'financialGoal' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.financialGoalService.findOne(id);
  }

  @Mutation(() => FinancialGoal)
  updateFinancialGoal(
    @Args('updateFinancialGoalInput')
    updateFinancialGoalInput: UpdateFinancialGoalInput,
  ) {
    return this.financialGoalService.update(
      updateFinancialGoalInput.id,
      updateFinancialGoalInput,
    );
  }

  @Mutation(() => FinancialGoal)
  removeFinancialGoal(@Args('id', { type: () => String }) id: string) {
    return this.financialGoalService.remove(id);
  }
}
