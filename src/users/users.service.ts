import { Injectable } from '@nestjs/common';
import { UsersDbStorage } from 'src/database/storages/users-db.storage';
import { CreateUserDto } from './dto/create-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersDbStorage: UsersDbStorage) {}

  async create(createUserDto: CreateUserDto): Promise<OutputUserDto> {
    const { password, ...outputUser } = await this.usersDbStorage.create(
      createUserDto,
    );
    return outputUser as OutputUserDto;
  }

  async findAll() {
    return (await this.usersDbStorage.findAll()).map((item) => {
      return this.getOutputUser(item);
    });
  }

  async findOne(id: string) {
    const user = await this.usersDbStorage.findOne(id);
    if (user) {
      return this.getOutputUser(user);
    }
    return null;
  }

  async changePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersDbStorage.changePassword(
      id,
      updatePasswordDto,
    );
    if (user) {
      return this.getOutputUser(user);
    }
    return null;
  }

  async remove(id: string) {
    const user = await this.usersDbStorage.delete(id);
    if (user) {
      return this.getOutputUser(user);
    }
    return null;
  }

  private getOutputUser(user: User) {
    const { password, ...outputUser } = user;
    return outputUser as OutputUserDto;
  }
}
