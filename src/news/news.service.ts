import { Injectable } from '@nestjs/common';
import { NewsTopic } from '@prisma/client';
import * as NodeCache from 'node-cache';
import { PrismaService } from 'src/prisma/prisma.service';
import { News } from './entities/news.entity';

const newsCache = new NodeCache();

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findForUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { news_topics_followed: true },
    });

    if (!user.news_topics_followed) return [];

    const userNews = await this.generateUsersNews(user.news_topics_followed);
    return userNews;
  }

  async generateUsersNews(
    news_topics_followed: NewsTopic[],
  ): Promise<Array<News>> {
    const news = await Promise.all(
      news_topics_followed.map(async (topic) => {
        const news = await this.getNewsForTopic(topic);
        return news;
      }),
    );

    const newsSliced = news.map((news) => news.slice(0, 5));

    return newsSliced.flat().reduce((acc, curr) => {
      if (!acc.some((news) => news.title === curr.title)) {
        acc.push(curr);
      }
      return acc;
    }, [] as Array<News>);
  }

  async getNewsForTopic(topic: NewsTopic): Promise<Array<News>> {
    const news = newsCache.get(topic) as Array<News> | undefined;
    if (news) console.log('Using cached news');
    if (news) return news;

    const newNews = await fetch(
      `https://newsapi.org/v2/everything?q=${topic
        .toLowerCase()
        .replace('_', ' ')}&apiKey=${
        process.env.NEWS_API_KEY
      }&sortBy=popularity&excludeDomains=yahoo.com`,
    );

    const newNewsJson = (
      (await newNews.json()) as {
        articles: Array<News>;
      }
    ).articles.filter((article) => article.title !== '[Removed]');

    newsCache.set(topic, newNewsJson, 60 * 60 * 24); // 24 hours
    return newNewsJson as Array<News>;
  }
}
