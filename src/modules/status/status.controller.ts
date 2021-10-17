import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { VersionDto } from './dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiExcludeEndpoint()
  @Get()
  getStatus(): VersionDto {
    return this.statusService.getStatus();
  }
}
