import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersDbService {
  private users: [];

  create(user: CreateUserDto) {

  }
}
