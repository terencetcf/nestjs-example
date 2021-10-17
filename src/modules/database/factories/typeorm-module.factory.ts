import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { appConfig } from '@tt/core/configs';

export const typeOrmModuleFactory = async (): Promise<TypeOrmModuleOptions> => {
  return {
    ...appConfig().database,
  };
};
