import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findForUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { news_topics_followed: true },
    });

    if (!user.news_topics_followed) return [];

    return user.news_topics_followed;
  }
}
