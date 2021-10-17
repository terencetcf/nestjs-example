import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

import { typeOrmConnectionFactory, typeOrmModuleFactory } from './factories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmModuleFactory,
      connectionFactory: typeOrmConnectionFactory,
      inject: [PinoLogger],
    }),
  ],
})
export class DatabaseModule {}
