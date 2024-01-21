import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IBookmarkService } from '../../bookmarks/interfaces/bookmark.interface';
import { TradePostComment } from '../schemas/trade-post-comment.schema';
import { TradePost, TradePostDocument } from '../schemas/trade-post.schema';
import { TradePostCommentService } from '../services/trade-post-comment.service';
import { TradePostPaginationService } from '../services/trade-post-pagination.service';
import { TradePostStorageService } from '../services/trade-post-storage.service';
import { TradePostService } from '../trade-post.service';

describe('TradePostService', () => {
  let tradePostService: TradePostService;
  let bookmarkService: IBookmarkService;
  let tradePostModel: Model<TradePostDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradePostService,
        TradePostPaginationService,
        TradePostCommentService,
        {
          provide: IBookmarkService,
          useValue: {
            getBookmark: jest.fn(),
          },
        },
        {
          provide: TradePostStorageService,
          useValue: {
            uploadImage: jest.fn(),
          },
        },
        {
          provide: getModelToken(TradePost.name),
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: getModelToken(TradePostComment.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    tradePostService = module.get<TradePostService>(TradePostService);
    bookmarkService = module.get<IBookmarkService>(IBookmarkService);
    tradePostModel = module.get<Model<TradePostDocument>>(getModelToken(TradePost.name));
  });

  describe('getTradePost', () => {
    it('should return trade post', async () => {
      const userId = 'userId';
      const tradePostId = 'tradePostId';
      const tradePost = {
        id: tradePostId,
        authorId: 'authorId',
        title: 'title',
        description: 'description',
        image: 'image',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(tradePostModel, 'findById').mockResolvedValueOnce(tradePost as any);
      jest.spyOn(bookmarkService, 'getBookmark').mockResolvedValueOnce({ tradePostIds: ['tradePostId'] } as any);

      const result = await tradePostService.getTradePost(userId, tradePostId);

      expect(result.isBookmarked).toBe(true);
    });
  });
});
