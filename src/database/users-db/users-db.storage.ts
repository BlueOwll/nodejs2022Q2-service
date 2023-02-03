import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersDbStorage {
  private users: User[] = [];
  private count: 0;

  create(user: CreateUserDto): User {
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    return this.users.find((item) => item.id === id);
  }
}
