import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

import { typeOrmDataSourceFactory, typeOrmModuleFactory } from './factories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmModuleFactory,
      dataSourceFactory: typeOrmDataSourceFactory,
      inject: [ConfigService, PinoLogger],
    }),
  ],
})
export class DatabaseModule {}
