import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { SortDirection } from '../../common/enums/pagination.enum';
import { PaginateInput, PaginateOption } from '../../common/inputs/pagination.input';
import { TradeAction } from '../enums/trade-action.enum';
import { TradeStatus } from '../enums/trade-status.enum';
import { ITradePost } from '../interfaces/trade-post.interface';

@InputType()
export class CreateTradePostInput implements Omit<ITradePost, 'authorId' | 'status'> {
  @Field(() => TradeAction)
  @IsEnum(TradeAction)
  action: TradeAction;

  @Field({ description: 'The title of the trade post. Max length is 30.' })
  @IsString()
  @Length(1, 30)
  title: string;

  @Field({ nullable: true, description: 'The description of the trade post. Max length is 200.' })
  @IsString()
  @IsOptional()
  @Length(1, 200)
  description?: string;

  @Field()
  @IsPositive()
  @IsInt()
  price: number;
}

@InputType()
export class GetTradePostInput {
  @Field()
  @IsString()
  @Length(24, 24)
  tradePostId: string;
}

@InputType()
export class UpdateTradePostInput implements Partial<ITradePost> {
  @Field()
  @IsString()
  @Length(24, 24)
  tradePostId: string;

  @Field({ nullable: true, description: 'The title of the trade post. Max length is 30.' })
  @IsString()
  @IsOptional()
  @Length(1, 30)
  title?: string;

  @Field({ nullable: true, description: 'The description of the trade post. Max length is 200.' })
  @IsString()
  @IsOptional()
  @Length(1, 200)
  description?: string;

  @Field({ nullable: true })
  @IsPositive()
  @IsInt()
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @IsEnum(TradeStatus)
  @IsOptional()
  status?: TradeStatus;
}

@InputType()
export class PaginateTradePostQuery {
  @Field(() => TradeAction, { nullable: true, description: 'Filter trade post which equals to input action' })
  @IsEnum(TradeAction)
  @IsOptional()
  action?: TradeAction;

  @Field({ nullable: true, description: 'Filter trade post which contains input title' })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true, description: 'Filter trade post which price is greater than or equal to input minPrice' })
  @IsPositive()
  @IsInt()
  @IsOptional()
  minPrice?: number;

  @Field({ nullable: true, description: 'Filter trade post which price is less than or equal to input maxPrice' })
  @IsPositive()
  @IsInt()
  @IsOptional()
  maxPrice?: number;

  @Field(() => [TradeStatus], {
    nullable: true,
    description: 'Filter trade post which status is included in input status',
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @IsEnum(TradeStatus, { each: true })
  status?: TradeStatus[];

  @Field({ nullable: true, description: 'Filter trade post which authorId is equal to input authorId' })
  @IsString()
  @IsOptional()
  authorId?: string;

  @Field({ nullable: true, description: 'Filter trade post which createdAt is greater than or equal to input start' })
  @IsString()
  @IsOptional()
  start?: string;

  @Field({ nullable: true, description: 'Filter trade post which createdAt is less than or equal to input end' })
  @IsString()
  @IsOptional()
  end?: string;
}

@InputType()
export class TradePostSortOption {
  @Field(() => SortDirection, { nullable: true, description: 'Sort trade post by createTime.' })
  @IsEnum(SortDirection)
  @IsOptional()
  createdAt?: SortDirection;

  @Field(() => SortDirection, { nullable: true, description: 'Sort trade post by price.' })
  @IsEnum(SortDirection)
  @IsOptional()
  price?: SortDirection;
}

@InputType()
export class PaginateTradePostOption extends PaginateOption {
  @Field(() => TradePostSortOption, { nullable: true })
  @ValidateNested()
  @Type(() => TradePostSortOption)
  sort: TradePostSortOption;
}

@InputType()
export class PaginateTradePostInput extends PaginateInput {
  @Field(() => PaginateTradePostQuery, { nullable: true })
  @ValidateNested()
  @Type(() => PaginateTradePostQuery)
  query: PaginateTradePostQuery;

  @Field(() => PaginateTradePostOption, { nullable: true })
  @ValidateNested()
  @Type(() => PaginateTradePostOption)
  options: PaginateTradePostOption;
}

@InputType()
export class BookmarkTradePostInput {
  @Field({ description: 'The trade post id that the user want to bookmark' })
  @IsString()
  tradePostId: string;
}
