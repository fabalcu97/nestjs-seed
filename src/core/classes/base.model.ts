import { ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType({ isAbstract: true })
@Schema({})
export class BaseModel extends Document {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
