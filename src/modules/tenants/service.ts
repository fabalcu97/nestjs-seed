import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tenant } from 'modules/tenants/model';

@Injectable()
export class TenantsService {
  constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

  async createTenant(tenantId: string): Promise<Tenant> {
    const tenant = await this.tenantModel.create({ tenantId });
    return tenant;
  }

  async getTenant(tenantId: string): Promise<Tenant> {
    const tenant = await this.tenantModel.findOne({ tenantId });
    if (!tenant) {
      throw new BadRequestException('Tenant not found');
    }
    return tenant;
  }

  async exists(tenantId: string): Promise<boolean> {
    return this.tenantModel.exists({ tenantId });
  }
}
