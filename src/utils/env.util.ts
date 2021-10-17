import { InternalServerErrorException } from '@nestjs/common';
import { EnvKey } from '@tt/core/constants';

const getEnvValue = (key: string, defaultValue?: SafeAny): string => {
  const value = process.env[key];
  if (!value && defaultValue == undefined) {
    throw new InternalServerErrorException(
      `Unable find environment variable - '${key}'`,
    );
  }

  return value || defaultValue;
};

const getInt = (key: string, defaultValue?: SafeAny): number => {
  const value = getEnvValue(key, defaultValue);

  return parseInt(value);
};

const isDevelopment = (): boolean =>
  getEnvValue(EnvKey.NODE_ENV) === 'development';

export const envUtil = {
  get: getEnvValue,
  getInt,
  isDevelopment,
};
