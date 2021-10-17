import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    isArray: true,
    description: 'List of users',
  })
  @Get('users')
  async getUsers(): Promise<UserDto[]> {
    const result = await this.userService.getUsers();

    return result;
  }

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `Invalid payload`,
  })
  @Post('users')
  async createUser(@Body() payload: CreateUserDto): Promise<UserDto> {
    const result = await this.userService.createUser(payload);

    return result;
  }
}
