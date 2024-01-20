import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { TradePostNotFound } from '../exceptions/trade-post.exception';
import {
  CreateTradePostCommentInput,
  GetTradePostCommentListInput,
  UpdateTradePostCommentInput,
} from '../inputs/trade-post-comment.input';
import { TradePostCommentList, TradePostCommentResponse } from '../responses/trade-post-comment.response';
import { TradePostComment } from '../schemas/trade-post-comment.schema';
import { TradePost, TradePostDocument } from '../schemas/trade-post.schema';

@Injectable()
export class TradePostCommentService {
  private readonly logger = new Logger(TradePostCommentService.name);

  constructor(
    @InjectModel(TradePostComment.name) private readonly tradePostCommentModel: PaginateModel<TradePostComment>,
    @InjectModel(TradePost.name) private readonly tradePostModel: Model<TradePostDocument>,
  ) {}

  async createTradePostComment(authorId: string, { tradePostId, ...input }: CreateTradePostCommentInput) {
    const comment = await this.tradePostCommentModel.create({ ...input, authorId });
    await this.tradePostModel.findByIdAndUpdate(tradePostId, { $push: { comments: comment.id } });
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
    const tradePostComment = await this.getTradePostComment(tradePostCommentId);
    await this.tradePostCommentModel.findByIdAndDelete(tradePostCommentId);
    return tradePostComment;
  }

  async deleteTradePostComments(tradePostCommentIds: string[] | TradePostComment[]) {
    try {
      await this.tradePostCommentModel.deleteMany({ _id: tradePostCommentIds });
    } catch (err) {
      this.logger.error('Fail to delete trade post comments', err);
    }
  }

  async updateTradePostComment({ tradePostCommentId, ...rest }: UpdateTradePostCommentInput) {
    const tradePostComment = await this.tradePostCommentModel.findByIdAndUpdate(tradePostCommentId, rest, {
      new: true,
    });
    return new TradePostCommentResponse(tradePostComment);
  }

  async getTradePostComment(tradePostCommentId: string) {
    const tradePostComment = await this.tradePostCommentModel.findById(tradePostCommentId);
    if (!tradePostComment) {
      throw null;
    }
    return new TradePostCommentResponse(tradePostComment);
  }
}
