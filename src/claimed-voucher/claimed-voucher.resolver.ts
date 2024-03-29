import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClaimedVoucherService } from './claimed-voucher.service';
import { ClaimedVoucher } from './entities/claimed-voucher.entity';
import { UseGuards } from '@nestjs/common';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { JwtPayloadType } from 'src/auth/jwt.strategy';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => ClaimedVoucher)
export class ClaimedVoucherResolver {
  constructor(private readonly ClaimedVoucherService: ClaimedVoucherService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [ClaimedVoucher], { name: 'ClaimedVoucher' })
  findAllForUser(@JwtPayload() payload: JwtPayloadType) {
    return this.ClaimedVoucherService.findAllForUser(payload.userId);
  }
}
