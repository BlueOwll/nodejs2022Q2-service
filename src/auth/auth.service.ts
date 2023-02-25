import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import User from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { OutputSignupDto } from './dto/output-signup.dto';
import { saltRound } from 'src/config/config';
import { OutputLoginDto } from './dto/output-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupAuthDto: SignupAuthDto) {
    const { password, ...outputUser } = await this.usersRepository.save(
      this.usersRepository.create({
        ...signupAuthDto,
        password: await bcrypt.hash(signupAuthDto.password, saltRound),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
    );
    return outputUser as OutputSignupDto;
  }

  async login(loginAuthDto: LoginAuthDto): Promise<OutputLoginDto> {
    try {
      const validatedUser = await this.validateUser(loginAuthDto);
      if (validatedUser) {
        const payload = { username: validatedUser.login, id: validatedUser.id };
        return {
          accessToken: this.jwtService.sign(payload),
          // refreshToken: this.jwtService.sign(payload),
        };
      }
      return null;
    } catch {
      throw new Error('error while validating user');
    }
  }

  async validateUser(loginAuthDto: LoginAuthDto): Promise<any> {
    const user = await this.usersRepository.findOneBy({
      login: loginAuthDto.login,
    });
    if (user && bcrypt.compare(loginAuthDto.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateToken(token: string) {
    return await this.jwtService.verify(token);
  }
}
