import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupUserInput } from './dto/signup-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SetUserInfoInput } from './dto/set-user-info.input';
import { SigninUserInput } from './dto/signin-user.input';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(signupUserInput: SignupUserInput) {
    const unhashedPassword = signupUserInput.password;
    const hashedPassword = await bcrypt.hash(
      unhashedPassword,
      Number(process.env.HASH_SALT),
    );
    const { password, ...rest } = signupUserInput;

    await this.prisma.user.create({
      data: {
        ...rest,
        password_hash: hashedPassword,
        wallet: {
          create: {},
        },
      },
    });

    return this.signin({
      email: signupUserInput.email,
      password: unhashedPassword,
    });
  }

  async signin(signinUserInput: SigninUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signinUserInput.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      signinUserInput.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateJWT(user);
  }

  async generateJWT(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        user_info: true,
        wallet: {
          include: {
            transactions: true,
          },
        },
        financial_goal: {
          include: {
            transactions: true,
          },
        },
      },
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
