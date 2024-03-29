import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(
    createTransactionInput: CreateTransactionInput,
    user_id: string,
  ) {
    const { wallet_id, financial_goal_id, ...rest } = createTransactionInput;
    await this.userService.addExperience(user_id, rest.amount);
    return await this.prisma.transaction.create({
      data: {
        ...rest,
        wallet: {
          connect: { id: wallet_id },
        },
        financial_goal: {
          connect: { id: financial_goal_id },
        },
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany();
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTransactionInput: UpdateTransactionInput) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...updateTransactionInput,
      },
    });
  }

  remove(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
