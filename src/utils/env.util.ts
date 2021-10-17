import { InternalServerErrorException } from '@nestjs/common';
import { EnvKey } from '@tt/core/constants';

const getEnvValue = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new InternalServerErrorException(
      `Unable find environment variable - '${key}'`,
    );
  }

  return value;
};

const isDevelopment = (): boolean =>
  getEnvValue(EnvKey.NODE_ENV) === 'development';

export const envUtil = {
  get: getEnvValue,
  isDevelopment,
};
