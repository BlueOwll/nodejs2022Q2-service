import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordError } from 'src/constants/errors';
//import { UsersDbStorage } from 'src/database/storages/users-db.storage';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<OutputUserDto> {
    const { password, ...outputUser } = await this.usersRepository.save(
      this.usersRepository.create({
        ...createUserDto,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
    );
    return outputUser as OutputUserDto;
  }

  async findAll() {
    return (await this.usersRepository.find()).map((item) => {
      return this.getOutputUser(item);
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return this.getOutputUser(user);
    }
    return null;
  }

  async changePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) return null;

    if (user.password !== updatePasswordDto.oldPassword)
      throw new PasswordError('Wrong password');

    const updatedUser = await this.usersRepository.save({
      id,
      password: updatePasswordDto.newPassword,
      updatedAt: Date.now(),
    });
    console.log(user);
    console.log(updatedUser);
    console.log(Date.now());
    console.log(typeof Date.now());
    return this.getOutputUser({ ...user, ...updatedUser });

    // return await this.usersRepository.findOneBy({ id });
    // const user = await this.usersRepository.update(id, updatePasswordDto);
    // if (user) {
    //   return this.getOutputUser(user);
    // }
    // return null;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      console.log(await this.usersRepository.delete(id));
      return this.getOutputUser(user);
    }
    return null;
  }

  private getOutputUser(user: User) {
    const { password, ...outputUser } = user;
    return outputUser as OutputUserDto;
  }
}
