import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '@tt/core/configs';
import { DatabaseModule } from '@tt/modules/database';
import { StatusModule } from '@tt/modules/status';
import { UserModule } from '@tt/modules/user';
import { LoggerModule } from 'nestjs-pino';

const API_MODULES = [StatusModule, UserModule];

const THIRD_PARTY_MODULES = [LoggerModule.forRoot()];

const DATABASE_MODULES = [DatabaseModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    ...DATABASE_MODULES,
    ...THIRD_PARTY_MODULES,
    ...API_MODULES,
  ],
})
export class AppModule {}
