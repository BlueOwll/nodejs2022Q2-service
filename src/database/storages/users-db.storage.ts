import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';

export class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordError';
  }
}

@Injectable()
export class UsersDbStorage {
  private users: User[] = [];
  private count: 0;

  async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((item) => item.id === id);
  }

  async changePassword(id: string, dto: UpdatePasswordDto): Promise<User> {
    const userIdx = this.users.findIndex((entity) => entity.id === id);

    if (userIdx === -1) return null;

    if (this.users[userIdx].password !== dto.oldPassword)
      throw new PasswordError('Wrong password');

    const changed = {
      ...this.users[userIdx],
      password: dto.newPassword,
      version: this.users[userIdx].version + 1,
      updatedAt: Date.now(),
    } as User;
    this.users.splice(userIdx, 1, changed);
    return changed;
  }

  async delete(id: string): Promise<User> {
    const idx = this.users.findIndex((entity) => entity.id === id);

    if (idx === -1) return null;

    const deleted = this.users[idx];

    this.users.splice(idx, 1);
    return deleted;
  }
}
