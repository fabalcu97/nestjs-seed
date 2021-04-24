import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseModel } from 'core/classes/base.model';
import { BaseSchema } from 'core/classes/base.schema';

/**
 * Tenant model
 *
 * @export
 * @class Tenant
 * @extends {BaseModel}
 */
@Schema()
@ObjectType()
export class Tenant extends BaseModel {
  /**
   * Tenant id
   *
   * @type {string}
   * @memberof Tenant
   */
  @Prop({ required: true, unique: true })
  tenantId: string;
}

export const TenantSchema = new BaseSchema(Tenant).schema;
