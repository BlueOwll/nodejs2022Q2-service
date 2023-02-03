import { Injectable } from '@nestjs/common';
import { UsersDbStorage } from 'src/database/users-db/users-db.storage';
import { CreateUserDto } from './dto/create-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersDbStorage: UsersDbStorage) {}

  create(createUserDto: CreateUserDto): OutputUserDto {
    const { password, ...outputUser } =
      this.usersDbStorage.create(createUserDto);
    return outputUser as OutputUserDto;
  }

  findAll() {
    return this.usersDbStorage.findAll().map((item) => {
      const { password, ...outputUser } = item;
      return outputUser as OutputUserDto;
    });
  }

  findOne(id: string) {
    const user = this.usersDbStorage.findOne(id);
    if (user) {
      const { password, ...outputUser } = user;
      return outputUser as OutputUserDto;
    }
    return null;
  }

  update(id: number, updateUserDto: UpdatePasswordDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
