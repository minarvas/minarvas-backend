import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { User, UserDocument } from '../schemas/user.schema';

type Noun = {
  name: string;
  imageUrl: string;
};

@Injectable()
export class UserProfileService {
  private words: {
    adjectives: string[];
    nouns: Noun[];
  };

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    const jsonFilePath = path.resolve(__dirname, '../json/words.json');
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    this.words = JSON.parse(jsonData);
  }

  async generateName() {
    const randomAdjective: string = this.getRandomElement<string>(this.words.adjectives);
    const randomNoun: Noun = this.getRandomElement<Noun>(this.words.nouns);
    const name = `${randomAdjective} ${randomNoun.name}`;
    const tag = await this.getTag(name);
    return {
      name,
      tag,
      image: randomNoun.imageUrl,
    };
  }

  private async getTag(name: string) {
    const lastTag = await this.userModel.findOne({ name }).sort({ tag: -1 });
    const tag = !!lastTag ? lastTag.tag + 1 : 1;
    return tag;
  }

  private getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}
