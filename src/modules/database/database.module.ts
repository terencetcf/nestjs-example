import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

import { typeOrmConnectionFactory, typeOrmModuleFactory } from './factories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmModuleFactory,
      connectionFactory: typeOrmConnectionFactory,
      inject: [ConfigService, PinoLogger],
    }),
  ],
})
export class DatabaseModule {}
