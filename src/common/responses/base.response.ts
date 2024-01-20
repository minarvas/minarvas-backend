import { Field, ObjectType } from '@nestjs/graphql';
import { IBase } from '../interfaces/base.interface';

@ObjectType()
export class BaseResponse implements IBase {
  @Field(() => String, { description: 'The id of the object' })
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(partial) {
    this.id = partial?.id;
    this.createdAt = partial?.createdAt;
    this.updatedAt = partial?.updatedAt;
  }
}
