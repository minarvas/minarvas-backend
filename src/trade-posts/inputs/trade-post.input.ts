import { Field, InputType } from '@nestjs/graphql';
import { TradeAction } from '../enums/trade-action.enum';
import { ITradePost } from '../interfaces/trade-post.interface';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { TradeStatus } from '../enums/trade-status.enum';

@InputType()
export class CreateTradePostInput implements ITradePost {
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
export class UpdateTradePostInput {
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
