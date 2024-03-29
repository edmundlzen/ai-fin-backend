import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VoucherService } from './voucher.service';
import { Voucher } from './entities/voucher.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadType } from 'src/auth/jwt.strategy';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { SuccessResult } from 'src/task/entities/success-result.entity';

@Resolver(() => Voucher)
export class VoucherResolver {
  constructor(private readonly VoucherService: VoucherService) {}

  @Query(() => [Voucher], { name: 'Voucher' })
  findAll() {
    return this.VoucherService.findAll();
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SuccessResult)
  claimVoucher(
    @Args('voucherId', { type: () => String }) voucherId: string,
    @JwtPayload() payload: JwtPayloadType,
  ) {
    return this.VoucherService.claimVoucher(voucherId, payload.userId);
  }
}
