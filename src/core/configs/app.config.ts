import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvKey } from '@tt/core/constants';
import { envUtil } from '@tt/utils';
import dotenv from 'dotenv';

dotenv.config();

const isDevelopment = (): boolean =>
  envUtil.get(EnvKey.NODE_ENV) === 'development';

const defaultConnectionOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envUtil.get(EnvKey.DB_HOST),
  port: envUtil.getInt(EnvKey.DB_PORT),
  username: envUtil.get(EnvKey.DB_USERNAME),
  password: envUtil.get(EnvKey.DB_PASSWORD),
  database: envUtil.get(EnvKey.DB_NAME),
  schema: envUtil.get(EnvKey.DB_SCHEMA),
  entities: [__dirname + '/../models/*.entity.{ts,js}'],
  connectTimeoutMS: 1000,
  migrationsRun: false,
  synchronize: false,
  maxQueryExecutionTime: 300,
  logging: isDevelopment() ? true : ['error'],
};

export interface IConfigs {
  env: string;
  database: TypeOrmModuleOptions;
  port: number;
  version: string;
}

export const appConfig = (): IConfigs => ({
  env: envUtil.get(EnvKey.NODE_ENV, 'dev'),
  database: defaultConnectionOptions,
  port: envUtil.getInt(EnvKey.API_PORT, 8080),
  version: 'v1',
});
