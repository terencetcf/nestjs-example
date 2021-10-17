import { appConfig, IConfigs } from '@tt/core/configs';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

export const TEST_DB_CONFIG: ConnectionOptions = {
  type: 'better-sqlite3',
  database: ':memory:',
  entities: [path.join(__dirname, '/../../src/core/models/*.entity{.ts,.js}')],
  synchronize: true,
  logging: false,
};

export const testConfiguration = (): IConfigs => {
  return {
    ...appConfig(),
    database: TEST_DB_CONFIG,
  };
};
