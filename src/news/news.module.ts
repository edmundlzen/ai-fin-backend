import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [NewsResolver, NewsService, PrismaService],
})
export class NewsModule {}
