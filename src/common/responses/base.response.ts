import { IBase } from '../interfaces/base.interface';
import { Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectIdScalar } from '../../graphql/scalars/object-id.scalar';

@ObjectType()
export class BaseResponse implements IBase {
  @Field((_type) => ObjectIdScalar)
  _id: Types.ObjectId;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(partial) {
    Object.assign(this, partial);
  }
}
