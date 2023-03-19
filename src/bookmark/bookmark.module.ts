import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmark.controller';
import { BookmarksService } from './bookmark.service';

@Module({
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
