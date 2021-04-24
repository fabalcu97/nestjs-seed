import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export class BaseSchema {
  private mSchema: Schema<any>;

  constructor(document: Type<unknown>) {
    this.mSchema = SchemaFactory.createForClass(document);
    this.mSchema.set('timestamps', true);
  }

  public get schema(): Schema<any> {
    return this.mSchema;
  }
}
