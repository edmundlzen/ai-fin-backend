import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { JwtPayloadType } from 'src/auth/jwt.strategy';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly TransactionService: TransactionService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
    @JwtPayload() payload: JwtPayloadType,
  ) {
    return this.TransactionService.create(
      createTransactionInput,
      payload.userId,
    );
  }

  @Query(() => [Transaction], { name: 'Transaction' })
  findAll() {
    return this.TransactionService.findAll();
  }

  @Query(() => Transaction, { name: 'Transaction' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.TransactionService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.TransactionService.update(
      updateTransactionInput.id,
      updateTransactionInput,
    );
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => String }) id: string) {
    return this.TransactionService.remove(id);
  }
}
