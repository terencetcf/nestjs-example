import { InternalServerErrorException } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';

export const typeOrmConnectionFactory = async (options?: ConnectionOptions) => {
  if (!options) {
    throw new InternalServerErrorException(
      'Connection options is not available!',
    );
  }

  const connection = await createConnection(options);
  return connection;
};
