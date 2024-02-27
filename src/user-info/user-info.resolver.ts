import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserInfoService } from './user-info.service';
import { UserInfo } from './entities/user-info.entity';
import { CreateOrUpdateUserInfoInput } from './dto/create-or-update-user-info.input';

@Resolver(() => UserInfo)
export class UserInfoResolver {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Mutation(() => UserInfo)
  createOrUpdateUserInfo(
    @Args('createOrUpdateUserInfoInput')
    createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput,
  ) {
    return this.userInfoService.createOrUpdate(createOrUpdateUserInfoInput);
  }

  @Query(() => [UserInfo], { name: 'UserInfo' })
  findAll() {
    return this.userInfoService.findAll();
  }

  @Query(() => UserInfo, { name: 'UserInfo' })
  findOne(@Args('userId', { type: () => String }) userId: string) {
    return this.userInfoService.findOne(userId);
  }
}
