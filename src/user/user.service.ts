import { Injectable, NotFoundException } from '@nestjs/common';
import { EditUserDto } from '../models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    if (!user) throw new NotFoundException('user not found');

    delete user.hash;

    return user;
  }
}
