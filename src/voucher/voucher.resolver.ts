import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VoucherService } from './voucher.service';
import { Voucher } from './entities/voucher.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadType } from 'src/auth/jwt.strategy';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { SuccessResult } from 'src/task/entities/success-result.entity';
import { CreateVoucherInput } from './dto/create-voucher.input';
import { UpdateVoucherInput } from './dto/update-voucher.input';

@Resolver(() => Voucher)
export class VoucherResolver {
  constructor(private readonly VoucherService: VoucherService) {}

  @Query(() => [Voucher], { name: 'voucher' })
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Voucher)
  createVoucher(
    @Args('createVoucherInput') createVoucherInput: CreateVoucherInput,
  ) {
    return this.VoucherService.create(createVoucherInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Voucher)
  updateVoucher(
    @Args('updateVoucherInput') updateVoucherInput: UpdateVoucherInput,
  ) {
    return this.VoucherService.update(updateVoucherInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Voucher)
  removeVoucher(@Args('id', { type: () => String }) id: string) {
    return this.VoucherService.remove(id);
  }
}
