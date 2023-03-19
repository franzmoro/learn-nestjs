import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from '../models';

@Injectable()
export class BookmarksService {
  constructor(private prismaService: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prismaService.bookmark.findMany({ where: { userId } });
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prismaService.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });
    if (!bookmark) throw new NotFoundException('bookmark not found');
    return bookmark;
  }

  createBookmark(userId: number, dto: CreateBookmarkDto) {
    return this.prismaService.bookmark.create({
      data: { ...dto, userId },
    });
  }

  async updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!bookmark) throw new NotFoundException();
    if (bookmark.userId !== userId) throw new UnauthorizedException();

    return this.prismaService.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!bookmark) throw new NotFoundException();
    if (bookmark.userId !== userId) throw new UnauthorizedException();

    await this.prismaService.bookmark.delete({ where: { id: bookmarkId } });
  }
}
