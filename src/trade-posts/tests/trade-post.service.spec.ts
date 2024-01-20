import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { IBookmarkService } from '../../bookmarks/interfaces/bookmark.interface';
import { TradeAction } from '../enums/trade-action.enum';
import { CreateTradePostInput } from '../inputs/trade-post.input';
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
            bookmarkTradePost: jest.fn(),
            unbookmarkTradePost: jest.fn(),
            getBookmarkedTradePosts: jest.fn(),
            isTradePostBookmarked: jest.fn(),
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
            countDocuments: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
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

  describe('createTradePost', () => {
    it('should create a trade post', async () => {
      // Mock the necessary dependencies and input data
      const userId = '65a178d35a5f64cf91e95123';
      const input: CreateTradePostInput = {
        action: TradeAction.BUY,
        price: 1000,
        title: 'title',
        description: 'description',
      };

      jest.spyOn(tradePostModel, 'countDocuments').mockResolvedValueOnce(0);
      jest
        .spyOn(tradePostModel, 'create')
        .mockResolvedValueOnce({ _id: new Types.ObjectId('65a178d35a5f64cf91e950d8') } as any);
      jest.spyOn(TradePostStorageService.prototype, 'uploadImage').mockResolvedValueOnce('image-url');
      jest.spyOn(tradePostModel, 'findByIdAndUpdate').mockResolvedValueOnce({
        _id: new Types.ObjectId('65a178d35a5f64cf91e950d8'),
        authorId: new Types.ObjectId('65a24bff8cfbf7b75ff72717'),
        comments: [],
      } as any);
      const result = await tradePostService.createTradePost(userId, input);

      // Assert the result
      expect(result).toBeDefined();
    });
  });
});
