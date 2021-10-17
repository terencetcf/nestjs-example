import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigs } from '@tt/core/configs';
import { name, version } from '@tt/package';

import { VersionDto } from './dto';

@Injectable()
export class StatusService {
  constructor(private configService: ConfigService<IConfigs>) {}

  getStatus(): VersionDto {
    return {
      env: `${this.configService.get('env')}`,
      name: `${name}`,
      version: `${version}`,
    };
  }
}
