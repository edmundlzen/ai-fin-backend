import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignupUserInput } from './dto/signup-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SigninUserInput } from './dto/signin-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  signupUser(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.userService.create(signupUserInput);
  }

  @Mutation(() => User)
  signinUser(@Args('signinUserInput') signinUserInput: SigninUserInput) {
    return this.userService.signin(signinUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }
}
