import { InternalServerErrorException } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmDataSourceFactory = async (options?: DataSourceOptions) => {
  if (!options) {
    throw new InternalServerErrorException(
      'Connection options is not available!',
    );
  }

  return new DataSource(options);
};
