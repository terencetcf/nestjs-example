import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@tt/core/models';
import { generatorUtil } from '@tt/utils';
import { Repository } from 'typeorm';

import { CreateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    const dto = users.map((user) => new UserDto(user));

    return dto;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const mappedUser: Partial<User> = {
      id: generatorUtil.uuid(),
      username: createUserDto.username,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
    };

    const createdUser = await this.userRepository.save(mappedUser);

    return new UserDto(createdUser);
  }
}
