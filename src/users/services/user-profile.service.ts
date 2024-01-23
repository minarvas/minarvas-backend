import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { adjectives, nouns } from '../constants';
import { User, UserDocument } from '../schemas/user.schema';

type Noun = {
  name: string;
  imageUrl: string;
};

@Injectable()
export class UserProfileService {
  private readonly adjectives: string[];
  private readonly nouns: Noun[];

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    this.adjectives = adjectives;
    this.nouns = nouns;
    console.log(this.adjectives);
  }

  async generateName() {
    const randomAdjective: string = this.getRandomElement<string>(this.adjectives);
    const randomNoun: Noun = this.getRandomElement<Noun>(this.nouns);
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
