import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IConfigs } from '@tt/core/configs';

export const typeOrmModuleFactory = async (
  configService: ConfigService<IConfigs>,
): Promise<TypeOrmModuleOptions> => {
  return {
    ...configService.get('database'),
  };
};
