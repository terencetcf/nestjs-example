import { ApiProperty } from '@nestjs/swagger';

export class VersionDto {
  @ApiProperty()
  env!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  version!: string;
}
