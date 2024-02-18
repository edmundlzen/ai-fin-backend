import { Injectable } from '@nestjs/common';
import { SignupUserInput } from './dto/signup-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
        email: signupUserInput.email,
        password_hash: hashedPassword,
        username: signupUserInput.username,
        phone: signupUserInput.phone,
        birth_year: signupUserInput.birthYear,
      },
    });
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
        password_hash: updateUserInput.password,
        username: updateUserInput.username,
        phone: updateUserInput.phone,
        birth_year: updateUserInput.birthYear,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
