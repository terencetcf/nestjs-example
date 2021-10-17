import { ApiProperty } from '@nestjs/swagger';
import { User } from '@tt/core/models';

export class UserDto {
  @ApiProperty({ type: 'uuid' })
  id: string;

  @ApiProperty({
    maxLength: 50,
  })
  username: string;

  @ApiProperty({
    maxLength: 100,
  })
  first_name: string;

  @ApiProperty({
    maxLength: 100,
  })
  last_name: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
  }
}
