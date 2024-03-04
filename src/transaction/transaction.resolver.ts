import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly TransactionService: TransactionService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.TransactionService.create(createTransactionInput);
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
