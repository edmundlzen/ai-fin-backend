import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly WalletService: WalletService) {}

  @Query(() => [Wallet], { name: 'Wallet' })
  findAll() {
    return this.WalletService.findAll();
  }

  @Query(() => Wallet, { name: 'Wallet' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.WalletService.findOne(id);
  }
}
