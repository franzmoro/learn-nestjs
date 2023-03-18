import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/models';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email: dto.email,
        hash,
      },
      select: { id: true, email: true, hash: false },
    });
    return user;
  }
  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      select: { id: true, email: true, hash: false },
    });

    return user;
  }
}
