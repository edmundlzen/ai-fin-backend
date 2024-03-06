import { Injectable } from '@nestjs/common';
import { SignupUserInput } from './dto/signup-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SetUserInfoInput } from './dto/set-user-info.input';
import { SigninUserInput } from './dto/signin-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(signupUserInput: SignupUserInput) {
    const unhashedPassword = signupUserInput.password;
    const hashedPassword = await bcrypt.hash(
      unhashedPassword,
      Number(process.env.HASH_SALT),
    );

    return this.prisma.user.create({
      data: {
        ...signupUserInput,
        password_hash: hashedPassword,
        wallet: {
          create: {},
        },
      },
    });
  }

  async signin(signinUserInput: SigninUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signinUserInput.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      signinUserInput.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserInput.email,
        username: updateUserInput.username,
        phone: updateUserInput.phone,
        birth_year: updateUserInput.birth_year,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  setInfo(id: string, setUserInput: SetUserInfoInput) {
    return this.prisma.userInfo.upsert({
      where: { userId: id },
      update: {
        ...setUserInput,
      },
      create: {
        user: {
          connect: { id },
        },
        ...setUserInput,
      },
    });
  }
}
