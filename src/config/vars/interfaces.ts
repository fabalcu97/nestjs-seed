export interface DatabaseVars {
  uri: string;
  authSource: string;
  dbName: string;
}

export interface TenancyVars {
  tenantIdentifier: string;
}

export interface JwtVars {
  secretKey: string;
  expiresIn: number;
}
