import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@ObjectType()
export class NewsSource {
  @Field({
    nullable: true,
  })
  id: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class News {
  @Field(() => NewsSource)
  source: NewsSource;

  @Field({
    nullable: true,
  })
  author?: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  url: string;

  @Field({
    nullable: true,
  })
  urlToImage?: string;

  @Field(() => String)
  publishedAt: string;

  @Field(() => String)
  content: string;
}
