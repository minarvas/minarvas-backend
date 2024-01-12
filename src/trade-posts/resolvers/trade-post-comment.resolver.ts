import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TradePostCommentList, TradePostCommentResponse } from '../responses/trade-post-comment.response';
import { TradePostCommentService } from '../services/trade-post-comment.service';
import { Authorize } from '../../auth/decorators/auth.decorator';
import { AuthorizedUser } from '../../users/decorators/user.decorator';
import { Types } from 'mongoose';
import { Input } from '../../graphql/args/input.args';
import {
  CreateTradePostCommentInput,
  DeleteTradePostCommentInput,
  GetTradePostCommentListInput,
  UpdateTradePostCommentInput,
} from '../inputs/trade-post-comment.input';
import { UserResponse } from '../../users/responses/user.response';
import { UserService } from '../../users/user.service';

@Resolver(() => TradePostCommentResponse)
export class TradePostCommentResolver {
  constructor(
    private readonly tradePostCommentService: TradePostCommentService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => TradePostCommentResponse)
  @Authorize()
  async createTradePostComment(
    @AuthorizedUser('_id') authorId: Types.ObjectId,
    @Input() input: CreateTradePostCommentInput,
  ) {
    return this.tradePostCommentService.createTradePostComment(authorId, input);
  }

  @Query(() => TradePostCommentList)
  async getTradePostCommentList(@Input() input: GetTradePostCommentListInput) {
    return this.tradePostCommentService.getTradePostCommentList(input);
  }

  @Mutation(() => TradePostCommentResponse)
  @Authorize()
  async updateTradePostComment(@Input() input: UpdateTradePostCommentInput) {
    return this.tradePostCommentService.updateTradePostComment(input);
  }

  @Mutation(() => TradePostCommentResponse, { nullable: true })
  @Authorize()
  async deleteTradePostComment(@Input() input: DeleteTradePostCommentInput) {
    return this.tradePostCommentService.deleteTradePostComment(input.tradePostCommentId);
  }

  @ResolveField(() => UserResponse)
  async author(@Parent() tradePostComment: TradePostCommentResponse) {
    return this.userService.getUser(tradePostComment.authorId);
  }
}
