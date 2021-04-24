import { Controller, Get } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Tenant } from 'modules/tenants/model';
import { TenantsService } from 'modules/tenants/service';
import { PublicEndpoint } from 'tenant-modules/auth/decorators';

@PublicEndpoint()
@Resolver(of => Tenant)
export class TenantResolver {
  constructor(private tenantsService: TenantsService) {}

  /**
   * Create tenant
   *
   * @param {string} tenantId
   * @returns {Promise<Tenant>}
   * @memberof TenantResolver
   */
  @Mutation(type => Tenant)
  async createTenant(@Args('tenantId') tenantId: string): Promise<Tenant> {
    return this.tenantsService.createTenant(tenantId);
  }

  /**
   * Get tenant by tenant id
   *
   * @param {string} tenantId: tenant id
   * @returns {Promise<Tenant>}: Resolves to a tenant
   * @memberof TenantResolver
   */
  @Query(type => Tenant)
  async getTenant(@Args('tenantId') tenantId: string): Promise<Tenant> {
    return this.tenantsService.getTenant(tenantId);
  }
}
