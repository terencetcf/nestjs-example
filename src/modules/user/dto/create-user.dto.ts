import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty()
  @Length(2, 50)
  username!: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @Length(2, 100)
  first_name!: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @Length(2, 100)
  last_name!: string;
}
