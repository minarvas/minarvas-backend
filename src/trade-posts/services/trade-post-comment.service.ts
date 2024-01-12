import { Injectable } from '@nestjs/common';
import { Model, PaginateModel, Types } from 'mongoose';
import {
  CreateTradePostCommentInput,
  GetTradePostCommentListInput,
  UpdateTradePostCommentInput,
} from '../inputs/trade-post-comment.input';
import { InjectModel } from '@nestjs/mongoose';
import { TradePostComment } from '../schemas/trade-post-comment.schema';
import { TradePostCommentList, TradePostCommentResponse } from '../responses/trade-post-comment.response';
import { TradePost, TradePostDocument } from '../schemas/trade-post.schema';
import { TradePostNotFound } from '../exceptions/trade-post.exception';

@Injectable()
export class TradePostCommentService {
  constructor(
    @InjectModel(TradePostComment.name) private readonly tradePostCommentModel: PaginateModel<TradePostComment>,
    @InjectModel(TradePost.name) private readonly tradePostModel: Model<TradePostDocument>,
  ) {}

  async createTradePostComment(authorId: Types.ObjectId, { tradePostId, ...input }: CreateTradePostCommentInput) {
    const comment = await this.tradePostCommentModel.create({ ...input, authorId });
    await this.tradePostModel.findByIdAndUpdate(tradePostId, { $push: { comments: comment._id } });
    return new TradePostCommentResponse(comment);
  }

  async getTradePostCommentList({ tradePostId, pagination }: GetTradePostCommentListInput) {
    const tradePost = await this.tradePostModel.findById(tradePostId);

    if (!tradePost) {
      throw new TradePostNotFound(tradePostId);
    }

    const comments = await this.tradePostCommentModel.paginate({ _id: tradePost.comments }, pagination.options);

    return new TradePostCommentList({
      ...comments,
      docs: comments.docs.map((doc) => new TradePostCommentResponse(doc)),
    });
  }

  async deleteTradePostComment(tradePostCommentId: string) {
    const tradePostComment = await this.tradePostCommentModel.findById(tradePostCommentId);

    if (!tradePostComment) {
      throw null;
    }

    await this.tradePostCommentModel.findByIdAndDelete(tradePostCommentId);
    return new TradePostCommentResponse(tradePostComment);
  }

  async updateTradePostComment({ tradePostCommentId, ...rest }: UpdateTradePostCommentInput) {
    const tradePostComment = await this.tradePostCommentModel.findByIdAndUpdate(tradePostCommentId, rest, {
      new: true,
    });
    return new TradePostCommentResponse(tradePostComment);
  }
}
