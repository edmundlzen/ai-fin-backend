import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignupUserInput } from './dto/signup-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SigninUserInput } from './dto/signin-user.input';
import { Jwt } from './entities/jwt.entity';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/jwt-payload.decorator';
import { JwtPayloadType } from 'src/auth/jwt.strategy';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  signupUser(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.userService.create(signupUserInput);
  }

  @Mutation(() => Jwt)
  signinUser(@Args('signinUserInput') signinUserInput: SigninUserInput) {
    return this.userService.signin(signinUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @JwtPayload() payload: JwtPayloadType,
  ) {
    if (payload.userId !== id)
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @JwtPayload() payload: JwtPayloadType,
  ) {
    if (payload.userId !== updateUserInput.id)
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => String }) id: string) {
  //   return this.userService.remove(id);
  // }
}
