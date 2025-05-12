export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export interface IEnvironmentVariables {
  NODE_ENV: Environment;
  APP_PORT: number;
  API_PREFIX: string;
  SERVER_URL: string;
  CLIENT_URL: string;

  DB_CONNECTION_STRING: string;

  JWT_SECRET: string;
  JWT_EXPIRATION_DATE: string;
}
