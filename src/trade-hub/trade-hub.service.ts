import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TradeHub, TradeHubDocument } from "./schemas/trade-hub.schema";
import { Model } from "mongoose";

@Injectable()
export class TradeHubService {
  constructor(@InjectModel(TradeHub.name) private readonly tradeHubModel: Model<TradeHubDocument>) {
  }
}
