import { DatabaseVars } from 'config/vars/interfaces';

function getDatabaseURI() {
  const port = process.env.DATABASE_PORT;
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const databaseName = process.env.MAIN_DATABASE_NAME;

  return `mongodb://${user}:${password}@${host}:${port}/${databaseName}`;
}

export default (): { database: DatabaseVars } => ({
  database: {
    uri: getDatabaseURI(),
    authSource: process.env.MAIN_DATABASE_NAME,
    dbName: process.env.MAIN_DATABASE_NAME,
  },
});
