import { Field, InputType } from '@nestjs/graphql';
import { TradeAction } from '../enums/trade-action.enum';
import { ITradePost } from '../interfaces/trade-post.interface';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Length, ValidateNested } from 'class-validator';
import { TradeStatus } from '../enums/trade-status.enum';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';

@InputType()
export class CreateTradePostInput implements Omit<ITradePost, 'authorId' | 'status'> {
  @Field(() => TradeAction)
  @IsEnum(TradeAction)
  action: TradeAction;

  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
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

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
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
  @Field(() => TradeAction, { nullable: true })
  @IsEnum(TradeAction)
  @IsOptional()
  action?: TradeAction;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

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
export class PaginateTradePostOption implements mongoose.PaginateOptions {
  @Field({ nullable: true })
  @IsPositive()
  @IsInt()
  @IsOptional()
  page?: number;

  @Field({ nullable: true })
  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @Field({ nullable: true })
  @IsPositive()
  @IsInt()
  @IsOptional()
  offset?: number;
}

@InputType()
export class PaginateTradePostsInput {
  @Field(() => PaginateTradePostQuery, { nullable: true })
  @ValidateNested()
  @Type(() => PaginateTradePostQuery)
  query: PaginateTradePostQuery;

  @Field(() => PaginateTradePostOption, { nullable: true })
  @ValidateNested()
  @Type(() => PaginateTradePostOption)
  options: PaginateTradePostOption;
}
