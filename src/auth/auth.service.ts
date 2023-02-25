import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { OutputSignupDto } from './dto/output-signup.dto';
import { passwordSalt } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(signupAuthDto: SignupAuthDto) {
    const { password, ...outputUser } = await this.usersRepository.save(
      this.usersRepository.create({
        ...signupAuthDto,
        password: await bcrypt.hash(signupAuthDto.password, passwordSalt),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
    );
    return outputUser as OutputSignupDto;
  }

  login(loginAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }
}
