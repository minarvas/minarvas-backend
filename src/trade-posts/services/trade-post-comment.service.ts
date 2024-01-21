import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
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
    const session = await this.tradePostCommentModel.startSession();

    const result = await session.withTransaction(async () => {
      const comment = await this.tradePostCommentModel.create({ ...input, authorId, postId: tradePostId });
      await this.tradePostModel.findByIdAndUpdate(tradePostId, { $push: { comments: comment.id } });
      return new TradePostCommentResponse(comment);
    });

    session.endSession();
    return result;
  }

  async getTradePostCommentList({ tradePostId, pagination }: GetTradePostCommentListInput) {
    const paginatedResult = await this.tradePostCommentModel.paginate({ postId: tradePostId }, pagination.options);

    return new TradePostCommentList({
      ...paginatedResult,
      docs: paginatedResult.docs.map((doc) => new TradePostCommentResponse(doc)),
    });
  }

  async deleteTradePostComment(tradePostCommentId: string) {
    const tradePostComment = await this.getTradePostComment(tradePostCommentId);
    if (!tradePostComment) return null;

    const session = await this.tradePostCommentModel.startSession();
    const result = await session.withTransaction(async () => {
      await this.tradePostCommentModel.findByIdAndDelete(tradePostCommentId);
      await this.tradePostModel.findOneAndUpdate(
        { _id: tradePostComment.postId },
        { $pull: { comments: tradePostCommentId } },
      );
      return tradePostComment;
    });

    return result;
  }

  async deleteTradePostComments(tradePostId: string) {
    try {
      await this.tradePostCommentModel.deleteMany({ postId: tradePostId });
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
