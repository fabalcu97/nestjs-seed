import { TenancyVars } from 'config/vars/interfaces';

export default (): { tenancy: TenancyVars } => ({
  tenancy: {
    tenantIdentifier: process.env.TENANT_IDENTIFIER,
  },
});
