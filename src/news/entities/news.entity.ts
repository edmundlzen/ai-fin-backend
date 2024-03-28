import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@ObjectType()
export class News {
  @Field(() => String)
  source: string;

  @Field(() => String)
  author: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  url: number;

  @Field(() => Int)
  urlToImage: number;

  @Field(() => Date)
  publishedAt: Date;

  @Field(() => Date)
  content: Date;
}
