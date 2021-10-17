import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { name, version } from '@tt/package';

import { VersionDto } from './dto';

@Injectable()
export class StatusService {
  constructor(private configService: ConfigService) {}

  getStatus(): VersionDto {
    return {
      env: `${this.configService.get('env')}`,
      name: `${name}`,
      version: `${version}`,
    };
  }
}
