import { Injectable, NotFoundException } from '@nestjs/common';
import { TenancyValidator } from '@needle-innovision/nestjs-tenancy';

import { TenantsService } from 'modules/tenants/service';

@Injectable()
export class TenantValidator implements TenancyValidator {
  private tenantId: string;

  constructor(private tenantsService: TenantsService) {}

  setTenantId(tenantId: string): TenancyValidator {
    this.tenantId = tenantId;
    return this;
  }

  async validate(): Promise<void> {
    const exist = await this.tenantsService.exists(this.tenantId);
    if (!exist) {
      throw new NotFoundException(`Tenant not found.`);
    }
  }
}
