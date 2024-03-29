import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserAuth } from '../../auth/decorators/auth.decorator';
import { Input } from '../../graphql/args/input.args';
import { AuthorizedUser } from '../../users/decorators/user.decorator';
import { UserResponse } from '../../users/responses/user.response';
import { UserService } from '../../users/user.service';
import { TradePostCommentAuth } from '../decorators/trade-post-comment-auth.decorator';
import {
  CreateTradePostCommentInput,
  DeleteTradePostCommentInput,
  GetTradePostCommentListInput,
  UpdateTradePostCommentInput,
} from '../inputs/trade-post-comment.input';
import { TradePostCommentList, TradePostCommentResponse } from '../responses/trade-post-comment.response';
import { TradePostCommentService } from '../services/trade-post-comment.service';

@Resolver(() => TradePostCommentResponse)
export class TradePostCommentResolver {
  constructor(
    private readonly tradePostCommentService: TradePostCommentService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => TradePostCommentResponse)
  @UserAuth()
  async createTradePostComment(@AuthorizedUser('id') authorId: string, @Input() input: CreateTradePostCommentInput) {
    return this.tradePostCommentService.createTradePostComment(authorId, input);
  }

  @Query(() => TradePostCommentList)
  async getTradePostCommentList(@Input() input: GetTradePostCommentListInput) {
    return this.tradePostCommentService.getTradePostCommentList(input);
  }

  @Mutation(() => TradePostCommentResponse)
  @TradePostCommentAuth()
  async updateTradePostComment(@Input() input: UpdateTradePostCommentInput) {
    return this.tradePostCommentService.updateTradePostComment(input);
  }

  @Mutation(() => TradePostCommentResponse, { nullable: true })
  @TradePostCommentAuth()
  async deleteTradePostComment(@Input() input: DeleteTradePostCommentInput) {
    return this.tradePostCommentService.deleteTradePostComment(input.tradePostCommentId);
  }

  @ResolveField(() => UserResponse)
  async author(@Parent() tradePostComment: TradePostCommentResponse) {
    return this.userService.getUser(tradePostComment.authorId);
  }
}
